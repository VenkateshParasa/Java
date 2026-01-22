# Day 21: Generics

## 📚 Learning Objectives
By the end of this lesson, you will be able to:
- Understand why generics are needed
- Create generic classes and methods
- Use bounded type parameters
- Work with wildcards
- Understand type erasure

---

## 🎯 Topics Covered

### 1. Why Generics?

#### Without Generics (Before Java 5)
```java
import java.util.*;

public class WithoutGenerics {
    public static void main(String[] args) {
        // No type safety
        ArrayList list = new ArrayList();
        list.add("Hello");
        list.add(123);
        list.add(45.67);
        
        // Need to cast - runtime error possible
        String str = (String) list.get(0);  // OK
        // String str2 = (String) list.get(1);  // ClassCastException at runtime!
    }
}
```

#### With Generics (Java 5+)
```java
import java.util.*;

public class WithGenerics {
    public static void main(String[] args) {
        // Type safety at compile time
        ArrayList<String> list = new ArrayList<>();
        list.add("Hello");
        // list.add(123);  // Compile error - type safety!
        
        // No casting needed
        String str = list.get(0);
    }
}
```

---

### 2. Generic Classes

#### Creating a Generic Class
```java
// Generic class with type parameter T
public class Box<T> {
    private T content;
    
    public void set(T content) {
        this.content = content;
    }
    
    public T get() {
        return content;
    }
    
    public static void main(String[] args) {
        // Box for String
        Box<String> stringBox = new Box<>();
        stringBox.set("Hello");
        String str = stringBox.get();
        
        // Box for Integer
        Box<Integer> intBox = new Box<>();
        intBox.set(123);
        int num = intBox.get();
        
        System.out.println("String: " + str);
        System.out.println("Integer: " + num);
    }
}
```

#### Multiple Type Parameters
```java
public class Pair<K, V> {
    private K key;
    private V value;
    
    public Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }
    
    public K getKey() { return key; }
    public V getValue() { return value; }
    
    @Override
    public String toString() {
        return key + " = " + value;
    }
    
    public static void main(String[] args) {
        Pair<String, Integer> pair1 = new Pair<>("Age", 25);
        Pair<String, String> pair2 = new Pair<>("Name", "Alice");
        
        System.out.println(pair1);
        System.out.println(pair2);
    }
}
```

---

### 3. Generic Methods

#### Generic Method Syntax
```java
public class GenericMethods {
    // Generic method
    public static <T> void printArray(T[] array) {
        for (T element : array) {
            System.out.print(element + " ");
        }
        System.out.println();
    }
    
    // Generic method with return type
    public static <T> T getFirst(T[] array) {
        if (array.length > 0) {
            return array[0];
        }
        return null;
    }
    
    public static void main(String[] args) {
        Integer[] intArray = {1, 2, 3, 4, 5};
        String[] strArray = {"A", "B", "C"};
        
        printArray(intArray);
        printArray(strArray);
        
        System.out.println("First integer: " + getFirst(intArray));
        System.out.println("First string: " + getFirst(strArray));
    }
}
```

#### Generic Method with Multiple Type Parameters
```java
public class GenericMethodMultiple {
    public static <K, V> void printPair(K key, V value) {
        System.out.println(key + " = " + value);
    }
    
    public static <T> boolean isEqual(T obj1, T obj2) {
        return obj1.equals(obj2);
    }
    
    public static void main(String[] args) {
        printPair("Name", "Alice");
        printPair("Age", 25);
        
        System.out.println(isEqual("Hello", "Hello"));
        System.out.println(isEqual(10, 20));
    }
}
```

---

### 4. Bounded Type Parameters

#### Upper Bound (extends)
```java
// T must be Number or its subclass
public class NumberBox<T extends Number> {
    private T number;
    
    public NumberBox(T number) {
        this.number = number;
    }
    
    public double getDoubleValue() {
        return number.doubleValue();
    }
    
    public static void main(String[] args) {
        NumberBox<Integer> intBox = new NumberBox<>(10);
        NumberBox<Double> doubleBox = new NumberBox<>(10.5);
        
        System.out.println(intBox.getDoubleValue());
        System.out.println(doubleBox.getDoubleValue());
        
        // NumberBox<String> strBox = new NumberBox<>("Hello");  // Error!
    }
}
```

#### Multiple Bounds
```java
interface Printable {
    void print();
}

// T must extend Number AND implement Printable
class Container<T extends Number & Printable> {
    private T value;
    
    public Container(T value) {
        this.value = value;
    }
    
    public void display() {
        System.out.println("Value: " + value.doubleValue());
        value.print();
    }
}
```

#### Bounded Generic Methods
```java
public class BoundedMethods {
    // Method accepts only Number or its subclasses
    public static <T extends Number> double sum(T num1, T num2) {
        return num1.doubleValue() + num2.doubleValue();
    }
    
    // Method accepts only Comparable types
    public static <T extends Comparable<T>> T max(T a, T b) {
        return a.compareTo(b) > 0 ? a : b;
    }
    
    public static void main(String[] args) {
        System.out.println("Sum: " + sum(10, 20.5));
        System.out.println("Max: " + max(10, 20));
        System.out.println("Max: " + max("Apple", "Banana"));
    }
}
```

---

### 5. Wildcards

#### Unbounded Wildcard (?)
```java
import java.util.*;

public class UnboundedWildcard {
    public static void printList(List<?> list) {
        for (Object obj : list) {
            System.out.print(obj + " ");
        }
        System.out.println();
    }
    
    public static void main(String[] args) {
        List<Integer> intList = Arrays.asList(1, 2, 3);
        List<String> strList = Arrays.asList("A", "B", "C");
        
        printList(intList);
        printList(strList);
    }
}
```

#### Upper Bounded Wildcard (? extends)
```java
import java.util.*;

public class UpperBoundedWildcard {
    // Accepts List of Number or its subclasses
    public static double sum(List<? extends Number> list) {
        double total = 0;
        for (Number num : list) {
            total += num.doubleValue();
        }
        return total;
    }
    
    public static void main(String[] args) {
        List<Integer> intList = Arrays.asList(1, 2, 3);
        List<Double> doubleList = Arrays.asList(1.5, 2.5, 3.5);
        
        System.out.println("Sum of integers: " + sum(intList));
        System.out.println("Sum of doubles: " + sum(doubleList));
    }
}
```

#### Lower Bounded Wildcard (? super)
```java
import java.util.*;

public class LowerBoundedWildcard {
    // Accepts List of Integer or its superclasses
    public static void addIntegers(List<? super Integer> list) {
        list.add(1);
        list.add(2);
        list.add(3);
    }
    
    public static void main(String[] args) {
        List<Integer> intList = new ArrayList<>();
        List<Number> numList = new ArrayList<>();
        List<Object> objList = new ArrayList<>();
        
        addIntegers(intList);
        addIntegers(numList);
        addIntegers(objList);
        
        System.out.println("Integer list: " + intList);
        System.out.println("Number list: " + numList);
        System.out.println("Object list: " + objList);
    }
}
```

---

### 6. Type Erasure

#### Understanding Type Erasure
```java
// Generic class
public class GenericClass<T> {
    private T value;
    
    public void set(T value) {
        this.value = value;
    }
    
    public T get() {
        return value;
    }
}

// After type erasure (at runtime)
public class GenericClass {
    private Object value;  // T becomes Object
    
    public void set(Object value) {
        this.value = value;
    }
    
    public Object get() {
        return value;
    }
}
```

#### Type Erasure with Bounds
```java
// Generic class with bound
public class BoundedGeneric<T extends Number> {
    private T value;
    
    public double getDouble() {
        return value.doubleValue();
    }
}

// After type erasure
public class BoundedGeneric {
    private Number value;  // T becomes Number (the bound)
    
    public double getDouble() {
        return value.doubleValue();
    }
}
```

---

## 💻 Practical Exercises

### Exercise 1: Generic Stack with Type Safety and Operations

**📝 Problem Statement:**
Create a comprehensive generic stack data structure demonstrating type parameter usage, generic class implementation, type-safe operations without casting, exception handling for empty stack conditions, and practical applications of generics in building reusable data structures. The system should support standard stack operations (push, pop, peek), demonstrate how generics eliminate ClassCastException risks, show type inference in action, implement additional utility methods (clear, contains, toArray), and prove that the same generic class works seamlessly with different types (Integer, String, custom objects) without code duplication.

**Requirements:**
- Create GenericStack<T> class with type parameter T for element type
- Use ArrayList<T> internally for storage (demonstrates generic collection usage)
- Implement push(T item) adding element to top of stack
- Create pop() returning T and removing top element:
  - Throw EmptyStackException if stack empty
  - Return type T ensures type safety without casting
- Add peek() returning T without removing (view top element)
- Implement isEmpty() and size() utility methods
- Create clear() method removing all elements
- Add contains(T item) checking if element exists in stack
- Implement toArray() returning Object[] of stack contents
- Create iterator() for traversing stack from top to bottom
- Demonstrate type safety: GenericStack<String> cannot accept Integer
- Show type inference: new GenericStack<>() infers type from declaration
- Test with multiple types: Integer, String, custom Person class
- Prove no casting needed: String s = stringStack.pop() (no cast required)
- Handle edge cases: pop/peek on empty stack, null elements
- Compare with non-generic version showing ClassCastException risks

**Sample Test Cases:**
```
Input: Create Integer stack and perform operations
Expected Output:
=== Generic Stack Demo ===

Creating Integer Stack:
Stack<Integer> intStack = new GenericStack<>();

Push Operations:
→ Pushing: 10
→ Pushing: 20
→ Pushing: 30
Stack size: 3

Peek Operation:
Top element: 30 (stack unchanged)
Stack size: 3

Pop Operations:
→ Popped: 30
→ Popped: 20
Stack size: 1

Remaining:
Top element: 10

Input: Create String stack
Expected Output:
=== String Stack Demo ===

Creating String Stack:
Stack<String> strStack = new GenericStack<>();

Push Operations:
→ Pushing: "Apple"
→ Pushing: "Banana"
→ Pushing: "Cherry"

Type Safety Demonstration:
String fruit = strStack.pop(); // No cast needed!
Result: fruit = "Cherry"

Type: String (compile-time guaranteed)

Input: Test with custom Person class
Expected Output:
=== Custom Object Stack Demo ===

Creating Person Stack:
Stack<Person> personStack = new GenericStack<>();

Adding People:
→ Pushed: Person[name=Alice, age=30]
→ Pushed: Person[name=Bob, age=25]
→ Pushed: Person[name=Charlie, age=35]

Pop and Process:
Person p = personStack.pop();
Name: Charlie
Age: 35
No casting required - type safety guaranteed!

Input: Test empty stack exception
Expected Output:
=== Empty Stack Exception Demo ===

Creating empty stack...
Attempting to pop from empty stack...

Exception caught: EmptyStackException
Message: Cannot pop from empty stack
Stack is empty: true

Input: Compare with non-generic version
Expected Output:
=== Type Safety Comparison ===

Non-Generic Stack (Old Way):
Stack rawStack = new Stack();
rawStack.push("Hello");
rawStack.push(123); // Allowed - no type checking!

String s = (String) rawStack.pop(); // Cast required
Integer i = (Integer) rawStack.pop(); // Runtime error! ClassCastException

Generic Stack (Type-Safe):
GenericStack<String> typedStack = new GenericStack<>();
typedStack.push("Hello");
// typedStack.push(123); // Compile error - type safety!

String s = typedStack.pop(); // No cast needed
Type safety guaranteed at compile time ✓
```

**Solution:**
```java
import java.util.*;

// Custom exception for empty stack
class EmptyStackException extends RuntimeException {
    public EmptyStackException(String message) {
        super(message);
    }
}

// Generic Stack implementation
public class GenericStack<T> {
    private ArrayList<T> stack;
    
    public GenericStack() {
        this.stack = new ArrayList<>();
    }
    
    // Push element to top of stack
    public void push(T item) {
        stack.add(item);
        System.out.println("→ Pushing: " + item);
    }
    
    // Pop and return top element
    public T pop() {
        if (isEmpty()) {
            throw new EmptyStackException("Cannot pop from empty stack");
        }
        T item = stack.remove(stack.size() - 1);
        System.out.println("→ Popped: " + item);
        return item;
    }
    
    // View top element without removing
    public T peek() {
        if (isEmpty()) {
            throw new EmptyStackException("Cannot peek empty stack");
        }
        return stack.get(stack.size() - 1);
    }
    
    // Check if stack is empty
    public boolean isEmpty() {
        return stack.isEmpty();
    }
    
    // Get stack size
    public int size() {
        return stack.size();
    }
    
    // Clear all elements
    public void clear() {
        stack.clear();
        System.out.println("Stack cleared");
    }
    
    // Check if element exists
    public boolean contains(T item) {
        return stack.contains(item);
    }
    
    // Convert to array
    public Object[] toArray() {
        return stack.toArray();
    }
    
    // Iterator from top to bottom
    public Iterator<T> iterator() {
        List<T> reversed = new ArrayList<>(stack);
        Collections.reverse(reversed);
        return reversed.iterator();
    }
    
    @Override
    public String toString() {
        return "Stack" + stack.toString();
    }
    
    public static void main(String[] args) {
        // Demo 1: Integer Stack
        System.out.println("=== Generic Stack Demo ===\n");
        System.out.println("Creating Integer Stack:");
        System.out.println("Stack<Integer> intStack = new GenericStack<>();\n");
        
        GenericStack<Integer> intStack = new GenericStack<>();
        
        System.out.println("Push Operations:");
        intStack.push(10);
        intStack.push(20);
        intStack.push(30);
        System.out.println("Stack size: " + intStack.size());
        
        System.out.println("\nPeek Operation:");
        System.out.println("Top element: " + intStack.peek() + " (stack unchanged)");
        System.out.println("Stack size: " + intStack.size());
        
        System.out.println("\nPop Operations:");
        intStack.pop();
        intStack.pop();
        System.out.println("Stack size: " + intStack.size());
        
        System.out.println("\nRemaining:");
        System.out.println("Top element: " + intStack.peek());
        
        // Demo 2: String Stack
        System.out.println("\n=== String Stack Demo ===\n");
        System.out.println("Creating String Stack:");
        System.out.println("Stack<String> strStack = new GenericStack<>();\n");
        
        GenericStack<String> strStack = new GenericStack<>();
        
        System.out.println("Push Operations:");
        strStack.push("Apple");
        strStack.push("Banana");
        strStack.push("Cherry");
        
        System.out.println("\nType Safety Demonstration:");
        System.out.println("String fruit = strStack.pop(); // No cast needed!");
        String fruit = strStack.pop();
        System.out.println("Result: fruit = \"" + fruit + "\"");
        System.out.println("\nType: " + fruit.getClass().getSimpleName() + " (compile-time guaranteed)");
        
        // Demo 3: Custom Object Stack
        System.out.println("\n=== Custom Object Stack Demo ===\n");
        System.out.println("Creating Person Stack:");
        System.out.println("Stack<Person> personStack = new GenericStack<>();\n");
        
        GenericStack<Person> personStack = new GenericStack<>();
        
        System.out.println("Adding People:");
        personStack.push(new Person("Alice", 30));
        personStack.push(new Person("Bob", 25));
        personStack.push(new Person("Charlie", 35));
        
        System.out.println("\nPop and Process:");
        System.out.println("Person p = personStack.pop();");
        Person p = personStack.pop();
        System.out.println("Name: " + p.getName());
        System.out.println("Age: " + p.getAge());
        System.out.println("No casting required - type safety guaranteed!");
        
        // Demo 4: Empty Stack Exception
        System.out.println("\n=== Empty Stack Exception Demo ===\n");
        GenericStack<String> emptyStack = new GenericStack<>();
        System.out.println("Creating empty stack...");
        System.out.println("Attempting to pop from empty stack...\n");
        
        try {
            emptyStack.pop();
        } catch (EmptyStackException e) {
            System.out.println("Exception caught: " + e.getClass().getSimpleName());
            System.out.println("Message: " + e.getMessage());
            System.out.println("Stack is empty: " + emptyStack.isEmpty());
        }
        
        // Demo 5: Type Safety Comparison
        System.out.println("\n=== Type Safety Comparison ===\n");
        System.out.println("Generic Stack (Type-Safe):");
        System.out.println("GenericStack<String> typedStack = new GenericStack<>();");
        System.out.println("typedStack.push(\"Hello\");");
        System.out.println("// typedStack.push(123); // Compile error - type safety!");
        System.out.println("\nString s = typedStack.pop(); // No cast needed");
        System.out.println("Type safety guaranteed at compile time ✓");
    }
}

// Helper class for demo
class Person {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public String getName() { return name; }
    public int getAge() { return age; }
    
    @Override
    public String toString() {
        return "Person[name=" + name + ", age=" + age + "]";
    }
}
```

