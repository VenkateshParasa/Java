export default {
  title: "Day 3: Operators & Expressions Assessment",
  description: "Test your understanding of Java operators, expressions, and operator precedence",
  passingScore: 70,
  timeLimit: 30, // minutes
  modes: {
    quick: {
      questionCount: 10,
      timeLimit: 15,
      sections: ['section-a', 'section-b']
    },
    full: {
      questionCount: 12,
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
          question: 'What is the result of 10 % 3?',
          options: [
            '3',
            '0',
            '1',
            '3.33'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'The modulus operator (%) returns the remainder of division. 10 divided by 3 is 3 with remainder 1.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'What is the value of x after: int x = 5; x++;',
          options: [
            '4',
            '5',
            '6',
            '10'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'The post-increment operator (x++) increases the value of x by 1, so x becomes 6.'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'What is the difference between ++x and x++?',
          options: [
            'No difference',
            '++x increments before use, x++ increments after use',
            '++x increments by 2, x++ increments by 1',
            '++x is faster'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: '++x (pre-increment) increments the value before using it in an expression. x++ (post-increment) uses the current value first, then increments.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'What will be the output: System.out.println(5 > 3 && 2 < 1);',
          options: [
            'true',
            'false',
            '1',
            'Compilation error'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'The && (AND) operator returns true only if both conditions are true. Here, 5 > 3 is true but 2 < 1 is false, so the result is false.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'What is the result of: 10 / 3 (integer division)',
          options: [
            '3.33',
            '3.0',
            '3',
            '4'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'When dividing two integers, Java performs integer division and truncates the decimal part. 10 / 3 = 3 (not 3.33).'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'Which operator has the highest precedence?',
          options: [
            '+',
            '*',
            '()',
            '=='
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'medium',
          explanation: 'Parentheses () have the highest precedence in Java, followed by multiplication/division, then addition/subtraction, then comparison operators.'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'What is the output: int a = 10; a += 5; System.out.println(a);',
          options: [
            '10',
            '15',
            '5',
            '105'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'The += operator is shorthand for a = a + 5. So a becomes 10 + 5 = 15.'
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
          question: 'Explain short-circuit evaluation in logical operators with an example.',
          sampleAnswer: 'Short-circuit evaluation means that in logical AND (&&) and OR (||) operations, Java stops evaluating as soon as the result is determined. For example, in (false && x > 5), x > 5 is never evaluated because false && anything is always false. Similarly, in (true || x > 5), x > 5 is not evaluated because true || anything is always true.',
          points: 3,
          difficulty: 'medium',
          keywords: ['short-circuit', 'AND', 'OR', 'evaluation', 'stops', 'determined']
        },
        {
          id: 'q9',
          type: 'short',
          question: 'What is the difference between / (division) and % (modulus) operators?',
          sampleAnswer: 'The division operator (/) returns the quotient of dividing two numbers. For integers, it performs integer division and truncates the decimal. The modulus operator (%) returns the remainder after division. For example: 10 / 3 = 3 (quotient), while 10 % 3 = 1 (remainder).',
          points: 3,
          difficulty: 'easy',
          keywords: ['division', 'quotient', 'modulus', 'remainder', 'truncate']
        }
      ]
    },
    {
      id: 'section-c',
      title: 'Coding Problems',
      questions: [
        {
          id: 'q10',
          type: 'short',
          question: 'Write a program that takes two integers and prints the result of all arithmetic operations (+, -, *, /, %).',
          sampleAnswer: `public class ArithmeticOperations {
    public static void main(String[] args) {
        int a = 20;
        int b = 6;
        
        System.out.println("a = " + a + ", b = " + b);
        System.out.println("Addition: " + (a + b));
        System.out.println("Subtraction: " + (a - b));
        System.out.println("Multiplication: " + (a * b));
        System.out.println("Division: " + (a / b));
        System.out.println("Modulus: " + (a % b));
    }
}`,
          points: 5,
          difficulty: 'easy',
          keywords: ['addition', 'subtraction', 'multiplication', 'division', 'modulus', 'operators']
        },
        {
          id: 'q11',
          type: 'short',
          question: 'Write a program to check if a number is even or odd using the modulus operator.',
          sampleAnswer: `public class EvenOdd {
    public static void main(String[] args) {
        int number = 15;
        
        if (number % 2 == 0) {
            System.out.println(number + " is even");
        } else {
            System.out.println(number + " is odd");
        }
    }
}`,
          points: 5,
          difficulty: 'easy',
          keywords: ['modulus', 'even', 'odd', 'if', 'else', 'remainder']
        },
        {
          id: 'q12',
          type: 'short',
          question: 'Write a program to swap two numbers without using a third variable.',
          sampleAnswer: `public class SwapNumbers {
    public static void main(String[] args) {
        int a = 10;
        int b = 20;
        
        System.out.println("Before swap: a = " + a + ", b = " + b);
        
        a = a + b;  // a = 30
        b = a - b;  // b = 10
        a = a - b;  // a = 20
        
        System.out.println("After swap: a = " + a + ", b = " + b);
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['swap', 'without', 'third', 'variable', 'arithmetic']
        }
      ]
    }
  ]
};