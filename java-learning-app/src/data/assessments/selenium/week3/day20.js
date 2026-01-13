export default {
  title: "Day 20: Locators - Part 3 (CSS Selector) - Assessment",
  passingScore: 70,
  timeLimit: 30,
  modes: {
    quick: {
      title: "Quick Assessment (10 questions)",
      timeLimit: 15,
      description: "A quick 15-minute assessment covering key CSS Selector concepts"
    },
    full: {
      title: "Full Assessment (35 questions)",
      timeLimit: 45,
      description: "Comprehensive 45-minute assessment covering all CSS Selector techniques"
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
          mode: ['quick', 'full'],
          question: 'What is the CSS selector syntax to locate an element by ID?',
          options: [
            '@id',
            '#id',
            '.id',
            'id='
          ],
          correctAnswer: 1,
          explanation: 'CSS uses # (hash) prefix for ID selectors. Example: #username locates element with id="username".',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q2',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the main advantage of CSS Selectors over XPath?',
          options: [
            'CSS can navigate to parent elements',
            'CSS is faster due to native browser support',
            'CSS can match by text content',
            'CSS has more features than XPath'
          ],
          correctAnswer: 1,
          explanation: 'CSS Selectors are faster than XPath because browsers have native CSS support. CSS is also more concise and readable.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q3',
          type: 'mcq',
          mode: ['full'],
          question: 'Which CSS selector syntax represents a class?',
          options: [
            '#classname',
            '.classname',
            '@class',
            '[class="classname"]'
          ],
          correctAnswer: 1,
          explanation: 'CSS uses . (dot) prefix for class selectors. Example: .btn-primary locates elements with class="btn-primary".',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q4',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which CSS attribute selector operator means "contains"?',
          options: [
            '[attr~="value"]',
            '[attr*="value"]',
            '[attr^="value"]',
            '[attr$="value"]'
          ],
          correctAnswer: 1,
          explanation: '[attr*="value"] matches elements where the attribute contains "value". The * operator means "contains".',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q5',
          type: 'mcq',
          mode: ['full'],
          question: 'Which operator is used for "starts with" in CSS attribute selectors?',
          options: [
            '*=',
            '^=',
            '$=',
            '~='
          ],
          correctAnswer: 1,
          explanation: '[attr^="value"] matches elements where attribute starts with "value". The ^ operator means "starts with".',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q6',
          type: 'mcq',
          mode: ['full'],
          question: 'Which operator is used for "ends with" in CSS attribute selectors?',
          options: [
            '*=',
            '^=',
            '$=',
            '~='
          ],
          correctAnswer: 2,
          explanation: '[attr$="value"] matches elements where attribute ends with "value". The $ operator means "ends with".',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q7',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What does the descendant combinator (space) do in CSS?\nExample: div.container input',
          options: [
            'Selects only direct children',
            'Selects any descendant at any level',
            'Selects adjacent siblings',
            'Selects parent elements'
          ],
          correctAnswer: 1,
          explanation: 'The space (descendant combinator) selects any descendant at any level, not just direct children.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q8',
          type: 'mcq',
          mode: ['full'],
          question: 'What does the child combinator (>) do in CSS?\nExample: div.form > input',
          options: [
            'Selects all descendants',
            'Selects only direct children',
            'Selects siblings',
            'Selects parent'
          ],
          correctAnswer: 1,
          explanation: 'The > (child combinator) selects only direct children, not grandchildren or deeper descendants.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q9',
          type: 'mcq',
          mode: ['full'],
          question: 'What does the adjacent sibling combinator (+) select?\nExample: label + input',
          options: [
            'All following siblings',
            'The immediate next sibling',
            'All siblings',
            'The previous sibling'
          ],
          correctAnswer: 1,
          explanation: 'The + (adjacent sibling combinator) selects only the immediate next sibling element.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q10',
          type: 'mcq',
          mode: ['full'],
          question: 'What does :first-child pseudo-class select?',
          options: [
            'The first element of a type',
            'The element that is the first child of its parent',
            'The first element on the page',
            'The first visible element'
          ],
          correctAnswer: 1,
          explanation: ':first-child selects an element that is the first child of its parent. Example: li:first-child selects first li in its parent.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q11',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which pseudo-class selects the 3rd element?',
          options: [
            ':nth-child(2)',
            ':nth-child(3)',
            ':child(3)',
            ':index(3)'
          ],
          correctAnswer: 1,
          explanation: ':nth-child(3) selects the 3rd element. CSS nth-child uses 1-based indexing (starts from 1, not 0).',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q12',
          type: 'mcq',
          mode: ['full'],
          question: 'What does the :not() pseudo-class do?',
          options: [
            'Selects hidden elements',
            'Selects elements that do NOT match the given selector',
            'Disables element selection',
            'Inverts element order'
          ],
          correctAnswer: 1,
          explanation: ':not(selector) selects elements that do NOT match the given selector. Example: input:not([type="hidden"]) selects all inputs except hidden ones.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q13',
          type: 'mcq',
          mode: ['full'],
          question: 'Can CSS Selectors navigate to parent elements?',
          options: [
            'Yes, using parent::',
            'Yes, using ..',
            'No, CSS cannot navigate up',
            'Yes, using ^'
          ],
          correctAnswer: 2,
          explanation: 'CSS Selectors cannot navigate to parent or ancestor elements. This is a limitation of CSS; use XPath for parent navigation.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q14',
          type: 'mcq',
          mode: ['full'],
          question: 'Which browser console command tests CSS selectors?',
          options: [
            '$()',
            '$$()',
            '$x()',
            'css()'
          ],
          correctAnswer: 1,
          explanation: '$$("css-selector") in browser DevTools console tests CSS selectors and returns an array of matching elements.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q15',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'When should you use XPath instead of CSS?',
          options: [
            'When element has ID or class',
            'When you need to navigate to parent or match by text',
            'Always use XPath for better performance',
            'When using Chrome browser'
          ],
          correctAnswer: 1,
          explanation: 'Use XPath when you need parent navigation or text matching. CSS is preferred for ID, class, and attributes.',
          points: 3,
          difficulty: 'medium'
        }
      ]
    },
    {
      id: 'section-b',
      title: 'Section B: True/False Questions',
      description: 'Determine if each statement is true or false',
      questions: [
        {
          id: 'q16',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'CSS Selectors are faster than XPath due to native browser support.',
          correctAnswer: true,
          explanation: 'True. CSS Selectors have native browser support, making them faster than XPath which requires an engine.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q17',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'CSS Selectors can navigate to parent elements.',
          correctAnswer: false,
          explanation: 'False. CSS cannot navigate to parent or ancestor elements. This is a limitation; use XPath for parent navigation.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q18',
          type: 'truefalse',
          mode: ['full'],
          question: 'The # symbol is used for class selectors in CSS.',
          correctAnswer: false,
          explanation: 'False. # (hash) is used for ID selectors. . (dot) is used for class selectors.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q19',
          type: 'truefalse',
          mode: ['full'],
          question: 'CSS attribute selector [id*="user"] means ID contains "user".',
          correctAnswer: true,
          explanation: 'True. The *= operator in [attr*="value"] matches elements where the attribute contains the specified value.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q20',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'The child combinator (>) selects all descendants at any level.',
          correctAnswer: false,
          explanation: 'False. The > combinator selects only direct children. Use space (descendant combinator) for any level.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q21',
          type: 'truefalse',
          mode: ['full'],
          question: 'CSS pseudo-class :nth-child(n) uses 1-based indexing.',
          correctAnswer: true,
          explanation: 'True. :nth-child(1) selects the first child, not zero-based like arrays.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q22',
          type: 'truefalse',
          mode: ['full'],
          question: 'You can combine multiple classes in CSS like .class1.class2',
          correctAnswer: true,
          explanation: 'True. .class1.class2 (no space) selects elements that have both classes.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q23',
          type: 'truefalse',
          mode: ['full'],
          question: 'CSS Selectors can match elements by text content like XPath text().',
          correctAnswer: false,
          explanation: 'False. CSS has limited text matching capabilities. Use XPath for text content matching.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q24',
          type: 'truefalse',
          mode: ['full'],
          question: 'The ~ (tilde) combinator selects all following siblings.',
          correctAnswer: true,
          explanation: 'True. The ~ (general sibling combinator) selects all siblings that come after the element.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q25',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'CSS Selector is the recommended first choice for locating elements.',
          correctAnswer: true,
          explanation: 'True. CSS Selector is recommended as the first choice due to speed, readability, and conciseness.',
          points: 2,
          difficulty: 'easy'
        }
      ]
    },
    {
      id: 'section-c',
      title: 'Section C: Fill in the Blanks',
      description: 'Complete each statement with the correct term',
      questions: [
        {
          id: 'q26',
          type: 'fillblank',
          mode: ['full'],
          question: 'The _____ symbol is used for ID selectors in CSS.',
          correctAnswer: '#',
          acceptedAnswers: ['#', 'hash', '#(hash)'],
          explanation: '# (hash) symbol is used for ID selectors. Example: #username selects element with id="username".',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q27',
          type: 'fillblank',
          mode: ['full'],
          question: 'The _____ symbol is used for class selectors in CSS.',
          correctAnswer: '.',
          acceptedAnswers: ['.', 'dot', '.(dot)'],
          explanation: '. (dot) symbol is used for class selectors. Example: .btn locates elements with class="btn".',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q28',
          type: 'fillblank',
          mode: ['full'],
          question: 'The CSS attribute operator _____ means "contains".',
          correctAnswer: '*=',
          acceptedAnswers: ['*=', '*'],
          explanation: '*= operator means "contains". Example: [id*="user"] matches IDs containing "user".',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q29',
          type: 'fillblank',
          mode: ['quick', 'full'],
          question: 'The _____ combinator (space) selects descendants at any level.',
          correctAnswer: 'descendant',
          acceptedAnswers: ['descendant', 'space', 'descendant combinator'],
          explanation: 'The space (descendant combinator) selects descendants at any level, not just direct children.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q30',
          type: 'fillblank',
          mode: ['full'],
          question: 'The browser console command _____ is used to test CSS selectors.',
          correctAnswer: '$$',
          acceptedAnswers: ['$$', '$$()'],
          explanation: '$$("css-selector") in browser console tests CSS selectors and returns matching elements.',
          points: 2,
          difficulty: 'easy'
        }
      ]
    },
    {
      id: 'section-d',
      title: 'Section D: Short Answer Questions',
      description: 'Provide brief answers to the following questions',
      questions: [
        {
          id: 'q31',
          type: 'shortanswer',
          mode: ['quick', 'full'],
          question: 'List the four CSS attribute selector operators and their meanings.',
          sampleAnswer: 'The four CSS attribute operators are: 1) [attr="value"] - exact match, 2) [attr*="value"] - contains, 3) [attr^="value"] - starts with, and 4) [attr$="value"] - ends with. These operators enable flexible matching for dynamic attributes.',
          keywords: ['exact', 'contains', 'starts', 'ends', '*=', '^=', '$=', 'attribute'],
          minKeywords: 4,
          explanation: 'The four operators are: exact match (=), contains (*=), starts with (^=), and ends with ($=).',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q32',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Explain the difference between descendant (space) and child (>) combinators.',
          sampleAnswer: 'The descendant combinator (space) selects elements at any level inside the parent (children, grandchildren, etc.). Example: div input selects all inputs anywhere inside div. The child combinator (>) selects only direct children. Example: div > input selects only inputs that are direct children of div, not grandchildren.',
          keywords: ['descendant', 'child', 'space', '>', 'direct', 'any level', 'grandchildren'],
          minKeywords: 4,
          explanation: 'Descendant (space) selects at any level; child (>) selects only direct children.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: 'q33',
          type: 'shortanswer',
          mode: ['full'],
          question: 'What are the main limitations of CSS Selectors compared to XPath?',
          sampleAnswer: 'CSS Selectors have three main limitations: 1) Cannot navigate to parent or ancestor elements (XPath can use parent:: axis), 2) Limited text matching capabilities (XPath has text() function), and 3) Cannot combine conditions with text (XPath can use "and" with text). When these features are needed, XPath should be used instead of CSS.',
          keywords: ['parent', 'text', 'navigate', 'ancestor', 'limitation', 'XPath', 'text()'],
          minKeywords: 4,
          explanation: 'CSS cannot navigate to parents, has limited text matching, and cannot combine text conditions.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: 'q34',
          type: 'shortanswer',
          mode: ['full'],
          question: 'When should you choose CSS Selectors over XPath?',
          sampleAnswer: 'Choose CSS Selectors when: 1) Element has ID or Class (CSS is simpler: #id or .class), 2) Using attribute-based selection (CSS is cleaner), 3) Performance is critical (CSS is faster), 4) Simple parent-to-child navigation (descendant combinator), and 5) Working on modern web applications. CSS should be the first choice unless you need parent navigation or text matching.',
          keywords: ['ID', 'class', 'performance', 'faster', 'attribute', 'first choice', 'modern'],
          minKeywords: 4,
          explanation: 'Use CSS for ID/class, attributes, performance, and as the default first choice.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q35',
          type: 'shortanswer',
          mode: ['quick', 'full'],
          question: 'Write three different CSS selectors to locate the same element with id="login-button".',
          sampleAnswer: '1) #login-button (ID selector - shortest), 2) button#login-button (tag with ID - more specific), 3) button[id="login-button"] (attribute selector), 4) [id="login-button"] (attribute only). The first option (#login-button) is recommended as it is the shortest and most efficient.',
          keywords: ['#login-button', 'button#', '[id=', 'attribute', 'selector'],
          minKeywords: 3,
          explanation: 'Three ways: #login-button, button#login-button, button[id="login-button"].',
          points: 3,
          difficulty: 'hard'
        }
      ]
    }
  ]
};
