export default {
  title: "Day 29: Comprehensive Review Assessment",
  description: "Test your overall understanding of Java fundamentals with mixed concept questions",
  passingScore: 70,
  timeLimit: 35, // minutes
  modes: {
    quick: {
      questionCount: 8,
      timeLimit: 18,
      sections: ['section-a', 'section-b']
    },
    full: {
      questionCount: 12,
      timeLimit: 35,
      sections: ['section-a', 'section-b']
    }
  },
  sections: [
    {
      id: 'section-a',
      title: 'Mixed Concept Questions',
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          question: 'Which collection should you use to store unique elements in sorted order?',
          options: [
            'ArrayList',
            'HashSet',
            'TreeSet',
            'LinkedHashSet'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'medium',
          explanation: 'TreeSet stores unique elements in sorted (natural or custom) order. HashSet is unordered, LinkedHashSet maintains insertion order.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'What makes a class immutable?',
          options: [
            'final fields',
            'private fields',
            'No setters',
            'All of the above'
          ],
          correctAnswer: 3,
          points: 2,
          difficulty: 'medium',
          explanation: 'Immutable class requires: final class, private final fields, no setters, defensive copying for mutable objects. Example: String, Integer.'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'Which is faster: StringBuilder or StringBuffer?',
          options: [
            'StringBuilder',
            'StringBuffer',
            'Both same',
            'Depends on usage'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'easy',
          explanation: 'StringBuilder is faster because it\'s not synchronized. StringBuffer is thread-safe but slower due to synchronization overhead.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'What is the output: System.out.println("Hello".substring(1, 4));',
          options: [
            'Hell',
            'ell',
            'ello',
            'Hel'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'substring(1, 4) returns characters from index 1 (inclusive) to 4 (exclusive): "ell".'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'Which statement is true about static methods?',
          options: [
            'Can access instance variables',
            'Can be overridden',
            'Cannot access instance variables',
            'Must have return type'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'Static methods belong to the class, not instances. They cannot access instance variables directly (need object reference).'
        }
      ]
    },
    {
      id: 'section-b',
      title: 'Problem-Solving Questions',
      questions: [
        {
          id: 'q6',
          type: 'short',
          question: 'Write a program to find the second largest number in an array.',
          sampleAnswer: `public class SecondLargest {
    public static void main(String[] args) {
        int[] numbers = {12, 35, 1, 10, 34, 1, 35};
        
        int secondLargest = findSecondLargest(numbers);
        
        if (secondLargest != Integer.MIN_VALUE) {
            System.out.println("Second largest: " + secondLargest);
        } else {
            System.out.println("Array doesn't have second largest");
        }
    }
    
    static int findSecondLargest(int[] arr) {
        if (arr == null || arr.length < 2) {
            return Integer.MIN_VALUE;
        }
        
        int largest = Integer.MIN_VALUE;
        int secondLargest = Integer.MIN_VALUE;
        
        for (int num : arr) {
            if (num > largest) {
                secondLargest = largest;
                largest = num;
            } else if (num > secondLargest && num != largest) {
                secondLargest = num;
            }
        }
        
        return secondLargest;
    }
    
    // Alternative using sorting
    static int findSecondLargestUsingSorting(int[] arr) {
        if (arr == null || arr.length < 2) {
            return Integer.MIN_VALUE;
        }
        
        Arrays.sort(arr);
        
        // Find second largest (skip duplicates)
        for (int i = arr.length - 2; i >= 0; i--) {
            if (arr[i] != arr[arr.length - 1]) {
                return arr[i];
            }
        }
        
        return Integer.MIN_VALUE;
    }
    
    // Using streams
    static int findSecondLargestUsingStreams(int[] arr) {
        return Arrays.stream(arr)
            .boxed()
            .sorted(Collections.reverseOrder())
            .distinct()
            .skip(1)
            .findFirst()
            .orElse(Integer.MIN_VALUE);
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['second largest', 'array', 'loop', 'largest', 'algorithm', 'sorting']
        },
        {
          id: 'q7',
          type: 'short',
          question: 'Write a program to check if a string contains only digits.',
          sampleAnswer: `public class DigitChecker {
    public static void main(String[] args) {
        String[] testStrings = {"12345", "123a45", "", "0", "  123"};
        
        for (String str : testStrings) {
            System.out.println("'" + str + "' contains only digits: " + 
                             containsOnlyDigits(str));
        }
    }
    
    // Method 1: Using regex
    static boolean containsOnlyDigits(String str) {
        if (str == null || str.isEmpty()) {
            return false;
        }
        return str.matches("\\\\d+");
    }
    
    // Method 2: Using Character.isDigit()
    static boolean containsOnlyDigitsManual(String str) {
        if (str == null || str.isEmpty()) {
            return false;
        }
        
        for (char c : str.toCharArray()) {
            if (!Character.isDigit(c)) {
                return false;
            }
        }
        return true;
    }
    
    // Method 3: Using streams
    static boolean containsOnlyDigitsStream(String str) {
        if (str == null || str.isEmpty()) {
            return false;
        }
        
        return str.chars().allMatch(Character::isDigit);
    }
    
    // Method 4: Try parsing
    static boolean containsOnlyDigitsParse(String str) {
        if (str == null || str.isEmpty()) {
            return false;
        }
        
        try {
            Long.parseLong(str);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }
}`,
          points: 5,
          difficulty: 'easy',
          keywords: ['digits', 'String', 'regex', 'Character.isDigit', 'validation', 'matches']
        },
        {
          id: 'q8',
          type: 'short',
          question: 'Write a program to remove all whitespaces from a string.',
          sampleAnswer: `public class WhitespaceRemover {
    public static void main(String[] args) {
        String text = "  Hello   World  Java  ";
        
        System.out.println("Original: '" + text + "'");
        System.out.println("Method 1: '" + removeWhitespace1(text) + "'");
        System.out.println("Method 2: '" + removeWhitespace2(text) + "'");
        System.out.println("Method 3: '" + removeWhitespace3(text) + "'");
        System.out.println("Method 4: '" + removeWhitespace4(text) + "'");
    }
    
    // Method 1: Using replaceAll with regex
    static String removeWhitespace1(String str) {
        return str.replaceAll("\\\\s+", "");
    }
    
    // Method 2: Using replace (only spaces)
    static String removeWhitespace2(String str) {
        return str.replace(" ", "");
    }
    
    // Method 3: Using StringBuilder
    static String removeWhitespace3(String str) {
        StringBuilder result = new StringBuilder();
        for (char c : str.toCharArray()) {
            if (!Character.isWhitespace(c)) {
                result.append(c);
            }
        }
        return result.toString();
    }
    
    // Method 4: Using streams
    static String removeWhitespace4(String str) {
        return str.chars()
            .filter(c -> !Character.isWhitespace(c))
            .collect(StringBuilder::new,
                    StringBuilder::appendCodePoint,
                    StringBuilder::append)
            .toString();
    }
    
    // Remove only leading/trailing whitespace
    static String trimWhitespace(String str) {
        return str.trim();
    }
    
    // Replace multiple spaces with single space
    static String normalizeWhitespace(String str) {
        return str.trim().replaceAll("\\\\s+", " ");
    }
}`,
          points: 5,
          difficulty: 'easy',
          keywords: ['whitespace', 'remove', 'String', 'replaceAll', 'regex', 'StringBuilder', 'trim']
        },
        {
          id: 'q9',
          type: 'short',
          question: 'Write a program to merge two ArrayLists and remove duplicates.',
          sampleAnswer: `import java.util.*;
import java.util.stream.*;

public class MergeAndRemoveDuplicates {
    public static void main(String[] args) {
        List<Integer> list1 = Arrays.asList(1, 2, 3, 4, 5);
        List<Integer> list2 = Arrays.asList(4, 5, 6, 7, 8);
        
        System.out.println("List 1: " + list1);
        System.out.println("List 2: " + list2);
        
        // Method 1: Using HashSet
        List<Integer> merged1 = mergeUsingSet(list1, list2);
        System.out.println("\\nMethod 1 (HashSet): " + merged1);
        
        // Method 2: Using LinkedHashSet (maintains order)
        List<Integer> merged2 = mergeUsingLinkedHashSet(list1, list2);
        System.out.println("Method 2 (LinkedHashSet): " + merged2);
        
        // Method 3: Using Streams
        List<Integer> merged3 = mergeUsingStreams(list1, list2);
        System.out.println("Method 3 (Streams): " + merged3);
        
        // Method 4: Using TreeSet (sorted)
        List<Integer> merged4 = mergeUsingTreeSet(list1, list2);
        System.out.println("Method 4 (TreeSet - sorted): " + merged4);
    }
    
    // Method 1: Using HashSet
    static <T> List<T> mergeUsingSet(List<T> list1, List<T> list2) {
        Set<T> set = new HashSet<>();
        set.addAll(list1);
        set.addAll(list2);
        return new ArrayList<>(set);
    }
    
    // Method 2: Using LinkedHashSet (maintains insertion order)
    static <T> List<T> mergeUsingLinkedHashSet(List<T> list1, List<T> list2) {
        Set<T> set = new LinkedHashSet<>();
        set.addAll(list1);
        set.addAll(list2);
        return new ArrayList<>(set);
    }
    
    // Method 3: Using Streams
    static <T> List<T> mergeUsingStreams(List<T> list1, List<T> list2) {
        return Stream.concat(list1.stream(), list2.stream())
            .distinct()
            .collect(Collectors.toList());
    }
    
    // Method 4: Using TreeSet (sorted, no duplicates)
    static <T> List<T> mergeUsingTreeSet(List<T> list1, List<T> list2) {
        Set<T> set = new TreeSet<>();
        set.addAll(list1);
        set.addAll(list2);
        return new ArrayList<>(set);
    }
    
    // Merge with custom comparator
    static <T> List<T> mergeWithComparator(List<T> list1, List<T> list2, 
                                          Comparator<T> comparator) {
        Set<T> set = new TreeSet<>(comparator);
        set.addAll(list1);
        set.addAll(list2);
        return new ArrayList<>(set);
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['merge', 'ArrayList', 'duplicates', 'HashSet', 'LinkedHashSet', 'distinct', 'stream']
        },
        {
          id: 'q10',
          type: 'short',
          question: 'Write a program to find the most frequent element in an array.',
          sampleAnswer: `import java.util.*;
import java.util.stream.*;

public class MostFrequentElement {
    public static void main(String[] args) {
        int[] numbers = {1, 3, 2, 1, 4, 1, 3, 2, 1};
        
        System.out.println("Array: " + Arrays.toString(numbers));
        
        // Method 1: Using HashMap
        int mostFrequent1 = findMostFrequentUsingMap(numbers);
        System.out.println("Most frequent (HashMap): " + mostFrequent1);
        
        // Method 2: Using Streams
        int mostFrequent2 = findMostFrequentUsingStreams(numbers);
        System.out.println("Most frequent (Streams): " + mostFrequent2);
        
        // Get frequency details
        printFrequencyDetails(numbers);
    }
    
    // Method 1: Using HashMap
    static int findMostFrequentUsingMap(int[] arr) {
        if (arr == null || arr.length == 0) {
            throw new IllegalArgumentException("Array is empty");
        }
        
        Map<Integer, Integer> frequencyMap = new HashMap<>();
        
        // Count frequencies
        for (int num : arr) {
            frequencyMap.put(num, frequencyMap.getOrDefault(num, 0) + 1);
        }
        
        // Find max frequency
        int maxFrequency = 0;
        int mostFrequent = arr[0];
        
        for (Map.Entry<Integer, Integer> entry : frequencyMap.entrySet()) {
            if (entry.getValue() > maxFrequency) {
                maxFrequency = entry.getValue();
                mostFrequent = entry.getKey();
            }
        }
        
        return mostFrequent;
    }
    
    // Method 2: Using Streams
    static int findMostFrequentUsingStreams(int[] arr) {
        return Arrays.stream(arr)
            .boxed()
            .collect(Collectors.groupingBy(e -> e, Collectors.counting()))
            .entrySet()
            .stream()
            .max(Map.Entry.comparingByValue())
            .map(Map.Entry::getKey)
            .orElseThrow();
    }
    
    // Print frequency details
    static void printFrequencyDetails(int[] arr) {
        Map<Integer, Long> frequencyMap = Arrays.stream(arr)
            .boxed()
            .collect(Collectors.groupingBy(e -> e, Collectors.counting()));
        
        System.out.println("\\nFrequency Details:");
        frequencyMap.entrySet()
            .stream()
            .sorted(Map.Entry.<Integer, Long>comparingByValue().reversed())
            .forEach(entry -> 
                System.out.println(entry.getKey() + " appears " + 
                                 entry.getValue() + " times")
            );
    }
    
    // Find all elements with max frequency
    static List<Integer> findAllMostFrequent(int[] arr) {
        Map<Integer, Long> frequencyMap = Arrays.stream(arr)
            .boxed()
            .collect(Collectors.groupingBy(e -> e, Collectors.counting()));
        
        long maxFrequency = frequencyMap.values()
            .stream()
            .max(Long::compare)
            .orElse(0L);
        
        return frequencyMap.entrySet()
            .stream()
            .filter(entry -> entry.getValue() == maxFrequency)
            .map(Map.Entry::getKey)
            .collect(Collectors.toList());
    }
}`,
          points: 5,
          difficulty: 'hard',
          keywords: ['frequency', 'most frequent', 'HashMap', 'count', 'array', 'groupingBy', 'stream']
        },
        {
          id: 'q11',
          type: 'short',
          question: 'Write a program that reads a file and counts the frequency of each word.',
          sampleAnswer: `import java.io.*;
import java.util.*;
import java.util.stream.*;

public class WordFrequencyCounter {
    public static void main(String[] args) {
        String filename = "sample.txt";
        
        try {
            Map<String, Long> wordFrequency = countWordFrequency(filename);
            displayResults(wordFrequency);
        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
        }
    }
    
    static Map<String, Long> countWordFrequency(String filename) throws IOException {
        try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
            return reader.lines()
                .flatMap(line -> Arrays.stream(line.toLowerCase()
                    .replaceAll("[^a-zA-Z\\\\s]", "")
                    .split("\\\\s+")))
                .filter(word -> !word.isEmpty())
                .collect(Collectors.groupingBy(
                    word -> word,
                    Collectors.counting()
                ));
        }
    }
    
    static void displayResults(Map<String, Long> wordFrequency) {
        System.out.println("=== Word Frequency Analysis ===");
        System.out.println("Total unique words: " + wordFrequency.size());
        
        // Top 10 most frequent words
        System.out.println("\\nTop 10 Most Frequent Words:");
        wordFrequency.entrySet()
            .stream()
            .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
            .limit(10)
            .forEach(entry -> 
                System.out.printf("%-15s: %d%n", entry.getKey(), entry.getValue())
            );
        
        // Words appearing only once
        long singleOccurrence = wordFrequency.values()
            .stream()
            .filter(count -> count == 1)
            .count();
        System.out.println("\\nWords appearing once: " + singleOccurrence);
    }
    
    // Alternative: Manual counting
    static Map<String, Integer> countWordFrequencyManual(String filename) 
            throws IOException {
        Map<String, Integer> wordCount = new HashMap<>();
        
        try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] words = line.toLowerCase()
                    .replaceAll("[^a-zA-Z\\\\s]", "")
                    .split("\\\\s+");
                
                for (String word : words) {
                    if (!word.isEmpty()) {
                        wordCount.put(word, wordCount.getOrDefault(word, 0) + 1);
                    }
                }
            }
        }
        
        return wordCount;
    }
}`,
          points: 5,
          difficulty: 'hard',
          keywords: ['file', 'read', 'word frequency', 'HashMap', 'BufferedReader', 'count', 'stream', 'groupingBy']
        },
        {
          id: 'q12',
          type: 'short',
          question: 'Create a simple calculator using enums for operations (ADD, SUBTRACT, MULTIPLY, DIVIDE).',
          sampleAnswer: `enum Operation {
    ADD {
        @Override
        public double apply(double x, double y) {
            return x + y;
        }
    },
    SUBTRACT {
        @Override
        public double apply(double x, double y) {
            return x - y;
        }
    },
    MULTIPLY {
        @Override
        public double apply(double x, double y) {
            return x * y;
        }
    },
    DIVIDE {
        @Override
        public double apply(double x, double y) {
            if (y == 0) {
                throw new ArithmeticException("Division by zero");
            }
            return x / y;
        }
    };
    
    public abstract double apply(double x, double y);
    
    public String getSymbol() {
        switch (this) {
            case ADD: return "+";
            case SUBTRACT: return "-";
            case MULTIPLY: return "*";
            case DIVIDE: return "/";
            default: return "?";
        }
    }
}

class Calculator {
    public double calculate(double x, double y, Operation operation) {
        return operation.apply(x, y);
    }
    
    public void displayResult(double x, double y, Operation operation) {
        try {
            double result = calculate(x, y, operation);
            System.out.printf("%.2f %s %.2f = %.2f%n", 
                x, operation.getSymbol(), y, result);
        } catch (ArithmeticException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}

public class EnumCalculatorDemo {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        
        System.out.println("=== Enum Calculator ===");
        
        // Test all operations
        double a = 10, b = 5;
        
        for (Operation op : Operation.values()) {
            calc.displayResult(a, b, op);
        }
        
        // Test division by zero
        System.out.println("\\nDivision by zero test:");
        calc.displayResult(10, 0, Operation.DIVIDE);
        
        // Interactive calculator
        Scanner scanner = new Scanner(System.in);
        System.out.println("\\n=== Interactive Calculator ===");
        System.out.print("Enter first number: ");
        double num1 = scanner.nextDouble();
        
        System.out.print("Enter operation (ADD/SUBTRACT/MULTIPLY/DIVIDE): ");
        String opStr = scanner.next().toUpperCase();
        
        System.out.print("Enter second number: ");
        double num2 = scanner.nextDouble();
        
        try {
            Operation operation = Operation.valueOf(opStr);
            calc.displayResult(num1, num2, operation);
        } catch (IllegalArgumentException e) {
            System.out.println("Invalid operation!");
        }
        
        scanner.close();
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['enum', 'calculator', 'Operation', 'ADD', 'SUBTRACT', 'MULTIPLY', 'DIVIDE', 'apply', 'abstract']
        }
      ]
    }
  ]
};