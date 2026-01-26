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

**🎉 Congratulations on completing Day 28!**

You've mastered the Stream API. Tomorrow, we'll explore the Date & Time API.

**Next**: [Day 29: Date & Time API →](day29_date_time_api.md)

---

*Last Updated: 2026-01-09*