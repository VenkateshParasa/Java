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