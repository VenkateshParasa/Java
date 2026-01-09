export default {
  title: "Day 18: Exception Handling - Part 2 Assessment",
  description: "Test your understanding of checked/unchecked exceptions, custom exceptions, and exception propagation",
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
          question: 'What are checked exceptions?',
          options: [
            'Exceptions checked at runtime',
            'Exceptions checked at compile time',
            'Syntax errors',
            'Logical errors'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Checked exceptions are checked at compile time. The compiler forces you to handle them using try-catch or declare them with throws.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'Which is a checked exception?',
          options: [
            'NullPointerException',
            'ArithmeticException',
            'IOException',
            'ArrayIndexOutOfBoundsException'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'medium',
          explanation: 'IOException is a checked exception. NullPointerException, ArithmeticException, and ArrayIndexOutOfBoundsException are unchecked exceptions.'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'Which is an unchecked exception?',
          options: [
            'IOException',
            'SQLException',
            'NullPointerException',
            'ClassNotFoundException'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'NullPointerException is an unchecked exception (RuntimeException). IOException, SQLException, and ClassNotFoundException are checked exceptions.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'How do you create a custom exception?',
          options: [
            'Extend Exception class',
            'Implement Exception interface',
            'Use exception keyword',
            'Cannot create custom exceptions'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'easy',
          explanation: 'Custom exceptions are created by extending the Exception class (for checked) or RuntimeException class (for unchecked).'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'What is the parent class of all exceptions?',
          options: [
            'Exception',
            'Throwable',
            'Object',
            'RuntimeException'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Throwable is the parent class of all exceptions and errors. Exception and Error both extend Throwable.'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'What is the difference between Error and Exception?',
          options: [
            'No difference',
            'Error is serious and not recoverable',
            'Exception is serious',
            'Error is syntax error'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Errors are serious problems (OutOfMemoryError, StackOverflowError) that applications should not try to catch. Exceptions are conditions that applications can handle.'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'Can you throw multiple exceptions from a method?',
          options: [
            'No',
            'Yes, using throws keyword',
            'Only two exceptions',
            'Only unchecked exceptions'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Yes, a method can declare multiple exceptions in its throws clause, separated by commas: throws IOException, SQLException'
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
          question: 'Explain the difference between checked and unchecked exceptions with examples.',
          sampleAnswer: 'Checked exceptions are checked at compile time, must be handled or declared (IOException, SQLException, ClassNotFoundException). Compiler forces handling. Unchecked exceptions are checked at runtime, not required to handle (NullPointerException, ArithmeticException, ArrayIndexOutOfBoundsException). Extend RuntimeException. Checked for recoverable conditions, unchecked for programming errors.',
          points: 3,
          difficulty: 'medium',
          keywords: ['checked', 'unchecked', 'compile time', 'runtime', 'IOException', 'NullPointerException', 'handle']
        },
        {
          id: 'q9',
          type: 'short',
          question: 'What are some best practices for exception handling?',
          sampleAnswer: '1) Catch specific exceptions, not generic Exception. 2) Don\'t catch exceptions you can\'t handle. 3) Always clean up resources in finally or use try-with-resources. 4) Don\'t use exceptions for control flow. 5) Log exceptions with meaningful messages. 6) Don\'t swallow exceptions (empty catch blocks). 7) Create custom exceptions for application-specific errors.',
          points: 3,
          difficulty: 'medium',
          keywords: ['specific', 'cleanup', 'resources', 'log', 'custom', 'meaningful', 'best practices']
        },
        {
          id: 'q10',
          type: 'short',
          question: 'When should you create custom exceptions?',
          sampleAnswer: 'Create custom exceptions when: 1) Application has specific error conditions not covered by standard exceptions. 2) Need to add additional information to exceptions. 3) Want to group related exceptions under common parent. 4) Need business logic specific exceptions (InvalidAgeException, InsufficientBalanceException). Makes code more readable and maintainable.',
          points: 3,
          difficulty: 'medium',
          keywords: ['custom exception', 'specific', 'business logic', 'additional information', 'readable', 'when']
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
          question: 'Create a custom InvalidAgeException and use it to validate age (must be 18+).',
          sampleAnswer: `// Custom exception class
class InvalidAgeException extends Exception {
    public InvalidAgeException(String message) {
        super(message);
    }
}

public class AgeValidator {
    public static void validateAge(int age) throws InvalidAgeException {
        if (age < 18) {
            throw new InvalidAgeException("Age must be 18 or above. Provided: " + age);
        }
        System.out.println("Age is valid: " + age);
    }
    
    public static void main(String[] args) {
        try {
            validateAge(25); // Valid
            validateAge(15); // Invalid - throws exception
        } catch (InvalidAgeException e) {
            System.out.println("Error: " + e.getMessage());
        }
        
        System.out.println("Program continues...");
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['custom exception', 'extends Exception', 'throw', 'throws', 'validate', 'InvalidAgeException']
        },
        {
          id: 'q12',
          type: 'short',
          question: 'Create a method that throws IOException (checked exception) and handle it in the calling method.',
          sampleAnswer: `import java.io.*;

public class CheckedExceptionDemo {
    // Method that declares checked exception
    public static void readFile(String filename) throws IOException {
        FileReader file = new FileReader(filename);
        BufferedReader reader = new BufferedReader(file);
        
        String line = reader.readLine();
        System.out.println("First line: " + line);
        
        reader.close();
    }
    
    public static void main(String[] args) {
        try {
            // Must handle checked exception
            readFile("test.txt");
            System.out.println("File read successfully");
            
        } catch (FileNotFoundException e) {
            System.out.println("File not found: " + e.getMessage());
            
        } catch (IOException e) {
            System.out.println("IO Error: " + e.getMessage());
        }
        
        System.out.println("Program continues...");
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['IOException', 'checked exception', 'throws', 'FileReader', 'try-catch', 'handle']
        },
        {
          id: 'q13',
          type: 'short',
          question: 'Write a program demonstrating exception propagation through multiple methods.',
          sampleAnswer: `public class ExceptionPropagation {
    // Method 3 - throws exception
    public static void method3() {
        System.out.println("Method 3: Throwing exception");
        throw new ArithmeticException("Division by zero in method3");
    }
    
    // Method 2 - doesn't handle, propagates to caller
    public static void method2() {
        System.out.println("Method 2: Calling method3");
        method3(); // Exception propagates from here
        System.out.println("Method 2: This won't execute");
    }
    
    // Method 1 - doesn't handle, propagates to caller
    public static void method1() {
        System.out.println("Method 1: Calling method2");
        method2(); // Exception propagates from here
        System.out.println("Method 1: This won't execute");
    }
    
    public static void main(String[] args) {
        try {
            System.out.println("Main: Calling method1");
            method1(); // Exception propagates to here
            System.out.println("Main: This won't execute");
            
        } catch (ArithmeticException e) {
            System.out.println("\\nException caught in main!");
            System.out.println("Message: " + e.getMessage());
            System.out.println("\\nStack trace shows propagation:");
            e.printStackTrace();
        }
        
        System.out.println("\\nMain: Program continues after handling");
    }
}`,
          points: 5,
          difficulty: 'hard',
          keywords: ['exception propagation', 'multiple methods', 'call stack', 'throw', 'catch', 'printStackTrace']
        }
      ]
    }
  ]
};