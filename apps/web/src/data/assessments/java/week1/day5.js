export default {
  title: "Day 5: Control Flow - Loops Assessment",
  description: "Test your understanding of for, while, do-while loops, and loop control statements",
  passingScore: 70,
  timeLimit: 35, // minutes
  modes: {
    quick: {
      questionCount: 10,
      timeLimit: 18,
      sections: ['section-a', 'section-b']
    },
    full: {
      questionCount: 13,
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
          question: 'What is the output of:\n```java\nfor(int i = 0; i < 3; i++) {\n    System.out.print(i + " ");\n}\n```',
          options: [
            '0 1 2',
            '1 2 3',
            '0 1 2 3',
            '1 2'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'easy',
          explanation: 'The loop starts at i=0, continues while i<3, and increments i after each iteration. It prints 0, 1, 2 (stops before 3).'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'Which loop guarantees at least one execution?',
          options: [
            'while',
            'for',
            'do-while',
            'All of them'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'do-while loop checks the condition after executing the loop body, so it always executes at least once, even if the condition is initially false.'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'What does the break statement do?',
          options: [
            'Exits the loop',
            'Skips current iteration',
            'Restarts the loop',
            'Does nothing'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'easy',
          explanation: 'The break statement immediately exits the loop, terminating its execution regardless of the loop condition.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'What does the continue statement do?',
          options: [
            'Exits the loop',
            'Skips to next iteration',
            'Restarts the loop',
            'Continues to next line'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'The continue statement skips the remaining code in the current iteration and moves to the next iteration of the loop.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'What is an infinite loop?',
          options: [
            'A loop that never starts',
            'A loop that never ends',
            'A loop with no body',
            'A loop with break'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'An infinite loop is a loop whose condition never becomes false, causing it to run indefinitely (e.g., while(true)).'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'How many times will this loop execute?\n```java\nint i = 5;\nwhile(i < 5) {\n    i++;\n}\n```',
          options: [
            '0',
            '1',
            '5',
            'Infinite'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'medium',
          explanation: 'The condition i < 5 is false from the start (i is 5), so the loop body never executes. It runs 0 times.'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'What is the enhanced for loop used for?',
          options: [
            'Mathematical calculations',
            'Iterating arrays/collections',
            'Conditional logic',
            'Method calls'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'The enhanced for loop (for-each) is specifically designed for iterating through arrays and collections in a simplified way.'
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
          question: 'Explain the difference between while and do-while loops.',
          sampleAnswer: 'while loop checks the condition before executing the loop body, so it may not execute at all if the condition is initially false. do-while loop executes the body first, then checks the condition, guaranteeing at least one execution. Syntax: while(condition) { } vs do { } while(condition);',
          points: 3,
          difficulty: 'easy',
          keywords: ['while', 'do-while', 'condition', 'before', 'after', 'at least once']
        },
        {
          id: 'q9',
          type: 'short',
          question: 'What is the purpose of the continue statement? Give an example where it\'s useful.',
          sampleAnswer: 'continue skips the rest of the current iteration and moves to the next one. Useful example: when processing a list of numbers, use continue to skip negative numbers without processing them. This avoids nested if statements and makes code cleaner. For example, in a loop printing positive numbers, continue can skip negatives.',
          points: 3,
          difficulty: 'medium',
          keywords: ['continue', 'skip', 'iteration', 'next', 'avoid', 'nested']
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
          question: 'Write a program to print all numbers from 1 to 100.',
          sampleAnswer: `public class PrintNumbers {
    public static void main(String[] args) {
        for (int i = 1; i <= 100; i++) {
            System.out.println(i);
        }
    }
}`,
          points: 5,
          difficulty: 'easy',
          keywords: ['for', 'loop', '1 to 100', 'print', 'numbers']
        },
        {
          id: 'q11',
          type: 'short',
          question: 'Write a program to calculate the factorial of a number (e.g., 5! = 5*4*3*2*1 = 120).',
          sampleAnswer: `public class Factorial {
    public static void main(String[] args) {
        int number = 5;
        int factorial = 1;
        
        for (int i = 1; i <= number; i++) {
            factorial *= i;
        }
        
        System.out.println("Factorial of " + number + " = " + factorial);
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['factorial', 'multiplication', 'loop', 'accumulator']
        },
        {
          id: 'q12',
          type: 'short',
          question: 'Write a program to print the Fibonacci series up to 10 terms (0, 1, 1, 2, 3, 5, 8, 13, 21, 34).',
          sampleAnswer: `public class Fibonacci {
    public static void main(String[] args) {
        int n = 10;
        int first = 0, second = 1;
        
        System.out.print("Fibonacci Series: ");
        for (int i = 1; i <= n; i++) {
            System.out.print(first + " ");
            int next = first + second;
            first = second;
            second = next;
        }
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['fibonacci', 'series', 'sequence', 'loop', 'two variables']
        },
        {
          id: 'q13',
          type: 'short',
          question: 'Write a program to print this pattern:\n```\n*\n**\n***\n****\n*****\n```',
          sampleAnswer: `public class StarPattern {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['pattern', 'nested loop', 'star', 'print', 'rows']
        }
      ]
    }
  ]
};