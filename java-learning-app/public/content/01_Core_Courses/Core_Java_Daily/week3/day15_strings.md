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

## 💻 Practical Exercises

### Exercise 1: Palindrome Checker

**📝 Problem Statement:**
Create a program that checks if a given string is a palindrome (reads the same forwards and backwards). The checker should ignore spaces and be case-insensitive.

**Requirements:**
- Create isPalindrome(String str) method that returns boolean
- Remove all spaces from the string using replaceAll("\\s+", "")
- Convert string to lowercase for case-insensitive comparison
- Use two-pointer technique: compare characters from start and end moving inward
- Return true if all characters match, false otherwise
- Handle empty strings (return true)

**Sample Test Cases:**
```
Input: "racecar"
Expected Output: true

Input: "A man a plan a canal Panama"
Expected Output: true

Input: "hello"
Expected Output: false

Input: "Was it a car or a cat I saw"
Expected Output: true

Input: ""
Expected Output: true
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
        System.out.println(isPalindrome("racecar"));      // true
        System.out.println(isPalindrome("A man a plan a canal Panama")); // true
        System.out.println(isPalindrome("hello"));        // false
        System.out.println(isPalindrome("Was it a car or a cat I saw")); // true
        System.out.println(isPalindrome(""));             // true
    }
}
```

**💡 Tips:**
- Two-pointer technique is efficient: O(n) time, O(1) space (after string processing)
- replaceAll("\\s+", "") removes all whitespace characters (spaces, tabs, newlines)
- toLowerCase() ensures case-insensitive comparison ('A' == 'a')
- charAt(index) accesses individual characters for comparison
- left < right condition ensures we only check half the string (optimization)
- Alternative: reverse string and compare with original using equals()

---

### Exercise 2: Reverse String

**📝 Problem Statement:**
Create a program that reverses a string using two different methods: StringBuilder's reverse() method and manual character array manipulation.

**Requirements:**
- Implement reverse1(String str) using StringBuilder.reverse()
- Implement reverse2(String str) using character array and two-pointer swap
- Both methods should return the reversed string
- Handle empty strings and single characters
- Compare performance of both approaches (StringBuilder is faster)
- Display results from both methods

**Sample Test Cases:**
```
Input: "Hello World"
Expected Output: "dlroW olleH"

Input: "Java"
Expected Output: "avaJ"

Input: "12345"
Expected Output: "54321"

Input: "a"
Expected Output: "a"

Input: ""
Expected Output: ""
```

**Solution:**
```java
public class ReverseString {
    // Method 1: Using StringBuilder (faster, simpler)
    public static String reverse1(String str) {
        return new StringBuilder(str).reverse().toString();
    }
    
    // Method 2: Using character array (manual approach)
    public static String reverse2(String str) {
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
    
    public static void main(String[] args) {
        String str = "Hello World";
        System.out.println("Original: " + str);
        System.out.println("Reversed (Method 1): " + reverse1(str));
        System.out.println("Reversed (Method 2): " + reverse2(str));
        
        // Test edge cases
        System.out.println("\nEdge cases:");
        System.out.println("Single char: " + reverse1("a"));
        System.out.println("Empty: '" + reverse1("") + "'");
    }
}
```

**💡 Tips:**
- StringBuilder.reverse() is built-in, optimized, and simplest solution
- toCharArray() converts String to char[] for manual manipulation
- Two-pointer swap technique: swap first with last, second with second-last, etc.
- temp variable needed for swapping without losing values
- new String(chars) converts char array back to String
- StringBuilder approach is generally faster for large strings
- Manual approach demonstrates algorithm understanding and works without StringBuilder

---

### Exercise 3: Anagram Checker

**📝 Problem Statement:**
Create a program that checks if two strings are anagrams (contain the same characters in different order). The checker should ignore spaces and be case-insensitive.

**Requirements:**
- Create isAnagram(String s1, String s2) method returning boolean
- Remove all spaces using replaceAll("\\s+", "")
- Convert both strings to lowercase for case-insensitive comparison
- Check if lengths are equal (if not, cannot be anagrams)
- Sort characters in both strings and compare
- Use Arrays.sort() for character arrays
- Use Arrays.equals() to compare sorted arrays

