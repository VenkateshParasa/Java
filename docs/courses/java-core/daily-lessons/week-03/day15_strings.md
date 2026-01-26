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