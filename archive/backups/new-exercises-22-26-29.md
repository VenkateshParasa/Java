# New Exercises for Days 22, 26, and 29
# To be appended to BEGINNER_FRIENDLY_Exercises_CoreJava.md

---

### Day 22: Strings in Detail

---

#### Exercise 1: String Immutability Demonstration (20 minutes)

**What you'll learn:** Understanding string immutability and its implications

**Create class: `StringImmutability`**

**Concept:** **String Immutability** means once a String object is created, its value cannot be changed. Any modification creates a new String object in memory.

```
String str = "Hello";
str = str + " World";  // Creates NEW string, doesn't modify original

Why immutability?
1. Security (strings used in networking, file paths)
2. Thread safety (multiple threads can share strings safely)
3. String pooling (memory optimization)
4. Hashing (hashCode never changes)
```

**Step-by-Step:**

```java
public class StringImmutability {
    public static void main(String[] args) {
        System.out.println("===== STRING IMMUTABILITY DEMO =====\n");

        // Example 1: Proving immutability
        System.out.println("--- Example 1: Immutability Test ---");
        String original = "Hello";
        String reference = original;

        System.out.println("Original: " + original);
        System.out.println("Reference: " + reference);
        System.out.println("Same object? " + (original == reference)); // true

        // Trying to "modify" original
        original = original + " World";

        System.out.println("\nAfter modification:");
        System.out.println("Original: " + original);      // Hello World
        System.out.println("Reference: " + reference);    // Still Hello!
        System.out.println("Same object? " + (original == reference)); // false

        // Example 2: Methods don't modify original
        System.out.println("\n--- Example 2: Method Calls ---");
        String text = "java programming";
        System.out.println("Original: " + text);

        text.toUpperCase();  // This doesn't change 'text'
        System.out.println("After toUpperCase(): " + text); // Still lowercase!

        String upper = text.toUpperCase();  // Must assign to new variable
        System.out.println("Stored in new variable: " + upper);

        // Example 3: Memory implications
        System.out.println("\n--- Example 3: Memory Usage ---");
        String s1 = "Test";
        String s2 = "Test";
        String s3 = new String("Test");

        System.out.println("s1 == s2: " + (s1 == s2));     // true (string pool)
        System.out.println("s1 == s3: " + (s1 == s3));     // false (new object)
        System.out.println("s1.equals(s3): " + s1.equals(s3)); // true (value)

        // Example 4: Inefficient string concatenation
        System.out.println("\n--- Example 4: Inefficiency Demo ---");
        long startTime = System.currentTimeMillis();

        String result = "";
        for (int i = 0; i < 1000; i++) {
            result += "x";  // Creates 1000 new String objects!
        }

        long endTime = System.currentTimeMillis();
        System.out.println("String concatenation took: " + (endTime - startTime) + "ms");
        System.out.println("Final length: " + result.length());

        // Better approach with StringBuilder (we'll cover this next)
        startTime = System.currentTimeMillis();

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 1000; i++) {
            sb.append("x");  // Modifies same object
        }
        String sbResult = sb.toString();

        endTime = System.currentTimeMillis();
        System.out.println("StringBuilder took: " + (endTime - startTime) + "ms");

        System.out.println("\n===================================");
    }
}
```

**Expected Output:**
```
===== STRING IMMUTABILITY DEMO =====

--- Example 1: Immutability Test ---
Original: Hello
Reference: Hello
Same object? true

After modification:
Original: Hello World
Reference: Hello
Same object? false

--- Example 2: Method Calls ---
Original: java programming
After toUpperCase(): java programming
Stored in new variable: JAVA PROGRAMMING

--- Example 3: Memory Usage ---
s1 == s2: true
s1 == s3: false
s1.equals(s3): true

--- Example 4: Inefficiency Demo ---
String concatenation took: 15ms
Final length: 1000
StringBuilder took: 0ms

===================================
```

**💡 Key Takeaways:**

```java
// String is immutable
String str = "Hello";
str.concat(" World");    // Creates new string, str unchanged!
str = str.concat(" World"); // Must reassign to see change

// String pool optimization
String a = "Test";       // Pool
String b = "Test";       // Same pool object
String c = new String("Test"); // Heap (different object)

a == b     // true (same reference)
a == c     // false (different objects)
a.equals(c) // true (same value)
```

**✅ Success Criteria:**
- Understand strings cannot be modified after creation
- Know that string methods create new strings
- Recognize == checks reference, equals() checks value
- Understand string pool concept
- Can explain performance implications

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| `str.toUpperCase();` expecting change | String is immutable | `str = str.toUpperCase();` |
| Using `==` for string comparison | Compares references | Use `equals()` for value |
| Loop with `str += x` | Creates many objects | Use StringBuilder |
| Assuming `new String()` uses pool | Forces heap allocation | Use literals for pooling |

**🎯 Challenge:**
1. Create method that "modifies" string 1000 times with `+=`
2. Create same with StringBuilder
3. Compare time taken
4. Print memory addresses using `System.identityHashCode()`
5. Verify new objects are created each time with String

---

#### Exercise 2: String Pool Deep Dive (20 minutes)

**What you'll learn:** Understanding the String constant pool and intern() method

**Create class: `StringPoolDemo`**

**Concept:** **String Pool** is a special memory area in Java heap where String literals are stored. When you create a string literal, Java checks the pool first. If found, it reuses; if not, it creates new.

```
String Pool Benefits:
1. Memory optimization (reuses common strings)
2. Faster comparison (can use ==)
3. Reduced garbage collection

String a = "Hello";   -----
String b = "Hello";   -----→ Both point to same "Hello" in pool
String c = new String("Hello"); → Creates separate object in heap
String d = c.intern(); → Returns reference from pool
```

**Step-by-Step:**

