export default {
  title: "Day 19: Collections Framework - List & Set Assessment",
  description: "Test your understanding of List, Set, ArrayList, LinkedList, HashSet, and TreeSet",
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
          question: 'Which package contains the Collections Framework?',
          options: [
            'java.lang',
            'java.util',
            'java.io',
            'java.collection'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'The Collections Framework is in the java.util package. You need to import java.util.* or specific classes like ArrayList, HashSet.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'Which collection allows duplicates and maintains order?',
          options: [
            'Set',
            'List',
            'Map',
            'Queue'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'List allows duplicate elements and maintains insertion order. Set does not allow duplicates.'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'Which is the most commonly used List implementation?',
          options: [
            'Vector',
            'LinkedList',
            'ArrayList',
            'Stack'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'ArrayList is the most commonly used List implementation. It provides fast random access and is backed by a dynamic array.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'What is the time complexity of get(index) in ArrayList?',
          options: [
            'O(1)',
            'O(n)',
            'O(log n)',
            'O(n^2)'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'medium',
          explanation: 'ArrayList provides O(1) constant time for get(index) because it uses array indexing internally.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'Which collection does NOT allow duplicates?',
          options: [
            'List',
            'Set',
            'Queue',
            'ArrayList'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Set does not allow duplicate elements. If you try to add a duplicate, it will be ignored.'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'Which Set implementation maintains insertion order?',
          options: [
            'HashSet',
            'TreeSet',
            'LinkedHashSet',
            'Set'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'medium',
          explanation: 'LinkedHashSet maintains insertion order. HashSet has no order, TreeSet maintains sorted order.'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'Which Set implementation keeps elements sorted?',
          options: [
            'HashSet',
            'TreeSet',
            'LinkedHashSet',
            'Set'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'TreeSet keeps elements in sorted (natural) order. It implements SortedSet interface.'
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
          question: 'Explain the difference between ArrayList and LinkedList. When would you use each?',
          sampleAnswer: 'ArrayList uses dynamic array, provides fast random access O(1) but slow insertion/deletion in middle O(n). LinkedList uses doubly-linked list, slow random access O(n) but fast insertion/deletion O(1). Use ArrayList for frequent access by index, use LinkedList for frequent insertions/deletions at beginning or middle. ArrayList is generally preferred for most use cases.',
          points: 3,
          difficulty: 'medium',
          keywords: ['ArrayList', 'LinkedList', 'array', 'linked list', 'access', 'insertion', 'deletion', 'O(1)', 'O(n)']
        },
        {
          id: 'q9',
          type: 'short',
          question: 'What is the difference between List and Set?',
          sampleAnswer: 'List allows duplicate elements, maintains insertion order, allows positional access by index. Set does not allow duplicates, may or may not maintain order depending on implementation. List implementations: ArrayList, LinkedList. Set implementations: HashSet, LinkedHashSet, TreeSet. Use List when order and duplicates matter, Set when uniqueness is required.',
          points: 3,
          difficulty: 'easy',
          keywords: ['List', 'Set', 'duplicates', 'order', 'index', 'unique', 'difference']
        },
        {
          id: 'q10',
          type: 'short',
          question: 'What is the difference between HashSet, LinkedHashSet, and TreeSet?',
          sampleAnswer: 'HashSet: no order, fastest performance O(1), uses hashing. LinkedHashSet: maintains insertion order, slightly slower than HashSet, uses hash table + linked list. TreeSet: maintains sorted order, slowest O(log n), uses Red-Black tree. Choose HashSet for best performance, LinkedHashSet for order preservation, TreeSet for sorted elements.',
          points: 3,
          difficulty: 'medium',
          keywords: ['HashSet', 'LinkedHashSet', 'TreeSet', 'order', 'sorted', 'performance', 'hashing']
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
          question: 'Write a program to store and display a list of student names using ArrayList.',
          sampleAnswer: `import java.util.ArrayList;

public class StudentList {
    public static void main(String[] args) {
        // Create ArrayList
        ArrayList<String> students = new ArrayList<>();
        
        // Add students
        students.add("Alice");
        students.add("Bob");
        students.add("Charlie");
        students.add("David");
        students.add("Eve");
        
        // Display using for-each loop
        System.out.println("Student List:");
        for (String student : students) {
            System.out.println("- " + student);
        }
        
        // Display using index
        System.out.println("\\nUsing index:");
        for (int i = 0; i < students.size(); i++) {
            System.out.println((i + 1) + ". " + students.get(i));
        }
        
        // Other operations
        System.out.println("\\nTotal students: " + students.size());
        System.out.println("First student: " + students.get(0));
        System.out.println("Contains 'Bob': " + students.contains("Bob"));
    }
}`,
          points: 5,
          difficulty: 'easy',
          keywords: ['ArrayList', 'add', 'get', 'size', 'for-each', 'display', 'students']
        },
        {
          id: 'q12',
          type: 'short',
          question: 'Write a program to remove duplicate elements from an array using a Set.',
          sampleAnswer: `import java.util.*;

public class RemoveDuplicates {
    public static void main(String[] args) {
        // Array with duplicates
        Integer[] numbers = {1, 2, 3, 2, 4, 1, 5, 3, 6, 4};
        
        System.out.println("Original array:");
        System.out.println(Arrays.toString(numbers));
        
        // Convert array to Set (removes duplicates)
        Set<Integer> uniqueNumbers = new HashSet<>(Arrays.asList(numbers));
        
        System.out.println("\\nAfter removing duplicates (HashSet - no order):");
        System.out.println(uniqueNumbers);
        
        // Using LinkedHashSet to maintain order
        Set<Integer> orderedUnique = new LinkedHashSet<>(Arrays.asList(numbers));
        
        System.out.println("\\nWith order preserved (LinkedHashSet):");
        System.out.println(orderedUnique);
        
        // Convert back to array if needed
        Integer[] uniqueArray = orderedUnique.toArray(new Integer[0]);
        System.out.println("\\nAs array:");
        System.out.println(Arrays.toString(uniqueArray));
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['Set', 'HashSet', 'LinkedHashSet', 'duplicates', 'remove', 'unique', 'array']
        },
        {
          id: 'q13',
          type: 'short',
          question: 'Write a program to demonstrate the difference between HashSet, LinkedHashSet, and TreeSet with output.',
          sampleAnswer: `import java.util.*;

public class SetComparison {
    public static void main(String[] args) {
        // Sample data
        String[] fruits = {"Banana", "Apple", "Orange", "Mango", "Apple", "Banana"};
        
        System.out.println("Original array: " + Arrays.toString(fruits));
        
        // HashSet - no order, no duplicates
        System.out.println("\\n1. HashSet (no order):");
        Set<String> hashSet = new HashSet<>(Arrays.asList(fruits));
        System.out.println(hashSet);
        
        // LinkedHashSet - insertion order, no duplicates
        System.out.println("\\n2. LinkedHashSet (insertion order):");
        Set<String> linkedHashSet = new LinkedHashSet<>(Arrays.asList(fruits));
        System.out.println(linkedHashSet);
        
        // TreeSet - sorted order, no duplicates
        System.out.println("\\n3. TreeSet (sorted order):");
        Set<String> treeSet = new TreeSet<>(Arrays.asList(fruits));
        System.out.println(treeSet);
        
        // Performance comparison
        System.out.println("\\n--- Performance ---");
        System.out.println("HashSet: Fastest (O(1))");
        System.out.println("LinkedHashSet: Medium (O(1) but maintains order)");
        System.out.println("TreeSet: Slowest (O(log n) but sorted)");
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['HashSet', 'LinkedHashSet', 'TreeSet', 'comparison', 'order', 'sorted', 'performance']
        }
      ]
    }
  ]
};