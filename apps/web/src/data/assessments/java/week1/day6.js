export default {
  title: "Day 6: Arrays - Part 1 Assessment",
  description: "Test your understanding of array declaration, initialization, and basic operations",
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
          question: 'What is the index of the first element in an array?',
          options: [
            '-1',
            '0',
            '1',
            'Depends on declaration'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Arrays in Java are zero-indexed, meaning the first element is at index 0, second at index 1, and so on.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'How do you declare an integer array in Java?',
          options: [
            'int[] arr',
            'int arr[]',
            'Both A and B',
            'array int arr'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'Both int[] arr and int arr[] are valid array declaration syntaxes in Java. The first form is preferred as it clearly shows the type is "array of int".'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'What exception is thrown when accessing an invalid array index?',
          options: [
            'NullPointerException',
            'ArrayException',
            'ArrayIndexOutOfBoundsException',
            'IndexException'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'ArrayIndexOutOfBoundsException is thrown when trying to access an array element with an index that is negative or >= array length.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'How do you find the length of an array?',
          options: [
            'arr.length()',
            'arr.length',
            'arr.size()',
            'arr.size'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Array length is accessed using the length property (not a method), so arr.length is correct. Note: no parentheses.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'What is the default value of int array elements?',
          options: [
            'null',
            '0',
            '-1',
            'Garbage value'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'When an int array is created, all elements are automatically initialized to 0. Each primitive type has its own default value.'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'Which is the correct way to initialize an array with values?',
          options: [
            'int[] arr = {1, 2, 3};',
            'int[] arr = new int[]{1, 2, 3};',
            'Both A and B',
            'int[] arr = [1, 2, 3];'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'medium',
          explanation: 'Both syntaxes are valid. The first is shorthand for declaration and initialization together. The second can be used anywhere, including as a method argument.'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'Can the size of an array change after creation?',
          options: [
            'Yes',
            'No',
            'Only if using ArrayList',
            'Only with resize method'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Arrays have fixed size in Java. Once created, the size cannot be changed. For dynamic sizing, use ArrayList or other collection classes.'
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
          question: 'Explain the difference between array declaration and initialization.',
          sampleAnswer: 'Declaration creates a reference variable for an array (e.g., int[] arr;) but doesn\'t allocate memory. Initialization allocates memory and optionally assigns values (e.g., arr = new int[5]; or arr = {1,2,3};). Declaration tells the type, initialization creates the actual array object in memory.',
          points: 3,
          difficulty: 'medium',
          keywords: ['declaration', 'initialization', 'reference', 'memory', 'allocate', 'values']
        },
        {
          id: 'q9',
          type: 'short',
          question: 'What happens when you try to access an array element beyond its length?',
          sampleAnswer: 'An ArrayIndexOutOfBoundsException is thrown at runtime. This is an unchecked exception that occurs when trying to access an index that is negative or greater than or equal to the array\'s length. The program will crash unless the exception is caught and handled.',
          points: 3,
          difficulty: 'easy',
          keywords: ['ArrayIndexOutOfBoundsException', 'runtime', 'exception', 'crash', 'beyond', 'length']
        },
        {
          id: 'q10',
          type: 'short',
          question: 'Why is array.length a property and not a method?',
          sampleAnswer: 'length is a final instance variable (field) of the array object, not a method. It\'s stored as part of the array object when created and never changes. Making it a field provides direct access without method call overhead, improving performance. This is why we use arr.length (no parentheses) instead of arr.length().',
          points: 3,
          difficulty: 'medium',
          keywords: ['property', 'field', 'variable', 'final', 'performance', 'no parentheses']
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
          question: 'Write a program to find the maximum element in an array.',
          sampleAnswer: `public class MaxElement {
    public static void main(String[] args) {
        int[] arr = {45, 23, 67, 12, 89, 34};
        int max = arr[0];
        
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        
        System.out.println("Maximum element: " + max);
    }
}`,
          points: 5,
          difficulty: 'easy',
          keywords: ['maximum', 'max', 'array', 'loop', 'comparison']
        },
        {
          id: 'q12',
          type: 'short',
          question: 'Write a program to calculate the sum and average of array elements.',
          sampleAnswer: `public class SumAverage {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40, 50};
        int sum = 0;
        
        for (int i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        
        double average = (double) sum / arr.length;
        
        System.out.println("Sum: " + sum);
        System.out.println("Average: " + average);
    }
}`,
          points: 5,
          difficulty: 'easy',
          keywords: ['sum', 'average', 'array', 'loop', 'accumulator', 'division']
        },
        {
          id: 'q13',
          type: 'short',
          question: 'Write a program to reverse an array.',
          sampleAnswer: `public class ReverseArray {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        
        System.out.print("Original: ");
        for (int num : arr) {
            System.out.print(num + " ");
        }
        
        // Reverse using two pointers
        int left = 0, right = arr.length - 1;
        while (left < right) {
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            left++;
            right--;
        }
        
        System.out.print("\\nReversed: ");
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['reverse', 'array', 'swap', 'two pointers', 'temp']
        }
      ]
    }
  ]
};