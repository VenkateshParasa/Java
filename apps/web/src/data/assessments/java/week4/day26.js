export default {
  title: "Day 26: Wrapper Classes & Autoboxing Assessment",
  description: "Test your understanding of wrapper classes, autoboxing, and unboxing",
  passingScore: 70,
  timeLimit: 30, // minutes
  modes: {
    quick: {
      questionCount: 9,
      timeLimit: 15,
      sections: ['section-a', 'section-b']
    },
    full: {
      questionCount: 13,
      timeLimit: 30,
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
          question: 'What is a wrapper class?',
          options: [
            'A class that wraps code',
            'Object representation of primitive',
            'A generic class',
            'A utility class'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Wrapper classes provide object representation of primitive types, allowing them to be used where objects are required.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'Which is the wrapper class for int?',
          options: [
            'Int',
            'Integer',
            'Number',
            'Numeric'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Integer is the wrapper class for the primitive type int.'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'What is autoboxing?',
          options: [
            'Primitive to wrapper conversion',
            'Wrapper to primitive conversion',
            'Creating boxes',
            'Type casting'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'easy',
          explanation: 'Autoboxing is the automatic conversion of primitive types to their corresponding wrapper class objects.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'What is unboxing?',
          options: [
            'Primitive to wrapper conversion',
            'Wrapper to primitive conversion',
            'Opening boxes',
            'Type casting'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Unboxing is the automatic conversion of wrapper class objects to their corresponding primitive types.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'Which method converts String to int?',
          options: [
            'Integer.parseInt()',
            'Integer.toInt()',
            'Integer.valueOf()',
            'Both A and C'
          ],
          correctAnswer: 3,
          points: 2,
          difficulty: 'medium',
          explanation: 'Both parseInt() returns primitive int, and valueOf() returns Integer object (which can be auto-unboxed to int).'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'What is the difference between parseInt() and valueOf()?',
          options: [
            'No difference',
            'parseInt() returns int, valueOf() returns Integer',
            'valueOf() returns int, parseInt() returns Integer',
            'Both return int'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'parseInt() returns primitive int, valueOf() returns Integer wrapper object.'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'What is the Integer cache range?',
          options: [
            '0 to 100',
            '-128 to 127',
            '-256 to 255',
            '0 to 256'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'hard',
          explanation: 'Java caches Integer objects from -128 to 127 for performance. valueOf() reuses cached objects in this range.'
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
          question: 'Why do we need wrapper classes? Give at least three reasons.',
          sampleAnswer: 'Wrapper classes are needed for: 1) Collections - Collections only work with objects, not primitives (List<Integer> not List<int>). 2) Generics - Type parameters require objects. 3) Utility methods - Wrapper classes provide useful methods like parseInt(), toString(), compare(). 4) Null values - Primitives cannot be null, wrappers can. 5) Object-oriented features - Can use inheritance, polymorphism. 6) Synchronization - Can use in synchronized blocks. 7) Reflection - Can inspect type information.',
          points: 3,
          difficulty: 'medium',
          keywords: ['wrapper', 'Collections', 'generics', 'objects', 'null', 'utility methods', 'parseInt', 'reasons']
        },
        {
          id: 'q9',
          type: 'short',
          question: 'Explain the Integer cache. Why does Integer.valueOf(100) == Integer.valueOf(100) return true?',
          sampleAnswer: 'Java caches Integer objects from -128 to 127 for performance optimization. When valueOf() is called with a value in this range, it returns a cached object instead of creating a new one. So Integer.valueOf(100) == Integer.valueOf(100) returns true because both reference the same cached object. However, Integer.valueOf(200) == Integer.valueOf(200) returns false because 200 is outside cache range, creating new objects. Always use equals() for value comparison, not ==.',
          points: 3,
          difficulty: 'hard',
          keywords: ['Integer cache', '-128 to 127', 'valueOf', 'cached', 'performance', 'same object', 'equals', '==']
        },
        {
          id: 'q10',
          type: 'short',
          question: 'What is the difference between == and equals() when comparing wrapper objects?',
          sampleAnswer: '== compares object references (memory addresses), equals() compares values. For cached Integers (-128 to 127), == may return true because they reference same cached object. Outside cache range, == returns false even if values are equal. equals() always compares values correctly. Example: Integer a = 100; Integer b = 100; a == b is true (cached). Integer c = 200; Integer d = 200; c == d is false (not cached). But c.equals(d) is true. Always use equals() for value comparison.',
          points: 3,
          difficulty: 'medium',
          keywords: ['==', 'equals', 'reference', 'value', 'comparison', 'cached', 'wrapper', 'Integer']
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
          question: 'Write a program to convert String to different primitive types (int, double, boolean).',
          sampleAnswer: `public class StringConversionDemo {
    public static void main(String[] args) {
        // String to int
        String intStr = "123";
        int num1 = Integer.parseInt(intStr);
        System.out.println("String to int: " + num1);
        
        // String to Integer (wrapper)
        Integer num2 = Integer.valueOf(intStr);
        System.out.println("String to Integer: " + num2);
        
        // String to double
        String doubleStr = "3.14";
        double d1 = Double.parseDouble(doubleStr);
        System.out.println("String to double: " + d1);
        
        // String to Double (wrapper)
        Double d2 = Double.valueOf(doubleStr);
        System.out.println("String to Double: " + d2);
        
        // String to boolean
        String boolStr = "true";
        boolean b1 = Boolean.parseBoolean(boolStr);
        System.out.println("String to boolean: " + b1);
        
        // String to Boolean (wrapper)
        Boolean b2 = Boolean.valueOf(boolStr);
        System.out.println("String to Boolean: " + b2);
        
        // String to long
        String longStr = "9876543210";
        long l1 = Long.parseLong(longStr);
        System.out.println("String to long: " + l1);
        
        // String to float
        String floatStr = "2.5";
        float f1 = Float.parseFloat(floatStr);
        System.out.println("String to float: " + f1);
        
        // Primitive to String
        System.out.println("\\nPrimitive to String:");
        int x = 42;
        String s1 = String.valueOf(x);
        String s2 = Integer.toString(x);
        String s3 = "" + x;
        System.out.println("Method 1: " + s1);
        System.out.println("Method 2: " + s2);
        System.out.println("Method 3: " + s3);
        
        // Handle exceptions
        try {
            int invalid = Integer.parseInt("abc");
        } catch (NumberFormatException e) {
            System.out.println("\\nError: Invalid number format");
        }
    }
}`,
          points: 5,
          difficulty: 'easy',
          keywords: ['parseInt', 'parseDouble', 'parseBoolean', 'valueOf', 'String', 'conversion', 'primitive', 'wrapper']
        },
        {
          id: 'q12',
          type: 'short',
          question: 'Write a program demonstrating autoboxing and unboxing.',
          sampleAnswer: `import java.util.*;

public class AutoboxingDemo {
    public static void main(String[] args) {
        // Autoboxing - primitive to wrapper
        System.out.println("Autoboxing Examples:");
        
        // Automatic conversion
        Integer num1 = 10; // int to Integer (autoboxing)
        System.out.println("Autoboxed: " + num1);
        
        // In collections
        List<Integer> numbers = new ArrayList<>();
        numbers.add(5); // autoboxing: int to Integer
        numbers.add(10);
        numbers.add(15);
        System.out.println("List: " + numbers);
        
        // Unboxing - wrapper to primitive
        System.out.println("\\nUnboxing Examples:");
        
        Integer num2 = 20;
        int num3 = num2; // Integer to int (unboxing)
        System.out.println("Unboxed: " + num3);
        
        // In arithmetic operations
        Integer a = 10;
        Integer b = 20;
        int sum = a + b; // unboxing both, then addition
        System.out.println("Sum: " + sum);
        
        // From collections
        int first = numbers.get(0); // unboxing
        System.out.println("First element: " + first);
        
        // Both autoboxing and unboxing
        System.out.println("\\nCombined Example:");
        Integer x = 5; // autoboxing
        Integer y = 10; // autoboxing
        Integer result = x + y; // unboxing, addition, autoboxing
        System.out.println("Result: " + result);
        
        // In method calls
        printNumber(100); // autoboxing
        int value = getNumber(); // unboxing
        System.out.println("Returned value: " + value);
        
        // Performance consideration
        System.out.println("\\nPerformance Note:");
        long start = System.nanoTime();
        Integer sum1 = 0;
        for (int i = 0; i < 1000; i++) {
            sum1 += i; // unboxing, addition, autoboxing (slow)
        }
        long end = System.nanoTime();
        System.out.println("With autoboxing: " + (end - start) + " ns");
        
        start = System.nanoTime();
        int sum2 = 0;
        for (int i = 0; i < 1000; i++) {
            sum2 += i; // primitive operation (fast)
        }
        end = System.nanoTime();
        System.out.println("Without autoboxing: " + (end - start) + " ns");
    }
    
    static void printNumber(Integer n) {
        System.out.println("Number: " + n);
    }
    
    static Integer getNumber() {
        return 42; // autoboxing
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['autoboxing', 'unboxing', 'Integer', 'primitive', 'wrapper', 'automatic', 'conversion', 'List']
        },
        {
          id: 'q13',
          type: 'short',
          question: 'Write a program that demonstrates the Integer cache behavior.',
          sampleAnswer: `public class IntegerCacheDemo {
    public static void main(String[] args) {
        System.out.println("Integer Cache Demonstration");
        System.out.println("Cache range: -128 to 127\\n");
        
        // Within cache range (-128 to 127)
        System.out.println("Within Cache Range:");
        Integer a1 = 100;
        Integer a2 = 100;
        System.out.println("Integer a1 = 100");
        System.out.println("Integer a2 = 100");
        System.out.println("a1 == a2: " + (a1 == a2)); // true (same cached object)
        System.out.println("a1.equals(a2): " + a1.equals(a2)); // true
        System.out.println("Same object? " + (System.identityHashCode(a1) == System.identityHashCode(a2)));
        
        // Using valueOf (uses cache)
        Integer b1 = Integer.valueOf(50);
        Integer b2 = Integer.valueOf(50);
        System.out.println("\\nUsing valueOf(50):");
        System.out.println("b1 == b2: " + (b1 == b2)); // true (cached)
        
        // Outside cache range
        System.out.println("\\nOutside Cache Range:");
        Integer c1 = 200;
        Integer c2 = 200;
        System.out.println("Integer c1 = 200");
        System.out.println("Integer c2 = 200");
        System.out.println("c1 == c2: " + (c1 == c2)); // false (different objects)
        System.out.println("c1.equals(c2): " + c1.equals(c2)); // true
        System.out.println("Same object? " + (System.identityHashCode(c1) == System.identityHashCode(c2)));
        
        // Using new (bypasses cache)
        System.out.println("\\nUsing new Integer():");
        Integer d1 = new Integer(100);
        Integer d2 = new Integer(100);
        System.out.println("d1 == d2: " + (d1 == d2)); // false (new objects)
        System.out.println("d1.equals(d2): " + d1.equals(d2)); // true
        
        // Comparing with cached
        Integer e1 = 100;
        Integer e2 = new Integer(100);
        System.out.println("\\nCached vs New:");
        System.out.println("e1 == e2: " + (e1 == e2)); // false
        System.out.println("e1.equals(e2): " + e1.equals(e2)); // true
        
        // Edge cases
        System.out.println("\\nEdge Cases:");
        Integer min = -128;
        Integer max = 127;
        System.out.println("Cache min (-128) == -128: " + (min == Integer.valueOf(-128)));
        System.out.println("Cache max (127) == 127: " + (max == Integer.valueOf(127)));
        
        Integer justOutside = 128;
        System.out.println("Just outside (128) == 128: " + (justOutside == Integer.valueOf(128)));
        
        // Best practice
        System.out.println("\\n=== BEST PRACTICE ===");
        System.out.println("Always use .equals() for value comparison!");
        System.out.println("Use == only for reference comparison!");
    }
}`,
          points: 5,
          difficulty: 'hard',
          keywords: ['Integer cache', '-128 to 127', 'valueOf', '==', 'equals', 'cached', 'new Integer', 'same object']
        }
      ]
    }
  ]
};