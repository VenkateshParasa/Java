# Continuation of Exercises for Days 26 and 29
# Part 2: Remaining Day 26 and Complete Day 29

---

#### Exercise 3: Method References (20 minutes)

**What you'll learn:** Using method references as shorthand for lambdas

**Create class: `MethodReferencesDemo`**

**Concept:** **Method References** are shorthand notation for lambdas that call a single method. They make code more concise and readable.

```
Types of Method References:
1. Static method:        ClassName::staticMethod
2. Instance method:      object::instanceMethod
3. Instance method (any): ClassName::instanceMethod
4. Constructor:          ClassName::new

Lambda vs Method Reference:
x -> System.out.println(x)  ===  System.out::println
x -> x.toUpperCase()        ===  String::toUpperCase
() -> new ArrayList<>()     ===  ArrayList::new
```

**Step-by-Step:**

```java
import java.util.*;
import java.util.function.*;

public class MethodReferencesDemo {

    // Static method for reference
    public static void printMessage(String message) {
        System.out.println("Message: " + message);
    }

    public static int stringLength(String s) {
        return s.length();
    }

    // Instance method
    public void instancePrint(String s) {
        System.out.println("Instance: " + s);
    }

    public static void main(String[] args) {
        System.out.println("===== METHOD REFERENCES =====\n");

        // Type 1: Static Method Reference
        System.out.println("--- Type 1: Static Method ---");

        // Lambda version
        Consumer<String> lambda1 = s -> printMessage(s);
        lambda1.accept("Hello with lambda");

        // Method reference version
        Consumer<String> methodRef1 = MethodReferencesDemo::printMessage;
        methodRef1.accept("Hello with method reference");

        // Built-in static method
        Function<String, Integer> parser1 = s -> Integer.parseInt(s);
        Function<String, Integer> parser2 = Integer::parseInt;

        System.out.println("Parsed: " + parser2.apply("123"));

        // Type 2: Instance Method of Particular Object
        System.out.println("\n--- Type 2: Instance Method of Object ---");

        MethodReferencesDemo demo = new MethodReferencesDemo();

        // Lambda version
        Consumer<String> lambda2 = s -> demo.instancePrint(s);
        lambda2.accept("Lambda calling instance method");

        // Method reference version
        Consumer<String> methodRef2 = demo::instancePrint;
        methodRef2.accept("Method ref calling instance method");

        // Using System.out
        Consumer<String> printer1 = s -> System.out.println(s);
        Consumer<String> printer2 = System.out::println;

        printer2.accept("Printed with method reference");

        // Type 3: Instance Method of Arbitrary Object
        System.out.println("\n--- Type 3: Instance Method of Any Object ---");

        // Lambda version
        Function<String, String> lambda3 = s -> s.toUpperCase();
        System.out.println(lambda3.apply("hello"));

        // Method reference version
        Function<String, String> methodRef3 = String::toUpperCase;
        System.out.println(methodRef3.apply("world"));

        // Sorting example
        List<String> names = Arrays.asList("John", "alice", "BOB", "Charlie");

        // Lambda version
        names.sort((a, b) -> a.compareToIgnoreCase(b));
        System.out.println("Sorted with lambda: " + names);

        names = Arrays.asList("John", "alice", "BOB", "Charlie");

        // Method reference version
        names.sort(String::compareToIgnoreCase);
        System.out.println("Sorted with method ref: " + names);

        // Type 4: Constructor Reference
        System.out.println("\n--- Type 4: Constructor ---");

        // Lambda version
        Supplier<ArrayList<String>> lambda4 = () -> new ArrayList<>();
        ArrayList<String> list1 = lambda4.get();
        System.out.println("Created list with lambda: " + list1);

        // Method reference version
        Supplier<ArrayList<String>> methodRef4 = ArrayList::new;
        ArrayList<String> list2 = methodRef4.get();
        System.out.println("Created list with method ref: " + list2);

        // With parameters
        Function<Integer, ArrayList<String>> lambda5 = size -> new ArrayList<>(size);
        Function<Integer, ArrayList<String>> methodRef5 = ArrayList::new;

        ArrayList<String> list3 = methodRef5.apply(10);
        System.out.println("Created list with capacity: " + list3);

        // Real-world examples
        System.out.println("\n--- Real-World Examples ---");

        List<String> words = Arrays.asList("java", "python", "javascript", "ruby");

        // Example 1: Print all (method reference)
        System.out.print("Words: ");
        words.forEach(System.out::println);

        // Example 2: Convert to uppercase (method reference)
        List<String> upper = new ArrayList<>();
        words.forEach(w -> upper.add(w.toUpperCase()));
        System.out.println("Uppercase: " + upper);

        // Example 3: Get lengths (method reference)
        List<Integer> lengths = new ArrayList<>();
        words.stream()
             .map(String::length)
             .forEach(lengths::add);
        System.out.println("Lengths: " + lengths);

        // Example 4: Filter and process
        words.stream()
             .filter(w -> w.length() > 4)
             .map(String::toUpperCase)
             .forEach(System.out::println);

        System.out.println("\n=============================");
    }
}
```

**Expected Output:**
```
===== METHOD REFERENCES =====

--- Type 1: Static Method ---
Message: Hello with lambda
Message: Hello with method reference
Parsed: 123

--- Type 2: Instance Method of Object ---
Instance: Lambda calling instance method
Instance: Method ref calling instance method
Printed with method reference

--- Type 3: Instance Method of Any Object ---
HELLO
WORLD
Sorted with lambda: [alice, BOB, Charlie, John]
Sorted with method ref: [alice, BOB, Charlie, John]

--- Type 4: Constructor ---
Created list with lambda: []
Created list with method ref: []
Created list with capacity: []

--- Real-World Examples ---
Words: java
python
javascript
ruby
Uppercase: [JAVA, PYTHON, JAVASCRIPT, RUBY]
Lengths: [4, 6, 10, 4]
PYTHON
JAVASCRIPT

=============================
```

**💡 Method Reference Types:**

```java
// 1. Static method reference
Consumer<String> c = ClassName::staticMethod;
// Equivalent to: s -> ClassName.staticMethod(s)

// 2. Instance method of particular object
Consumer<String> c = object::instanceMethod;
// Equivalent to: s -> object.instanceMethod(s)

// 3. Instance method of arbitrary object
Function<String, String> f = String::toUpperCase;
// Equivalent to: s -> s.toUpperCase()

// 4. Constructor reference
Supplier<List> s = ArrayList::new;
// Equivalent to: () -> new ArrayList()
```

**When to Use Method References:**

| Lambda | Method Reference | Use When |
|--------|------------------|----------|
| `x -> System.out.println(x)` | `System.out::println` | Single method call |
| `x -> x.toString()` | `Object::toString` | Calling instance method |
| `() -> new ArrayList()` | `ArrayList::new` | Creating new instance |
| `x -> Math.abs(x)` | `Math::abs` | Static method call |

**✅ Success Criteria:**
- Understand all 4 types of method references
- Can convert lambdas to method references
- Know when method references are appropriate
- Can use constructor references

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Using method ref with extra logic | Method ref calls method only | Use lambda for complex logic |
| Wrong type for context | Type mismatch | Match functional interface signature |
| Using :: on expression | Need class/object name | Use lambda instead |

**🎯 Challenge:**
1. Convert all lambdas in previous exercises to method references where possible
2. Create comparator using method references
3. Build data pipeline with only method references
4. Implement factory pattern with constructor references