**Sample Test Cases:**
```
Input: "listen", "silent"
Expected Output: true

Input: "hello", "world"
Expected Output: false

Input: "The Eyes", "They See"
Expected Output: true

Input: "Dormitory", "Dirty Room"
Expected Output: true

Input: "abc", "abcd"
Expected Output: false
```

**Solution:**
```java
import java.util.Arrays;

public class AnagramChecker {
    public static boolean isAnagram(String s1, String s2) {
        // Remove spaces and convert to lowercase
        s1 = s1.replaceAll("\\s+", "").toLowerCase();
        s2 = s2.replaceAll("\\s+", "").toLowerCase();
        
        // Check length first (optimization)
        if (s1.length() != s2.length()) {
            return false;
        }
        
        // Sort characters and compare
        char[] arr1 = s1.toCharArray();
        char[] arr2 = s2.toCharArray();
        Arrays.sort(arr1);
        Arrays.sort(arr2);
        
        return Arrays.equals(arr1, arr2);
    }
    
    public static void main(String[] args) {
        System.out.println(isAnagram("listen", "silent"));  // true
        System.out.println(isAnagram("hello", "world"));    // false
        System.out.println(isAnagram("The Eyes", "They See")); // true
        System.out.println(isAnagram("Dormitory", "Dirty Room")); // true
        System.out.println(isAnagram("abc", "abcd"));       // false
    }
}
```

**💡 Tips:**
- Anagrams have same characters but different arrangement
- Length check is quick optimization: different lengths = not anagrams
- Sorting approach: O(n log n) time complexity due to Arrays.sort()
- Alternative approach: use HashMap to count character frequencies (O(n) time)
- Arrays.equals() compares array contents, not references
- toCharArray() converts String to char[] for sorting
- replaceAll("\\s+", "") removes all whitespace (spaces, tabs, newlines)
- Famous anagram pairs: "listen/silent", "dormitory/dirty room", "astronomer/moon starer"

---

### Exercise 4: Count Vowels and Consonants

**📝 Problem Statement:**
Create a program that counts the number of vowels and consonants in a given string. The program should ignore non-letter characters (numbers, spaces, punctuation).

**Requirements:**
- Create countVowelsConsonants(String str) method
- Convert string to lowercase for easier checking
- Use Character.isLetter() to check if character is a letter
- Check if letter is vowel (a, e, i, o, u)
- Count vowels and consonants separately
- Ignore non-letter characters (spaces, numbers, punctuation)
- Display both counts with clear labels

**Sample Test Cases:**
```
Input: "Hello World"
Expected Output:
Vowels: 3
Consonants: 7

Input: "Java Programming"
Expected Output:
Vowels: 5
Consonants: 10

Input: "aeiou"
Expected Output:
Vowels: 5
Consonants: 0

Input: "bcdfg"
Expected Output:
Vowels: 0
Consonants: 5

Input: "Hello123!@#"
Expected Output:
Vowels: 2
Consonants: 3
```

**Solution:**
```java
public class VowelConsonantCounter {
    public static void countVowelsConsonants(String str) {
        str = str.toLowerCase();
        int vowels = 0, consonants = 0;
        
        for (int i = 0; i < str.length(); i++) {
            char ch = str.charAt(i);
            
            // Only count letters
            if (Character.isLetter(ch)) {
                // Check if vowel
                if (ch == 'a' || ch == 'e' || ch == 'i' ||
                    ch == 'o' || ch == 'u') {
                    vowels++;
                } else {
                    consonants++;
                }
            }
            // Ignore non-letters (spaces, numbers, punctuation)
        }
        
        System.out.println("Vowels: " + vowels);
        System.out.println("Consonants: " + consonants);
    }
    
    public static void main(String[] args) {
        System.out.println("Test 1:");
        countVowelsConsonants("Hello World");
        
        System.out.println("\nTest 2:");
        countVowelsConsonants("Java Programming");
        
        System.out.println("\nTest 3:");
        countVowelsConsonants("aeiou");
        
        System.out.println("\nTest 4:");
        countVowelsConsonants("bcdfg");
        
        System.out.println("\nTest 5:");
        countVowelsConsonants("Hello123!@#");
    }
}
```

