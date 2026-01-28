// Day 1: Introduction & Setup - Easy Assessment
export default {
  title: "Day 1: Introduction & Setup - Easy Assessment",
  difficulty: "easy",
  passingScore: 70,
  timeLimit: 20,
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
          question: 'What does JDK stand for?',
          options: [
            'Java Development Kit',
            'Java Deployment Kit',
            'Java Debug Kit',
            'Java Design Kit'
          ],
          correctAnswer: 0,
          explanation: 'JDK stands for Java Development Kit, which includes tools for developing Java applications.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'Which command is used to run a compiled Java program?',
          options: [
            'javac',
            'run',
            'java',
            'execute'
          ],
          correctAnswer: 2,
          explanation: 'The java command is used to run compiled Java programs (bytecode).',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q8',
          type: 'mcq',
          question: 'What does JRE stand for?',
          options: [
            'Java Runtime Environment',
            'Java Remote Environment',
            'Java Rational Environment',
            'Java Ready Environment'
          ],
          correctAnswer: 0,
          explanation: 'JRE stands for Java Runtime Environment, which provides the libraries and JVM to run Java applications.',
          points: 2,
          difficulty: 'easy'
        }
      ]
    },
    {
      id: 'section-b',
      title: 'Section B: True/False Questions',
      description: 'Determine whether each statement is true or false',
      questions: [
        {
          id: 'q9',
          type: 'truefalse',
          question: 'Java is a platform-independent language.',
          correctAnswer: true,
          explanation: 'True. Java is platform-independent because Java bytecode can run on any platform that has a JVM.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q10',
          type: 'truefalse',
          question: 'JDK includes JRE and development tools.',
          correctAnswer: true,
          explanation: 'True. JDK (Java Development Kit) includes JRE plus development tools like compiler (javac), debugger, etc.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q11',
          type: 'truefalse',
          question: 'The main method must be declared as static.',
          correctAnswer: true,
          explanation: 'True. The main method must be static so it can be called without creating an instance of the class.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q12',
          type: 'truefalse',
          question: 'Java programs can run directly on the operating system without JVM.',
          correctAnswer: false,
          explanation: 'False. Java programs require the JVM to execute. The JVM interprets the bytecode and runs it on the specific operating system.',
          points: 2,
          difficulty: 'easy'
        }
      ]
    }
  ]
};