---

#### Exercise 4: Stream API Basics (25 minutes)

**What you'll learn:** Introduction to Stream API for collection processing

**Create class: `StreamBasics`**

**Concept:** **Stream API** provides functional approach to process collections. Streams don't store data; they convey elements from a source through a pipeline of operations.

```
Stream Pipeline:
Source → Intermediate Operations → Terminal Operation

List → filter() → map() → collect()
[1,2,3,4,5] → keep even → multiply by 2 → [4, 8]

Key Points:
- Streams don't modify source
- Lazy evaluation (only when terminal operation called)
- Can be used once only
- Support parallel processing
```

**Step-by-Step:**

```java
import java.util.*;
import java.util.stream.*;

public class StreamBasics {
    public static void main(String[] args) {
        System.out.println("===== STREAM API BASICS =====\n");

        // Part 1: Creating Streams
        System.out.println("--- Part 1: Creating Streams ---");

        // From collection
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        Stream<Integer> stream1 = numbers.stream();
        System.out.println("Stream from list created");

        // From array
        String[] names = {"John", "Alice", "Bob"};
        Stream<String> stream2 = Arrays.stream(names);
        System.out.println("Stream from array created");

        // Using Stream.of()
        Stream<String> stream3 = Stream.of("Apple", "Banana", "Cherry");
        System.out.println("Stream using Stream.of() created");

        // Using Stream.iterate()
        Stream<Integer> stream4 = Stream.iterate(0, n -> n + 2).limit(5);
        System.out.println("Stream using iterate: " + stream4.collect(Collectors.toList()));

        // Using Stream.generate()
        Stream<Double> stream5 = Stream.generate(Math::random).limit(3);
        System.out.println("Stream using generate: " + stream5.collect(Collectors.toList()));

        // Part 2: Intermediate Operations
        System.out.println("\n--- Part 2: Intermediate Operations ---");

        List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // filter - keep elements matching condition
        System.out.print("Even numbers: ");
        nums.stream()
            .filter(n -> n % 2 == 0)
            .forEach(n -> System.out.print(n + " "));
        System.out.println();

        // map - transform each element
        System.out.print("Squares: ");
        nums.stream()
            .map(n -> n * n)
            .forEach(n -> System.out.print(n + " "));
        System.out.println();

        // distinct - remove duplicates
        List<Integer> withDups = Arrays.asList(1, 2, 2, 3, 3, 3, 4, 4, 4, 4);
        System.out.print("Unique: ");
        withDups.stream()
                .distinct()
                .forEach(n -> System.out.print(n + " "));
        System.out.println();

        // sorted - sort elements
        List<Integer> unsorted = Arrays.asList(5, 2, 8, 1, 9, 3);
        System.out.print("Sorted: ");
        unsorted.stream()
                .sorted()
                .forEach(n -> System.out.print(n + " "));
        System.out.println();

        // limit - take first n elements
        System.out.print("First 3: ");
        nums.stream()
            .limit(3)
            .forEach(n -> System.out.print(n + " "));
        System.out.println();

        // skip - skip first n elements
        System.out.print("Skip first 5: ");
        nums.stream()
            .skip(5)
            .forEach(n -> System.out.print(n + " "));
        System.out.println();

        // Part 3: Terminal Operations
        System.out.println("\n--- Part 3: Terminal Operations ---");

        // forEach - perform action on each
        System.out.print("forEach: ");
        nums.stream()
            .limit(5)
            .forEach(n -> System.out.print(n + " "));
        System.out.println();

        // collect - gather results
        List<Integer> collected = nums.stream()
                                      .filter(n -> n > 5)
                                      .collect(Collectors.toList());
        System.out.println("Collected: " + collected);

        // count - count elements
        long count = nums.stream()
                         .filter(n -> n % 2 == 0)
                         .count();
        System.out.println("Count of even numbers: " + count);

        // anyMatch - check if any matches
        boolean hasEven = nums.stream()
                              .anyMatch(n -> n % 2 == 0);
        System.out.println("Has even number: " + hasEven);

        // allMatch - check if all match
        boolean allPositive = nums.stream()
                                  .allMatch(n -> n > 0);
        System.out.println("All positive: " + allPositive);

        // noneMatch - check if none match
        boolean noNegative = nums.stream()
                                 .noneMatch(n -> n < 0);
        System.out.println("No negative: " + noNegative);

        // findFirst - get first element
        Optional<Integer> first = nums.stream()
                                      .filter(n -> n > 5)
                                      .findFirst();
        System.out.println("First > 5: " + first.orElse(-1));

        // findAny - get any element
        Optional<Integer> any = nums.stream()
                                    .filter(n -> n > 5)
                                    .findAny();
        System.out.println("Any > 5: " + any.orElse(-1));

        // Part 4: Chaining Operations
        System.out.println("\n--- Part 4: Chaining Operations ---");

        // Complex pipeline
        List<Integer> result = nums.stream()
                                   .filter(n -> n % 2 == 0)    // Keep even
                                   .map(n -> n * 2)            // Double them
                                   .sorted()                   // Sort
                                   .distinct()                 // Remove dups
                                   .collect(Collectors.toList()); // Collect

        System.out.println("Pipeline result: " + result);

        // Part 5: String Operations
        System.out.println("\n--- Part 5: String Operations ---");

        List<String> words = Arrays.asList("java", "python", "javascript", "ruby", "go");

        // Convert to uppercase
        List<String> upperWords = words.stream()
                                       .map(String::toUpperCase)
                                       .collect(Collectors.toList());
        System.out.println("Uppercase: " + upperWords);

        // Filter by length
        List<String> longWords = words.stream()
                                      .filter(w -> w.length() > 4)
                                      .collect(Collectors.toList());
        System.out.println("Long words: " + longWords);

        // Get lengths
        List<Integer> wordLengths = words.stream()
                                         .map(String::length)
                                         .collect(Collectors.toList());
        System.out.println("Lengths: " + wordLengths);

        // Sort by length
        List<String> sortedByLength = words.stream()
                                           .sorted(Comparator.comparing(String::length))
                                           .collect(Collectors.toList());
        System.out.println("Sorted by length: " + sortedByLength);

        // Part 6: Practical Example
        System.out.println("\n--- Part 6: Practical Example ---");

        List<String> names2 = Arrays.asList("Alice", "Bob", "Charlie", "David", "Eve");

        // Find names starting with vowel, convert to uppercase, sort
        List<String> processed = names2.stream()
                                       .filter(n -> "AEIOUaeiou".indexOf(n.charAt(0)) != -1)
                                       .map(String::toUpperCase)
                                       .sorted()
                                       .collect(Collectors.toList());

        System.out.println("Names starting with vowel: " + processed);

        // Count names with length > 3
        long longNameCount = names2.stream()
                                    .filter(n -> n.length() > 3)
                                    .count();
        System.out.println("Names with length > 3: " + longNameCount);

        System.out.println("\n=============================");
    }
}
```

