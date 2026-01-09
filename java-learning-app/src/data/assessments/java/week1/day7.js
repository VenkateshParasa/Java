export default {
  title: "Day 7: Arrays - Part 2 & Week 1 Review Assessment",
  description: "Test your understanding of 2D arrays, Arrays utility class, and Week 1 concepts",
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
          question: 'How do you declare a 2D array?',
          options: [
            'int[][] arr',
            'int arr[][]',
            'Both A and B',
            'int[2D] arr'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'Both int[][] arr and int arr[][] are valid 2D array declaration syntaxes in Java.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'What is a jagged array?',
          options: [
            'Array with irregular rows',
            'Array with missing elements',
            '1D array only',
            'Sorted array'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'medium',
          explanation: 'A jagged array is a 2D array where each row can have a different number of columns. For example: int[][] arr = {{1,2}, {3,4,5}, {6}};'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'Which method sorts an array?',
          options: [
            'Array.sort()',
            'Arrays.sort()',
            'array.sort()',
            'sort(array)'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Arrays.sort() is the static method from java.util.Arrays class used to sort arrays. Note the plural "Arrays".'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'How do you access an element in a 2D array?',
          options: [
            'arr[row][col]',
            'arr[row, col]',
            'arr(row)(col)',
            'arr.get(row, col)'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'easy',
          explanation: '2D array elements are accessed using arr[row][col] syntax, where row is the first dimension and col is the second.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'What package contains the Arrays utility class?',
          options: [
            'java.lang',
            'java.util',
            'java.array',
            'java.io'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'The Arrays utility class is in the java.util package. You need to import java.util.Arrays to use it.'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'Which method converts an array to String?',
          options: [
            'array.toString()',
            'Arrays.toString(array)',
            'String.valueOf(array)',
            'array.toStr()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Arrays.toString(array) converts an array to a readable string format like "[1, 2, 3]". The array\'s own toString() returns a memory address.'
        }
      ]
    },
    {
      id: 'section-b',
      title: 'Short Answer Questions',
      questions: [
        {
          id: 'q7',
          type: 'short',
          question: 'Explain the difference between a regular 2D array and a jagged array.',
          sampleAnswer: 'A regular 2D array has the same number of columns in each row (rectangular structure), like int[][] arr = new int[3][4]; creates 3 rows with 4 columns each. A jagged array has different number of columns in each row, like int[][] arr = {{1,2}, {3,4,5,6}, {7}}; where rows have 2, 4, and 1 elements respectively.',
          points: 3,
          difficulty: 'medium',
          keywords: ['regular', 'jagged', 'rectangular', 'different', 'columns', 'rows']
        },
        {
          id: 'q8',
          type: 'short',
          question: 'List three useful methods from the Arrays utility class and what they do.',
          sampleAnswer: '1) Arrays.sort(arr) - sorts the array in ascending order. 2) Arrays.toString(arr) - converts array to readable string format. 3) Arrays.copyOf(arr, length) - creates a copy of the array with specified length. Other useful methods include fill(), equals(), and binarySearch().',
          points: 3,
          difficulty: 'easy',
          keywords: ['sort', 'toString', 'copyOf', 'fill', 'equals', 'binarySearch']
        },
        {
          id: 'q9',
          type: 'short',
          question: 'How do you copy an array? Mention at least two ways.',
          sampleAnswer: '1) Using Arrays.copyOf(original, length) - creates a new array copy. 2) Using System.arraycopy(src, srcPos, dest, destPos, length) - copies elements from one array to another. 3) Using clone() method: newArr = arr.clone(). 4) Manual copying using a loop. Arrays.copyOf is the most convenient method.',
          points: 3,
          difficulty: 'medium',
          keywords: ['copyOf', 'arraycopy', 'clone', 'loop', 'copy', 'System']
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
          question: 'Write a program to create a 3x3 matrix and print it.',
          sampleAnswer: `public class Matrix {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        System.out.println("3x3 Matrix:");
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }
    }
}`,
          points: 5,
          difficulty: 'easy',
          keywords: ['2D array', 'matrix', 'nested loop', 'print', 'rows', 'columns']
        },
        {
          id: 'q11',
          type: 'short',
          question: 'Write a program to find the sum of all elements in a 2D array.',
          sampleAnswer: `public class MatrixSum {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        int sum = 0;
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                sum += matrix[i][j];
            }
        }
        
        System.out.println("Sum of all elements: " + sum);
    }
}`,
          points: 5,
          difficulty: 'easy',
          keywords: ['2D array', 'sum', 'nested loop', 'accumulator']
        },
        {
          id: 'q12',
          type: 'short',
          question: 'Write a program to search for an element in an array and return its index (return -1 if not found).',
          sampleAnswer: `public class LinearSearch {
    public static void main(String[] args) {
        int[] arr = {10, 25, 30, 45, 50};
        int target = 30;
        int index = -1;
        
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                index = i;
                break;
            }
        }
        
        if (index != -1) {
            System.out.println("Element found at index: " + index);
        } else {
            System.out.println("Element not found");
        }
    }
}`,
          points: 5,
          difficulty: 'easy',
          keywords: ['search', 'linear search', 'index', 'found', 'not found', 'break']
        },
        {
          id: 'q13',
          type: 'short',
          question: 'Write a complete program that:\n- Creates an array of 5 student names\n- Uses a loop to print all names\n- Searches for a specific name\n- Handles the case when name is not found',
          sampleAnswer: `public class StudentSearch {
    public static void main(String[] args) {
        String[] students = {"Alice", "Bob", "Charlie", "David", "Eve"};
        
        // Print all names
        System.out.println("All Students:");
        for (int i = 0; i < students.length; i++) {
            System.out.println((i + 1) + ". " + students[i]);
        }
        
        // Search for a name
        String searchName = "Charlie";
        boolean found = false;
        
        for (int i = 0; i < students.length; i++) {
            if (students[i].equals(searchName)) {
                System.out.println("\\n" + searchName + " found at position " + (i + 1));
                found = true;
                break;
            }
        }
        
        if (!found) {
            System.out.println("\\n" + searchName + " not found in the list");
        }
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['array', 'String', 'loop', 'search', 'equals', 'boolean', 'found']
        }
      ]
    }
  ]
};