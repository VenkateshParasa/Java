export default {
  title: "Day 2: Variables & Data Types - Medium Assessment",
  description: "Test your intermediate understanding of Java variables, data types, type conversion, and naming conventions",
  difficulty: "medium",
  passingScore: 70,
  timeLimit: 35, // minutes
  sections: [
    {
      id: 'section-a',
      title: 'Multiple Choice Questions',
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          question: 'Which of these is a valid variable name?',
          options: [
            '2variable',
            'variable_2',
            'variable-2',
            'class'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'variable_2 is valid. Variable names cannot start with a digit (2variable), cannot contain hyphens (variable-2), and cannot be reserved keywords (class).'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'What will happen when you try: int x = 3.5;',
          options: [
            'Compiles successfully',
            'Compilation error',
            'Runtime error',
            'x will be 3'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'This will cause a compilation error because 3.5 is a double literal and cannot be implicitly converted to int. You need explicit casting: int x = (int)3.5;'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'Which suffix is used for float literals?',
          options: [
            'l or L',
            'f or F',
            'd or D',
            'No suffix needed'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Float literals require the f or F suffix (e.g., 3.14f). Without it, decimal numbers are treated as double by default.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'What is the result of: byte b = (byte)128;',
          options: [
            '128',
            '-128',
            'Compilation error',
            '0'
          ],
          correctAnswer: 1,
          points: 3,
          difficulty: 'medium',
          explanation: 'byte has a range of -128 to 127. When 128 is cast to byte, it wraps around to -128 due to overflow.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'Which type conversion happens automatically in Java?',
          options: [
            'double to int',
            'long to int',
            'int to long',
            'float to int'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'medium',
          explanation: 'int to long is widening conversion and happens automatically. The other options are narrowing conversions that require explicit casting.'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'What will be the output: System.out.println(10 / 3);',
          options: [
            '3.33',
            '3.333333',
            '3',
            '3.0'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'medium',
          explanation: 'When both operands are integers, integer division is performed, which truncates the decimal part. Result is 3, not 3.33.'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'Which of the following variable names follows Java naming conventions?',
          options: [
            'STUDENT_NAME',
            'studentName',
            'student_name',
            'StudentName'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'studentName follows camelCase convention for variable names. STUDENT_NAME is for constants, StudentName is for classes, and student_name is not conventional in Java.'
        },
        {
          id: 'q8',
          type: 'mcq',
          question: 'What happens when you assign a larger data type to a smaller one without casting?',
          options: [
            'Automatic conversion',
            'Compilation error',
            'Runtime error',
            'Data truncation'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Narrowing conversion requires explicit casting. Without it, you get a compilation error: "possible lossy conversion".'
        },
        {
          id: 'q9',
          type: 'mcq',
          question: 'Which statement correctly declares a long variable?',
          options: [
            'long l = 10000000000;',
            'long l = 10000000000L;',
            'long l = 10000000000l;',
            'Both B and C'
          ],
          correctAnswer: 3,
          points: 2,
          difficulty: 'medium',
          explanation: 'Long literals need the L or l suffix. Without it, large numbers are treated as int and cause compilation errors. Both L and l are valid, though L is preferred for clarity.'
        },
        {
          id: 'q10',
          type: 'mcq',
          question: 'What is the difference between char and String?',
          options: [
            'char is primitive, String is reference type',
            'char holds single character, String holds multiple',
            'char uses single quotes, String uses double quotes',
            'All of the above'
          ],
          correctAnswer: 3,
          points: 2,
          difficulty: 'medium',
          explanation: 'All statements are correct. char is a primitive type that holds a single character in single quotes, while String is a reference type (class) that holds multiple characters in double quotes.'
        },
        {
          id: 'q11',
          type: 'mcq',
          question: 'What will be printed: int x = 5; System.out.println(x++);',
          options: [
            '5',
            '6',
            'Compilation error',
            'Runtime error'
          ],
          correctAnswer: 0,
          points: 3,
          difficulty: 'medium',
          explanation: 'Post-increment (x++) uses the current value first, then increments. So it prints 5, and then x becomes 6.'
        },
        {
          id: 'q12',
          type: 'mcq',
          question: 'Which of these represents an octal literal in Java?',
          options: [
            '0x1A',
            '0b1010',
            '077',
            '10_000'
          ],
          correctAnswer: 2,
          points: 3,
          difficulty: 'medium',
          explanation: 'Octal literals start with 0 (077). 0x is hexadecimal, 0b is binary, and underscores are just for readability in decimal.'
        }
      ]
    },
    {
      id: 'section-b',
      title: 'Short Answer Questions',
      questions: [
        {
          id: 'q13',
          type: 'short',
          question: 'Explain the difference between primitive data types and reference types.',
          sampleAnswer: 'Primitive types store actual values directly in memory (int, boolean, char, etc.) and are stored on the stack. Reference types store references (memory addresses) to objects and are stored on the heap. Primitives have fixed sizes and default values, while reference types default to null.',
          points: 3,
          difficulty: 'medium',
          keywords: ['value', 'reference', 'memory', 'stack', 'heap', 'object']
        },
        {
          id: 'q14',
          type: 'short',
          question: 'What is type casting? Give an example of implicit and explicit casting.',
          sampleAnswer: 'Type casting is converting one data type to another. Implicit casting (widening) happens automatically when converting smaller to larger types (int to double). Explicit casting (narrowing) requires manual conversion when converting larger to smaller types using (type) syntax, like (int)3.5.',
          points: 3,
          difficulty: 'medium',
          keywords: ['implicit', 'explicit', 'widening', 'narrowing', 'conversion', 'automatic']
        },
        {
          id: 'q15',
          type: 'short',
          question: 'Why should we use the final keyword for constants? What benefit does it provide?',
          sampleAnswer: 'Using final for constants prevents accidental modification of values, makes code more readable by clearly indicating unchangeable values, allows compiler optimizations, and helps catch errors at compile-time rather than runtime. It also communicates intent to other developers.',
          points: 3,
          difficulty: 'medium',
          keywords: ['immutable', 'prevent', 'modification', 'compile-time', 'optimization', 'intent']
        }
      ]
    },
    {
      id: 'section-c',
      title: 'Coding Problems',
      questions: [
        {
          id: 'q16',
          type: 'short',
          question: 'Write a program that demonstrates explicit type casting from double to int. Show data loss.',
          sampleAnswer: `public class TypeCasting {
    public static void main(String[] args) {
        double d = 9.78;
        int i = (int) d; // Explicit casting

        System.out.println("Original double value: " + d);
        System.out.println("After casting to int: " + i);
        System.out.println("Data lost: " + (d - i));
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['double', 'int', 'explicit', 'casting', 'data loss', 'decimal']
        },
        {
          id: 'q17',
          type: 'short',
          question: 'Write a program that swaps two integer variables without using a third variable.',
          sampleAnswer: `public class SwapWithoutTemp {
    public static void main(String[] args) {
        int a = 10;
        int b = 20;

        System.out.println("Before swap: a = " + a + ", b = " + b);

        a = a + b;  // a becomes 30
        b = a - b;  // b becomes 10
        a = a - b;  // a becomes 20

        System.out.println("After swap: a = " + a + ", b = " + b);
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['swap', 'without', 'temp', 'arithmetic', 'variables']
        },
        {
          id: 'q18',
          type: 'short',
          question: 'Write a program to demonstrate automatic type promotion in expressions.',
          sampleAnswer: `public class TypePromotion {
    public static void main(String[] args) {
        byte b = 42;
        char c = 'a';
        short s = 1024;
        int i = 50000;
        float f = 5.67f;
        double d = 0.1234;

        // All smaller types promoted to int or larger
        double result = (f * b) + (i / c) - (d * s);

        System.out.println("byte + char + short + int + float + double");
        System.out.println("Result: " + result);
        System.out.println("Result type: double");
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['type', 'promotion', 'expression', 'automatic', 'conversion']
        }
      ]
    }
  ]
};
