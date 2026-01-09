export default {
  title: "Day 13: Polymorphism Assessment",
  description: "Test your understanding of polymorphism, upcasting, downcasting, and dynamic method dispatch",
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
          question: 'What is polymorphism?',
          options: [
            'Many classes',
            'Many forms',
            'Many objects',
            'Many methods'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Polymorphism means "many forms". It allows objects to take multiple forms and behave differently based on their actual type.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'What is compile-time polymorphism?',
          options: [
            'Method overriding',
            'Method overloading',
            'Inheritance',
            'Encapsulation'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Compile-time polymorphism is achieved through method overloading. The method to call is determined at compile time based on method signature.'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'What is runtime polymorphism?',
          options: [
            'Method overriding',
            'Method overloading',
            'Constructor overloading',
            'Inheritance'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'easy',
          explanation: 'Runtime polymorphism is achieved through method overriding. The method to call is determined at runtime based on the actual object type.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'What is upcasting?',
          options: [
            'Child to Parent reference',
            'Parent to Child reference',
            'Same class casting',
            'Interface casting'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'medium',
          explanation: 'Upcasting is converting a child class reference to a parent class reference. It happens implicitly and is always safe.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'Is explicit casting required for upcasting?',
          options: [
            'Yes',
            'No',
            'Sometimes',
            'Only for primitives'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'No, upcasting happens implicitly. Java automatically converts child reference to parent reference as it\'s always safe.'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'What does instanceof operator do?',
          options: [
            'Creates instance',
            'Checks object type',
            'Casts object',
            'Deletes object'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'The instanceof operator checks if an object is an instance of a specific class or implements an interface. Returns true or false.'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'When would downcasting fail?',
          options: [
            'Never',
            'When object is not of that type',
            'Always',
            'Only with interfaces'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Downcasting fails (throws ClassCastException) when the object is not actually an instance of the target type. Always use instanceof before downcasting.'
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
          question: 'Explain the difference between compile-time and runtime polymorphism.',
          sampleAnswer: 'Compile-time polymorphism (method overloading): Multiple methods with same name but different parameters. Resolved at compile time based on method signature. Runtime polymorphism (method overriding): Child class overrides parent method. Resolved at runtime based on actual object type through dynamic method dispatch. Overloading is static binding, overriding is dynamic binding.',
          points: 3,
          difficulty: 'medium',
          keywords: ['compile-time', 'runtime', 'overloading', 'overriding', 'static', 'dynamic', 'binding']
        },
        {
          id: 'q9',
          type: 'short',
          question: 'What is dynamic method dispatch? How does it work?',
          sampleAnswer: 'Dynamic method dispatch is the mechanism by which a call to an overridden method is resolved at runtime. When a parent reference points to a child object, the method called is determined by the actual object type, not the reference type. This enables runtime polymorphism. Example: Animal a = new Dog(); a.makeSound(); calls Dog\'s makeSound() method, not Animal\'s.',
          points: 3,
          difficulty: 'hard',
          keywords: ['dynamic', 'method dispatch', 'runtime', 'overridden', 'actual object', 'reference type']
        },
        {
          id: 'q10',
          type: 'short',
          question: 'When and why would you use the instanceof operator?',
          sampleAnswer: 'Use instanceof before downcasting to avoid ClassCastException. It checks if an object is an instance of a specific class or interface. Example: if (animal instanceof Dog) { Dog dog = (Dog) animal; }. Also useful for type-specific operations, conditional logic based on object type, and ensuring type safety in polymorphic code.',
          points: 3,
          difficulty: 'medium',
          keywords: ['instanceof', 'downcasting', 'ClassCastException', 'type checking', 'safety', 'before casting']
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
          question: 'Create a demonstration of runtime polymorphism: Animal class with makeSound() method, Dog and Cat classes overriding it.',
          sampleAnswer: `public class Animal {
    public void makeSound() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Dog barks: Woof! Woof!");
    }
}

class Cat extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Cat meows: Meow! Meow!");
    }
}

class PolymorphismDemo {
    public static void main(String[] args) {
        // Runtime polymorphism - parent reference, child objects
        Animal animal1 = new Dog();
        Animal animal2 = new Cat();
        Animal animal3 = new Animal();
        
        animal1.makeSound(); // Calls Dog's makeSound()
        animal2.makeSound(); // Calls Cat's makeSound()
        animal3.makeSound(); // Calls Animal's makeSound()
        
        // Array of animals demonstrating polymorphism
        Animal[] animals = {new Dog(), new Cat(), new Dog()};
        for (Animal animal : animals) {
            animal.makeSound();
        }
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['polymorphism', 'Override', 'Animal', 'Dog', 'Cat', 'makeSound', 'runtime']
        },
        {
          id: 'q12',
          type: 'short',
          question: 'Create a Payment system demonstrating polymorphism: Payment class, CreditCard, DebitCard, and UPI classes.',
          sampleAnswer: `public class Payment {
    protected double amount;
    
    public Payment(double amount) {
        this.amount = amount;
    }
    
    public void processPayment() {
        System.out.println("Processing payment of $" + amount);
    }
}

class CreditCard extends Payment {
    private String cardNumber;
    
    public CreditCard(double amount, String cardNumber) {
        super(amount);
        this.cardNumber = cardNumber;
    }
    
    @Override
    public void processPayment() {
        System.out.println("Processing Credit Card payment");
        System.out.println("Card: ****" + cardNumber.substring(cardNumber.length() - 4));
        System.out.println("Amount: $" + amount);
    }
}

class DebitCard extends Payment {
    private String cardNumber;
    
    public DebitCard(double amount, String cardNumber) {
        super(amount);
        this.cardNumber = cardNumber;
    }
    
    @Override
    public void processPayment() {
        System.out.println("Processing Debit Card payment");
        System.out.println("Card: ****" + cardNumber.substring(cardNumber.length() - 4));
        System.out.println("Amount: $" + amount);
    }
}

class UPI extends Payment {
    private String upiId;
    
    public UPI(double amount, String upiId) {
        super(amount);
        this.upiId = upiId;
    }
    
    @Override
    public void processPayment() {
        System.out.println("Processing UPI payment");
        System.out.println("UPI ID: " + upiId);
        System.out.println("Amount: $" + amount);
    }
}

class PaymentDemo {
    public static void main(String[] args) {
        Payment[] payments = {
            new CreditCard(100.0, "1234567890123456"),
            new DebitCard(50.0, "9876543210987654"),
            new UPI(75.0, "user@upi")
        };
        
        for (Payment payment : payments) {
            payment.processPayment();
            System.out.println();
        }
    }
}`,
          points: 5,
          difficulty: 'hard',
          keywords: ['polymorphism', 'Payment', 'CreditCard', 'DebitCard', 'UPI', 'Override', 'array']
        },
        {
          id: 'q13',
          type: 'short',
          question: 'Write a program demonstrating upcasting and downcasting with instanceof checking.',
          sampleAnswer: `public class Animal {
    public void eat() {
        System.out.println("Animal is eating");
    }
}

class Dog extends Animal {
    @Override
    public void eat() {
        System.out.println("Dog is eating");
    }
    
    public void bark() {
        System.out.println("Dog is barking");
    }
}

class CastingDemo {
    public static void main(String[] args) {
        // Upcasting (implicit)
        Dog dog = new Dog();
        Animal animal = dog; // Upcasting - child to parent
        
        animal.eat(); // Works - inherited method
        // animal.bark(); // Error - parent reference can't access child-specific methods
        
        System.out.println("\\nDowncasting with instanceof:");
        
        // Downcasting (explicit) with instanceof check
        if (animal instanceof Dog) {
            Dog d = (Dog) animal; // Downcasting - parent to child
            d.bark(); // Now we can access child-specific methods
            d.eat();
        }
        
        // Demonstrating failed downcast
        Animal cat = new Animal();
        if (cat instanceof Dog) {
            Dog d2 = (Dog) cat; // This won't execute
        } else {
            System.out.println("\\ncat is not a Dog, downcasting would fail");
        }
        
        // Using instanceof for type checking
        Animal[] animals = {new Dog(), new Animal(), new Dog()};
        for (Animal a : animals) {
            if (a instanceof Dog) {
                System.out.println("Found a Dog!");
                ((Dog) a).bark();
            } else {
                System.out.println("Found an Animal");
            }
        }
    }
}`,
          points: 5,
          difficulty: 'hard',
          keywords: ['upcasting', 'downcasting', 'instanceof', 'casting', 'ClassCastException', 'type checking']
        }
      ]
    }
  ]
};