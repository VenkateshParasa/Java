// Day 1: Introduction & Setup - Medium Assessment
export default {
  title: "Day 1: Introduction & Setup - Medium Assessment",
  difficulty: "medium",
  passingScore: 70,
  timeLimit: 30,
  sections: [
    {
      id: 'section-a',
      title: 'Section A: Multiple Choice Questions',
      description: 'Choose the best answer for each question',
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          question: 'What is the correct signature of the main method?',
          options: [
            'public void main(String[] args)',
            'public static void main(String[] args)',
            'static void main(String args)',
            'public main(String[] args)'
          ],
          correctAnswer: 1,
          explanation: 'The correct signature is: public static void main(String[] args). It must be public, static, void, and take a String array as parameter.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'What happens when you compile a Java file?',
          options: [
            'It creates an executable file',
            'It creates a .class file with bytecode',
            'It creates a .jar file',
            'It runs the program'
          ],
          correctAnswer: 1,
          explanation: 'Compilation creates a .class file containing bytecode that can be executed by the JVM.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'Which of the following is NOT a feature of Java?',
          options: [
            'Object-Oriented',
            'Platform-Independent',
            'Pointer Arithmetic',
            'Automatic Memory Management'
          ],
          correctAnswer: 2,
          explanation: 'Java does not support pointer arithmetic for security and simplicity reasons.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'What is bytecode in Java?',
          options: [
            'Source code',
            'Machine code',
            'Intermediate code executed by JVM',
            'Assembly code'
          ],
          correctAnswer: 2,
          explanation: 'Bytecode is intermediate code that is platform-independent and executed by the JVM.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'Which component of Java platform is responsible for converting bytecode to machine code?',
          options: [
            'Compiler',
            'JIT Compiler',
            'Interpreter',
            'Both JIT Compiler and Interpreter'
          ],
          correctAnswer: 3,
          explanation: 'The JVM uses both an interpreter and JIT (Just-In-Time) compiler to convert bytecode to machine code. The interpreter executes bytecode directly, while JIT compiles frequently used code to native machine code for better performance.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'What is the file extension of compiled Java bytecode?',
          options: [
            '.java',
            '.class',
            '.byte',
            '.bin'
          ],
          correctAnswer: 1,
          explanation: 'Compiled Java bytecode is stored in files with the .class extension.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'Which of the following tools is included in JDK but not in JRE?',
          options: [
            'JVM',
            'Class libraries',
            'javac (compiler)',
            'java (launcher)'
          ],
          correctAnswer: 2,
          explanation: 'The javac compiler is part of JDK for development purposes. JRE only includes runtime components like JVM and libraries.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q8',
          type: 'mcq',
          question: 'What principle does Java follow for platform independence?',
          options: [
            'Compile Once, Run Anywhere',
            'Write Once, Run Anywhere',
            'Code Once, Execute Anywhere',
            'Build Once, Deploy Anywhere'
          ],
          correctAnswer: 1,
          explanation: 'Java follows the "Write Once, Run Anywhere" (WORA) principle, meaning code written once can run on any platform with a JVM.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q9',
          type: 'mcq',
          question: 'Which version introduced major improvements to the Java platform in terms of modularity?',
          options: [
            'Java 7',
            'Java 8',
            'Java 9',
            'Java 11'
          ],
          correctAnswer: 2,
          explanation: 'Java 9 introduced the Java Platform Module System (JPMS), also known as Project Jigsaw, which brought modularity to Java.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q10',
          type: 'mcq',
          question: 'What happens if you try to run a Java program without the main method?',
          options: [
            'The program compiles but throws a runtime error',
            'The program will not compile',
            'The program runs but does nothing',
            'The program uses a default main method'
          ],
          correctAnswer: 0,
          explanation: 'The program will compile successfully but will throw a runtime error (NoSuchMethodError) when you try to run it, as the JVM cannot find the main method entry point.',
          points: 3,
          difficulty: 'medium'
        }
      ]
    },
    {
      id: 'section-b',
      title: 'Section B: True/False Questions',
      description: 'Determine whether each statement is true or false',
      questions: [
        {
          id: 'q11',
          type: 'truefalse',
          question: 'Java supports multiple inheritance through classes.',
          correctAnswer: false,
          explanation: 'False. Java does not support multiple inheritance through classes, but it does through interfaces.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q12',
          type: 'truefalse',
          question: 'The JVM is platform-specific while bytecode is platform-independent.',
          correctAnswer: true,
          explanation: 'True. Bytecode is platform-independent, but each operating system needs its own JVM implementation to execute that bytecode.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q13',
          type: 'truefalse',
          question: 'You can run Java programs without installing the JDK if you have JRE installed.',
          correctAnswer: true,
          explanation: 'True. JRE is sufficient to run Java programs. JDK is only needed for development (compiling source code).',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q14',
          type: 'truefalse',
          question: 'Java bytecode can be directly executed by the computer processor.',
          correctAnswer: false,
          explanation: 'False. Bytecode cannot be directly executed by the processor. It needs to be interpreted or compiled to machine code by the JVM first.',
          points: 3,
          difficulty: 'medium'
        }
      ]
    },
    {
      id: 'section-c',
      title: 'Section C: Short Answer Questions',
      description: 'Provide brief answers to the following questions',
      questions: [
        {
          id: 'q15',
          type: 'shortanswer',
          question: 'Explain the difference between JDK, JRE, and JVM in your own words.',
          sampleAnswer: 'JDK is the development kit with tools to develop Java applications. JRE is the runtime environment needed to run Java applications. JVM is the virtual machine that executes Java bytecode.',
          keywords: ['jdk', 'jre', 'jvm', 'development', 'runtime', 'execute', 'bytecode', 'tools'],
          minKeywords: 3,
          explanation: 'JDK (Java Development Kit) contains development tools including compiler. JRE (Java Runtime Environment) contains libraries and JVM needed to run Java programs. JVM (Java Virtual Machine) executes the bytecode.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: 'q16',
          type: 'shortanswer',
          question: 'Why is Java called a "platform-independent" language?',
          sampleAnswer: 'Java is platform-independent because Java code is compiled into bytecode which can run on any platform that has a JVM, following the principle "Write Once, Run Anywhere".',
          keywords: ['bytecode', 'jvm', 'platform', 'write once', 'run anywhere', 'compile'],
          minKeywords: 2,
          explanation: 'Java is platform-independent because it compiles to bytecode that runs on the JVM, not directly on the operating system. This allows the same code to run on any platform with a JVM.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: 'q17',
          type: 'shortanswer',
          question: 'Describe the process of compiling and running a Java program from start to finish.',
          sampleAnswer: 'First, write the source code in a .java file. Use javac to compile it into .class bytecode. Then use the java command to run the bytecode through the JVM, which interprets or compiles it to machine code for execution.',
          keywords: ['source', 'javac', 'compile', 'class', 'bytecode', 'java', 'jvm', 'execute', 'machine code'],
          minKeywords: 4,
          explanation: 'The process involves: 1) Writing source code (.java), 2) Compiling with javac to create bytecode (.class), 3) Running with java command which loads the bytecode into JVM, 4) JVM converts bytecode to machine code and executes it.',
          points: 5,
          difficulty: 'medium'
        }
      ]
    }
  ]
};