**💡 Tips:**
- toLowerCase() simplifies vowel checking (only check lowercase vowels)
- Character.isLetter() returns true for A-Z and a-z, false for numbers/punctuation
- Vowels in English: a, e, i, o, u (sometimes y, but typically not counted)
- charAt(i) accesses individual characters in loop
- Alternative: use String.contains() or regex pattern matching
- Could use Set<Character> for vowels: Set.of('a', 'e', 'i', 'o', 'u')
- Enhancement: return counts as int[] or create VowelCount class with fields

---

---

### Exercise 5: Text Processing and Word Analyzer

**📝 Problem Statement:**
Create a comprehensive text processing system that analyzes text documents. The system should count words, find longest/shortest words, calculate word frequencies, identify unique words, and provide text statistics using String methods and StringBuilder for efficient processing.

**Requirements:**
- Create TextAnalyzer class with analyzeText(String text) method
- Implement wordCount() method counting total words (split by spaces and punctuation)
- Implement findLongestWord() method returning the longest word in the text
- Implement findShortestWord() method returning the shortest word in the text (excluding single letters)
- Implement calculateWordFrequency() method returning a formatted string of word frequencies
- Implement getUniqueWords() method counting unique words (case-insensitive)
- Implement getAverageWordLength() method calculating average word length
- Use toLowerCase() for case-insensitive comparisons
- Use split() with regex to split text by spaces and punctuation: "\\s+|[,.!?;:]"
- Use StringBuilder to build the formatted output report
- Handle empty strings and null inputs gracefully
- Create displayReport() method showing all statistics in formatted output

**Sample Test Cases:**
```
Input: "Hello world! Hello Java. Java is great, Java is powerful."
Expected Output:
=== Text Analysis Report ===
Total Words: 10
Unique Words: 6
Longest Word: "powerful" (8 letters)
Shortest Word: "is" (2 letters)
Average Word Length: 4.5 letters

Word Frequencies:
hello: 2
world: 1
java: 3
is: 2
great: 1
powerful: 1

Input: "The quick brown fox jumps over the lazy dog"
Expected Output:
=== Text Analysis Report ===
Total Words: 9
Unique Words: 8
Longest Word: "quick" (5 letters)
Shortest Word: "the" (3 letters)
Average Word Length: 3.9 letters

Word Frequencies:
the: 2
quick: 1
brown: 1
fox: 1
jumps: 1
over: 1
lazy: 1
dog: 1

Input: ""
Expected Output:
=== Text Analysis Report ===
Total Words: 0
Unique Words: 0
No text to analyze.
```