**💡 Tips:**
- Generic class syntax: `class GenericStack<T>` where T is type parameter placeholder
- Type parameter T used throughout class: `ArrayList<T>`, `push(T item)`, `T pop()`
- No casting needed: `T item = stack.pop()` returns exact type, not Object requiring cast
- Type safety at compile time: `GenericStack<String>` cannot accept Integer - compiler error
- Type inference with diamond operator: `new GenericStack<>()` infers type from left side
- Generic collections internally: `ArrayList<T>` demonstrates using generics within generics
- EmptyStackException custom exception: better than generic RuntimeException for clarity
- Iterator<T> return type: maintains type safety through iteration
- Multiple type usage: same GenericStack<T> works for Integer, String, Person without changes
- Eliminates ClassCastException: no runtime casting means no ClassCastException possible
- Type parameter naming: T for Type, E for Element, K for Key, V for Value conventions
- Generic methods can have own type parameters: `public <E> void method(E item)`

---

### Exercise 2: Generic Utility Methods with Bounded Type Parameters

**📝 Problem Statement:**
Create a comprehensive collection of generic utility methods demonstrating generic method syntax, bounded type parameters with extends keyword, multiple type parameters in single method, type inference from method arguments, and practical applications of generics in building reusable utility functions. The system should include methods for swapping array elements (any type), finding maximum/minimum (Comparable types only), filtering collections with predicates, transforming collections with mappers, and merging collections, all while maintaining type safety and eliminating code duplication across different types.

**Requirements:**
- Create GenericUtils class with static generic utility methods
- Implement `<T> void swap(T[] array, int i, int j)`:
  - Generic method with type parameter T
  - Swaps two elements at indices i and j
  - Works with any type: Integer[], String[], Person[]
- Add `<T extends Comparable<T>> T findMax(T[] array)`:
  - Bounded type parameter: T must implement Comparable
  - Returns maximum element using compareTo()
  - Won't compile for non-Comparable types (compile-time safety)
- Create `<T extends Comparable<T>> T findMin(T[] array)` for minimum
- Implement `<T> List<T> arrayToList(T[] array)` converting array to ArrayList
- Add `<T> T[] listToArray(List<T> list, Class<T> clazz)` using reflection
- Create `<T> List<T> filter(List<T> list, Predicate<T> predicate)`:
  - Generic method with Predicate functional interface
  - Filters elements matching predicate condition
- Implement `<T, R> List<R> map(List<T> list, Function<T, R> mapper)`:
  - Two type parameters: input T, output R
  - Transforms each element T to R using mapper function
- Add `<T> boolean contains(T[] array, T element)` checking element existence
- Create `<T> void reverse(T[] array)` reversing array in-place
- Implement `<T> List<T> merge(List<T> list1, List<T> list2)` combining lists
- Demonstrate type inference: compiler infers T from arguments
- Show bounded type parameter benefits: compile-time type checking
- Test with multiple types proving reusability

**Sample Test Cases:**
```
Input: Swap elements in Integer array
Expected Output:
=== Generic Utility Methods Demo ===

Original Integer Array: [5, 2, 8, 1, 9]

Swap Operation:
GenericUtils.swap(numbers, 0, 4);
Swapping index 0 (5) with index 4 (9)

After Swap: [9, 2, 8, 1, 5]

Type Parameter: T = Integer (inferred from array type)

Input: Find maximum in String array
Expected Output:
=== Find Maximum Demo ===

String Array: ["apple", "zebra", "banana", "mango"]

Finding Maximum:
<T extends Comparable<T>> T findMax(T[] array)

Bounded Type Parameter:
→ T must implement Comparable<T>
→ String implements Comparable<String> ✓

Comparing elements:
"apple" vs "zebra": zebra > apple
"zebra" vs "banana": zebra > banana
"zebra" vs "mango": zebra > mango

Maximum: "zebra"

Input: Try findMax with non-Comparable type
Expected Output:
=== Bounded Type Parameter Demo ===

class NonComparable {
    int value;
}

Attempting:
NonComparable[] array = {new NonComparable(5), new NonComparable(3)};
NonComparable max = GenericUtils.findMax(array);

Compilation Error:
error: type argument NonComparable is not within bounds of type-variable T
  <T extends Comparable<T>> T findMax(T[] array)
                              ^
  where T is a type-variable:
    T extends Comparable<T> declared in method findMax(T[])

Bounded type parameter prevents compilation ✓
Type safety enforced at compile time!

Input: Transform list with map function
Expected Output:
=== Map Transformation Demo ===

Original List<Integer>: [1, 2, 3, 4, 5]

Transformation:
<T, R> List<R> map(List<T> list, Function<T, R> mapper)

Type Parameters:
→ T = Integer (input type)
→ R = String (output type)

Mapper Function: n -> "Number: " + n

Applying transformation:
1 → "Number: 1"
2 → "Number: 2"
3 → "Number: 3"
4 → "Number: 4"
5 → "Number: 5"

Result List<String>: ["Number: 1", "Number: 2", "Number: 3", "Number: 4", "Number: 5"]

Type changed: List<Integer> → List<String>

Input: Filter list with predicate
Expected Output:
=== Filter Demo ===

Original List<Integer>: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

Filter Condition: n -> n % 2 == 0 (even numbers)

Filtering:
→ 1: odd (filtered out)
→ 2: even ✓
→ 3: odd (filtered out)
→ 4: even ✓
→ 5: odd (filtered out)
→ 6: even ✓
→ 7: odd (filtered out)
→ 8: even ✓
→ 9: odd (filtered out)
→ 10: even ✓

Filtered List<Integer>: [2, 4, 6, 8, 10]
```

**Solution:**
```java
import java.util.*;
import java.util.function.*;

public class GenericUtils {
    
    // Generic method: swap two elements in array
    public static <T> void swap(T[] array, int i, int j) {
        System.out.println("Swapping index " + i + " (" + array[i] + ") with index " + j + " (" + array[j] + ")");
        T temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    
    // Bounded type parameter: T must implement Comparable
    public static <T extends Comparable<T>> T findMax(T[] array) {
        if (array == null || array.length == 0) {
            return null;
        }
        
        T max = array[0];
        for (int i = 1; i < array.length; i++) {
            if (array[i].compareTo(max) > 0) {
                System.out.println("\"" + array[i] + "\" vs \"" + max + "\": " + array[i] + " > " + max);
                max = array[i];
            }
        }
        return max;
    }
    
    // Find minimum element
    public static <T extends Comparable<T>> T findMin(T[] array) {
        if (array == null || array.length == 0) {
            return null;
        }
        
        T min = array[0];
        for (T element : array) {
            if (element.compareTo(min) < 0) {
                min = element;
            }
        }
        return min;
    }
    
    // Convert array to list
    public static <T> List<T> arrayToList(T[] array) {
        return new ArrayList<>(Arrays.asList(array));
    }
    
    // Convert list to array using reflection
    @SuppressWarnings("unchecked")
    public static <T> T[] listToArray(List<T> list, Class<T> clazz) {
        T[] array = (T[]) java.lang.reflect.Array.newInstance(clazz, list.size());
        return list.toArray(array);
    }
    
    // Filter list with predicate
    public static <T> List<T> filter(List<T> list, Predicate<T> predicate) {
        List<T> filtered = new ArrayList<>();
        for (T element : list) {
            if (predicate.test(element)) {
                filtered.add(element);
            }
        }
        return filtered;
    }
    
    // Map/transform list elements
    public static <T, R> List<R> map(List<T> list, Function<T, R> mapper) {
        List<R> mapped = new ArrayList<>();
        System.out.println("\nApplying transformation:");
        for (T element : list) {
            R result = mapper.apply(element);
            System.out.println(element + " → \"" + result + "\"");
            mapped.add(result);
        }
        return mapped;
    }
    
    // Check if array contains element
    public static <T> boolean contains(T[] array, T element) {
        for (T item : array) {
            if (item.equals(element)) {
                return true;
            }
        }
        return false;
    }
    
    // Reverse array in-place
    public static <T> void reverse(T[] array) {
        int left = 0;
        int right = array.length - 1;
        while (left < right) {
            swap(array, left++, right--);
        }
    }
    
    // Merge two lists
    public static <T> List<T> merge(List<T> list1, List<T> list2) {
        List<T> merged = new ArrayList<>(list1);
        merged.addAll(list2);
        return merged;
    }
    
    public static void main(String[] args) {
        // Demo 1: Swap
        System.out.println("=== Generic Utility Methods Demo ===\n");
        Integer[] numbers = {5, 2, 8, 1, 9};
        System.out.println("Original Integer Array: " + Arrays.toString(numbers));
        
        System.out.println("\nSwap Operation:");
        System.out.println("GenericUtils.swap(numbers, 0, 4);");
        swap(numbers, 0, 4);
        System.out.println("\nAfter Swap: " + Arrays.toString(numbers));
        System.out.println("\nType Parameter: T = Integer (inferred from array type)");
        
        // Demo 2: Find Max with Strings
        System.out.println("\n=== Find Maximum Demo ===\n");
        String[] fruits = {"apple", "zebra", "banana", "mango"};
        System.out.println("String Array: " + Arrays.toString(fruits));
        
        System.out.println("\nFinding Maximum:");
        System.out.println("<T extends Comparable<T>> T findMax(T[] array)");
        System.out.println("\nBounded Type Parameter:");
        System.out.println("→ T must implement Comparable<T>");
        System.out.println("→ String implements Comparable<String> ✓");
        
        System.out.println("\nComparing elements:");
        String max = findMax(fruits);
        System.out.println("\nMaximum: \"" + max + "\"");
        
        // Demo 3: Map transformation
        System.out.println("\n=== Map Transformation Demo ===\n");
        List<Integer> intList = Arrays.asList(1, 2, 3, 4, 5);
        System.out.println("Original List<Integer>: " + intList);
        
        System.out.println("\nTransformation:");
        System.out.println("<T, R> List<R> map(List<T> list, Function<T, R> mapper)");
        System.out.println("\nType Parameters:");
        System.out.println("→ T = Integer (input type)");
        System.out.println("→ R = String (output type)");
        System.out.println("\nMapper Function: n -> \"Number: \" + n");
        
        List<String> stringList = map(intList, n -> "Number: " + n);
        System.out.println("\nResult List<String>: " + stringList);
        System.out.println("\nType changed: List<Integer> → List<String>");
        
        // Demo 4: Filter
        System.out.println("\n=== Filter Demo ===\n");
        List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        System.out.println("Original List<Integer>: " + nums);
        
        System.out.println("\nFilter Condition: n -> n % 2 == 0 (even numbers)");
        System.out.println("\nFiltering:");
        
        List<Integer> evens = new ArrayList<>();
        for (Integer n : nums) {
            if (n % 2 == 0) {
                System.out.println("→ " + n + ": even ✓");
                evens.add(n);
            } else {
                System.out.println("→ " + n + ": odd (filtered out)");
            }
        }
        
        System.out.println("\nFiltered List<Integer>: " + evens);
        
        // Demo 5: Array to List
        System.out.println("\n=== Array to List Conversion ===\n");
        String[] strArray = {"A", "B", "C"};
        System.out.println("String Array: " + Arrays.toString(strArray));
        
        List<String> strList = arrayToList(strArray);
        System.out.println("Converted to List<String>: " + strList);
        System.out.println("Type preserved: String[] → List<String>");
    }
}
```

**💡 Tips:**
- Generic method syntax: `<T>` before return type declares type parameter for method
- Type inference: compiler infers T from arguments - `swap(numbers, 0, 4)` infers T=Integer
- Bounded type parameter `<T extends Comparable<T>>` restricts T to Comparable types only
- Multiple type parameters: `<T, R>` in map() allows input type T different from output type R
- Generic methods can be static: type parameter independent of class type parameter
- Bounded types enable method calls: `T extends Comparable` allows calling `compareTo()`
- Function<T, R> functional interface: takes T input, returns R output for transformations
- Predicate<T> functional interface: takes T input, returns boolean for filtering
- Type safety without casting: `T max = findMax(array)` returns exact type, no cast needed
- Compile-time type checking: bounded types prevent non-Comparable types at compile time
- Generic arrays limitation: can't create `new T[]` due to type erasure, use reflection
- Method type parameter scope: `<T>` in method independent from class `<T>` if present

---

### Exercise 3: Generic Repository Pattern with CRUD Operations

**📝 Problem Statement:**
Create a comprehensive generic repository pattern demonstrating type-safe database-like operations with bounded type parameters, generic CRUD methods, filtering with predicates, and the practical application of generics in building reusable data access layers. The system should support add, update, delete, find operations with type safety, demonstrate generic interfaces, and show how generics enable writing once and reusing across different entity types without code duplication.

**Requirements:**
- Create Entity interface with getId() method returning generic ID type
- Implement generic Repository<T, ID> interface with bounded type parameters
  - T extends Entity<ID> ensuring all entities have IDs
  - ID type parameter for flexible ID types (String, Integer, Long, UUID)
- Generic CRUD methods:
  - save(T entity): ID - saves entity and returns ID
  - findById(ID id): Optional<T> - finds entity by ID using Optional for null safety
  - findAll(): List<T> - returns all entities
  - update(T entity): boolean - updates existing entity
  - delete(ID id): boolean - deletes by ID
  - exists(ID id): boolean - checks existence
- Implement InMemoryRepository<T, ID> generic class providing in-memory storage using HashMap<ID, T>
- Add generic filtering: findByPredicate(Predicate<T> predicate): List<T>
- Demonstrate multiple entity types: User (ID: String), Product (ID: Integer), Order (ID: Long)
- Show type safety: cannot save User to Product repository
- Implement generic count(), clear() methods
- Use Collections utility methods with generic types
- Demonstrate Optional usage preventing null returns

**Sample Test Cases:**
```
Input: Create repositories for different entities
Expected Output:
=== Generic Repository Pattern Demo ===

Creating repositories:
✓ User Repository created (ID type: String)
✓ Product Repository created (ID type: Integer)
✓ Order Repository created (ID type: Long)

Input: Save entities to repositories
Expected Output:
=== Saving Entities ===

User Repository:
✓ Saved: User[id=U001, name=Alice, email=alice@example.com]
✓ Saved: User[id=U002, name=Bob, email=bob@example.com]
✓ Saved: User[id=U003, name=Charlie, email=charlie@example.com]
Total users: 3

Product Repository:
✓ Saved: Product[id=1, name=Laptop, price=999.99]
✓ Saved: Product[id=2, name=Mouse, price=25.99]
✓ Saved: Product[id=3, name=Keyboard, price=79.99]
Total products: 3

Input: Find by ID
Expected Output:
=== Find By ID Operations ===

Finding User U001:
Found: User[id=U001, name=Alice, email=alice@example.com]
Status: Present ✓

Finding User U999 (doesn't exist):
Status: Not Present (Optional.empty())

Finding Product 2:
Found: Product[id=2, name=Mouse, price=25.99]
Status: Present ✓

Input: Filter with predicate
Expected Output:
=== Filtering with Predicates ===

Products with price > $50:
1. Product[id=1, name=Laptop, price=999.99]
2. Product[id=3, name=Keyboard, price=79.99]

Users with email ending in @example.com:
1. User[id=U001, name=Alice, email=alice@example.com]
2. User[id=U002, name=Bob, email=bob@example.com]
3. User[id=U003, name=Charlie, email=charlie@example.com]

Input: Update entity
Expected Output:
=== Update Operations ===

Original Product[id=1]: Laptop - $999.99

Updating price to $899.99...
✓ Update successful

Updated Product[id=1]: Laptop - $899.99

Input: Delete entity
Expected Output:
=== Delete Operations ===

Before delete: 3 users
Deleting User U002...
✓ Delete successful
After delete: 2 users

Trying to find deleted user U002:
Status: Not Present (deleted successfully)
```

