# Day 15: Strings

## 📚 Learning Objectives
By the end of this lesson, you will be able to:
- Understand String immutability and its implications
- Work with String creation methods (literal vs new)
- Master essential String methods
- Understand the String pool concept
- Use StringBuilder and StringBuffer effectively
- Solve common String manipulation problems

---

## 🎯 Topics Covered

### 1. String Class and Immutability

#### What is a String?
```java
// String is a sequence of characters
String greeting = "Hello, World!";
String name = "Java";

// Strings are objects in Java
String str1 = new String("Hello");
String str2 = "Hello";
```

#### String Immutability
```java
public class StringImmutability {
    public static void main(String[] args) {
        String str = "Hello";
        System.out.println("Original: " + str);
        System.out.println("Hash code: " + str.hashCode());
        
        // This creates a NEW string, doesn't modify original
        str = str + " World";
        System.out.println("Modified: " + str);
        System.out.println("Hash code: " + str.hashCode());
        
        // Original "Hello" still exists in memory
    }
}
```

**Why are Strings immutable?**
- Security (passwords, network connections)
- Thread safety
- String pool optimization
- Caching hash codes

---

### 2. String Creation Methods

#### String Literal vs new Keyword
```java
public class StringCreation {
    public static void main(String[] args) {
        // String literal - goes to String pool
        String s1 = "Hello";
        String s2 = "Hello";
        
        // new keyword - creates object in heap
        String s3 = new String("Hello");
        String s4 = new String("Hello");
        
        // Comparison
        System.out.println(s1 == s2);        // true (same reference)
        System.out.println(s3 == s4);        // false (different objects)
        System.out.println(s1 == s3);        // false
        System.out.println(s1.equals(s3));   // true (same content)
    }
}
```

#### String Pool Concept
```java
public class StringPool {
    public static void main(String[] args) {
        String s1 = "Java";
        String s2 = "Java";
        String s3 = new String("Java");
        String s4 = s3.intern(); // Add to pool
        
        System.out.println(s1 == s2);  // true
        System.out.println(s1 == s3);  // false
        System.out.println(s1 == s4);  // true
    }
}
```

---

### 3. Essential String Methods

#### Length and Character Access
```java
public class StringMethods1 {
    public static void main(String[] args) {
        String str = "Hello World";
        
        // Length
        System.out.println("Length: " + str.length());
        
        // Character at index
        System.out.println("Char at 0: " + str.charAt(0));
        System.out.println("Char at 6: " + str.charAt(6));
        
        // Index of character/substring
        System.out.println("Index of 'o': " + str.indexOf('o'));
        System.out.println("Last index of 'o': " + str.lastIndexOf('o'));
        System.out.println("Index of 'World': " + str.indexOf("World"));
    }
}
```

#### Substring and Splitting
```java
public class StringMethods2 {
    public static void main(String[] args) {
        String str = "Java Programming";
        
        // Substring
        System.out.println(str.substring(5));      // "Programming"
        System.out.println(str.substring(0, 4));   // "Java"
        
        // Split
        String[] words = str.split(" ");
        for (String word : words) {
            System.out.println(word);
        }
        
        // Split with regex
        String csv = "apple,banana,orange";
        String[] fruits = csv.split(",");
    }
}
```

#### Case Conversion and Trimming
```java
public class StringMethods3 {
    public static void main(String[] args) {
        String str = "  Hello World  ";
        
        // Case conversion
        System.out.println(str.toUpperCase());
        System.out.println(str.toLowerCase());
        
        // Trimming
        System.out.println("'" + str + "'");
        System.out.println("'" + str.trim() + "'");
        
        // Replace
        System.out.println(str.replace("World", "Java"));
        System.out.println(str.replaceAll("\\s+", "-"));
    }
}
```

#### Comparison Methods
```java
public class StringComparison {
    public static void main(String[] args) {
        String s1 = "Hello";
        String s2 = "hello";
        String s3 = "Hello";
        
        // equals (case-sensitive)
        System.out.println(s1.equals(s2));           // false
        System.out.println(s1.equals(s3));           // true
        
        // equalsIgnoreCase
        System.out.println(s1.equalsIgnoreCase(s2)); // true
        
        // compareTo (lexicographic)
        System.out.println(s1.compareTo(s3));        // 0
        System.out.println(s1.compareTo(s2));        // negative
        
        // startsWith, endsWith
        System.out.println(s1.startsWith("He"));     // true
        System.out.println(s1.endsWith("lo"));       // true
        
        // contains
        System.out.println(s1.contains("ell"));      // true
    }
}
```

