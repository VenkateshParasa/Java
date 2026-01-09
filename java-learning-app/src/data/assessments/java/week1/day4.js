export default {
  title: "Day 4: Control Flow - Conditional Statements Assessment",
  description: "Test your understanding of if-else statements, switch-case, and ternary operators",
  passingScore: 70,
  timeLimit: 30, // minutes
  modes: {
    quick: {
      questionCount: 10,
      timeLimit: 15,
      sections: ['section-a', 'section-b']
    },
    full: {
      questionCount: 12,
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
          question: 'What is the output of the following?\n```java\nint x = 10;\nif (x > 5)\n    System.out.println("A");\n    System.out.println("B");\n```',
          options: [
            'A',
            'B',
            'A B',
            'Nothing'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'medium',
          explanation: 'Without braces, only the first statement after if is part of the condition. "A" prints because x > 5 is true. "B" always prints because it\'s outside the if block.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'Which statement is true about switch-case?',
          options: [
            'Can only use int',
            'Can use String (Java 7+)',
            'break is optional',
            'default must be last'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Since Java 7, switch statements can use String values. They can also use int, char, byte, short, and enums. Break is optional but recommended to prevent fall-through.'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'What happens if break is omitted in a switch case?',
          options: [
            'Compilation error',
            'Runtime error',
            'Fall-through to next case',
            'Nothing'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'Without break, execution falls through to the next case, executing its code as well. This is called fall-through behavior.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'What is the syntax of the ternary operator?',
          options: [
            'condition ? true : false',
            'if ? then : else',
            'condition : true ? false',
            'true ? false : condition'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'easy',
          explanation: 'The ternary operator syntax is: condition ? valueIfTrue : valueIfFalse. It\'s a shorthand for simple if-else statements.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'In an if-else-if ladder, when does the else block execute?',
          options: [
            'Always',
            'When all conditions are false',
            'When first condition is true',
            'Never'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'The else block executes only when all previous if and else-if conditions are false. It serves as the default case.'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'Can an if statement exist without an else?',
          options: [
            'Yes',
            'No',
            'Only with switch',
            'Only in loops'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'easy',
          explanation: 'Yes, the else part is optional. An if statement can stand alone without an else block.'
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
          question: 'Explain the difference between if-else and switch-case. When would you use each?',
          sampleAnswer: 'if-else is used for complex conditions and range checks (e.g., x > 10 && y < 5). switch-case is used for checking a single variable against multiple specific values. Use if-else for boolean expressions and ranges, use switch for discrete values like menu options, days of week, or status codes. Switch is more readable for multiple equality checks.',
          points: 3,
          difficulty: 'medium',
          keywords: ['if-else', 'switch', 'conditions', 'equality', 'range', 'readable']
        },
        {
          id: 'q8',
          type: 'short',
          question: 'What is a nested if statement? Give a real-world example where it would be useful.',
          sampleAnswer: 'A nested if statement is an if statement inside another if statement. Real-world example: checking eligibility for a loan - first check if age >= 18 (outer if), then check if income > 30000 (inner if). Only if both conditions are true, approve the loan. This allows checking multiple dependent conditions in sequence.',
          points: 3,
          difficulty: 'medium',
          keywords: ['nested', 'inside', 'dependent', 'conditions', 'sequence', 'multiple']
        },
        {
          id: 'q9',
          type: 'short',
          question: 'Explain fall-through behavior in switch-case.',
          sampleAnswer: 'Fall-through occurs when a case in a switch statement doesn\'t have a break statement. After executing the matching case, execution continues to the next case(s) until a break is encountered or the switch ends. This can be intentional for grouping cases with same logic, but is often a bug if unintended.',
          points: 3,
          difficulty: 'medium',
          keywords: ['fall-through', 'break', 'continues', 'next case', 'intentional', 'grouping']
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
          question: 'Write a program that takes a number (0-100) and prints the grade:\n- 90-100: A\n- 80-89: B\n- 70-79: C\n- 60-69: D\n- Below 60: F',
          sampleAnswer: `public class GradeCalculator {
    public static void main(String[] args) {
        int marks = 85;
        
        if (marks >= 90 && marks <= 100) {
            System.out.println("Grade: A");
        } else if (marks >= 80) {
            System.out.println("Grade: B");
        } else if (marks >= 70) {
            System.out.println("Grade: C");
        } else if (marks >= 60) {
            System.out.println("Grade: D");
        } else {
            System.out.println("Grade: F");
        }
    }
}`,
          points: 5,
          difficulty: 'easy',
          keywords: ['if', 'else if', 'grade', 'range', 'marks']
        },
        {
          id: 'q11',
          type: 'short',
          question: 'Write a program to find the largest of three numbers.',
          sampleAnswer: `public class LargestNumber {
    public static void main(String[] args) {
        int a = 25, b = 40, c = 15;
        
        if (a >= b && a >= c) {
            System.out.println("Largest: " + a);
        } else if (b >= a && b >= c) {
            System.out.println("Largest: " + b);
        } else {
            System.out.println("Largest: " + c);
        }
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['largest', 'three', 'numbers', 'comparison', 'if', 'else']
        },
        {
          id: 'q12',
          type: 'short',
          question: 'Write a program using switch-case that takes a number (1-7) and prints the corresponding day of the week.',
          sampleAnswer: `public class DayOfWeek {
    public static void main(String[] args) {
        int day = 3;
        
        switch (day) {
            case 1:
                System.out.println("Monday");
                break;
            case 2:
                System.out.println("Tuesday");
                break;
            case 3:
                System.out.println("Wednesday");
                break;
            case 4:
                System.out.println("Thursday");
                break;
            case 5:
                System.out.println("Friday");
                break;
            case 6:
                System.out.println("Saturday");
                break;
            case 7:
                System.out.println("Sunday");
                break;
            default:
                System.out.println("Invalid day");
        }
    }
}`,
          points: 5,
          difficulty: 'easy',
          keywords: ['switch', 'case', 'break', 'day', 'week', 'default']
        }
      ]
    }
  ]
};