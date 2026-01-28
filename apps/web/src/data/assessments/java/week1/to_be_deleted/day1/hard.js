// Day 1: Introduction & Setup - Hard Assessment
export default {
  title: "Day 1: Introduction & Setup - Hard Assessment",
  difficulty: "hard",
  passingScore: 70,
  timeLimit: 45,
  sections: [
    {
      id: 'section-a',
      title: 'Section A: Advanced Multiple Choice Questions',
      description: 'Choose the best answer for each question',
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          question: 'What is the primary difference between the JIT compiler and the traditional compiler in Java?',
          options: [
            'JIT compiles the entire program at once, traditional compilers compile method by method',
            'JIT compiles bytecode to native code at runtime, traditional compilers compile source to bytecode',
            'JIT is slower than traditional compilers',
            'JIT only works on Windows platforms'
          ],
          correctAnswer: 1,
          explanation: 'The JIT (Just-In-Time) compiler compiles bytecode to native machine code at runtime for frequently executed code paths, while the traditional Java compiler (javac) compiles source code to platform-independent bytecode.',
          points: 3,
          difficulty: 'hard'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'Which memory area in JVM is shared among all threads?',
          options: [
            'Program Counter Register',
            'Java Stack',
            'Method Area',
            'Native Method Stack'
          ],
          correctAnswer: 2,
          explanation: 'The Method Area (also known as Metaspace in Java 8+) is shared among all threads and stores class structures, method data, and runtime constant pool. Each thread has its own PC register, Java stack, and native method stack.',
          points: 3,
          difficulty: 'hard'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'What will happen if a Java source file contains multiple public classes?',
          options: [
            'The program will compile successfully',
            'The compiler will throw an error',
            'Only the first public class will be compiled',
            'All classes will be compiled into separate .class files'
          ],
          correctAnswer: 1,
          explanation: 'A Java source file can contain only one public class, and the file name must match the public class name. Having multiple public classes in a single file will cause a compilation error.',
          points: 3,
          difficulty: 'hard'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'In which scenario would you need the JDK instead of just the JRE?',
          options: [
            'Running a web application on a server',
            'Executing a standalone Java application',
            'Compiling Java source code and creating JAR files',
            'Running Java applets in a browser'
          ],
          correctAnswer: 2,
          explanation: 'JDK is required when you need to compile source code (javac), create JAR files (jar), or use other development tools. JRE is sufficient for running already compiled Java applications.',
          points: 2,
          difficulty: 'hard'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'What is the role of the ClassLoader subsystem in JVM?',
          options: [
            'It executes the bytecode instructions',
            'It manages memory allocation for objects',
            'It loads, links, and initializes class files at runtime',
            'It performs garbage collection'
          ],
          correctAnswer: 2,
          explanation: 'The ClassLoader subsystem is responsible for loading class files into memory, linking them (verification, preparation, resolution), and initializing static variables and blocks.',
          points: 3,
          difficulty: 'hard'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'Which of the following is true about Java bytecode verification?',
          options: [
            'It happens during compilation',
            'It is performed by the JVM before executing the bytecode',
            'It is optional and can be skipped for better performance',
            'It only checks syntax errors'
          ],
          correctAnswer: 1,
          explanation: 'Bytecode verification is performed by the JVM during the linking phase of class loading. It ensures the bytecode is valid, does not violate Java security constraints, and will not cause runtime errors.',
          points: 3,
          difficulty: 'hard'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'What is the significance of the "String[] args" parameter in the main method?',
          options: [
            'It is mandatory but serves no purpose',
            'It stores command-line arguments passed to the program',
            'It initializes the String class',
            'It defines the program return value'
          ],
          correctAnswer: 1,
          explanation: 'The String[] args parameter receives command-line arguments passed when running the program. Each argument is stored as a String in the array, allowing the program to accept input at startup.',
          points: 2,
          difficulty: 'hard'
        },
        {
          id: 'q8',
          type: 'mcq',
          question: 'Which phase of the Java compilation and execution process performs bytecode optimization?',
          options: [
            'Source code compilation by javac',
            'Class loading by ClassLoader',
            'Runtime compilation by JIT compiler',
            'Bytecode verification'
          ],
          correctAnswer: 2,
          explanation: 'The JIT (Just-In-Time) compiler performs bytecode optimization at runtime by identifying frequently executed code ("hot spots") and compiling them to optimized native machine code.',
          points: 3,
          difficulty: 'hard'
        },
        {
          id: 'q9',
          type: 'mcq',
          question: 'What happens to the static variables when a class is loaded by different ClassLoaders?',
          options: [
            'Static variables are shared across all ClassLoaders',
            'Each ClassLoader creates its own copy of static variables',
            'The first ClassLoader owns the static variables',
            'Static variables cannot exist in such scenarios'
          ],
          correctAnswer: 1,
          explanation: 'When the same class is loaded by different ClassLoaders, each ClassLoader creates a separate copy of the class, including separate instances of static variables. This is because classes are identified by both their name and their ClassLoader.',
          points: 4,
          difficulty: 'hard'
        },
        {
          id: 'q10',
          type: 'mcq',
          question: 'Which statement about Java\'s "Write Once, Run Anywhere" is most accurate?',
          options: [
            'Java code runs identically on all platforms without any considerations',
            'Java bytecode is platform-independent, but developers must consider platform-specific differences like file paths and native libraries',
            'Java automatically converts code to work on any platform',
            'WORA only applies to console applications, not GUI applications'
          ],
          correctAnswer: 1,
          explanation: 'While Java bytecode is platform-independent, developers still need to account for platform-specific differences such as file path separators, line endings, native libraries, and some OS-specific APIs. True WORA requires careful coding practices.',
          points: 4,
          difficulty: 'hard'
        }
      ]
    },
    {
      id: 'section-b',
      title: 'Section B: Advanced True/False Questions',
      description: 'Determine whether each statement is true or false',
      questions: [
        {
          id: 'q11',
          type: 'truefalse',
          question: 'The JVM executes bytecode using only interpretation, never compilation.',
          correctAnswer: false,
          explanation: 'False. Modern JVMs use a combination of interpretation and Just-In-Time (JIT) compilation. Frequently executed code is compiled to native machine code for better performance.',
          points: 3,
          difficulty: 'hard'
        },
        {
          id: 'q12',
          type: 'truefalse',
          question: 'A .class file generated on Windows can run on Linux without recompilation.',
          correctAnswer: true,
          explanation: 'True. Java bytecode (.class files) is platform-independent and can run on any platform with a compatible JVM without modification or recompilation.',
          points: 2,
          difficulty: 'hard'
        },
        {
          id: 'q13',
          type: 'truefalse',
          question: 'The main method can have a return type other than void.',
          correctAnswer: false,
          explanation: 'False. The main method must have a void return type. If it has any other return type, the JVM will not recognize it as a valid entry point.',
          points: 2,
          difficulty: 'hard'
        },
        {
          id: 'q14',
          type: 'truefalse',
          question: 'Java uses Ahead-of-Time (AOT) compilation exclusively to convert source code to machine code.',
          correctAnswer: false,
          explanation: 'False. Java primarily uses a two-step process: source code to bytecode (AOT by javac), then bytecode to machine code (JIT at runtime). However, Java 9+ does support optional AOT compilation for specific use cases.',
          points: 3,
          difficulty: 'hard'
        },
        {
          id: 'q15',
          type: 'truefalse',
          question: 'The main method must be declared with public access modifier; any other access modifier will prevent execution.',
          correctAnswer: true,
          explanation: 'True. The main method must be public so the JVM can access it from outside the class. If it has a different access modifier (private, protected, or default), the JVM cannot invoke it and will throw a runtime error.',
          points: 2,
          difficulty: 'hard'
        }
      ]
    },
    {
      id: 'section-c',
      title: 'Section C: Application-Based Questions',
      description: 'Apply your knowledge to solve complex scenarios',
      questions: [
        {
          id: 'q16',
          type: 'shortanswer',
          question: 'Explain the complete journey of a Java program from source code to execution, including all major components and transformations.',
          sampleAnswer: 'The source code (.java) is compiled by javac into bytecode (.class). The JVM\'s ClassLoader loads the bytecode, verifies it for security, and prepares it for execution. The Execution Engine then uses the interpreter for initial execution and JIT compiler for frequently used code paths, converting bytecode to native machine code. The JVM manages memory through heap and stack areas, with garbage collection handling memory cleanup.',
          keywords: ['source', 'javac', 'bytecode', 'classloader', 'verification', 'jit', 'interpreter', 'native', 'heap', 'garbage collection', 'execution engine'],
          minKeywords: 6,
          explanation: 'The process involves: 1) javac compiles .java to .class bytecode, 2) ClassLoader loads and links classes, 3) Bytecode Verifier checks validity, 4) Execution Engine uses interpreter and JIT compiler to execute code, 5) Runtime Data Areas (heap, stack, method area) manage memory, 6) Garbage Collector manages automatic memory cleanup.',
          points: 6,
          difficulty: 'hard'
        },
        {
          id: 'q17',
          type: 'shortanswer',
          question: 'Why is the main method required to be static? What would happen if it were not static, and how does this relate to JVM architecture?',
          sampleAnswer: 'The main method must be static because the JVM needs to call it without creating an instance of the class. When the JVM starts, no objects exist yet. If main were not static, the JVM would need to instantiate the class first, which would require calling a constructor, potentially leading to circular dependencies. Being static allows the JVM to invoke it directly using the class name.',
          keywords: ['static', 'jvm', 'instance', 'object', 'constructor', 'class', 'invoke', 'without object'],
          minKeywords: 4,
          explanation: 'Static methods belong to the class rather than instances. The JVM calls main() before any objects are created, so it must be static to be accessible without instantiation. This is fundamental to JVM\'s bootstrap process.',
          points: 5,
          difficulty: 'hard'
        },
        {
          id: 'q18',
          type: 'shortanswer',
          question: 'Compare and contrast the roles of the Java compiler (javac) and the JIT compiler. When and why is each used?',
          sampleAnswer: 'javac is a static compiler that converts Java source code to platform-independent bytecode before runtime. JIT is a dynamic compiler that converts bytecode to native machine code during runtime for frequently executed code. javac is used during development for compilation, while JIT is used by the JVM during execution for performance optimization. javac produces the same output for the same input, while JIT optimizes based on runtime behavior and platform-specific characteristics.',
          keywords: ['javac', 'jit', 'source', 'bytecode', 'native', 'runtime', 'compile-time', 'optimization', 'platform-independent', 'performance'],
          minKeywords: 5,
          explanation: 'javac performs ahead-of-time compilation from source to bytecode (platform-independent). JIT performs just-in-time compilation from bytecode to native code (platform-specific) at runtime, optimizing hot spots for better performance. Both are essential but serve different purposes in the Java execution model.',
          points: 6,
          difficulty: 'hard'
        },
        {
          id: 'q19',
          type: 'shortanswer',
          question: 'Describe the ClassLoader subsystem in JVM and explain its three main phases with examples.',
          sampleAnswer: 'ClassLoader has three phases: 1) Loading - reads .class files and creates Class objects in memory (e.g., Bootstrap ClassLoader loads core Java classes), 2) Linking - includes verification (checks bytecode validity), preparation (allocates memory for static variables), and resolution (converts symbolic references to direct references), 3) Initialization - executes static blocks and initializes static variables with their assigned values.',
          keywords: ['classloader', 'loading', 'linking', 'initialization', 'verification', 'preparation', 'resolution', 'static', 'bytecode', 'class object'],
          minKeywords: 6,
          explanation: 'ClassLoader subsystem manages class lifecycle through: Loading (reading and creating Class objects), Linking (verification of bytecode, preparation of memory, resolution of references), and Initialization (executing static initializers). This ensures classes are properly validated and prepared before use.',
          points: 6,
          difficulty: 'hard'
        },
        {
          id: 'q20',
          type: 'shortanswer',
          question: 'Explain why Java bytecode verification is critical for security and what types of issues it prevents.',
          sampleAnswer: 'Bytecode verification ensures that loaded bytecode follows Java language rules and security constraints. It prevents: stack overflow/underflow attacks, invalid type casts that could access private data, unauthorized access to protected members, and execution of malicious code. The verifier checks that bytecode doesn\'t violate type safety, doesn\'t forge pointers, doesn\'t access objects improperly, and ensures method calls match their signatures. This is crucial when loading untrusted code, such as downloaded applets or libraries.',
          keywords: ['verification', 'security', 'bytecode', 'type safety', 'stack', 'access control', 'malicious', 'validation', 'untrusted code', 'runtime safety'],
          minKeywords: 5,
          explanation: 'Bytecode verification is a critical security feature that validates bytecode before execution. It ensures type safety, prevents memory corruption, validates stack operations, checks access control, and prevents execution of malicious bytecode. This is essential in Java\'s security model, especially for running untrusted code.',
          points: 6,
          difficulty: 'hard'
        }
      ]
    }
  ]
};