**Solution:**
```java
import java.util.*;
import java.util.function.Predicate;

// ============= Entity Interface =============

interface Entity<ID> {
    ID getId();
    void setId(ID id);
}

// ============= Generic Repository Interface =============

interface Repository<T extends Entity<ID>, ID> {
    ID save(T entity);
    Optional<T> findById(ID id);
    List<T> findAll();
    boolean update(T entity);
    boolean delete(ID id);
    boolean exists(ID id);
    List<T> findByPredicate(Predicate<T> predicate);
    long count();
    void clear();
}

// ============= In-Memory Repository Implementation =============

class InMemoryRepository<T extends Entity<ID>, ID> implements Repository<T, ID> {
    private final Map<ID, T> storage;
    private final String entityName;

    public InMemoryRepository(String entityName) {
        this.storage = new HashMap<>();
        this.entityName = entityName;
    }

    @Override
    public ID save(T entity) {
        if (entity.getId() == null) {
            throw new IllegalArgumentException("Entity ID cannot be null");
        }
        storage.put(entity.getId(), entity);
        System.out.println("✓ Saved: " + entity);
        return entity.getId();
    }

    @Override
    public Optional<T> findById(ID id) {
        return Optional.ofNullable(storage.get(id));
    }

    @Override
    public List<T> findAll() {
        return new ArrayList<>(storage.values());
    }

    @Override
    public boolean update(T entity) {
        if (entity.getId() == null || !exists(entity.getId())) {
            return false;
        }
        storage.put(entity.getId(), entity);
        System.out.println("✓ Update successful");
        return true;
    }

    @Override
    public boolean delete(ID id) {
        if (!exists(id)) {
            return false;
        }
        storage.remove(id);
        System.out.println("✓ Delete successful");
        return true;
    }

    @Override
    public boolean exists(ID id) {
        return storage.containsKey(id);
    }

    @Override
    public List<T> findByPredicate(Predicate<T> predicate) {
        List<T> result = new ArrayList<>();
        for (T entity : storage.values()) {
            if (predicate.test(entity)) {
                result.add(entity);
            }
        }
        return result;
    }

    @Override
    public long count() {
        return storage.size();
    }

    @Override
    public void clear() {
        storage.clear();
        System.out.println("✓ Repository cleared");
    }

    public String getEntityName() {
        return entityName;
    }
}

// ============= Entity Classes =============

class User implements Entity<String> {
    private String id;
    private String name;
    private String email;

    public User(String id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    @Override
    public String getId() { return id; }

    @Override
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    @Override
    public String toString() {
        return String.format("User[id=%s, name=%s, email=%s]", id, name, email);
    }
}

class Product implements Entity<Integer> {
    private Integer id;
    private String name;
    private double price;

    public Product(Integer id, String name, double price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    @Override
    public Integer getId() { return id; }

    @Override
    public void setId(Integer id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    @Override
    public String toString() {
        return String.format("Product[id=%d, name=%s, price=%.2f]", id, name, price);
    }
}

class Order implements Entity<Long> {
    private Long id;
    private String customerName;
    private double totalAmount;

    public Order(Long id, String customerName, double totalAmount) {
        this.id = id;
        this.customerName = customerName;
        this.totalAmount = totalAmount;
    }

    @Override
    public Long getId() { return id; }

    @Override
    public void setId(Long id) { this.id = id; }

    public String getCustomerName() { return customerName; }
    public double getTotalAmount() { return totalAmount; }

    @Override
    public String toString() {
        return String.format("Order[id=%d, customer=%s, amount=%.2f]",
            id, customerName, totalAmount);
    }
}

// ============= Demo Application =============

public class TestGenericRepository {
    public static void main(String[] args) {
        System.out.println("=== Generic Repository Pattern Demo ===\n");

        // Create repositories for different entity types
        System.out.println("Creating repositories:");
        Repository<User, String> userRepo = new InMemoryRepository<>("User");
        System.out.println("✓ User Repository created (ID type: String)");

        Repository<Product, Integer> productRepo = new InMemoryRepository<>("Product");
        System.out.println("✓ Product Repository created (ID type: Integer)");

        Repository<Order, Long> orderRepo = new InMemoryRepository<>("Order");
        System.out.println("✓ Order Repository created (ID type: Long)");

        // Save entities
        System.out.println("\n=== Saving Entities ===");

        System.out.println("\nUser Repository:");
        userRepo.save(new User("U001", "Alice", "alice@example.com"));
        userRepo.save(new User("U002", "Bob", "bob@example.com"));
        userRepo.save(new User("U003", "Charlie", "charlie@example.com"));
        System.out.println("Total users: " + userRepo.count());

        System.out.println("\nProduct Repository:");
        productRepo.save(new Product(1, "Laptop", 999.99));
        productRepo.save(new Product(2, "Mouse", 25.99));
        productRepo.save(new Product(3, "Keyboard", 79.99));
        System.out.println("Total products: " + productRepo.count());

        // Find by ID with Optional
        System.out.println("\n=== Find By ID Operations ===");

        System.out.println("\nFinding User U001:");
        Optional<User> user1 = userRepo.findById("U001");
        if (user1.isPresent()) {
            System.out.println("Found: " + user1.get());
            System.out.println("Status: Present ✓");
        }

        System.out.println("\nFinding User U999 (doesn't exist):");
        Optional<User> user999 = userRepo.findById("U999");
        System.out.println("Status: " + (user999.isPresent() ? "Present" : "Not Present (Optional.empty())"));

        System.out.println("\nFinding Product 2:");
        Optional<Product> product2 = productRepo.findById(2);
        if (product2.isPresent()) {
            System.out.println("Found: " + product2.get());
            System.out.println("Status: Present ✓");
        }

        // Filter with predicates
        System.out.println("\n=== Filtering with Predicates ===");

        System.out.println("\nProducts with price > $50:");
        List<Product> expensiveProducts = productRepo.findByPredicate(p -> p.getPrice() > 50);
        int index = 1;
        for (Product p : expensiveProducts) {
            System.out.println(index++ + ". " + p);
        }

        System.out.println("\nUsers with email ending in @example.com:");
        List<User> exampleUsers = userRepo.findByPredicate(u -> u.getEmail().endsWith("@example.com"));
        index = 1;
        for (User u : exampleUsers) {
            System.out.println(index++ + ". " + u);
        }

        // Update entity
        System.out.println("\n=== Update Operations ===");

        Optional<Product> laptopOpt = productRepo.findById(1);
        if (laptopOpt.isPresent()) {
            Product laptop = laptopOpt.get();
            System.out.println("\nOriginal Product[id=1]: " + laptop.getName() + " - $" + laptop.getPrice());

            laptop.setPrice(899.99);
            System.out.println("\nUpdating price to $899.99...");
            productRepo.update(laptop);

            Product updated = productRepo.findById(1).get();
            System.out.println("\nUpdated Product[id=1]: " + updated.getName() + " - $" + updated.getPrice());
        }

        // Delete entity
        System.out.println("\n=== Delete Operations ===");

        System.out.println("\nBefore delete: " + userRepo.count() + " users");
        System.out.println("Deleting User U002...");
        userRepo.delete("U002");
        System.out.println("After delete: " + userRepo.count() + " users");

        System.out.println("\nTrying to find deleted user U002:");
        Optional<User> deletedUser = userRepo.findById("U002");
        System.out.println("Status: " + (deletedUser.isPresent() ? "Present" : "Not Present (deleted successfully)"));

        // Find all
        System.out.println("\n=== Find All Operations ===");

        System.out.println("\nAll Users:");
        List<User> allUsers = userRepo.findAll();
        index = 1;
        for (User u : allUsers) {
            System.out.println(index++ + ". " + u);
        }

        System.out.println("\nAll Products:");
        List<Product> allProducts = productRepo.findAll();
        index = 1;
        for (Product p : allProducts) {
            System.out.println(index++ + ". " + p);
        }
    }
}
```

**💡 Tips:**
- Generic Repository pattern eliminates code duplication - write once, use for all entity types
- Bounded type parameter `<T extends Entity<ID>>` ensures all entities have IDs - type safety at compile time
- Multiple type parameters `<T, ID>` provide flexibility - String IDs for users, Integer for products, Long for orders
- Optional<T> return type prevents NullPointerException - forces null checking at call site
- HashMap<ID, T> storage works with any ID type - demonstrates generic collections
- Predicate<T> enables flexible filtering without repository modification - functional programming with generics
- InMemoryRepository<T, ID> implements Repository<T, ID> showing interface-implementation relationship
- Type inference at creation: `new InMemoryRepository<>("User")` compiler infers types from declaration
- Cannot mix types: `userRepo.save(product)` won't compile - type safety prevents bugs
- Generic interfaces enable dependency injection patterns - swap implementations without changing client code
- Repository pattern abstracts storage mechanism - easy to swap in-memory for database implementation
- findById returns Optional forcing explicit handling of missing entities - prevents silent null bugs
- Generic predicates work with lambda expressions - `p -> p.getPrice() > 50` type-safe filtering
- Entity<ID> interface provides common contract - enables generic methods working on any entity

---

### Exercise 4: Event Management System with Generic Event Handlers

**📝 Problem Statement:**
Create a sophisticated event management system demonstrating advanced generics including multiple type parameters, bounded type parameters with multiple bounds, generic event handler registration, wildcard usage for flexible event processing, and the PECS (Producer Extends, Consumer Super) principle. The system should support publishing events of different types, registering type-safe handlers, filtering handlers by event type, and demonstrating how generics enable building extensible event-driven architectures without runtime type casting.

**Requirements:**
- Create Event base class with timestamp and eventId (generic base for all events)
- Implement EventHandler<E extends Event> interface with bounded type parameter
  - handle(E event) method for type-safe event processing
- Create EventPublisher class managing event handlers with type safety:
  - registerHandler(Class<E> eventType, EventHandler<E> handler)
  - publish(Event event) distributing to appropriate handlers
  - removeHandler(EventHandler<?> handler)
- Multiple event types: UserEvent, OrderEvent, SystemEvent extending Event
- Demonstrate bounded wildcard usage:
  - `<? extends Event>` for reading events from collections
  - `<? super Event>` for writing events to collections
- Implement generic EventLogger<E extends Event> capturing events for auditing
- Show PECS principle in copyEvents methods
- Create EventFilter<E extends Event> generic class with Predicate<E>
- Multiple bounds demonstration: `<E extends Event & Comparable<E>>`
- Generic event history with timestamp-based sorting
- Type-safe handler casting and event dispatching

**Sample Test Cases:**
```
Input: Register handlers for different event types
Expected Output:
=== Event Management System ===

Registering Event Handlers:
✓ Registered UserEvent handler: UserActivityLogger
✓ Registered OrderEvent handler: OrderProcessingHandler
✓ Registered OrderEvent handler: OrderNotificationHandler
✓ Registered SystemEvent handler: SystemMonitor

Total handlers registered: 4

Input: Publish UserEvent
Expected Output:
=== Publishing UserEvent ===

Event: UserEvent[id=EVT-001, user=Alice, action=LOGIN]
Timestamp: 2024-01-10T10:30:00

Dispatching to handlers...
→ UserActivityLogger: Processing UserEvent
  User: Alice
  Action: LOGIN
  Status: Logged ✓

Handlers notified: 1

Input: Publish OrderEvent
Expected Output:
=== Publishing OrderEvent ===

Event: OrderEvent[id=EVT-002, orderId=ORD-123, amount=299.99]
Timestamp: 2024-01-10T10:31:00

Dispatching to handlers...
→ OrderProcessingHandler: Processing OrderEvent
  Order ID: ORD-123
  Amount: $299.99
  Status: Processing started ✓

→ OrderNotificationHandler: Processing OrderEvent
  Order ID: ORD-123
  Notification sent to customer ✓

Handlers notified: 2

Input: Publish SystemEvent
Expected Output:
=== Publishing SystemEvent ===

Event: SystemEvent[id=EVT-003, level=WARNING, message=High memory usage]
Timestamp: 2024-01-10T10:32:00

Dispatching to handlers...
→ SystemMonitor: Processing SystemEvent
  Level: WARNING
  Message: High memory usage
  Action: Alert triggered ✓

Handlers notified: 1

Input: Filter events by type
Expected Output:
=== Filtering Events ===

Events of type UserEvent:
1. UserEvent[id=EVT-001, user=Alice, action=LOGIN] at 10:30:00

Events of type OrderEvent:
1. OrderEvent[id=EVT-002, orderId=ORD-123, amount=299.99] at 10:31:00

Events of type SystemEvent:
1. SystemEvent[id=EVT-003, level=WARNING, message=High memory usage] at 10:32:00

Input: Demonstrate PECS principle
Expected Output:
=== PECS Principle Demo ===

Source: OrderEvent collection (Producer)
Destination: Event collection (Consumer)

Copying events using PECS:
Source (? extends OrderEvent): Can read OrderEvent
Destination (? super OrderEvent): Can write OrderEvent

Copy operation:
→ Copied: OrderEvent[id=ORD-123]
→ Copied: OrderEvent[id=ORD-124]
→ Copied: OrderEvent[id=ORD-125]

Result: 3 events copied successfully
Producer Extends, Consumer Super = PECS
```

