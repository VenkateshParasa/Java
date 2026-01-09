export default {
  title: "Day 12: Inheritance Assessment",
  description: "Test your understanding of inheritance, super keyword, and method overriding",
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
          question: 'Which keyword is used for inheritance in Java?',
          options: [
            'inherits',
            'extends',
            'implements',
            'uses'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'The extends keyword is used for inheritance in Java. A class extends another class to inherit its properties and methods.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'Which keyword is used to refer to the parent class?',
          options: [
            'this',
            'parent',
            'super',
            'base'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'The super keyword is used to refer to the parent class. It can access parent class members and call parent class constructors.'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'Can a class extend multiple classes in Java?',
          options: [
            'Yes',
            'No',
            'Only interfaces',
            'Only abstract classes'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'No, Java does not support multiple inheritance for classes. A class can extend only one class, but can implement multiple interfaces.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'What type of relationship does inheritance represent?',
          options: [
            'HAS-A',
            'IS-A',
            'USES-A',
            'CONTAINS-A'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Inheritance represents an IS-A relationship. For example, Dog IS-A Animal. This indicates that the child class is a specialized version of the parent class.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'Which constructor is called first in inheritance?',
          options: [
            'Child class constructor',
            'Parent class constructor',
            'Both simultaneously',
            'No constructor is called'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'The parent class constructor is called first, then the child class constructor. This happens automatically via implicit super() call.'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'Can you override a private method?',
          options: [
            'Yes',
            'No',
            'Only in subclass',
            'Only with super keyword'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'No, private methods cannot be overridden because they are not visible to subclasses. Only inherited methods can be overridden.'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'What is the root class of all classes in Java?',
          options: [
            'Main',
            'Object',
            'Class',
            'System'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Object is the root class of all classes in Java. Every class implicitly extends Object if no other parent is specified.'
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
          question: 'Explain the concept of inheritance with a real-world example.',
          sampleAnswer: 'Inheritance is a mechanism where a new class (child/subclass) acquires properties and behaviors of an existing class (parent/superclass). Real-world example: Animal is a parent class with properties like name, age and methods like eat(), sleep(). Dog and Cat are child classes that inherit these properties and methods, and can add their own specific features like bark() for Dog and meow() for Cat.',
          points: 3,
          difficulty: 'easy',
          keywords: ['inheritance', 'parent', 'child', 'subclass', 'superclass', 'inherit', 'properties', 'methods']
        },
        {
          id: 'q9',
          type: 'short',
          question: 'What is the difference between method overloading and method overriding?',
          sampleAnswer: 'Method overloading: Multiple methods with same name but different parameters in the same class. Resolved at compile-time. Method overriding: Child class provides specific implementation of a method already defined in parent class. Same name and parameters. Resolved at runtime. Overloading is compile-time polymorphism, overriding is runtime polymorphism.',
          points: 3,
          difficulty: 'medium',
          keywords: ['overloading', 'overriding', 'same name', 'different parameters', 'parent', 'child', 'compile-time', 'runtime']
        },
        {
          id: 'q10',
          type: 'short',
          question: 'Explain the use of super keyword in inheritance.',
          sampleAnswer: 'The super keyword has three main uses: 1) Call parent class constructor: super() or super(args) - must be first statement in child constructor. 2) Access parent class members: super.variable or super.method() - useful when child has same-named members. 3) Call parent class method from overridden method: super.methodName() - to extend parent functionality rather than replace it.',
          points: 3,
          difficulty: 'medium',
          keywords: ['super', 'parent', 'constructor', 'access', 'members', 'overridden', 'call']
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
          question: 'Create an Animal class with eat() method. Create Dog class that extends Animal and adds bark() method.',
          sampleAnswer: `public class Animal {
    String name;
    
    public Animal(String name) {
        this.name = name;
    }
    
    public void eat() {
        System.out.println(name + " is eating");
    }
}

class Dog extends Animal {
    String breed;
    
    public Dog(String name, String breed) {
        super(name); // Call parent constructor
        this.breed = breed;
    }
    
    public void bark() {
        System.out.println(name + " is barking: Woof! Woof!");
    }
    
    public static void main(String[] args) {
        Dog dog = new Dog("Buddy", "Golden Retriever");
        dog.eat();  // Inherited method
        dog.bark(); // Own method
        System.out.println("Breed: " + dog.breed);
    }
}`,
          points: 5,
          difficulty: 'easy',
          keywords: ['extends', 'Animal', 'Dog', 'super', 'inherited', 'method']
        },
        {
          id: 'q12',
          type: 'short',
          question: 'Create an Employee class with basic details. Create Manager class extending Employee with additional team size field.',
          sampleAnswer: `public class Employee {
    protected String name;
    protected int id;
    protected double salary;
    
    public Employee(String name, int id, double salary) {
        this.name = name;
        this.id = id;
        this.salary = salary;
    }
    
    public void displayInfo() {
        System.out.println("ID: " + id);
        System.out.println("Name: " + name);
        System.out.println("Salary: $" + salary);
    }
}

class Manager extends Employee {
    private int teamSize;
    
    public Manager(String name, int id, double salary, int teamSize) {
        super(name, id, salary); // Call parent constructor
        this.teamSize = teamSize;
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo(); // Call parent method
        System.out.println("Team Size: " + teamSize);
        System.out.println("Role: Manager");
    }
    
    public static void main(String[] args) {
        Manager mgr = new Manager("John Smith", 101, 75000, 10);
        mgr.displayInfo();
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['extends', 'Employee', 'Manager', 'super', 'protected', 'Override', 'inheritance']
        },
        {
          id: 'q13',
          type: 'short',
          question: 'Demonstrate method overriding by creating Shape class with calculateArea() and override it in Circle class.',
          sampleAnswer: `public class Shape {
    protected String color;
    
    public Shape(String color) {
        this.color = color;
    }
    
    public double calculateArea() {
        return 0.0;
    }
    
    public void display() {
        System.out.println("Color: " + color);
        System.out.println("Area: " + calculateArea());
    }
}

class Circle extends Shape {
    private double radius;
    
    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }
    
    @Override
    public double calculateArea() {
        return Math.PI * radius * radius;
    }
    
    @Override
    public void display() {
        System.out.println("Shape: Circle");
        super.display();
        System.out.println("Radius: " + radius);
    }
    
    public static void main(String[] args) {
        Circle circle = new Circle("Red", 5.0);
        circle.display();
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['extends', 'Shape', 'Circle', 'Override', 'calculateArea', 'super', 'method overriding']
        }
      ]
    }
  ]
};