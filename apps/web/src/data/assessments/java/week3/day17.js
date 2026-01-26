export default {
  title: "Day 17: Exception Handling - Part 1 Assessment",
  description: "Test your understanding of exceptions, try-catch-finally blocks, and basic exception handling",
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
          question: 'What is an exception?',
          options: [
            'A syntax error',
            'A runtime error',
            'A logical error',
            'A warning'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'An exception is an event that occurs during program execution that disrupts the normal flow. It\'s a runtime error that can be handled.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'Which block contains code that might throw an exception?',
          options: [
            'catch',
            'try',
            'finally',
            'throw'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'The try block contains code that might throw an exception. It\'s followed by catch blocks to handle exceptions.'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'Which block handles the exception?',
          options: [
            'try',
            'catch',
            'finally',
            'throw'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'The catch block handles exceptions. It specifies the exception type to catch and contains code to handle it.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'Does the finally block always execute?',
          options: [
            'Yes',
            'No',
            'Only if exception occurs',
            'Only if no exception'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'medium',
          explanation: 'The finally block always executes, whether an exception occurs or not. It\'s used for cleanup code like closing resources.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'What happens if an exception is not handled?',
          options: [
            'Program continues',
            'Program terminates',
            'Exception is ignored',
            'Nothing'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'If an exception is not handled, the program terminates abnormally and prints the stack trace.'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'Can you have multiple catch blocks?',
          options: [
            'No',
            'Yes',
            'Only two',
            'Only with multiple try blocks'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Yes, you can have multiple catch blocks to handle different types of exceptions. They are checked in order from top to bottom.'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'Which keyword is used to manually throw an exception?',
          options: [
            'throws',
            'throw',
            'try',
            'catch'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'The throw keyword is used to manually throw an exception. throws is used in method signature to declare exceptions.'
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
          question: 'Explain the purpose of try, catch, and finally blocks.',
          sampleAnswer: 'try block contains code that might throw an exception. catch block handles the exception if it occurs - you can have multiple catch blocks for different exception types. finally block always executes regardless of whether exception occurred, used for cleanup operations like closing files or database connections. Order: try → catch → finally.',
          points: 3,
          difficulty: 'easy',
          keywords: ['try', 'catch', 'finally', 'exception', 'handle', 'cleanup', 'always']
        },
        {
          id: 'q9',
          type: 'short',
          question: 'What is the difference between throw and throws?',
          sampleAnswer: 'throw is used to explicitly throw an exception from code (throw new Exception()). throws is used in method signature to declare that method might throw exceptions (public void method() throws IOException). throw is followed by exception object, throws is followed by exception class names. throw is used inside method body, throws is used in method declaration.',
          points: 3,
          difficulty: 'medium',
          keywords: ['throw', 'throws', 'exception', 'method signature', 'declare', 'explicit']
        },
        {
          id: 'q10',
          type: 'short',
          question: 'What is try-with-resources? What advantage does it provide?',
          sampleAnswer: 'Try-with-resources automatically closes resources (files, connections) that implement AutoCloseable interface. Syntax: try (Resource r = new Resource()) { }. Advantage: no need for explicit finally block to close resources, cleaner code, prevents resource leaks. Resources are closed automatically in reverse order of creation, even if exception occurs.',
          points: 3,
          difficulty: 'medium',
          keywords: ['try-with-resources', 'AutoCloseable', 'automatic', 'close', 'cleanup', 'resource leak']
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
          question: 'Write a program that handles ArithmeticException when dividing by zero.',
          sampleAnswer: `public class DivisionExample {
    public static void main(String[] args) {
        int a = 10;
        int b = 0;
        
        try {
            int result = a / b;
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Error: Cannot divide by zero!");
            System.out.println("Exception: " + e.getMessage());
        }
        
        System.out.println("Program continues...");
    }
}`,
          points: 5,
          difficulty: 'easy',
          keywords: ['try', 'catch', 'ArithmeticException', 'divide by zero', 'handle']
        },
        {
          id: 'q12',
          type: 'short',
          question: 'Write a program with multiple catch blocks to handle different exceptions (ArithmeticException, ArrayIndexOutOfBoundsException).',
          sampleAnswer: `public class MultipleCatch {
    public static void main(String[] args) {
        try {
            int[] arr = {1, 2, 3};
            
            // This might throw ArithmeticException
            int result = 10 / 0;
            
            // This might throw ArrayIndexOutOfBoundsException
            System.out.println(arr[5]);
            
        } catch (ArithmeticException e) {
            System.out.println("ArithmeticException caught!");
            System.out.println("Error: " + e.getMessage());
            
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("ArrayIndexOutOfBoundsException caught!");
            System.out.println("Error: " + e.getMessage());
            
        } catch (Exception e) {
            System.out.println("General exception caught!");
            System.out.println("Error: " + e.getMessage());
        }
        
        System.out.println("Program continues after exception handling");
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['multiple catch', 'ArithmeticException', 'ArrayIndexOutOfBoundsException', 'Exception', 'handle']
        },
        {
          id: 'q13',
          type: 'short',
          question: 'Write a program demonstrating the finally block executes even when exception occurs.',
          sampleAnswer: `public class FinallyDemo {
    public static void main(String[] args) {
        System.out.println("Program started");
        
        try {
            System.out.println("Inside try block");
            int result = 10 / 0; // This will throw exception
            System.out.println("This line won't execute");
            
        } catch (ArithmeticException e) {
            System.out.println("Inside catch block");
            System.out.println("Exception caught: " + e.getMessage());
            
        } finally {
            System.out.println("Inside finally block");
            System.out.println("Finally always executes!");
        }
        
        System.out.println("Program ended");
        
        // Demonstrating finally with no exception
        System.out.println("\\n--- Second example (no exception) ---");
        try {
            System.out.println("Try block - no exception");
            int result = 10 / 2;
            System.out.println("Result: " + result);
            
        } catch (ArithmeticException e) {
            System.out.println("This won't execute");
            
        } finally {
            System.out.println("Finally executes even without exception!");
        }
    }
}`,
          points: 5,
          difficulty: 'easy',
          keywords: ['finally', 'always executes', 'try', 'catch', 'exception', 'cleanup']
        }
      ]
    }
  ]
};