**Expected Output:**
```
===== STREAM API BASICS =====

--- Part 1: Creating Streams ---
Stream from list created
Stream from array created
Stream using Stream.of() created
Stream using iterate: [0, 2, 4, 6, 8]
Stream using generate: [0.123, 0.456, 0.789]

--- Part 2: Intermediate Operations ---
Even numbers: 2 4 6 8 10
Squares: 1 4 9 16 25 36 49 64 81 100
Unique: 1 2 3 4
Sorted: 1 2 3 5 8 9
First 3: 1 2 3
Skip first 5: 6 7 8 9 10

--- Part 3: Terminal Operations ---
forEach: 1 2 3 4 5
Collected: [6, 7, 8, 9, 10]
Count of even numbers: 5
Has even number: true
All positive: true
No negative: true
First > 5: 6
Any > 5: 6

--- Part 4: Chaining Operations ---
Pipeline result: [4, 8, 12, 16, 20]

--- Part 5: String Operations ---
Uppercase: [JAVA, PYTHON, JAVASCRIPT, RUBY, GO]
Long words: [python, javascript]
Lengths: [4, 6, 10, 4, 2]
Sorted by length: [go, java, ruby, python, javascript]

--- Part 6: Practical Example ---
Names starting with vowel: [ALICE, EVE]
Names with length > 3: 4

=============================
```

**💡 Stream Operations:**

```java
// Intermediate (return Stream)
filter()   - Keep matching elements
map()      - Transform elements
sorted()   - Sort elements
distinct() - Remove duplicates
limit()    - Take first n
skip()     - Skip first n
peek()     - Debug/observe elements

// Terminal (return result)
forEach()    - Perform action
collect()    - Gather to collection
count()      - Count elements
anyMatch()   - Check if any match
allMatch()   - Check if all match
noneMatch()  - Check if none match
findFirst()  - Get first element
findAny()    - Get any element
reduce()     - Combine elements
```

**✅ Success Criteria:**
- Can create streams from various sources
- Understand intermediate vs terminal operations
- Can chain multiple operations
- Know when to use each operation
- Understand lazy evaluation

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Reusing stream | Streams can be used once | Create new stream each time |
| Forgetting terminal operation | Nothing happens | Always end with terminal op |
| Modifying source in stream | Unpredictable behavior | Don't modify source collection |
| Using forEach with side effects | Against functional style | Use map/filter/collect |

**🎯 Challenge:**
1. Process list of students (name, age, grade) - filter, sort, collect
2. Find all prime numbers in range using streams
3. Group strings by length
4. Calculate statistics (sum, average, max, min)
5. Implement parallel stream operations

---

#### Exercise 5: Stream Collectors (20 minutes)

**What you'll learn:** Using Collectors for advanced stream gathering operations

**Create class: `StreamCollectorsDemo`**

**Concept:** **Collectors** provide various ways to accumulate stream elements into collections, summarize data, or group/partition elements.

**Step-by-Step:**

```java
import java.util.*;
import java.util.stream.*;

class Employee {
    String name;
    String department;
    double salary;

    Employee(String name, String department, double salary) {
        this.name = name;
        this.department = department;
        this.salary = salary;
    }

    public String getName() { return name; }
    public String getDepartment() { return department; }
    public double getSalary() { return salary; }

    @Override
    public String toString() {
        return name + " (" + department + ", $" + salary + ")";
    }
}

public class StreamCollectorsDemo {
    public static void main(String[] args) {
        System.out.println("===== STREAM COLLECTORS =====\n");

        // Sample data
        List<Employee> employees = Arrays.asList(
            new Employee("John", "IT", 75000),
            new Employee("Alice", "HR", 65000),
            new Employee("Bob", "IT", 80000),
            new Employee("Charlie", "Finance", 70000),
            new Employee("David", "HR", 60000),
            new Employee("Eve", "IT", 85000)
        );

        // Collector 1: toList()
        System.out.println("--- Collector 1: toList ---");
        List<String> names = employees.stream()
                                      .map(Employee::getName)
                                      .collect(Collectors.toList());
        System.out.println("Names: " + names);

        // Collector 2: toSet()
        System.out.println("\n--- Collector 2: toSet ---");
        Set<String> departments = employees.stream()
                                           .map(Employee::getDepartment)
                                           .collect(Collectors.toSet());
        System.out.println("Unique departments: " + departments);

        // Collector 3: toMap()
        System.out.println("\n--- Collector 3: toMap ---");
        Map<String, Double> nameToSalary = employees.stream()
                                                    .collect(Collectors.toMap(
                                                        Employee::getName,
                                                        Employee::getSalary
                                                    ));
        System.out.println("Name to Salary map: " + nameToSalary);

        // Collector 4: groupingBy()
        System.out.println("\n--- Collector 4: groupingBy ---");
        Map<String, List<Employee>> byDept = employees.stream()
                                                      .collect(Collectors.groupingBy(
                                                          Employee::getDepartment
                                                      ));
        System.out.println("Grouped by department:");
        byDept.forEach((dept, emps) -> {
            System.out.println(dept + ": " + emps.size() + " employees");
        });

        // Collector 5: partitioningBy()
        System.out.println("\n--- Collector 5: partitioningBy ---");
        Map<Boolean, List<Employee>> byHighSalary = employees.stream()
                                                             .collect(Collectors.partitioningBy(
                                                                 e -> e.getSalary() > 70000
                                                             ));
        System.out.println("High salary (>70k): " + byHighSalary.get(true).size());
        System.out.println("Low salary (<=70k): " + byHighSalary.get(false).size());

        // Collector 6: counting()
        System.out.println("\n--- Collector 6: counting ---");
        long count = employees.stream()
                              .filter(e -> e.getDepartment().equals("IT"))
                              .collect(Collectors.counting());
        System.out.println("IT employees: " + count);

        // Collector 7: summarizingDouble()
        System.out.println("\n--- Collector 7: summarizingDouble ---");
        DoubleSummaryStatistics stats = employees.stream()
                                                 .collect(Collectors.summarizingDouble(
                                                     Employee::getSalary
                                                 ));
        System.out.println("Salary Statistics:");
        System.out.println("  Count: " + stats.getCount());
        System.out.println("  Sum: $" + stats.getSum());
        System.out.println("  Average: $" + stats.getAverage());
        System.out.println("  Min: $" + stats.getMin());
        System.out.println("  Max: $" + stats.getMax());

        // Collector 8: joining()
        System.out.println("\n--- Collector 8: joining ---");
        String nameList = employees.stream()
                                   .map(Employee::getName)
                                   .collect(Collectors.joining(", "));
        System.out.println("All names: " + nameList);

        String fancyList = employees.stream()
                                    .map(Employee::getName)
                                    .collect(Collectors.joining(", ", "[", "]"));
        System.out.println("Fancy format: " + fancyList);

        // Collector 9: averagingDouble()
        System.out.println("\n--- Collector 9: averagingDouble ---");
        double avgSalary = employees.stream()
                                    .collect(Collectors.averagingDouble(
                                        Employee::getSalary
                                    ));
        System.out.println("Average salary: $" + avgSalary);

        // Collector 10: maxBy/minBy()
        System.out.println("\n--- Collector 10: maxBy/minBy ---");
        Optional<Employee> highestPaid = employees.stream()
                                                  .collect(Collectors.maxBy(
                                                      Comparator.comparing(Employee::getSalary)
                                                  ));
        highestPaid.ifPresent(e -> System.out.println("Highest paid: " + e));

        Optional<Employee> lowestPaid = employees.stream()
                                                 .collect(Collectors.minBy(
                                                     Comparator.comparing(Employee::getSalary)
                                                 ));
        lowestPaid.ifPresent(e -> System.out.println("Lowest paid: " + e));

        // Advanced: Nested grouping
        System.out.println("\n--- Advanced: Nested Grouping ---");
        Map<String, Long> deptCount = employees.stream()
                                               .collect(Collectors.groupingBy(
                                                   Employee::getDepartment,
                                                   Collectors.counting()
                                               ));
        System.out.println("Department employee counts: " + deptCount);

        Map<String, Double> deptAvgSalary = employees.stream()
                                                     .collect(Collectors.groupingBy(
                                                         Employee::getDepartment,
                                                         Collectors.averagingDouble(Employee::getSalary)
                                                     ));
        System.out.println("Department average salaries: " + deptAvgSalary);

        System.out.println("\n=============================");
    }
}
```

