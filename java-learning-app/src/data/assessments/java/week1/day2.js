export default {
  title: "Day 2: Variables & Data Types Assessment",
  description: "Test your understanding of Java variables, primitive data types, and type casting",
  passingScore: 70,
  timeLimit: 30, // minutes
  modes: {
    quick: {
      questionCount: 10,
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
          question: 'Which of the following is NOT a primitive data type in Java?',
          options: [
            'int',
            'boolean',
            'String',
            'char'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'String is a reference type (class), not a primitive data type. The 8 primitive types are: byte, short, int, long, float, double, char, and boolean.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'What is the size of an int in Java?',
          options: [
            '2 bytes',
            '4 bytes',
            '8 bytes',
            '16 bytes'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'An int in Java is always 4 bytes (32 bits), regardless of the platform.'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'Which keyword is used to define a constant in Java?',
          options: [
            'const',
            'constant',
            'final',
            'static'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'The final keyword is used to declare constants in Java. Once assigned, the value cannot be changed.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'What is the default value of a boolean variable?',
          options: [
            'true',
            'false',
            '0',
            'null'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'The default value of a boolean instance variable is false. Local variables must be explicitly initialized.'
        },
        {
          id: 'q5',
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
          id: 'q6',
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
          id: 'q7',
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
          question: 'Explain the difference between primitive data types and reference types.',
          sampleAnswer: 'Primitive types store actual values directly in memory (int, boolean, char, etc.) and are stored on the stack. Reference types store references (memory addresses) to objects and are stored on the heap. Primitives have fixed sizes and default values, while reference types default to null.',
          points: 3,
          difficulty: 'medium',
          keywords: ['value', 'reference', 'memory', 'stack', 'heap', 'object']
        },
        {
          id: 'q9',
          type: 'short',
          question: 'What is type casting? Give an example of implicit and explicit casting.',
          sampleAnswer: 'Type casting is converting one data type to another. Implicit casting (widening) happens automatically when converting smaller to larger types (int to double). Explicit casting (narrowing) requires manual conversion when converting larger to smaller types using (type) syntax, like (int)3.5.',
          points: 3,
          difficulty: 'medium',
          keywords: ['implicit', 'explicit', 'widening', 'narrowing', 'conversion', 'automatic']
        },
        {
          id: 'q10',
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
          id: 'q11',
          type: 'short',
          question: 'Write a program that declares variables of all 8 primitive types and prints their values.',
          sampleAnswer: `public class PrimitiveTypes {
    public static void main(String[] args) {
        byte b = 127;
        short s = 32000;
        int i = 100000;
        long l = 10000000000L;
        float f = 3.14f;
        double d = 3.14159;
        char c = 'A';
        boolean bool = true;
        
        System.out.println("byte: " + b);
        System.out.println("short: " + s);
        System.out.println("int: " + i);
        System.out.println("long: " + l);
        System.out.println("float: " + f);
        System.out.println("double: " + d);
        System.out.println("char: " + c);
        System.out.println("boolean: " + bool);
    }
}`,
          points: 5,
          difficulty: 'easy',
          keywords: ['byte', 'short', 'int', 'long', 'float', 'double', 'char', 'boolean', 'println']
        },
        {
          id: 'q12',
          type: 'short',
          question: 'Write a program to calculate the area of a circle. Use a constant for PI (3.14159) and take radius as input value of 5.',
          sampleAnswer: `public class CircleArea {
    public static void main(String[] args) {
        final double PI = 3.14159;
        int radius = 5;
        double area = PI * radius * radius;
        
        System.out.println("Radius: " + radius);
        System.out.println("Area of circle: " + area);
    }
}`,
          points: 5,
          difficulty: 'easy',
          keywords: ['final', 'PI', 'radius', 'area', 'calculation', 'constant']
        },
        {
          id: 'q13',
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
        }
      ]
    }
  ]
};