---

### 4. StringBuilder and StringBuffer

#### Why StringBuilder?
```java
public class StringConcatenation {
    public static void main(String[] args) {
        // Inefficient - creates many String objects
        String result = "";
        for (int i = 0; i < 1000; i++) {
            result += i; // Creates new String each time
        }
        
        // Efficient - uses StringBuilder internally
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 1000; i++) {
            sb.append(i);
        }
        String result2 = sb.toString();
    }
}
```

#### StringBuilder Methods
```java
public class StringBuilderDemo {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("Hello");
        
        // Append
        sb.append(" World");
        sb.append('!');
        System.out.println(sb);
        
        // Insert
        sb.insert(5, ",");
        System.out.println(sb);
        
        // Delete
        sb.delete(5, 6);
        System.out.println(sb);
        
        // Reverse
        sb.reverse();
        System.out.println(sb);
        
        // Replace
        sb.reverse(); // Back to normal
        sb.replace(0, 5, "Hi");
        System.out.println(sb);
        
        // Convert to String
        String result = sb.toString();
    }
}
```

#### StringBuilder vs StringBuffer
```java
public class StringBuilderVsBuffer {
    public static void main(String[] args) {
        // StringBuilder - Not thread-safe, faster
        StringBuilder builder = new StringBuilder();
        builder.append("Fast");
        
        // StringBuffer - Thread-safe, slower
        StringBuffer buffer = new StringBuffer();
        buffer.append("Safe");
        
        // Use StringBuilder for single-threaded
        // Use StringBuffer for multi-threaded
    }
}
```

---

## 💻 Practice Exercises

### Exercise 1: Palindrome Checker
```java
public class PalindromeChecker {
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
    
    public static void main(String[] args) {
        System.out.println(isPalindrome("racecar"));      // true
        System.out.println(isPalindrome("A man a plan a canal Panama")); // true
        System.out.println(isPalindrome("hello"));        // false
    }
}
```

### Exercise 2: Reverse String
```java
public class ReverseString {
    // Method 1: Using StringBuilder
    public static String reverse1(String str) {
        return new StringBuilder(str).reverse().toString();
    }
    
    // Method 2: Using character array
    public static String reverse2(String str) {
        char[] chars = str.toCharArray();
        int left = 0, right = chars.length - 1;
        
        while (left < right) {
            char temp = chars[left];
            chars[left] = chars[right];
            chars[right] = temp;
            left++;
            right--;
        }
        return new String(chars);
    }
    
    public static void main(String[] args) {
        String str = "Hello World";
        System.out.println(reverse1(str));
        System.out.println(reverse2(str));
    }
}
```

### Exercise 3: Anagram Checker
```java
import java.util.Arrays;

public class AnagramChecker {
    public static boolean isAnagram(String s1, String s2) {
        // Remove spaces and convert to lowercase
        s1 = s1.replaceAll("\\s+", "").toLowerCase();
        s2 = s2.replaceAll("\\s+", "").toLowerCase();
        
        // Check length
        if (s1.length() != s2.length()) {
            return false;
        }
        
        // Sort and compare
        char[] arr1 = s1.toCharArray();
        char[] arr2 = s2.toCharArray();
        Arrays.sort(arr1);
        Arrays.sort(arr2);
        
        return Arrays.equals(arr1, arr2);
    }
    
    public static void main(String[] args) {
        System.out.println(isAnagram("listen", "silent"));  // true
        System.out.println(isAnagram("hello", "world"));    // false
    }
}
```

### Exercise 4: Count Vowels and Consonants
```java
public class VowelConsonantCounter {
    public static void countVowelsConsonants(String str) {
        str = str.toLowerCase();
        int vowels = 0, consonants = 0;
        
        for (int i = 0; i < str.length(); i++) {
            char ch = str.charAt(i);
            if (Character.isLetter(ch)) {
                if (ch == 'a' || ch == 'e' || ch == 'i' || 
                    ch == 'o' || ch == 'u') {
                    vowels++;
                } else {
                    consonants++;
                }
            }
        }
        
        System.out.println("Vowels: " + vowels);
        System.out.println("Consonants: " + consonants);
    }
    
    public static void main(String[] args) {
        countVowelsConsonants("Hello World");
    }
}
```

---

## 🎓 Key Takeaways

