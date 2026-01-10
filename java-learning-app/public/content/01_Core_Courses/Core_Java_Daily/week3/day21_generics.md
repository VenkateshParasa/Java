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

## 💻 Practice Exercises

### Exercise 1: Generic Stack
```java
import java.util.ArrayList;

public class GenericStack<T> {
    private ArrayList<T> stack;
    
    public GenericStack() {
        stack = new ArrayList<>();
    }
    
    public void push(T item) {
        stack.add(item);
    }
    
    public T pop() {
        if (isEmpty()) {
            throw new RuntimeException("Stack is empty");
        }
        return stack.remove(stack.size() - 1);
    }
    
    public T peek() {
        if (isEmpty()) {
            throw new RuntimeException("Stack is empty");
        }
        return stack.get(stack.size() - 1);
    }
    
    public boolean isEmpty() {
        return stack.isEmpty();
    }
    
    public int size() {
        return stack.size();
    }
    
    public static void main(String[] args) {
        GenericStack<Integer> intStack = new GenericStack<>();
        intStack.push(10);
        intStack.push(20);
        intStack.push(30);
        
        System.out.println("Peek: " + intStack.peek());
        System.out.println("Pop: " + intStack.pop());
        System.out.println("Size: " + intStack.size());
        
        GenericStack<String> strStack = new GenericStack<>();
        strStack.push("A");
        strStack.push("B");
        System.out.println("Pop: " + strStack.pop());
    }
}
```

### Exercise 2: Generic Utility Methods
```java
import java.util.*;

public class GenericUtils {
    // Swap two elements in array
    public static <T> void swap(T[] array, int i, int j) {
        T temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    
    // Find maximum in array
    public static <T extends Comparable<T>> T findMax(T[] array) {
        if (array.length == 0) return null;
        T max = array[0];
        for (T element : array) {
            if (element.compareTo(max) > 0) {
                max = element;
            }
        }
        return max;
    }
    
    // Convert array to list
    public static <T> List<T> arrayToList(T[] array) {
        return new ArrayList<>(Arrays.asList(array));
    }
    
    public static void main(String[] args) {
        Integer[] numbers = {5, 2, 8, 1, 9};
        System.out.println("Original: " + Arrays.toString(numbers));
        
        swap(numbers, 0, 4);
        System.out.println("After swap: " + Arrays.toString(numbers));
        
        System.out.println("Max: " + findMax(numbers));
        
        List<Integer> list = arrayToList(numbers);
        System.out.println("List: " + list);
    }
}
```

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