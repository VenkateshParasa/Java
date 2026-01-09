export default {
  title: "Day 20: Collections Framework - Map & Utilities Assessment",
  description: "Test your understanding of Map, HashMap, TreeMap, Comparable, and Comparator",
  passingScore: 70,
  timeLimit: 35, // minutes
  modes: {
    quick: {
      questionCount: 10,
      timeLimit: 18,
      sections: ['section-a', 'section-b']
    },
    full: {
      questionCount: 14,
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
          question: 'What does a Map store?',
          options: [
            'Single values',
            'Key-value pairs',
            'Only keys',
            'Only values'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'A Map stores key-value pairs. Each key maps to exactly one value. Keys must be unique, but values can be duplicated.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'Can a Map have duplicate keys?',
          options: [
            'Yes',
            'No',
            'Sometimes',
            'Depends on implementation'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'No, Map cannot have duplicate keys. If you put a value with an existing key, it replaces the old value.'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'Which Map implementation maintains insertion order?',
          options: [
            'HashMap',
            'TreeMap',
            'LinkedHashMap',
            'Hashtable'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'medium',
          explanation: 'LinkedHashMap maintains insertion order. HashMap has no order, TreeMap maintains sorted order by keys.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'Which Map implementation sorts keys?',
          options: [
            'HashMap',
            'TreeMap',
            'LinkedHashMap',
            'Hashtable'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'TreeMap sorts keys in natural order (or using a Comparator). It implements SortedMap interface.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'How do you get all keys from a Map?',
          options: [
            'getKeys()',
            'keys()',
            'keySet()',
            'allKeys()'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'The keySet() method returns a Set view of all keys in the map.'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'Which method sorts a List?',
          options: [
            'List.sort()',
            'Collections.sort()',
            'Arrays.sort()',
            'sort(List)'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Collections.sort() is used to sort a List. Arrays.sort() is for arrays, not Lists.'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'What does Comparable interface require?',
          options: [
            'equals() method',
            'compare() method',
            'compareTo() method',
            'sort() method'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'Comparable interface requires implementing the compareTo() method for natural ordering of objects.'
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
          question: 'Explain the difference between HashMap and TreeMap.',
          sampleAnswer: 'HashMap: no order, fastest O(1) performance, uses hashing, allows one null key. TreeMap: sorted order by keys, slower O(log n), uses Red-Black tree, no null keys. HashMap for best performance, TreeMap when sorted keys needed. HashMap is most commonly used, TreeMap when you need sorted iteration or range operations.',
          points: 3,
          difficulty: 'medium',
          keywords: ['HashMap', 'TreeMap', 'order', 'sorted', 'performance', 'O(1)', 'O(log n)', 'hashing']
        },
        {
          id: 'q9',
          type: 'short',
          question: 'What is the difference between Comparable and Comparator?',
          sampleAnswer: 'Comparable: defines natural ordering, implemented by the class itself, has compareTo() method, single sorting sequence. Comparator: defines custom ordering, separate class, has compare() method, multiple sorting sequences possible. Use Comparable for default sorting, Comparator for custom or multiple sorting criteria. Example: String implements Comparable for alphabetical order.',
          points: 3,
          difficulty: 'medium',
          keywords: ['Comparable', 'Comparator', 'compareTo', 'compare', 'natural', 'custom', 'sorting']
        },
        {
          id: 'q10',
          type: 'short',
          question: 'How do you iterate through a Map? Mention at least two ways.',
          sampleAnswer: '1) Using keySet(): for(String key : map.keySet()) { map.get(key); }. 2) Using entrySet(): for(Map.Entry<K,V> entry : map.entrySet()) { entry.getKey(); entry.getValue(); }. 3) Using values(): for(Value v : map.values()). 4) Using forEach (Java 8): map.forEach((k,v) -> {}). entrySet() is most efficient for key-value iteration.',
          points: 3,
          difficulty: 'medium',
          keywords: ['iterate', 'keySet', 'entrySet', 'values', 'forEach', 'Map.Entry']
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
          question: 'Write a program to store student names and their marks in a HashMap and display them.',
          sampleAnswer: `import java.util.*;

public class StudentMarks {
    public static void main(String[] args) {
        // Create HashMap
        HashMap<String, Integer> students = new HashMap<>();
        
        // Add students and marks
        students.put("Alice", 85);
        students.put("Bob", 92);
        students.put("Charlie", 78);
        students.put("David", 95);
        students.put("Eve", 88);
        
        // Display using entrySet
        System.out.println("Student Marks:");
        for (Map.Entry<String, Integer> entry : students.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
        
        // Other operations
        System.out.println("\\nTotal students: " + students.size());
        System.out.println("Bob's marks: " + students.get("Bob"));
        System.out.println("Contains Alice: " + students.containsKey("Alice"));
        
        // Update marks
        students.put("Bob", 95); // Updates existing value
        System.out.println("Bob's updated marks: " + students.get("Bob"));
    }
}`,
          points: 5,
          difficulty: 'easy',
          keywords: ['HashMap', 'put', 'get', 'entrySet', 'containsKey', 'display']
        },
        {
          id: 'q12',
          type: 'short',
          question: 'Write a program to count the frequency of each word in an array using HashMap.',
          sampleAnswer: `import java.util.*;

public class WordFrequency {
    public static void main(String[] args) {
        String[] words = {"apple", "banana", "apple", "orange", 
                         "banana", "apple", "mango", "banana"};
        
        // Create HashMap to store frequency
        HashMap<String, Integer> frequency = new HashMap<>();
        
        // Count frequency
        for (String word : words) {
            if (frequency.containsKey(word)) {
                frequency.put(word, frequency.get(word) + 1);
            } else {
                frequency.put(word, 1);
            }
            // Or use: frequency.put(word, frequency.getOrDefault(word, 0) + 1);
        }
        
        // Display frequency
        System.out.println("Word Frequency:");
        for (Map.Entry<String, Integer> entry : frequency.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
        
        // Find most frequent word
        String mostFrequent = "";
        int maxCount = 0;
        for (Map.Entry<String, Integer> entry : frequency.entrySet()) {
            if (entry.getValue() > maxCount) {
                maxCount = entry.getValue();
                mostFrequent = entry.getKey();
            }
        }
        System.out.println("\\nMost frequent word: " + mostFrequent + 
                          " (appears " + maxCount + " times)");
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['HashMap', 'frequency', 'count', 'getOrDefault', 'containsKey', 'words']
        },
        {
          id: 'q13',
          type: 'short',
          question: 'Create a Student class and write a program to sort students by name using Comparable.',
          sampleAnswer: `import java.util.*;

class Student implements Comparable<Student> {
    private String name;
    private int marks;
    
    public Student(String name, int marks) {
        this.name = name;
        this.marks = marks;
    }
    
    public String getName() {
        return name;
    }
    
    public int getMarks() {
        return marks;
    }
    
    @Override
    public int compareTo(Student other) {
        return this.name.compareTo(other.name); // Sort by name
    }
    
    @Override
    public String toString() {
        return name + ": " + marks;
    }
}

public class SortStudents {
    public static void main(String[] args) {
        List<Student> students = new ArrayList<>();
        students.add(new Student("Charlie", 85));
        students.add(new Student("Alice", 92));
        students.add(new Student("Bob", 78));
        students.add(new Student("David", 95));
        
        System.out.println("Before sorting:");
        for (Student s : students) {
            System.out.println(s);
        }
        
        Collections.sort(students); // Uses compareTo()
        
        System.out.println("\\nAfter sorting by name:");
        for (Student s : students) {
            System.out.println(s);
        }
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['Comparable', 'compareTo', 'sort', 'Student', 'Collections.sort', 'implements']
        },
        {
          id: 'q14',
          type: 'short',
          question: 'Create multiple Comparators to sort students by different fields (name, marks, age).',
          sampleAnswer: `import java.util.*;

class Student {
    private String name;
    private int marks;
    private int age;
    
    public Student(String name, int marks, int age) {
        this.name = name;
        this.marks = marks;
        this.age = age;
    }
    
    public String getName() { return name; }
    public int getMarks() { return marks; }
    public int getAge() { return age; }
    
    @Override
    public String toString() {
        return name + " (Marks: " + marks + ", Age: " + age + ")";
    }
}

public class MultipleComparators {
    public static void main(String[] args) {
        List<Student> students = new ArrayList<>();
        students.add(new Student("Charlie", 85, 20));
        students.add(new Student("Alice", 92, 19));
        students.add(new Student("Bob", 78, 21));
        students.add(new Student("David", 92, 20));
        
        System.out.println("Original list:");
        students.forEach(System.out::println);
        
        // Sort by name
        Collections.sort(students, new Comparator<Student>() {
            public int compare(Student s1, Student s2) {
                return s1.getName().compareTo(s2.getName());
            }
        });
        System.out.println("\\nSorted by name:");
        students.forEach(System.out::println);
        
        // Sort by marks (descending)
        Collections.sort(students, (s1, s2) -> s2.getMarks() - s1.getMarks());
        System.out.println("\\nSorted by marks (descending):");
        students.forEach(System.out::println);
        
        // Sort by age
        Collections.sort(students, Comparator.comparingInt(Student::getAge));
        System.out.println("\\nSorted by age:");
        students.forEach(System.out::println);
    }
}`,
          points: 5,
          difficulty: 'hard',
          keywords: ['Comparator', 'compare', 'multiple', 'sort', 'lambda', 'comparingInt', 'custom']
        }
      ]
    }
  ]
};