1. **Strings are immutable** - any modification creates a new String
2. **Use String literals** for better memory efficiency (String pool)
3. **Use equals()** for content comparison, not ==
4. **Use StringBuilder** for multiple concatenations
5. **Common methods**: length(), charAt(), substring(), indexOf(), split()
6. **StringBuffer** is thread-safe but slower than StringBuilder

---

## 📝 Summary

Today you learned:
- ✅ String immutability and its benefits
- ✅ String pool and memory optimization
- ✅ Essential String methods for manipulation
- ✅ StringBuilder for efficient string building
- ✅ Common string algorithms (palindrome, reverse, anagram)

---

## ⚠️ Common Mistakes

### 1. String Immutability Misunderstandings

#### ❌ Wrong - Expecting String to Modify In Place:
```java
// WRONG
public class Main {
    public static void main(String[] args) {
        String str = "Hello";
        str.toUpperCase();  // Expecting str to change
        System.out.println(str);  // Prints "Hello" - NOT modified!
    }
}
```
**Issue:** String methods return new String objects; original unchanged

#### ✅ Right:
```java
// CORRECT - Capture return value
public class Main {
    public static void main(String[] args) {
        String str = "Hello";
        str = str.toUpperCase();  // Assign to capture new String
        System.out.println(str);  // Prints "HELLO"
    }
}
```

**Why:** Strings are immutable; all modification methods return new String objects.

**💡 Tip:** Always assign result of String methods to a variable (old or new).

---

#### ❌ Wrong - Trying to Modify Characters in String:
```java
// WRONG
public class Main {
    public static void main(String[] args) {
        String str = "Hello";
        str.charAt(0) = 'h';  // Compilation error! charAt() returns value, not reference
    }
}
```
**Issue:** Cannot modify String characters directly; no setter for characters

#### ✅ Right:
```java
// CORRECT - Convert to char array, modify, convert back
public class Main {
    public static void main(String[] args) {
        String str = "Hello";
        char[] chars = str.toCharArray();
        chars[0] = 'h';
        str = new String(chars);
        System.out.println(str);  // "hello"

        // OR use StringBuilder
        StringBuilder sb = new StringBuilder(str);
        sb.setCharAt(0, 'h');
        str = sb.toString();
    }
}
```

**Why:** Strings are immutable; use char[] or StringBuilder for modifications.

**💡 Tip:** Use StringBuilder when making multiple modifications to same string.

---

### 2. String Creation and Pool Mistakes

#### ❌ Wrong - Using new String() Unnecessarily:
```java
// WRONG - Creates unnecessary object
String s1 = new String("Hello");  // Creates 2 objects: pool + heap
String s2 = new String("Hello");  // Creates another heap object

// Wastes memory
System.out.println(s1 == s2);  // false - different heap objects
```
**Issue:** new String() bypasses pool, creates heap object, wastes memory

#### ✅ Right:
```java
// CORRECT - Use string literal
String s1 = "Hello";  // Uses String pool
String s2 = "Hello";  // Reuses same pool object

System.out.println(s1 == s2);  // true - same reference
```

**Why:** String literals automatically use pool for memory efficiency.

**💡 Tip:** Only use `new String()` when you specifically need a separate object.

---

#### ❌ Wrong - Misunderstanding intern() Usage:
```java
// WRONG expectation
String s1 = new String("Hello");
String s2 = new String("Hello");
s1.intern();  // Adds to pool but doesn't change s1
s2.intern();

System.out.println(s1 == s2);  // false - s1 and s2 still point to heap objects
```
**Issue:** intern() returns pool reference; doesn't modify original variable

#### ✅ Right:
```java
// CORRECT - Assign intern() result
String s1 = new String("Hello").intern();  // Points to pool
String s2 = new String("Hello").intern();  // Points to same pool object

System.out.println(s1 == s2);  // true - both reference pool

// OR
String s3 = new String("Hello");
String s4 = s3.intern();  // s4 points to pool, s3 still points to heap
```

**Why:** intern() returns pool reference; must assign to use it.

**💡 Tip:** intern() useful when many duplicate strings from different sources.

---

### 3. String Comparison Mistakes

#### ❌ Wrong - Using == for String Content Comparison:
```java
// WRONG
public class Main {
    public static void main(String[] args) {
        String s1 = "Hello";
        String s2 = new String("Hello");

        if (s1 == s2) {  // false - different references
            System.out.println("Equal");
        } else {
            System.out.println("Not equal");  // This prints
        }
    }
}
```
**Issue:** == compares references, not content