```java
public class StringPoolDemo {
    public static void main(String[] args) {
        System.out.println("===== STRING POOL DEMONSTRATION =====\n");

        // Part 1: String literals (Pool)
        System.out.println("--- Part 1: String Literals ---");
        String s1 = "Java";
        String s2 = "Java";
        String s3 = "Java";

        System.out.println("s1: " + s1);
        System.out.println("s2: " + s2);
        System.out.println("s3: " + s3);

        System.out.println("\nReference comparison (==):");
        System.out.println("s1 == s2: " + (s1 == s2));  // true
        System.out.println("s2 == s3: " + (s2 == s3));  // true
        System.out.println("s1 == s3: " + (s1 == s3));  // true

        System.out.println("\nMemory addresses:");
        System.out.println("s1: " + System.identityHashCode(s1));
        System.out.println("s2: " + System.identityHashCode(s2));
        System.out.println("s3: " + System.identityHashCode(s3));
        System.out.println("All same? They point to same object in pool!");

        // Part 2: new String() (Heap)
        System.out.println("\n--- Part 2: new String() ---");
        String s4 = new String("Java");
        String s5 = new String("Java");

        System.out.println("s4: " + s4);
        System.out.println("s5: " + s5);

        System.out.println("\nReference comparison (==):");
        System.out.println("s4 == s5: " + (s4 == s5));  // false
        System.out.println("s1 == s4: " + (s1 == s4));  // false

        System.out.println("\nValue comparison (equals):");
        System.out.println("s4.equals(s5): " + s4.equals(s5));  // true
        System.out.println("s1.equals(s4): " + s1.equals(s4));  // true

        System.out.println("\nMemory addresses:");
        System.out.println("s4: " + System.identityHashCode(s4));
        System.out.println("s5: " + System.identityHashCode(s5));
        System.out.println("Different objects in heap!");

        // Part 3: intern() method
        System.out.println("\n--- Part 3: intern() Method ---");
        String s6 = new String("Python").intern();
        String s7 = "Python";
        String s8 = new String("Python");

        System.out.println("s6 == s7: " + (s6 == s7));  // true (intern)
        System.out.println("s7 == s8: " + (s7 == s8));  // false (no intern)
        System.out.println("s6 == s8: " + (s6 == s8));  // false

        String s9 = s8.intern();
        System.out.println("s6 == s9: " + (s6 == s9));  // true (both interned)

        // Part 4: Runtime string creation
        System.out.println("\n--- Part 4: Runtime Strings ---");
        String prefix = "Ja";
        String suffix = "va";
        String s10 = prefix + suffix;  // Runtime concatenation
        String s11 = "Java";            // Literal

        System.out.println("s10 == s11: " + (s10 == s11));  // false
        System.out.println("Why? s10 created at runtime, not in pool");

        String s12 = (prefix + suffix).intern();
        System.out.println("s12 == s11: " + (s12 == s11));  // true (interned)

        // Part 5: Compile-time constants
        System.out.println("\n--- Part 5: Compile-Time Constants ---");
        String s13 = "Hello" + "World";  // Compile-time constant
        String s14 = "HelloWorld";        // Literal

        System.out.println("s13 == s14: " + (s13 == s14));  // true
        System.out.println("Why? Compiler optimizes to same literal");

        // Part 6: Practical example
        System.out.println("\n--- Part 6: Practical Usage ---");
        String[] names = {"John", "Alice", "Bob", "John", "Alice"};

        int duplicates = 0;
        for (int i = 0; i < names.length; i++) {
            for (int j = i + 1; j < names.length; j++) {
                if (names[i] == names[j]) {  // Can use == for literals!
                    duplicates++;
                    System.out.println("Duplicate found: " + names[i]);
                }
            }
        }
        System.out.println("Total duplicates: " + duplicates);

        System.out.println("\n=====================================");
    }
}
```

**Expected Output:**
```
===== STRING POOL DEMONSTRATION =====

--- Part 1: String Literals ---
s1: Java
s2: Java
s3: Java

Reference comparison (==):
s1 == s2: true
s2 == s3: true
s1 == s3: true

Memory addresses:
s1: 1627674070
s2: 1627674070
s3: 1627674070
All same? They point to same object in pool!

--- Part 2: new String() ---
s4: Java
s5: Java

Reference comparison (==):
s4 == s5: false
s1 == s4: false

Value comparison (equals):
s4.equals(s5): true
s1.equals(s4): true

Memory addresses:
s4: 1360875712
s5: 1625635731
Different objects in heap!

--- Part 3: intern() Method ---
s6 == s7: true
s7 == s8: false
s6 == s8: false
s6 == s9: true

--- Part 4: Runtime Strings ---
s10 == s11: false
Why? s10 created at runtime, not in pool
s12 == s11: true

--- Part 5: Compile-Time Constants ---
s13 == s14: true
Why? Compiler optimizes to same literal

--- Part 6: Practical Usage ---
Duplicate found: John
Duplicate found: Alice
Total duplicates: 2

=====================================
```

**💡 String Pool Rules:**

```java
// Pool (reused)
String a = "Test";
String b = "Test";
a == b  // true

// Heap (separate objects)
String c = new String("Test");
String d = new String("Test");
c == d  // false

// intern() - move to pool
String e = new String("Test").intern();
e == a  // true (same pool reference)

// Compile-time optimization
String f = "Te" + "st";  // Becomes "Test" at compile time
f == a  // true

// Runtime creation
String g = new String("Te") + "st";  // Created at runtime
g == a  // false (not in pool)
```

**✅ Success Criteria:**
- Understand string pool stores literals
- Know new String() creates heap object
- Can use intern() to add strings to pool
- Recognize compile-time vs runtime string creation
- Know when to use == vs equals()

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Always using == | Only works for pool strings | Use equals() for values |
| Overusing intern() | Can fill pool unnecessarily | Use for frequently used strings |
| Assuming all strings pooled | Only literals are pooled | new String() goes to heap |
| Ignoring memory impact | Pool lives in heap | Monitor for memory leaks |

**🎯 Challenge:**
1. Create 1000 strings with "Test" literal
2. Create 1000 strings with new String("Test")
3. Compare memory usage (use -Xmx flags)
4. Test performance of == vs equals()
5. Create custom string cache using HashMap and intern()

---

#### Exercise 3: String vs StringBuilder vs StringBuffer (25 minutes)

**What you'll learn:** Choosing the right string class for different scenarios

**Create class: `StringClassComparison`**

**Concept:** Java provides three classes for string handling, each with different characteristics:

```
String:
- Immutable (cannot change)
- Thread-safe (implicitly)
- Use for: Fixed values, keys, constants

StringBuilder:
- Mutable (can change)
- NOT thread-safe
- Fast (no synchronization)
- Use for: Single-threaded string building

StringBuffer:
- Mutable (can change)
- Thread-safe (synchronized)
- Slower than StringBuilder
- Use for: Multi-threaded string building
```

**Step-by-Step:**