**Expected Output:**
```
===== STREAM COLLECTORS =====

--- Collector 1: toList ---
Names: [John, Alice, Bob, Charlie, David, Eve]

--- Collector 2: toSet ---
Unique departments: [IT, HR, Finance]

--- Collector 3: toMap ---
Name to Salary map: {John=75000.0, Alice=65000.0, Bob=80000.0, Charlie=70000.0, David=60000.0, Eve=85000.0}

--- Collector 4: groupingBy ---
Grouped by department:
IT: 3 employees
HR: 2 employees
Finance: 1 employees

--- Collector 5: partitioningBy ---
High salary (>70k): 4
Low salary (<=70k): 2

--- Collector 6: counting ---
IT employees: 3

--- Collector 7: summarizingDouble ---
Salary Statistics:
  Count: 6
  Sum: $435000.0
  Average: $72500.0
  Min: $60000.0
  Max: $85000.0

--- Collector 8: joining ---
All names: John, Alice, Bob, Charlie, David, Eve
Fancy format: [John, Alice, Bob, Charlie, David, Eve]

--- Collector 9: averagingDouble ---
Average salary: $72500.0

--- Collector 10: maxBy/minBy ---
Highest paid: Eve (IT, $85000.0)
Lowest paid: David (HR, $60000.0)

--- Advanced: Nested Grouping ---
Department employee counts: {IT=3, HR=2, Finance=1}
Department average salaries: {IT=80000.0, HR=62500.0, Finance=70000.0}

=============================
```

**💡 Common Collectors:**

```java
// Collection Collectors
toList()          - Collect to List
toSet()           - Collect to Set
toMap()           - Collect to Map
toCollection()    - Collect to specific collection

// Grouping/Partitioning
groupingBy()      - Group by key
partitioningBy()  - Partition by boolean

// Statistical
counting()        - Count elements
summarizing()     - Get statistics (count, sum, min, max, avg)
averaging()       - Calculate average
summing()         - Calculate sum

// String
joining()         - Join strings with delimiter

// Min/Max
maxBy()           - Find maximum
minBy()           - Find minimum
```

**✅ Success Criteria:**
- Can collect streams to various collections
- Know how to group and partition data
- Understand statistical collectors
- Can use nested grouping
- Master joining operations

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| toMap() with duplicate keys | Throws exception | Provide merge function |
| Not handling Optional | NullPointerException | Use Optional methods |
| Wrong collector for task | Inefficient or wrong result | Choose appropriate collector |

**🎯 Challenge:**
1. Group employees by salary range (<50k, 50-75k, >75k)
2. Find top 3 highest paid in each department
3. Calculate total salary by department
4. Create map of department to list of employee names
5. Partition by multiple conditions (chaining)

---

#### Exercise 6: Practical Stream Applications (30 minutes)

**What you'll learn:** Solving real-world problems with streams

**Create class: `StreamApplications`**

**Concept:** Combining stream operations to solve practical problems.

**Step-by-Step:**

```java
import java.util.*;
import java.util.stream.*;

class Product {
    String name;
    String category;
    double price;
    int quantity;

    Product(String name, String category, double price, int quantity) {
        this.name = name;
        this.category = category;
        this.price = price;
        this.quantity = quantity;
    }

    public String getName() { return name; }
    public String getCategory() { return category; }
    public double getPrice() { return price; }
    public int getQuantity() { return quantity; }
    public double getTotalValue() { return price * quantity; }

    @Override
    public String toString() {
        return name + " (" + category + ", $" + price + ", qty:" + quantity + ")";
    }
}

public class StreamApplications {

    // Application 1: Data filtering and transformation
    public static void filterAndTransform() {
        System.out.println("--- Application 1: Filter & Transform ---");

        List<Product> products = Arrays.asList(
            new Product("Laptop", "Electronics", 1200, 5),
            new Product("Mouse", "Electronics", 25, 50),
            new Product("Desk", "Furniture", 300, 10),
            new Product("Chair", "Furniture", 150, 20),
            new Product("Keyboard", "Electronics", 75, 30)
        );

        // Find all electronics under $100
        List<String> cheapElectronics = products.stream()
            .filter(p -> p.getCategory().equals("Electronics"))
            .filter(p -> p.getPrice() < 100)
            .map(Product::getName)
            .collect(Collectors.toList());

        System.out.println("Cheap electronics: " + cheapElectronics);

        // Calculate total inventory value
        double totalValue = products.stream()
            .mapToDouble(Product::getTotalValue)
            .sum();

        System.out.println("Total inventory value: $" + totalValue);
    }

    // Application 2: Grouping and aggregation
    public static void groupAndAggregate() {
        System.out.println("\n--- Application 2: Group & Aggregate ---");

        List<Product> products = Arrays.asList(
            new Product("Laptop", "Electronics", 1200, 5),
            new Product("Mouse", "Electronics", 25, 50),
            new Product("Desk", "Furniture", 300, 10),
            new Product("Chair", "Furniture", 150, 20),
            new Product("Keyboard", "Electronics", 75, 30)
        );

        // Group by category and count
        Map<String, Long> categoryCount = products.stream()
            .collect(Collectors.groupingBy(
                Product::getCategory,
                Collectors.counting()
            ));

        System.out.println("Products per category: " + categoryCount);

        // Total value per category
        Map<String, Double> categoryValue = products.stream()
            .collect(Collectors.groupingBy(
                Product::getCategory,
                Collectors.summingDouble(Product::getTotalValue)
            ));

        System.out.println("Value per category: " + categoryValue);

        // Most expensive product per category
        Map<String, Optional<Product>> mostExpensive = products.stream()
            .collect(Collectors.groupingBy(
                Product::getCategory,
                Collectors.maxBy(Comparator.comparing(Product::getPrice))
            ));

        System.out.println("\nMost expensive per category:");
        mostExpensive.forEach((cat, prod) ->
            prod.ifPresent(p -> System.out.println("  " + cat + ": " + p.getName()))
        );
    }

    // Application 3: Finding and matching
    public static void findAndMatch() {
        System.out.println("\n--- Application 3: Find & Match ---");

        List<Product> products = Arrays.asList(
            new Product("Laptop", "Electronics", 1200, 5),
            new Product("Mouse", "Electronics", 25, 50),
            new Product("Desk", "Furniture", 300, 10),
            new Product("Chair", "Furniture", 150, 20),
            new Product("Keyboard", "Electronics", 75, 30)
        );

        // Find any product under $50
        Optional<Product> cheap = products.stream()
            .filter(p -> p.getPrice() < 50)
            .findAny();

        cheap.ifPresent(p -> System.out.println("Found cheap product: " + p.getName()));

        // Check if all electronics are in stock
        boolean allInStock = products.stream()
            .filter(p -> p.getCategory().equals("Electronics"))
            .allMatch(p -> p.getQuantity() > 0);

        System.out.println("All electronics in stock: " + allInStock);

        // Check if any furniture is expensive (>$500)
        boolean hasExpensiveFurniture = products.stream()
            .filter(p -> p.getCategory().equals("Furniture"))
            .anyMatch(p -> p.getPrice() > 500);

        System.out.println("Has expensive furniture: " + hasExpensiveFurniture);
    }

    // Application 4: Sorting and ranking
    public static void sortAndRank() {
        System.out.println("\n--- Application 4: Sort & Rank ---");

        List<Product> products = Arrays.asList(
            new Product("Laptop", "Electronics", 1200, 5),
            new Product("Mouse", "Electronics", 25, 50),
            new Product("Desk", "Furniture", 300, 10),
            new Product("Chair", "Furniture", 150, 20),
            new Product("Keyboard", "Electronics", 75, 30)
        );

        // Top 3 most valuable products
        System.out.println("Top 3 by value:");
        products.stream()
            .sorted(Comparator.comparing(Product::getTotalValue).reversed())
            .limit(3)
            .forEach(p -> System.out.println("  " + p.getName() + ": $" + p.getTotalValue()));

        // Products sorted by category then price
        System.out.println("\nSorted by category then price:");
        products.stream()
            .sorted(Comparator.comparing(Product::getCategory)
                             .thenComparing(Product::getPrice))
            .forEach(p -> System.out.println("  " + p));
    }

    // Application 5: Statistical analysis
    public static void analyzeStatistics() {
        System.out.println("\n--- Application 5: Statistics ---");

        List<Product> products = Arrays.asList(
            new Product("Laptop", "Electronics", 1200, 5),
            new Product("Mouse", "Electronics", 25, 50),
            new Product("Desk", "Furniture", 300, 10),
            new Product("Chair", "Furniture", 150, 20),
            new Product("Keyboard", "Electronics", 75, 30)
        );

        DoubleSummaryStatistics priceStats = products.stream()
            .collect(Collectors.summarizingDouble(Product::getPrice));

        System.out.println("Price Statistics:");
        System.out.println("  Average: $" + priceStats.getAverage());
        System.out.println("  Min: $" + priceStats.getMin());
        System.out.println("  Max: $" + priceStats.getMax());

        // Total quantity
        int totalQuantity = products.stream()
            .mapToInt(Product::getQuantity)
            .sum();

        System.out.println("  Total quantity: " + totalQuantity);
    }

    public static void main(String[] args) {
        System.out.println("===== PRACTICAL STREAM APPLICATIONS =====\n");

        filterAndTransform();
        groupAndAggregate();
        findAndMatch();
        sortAndRank();
        analyzeStatistics();

        System.out.println("\n========================================");
    }
}
```

