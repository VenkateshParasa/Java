export default {
  title: "Day 11: Encapsulation & Access Modifiers Assessment",
  description: "Test your understanding of encapsulation, access modifiers, getters, and setters",
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
          question: 'What is encapsulation?',
          options: [
            'Wrapping data and methods together',
            'Inheritance',
            'Method overloading',
            'Creating objects'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'easy',
          explanation: 'Encapsulation is the bundling of data (variables) and methods that operate on that data into a single unit (class), and hiding the internal details from outside access.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'Which access modifier provides the most restricted access?',
          options: [
            'public',
            'protected',
            'private',
            'default'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'private is the most restrictive access modifier. Private members can only be accessed within the same class.'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'What is the naming convention for a getter method?',
          options: [
            'setFieldName()',
            'getFieldName()',
            'readFieldName()',
            'fieldName()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Getter methods follow the naming convention getFieldName() for regular fields, or isFieldName() for boolean fields.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'What is the naming convention for a setter method?',
          options: [
            'getFieldName()',
            'setFieldName()',
            'writeFieldName()',
            'putFieldName()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Setter methods follow the naming convention setFieldName(value) and typically return void.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'Can a private member be accessed outside its class?',
          options: [
            'Yes',
            'No',
            'Only in subclasses',
            'Only in same package'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'No, private members cannot be accessed outside their class. They can only be accessed through public methods (getters/setters) if provided.'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'What access does default (no modifier) provide?',
          options: [
            'Public access',
            'Private access',
            'Package-private access',
            'Protected access'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'medium',
          explanation: 'Default (no modifier) provides package-private access, meaning the member is accessible only within the same package.'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'Which modifier is used for data hiding?',
          options: [
            'public',
            'private',
            'protected',
            'static'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'private modifier is used for data hiding. It restricts access to class members, enforcing encapsulation.'
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
          question: 'Explain the four access modifiers in Java and their visibility.',
          sampleAnswer: '1) private - accessible only within the same class. 2) default (no modifier) - accessible within the same package. 3) protected - accessible within same package and subclasses in other packages. 4) public - accessible from anywhere. Order of restrictiveness: private < default < protected < public.',
          points: 3,
          difficulty: 'medium',
          keywords: ['private', 'default', 'protected', 'public', 'class', 'package', 'subclass']
        },
        {
          id: 'q9',
          type: 'short',
          question: 'What are the benefits of encapsulation? Give at least three benefits.',
          sampleAnswer: '1) Data hiding - protects internal state from unauthorized access. 2) Flexibility - can change internal implementation without affecting external code. 3) Validation - can add validation logic in setters to ensure data integrity. 4) Read-only/Write-only access - can provide getters without setters or vice versa. 5) Maintainability - easier to maintain and modify code.',
          points: 3,
          difficulty: 'medium',
          keywords: ['data hiding', 'flexibility', 'validation', 'integrity', 'maintainability', 'control']
        },
        {
          id: 'q10',
          type: 'short',
          question: 'Why do we use getters and setters instead of making fields public?',
          sampleAnswer: 'Getters and setters provide controlled access to fields. Benefits: 1) Can add validation logic in setters. 2) Can make fields read-only (getter without setter) or write-only (setter without getter). 3) Can change internal representation without breaking external code. 4) Can add logging, security checks, or other logic. 5) Maintains encapsulation and data integrity.',
          points: 3,
          difficulty: 'medium',
          keywords: ['validation', 'control', 'read-only', 'encapsulation', 'integrity', 'flexibility']
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
          question: 'Create a properly encapsulated Person class with private fields: name, age. Include validation in setAge() (age > 0).',
          sampleAnswer: `public class Person {
    private String name;
    private int age;
    
    // Getter for name
    public String getName() {
        return name;
    }
    
    // Setter for name
    public void setName(String name) {
        this.name = name;
    }
    
    // Getter for age
    public int getAge() {
        return age;
    }
    
    // Setter for age with validation
    public void setAge(int age) {
        if (age > 0) {
            this.age = age;
        } else {
            System.out.println("Age must be positive!");
        }
    }
    
    public void display() {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
    }
    
    public static void main(String[] args) {
        Person p = new Person();
        p.setName("John");
        p.setAge(25);
        p.display();
        
        p.setAge(-5); // Invalid age
    }
}`,
          points: 5,
          difficulty: 'easy',
          keywords: ['private', 'getter', 'setter', 'validation', 'encapsulation', 'this']
        },
        {
          id: 'q12',
          type: 'short',
          question: 'Create a BankAccount class with private balance. Include methods: deposit(), withdraw(), getBalance(). No setter for balance.',
          sampleAnswer: `public class BankAccount {
    private String accountNo;
    private double balance;
    
    public BankAccount(String accountNo, double initialBalance) {
        this.accountNo = accountNo;
        this.balance = initialBalance;
    }
    
    // Getter for balance (read-only)
    public double getBalance() {
        return balance;
    }
    
    // Getter for accountNo
    public String getAccountNo() {
        return accountNo;
    }
    
    // Deposit method
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: $" + amount);
            System.out.println("New Balance: $" + balance);
        } else {
            System.out.println("Invalid deposit amount!");
        }
    }
    
    // Withdraw method
    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Withdrawn: $" + amount);
            System.out.println("New Balance: $" + balance);
        } else {
            System.out.println("Invalid amount or insufficient balance!");
        }
    }
    
    public static void main(String[] args) {
        BankAccount acc = new BankAccount("ACC001", 1000);
        System.out.println("Account: " + acc.getAccountNo());
        System.out.println("Initial Balance: $" + acc.getBalance());
        
        acc.deposit(500);
        acc.withdraw(300);
        acc.withdraw(2000); // Insufficient balance
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['private', 'getter', 'no setter', 'deposit', 'withdraw', 'validation', 'balance']
        },
        {
          id: 'q13',
          type: 'short',
          question: 'Create an Employee class demonstrating encapsulation with read-only field (no setter) for employeeId.',
          sampleAnswer: `public class Employee {
    private final String employeeId; // Read-only field
    private String name;
    private double salary;
    
    public Employee(String employeeId, String name, double salary) {
        this.employeeId = employeeId;
        this.name = name;
        this.salary = salary;
    }
    
    // Getter for employeeId (read-only, no setter)
    public String getEmployeeId() {
        return employeeId;
    }
    
    // Getter and Setter for name
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    // Getter and Setter for salary with validation
    public double getSalary() {
        return salary;
    }
    
    public void setSalary(double salary) {
        if (salary > 0) {
            this.salary = salary;
        } else {
            System.out.println("Salary must be positive!");
        }
    }
    
    public void display() {
        System.out.println("Employee ID: " + employeeId);
        System.out.println("Name: " + name);
        System.out.println("Salary: $" + salary);
    }
    
    public static void main(String[] args) {
        Employee emp = new Employee("EMP001", "Alice", 50000);
        emp.display();
        
        System.out.println("\\nUpdating details...");
        emp.setName("Alice Johnson");
        emp.setSalary(55000);
        emp.display();
        
        // emp.setEmployeeId("EMP002"); // Error: no setter for employeeId
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['private', 'final', 'read-only', 'no setter', 'getter', 'encapsulation', 'validation']
        }
      ]
    }
  ]
};