```java
public class StringClassComparison {
    public static void main(String[] args) {
        System.out.println("===== STRING CLASS COMPARISON =====\n");

        // Part 1: String (Immutable)
        System.out.println("--- Part 1: String (Immutable) ---");
        String str = "Hello";
        System.out.println("Original: " + str);
        System.out.println("Memory: " + System.identityHashCode(str));

        str = str + " World";
        System.out.println("After concat: " + str);
        System.out.println("Memory: " + System.identityHashCode(str));
        System.out.println("Memory changed! New object created\n");

        // Part 2: StringBuilder (Mutable, Not Thread-Safe)
        System.out.println("--- Part 2: StringBuilder (Mutable) ---");
        StringBuilder sb = new StringBuilder("Hello");
        System.out.println("Original: " + sb);
        System.out.println("Memory: " + System.identityHashCode(sb));

        sb.append(" World");
        System.out.println("After append: " + sb);
        System.out.println("Memory: " + System.identityHashCode(sb));
        System.out.println("Same memory! Object modified in-place\n");

        // Part 3: StringBuffer (Mutable, Thread-Safe)
        System.out.println("--- Part 3: StringBuffer (Thread-Safe) ---");
        StringBuffer sbf = new StringBuffer("Hello");
        System.out.println("Original: " + sbf);
        System.out.println("Memory: " + System.identityHashCode(sbf));

        sbf.append(" World");
        System.out.println("After append: " + sbf);
        System.out.println("Memory: " + System.identityHashCode(sbf));
        System.out.println("Same memory! Object modified in-place\n");

        // Part 4: Performance Comparison
        System.out.println("--- Part 4: Performance Test (10,000 iterations) ---");

        // String performance
        long startTime = System.currentTimeMillis();
        String s = "";
        for (int i = 0; i < 10000; i++) {
            s += "x";
        }
        long stringTime = System.currentTimeMillis() - startTime;
        System.out.println("String: " + stringTime + "ms");

        // StringBuilder performance
        startTime = System.currentTimeMillis();
        StringBuilder sb2 = new StringBuilder();
        for (int i = 0; i < 10000; i++) {
            sb2.append("x");
        }
        String sbResult = sb2.toString();
        long sbTime = System.currentTimeMillis() - startTime;
        System.out.println("StringBuilder: " + sbTime + "ms");

        // StringBuffer performance
        startTime = System.currentTimeMillis();
        StringBuffer sbf2 = new StringBuffer();
        for (int i = 0; i < 10000; i++) {
            sbf2.append("x");
        }
        String sbfResult = sbf2.toString();
        long sbfTime = System.currentTimeMillis() - startTime;
        System.out.println("StringBuffer: " + sbfTime + "ms");

        System.out.println("\nPerformance Ranking:");
        System.out.println("StringBuilder (fastest) < StringBuffer < String (slowest)");

        // Part 5: StringBuilder Methods
        System.out.println("\n--- Part 5: StringBuilder Methods ---");
        StringBuilder demo = new StringBuilder("Java Programming");
        System.out.println("Original: " + demo);

        // append
        demo.append(" is fun!");
        System.out.println("After append: " + demo);

        // insert
        demo.insert(16, " really");
        System.out.println("After insert: " + demo);

        // delete
        demo.delete(16, 23);
        System.out.println("After delete: " + demo);

        // reverse
        StringBuilder rev = new StringBuilder("Hello");
        rev.reverse();
        System.out.println("Reversed 'Hello': " + rev);

        // replace
        demo.replace(0, 4, "Python");
        System.out.println("After replace: " + demo);

        // substring
        String sub = demo.substring(0, 6);
        System.out.println("Substring: " + sub);

        // length and capacity
        System.out.println("\nLength: " + demo.length());
        System.out.println("Capacity: " + demo.capacity());

        // Part 6: Capacity Management
        System.out.println("\n--- Part 6: Capacity Management ---");
        StringBuilder cap = new StringBuilder();
        System.out.println("Initial capacity: " + cap.capacity()); // 16

        cap.append("x".repeat(20));
        System.out.println("After 20 chars, capacity: " + cap.capacity());

        StringBuilder cap2 = new StringBuilder(100);
        System.out.println("Custom capacity: " + cap2.capacity()); // 100

        cap2.trimToSize();
        System.out.println("After trim: " + cap2.capacity());

        // Part 7: Real-World Usage
        System.out.println("\n--- Part 7: Real-World Examples ---");

        // Example 1: Building CSV
        String[] data = {"John", "25", "Engineer", "New York"};
        StringBuilder csv = new StringBuilder();
        for (int i = 0; i < data.length; i++) {
            csv.append(data[i]);
            if (i < data.length - 1) {
                csv.append(",");
            }
        }
        System.out.println("CSV: " + csv);

        // Example 2: Building HTML
        StringBuilder html = new StringBuilder();
        html.append("<html>\n");
        html.append("  <body>\n");
        html.append("    <h1>Welcome</h1>\n");
        html.append("    <p>Hello World!</p>\n");
        html.append("  </body>\n");
        html.append("</html>");
        System.out.println("\nHTML:\n" + html);

        // Example 3: String manipulation
        StringBuilder phone = new StringBuilder("1234567890");
        phone.insert(3, "-");
        phone.insert(7, "-");
        System.out.println("\nFormatted phone: " + phone);

        System.out.println("\n===================================");
    }
}
```

**Expected Output:**
```
===== STRING CLASS COMPARISON =====

--- Part 1: String (Immutable) ---
Original: Hello
Memory: 1627674070
After concat: Hello World
Memory: 1360875712
Memory changed! New object created

--- Part 2: StringBuilder (Mutable) ---
Original: Hello
Memory: 1625635731
After append: Hello World
Memory: 1625635731
Same memory! Object modified in-place

--- Part 3: StringBuffer (Thread-Safe) ---
Original: Hello
Memory: 1265094477
After append: Hello World
Memory: 1265094477
Same memory! Object modified in-place

--- Part 4: Performance Test (10,000 iterations) ---
String: 156ms
StringBuilder: 2ms
StringBuffer: 3ms

Performance Ranking:
StringBuilder (fastest) < StringBuffer < String (slowest)

--- Part 5: StringBuilder Methods ---
Original: Java Programming
After append: Java Programming is fun!
After insert: Java Programming really is fun!
After delete: Java Programming is fun!
Reversed 'Hello': olleH
After replace: Python Programming is fun!
Substring: Python

Length: 26
Capacity: 34

--- Part 6: Capacity Management ---
Initial capacity: 16
After 20 chars, capacity: 34
Custom capacity: 100
After trim: 0

--- Part 7: Real-World Examples ---
CSV: John,25,Engineer,New York

HTML:
<html>
  <body>
    <h1>Welcome</h1>
    <p>Hello World!</p>
  </body>
</html>

Formatted phone: 123-456-7890

===================================
```

**💡 When to Use Which:**

```java
// String: Immutable, thread-safe
String name = "John";               // Fixed value
final String CONSTANT = "API_KEY";  // Constants
Map<String, Integer> map;           // Map keys

// StringBuilder: Mutable, fast, single-threaded
StringBuilder html = new StringBuilder();  // Building output
for (String item : items) {
    html.append(item);  // Lots of concatenation
}

// StringBuffer: Mutable, thread-safe, multi-threaded
StringBuffer log = new StringBuffer();
// Multiple threads can safely append
thread1: log.append("Message 1");
thread2: log.append("Message 2");
```

**Comparison Table:**

| Feature | String | StringBuilder | StringBuffer |
|---------|--------|---------------|--------------|
| Mutability | Immutable | Mutable | Mutable |
| Thread-Safe | Yes | No | Yes |
| Performance | Slow (for concat) | Fast | Medium |
| Memory | Creates new objects | Modifies existing | Modifies existing |
| Use Case | Fixed strings | Single-threaded building | Multi-threaded building |

**✅ Success Criteria:**
- Understand immutable vs mutable
- Know performance differences
- Can choose appropriate class for scenario
- Master StringBuilder methods
- Understand capacity management

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Loop with String += | Creates many objects | Use StringBuilder |
| StringBuffer in single thread | Unnecessary synchronization | Use StringBuilder |
| Not setting initial capacity | Multiple resizes | `new StringBuilder(size)` |
| Using + with many strings | Inefficient | append() method |

**🎯 Challenge:**
1. Create method to reverse words in sentence (StringBuilder)
2. Build multiplication table as formatted string
3. Create CSV parser and builder
4. Implement simple template engine
5. Compare memory usage of all three classes
6. Create thread-safe logger with StringBuffer

---

#### Exercise 4: String Manipulation Algorithms (30 minutes)

**What you'll learn:** Common string algorithms and manipulation techniques

**Create class: `StringAlgorithms`**

**Concept:** String manipulation is fundamental to programming. Common operations include:
- Palindrome checking
- Anagram detection
- Character counting
- String reversal
- Substring operations

**Step-by-Step:**

