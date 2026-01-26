export default {
  title: "Day 15: Strings Assessment",
  description: "Test your understanding of String class, immutability, String pool, and StringBuilder/StringBuffer",
  passingScore: 70,
  timeLimit: 35, // minutes
  modes: {
    quick: {
      questionCount: 10,
      timeLimit: 18,
      sections: ['section-a', 'section-b']
    },
    full: {
      questionCount: 14,
      timeLimit: 35,
      sections: ['section-a', 'section-b', 'section-c']
    }
  },
  sections: [
    {
      id: 'section-a',
      title: 'Multiple Choice Questions',
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          question: 'Are strings mutable in Java?',
          options: [
            'Yes',
            'No',
            'Sometimes',
            'Depends on declaration'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Strings are immutable in Java. Once created, their content cannot be changed. Any modification creates a new String object.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'What is the difference between String s1 = "Hello" and String s2 = new String("Hello")?',
          options: [
            'No difference',
            's1 goes to string pool, s2 goes to heap',
            's1 is faster, s2 is slower',
            's1 is mutable, s2 is immutable'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'String literals ("Hello") go to the string pool for reuse. new String() creates a new object in heap memory, even if the same value exists in the pool.'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'Which method compares string content?',
          options: [
            '==',
            'equals()',
            'compareTo()',
            'Both B and C'
          ],
          correctAnswer: 3,
          points: 2,
          difficulty: 'medium',
          explanation: 'Both equals() and compareTo() compare content. equals() returns boolean, compareTo() returns int for lexicographic comparison. == compares references.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'What does str.length() return?',
          options: [
            'Number of words',
            'Number of characters',
            'Size in bytes',
            'Number of lines'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'length() returns the number of characters in the string, including spaces and special characters.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'What is the index of the first character in a string?',
          options: [
            '-1',
            '0',
            '1',
            'Depends on string'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Strings are zero-indexed in Java. The first character is at index 0, second at index 1, and so on.'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'Which class is used for mutable strings?',
          options: [
            'String',
            'StringBuilder',
            'StringBuffer',
            'Both B and C'
          ],
          correctAnswer: 3,
          points: 2,
          difficulty: 'easy',
          explanation: 'Both StringBuilder and StringBuffer provide mutable string operations. StringBuilder is faster but not thread-safe, StringBuffer is thread-safe.'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'What is the difference between StringBuilder and StringBuffer?',
          options: [
            'No difference',
            'StringBuilder is not thread-safe, StringBuffer is',
            'StringBuilder is immutable',
            'StringBuffer is faster'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'StringBuilder is faster but not synchronized (not thread-safe). StringBuffer is synchronized (thread-safe) but slower due to synchronization overhead.'
        }
      ]
    },
    {
      id: 'section-b',
      title: 'Short Answer Questions',
      questions: [
        {
          id: 'q8',
          type: 'short',
          question: 'Explain why strings are immutable in Java. What are the benefits?',
          sampleAnswer: 'Strings are immutable for security (passwords, network connections), thread safety (can be shared without synchronization), string pool optimization (reuse identical strings), and hashcode caching (for HashMap keys). Once created, content cannot change, preventing accidental modifications and enabling safe sharing across threads.',
          points: 3,
          difficulty: 'medium',
          keywords: ['immutable', 'security', 'thread safety', 'string pool', 'optimization', 'hashcode']
        },
        {
          id: 'q9',
          type: 'short',
          question: 'What is the string pool? How does it help with memory optimization?',
          sampleAnswer: 'String pool is a special memory area in heap where Java stores string literals. When you create a string literal, Java checks if it exists in the pool. If yes, returns reference to existing string; if no, creates new one. This avoids duplicate strings, saves memory, and improves performance through string reuse.',
          points: 3,
          difficulty: 'medium',
          keywords: ['string pool', 'memory', 'optimization', 'literals', 'reuse', 'heap']
        },
        {
          id: 'q10',
          type: 'short',
          question: 'When should you use StringBuilder instead of String?',
          sampleAnswer: 'Use StringBuilder when performing many string modifications (concatenations, insertions, deletions) in loops or repeated operations. String creates new objects for each modification, causing memory overhead and performance issues. StringBuilder modifies the same object, making it much more efficient for multiple operations. Use String for simple, one-time operations.',
          points: 3,
          difficulty: 'medium',
          keywords: ['StringBuilder', 'modifications', 'concatenation', 'performance', 'loops', 'efficient']
        }
      ]
    },
    {
      id: 'section-c',
      title: 'Coding Problems',
      questions: [
        {
          id: 'q11',
          type: 'short',
          question: 'Write a program to check if a string is a palindrome (reads same forwards and backwards).',
          sampleAnswer: `public class PalindromeCheck {
    public static void main(String[] args) {
        String str = "radar";
        boolean isPalindrome = true;
        
        int left = 0;
        int right = str.length() - 1;
        
        while (left < right) {
            if (str.charAt(left) != str.charAt(right)) {
                isPalindrome = false;
                break;
            }
            left++;
            right--;
        }
        
        if (isPalindrome) {
            System.out.println(str + " is a palindrome");
        } else {
            System.out.println(str + " is not a palindrome");
        }
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['palindrome', 'charAt', 'two pointers', 'comparison', 'loop']
        },
        {
          id: 'q12',
          type: 'short',
          question: 'Write a program to count the number of vowels and consonants in a string.',
          sampleAnswer: `public class VowelConsonantCount {
    public static void main(String[] args) {
        String str = "Hello World";
        int vowels = 0;
        int consonants = 0;
        
        str = str.toLowerCase();
        
        for (int i = 0; i < str.length(); i++) {
            char ch = str.charAt(i);
            
            if (ch >= 'a' && ch <= 'z') {
                if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
                    vowels++;
                } else {
                    consonants++;
                }
            }
        }
        
        System.out.println("Vowels: " + vowels);
        System.out.println("Consonants: " + consonants);
    }
}`,
          points: 5,
          difficulty: 'easy',
          keywords: ['vowels', 'consonants', 'count', 'charAt', 'loop', 'toLowerCase']
        },
        {
          id: 'q13',
          type: 'short',
          question: 'Write a program to reverse a string without using built-in reverse method.',
          sampleAnswer: `public class ReverseString {
    public static void main(String[] args) {
        String str = "Hello";
        String reversed = "";
        
        // Method 1: Using loop
        for (int i = str.length() - 1; i >= 0; i--) {
            reversed += str.charAt(i);
        }
        System.out.println("Original: " + str);
        System.out.println("Reversed: " + reversed);
        
        // Method 2: Using StringBuilder (more efficient)
        StringBuilder sb = new StringBuilder();
        for (int i = str.length() - 1; i >= 0; i--) {
            sb.append(str.charAt(i));
        }
        System.out.println("Reversed (StringBuilder): " + sb.toString());
    }
}`,
          points: 5,
          difficulty: 'easy',
          keywords: ['reverse', 'string', 'loop', 'charAt', 'StringBuilder', 'backward']
        },
        {
          id: 'q14',
          type: 'short',
          question: 'Write a program to check if two strings are anagrams (contain same characters in different order).',
          sampleAnswer: `import java.util.Arrays;

public class AnagramCheck {
    public static void main(String[] args) {
        String str1 = "listen";
        String str2 = "silent";
        
        // Convert to lowercase and remove spaces
        str1 = str1.toLowerCase().replaceAll("\\\\s", "");
        str2 = str2.toLowerCase().replaceAll("\\\\s", "");
        
        // Check if lengths are equal
        if (str1.length() != str2.length()) {
            System.out.println("Not anagrams");
            return;
        }
        
        // Convert to char arrays and sort
        char[] arr1 = str1.toCharArray();
        char[] arr2 = str2.toCharArray();
        
        Arrays.sort(arr1);
        Arrays.sort(arr2);
        
        // Compare sorted arrays
        if (Arrays.equals(arr1, arr2)) {
            System.out.println(str1 + " and " + str2 + " are anagrams");
        } else {
            System.out.println(str1 + " and " + str2 + " are not anagrams");
        }
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['anagram', 'sort', 'toCharArray', 'Arrays.sort', 'equals', 'comparison']
        }
      ]
    }
  ]
};