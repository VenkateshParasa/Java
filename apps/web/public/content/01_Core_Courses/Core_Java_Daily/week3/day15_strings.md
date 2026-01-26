
# Day 15: Strings

**Week 3: Advanced Java Fundamentals**

---

## 📋 Table of Contents
- [Learning Objectives](#learning-objectives)
- [Topics Covered](#topics-covered)
- [Detailed Content](#detailed-content)
- [Practical Exercises](#practical-exercises)
- [Key Takeaways](#key-takeaways)
- [Common Mistakes](#common-mistakes)
- [Navigation](#navigation)

---

## 🎯 Learning Objectives

By the end of Day 15, you will be able to:
- Understand String immutability and its implications
- Create Strings using literals and constructors
- Master essential String methods for manipulation
- Understand the String pool concept
- Use StringBuilder for efficient string operations
- Compare strings correctly using equals()
- Solve common string manipulation problems

---

## 📚 Topics Covered

### 1. What is a String?

A **String** is a sequence of characters in Java. Strings are objects, not primitive types.

#### String Characteristics:
- **Immutable**: Once created, cannot be changed
- **Object**: String is a class, not a primitive type
- **Sequence**: Ordered collection of characters
- **Common**: Most frequently used class in Java

#### Example:
```java
String greeting = "Hello, World!";
String name = "Java";
String message = "Welcome to Java Programming";
```

#### String as Character Array:
```
String: "Hello"
Index:   0 1 2 3 4
Char:    H e l l o
```

---

### 2. String Immutability

**Immutability** means once a String object is created, its value cannot be changed.

#### Demonstration:
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

**Output:**
```
Original: Hello
Hash code: 69609650
Modified: Hello World
Hash code: -862545276
```

#### Why Immutability?
1. **Security**: Passwords, network connections stay safe
2. **Thread Safety**: Multiple threads can share strings safely
3. **String Pool**: Memory optimization through reuse
4. **Caching**: Hash codes can be cached

#### Visual Representation:
```
str = "Hello"
┌─────────┐
│ "Hello" │ ← str points here
└─────────┘

str = str + " World"
┌─────────┐     ┌──────────────┐
│ "Hello" │     │ "Hello World"│ ← str now points here
└─────────┘     └──────────────┘
(still exists)   (new object created)
```

---

### 3. String Creation Methods

#### Method 1: String Literal (Recommended)
```java
String s1 = "Hello";
String s2 = "Hello";
```
- Goes to **String pool** (special memory area)
- Reuses existing strings
- Memory efficient

#### Method 2: Using new Keyword
```java
String s3 = new String("Hello");
String s4 = new String("Hello");
```
- Creates object in **heap memory**
- Always creates new object
- Less memory efficient

#### Comparison:
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

**Output:**
```
true
false
false
true
```

#### Memory Diagram:
```
String Pool:          Heap Memory:
┌─────────┐          ┌─────────┐
│ "Hello" │ ← s1, s2 │ "Hello" │ ← s3
└─────────┘          └─────────┘
                     ┌─────────┐
                     │ "Hello" │ ← s4
                     └─────────┘
```

---

### 4. Essential String Methods

#### Length and Character Access

**length()** - Returns number of characters:
```java
String str = "Hello World";
System.out.println(str.length());  // 11
```

**charAt(index)** - Returns character at index:
```java
String str = "Hello";
System.out.println(str.charAt(0));  // 'H'
System.out.println(str.charAt(4));  // 'o'
// System.out.println(str.charAt(5));  // Error! Index out of bounds
```

**indexOf(char/String)** - Returns first occurrence index:
```java
String str = "Hello World";
System.out.println(str.indexOf('o'));      // 4
System.out.println(str.indexOf("World"));  // 6
System.out.println(str.indexOf('x'));      // -1 (not found)
```

**lastIndexOf(char/String)** - Returns last occurrence index:
```java
String str = "Hello World";
System.out.println(str.lastIndexOf('o'));  // 7
```

#### Complete Example:
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

---

#### Substring and Splitting

**substring(start)** - Returns substring from start to end:
```java
String str = "Java Programming";
System.out.println(str.substring(5));  // "Programming"
```

**substring(start, end)** - Returns substring from start to end-1:
```java
String str = "Java Programming";
System.out.println(str.substring(0, 4));   // "Java"
System.out.println(str.substring(5, 16));  // "Programming"
```

**split(delimiter)** - Splits string into array:
```java
String str = "Java Programming";
String[] words = str.split(" ");
for (String word : words) {
    System.out.println(word);
}
// Output:
// Java
// Programming
```

#### Complete Example:
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
        
        // Split with comma
        String csv = "apple,banana,orange";
        String[] fruits = csv.split(",");
        for (String fruit : fruits) {
            System.out.println(fruit);
        }
    }
}
```

---

#### Case Conversion and Trimming

**toUpperCase()** - Converts to uppercase:
```java
String str = "Hello World";
System.out.println(str.toUpperCase());  // "HELLO WORLD"
```

**toLowerCase()** - Converts to lowercase:
```java
String str = "Hello World";
System.out.println(str.toLowerCase());  // "hello world"
```

**trim()** - Removes leading and trailing spaces:
```java
String str = "  Hello World  ";
System.out.println("'" + str + "'");        // "'  Hello World  '"
System.out.println("'" + str.trim() + "'"); // "'Hello World'"
```

**replace(old, new)** - Replaces all occurrences:
```java
String str = "Hello World";
System.out.println(str.replace("World", "Java"));  // "Hello Java"
System.out.println(str.replace('o', 'a'));         // "Hella Warld"
```

#### Complete Example:
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
        System.out.println(str.replace('o', 'a'));
    }
}
```

---

#### String Comparison Methods

**equals(String)** - Compares content (case-sensitive):
```java
String s1 = "Hello";
String s2 = "hello";
String s3 = "Hello";

System.out.println(s1.equals(s2));  // false
System.out.println(s1.equals(s3));  // true
```

**equalsIgnoreCase(String)** - Compares content (case-insensitive):
```java
String s1 = "Hello";
String s2 = "hello";

System.out.println(s1.equalsIgnoreCase(s2));  // true
```

**compareTo(String)** - Lexicographic comparison:
```java
String s1 = "Apple";
String s2 = "Banana";

System.out.println(s1.compareTo(s2));  // negative (Apple < Banana)
System.out.println(s2.compareTo(s1));  // positive (Banana > Apple)
System.out.println(s1.compareTo("Apple"));  // 0 (equal)
```

**startsWith(String)** - Checks if starts with prefix:
```java
String str = "Hello World";
System.out.println(str.startsWith("He"));     // true
System.out.println(str.startsWith("World"));  // false
```

**endsWith(String)** - Checks if ends with suffix:
```java
String str = "Hello World";
System.out.println(str.endsWith("ld"));     // true
System.out.println(str.endsWith("Hello"));  // false
```

**contains(String)** - Checks if contains substring:
```java
String str = "Hello World";
System.out.println(str.contains("ell"));   // true
System.out.println(str.contains("Java"));  // false
```

#### Complete Example:
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

### 5. StringBuilder for Efficient String Operations

#### Why StringBuilder?

String concatenation in loops is **inefficient** because strings are immutable:

```java
// INEFFICIENT - Creates many String objects
String result = "";
for (int i = 0; i < 1000; i++) {
    result += i;  // Creates new String each time!
}
```

StringBuilder is **mutable** and efficient:

```java
// EFFICIENT - Modifies same object
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++) {
    sb.append(i);  // Modifies existing object
}
String result = sb.toString();
```

#### StringBuilder Methods

**append(value)** - Adds to end:
```java
StringBuilder sb = new StringBuilder("Hello");
sb.append(" World");
sb.append('!');
System.out.println(sb);  // "Hello World!"
```

**insert(index, value)** - Inserts at position:
```java
StringBuilder sb = new StringBuilder("Hello World");
sb.insert(5, ",");
System.out.println(sb);  // "Hello, World"
```

**delete(start, end)** - Deletes characters:
```java
StringBuilder sb = new StringBuilder("Hello, World");
sb.delete(5, 6);  // Remove comma
System.out.println(sb);  // "Hello World"
```

**reverse()** - Reverses the string:
```java
StringBuilder sb = new StringBuilder("Hello");
sb.reverse();
System.out.println(sb);  // "olleH"
```

**replace(start, end, str)** - Replaces substring:
```java
StringBuilder sb = new StringBuilder("Hello World");
sb.replace(0, 5, "Hi");
System.out.println(sb);  // "Hi World"
```

**toString()** - Converts to String:
```java
StringBuilder sb = new StringBuilder("Hello");
String str = sb.toString();
```

#### Complete Example:
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
        
        // Back to normal
        sb.reverse();
        
        // Replace
        sb.replace(0, 5, "Hi");
        System.out.println(sb);
        
        // Convert to String
        String result = sb.toString();
    }
}
```

---

## 💻 Practical Exercises

### Exercise 1: String Length and Character Counter

**📝 Problem Statement:**
Create a program that analyzes a string by counting total characters, vowels, consonants, digits, and spaces. Display detailed statistics about the string composition.

**Requirements:**
- Create method `analyzeString(String str)` that analyzes the string
- Count total characters using `length()`
- Count vowels (a, e, i, o, u) - case insensitive
- Count consonants (letters that are not vowels)
- Count digits (0-9)
- Count spaces
- Use `charAt(i)` to access each character
- Use `Character.isLetter()` and `Character.isDigit()` for validation
- Display all statistics in formatted output

**Sample Test Cases:**
```
Input: "Hello World 123"
Expected Output:
=== String Analysis ===
String: "Hello World 123"
Total Characters: 15
Letters: 10
  Vowels: 3
  Consonants: 7
Digits: 3
Spaces: 2

Input: "Java Programming 2024"
Expected Output:
=== String Analysis ===
String: "Java Programming 2024"
Total Characters: 21
Letters: 16
  Vowels: 5
  Consonants: 11
Digits: 4
Spaces: 2
```

**Solution:**
```java
public class StringAnalyzer {
    public static void analyzeString(String str) {
        int totalChars = str.length();
        int vowels = 0, consonants = 0, digits = 0, spaces = 0;
        
        String lowerStr = str.toLowerCase();  // Convert to lowercase for easier checking
        
        for (int i = 0; i < str.length(); i++) {
            char ch = lowerStr.charAt(i);
            
            if (ch == ' ') {
                spaces++;
            } else if (Character.isDigit(ch)) {
                digits++;
            } else if (Character.isLetter(ch)) {
                if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
                    vowels++;
                } else {
                    consonants++;
                }
            }
        }
        
        System.out.println("\n=== String Analysis ===");
        System.out.println("String: \"" + str + "\"");
        System.out.println("Total Characters: " + totalChars);
        System.out.println("Letters: " + (vowels + consonants));
        System.out.println("  Vowels: " + vowels);
        System.out.println("  Consonants: " + consonants);
        System.out.println("Digits: " + digits);
        System.out.println("Spaces: " + spaces);
    }
    
    public static void main(String[] args) {
        analyzeString("Hello World 123");
        analyzeString("Java Programming 2024");
    }
}
```

**💡 Tips:**
- `length()` returns total number of characters including spaces
- `charAt(i)` accesses character at index i (0-based indexing)
- Convert to lowercase first to simplify vowel checking
- `Character.isLetter()` checks if character is a letter (A-Z, a-z)
- `Character.isDigit()` checks if character is a digit (0-9)
- Use if-else chain to categorize each character
- Vowels: a, e, i, o, u (sometimes y, but not counted here)

---

### Exercise 2: Palindrome Checker

**📝 Problem Statement:**
Create a program that checks if a given string is a palindrome (reads the same forwards and backwards). The checker should ignore spaces and be case-insensitive.

**Requirements:**
- Create method `isPalindrome(String str)` returning boolean
- Remove all spaces using `replaceAll("\\s+", "")`
- Convert to lowercase using `toLowerCase()`
- Use two-pointer technique: compare characters from start and end
- Compare characters using `charAt(left)` and `charAt(right)`
- Return true if all characters match, false otherwise
- Handle empty strings (return true)
- Display clear result messages

**Sample Test Cases:**
```
Input: "racecar"
Expected Output:
"racecar" is a palindrome: true

Input: "A man a plan a canal Panama"
Expected Output:
"A man a plan a canal Panama" is a palindrome: true

Input: "hello"
Expected Output:
"hello" is a palindrome: false

Input: "Was it a car or a cat I saw"
Expected Output:
"Was it a car or a cat I saw" is a palindrome: true
```

**Solution:**
```java
public class PalindromeChecker {
    public static boolean isPalindrome(String str) {
        // Remove spaces and convert to lowercase
        str = str.replaceAll("\\s+", "").toLowerCase();
        
        // Empty string is palindrome
        if (str.isEmpty()) {
            return true;
        }
        
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
        String[] testCases = {
            "racecar",
            "A man a plan a canal Panama",
            "hello",
            "Was it a car or a cat I saw"
        };
        
        for (String test : testCases) {
            boolean result = isPalindrome(test);
            System.out.println("\"" + test + "\" is a palindrome: " + result);
        }
    }
}
```

**💡 Tips:**
- Two-pointer technique is efficient: O(n) time, O(1) space
- `replaceAll("\\s+", "")` removes all whitespace (spaces, tabs, newlines)
- `toLowerCase()` ensures case-insensitive comparison ('A' == 'a')
- `charAt(index)` accesses individual characters for comparison
- `left < right` condition ensures we only check half the string
- Alternative approach: reverse string and compare with original using `equals()`
- Palindrome examples: "racecar", "madam", "noon", "level"

---

### Exercise 3: String Reversal

**📝 Problem Statement:**
Create a program that reverses a string using two different methods: manual character-by-character reversal and StringBuilder's reverse() method. Compare both approaches.

**Requirements:**
- Implement `reverseManual(String str)` using character array
- Implement `reverseWithStringBuilder(String str)` using StringBuilder
- Manual method: convert to char array, swap characters from both ends
- Use two-pointer swap technique for manual reversal
- StringBuilder method: use built-in `reverse()` method
- Both methods should return the reversed string
- Handle empty strings and single characters
- Display results from both methods

**Sample Test Cases:**
```
Input: "Hello World"
Expected Output:
Original: Hello World
Manual Reverse: dlroW olleH
StringBuilder Reverse: dlroW olleH

Input: "Java"
Expected Output:
Original: Java
Manual Reverse: avaJ
StringBuilder Reverse: avaJ

Input: "12345"
Expected Output:
Original: 12345
Manual Reverse: 54321
StringBuilder Reverse: 54321
```

**Solution:**
```java
public class StringReversal {
    // Method 1: Manual reversal using character array
    public static String reverseManual(String str) {
        if (str.isEmpty()) {
            return str;
        }
        
        char[] chars = str.toCharArray();
        int left = 0, right = chars.length - 1;
        
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
    
    // Method 2: Using StringBuilder (faster, simpler)
    public static String reverseWithStringBuilder(String str) {
        return new StringBuilder(str).reverse().toString();
    }
    
    public static void main(String[] args) {
        String[] testCases = {"Hello World", "Java", "12345"};
        
        for (String str : testCases) {
            System.out.println("\nOriginal: " + str);
            System.out.println("Manual Reverse: " + reverseManual(str));
            System.out.println("StringBuilder Reverse: " + reverseWithStringBuilder(str));
        }
    }
}
```

**💡 Tips:**
- `toCharArray()` converts String to char[] for manual manipulation
- Two-pointer swap: swap first with last, second with second-last, etc.
- temp variable needed for swapping without losing values
- `new String(chars)` converts char array back to String
- StringBuilder.reverse() is built-in, optimized, and simplest solution
- StringBuilder approach is generally faster for large strings
- Manual approach demonstrates algorithm understanding

---

### Exercise 4: Word Counter and Finder

**📝 Problem Statement:**
Create a program that counts words in a sentence and finds the longest and shortest words. Handle multiple spaces and punctuation properly.

**Requirements:**
- Create method `analyzeWords(String sentence)`
- Use `split("\\s+")` to split by one or more spaces
- Count total words
- Find longest word using `length()` comparison
- Find shortest word (excluding single characters)
- Display word count and longest/shortest words
- Handle sentences with punctuation
- Remove empty strings from split result

**Sample Test Cases:**
```
Input: "The quick brown fox jumps over the lazy dog"
Expected Output:
=== Word Analysis ===
Sentence: "The quick brown fox jumps over the lazy dog"
Total Words: 9
Longest Word: "quick" (5 letters)
Shortest Word: "The" (3 letters)

Input: "Java is a programming language"
Expected Output:
=== Word Analysis ===
Sentence: "Java is a programming language"
Total Words: 5
Longest Word: "programming" (11 letters)
Shortest Word: "is" (2 letters)
```

**Solution:**
```java
public class WordAnalyzer {
    public static void analyzeWords(String sentence) {
        // Split by spaces
        String[] words = sentence.split("\\s+");
        
        // Remove empty strings and count
        int wordCount = 0;
        for (String word : words) {
            if (!word.isEmpty()) {
                wordCount++;
            }
        }
        
        // Find longest and shortest
        String longest = "";
        String shortest = words[0];
        
        for (String word : words) {
            if (!word.isEmpty()) {
                if (word.length() > longest.length()) {
                    longest = word;
                }
                if (word.length() < shortest.length() && word.length() > 1) {
                    shortest = word;
                }
            }
        }
        
        System.out.println("\n=== Word Analysis ===");
        System.out.println("Sentence: \"" + sentence + "\"");
        System.out.println("Total Words: " + wordCount);
        System.out.println("Longest Word: \"" + longest + "\" (" + longest.length() + " letters)");
        System.out.println("Shortest Word: \"" + shortest + "\" (" + shortest.length() + " letters)");
    }
    
    public static void main(String[] args) {
        analyzeWords("The quick brown fox jumps over the lazy dog");
        analyzeWords("Java is a programming language");
    }
}
```

**💡 Tips:**
- `split("\\s+")` splits by one or more whitespace characters
- `\\s+` is regex for "one or more spaces"
- Check `!word.isEmpty()` to filter out empty strings
- Track longest by comparing `word.length()` with current longest
- Exclude single-character words from shortest (optional requirement)
- Initialize shortest to first word, then compare
- Alternative: use Arrays.stream() for more functional approach

---

### Exercise 5: String Case Converter

**📝 Problem Statement:**
Create a program that converts strings between different cases: uppercase, lowercase, title case, and toggle case. Demonstrate various string transformation techniques.

**Requirements:**
- Implement `toUpperCase(String str)` - convert all to uppercase
- Implement `toLowerCase(String str)` - convert all to lowercase
- Implement `toTitleCase(String str)` - capitalize first letter of each word
- Implement `toggleCase(String str)` - swap upper and lower case
- Use built-in methods for upper/lower case
- For title case: split into words, capitalize first letter of each
- For toggle case: check each character and swap case
- Display all transformations for each input

**Sample Test Cases:**
```
Input: "hello world"
Expected Output:
Original: hello world
Uppercase: HELLO WORLD
Lowercase: hello world
Title Case: Hello World
Toggle Case: HELLO WORLD

Input: "Java Programming"
Expected Output:
Original: Java Programming
Uppercase: JAVA PROGRAMMING
Lowercase: java programming
Title Case: Java Programming
Toggle Case: jAVA pROGRAMMING
```

**Solution:**
```java
public class CaseConverter {
    public static String toUpperCase(String str) {
        return str.toUpperCase();
    }
    
    public static String toLowerCase(String str) {
        return str.toLowerCase();
    }
    
    public static String toTitleCase(String str) {
        String[] words = str.split(" ");
        StringBuilder result = new StringBuilder();
        
        for (String word : words) {
            if (!word.isEmpty()) {
                result.append(Character.toUpperCase(word.charAt(0)));
                result.append(word.substring(1).toLowerCase());
                result.append(" ");
            }
        }
        return result.toString().trim();
    }
    
    public static String toggleCase(String str) {
        StringBuilder result = new StringBuilder();
        
        for (int i = 0; i < str.length(); i++) {
            char ch = str.charAt(i);
            if (Character.isUpperCase(ch)) {
                result.append(Character.toLowerCase(ch));
            } else if (Character.isLowerCase(ch)) {
                result.append(Character.toUpperCase(ch));
            } else {
                result.append(ch);
            }
        }
        return result.toString();
    }
    
    public static void displayAllCases(String str) {
        System.out.println("\nOriginal: " + str);
        System.out.println("Uppercase: " + toUpperCase(str));
        System.out.println("Lowercase: " + toLowerCase(str));
        System.out.println("Title Case: " + toTitleCase(str));
        System.out.println("Toggle Case: " + toggleCase(str));
    }
    
    public static void main(String[] args) {
        displayAllCases("hello world");
        displayAllCases("Java Programming");
    }
}
```

**💡 Tips:**
- `toUpperCase()` and `toLowerCase()` are built-in String methods
- Title case: capitalize first letter, lowercase rest of each word
- Use `substring(1)` to get all characters except first
- `Character.toUpperCase(ch)` converts single character to uppercase
- `Character.isUpperCase(ch)` checks if character is uppercase
- Toggle case swaps: A→a, b→B, maintaining non-letters
- StringBuilder efficient for building strings in loops

---

### Exercise 6: Email Validator

**📝 Problem Statement:**
Create a simple email validator that checks if an email address follows basic format rules. Validate presence of @ symbol, domain, and proper structure.

**Requirements:**
- Create method `isValidEmail(String email)` returning boolean
- Check if email contains exactly one @ symbol using `indexOf()` and `lastIndexOf()`
- Verify @ is not at start or end
- Check for presence of dot (.) after @ symbol
- Ensure domain has at least one character before and after dot
- Display validation result with specific error messages
- Test with valid and invalid email addresses

**Sample Test Cases:**
```
Input: "user@example.com"
Expected Output:
"user@example.com" is valid: true

Input: "@example.com"
Expected Output:
"@example.com" is valid: false
Error: @ symbol at start

Input: "user@.com"
Expected Output:
"user@.com" is valid: false
Error: Missing domain name

Input: "userexample.com"
Expected Output:
"userexample.com" is valid: false
Error: Missing @ symbol
```

**Solution:**
```java
public class EmailValidator {
    public static boolean isValidEmail(String email) {
        int atIndex = email.indexOf('@');
        int lastAtIndex = email.lastIndexOf('@');
        
        // Check if @ exists and is unique
        if (atIndex == -1) {
            System.out.println("Error: Missing @ symbol");
            return false;
        }
        
        if (atIndex != lastAtIndex) {
            System.out.println("Error: Multiple @ symbols");
            return false;
        }
        
        // Check @ position
        if (atIndex == 0) {
            System.out.println("Error: @ symbol at start");
            return false;
        }
        
        if (atIndex == email.length() - 1) {
            System.out.println("Error: @ symbol at end");
            return false;
        }
        
        // Check for dot after @
        String domain = email.substring(atIndex + 1);
        int dotIndex = domain.indexOf('.');
        
        if (dotIndex == -1) {
            System.out.println("Error: Missing dot in domain");
            return false;
        }
        
        if (dotIndex == 0) {
            System.out.println("Error: Missing domain name");
            return false;
        }
        
        if (dotIndex == domain.length() - 1) {
            System.out.println("Error: Missing extension");
            return false;
        }
        
        return true;
    }
    
    public static void main(String[] args) {
        String[] emails = {
            "user@example.com",
            "@example.com",
            "user@.com",
            "userexample.com",
            "user@example"
        };
        
        for (String email : emails) {
            boolean valid = isValidEmail(email);
            System.out.println("\"" + email + "\" is valid: " + valid + "\n");
        }
    }
}
```

**💡 Tips:**
- `indexOf('@')` returns first occurrence of @ symbol
- `lastIndexOf('@')` returns last occurrence of @ symbol
- If both are equal, there's exactly one @ symbol
- `substring(atIndex + 1)` gets everything after @
- Check dot position in domain part
- This is basic validation; real email validation is more complex
- Consider using regex for more comprehensive validation

---

### Beginner Exercises

#### Exercise 1: String Reversal Using Multiple Methods
**Difficulty:** Beginner
**Objective:** Practice string manipulation by reversing strings using different approaches.

**Problem:** Write a program that reverses a string using three different methods:
1. Using StringBuilder's reverse() method
2. Using character array and swapping
3. Using recursion

**Requirements:**
- Create method `reverseWithStringBuilder(String str)`
- Create method `reverseWithCharArray(String str)`
- Create method `reverseRecursively(String str)`
- Test all methods with same input strings
- Compare and display results

**Example Output:**
```
Input: "Hello World"
StringBuilder reverse: dlroW olleH
CharArray reverse: dlroW olleH
Recursive reverse: dlroW olleH
```

**Hint:** For recursion, base case is empty string; recursive case takes last character + reverse of remaining string.

---

#### Exercise 2: Word Frequency Counter
**Difficulty:** Easy
**Objective:** Count frequency of each word in a sentence.

**Problem:** Write a program that counts how many times each word appears in a sentence (case-insensitive).

**Requirements:**
- Accept a sentence as input
- Split sentence into words using `split()`
- Convert words to lowercase for case-insensitive comparison
- Use HashMap to store word frequencies
- Display words and their counts

**Example Output:**
```
Input: "Java is fun and Java is powerful"
Word Frequencies:
java: 2
is: 2
fun: 1
and: 1
powerful: 1
```

**Hint:** Use `split("\\s+")` to split by spaces, `toLowerCase()` for case-insensitive comparison.

---

#### Exercise 3: String Compression
**Difficulty:** Medium
**Objective:** Implement basic string compression using character counts.

**Problem:** Write a program that compresses a string by replacing repeated characters with the character followed by count.

**Requirements:**
- Create method `compress(String str)`
- If compressed string is not shorter than original, return original
- Count consecutive repeated characters
- Return compressed string

**Example Output:**
```
Input: "aabcccccaaa"
Output: "a2b1c5a3"

Input: "abcd"
Output: "abcd" (original shorter)
```

**Hint:** Use StringBuilder, iterate through string, count consecutive same characters.

---

#### Exercise 4: Anagram Checker
**Difficulty:** Easy
**Objective:** Check if two strings are anagrams of each other.

**Problem:** Write a program that checks if two strings are anagrams (contain same characters in different order).

**Requirements:**
- Create method `isAnagram(String str1, String str2)`
- Ignore spaces and case
- Return true if anagrams, false otherwise
- Two approaches: sorting characters or character frequency count

**Example Output:**
```
Input: "listen" and "silent"
Output: true (are anagrams)

Input: "hello" and "world"
Output: false (not anagrams)
```

**Hint:** Sort characters and compare, or use character frequency arrays.

---

#### Exercise 5: Remove Duplicate Characters
**Difficulty:** Easy
**Objective:** Remove duplicate characters from a string while preserving order.

**Problem:** Write a program that removes duplicate characters from a string, keeping only first occurrence.

**Requirements:**
- Create method `removeDuplicates(String str)`
- Maintain original order of characters
- Keep only first occurrence of each character
- Use StringBuilder for efficiency

**Example Output:**
```
Input: "programming"
Output: "progamin" (removed duplicate 'm' and 'g')

Input: "hello"
Output: "helo" (removed duplicate 'l')
```

**Hint:** Use HashSet to track seen characters, StringBuilder to build result.

---

#### Exercise 6: Longest Word Finder
**Difficulty:** Beginner
**Objective:** Find the longest word in a sentence.

**Problem:** Write a program that finds and displays the longest word in a sentence. If multiple words have same maximum length, display the first one.

**Requirements:**
- Create method `findLongestWord(String sentence)`
- Split sentence into words
- Find word with maximum length
- Handle ties by returning first longest word

**Example Output:**
```
Input: "The quick brown fox jumps over the lazy dog"
Output: "quick" (5 letters) or "brown" or "jumps"

Input: "Java programming is interesting"
Output: "programming" (11 letters)
```

**Hint:** Use `split()` to get words array, iterate and track longest word.

---

## 🔑 Key Takeaways

1. **String Immutability**: Strings cannot be changed once created
2. **String Pool**: Literal strings are stored in a special memory area for reuse
3. **equals() vs ==**: Use `equals()` for content comparison, `==` for reference comparison
4. **Essential Methods**: `length()`, `charAt()`, `substring()`, `indexOf()`, `split()`
5. **Case Methods**: `toUpperCase()`, `toLowerCase()`, `trim()`
6. **Comparison**: `equals()`, `equalsIgnoreCase()`, `compareTo()`, `contains()`
7. **StringBuilder**: Use for efficient string concatenation in loops
8. **String Creation**: Prefer literals over `new String()` for memory efficiency
9. **Character Access**: Use `charAt(index)` to access individual characters
10. **String Manipulation**: Combine methods for complex transformations

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

### 2. String Comparison Mistakes

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

**Why:** `equals()` compares string content; `==` compares object references.

**💡 Tip:** Always use `equals()` for String comparison unless specifically comparing references.

---

### 3. StringBuilder Usage Mistakes

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

**Why:** StringBuilder is mutable; `append()` modifies in place, no new objects.

**💡 Tip:** Use StringBuilder whenever concatenating in loops or many times.

---

### 4. Index Out of Bounds Errors

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

**Why:** String indices range from 0 to `length()-1`.

**💡 Tip:** Always validate `index < length()` before using `charAt()`.

---

### 5. Null Handling Mistakes

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

    public static void main(String[] args) {
        processName(null);  // Safe
    }
}
```

**Why:** Must check null before calling any methods on reference.

**💡 Tip:** Always validate null before String operations, especially for user input.

---

## 🔗 Navigation

### Previous Day
← [Day 14: Abstraction](../week2/day14_abstraction.md)

### Next Day
→ [Day 16: Packages & Static Keyword](day16_packages_static.md)

### Week Overview
↑ [Week 3: Advanced Java Fundamentals](README.md)

### Course Home
🏠 [Core Java Daily Learning](../../README.md)

### Related Topics
- [Day 8: Classes & Objects](../week2/day08_oop_classes.md) - String is a class
- [Day 16: Packages & Static](day16_packages_static.md) - String class package
- [Day 19: Collections](day19_collections_list_set.md) - Storing strings in collections

### Assessment
📝 [Day 15 Assessment](../../../java-learning-app/src/data/assessments/java/week3/day15.js) - Test your String knowledge

---

**Daily Practice Reminder**: Complete all exercises before moving to the next day. Understanding Strings is crucial for Java programming!

**Estimated Study Time**: 3-4 hours

**Difficulty Level**: ⭐⭐ Beginner-Intermediate

---

*Last Updated: 2024-01-19*
*Part of Week 3: Advanced Java Fundamentals*
        // Check for @