```java
public class StringAlgorithms {

    // Algorithm 1: Check if string is palindrome
    public static boolean isPalindrome(String str) {
        // Remove spaces and convert to lowercase
        str = str.replaceAll("\\s+", "").toLowerCase();

        int left = 0;
        int right = str.length() - 1;

        while (left < right) {
            if (str.charAt(left) != str.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }

    // Algorithm 2: Reverse string (manual)
    public static String reverseString(String str) {
        char[] chars = str.toCharArray();
        int left = 0;
        int right = chars.length - 1;

        while (left < right) {
            // Swap characters
            char temp = chars[left];
            chars[left] = chars[right];
            chars[right] = temp;
            left++;
            right--;
        }

        return new String(chars);
    }

    // Algorithm 3: Check if two strings are anagrams
    public static boolean areAnagrams(String str1, String str2) {
        // Remove spaces and convert to lowercase
        str1 = str1.replaceAll("\\s+", "").toLowerCase();
        str2 = str2.replaceAll("\\s+", "").toLowerCase();

        // Different lengths cannot be anagrams
        if (str1.length() != str2.length()) {
            return false;
        }

        // Count character frequencies
        int[] charCount = new int[26]; // for a-z

        for (int i = 0; i < str1.length(); i++) {
            charCount[str1.charAt(i) - 'a']++;
            charCount[str2.charAt(i) - 'a']--;
        }

        // All counts should be zero
        for (int count : charCount) {
            if (count != 0) {
                return false;
            }
        }

        return true;
    }

    // Algorithm 4: Count vowels and consonants
    public static void countVowelsConsonants(String str) {
        str = str.toLowerCase();
        int vowels = 0, consonants = 0, digits = 0, spaces = 0, special = 0;

        for (char ch : str.toCharArray()) {
            if (ch >= 'a' && ch <= 'z') {
                if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
                    vowels++;
                } else {
                    consonants++;
                }
            } else if (ch >= '0' && ch <= '9') {
                digits++;
            } else if (ch == ' ') {
                spaces++;
            } else {
                special++;
            }
        }

        System.out.println("Vowels: " + vowels);
        System.out.println("Consonants: " + consonants);
        System.out.println("Digits: " + digits);
        System.out.println("Spaces: " + spaces);
        System.out.println("Special: " + special);
    }

    // Algorithm 5: Find all substrings
    public static void printAllSubstrings(String str) {
        System.out.println("All substrings of '" + str + "':");
        int count = 0;

        for (int i = 0; i < str.length(); i++) {
            for (int j = i + 1; j <= str.length(); j++) {
                System.out.print(str.substring(i, j) + " ");
                count++;
                if (count % 10 == 0) {
                    System.out.println();
                }
            }
        }
        System.out.println("\nTotal substrings: " + count);
    }

    // Algorithm 6: Remove duplicates
    public static String removeDuplicates(String str) {
        StringBuilder result = new StringBuilder();
        boolean[] seen = new boolean[256]; // ASCII

        for (char ch : str.toCharArray()) {
            if (!seen[ch]) {
                result.append(ch);
                seen[ch] = true;
            }
        }

        return result.toString();
    }

    // Algorithm 7: Find first non-repeating character
    public static char firstNonRepeating(String str) {
        int[] count = new int[256];

        // Count frequencies
        for (char ch : str.toCharArray()) {
            count[ch]++;
        }

        // Find first with count 1
        for (char ch : str.toCharArray()) {
            if (count[ch] == 1) {
                return ch;
            }
        }

        return '\0'; // null character if not found
    }

    // Algorithm 8: Count word occurrences
    public static void countWords(String str) {
        String[] words = str.toLowerCase().split("\\s+");

        // Simple count using nested loops
        boolean[] counted = new boolean[words.length];

        for (int i = 0; i < words.length; i++) {
            if (counted[i]) continue;

            int count = 1;
            for (int j = i + 1; j < words.length; j++) {
                if (words[i].equals(words[j])) {
                    count++;
                    counted[j] = true;
                }
            }

            System.out.println(words[i] + ": " + count);
        }
    }

    // Algorithm 9: Check if rotation
    public static boolean isRotation(String str1, String str2) {
        // Check lengths
        if (str1.length() != str2.length()) {
            return false;
        }

        // Trick: if str2 is rotation of str1,
        // str2 will be substring of str1+str1
        String combined = str1 + str1;
        return combined.contains(str2);
    }

    // Algorithm 10: Compress string
    public static String compressString(String str) {
        if (str.length() <= 1) return str;

        StringBuilder compressed = new StringBuilder();
        int count = 1;

        for (int i = 1; i < str.length(); i++) {
            if (str.charAt(i) == str.charAt(i - 1)) {
                count++;
            } else {
                compressed.append(str.charAt(i - 1));
                compressed.append(count);
                count = 1;
            }
        }

        // Add last character
        compressed.append(str.charAt(str.length() - 1));
        compressed.append(count);

        // Return original if compressed is not smaller
        return compressed.length() < str.length() ?
               compressed.toString() : str;
    }

    public static void main(String[] args) {
        System.out.println("===== STRING ALGORITHMS =====\n");

        // Test 1: Palindrome
        System.out.println("--- Algorithm 1: Palindrome Check ---");
        String[] palindromes = {"racecar", "A man a plan a canal Panama",
                                "hello", "Madam"};
        for (String s : palindromes) {
            System.out.println("'" + s + "' is palindrome? " + isPalindrome(s));
        }

        // Test 2: Reverse
        System.out.println("\n--- Algorithm 2: String Reversal ---");
        String original = "Hello World";
        System.out.println("Original: " + original);
        System.out.println("Reversed: " + reverseString(original));

        // Test 3: Anagrams
        System.out.println("\n--- Algorithm 3: Anagram Check ---");
        String[][] anagramPairs = {
            {"listen", "silent"},
            {"hello", "world"},
            {"The eyes", "They see"}
        };
        for (String[] pair : anagramPairs) {
            System.out.println("'" + pair[0] + "' and '" + pair[1] +
                             "' are anagrams? " + areAnagrams(pair[0], pair[1]));
        }

        // Test 4: Count characters
        System.out.println("\n--- Algorithm 4: Character Count ---");
        String text = "Hello World 123!";
        System.out.println("Text: " + text);
        countVowelsConsonants(text);

        // Test 5: Substrings
        System.out.println("\n--- Algorithm 5: All Substrings ---");
        printAllSubstrings("ABC");

        // Test 6: Remove duplicates
        System.out.println("\n--- Algorithm 6: Remove Duplicates ---");
        String dup = "programming";
        System.out.println("Original: " + dup);
        System.out.println("Without duplicates: " + removeDuplicates(dup));

        // Test 7: First non-repeating
        System.out.println("\n--- Algorithm 7: First Non-Repeating ---");
        String test = "swiss";
        char result = firstNonRepeating(test);
        System.out.println("String: " + test);
        System.out.println("First non-repeating: " +
                         (result == '\0' ? "None" : result));

        // Test 8: Word count
        System.out.println("\n--- Algorithm 8: Word Frequency ---");
        String sentence = "hello world hello java world java hello";
        System.out.println("Sentence: " + sentence);
        countWords(sentence);

        // Test 9: String rotation
        System.out.println("\n--- Algorithm 9: Rotation Check ---");
        String s1 = "waterbottle";
        String s2 = "erbottlewat";
        System.out.println("'" + s2 + "' is rotation of '" + s1 + "'? " +
                         isRotation(s1, s2));

        // Test 10: String compression
        System.out.println("\n--- Algorithm 10: String Compression ---");
        String[] toCompress = {"aabcccccaaa", "abcdef", "aabbcc"};
        for (String s : toCompress) {
            System.out.println(s + " -> " + compressString(s));
        }

        System.out.println("\n=============================");
    }
}
```

**Expected Output:**
```
===== STRING ALGORITHMS =====

--- Algorithm 1: Palindrome Check ---
'racecar' is palindrome? true
'A man a plan a canal Panama' is palindrome? true
'hello' is palindrome? false
'Madam' is palindrome? true

--- Algorithm 2: String Reversal ---
Original: Hello World
Reversed: dlroW olleH

--- Algorithm 3: Anagram Check ---
'listen' and 'silent' are anagrams? true
'hello' and 'world' are anagrams? false
'The eyes' and 'They see' are anagrams? true

--- Algorithm 4: Character Count ---
Text: Hello World 123!
Vowels: 3
Consonants: 7
Digits: 3
Spaces: 2
Special: 1

--- Algorithm 5: All Substrings ---
All substrings of 'ABC':
A AB ABC B BC C
Total substrings: 6

--- Algorithm 6: Remove Duplicates ---
Original: programming
Without duplicates: progamin

--- Algorithm 7: First Non-Repeating ---
String: swiss
First non-repeating: w

--- Algorithm 8: Word Frequency ---
Sentence: hello world hello java world java hello
hello: 3
world: 2
java: 2

--- Algorithm 9: Rotation Check ---
'erbottlewat' is rotation of 'waterbottle'? true

--- Algorithm 10: String Compression ---
aabcccccaaa -> a2b1c5a3
abcdef -> abcdef
aabbcc -> a2b2c2

=============================
```

