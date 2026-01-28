// Day 3: Operators & Expressions - Easy Assessment
export default {
  title: "Day 3: Operators & Expressions - Easy Assessment",
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
          question: 'What is the result of 10 % 3?',
          options: [
            '3',
            '0',
            '1',
            '3.33'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'The modulus operator (%) returns the remainder of division. 10 divided by 3 is 3 with remainder 1.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'What is the value of x after: int x = 5; x++;',
          options: [
            '4',
            '5',
            '6',
            '10'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'The post-increment operator (x++) increases the value of x by 1, so x becomes 6.'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'What is the result of: 10 / 3 (integer division)',
          options: [
            '3.33',
            '3.0',
            '3',
            '4'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'When dividing two integers, Java performs integer division and truncates the decimal part. 10 / 3 = 3 (not 3.33).'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'What is the output: int a = 10; a += 5; System.out.println(a);',
          options: [
            '10',
            '15',
            '5',
            '105'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'The += operator is shorthand for a = a + 5. So a becomes 10 + 5 = 15.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'Which of the following is an arithmetic operator?',
          options: [
            '&&',
            '==',
            '*',
            '||'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'The * (multiplication) operator is an arithmetic operator. && and || are logical operators, == is a comparison operator.'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'What does the operator -- do?',
          options: [
            'Increments by 1',
            'Decrements by 1',
            'Divides by 2',
            'Multiplies by 2'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'The -- operator is the decrement operator. It decreases the value of a variable by 1.'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'What is the result of: 5 + 3 * 2',
          options: [
            '16',
            '11',
            '13',
            '10'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Due to operator precedence, multiplication is performed before addition: 3 * 2 = 6, then 5 + 6 = 11.'
        },
        {
          id: 'q8',
          type: 'mcq',
          question: 'Which operator is used to check equality?',
          options: [
            '=',
            '==',
            '!=',
            '==='
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'The == operator is used to check if two values are equal. = is assignment, != is not equal.'
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
          question: 'The modulus operator (%) can only be used with integers.',
          correctAnswer: false,
          explanation: 'False. The modulus operator can be used with floating-point numbers as well, though it is most commonly used with integers.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q10',
          type: 'truefalse',
          question: 'The += operator is a compound assignment operator.',
          correctAnswer: true,
          explanation: 'True. += is a compound assignment operator that combines addition and assignment (a += 5 is equivalent to a = a + 5).',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q11',
          type: 'truefalse',
          question: 'In Java, 5 / 2 will result in 2.5',
          correctAnswer: false,
          explanation: 'False. When both operands are integers, Java performs integer division, which results in 2 (truncated), not 2.5.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q12',
          type: 'truefalse',
          question: 'The ++ and -- operators can be used as both prefix and postfix.',
          correctAnswer: true,
          explanation: 'True. Both ++ and -- can be used as prefix (++x, --x) or postfix (x++, x--).',
          points: 2,
          difficulty: 'easy'
        }
      ]
    }
  ]
};
