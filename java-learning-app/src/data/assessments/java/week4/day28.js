export default {
  title: "Day 28: Inner Classes & Enums Assessment",
  description: "Test your understanding of inner classes, nested classes, and enumerations",
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
          question: 'What is an inner class?',
          options: [
            'A class outside another class',
            'A class inside another class',
            'A subclass',
            'An interface'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'An inner class is a class defined within another class. It has access to the outer class\'s members.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'Can a static nested class access instance members of outer class?',
          options: [
            'Yes',
            'No',
            'Only public members',
            'Only with object reference'
          ],
          correctAnswer: 3,
          points: 2,
          difficulty: 'medium',
          explanation: 'Static nested classes cannot directly access instance members of the outer class. They need an object reference of the outer class.'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'Where is a local inner class defined?',
          options: [
            'Inside a class',
            'Inside a method',
            'Inside a package',
            'Inside an interface'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'A local inner class is defined inside a method or block. It\'s only accessible within that method/block.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'What is an anonymous inner class?',
          options: [
            'A class with no name',
            'A class with private name',
            'A class inside method',
            'A static class'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'easy',
          explanation: 'An anonymous inner class is a class without a name, defined and instantiated in a single expression.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'What is an enum?',
          options: [
            'A class',
            'An interface',
            'A special class for constants',
            'A method'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'An enum is a special class that represents a group of constants (unchangeable variables).'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'Can you add methods to an enum?',
          options: [
            'No',
            'Yes',
            'Only static methods',
            'Only abstract methods'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Enums can have constructors, fields, and methods just like regular classes.'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'Which method returns all enum constants?',
          options: [
            'getAll()',
            'values()',
            'constants()',
            'list()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'The values() method returns an array containing all enum constants in the order they are declared.'
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
          question: 'Explain the four types of inner classes in Java.',
          sampleAnswer: '1) Member Inner Class: Defined at class level, has access to all outer class members including private. Created using: Outer.Inner inner = outer.new Inner(). 2) Static Nested Class: Defined with static keyword, cannot access instance members directly. Created using: Outer.Inner inner = new Outer.Inner(). 3) Local Inner Class: Defined inside method/block, can access final/effectively final local variables. Scope limited to method. 4) Anonymous Inner Class: No name, defined and instantiated in single expression. Used for one-time implementations of interfaces/abstract classes.',
          points: 3,
          difficulty: 'hard',
          keywords: ['member inner', 'static nested', 'local inner', 'anonymous', 'four types', 'access', 'scope']
        },
        {
          id: 'q9',
          type: 'short',
          question: 'When would you use an anonymous inner class?',
          sampleAnswer: 'Use anonymous inner classes when: 1) Need one-time implementation of interface/abstract class. 2) Implementation is simple and short. 3) Don\'t need to reuse the class. Common uses: Event handlers (button.addActionListener(new ActionListener() {...})), Thread creation (new Thread(new Runnable() {...})), Comparators for sorting. Modern alternative: Lambda expressions (Java 8+) for functional interfaces. Example: Collections.sort(list, (a, b) -> a.compareTo(b)) instead of anonymous Comparator.',
          points: 3,
          difficulty: 'medium',
          keywords: ['anonymous', 'one-time', 'interface', 'implementation', 'event handler', 'lambda', 'use case']
        },
        {
          id: 'q10',
          type: 'short',
          question: 'What are the advantages of using enums over constants?',
          sampleAnswer: 'Advantages of enums over constants: 1) Type safety - cannot assign invalid values. 2) Namespace - constants grouped together. 3) Methods and fields - can add behavior. 4) Switch statements - compiler checks all cases. 5) Iteration - can loop through all values using values(). 6) Singleton pattern - enum constants are singletons. 7) Serialization - handled automatically. 8) Readability - more meaningful than int constants. Example: Season.SPRING vs int SPRING = 1.',
          points: 3,
          difficulty: 'medium',
          keywords: ['enum', 'type safety', 'namespace', 'methods', 'switch', 'values', 'advantages', 'constants']
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
          question: 'Create a class with a member inner class and demonstrate accessing outer class members.',
          sampleAnswer: `class Outer {
    private String outerField = "Outer Field";
    private static String staticField = "Static Field";
    
    // Member inner class
    class Inner {
        private String innerField = "Inner Field";
        
        void display() {
            // Access outer class members
            System.out.println("From Inner class:");
            System.out.println("Outer field: " + outerField);
            System.out.println("Static field: " + staticField);
            System.out.println("Inner field: " + innerField);
            
            // Call outer class method
            outerMethod();
        }
        
        void accessOuterThis() {
            System.out.println("\\nOuter.this reference:");
            System.out.println(Outer.this.outerField);
        }
    }
    
    void outerMethod() {
        System.out.println("Outer method called from inner class");
    }
    
    void createInner() {
        Inner inner = new Inner();
        inner.display();
        
        // Access inner class field
        System.out.println("\\nAccessing inner field from outer: " + inner.innerField);
    }
}

public class InnerClassDemo {
    public static void main(String[] args) {
        // Create outer class instance
        Outer outer = new Outer();
        outer.createInner();
        
        System.out.println("\\n" + "=".repeat(50));
        
        // Create inner class instance from outside
        Outer.Inner inner = outer.new Inner();
        inner.display();
        inner.accessOuterThis();
        
        // Multiple inner instances
        System.out.println("\\n" + "=".repeat(50));
        System.out.println("Multiple inner instances:");
        
        Outer outer2 = new Outer();
        Outer.Inner inner1 = outer.new Inner();
        Outer.Inner inner2 = outer2.new Inner();
        
        inner1.display();
        System.out.println();
        inner2.display();
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['inner class', 'member', 'outer class', 'access', 'Outer.this', 'private', 'new']
        },
        {
          id: 'q12',
          type: 'short',
          question: 'Create an anonymous inner class to implement an interface (e.g., Runnable).',
          sampleAnswer: `interface Greeting {
    void greet(String name);
}

interface Calculator {
    int calculate(int a, int b);
}

public class AnonymousClassDemo {
    public static void main(String[] args) {
        // Anonymous class implementing Greeting interface
        Greeting greeting = new Greeting() {
            @Override
            public void greet(String name) {
                System.out.println("Hello, " + name + "!");
            }
        };
        greeting.greet("Alice");
        
        // Anonymous class implementing Runnable
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                for (int i = 1; i <= 5; i++) {
                    System.out.println("Thread: " + i);
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        });
        thread.start();
        
        // Anonymous class implementing Calculator
        Calculator add = new Calculator() {
            @Override
            public int calculate(int a, int b) {
                return a + b;
            }
        };
        System.out.println("Addition: " + add.calculate(5, 3));
        
        Calculator multiply = new Calculator() {
            @Override
            public int calculate(int a, int b) {
                return a * b;
            }
        };
        System.out.println("Multiplication: " + multiply.calculate(5, 3));
        
        // Comparison with Lambda (Java 8+)
        System.out.println("\\n=== Lambda Comparison ===");
        
        // Anonymous class
        Greeting greeting1 = new Greeting() {
            public void greet(String name) {
                System.out.println("Hi, " + name);
            }
        };
        
        // Lambda (more concise)
        Greeting greeting2 = (name) -> System.out.println("Hi, " + name);
        
        greeting1.greet("Bob");
        greeting2.greet("Charlie");
        
        // Anonymous class with state
        Calculator counter = new Calculator() {
            private int count = 0;
            
            @Override
            public int calculate(int a, int b) {
                count++;
                System.out.println("Calculation #" + count);
                return a + b;
            }
        };
        
        System.out.println("Result: " + counter.calculate(10, 20));
        System.out.println("Result: " + counter.calculate(5, 15));
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['anonymous', 'inner class', 'interface', 'Runnable', 'implement', 'override', 'lambda']
        },
        {
          id: 'q13',
          type: 'short',
          question: 'Create an enum for days of the week with a method to check if it\'s a weekend.',
          sampleAnswer: `enum Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY;
    
    // Method to check if weekend
    public boolean isWeekend() {
        return this == SATURDAY || this == SUNDAY;
    }
    
    // Method to check if weekday
    public boolean isWeekday() {
        return !isWeekend();
    }
    
    // Get next day
    public Day getNextDay() {
        int nextIndex = (this.ordinal() + 1) % values().length;
        return values()[nextIndex];
    }
    
    // Get previous day
    public Day getPreviousDay() {
        int prevIndex = (this.ordinal() - 1 + values().length) % values().length;
        return values()[prevIndex];
    }
}

public class DayEnumDemo {
    public static void main(String[] args) {
        System.out.println("=== Days of the Week ===");
        
        // Iterate through all days
        for (Day day : Day.values()) {
            String type = day.isWeekend() ? "Weekend" : "Weekday";
            System.out.println(day + " - " + type);
        }
        
        // Check specific days
        System.out.println("\\n=== Weekend Check ===");
        Day today = Day.FRIDAY;
        System.out.println("Today is " + today);
        System.out.println("Is weekend? " + today.isWeekend());
        System.out.println("Is weekday? " + today.isWeekday());
        
        // Navigation
        System.out.println("\\n=== Day Navigation ===");
        System.out.println("Next day: " + today.getNextDay());
        System.out.println("Previous day: " + today.getPreviousDay());
        
        // Using in switch
        System.out.println("\\n=== Switch Statement ===");
        printDayActivity(Day.MONDAY);
        printDayActivity(Day.SATURDAY);
        
        // Enum properties
        System.out.println("\\n=== Enum Properties ===");
        System.out.println("Name: " + Day.MONDAY.name());
        System.out.println("Ordinal: " + Day.MONDAY.ordinal());
        System.out.println("String: " + Day.MONDAY.toString());
        
        // Parse from string
        Day parsed = Day.valueOf("WEDNESDAY");
        System.out.println("Parsed: " + parsed);
    }
    
    static void printDayActivity(Day day) {
        System.out.print(day + ": ");
        switch (day) {
            case MONDAY:
            case TUESDAY:
            case WEDNESDAY:
            case THURSDAY:
            case FRIDAY:
                System.out.println("Work day");
                break;
            case SATURDAY:
            case SUNDAY:
                System.out.println("Rest day");
                break;
        }
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['enum', 'Day', 'weekend', 'method', 'isWeekend', 'values', 'ordinal', 'switch']
        },
        {
          id: 'q14',
          type: 'short',
          question: 'Create a Pizza enum with sizes (SMALL, MEDIUM, LARGE) where each size has a price.',
          sampleAnswer: `enum PizzaSize {
    SMALL(8.99, 10),
    MEDIUM(12.99, 12),
    LARGE(16.99, 14),
    EXTRA_LARGE(20.99, 16);
    
    private final double price;
    private final int diameter; // in inches
    
    // Constructor
    PizzaSize(double price, int diameter) {
        this.price = price;
        this.diameter = diameter;
    }
    
    // Getters
    public double getPrice() {
        return price;
    }
    
    public int getDiameter() {
        return diameter;
    }
    
    // Calculate price per square inch
    public double getPricePerSquareInch() {
        double radius = diameter / 2.0;
        double area = Math.PI * radius * radius;
        return price / area;
    }
    
    // Get best value
    public static PizzaSize getBestValue() {
        PizzaSize best = SMALL;
        double lowestPricePerInch = SMALL.getPricePerSquareInch();
        
        for (PizzaSize size : values()) {
            double pricePerInch = size.getPricePerSquareInch();
            if (pricePerInch < lowestPricePerInch) {
                lowestPricePerInch = pricePerInch;
                best = size;
            }
        }
        return best;
    }
    
    // Display info
    public void displayInfo() {
        System.out.printf("%s: $%.2f (%d inches) - $%.4f per sq inch%n",
            this.name(), price, diameter, getPricePerSquareInch());
    }
}

enum Topping {
    CHEESE(1.50),
    PEPPERONI(2.00),
    MUSHROOMS(1.75),
    OLIVES(1.50),
    ONIONS(1.25),
    PEPPERS(1.50);
    
    private final double price;
    
    Topping(double price) {
        this.price = price;
    }
    
    public double getPrice() {
        return price;
    }
}

class Pizza {
    private PizzaSize size;
    private List<Topping> toppings;
    
    public Pizza(PizzaSize size) {
        this.size = size;
        this.toppings = new ArrayList<>();
    }
    
    public void addTopping(Topping topping) {
        toppings.add(topping);
    }
    
    public double getTotalPrice() {
        double total = size.getPrice();
        for (Topping topping : toppings) {
            total += topping.getPrice();
        }
        return total;
    }
    
    public void displayOrder() {
        System.out.println("\\nPizza Order:");
        System.out.println("Size: " + size + " ($" + size.getPrice() + ")");
        System.out.println("Toppings:");
        for (Topping topping : toppings) {
            System.out.println("  - " + topping + " ($" + topping.getPrice() + ")");
        }
        System.out.printf("Total: $%.2f%n", getTotalPrice());
    }
}

public class PizzaEnumDemo {
    public static void main(String[] args) {
        System.out.println("=== Pizza Sizes ===");
        
        // Display all sizes
        for (PizzaSize size : PizzaSize.values()) {
            size.displayInfo();
        }
        
        // Find best value
        System.out.println("\\nBest value: " + PizzaSize.getBestValue());
        
        // Create pizza order
        Pizza myPizza = new Pizza(PizzaSize.LARGE);
        myPizza.addTopping(Topping.PEPPERONI);
        myPizza.addTopping(Topping.MUSHROOMS);
        myPizza.addTopping(Topping.CHEESE);
        myPizza.displayOrder();
        
        // Another order
        Pizza veggiePizza = new Pizza(PizzaSize.MEDIUM);
        veggiePizza.addTopping(Topping.MUSHROOMS);
        veggiePizza.addTopping(Topping.OLIVES);
        veggiePizza.addTopping(Topping.ONIONS);
        veggiePizza.addTopping(Topping.PEPPERS);
        veggiePizza.displayOrder();
    }
}`,
          points: 5,
          difficulty: 'hard',
          keywords: ['enum', 'Pizza', 'size', 'price', 'constructor', 'field', 'method', 'SMALL', 'MEDIUM', 'LARGE']
        }
      ]
    }
  ]
};