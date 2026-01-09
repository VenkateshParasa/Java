export default {
  title: "Day 10: Methods & Method Overloading Assessment",
  description: "Test your understanding of methods, method overloading, varargs, and pass-by-value",
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
          question: 'What is method overloading?',
          options: [
            'Having multiple methods with same name but different parameters',
            'Having multiple methods with different names',
            'Having methods in different classes',
            'Having static methods'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'easy',
          explanation: 'Method overloading is having multiple methods with the same name but different parameter lists (number, type, or order of parameters).'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'Can methods be overloaded by changing only the return type?',
          options: [
            'Yes',
            'No',
            'Sometimes',
            'Only for void methods'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'No, methods cannot be overloaded by changing only the return type. The parameter list must be different.'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'What is a varargs parameter?',
          options: [
            'Variable arguments',
            'Array parameter',
            'Multiple parameters',
            'Optional parameter'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'easy',
          explanation: 'Varargs (variable arguments) allows a method to accept zero or more arguments of a specified type. It\'s treated as an array internally.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'What is the syntax for varargs?',
          options: [
            'type... name',
            'type[] name',
            '...type name',
            'type name...'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'easy',
          explanation: 'Varargs syntax is: type... name (e.g., int... numbers). The three dots (...) indicate variable arguments.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'Can a method have multiple varargs parameters?',
          options: [
            'Yes, any number',
            'No, only one',
            'Yes, but only two',
            'No varargs allowed'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'A method can have only one varargs parameter, and it must be the last parameter in the parameter list.'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'What happens when you call a method without return statement (non-void)?',
          options: [
            'Returns null',
            'Returns 0',
            'Compilation error',
            'Runtime error'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'medium',
          explanation: 'If a non-void method doesn\'t have a return statement on all code paths, it causes a compilation error.'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'Is Java pass-by-value or pass-by-reference?',
          options: [
            'Pass-by-value',
            'Pass-by-reference',
            'Both',
            'Depends on type'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'medium',
          explanation: 'Java is strictly pass-by-value. For objects, the value of the reference (memory address) is passed, not the object itself.'
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
          question: 'Explain method overloading with an example. What are the rules for overloading?',
          sampleAnswer: 'Method overloading is having multiple methods with the same name but different parameters. Example: add(int a, int b), add(double a, double b), add(int a, int b, int c). Rules: 1) Must have different parameter lists (number, type, or order). 2) Return type alone cannot differentiate. 3) Access modifiers can be different. 4) Can throw different exceptions.',
          points: 3,
          difficulty: 'medium',
          keywords: ['overloading', 'same name', 'different parameters', 'rules', 'parameter list']
        },
        {
          id: 'q9',
          type: 'short',
          question: 'What is the difference between a method and a function in Java?',
          sampleAnswer: 'In Java, there are no standalone functions - all functions are methods that belong to a class. A method is a function defined inside a class. The terms are often used interchangeably, but technically Java only has methods. Methods operate on objects and can access instance variables, while functions in other languages can exist independently.',
          points: 3,
          difficulty: 'easy',
          keywords: ['method', 'function', 'class', 'belong', 'no standalone', 'Java']
        },
        {
          id: 'q10',
          type: 'short',
          question: 'Explain pass-by-value in Java. What happens when you pass objects?',
          sampleAnswer: 'Java is pass-by-value, meaning a copy of the value is passed to methods. For primitives, the actual value is copied. For objects, the value of the reference (memory address) is copied, not the object itself. This means you can modify the object\'s contents through the reference, but you cannot change which object the original reference points to.',
          points: 3,
          difficulty: 'hard',
          keywords: ['pass-by-value', 'copy', 'primitives', 'objects', 'reference', 'memory address']
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
          question: 'Create a Calculator class with overloaded add() methods: add(int, int), add(double, double), add(int, int, int).',
          sampleAnswer: `public class Calculator {
    // Add two integers
    int add(int a, int b) {
        return a + b;
    }
    
    // Add two doubles
    double add(double a, double b) {
        return a + b;
    }
    
    // Add three integers
    int add(int a, int b, int c) {
        return a + b + c;
    }
    
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        
        System.out.println("5 + 3 = " + calc.add(5, 3));
        System.out.println("5.5 + 3.2 = " + calc.add(5.5, 3.2));
        System.out.println("5 + 3 + 2 = " + calc.add(5, 3, 2));
    }
}`,
          points: 5,
          difficulty: 'easy',
          keywords: ['overloading', 'add', 'Calculator', 'int', 'double', 'return']
        },
        {
          id: 'q12',
          type: 'short',
          question: 'Create a method that takes varargs to calculate the sum of any number of integers.',
          sampleAnswer: `public class VarargsDemo {
    // Method with varargs
    int sum(int... numbers) {
        int total = 0;
        for (int num : numbers) {
            total += num;
        }
        return total;
    }
    
    public static void main(String[] args) {
        VarargsDemo demo = new VarargsDemo();
        
        System.out.println("Sum of 5, 10: " + demo.sum(5, 10));
        System.out.println("Sum of 1, 2, 3, 4, 5: " + demo.sum(1, 2, 3, 4, 5));
        System.out.println("Sum of 10, 20, 30, 40, 50, 60: " + demo.sum(10, 20, 30, 40, 50, 60));
        System.out.println("Sum of no numbers: " + demo.sum());
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['varargs', 'sum', 'int...', 'variable arguments', 'loop']
        },
        {
          id: 'q13',
          type: 'short',
          question: 'Create a StringUtils class with methods: reverse(String), isPalindrome(String), countVowels(String).',
          sampleAnswer: `public class StringUtils {
    // Reverse a string
    String reverse(String str) {
        String reversed = "";
        for (int i = str.length() - 1; i >= 0; i--) {
            reversed += str.charAt(i);
        }
        return reversed;
    }
    
    // Check if string is palindrome
    boolean isPalindrome(String str) {
        String reversed = reverse(str);
        return str.equals(reversed);
    }
    
    // Count vowels in string
    int countVowels(String str) {
        int count = 0;
        str = str.toLowerCase();
        for (int i = 0; i < str.length(); i++) {
            char ch = str.charAt(i);
            if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
                count++;
            }
        }
        return count;
    }
    
    public static void main(String[] args) {
        StringUtils utils = new StringUtils();
        
        String text = "radar";
        System.out.println("Original: " + text);
        System.out.println("Reversed: " + utils.reverse(text));
        System.out.println("Is Palindrome: " + utils.isPalindrome(text));
        System.out.println("Vowel Count: " + utils.countVowels(text));
        
        System.out.println();
        
        String text2 = "hello";
        System.out.println("Original: " + text2);
        System.out.println("Reversed: " + utils.reverse(text2));
        System.out.println("Is Palindrome: " + utils.isPalindrome(text2));
        System.out.println("Vowel Count: " + utils.countVowels(text2));
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['String', 'reverse', 'palindrome', 'vowels', 'methods', 'utility']
        }
      ]
    }
  ]
};