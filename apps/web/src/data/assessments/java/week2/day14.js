export default {
  title: "Day 14: Abstraction - Abstract Classes & Interfaces & Week 2 Review",
  description: "Test your understanding of abstraction, abstract classes, interfaces, and Week 2 OOP concepts",
  passingScore: 70,
  timeLimit: 40, // minutes
  modes: {
    quick: {
      questionCount: 11,
      timeLimit: 20,
      sections: ['section-a', 'section-b']
    },
    full: {
      questionCount: 15,
      timeLimit: 40,
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
          question: 'Which keyword is used to declare an abstract class?',
          options: [
            'abstract',
            'interface',
            'virtual',
            'base'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'easy',
          explanation: 'The abstract keyword is used to declare an abstract class. Abstract classes cannot be instantiated directly.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'Can you instantiate an abstract class?',
          options: [
            'Yes',
            'No',
            'Only with new keyword',
            'Only in subclass'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'No, abstract classes cannot be instantiated. You can only create objects of concrete (non-abstract) subclasses.'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'Can an abstract class have constructors?',
          options: [
            'No',
            'Yes',
            'Only default constructor',
            'Only parameterized constructor'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Yes, abstract classes can have constructors. They are called when a subclass object is created via super().'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'Which keyword is used to declare an interface?',
          options: [
            'interface',
            'abstract',
            'class',
            'type'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'easy',
          explanation: 'The interface keyword is used to declare an interface. Interfaces define a contract that implementing classes must follow.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'Which keyword is used to implement an interface?',
          options: [
            'extends',
            'implements',
            'inherits',
            'uses'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'The implements keyword is used when a class implements an interface. A class can implement multiple interfaces.'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'Can a class implement multiple interfaces?',
          options: [
            'No',
            'Yes',
            'Only two',
            'Only with abstract keyword'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Yes, a class can implement multiple interfaces separated by commas. This provides multiple inheritance of type.'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'What are interface methods by default (before Java 8)?',
          options: [
            'private',
            'protected',
            'public abstract',
            'public static'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'medium',
          explanation: 'Before Java 8, all interface methods were implicitly public and abstract. No need to explicitly declare these modifiers.'
        },
        {
          id: 'q8',
          type: 'mcq',
          question: 'Can interfaces have concrete methods (Java 8+)?',
          options: [
            'No',
            'Yes, default methods',
            'Yes, all methods',
            'Only static methods'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Yes, Java 8 introduced default methods (with implementation) and static methods in interfaces for backward compatibility.'
        }
      ]
    },
    {
      id: 'section-b',
      title: 'Short Answer Questions',
      questions: [
        {
          id: 'q9',
          type: 'short',
          question: 'Explain the difference between an abstract class and an interface.',
          sampleAnswer: 'Abstract class: Can have both abstract and concrete methods, can have constructors, instance variables, any access modifiers. Single inheritance only. Interface: All methods abstract by default (before Java 8), no constructors, only public static final variables, all methods public. Multiple inheritance supported. Use abstract class for IS-A relationship with shared code, interface for CAN-DO capability.',
          points: 3,
          difficulty: 'hard',
          keywords: ['abstract class', 'interface', 'methods', 'constructors', 'variables', 'inheritance', 'multiple']
        },
        {
          id: 'q10',
          type: 'short',
          question: 'When would you use an abstract class vs an interface?',
          sampleAnswer: 'Use abstract class when: classes share common code/state, need constructors, want to provide default implementation, have protected/private members, single inheritance is sufficient. Use interface when: defining a contract/capability, need multiple inheritance, no shared state needed, want to achieve loose coupling, defining a role that unrelated classes can play.',
          points: 3,
          difficulty: 'hard',
          keywords: ['abstract class', 'interface', 'common code', 'contract', 'multiple inheritance', 'when to use']
        },
        {
          id: 'q11',
          type: 'short',
          question: 'What are default methods in interfaces? Why were they introduced in Java 8?',
          sampleAnswer: 'Default methods are interface methods with implementation (using default keyword). Introduced in Java 8 to add new methods to interfaces without breaking existing implementations. Allows interface evolution while maintaining backward compatibility. Classes can override default methods if needed. Enables adding functionality to interfaces without forcing all implementing classes to change.',
          points: 3,
          difficulty: 'medium',
          keywords: ['default methods', 'Java 8', 'implementation', 'backward compatibility', 'interface evolution']
        }
      ]
    },
    {
      id: 'section-c',
      title: 'Coding Problems',
      questions: [
        {
          id: 'q12',
          type: 'short',
          question: 'Create an abstract Shape class with abstract calculateArea() method. Create Circle and Rectangle classes.',
          sampleAnswer: `public abstract class Shape {
    protected String color;
    
    public Shape(String color) {
        this.color = color;
    }
    
    // Abstract method - no implementation
    public abstract double calculateArea();
    
    // Concrete method
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
}

class Rectangle extends Shape {
    private double length;
    private double width;
    
    public Rectangle(String color, double length, double width) {
        super(color);
        this.length = length;
        this.width = width;
    }
    
    @Override
    public double calculateArea() {
        return length * width;
    }
}

class ShapeDemo {
    public static void main(String[] args) {
        Shape circle = new Circle("Red", 5.0);
        Shape rectangle = new Rectangle("Blue", 4.0, 6.0);
        
        circle.display();
        System.out.println();
        rectangle.display();
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['abstract', 'Shape', 'calculateArea', 'Circle', 'Rectangle', 'Override', 'extends']
        },
        {
          id: 'q13',
          type: 'short',
          question: 'Create a Drawable interface with draw() method. Implement it in Circle and Rectangle classes.',
          sampleAnswer: `public interface Drawable {
    void draw(); // Implicitly public abstract
}

class Circle implements Drawable {
    private double radius;
    
    public Circle(double radius) {
        this.radius = radius;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing Circle with radius: " + radius);
    }
    
    public double getArea() {
        return Math.PI * radius * radius;
    }
}

class Rectangle implements Drawable {
    private double length;
    private double width;
    
    public Rectangle(double length, double width) {
        this.length = length;
        this.width = width;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing Rectangle: " + length + " x " + width);
    }
    
    public double getArea() {
        return length * width;
    }
}

class DrawableDemo {
    public static void main(String[] args) {
        Drawable[] drawables = {
            new Circle(5.0),
            new Rectangle(4.0, 6.0),
            new Circle(3.0)
        };
        
        for (Drawable drawable : drawables) {
            drawable.draw();
        }
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['interface', 'Drawable', 'implements', 'draw', 'Circle', 'Rectangle', 'Override']
        },
        {
          id: 'q14',
          type: 'short',
          question: 'Create a Vehicle abstract class and Flyable interface. Create Airplane class that extends Vehicle and implements Flyable.',
          sampleAnswer: `public abstract class Vehicle {
    protected String brand;
    protected int speed;
    
    public Vehicle(String brand) {
        this.brand = brand;
        this.speed = 0;
    }
    
    public abstract void start();
    
    public void displayInfo() {
        System.out.println("Brand: " + brand);
        System.out.println("Speed: " + speed + " km/h");
    }
}

interface Flyable {
    void takeOff();
    void land();
    void fly();
}

class Airplane extends Vehicle implements Flyable {
    private int altitude;
    
    public Airplane(String brand) {
        super(brand);
        this.altitude = 0;
    }
    
    @Override
    public void start() {
        System.out.println(brand + " airplane engine started");
    }
    
    @Override
    public void takeOff() {
        System.out.println(brand + " is taking off");
        altitude = 10000;
        speed = 500;
    }
    
    @Override
    public void fly() {
        System.out.println(brand + " is flying at " + altitude + " feet");
    }
    
    @Override
    public void land() {
        System.out.println(brand + " is landing");
        altitude = 0;
        speed = 0;
    }
}

class AirplaneDemo {
    public static void main(String[] args) {
        Airplane plane = new Airplane("Boeing 747");
        plane.start();
        plane.displayInfo();
        
        System.out.println();
        plane.takeOff();
        plane.fly();
        plane.displayInfo();
        
        System.out.println();
        plane.land();
    }
}`,
          points: 5,
          difficulty: 'hard',
          keywords: ['abstract', 'Vehicle', 'interface', 'Flyable', 'extends', 'implements', 'Airplane', 'multiple']
        },
        {
          id: 'q15',
          type: 'short',
          question: 'Create a complete program demonstrating all OOP concepts:\n- Create an abstract Animal class with eat() abstract method\n- Create Herbivore interface with eatPlants() method\n- Create Cow class extending Animal and implementing Herbivore\n- Demonstrate polymorphism and encapsulation',
          sampleAnswer: `public abstract class Animal {
    private String name;
    private int age;
    
    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    // Getters (Encapsulation)
    public String getName() {
        return name;
    }
    
    public int getAge() {
        return age;
    }
    
    // Abstract method
    public abstract void eat();
    
    public void sleep() {
        System.out.println(name + " is sleeping");
    }
}

interface Herbivore {
    void eatPlants();
}

class Cow extends Animal implements Herbivore {
    private String breed;
    
    public Cow(String name, int age, String breed) {
        super(name, age);
        this.breed = breed;
    }
    
    @Override
    public void eat() {
        System.out.println(getName() + " the cow is eating");
    }
    
    @Override
    public void eatPlants() {
        System.out.println(getName() + " is eating grass and hay");
    }
    
    public void moo() {
        System.out.println(getName() + " says: Moo!");
    }
    
    public void displayInfo() {
        System.out.println("Name: " + getName());
        System.out.println("Age: " + getAge());
        System.out.println("Breed: " + breed);
    }
}

class OOPDemo {
    public static void main(String[] args) {
        // Polymorphism - parent reference, child object
        Animal animal = new Cow("Bessie", 5, "Holstein");
        animal.eat();
        animal.sleep();
        
        System.out.println();
        
        // Interface reference
        Herbivore herbivore = new Cow("Daisy", 3, "Jersey");
        herbivore.eatPlants();
        
        System.out.println();
        
        // Direct object reference
        Cow cow = new Cow("Molly", 4, "Angus");
        cow.displayInfo();
        cow.eat();
        cow.eatPlants();
        cow.moo();
        
        System.out.println("\\nDemonstrating Polymorphism:");
        Animal[] animals = {
            new Cow("Cow1", 2, "Holstein"),
            new Cow("Cow2", 3, "Jersey")
        };
        
        for (Animal a : animals) {
            a.eat();
        }
    }
}`,
          points: 5,
          difficulty: 'hard',
          keywords: ['abstract', 'Animal', 'interface', 'Herbivore', 'Cow', 'polymorphism', 'encapsulation', 'extends', 'implements']
        }
      ]
    }
  ]
};