#### ✅ Right:
```java
// CORRECT - Use equals() for content
public class Main {
    public static void main(String[] args) {
        String s1 = "Hello";
        String s2 = new String("Hello");

        if (s1.equals(s2)) {  // true - same content
            System.out.println("Equal");  // This prints
        }
    }
}
```

**Why:** equals() compares string content; == compares object references.

**💡 Tip:** Always use equals() for String comparison unless specifically comparing references.

---

#### ❌ Wrong - Not Handling Case Sensitivity:
```java
// WRONG
public class Main {
    public static void main(String[] args) {
        String password = "SecretPass123";
        String input = "secretpass123";

        if (password.equals(input)) {  // false - case-sensitive
            System.out.println("Login successful");
        } else {
            System.out.println("Login failed");  // Prints this
        }
    }
}
```
**Issue:** equals() is case-sensitive; "A" != "a"

#### ✅ Right:
```java
// CORRECT - Use equalsIgnoreCase() when case doesn't matter
public class Main {
    public static void main(String[] args) {
        String username = "AdminUser";  // Usernames often case-insensitive
        String input = "adminuser";

        if (username.equalsIgnoreCase(input)) {  // true - ignores case
            System.out.println("Username found");
        }

        // For passwords, keep case-sensitive!
        String password = "SecretPass123";
        String passInput = "SecretPass123";
        if (password.equals(passInput)) {  // Use equals() for passwords
            System.out.println("Correct password");
        }
    }
}
```

**Why:** equalsIgnoreCase() for case-insensitive comparison; equals() for exact match.

**💡 Tip:** Use equalsIgnoreCase() for usernames/emails, equals() for passwords.

---

#### ❌ Wrong - Comparing with null Using equals():
```java
// WRONG - NullPointerException risk
public class Main {
    public static void main(String[] args) {
        String str = getUserInput();  // Returns null

        if (str.equals("exit")) {  // NullPointerException if str is null!
            System.exit(0);
        }
    }

    public static String getUserInput() {
        return null;
    }
}
```
**Issue:** Calling equals() on null throws NullPointerException

#### ✅ Right:
```java
// CORRECT - Check null first OR reverse comparison
public class Main {
    public static void main(String[] args) {
        String str = getUserInput();

        // Option 1: Check null first
        if (str != null && str.equals("exit")) {
            System.exit(0);
        }

        // Option 2: Reverse comparison (safer)
        if ("exit".equals(str)) {  // Safe even if str is null
            System.exit(0);
        }
    }
}
```

**Why:** Constant string on left prevents NullPointerException.

**💡 Tip:** Use "constant".equals(variable) pattern to avoid null checks.

---

### 4. String Method Mistakes

#### ❌ Wrong - Confusing substring() End Index:
```java
// WRONG understanding
public class Main {
    public static void main(String[] args) {
        String str = "Hello World";

        // Student thinks substring(0, 5) includes index 5
        String sub = str.substring(0, 5);
        System.out.println(sub);  // "Hello" - NOT "Hello " (no space)
        // Index 5 ('space') is EXCLUDED
    }
}
```
**Issue:** substring(start, end) excludes character at end index

#### ✅ Right:
```java
// CORRECT - End index is exclusive
public class Main {
    public static void main(String[] args) {
        String str = "Hello World";

        // To include space at index 5, use index 6 as end
        String sub = str.substring(0, 6);  // "Hello "
        System.out.println(sub);

        // substring(start) goes to end of string
        String rest = str.substring(6);  // "World"
    }
}
```

**Why:** substring(start, end) range is [start, end) - start inclusive, end exclusive.

**💡 Tip:** Remember: start inclusive, end exclusive (like array ranges).

---

#### ❌ Wrong - IndexOutOfBoundsException with charAt():
```java
// WRONG
public class Main {
    public static void main(String[] args) {
        String str = "Hello";

        // String length is 5, valid indices: 0-4
        char ch = str.charAt(5);  // IndexOutOfBoundsException!
    }
}
```
**Issue:** Valid indices are 0 to length-1, not 0 to length

#### ✅ Right:
```java
// CORRECT - Check bounds before accessing
public class Main {
    public static void main(String[] args) {
        String str = "Hello";
        int index = 5;

        if (index >= 0 && index < str.length()) {
            char ch = str.charAt(index);
            System.out.println(ch);
        } else {
            System.out.println("Invalid index");
        }

        // Last character
        if (str.length() > 0) {
            char last = str.charAt(str.length() - 1);  // Index 4
        }
    }
}
```