**Solution:**
```java
import java.util.HashMap;
import java.util.Map;

public class TextAnalyzer {
    private String text;
    private String[] words;

    public TextAnalyzer(String text) {
        this.text = text;
        if (text != null && !text.trim().isEmpty()) {
            // Split by spaces and punctuation
            this.words = text.toLowerCase().split("\\s+|[,.!?;:]");
            // Remove empty strings
            this.words = removeEmptyStrings(this.words);
        } else {
            this.words = new String[0];
        }
    }

    private String[] removeEmptyStrings(String[] arr) {
        StringBuilder sb = new StringBuilder();
        int count = 0;
        for (String s : arr) {
            if (!s.isEmpty()) {
                count++;
            }
        }

        String[] result = new String[count];
        int index = 0;
        for (String s : arr) {
            if (!s.isEmpty()) {
                result[index++] = s;
            }
        }
        return result;
    }

    public int wordCount() {
        return words.length;
    }

    public String findLongestWord() {
        if (words.length == 0) return "";

        String longest = words[0];
        for (String word : words) {
            if (word.length() > longest.length()) {
                longest = word;
            }
        }
        return longest;
    }

    public String findShortestWord() {
        if (words.length == 0) return "";

        String shortest = words[0];
        for (String word : words) {
            if (word.length() > 1 && word.length() < shortest.length()) {
                shortest = word;
            }
        }
        return shortest;
    }

    public int getUniqueWords() {
        if (words.length == 0) return 0;

        Map<String, Integer> frequency = new HashMap<>();
        for (String word : words) {
            frequency.put(word, frequency.getOrDefault(word, 0) + 1);
        }
        return frequency.size();
    }

    public double getAverageWordLength() {
        if (words.length == 0) return 0.0;

        int totalLength = 0;
        for (String word : words) {
            totalLength += word.length();
        }
        return (double) totalLength / words.length;
    }

    public String calculateWordFrequency() {
        if (words.length == 0) return "No words to analyze.";

        Map<String, Integer> frequency = new HashMap<>();
        for (String word : words) {
            frequency.put(word, frequency.getOrDefault(word, 0) + 1);
        }

        StringBuilder sb = new StringBuilder();
        sb.append("\nWord Frequencies:\n");
        for (Map.Entry<String, Integer> entry : frequency.entrySet()) {
            sb.append(entry.getKey()).append(": ").append(entry.getValue()).append("\n");
        }

        return sb.toString();
    }

    public void displayReport() {
        StringBuilder report = new StringBuilder();
        report.append("\n=== Text Analysis Report ===\n");
        report.append("Total Words: ").append(wordCount()).append("\n");
        report.append("Unique Words: ").append(getUniqueWords()).append("\n");

        if (words.length > 0) {
            String longest = findLongestWord();
            String shortest = findShortestWord();
            report.append("Longest Word: \"").append(longest).append("\" (")
                  .append(longest.length()).append(" letters)\n");
            report.append("Shortest Word: \"").append(shortest).append("\" (")
                  .append(shortest.length()).append(" letters)\n");
            report.append("Average Word Length: ")
                  .append(String.format("%.1f", getAverageWordLength()))
                  .append(" letters\n");
            report.append(calculateWordFrequency());
        } else {
            report.append("No text to analyze.\n");
        }

        System.out.println(report.toString());
    }

    public static void main(String[] args) {
        TextAnalyzer analyzer1 = new TextAnalyzer("Hello world! Hello Java. Java is great, Java is powerful.");
        analyzer1.displayReport();

        TextAnalyzer analyzer2 = new TextAnalyzer("The quick brown fox jumps over the lazy dog");
        analyzer2.displayReport();

        TextAnalyzer analyzer3 = new TextAnalyzer("");
        analyzer3.displayReport();
    }
}
```

**💡 Tips:**
- split("\\s+|[,.!?;:]") uses regex to split by whitespace OR punctuation characters
- toLowerCase() before split ensures case-insensitive word comparison (Hello = hello)
- HashMap<String, Integer> efficiently stores word frequencies with O(1) lookup
- StringBuilder used for building formatted output - much more efficient than String concatenation
- removeEmptyStrings() helper method filters out empty strings after split (common with punctuation)
- getOrDefault(word, 0) provides default value 0 if word not in map - simplifies counting logic
- String.format("%.1f") formats double to 1 decimal place for average word length
- words[] array stored as instance variable avoids re-splitting text for each method call
- Defensive programming: check for null and empty strings in constructor
- Map.Entry<String, Integer> used to iterate HashMap entries (key-value pairs)
- totalLength accumulator pattern for calculating average
- Demonstrates string immutability: toLowerCase() returns new string, original unchanged

---

### Exercise 6: String Encryption and Decryption System

**📝 Problem Statement:**
Create a string encryption/decryption system using Caesar cipher and ROT13 algorithms. The system should encrypt and decrypt messages, validate input, handle both uppercase and lowercase letters while preserving non-alphabetic characters, and provide formatted output using StringBuilder.

**Requirements:**
- Create EncryptionSystem class with encrypt() and decrypt() methods
- Implement Caesar cipher: shift each letter by n positions (default 3)
- Implement ROT13 cipher: special case of Caesar with shift 13 (self-inverse)
- Preserve case: uppercase letters stay uppercase, lowercase stay lowercase
- Preserve non-alphabetic characters: numbers, spaces, punctuation unchanged
- Use charAt() to access individual characters for processing
- Use StringBuilder to build encrypted/decrypted strings efficiently
- Implement validateShift(int shift) ensuring shift is 0-25
- Create encryptWithKey(String message, int shift) for custom shift values
- Create decryptWithKey(String encrypted, int shift) reversing the encryption
- Handle wrap-around: 'z' shifted by 1 becomes 'a', 'Z' + 1 = 'A'
- Provide formatted output showing original, encrypted, and decrypted messages

