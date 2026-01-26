export default {
  title: "Day 18: Locators - Part 1 (Basic Locators) - Assessment",
  passingScore: 70,
  timeLimit: 30,
  modes: {
    quick: {
      title: "Quick Assessment (10 questions)",
      timeLimit: 15,
      description: "A quick 15-minute assessment covering key locator concepts"
    },
    full: {
      title: "Full Assessment (35 questions)",
      timeLimit: 45,
      description: "Comprehensive 45-minute assessment covering all basic locator strategies"
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
          question: 'Which locator strategy is the MOST reliable and fastest?',
          options: [
            'ClassName',
            'TagName',
            'ID',
            'LinkText'
          ],
          correctAnswer: 2,
          explanation: 'ID locator is the most reliable (IDs should be unique) and fastest (direct lookup) locator strategy in Selenium.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q2',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the difference between findElement() and findElements()?',
          options: [
            'No difference',
            'findElement() returns one element, findElements() returns list of elements',
            'findElement() is faster',
            'findElements() works only with ID'
          ],
          correctAnswer: 1,
          explanation: 'findElement() returns a single WebElement (first match), while findElements() returns a List<WebElement> of all matching elements.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q3',
          type: 'mcq',
          mode: ['full'],
          question: 'What happens when findElement() cannot locate an element?',
          options: [
            'Returns null',
            'Returns empty WebElement',
            'Throws NoSuchElementException',
            'Returns false'
          ],
          correctAnswer: 2,
          explanation: 'findElement() throws NoSuchElementException when it cannot locate an element on the page.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q4',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which locator is used to find elements by their CSS class attribute?',
          options: [
            'By.class()',
            'By.className()',
            'By.cssClass()',
            'By.classAttribute()'
          ],
          correctAnswer: 1,
          explanation: 'By.className() is used to locate elements by their CSS class attribute value.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q5',
          type: 'mcq',
          mode: ['full'],
          question: 'What happens when findElements() cannot find any matching elements?',
          options: [
            'Throws NoSuchElementException',
            'Returns null',
            'Returns empty list',
            'Returns list with one null element'
          ],
          correctAnswer: 2,
          explanation: 'findElements() returns an empty list (size 0) when no matching elements are found, NOT an exception.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q6',
          type: 'mcq',
          mode: ['full'],
          question: 'Which locator should you use to find all links on a page?',
          options: [
            'By.links()',
            'By.tagName("a")',
            'By.linkText()',
            'By.allLinks()'
          ],
          correctAnswer: 1,
          explanation: 'By.tagName("a") finds all anchor (link) elements on the page. Use findElements() to get all of them.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q7',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the correct syntax to locate an element by ID?',
          options: [
            'driver.findElement(By.id("username"))',
            'driver.findElement(By.ID("username"))',
            'driver.findElementById("username")',
            'driver.id("username")'
          ],
          correctAnswer: 0,
          explanation: 'driver.findElement(By.id("value")) is the correct syntax to locate an element by its ID attribute.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q8',
          type: 'mcq',
          mode: ['full'],
          question: 'Which locator is best for locating form input fields?',
          options: [
            'TagName',
            'ClassName',
            'Name',
            'LinkText'
          ],
          correctAnswer: 2,
          explanation: 'Name locator is commonly used for form fields as HTML form elements typically have name attributes.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q9',
          type: 'mcq',
          mode: ['full'],
          question: 'What does By.linkText() locate?',
          options: [
            'Any element with text',
            'Only <a> tags with exact matching text',
            'All text elements',
            'Elements with partial text match'
          ],
          correctAnswer: 1,
          explanation: 'By.linkText() locates anchor (<a>) tags with exact matching visible text. It is case-sensitive.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q10',
          type: 'mcq',
          mode: ['full'],
          question: 'When should you use By.partialLinkText() instead of By.linkText()?',
          options: [
            'Never, they are the same',
            'When link text is very long or has dynamic parts',
            'When link has no text',
            'For non-link elements'
          ],
          correctAnswer: 1,
          explanation: 'By.partialLinkText() is useful when link text is very long or contains dynamic parts, as it matches partial text.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q11',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the recommended priority order for choosing locators?',
          options: [
            'TagName > ClassName > ID',
            'ID > Name > LinkText > ClassName',
            'ClassName > ID > Name',
            'LinkText > ID > Name'
          ],
          correctAnswer: 1,
          explanation: 'The recommended priority is: ID (most reliable) > Name > LinkText > ClassName > TagName (least specific).',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q12',
          type: 'mcq',
          mode: ['full'],
          question: 'Can By.className() work with compound classes (multiple class names)?',
          options: [
            'Yes, use spaces between class names',
            'No, only single class names work',
            'Yes, but only first class',
            'Yes, use dot notation'
          ],
          correctAnswer: 1,
          explanation: 'By.className() works only with single class names. For compound classes, use CSS Selector or XPath.',
          points: 3,
          difficulty: 'hard'
        },
        {
          id: 'q13',
          type: 'mcq',
          mode: ['full'],
          question: 'What does the following code return?\nList<WebElement> elements = driver.findElements(By.id("nonexistent"));',
          options: [
            'Throws exception',
            'Returns null',
            'Returns empty list',
            'Returns list with null element'
          ],
          correctAnswer: 2,
          explanation: 'findElements() returns an empty list when no elements are found, never throws an exception.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q14',
          type: 'mcq',
          mode: ['full'],
          question: 'Which is the LEAST specific locator strategy?',
          options: [
            'ID',
            'Name',
            'TagName',
            'LinkText'
          ],
          correctAnswer: 2,
          explanation: 'TagName is the least specific as many elements share the same tag (e.g., multiple <div>, <input> elements).',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q15',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the return type of driver.findElement()?',
          options: [
            'Element',
            'WebElement',
            'HTMLElement',
            'DOMElement'
          ],
          correctAnswer: 1,
          explanation: 'driver.findElement() returns a WebElement object representing the located HTML element.',
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
          question: 'ID locator is the fastest and most reliable locator strategy.',
          correctAnswer: true,
          explanation: 'True. ID locator provides direct lookup and IDs should be unique per HTML standard, making it the fastest and most reliable.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q17',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'findElements() throws NoSuchElementException when no elements are found.',
          correctAnswer: false,
          explanation: 'False. findElements() returns an empty list when no elements are found, never throws an exception.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q18',
          type: 'truefalse',
          mode: ['full'],
          question: 'By.linkText() is case-sensitive.',
          correctAnswer: true,
          explanation: 'True. By.linkText() performs case-sensitive exact text matching.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q19',
          type: 'truefalse',
          mode: ['full'],
          question: 'You can use By.className() with multiple class names separated by spaces.',
          correctAnswer: false,
          explanation: 'False. By.className() only works with single class names. For multiple classes, use CSS Selector or XPath.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q20',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'By.name() locator is commonly used for form elements.',
          correctAnswer: true,
          explanation: 'True. Form elements typically have name attributes, making By.name() commonly used for forms.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q21',
          type: 'truefalse',
          mode: ['full'],
          question: 'TagName locator can be used to count all images on a page.',
          correctAnswer: true,
          explanation: 'True. Using driver.findElements(By.tagName("img")) returns all image elements, allowing you to count them.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q22',
          type: 'truefalse',
          mode: ['full'],
          question: 'By.partialLinkText() can match text in the middle of a link.',
          correctAnswer: true,
          explanation: 'True. By.partialLinkText() matches any part of the link text, including text in the middle.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q23',
          type: 'truefalse',
          mode: ['full'],
          question: 'findElement() returns the last matching element when multiple elements match.',
          correctAnswer: false,
          explanation: 'False. findElement() returns the FIRST matching element, not the last.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q24',
          type: 'truefalse',
          mode: ['full'],
          question: 'Name attributes are always unique on a webpage.',
          correctAnswer: false,
          explanation: 'False. Unlike IDs, name attributes can be repeated. Multiple elements can have the same name.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q25',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'By.linkText() only works with <a> (anchor) tags.',
          correctAnswer: true,
          explanation: 'True. By.linkText() and By.partialLinkText() only work with hyperlinks (<a> tags).',
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
          question: 'The _____ locator is the most reliable and fastest way to locate elements.',
          correctAnswer: 'ID',
          acceptedAnswers: ['ID', 'id', 'By.id'],
          explanation: 'ID locator (By.id()) is the most reliable and fastest locator strategy.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q27',
          type: 'fillblank',
          mode: ['full'],
          question: 'When findElement() cannot locate an element, it throws _____.',
          correctAnswer: 'NoSuchElementException',
          acceptedAnswers: ['NoSuchElementException'],
          explanation: 'findElement() throws NoSuchElementException when it cannot find the element.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q28',
          type: 'fillblank',
          mode: ['full'],
          question: 'The method _____ returns a list of all matching elements.',
          correctAnswer: 'findElements()',
          acceptedAnswers: ['findElements()', 'findElements', 'driver.findElements()'],
          explanation: 'driver.findElements() returns a List<WebElement> of all matching elements.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q29',
          type: 'fillblank',
          mode: ['quick', 'full'],
          question: 'Use By._____ to locate elements by their CSS class attribute.',
          correctAnswer: 'className',
          acceptedAnswers: ['className', 'className()'],
          explanation: 'By.className() locates elements by their CSS class attribute.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q30',
          type: 'fillblank',
          mode: ['full'],
          question: 'By._____ locates links with exact matching text.',
          correctAnswer: 'linkText',
          acceptedAnswers: ['linkText', 'linkText()'],
          explanation: 'By.linkText() locates anchor tags with exact matching visible text.',
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
          question: 'List all six basic locator strategies in Selenium.',
          sampleAnswer: 'The six basic locator strategies are: 1) ID - By.id(), 2) Name - By.name(), 3) ClassName - By.className(), 4) TagName - By.tagName(), 5) LinkText - By.linkText(), and 6) PartialLinkText - By.partialLinkText().',
          keywords: ['ID', 'Name', 'ClassName', 'TagName', 'LinkText', 'PartialLinkText', 'By'],
          minKeywords: 6,
          explanation: 'The six basic locators are ID, Name, ClassName, TagName, LinkText, and PartialLinkText.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q32',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Explain the difference between findElement() and findElements() in terms of return type and exception handling.',
          sampleAnswer: 'findElement() returns a single WebElement (first match) and throws NoSuchElementException if not found. findElements() returns List<WebElement> of all matches and returns an empty list (never throws exception) if no elements are found.',
          keywords: ['findElement', 'findElements', 'WebElement', 'List', 'exception', 'NoSuchElementException', 'empty list'],
          minKeywords: 5,
          explanation: 'findElement() returns WebElement and throws exception; findElements() returns List and returns empty list when not found.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: 'q33',
          type: 'shortanswer',
          mode: ['full'],
          question: 'When should you use By.partialLinkText() instead of By.linkText()?',
          sampleAnswer: 'Use By.partialLinkText() when the link text is very long, contains dynamic parts that change, or when you want to match only a portion of the link text. It is more flexible than By.linkText() which requires exact match.',
          keywords: ['partialLinkText', 'long text', 'dynamic', 'partial', 'flexible', 'exact match'],
          minKeywords: 3,
          explanation: 'Use partialLinkText() for long or dynamic link text, or when partial matching is sufficient.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q34',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Why is By.className() unable to work with compound class names?',
          sampleAnswer: 'By.className() is designed to match a single class name value. When you pass multiple class names separated by spaces (like "btn btn-primary"), it looks for that exact string as a single class value, which does not exist. For compound classes, you must use CSS Selector or XPath.',
          keywords: ['single class', 'spaces', 'compound', 'CSS Selector', 'XPath', 'exact string'],
          minKeywords: 3,
          explanation: 'className() expects a single class value, not space-separated compound classes.',
          points: 4,
          difficulty: 'hard'
        },
        {
          id: 'q35',
          type: 'shortanswer',
          mode: ['quick', 'full'],
          question: 'What is the recommended approach to check if an element exists without throwing an exception?',
          sampleAnswer: 'Use findElements() instead of findElement() and check the size of the returned list. If list.size() > 0, the element exists. If size() is 0, the element does not exist. This approach never throws an exception.',
          keywords: ['findElements', 'size', 'list', 'check', 'no exception', 'exists'],
          minKeywords: 4,
          explanation: 'Use findElements() and check list size to safely verify element existence.',
          points: 3,
          difficulty: 'medium'
        }
      ]
    }
  ]
};
