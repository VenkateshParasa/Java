# Day 28: Stream API

**Week 4: Advanced Java Concepts**

---

## 📋 Table of Contents
- [Learning Objectives](#learning-objectives)
- [Topics Covered](#topics-covered)
- [Detailed Content](#detailed-content)
- [Practical Exercises](#practical-exercises)
- [Key Takeaways](#key-takeaways)
- [Additional Resources](#additional-resources)
- [Navigation](#navigation)

---

## 🎯 Learning Objectives

By the end of Day 28, you will be able to:
- Understand what streams are and their benefits
- Create streams from various sources
- Use intermediate operations (filter, map, sorted)
- Use terminal operations (collect, forEach, reduce)
- Work with primitive streams
- Understand parallel streams
- Apply stream operations to solve real problems
- Use collectors effectively
- Understand stream pipeline optimization

---

## 📚 Topics Covered

### 1. Introduction to Streams

A Stream is a sequence of elements supporting sequential and parallel aggregate operations.

#### What is a Stream?

- **Not a data structure**: Doesn't store elements
- **Functional**: Operations produce results without modifying source
- **Lazy**: Computed on demand
- **Possibly unbounded**: Can be infinite
- **Consumable**: Can be traversed only once

---

### 2. Creating Streams

```java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

public class CreateStreams {
    public static void main(String[] args) {
        // From List
        List<String> list = Arrays.asList("A", "B", "C");
        Stream<String> stream1 = list.stream();
        
        // From Array
        String[] array = {"X", "Y", "Z"};
        Stream<String> stream2 = Arrays.stream(array);
        
        // Using Stream.of()
        Stream<String> stream3 = Stream.of("1", "2", "3");
        
        // Infinite stream
        Stream<Integer> stream5 = Stream.iterate(0, n -> n + 1);
        
        // Print first 5 elements
        stream5.limit(5).forEach(System.out::println);
    }
}
```

---

## 💻 Practical Exercises

### Exercise 1: Basic Stream Operations

```java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Exercise1 {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        // Get even numbers, square them
        List<Integer> result = numbers.stream()
            .filter(n -> n % 2 == 0)
            .map(n -> n * n)
            .collect(Collectors.toList());
        
        System.out.println("Even squares: " + result);
    }
}
```

---

## 🔑 Key Takeaways

1. **Streams**: Sequence of elements for functional-style operations
2. **Lazy Evaluation**: Operations executed only when needed
3. **Intermediate Operations**: Return new stream (filter, map, sorted)
4. **Terminal Operations**: Produce result (collect, forEach, reduce)
5. **Parallel Streams**: Process elements in parallel
6. **Collectors**: Powerful way to accumulate stream elements
7. **Primitive Streams**: IntStream, LongStream, DoubleStream
8. **Best Practice**: Use streams for declarative data processing

---

## 📖 Additional Resources

### Official Documentation:
- [Java Stream API](https://docs.oracle.com/javase/8/docs/api/java/util/stream/package-summary.html)
- [Stream Tutorial](https://docs.oracle.com/javase/tutorial/collections/streams/)

---

## 🧭 Navigation

### Week 4 Progress:
- [Day 22: File I/O Basics](day22_file_io.md)
- [Day 23: File Operations & NIO](day23_file_operations.md)
- [Day 24: Serialization](day24_serialization.md)
- [Day 25: Multithreading Basics](day25_multithreading_basics.md)
- [Day 26: Thread Synchronization](day26_thread_synchronization.md)
- [Day 27: Lambda Expressions](day27_lambda_expressions.md)
- **Day 28: Stream API** ← You are here
- [Day 29: Date & Time API](day29_date_time_api.md)
- [Day 30: Final Review & Project](day30_final_review.md)

### Related Resources:
- [📝 Day 28 Assessment](../../../java-learning-app/src/data/assessments/java/week4/day28.js)
- [🏠 Back to Week 4 Overview](README.md)
- [📖 Course Overview](../../Java_Core_Fundamentals_30Day_Course.md)

---

## ✅ Day 28 Checklist

Before moving to Day 29, ensure you can:
- [ ] Create streams from various sources
- [ ] Use filter, map, and other intermediate operations
- [ ] Use collect, reduce, and other terminal operations
- [ ] Work with primitive streams
- [ ] Understand parallel streams
- [ ] Use collectors effectively
- [ ] Build complex stream pipelines
- [ ] Apply streams to real problems

---

## ⚠️ Common Mistakes

### 1. Stream Creation Mistakes

#### ❌ Wrong - Reusing Stream After Consumption:
```java
// WRONG - Stream already consumed
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) {
        Stream<String> stream = Stream.of("A", "B", "C");

        stream.forEach(System.out::println);  // Consumes stream
        stream.forEach(System.out::println);  // IllegalStateException! Stream already consumed
    }
}
```
**Issue:** Streams can only be consumed once; attempting to reuse throws IllegalStateException

#### ✅ Right:
```java
// CORRECT - Create new stream or store source
import java.util.*;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) {
        // Option 1: Create new stream each time
        Stream<String> stream1 = Stream.of("A", "B", "C");
        stream1.forEach(System.out::println);

        Stream<String> stream2 = Stream.of("A", "B", "C");
        stream2.forEach(System.out::println);

        // Option 2: Store source, create streams as needed
        List<String> source = Arrays.asList("A", "B", "C");
        source.stream().forEach(System.out::println);
        source.stream().forEach(System.out::println);  // OK - new stream
    }
}
```

**Why:** Streams are single-use; store source collection and create streams as needed.

**💡 Tip:** Keep original collection to create multiple streams; don't try to reuse consumed streams.

---

#### ❌ Wrong - Creating Parallel Stream for Small Data:
```java
// WRONG - Parallel stream overhead for small data
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);  // Small list

        // Parallel stream overhead exceeds benefit for small data
        int sum = numbers.parallelStream()
            .mapToInt(Integer::intValue)
            .sum();
    }
}
```
**Issue:** Parallel stream has overhead (thread management, splitting); slower for small datasets

#### ✅ Right:
```java
// CORRECT - Use parallel streams for large datasets
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        // Small data - sequential stream
        List<Integer> small = Arrays.asList(1, 2, 3, 4, 5);
        int sum1 = small.stream()
            .mapToInt(Integer::intValue)
            .sum();

        // Large data - parallel stream beneficial
        List<Integer> large = IntStream.range(0, 1_000_000)
            .boxed()
            .collect(Collectors.toList());

        int sum2 = large.parallelStream()
            .mapToInt(Integer::intValue)
            .sum();
    }
}
```

**Why:** Parallel streams beneficial for large datasets (typically 1000+ elements) with computationally expensive operations.

**💡 Tip:** Use sequential streams by default; use parallel only for large data with expensive operations.

---

#### ❌ Wrong - Not Using Primitive Streams:
```java
// WRONG - Boxing overhead with object streams
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Boxing/unboxing overhead
        int sum = numbers.stream()
            .reduce(0, (a, b) -> a + b);  // Integer boxing/unboxing
    }
}
```
**Issue:** Using object streams for primitives causes boxing/unboxing overhead

#### ✅ Right:
```java
// CORRECT - Use primitive streams
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Use IntStream - no boxing
        int sum = numbers.stream()
            .mapToInt(Integer::intValue)
            .sum();

        // Or create IntStream directly
        int sum2 = IntStream.of(1, 2, 3, 4, 5).sum();

        // IntStream has specialized methods
        OptionalDouble avg = IntStream.range(1, 6).average();
        IntSummaryStatistics stats = IntStream.range(1, 6).summaryStatistics();
    }
}
```

**Why:** Primitive streams (IntStream, LongStream, DoubleStream) avoid boxing; more efficient.

**💡 Tip:** Use `mapToInt()`, `mapToLong()`, `mapToDouble()` to convert to primitive streams for numeric operations.

---

#### ❌ Wrong - Creating Infinite Stream Without Limit:
```java
// WRONG - Infinite stream without limit
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) {
        // Infinite stream - never terminates!
        Stream.iterate(0, n -> n + 1)
            .forEach(System.out::println);  // Runs forever!
    }
}
```
**Issue:** Infinite stream without terminal operation that limits (limit, findFirst, etc.) runs forever

#### ✅ Right:
```java
// CORRECT - Limit infinite streams
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) {
        // Limit to first 10 elements
        Stream.iterate(0, n -> n + 1)
            .limit(10)
            .forEach(System.out::println);

        // Or use takeWhile (Java 9+)
        Stream.iterate(0, n -> n + 1)
            .takeWhile(n -> n < 10)
            .forEach(System.out::println);

        // Or use iterate with predicate (Java 9+)
        Stream.iterate(0, n -> n < 10, n -> n + 1)
            .forEach(System.out::println);
    }
}
```

**Why:** Infinite streams need limiting terminal operations to terminate.

**💡 Tip:** Always use `limit()`, `findFirst()`, `anyMatch()`, or `takeWhile()` with infinite streams.

---

### 2. Intermediate Operation Mistakes

#### ❌ Wrong - Using forEach as Intermediate Operation:
```java
// WRONG - forEach is terminal, not intermediate
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Wrong! forEach is terminal - can't chain after it
        numbers.stream()
            .forEach(System.out::println)  // Terminal operation
            .map(n -> n * 2);  // Compile error! Can't chain after terminal
    }
}
```
**Issue:** `forEach` is a terminal operation; can't chain operations after it

#### ✅ Right:
```java
// CORRECT - Use peek for intermediate debugging
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Use peek for intermediate inspection
        List<Integer> result = numbers.stream()
            .peek(n -> System.out.println("Before: " + n))
            .map(n -> n * 2)
            .peek(n -> System.out.println("After: " + n))
            .collect(Collectors.toList());

        // forEach at the end (terminal)
        result.stream().forEach(System.out::println);
    }
}
```

**Why:** `peek` is intermediate (returns stream); `forEach` is terminal (returns void).

**💡 Tip:** Use `peek()` for debugging; `forEach()` only as final terminal operation.

---

#### ❌ Wrong - Modifying Source in Stream Pipeline:
```java
// WRONG - Modifying source during stream processing
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));

        // ConcurrentModificationException or undefined behavior!
        numbers.stream()
            .forEach(n -> {
                if (n % 2 == 0) {
                    numbers.remove(n);  // Modifying source!
                }
            });
    }
}
```
**Issue:** Modifying stream source during processing causes ConcurrentModificationException or undefined behavior

#### ✅ Right:
```java
// CORRECT - Filter and collect to new list
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));

        // Filter to new list
        List<Integer> odd = numbers.stream()
            .filter(n -> n % 2 != 0)
            .collect(Collectors.toList());

        System.out.println("Original: " + numbers);
        System.out.println("Odd: " + odd);

        // Or use removeIf on original list (not in stream)
        numbers.removeIf(n -> n % 2 == 0);
    }
}
```

**Why:** Streams should not modify their source; filter to new collection or use removeIf outside stream.

**💡 Tip:** Never modify stream source during processing; use filter/collect for new collection.

---

#### ❌ Wrong - Confusing map and flatMap:
```java
// WRONG - Using map when flatMap needed
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<List<Integer>> nested = Arrays.asList(
            Arrays.asList(1, 2),
            Arrays.asList(3, 4),
            Arrays.asList(5, 6)
        );

        // Wrong! Returns Stream<Stream<Integer>>
        Stream<Stream<Integer>> wrong = nested.stream()
            .map(list -> list.stream());  // Stream of streams!
    }
}
```
**Issue:** `map` creates stream of streams; need `flatMap` to flatten

#### ✅ Right:
```java
// CORRECT - Use flatMap to flatten
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<List<Integer>> nested = Arrays.asList(
            Arrays.asList(1, 2),
            Arrays.asList(3, 4),
            Arrays.asList(5, 6)
        );

        // flatMap flattens stream of streams
        List<Integer> flat = nested.stream()
            .flatMap(list -> list.stream())
            .collect(Collectors.toList());

        System.out.println(flat);  // [1, 2, 3, 4, 5, 6]

        // Another example: split strings and flatten
        List<String> words = Arrays.asList("Hello World", "Java Streams");
        List<String> allWords = words.stream()
            .flatMap(str -> Arrays.stream(str.split(" ")))
            .collect(Collectors.toList());
        // [Hello, World, Java, Streams]
    }
}
```

**Why:** `map` transforms one element to one element; `flatMap` transforms one element to stream, then flattens.

**💡 Tip:** Use `flatMap` when mapping function returns a stream; it automatically flattens.

---

#### ❌ Wrong - Using sorted() Too Early:
```java
// WRONG - Sorting before filtering (wasteful)
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(5, 2, 8, 1, 9, 3, 7, 4, 6);

        // Sorting all elements first, then filtering - wasteful!
        List<Integer> result = numbers.stream()
            .sorted()  // Sorts all 9 elements
            .filter(n -> n > 5)  // Then filters, leaving 4 elements
            .collect(Collectors.toList());
    }
}
```
**Issue:** Sorting entire collection before filtering wastes computation on elements that will be filtered out

#### ✅ Right:
```java
// CORRECT - Filter first, then sort
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(5, 2, 8, 1, 9, 3, 7, 4, 6);

        // Filter first (reduces from 9 to 4 elements), then sort
        List<Integer> result = numbers.stream()
            .filter(n -> n > 5)  // Filters to 4 elements first
            .sorted()  // Only sorts 4 elements
            .collect(Collectors.toList());

        System.out.println(result);  // [6, 7, 8, 9]
    }
}
```

**Why:** Filter reduces data size; sorting smaller set is more efficient.

**💡 Tip:** Order operations: filter first to reduce data, then sort/limit/distinct.

---

#### ❌ Wrong - Using peek for Side Effects:
```java
// WRONG - Using peek for critical side effects
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        List<Integer> sideEffectList = new ArrayList<>();

        // peek may be skipped by optimizer!
        numbers.stream()
            .peek(sideEffectList::add)  // Don't rely on peek for side effects
            .filter(n -> n > 10);  // No terminal operation!

        System.out.println(sideEffectList);  // Might be empty!
    }
}
```
**Issue:** `peek` is for debugging; side effects might not execute if optimized away or no terminal operation

#### ✅ Right:
```java
// CORRECT - Use forEach or collect for side effects
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        List<Integer> result = new ArrayList<>();

        // Option 1: Use forEach (terminal) for side effects
        numbers.stream().forEach(result::add);

        // Option 2: Use collect (better for building collections)
        List<Integer> collected = numbers.stream()
            .collect(Collectors.toList());

        // peek only for debugging
        numbers.stream()
            .peek(n -> System.out.println("Processing: " + n))
            .filter(n -> n > 2)
            .collect(Collectors.toList());
    }
}
```

**Why:** `peek` is for debugging only; use terminal operations for guaranteed side effects.

**💡 Tip:** Never rely on `peek` for critical logic; use `forEach` or `collect` for side effects.

---

### 3. Terminal Operation Mistakes

#### ❌ Wrong - Using collect with Side Effects Instead of forEach:
```java
// WRONG - Using collect for side effects
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

        // Wrong! collect is for accumulation, not side effects
        names.stream()
            .collect(Collectors.toList())  // Collects to list...
            .forEach(System.out::println);  // Then prints - two operations!
    }
}
```
**Issue:** Using `collect` when only need side effects; inefficient, creates unnecessary collection

#### ✅ Right:
```java
// CORRECT - Use forEach for side effects directly
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

        // Use forEach directly for side effects
        names.stream().forEach(System.out::println);

        // collect when building new collection needed
        List<String> upper = names.stream()
            .map(String::toUpperCase)
            .collect(Collectors.toList());

        System.out.println(upper);
    }
}
```

**Why:** `forEach` for side effects only; `collect` for building collections.

**💡 Tip:** Use `forEach` for printing/logging; `collect` when need result collection.

---

#### ❌ Wrong - Using reduce Incorrectly:
```java
// WRONG - Not providing identity value for reduce
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Wrong! Returns Optional, not int
        int sum = numbers.stream()
            .reduce((a, b) -> a + b);  // Compile error! Returns Optional<Integer>
    }
}
```
**Issue:** `reduce` without identity returns Optional; must handle empty stream case

#### ✅ Right:
```java
// CORRECT - Provide identity value or handle Optional
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Option 1: Provide identity value
        int sum1 = numbers.stream()
            .reduce(0, (a, b) -> a + b);  // Returns int directly

        // Option 2: Handle Optional
        Optional<Integer> sum2 = numbers.stream()
            .reduce((a, b) -> a + b);
        System.out.println(sum2.orElse(0));

        // Better for sum: use specialized methods
        int sum3 = numbers.stream()
            .mapToInt(Integer::intValue)
            .sum();  // No Optional, always returns int
    }
}
```

**Why:** Reduce without identity returns Optional (handles empty stream); with identity returns value directly.

**💡 Tip:** Provide identity for reduce; or use specialized methods (sum, max, min) on primitive streams.

---

#### ❌ Wrong - Using count() When anyMatch() Sufficient:
```java
// WRONG - Using count to check existence
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Inefficient! Counts all elements
        boolean hasEven = numbers.stream()
            .filter(n -> n % 2 == 0)
            .count() > 0;  // Processes entire stream
    }
}
```
**Issue:** `count()` processes entire stream; `anyMatch()` short-circuits on first match

#### ✅ Right:
```java
// CORRECT - Use anyMatch for existence check
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Use anyMatch - stops at first match
        boolean hasEven = numbers.stream()
            .anyMatch(n -> n % 2 == 0);  // Short-circuits

        // allMatch - all elements must match
        boolean allPositive = numbers.stream()
            .allMatch(n -> n > 0);

        // noneMatch - no elements match
        boolean noNegative = numbers.stream()
            .noneMatch(n -> n < 0);
    }
}
```

**Why:** Matching operations short-circuit; count processes all elements.

**💡 Tip:** Use `anyMatch()` for existence, `allMatch()` for all, `noneMatch()` for none; faster than count.

---

#### ❌ Wrong - Using findFirst() on Unordered Stream:
```java
// WRONG - findFirst on unordered parallel stream
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // findFirst forces ordering on parallel stream - slow!
        Optional<Integer> first = numbers.parallelStream()
            .filter(n -> n > 2)
            .findFirst();  // Forces ordering, defeats parallelism
    }
}
```
**Issue:** `findFirst()` on parallel stream requires maintaining encounter order; reduces parallelism benefit

#### ✅ Right:
```java
// CORRECT - Use findAny for parallel streams
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // findAny on parallel stream - faster, no ordering
        Optional<Integer> any = numbers.parallelStream()
            .filter(n -> n > 2)
            .findAny();  // No ordering constraint, faster in parallel

        System.out.println(any.orElse(-1));

        // Use findFirst only when order matters
        Optional<Integer> first = numbers.stream()  // Sequential
            .filter(n -> n > 2)
            .findFirst();  // OK for sequential
    }
}
```

**Why:** `findAny()` doesn't require ordering; faster on parallel streams.

**💡 Tip:** Use `findFirst()` for sequential when order matters; `findAny()` for parallel streams.

---

### 4. Collectors Mistakes

#### ❌ Wrong - Using toList() Instead of Specific Collector:
```java
// WRONG - toList() when need specific list type
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

        // toList() returns unmodifiable list (Java 16+) or ArrayList
        List<String> result = names.stream()
            .collect(Collectors.toList());

        result.add("David");  // Might throw UnsupportedOperationException!
    }
}
```
**Issue:** `Collectors.toList()` returns unspecified implementation; might be immutable

#### ✅ Right:
```java
// CORRECT - Specify collection type if mutability needed
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

        // Specify ArrayList if need mutable list
        ArrayList<String> mutable = names.stream()
            .collect(Collectors.toCollection(ArrayList::new));

        mutable.add("David");  // OK

        // Or use toList() if immutability is fine
        List<String> immutable = names.stream()
            .collect(Collectors.toList());
        // Don't modify immutable
    }
}
```

**Why:** `toList()` doesn't guarantee mutability; use `toCollection()` for specific type.

**💡 Tip:** Use `toCollection(ArrayList::new)` for mutable list; `toList()` for immutable.

---

#### ❌ Wrong - Using collect Instead of Specialized Methods:
```java
// WRONG - Using collect when specialized method exists
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Inefficient! Don't use collect for counting
        long count = numbers.stream()
            .collect(Collectors.counting());  // Unnecessary wrapper

        // Don't use collect for sum
        int sum = numbers.stream()
            .collect(Collectors.summingInt(Integer::intValue));
    }
}
```
**Issue:** Using collectors when specialized terminal operations exist; verbose and less efficient

#### ✅ Right:
```java
// CORRECT - Use specialized terminal operations
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Use count() method
        long count = numbers.stream().count();

        // Use sum() on primitive stream
        int sum = numbers.stream()
            .mapToInt(Integer::intValue)
            .sum();

        // Use max() with comparator
        Optional<Integer> max = numbers.stream()
            .max(Integer::compareTo);

        // Use average() on primitive stream
        OptionalDouble avg = numbers.stream()
            .mapToInt(Integer::intValue)
            .average();
    }
}
```

**Why:** Specialized methods more concise and efficient than collectors.

**💡 Tip:** Use `count()`, `sum()`, `max()`, `min()`, `average()` instead of collecting.

---

#### ❌ Wrong - Not Using groupingBy Downstream Collectors:
```java
// WRONG - Manual grouping and transformation
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<String> words = Arrays.asList("apple", "banana", "apricot", "berry");

        // Manual grouping by first letter
        Map<Character, List<String>> grouped = words.stream()
            .collect(Collectors.groupingBy(s -> s.charAt(0)));

        // Then manually count in each group - two operations!
        Map<Character, Long> counts = new HashMap<>();
        grouped.forEach((k, v) -> counts.put(k, (long) v.size()));
    }
}
```
**Issue:** Manually transforming after grouping; verbose, two operations

#### ✅ Right:
```java
// CORRECT - Use downstream collector
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<String> words = Arrays.asList("apple", "banana", "apricot", "berry");

        // Group and count in one operation
        Map<Character, Long> counts = words.stream()
            .collect(Collectors.groupingBy(
                s -> s.charAt(0),
                Collectors.counting()  // Downstream collector
            ));

        System.out.println(counts);  // {a=2, b=2}

        // Other downstream collectors
        Map<Character, String> joined = words.stream()
            .collect(Collectors.groupingBy(
                s -> s.charAt(0),
                Collectors.joining(", ")  // Join strings
            ));

        Map<Character, Optional<String>> longest = words.stream()
            .collect(Collectors.groupingBy(
                s -> s.charAt(0),
                Collectors.maxBy(Comparator.comparingInt(String::length))
            ));
    }
}
```

**Why:** Downstream collectors transform groups in single pass; more efficient and concise.

**💡 Tip:** Use downstream collectors (counting, joining, mapping, etc.) with groupingBy for efficient transformation.

---

#### ❌ Wrong - Using partitioningBy Instead of groupingBy:
```java
// WRONG - groupingBy when only two groups
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6);

        // groupingBy for boolean - returns Map<Boolean, List<Integer>>
        Map<Boolean, List<Integer>> groups = numbers.stream()
            .collect(Collectors.groupingBy(n -> n % 2 == 0));

        // Accessing even/odd requires Boolean keys
        List<Integer> even = groups.get(true);
        List<Integer> odd = groups.get(false);
    }
}
```
**Issue:** Using `groupingBy` with boolean classifier when `partitioningBy` more appropriate and efficient

#### ✅ Right:
```java
// CORRECT - Use partitioningBy for boolean classification
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6);

        // partitioningBy specifically for boolean - more efficient
        Map<Boolean, List<Integer>> partitioned = numbers.stream()
            .collect(Collectors.partitioningBy(n -> n % 2 == 0));

        List<Integer> even = partitioned.get(true);
        List<Integer> odd = partitioned.get(false);

        System.out.println("Even: " + even);
        System.out.println("Odd: " + odd);

        // Can use downstream collector too
        Map<Boolean, Long> counts = numbers.stream()
            .collect(Collectors.partitioningBy(
                n -> n % 2 == 0,
                Collectors.counting()
            ));
    }
}
```

**Why:** `partitioningBy` optimized for boolean classification; always returns both true/false keys.

**💡 Tip:** Use `partitioningBy` for boolean classification; `groupingBy` for other keys.

---

### 5. Primitive Stream Mistakes

#### ❌ Wrong - Mixing Object and Primitive Streams:
```java
// WRONG - Trying to use Stream<Integer> methods on IntStream
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        IntStream stream = IntStream.range(1, 6);

        // Compile error! IntStream doesn't have map(Function)
        IntStream doubled = stream.map(n -> n * 2);  // OK - IntUnaryOperator

        // But this doesn't work:
        Stream<String> strings = stream.map(n -> "Number: " + n);  // Compile error!
    }
}
```
**Issue:** Primitive streams have different method signatures than object streams

#### ✅ Right:
```java
// CORRECT - Use mapToObj to convert primitive to object stream
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        IntStream stream = IntStream.range(1, 6);

        // mapToObj converts int to objects
        Stream<String> strings = stream.mapToObj(n -> "Number: " + n);

        strings.forEach(System.out::println);

        // Or boxed() to convert to Stream<Integer>
        Stream<Integer> boxed = IntStream.range(1, 6).boxed();

        // mapToInt/mapToLong/mapToDouble for primitive streams
        IntStream nums = Stream.of("1", "2", "3")
            .mapToInt(Integer::parseInt);
    }
}
```

**Why:** Primitive streams have specialized methods; use `mapToObj()`/`boxed()` to convert to object streams.

**💡 Tip:** Use `mapToObj()` to map primitives to objects; `boxed()` to convert to Stream<Integer/Long/Double>.

---

#### ❌ Wrong - Not Using Primitive Stream Specialized Methods:
```java
// WRONG - Boxing to use Stream<Integer> methods
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5};

        // Boxing overhead
        int sum = Arrays.stream(numbers)
            .boxed()  // Convert to Stream<Integer>
            .reduce(0, (a, b) -> a + b);  // Boxing/unboxing
    }
}
```
**Issue:** Boxing primitives to use object stream methods; performance overhead

#### ✅ Right:
```java
// CORRECT - Use IntStream specialized methods
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5};

        // Use specialized methods - no boxing
        int sum = Arrays.stream(numbers).sum();
        OptionalInt max = Arrays.stream(numbers).max();
        OptionalInt min = Arrays.stream(numbers).min();
        OptionalDouble avg = Arrays.stream(numbers).average();

        // Summary statistics - all at once
        IntSummaryStatistics stats = Arrays.stream(numbers).summaryStatistics();
        System.out.println("Sum: " + stats.getSum());
        System.out.println("Avg: " + stats.getAverage());
        System.out.println("Max: " + stats.getMax());
        System.out.println("Min: " + stats.getMin());
        System.out.println("Count: " + stats.getCount());
    }
}
```

**Why:** Primitive streams have specialized methods without boxing overhead.

**💡 Tip:** Use `sum()`, `max()`, `min()`, `average()`, `summaryStatistics()` on primitive streams.

---

#### ❌ Wrong - Creating IntStream from Collection Wrong Way:
```java
// WRONG - Inefficient conversion to IntStream
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Inefficient! Creates array then IntStream
        int sum = numbers.toArray(new Integer[0])
            .length;  // Wrong approach entirely!
    }
}
```
**Issue:** Wrong approach to convert List<Integer> to IntStream

#### ✅ Right:
```java
// CORRECT - Use mapToInt to convert to IntStream
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Use mapToInt to convert
        int sum = numbers.stream()
            .mapToInt(Integer::intValue)  // or n -> n (auto-unboxing)
            .sum();

        // For int array to IntStream
        int[] array = {1, 2, 3, 4, 5};
        IntStream stream = Arrays.stream(array);

        // For range of numbers
        IntStream range = IntStream.range(1, 6);  // 1 to 5
        IntStream rangeClosed = IntStream.rangeClosed(1, 5);  // 1 to 5 (inclusive)
    }
}
```

**Why:** `mapToInt()` efficiently converts Stream<Integer> to IntStream.

**💡 Tip:** Use `mapToInt(Integer::intValue)` to convert List<Integer> to IntStream; `Arrays.stream()` for arrays.

---

#### ❌ Wrong - Not Handling Empty OptionalInt/Long/Double:
```java
// WRONG - Not handling empty Optional from primitive stream
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        int[] numbers = {};

        // getAsInt() throws NoSuchElementException on empty array!
        int max = Arrays.stream(numbers).max().getAsInt();
    }
}
```
**Issue:** Primitive stream operations return OptionalInt/Long/Double; must handle empty case

#### ✅ Right:
```java
// CORRECT - Handle empty Optional
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        int[] numbers = {};

        // Option 1: orElse
        int max1 = Arrays.stream(numbers).max().orElse(0);

        // Option 2: orElseThrow
        int max2 = Arrays.stream(numbers).max()
            .orElseThrow(() -> new IllegalArgumentException("Empty array"));

        // Option 3: isPresent check
        OptionalInt maxOpt = Arrays.stream(numbers).max();
        if (maxOpt.isPresent()) {
            System.out.println("Max: " + maxOpt.getAsInt());
        } else {
            System.out.println("Array is empty");
        }

        // Option 4: ifPresent (for side effects)
        Arrays.stream(numbers).max()
            .ifPresent(max -> System.out.println("Max: " + max));
    }
}
```

**Why:** Primitive streams return OptionalInt/Long/Double; must handle empty case to avoid exception.

**💡 Tip:** Always use `orElse()`, `orElseThrow()`, or check `isPresent()` with primitive Optionals.

---

### 6. Parallel Stream Mistakes

#### ❌ Wrong - Using Parallel Stream with Stateful Operations:
```java
// WRONG - Stateful lambda in parallel stream
import java.util.*;
import java.util.concurrent.atomic.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        AtomicInteger sum = new AtomicInteger(0);

        // Parallel stream with side effect - non-deterministic!
        numbers.parallelStream()
            .forEach(n -> sum.addAndGet(n));  // Order-dependent side effect

        System.out.println(sum.get());  // Might not be 15!
    }
}
```
**Issue:** Parallel streams process in unpredictable order; stateful side effects lead to race conditions

#### ✅ Right:
```java
// CORRECT - Use stateless operations
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Use reduce - stateless and associative
        int sum = numbers.parallelStream()
            .reduce(0, Integer::sum);  // Correct in parallel

        System.out.println(sum);  // Always 15

        // Or use primitive stream sum
        int sum2 = numbers.parallelStream()
            .mapToInt(Integer::intValue)
            .sum();
    }
}
```

**Why:** Parallel streams require stateless, associative operations for correct results.

**💡 Tip:** Use `reduce()` with associative operations in parallel; avoid stateful lambdas.

---

#### ❌ Wrong - Using Parallel Stream with Order-Dependent Operations:
```java
// WRONG - limit() or findFirst() with parallel stream
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = IntStream.range(1, 1000)
            .boxed()
            .collect(Collectors.toList());

        // Parallel limit() slower - needs to maintain order
        List<Integer> limited = numbers.parallelStream()
            .limit(10)  // Forces ordering, defeats parallelism
            .collect(Collectors.toList());
    }
}
```
**Issue:** Order-dependent operations (limit, findFirst, skip) force sequential processing in parallel streams

#### ✅ Right:
```java
// CORRECT - Avoid order-dependent ops in parallel or use unordered
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = IntStream.range(1, 1000)
            .boxed()
            .collect(Collectors.toList());

        // Use unordered() before limit for better parallel performance
        List<Integer> limited = numbers.parallelStream()
            .unordered()  // Don't maintain order
            .limit(10)  // Faster in parallel
            .collect(Collectors.toList());

        // Or use sequential stream for ordered operations
        List<Integer> orderedLimit = numbers.stream()
            .limit(10)
            .collect(Collectors.toList());

        // Use findAny instead of findFirst in parallel
        Optional<Integer> any = numbers.parallelStream()
            .filter(n -> n > 100)
            .findAny();  // No ordering constraint
    }
}
```

**Why:** Order-dependent operations reduce parallel efficiency; use `unordered()` or sequential stream.

**💡 Tip:** Call `unordered()` before `limit()`/`distinct()` in parallel; use `findAny()` instead of `findFirst()`.

---

#### ❌ Wrong - Parallel Stream for I/O or Blocking Operations:
```java
// WRONG - Parallel stream with I/O operations
import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) {
        List<String> files = Arrays.asList("file1.txt", "file2.txt", "file3.txt");

        // Wrong! I/O operations in parallel stream
        files.parallelStream()
            .forEach(file -> {
                try {
                    Thread.sleep(1000);  // Blocking operation
                    // Read file...
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            });
        // ForkJoinPool threads blocked on I/O - wasteful!
    }
}
```
**Issue:** Parallel streams use ForkJoinPool; blocking I/O wastes threads designed for CPU-bound tasks

#### ✅ Right:
```java
// CORRECT - Use sequential stream for I/O or dedicated thread pool
import java.util.*;
import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) throws Exception {
        List<String> files = Arrays.asList("file1.txt", "file2.txt", "file3.txt");

        // Option 1: Sequential stream for I/O
        files.stream()
            .forEach(file -> {
                // Read file...
            });

        // Option 2: Use dedicated ExecutorService for parallel I/O
        ExecutorService executor = Executors.newFixedThreadPool(10);

        List<Future<?>> futures = files.stream()
            .map(file -> executor.submit(() -> {
                // Read file...
                return null;
            }))
            .collect(Collectors.toList());

        // Wait for completion
        for (Future<?> future : futures) {
            future.get();
        }

        executor.shutdown();
    }
}
```

**Why:** Parallel streams for CPU-bound tasks; use ExecutorService for I/O or blocking operations.

**💡 Tip:** Never use parallel streams for I/O; use custom ExecutorService with appropriate thread pool size.

---

#### ❌ Wrong - Not Measuring Parallel Stream Performance:
```java
// WRONG - Assuming parallel is always faster
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = IntStream.range(1, 100)
            .boxed()
            .collect(Collectors.toList());

        // Small dataset, simple operation - parallel slower!
        int sum = numbers.parallelStream()
            .mapToInt(Integer::intValue)
            .sum();
        // Overhead > benefit for small data
    }
}
```
**Issue:** Parallel streams have overhead; not always faster, especially for small data or simple operations

#### ✅ Right:
```java
// CORRECT - Benchmark and use parallel only when beneficial
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        // Small data - sequential faster
        List<Integer> small = IntStream.range(1, 100)
            .boxed()
            .collect(Collectors.toList());

        int sum1 = small.stream()  // Sequential
            .mapToInt(Integer::intValue)
            .sum();

        // Large data with expensive operations - parallel beneficial
        List<Integer> large = IntStream.range(1, 1_000_000)
            .boxed()
            .collect(Collectors.toList());

        int sum2 = large.parallelStream()
            .map(n -> expensiveOperation(n))  // CPU-intensive
            .mapToInt(Integer::intValue)
            .sum();

        // Always measure! Use JMH for accurate benchmarking
    }

    private static int expensiveOperation(int n) {
        // Simulate expensive computation
        return n * n;
    }
}
```

**Why:** Parallel streams beneficial only for large datasets with expensive operations; always measure.

**💡 Tip:** Use sequential by default; switch to parallel only after measuring shows benefit (large data + expensive ops).

---

### 7. Stream Pipeline Mistakes

#### ❌ Wrong - Creating Multiple Intermediate Streams:
```java
// WRONG - Creating intermediate variables unnecessarily
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David");

        // Unnecessary intermediate variables
        Stream<String> stream1 = names.stream();
        Stream<String> stream2 = stream1.filter(s -> s.length() > 3);
        Stream<String> stream3 = stream2.map(String::toUpperCase);
        List<String> result = stream3.collect(Collectors.toList());
    }
}
```
**Issue:** Creating intermediate stream variables; verbose, no benefit

#### ✅ Right:
```java
// CORRECT - Chain operations in single pipeline
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David");

        // Single fluent pipeline
        List<String> result = names.stream()
            .filter(s -> s.length() > 3)
            .map(String::toUpperCase)
            .collect(Collectors.toList());

        System.out.println(result);  // [ALICE, CHARLIE, DAVID]
    }
}
```

**Why:** Stream pipelines designed for fluent chaining; intermediate variables unnecessary.

**💡 Tip:** Chain operations in single pipeline; only store result of terminal operation.

---

#### ❌ Wrong - Using External Mutability in Stream:
```java
// WRONG - Mutating external collection in stream
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        List<Integer> even = new ArrayList<>();

        // Wrong! External mutation
        numbers.stream()
            .filter(n -> n % 2 == 0)
            .forEach(even::add);  // Mutating external list
    }
}
```
**Issue:** Mutating external state in stream; defeats functional style, not thread-safe

#### ✅ Right:
```java
// CORRECT - Use collect to build result
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Functional style - collect to new list
        List<Integer> even = numbers.stream()
            .filter(n -> n % 2 == 0)
            .collect(Collectors.toList());

        System.out.println(even);  // [2, 4]
    }
}
```

**Why:** Streams should be functional; use `collect()` to build results, not external mutation.

**💡 Tip:** Use `collect()` to accumulate results; avoid mutating external collections in streams.

---

#### ❌ Wrong - Using filter After Expensive map:
```java
// WRONG - Expensive map before filter
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<String> words = Arrays.asList("apple", "banana", "apricot", "berry", "avocado");

        // Map all, then filter - wasteful!
        List<String> result = words.stream()
            .map(String::toUpperCase)  // Converts all 5 words
            .filter(s -> s.startsWith("A"))  // Only keeps 3
            .collect(Collectors.toList());
    }
}
```
**Issue:** Applying expensive operation to all elements before filtering; wasteful computation

#### ✅ Right:
```java
// CORRECT - Filter before expensive operations
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<String> words = Arrays.asList("apple", "banana", "apricot", "berry", "avocado");

        // Filter first (reduces from 5 to 3), then map
        List<String> result = words.stream()
            .filter(s -> s.startsWith("a"))  // Only 3 pass
            .map(String::toUpperCase)  // Only converts 3
            .collect(Collectors.toList());

        System.out.println(result);  // [APPLE, APRICOT, AVOCADO]
    }
}
```

**Why:** Filter first to reduce data size; then apply expensive operations.

**💡 Tip:** Order operations: cheap filters first, expensive transformations later.

---

#### ❌ Wrong - Not Using Short-Circuiting Operations:
```java
// WRONG - Processing entire stream when short-circuit possible
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // Processes all 10 elements
        boolean found = numbers.stream()
            .filter(n -> n > 5)
            .collect(Collectors.toList())
            .size() > 0;
    }
}
```
**Issue:** Processing entire stream to check existence; wastes computation

#### ✅ Right:
```java
// CORRECT - Use short-circuiting operations
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // Short-circuits at first match
        boolean found = numbers.stream()
            .anyMatch(n -> n > 5);  // Stops at 6 (index 5)

        // Other short-circuiting operations
        Optional<Integer> first = numbers.stream()
            .filter(n -> n > 5)
            .findFirst();  // Stops when finds first

        List<Integer> firstThree = numbers.stream()
            .limit(3)  // Only processes first 3
            .collect(Collectors.toList());
    }
}
```

**Why:** Short-circuiting operations stop processing when answer found; more efficient.

**💡 Tip:** Use `anyMatch()`, `allMatch()`, `noneMatch()`, `findFirst()`, `findAny()`, `limit()` for short-circuiting.

---

### 8. Optional with Stream Mistakes

#### ❌ Wrong - Using get() Without Checking:
```java
// WRONG - Calling get() without checking presence
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList();  // Empty list

        // NoSuchElementException! Empty optional
        int max = numbers.stream()
            .max(Integer::compareTo)
            .get();
    }
}
```
**Issue:** Calling `get()` on empty Optional throws NoSuchElementException

#### ✅ Right:
```java
// CORRECT - Handle empty Optional safely
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList();  // Empty list

        // Option 1: orElse
        int max1 = numbers.stream()
            .max(Integer::compareTo)
            .orElse(0);

        // Option 2: orElseGet with supplier
        int max2 = numbers.stream()
            .max(Integer::compareTo)
            .orElseGet(() -> getDefaultMax());

        // Option 3: orElseThrow
        int max3 = numbers.stream()
            .max(Integer::compareTo)
            .orElseThrow(() -> new IllegalStateException("Empty list"));

        // Option 4: ifPresent for side effects
        numbers.stream()
            .max(Integer::compareTo)
            .ifPresent(max -> System.out.println("Max: " + max));
    }

    private static int getDefaultMax() {
        return 0;
    }
}
```

**Why:** Always handle empty Optional; use `orElse()`, `orElseGet()`, `orElseThrow()`, or check `isPresent()`.

**💡 Tip:** Never call `get()` without checking; use safer alternatives like `orElse()`.

---

#### ❌ Wrong - Using isPresent() with get():
```java
// WRONG - isPresent() + get() antipattern
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

        Optional<String> found = names.stream()
            .filter(s -> s.startsWith("A"))
            .findFirst();

        // Antipattern! Use ifPresent or orElse instead
        if (found.isPresent()) {
            System.out.println(found.get());
        }
    }
}
```
**Issue:** Using `isPresent()` with `get()` defeats purpose of Optional; verbose, not functional

#### ✅ Right:
```java
// CORRECT - Use Optional methods functionally
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

        Optional<String> found = names.stream()
            .filter(s -> s.startsWith("A"))
            .findFirst();

        // Use ifPresent for side effect
        found.ifPresent(System.out::println);

        // Use map and orElse for transformation
        String upper = found
            .map(String::toUpperCase)
            .orElse("NOT_FOUND");

        // Use ifPresentOrElse (Java 9+)
        found.ifPresentOrElse(
            name -> System.out.println("Found: " + name),
            () -> System.out.println("Not found")
        );
    }
}
```

**Why:** Optional designed for functional style; use `ifPresent()`, `map()`, `flatMap()`, not `isPresent()` + `get()`.

**💡 Tip:** Replace `isPresent()` + `get()` with `ifPresent()`, `map()`, `orElse()`, or `ifPresentOrElse()`.

---

#### ❌ Wrong - Returning Optional from Stream of Optionals:
```java
// WRONG - Stream<Optional<T>> without flattening
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<String> ids = Arrays.asList("1", "2", "invalid", "3");

        // Returns Stream<Optional<Integer>>
        List<Optional<Integer>> results = ids.stream()
            .map(id -> parseOptional(id))
            .collect(Collectors.toList());
        // Now have to deal with List<Optional<Integer>> - awkward!
    }

    private static Optional<Integer> parseOptional(String s) {
        try {
            return Optional.of(Integer.parseInt(s));
        } catch (NumberFormatException e) {
            return Optional.empty();
        }
    }
}
```
**Issue:** Stream of Optionals awkward to work with; need to filter and unwrap

#### ✅ Right:
```java
// CORRECT - Use flatMap to flatten Optional streams
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<String> ids = Arrays.asList("1", "2", "invalid", "3");

        // flatMap flattens Optional, keeps only present values
        List<Integer> results = ids.stream()
            .map(id -> parseOptional(id))
            .flatMap(Optional::stream)  // Flattens Optional
            .collect(Collectors.toList());

        System.out.println(results);  // [1, 2, 3]

        // Or filter empty and map to get value
        List<Integer> results2 = ids.stream()
            .map(id -> parseOptional(id))
            .filter(Optional::isPresent)
            .map(Optional::get)
            .collect(Collectors.toList());
    }

    private static Optional<Integer> parseOptional(String s) {
        try {
            return Optional.of(Integer.parseInt(s));
        } catch (NumberFormatException e) {
            return Optional.empty();
        }
    }
}
```

**Why:** `flatMap(Optional::stream)` flattens Optional stream; only keeps present values.

**💡 Tip:** Use `flatMap(Optional::stream)` or `filter(Optional::isPresent).map(Optional::get)` for Optional streams.

---

#### ❌ Wrong - Using Optional as Stream Element:
```java
// WRONG - Optional as collection element
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        // Don't use Optional as collection element!
        List<Optional<String>> names = Arrays.asList(
            Optional.of("Alice"),
            Optional.empty(),
            Optional.of("Bob")
        );

        // Now have to deal with Optional in collection - awkward!
    }
}
```
**Issue:** Optional not designed as collection element; makes collection handling awkward

#### ✅ Right:
```java
// CORRECT - Use null or separate collections
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        // Option 1: Just use null if needed (or use collection that allows null)
        List<String> names = new ArrayList<>();
        names.add("Alice");
        names.add(null);  // null represents absence
        names.add("Bob");

        // Then filter nulls when processing
        List<String> nonNull = names.stream()
            .filter(Objects::nonNull)
            .collect(Collectors.toList());

        // Option 2: Simply don't include absent values
        List<String> names2 = Arrays.asList("Alice", "Bob");  // No empties
    }
}
```

**Why:** Optional for return types, not collection elements; use null or omit absent values.

**💡 Tip:** Never use Optional as collection element; use null or separate valid/invalid collections.

---

### 9. Lazy Evaluation Mistakes

#### ❌ Wrong - Expecting Side Effects Without Terminal Operation:
```java
// WRONG - No terminal operation, nothing happens
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Nothing happens! No terminal operation
        numbers.stream()
            .filter(n -> {
                System.out.println("Filtering: " + n);
                return n > 2;
            })
            .map(n -> {
                System.out.println("Mapping: " + n);
                return n * 2;
            });

        System.out.println("Done");
        // Output: only "Done" - no filtering/mapping happened!
    }
}
```
**Issue:** Streams are lazy; intermediate operations don't execute without terminal operation

#### ✅ Right:
```java
// CORRECT - Add terminal operation to trigger execution
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Terminal operation triggers execution
        List<Integer> result = numbers.stream()
            .filter(n -> {
                System.out.println("Filtering: " + n);
                return n > 2;
            })
            .map(n -> {
                System.out.println("Mapping: " + n);
                return n * 2;
            })
            .collect(Collectors.toList());  // Terminal operation

        System.out.println("Result: " + result);
        // Now filtering and mapping execute
    }
}
```

**Why:** Streams lazy; intermediate operations create pipeline, terminal operation triggers execution.

**💡 Tip:** Always end stream pipeline with terminal operation; otherwise nothing happens.

---

#### ❌ Wrong - Not Understanding Lazy Evaluation Order:
```java
// WRONG - Expecting all filters then all maps
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Student expects: filter all, then map all
        // Actually: filter+map each element, then next element
        numbers.stream()
            .filter(n -> {
                System.out.println("Filter: " + n);
                return n % 2 == 0;
            })
            .map(n -> {
                System.out.println("Map: " + n);
                return n * 2;
            })
            .forEach(n -> System.out.println("Result: " + n));

        // Output order:
        // Filter: 1
        // Filter: 2
        // Map: 2
        // Result: 4
        // Filter: 3
        // Filter: 4
        // Map: 4
        // Result: 8
        // Filter: 5
    }
}
```
**Issue:** Student doesn't understand lazy evaluation processes one element through pipeline at a time

#### ✅ Right:
```java
// CORRECT - Understanding lazy evaluation
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Lazy evaluation: each element goes through entire pipeline
        // before next element starts
        List<Integer> result = numbers.stream()
            .peek(n -> System.out.println("Source: " + n))
            .filter(n -> {
                System.out.println("  Filter: " + n);
                return n % 2 == 0;
            })
            .peek(n -> System.out.println("  After filter: " + n))
            .map(n -> {
                System.out.println("  Map: " + n);
                return n * 2;
            })
            .peek(n -> System.out.println("  After map: " + n))
            .collect(Collectors.toList());

        // Each element processed completely before next element
        System.out.println("Final result: " + result);
    }
}
```

**Why:** Lazy evaluation processes elements one at a time through pipeline, not stage by stage.

**💡 Tip:** Use `peek()` to trace execution order; understand elements processed individually through pipeline.

---

#### ❌ Wrong - Storing Stream for Later Use:
```java
// WRONG - Trying to store stream for later execution
import java.util.*;
import java.util.stream.*;

public class Main {
    private Stream<Integer> evenNumbers;

    public void setupStream() {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        evenNumbers = numbers.stream()
            .filter(n -> n % 2 == 0);  // Stored intermediate stream
    }

    public void processStream() {
        // IllegalStateException! Stream already operated on or closed
        List<Integer> result = evenNumbers.collect(Collectors.toList());
    }

    public static void main(String[] args) {
        Main m = new Main();
        m.setupStream();
        m.processStream();
    }
}
```
**Issue:** Streams can't be stored for later; they're consumed on first terminal operation

#### ✅ Right:
```java
// CORRECT - Store source or Supplier of stream
import java.util.*;
import java.util.function.Supplier;
import java.util.stream.*;

public class Main {
    private List<Integer> numbers;
    private Supplier<Stream<Integer>> evenNumbersSupplier;

    public void setupSource() {
        numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Store Supplier that creates new stream each time
        evenNumbersSupplier = () -> numbers.stream()
            .filter(n -> n % 2 == 0);
    }

    public void processStream() {
        // Get new stream each time
        List<Integer> result1 = evenNumbersSupplier.get()
            .collect(Collectors.toList());

        // Can get another stream
        List<Integer> result2 = evenNumbersSupplier.get()
            .collect(Collectors.toList());
    }

    public static void main(String[] args) {
        Main m = new Main();
        m.setupSource();
        m.processStream();
    }
}
```

**Why:** Streams single-use; store source or Supplier to create multiple streams.

**💡 Tip:** Store `Supplier<Stream<T>>` to create streams on demand, not stream itself.

---

#### ❌ Wrong - Assuming Eager Evaluation:
```java
// WRONG - Expecting immediate evaluation
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>(Arrays.asList(1, 2, 3));

        // Create stream
        Stream<Integer> stream = numbers.stream()
            .filter(n -> n > 1);

        // Modify source
        numbers.add(4);
        numbers.add(5);

        // Student expects: [2, 3] (before modification)
        // Actually: [2, 3, 4, 5] (evaluated lazily, sees modifications!)
        List<Integer> result = stream.collect(Collectors.toList());

        System.out.println(result);
    }
}
```
**Issue:** Expecting eager evaluation; stream evaluates lazily, sees modifications to source

#### ✅ Right:
```java
// CORRECT - Understanding lazy evaluation timing
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>(Arrays.asList(1, 2, 3));

        // Create and immediately consume stream
        List<Integer> result1 = numbers.stream()
            .filter(n -> n > 1)
            .collect(Collectors.toList());  // [2, 3]

        // Then modify source
        numbers.add(4);
        numbers.add(5);

        // New stream sees modifications
        List<Integer> result2 = numbers.stream()
            .filter(n -> n > 1)
            .collect(Collectors.toList());  // [2, 3, 4, 5]

        System.out.println("Before modification: " + result1);
        System.out.println("After modification: " + result2);
    }
}
```

**Why:** Streams evaluate lazily at terminal operation; see current state of source at evaluation time.

**💡 Tip:** Create and consume stream immediately; or understand stream sees source modifications before terminal operation.

---

### 10. Stream Best Practice Mistakes

#### ❌ Wrong - Using Streams for Simple Loops:
```java
// WRONG - Stream overkill for simple iteration
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

        // Overkill! Stream overhead for simple print
        names.stream().forEach(System.out::println);
    }
}
```
**Issue:** Using streams for simple iterations adds overhead without benefit

#### ✅ Right:
```java
// CORRECT - Use simple loop when appropriate
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

        // Simple loop for simple iteration
        for (String name : names) {
            System.out.println(name);
        }

        // Or direct forEach on collection
        names.forEach(System.out::println);

        // Use streams when transforming/filtering
        List<String> longNames = names.stream()
            .filter(name -> name.length() > 5)
            .map(String::toUpperCase)
            .collect(Collectors.toList());
    }
}
```

**Why:** Streams add overhead; use simple loops for simple iteration, streams for transformation/filtering.

**💡 Tip:** Use streams for data transformation; simple loops for simple iteration.

---

#### ❌ Wrong - Returning Stream from Method:
```java
// WRONG - Returning stream from public method
import java.util.*;
import java.util.stream.*;

public class Main {
    private List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

    // Wrong! Caller can only use once
    public Stream<String> getNames() {
        return names.stream();
    }

    public static void main(String[] args) {
        Main m = new Main();
        Stream<String> stream = m.getNames();

        stream.forEach(System.out::println);  // OK
        stream.forEach(System.out::println);  // IllegalStateException!
    }
}
```
**Issue:** Returning stream from method; caller can only use once, confusing API

#### ✅ Right:
```java
// CORRECT - Return collection or make stream creation explicit
import java.util.*;
import java.util.function.Supplier;
import java.util.stream.*;

public class Main {
    private List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

    // Option 1: Return collection (preferred)
    public List<String> getNames() {
        return new ArrayList<>(names);  // Defensive copy
    }

    // Option 2: Return unmodifiable collection
    public List<String> getNamesUnmodifiable() {
        return Collections.unmodifiableList(names);
    }

    // Option 3: Return Supplier<Stream> (makes reusability explicit)
    public Supplier<Stream<String>> getNamesStream() {
        return () -> names.stream();
    }

    public static void main(String[] args) {
        Main m = new Main();

        // Can use multiple times
        List<String> list = m.getNames();
        list.forEach(System.out::println);
        list.forEach(System.out::println);  // OK

        // Or get new stream each time
        Supplier<Stream<String>> supplier = m.getNamesStream();
        supplier.get().forEach(System.out::println);
        supplier.get().forEach(System.out::println);  // OK
    }
}
```

**Why:** Streams single-use; returning collection allows multiple uses, clearer API.

**💡 Tip:** Return collection from methods, not stream; or return `Supplier<Stream<T>>` to make single-use explicit.

---

#### ❌ Wrong - Complex Stream Pipeline Without Extraction:
```java
// WRONG - Overly complex inline stream
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<String> data = Arrays.asList("apple,5", "banana,3", "cherry,8");

        // Too complex! Hard to read and test
        Map<String, Integer> result = data.stream()
            .map(s -> s.split(","))
            .filter(arr -> arr.length == 2)
            .filter(arr -> {
                try {
                    Integer.parseInt(arr[1]);
                    return true;
                } catch (NumberFormatException e) {
                    return false;
                }
            })
            .collect(Collectors.toMap(
                arr -> arr[0],
                arr -> Integer.parseInt(arr[1])
            ));
    }
}
```
**Issue:** Complex stream pipeline hard to read and test; logic embedded in lambdas

#### ✅ Right:
```java
// CORRECT - Extract to helper methods
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<String> data = Arrays.asList("apple,5", "banana,3", "cherry,8");

        // Clean, readable pipeline
        Map<String, Integer> result = data.stream()
            .map(Main::parseEntry)
            .filter(Optional::isPresent)
            .map(Optional::get)
            .collect(Collectors.toMap(
                Entry::getName,
                Entry::getCount
            ));

        System.out.println(result);
    }

    private static Optional<Entry> parseEntry(String line) {
        String[] parts = line.split(",");
        if (parts.length != 2) {
            return Optional.empty();
        }
        try {
            return Optional.of(new Entry(parts[0], Integer.parseInt(parts[1])));
        } catch (NumberFormatException e) {
            return Optional.empty();
        }
    }

    static class Entry {
        private final String name;
        private final int count;

        Entry(String name, int count) {
            this.name = name;
            this.count = count;
        }

        String getName() { return name; }
        int getCount() { return count; }
    }
}
```

**Why:** Extract complex logic to methods; improves readability and testability.

**💡 Tip:** Keep stream pipelines simple; extract complex logic to named methods.

---

#### ❌ Wrong - Using Streams When Imperative Clearer:
```java
// WRONG - Stream overkill for simple accumulation
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Overly complex for simple sum
        int sum = numbers.stream()
            .reduce(0, (a, b) -> a + b);
    }
}
```
**Issue:** Using streams when simple loop clearer; overengineering

#### ✅ Right:
```java
// CORRECT - Use streams when they add value
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Simple accumulation - simple loop is fine
        int sum1 = 0;
        for (int n : numbers) {
            sum1 += n;
        }

        // Or use primitive stream sum (best for this)
        int sum2 = numbers.stream()
            .mapToInt(Integer::intValue)
            .sum();

        // Use streams when they add value (complex transformations)
        int sumOfEvenSquares = numbers.stream()
            .filter(n -> n % 2 == 0)
            .map(n -> n * n)
            .mapToInt(Integer::intValue)
            .sum();
        // Stream pipeline clearer than imperative for this
    }
}
```

**Why:** Use streams when they improve clarity; simple loops fine for simple operations.

**💡 Tip:** Streams for complex transformations/filtering; simple loops for simple iteration.

---

#### ❌ Wrong - Ignoring Stream Performance Characteristics:
```java
// WRONG - Using operations that defeat stream optimization
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = IntStream.range(0, 1_000_000)
            .boxed()
            .collect(Collectors.toList());

        // sorted() before limit() - sorts entire million elements!
        List<Integer> top10 = numbers.stream()
            .sorted()  // Sorts all 1,000,000 elements
            .limit(10)  // Then takes only 10
            .collect(Collectors.toList());
    }
}
```
**Issue:** Poor operation ordering causes unnecessary computation

#### ✅ Right:
```java
// CORRECT - Optimize operation order
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = IntStream.range(0, 1_000_000)
            .boxed()
            .collect(Collectors.toList());

        // Better: use partial sort or priority queue
        List<Integer> top10 = numbers.stream()
            .limit(10)  // Take first 10 (or use different algorithm)
            .sorted()  // Only sort 10 elements
            .collect(Collectors.toList());

        // Or for top N, use partial sort approach
        PriorityQueue<Integer> pq = new PriorityQueue<>(10);
        for (int n : numbers) {
            pq.offer(n);
            if (pq.size() > 10) pq.poll();
        }
        List<Integer> top10Better = new ArrayList<>(pq);
        Collections.sort(top10Better);
    }
}
```

**Why:** Operation order affects performance; understand computational complexity.

**💡 Tip:** Order operations efficiently: filter/limit early, expensive ops (sort) late; consider algorithmic complexity.

---

This comprehensive list contains **40+ Stream API mistakes** covering all fundamental concepts!

---

**🎉 Congratulations on completing Day 28!**

You've mastered the Stream API. Tomorrow, we'll explore the Date & Time API.

**Next**: [Day 29: Date & Time API →](day29_date_time_api.md)

---

*Last Updated: 2026-01-09*