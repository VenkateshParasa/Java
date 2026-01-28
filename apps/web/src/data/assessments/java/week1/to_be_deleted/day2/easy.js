export default {
  title: "Day 2: Variables & Data Types - Easy Assessment",
  description: "Test your basic understanding of Java variables, primitive data types, and type casting",
  difficulty: "easy",
  passingScore: 70,
  timeLimit: 25, // minutes
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
          question: 'Which of the following is the correct way to declare a variable in Java?',
          options: [
            'int 123number;',
            'int number123;',
            'int number-123;',
            'int new;'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'number123 is a valid variable name. Variable names cannot start with a digit, cannot contain hyphens, and cannot be reserved keywords like "new".'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'What is the default value of an int variable?',
          options: [
            '0',
            '1',
            'null',
            'undefined'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'easy',
          explanation: 'The default value of an int instance variable is 0. However, local variables must be explicitly initialized before use.'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'Which data type would you use to store a single character?',
          options: [
            'String',
            'char',
            'character',
            'byte'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'char is the primitive data type used to store a single character. It uses 2 bytes and can hold Unicode characters.'
        },
        {
          id: 'q8',
          type: 'mcq',
          question: 'How many primitive data types are there in Java?',
          options: [
            '6',
            '7',
            '8',
            '9'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'Java has exactly 8 primitive data types: byte, short, int, long, float, double, char, and boolean.'
        },
        {
          id: 'q9',
          type: 'mcq',
          question: 'Which of the following is the correct way to declare a double variable?',
          options: [
            'double d = 3.14;',
            'Double d = 3.14;',
            'double d = "3.14";',
            'double d = 3.14d;'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'easy',
          explanation: 'double d = 3.14; is correct. Decimal literals are double by default, so no suffix is needed (though 3.14d is also valid).'
        },
        {
          id: 'q10',
          type: 'mcq',
          question: 'What is the range of a byte data type?',
          options: [
            '0 to 255',
            '-128 to 127',
            '-256 to 255',
            '0 to 127'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'A byte in Java is an 8-bit signed integer, which ranges from -128 to 127.'
        }
      ]
    },
    {
      id: 'section-b',
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
        }
      ]
    }
  ]
};
