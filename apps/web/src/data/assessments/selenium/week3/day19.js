export default {
  title: "Day 19: Locators - Part 2 (XPath) - Assessment",
  passingScore: 70,
  timeLimit: 30,
  modes: {
    quick: {
      title: "Quick Assessment (10 questions)",
      timeLimit: 15,
      description: "A quick 15-minute assessment covering key XPath concepts"
    },
    full: {
      title: "Full Assessment (35 questions)",
      timeLimit: 45,
      description: "Comprehensive 45-minute assessment covering all XPath techniques"
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
          question: 'What is the difference between Absolute and Relative XPath?',
          options: [
            'No difference',
            'Absolute starts with /, Relative starts with //',
            'Absolute is faster',
            'Relative cannot locate elements'
          ],
          correctAnswer: 1,
          explanation: 'Absolute XPath starts with single / (from root), while Relative XPath starts with // (anywhere in document). Relative is preferred.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q2',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which type of XPath is recommended for automation?',
          options: [
            'Absolute XPath',
            'Relative XPath',
            'Both are equally good',
            'Neither should be used'
          ],
          correctAnswer: 1,
          explanation: 'Relative XPath is always recommended as it is more maintainable, flexible, and less likely to break with HTML structure changes.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q3',
          type: 'mcq',
          mode: ['full'],
          question: 'What does the contains() function do in XPath?',
          options: [
            'Checks if element exists',
            'Matches partial attribute or text content',
            'Counts elements',
            'Validates XPath syntax'
          ],
          correctAnswer: 1,
          explanation: 'contains() function matches elements where an attribute or text contains the specified substring.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q4',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which XPath locates a button with exact text "Login"?',
          options: [
            '//button[@text="Login"]',
            '//button[text()="Login"]',
            '//button[contains(text()="Login")]',
            '//button.text="Login"'
          ],
          correctAnswer: 1,
          explanation: '//button[text()="Login"] uses the text() function to match exact text content.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q5',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the XPath index numbering system?',
          options: [
            'Starts from 0 like Java arrays',
            'Starts from 1',
            'Starts from -1',
            'No index in XPath'
          ],
          correctAnswer: 1,
          explanation: 'XPath index starts from 1, not 0. The first element is at position [1].',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q6',
          type: 'mcq',
          mode: ['full'],
          question: 'Which XPath axis navigates to the parent element?',
          options: [
            '/parent::',
            '//parent',
            '/ancestor::',
            'Uses parent:: axis'
          ],
          correctAnswer: 3,
          explanation: 'The parent:: axis (e.g., /parent::div) navigates to the immediate parent element.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q7',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What does the following XPath do?\n//input[contains(@id, "user_")]',
          options: [
            'Finds input with exact id "user_"',
            'Finds input where id contains "user_"',
            'Finds input with id starting with "user_"',
            'Invalid XPath'
          ],
          correctAnswer: 1,
          explanation: 'contains(@id, "user_") matches any input element where the id attribute contains the substring "user_".',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q8',
          type: 'mcq',
          mode: ['full'],
          question: 'Which XPath function matches elements where attribute starts with a value?',
          options: [
            'begins-with()',
            'starts-with()',
            'start()',
            'prefix()'
          ],
          correctAnswer: 1,
          explanation: 'starts-with() function matches elements where an attribute begins with the specified value.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q9',
          type: 'mcq',
          mode: ['full'],
          question: 'What does normalize-space() function do?',
          options: [
            'Removes all spaces',
            'Converts to lowercase',
            'Trims leading/trailing spaces and reduces multiple spaces to one',
            'Adds spaces'
          ],
          correctAnswer: 2,
          explanation: 'normalize-space() trims leading and trailing whitespace and collapses multiple internal spaces into single spaces.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q10',
          type: 'mcq',
          mode: ['full'],
          question: 'Which XPath selects the 3rd div element?',
          options: [
            '//div[3]',
            '(//div)[3]',
            '//div[@index=3]',
            '//div:nth(3)'
          ],
          correctAnswer: 1,
          explanation: '(//div)[3] selects the 3rd div from all matching divs. Without parentheses, //div[3] means divs that are 3rd children of their parents.',
          points: 3,
          difficulty: 'hard'
        },
        {
          id: 'q11',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which axis finds the next sibling elements?',
          options: [
            'sibling::',
            'next-sibling::',
            'following-sibling::',
            'after::'
          ],
          correctAnswer: 2,
          explanation: 'following-sibling:: axis selects all sibling elements that come after the current element.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q12',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the XPath to find a table cell in row 2, column 3?',
          options: [
            '//table/tr[2]/td[3]',
            '//table/tbody/tr[2]/td[3]',
            '//table[row=2][col=3]',
            '//table/td[2,3]'
          ],
          correctAnswer: 1,
          explanation: '//table/tbody/tr[2]/td[3] selects the 3rd td cell in the 2nd row (tbody is often present in tables).',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q13',
          type: 'mcq',
          mode: ['full'],
          question: 'Which XPath combines multiple conditions using logical AND?',
          options: [
            '//input[@id="user" AND @type="text"]',
            '//input[@id="user" and @type="text"]',
            '//input[@id="user" && @type="text"]',
            '//input[@id="user" & @type="text"]'
          ],
          correctAnswer: 1,
          explanation: 'XPath uses lowercase "and" operator to combine conditions: [@id="user" and @type="text"].',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q14',
          type: 'mcq',
          mode: ['full'],
          question: 'What does ancestor:: axis do?',
          options: [
            'Finds child elements',
            'Finds parent and all ancestor elements',
            'Finds sibling elements',
            'Finds descendant elements'
          ],
          correctAnswer: 1,
          explanation: 'ancestor:: axis selects the parent, grandparent, and all ancestor elements up to the root.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q15',
          type: 'mcq',
          mode: ['full'],
          question: 'How do you select the last element in XPath?',
          options: [
            '[end()]',
            '[last()]',
            '[-1]',
            '[final()]'
          ],
          correctAnswer: 1,
          explanation: '[last()] function selects the last element from the matching set.',
          points: 2,
          difficulty: 'easy'
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
          question: 'Absolute XPath is more maintainable than Relative XPath.',
          correctAnswer: false,
          explanation: 'False. Absolute XPath is brittle and breaks easily with HTML changes. Relative XPath is more maintainable.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q17',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'XPath can navigate to parent elements, while CSS cannot.',
          correctAnswer: true,
          explanation: 'True. XPath supports parent navigation using parent:: axis, which CSS Selectors do not support.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q18',
          type: 'truefalse',
          mode: ['full'],
          question: 'XPath index starts from 0.',
          correctAnswer: false,
          explanation: 'False. XPath index starts from 1, not 0. The first element is at position [1].',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q19',
          type: 'truefalse',
          mode: ['full'],
          question: 'The text() function in XPath matches visible text only.',
          correctAnswer: true,
          explanation: 'True. text() function matches the visible text content of an element.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q20',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'contains() function can be used with both attributes and text.',
          correctAnswer: true,
          explanation: 'True. contains() works with attributes (contains(@id, "value")) and text (contains(text(), "value")).',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q21',
          type: 'truefalse',
          mode: ['full'],
          question: 'XPath axes allow traversing the DOM tree in multiple directions.',
          correctAnswer: true,
          explanation: 'True. XPath axes (parent::, child::, following-sibling::, etc.) enable navigation in all directions.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q22',
          type: 'truefalse',
          mode: ['full'],
          question: 'following-sibling:: axis finds elements before the current element.',
          correctAnswer: false,
          explanation: 'False. following-sibling:: finds elements AFTER the current element. preceding-sibling:: finds elements before.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q23',
          type: 'truefalse',
          mode: ['full'],
          question: 'You must use parentheses when selecting elements by index in XPath.',
          correctAnswer: true,
          explanation: 'True. (//div)[2] selects 2nd div from all. Without parentheses, //div[2] means divs that are 2nd children.',
          points: 3,
          difficulty: 'hard'
        },
        {
          id: 'q24',
          type: 'truefalse',
          mode: ['full'],
          question: 'normalize-space() is useful for handling text with extra whitespace.',
          correctAnswer: true,
          explanation: 'True. normalize-space() handles extra spaces, tabs, and newlines in text matching.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q25',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'XPath is generally slower than CSS Selectors.',
          correctAnswer: true,
          explanation: 'True. CSS Selectors have native browser support and are slightly faster than XPath.',
          points: 2,
          difficulty: 'medium'
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
          question: 'Relative XPath starts with _____ while Absolute XPath starts with single slash.',
          correctAnswer: '//',
          acceptedAnswers: ['//', 'double slash', '//'],
          explanation: 'Relative XPath starts with // (double slash), allowing search anywhere in the document.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q27',
          type: 'fillblank',
          mode: ['full'],
          question: 'The _____ function matches elements containing a substring in attribute or text.',
          correctAnswer: 'contains()',
          acceptedAnswers: ['contains()', 'contains'],
          explanation: 'contains() function matches partial strings in attributes or text content.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q28',
          type: 'fillblank',
          mode: ['full'],
          question: 'To navigate to parent element, use _____ axis.',
          correctAnswer: 'parent::',
          acceptedAnswers: ['parent::', 'parent'],
          explanation: 'parent:: axis navigates to the immediate parent of the current element.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q29',
          type: 'fillblank',
          mode: ['quick', 'full'],
          question: 'XPath index starts from _____, not zero.',
          correctAnswer: '1',
          acceptedAnswers: ['1', 'one'],
          explanation: 'XPath uses 1-based indexing, with the first element at position [1].',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q30',
          type: 'fillblank',
          mode: ['full'],
          question: 'The _____ function is used to match exact text content in XPath.',
          correctAnswer: 'text()',
          acceptedAnswers: ['text()', 'text'],
          explanation: 'text() function matches the exact text content of an element.',
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
          question: 'Explain why Relative XPath is preferred over Absolute XPath.',
          sampleAnswer: 'Relative XPath is preferred because it is more maintainable and flexible. Absolute XPath starts from the root and includes the complete path (/html/body/div/...), making it brittle and likely to break with any HTML structure change. Relative XPath (//element) searches anywhere in the document and is less affected by structural changes.',
          keywords: ['Relative', 'maintainable', 'flexible', 'Absolute', 'brittle', 'structure', 'root'],
          minKeywords: 4,
          explanation: 'Relative XPath is flexible and maintainable; Absolute XPath is brittle and breaks easily.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q32',
          type: 'shortanswer',
          mode: ['full'],
          question: 'What is the purpose of the contains() function and when should it be used?',
          sampleAnswer: 'contains() function matches elements where an attribute or text contains a specified substring. It is used when attributes have dynamic parts (like id="user_12345"), when exact matching is not possible, or when you want to match partial text. Example: //input[contains(@id, "user_")] matches any input with id containing "user_".',
          keywords: ['contains', 'substring', 'partial', 'dynamic', 'attribute', 'text', 'match'],
          minKeywords: 4,
          explanation: 'contains() performs partial matching on attributes and text, useful for dynamic elements.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q33',
          type: 'shortanswer',
          mode: ['full'],
          question: 'List and explain three XPath axes.',
          sampleAnswer: '1) parent:: - navigates to the immediate parent element, 2) following-sibling:: - selects sibling elements that come after the current element, and 3) child:: - selects immediate child elements of the current element. These axes enable navigation in different directions through the DOM tree.',
          keywords: ['parent::', 'following-sibling::', 'child::', 'navigate', 'sibling', 'DOM', 'axis'],
          minKeywords: 5,
          explanation: 'XPath axes enable DOM navigation in multiple directions: parent::, child::, sibling axes, etc.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: 'q34',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Explain the difference between (//div)[2] and //div[2] in XPath.',
          sampleAnswer: '(//div)[2] with parentheses selects the 2nd div from all div elements on the page. //div[2] without parentheses selects div elements that are the 2nd child of their parent. The parentheses apply the index to the entire result set, while without them, the predicate applies to each element individually.',
          keywords: ['parentheses', '2nd div', 'all divs', '2nd child', 'result set', 'predicate', 'index'],
          minKeywords: 4,
          explanation: 'Parentheses determine whether index applies to entire result set or to individual parent contexts.',
          points: 4,
          difficulty: 'hard'
        },
        {
          id: 'q35',
          type: 'shortanswer',
          mode: ['quick', 'full'],
          question: 'When should you use XPath instead of CSS Selectors?',
          sampleAnswer: 'Use XPath when you need to: 1) Navigate to parent or ancestor elements (CSS cannot go up), 2) Match elements by text content using text() function, 3) Use complex sibling navigation, 4) Combine multiple conditions with text matching. However, use CSS for simple selections as it is faster.',
          keywords: ['parent', 'text', 'navigation', 'ancestor', 'CSS', 'faster', 'complex'],
          minKeywords: 4,
          explanation: 'Use XPath for parent navigation, text matching, and complex conditions; use CSS for simple, fast selections.',
          points: 3,
          difficulty: 'medium'
        }
      ]
    }
  ]
};