**Solution:**
```java
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.function.Predicate;

// ============= Event Base Class =============

abstract class Event {
    private final String eventId;
    private final LocalDateTime timestamp;

    public Event(String eventId) {
        this.eventId = eventId;
        this.timestamp = LocalDateTime.now();
    }

    public String getEventId() { return eventId; }
    public LocalDateTime getTimestamp() { return timestamp; }

    public String getFormattedTimestamp() {
        return timestamp.format(DateTimeFormatter.ofPattern("HH:mm:ss"));
    }

    @Override
    public String toString() {
        return String.format("%s[id=%s] at %s",
            getClass().getSimpleName(), eventId, getFormattedTimestamp());
    }
}

// ============= Event Handler Interface =============

interface EventHandler<E extends Event> {
    void handle(E event);
    String getHandlerName();
}

// ============= Specific Event Types =============

class UserEvent extends Event {
    private final String username;
    private final String action;

    public UserEvent(String eventId, String username, String action) {
        super(eventId);
        this.username = username;
        this.action = action;
    }

    public String getUsername() { return username; }
    public String getAction() { return action; }

    @Override
    public String toString() {
        return String.format("UserEvent[id=%s, user=%s, action=%s]",
            getEventId(), username, action);
    }
}

class OrderEvent extends Event {
    private final String orderId;
    private final double amount;

    public OrderEvent(String eventId, String orderId, double amount) {
        super(eventId);
        this.orderId = orderId;
        this.amount = amount;
    }

    public String getOrderId() { return orderId; }
    public double getAmount() { return amount; }

    @Override
    public String toString() {
        return String.format("OrderEvent[id=%s, orderId=%s, amount=%.2f]",
            getEventId(), orderId, amount);
    }
}

class SystemEvent extends Event {
    private final String level;
    private final String message;

    public SystemEvent(String eventId, String level, String message) {
        super(eventId);
        this.level = level;
        this.message = message;
    }

    public String getLevel() { return level; }
    public String getMessage() { return message; }

    @Override
    public String toString() {
        return String.format("SystemEvent[id=%s, level=%s, message=%s]",
            getEventId(), level, message);
    }
}

// ============= Event Handlers =============

class UserActivityLogger implements EventHandler<UserEvent> {
    @Override
    public void handle(UserEvent event) {
        System.out.println("→ UserActivityLogger: Processing UserEvent");
        System.out.println("  User: " + event.getUsername());
        System.out.println("  Action: " + event.getAction());
        System.out.println("  Status: Logged ✓");
    }

    @Override
    public String getHandlerName() {
        return "UserActivityLogger";
    }
}

class OrderProcessingHandler implements EventHandler<OrderEvent> {
    @Override
    public void handle(OrderEvent event) {
        System.out.println("→ OrderProcessingHandler: Processing OrderEvent");
        System.out.println("  Order ID: " + event.getOrderId());
        System.out.println("  Amount: $" + String.format("%.2f", event.getAmount()));
        System.out.println("  Status: Processing started ✓");
    }

    @Override
    public String getHandlerName() {
        return "OrderProcessingHandler";
    }
}

class OrderNotificationHandler implements EventHandler<OrderEvent> {
    @Override
    public void handle(OrderEvent event) {
        System.out.println("→ OrderNotificationHandler: Processing OrderEvent");
        System.out.println("  Order ID: " + event.getOrderId());
        System.out.println("  Notification sent to customer ✓");
    }

    @Override
    public String getHandlerName() {
        return "OrderNotificationHandler";
    }
}

class SystemMonitor implements EventHandler<SystemEvent> {
    @Override
    public void handle(SystemEvent event) {
        System.out.println("→ SystemMonitor: Processing SystemEvent");
        System.out.println("  Level: " + event.getLevel());
        System.out.println("  Message: " + event.getMessage());
        System.out.println("  Action: Alert triggered ✓");
    }

    @Override
    public String getHandlerName() {
        return "SystemMonitor";
    }
}

// ============= Event Publisher =============

class EventPublisher {
    // Map storing handlers for each event type
    private final Map<Class<? extends Event>, List<EventHandler<? extends Event>>> handlers;
    private final List<Event> eventHistory;

    public EventPublisher() {
        this.handlers = new HashMap<>();
        this.eventHistory = new ArrayList<>();
    }

    // Generic method to register handler with type safety
    public <E extends Event> void registerHandler(
            Class<E> eventType,
            EventHandler<E> handler) {

        handlers.computeIfAbsent(eventType, k -> new ArrayList<>()).add(handler);
        System.out.println("✓ Registered " + eventType.getSimpleName() +
            " handler: " + handler.getHandlerName());
    }

    // Publish event to all matching handlers
    @SuppressWarnings("unchecked")
    public <E extends Event> void publish(E event) {
        eventHistory.add(event);

        List<EventHandler<? extends Event>> eventHandlers = handlers.get(event.getClass());
        if (eventHandlers == null || eventHandlers.isEmpty()) {
            System.out.println("No handlers registered for " + event.getClass().getSimpleName());
            return;
        }

        System.out.println("\nDispatching to handlers...");
        for (EventHandler<? extends Event> handler : eventHandlers) {
            // Safe cast because we know the handler matches the event type
            ((EventHandler<E>) handler).handle(event);
            System.out.println();
        }

        System.out.println("Handlers notified: " + eventHandlers.size());
    }

    // Generic method to get events by type
    public <E extends Event> List<E> getEventsByType(Class<E> eventType) {
        List<E> filtered = new ArrayList<>();
        for (Event event : eventHistory) {
            if (eventType.isInstance(event)) {
                filtered.add(eventType.cast(event));
            }
        }
        return filtered;
    }

    public int getHandlerCount() {
        int total = 0;
        for (List<EventHandler<? extends Event>> handlerList : handlers.values()) {
            total += handlerList.size();
        }
        return total;
    }

    // PECS demonstration: Producer Extends, Consumer Super
    public static <E extends Event> void copyEvents(
            List<? extends E> source,    // Producer (extends)
            List<? super E> destination) { // Consumer (super)

        System.out.println("\nCopying events using PECS:");
        System.out.println("Source (? extends " + source.getClass().getSimpleName() + "): Can read " +
            (source.isEmpty() ? "N/A" : source.get(0).getClass().getSimpleName()));
        System.out.println("Destination (? super E): Can write events");

        System.out.println("\nCopy operation:");
        for (E event : source) {  // Can read from producer
            destination.add(event);  // Can write to consumer
            System.out.println("→ Copied: " + event.getClass().getSimpleName() +
                "[id=" + event.getEventId() + "]");
        }

        System.out.println("\nResult: " + source.size() + " events copied successfully");
        System.out.println("Producer Extends, Consumer Super = PECS");
    }

    public List<Event> getEventHistory() {
        return new ArrayList<>(eventHistory);
    }
}

// ============= Generic Event Logger =============

class EventLogger<E extends Event> {
    private final List<E> log;
    private final String loggerName;

    public EventLogger(String loggerName) {
        this.log = new ArrayList<>();
        this.loggerName = loggerName;
    }

    public void logEvent(E event) {
        log.add(event);
    }

    public List<E> getLog() {
        return new ArrayList<>(log);
    }

    public void printLog() {
        System.out.println("\n=== " + loggerName + " Log ===");
        int index = 1;
        for (E event : log) {
            System.out.println(index++ + ". " + event);
        }
    }
}

// ============= Demo Application =============

public class TestEventManagement {
    public static void main(String[] args) {
        System.out.println("=== Event Management System ===\n");

        EventPublisher publisher = new EventPublisher();

        // Register handlers
        System.out.println("Registering Event Handlers:");
        publisher.registerHandler(UserEvent.class, new UserActivityLogger());
        publisher.registerHandler(OrderEvent.class, new OrderProcessingHandler());
        publisher.registerHandler(OrderEvent.class, new OrderNotificationHandler());
        publisher.registerHandler(SystemEvent.class, new SystemMonitor());

        System.out.println("\nTotal handlers registered: " + publisher.getHandlerCount());

        // Publish UserEvent
        System.out.println("\n=== Publishing UserEvent ===");
        UserEvent userEvent = new UserEvent("EVT-001", "Alice", "LOGIN");
        System.out.println("\nEvent: " + userEvent);
        System.out.println("Timestamp: " + userEvent.getTimestamp().format(
            DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss")));
        publisher.publish(userEvent);

        // Publish OrderEvent
        System.out.println("\n=== Publishing OrderEvent ===");
        OrderEvent orderEvent = new OrderEvent("EVT-002", "ORD-123", 299.99);
        System.out.println("\nEvent: " + orderEvent);
        System.out.println("Timestamp: " + orderEvent.getTimestamp().format(
            DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss")));
        publisher.publish(orderEvent);

        // Publish SystemEvent
        System.out.println("\n=== Publishing SystemEvent ===");
        SystemEvent systemEvent = new SystemEvent("EVT-003", "WARNING", "High memory usage");
        System.out.println("\nEvent: " + systemEvent);
        System.out.println("Timestamp: " + systemEvent.getTimestamp().format(
            DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss")));
        publisher.publish(systemEvent);

        // Filter events by type
        System.out.println("\n=== Filtering Events ===");

        System.out.println("\nEvents of type UserEvent:");
        List<UserEvent> userEvents = publisher.getEventsByType(UserEvent.class);
        int index = 1;
        for (UserEvent e : userEvents) {
            System.out.println(index++ + ". " + e + " at " + e.getFormattedTimestamp());
        }

        System.out.println("\nEvents of type OrderEvent:");
        List<OrderEvent> orderEvents = publisher.getEventsByType(OrderEvent.class);
        index = 1;
        for (OrderEvent e : orderEvents) {
            System.out.println(index++ + ". " + e + " at " + e.getFormattedTimestamp());
        }

        System.out.println("\nEvents of type SystemEvent:");
        List<SystemEvent> systemEvents = publisher.getEventsByType(SystemEvent.class);
        index = 1;
        for (SystemEvent e : systemEvents) {
            System.out.println(index++ + ". " + e + " at " + e.getFormattedTimestamp());
        }

        // PECS demonstration
        System.out.println("\n=== PECS Principle Demo ===");

        System.out.println("\nSource: OrderEvent collection (Producer)");
        System.out.println("Destination: Event collection (Consumer)");

        List<OrderEvent> sourceOrders = new ArrayList<>();
        sourceOrders.add(new OrderEvent("ORD-123", "ORD-123", 100.0));
        sourceOrders.add(new OrderEvent("ORD-124", "ORD-124", 200.0));
        sourceOrders.add(new OrderEvent("ORD-125", "ORD-125", 300.0));

        List<Event> destinationEvents = new ArrayList<>();

        EventPublisher.copyEvents(sourceOrders, destinationEvents);
    }
}
```

**💡 Tips:**
- Bounded type parameter `<E extends Event>` ensures handlers only process Event subtypes - compile-time type safety
- EventHandler<E extends Event> generic interface enables type-safe handler registration per event type
- Multiple handlers for same event type demonstrate one-to-many event distribution pattern
- Map<Class, List<EventHandler>> stores handlers by event type - runtime dispatch with type safety
- PECS principle: `<? extends E>` reads from source (Producer), `<? super E>` writes to destination (Consumer)
- Upper bounded wildcard `<? extends Event>` allows reading any Event subtype from collections
- Lower bounded wildcard `<? super Event>` allows writing Events to collections accepting Event or supertypes
- Generic method `<E extends Event> void publish(E event)` maintains specific event type through method
- Type casting `(EventHandler<E>) handler` safe because handler registered with matching event type
- computeIfAbsent creates handler lists lazily - cleaner than manual null checking
- EventLogger<E> generic class enables creating specialized loggers: EventLogger<UserEvent>, EventLogger<OrderEvent>
- getEventsByType<E> uses Class<E> parameter and isInstance() for type-safe filtering despite type erasure
- Event history with List<Event> demonstrates storing mixed event types in generic collection
- Multiple event handlers for OrderEvent show flexibility - processing and notification separate concerns
- toString() methods provide consistent event representation across hierarchy

---

### Exercise 5: Generic Data Processing Pipeline with Type-Safe Transformations

**📝 Problem Statement:**
Create an advanced data processing pipeline demonstrating generic method chaining, type-safe transformations, wildcard usage for flexible input/output, function composition with generics, and practical application of generics in building fluent APIs for data transformation. The system should support chaining operations (map, filter, reduce), maintain type safety through transformation chain, demonstrate PECS for flexible data flow, show variance in generic types, and build a real-world ETL (Extract, Transform, Load) pipeline using generics.

**Requirements:**
- Create Pipeline<T> generic class representing data processing pipeline with source data type T
- Implement fluent API with method chaining:
  - `<R> Pipeline<R> map(Function<T, R> mapper)` transforming elements to new type
  - `filter(Predicate<T> predicate)` filtering elements
  - `<R> R reduce(R identity, BiFunction<R, T, R> accumulator)` reducing to single value
  - `<R> Pipeline<R> flatMap(Function<T, List<R>> mapper)` flattening nested structures
  - `sorted(Comparator<T> comparator)` sorting elements
- Demonstrate type preservation: Pipeline<String> → map(String::length) → Pipeline<Integer>
- Implement generic Transformer<I, O> interface for input type I to output type O conversion
- Create ETL pipeline example:
  - Extract: Read CSV-like data as List<String[]>
  - Transform: Parse to List<Customer> with type safety
  - Load: Save to List<CustomerDTO> with mapping
- Show bounded wildcard usage in aggregate methods accepting Pipeline<? extends Number>
- Implement generic Builder pattern for pipeline configuration
- Demonstrate covariance with wildcards: pipeline producing `<? extends T>`
- Show contravariance: pipeline consuming `<? super T>`
- Variance example: Pipeline<Dog> fits where Pipeline<? extends Animal> expected
- Generic exception handling in pipeline with Result<T, E> monad pattern

**Sample Test Cases:**
```
Input: Create string processing pipeline
Expected Output:
=== Data Processing Pipeline ===

Source Data: ["apple", "banana", "cherry", "date"]

Pipeline Operations:
1. Filter: length > 4
2. Map: String → String (uppercase)
3. Map: String → Integer (get length)
4. Reduce: sum lengths

Executing Pipeline:
→ Filter: "apple" (length=5) ✓ PASS
→ Filter: "banana" (length=6) ✓ PASS
→ Filter: "cherry" (length=6) ✓ PASS
→ Filter: "date" (length=4) ✗ FILTERED

After Filter: ["apple", "banana", "cherry"]

→ Map to uppercase: "apple" → "APPLE"
→ Map to uppercase: "banana" → "BANANA"
→ Map to uppercase: "cherry" → "CHERRY"

After Map: ["APPLE", "BANANA", "CHERRY"]

→ Map to length: "APPLE" → 5
→ Map to length: "BANANA" → 6
→ Map to length: "CHERRY" → 6

After Map: [5, 6, 6]

→ Reduce: sum = 0 + 5 = 5
→ Reduce: sum = 5 + 6 = 11
→ Reduce: sum = 11 + 6 = 17

Result: 17

Input: Create number processing pipeline
Expected Output:
=== Number Processing Pipeline ===

Source Data: [10, 25, 15, 30, 20, 5]

Pipeline Operations:
1. Filter: num > 10
2. Map: Integer → Integer (multiply by 2)
3. Sorted: ascending order
4. Reduce: sum

Executing Pipeline:
After Filter: [25, 15, 30, 20]
After Map: [50, 30, 60, 40]
After Sort: [30, 40, 50, 60]
Reduce Result: 180

Input: Create Customer ETL pipeline
Expected Output:
=== Customer ETL Pipeline ===

Extract Phase:
Reading CSV data...
✓ Extracted 3 records

Raw Data:
1. ["C001", "Alice", "alice@email.com", "100.50"]
2. ["C002", "Bob", "bob@email.com", "250.75"]
3. ["C003", "Charlie", "charlie@email.com", "175.25"]

Transform Phase:
Parsing CSV → Customer objects...
→ Transformed: Customer[id=C001, name=Alice, email=alice@email.com, balance=100.50]
→ Transformed: Customer[id=C002, name=Bob, email=bob@email.com, balance=250.75]
→ Transformed: Customer[id=C003, name=Charlie, email=charlie@email.com, balance=175.25]

✓ Transformed 3 customers

Filter Phase:
Applying filter: balance >= 150.00
→ Bob (balance=250.75) ✓ PASS
→ Charlie (balance=175.25) ✓ PASS

After Filter: 2 customers

Map Phase:
Customer → CustomerDTO transformation
→ Mapped: CustomerDTO[id=C002, name=Bob, premium=true]
→ Mapped: CustomerDTO[id=C003, name=Charlie, premium=true]

Load Phase:
Saving CustomerDTO objects...
✓ Loaded 2 premium customers

Final Result: [CustomerDTO[C002, Bob], CustomerDTO[C003, Charlie]]

Input: Demonstrate variance with wildcards
Expected Output:
=== Variance Demonstration ===

Producer (covariance): List<? extends Number>
Can accept:
  - List<Integer> ✓
  - List<Double> ✓
  - List<Number> ✓

Consumer (contravariance): List<? super Integer>
Can accept:
  - List<Integer> ✓
  - List<Number> ✓
  - List<Object> ✓

Pipeline Variance:
Source: Pipeline<Integer>
Can be assigned to: Pipeline<? extends Number> ✓
Can be processed by methods accepting: Pipeline<? extends Number>
```