**Sample Test Cases:**
```
Input: encrypt("Hello World!", 3)
Expected Output:
Original:  Hello World!
Encrypted: Khoor Zruog!
(Caesar cipher with shift 3)

Input: decrypt("Khoor Zruog!", 3)
Expected Output:
Encrypted: Khoor Zruog!
Decrypted: Hello World!
(Caesar cipher with shift 3)

Input: encryptROT13("Java Programming")
Expected Output:
Original:  Java Programming
Encrypted: Wnin Cebtenzzvat
(ROT13 cipher - shift 13)

Input: decryptROT13("Wnin Cebtenzzvat")
Expected Output:
Encrypted: Wnin Cebtenzzvat
Decrypted: Java Programming
(ROT13 is self-inverse)

Input: encrypt("xyz ABC 123!", 5)
Expected Output:
Original:  xyz ABC 123!
Encrypted: cde FGH 123!
(Shift 5: x→c, y→d, z→e, A→F, B→G, C→H, preserves numbers and punctuation)

Input: encrypt("Test", 30)
Expected Output:
Error: Shift must be between 0 and 25
```

**Solution:**
```java
public class EncryptionSystem {
    private static final int ALPHABET_SIZE = 26;

    // Validate shift value
    private boolean validateShift(int shift) {
        return shift >= 0 && shift <= 25;
    }

    // Encrypt a single character with Caesar cipher
    private char encryptChar(char ch, int shift) {
        if (Character.isUpperCase(ch)) {
            // Uppercase letter: A=0, B=1, ..., Z=25
            int position = ch - 'A';
            int newPosition = (position + shift) % ALPHABET_SIZE;
            return (char) ('A' + newPosition);
        } else if (Character.isLowerCase(ch)) {
            // Lowercase letter: a=0, b=1, ..., z=25
            int position = ch - 'a';
            int newPosition = (position + shift) % ALPHABET_SIZE;
            return (char) ('a' + newPosition);
        } else {
            // Non-alphabetic character: return unchanged
            return ch;
        }
    }

    // Decrypt a single character with Caesar cipher
    private char decryptChar(char ch, int shift) {
        if (Character.isUpperCase(ch)) {
            int position = ch - 'A';
            int newPosition = (position - shift + ALPHABET_SIZE) % ALPHABET_SIZE;
            return (char) ('A' + newPosition);
        } else if (Character.isLowerCase(ch)) {
            int position = ch - 'a';
            int newPosition = (position - shift + ALPHABET_SIZE) % ALPHABET_SIZE;
            return (char) ('a' + newPosition);
        } else {
            return ch;
        }
    }

    // Encrypt message with custom shift
    public String encryptWithKey(String message, int shift) {
        if (!validateShift(shift)) {
            return "Error: Shift must be between 0 and 25";
        }

        StringBuilder encrypted = new StringBuilder();
        for (int i = 0; i < message.length(); i++) {
            char ch = message.charAt(i);
            encrypted.append(encryptChar(ch, shift));
        }
        return encrypted.toString();
    }

    // Decrypt message with custom shift
    public String decryptWithKey(String encrypted, int shift) {
        if (!validateShift(shift)) {
            return "Error: Shift must be between 0 and 25";
        }

        StringBuilder decrypted = new StringBuilder();
        for (int i = 0; i < encrypted.length(); i++) {
            char ch = encrypted.charAt(i);
            decrypted.append(decryptChar(ch, shift));
        }
        return decrypted.toString();
    }

    // Caesar cipher with default shift 3
    public void encrypt(String message, int shift) {
        if (!validateShift(shift)) {
            System.out.println("Error: Shift must be between 0 and 25");
            return;
        }

        String encrypted = encryptWithKey(message, shift);
        System.out.println("\n=== Caesar Cipher Encryption ===");
        System.out.println("Original:  " + message);
        System.out.println("Encrypted: " + encrypted);
        System.out.println("(Caesar cipher with shift " + shift + ")");
    }

    // Decrypt Caesar cipher
    public void decrypt(String encrypted, int shift) {
        if (!validateShift(shift)) {
            System.out.println("Error: Shift must be between 0 and 25");
            return;
        }

        String decrypted = decryptWithKey(encrypted, shift);
        System.out.println("\n=== Caesar Cipher Decryption ===");
        System.out.println("Encrypted: " + encrypted);
        System.out.println("Decrypted: " + decrypted);
        System.out.println("(Caesar cipher with shift " + shift + ")");
    }

    // ROT13 encryption (shift 13)
    public void encryptROT13(String message) {
        String encrypted = encryptWithKey(message, 13);
        System.out.println("\n=== ROT13 Encryption ===");
        System.out.println("Original:  " + message);
        System.out.println("Encrypted: " + encrypted);
        System.out.println("(ROT13 cipher - shift 13)");
    }

    // ROT13 decryption (shift 13 again - self-inverse)
    public void decryptROT13(String encrypted) {
        String decrypted = encryptWithKey(encrypted, 13);
        System.out.println("\n=== ROT13 Decryption ===");
        System.out.println("Encrypted: " + encrypted);
        System.out.println("Decrypted: " + decrypted);
        System.out.println("(ROT13 is self-inverse)");
    }

    public static void main(String[] args) {
        EncryptionSystem system = new EncryptionSystem();

        // Caesar cipher examples
        system.encrypt("Hello World!", 3);
        system.decrypt("Khoor Zruog!", 3);

        // ROT13 examples
        system.encryptROT13("Java Programming");
        system.decryptROT13("Wnin Cebtenzzvat");

        // Custom shift example
        system.encrypt("xyz ABC 123!", 5);

        // Invalid shift
        system.encrypt("Test", 30);
    }
}
```