**Why:** String indices range from 0 to length()-1.

**💡 Tip:** Always validate index < length() before using charAt().

---

#### ❌ Wrong - Forgetting indexOf() Returns -1:
```java
// WRONG - Doesn't check for -1
public class Main {
    public static void main(String[] args) {
        String str = "Hello World";
        int index = str.indexOf('x');  // Returns -1 (not found)

        char ch = str.charAt(index);  // IndexOutOfBoundsException!
    }
}
```
**Issue:** indexOf() returns -1 when not found; using -1 as index causes exception

#### ✅ Right:
```java
// CORRECT - Check for -1 before using index
public class Main {
    public static void main(String[] args) {
        String str = "Hello World";
        int index = str.indexOf('x');

        if (index != -1) {
            char ch = str.charAt(index);
            System.out.println("Found: " + ch);
        } else {
            System.out.println("Character not found");
        }
    }
}
```

**Why:** indexOf() returns -1 when search fails; must check before using.

**💡 Tip:** Always check `indexOf() != -1` before using the returned index.

---

#### ❌ Wrong - Misusing split() with Special Regex Characters:
```java
// WRONG - Split by period doesn't work as expected
public class Main {
    public static void main(String[] args) {
        String filename = "document.pdf.backup";

        String[] parts = filename.split(".");  // Empty array! '.' is regex "any char"
        System.out.println(parts.length);  // 0
    }
}
```
**Issue:** split() takes regex; special characters like . * + ? need escaping

#### ✅ Right:
```java
// CORRECT - Escape special regex characters
public class Main {
    public static void main(String[] args) {
        String filename = "document.pdf.backup";

        // Escape the period
        String[] parts = filename.split("\\.");  // ["document", "pdf", "backup"]
        System.out.println(parts.length);  // 3

        // For literal pipe
        String data = "name|age|city";
        String[] fields = data.split("\\|");  // Escape pipe

        // For literal backslash
        String path = "C:\\Users\\Documents";
        String[] folders = path.split("\\\\");  // 4 backslashes!
    }
}
```

**Why:** split() uses regex; special characters need escaping with \\.

**💡 Tip:** Escape regex special chars: . * + ? | ( ) [ ] { } ^ $ \\

---

### 5. StringBuilder/StringBuffer Usage Mistakes

#### ❌ Wrong - Using String Concatenation in Loop:
```java
// WRONG - Very inefficient
public class Main {
    public static void main(String[] args) {
        String result = "";
        for (int i = 0; i < 10000; i++) {
            result += i;  // Creates 10,000 String objects!
        }
        // Slow and memory-intensive
    }
}
```
**Issue:** Each += creates new String object; extremely wasteful in loops

#### ✅ Right:
```java
// CORRECT - Use StringBuilder in loops
public class Main {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 10000; i++) {
            sb.append(i);  // Modifies same object
        }
        String result = sb.toString();
        // Much faster and memory-efficient
    }
}
```

**Why:** StringBuilder is mutable; append() modifies in place, no new objects.

**💡 Tip:** Use StringBuilder whenever concatenating in loops or many times.

---

#### ❌ Wrong - Using StringBuffer When StringBuilder Would Work:
```java
// WRONG - Unnecessary synchronization overhead
public class Main {
    public static String buildString() {
        StringBuffer sb = new StringBuffer();  // Thread-safe but slower
        for (int i = 0; i < 1000; i++) {
            sb.append(i);
        }
        return sb.toString();
    }

    public static void main(String[] args) {
        // Single-threaded usage - StringBuffer overkill
        String result = buildString();
    }
}
```
**Issue:** StringBuffer is synchronized; slower than StringBuilder in single-threaded code

#### ✅ Right:
```java
// CORRECT - Use StringBuilder for single-threaded
public class Main {
    public static String buildString() {
        StringBuilder sb = new StringBuilder();  // Faster
        for (int i = 0; i < 1000; i++) {
            sb.append(i);
        }
        return sb.toString();
    }

    // Only use StringBuffer in multi-threaded scenarios
    public static class ThreadSafeExample {
        private StringBuffer shared = new StringBuffer();

        public void appendInThread(String s) {
            shared.append(s);  // Thread-safe
        }
    }
}
```

**Why:** StringBuilder faster for single-threaded; StringBuffer only for multi-threaded.

**💡 Tip:** Default to StringBuilder; only use StringBuffer when sharing across threads.

---