**💡 Algorithm Patterns:**

```java
// Two-pointer technique (palindrome, reverse)
int left = 0, right = str.length() - 1;
while (left < right) {
    // Compare or swap
    left++;
    right--;
}

// Frequency counting (anagram, character count)
int[] count = new int[26]; // or 256 for ASCII
for (char ch : str.toCharArray()) {
    count[ch - 'a']++;  // or just count[ch]
}

// Sliding window (substrings)
for (int i = 0; i < str.length(); i++) {
    for (int j = i + 1; j <= str.length(); j++) {
        String sub = str.substring(i, j);
    }
}
```

**✅ Success Criteria:**
- Can implement palindrome check
- Understand two-pointer technique
- Master character frequency counting
- Can find substrings efficiently
- Understand string rotation trick
- Can compress strings

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Comparing with == | Compares references | Use equals() |
| Not handling case | "Hello" != "hello" | Convert to lowercase first |
| Not handling spaces | " test " != "test" | trim() or replaceAll() |
| Inefficient concatenation | Slow for large strings | Use StringBuilder |
| Wrong array size | ArrayIndexOutOfBounds | Use 26 for lowercase, 256 for ASCII |

**🎯 Challenge:**
1. Find longest palindromic substring
2. Implement own version of contains()
3. Count all palindrome substrings
4. Find longest common prefix in array of strings
5. Implement wildcard pattern matching
6. Create simple encryption/decryption algorithm

---

#### Exercise 5: Pattern Matching Basics (20 minutes)

**What you'll learn:** Using String methods for pattern matching and validation

**Create class: `PatternMatchingBasics`**

**Concept:** Pattern matching allows you to search for specific patterns in strings. Java provides built-in String methods for basic pattern matching.

**Step-by-Step:**

```java
public class PatternMatchingBasics {

    // Method 1: Email validation (simple)
    public static boolean isValidEmail(String email) {
        // Basic check: has @ and . after @
        if (!email.contains("@")) return false;

        int atIndex = email.indexOf("@");
        int dotIndex = email.lastIndexOf(".");

        return dotIndex > atIndex && dotIndex < email.length() - 1;
    }

    // Method 2: Phone validation
    public static boolean isValidPhone(String phone) {
        // Remove common separators
        String cleaned = phone.replaceAll("[\\s-().]", "");

        // Check if only digits and length 10
        return cleaned.matches("\\d{10}");
    }

    // Method 3: Password strength
    public static String checkPasswordStrength(String password) {
        boolean hasLength = password.length() >= 8;
        boolean hasUpper = !password.equals(password.toLowerCase());
        boolean hasLower = !password.equals(password.toUpperCase());
        boolean hasDigit = password.matches(".*\\d.*");
        boolean hasSpecial = password.matches(".*[!@#$%^&*()].*");

        if (hasLength && hasUpper && hasLower && hasDigit && hasSpecial) {
            return "Strong";
        } else if (hasLength && hasUpper && hasLower && hasDigit) {
            return "Medium";
        } else {
            return "Weak";
        }
    }

    // Method 4: Extract numbers from string
    public static void extractNumbers(String text) {
        System.out.println("Original: " + text);
        System.out.print("Numbers: ");

        String[] words = text.split("\\s+");
        for (String word : words) {
            if (word.matches("\\d+")) {
                System.out.print(word + " ");
            }
        }
        System.out.println();
    }

    // Method 5: Username validation
    public static boolean isValidUsername(String username) {
        // 3-20 characters, alphanumeric and underscore only
        return username.matches("[a-zA-Z0-9_]{3,20}");
    }

    public static void main(String[] args) {
        System.out.println("===== PATTERN MATCHING BASICS =====\n");

        // Test 1: Email validation
        System.out.println("--- Test 1: Email Validation ---");
        String[] emails = {"test@example.com", "invalid.email", "@test.com", "test@.com"};
        for (String email : emails) {
            System.out.println(email + " is valid? " + isValidEmail(email));
        }

        // Test 2: Phone validation
        System.out.println("\n--- Test 2: Phone Validation ---");
        String[] phones = {"123-456-7890", "(123) 456-7890", "1234567890", "12345"};
        for (String phone : phones) {
            System.out.println(phone + " is valid? " + isValidPhone(phone));
        }

        // Test 3: Password strength
        System.out.println("\n--- Test 3: Password Strength ---");
        String[] passwords = {"Pass123!", "password", "PASS123", "Str0ng!Pass", "weak"};
        for (String pwd : passwords) {
            System.out.println(pwd + " : " + checkPasswordStrength(pwd));
        }

        // Test 4: Extract numbers
        System.out.println("\n--- Test 4: Extract Numbers ---");
        extractNumbers("I have 3 apples and 25 oranges and 100 grapes");

        // Test 5: Username validation
        System.out.println("\n--- Test 5: Username Validation ---");
        String[] usernames = {"john_doe", "ab", "valid_user123", "invalid-user", "toolongusernamethatexceedslimit"};
        for (String username : usernames) {
            System.out.println(username + " is valid? " + isValidUsername(username));
        }

        // Test 6: String contains patterns
        System.out.println("\n--- Test 6: Contains Patterns ---");
        String text = "Java Programming is fun. Java is powerful!";
        System.out.println("Text: " + text);
        System.out.println("Contains 'Java': " + text.contains("Java"));
        System.out.println("Starts with 'Java': " + text.startsWith("Java"));
        System.out.println("Ends with '!': " + text.endsWith("!"));
        System.out.println("First 'Java' at index: " + text.indexOf("Java"));
        System.out.println("Last 'Java' at index: " + text.lastIndexOf("Java"));

        System.out.println("\n===================================");
    }
}
```

**Expected Output:**
```
===== PATTERN MATCHING BASICS =====

--- Test 1: Email Validation ---
test@example.com is valid? true
invalid.email is valid? false
@test.com is valid? false
test@.com is valid? false

--- Test 2: Phone Validation ---
123-456-7890 is valid? true
(123) 456-7890 is valid? true
1234567890 is valid? true
12345 is valid? false

--- Test 3: Password Strength ---
Pass123! : Strong
password : Weak
PASS123 : Weak
Str0ng!Pass : Strong
weak : Weak

--- Test 4: Extract Numbers ---
Original: I have 3 apples and 25 oranges and 100 grapes
Numbers: 3 25 100

--- Test 5: Username Validation ---
john_doe is valid? true
ab is valid? false
valid_user123 is valid? true
invalid-user is valid? false
toolongusernamethatexceedslimit is valid? false

--- Test 6: Contains Patterns ---
Text: Java Programming is fun. Java is powerful!
Contains 'Java': true
Starts with 'Java': true
Ends with '!': true
First 'Java' at index: 0
Last 'Java' at index: 28

===================================
```

**💡 Common String Pattern Methods:**

```java
// contains - check if substring exists
text.contains("Java")  // true if "Java" found anywhere

// startsWith, endsWith - check prefix/suffix
text.startsWith("Hello")  // true if starts with "Hello"
text.endsWith("!")        // true if ends with "!"

// indexOf, lastIndexOf - find position
text.indexOf("Java")     // first occurrence index
text.lastIndexOf("Java") // last occurrence index

// matches - check if entire string matches pattern
text.matches("\\d+")     // true if all digits
text.matches("[a-z]+")   // true if all lowercase letters

// split - split by pattern
text.split("\\s+")       // split by whitespace
text.split(",")          // split by comma

// replaceAll - replace pattern
text.replaceAll("\\d", "X")  // replace all digits with X
text.replaceAll("\\s+", " ") // replace multiple spaces with single
```

