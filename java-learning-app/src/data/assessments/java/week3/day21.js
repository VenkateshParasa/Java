export default {
  title: "Day 21: Generics & Week 3 Review Assessment",
  description: "Test your understanding of generics, type parameters, and Week 3 concepts review",
  passingScore: 70,
  timeLimit: 35, // minutes
  modes: {
    quick: {
      questionCount: 9,
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
          question: 'What is the purpose of generics?',
          options: [
            'To generate code',
            'To provide type safety',
            'To improve performance',
            'To create generic methods'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Generics provide compile-time type safety, allowing you to catch type errors at compile time rather than runtime.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'How do you declare a generic class?',
          options: [
            'class MyClass<T>',
            'class MyClass(T)',
            'class<T> MyClass',
            'generic class MyClass<T>'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'easy',
          explanation: 'Generic classes are declared using angle brackets with type parameter: class MyClass<T> { }'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'What does <T> represent in generics?',
          options: [
            'Type parameter',
            'Template',
            'Class name',
            'Package name'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'easy',
          explanation: '<T> is a type parameter (placeholder) that will be replaced with an actual type when the generic class/method is used.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'Can you create a generic array?',
          options: [
            'Yes',
            'No',
            'Only with ArrayList',
            'Only with Object[]'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'You cannot create generic arrays directly due to type erasure. Use ArrayList or create an Object array and cast it.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'What does <? extends Number> mean?',
          options: [
            'Any type',
            'Number and its subclasses',
            'Only Number',
            'Number and its superclasses'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: '<? extends Number> is an upper bounded wildcard. It accepts Number and any subclass (Integer, Double, etc.).'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'What happens to generics at runtime?',
          options: [
            'They are retained',
            'Type erasure occurs',
            'They cause errors',
            'They are converted to objects'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'hard',
          explanation: 'Type erasure removes generic type information at runtime for backward compatibility. Generic types become Object or their bound.'
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
          question: 'Why were generics introduced in Java? What problems do they solve?',
          sampleAnswer: 'Generics were introduced to provide compile-time type safety and eliminate ClassCastException at runtime. Problems solved: 1) Type safety - catch errors at compile time. 2) Eliminate explicit casting. 3) Enable writing generic algorithms that work with different types. 4) Code reusability. Before generics, collections stored Objects requiring casting and causing runtime errors.',
          points: 3,
          difficulty: 'medium',
          keywords: ['type safety', 'compile time', 'ClassCastException', 'casting', 'reusability', 'problems']
        },
        {
          id: 'q8',
          type: 'short',
          question: 'Explain the difference between <? extends T> and <? super T>.',
          sampleAnswer: '<? extends T> (upper bound): accepts T and its subclasses, used for reading (producer). <? super T> (lower bound): accepts T and its superclasses, used for writing (consumer). PECS principle: Producer Extends, Consumer Super. Example: List<? extends Number> can read Numbers, List<? super Integer> can add Integers.',
          points: 3,
          difficulty: 'hard',
          keywords: ['extends', 'super', 'upper bound', 'lower bound', 'PECS', 'producer', 'consumer']
        },
        {
          id: 'q9',
          type: 'short',
          question: 'What is type erasure in generics?',
          sampleAnswer: 'Type erasure is the process where generic type information is removed at runtime for backward compatibility with pre-generic code. Generic types are replaced with Object or their bound. Example: List<String> becomes List at runtime. This means you cannot use instanceof with generic types or create generic arrays. Type information exists only at compile time.',
          points: 3,
          difficulty: 'hard',
          keywords: ['type erasure', 'runtime', 'compile time', 'Object', 'backward compatibility', 'removed']
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
          question: 'Create a generic Box class that can hold any type of object.',
          sampleAnswer: `public class Box<T> {
    private T content;
    
    public void set(T content) {
        this.content = content;
    }
    
    public T get() {
        return content;
    }
    
    public boolean isEmpty() {
        return content == null;
    }
    
    public void display() {
        if (isEmpty()) {
            System.out.println("Box is empty");
        } else {
            System.out.println("Box contains: " + content);
        }
    }
    
    public static void main(String[] args) {
        // Box for Integer
        Box<Integer> intBox = new Box<>();
        intBox.set(123);
        intBox.display();
        System.out.println("Value: " + intBox.get());
        
        // Box for String
        Box<String> strBox = new Box<>();
        strBox.set("Hello Generics");
        strBox.display();
        
        // Box for custom object
        Box<Person> personBox = new Box<>();
        personBox.set(new Person("Alice", 25));
        personBox.display();
    }
}

class Person {
    String name;
    int age;
    
    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    @Override
    public String toString() {
        return name + " (" + age + ")";
    }
}`,
          points: 5,
          difficulty: 'easy',
          keywords: ['generic', 'Box', 'T', 'type parameter', 'set', 'get', 'any type']
        },
        {
          id: 'q11',
          type: 'short',
          question: 'Write a generic method to print elements of any type of array.',
          sampleAnswer: `public class GenericArrayPrinter {
    // Generic method to print array
    public static <T> void printArray(T[] array) {
        System.out.print("[");
        for (int i = 0; i < array.length; i++) {
            System.out.print(array[i]);
            if (i < array.length - 1) {
                System.out.print(", ");
            }
        }
        System.out.println("]");
    }
    
    // Overloaded version with custom message
    public static <T> void printArray(String message, T[] array) {
        System.out.print(message + ": ");
        printArray(array);
    }
    
    public static void main(String[] args) {
        // Integer array
        Integer[] intArray = {1, 2, 3, 4, 5};
        printArray("Integer array", intArray);
        
        // String array
        String[] strArray = {"Apple", "Banana", "Orange"};
        printArray("String array", strArray);
        
        // Double array
        Double[] doubleArray = {1.5, 2.7, 3.9};
        printArray("Double array", doubleArray);
        
        // Custom object array
        Person[] people = {
            new Person("Alice", 25),
            new Person("Bob", 30)
        };
        printArray("Person array", people);
    }
}

class Person {
    String name;
    int age;
    
    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    @Override
    public String toString() {
        return name + "(" + age + ")";
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['generic method', 'T', 'array', 'print', 'any type', 'type parameter']
        },
        {
          id: 'q12',
          type: 'short',
          question: 'Create a generic class with bounded type parameter that accepts only Number types.',
          sampleAnswer: `public class NumberBox<T extends Number> {
    private T number;
    
    public NumberBox(T number) {
        this.number = number;
    }
    
    public T getNumber() {
        return number;
    }
    
    public void setNumber(T number) {
        this.number = number;
    }
    
    // Method using Number methods
    public double getDoubleValue() {
        return number.doubleValue();
    }
    
    public int getIntValue() {
        return number.intValue();
    }
    
    // Generic method with bounded type
    public <U extends Number> double add(U other) {
        return this.number.doubleValue() + other.doubleValue();
    }
    
    public void display() {
        System.out.println("Number: " + number);
        System.out.println("As double: " + getDoubleValue());
        System.out.println("As int: " + getIntValue());
    }
    
    public static void main(String[] args) {
        // Works with Integer
        NumberBox<Integer> intBox = new NumberBox<>(100);
        intBox.display();
        System.out.println("Add 50: " + intBox.add(50));
        
        System.out.println();
        
        // Works with Double
        NumberBox<Double> doubleBox = new NumberBox<>(3.14);
        doubleBox.display();
        System.out.println("Add 2.86: " + doubleBox.add(2.86));
        
        // Won't compile - String is not a Number
        // NumberBox<String> strBox = new NumberBox<>("Hello");
    }
}`,
          points: 5,
          difficulty: 'hard',
          keywords: ['bounded', 'extends Number', 'type parameter', 'generic', 'Number', 'constraint']
        },
        {
          id: 'q13',
          type: 'short',
          question: 'Create a Contact Management System demonstrating Week 3 concepts:\n- Store contacts in appropriate collection\n- Handle exceptions for invalid data\n- Use String manipulation for name formatting\n- Implement search functionality\n- Use generics where appropriate',
          sampleAnswer: `import java.util.*;

class InvalidContactException extends Exception {
    public InvalidContactException(String message) {
        super(message);
    }
}

class Contact {
    private String name;
    private String phone;
    private String email;
    
    public Contact(String name, String phone, String email) throws InvalidContactException {
        if (name == null || name.trim().isEmpty()) {
            throw new InvalidContactException("Name cannot be empty");
        }
        if (phone == null || !phone.matches("\\\\d{10}")) {
            throw new InvalidContactException("Phone must be 10 digits");
        }
        this.name = formatName(name);
        this.phone = phone;
        this.email = email;
    }
    
    private String formatName(String name) {
        // String manipulation - capitalize first letter of each word
        String[] words = name.trim().toLowerCase().split("\\\\s+");
        StringBuilder formatted = new StringBuilder();
        for (String word : words) {
            if (word.length() > 0) {
                formatted.append(Character.toUpperCase(word.charAt(0)))
                        .append(word.substring(1))
                        .append(" ");
            }
        }
        return formatted.toString().trim();
    }
    
    public String getName() { return name; }
    public String getPhone() { return phone; }
    public String getEmail() { return email; }
    
    @Override
    public String toString() {
        return String.format("%-20s | %-12s | %s", name, phone, email);
    }
}

class ContactManager<T extends Contact> {
    private Map<String, T> contacts;
    
    public ContactManager() {
        contacts = new LinkedHashMap<>();
    }
    
    public void addContact(T contact) {
        contacts.put(contact.getPhone(), contact);
        System.out.println("Contact added successfully");
    }
    
    public T searchByPhone(String phone) {
        return contacts.get(phone);
    }
    
    public List<T> searchByName(String name) {
        List<T> results = new ArrayList<>();
        for (T contact : contacts.values()) {
            if (contact.getName().toLowerCase().contains(name.toLowerCase())) {
                results.add(contact);
            }
        }
        return results;
    }
    
    public void displayAll() {
        if (contacts.isEmpty()) {
            System.out.println("No contacts found");
            return;
        }
        System.out.println("\\n" + "=".repeat(60));
        System.out.println(String.format("%-20s | %-12s | %s", "Name", "Phone", "Email"));
        System.out.println("=".repeat(60));
        for (T contact : contacts.values()) {
            System.out.println(contact);
        }
        System.out.println("=".repeat(60));
    }
}

public class ContactManagementSystem {
    public static void main(String[] args) {
        ContactManager<Contact> manager = new ContactManager<>();
        
        try {
            // Add contacts
            manager.addContact(new Contact("john doe", "1234567890", "john@email.com"));
            manager.addContact(new Contact("ALICE SMITH", "9876543210", "alice@email.com"));
            manager.addContact(new Contact("bob johnson", "5555555555", "bob@email.com"));
            
            // Display all
            manager.displayAll();
            
            // Search by phone
            System.out.println("\\nSearching by phone (1234567890):");
            Contact found = manager.searchByPhone("1234567890");
            if (found != null) {
                System.out.println(found);
            }
            
            // Search by name
            System.out.println("\\nSearching by name (john):");
            List<Contact> results = manager.searchByName("john");
            for (Contact c : results) {
                System.out.println(c);
            }
            
            // Try invalid contact
            System.out.println("\\nTrying to add invalid contact:");
            manager.addContact(new Contact("", "123", "invalid"));
            
        } catch (InvalidContactException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`,
          points: 5,
          difficulty: 'hard',
          keywords: ['collection', 'exception', 'String', 'search', 'generic', 'Map', 'LinkedHashMap', 'custom exception']
        }
      ]
    }
  ]
};