**Solution:**
```java
import java.util.*;
import java.util.function.*;
import java.util.stream.Collectors;

// ============= Pipeline Generic Class =============

class Pipeline<T> {
    private final List<T> data;

    public Pipeline(List<T> data) {
        this.data = new ArrayList<>(data);
    }

    // Transform elements to new type - demonstrates type parameter change
    public <R> Pipeline<R> map(Function<T, R> mapper) {
        List<R> transformed = new ArrayList<>();
        for (T element : data) {
            transformed.add(mapper.apply(element));
        }
        return new Pipeline<>(transformed);
    }

    // Filter elements maintaining same type
    public Pipeline<T> filter(Predicate<T> predicate) {
        List<T> filtered = new ArrayList<>();
        for (T element : data) {
            if (predicate.test(element)) {
                filtered.add(element);
            }
        }
        return new Pipeline<>(filtered);
    }

    // Reduce to single value - demonstrates type transformation
    public <R> R reduce(R identity, BiFunction<R, T, R> accumulator) {
        R result = identity;
        for (T element : data) {
            result = accumulator.apply(result, element);
        }
        return result;
    }

    // Flat map - transform and flatten
    public <R> Pipeline<R> flatMap(Function<T, List<R>> mapper) {
        List<R> flattened = new ArrayList<>();
        for (T element : data) {
            flattened.addAll(mapper.apply(element));
        }
        return new Pipeline<>(flattened);
    }

    // Sort elements
    public Pipeline<T> sorted(Comparator<T> comparator) {
        List<T> sorted = new ArrayList<>(data);
        Collections.sort(sorted, comparator);
        return new Pipeline<>(sorted);
    }

    // Get results
    public List<T> collect() {
        return new ArrayList<>(data);
    }

    // Peek for debugging
    public Pipeline<T> peek(Consumer<T> action) {
        for (T element : data) {
            action.accept(element);
        }
        return this;
    }

    public int size() {
        return data.size();
    }
}

// ============= Transformer Interface =============

interface Transformer<I, O> {
    O transform(I input);
}

// ============= ETL Model Classes =============

class Customer {
    private final String id;
    private final String name;
    private final String email;
    private final double balance;

    public Customer(String id, String name, String email, double balance) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.balance = balance;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public double getBalance() { return balance; }

    @Override
    public String toString() {
        return String.format("Customer[id=%s, name=%s, email=%s, balance=%.2f]",
            id, name, email, balance);
    }
}

class CustomerDTO {
    private final String id;
    private final String name;
    private final boolean premium;

    public CustomerDTO(String id, String name, boolean premium) {
        this.id = id;
        this.name = name;
        this.premium = premium;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public boolean isPremium() { return premium; }

    @Override
    public String toString() {
        return String.format("CustomerDTO[id=%s, name=%s, premium=%s]",
            id, name, premium);
    }
}

// ============= CSV Parser Transformer =============

class CustomerParser implements Transformer<String[], Customer> {
    @Override
    public Customer transform(String[] csvRow) {
        return new Customer(
            csvRow[0],
            csvRow[1],
            csvRow[2],
            Double.parseDouble(csvRow[3])
        );
    }
}

class CustomerDTOMapper implements Transformer<Customer, CustomerDTO> {
    @Override
    public CustomerDTO transform(Customer customer) {
        // Premium if balance >= 150
        boolean premium = customer.getBalance() >= 150.0;
        return new CustomerDTO(
            customer.getId(),
            customer.getName(),
            premium
        );
    }
}

// ============= Aggregate Functions =============

class Aggregates {
    // Upper bounded wildcard - can accept any Number subtype
    public static double sum(List<? extends Number> numbers) {
        double total = 0;
        for (Number num : numbers) {
            total += num.doubleValue();
        }
        return total;
    }

    // Lower bounded wildcard - can add Integer to Number or Object lists
    public static void addIntegers(List<? super Integer> list, int count) {
        for (int i = 1; i <= count; i++) {
            list.add(i);
        }
    }
}

// ============= Demo Application =============

public class TestDataPipeline {
    public static void main(String[] args) {
        // Demo 1: String processing pipeline
        System.out.println("=== Data Processing Pipeline ===\n");

        List<String> fruits = Arrays.asList("apple", "banana", "cherry", "date");
        System.out.println("Source Data: " + fruits);

        System.out.println("\nPipeline Operations:");
        System.out.println("1. Filter: length > 4");
        System.out.println("2. Map: String → String (uppercase)");
        System.out.println("3. Map: String → Integer (get length)");
        System.out.println("4. Reduce: sum lengths");

        System.out.println("\nExecuting Pipeline:");
        Pipeline<String> pipeline = new Pipeline<>(fruits);

        // Filter
        pipeline = pipeline.peek(s -> {
            boolean pass = s.length() > 4;
            System.out.println("→ Filter: \"" + s + "\" (length=" + s.length() + ") " +
                (pass ? "✓ PASS" : "✗ FILTERED"));
        }).filter(s -> s.length() > 4);

        System.out.println("\nAfter Filter: " + pipeline.collect());

        // Map to uppercase
        System.out.println();
        Pipeline<String> uppercased = pipeline.peek(s ->
            System.out.println("→ Map to uppercase: \"" + s + "\" → \"" + s.toUpperCase() + "\"")
        ).map(String::toUpperCase);

        System.out.println("\nAfter Map: " + uppercased.collect());

        // Map to lengths
        System.out.println();
        Pipeline<Integer> lengths = uppercased.peek(s ->
            System.out.println("→ Map to length: \"" + s + "\" → " + s.length())
        ).map(String::length);

        System.out.println("\nAfter Map: " + lengths.collect());

        // Reduce
        System.out.println();
        int sum = lengths.peek(len ->
            System.out.println("→ Reduce: accumulating " + len)
        ).reduce(0, (acc, len) -> {
            int newAcc = acc + len;
            System.out.println("→ Reduce: sum = " + acc + " + " + len + " = " + newAcc);
            return newAcc;
        });

        System.out.println("\nResult: " + sum);

        // Demo 2: Number processing
        System.out.println("\n=== Number Processing Pipeline ===\n");

        List<Integer> numbers = Arrays.asList(10, 25, 15, 30, 20, 5);
        System.out.println("Source Data: " + numbers);

        System.out.println("\nPipeline Operations:");
        System.out.println("1. Filter: num > 10");
        System.out.println("2. Map: Integer → Integer (multiply by 2)");
        System.out.println("3. Sorted: ascending order");
        System.out.println("4. Reduce: sum");

        System.out.println("\nExecuting Pipeline:");
        Pipeline<Integer> numPipeline = new Pipeline<>(numbers)
            .filter(n -> n > 10);
        System.out.println("After Filter: " + numPipeline.collect());

        numPipeline = numPipeline.map(n -> n * 2);
        System.out.println("After Map: " + numPipeline.collect());

        numPipeline = numPipeline.sorted(Integer::compareTo);
        System.out.println("After Sort: " + numPipeline.collect());

        int result = numPipeline.reduce(0, Integer::sum);
        System.out.println("Reduce Result: " + result);

        // Demo 3: ETL Pipeline
        System.out.println("\n=== Customer ETL Pipeline ===");

        // Extract
        System.out.println("\nExtract Phase:");
        System.out.println("Reading CSV data...");
        List<String[]> csvData = Arrays.asList(
            new String[]{"C001", "Alice", "alice@email.com", "100.50"},
            new String[]{"C002", "Bob", "bob@email.com", "250.75"},
            new String[]{"C003", "Charlie", "charlie@email.com", "175.25"}
        );
        System.out.println("✓ Extracted " + csvData.size() + " records");

        System.out.println("\nRaw Data:");
        int index = 1;
        for (String[] row : csvData) {
            System.out.println(index++ + ". " + Arrays.toString(row));
        }

        // Transform
        System.out.println("\nTransform Phase:");
        System.out.println("Parsing CSV → Customer objects...");
        CustomerParser parser = new CustomerParser();
        Pipeline<Customer> customers = new Pipeline<>(csvData)
            .peek(row -> System.out.println("→ Transforming: " + Arrays.toString(row)))
            .map(parser::transform)
            .peek(customer -> System.out.println("→ Transformed: " + customer));

        System.out.println("\n✓ Transformed " + customers.size() + " customers");

        // Filter
        System.out.println("\nFilter Phase:");
        System.out.println("Applying filter: balance >= 150.00");
        customers = customers.peek(c -> {
            boolean pass = c.getBalance() >= 150.0;
            System.out.println("→ " + c.getName() + " (balance=" +
                String.format("%.2f", c.getBalance()) + ") " +
                (pass ? "✓ PASS" : "✗ FILTERED"));
        }).filter(c -> c.getBalance() >= 150.0);

        System.out.println("\nAfter Filter: " + customers.size() + " customers");

        // Map to DTO
        System.out.println("\nMap Phase:");
        System.out.println("Customer → CustomerDTO transformation");
        CustomerDTOMapper dtoMapper = new CustomerDTOMapper();
        Pipeline<CustomerDTO> dtos = customers
            .peek(c -> System.out.println("→ Mapping: " + c.getName()))
            .map(dtoMapper::transform)
            .peek(dto -> System.out.println("→ Mapped: " + dto));

        // Load
        System.out.println("\nLoad Phase:");
        System.out.println("Saving CustomerDTO objects...");
        List<CustomerDTO> finalResult = dtos.collect();
        System.out.println("✓ Loaded " + finalResult.size() + " premium customers");

        System.out.println("\nFinal Result: " + finalResult);

        // Demo 4: Variance
        System.out.println("\n=== Variance Demonstration ===");

        System.out.println("\nProducer (covariance): List<? extends Number>");
        System.out.println("Can accept:");
        System.out.println("  - List<Integer> ✓");
        System.out.println("  - List<Double> ✓");
        System.out.println("  - List<Number> ✓");

        List<Integer> ints = Arrays.asList(1, 2, 3);
        List<Double> doubles = Arrays.asList(1.5, 2.5, 3.5);

        System.out.println("\nSum of integers: " + Aggregates.sum(ints));
        System.out.println("Sum of doubles: " + Aggregates.sum(doubles));

        System.out.println("\nConsumer (contravariance): List<? super Integer>");
        System.out.println("Can accept:");
        System.out.println("  - List<Integer> ✓");
        System.out.println("  - List<Number> ✓");
        System.out.println("  - List<Object> ✓");

        List<Number> numList = new ArrayList<>();
        Aggregates.addIntegers(numList, 3);
        System.out.println("\nAdded to List<Number>: " + numList);

        System.out.println("\nPipeline Variance:");
        System.out.println("Source: Pipeline<Integer>");
        System.out.println("Can be assigned to: Pipeline<? extends Number> ✓");
        System.out.println("Can be processed by methods accepting: Pipeline<? extends Number>");
    }
}
```

**💡 Tips:**
- Pipeline<T> generic class demonstrates fluent API design with method chaining maintaining type safety
- Generic method `<R> Pipeline<R> map(Function<T, R>)` changes pipeline type: Pipeline<String> → Pipeline<Integer>
- Type parameter R in map() independent from class type parameter T - enables transformation to any type
- Function<T, R> functional interface provides transformation from input type T to output type R
- Predicate<T> maintains same type through filter operation - filters elements but preserves type
- BiFunction<R, T, R> in reduce takes accumulator type R and element type T returning new accumulator R
- Method chaining returns new Pipeline instances preserving immutability - functional programming style
- Transformer<I, O> interface demonstrates generic interface with input/output type parameters
- CustomerParser implements Transformer<String[], Customer> showing concrete types for generic interface
- ETL pipeline demonstrates real-world usage: CSV (String[]) → Customer → CustomerDTO with type safety
- Upper bounded wildcard `<? extends Number>` in sum() accepts List<Integer>, List<Double>, List<Number>
- Lower bounded wildcard `<? super Integer>` in addIntegers() accepts List<Integer>, List<Number>, List<Object>
- PECS principle: sum() reads (Producer Extends), addIntegers() writes (Consumer Super)
- Pipeline variance: Pipeline<Integer> can be used where Pipeline<? extends Number> expected (covariance)
- peek() method enables side effects (logging) without breaking chain - useful for debugging pipelines

---

### Beginner Exercises

#### Exercise 1: Generic Box Class - Type Parameter Basics
**Difficulty:** Beginner
**Objective:** Create your first generic class and understand type parameters.

**Requirements:**
- Create a generic `Box<T>` class with a private field `content` of type T
- Add a `set(T content)` method to store a value
- Add a `get()` method returning T to retrieve the value
- Add an `isEmpty()` method to check if content is null
- Create boxes for different types: String, Integer, Double
- Demonstrate type safety by trying to add wrong type (should not compile)
- Show that no casting is needed when retrieving values

**Expected Outcome:**
```
=== Generic Box Demo ===

Creating String box:
Box<String> stringBox = new Box<>();
Setting value: "Hello"
Getting value: Hello (type: String)
No casting needed!

Creating Integer box:
Box<Integer> intBox = new Box<>();
Setting value: 42
Getting value: 42 (type: Integer)
No casting needed!

Type Safety Demo:
stringBox.set("Valid");  ✓ Compiles
// stringBox.set(123);  ✗ Won't compile - type mismatch!

isEmpty check:
Empty box: true
After setting value: false
```

**Hints:**
- Generic class syntax: `public class Box<T> { ... }`
- Use T as the type for fields, parameters, and return types
- Type parameter T is replaced with actual type at compile time
- No casting needed: `String s = stringBox.get();` (not `(String)stringBox.get()`)

---

#### Exercise 2: Generic Pair Class - Multiple Type Parameters
**Difficulty:** Beginner
**Objective:** Work with multiple type parameters in a generic class.

**Requirements:**
- Create a generic `Pair<K, V>` class with two type parameters
- Add fields for `key` of type K and `value` of type V
- Add constructor `Pair(K key, V value)`
- Add `getKey()` and `getValue()` methods
- Add `setKey(K key)` and `setValue(V value)` methods
- Override `toString()` to display as "key = value"
- Create pairs with different type combinations:
  - String key, Integer value
  - Integer key, String value
  - String key, String value
- Demonstrate swapping keys and values

**Expected Outcome:**
```
=== Generic Pair Demo ===

Creating different pair types:
Pair<String, Integer>: name = 25
Pair<Integer, String>: 101 = Alice
Pair<String, String>: country = USA

Multiple type parameters:
K = String, V = Integer
K = Integer, V = String

Modifying pair:
Before: age = 25
After setKey: years = 25
After setValue: years = 30

Type inference (Diamond Operator):
Pair<String, Integer> pair = new Pair<>("score", 95);
No need to repeat types on right side!
```

**Hints:**
- Multiple type parameters: `class Pair<K, V> { ... }`
- Common naming: K for Key, V for Value, T for Type, E for Element
- Diamond operator `<>` infers types from left side (Java 7+)
- Both type parameters can be the same type or different types

---

#### Exercise 3: Generic Method Practice - Array Utilities
**Difficulty:** Easy
**Objective:** Create and use generic methods with type inference.

**Requirements:**
- Create a generic method `<T> void printArray(T[] array)` that prints array elements
- Create `<T> T getFirst(T[] array)` returning first element or null if empty
- Create `<T> T getLast(T[] array)` returning last element
- Create `<T> boolean contains(T[] array, T element)` checking if element exists
- Create `<T> int indexOf(T[] array, T element)` returning index or -1
- Test with Integer[], String[], Double[] arrays
- Demonstrate type inference: compiler infers T from arguments

**Expected Outcome:**
```
=== Generic Method Demo ===

Integer Array: [1, 2, 3, 4, 5]
Printing array:
1 2 3 4 5

First element: 1
Last element: 5
Contains 3? true
Contains 10? false
Index of 3: 2
Index of 10: -1

String Array: ["apple", "banana", "cherry"]
Printing array:
apple banana cherry

First element: apple
Last element: cherry

Type Inference:
printArray(intArray);    → T inferred as Integer
printArray(strArray);    → T inferred as String
No need to specify: <Integer>printArray(intArray)
```

**Hints:**
- Generic method syntax: `public static <T> void methodName(T param)`
- Type parameter `<T>` declared before return type
- Compiler infers T from method arguments automatically
- Use `equals()` for comparison, not `==`

---

#### Exercise 4: Bounded Type Parameters - Number Calculator
**Difficulty:** Easy
**Objective:** Understand bounded type parameters with `extends` keyword.

**Requirements:**
- Create `<T extends Number> double sum(T num1, T num2)` adding two numbers
- Create `<T extends Number> double average(T... numbers)` calculating average
- Create `<T extends Number> T max(T num1, T num2)` returning larger number
- Use `doubleValue()` method available in Number class
- Demonstrate that method only accepts Number or its subclasses
- Try calling with String (should not compile)
- Test with Integer, Double, Float, Long

**Expected Outcome:**
```
=== Bounded Type Parameter Demo ===

Number Calculator (T extends Number):

Sum of integers:
sum(10, 20) = 30.0

Sum of doubles:
sum(10.5, 20.7) = 31.2

Average of integers:
average(10, 20, 30, 40) = 25.0

Max comparison:
max(15, 25) = 25
max(10.5, 8.3) = 10.5

Type Safety:
sum(10, 20)    ✓ Compiles (Integer extends Number)
sum(10.5, 20.7) ✓ Compiles (Double extends Number)
// sum("Hello", "World") ✗ Won't compile (String doesn't extend Number)

Accessing Number methods:
T extends Number allows calling:
- doubleValue()
- intValue()
- floatValue()
```

**Hints:**
- Bounded type: `<T extends Number>` restricts T to Number subclasses
- Can call Number methods: `num.doubleValue()`, `num.intValue()`
- Use `extends` keyword for both classes and interfaces
- Varargs: `T... numbers` accepts variable number of arguments

---

#### Exercise 5: Wildcards Practice - Collection Printer
**Difficulty:** Medium
**Objective:** Understand wildcards (`?`, `? extends`, `? super`) for flexible generic methods.

**Requirements:**
- Create `printList(List<?> list)` accepting any type of list
- Create `sumNumbers(List<? extends Number> list)` accepting Number subtypes
- Create `addIntegers(List<? super Integer> list)` accepting Integer supertypes
- Demonstrate unbounded wildcard `<?>` for read-only operations
- Demonstrate upper bound `<? extends T>` for reading from collection
- Demonstrate lower bound `<? super T>` for writing to collection
- Show PECS principle: Producer Extends, Consumer Super

**Expected Outcome:**
```
=== Wildcard Demo ===

Unbounded Wildcard (List<?>):
printList() can accept any list type:
  List<Integer>: [1, 2, 3]
  List<String>: [A, B, C]
  List<Double>: [1.5, 2.5]

Upper Bounded Wildcard (List<? extends Number>):
sumNumbers() accepts Number and subclasses:
  List<Integer> sum: 6
  List<Double> sum: 4.0
  // Cannot add to list - unknown specific type
  // list.add(10);  ✗ Won't compile

Lower Bounded Wildcard (List<? super Integer>):
addIntegers() accepts Integer and superclasses:
  Adding to List<Integer>: ✓
  Adding to List<Number>: ✓
  Adding to List<Object>: ✓
  // Cannot read as Integer - might be Number or Object
  // Integer num = list.get(0);  ✗ Won't compile (returns Object)

PECS Principle:
Producer Extends: <? extends T> for reading (covariance)
Consumer Super: <? super T> for writing (contravariance)
```

**Hints:**
- Unbounded `<?>`: read as Object, can't add anything except null
- Upper bound `<? extends T>`: read as T, can't add (unknown subtype)
- Lower bound `<? super T>`: add T, read as Object (unknown supertype)
- PECS: Producer (reading) uses extends, Consumer (writing) uses super

---

#### Exercise 6: Generic Stack Implementation - Practical Application
**Difficulty:** Medium
**Objective:** Build a complete generic data structure combining learned concepts.

**Requirements:**
- Create generic `Stack<E>` class using ArrayList<E> internally
- Implement `push(E item)` adding element to top
- Implement `pop()` returning and removing top element (throw exception if empty)
- Implement `peek()` viewing top element without removing
- Add `isEmpty()` and `size()` methods
- Add `clear()` removing all elements
- Create `EmptyStackException` custom exception
- Test with different types: Integer, String, custom objects
- Demonstrate type safety throughout operations

**Expected Outcome:**
```
=== Generic Stack Implementation ===

Stack<Integer> intStack = new Stack<>();

Push operations:
push(10) → Stack: [10]
push(20) → Stack: [10, 20]
push(30) → Stack: [10, 20, 30]
Size: 3

Peek operation:
peek() = 30 (stack unchanged)
Stack: [10, 20, 30]

Pop operations:
pop() = 30 → Stack: [10, 20]
pop() = 20 → Stack: [10]
Size: 1

Stack<String> stringStack = new Stack<>();

Push strings:
push("Java") → Stack: [Java]
push("Generics") → Stack: [Java, Generics]

Type Safety:
String str = stringStack.pop();  → "Generics"
No casting needed!
// intStack.push("Hello");  ✗ Won't compile

Empty stack exception:
Stack<Double> emptyStack = new Stack<>();
emptyStack.pop()  → EmptyStackException: Stack is empty

Custom objects:
Stack<Person> personStack = new Stack<>();
push(Person[name=Alice, age=30])
pop() = Person[name=Alice, age=30]
Generics work with any type!
```

