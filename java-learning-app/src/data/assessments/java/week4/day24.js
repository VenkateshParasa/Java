export default {
  title: "Day 24: Java 8 Features - Lambda & Streams Assessment",
  description: "Test your understanding of lambda expressions, functional interfaces, and Stream API",
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
          question: 'What is a lambda expression?',
          options: [
            'A method',
            'An anonymous function',
            'A class',
            'An interface'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'A lambda expression is an anonymous function (a function without a name) that can be passed as an argument or stored in a variable.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'What is a functional interface?',
          options: [
            'Interface with multiple methods',
            'Interface with single abstract method',
            'Interface with no methods',
            'Abstract class'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'A functional interface has exactly one abstract method. It can have multiple default or static methods. Examples: Runnable, Callable, Comparator.'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'What is the syntax of a lambda with no parameters?',
          options: [
            '-> expression',
            '() -> expression',
            '[] -> expression',
            '{} -> expression'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Lambda with no parameters uses empty parentheses: () -> expression or () -> { statements }'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'What does the filter() operation do?',
          options: [
            'Transforms elements',
            'Sorts elements',
            'Selects elements based on condition',
            'Counts elements'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'filter() is an intermediate operation that selects elements matching a given predicate (condition).'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'What does the map() operation do?',
          options: [
            'Filters elements',
            'Transforms each element',
            'Sorts elements',
            'Groups elements'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'map() transforms each element by applying a function to it, producing a new stream of transformed elements.'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'Which is a terminal operation?',
          options: [
            'filter()',
            'map()',
            'collect()',
            'sorted()'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'medium',
          explanation: 'Terminal operations produce a result or side-effect and close the stream. Examples: collect(), forEach(), count(), reduce(). Intermediate operations return a stream.'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'What does :: represent in method reference?',
          options: [
            'Lambda',
            'Method reference operator',
            'Scope operator',
            'Assignment'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'The :: operator is used for method references, a shorthand for lambda expressions that call a single method.'
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
          question: 'Explain the difference between intermediate and terminal operations in streams.',
          sampleAnswer: 'Intermediate operations (filter, map, sorted, distinct) return a stream and are lazy - they don\'t execute until a terminal operation is called. They can be chained. Terminal operations (collect, forEach, count, reduce, findFirst) produce a result or side-effect and close the stream. They trigger the execution of the stream pipeline. Example: stream.filter().map().collect() - filter and map are intermediate, collect is terminal.',
          points: 3,
          difficulty: 'medium',
          keywords: ['intermediate', 'terminal', 'lazy', 'stream', 'chain', 'result', 'filter', 'map', 'collect']
        },
        {
          id: 'q9',
          type: 'short',
          question: 'What are the built-in functional interfaces in Java? Name at least four.',
          sampleAnswer: 'Java provides several built-in functional interfaces in java.util.function package: 1) Predicate<T> - takes T, returns boolean (test method). 2) Function<T,R> - takes T, returns R (apply method). 3) Consumer<T> - takes T, returns void (accept method). 4) Supplier<T> - takes nothing, returns T (get method). 5) BiFunction<T,U,R> - takes T and U, returns R. 6) UnaryOperator<T> - takes T, returns T. Others: BiPredicate, BiConsumer, etc.',
          points: 3,
          difficulty: 'medium',
          keywords: ['Predicate', 'Function', 'Consumer', 'Supplier', 'functional interface', 'BiFunction', 'UnaryOperator']
        },
        {
          id: 'q10',
          type: 'short',
          question: 'When would you use method references instead of lambda expressions?',
          sampleAnswer: 'Use method references when lambda simply calls an existing method without modification. Benefits: more concise and readable. Types: 1) Static method: ClassName::methodName. 2) Instance method of object: object::methodName. 3) Instance method of arbitrary object: ClassName::methodName. 4) Constructor: ClassName::new. Example: list.forEach(System.out::println) instead of list.forEach(x -> System.out.println(x)). Use lambda when you need additional logic or multiple statements.',
          points: 3,
          difficulty: 'hard',
          keywords: ['method reference', 'lambda', 'concise', 'readable', 'static', 'instance', 'constructor', '::']
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
          question: 'Write a program using lambda to sort a list of strings by length.',
          sampleAnswer: `import java.util.*;

public class LambdaSortDemo {
    public static void main(String[] args) {
        List<String> words = Arrays.asList(
            "Java", "Python", "C", "JavaScript", "Go", "Ruby"
        );
        
        System.out.println("Original list: " + words);
        
        // Method 1: Using lambda with Comparator
        words.sort((s1, s2) -> s1.length() - s2.length());
        System.out.println("Sorted by length (lambda): " + words);
        
        // Method 2: Using Comparator.comparingInt
        List<String> words2 = Arrays.asList(
            "Java", "Python", "C", "JavaScript", "Go", "Ruby"
        );
        words2.sort(Comparator.comparingInt(String::length));
        System.out.println("Sorted by length (method reference): " + words2);
        
        // Method 3: Sort in reverse order
        List<String> words3 = Arrays.asList(
            "Java", "Python", "C", "JavaScript", "Go", "Ruby"
        );
        words3.sort((s1, s2) -> s2.length() - s1.length());
        System.out.println("Sorted by length (descending): " + words3);
        
        // Method 4: Using streams
        List<String> words4 = Arrays.asList(
            "Java", "Python", "C", "JavaScript", "Go", "Ruby"
        );
        List<String> sorted = words4.stream()
            .sorted(Comparator.comparingInt(String::length))
            .toList();
        System.out.println("Sorted using streams: " + sorted);
    }
}`,
          points: 5,
          difficulty: 'easy',
          keywords: ['lambda', 'sort', 'Comparator', 'length', 'String', 'comparingInt']
        },
        {
          id: 'q12',
          type: 'short',
          question: 'Write a program using streams to filter even numbers from a list and square them.',
          sampleAnswer: `import java.util.*;
import java.util.stream.*;

public class StreamFilterMapDemo {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        System.out.println("Original numbers: " + numbers);
        
        // Filter even numbers and square them
        List<Integer> evenSquares = numbers.stream()
            .filter(n -> n % 2 == 0)
            .map(n -> n * n)
            .collect(Collectors.toList());
        
        System.out.println("Even numbers squared: " + evenSquares);
        
        // Alternative: Print each result
        System.out.println("\\nEven numbers squared (printed):");
        numbers.stream()
            .filter(n -> n % 2 == 0)
            .map(n -> n * n)
            .forEach(n -> System.out.print(n + " "));
        
        // With detailed output
        System.out.println("\\n\\nDetailed process:");
        numbers.stream()
            .filter(n -> {
                boolean isEven = n % 2 == 0;
                if (isEven) System.out.println(n + " is even");
                return isEven;
            })
            .map(n -> {
                int square = n * n;
                System.out.println(n + " squared = " + square);
                return square;
            })
            .collect(Collectors.toList());
        
        // Sum of even squares
        int sum = numbers.stream()
            .filter(n -> n % 2 == 0)
            .map(n -> n * n)
            .reduce(0, Integer::sum);
        
        System.out.println("\\nSum of even squares: " + sum);
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['stream', 'filter', 'map', 'even', 'square', 'collect', 'forEach', 'lambda']
        },
        {
          id: 'q13',
          type: 'short',
          question: 'Write a program using streams to find the sum of all elements in a list.',
          sampleAnswer: `import java.util.*;
import java.util.stream.*;

public class StreamSumDemo {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        System.out.println("Numbers: " + numbers);
        
        // Method 1: Using reduce
        int sum1 = numbers.stream()
            .reduce(0, (a, b) -> a + b);
        System.out.println("Sum (reduce with lambda): " + sum1);
        
        // Method 2: Using reduce with method reference
        int sum2 = numbers.stream()
            .reduce(0, Integer::sum);
        System.out.println("Sum (reduce with method reference): " + sum2);
        
        // Method 3: Using sum() for IntStream
        int sum3 = numbers.stream()
            .mapToInt(Integer::intValue)
            .sum();
        System.out.println("Sum (mapToInt and sum): " + sum3);
        
        // Method 4: Using Collectors.summingInt
        int sum4 = numbers.stream()
            .collect(Collectors.summingInt(Integer::intValue));
        System.out.println("Sum (Collectors.summingInt): " + sum4);
        
        // Additional statistics
        IntSummaryStatistics stats = numbers.stream()
            .mapToInt(Integer::intValue)
            .summaryStatistics();
        
        System.out.println("\\nStatistics:");
        System.out.println("Count: " + stats.getCount());
        System.out.println("Sum: " + stats.getSum());
        System.out.println("Min: " + stats.getMin());
        System.out.println("Max: " + stats.getMax());
        System.out.println("Average: " + stats.getAverage());
        
        // Sum of squares
        int sumOfSquares = numbers.stream()
            .map(n -> n * n)
            .reduce(0, Integer::sum);
        System.out.println("\\nSum of squares: " + sumOfSquares);
        
        // Sum of even numbers only
        int sumOfEvens = numbers.stream()
            .filter(n -> n % 2 == 0)
            .reduce(0, Integer::sum);
        System.out.println("Sum of even numbers: " + sumOfEvens);
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['stream', 'sum', 'reduce', 'mapToInt', 'Collectors', 'summingInt', 'IntSummaryStatistics']
        },
        {
          id: 'q14',
          type: 'short',
          question: 'Use streams to group a list of strings by their first character.',
          sampleAnswer: `import java.util.*;
import java.util.stream.*;

public class StreamGroupingDemo {
    public static void main(String[] args) {
        List<String> words = Arrays.asList(
            "Apple", "Banana", "Avocado", "Blueberry", 
            "Cherry", "Apricot", "Blackberry", "Cranberry"
        );
        
        System.out.println("Original words: " + words);
        
        // Group by first character
        Map<Character, List<String>> groupedByFirstChar = words.stream()
            .collect(Collectors.groupingBy(word -> word.charAt(0)));
        
        System.out.println("\\nGrouped by first character:");
        groupedByFirstChar.forEach((key, value) -> 
            System.out.println(key + ": " + value)
        );
        
        // Group by length
        Map<Integer, List<String>> groupedByLength = words.stream()
            .collect(Collectors.groupingBy(String::length));
        
        System.out.println("\\nGrouped by length:");
        groupedByLength.forEach((key, value) -> 
            System.out.println(key + " characters: " + value)
        );
        
        // Count words by first character
        Map<Character, Long> countByFirstChar = words.stream()
            .collect(Collectors.groupingBy(
                word -> word.charAt(0),
                Collectors.counting()
            ));
        
        System.out.println("\\nCount by first character:");
        countByFirstChar.forEach((key, value) -> 
            System.out.println(key + ": " + value + " words")
        );
        
        // Group by first character (case-insensitive)
        Map<Character, List<String>> groupedCaseInsensitive = words.stream()
            .collect(Collectors.groupingBy(
                word -> Character.toLowerCase(word.charAt(0))
            ));
        
        System.out.println("\\nGrouped by first character (case-insensitive):");
        groupedCaseInsensitive.forEach((key, value) -> 
            System.out.println(key + ": " + value)
        );
        
        // Get concatenated strings by first character
        Map<Character, String> concatenatedByFirstChar = words.stream()
            .collect(Collectors.groupingBy(
                word -> word.charAt(0),
                Collectors.joining(", ")
            ));
        
        System.out.println("\\nConcatenated by first character:");
        concatenatedByFirstChar.forEach((key, value) -> 
            System.out.println(key + ": " + value)
        );
    }
}`,
          points: 5,
          difficulty: 'hard',
          keywords: ['stream', 'groupingBy', 'Collectors', 'Map', 'charAt', 'counting', 'joining', 'group']
        }
      ]
    }
  ]
};