**💡 Tips:**
- Caesar cipher: each letter shifted by n positions in alphabet (A→D with shift 3)
- ROT13 is Caesar cipher with shift 13 - self-inverse property means applying twice gives original
- Character.isUpperCase() and Character.isLowerCase() check letter case before processing
- ch - 'A' converts character to position: 'A'→0, 'B'→1, ..., 'Z'→25
- (position + shift) % 26 handles wrap-around: position 25 + shift 3 = 28 % 26 = 2
- (position - shift + ALPHABET_SIZE) % ALPHABET_SIZE for decryption prevents negative results
- StringBuilder.append() builds encrypted string character-by-character efficiently
- charAt(i) accesses individual characters for processing in loop
- validateShift() ensures shift value 0-25 preventing invalid cipher operations
- Non-alphabetic characters (spaces, numbers, punctuation) returned unchanged by encryptChar/decryptChar
- encryptWithKey() and decryptWithKey() are core utility methods reused by other methods
- Demonstrates string immutability: original message unchanged, encrypted string is new object

---

### Exercise 7: Username and Password Validator

**📝 Problem Statement:**
Create a comprehensive username and password validation system for user registration. The system should validate usernames (alphanumeric, length 6-20), validate passwords (length 8+, uppercase, lowercase, digit, special character), check password strength, generate validation reports, and provide detailed feedback using String methods.

**Requirements:**
- Create Validator class with validateUsername(String username) method
- Username validation: length 6-20 characters, alphanumeric only (letters and digits)
- Implement validatePassword(String password) checking multiple criteria
- Password validation: minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 digit, 1 special character
- Implement checkPasswordStrength(String password) returning "Weak", "Medium", or "Strong"
- Strong password: 12+ characters, meets all criteria, has multiple special characters
- Medium password: 8-11 characters, meets all basic criteria
- Weak password: doesn't meet all criteria
- Use Character.isLetterOrDigit() for username validation
- Use Character.isUpperCase(), Character.isLowerCase(), Character.isDigit() for password checks
- Special characters: !@#$%^&*()_+-=[]{}|;:,.<>?
- Implement generateValidationReport(String username, String password) with detailed feedback
- Use StringBuilder to build formatted validation report
- Provide specific error messages for each failed validation rule