**Expected Output:**
```
===== PRACTICAL STREAM APPLICATIONS =====

--- Application 1: Filter & Transform ---
Cheap electronics: [Mouse, Keyboard]
Total inventory value: $12875.0

--- Application 2: Group & Aggregate ---
Products per category: {Electronics=3, Furniture=2}
Value per category: {Electronics=8375.0, Furniture=6000.0}

Most expensive per category:
  Electronics: Laptop
  Furniture: Desk

--- Application 3: Find & Match ---
Found cheap product: Mouse
All electronics in stock: true
Has expensive furniture: false

--- Application 4: Sort & Rank ---
Top 3 by value:
  Laptop: $6000.0
  Chair: $3000.0
  Desk: $3000.0

Sorted by category then price:
  Mouse (Electronics, $25.0, qty:50)
  Keyboard (Electronics, $75.0, qty:30)
  Laptop (Electronics, $1200.0, qty:5)
  Chair (Furniture, $150.0, qty:20)
  Desk (Furniture, $300.0, qty:10)

--- Application 5: Statistics ---
Price Statistics:
  Average: $350.0
  Min: $25.0
  Max: $1200.0
  Total quantity: 115

========================================
```

**✅ Success Criteria:**
- Can solve complex data processing problems
- Master combining multiple stream operations
- Understand grouping and aggregation
- Can perform statistical analysis
- Know how to sort with multiple criteria

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Multiple terminal operations | Can't reuse stream | Create new stream for each |
| Not handling empty streams | NullPointerException | Use Optional properly |
| Inefficient operations order | Slow performance | Filter before map/sort |
| Side effects in streams | Unpredictable results | Use proper collectors |

**🎯 Challenge:**
1. Build recommendation system based on product similarity
2. Implement shopping cart with discounts using streams
3. Create report generator with multiple groupings
4. Build search engine with relevance scoring
5. Implement data validation pipeline

---

#### Exercise 7: Stream Best Practices (15 minutes)

**What you'll learn:** Best practices and common pitfalls with streams

**Create class: `StreamBestPractices`**

**Concept:** Understanding when and how to use streams effectively.

```java
import java.util.*;
import java.util.stream.*;

public class StreamBestPractices {
    public static void main(String[] args) {
        System.out.println("===== STREAM BEST PRACTICES =====\n");

        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // Practice 1: Use method references when possible
        System.out.println("--- Practice 1: Method References ---");

        // Good: Method reference
        numbers.stream()
               .map(Object::toString)
               .forEach(System.out::println);

        // Practice 2: Filter before map
        System.out.println("\n--- Practice 2: Filter Before Map ---");

        // Good: Filter first (efficient)
        long count1 = numbers.stream()
                             .filter(n -> n % 2 == 0)
                             .map(n -> n * n)
                             .count();

        // Bad: Map first (inefficient - maps all, then filters)
        // long count2 = numbers.stream()
        //                      .map(n -> n * n)
        //                      .filter(n -> n % 2 == 0)
        //                      .count();

        System.out.println("Count: " + count1);

        // Practice 3: Use appropriate primitivestreams
        System.out.println("\n--- Practice 3: Primitive Streams ---");

        // Good: IntStream for primitives
        int sum1 = numbers.stream()
                          .mapToInt(Integer::intValue)
                          .sum();

        System.out.println("Sum: " + sum1);

        // Practice 4: Avoid side effects
        System.out.println("\n--- Practice 4: Avoid Side Effects ---");

        // Bad: Modifying external variable
        List<Integer> results = new ArrayList<>();
        numbers.stream()
               .forEach(n -> results.add(n * 2)); // Side effect!

        // Good: Use collect
        List<Integer> results2 = numbers.stream()
                                        .map(n -> n * 2)
                                        .collect(Collectors.toList());

        System.out.println("Results: " + results2);

        // Practice 5: Don't reuse streams
        System.out.println("\n--- Practice 5: Don't Reuse Streams ---");

        Stream<Integer> stream = numbers.stream();
        stream.forEach(System.out::print);
        System.out.println();

        // This would throw exception:
        // stream.forEach(System.out::print);

        // Good: Create new stream
        numbers.stream().forEach(System.out::print);
        System.out.println();

        // Practice 6: When NOT to use streams
        System.out.println("\n--- Practice 6: When NOT to Use ---");

        // Simple iteration - loop is clearer
        for (int i = 0; i < 5; i++) {
            System.out.print(i + " ");
        }
        System.out.println("\n");

        // Practice 7: Parallel streams (use carefully)
        System.out.println("--- Practice 7: Parallel Streams ---");

        long start = System.currentTimeMillis();
        numbers.stream()
               .map(n -> n * n)
               .forEach(n -> {});
        long sequential = System.currentTimeMillis() - start;

        start = System.currentTimeMillis();
        numbers.parallelStream()
               .map(n -> n * n)
               .forEach(n -> {});
        long parallel = System.currentTimeMillis() - start;

        System.out.println("Sequential: " + sequential + "ms");
        System.out.println("Parallel: " + parallel + "ms");
        System.out.println("Note: For small collections, parallel may be slower!");

        System.out.println("\n================================");
    }
}
```