**Hints:**
- Use `ArrayList<E>` for internal storage
- Generic class: `public class Stack<E> { ... }`
- Throw exception instead of returning null for empty stack
- Type parameter E (Element) is convention for collections
- All public methods use E for type safety
- Same Stack class works for any type without code changes

---

## 🎓 Key Takeaways

1. **Generics** provide type safety at compile time
2. **Generic classes** use type parameters (e.g., `<T>`)
3. **Generic methods** can have their own type parameters
4. **Bounded types** restrict type parameters (`extends`, `super`)
5. **Wildcards** provide flexibility (`?`, `? extends`, `? super`)
6. **Type erasure** removes generic type information at runtime

---

## 📝 Summary

Today you learned:
- ✅ Why generics are important for type safety
- ✅ Creating generic classes and methods
- ✅ Using bounded type parameters
- ✅ Working with wildcards
- ✅ Understanding type erasure

**Week 3 Complete!** You've mastered advanced Java concepts including Strings, Packages, Exception Handling, Collections, and Generics.

---

## ⚠️ Common Mistakes

### 1. Generic Class Declaration Mistakes

#### ❌ Wrong - Using Raw Types:
```java
// WRONG - Raw type, no type safety
public class Main {
    public static void main(String[] args) {
        Box box = new Box();  // Raw type - no generic parameter
        box.set("Hello");
        box.set(123);  // Allowed - no type checking!

        String str = (String) box.get();  // Need cast, ClassCastException possible
    }
}

class Box<T> {
    private T content;
    public void set(T content) { this.content = content; }
    public T get() { return content; }
}
```
**Issue:** Raw types bypass generic type checking; lose all type safety benefits

#### ✅ Right:
```java
// CORRECT - Use parameterized type
public class Main {
    public static void main(String[] args) {
        Box<String> box = new Box<>();  // Parameterized type
        box.set("Hello");
        // box.set(123);  // Compilation error - type safety!

        String str = box.get();  // No cast needed
    }
}

class Box<T> {
    private T content;
    public void set(T content) { this.content = content; }
    public T get() { return content; }
}
```

**Why:** Parameterized types provide compile-time type safety; catch errors before runtime.

**💡 Tip:** Never use raw types; always specify type parameter: `Box<String>`, not `Box`.

---

#### ❌ Wrong - Wrong Type Parameter Syntax:
```java
// WRONG - Incorrect generic syntax
public class Container(T) {  // Compilation error! Use angle brackets
    private T value;
}

public class Box[T] {  // Compilation error! Use angle brackets
    private T value;
}

public class Pair<T, V> {  // Should use standard naming
    private T first;
    private V second;
}
```
**Issue:** Wrong bracket type or non-standard naming conventions

#### ✅ Right:
```java
// CORRECT - Proper generic syntax
public class Container<T> {  // Angle brackets
    private T value;
}

public class Box<T> {
    private T value;
}

public class Pair<K, V> {  // Standard naming: K for key, V for value
    private K first;
    private V second;
}

// Standard type parameter names:
// T - Type
// E - Element
// K - Key
// V - Value
// N - Number
```

**Why:** Angle brackets `<>` are required; standard names improve readability.

**💡 Tip:** Use angle brackets `<T>`; follow naming conventions (T, E, K, V, N).

---

#### ❌ Wrong - Multiple Type Parameters Without Separation:
```java
// WRONG - Missing comma between type parameters
public class Triple<A B C> {  // Compilation error!
    private A first;
    private B second;
    private C third;
}
```
**Issue:** Multiple type parameters must be comma-separated

#### ✅ Right:
```java
// CORRECT - Comma-separated type parameters
public class Triple<A, B, C> {
    private A first;
    private B second;
    private C third;

    public Triple(A first, B second, C third) {
        this.first = first;
        this.second = second;
        this.third = third;
    }
}

public class Main {
    public static void main(String[] args) {
        Triple<String, Integer, Double> triple =
            new Triple<>("Hello", 10, 3.14);
    }
}
```

**Why:** Comma separates distinct type parameters in generic declarations.

**💡 Tip:** Always separate multiple type parameters with commas: `<K, V>`, `<A, B, C>`.

---

#### ❌ Wrong - Using Generic Type Parameter for Static Members:
```java
// WRONG - Static field with generic type
public class Box<T> {
    private static T defaultValue;  // Compilation error! Can't use T in static context

    public static T getDefault() {  // Compilation error! Can't use T in static method
        return defaultValue;
    }
}
```
**Issue:** Static members belong to class, not instance; can't use instance type parameter

#### ✅ Right:
```java
// CORRECT - Don't use instance type parameter in static context
public class Box<T> {
    private T value;

    // Static members can't use T
    private static int count = 0;  // OK - concrete type

    public Box(T value) {
        this.value = value;
        count++;
    }

    public static int getCount() {  // OK - doesn't use T
        return count;
    }

    // If you need generic static method, declare its own type parameter
    public static <E> Box<E> create(E value) {
        return new Box<>(value);
    }
}
```

**Why:** Static members shared across all instances; can't depend on instance type.

**💡 Tip:** Static members: use own type parameter `<E>` or concrete type, not class `<T>`.

---

### 2. Generic Method Mistakes

#### ❌ Wrong - Missing Type Parameter Declaration in Generic Method:
```java
// WRONG - Missing <T> before return type
public class Main {
    public static void printArray(T[] array) {  // Compilation error! T not declared
        for (T element : array) {
            System.out.println(element);
        }
    }
}
```
**Issue:** Generic methods must declare type parameters before return type

#### ✅ Right:
```java
// CORRECT - Type parameter declared before return type
public class Main {
    public static <T> void printArray(T[] array) {  // <T> before void
        for (T element : array) {
            System.out.println(element);
        }
    }

    public static <T> T getFirst(T[] array) {  // <T> before return type T
        return array.length > 0 ? array[0] : null;
    }

    public static void main(String[] args) {
        Integer[] nums = {1, 2, 3};
        printArray(nums);
        System.out.println(getFirst(nums));
    }
}
```

**Why:** Type parameter must be declared in method signature: `<T>` before return type.

**💡 Tip:** Generic method syntax: `<T> ReturnType methodName(T param)`.

---

#### ❌ Wrong - Confusing Generic Method with Generic Class Type:
```java
// WRONG - Using class type parameter without declaring in method
public class Container<T> {
    public static void process(T value) {  // Compilation error! Static method can't use T
        System.out.println(value);
    }
}
```
**Issue:** Static methods can't use class-level type parameter `T`

#### ✅ Right:
```java
// CORRECT - Declare method's own type parameter
public class Container<T> {
    // Instance method CAN use class type parameter T
    public void processInstance(T value) {
        System.out.println(value);
    }

    // Static method must declare OWN type parameter
    public static <E> void processStatic(E value) {  // E, not T
        System.out.println(value);
    }
}

public class Main {
    public static void main(String[] args) {
        Container<String> container = new Container<>();
        container.processInstance("Hello");  // Uses class T

        Container.processStatic(123);  // Uses method E
        Container.processStatic("World");  // E inferred
    }
}
```

**Why:** Static methods need own type parameter; instance methods can use class parameter.

**💡 Tip:** Instance method: use class `T`; static method: declare own `<E>`.

---

#### ❌ Wrong - Explicit Type Argument When Not Needed:
```java
// WRONG - Unnecessarily verbose
public class Main {
    public static <T> void print(T value) {
        System.out.println(value);
    }

    public static void main(String[] args) {
        Main.<String>print("Hello");  // Unnecessary - compiler can infer
        Main.<Integer>print(123);     // Unnecessary - compiler can infer
    }
}
```
**Issue:** Explicit type arguments rarely needed; Java infers from arguments

#### ✅ Right:
```java
// CORRECT - Let compiler infer type
public class Main {
    public static <T> void print(T value) {
        System.out.println(value);
    }

    public static void main(String[] args) {
        print("Hello");  // Compiler infers T = String
        print(123);      // Compiler infers T = Integer

        // Only specify when ambiguous or inference fails
        Main.<String>print(null);  // Needed - can't infer from null
    }
}
```

**Why:** Type inference makes code cleaner; explicit types only when needed.

**💡 Tip:** Let compiler infer; specify type only when ambiguous or compiler fails.

---

#### ❌ Wrong - Generic Method Return Type Inference Error:
```java
// WRONG - Compiler can't infer return type
public class Main {
    public static <T> T create() {
        return null;  // What's T?
    }

    public static void main(String[] args) {
        String str = create();  // Compiler error - can't infer T
    }
}
```
**Issue:** Compiler can't infer type from return value assignment alone

#### ✅ Right:
```java
// CORRECT - Provide type explicitly or use parameter to infer
public class Main {
    public static <T> T create() {
        return null;
    }

    public static <T> T createFromClass(Class<T> clazz) {
        try {
            return clazz.newInstance();
        } catch (Exception e) {
            return null;
        }
    }

    public static void main(String[] args) {
        // Option 1: Explicit type argument
        String str1 = Main.<String>create();

        // Option 2: Use parameter for inference
        String str2 = createFromClass(String.class);
    }
}
```

**Why:** Inference needs context from parameters or explicit type argument.

**💡 Tip:** Provide parameter for inference or use explicit type: `<String>create()`.

---

### 3. Type Parameter Instantiation Mistakes

#### ❌ Wrong - Using Primitive Types as Type Arguments:
```java
// WRONG - Primitive types not allowed
public class Main {
    public static void main(String[] args) {
        Box<int> intBox = new Box<>();      // Compilation error!
        List<double> doubleList = new ArrayList<>();  // Compilation error!
        Map<char, boolean> map = new HashMap<>();     // Compilation error!
    }
}
```
**Issue:** Generic type arguments must be reference types, not primitives

#### ✅ Right:
```java
// CORRECT - Use wrapper classes
public class Main {
    public static void main(String[] args) {
        Box<Integer> intBox = new Box<>();        // Integer, not int
        List<Double> doubleList = new ArrayList<>();   // Double, not double
        Map<Character, Boolean> map = new HashMap<>(); // Character, Boolean

        // Autoboxing handles conversion
        intBox.set(10);  // int → Integer (autoboxing)
        int num = intBox.get();  // Integer → int (unboxing)
    }
}

class Box<T> {
    private T value;
    public void set(T value) { this.value = value; }
    public T get() { return value; }
}
```

**Why:** Generics work with objects; primitives aren't objects; use wrappers.

**💡 Tip:** Use wrappers: `Integer`, `Double`, `Character`, `Boolean`, not primitives.

---

#### ❌ Wrong - Trying to Create Instance of Type Parameter:
```java
// WRONG - Can't instantiate type parameter
public class Factory<T> {
    public T create() {
        return new T();  // Compilation error! Can't create T instance
    }
}
```
**Issue:** Type erasure removes T at runtime; can't create instance of unknown type

#### ✅ Right:
```java
// CORRECT - Use Class object or Supplier
import java.util.function.Supplier;

public class Factory<T> {
    private Class<T> clazz;

    // Option 1: Use Class object
    public Factory(Class<T> clazz) {
        this.clazz = clazz;
    }

    public T create() throws Exception {
        return clazz.newInstance();
    }
}

public class FactoryWithSupplier<T> {
    private Supplier<T> supplier;

    // Option 2: Use Supplier (factory function)
    public FactoryWithSupplier(Supplier<T> supplier) {
        this.supplier = supplier;
    }

    public T create() {
        return supplier.get();
    }
}

class Main {
    public static void main(String[] args) throws Exception {
        // Using Class
        Factory<String> factory1 = new Factory<>(String.class);
        String str = factory1.create();

        // Using Supplier
        FactoryWithSupplier<String> factory2 =
            new FactoryWithSupplier<>(() -> new String());
        String str2 = factory2.create();
    }
}
```

**Why:** Type erasure prevents `new T()`; use `Class<T>` or `Supplier<T>` instead.

**💡 Tip:** Pass `Class<T>` object or `Supplier<T>` to create instances of generic type.

---

#### ❌ Wrong - Using instanceof with Generic Type:
```java
// WRONG - Can't use instanceof with generic type
public class Box<T> {
    private T value;

    public boolean isString() {
        return value instanceof T;  // Compilation error!
    }

    public void process(Object obj) {
        if (obj instanceof List<String>) {  // Warning! Unchecked
            // Can't check if List contains Strings
        }
    }
}
```
**Issue:** Type erasure removes generic type info; `instanceof` can't check at runtime

#### ✅ Right:
```java
// CORRECT - Use Class object or check raw type
public class Box<T> {
    private T value;
    private Class<T> clazz;

    public Box(Class<T> clazz) {
        this.clazz = clazz;
    }

    public boolean isOfType() {
        return clazz.isInstance(value);  // Use Class.isInstance()
    }

    public void process(Object obj) {
        if (obj instanceof List) {  // Can check raw type
            List<?> list = (List<?>) obj;  // Safe cast to wildcard
            // Process list
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Box<String> box = new Box<>(String.class);
        box.value = "Hello";
        System.out.println(box.isOfType());  // true
    }
}
```

**Why:** `instanceof` works with `Class<T>` objects; can only check raw types, not parameterized.

**💡 Tip:** Use `Class.isInstance()`; `instanceof` only checks raw type, not type parameter.

---

#### ❌ Wrong - Creating Generic Array:
```java
// WRONG - Can't create generic array
public class Container<T> {
    private T[] array = new T[10];  // Compilation error!

    public T[] createArray(int size) {
        return new T[size];  // Compilation error!
    }
}
```
**Issue:** Type erasure prevents creation of generic arrays

#### ✅ Right:
```java
// CORRECT - Use ArrayList or create Object array with cast
import java.util.*;

public class Container<T> {
    private List<T> list = new ArrayList<>();  // Preferred

    // OR use Object array with unchecked cast
    @SuppressWarnings("unchecked")
    private T[] array = (T[]) new Object[10];  // Unchecked warning

    // OR use Class object
    private T[] typedArray;

    @SuppressWarnings("unchecked")
    public Container(Class<T> clazz, int size) {
        typedArray = (T[]) java.lang.reflect.Array.newInstance(clazz, size);
    }
}

public class Main {
    public static void main(String[] args) {
        // Preferred: Use List
        List<String> list = new ArrayList<>();

        // If array needed: use Class
        Container<String> container = new Container<>(String.class, 10);
    }
}
```

**Why:** Type erasure makes generic arrays unsafe; use `List<T>` or cast with `Class<T>`.

**💡 Tip:** Prefer `List<T>`; if array needed, use `Class<T>` with reflection.

---

### 4. Bounded Type Parameter Mistakes

#### ❌ Wrong - Wrong Bound Syntax:
```java
// WRONG - Using 'implements' instead of 'extends'
public class Container<T implements Comparable<T>> {  // Compilation error!
    private T value;
}

// WRONG - Using 'super' for upper bound
public class Box<T super Number> {  // Compilation error!
    private T value;
}
```
**Issue:** Only `extends` keyword used for bounds; `implements` and `super` not allowed

#### ✅ Right:
```java
// CORRECT - Use 'extends' for both classes and interfaces
public class Container<T extends Comparable<T>> {  // extends for interface
    private T value;

    public boolean isGreater(T other) {
        return value.compareTo(other) > 0;
    }
}

public class Box<T extends Number> {  // extends for class
    private T value;

    public double getDouble() {
        return value.doubleValue();
    }
}

public class Main {
    public static void main(String[] args) {
        Container<String> container = new Container<>();
        Box<Integer> box = new Box<>();
    }
}
```

**Why:** `extends` keyword used for both class and interface bounds in generics.

**💡 Tip:** Always use `extends` for bounds, never `implements` or `super` in type parameters.

---

#### ❌ Wrong - Multiple Bounds in Wrong Order:
```java
// WRONG - Interface before class
public class Container<T extends Comparable<T> & Number> {  // Compilation error!
    private T value;
}
```
**Issue:** When using multiple bounds, class must come first, then interfaces

#### ✅ Right:
```java
// CORRECT - Class first, then interfaces
public class Container<T extends Number & Comparable<T>> {  // Number first
    private T value;

    public double getDouble() {
        return value.doubleValue();  // From Number
    }

    public boolean isGreater(T other) {
        return value.compareTo(other) > 0;  // From Comparable
    }
}

public class Main {
    public static void main(String[] args) {
        Container<Integer> container = new Container<>();
        // Integer extends Number AND implements Comparable
    }
}
```

**Why:** Java syntax requires class bound first, then interface bounds with `&`.

**💡 Tip:** Multiple bounds: class first, then interfaces: `<T extends Class & Interface1 & Interface2>`.

---

#### ❌ Wrong - Confusing Bounded Type Parameter with Wildcard:
```java
// WRONG understanding
public class Main {
    // Student thinks these are the same
    public static <T extends Number> void method1(List<T> list) { }
    public static void method2(List<? extends Number> list) { }
}
```
**Issue:** Bounded type parameter and upper bounded wildcard behave differently

