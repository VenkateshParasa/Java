# Week 3: Advanced Java Concepts

## 📚 Overview
Week 3 focuses on advanced Java concepts that are essential for professional development. You'll learn about String manipulation, code organization with packages, robust error handling, powerful collections, and type-safe programming with generics.

---

## 📅 Daily Breakdown

### Day 15: Strings
**Topics:**
- String immutability and String pool
- String creation methods (literal vs new)
- Essential String methods
- StringBuilder and StringBuffer
- Common string algorithms

**Key Concepts:**
- Strings are immutable objects
- Use StringBuilder for efficient concatenation
- String pool optimizes memory usage

**Practice:** Palindrome checker, string reversal, anagram detection

---

### Day 16: Packages & Static Keyword
**Topics:**
- Creating and using packages
- Import statements and access control
- Static variables and methods
- Static blocks
- Static import

**Key Concepts:**
- Packages organize code and prevent naming conflicts
- Static members belong to the class, not instances
- Use static for utility methods and constants

**Practice:** Package organization, utility classes, static counters

---

### Day 17: Exception Handling - Part 1
**Topics:**
- What are exceptions?
- try-catch blocks
- Multiple catch blocks
- finally block
- try-with-resources
- throw keyword

**Key Concepts:**
- Exceptions disrupt normal program flow
- Always clean up resources in finally or use try-with-resources
- Catch specific exceptions before general ones

**Practice:** Safe division, array access handler, input validation

---

### Day 18: Exception Handling - Part 2
**Topics:**
- throws keyword
- Checked vs unchecked exceptions
- Creating custom exceptions
- Exception hierarchy
- Best practices

**Key Concepts:**
- Checked exceptions must be handled or declared
- Custom exceptions provide domain-specific error handling
- Don't swallow exceptions - at least log them

**Practice:** Custom validation framework, file processing with exceptions

---

### Day 19: Collections Framework - List & Set
**Topics:**
- Collections Framework overview
- ArrayList and LinkedList
- Vector and Stack
- HashSet, LinkedHashSet, TreeSet
- List vs Set

**Key Concepts:**
- ArrayList: fast random access
- LinkedList: fast insertion/deletion
- Set: no duplicates
- TreeSet: sorted order

**Practice:** Remove duplicates, find common elements, collection operations

---

### Day 20: Collections Framework - Map & Utilities
**Topics:**
- HashMap, LinkedHashMap, TreeMap
- Hashtable
- Collections utility class
- Comparable and Comparator
- Sorting and searching

**Key Concepts:**
- HashMap: fast key-value storage
- TreeMap: sorted by keys
- Comparable: natural ordering
- Comparator: custom ordering

**Practice:** Word frequency counter, grade manager, custom sorting

---

### Day 21: Generics
**Topics:**
- Why generics?
- Generic classes and methods
- Bounded type parameters
- Wildcards (?, extends, super)
- Type erasure

**Key Concepts:**
- Generics provide compile-time type safety
- Bounded types restrict type parameters
- Wildcards provide flexibility
- Type information is erased at runtime

**Practice:** Generic stack, utility methods, type-safe collections

---

## 🎯 Week 3 Learning Objectives

By the end of Week 3, you should be able to:

✅ Manipulate strings efficiently using appropriate methods and classes  
✅ Organize code using packages and access modifiers  
✅ Handle exceptions properly with try-catch-finally  
✅ Create custom exceptions for domain-specific errors  
✅ Choose and use appropriate collection classes  
✅ Sort and search collections using Comparable/Comparator  
✅ Write type-safe code using generics  
✅ Create generic classes and methods  

---

## 💡 Key Takeaways

### Strings
- Strings are immutable - modifications create new objects
- Use StringBuilder for multiple concatenations
- String pool optimizes memory for string literals

### Packages & Static
- Packages organize code and control access
- Static members are shared across all instances
- Use static for utility methods and constants

### Exception Handling
- Always handle or declare checked exceptions
- Use specific exception types
- Clean up resources in finally or try-with-resources
- Create custom exceptions for better error handling

### Collections
- **List**: Ordered, allows duplicates (ArrayList, LinkedList)
- **Set**: No duplicates (HashSet, TreeSet)
- **Map**: Key-value pairs (HashMap, TreeMap)
- Choose based on your needs: speed, order, uniqueness

### Generics
- Provide compile-time type safety
- Eliminate casting
- Enable writing reusable, type-safe code
- Use bounded types to restrict type parameters

---

## 📝 Week 3 Project

**Project: Library Management System**

Create a library management system that demonstrates Week 3 concepts:

**Requirements:**
1. Use packages to organize code (models, services, utils)
2. Implement proper exception handling (custom exceptions)
3. Use Collections (List for books, Map for borrowers)
4. Implement Comparable/Comparator for sorting
5. Use generics for type-safe collections
6. String manipulation for search functionality

**Features:**
- Add/remove books
- Borrow/return books
- Search books by title/author
- List all books (sorted)
- Track borrower history
- Handle errors gracefully

---

## 🔗 Resources

### Official Documentation
- [Oracle String Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html)
- [Oracle Packages Tutorial](https://docs.oracle.com/javase/tutorial/java/package/)
- [Oracle Exception Handling](https://docs.oracle.com/javase/tutorial/essential/exceptions/)
- [Oracle Collections Framework](https://docs.oracle.com/javase/tutorial/collections/)
- [Oracle Generics Tutorial](https://docs.oracle.com/javase/tutorial/java/generics/)

### Practice Platforms
- HackerRank Java track
- LeetCode (String and Collection problems)
- CodingBat Java exercises
- GeeksforGeeks practice problems

---

## ✅ Self-Assessment Checklist

Before moving to Week 4, ensure you can:

- [ ] Explain String immutability and its benefits
- [ ] Use StringBuilder for efficient string operations
- [ ] Create and organize code using packages
- [ ] Use static variables and methods appropriately
- [ ] Handle exceptions with try-catch-finally
- [ ] Create custom exception classes
- [ ] Choose the right collection for different scenarios
- [ ] Use ArrayList, HashSet, and HashMap effectively
- [ ] Sort collections using Comparable and Comparator
- [ ] Create generic classes and methods
- [ ] Understand bounded types and wildcards

---

## 🎓 Assessment

Complete the Week 3 assessment to test your knowledge:
- Day 15-21 assessments available in the assessment section
- Practice exercises in each daily lesson
- Week 3 review project

---

## 🚀 Next Steps

After completing Week 3:
1. Review any concepts you found challenging
2. Complete the Week 3 project
3. Take the Week 3 assessment
4. Move on to Week 4: Essential Java Features

**Week 4 Preview:**
- File handling and I/O operations
- Java 8 features (Lambda expressions, Streams)
- Date and Time API
- Wrapper classes and autoboxing
- Multithreading basics

---

**Keep practicing and happy coding! 🎉**