**💡 Stream Best Practices:**

```java
// ✅ DO
- Use method references
- Filter before map
- Use primitive streams for numbers
- Avoid side effects
- Choose streams for complex pipelines
- Use parallel carefully

// ❌ DON'T
- Reuse streams
- Modify external state
- Use for simple iterations
- Ignore performance implications
- Overuse parallel streams
```

**When to Use Streams:**
- Complex data transformations
- Multiple filtering/mapping operations
- Group/partition data
- Statistical operations
- Parallel processing (large datasets)

**When NOT to Use Streams:**
- Simple loops (i = 0 to n)
- Single operation
- Need index access
- Modifying collection during iteration
- Debugging complex logic

**✅ Success Criteria:**
- Understand stream best practices
- Know when to use/avoid streams
- Can optimize stream performance
- Avoid common pitfalls

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Reusing streams | IllegalStateException | Create new stream |
| Side effects | Unpredictable results | Use pure functions |
| Parallel for small data | Overhead > benefit | Use sequential |
| Complex nested streams | Hard to debug | Break into steps |

**🎯 Challenge:**
1. Benchmark sequential vs parallel for different data sizes
2. Refactor existing loops to streams (and vice versa)
3. Optimize slow stream pipeline
4. Handle large datasets efficiently

---

**🎯 Day 26 Complete! You now master Java 8 Lambda & Streams!**

---

### Day 29: Multithreading Basics

---

#### Exercise 1: Thread Creation and Execution (20 minutes)

**What you'll learn:** Creating and starting threads in Java

**Create class: `ThreadCreationDemo`**

**Concept:** **Multithreading** allows concurrent execution of two or more parts of a program. Java provides two ways to create threads:
1. Extending Thread class
2. Implementing Runnable interface (preferred)

```
Why Multithreading?
- Better CPU utilization
- Responsive UI
- Parallel task execution
- Background operations

Thread vs Process:
- Process: Complete program
- Thread: Lightweight subprocess within program
```

**Step-by-Step:**

```java
// Method 1: Extending Thread class
class MyThread extends Thread {
    private String threadName;

    MyThread(String name) {
        this.threadName = name;
    }

    @Override
    public void run() {
        System.out.println(threadName + " starting...");

        for (int i = 1; i <= 5; i++) {
            System.out.println(threadName + ": " + i);
            try {
                Thread.sleep(500); // Sleep 500ms
            } catch (InterruptedException e) {
                System.out.println(threadName + " interrupted");
            }
        }

        System.out.println(threadName + " finished!");
    }
}

// Method 2: Implementing Runnable interface (PREFERRED)
class MyRunnable implements Runnable {
    private String threadName;

    MyRunnable(String name) {
        this.threadName = name;
    }

    @Override
    public void run() {
        System.out.println(threadName + " starting...");

        for (int i = 1; i <= 5; i++) {
            System.out.println(threadName + ": " + i);
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                System.out.println(threadName + " interrupted");
            }
        }

        System.out.println(threadName + " finished!");
    }
}

public class ThreadCreationDemo {
    public static void main(String[] args) {
        System.out.println("===== THREAD CREATION =====\n");
        System.out.println("Main thread: " + Thread.currentThread().getName());

        // Method 1: Using Thread class
        System.out.println("\n--- Method 1: Thread Class ---");
        MyThread thread1 = new MyThread("Thread-A");
        MyThread thread2 = new MyThread("Thread-B");

        thread1.start(); // Start thread (calls run internally)
        thread2.start();

        try {
            thread1.join(); // Wait for thread1 to finish
            thread2.join(); // Wait for thread2 to finish
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Method 2: Using Runnable interface
        System.out.println("\n--- Method 2: Runnable Interface ---");
        MyRunnable runnable1 = new MyRunnable("Runnable-X");
        MyRunnable runnable2 = new MyRunnable("Runnable-Y");

        Thread thread3 = new Thread(runnable1);
        Thread thread4 = new Thread(runnable2);

        thread3.start();
        thread4.start();

        try {
            thread3.join();
            thread4.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Method 3: Using Lambda (Java 8+)
        System.out.println("\n--- Method 3: Lambda Expression ---");

        Thread thread5 = new Thread(() -> {
            System.out.println("Lambda thread starting...");
            for (int i = 1; i <= 3; i++) {
                System.out.println("Lambda: " + i);
                try {
                    Thread.sleep(300);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            System.out.println("Lambda thread finished!");
        });

        thread5.start();

        try {
            thread5.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Method 4: Anonymous class
        System.out.println("\n--- Method 4: Anonymous Class ---");

        Thread thread6 = new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("Anonymous thread starting...");
                for (int i = 1; i <= 3; i++) {
                    System.out.println("Anonymous: " + i);
                    try {
                        Thread.sleep(300);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
                System.out.println("Anonymous thread finished!");
            }
        });

        thread6.start();

        try {
            thread6.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("\n===========================");
        System.out.println("All threads completed!");
    }
}
```

**Expected Output:**
```
===== THREAD CREATION =====

Main thread: main

--- Method 1: Thread Class ---
Thread-A starting...
Thread-B starting...
Thread-A: 1
Thread-B: 1
Thread-A: 2
Thread-B: 2
Thread-A: 3
Thread-B: 3
Thread-A: 4
Thread-B: 4
Thread-A: 5
Thread-B: 5
Thread-A finished!
Thread-B finished!

--- Method 2: Runnable Interface ---
Runnable-X starting...
Runnable-Y starting...
Runnable-X: 1
Runnable-Y: 1
Runnable-X: 2
Runnable-Y: 2
Runnable-X: 3
Runnable-Y: 3
Runnable-X: 4
Runnable-Y: 4
Runnable-X: 5
Runnable-Y: 5
Runnable-X finished!
Runnable-Y finished!

--- Method 3: Lambda Expression ---
Lambda thread starting...
Lambda: 1
Lambda: 2
Lambda: 3
Lambda thread finished!

--- Method 4: Anonymous Class ---
Anonymous thread starting...
Anonymous: 1
Anonymous: 2
Anonymous: 3
Anonymous thread finished!

===========================
All threads completed!
```

**💡 Thread Creation Methods:**

```java
// Method 1: Extend Thread (NOT recommended)
class MyThread extends Thread {
    public void run() {
        // Thread code
    }
}
MyThread t = new MyThread();
t.start();

// Method 2: Implement Runnable (RECOMMENDED)
class MyRunnable implements Runnable {
    public void run() {
        // Thread code
    }
}
Thread t = new Thread(new MyRunnable());
t.start();

// Method 3: Lambda (BEST for simple tasks)
Thread t = new Thread(() -> {
    // Thread code
});
t.start();

// Method 4: Anonymous class
Thread t = new Thread(new Runnable() {
    public void run() {
        // Thread code
    }
});
t.start();
```

**Important Methods:**

