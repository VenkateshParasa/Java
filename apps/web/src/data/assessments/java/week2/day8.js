export default {
  title: "Day 8: Introduction to OOP & Classes Assessment",
  description: "Test your understanding of Object-Oriented Programming concepts, classes, and objects",
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
          question: 'What is a class in Java?',
          options: [
            'A function',
            'A blueprint for objects',
            'A variable',
            'A package'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'A class is a blueprint or template that defines the structure and behavior of objects. It contains fields (variables) and methods.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'What is an object?',
          options: [
            'A blueprint',
            'An instance of a class',
            'A method',
            'A data type'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'An object is an instance of a class. It is a concrete entity created from the class blueprint with its own state and behavior.'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'Which keyword is used to create an object?',
          options: [
            'create',
            'new',
            'object',
            'instance'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'The "new" keyword is used to create objects in Java. It allocates memory for the object and calls the constructor.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'What are instance variables?',
          options: [
            'Variables inside methods',
            'Variables in a class',
            'Static variables',
            'Local variables'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Instance variables are variables declared in a class but outside methods. Each object has its own copy of instance variables.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'How do you access a member of an object?',
          options: [
            'object.member',
            'object->member',
            'object::member',
            'object[member]'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'easy',
          explanation: 'The dot operator (.) is used to access members (fields and methods) of an object in Java.'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'Can you create multiple objects from one class?',
          options: [
            'No',
            'Yes',
            'Only two',
            'Only with inheritance'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Yes, you can create unlimited objects from a single class. Each object is independent with its own state.'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'Which of the following is NOT a pillar of OOP?',
          options: [
            'Encapsulation',
            'Compilation',
            'Inheritance',
            'Polymorphism'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'The four pillars of OOP are: Encapsulation, Inheritance, Polymorphism, and Abstraction. Compilation is not a pillar of OOP.'
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
          question: 'Explain the difference between a class and an object with a real-world example.',
          sampleAnswer: 'A class is a blueprint/template, while an object is an actual instance created from that blueprint. Real-world example: "Car" is a class that defines properties (color, model, speed) and behaviors (start, stop, accelerate). "My red Toyota" is an object - a specific car created from the Car class with actual values for those properties.',
          points: 3,
          difficulty: 'easy',
          keywords: ['class', 'object', 'blueprint', 'instance', 'template', 'example']
        },
        {
          id: 'q9',
          type: 'short',
          question: 'What is the purpose of methods in a class?',
          sampleAnswer: 'Methods define the behavior or actions that objects of the class can perform. They operate on the object\'s data (instance variables) and can modify state, perform calculations, or interact with other objects. Methods provide functionality and encapsulate the logic needed to work with the class data.',
          points: 3,
          difficulty: 'easy',
          keywords: ['methods', 'behavior', 'actions', 'functionality', 'operate', 'data']
        },
        {
          id: 'q10',
          type: 'short',
          question: 'What are the four pillars of OOP? Give a one-line explanation of each.',
          sampleAnswer: '1) Encapsulation - bundling data and methods together and hiding internal details. 2) Inheritance - creating new classes from existing ones to reuse code. 3) Polymorphism - ability of objects to take multiple forms and behave differently. 4) Abstraction - hiding complex implementation details and showing only essential features.',
          points: 3,
          difficulty: 'medium',
          keywords: ['encapsulation', 'inheritance', 'polymorphism', 'abstraction', 'pillars', 'OOP']
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
          question: 'Create a Car class with attributes: brand, model, year. Create a method to display car details.',
          sampleAnswer: `public class Car {
    String brand;
    String model;
    int year;
    
    void displayDetails() {
        System.out.println("Brand: " + brand);
        System.out.println("Model: " + model);
        System.out.println("Year: " + year);
    }
    
    public static void main(String[] args) {
        Car car1 = new Car();
        car1.brand = "Toyota";
        car1.model = "Camry";
        car1.year = 2023;
        
        car1.displayDetails();
    }
}`,
          points: 5,
          difficulty: 'easy',
          keywords: ['class', 'attributes', 'method', 'object', 'display']
        },
        {
          id: 'q12',
          type: 'short',
          question: 'Create a Student class with name, rollNo, and marks. Create a method to check if the student passed (marks >= 40).',
          sampleAnswer: `public class Student {
    String name;
    int rollNo;
    int marks;
    
    boolean hasPassed() {
        return marks >= 40;
    }
    
    void displayResult() {
        System.out.println("Name: " + name);
        System.out.println("Roll No: " + rollNo);
        System.out.println("Marks: " + marks);
        if (hasPassed()) {
            System.out.println("Result: PASSED");
        } else {
            System.out.println("Result: FAILED");
        }
    }
    
    public static void main(String[] args) {
        Student s1 = new Student();
        s1.name = "John";
        s1.rollNo = 101;
        s1.marks = 75;
        
        s1.displayResult();
    }
}`,
          points: 5,
          difficulty: 'easy',
          keywords: ['class', 'Student', 'method', 'boolean', 'passed', 'condition']
        },
        {
          id: 'q13',
          type: 'short',
          question: 'Create a BankAccount class with accountNo and balance. Create methods to deposit and withdraw money.',
          sampleAnswer: `public class BankAccount {
    String accountNo;
    double balance;
    
    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: " + amount);
            System.out.println("New Balance: " + balance);
        } else {
            System.out.println("Invalid amount");
        }
    }
    
    void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Withdrawn: " + amount);
            System.out.println("New Balance: " + balance);
        } else {
            System.out.println("Invalid amount or insufficient balance");
        }
    }
    
    public static void main(String[] args) {
        BankAccount acc = new BankAccount();
        acc.accountNo = "ACC001";
        acc.balance = 1000;
        
        acc.deposit(500);
        acc.withdraw(300);
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['class', 'BankAccount', 'deposit', 'withdraw', 'balance', 'validation']
        }
      ]
    }
  ]
};