#### ✅ Right:
```java
// CORRECT - Understand the difference
import java.util.*;

public class Main {
    // Bounded type parameter - can read and write T
    public static <T extends Number> void addAndProcess(List<T> list, T value) {
        list.add(value);  // Can write
        T element = list.get(0);  // Can read as T
        System.out.println(element.doubleValue());
    }

    // Upper bounded wildcard - read-only (can't add)
    public static void processOnly(List<? extends Number> list) {
        // list.add(123);  // Compilation error! Can't add
        Number element = list.get(0);  // Can read as Number
        System.out.println(element.doubleValue());
    }

    public static void main(String[] args) {
        List<Integer> ints = new ArrayList<>();
        ints.add(10);

        addAndProcess(ints, 20);  // T = Integer, can add
        processOnly(ints);  // Can't add, only read
    }
}
```

**Why:** `<T extends>` allows reading and writing; `<? extends>` allows only reading.

**💡 Tip:** `<T extends Number>` = read/write; `<? extends Number>` = read-only.

---

#### ❌ Wrong - Using Lower Bound with Type Parameter:
```java
// WRONG - 'super' not allowed with type parameters
public class Container<T super Integer> {  // Compilation error!
    private T value;
}

public static <T super Number> void method(T value) {  // Compilation error!
    System.out.println(value);
}
```
**Issue:** Lower bound (`super`) only works with wildcards, not type parameters

#### ✅ Right:
```java
// CORRECT - Use 'super' only with wildcards
import java.util.*;

public class Main {
    // Upper bound with type parameter - OK
    public static <T extends Number> void method1(T value) {
        System.out.println(value.doubleValue());
    }

    // Lower bound with wildcard - OK
    public static void method2(List<? super Integer> list) {
        list.add(10);  // Can add Integer or subclasses
        list.add(20);
    }

    public static void main(String[] args) {
        method1(10);  // T = Integer

        List<Number> numbers = new ArrayList<>();
        method2(numbers);  // List<? super Integer>
        System.out.println(numbers);  // [10, 20]
    }
}
```

**Why:** Type parameters support only `extends`; wildcards support both `extends` and `super`.

**💡 Tip:** Type parameter: `<T extends>`; Wildcard: `<? extends>` or `<? super>`.

---

### 5. Wildcard Usage Mistakes

#### ❌ Wrong - Using Wildcard When Type Parameter Needed:
```java
// WRONG - Can't relate return type to parameter with wildcard
public class Main {
    public static List<?> copy(List<?> source) {
        List<?> dest = new ArrayList<>();  // Can't add to List<?>
        for (Object obj : source) {
            // dest.add(obj);  // Compilation error! Can't add to List<?>
        }
        return dest;
    }
}
```
**Issue:** Wildcard `?` can't be used to maintain type relationship between parameters

#### ✅ Right:
```java
// CORRECT - Use type parameter when relating types
import java.util.*;

public class Main {
    public static <T> List<T> copy(List<T> source) {  // Use T, not ?
        List<T> dest = new ArrayList<>();
        for (T element : source) {
            dest.add(element);  // Can add T elements
        }
        return dest;
    }

    public static void main(String[] args) {
        List<String> original = Arrays.asList("A", "B", "C");
        List<String> copied = copy(original);  // Type preserved
        System.out.println(copied);
    }
}
```

**Why:** Type parameter `T` maintains type relationship; wildcard `?` doesn't.

**💡 Tip:** Use type parameter `<T>` when relating types; wildcard when just reading.

---

#### ❌ Wrong - Trying to Add to Unbounded Wildcard List:
```java
// WRONG - Can't add to List<?>
public class Main {
    public static void addElement(List<?> list) {
        list.add("Hello");  // Compilation error!
        list.add(123);      // Compilation error!
        list.add(null);     // Only null allowed
    }
}
```
**Issue:** `List<?>` type unknown; can't safely add non-null elements

#### ✅ Right:
```java
// CORRECT - Use type parameter or specific type
import java.util.*;

public class Main {
    // Option 1: Use type parameter
    public static <T> void addElement(List<T> list, T element) {
        list.add(element);  // Can add T elements
    }

    // Option 2: Use specific type
    public static void addString(List<String> list) {
        list.add("Hello");  // Can add Strings
    }

    // Wildcard for read-only operations
    public static void printAll(List<?> list) {
        for (Object obj : list) {  // Can read as Object
            System.out.println(obj);
        }
    }

    public static void main(String[] args) {
        List<String> strings = new ArrayList<>();
        addElement(strings, "Hello");
        addString(strings);
        printAll(strings);
    }
}
```

**Why:** `List<?>` is unknown type; use type parameter or specific type to add elements.

**💡 Tip:** Wildcard `<?>` for read-only; type parameter `<T>` for read/write.

---

#### ❌ Wrong - Not Understanding PECS Principle:
```java
// WRONG - Using wrong wildcard direction
import java.util.*;

public class Main {
    // Wrong: Should be 'extends' for reading
    public static void printNumbers(List<? super Number> list) {
        for (Number num : list) {  // Compilation error! Can only read as Object
            System.out.println(num.doubleValue());
        }
    }

    // Wrong: Should be 'super' for writing
    public static void addIntegers(List<? extends Number> list) {
        list.add(10);  // Compilation error! Can't add to 'extends'
    }
}
```
**Issue:** PECS = Producer Extends, Consumer Super; wrong wildcard direction

#### ✅ Right:
```java
// CORRECT - Follow PECS principle
import java.util.*;

public class Main {
    // Producer (reading): use 'extends'
    public static double sumNumbers(List<? extends Number> list) {
        double sum = 0;
        for (Number num : list) {  // Can read as Number
            sum += num.doubleValue();
        }
        return sum;
    }

    // Consumer (writing): use 'super'
    public static void addIntegers(List<? super Integer> list) {
        list.add(10);  // Can add Integer
        list.add(20);
    }

    public static void main(String[] args) {
        // Producer
        List<Integer> ints = Arrays.asList(1, 2, 3);
        System.out.println("Sum: " + sumNumbers(ints));

        // Consumer
        List<Number> numbers = new ArrayList<>();
        addIntegers(numbers);
        System.out.println(numbers);
    }
}
```

**Why:** PECS = Producer Extends (read from), Consumer Super (write to).

**💡 Tip:** Reading = `<? extends>`; Writing = `<? super>`; PECS principle.

---

#### ❌ Wrong - Using Multiple Wildcards Without Type Parameter:
```java
// WRONG - Can't relate two wildcards
public class Main {
    public static void copy(List<?> source, List<?> dest) {
        for (Object obj : source) {
            // dest.add(obj);  // Compilation error! Can't add Object to List<?>
        }
    }
}
```
**Issue:** Two separate `?` wildcards are unrelated types; can't transfer between them

#### ✅ Right:
```java
// CORRECT - Use type parameter to relate lists
import java.util.*;

public class Main {
    public static <T> void copy(List<T> source, List<T> dest) {
        for (T element : source) {
            dest.add(element);  // T matches both lists
        }
    }

    // Or use PECS for more flexibility
    public static <T> void copyFlexible(
            List<? extends T> source,  // Producer
            List<? super T> dest) {    // Consumer
        for (T element : source) {
            dest.add(element);
        }
    }

    public static void main(String[] args) {
        List<String> source = Arrays.asList("A", "B", "C");
        List<String> dest = new ArrayList<>();

        copy(source, dest);
        System.out.println(dest);

        // Flexible: can copy Integer to Number list
        List<Integer> ints = Arrays.asList(1, 2, 3);
        List<Number> numbers = new ArrayList<>();
        copyFlexible(ints, numbers);
        System.out.println(numbers);
    }
}
```

**Why:** Type parameter relates types; separate wildcards don't.

**💡 Tip:** Use type parameter `<T>` or PECS to relate multiple parameters.

---

### 6. Upper Bounded Wildcard Mistakes

#### ❌ Wrong - Trying to Add to Upper Bounded Wildcard List:
```java
// WRONG - Can't add to List<? extends Number>
public class Main {
    public static void addNumbers(List<? extends Number> list) {
        list.add(10);      // Compilation error!
        list.add(10.5);    // Compilation error!
        list.add(null);    // Only null allowed
    }
}
```
**Issue:** `List<? extends Number>` could be `List<Integer>`, can't safely add `Double`

#### ✅ Right:
```java
// CORRECT - Only read from upper bounded wildcard
import java.util.*;

public class Main {
    // Read-only operations with 'extends'
    public static double sum(List<? extends Number> list) {
        double total = 0;
        for (Number num : list) {  // Can read as Number
            total += num.doubleValue();
        }
        return total;
    }

    // For writing, use type parameter or specific type
    public static <T extends Number> void addNumber(List<T> list, T value) {
        list.add(value);  // Can add T
    }

    public static void main(String[] args) {
        List<Integer> ints = Arrays.asList(1, 2, 3);
        List<Double> doubles = Arrays.asList(1.5, 2.5);

        System.out.println("Sum of ints: " + sum(ints));
        System.out.println("Sum of doubles: " + sum(doubles));

        addNumber(ints, 10);  // T = Integer
    }
}
```

**Why:** `<? extends Number>` could be any Number subtype; can't guarantee safe addition.

**💡 Tip:** `<? extends>` = read-only; use type parameter for writing.

---

#### ❌ Wrong - Confusing Upper Bounded Wildcard with Type Parameter Bound:
```java
// WRONG understanding - thinking these are identical
public class Main {
    // Student thinks method1 and method2 are the same
    public static <T extends Number> void method1(List<T> list) { }
    public static void method2(List<? extends Number> list) { }
}
```
**Issue:** Type parameter bound allows writing; wildcard bound is read-only

#### ✅ Right:
```java
// CORRECT - Understand the difference
import java.util.*;

public class Main {
    // Type parameter - can read and write
    public static <T extends Number> T getAndAdd(List<T> list, T value) {
        list.add(value);  // Can add
        return list.get(0);  // Can get as T
    }

    // Upper bounded wildcard - read-only
    public static Number getOnly(List<? extends Number> list) {
        // list.add(...);  // Compilation error! Can't add
        return list.get(0);  // Can get as Number (not specific type)
    }

    public static void main(String[] args) {
        List<Integer> ints = new ArrayList<>();
        ints.add(5);

        Integer result1 = getAndAdd(ints, 10);  // Returns Integer
        Number result2 = getOnly(ints);  // Returns Number

        System.out.println(result1);  // 5
        System.out.println(result2);  // 5
    }
}
```

**Why:** `<T extends>` maintains type; `<? extends>` loses specific type, read-only.

**💡 Tip:** Need writing or type preservation? Use `<T extends>`. Only reading? Use `<? extends>`.

---

#### ❌ Wrong - Getting Specific Type from Upper Bounded Wildcard:
```java
// WRONG - Trying to get specific type
public class Main {
    public static void process(List<? extends Number> list) {
        Integer num = list.get(0);  // Compilation error! Returns Number, not Integer
    }
}
```
**Issue:** `List<? extends Number>` returns `Number`, not specific subtype

#### ✅ Right:
```java
// CORRECT - Get as Number or use type parameter
import java.util.*;

public class Main {
    // Option 1: Accept Number
    public static void process1(List<? extends Number> list) {
        Number num = list.get(0);  // Returns Number
        System.out.println(num.doubleValue());
    }

    // Option 2: Use type parameter to preserve type
    public static <T extends Number> void process2(List<T> list) {
        T num = list.get(0);  // Returns T
        System.out.println(num.doubleValue());
    }

    public static void main(String[] args) {
        List<Integer> ints = Arrays.asList(1, 2, 3);

        process1(ints);  // Gets Number
        process2(ints);  // Gets Integer (T = Integer)
    }
}
```

**Why:** Wildcard loses specific type; use type parameter to preserve it.

**💡 Tip:** `<? extends Number>` returns `Number`; `<T extends Number>` returns `T`.

---

### 7. Lower Bounded Wildcard Mistakes

#### ❌ Wrong - Trying to Read Specific Type from Lower Bounded Wildcard:
```java
// WRONG - Can only read as Object
public class Main {
    public static void process(List<? super Integer> list) {
        Integer num = list.get(0);  // Compilation error! Returns Object
        Number num2 = list.get(0);  // Compilation error! Returns Object
    }
}
```
**Issue:** `List<? super Integer>` returns `Object`, not `Integer` or `Number`

#### ✅ Right:
```java
// CORRECT - Read as Object or use for writing
import java.util.*;

public class Main {
    // Lower bound for writing
    public static void addIntegers(List<? super Integer> list) {
        list.add(10);  // Can add Integer
        list.add(20);
        list.add(30);

        Object obj = list.get(0);  // Can only read as Object
        System.out.println(obj);
    }

    // For reading with type, use upper bound or type parameter
    public static void readIntegers(List<? extends Integer> list) {
        Integer num = list.get(0);  // Can read as Integer
        System.out.println(num);
    }

    public static void main(String[] args) {
        List<Number> numbers = new ArrayList<>();
        addIntegers(numbers);  // Can add to List<Number>
        System.out.println(numbers);  // [10, 20, 30]
    }
}
```

**Why:** `<? super Integer>` guarantees safe writing, not type-safe reading.

**💡 Tip:** `<? super Integer>` = write Integer, read only Object; for reading use `<? extends>`.

---

#### ❌ Wrong - Using Lower Bound When Upper Bound Needed:
```java
// WRONG - Using 'super' for reading
public class Main {
    public static double sumNumbers(List<? super Integer> list) {
        double sum = 0;
        for (Number num : list) {  // Compilation error! Can only iterate as Object
            sum += num.doubleValue();
        }
        return sum;
    }
}
```
**Issue:** Lower bound for writing; upper bound for reading

#### ✅ Right:
```java
// CORRECT - Use upper bound for reading
import java.util.*;

public class Main {
    // Reading: use upper bound
    public static double sumNumbers(List<? extends Number> list) {
        double sum = 0;
        for (Number num : list) {  // Can read as Number
            sum += num.doubleValue();
        }
        return sum;
    }

    // Writing: use lower bound
    public static void fillWithIntegers(List<? super Integer> list, int count) {
        for (int i = 0; i < count; i++) {
            list.add(i);  // Can add Integer
        }
    }

    public static void main(String[] args) {
        List<Integer> ints = Arrays.asList(1, 2, 3);
        System.out.println("Sum: " + sumNumbers(ints));

        List<Number> numbers = new ArrayList<>();
        fillWithIntegers(numbers, 5);
        System.out.println(numbers);  // [0, 1, 2, 3, 4]
    }
}
```

**Why:** PECS: Producer (reading) uses extends; Consumer (writing) uses super.

**💡 Tip:** Reading data? `<? extends>`. Writing data? `<? super>`.

---

#### ❌ Wrong - Confusion About Lower Bound Flexibility:
```java
// WRONG understanding
public class Main {
    public static void process(List<? super Integer> list) {
        // Student thinks: can only pass List<Integer>
    }

    public static void main(String[] args) {
        List<Integer> ints = new ArrayList<>();
        process(ints);  // Actually, this works

        // But student doesn't realize these also work:
        List<Number> numbers = new ArrayList<>();
        // process(numbers);  // Works! Number is super of Integer

        List<Object> objects = new ArrayList<>();
        // process(objects);  // Works! Object is super of Integer
    }
}
```
**Issue:** Not understanding lower bound accepts type and all supertypes

#### ✅ Right:
```java
// CORRECT - Understand lower bound flexibility
import java.util.*;

public class Main {
    // Lower bound: accepts Integer and all supertypes
    public static void addIntegers(List<? super Integer> list) {
        list.add(10);  // Can safely add Integer
    }

    public static void main(String[] args) {
        // All valid - Integer, Number, Object are super types
        List<Integer> ints = new ArrayList<>();
        addIntegers(ints);  // Integer

        List<Number> numbers = new ArrayList<>();
        addIntegers(numbers);  // Number super Integer

        List<Object> objects = new ArrayList<>();
        addIntegers(objects);  // Object super Number super Integer

        System.out.println(ints);     // [10]
        System.out.println(numbers);  // [10]
        System.out.println(objects);  // [10]
    }
}
```

**Why:** `<? super Integer>` means Integer or any supertype (Number, Object).

**💡 Tip:** `<? super Integer>` accepts `List<Integer>`, `List<Number>`, `List<Object>`.

---

### 8. Type Erasure Issues

#### ❌ Wrong - Expecting Generic Type Info at Runtime:
```java
// WRONG - Type info not available at runtime
public class Box<T> {
    public void printType() {
        System.out.println(T.class.getName());  // Compilation error!
    }

    public boolean isType(Object obj) {
        return obj instanceof T;  // Compilation error!
    }
}
```
**Issue:** Type erasure removes generic type information at runtime