**✅ Success Criteria:**
- Can use contains, startsWith, endsWith
- Know how to find substring positions
- Can validate basic patterns with matches()
- Understand split() for tokenization
- Can use replaceAll() for substitution

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| `text.matches("Java")` for "contains" | matches() requires full match | Use `contains()` or `.*Java.*` |
| Forgetting to escape \\ | `\d` won't work | Use `\\d` in Java strings |
| Not trimming input | Extra spaces cause failures | Use `trim()` first |
| Case sensitive matching | Misses variations | Convert to lower/upper first |

**🎯 Challenge:**
1. Create URL validator (http/https)
2. Extract all words starting with capital letter
3. Validate credit card format (16 digits)
4. Create simple HTML tag validator
5. Build postal code validator for your country
6. Implement simple find-and-replace tool

---

#### Exercise 6: Real-World String Application - Text Processor (30 minutes)

**What you'll learn:** Building a complete text processing application

**Create class: `TextProcessor`**

**Concept:** Combining string techniques to solve real-world problems.

**Step-by-Step:**

```java
import java.util.*;

public class TextProcessor {

    // Feature 1: Word counter
    public static Map<String, Integer> countWords(String text) {
        String[] words = text.toLowerCase().replaceAll("[^a-z\\s]", "").split("\\s+");
        Map<String, Integer> wordCount = new HashMap<>();

        for (String word : words) {
            if (!word.isEmpty()) {
                wordCount.put(word, wordCount.getOrDefault(word, 0) + 1);
            }
        }

        return wordCount;
    }

    // Feature 2: Text statistics
    public static void analyzeText(String text) {
        int charCount = text.length();
        int wordCount = text.split("\\s+").length;
        int lineCount = text.split("\n").length;
        int sentenceCount = text.split("[.!?]+").length;

        System.out.println("=== TEXT STATISTICS ===");
        System.out.println("Characters: " + charCount);
        System.out.println("Words: " + wordCount);
        System.out.println("Lines: " + lineCount);
        System.out.println("Sentences: " + sentenceCount);
    }

    // Feature 3: Format converter
    public static String toTitleCase(String text) {
        String[] words = text.toLowerCase().split(" ");
        StringBuilder result = new StringBuilder();

        for (String word : words) {
            if (word.length() > 0) {
                result.append(Character.toUpperCase(word.charAt(0)))
                      .append(word.substring(1))
                      .append(" ");
            }
        }

        return result.toString().trim();
    }

    // Feature 4: Remove extra spaces
    public static String cleanSpaces(String text) {
        return text.trim().replaceAll("\\s+", " ");
    }

    // Feature 5: Find and highlight
    public static String highlightWord(String text, String word) {
        return text.replaceAll("(?i)" + word, "**" + word.toUpperCase() + "**");
    }

    // Feature 6: Generate summary
    public static String generateSummary(String text, int sentences) {
        String[] allSentences = text.split("[.!?]+");
        StringBuilder summary = new StringBuilder();

        for (int i = 0; i < Math.min(sentences, allSentences.length); i++) {
            summary.append(allSentences[i].trim()).append(". ");
        }

        return summary.toString();
    }

    public static void main(String[] args) {
        System.out.println("===== TEXT PROCESSOR =====\n");

        String article = "Java is a programming language. " +
                        "Java is platform independent. " +
                        "Programming in Java is fun. " +
                        "Java    has   multiple   spaces. " +
                        "JAVA is case sensitive!";

        // Feature 1: Word frequency
        System.out.println("--- Word Frequency ---");
        Map<String, Integer> wordFreq = countWords(article);
        System.out.println("Most common words:");
        wordFreq.entrySet().stream()
                .sorted((a, b) -> b.getValue() - a.getValue())
                .limit(5)
                .forEach(e -> System.out.println(e.getKey() + ": " + e.getValue()));

        // Feature 2: Statistics
        System.out.println("\n--- Text Analysis ---");
        analyzeText(article);

        // Feature 3: Title case
        System.out.println("\n--- Title Case Conversion ---");
        String sample = "hello world from java";
        System.out.println("Original: " + sample);
        System.out.println("Title Case: " + toTitleCase(sample));

        // Feature 4: Clean spaces
        System.out.println("\n--- Space Cleaning ---");
        String messy = "  This   has    extra     spaces  ";
        System.out.println("Original: '" + messy + "'");
        System.out.println("Cleaned: '" + cleanSpaces(messy) + "'");

        // Feature 5: Highlight
        System.out.println("\n--- Word Highlighting ---");
        String highlighted = highlightWord(article, "java");
        System.out.println(highlighted);

        // Feature 6: Summary
        System.out.println("\n--- Text Summary ---");
        String longText = "First sentence here. Second sentence here. " +
                         "Third sentence here. Fourth sentence here.";
        System.out.println("Original (" + longText.split("[.!?]+").length + " sentences):");
        System.out.println(longText);
        System.out.println("\nSummary (2 sentences):");
        System.out.println(generateSummary(longText, 2));

        System.out.println("\n==========================");
    }
}
```

**Expected Output:**
```
===== TEXT PROCESSOR =====

--- Word Frequency ---
Most common words:
java: 5
is: 4
programming: 2
in: 1
a: 1

--- Text Analysis ---
=== TEXT STATISTICS ===
Characters: 148
Words: 24
Lines: 1
Sentences: 5

--- Title Case Conversion ---
Original: hello world from java
Title Case: Hello World From Java

--- Space Cleaning ---
Original: '  This   has    extra     spaces  '
Cleaned: 'This has extra spaces'

--- Word Highlighting ---
**JAVA** is a programming language. **JAVA** is platform independent. Programming in **JAVA** is fun. **JAVA**    has   multiple   spaces. **JAVA** is case sensitive!

--- Text Summary ---
Original (4 sentences):
First sentence here. Second sentence here. Third sentence here. Fourth sentence here.

Summary (2 sentences):
First sentence here. Second sentence here.

==========================
```

**✅ Success Criteria:**
- Can analyze text statistics
- Know how to count word frequencies
- Can format text (title case, clean spaces)
- Understand case-insensitive operations
- Can extract and summarize content

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Not handling punctuation | Affects word count | Use `replaceAll()` to clean |
| Case sensitive matching | Misses variations | Use `toLowerCase()` first |
| Not trimming whitespace | Extra spaces in results | Always `trim()` |
| Inefficient string building | Slow for large text | Use StringBuilder |

**🎯 Challenge:**
1. Add reading level calculator (Flesch-Kincaid)
2. Implement spell checker (basic)
3. Create text diff tool (compare two texts)
4. Build simple search with highlighting
5. Add plagiarism detector (basic)
6. Create word cloud generator (top N words)

---

**🎯 Day 22 Complete! You now master String manipulation in Java!**

---

### Day 26: Java 8 Features - Lambda & Streams

---

#### Exercise 1: Lambda Expressions Basics (20 minutes)

**What you'll learn:** Understanding and using lambda expressions

**Create class: `LambdaBasics`**

**Concept:** **Lambda expressions** provide a concise way to represent anonymous functions (methods without names). They make code more readable and enable functional programming in Java.

