// Day 1: Introduction & Setup - Assessment
export default {
  title: "Day 1: Introduction & Setup Assessment",
  passingScore: 70,
  timeLimit: 30,
  modes: {
    quick: {
      title: "Quick Assessment (10 questions)",
      timeLimit: 15,
      description: "A quick 15-minute assessment covering key concepts"
    },
    full: {
      title: "Full Assessment (35 questions)",
      timeLimit: 45,
      description: "Comprehensive 45-minute assessment covering all topics in depth"
    }
  },
  sections: [
    {
      id: 'section-a',
      title: 'Section A: Multiple Choice Questions',
      description: 'Choose the best answer for each question',
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          question: 'What does JVM stand for?',
          options: [
            'Java Virtual Method',
            'Java Variable Machine',
            'Java Virtual Machine',
            'Java Verified Machine'
          ],
          correctAnswer: 2,
          explanation: 'JVM stands for Java Virtual Machine, which is responsible for executing Java bytecode.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'Which component is needed to run Java programs?',
          options: [
            'JDK only',
            'JRE only',
            'JVM only',
            'IDE only'
          ],
          correctAnswer: 1,
          explanation: 'JRE (Java Runtime Environment) is needed to run Java programs. It includes the JVM and necessary libraries.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'What is the correct extension for Java source files?',
          options: [
            '.class',
            '.java',
            '.jv',
            '.src'
          ],
          correctAnswer: 1,
          explanation: 'Java source files have the .java extension. After compilation, they become .class files.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'Which command is used to compile Java programs?',
          options: [
            'java',
            'javac',
            'compile',
            'run'
          ],
          correctAnswer: 1,
          explanation: 'The javac command is used to compile Java source files into bytecode.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'What is the entry point of a Java application?',
          options: [
            'start() method',
            'init() method',
            'main() method',
            'begin() method'
          ],
          correctAnswer: 2,
          explanation: 'The main() method is the entry point of any Java application.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q6',
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
        }
      ]
    },
    {
      id: 'section-b',
      title: 'Section B: True/False Questions',
      description: 'Determine whether each statement is true or false',
      questions: [
        {
          id: 'q7',
          type: 'truefalse',
          question: 'Java is a platform-independent language.',
          correctAnswer: true,
          explanation: 'True. Java is platform-independent because Java bytecode can run on any platform that has a JVM.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q8',
          type: 'truefalse',
          question: 'JDK includes JRE and development tools.',
          correctAnswer: true,
          explanation: 'True. JDK (Java Development Kit) includes JRE plus development tools like compiler (javac), debugger, etc.',
          points: 2,
          difficulty: 'easy'
        }
      ]
    },
    {
      id: 'section-c',
      title: 'Section C: Short Answer Questions',
      description: 'Provide brief answers to the following questions',
      questions: [
        {
          id: 'q9',
          type: 'shortanswer',
          question: 'Explain the difference between JDK, JRE, and JVM in your own words.',
          sampleAnswer: 'JDK is the development kit with tools to develop Java applications. JRE is the runtime environment needed to run Java applications. JVM is the virtual machine that executes Java bytecode.',
          keywords: ['jdk', 'jre', 'jvm', 'development', 'runtime', 'execute', 'bytecode', 'tools'],
          minKeywords: 3,
          explanation: 'JDK (Java Development Kit) contains development tools including compiler. JRE (Java Runtime Environment) contains libraries and JVM needed to run Java programs. JVM (Java Virtual Machine) executes the bytecode.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q10',
          type: 'shortanswer',
          question: 'Why is Java called a "platform-independent" language?',
          sampleAnswer: 'Java is platform-independent because Java code is compiled into bytecode which can run on any platform that has a JVM, following the principle "Write Once, Run Anywhere".',
          keywords: ['bytecode', 'jvm', 'platform', 'write once', 'run anywhere', 'compile'],
          minKeywords: 2,
          explanation: 'Java is platform-independent because it compiles to bytecode that runs on the JVM, not directly on the operating system. This allows the same code to run on any platform with a JVM.',
          points: 3,
          difficulty: 'medium'
        }
      ]
    },
    {
      id: 'section-a-full',
      title: 'Section A (Full): Additional MCQ Questions',
      description: 'Extended multiple choice questions for comprehensive assessment',
      fullModeOnly: true,
      questions: [
        {
          id: 'q11',
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
          id: 'q12',
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
          id: 'q13',
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
        }
      ]
    },
    {
      id: 'section-b-full',
      title: 'Section B (Full): Additional True/False Questions',
      description: 'Extended true/false questions for comprehensive assessment',
      fullModeOnly: true,
      questions: [
        {
          id: 'q14',
          type: 'truefalse',
          question: 'Java supports multiple inheritance through classes.',
          correctAnswer: false,
          explanation: 'False. Java does not support multiple inheritance through classes, but it does through interfaces.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q15',
          type: 'truefalse',
          question: 'The main method must be declared as static.',
          correctAnswer: true,
          explanation: 'True. The main method must be static so it can be called without creating an instance of the class.',
          points: 2,
          difficulty: 'easy'
        }
      ]
    }
  ]
};