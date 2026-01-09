export default {
  title: "Day 9: Constructors & this Keyword Assessment",
  description: "Test your understanding of constructors, constructor overloading, and the this keyword",
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
          question: 'What is a constructor?',
          options: [
            'A method that returns void',
            'A special method to initialize objects',
            'A static method',
            'A final method'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'A constructor is a special method that is automatically called when an object is created. It initializes the object\'s state.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'What is the name of a constructor?',
          options: [
            'Can be anything',
            'Same as class name',
            'constructor',
            'init'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'A constructor must have the exact same name as the class. This is how Java identifies it as a constructor.'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'Does a constructor have a return type?',
          options: [
            'Yes, always void',
            'Yes, any type',
            'No return type',
            'Yes, must return an object'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'Constructors do not have a return type, not even void. If you add a return type, it becomes a regular method.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'What is a default constructor?',
          options: [
            'Constructor with parameters',
            'No-argument constructor',
            'Static constructor',
            'Private constructor'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'A default constructor is a no-argument constructor. If you don\'t define any constructor, Java provides one automatically.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'When is the default constructor provided by Java?',
          options: [
            'Always',
            'Only if you don\'t define any constructor',
            'Never',
            'Only for public classes'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Java provides a default no-argument constructor only if you don\'t define any constructor. Once you define any constructor, the default is not provided.'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'What does the \'this\' keyword refer to?',
          options: [
            'Parent class',
            'Current class',
            'Current object',
            'Any object'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'The \'this\' keyword refers to the current object - the object whose method or constructor is being called.'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'Can you overload constructors?',
          options: [
            'No',
            'Yes',
            'Only two constructors',
            'Only with different names'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Yes, you can have multiple constructors with different parameter lists. This is called constructor overloading.'
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
          question: 'Explain the difference between a default constructor and a parameterized constructor.',
          sampleAnswer: 'A default constructor has no parameters and is used to create objects with default values. A parameterized constructor accepts parameters to initialize the object with specific values. Example: Person() is default, Person(String name, int age) is parameterized. Default allows flexibility, parameterized ensures required data is provided during object creation.',
          points: 3,
          difficulty: 'easy',
          keywords: ['default', 'parameterized', 'no parameters', 'parameters', 'initialize', 'values']
        },
        {
          id: 'q9',
          type: 'short',
          question: 'What is the purpose of the \'this\' keyword? Give two use cases.',
          sampleAnswer: '1) To differentiate between instance variables and parameters with the same name (this.name = name). 2) To call one constructor from another constructor (constructor chaining using this()). Additional uses: passing current object as parameter, returning current object from method.',
          points: 3,
          difficulty: 'medium',
          keywords: ['this', 'differentiate', 'instance variable', 'parameter', 'constructor chaining', 'current object']
        },
        {
          id: 'q10',
          type: 'short',
          question: 'What is constructor chaining? How is it achieved?',
          sampleAnswer: 'Constructor chaining is calling one constructor from another constructor within the same class. It\'s achieved using this() with appropriate arguments. This must be the first statement in the constructor. It helps avoid code duplication by reusing initialization logic. Example: this(defaultValue) calls another constructor with a default value.',
          points: 3,
          difficulty: 'medium',
          keywords: ['constructor chaining', 'this()', 'calling', 'reuse', 'first statement', 'duplication']
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
          question: 'Create an Employee class with two constructors: one with name only, another with name and salary.',
          sampleAnswer: `public class Employee {
    String name;
    double salary;
    
    // Constructor with name only
    Employee(String name) {
        this.name = name;
        this.salary = 0.0; // default salary
    }
    
    // Constructor with name and salary
    Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }
    
    void display() {
        System.out.println("Name: " + name);
        System.out.println("Salary: " + salary);
    }
    
    public static void main(String[] args) {
        Employee emp1 = new Employee("John");
        Employee emp2 = new Employee("Alice", 50000);
        
        emp1.display();
        System.out.println();
        emp2.display();
    }
}`,
          points: 5,
          difficulty: 'easy',
          keywords: ['constructor', 'overloading', 'this', 'parameters', 'Employee']
        },
        {
          id: 'q12',
          type: 'short',
          question: 'Create a Rectangle class with constructors: default (1x1), one parameter (square), two parameters (rectangle).',
          sampleAnswer: `public class Rectangle {
    int length;
    int width;
    
    // Default constructor - creates 1x1 rectangle
    Rectangle() {
        this.length = 1;
        this.width = 1;
    }
    
    // One parameter - creates square
    Rectangle(int side) {
        this.length = side;
        this.width = side;
    }
    
    // Two parameters - creates rectangle
    Rectangle(int length, int width) {
        this.length = length;
        this.width = width;
    }
    
    int calculateArea() {
        return length * width;
    }
    
    void display() {
        System.out.println("Length: " + length + ", Width: " + width);
        System.out.println("Area: " + calculateArea());
    }
    
    public static void main(String[] args) {
        Rectangle r1 = new Rectangle();
        Rectangle r2 = new Rectangle(5);
        Rectangle r3 = new Rectangle(4, 6);
        
        r1.display();
        System.out.println();
        r2.display();
        System.out.println();
        r3.display();
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['constructor', 'overloading', 'default', 'square', 'rectangle', 'this']
        },
        {
          id: 'q13',
          type: 'short',
          question: 'Create a Person class demonstrating constructor chaining where one constructor calls another.',
          sampleAnswer: `public class Person {
    String name;
    int age;
    String city;
    
    // Constructor with all parameters
    Person(String name, int age, String city) {
        this.name = name;
        this.age = age;
        this.city = city;
    }
    
    // Constructor with name and age - chains to main constructor
    Person(String name, int age) {
        this(name, age, "Unknown"); // Constructor chaining
    }
    
    // Constructor with name only - chains to two-parameter constructor
    Person(String name) {
        this(name, 0); // Constructor chaining
    }
    
    void display() {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("City: " + city);
    }
    
    public static void main(String[] args) {
        Person p1 = new Person("John", 25, "New York");
        Person p2 = new Person("Alice", 30);
        Person p3 = new Person("Bob");
        
        p1.display();
        System.out.println();
        p2.display();
        System.out.println();
        p3.display();
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['constructor chaining', 'this()', 'overloading', 'Person', 'default values']
        }
      ]
    }
  ]
};