```
Traditional Anonymous Class:
Runnable r = new Runnable() {
    public void run() {
        System.out.println("Hello");
    }
};

Lambda Expression:
Runnable r = () -> System.out.println("Hello");

Benefits:
1. Less boilerplate code
2. More readable
3. Enables functional programming
4. Works with functional interfaces
```

**Syntax:**
```
(parameters) -> expression
(parameters) -> { statements; }

Examples:
() -> 42                         // No parameters
x -> x * 2                      // One parameter
(x, y) -> x + y                 // Multiple parameters
(String s) -> s.length()        // With type
x -> { System.out.println(x); } // Block body
```

**Step-by-Step:**

```java
// Functional interfaces for demonstration
@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);
}

@FunctionalInterface
interface Greeting {
    void sayHello(String name);
}

@FunctionalInterface
interface StringProcessor {
    String process(String s);
}

public class LambdaBasics {
    public static void main(String[] args) {
        System.out.println("===== LAMBDA EXPRESSIONS =====\n");

        // Example 1: No parameters
        System.out.println("--- Example 1: No Parameters ---");
        Runnable task = () -> System.out.println("Task running!");
        task.run();

        Runnable multiLine = () -> {
            System.out.println("Line 1");
            System.out.println("Line 2");
            System.out.println("Line 3");
        };
        multiLine.run();

        // Example 2: One parameter
        System.out.println("\n--- Example 2: One Parameter ---");
        StringProcessor toUpper = s -> s.toUpperCase();
        StringProcessor toLower = s -> s.toLowerCase();
        StringProcessor addPrefix = s -> "Hello, " + s;

        String name = "Java";
        System.out.println("Original: " + name);
        System.out.println("Upper: " + toUpper.process(name));
        System.out.println("Lower: " + toLower.process(name));
        System.out.println("Prefix: " + addPrefix.process(name));

        // Example 3: Multiple parameters
        System.out.println("\n--- Example 3: Multiple Parameters ---");
        Calculator add = (a, b) -> a + b;
        Calculator subtract = (a, b) -> a - b;
        Calculator multiply = (a, b) -> a * b;
        Calculator divide = (a, b) -> a / b;

        int x = 10, y = 5;
        System.out.println(x + " + " + y + " = " + add.calculate(x, y));
        System.out.println(x + " - " + y + " = " + subtract.calculate(x, y));
        System.out.println(x + " * " + y + " = " + multiply.calculate(x, y));
        System.out.println(x + " / " + y + " = " + divide.calculate(x, y));

        // Example 4: With explicit types
        System.out.println("\n--- Example 4: Explicit Types ---");
        Calculator power = (int a, int b) -> {
            int result = 1;
            for (int i = 0; i < b; i++) {
                result *= a;
            }
            return result;
        };
        System.out.println("2^3 = " + power.calculate(2, 3));

        // Example 5: Built-in functional interfaces
        System.out.println("\n--- Example 5: Built-in Interfaces ---");

        // Predicate<T> - boolean test(T t)
        java.util.function.Predicate<String> isEmpty = s -> s.isEmpty();
        System.out.println("'' is empty? " + isEmpty.test(""));
        System.out.println("'Hello' is empty? " + isEmpty.test("Hello"));

        // Consumer<T> - void accept(T t)
        java.util.function.Consumer<String> printer =
            s -> System.out.println("Value: " + s);
        printer.accept("Test");

        // Supplier<T> - T get()
        java.util.function.Supplier<Double> randomSupplier =
            () -> Math.random();
        System.out.println("Random: " + randomSupplier.get());

        // Function<T,R> - R apply(T t)
        java.util.function.Function<String, Integer> length =
            s -> s.length();
        System.out.println("Length of 'Hello': " + length.apply("Hello"));

        System.out.println("\n==============================");
    }
}
```

**Expected Output:**
```
===== LAMBDA EXPRESSIONS =====

--- Example 1: No Parameters ---
Task running!
Line 1
Line 2
Line 3

--- Example 2: One Parameter ---
Original: Java
Upper: JAVA
Lower: java
Prefix: Hello, Java

--- Example 3: Multiple Parameters ---
10 + 5 = 15
10 - 5 = 5
10 * 5 = 50
10 / 5 = 2

--- Example 4: Explicit Types ---
2^3 = 8

--- Example 5: Built-in Interfaces ---
'' is empty? true
'Hello' is empty? false
Value: Test
Random: 0.7234567890
Length of 'Hello': 5

==============================
```

**💡 Lambda Syntax Summary:**

```java
// Single expression (implicit return)
(x, y) -> x + y

// Multiple statements (explicit return)
(x, y) -> {
    int sum = x + y;
    return sum;
}

// No parameters
() -> System.out.println("Hi")

// One parameter (parentheses optional)
x -> x * 2
(x) -> x * 2  // Same thing
```

**Built-in Functional Interfaces:**

| Interface | Method | Description | Example |
|-----------|--------|-------------|---------|
| `Predicate<T>` | `boolean test(T t)` | Condition check | `x -> x > 0` |
| `Consumer<T>` | `void accept(T t)` | Consumes value | `x -> System.out.println(x)` |
| `Supplier<T>` | `T get()` | Supplies value | `() -> new Random().nextInt()` |
| `Function<T,R>` | `R apply(T t)` | Transforms value | `x -> x.length()` |

**✅ Success Criteria:**
- Understand lambda syntax
- Can write lambdas with different parameter counts
- Know when to use {} and return
- Familiar with built-in functional interfaces
- Can pass lambdas as parameters

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| `x -> { x * 2 }` | Missing return | `x -> { return x * 2; }` or `x -> x * 2` |
| Using lambda on non-functional interface | Interface needs exactly 1 abstract method | Use `@FunctionalInterface` |
| `(int x, y) -> x + y` | Mix of typed/untyped | All or none: `(int x, int y)` or `(x, y)` |
| Modifying outer variables | Only final/effectively final allowed | Don't modify captured variables |

**🎯 Challenge:**
1. Create custom functional interfaces for common operations
2. Build calculator using only lambdas
3. Implement sorting with lambda comparators
4. Create validation framework using Predicate
5. Build simple event system with lambdas

---

#### Exercise 2: Functional Interfaces Deep Dive (20 minutes)

**What you'll learn:** Mastering built-in and custom functional interfaces

**Create class: `FunctionalInterfacesDemo`**

**Concept:** **Functional Interface** = Interface with exactly ONE abstract method. Can have default and static methods. Used as target type for lambda expressions.

```java
@FunctionalInterface
interface MyFunction {
    int apply(int x);  // Single abstract method

    // Can have default methods
    default void printInfo() {
        System.out.println("This is a function");
    }

    // Can have static methods
    static void help() {
        System.out.println("Help text");
    }
}
```

**Step-by-Step:**