#### ✅ Right:
```java
// CORRECT - Pass Class object for runtime type info
public class Box<T> {
    private Class<T> type;

    public Box(Class<T> type) {
        this.type = type;
    }

    public void printType() {
        System.out.println(type.getName());  // Works
    }

    public boolean isType(Object obj) {
        return type.isInstance(obj);  // Works
    }
}

public class Main {
    public static void main(String[] args) {
        Box<String> box = new Box<>(String.class);
        box.printType();  // java.lang.String
        System.out.println(box.isType("Hello"));  // true
        System.out.println(box.isType(123));  // false
    }
}
```

**Why:** Type erasure removes T at runtime; pass `Class<T>` for runtime type checks.

**💡 Tip:** For runtime type info, pass and store `Class<T>` object.

---

#### ❌ Wrong - Overloading Based on Generic Type:
```java
// WRONG - Can't overload by generic type
public class Main {
    public void process(List<String> list) {  // Erasure: List
        System.out.println("String list");
    }

    public void process(List<Integer> list) {  // Compilation error! Same erasure: List
        System.out.println("Integer list");
    }
}
```
**Issue:** Type erasure makes both methods have same signature after compilation

#### ✅ Right:
```java
// CORRECT - Use different method names or parameters
import java.util.*;

public class Main {
    // Option 1: Different method names
    public void processStrings(List<String> list) {
        for (String s : list) {
            System.out.println(s.toUpperCase());
        }
    }

    public void processIntegers(List<Integer> list) {
        for (int i : list) {
            System.out.println(i * 2);
        }
    }

    // Option 2: Add distinguishing parameter
    public void process(List<String> list, String dummy) {
        processStrings(list);
    }

    public void process(List<Integer> list, Integer dummy) {
        processIntegers(list);
    }

    public static void main(String[] args) {
        Main m = new Main();
        m.processStrings(Arrays.asList("a", "b"));
        m.processIntegers(Arrays.asList(1, 2));
    }
}
```

**Why:** Type erasure removes generic types; methods have same signature.

**💡 Tip:** Can't overload by generic type; use different names or additional parameters.

---

#### ❌ Wrong - Creating Generic Array Due to Type Erasure:
```java
// WRONG - Generic array creation issues
public class Main {
    public static <T> T[] createArray(int size) {
        return new T[size];  // Compilation error!
    }

    public static void main(String[] args) {
        // Also problematic
        List<String>[] array = new List<String>[10];  // Generic array creation warning
    }
}
```
**Issue:** Type erasure prevents safe generic array creation

#### ✅ Right:
```java
// CORRECT - Use ArrayList or Object array with cast
import java.util.*;

public class Main {
    // Option 1: Use List instead of array
    public static <T> List<T> createList(int size) {
        return new ArrayList<>(size);
    }

    // Option 2: Use Class object
    @SuppressWarnings("unchecked")
    public static <T> T[] createArray(Class<T> clazz, int size) {
        return (T[]) java.lang.reflect.Array.newInstance(clazz, size);
    }

    // Option 3: Use ArrayList of Lists (not array of Lists)
    public static <T> List<List<T>> createListOfLists(int size) {
        List<List<T>> result = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            result.add(new ArrayList<>());
        }
        return result;
    }

    public static void main(String[] args) {
        List<String> list = createList(10);
        String[] array = createArray(String.class, 10);
        List<List<String>> listOfLists = createListOfLists(5);

        System.out.println("Created successfully");
    }
}
```

**Why:** Type erasure makes generic arrays unsafe; use List or Class object.

**💡 Tip:** Prefer `List<T>` over `T[]`; if array needed, use `Class<T>` with reflection.

---

#### ❌ Wrong - Expecting Bridge Methods to Preserve Generics:
```java
// WRONG - Not understanding bridge methods
class Box<T> {
    private T value;

    public void set(T value) {
        this.value = value;
    }

    public T get() {
        return value;
    }
}

class StringBox extends Box<String> {
    @Override
    public void set(String value) {  // Overrides set(T), not set(String)
        super.set(value.toUpperCase());
    }
}

public class Main {
    public static void main(String[] args) {
        StringBox box = new StringBox();
        box.set("hello");

        // Problem: Bridge method allows type violation
        Box rawBox = box;  // Raw type
        rawBox.set(123);  // Runtime: Integer stored in StringBox!
    }
}
```
**Issue:** Raw types bypass generics; bridge methods preserve method signatures after erasure

#### ✅ Right:
```java
// CORRECT - Avoid raw types; understand bridge methods exist
class Box<T> {
    private T value;

    public void set(T value) {
        this.value = value;
    }

    public T get() {
        return value;
    }
}

class StringBox extends Box<String> {
    @Override
    public void set(String value) {
        super.set(value.toUpperCase());
    }
}

public class Main {
    public static void main(String[] args) {
        StringBox box = new StringBox();
        box.set("hello");

        // Correct: Use parameterized type
        Box<String> genericBox = box;  // Type-safe
        genericBox.set("world");  // OK
        // genericBox.set(123);  // Compilation error - type safety preserved

        System.out.println(box.get());  // WORLD
    }
}
```

**Why:** Raw types bypass generics; compiler generates bridge methods for compatibility.

**💡 Tip:** Never use raw types; bridge methods preserve signatures but not type safety.

---

### 9. Generic Collection Mistakes

#### ❌ Wrong - Mixing Generic and Raw Types:
```java
// WRONG - Mixing generic and raw types (heap pollution)
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> strings = new ArrayList<>();
        strings.add("Hello");

        List raw = strings;  // Raw type reference to generic collection
        raw.add(123);  // No compile error! But heap pollution

        String str = strings.get(1);  // ClassCastException at runtime!
    }
}
```
**Issue:** Raw type bypasses generics; causes heap pollution and runtime errors

#### ✅ Right:
```java
// CORRECT - Always use parameterized types
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> strings = new ArrayList<>();
        strings.add("Hello");

        List<String> strings2 = strings;  // Parameterized type
        // strings2.add(123);  // Compilation error - type safety!

        String str = strings2.get(0);  // Type-safe
        System.out.println(str);
    }

    // If you must work with legacy code, isolate raw types
    @SuppressWarnings("unchecked")
    public static List<String> fromLegacy(List rawList) {
        List<String> typed = new ArrayList<>();
        for (Object obj : rawList) {
            if (obj instanceof String) {
                typed.add((String) obj);
            }
        }
        return typed;
    }
}
```

**Why:** Raw types break type safety; causes heap pollution and runtime errors.

**💡 Tip:** Never mix generic and raw types; always use parameterized types.

---

#### ❌ Wrong - Varargs with Generic Types Without @SafeVarargs:
```java
// WRONG - Generic varargs without @SafeVarargs
import java.util.*;

public class Main {
    // Warning: Possible heap pollution from parameterized vararg type
    public static <T> List<T> asList(T... elements) {
        List<T> list = new ArrayList<>();
        for (T element : elements) {
            list.add(element);
        }
        return list;
    }

    public static void main(String[] args) {
        List<String> list = asList("A", "B", "C");  // Warning
    }
}
```
**Issue:** Generic varargs create arrays internally; can cause heap pollution warnings

#### ✅ Right:
```java
// CORRECT - Use @SafeVarargs or suppress warnings appropriately
import java.util.*;

public class Main {
    // Mark as @SafeVarargs if method doesn't pollute heap
    @SafeVarargs
    public static <T> List<T> asList(T... elements) {
        List<T> list = new ArrayList<>();
        for (T element : elements) {
            list.add(element);
        }
        return list;
    }

    // Only use @SafeVarargs if:
    // 1. Method doesn't store reference to varargs array
    // 2. Method doesn't allow array contents to escape

    public static void main(String[] args) {
        List<String> list = asList("A", "B", "C");  // No warning
        System.out.println(list);
    }
}
```

**Why:** Generic varargs can cause heap pollution; `@SafeVarargs` suppresses warnings when safe.

**💡 Tip:** Use `@SafeVarargs` on generic varargs methods if they don't pollute heap.

---

#### ❌ Wrong - Returning Generic Array from Collection:
```java
// WRONG - Converting to generic array
import java.util.*;

public class Main {
    public static <T> T[] toArray(List<T> list) {
        T[] array = (T[]) new Object[list.size()];  // Creates Object[], not T[]
        for (int i = 0; i < list.size(); i++) {
            array[i] = list.get(i);
        }
        return array;  // ClassCastException when used!
    }

    public static void main(String[] args) {
        List<String> list = Arrays.asList("A", "B", "C");
        String[] array = toArray(list);  // ClassCastException!
    }
}
```
**Issue:** `(T[])` cast on `Object[]` doesn't change runtime type; causes ClassCastException

#### ✅ Right:
```java
// CORRECT - Use Collection.toArray() or reflection
import java.util.*;

public class Main {
    // Option 1: Use Collection.toArray(T[] array)
    public static <T> T[] toArray1(List<T> list, T[] sample) {
        return list.toArray(sample);
    }

    // Option 2: Use reflection
    @SuppressWarnings("unchecked")
    public static <T> T[] toArray2(List<T> list, Class<T> clazz) {
        T[] array = (T[]) java.lang.reflect.Array.newInstance(clazz, list.size());
        return list.toArray(array);
    }

    public static void main(String[] args) {
        List<String> list = Arrays.asList("A", "B", "C");

        // Method 1
        String[] array1 = toArray1(list, new String[0]);
        System.out.println(Arrays.toString(array1));

        // Method 2
        String[] array2 = toArray2(list, String.class);
        System.out.println(Arrays.toString(array2));
    }
}
```

**Why:** Type erasure prevents correct array creation; use `toArray(T[])` or reflection.

**💡 Tip:** Use `list.toArray(new T[0])` or reflection; don't cast `Object[]` to `T[]`.

---

#### ❌ Wrong - Not Using Diamond Operator:
```java
// WRONG - Redundant type specification (pre-Java 7)
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> list = new ArrayList<String>();  // Redundant
        Map<String, List<Integer>> map =
            new HashMap<String, List<Integer>>();  // Redundant and verbose
    }
}
```
**Issue:** Pre-Java 7 syntax; verbose and redundant type specification

#### ✅ Right:
```java
// CORRECT - Use diamond operator (Java 7+)
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();  // Diamond operator
        Map<String, List<Integer>> map = new HashMap<>();  // Clean

        // Compiler infers type from left side
        Set<Map.Entry<String, Integer>> entries = new HashSet<>();

        // Even with nested generics
        List<List<String>> listOfLists = new ArrayList<>();
    }
}
```

**Why:** Diamond operator `<>` lets compiler infer types; cleaner, less redundant.

**💡 Tip:** Use diamond operator `<>` on right side (Java 7+); compiler infers types.

---

### 10. Generic Inheritance and Covariance Mistakes

#### ❌ Wrong - Assuming Generic Types Are Covariant:
```java
// WRONG - Generics are invariant, not covariant
import java.util.*;

public class Main {
    public static void process(List<Number> numbers) {
        numbers.add(new Integer(10));
        numbers.add(new Double(10.5));
    }

    public static void main(String[] args) {
        List<Integer> ints = new ArrayList<>();
        // process(ints);  // Compilation error! List<Integer> is NOT a List<Number>
    }
}
```
**Issue:** `List<Integer>` is not a subtype of `List<Number>`; generics are invariant

#### ✅ Right:
```java
// CORRECT - Use wildcards for variance
import java.util.*;

public class Main {
    // Use wildcard for covariance (reading)
    public static void process(List<? extends Number> numbers) {
        for (Number num : numbers) {  // Can read
            System.out.println(num.doubleValue());
        }
        // numbers.add(new Integer(10));  // Can't add
    }

    // Use wildcard for contravariance (writing)
    public static void addIntegers(List<? super Integer> list) {
        list.add(10);  // Can add Integer
    }

    public static void main(String[] args) {
        List<Integer> ints = new ArrayList<>();
        ints.add(5);

        process(ints);  // Works with wildcard
        addIntegers(ints);  // Works

        System.out.println(ints);  // [5, 10]
    }
}
```

**Why:** Generics invariant; `List<Integer>` ≠ `List<Number>`; use wildcards for variance.

**💡 Tip:** Generics invariant; use `<? extends>` for covariance, `<? super>` for contravariance.

---

#### ❌ Wrong - Arrays vs Generics Covariance Confusion:
```java
// WRONG - Confusing array covariance with generics
public class Main {
    public static void main(String[] args) {
        // Arrays are covariant (compile-time OK, runtime error possible)
        Number[] numbers = new Integer[10];  // Compiles
        numbers[0] = new Double(10.5);  // ArrayStoreException at runtime!

        // Student expects same with generics
        // List<Number> list = new ArrayList<Integer>();  // Compilation error!
    }
}
```
**Issue:** Arrays covariant (runtime checks); generics invariant (compile-time safety)

#### ✅ Right:
```java
// CORRECT - Understand array vs generic covariance
import java.util.*;

public class Main {
    public static void main(String[] args) {
        // Arrays: covariant but runtime checks
        Number[] numbers = new Integer[10];  // OK at compile time
        // numbers[0] = new Double(10.5);  // ArrayStoreException at runtime

        // Generics: invariant but compile-time safety
        // List<Number> list = new ArrayList<Integer>();  // Compilation error - safer!

        // Use wildcards for flexibility
        List<? extends Number> list = new ArrayList<Integer>();  // OK
        // list.add(new Integer(10));  // Compile error - safe!

        // Generics safer than arrays due to compile-time checking
        System.out.println("Generics prevent runtime errors");
    }
}
```

**Why:** Arrays covariant (runtime checks); generics invariant (compile-time safety).

**💡 Tip:** Arrays = covariant, runtime errors; Generics = invariant, compile-time safety.

---

#### ❌ Wrong - Inheriting from Generic Class Without Type Parameter:
```java
// WRONG - Raw type in inheritance
public class StringBox extends Box {  // Raw type - loses type safety
    // ...
}

class Box<T> {
    private T value;
    public void set(T value) { this.value = value; }
    public T get() { return value; }
}

public class Main {
    public static void main(String[] args) {
        StringBox box = new StringBox();
        box.set("Hello");  // Works
        box.set(123);  // Also works - no type safety!
    }
}
```
**Issue:** Extending generic class without type parameter creates raw type

#### ✅ Right:
```java
// CORRECT - Specify type parameter or introduce new one
class Box<T> {
    private T value;
    public void set(T value) { this.value = value; }
    public T get() { return value; }
}

// Option 1: Specify concrete type
class StringBox extends Box<String> {
    // Specialized for String
    @Override
    public void set(String value) {
        super.set(value.toUpperCase());
    }
}

// Option 2: Remain generic
class SpecialBox<T> extends Box<T> {
    // Additional functionality while staying generic
    public void setIfNotNull(T value) {
        if (value != null) {
            set(value);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        StringBox sbox = new StringBox();
        sbox.set("hello");  // Type-safe
        // sbox.set(123);  // Compilation error!

        SpecialBox<Integer> ibox = new SpecialBox<>();
        ibox.setIfNotNull(10);
    }
}
```

**Why:** Specify type parameter when extending generic class for type safety.

**💡 Tip:** Extending generic class: specify type `extends Box<String>` or stay generic `extends Box<T>`.

---

#### ❌ Wrong - Not Understanding Type Parameter Visibility in Nested Classes:
```java
// WRONG - Inner class can't use outer's static type parameter
public class Outer<T> {
    private T value;

    public static class Inner {
        public void process(T value) {  // Compilation error! Can't access T
            System.out.println(value);
        }
    }
}
```
**Issue:** Static nested class can't access outer class's instance type parameter

#### ✅ Right:
```java
// CORRECT - Make inner class generic or non-static
public class Outer<T> {
    private T value;

    // Option 1: Non-static inner class (can access T)
    public class Inner {
        public void process(T value) {  // OK - access to outer T
            Outer.this.value = value;
            System.out.println(value);
        }
    }

    // Option 2: Static inner class with own type parameter
    public static class StaticInner<E> {
        public void process(E value) {  // E, not T
            System.out.println(value);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Outer<String> outer = new Outer<>();
        Outer<String>.Inner inner = outer.new Inner();
        inner.process("Hello");

        Outer.StaticInner<Integer> staticInner = new Outer.StaticInner<>();
        staticInner.process(123);
    }
}
```

**Why:** Static nested class can't access instance type parameter; use non-static or own parameter.

**💡 Tip:** Non-static inner: access outer `T`; static nested: declare own `<E>`.

---

This comprehensive list contains **40+ Generics mistakes** covering all fundamental concepts!

---

## 🔗 What's Next?

Next week (Week 4), we'll learn about:
- File handling and I/O operations
- Java 8 features (Lambda, Streams)
- Date and Time API
- Multithreading basics

---

## 📚 Additional Resources

- [Oracle Generics Tutorial](https://docs.oracle.com/javase/tutorial/java/generics/)
- [Generics in Java](https://www.baeldung.com/java-generics)
- [Understanding Type Erasure](https://www.geeksforgeeks.org/type-erasure-java/)