#### ❌ Wrong - Not Setting Initial Capacity for Large Strings:
```java
// WRONG - Will resize multiple times
public class Main {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder();  // Default capacity: 16

        for (int i = 0; i < 10000; i++) {
            sb.append("Some text ");  // Will resize many times
        }
    }
}
```
**Issue:** Default capacity 16; frequent resizing (copying) wastes time

#### ✅ Right:
```java
// CORRECT - Set initial capacity to avoid resizing
public class Main {
    public static void main(String[] args) {
        // Estimate final size
        int estimatedSize = 10000 * 10;  // 10 chars per iteration
        StringBuilder sb = new StringBuilder(estimatedSize);

        for (int i = 0; i < 10000; i++) {
            sb.append("Some text ");
        }
        // No resizing needed - much faster
    }
}
```

**Why:** Pre-allocating capacity avoids expensive array copying during growth.

**💡 Tip:** Set initial capacity when building large strings for better performance.

---

#### ❌ Wrong - Forgetting to Convert StringBuilder to String:
```java
// WRONG - Comparison doesn't work as expected
public class Main {
    public static void main(String[] args) {
        StringBuilder sb1 = new StringBuilder("Hello");
        StringBuilder sb2 = new StringBuilder("Hello");

        if (sb1.equals(sb2)) {  // false - equals() not overridden!
            System.out.println("Equal");
        } else {
            System.out.println("Not equal");  // Prints this
        }
    }
}
```
**Issue:** StringBuilder doesn't override equals(); compares references only

#### ✅ Right:
```java
// CORRECT - Convert to String for comparison
public class Main {
    public static void main(String[] args) {
        StringBuilder sb1 = new StringBuilder("Hello");
        StringBuilder sb2 = new StringBuilder("Hello");

        if (sb1.toString().equals(sb2.toString())) {  // true
            System.out.println("Equal");
        }

        // Or use compareTo for lexicographic comparison
        int comparison = sb1.toString().compareTo(sb2.toString());
    }
}
```

**Why:** StringBuilder.equals() uses Object.equals() (reference comparison).

**💡 Tip:** Convert StringBuilder to String before using equals() or other String methods.

---

### 6. Null Handling Mistakes

#### ❌ Wrong - Not Checking for Null Before String Operations:
```java
// WRONG
public class Main {
    public static void processName(String name) {
        if (name.isEmpty()) {  // NullPointerException if name is null!
            System.out.println("Name is empty");
        }
        System.out.println(name.toUpperCase());  // NPE if null
    }

    public static void main(String[] args) {
        processName(null);  // Crashes!
    }
}
```
**Issue:** Calling methods on null reference throws NullPointerException

#### ✅ Right:
```java
// CORRECT - Check null first
public class Main {
    public static void processName(String name) {
        if (name == null) {
            System.out.println("Name is null");
            return;
        }

        if (name.isEmpty()) {
            System.out.println("Name is empty");
            return;
        }

        System.out.println(name.toUpperCase());
    }

    // OR combine checks
    public static void processName2(String name) {
        if (name == null || name.isEmpty()) {
            System.out.println("Invalid name");
            return;
        }
        System.out.println(name.toUpperCase());
    }
}
```

**Why:** Must check null before calling any methods on reference.

**💡 Tip:** Always validate null before String operations, especially for user input.

---

#### ❌ Wrong - Confusing null, Empty, and Blank:
```java
// WRONG - Treating them the same
public class Main {
    public static void main(String[] args) {
        String s1 = null;
        String s2 = "";
        String s3 = "   ";

        // Different meanings!
        System.out.println(s1.isEmpty());  // NPE!
        System.out.println(s2.isEmpty());  // true
        System.out.println(s3.isEmpty());  // false - has spaces
    }
}
```
**Issue:** null ≠ empty ≠ blank; different checks needed

#### ✅ Right:
```java
// CORRECT - Understand the differences
public class Main {
    public static void main(String[] args) {
        String s1 = null;      // No object
        String s2 = "";        // Empty string (length 0)
        String s3 = "   ";     // Blank (only whitespace)
        String s4 = "Hello";   // Has content

        // Check null
        System.out.println(s1 == null);  // true

        // Check empty (null-safe)
        System.out.println(s2 != null && s2.isEmpty());  // true
        System.out.println(s3 != null && s3.isEmpty());  // false

        // Check blank (empty or whitespace only)
        System.out.println(s2 != null && s2.trim().isEmpty());  // true
        System.out.println(s3 != null && s3.trim().isEmpty());  // true

        // Java 11+ has isBlank()
        // System.out.println(s3.isBlank());  // true
    }
}
```