```java
import java.util.function.*;
import java.util.ArrayList;
import java.util.List;

// Custom functional interface
@FunctionalInterface
interface Validator<T> {
    boolean validate(T value);
}

@FunctionalInterface
interface Transformer<T> {
    T transform(T value);
}

public class FunctionalInterfacesDemo {

    public static void main(String[] args) {
        System.out.println("===== FUNCTIONAL INTERFACES =====\n");

        // Part 1: Predicate<T> - boolean test(T t)
        System.out.println("--- Part 1: Predicate ---");
        Predicate<Integer> isEven = n -> n % 2 == 0;
        Predicate<Integer> isPositive = n -> n > 0;
        Predicate<String> isLong = s -> s.length() > 5;

        System.out.println("10 is even? " + isEven.test(10));
        System.out.println("-5 is positive? " + isPositive.test(-5));
        System.out.println("'Hello' is long? " + isLong.test("Hello"));

        // Combining predicates
        Predicate<Integer> isEvenAndPositive = isEven.and(isPositive);
        System.out.println("10 is even AND positive? " + isEvenAndPositive.test(10));

        // Part 2: Function<T, R> - R apply(T t)
        System.out.println("\n--- Part 2: Function ---");
        Function<String, Integer> stringLength = s -> s.length();
        Function<Integer, Integer> square = n -> n * n;
        Function<String, String> toUpper = s -> s.toUpperCase();

        System.out.println("Length of 'Java': " + stringLength.apply("Java"));
        System.out.println("Square of 5: " + square.apply(5));
        System.out.println("Uppercase 'hello': " + toUpper.apply("hello"));

        // Function chaining
        Function<Integer, Integer> addTen = n -> n + 10;
        Function<Integer, Integer> multiplyByTwo = n -> n * 2;
        Function<Integer, Integer> combined = addTen.andThen(multiplyByTwo);

        System.out.println("(5 + 10) * 2 = " + combined.apply(5));

        // Part 3: Consumer<T> - void accept(T t)
        System.out.println("\n--- Part 3: Consumer ---");
        Consumer<String> printer = s -> System.out.println(">> " + s);
        Consumer<List<Integer>> listPrinter = list -> {
            System.out.print("List: ");
            list.forEach(n -> System.out.print(n + " "));
            System.out.println();
        };

        printer.accept("Hello World");

        List<Integer> numbers = new ArrayList<>();
        numbers.add(1);
        numbers.add(2);
        numbers.add(3);
        listPrinter.accept(numbers);

        // Part 4: Supplier<T> - T get()
        System.out.println("\n--- Part 4: Supplier ---");
        Supplier<String> helloSupplier = () -> "Hello World";
        Supplier<Integer> randomSupplier = () -> (int)(Math.random() * 100);
        Supplier<List<String>> listSupplier = ArrayList::new;

        System.out.println("Supplied string: " + helloSupplier.get());
        System.out.println("Random number: " + randomSupplier.get());
        System.out.println("New list: " + listSupplier.get());

        // Part 5: UnaryOperator<T> - T apply(T t)
        System.out.println("\n--- Part 5: UnaryOperator ---");
        UnaryOperator<String> toUpperCase = s -> s.toUpperCase();
        UnaryOperator<Integer> doubleIt = n -> n * 2;

        System.out.println("Uppercase: " + toUpperCase.apply("java"));
        System.out.println("Double of 5: " + doubleIt.apply(5));

        // Part 6: BinaryOperator<T> - T apply(T t1, T t2)
        System.out.println("\n--- Part 6: BinaryOperator ---");
        BinaryOperator<Integer> add = (a, b) -> a + b;
        BinaryOperator<Integer> multiply = (a, b) -> a * b;
        BinaryOperator<String> concat = (a, b) -> a + b;

        System.out.println("5 + 3 = " + add.apply(5, 3));
        System.out.println("5 * 3 = " + multiply.apply(5, 3));
        System.out.println("Concat: " + concat.apply("Hello", "World"));

        // Part 7: BiFunction<T, U, R> - R apply(T t, U u)
        System.out.println("\n--- Part 7: BiFunction ---");
        BiFunction<Integer, Integer, Integer> power = (base, exp) -> {
            int result = 1;
            for (int i = 0; i < exp; i++) {
                result *= base;
            }
            return result;
        };
        BiFunction<String, Integer, String> repeat = (s, n) -> s.repeat(n);

        System.out.println("2^3 = " + power.apply(2, 3));
        System.out.println("Repeat 'Hi' 3 times: " + repeat.apply("Hi", 3));

        // Part 8: BiPredicate<T, U> - boolean test(T t, U u)
        System.out.println("\n--- Part 8: BiPredicate ---");
        BiPredicate<String, Integer> isLength = (s, len) -> s.length() == len;
        BiPredicate<Integer, Integer> isGreater = (a, b) -> a > b;

        System.out.println("'Hello' has length 5? " + isLength.test("Hello", 5));
        System.out.println("10 > 5? " + isGreater.test(10, 5));

        // Part 9: Custom functional interface
        System.out.println("\n--- Part 9: Custom Interfaces ---");
        Validator<String> emailValidator = email -> email.contains("@");
        Validator<Integer> rangeValidator = num -> num >= 0 && num <= 100;

        System.out.println("'test@example.com' valid? " + emailValidator.validate("test@example.com"));
        System.out.println("50 in range [0-100]? " + rangeValidator.validate(50));

        Transformer<String> trimmer = s -> s.trim();
        Transformer<Integer> incrementer = n -> n + 1;

        System.out.println("Trimmed: '" + trimmer.transform("  hello  ") + "'");
        System.out.println("Incremented 5: " + incrementer.transform(5));

        System.out.println("\n=================================");
    }
}
```

**Expected Output:**
```
===== FUNCTIONAL INTERFACES =====

--- Part 1: Predicate ---
10 is even? true
-5 is positive? false
'Hello' is long? false
10 is even AND positive? true

--- Part 2: Function ---
Length of 'Java': 4
Square of 5: 25
Uppercase 'hello': HELLO
(5 + 10) * 2 = 30

--- Part 3: Consumer ---
>> Hello World
List: 1 2 3

--- Part 4: Supplier ---
Supplied string: Hello World
Random number: 42
New list: []

--- Part 5: UnaryOperator ---
Uppercase: JAVA
Double of 5: 10

--- Part 6: BinaryOperator ---
5 + 3 = 8
5 * 3 = 15
Concat: HelloWorld

--- Part 7: BiFunction ---
2^3 = 8
Repeat 'Hi' 3 times: HiHiHi

--- Part 8: BiPredicate ---
'Hello' has length 5? true
10 > 5? true

--- Part 9: Custom Interfaces ---
'test@example.com' valid? true
50 in range [0-100]? true
Trimmed: 'hello'
Incremented 5: 6

=================================
```

**💡 Functional Interfaces Cheat Sheet:**

| Interface | Parameters | Return | Use Case |
|-----------|------------|--------|----------|
| `Predicate<T>` | T | boolean | Testing conditions |
| `Function<T,R>` | T | R | Transforming values |
| `Consumer<T>` | T | void | Processing/printing |
| `Supplier<T>` | none | T | Generating values |
| `UnaryOperator<T>` | T | T | Same-type transformation |
| `BinaryOperator<T>` | T, T | T | Combining two values |
| `BiFunction<T,U,R>` | T, U | R | Two inputs, one output |
| `BiPredicate<T,U>` | T, U | boolean | Testing two values |

**✅ Success Criteria:**
- Understand all major functional interfaces
- Can choose appropriate interface for task
- Know how to chain operations (and, andThen)
- Can create custom functional interfaces
- Understand @FunctionalInterface annotation

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Multiple abstract methods | Not functional interface | Keep ONE abstract method |
| Forgetting @FunctionalInterface | No compile-time check | Always add annotation |
| Wrong interface for task | Inefficient or confusing | Choose based on signature |
| Not using method reference | Verbose lambda | Use `::` when possible |

**🎯 Challenge:**
1. Create chain of 5 Functions that transform data
2. Build validation system with multiple Predicates
3. Implement calculator with BinaryOperators
4. Create data pipeline with Consumers
5. Build factory system with Suppliers

---

Due to length constraints, I need to continue in the next part. This file now contains:
- Day 22: Exercise 1-6 (String topics complete)
- Day 26: Exercise 1-2 (Lambda basics and Functional Interfaces)

The file needs:
- Day 26: Exercises 3-7 (Method References, Streams, Operations)
- Day 29: Exercises 1-7 (Multithreading complete set)

Would you like me to continue creating the remaining exercises?
