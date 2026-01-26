export default {
  title: "Day 16: Packages & Static Keyword Assessment",
  description: "Test your understanding of packages, import statements, and static members",
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
          question: 'What is a package in Java?',
          options: [
            'A file',
            'A folder',
            'A namespace/grouping of classes',
            'A method'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'A package is a namespace that organizes related classes and interfaces. It helps avoid name conflicts and provides access control.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'Which statement must be first in a Java file?',
          options: [
            'import',
            'package',
            'class',
            'public'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'The package statement must be the first statement in a Java file (excluding comments). Import statements come after package.'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'What is the naming convention for packages?',
          options: [
            'UPPERCASE',
            'PascalCase',
            'camelCase',
            'lowercase'
          ],
          correctAnswer: 3,
          points: 2,
          difficulty: 'easy',
          explanation: 'Package names should be in lowercase to avoid conflicts with class names. Example: com.company.project'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'What does import java.util.* do?',
          options: [
            'Imports all packages',
            'Imports all classes from java.util',
            'Imports nothing',
            'Causes error'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'The * wildcard imports all classes from the java.util package, but not sub-packages. It does not import all packages.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'Can static methods access instance variables?',
          options: [
            'Yes',
            'No',
            'Only with this keyword',
            'Only with super keyword'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'No, static methods cannot access instance variables directly because they belong to the class, not to any specific object.'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'Can you call a static method without creating an object?',
          options: [
            'No',
            'Yes',
            'Only in main method',
            'Only with new keyword'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Yes, static methods can be called using the class name without creating an object: ClassName.methodName()'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'When is a static block executed?',
          options: [
            'When object is created',
            'When class is loaded',
            'When main method runs',
            'Never'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Static blocks are executed when the class is loaded into memory, before any object creation or main method execution.'
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
          question: 'What is the purpose of packages in Java? Give at least three benefits.',
          sampleAnswer: '1) Organization - groups related classes together. 2) Name conflict avoidance - same class names can exist in different packages. 3) Access control - package-private access modifier. 4) Easier maintenance - logical grouping makes code easier to find and maintain. 5) Reusability - packages can be imported and reused across projects.',
          points: 3,
          difficulty: 'easy',
          keywords: ['organization', 'name conflict', 'access control', 'maintenance', 'reusability', 'grouping']
        },
        {
          id: 'q9',
          type: 'short',
          question: 'Explain the difference between instance variables and static variables.',
          sampleAnswer: 'Instance variables belong to objects - each object has its own copy. Created when object is created, destroyed when object is destroyed. Static variables belong to the class - shared by all objects. Only one copy exists regardless of number of objects. Created when class loads, destroyed when program ends. Static variables are accessed using class name.',
          points: 3,
          difficulty: 'medium',
          keywords: ['instance', 'static', 'object', 'class', 'shared', 'copy', 'belong']
        },
        {
          id: 'q10',
          type: 'short',
          question: 'Why is the main method static in Java?',
          sampleAnswer: 'The main method is static so JVM can call it without creating an object of the class. When program starts, no objects exist yet. Static allows JVM to invoke main() using the class name directly. This provides the entry point for program execution without requiring object instantiation first.',
          points: 3,
          difficulty: 'medium',
          keywords: ['static', 'main', 'JVM', 'object', 'entry point', 'without creating']
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
          question: 'Create a package com.company.utils and create a MathUtils class with static methods for basic operations.',
          sampleAnswer: `package com.company.utils;

public class MathUtils {
    // Static method for addition
    public static int add(int a, int b) {
        return a + b;
    }
    
    // Static method for subtraction
    public static int subtract(int a, int b) {
        return a - b;
    }
    
    // Static method for multiplication
    public static int multiply(int a, int b) {
        return a * b;
    }
    
    // Static method for division
    public static double divide(int a, int b) {
        if (b == 0) {
            throw new ArithmeticException("Cannot divide by zero");
        }
        return (double) a / b;
    }
    
    // Static method to find maximum
    public static int max(int a, int b) {
        return (a > b) ? a : b;
    }
}

// Usage in another class
import com.company.utils.MathUtils;

public class TestMathUtils {
    public static void main(String[] args) {
        System.out.println("Add: " + MathUtils.add(10, 5));
        System.out.println("Subtract: " + MathUtils.subtract(10, 5));
        System.out.println("Multiply: " + MathUtils.multiply(10, 5));
        System.out.println("Divide: " + MathUtils.divide(10, 5));
        System.out.println("Max: " + MathUtils.max(10, 5));
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['package', 'static', 'methods', 'MathUtils', 'import', 'utility']
        },
        {
          id: 'q12',
          type: 'short',
          question: 'Create a Counter class with a static variable to count how many objects have been created.',
          sampleAnswer: `public class Counter {
    private static int count = 0; // Static variable shared by all objects
    private int id;
    
    public Counter() {
        count++; // Increment count when object is created
        this.id = count;
    }
    
    public static int getCount() {
        return count;
    }
    
    public int getId() {
        return id;
    }
    
    public void display() {
        System.out.println("Object ID: " + id);
        System.out.println("Total objects created: " + count);
    }
    
    public static void main(String[] args) {
        System.out.println("Initial count: " + Counter.getCount());
        
        Counter c1 = new Counter();
        c1.display();
        
        Counter c2 = new Counter();
        c2.display();
        
        Counter c3 = new Counter();
        c3.display();
        
        System.out.println("\\nFinal count: " + Counter.getCount());
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['static', 'variable', 'count', 'objects', 'shared', 'constructor']
        },
        {
          id: 'q13',
          type: 'short',
          question: 'Demonstrate the execution order of static blocks, constructors, and instance blocks.',
          sampleAnswer: `public class ExecutionOrder {
    // Static variable
    static int staticVar = 10;
    
    // Instance variable
    int instanceVar = 20;
    
    // Static block - executes when class is loaded
    static {
        System.out.println("1. Static block executed");
        System.out.println("   Static variable: " + staticVar);
    }
    
    // Instance block - executes before constructor
    {
        System.out.println("3. Instance block executed");
        System.out.println("   Instance variable: " + instanceVar);
    }
    
    // Constructor
    public ExecutionOrder() {
        System.out.println("4. Constructor executed");
    }
    
    public static void main(String[] args) {
        System.out.println("2. Main method started");
        
        System.out.println("\\nCreating first object:");
        ExecutionOrder obj1 = new ExecutionOrder();
        
        System.out.println("\\nCreating second object:");
        ExecutionOrder obj2 = new ExecutionOrder();
    }
}

/* Output:
1. Static block executed
   Static variable: 10
2. Main method started

Creating first object:
3. Instance block executed
   Instance variable: 20
4. Constructor executed

Creating second object:
3. Instance block executed
   Instance variable: 20
4. Constructor executed
*/`,
          points: 5,
          difficulty: 'hard',
          keywords: ['static block', 'instance block', 'constructor', 'execution order', 'class loading']
        }
      ]
    }
  ]
};