| Method | Description |
|--------|-------------|
| `start()` | Starts thread execution |
| `run()` | Contains thread logic (don't call directly!) |
| `join()` | Wait for thread to finish |
| `sleep(ms)` | Pause thread for milliseconds |
| `getName()` | Get thread name |
| `setName()` | Set thread name |

**✅ Success Criteria:**
- Can create threads using both methods
- Understand start() vs run()
- Know how to use join()
- Can implement with lambda
- Understand thread lifecycle basics

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Calling `run()` directly | Runs in same thread | Call `start()` to create new thread |
| Not handling InterruptedException | Compilation error | Use try-catch |
| Extending Thread unnecessarily | Limits inheritance | Use Runnable instead |
| Not waiting with join() | Main exits before threads finish | Use join() when needed |

**🎯 Challenge:**
1. Create 5 threads that count simultaneously
2. Implement thread that downloads data (simulated)
3. Create producer thread and consumer thread
4. Build simple timer using thread
5. Implement thread pool manually

---

#### Exercise 2: Thread Lifecycle and States (20 minutes)

**What you'll learn:** Understanding thread lifecycle and states

**Create class: `ThreadLifecycleDemo`**

**Concept:** **Thread Lifecycle** - A thread goes through various states from creation to termination:

```
NEW → RUNNABLE → RUNNING → TERMINATED
         ↕           ↕
      WAITING    TIMED_WAITING
         ↕
      BLOCKED

States:
1. NEW: Created but not started
2. RUNNABLE: Ready to run
3. RUNNING: Executing
4. WAITING: Waiting indefinitely
5. TIMED_WAITING: Waiting for specified time
6. BLOCKED: Waiting for lock
7. TERMINATED: Finished execution
```

**Step-by-Step:**

```java
class LifecycleThread extends Thread {
    private String threadName;

    LifecycleThread(String name) {
        this.threadName = name;
        System.out.println(threadName + " created (NEW state)");
    }

    @Override
    public void run() {
        System.out.println(threadName + " now RUNNING");

        try {
            // Simulate some work
            for (int i = 1; i <= 3; i++) {
                System.out.println(threadName + " working... " + i);
                Thread.sleep(1000); // TIMED_WAITING state
            }

            // Demonstrate waiting
            synchronized (this) {
                System.out.println(threadName + " waiting...");
                wait(2000); // WAITING state (with timeout = TIMED_WAITING)
            }

        } catch (InterruptedException e) {
            System.out.println(threadName + " interrupted");
        }

        System.out.println(threadName + " finishing (will be TERMINATED)");
    }
}

public class ThreadLifecycleDemo {

    public static void printThreadState(Thread thread, String label) {
        System.out.println(label + " - State: " + thread.getState());
    }

    public static void main(String[] args) {
        System.out.println("===== THREAD LIFECYCLE =====\n");

        // Create thread (NEW state)
        LifecycleThread thread = new LifecycleThread("Worker");
        printThreadState(thread, "After creation");

        // Start thread (RUNNABLE state)
        thread.start();
        printThreadState(thread, "After start()");

        // Check state while running
        try {
            Thread.sleep(500);
            printThreadState(thread, "While running");

            Thread.sleep(1500);
            printThreadState(thread, "During sleep");

            // Wait for thread to finish
            thread.join();
            printThreadState(thread, "After completion");

        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Demonstrate all states
        System.out.println("\n--- Demonstrating All States ---");

        // State: NEW
        Thread t1 = new Thread(() -> {
            try {
                Thread.sleep(5000);
            } catch (InterruptedException e) {}
        });
        System.out.println("Thread t1: " + t1.getState()); // NEW

        // State: RUNNABLE
        t1.start();
        System.out.println("Thread t1: " + t1.getState()); // RUNNABLE

        // State: TIMED_WAITING
        try {
            Thread.sleep(100);
            System.out.println("Thread t1: " + t1.getState()); // TIMED_WAITING

            // State: TERMINATED
            t1.join();
            System.out.println("Thread t1: " + t1.getState()); // TERMINATED

        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Demonstrate BLOCKED state
        System.out.println("\n--- Demonstrating BLOCKED State ---");

        Object lock = new Object();

        Thread t2 = new Thread(() -> {
            synchronized (lock) {
                System.out.println("t2 acquired lock");
                try {
                    Thread.sleep(3000);
                } catch (InterruptedException e) {}
                System.out.println("t2 releasing lock");
            }
        });

        Thread t3 = new Thread(() -> {
            System.out.println("t3 trying to acquire lock");
            synchronized (lock) {
                System.out.println("t3 acquired lock");
            }
        });

        t2.start();

        try {
            Thread.sleep(500); // Let t2 acquire lock first
        } catch (InterruptedException e) {}

        t3.start();

        try {
            Thread.sleep(500); // Let t3 try to acquire lock
            System.out.println("Thread t3: " + t3.getState()); // BLOCKED

            t2.join();
            t3.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Thread information
        System.out.println("\n--- Thread Information ---");
        Thread mainThread = Thread.currentThread();
        System.out.println("Name: " + mainThread.getName());
        System.out.println("Priority: " + mainThread.getPriority());
        System.out.println("State: " + mainThread.getState());
        System.out.println("Is Alive: " + mainThread.isAlive());
        System.out.println("Is Daemon: " + mainThread.isDaemon());

        System.out.println("\n============================");
    }
}
```

**Expected Output:**
```
===== THREAD LIFECYCLE =====

Worker created (NEW state)
After creation - State: NEW
Worker now RUNNING
After start() - State: RUNNABLE
Worker working... 1
While running - State: TIMED_WAITING
Worker working... 2
During sleep - State: TIMED_WAITING
Worker working... 3
Worker waiting...
Worker finishing (will be TERMINATED)
After completion - State: TERMINATED

--- Demonstrating All States ---
Thread t1: NEW
Thread t1: RUNNABLE
Thread t1: TIMED_WAITING
Thread t1: TERMINATED

--- Demonstrating BLOCKED State ---
t2 acquired lock
t3 trying to acquire lock
Thread t3: BLOCKED
t2 releasing lock
t3 acquired lock

--- Thread Information ---
Name: main
Priority: 5
State: RUNNABLE
Is Alive: true
Is Daemon: false

============================
```

**💡 Thread States:**

```java
// Get thread state
Thread.State state = thread.getState();

// States:
NEW            // Created, not started
RUNNABLE       // Executing or ready to execute
TIMED_WAITING  // Waiting for specified time
WAITING        // Waiting indefinitely
BLOCKED        // Waiting for monitor lock
TERMINATED     // Completed execution

// Methods that change state:
start()        // NEW → RUNNABLE
sleep()        // RUNNING → TIMED_WAITING
wait()         // RUNNING → WAITING/TIMED_WAITING
notify()       // WAITING → RUNNABLE
join()         // Wait for another thread
// Finish run() → TERMINATED
```

**✅ Success Criteria:**
- Understand all thread states
- Can check thread state with getState()
- Know methods that transition between states
- Understand blocked vs waiting
- Can get thread information

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Assuming immediate state change | States change asynchronously | Check state at specific points |
| Not handling thread completion | Resource leaks | Use join() or check isAlive() |
| Confusing BLOCKED and WAITING | Different causes | BLOCKED = lock, WAITING = wait() |

**🎯 Challenge:**
1. Create thread state visualizer
2. Implement thread monitor that logs state changes
3. Build thread lifecycle diagram generator
4. Create thread pool with state tracking

---

#### Exercise 3: Thread Methods and Control (20 minutes)

**What you'll learn:** Using thread control methods

**Create class: `ThreadMethodsDemo`**

**Concept:** Java provides various methods to control thread execution:
- Priority management
- Daemon threads
- Thread interruption
- Thread naming

**Step-by-Step:**

```java
public class ThreadMethodsDemo {

    // Demonstrate thread priority
    static class PriorityThread extends Thread {
        public PriorityThread(String name, int priority) {
            setName(name);
            setPriority(priority);
        }

        @Override
        public void run() {
            for (int i = 1; i <= 5; i++) {
                System.out.println(getName() + " (Priority " + getPriority() + "): " + i);
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    System.out.println(getName() + " interrupted");
                }
            }
        }
    }

    // Demonstrate daemon thread
    static class DaemonThread extends Thread {
        public DaemonThread() {
            setDaemon(true); // Must be called before start()
        }

        @Override
        public void run() {
            while (true) {
                System.out.println("Daemon thread running...");
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    break;
                }
            }
            System.out.println("Daemon thread ending");
        }
    }

    // Demonstrate thread interruption
    static class InterruptibleThread extends Thread {
        @Override
        public void run() {
            try {
                System.out.println("Thread starting long operation...");
                for (int i = 1; i <= 10; i++) {
                    if (Thread.interrupted()) {
                        System.out.println("Thread was interrupted!");
                        return;
                    }
                    System.out.println("Working... " + i);
                    Thread.sleep(500);
                }
                System.out.println("Thread completed normally");
            } catch (InterruptedException e) {
                System.out.println("Thread interrupted during sleep!");
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("===== THREAD METHODS =====\n");

        // Part 1: Thread Priority
        System.out.println("--- Part 1: Thread Priority ---");
        System.out.println("MIN_PRIORITY: " + Thread.MIN_PRIORITY);
        System.out.println("NORM_PRIORITY: " + Thread.NORM_PRIORITY);
        System.out.println("MAX_PRIORITY: " + Thread.MAX_PRIORITY);

        PriorityThread highPriority = new PriorityThread("High", Thread.MAX_PRIORITY);
        PriorityThread lowPriority = new PriorityThread("Low", Thread.MIN_PRIORITY);
        PriorityThread normalPriority = new PriorityThread("Normal", Thread.NORM_PRIORITY);

        highPriority.start();
        normalPriority.start();
        lowPriority.start();

        try {
            highPriority.join();
            normalPriority.join();
            lowPriority.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Part 2: Daemon Threads
        System.out.println("\n--- Part 2: Daemon Threads ---");

        DaemonThread daemon = new DaemonThread();
        daemon.start();

        System.out.println("Is daemon: " + daemon.isDaemon());

        try {
            Thread.sleep(3500); // Let daemon run for 3.5 seconds
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("Main thread ending (daemon will die too)");

        // Part 3: Thread Interruption
        System.out.println("\n--- Part 3: Thread Interruption ---");

        InterruptibleThread worker = new InterruptibleThread();
        worker.start();

        try {
            Thread.sleep(2000); // Let it work for 2 seconds
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("Main: Interrupting worker thread");
        worker.interrupt();

        try {
            worker.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Part 4: Thread Information
        System.out.println("\n--- Part 4: Thread Information ---");

        Thread current = Thread.currentThread();

        System.out.println("Current thread info:");
        System.out.println("  Name: " + current.getName());
        System.out.println("  Priority: " + current.getPriority());
        System.out.println("  State: " + current.getState());
        System.out.println("  Is Daemon: " + current.isDaemon());
        System.out.println("  Is Alive: " + current.isAlive());
        System.out.println("  Thread Group: " + current.getThreadGroup().getName());

        // Part 5: Thread Sleep
        System.out.println("\n--- Part 5: Thread Sleep ---");

        System.out.println("Sleeping for 2 seconds...");
        long startTime = System.currentTimeMillis();

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        long endTime = System.currentTimeMillis();
        System.out.println("Slept for: " + (endTime - startTime) + "ms");

        // Part 6: Thread Yield (hint to scheduler)
        System.out.println("\n--- Part 6: Thread Yield ---");

        Thread yielder1 = new Thread(() -> {
            for (int i = 0; i < 3; i++) {
                System.out.println("Yielder1: " + i);
                Thread.yield(); // Hint to give other threads a chance
            }
        });

        Thread yielder2 = new Thread(() -> {
            for (int i = 0; i < 3; i++) {
                System.out.println("Yielder2: " + i);
                Thread.yield();
            }
        });

        yielder1.start();
        yielder2.start();

        try {
            yielder1.join();
            yielder2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("\n==========================");
    }
}
```

**Expected Output:**
```
===== THREAD METHODS =====

--- Part 1: Thread Priority ---
MIN_PRIORITY: 1
NORM_PRIORITY: 5
MAX_PRIORITY: 10
High (Priority 10): 1
Normal (Priority 5): 1
Low (Priority 1): 1
High (Priority 10): 2
Normal (Priority 5): 2
Low (Priority 1): 2
...

--- Part 2: Daemon Threads ---
Is daemon: true
Daemon thread running...
Daemon thread running...
Daemon thread running...
Main thread ending (daemon will die too)

--- Part 3: Thread Interruption ---
Thread starting long operation...
Working... 1
Working... 2
Working... 3
Working... 4
Main: Interrupting worker thread
Thread was interrupted!

--- Part 4: Thread Information ---
Current thread info:
  Name: main
  Priority: 5
  State: RUNNABLE
  Is Daemon: false
  Is Alive: true
  Thread Group: main

--- Part 5: Thread Sleep ---
Sleeping for 2 seconds...
Slept for: 2001ms

--- Part 6: Thread Yield ---
Yielder1: 0
Yielder2: 0
Yielder1: 1
Yielder2: 1
Yielder1: 2
Yielder2: 2

==========================
```

**💡 Thread Methods:**

```java
// Priority (1-10, default 5)
thread.setPriority(Thread.MAX_PRIORITY); // 10
thread.setPriority(Thread.MIN_PRIORITY); // 1
int priority = thread.getPriority();

// Daemon (background thread)
thread.setDaemon(true); // Must call before start()
boolean isDaemon = thread.isDaemon();

// Interruption
thread.interrupt();           // Set interrupt flag
boolean isInterrupted = thread.isInterrupted();
boolean wasInterrupted = Thread.interrupted(); // Clears flag

// Sleep
Thread.sleep(milliseconds);   // Pause execution

// Yield
Thread.yield();               // Hint to scheduler

// Join
thread.join();                // Wait for thread to finish
thread.join(milliseconds);    // Wait with timeout

// Information
String name = thread.getName();
thread.setName("NewName");
Thread.State state = thread.getState();
boolean isAlive = thread.isAlive();
```

**✅ Success Criteria:**
- Understand thread priority (limited effect)
- Know what daemon threads are
- Can interrupt threads properly
- Master sleep and join
- Can get/set thread properties

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Setting daemon after start() | IllegalThreadStateException | Set before start() |
| Ignoring InterruptedException | Thread won't stop properly | Handle and cleanup |
| Relying on priority | Not guaranteed to work | Use for hints only |
| Calling Thread.sleep(0) | Wastes resources | Don't sleep for 0 |

**🎯 Challenge:**
1. Create priority-based task scheduler
2. Implement daemon thread for logging
3. Build interruptible download manager
4. Create thread pool with priority queues

---

Due to length limits, this file contains exercises 1-3 of Day 29. The complete Day 29 needs exercises 4-7 covering:
- Exercise 4: Synchronization Basics
- Exercise 5: Thread Safety
- Exercise 6: Producer-Consumer Problem
- Exercise 7: Real-World Threading Application

Would you like me to create the final part with exercises 4-7 for Day 29?