**Why:** null = no object, empty = "", blank = whitespace only; need different checks.

**💡 Tip:** Always check null first, then empty, then trim for blank check.

---

### 7. Character and String Conversion Mistakes

#### ❌ Wrong - Confusing char and String:
```java
// WRONG
public class Main {
    public static void main(String[] args) {
        String str = "Hello";

        // Can't assign char to String
        String firstChar = str.charAt(0);  // Compilation error! char != String
    }
}
```
**Issue:** charAt() returns char, not String; types don't match

#### ✅ Right:
```java
// CORRECT - Convert char to String
public class Main {
    public static void main(String[] args) {
        String str = "Hello";

        // Option 1: String concatenation
        String firstChar = "" + str.charAt(0);

        // Option 2: String.valueOf()
        String firstChar2 = String.valueOf(str.charAt(0));

        // Option 3: Character.toString()
        String firstChar3 = Character.toString(str.charAt(0));

        // To get single-character substring
        String firstChar4 = str.substring(0, 1);
    }
}
```

**Why:** char is primitive; String is object; need explicit conversion.

**💡 Tip:** Use String.valueOf(char) or substring(start, start+1) for char to String.

---

#### ❌ Wrong - Using + to Convert int to String in charAt:
```java
// WRONG - Adds ASCII value instead of concatenating digit
public class Main {
    public static void main(String[] args) {
        String str = "12345";
        int sum = 0;

        for (int i = 0; i < str.length(); i++) {
            sum += str.charAt(i);  // Adds ASCII values! '1'=49, '2'=50...
        }
        System.out.println(sum);  // 255, not 15!
    }
}
```
**Issue:** charAt() returns char; char + int uses ASCII values

#### ✅ Right:
```java
// CORRECT - Convert char to int properly
public class Main {
    public static void main(String[] args) {
        String str = "12345";
        int sum = 0;

        for (int i = 0; i < str.length(); i++) {
            // Option 1: Subtract '0' to get digit value
            sum += str.charAt(i) - '0';  // '1' - '0' = 1

            // Option 2: Character.getNumericValue()
            // sum += Character.getNumericValue(str.charAt(i));
        }
        System.out.println(sum);  // 15
    }
}
```

**Why:** char arithmetic uses ASCII; '0'=48, '1'=49; subtract '0' to get digit.

**💡 Tip:** To convert digit char to int: `char - '0'` or `Character.getNumericValue()`.

---

### 8. Regular Expression Mistakes

#### ❌ Wrong - Not Escaping Special Regex Characters in replaceAll:
```java
// WRONG
public class Main {
    public static void main(String[] args) {
        String text = "Price: $100.99";

        // Trying to remove $
        String result = text.replaceAll("$", "");  // Doesn't work! $ is regex "end of line"
        System.out.println(result);  // "Price: $100.99" - unchanged!
    }
}
```
**Issue:** replaceAll() uses regex; $ is special character meaning "end of line"

#### ✅ Right:
```java
// CORRECT - Escape special regex characters
public class Main {
    public static void main(String[] args) {
        String text = "Price: $100.99";

        // Option 1: Escape $ in regex
        String result = text.replaceAll("\\$", "");
        System.out.println(result);  // "Price: 100.99"

        // Option 2: Use replace() for literal replacement (no regex)
        String result2 = text.replace("$", "");
        System.out.println(result2);  // "Price: 100.99"
    }
}
```

**Why:** replaceAll() uses regex; use replace() for literal text replacement.

**💡 Tip:** Use replace() for literals, replaceAll() only when you need regex patterns.

---

### 9. Performance and Memory Mistakes

#### ❌ Wrong - Creating New String for Every Concatenation:
```java
// WRONG - Extremely inefficient
public class Main {
    public static String join(String[] words) {
        String result = "";
        for (String word : words) {
            result = result + word + " ";  // Creates new String each iteration!
        }
        return result;
    }

    public static void main(String[] args) {
        String[] words = new String[10000];
        // ...fill array...
        String joined = join(words);  // Creates 10,000+ String objects!
    }
}
```
**Issue:** String concatenation in loop creates many temporary objects

