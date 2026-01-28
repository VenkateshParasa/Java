// Day 3: Operators & Expressions - Medium Assessment
export default {
  title: "Day 3: Operators & Expressions - Medium Assessment",
  difficulty: "medium",
  passingScore: 70,
  timeLimit: 30,
  sections: [
    {
      id: 'section-a',
      title: 'Section A: Multiple Choice Questions',
      description: 'Choose the best answer for each question',
      questions: [
        {
          id: 'q1',
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
          id: 'q2',
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
          id: 'q3',
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
          id: 'q4',
          type: 'mcq',
          question: 'What is the output: int x = 5; System.out.println(x++ + ++x);',
          options: [
            '11',
            '12',
            '13',
            '10'
          ],
          correctAnswer: 1,
          points: 3,
          difficulty: 'medium',
          explanation: 'x++ uses 5, then x becomes 6. ++x increments x to 7 first, then uses 7. Total: 5 + 7 = 12.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'What is the result of: 10 / 4 * 2.0',
          options: [
            '5.0',
            '4.0',
            '5',
            '1.25'
          ],
          correctAnswer: 1,
          points: 3,
          difficulty: 'medium',
          explanation: 'Operations are left-to-right: 10 / 4 = 2 (integer division), then 2 * 2.0 = 4.0 (converted to double).'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'What does the expression (x > y) ? x : y represent?',
          options: [
            'Returns the smaller of x and y',
            'Returns the larger of x and y',
            'Returns x only',
            'Returns y only'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'This is the ternary operator. It returns x if x > y is true, otherwise returns y. So it returns the larger value.'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'What is the output: System.out.println(true || false && false);',
          options: [
            'true',
            'false',
            'Compilation error',
            'Runtime error'
          ],
          correctAnswer: 0,
          points: 3,
          difficulty: 'medium',
          explanation: '&& has higher precedence than ||. So false && false = false, then true || false = true.'
        },
        {
          id: 'q8',
          type: 'mcq',
          question: 'What is the value of: 15 % 4',
          options: [
            '3',
            '3.75',
            '4',
            '0'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'medium',
          explanation: '15 divided by 4 is 3 with remainder 3. The modulus operator returns the remainder.'
        },
        {
          id: 'q9',
          type: 'mcq',
          question: 'What will happen: int a = 5; int b = 0; int c = a / b;',
          options: [
            'c will be 0',
            'c will be infinity',
            'ArithmeticException',
            'Compilation error'
          ],
          correctAnswer: 2,
          points: 3,
          difficulty: 'medium',
          explanation: 'Division by zero with integers throws ArithmeticException at runtime (not a compilation error).'
        },
        {
          id: 'q10',
          type: 'mcq',
          question: 'What is the output: System.out.println(5 << 1);',
          options: [
            '5',
            '10',
            '2',
            '6'
          ],
          correctAnswer: 1,
          points: 3,
          difficulty: 'medium',
          explanation: 'The << (left shift) operator shifts bits left. 5 in binary is 101, shifting left by 1 gives 1010 which is 10 in decimal. This is equivalent to multiplying by 2.'
        }
      ]
    },
    {
      id: 'section-b',
      title: 'Section B: Short Answer Questions',
      description: 'Provide brief answers to the following questions',
      questions: [
        {
          id: 'q11',
          type: 'shortanswer',
          question: 'Explain short-circuit evaluation in logical operators with an example.',
          sampleAnswer: 'Short-circuit evaluation means that in logical AND (&&) and OR (||) operations, Java stops evaluating as soon as the result is determined. For example, in (false && x > 5), x > 5 is never evaluated because false && anything is always false. Similarly, in (true || x > 5), x > 5 is not evaluated because true || anything is always true.',
          keywords: ['short-circuit', 'AND', 'OR', 'evaluation', 'stops', 'determined'],
          minKeywords: 3,
          points: 4,
          difficulty: 'medium',
          explanation: 'Short-circuit evaluation optimizes performance by avoiding unnecessary evaluations and can prevent runtime errors when the second operand might cause exceptions.'
        },
        {
          id: 'q12',
          type: 'shortanswer',
          question: 'What is operator precedence and why is it important? Give an example.',
          sampleAnswer: 'Operator precedence determines the order in which operators are evaluated in an expression. It is important because it affects the final result. For example, in the expression 5 + 3 * 2, multiplication has higher precedence than addition, so 3 * 2 is evaluated first (6), then added to 5, giving 11. Without precedence rules, we might incorrectly evaluate left-to-right and get 16.',
          keywords: ['precedence', 'order', 'evaluation', 'multiplication', 'addition', 'hierarchy'],
          minKeywords: 3,
          points: 4,
          difficulty: 'medium',
          explanation: 'Understanding operator precedence is crucial for writing correct expressions and avoiding bugs caused by unexpected evaluation order.'
        },
        {
          id: 'q13',
          type: 'shortanswer',
          question: 'Explain the difference between & and && operators in Java.',
          sampleAnswer: '& is a bitwise AND operator that operates on individual bits and always evaluates both operands. && is a logical AND operator used for boolean expressions that uses short-circuit evaluation, meaning the second operand is not evaluated if the first is false. For example: (false && someMethod()) will not call someMethod(), but (false & someMethod()) will call it.',
          keywords: ['bitwise', 'logical', 'short-circuit', 'boolean', 'evaluate', 'both', 'operands'],
          minKeywords: 3,
          points: 4,
          difficulty: 'medium',
          explanation: '& is used for bit manipulation while && is used for logical operations. && is more efficient for boolean logic due to short-circuiting.'
        }
      ]
    },
    {
      id: 'section-c',
      title: 'Section C: Coding Problems',
      description: 'Write code to solve the following problems',
      questions: [
        {
          id: 'q14',
          type: 'shortanswer',
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
          keywords: ['swap', 'without', 'third', 'variable', 'arithmetic', 'addition', 'subtraction'],
          minKeywords: 3,
          points: 5,
          difficulty: 'medium',
          explanation: 'This technique uses arithmetic operations to swap values without needing a temporary variable.'
        },
        {
          id: 'q15',
          type: 'shortanswer',
          question: 'Write a program to demonstrate the difference between pre-increment and post-increment operators.',
          sampleAnswer: `public class IncrementDemo {
    public static void main(String[] args) {
        int x = 5;
        int y = 5;

        // Post-increment: use then increment
        System.out.println("Post-increment:");
        System.out.println("x = " + x);
        System.out.println("x++ = " + (x++));  // prints 5
        System.out.println("x after = " + x);  // prints 6

        System.out.println();

        // Pre-increment: increment then use
        System.out.println("Pre-increment:");
        System.out.println("y = " + y);
        System.out.println("++y = " + (++y));  // prints 6
        System.out.println("y after = " + y);  // prints 6
    }
}`,
          keywords: ['pre-increment', 'post-increment', '++', 'before', 'after', 'difference'],
          minKeywords: 3,
          points: 5,
          difficulty: 'medium',
          explanation: 'Post-increment uses the value before incrementing, while pre-increment increments first then uses the new value.'
        },
        {
          id: 'q16',
          type: 'shortanswer',
          question: 'Write a program to demonstrate operator precedence with arithmetic and logical operators.',
          sampleAnswer: `public class OperatorPrecedence {
    public static void main(String[] args) {
        // Arithmetic precedence
        int result1 = 5 + 3 * 2;  // 11, not 16
        System.out.println("5 + 3 * 2 = " + result1);

        int result2 = (5 + 3) * 2;  // 16, parentheses override
        System.out.println("(5 + 3) * 2 = " + result2);

        // Logical precedence
        boolean result3 = true || false && false;  // true
        System.out.println("true || false && false = " + result3);

        boolean result4 = (true || false) && false;  // false
        System.out.println("(true || false) && false = " + result4);

        // Mixed precedence
        boolean result5 = 5 + 3 > 7 && 10 / 2 == 5;  // true
        System.out.println("5 + 3 > 7 && 10 / 2 == 5 = " + result5);
    }
}`,
          keywords: ['precedence', 'arithmetic', 'logical', 'parentheses', 'order', 'evaluation'],
          minKeywords: 3,
          points: 5,
          difficulty: 'medium',
          explanation: 'Demonstrates how operator precedence affects expression evaluation and how parentheses can override default precedence.'
        }
      ]
    }
  ]
};