**Sample Test Cases:**
```
Input: validateUsername("john_doe")
Expected Output:
✗ Username invalid: Contains non-alphanumeric characters
Valid characters: letters and digits only

Input: validateUsername("johndoe123")
Expected Output:
✓ Username valid: johndoe123

Input: validatePassword("Pass123!")
Expected Output:
✓ Password valid
Length: 8 characters
Contains: Uppercase ✓ Lowercase ✓ Digit ✓ Special Character ✓
Strength: Medium

Input: validatePassword("password")
Expected Output:
✗ Password invalid:
- Missing uppercase letter
- Missing digit
- Missing special character
Strength: Weak

Input: validatePassword("SecureP@ssw0rd2024!")
Expected Output:
✓ Password valid
Length: 20 characters
Contains: Uppercase ✓ Lowercase ✓ Digit ✓ Special Character ✓
Strength: Strong

Input: generateValidationReport("abc", "weak")
Expected Output:
=== User Registration Validation ===

Username: abc
✗ Username too short (minimum 6 characters)
Current length: 3

Password: weak
✗ Password too short (minimum 8 characters)
✗ Missing uppercase letter
✗ Missing digit
✗ Missing special character
Current length: 4

Validation Result: FAILED
Please fix the issues above and try again.
```

**Solution:**
```java
public class Validator {
    private static final int MIN_USERNAME_LENGTH = 6;
    private static final int MAX_USERNAME_LENGTH = 20;
    private static final int MIN_PASSWORD_LENGTH = 8;
    private static final int STRONG_PASSWORD_LENGTH = 12;
    private static final String SPECIAL_CHARACTERS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    // Validate username
    public String validateUsername(String username) {
        StringBuilder result = new StringBuilder();

        // Check length
        if (username.length() < MIN_USERNAME_LENGTH) {
            result.append("✗ Username too short (minimum ").append(MIN_USERNAME_LENGTH)
                  .append(" characters)\n");
            result.append("Current length: ").append(username.length()).append("\n");
            return result.toString();
        }

        if (username.length() > MAX_USERNAME_LENGTH) {
            result.append("✗ Username too long (maximum ").append(MAX_USERNAME_LENGTH)
                  .append(" characters)\n");
            result.append("Current length: ").append(username.length()).append("\n");
            return result.toString();
        }

        // Check alphanumeric
        for (int i = 0; i < username.length(); i++) {
            char ch = username.charAt(i);
            if (!Character.isLetterOrDigit(ch)) {
                result.append("✗ Username invalid: Contains non-alphanumeric characters\n");
                result.append("Valid characters: letters and digits only\n");
                return result.toString();
            }
        }

        result.append("✓ Username valid: ").append(username).append("\n");
        return result.toString();
    }

    // Validate password
    public String validatePassword(String password) {
        StringBuilder result = new StringBuilder();
        boolean isValid = true;

        // Check length
        if (password.length() < MIN_PASSWORD_LENGTH) {
            result.append("✗ Password too short (minimum ").append(MIN_PASSWORD_LENGTH)
                  .append(" characters)\n");
            result.append("Current length: ").append(password.length()).append("\n");
            isValid = false;
        }

        // Check for uppercase, lowercase, digit, special character
        boolean hasUpper = false, hasLower = false, hasDigit = false, hasSpecial = false;

        for (int i = 0; i < password.length(); i++) {
            char ch = password.charAt(i);
            if (Character.isUpperCase(ch)) hasUpper = true;
            else if (Character.isLowerCase(ch)) hasLower = true;
            else if (Character.isDigit(ch)) hasDigit = true;
            else if (SPECIAL_CHARACTERS.indexOf(ch) >= 0) hasSpecial = true;
        }

        if (!hasUpper) {
            result.append("✗ Missing uppercase letter\n");
            isValid = false;
        }
        if (!hasLower) {
            result.append("✗ Missing lowercase letter\n");
            isValid = false;
        }
        if (!hasDigit) {
            result.append("✗ Missing digit\n");
            isValid = false;
        }
        if (!hasSpecial) {
            result.append("✗ Missing special character\n");
            isValid = false;
        }

        if (isValid) {
            result.insert(0, "✓ Password valid\n");
            result.append("Length: ").append(password.length()).append(" characters\n");
            result.append("Contains: Uppercase ✓ Lowercase ✓ Digit ✓ Special Character ✓\n");
        }

        // Add strength
        String strength = checkPasswordStrength(password);
        result.append("Strength: ").append(strength).append("\n");

        return result.toString();
    }

    // Check password strength
    public String checkPasswordStrength(String password) {
        if (password.length() < MIN_PASSWORD_LENGTH) {
            return "Weak";
        }

        boolean hasUpper = false, hasLower = false, hasDigit = false;
        int specialCount = 0;

        for (int i = 0; i < password.length(); i++) {
            char ch = password.charAt(i);
            if (Character.isUpperCase(ch)) hasUpper = true;
            else if (Character.isLowerCase(ch)) hasLower = true;
            else if (Character.isDigit(ch)) hasDigit = true;
            else if (SPECIAL_CHARACTERS.indexOf(ch) >= 0) specialCount++;
        }

        // Strong: 12+ chars, all criteria, multiple special chars
        if (password.length() >= STRONG_PASSWORD_LENGTH && hasUpper && hasLower &&
            hasDigit && specialCount >= 2) {
            return "Strong";
        }

        // Medium: 8+ chars, all criteria
        if (password.length() >= MIN_PASSWORD_LENGTH && hasUpper && hasLower &&
            hasDigit && specialCount >= 1) {
            return "Medium";
        }

        return "Weak";
    }

    // Generate complete validation report
    public void generateValidationReport(String username, String password) {
        StringBuilder report = new StringBuilder();
        report.append("\n=== User Registration Validation ===\n\n");

        // Username validation
        report.append("Username: ").append(username).append("\n");
        report.append(validateUsername(username));

        // Password validation
        report.append("\nPassword: ").append(password).append("\n");
        report.append(validatePassword(password));

        // Overall result
        boolean usernameValid = validateUsername(username).contains("✓ Username valid");
        boolean passwordValid = validatePassword(password).contains("✓ Password valid");

        report.append("\nValidation Result: ");
        if (usernameValid && passwordValid) {
            report.append("PASSED ✓\n");
            report.append("Registration successful!\n");
        } else {
            report.append("FAILED ✗\n");
            report.append("Please fix the issues above and try again.\n");
        }

        System.out.println(report.toString());
    }

    public static void main(String[] args) {
        Validator validator = new Validator();

        // Test username validation
        System.out.println(validator.validateUsername("john_doe"));
        System.out.println(validator.validateUsername("johndoe123"));

        // Test password validation
        System.out.println(validator.validatePassword("Pass123!"));
        System.out.println(validator.validatePassword("password"));
        System.out.println(validator.validatePassword("SecureP@ssw0rd2024!"));

        // Test complete validation report
        validator.generateValidationReport("abc", "weak");
        validator.generateValidationReport("validuser123", "SecureP@ssw0rd2024!");
    }
}
```

**💡 Tips:**
- Character.isLetterOrDigit() checks if character is letter (A-Z, a-z) or digit (0-9) - perfect for username validation
- Character.isUpperCase/isLowerCase/isDigit provide specific character type checking for password rules
- SPECIAL_CHARACTERS constant string lists allowed special characters - indexOf() checks membership
- indexOf(ch) >= 0 means character found in string, -1 means not found
- StringBuilder.insert(0, text) prepends text to beginning of string builder - useful for success message
- Boolean flags (hasUpper, hasLower, hasDigit, hasSpecial) track password criteria satisfaction
- Password strength algorithm: length + criteria combination determines Weak/Medium/Strong rating
- specialCount variable counts multiple special characters for Strong password requirement
- generateValidationReport() demonstrates composition: calls validateUsername() and validatePassword() methods
- contains("✓ Username valid") checks if validation passed - used for overall result determination
- Unicode symbols (✓ ✗) make validation output more readable and user-friendly
- charAt(i) in loop processes each character individually for validation checks

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