#### ✅ Right:
```java
// CORRECT - Use StringBuilder or String.join()
public class Main {
    // Option 1: StringBuilder
    public static String join1(String[] words) {
        StringBuilder sb = new StringBuilder();
        for (String word : words) {
            sb.append(word).append(" ");
        }
        return sb.toString().trim();
    }

    // Option 2: String.join() (Java 8+)
    public static String join2(String[] words) {
        return String.join(" ", words);
    }

    public static void main(String[] args) {
        String[] words = {"Hello", "World", "Java"};
        System.out.println(join1(words));
        System.out.println(join2(words));
    }
}
```

**Why:** StringBuilder or String.join() much more efficient for joining strings.

**💡 Tip:** For joining arrays/lists, use String.join() or StringJoiner; for loops, use StringBuilder.

---

#### ❌ Wrong - Using substring() on Large Strings (Java 6):
```java
// WRONG in Java 6 - Memory leak
public class Main {
    public static void main(String[] args) {
        String huge = new String(new char[1000000]);  // 1MB string

        // In Java 6, substring shares char[] with original
        String tiny = huge.substring(0, 10);  // Only need 10 chars

        huge = null;  // Original can't be GC'd! tiny holds reference to char[]
        // Memory leak: 1MB held for 10-character string
    }
}
```
**Issue:** In Java 6, substring() shared internal array; fixed in Java 7+

#### ✅ Right:
```java
// CORRECT - Force copy in Java 6 (not needed in Java 7+)
public class Main {
    public static void main(String[] args) {
        String huge = new String(new char[1000000]);

        // Java 6: Force copy to release huge string
        String tiny = new String(huge.substring(0, 10));

        huge = null;  // Now can be GC'd

        // Java 7+: substring already copies, no issue
        // String tiny = huge.substring(0, 10);  // Safe in Java 7+
    }
}
```

**Why:** Java 7+ fixed this; substring() now creates new array; no memory leak.

**💡 Tip:** This is only an issue in Java 6 and earlier; Java 7+ is safe.

---

### 10. Miscellaneous String Mistakes

#### ❌ Wrong - Modifying String in Method Expecting It to Change:
```java
// WRONG expectation
public class Main {
    public static void changeString(String str) {
        str = "Changed";  // Only changes local variable
    }

    public static void main(String[] args) {
        String original = "Original";
        changeString(original);
        System.out.println(original);  // "Original" - NOT changed!
    }
}
```
**Issue:** Strings are immutable and passed by value; can't change caller's reference

#### ✅ Right:
```java
// CORRECT - Return new String
public class Main {
    public static String changeString(String str) {
        return "Changed";  // Return new String
    }

    public static void main(String[] args) {
        String original = "Original";
        original = changeString(original);  // Assign result
        System.out.println(original);  // "Changed"
    }

    // OR use StringBuilder for mutable strings
    public static void changeStringBuilder(StringBuilder sb) {
        sb.setLength(0);  // Clear
        sb.append("Changed");  // Modify
    }

    public static void main2(String[] args) {
        StringBuilder sb = new StringBuilder("Original");
        changeStringBuilder(sb);
        System.out.println(sb);  // "Changed"
    }
}
```

**Why:** Strings immutable; reassignment only affects local variable; must return.

**💡 Tip:** Return new String from methods; use StringBuilder for mutable parameters.

---

#### ❌ Wrong - Using length() on null String:
```java
// WRONG
public class Main {
    public static void main(String[] args) {
        String str = null;

        if (str.length() > 0) {  // NullPointerException!
            System.out.println(str);
        }
    }
}
```
**Issue:** Calling any method on null throws NullPointerException

#### ✅ Right:
```java
// CORRECT - Check null first
public class Main {
    public static void main(String[] args) {
        String str = null;

        // Option 1: Explicit null check
        if (str != null && str.length() > 0) {
            System.out.println(str);
        }

        // Option 2: Check null and not empty
        if (str != null && !str.isEmpty()) {
            System.out.println(str);
        }
    }
}
```

**Why:** Must check null before any method calls to avoid NullPointerException.

**💡 Tip:** Use null-safe utilities or always check null first in conditions.

---

This comprehensive list contains **40+ String mistakes** covering all fundamental concepts!

---

## 🔗 What's Next?

Tomorrow (Day 16), we'll learn about:
- Packages and organizing code
- Static keyword and its uses
- Static variables, methods, and blocks
- Static import

---

## 📚 Additional Resources

- [Oracle String Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html)
- [StringBuilder vs StringBuffer](https://www.geeksforgeeks.org/stringbuilder-class-in-java-with-examples/)
- Practice more string problems on HackerRank and LeetCode