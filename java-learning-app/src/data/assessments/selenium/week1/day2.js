export default {
  title: "Day 2: Selenium Locators Basics Assessment",
  description: "Test your understanding of basic locator strategies in Selenium WebDriver",
  passingScore: 70,
  timeLimit: 25, // minutes
  modes: {
    quick: {
      questionCount: 10,
      timeLimit: 12,
      sections: ['section-a', 'section-b']
    },
    full: {
      questionCount: 22,
      timeLimit: 25,
      sections: ['section-a', 'section-b', 'section-c', 'section-d']
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
          question: 'What is a locator in Selenium?',
          options: [
            'A method to execute JavaScript',
            'A strategy to find web elements on a page',
            'A type of browser',
            'A testing framework'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'A locator is a strategy or method used to identify and locate web elements on a web page for automation.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'Which locator is the fastest and most reliable?',
          options: [
            'XPath',
            'CSS Selector',
            'ID',
            'Class Name'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'ID is the fastest and most reliable locator because IDs should be unique on a page and browsers can find them quickly.'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'How do you locate an element by ID in Selenium?',
          options: [
            'driver.findElement(By.id("elementId"))',
            'driver.getElementById("elementId")',
            'driver.locateById("elementId")',
            'driver.find("id=elementId")'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'easy',
          explanation: 'The correct syntax is driver.findElement(By.id("elementId")) to locate an element by its ID attribute.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'Which locator uses the "name" attribute of an element?',
          options: [
            'By.id()',
            'By.name()',
            'By.className()',
            'By.tagName()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'By.name() locator uses the "name" attribute of HTML elements to locate them.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'What does By.className() locate?',
          options: [
            'Elements with a specific ID',
            'Elements with a specific class attribute',
            'Elements with a specific tag name',
            'Elements with a specific name attribute'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'By.className() locates elements that have a specific value in their class attribute.'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'Which locator finds elements by their HTML tag?',
          options: [
            'By.id()',
            'By.name()',
            'By.tagName()',
            'By.linkText()'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'By.tagName() locates elements based on their HTML tag name like "input", "button", "div", etc.'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'What is the purpose of By.linkText()?',
          options: [
            'To find any text on the page',
            'To find hyperlinks by their exact visible text',
            'To find elements by their href attribute',
            'To find elements by their title'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'By.linkText() is used to locate hyperlink elements (<a> tags) by their exact visible text content.'
        },
        {
          id: 'q8',
          type: 'mcq',
          question: 'What is the difference between linkText and partialLinkText?',
          options: [
            'No difference',
            'linkText requires exact match, partialLinkText requires partial match',
            'linkText is faster',
            'partialLinkText only works with buttons'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'linkText requires an exact match of the link text, while partialLinkText matches if the text contains the specified substring.'
        },
        {
          id: 'q9',
          type: 'mcq',
          question: 'Which method returns multiple elements?',
          options: [
            'findElement()',
            'findElements()',
            'getElement()',
            'locateElement()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'findElements() returns a List<WebElement> containing all matching elements, while findElement() returns only the first match.'
        },
        {
          id: 'q10',
          type: 'mcq',
          question: 'What happens if findElement() cannot find an element?',
          options: [
            'Returns null',
            'Returns empty string',
            'Throws NoSuchElementException',
            'Returns false'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'medium',
          explanation: 'If findElement() cannot locate an element, it throws a NoSuchElementException.'
        },
        {
          id: 'q11',
          type: 'mcq',
          question: 'What does findElements() return if no elements are found?',
          options: [
            'Throws exception',
            'Returns null',
            'Returns empty list',
            'Returns first element'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'medium',
          explanation: 'findElements() returns an empty list (size 0) if no matching elements are found, unlike findElement() which throws an exception.'
        },
        {
          id: 'q12',
          type: 'mcq',
          question: 'Which locator should you avoid if possible due to brittleness?',
          options: [
            'ID',
            'Name',
            'Absolute XPath',
            'CSS Selector'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'hard',
          explanation: 'Absolute XPath (starting from root) is brittle because any change in the DOM structure breaks it. Relative XPath is preferred.'
        }
      ]
    },
    {
      id: 'section-b',
      title: 'True/False Questions',
      questions: [
        {
          id: 'q13',
          type: 'true-false',
          question: 'ID locators should always be unique on a web page.',
          correctAnswer: true,
          points: 2,
          difficulty: 'easy',
          explanation: 'True. According to HTML standards, ID attributes should be unique within a page, making them reliable locators.'
        },
        {
          id: 'q14',
          type: 'true-false',
          question: 'You can use multiple class names with By.className().',
          correctAnswer: false,
          points: 2,
          difficulty: 'medium',
          explanation: 'False. By.className() accepts only a single class name. For multiple classes, use CSS Selector or XPath.'
        },
        {
          id: 'q15',
          type: 'true-false',
          question: 'By.tagName() can return multiple elements.',
          correctAnswer: true,
          points: 2,
          difficulty: 'easy',
          explanation: 'True. When used with findElements(), By.tagName() returns all elements with that tag name.'
        },
        {
          id: 'q16',
          type: 'true-false',
          question: 'linkText and partialLinkText work with any HTML element.',
          correctAnswer: false,
          points: 2,
          difficulty: 'medium',
          explanation: 'False. linkText and partialLinkText only work with hyperlink elements (<a> tags).'
        },
        {
          id: 'q17',
          type: 'true-false',
          question: 'CSS Selector is generally faster than XPath.',
          correctAnswer: true,
          points: 2,
          difficulty: 'medium',
          explanation: 'True. CSS Selectors are generally faster than XPath because browsers have native CSS selector engines.'
        }
      ]
    },
    {
      id: 'section-c',
      title: 'Fill in the Blanks',
      questions: [
        {
          id: 'q18',
          type: 'fill-blank',
          question: 'To locate an element by its ID attribute, use By.________("elementId").',
          correctAnswer: 'id',
          points: 2,
          difficulty: 'easy',
          explanation: 'The correct method is By.id("elementId") to locate elements by their ID attribute.'
        },
        {
          id: 'q19',
          type: 'fill-blank',
          question: 'The method ________ returns a single WebElement, while findElements() returns a List.',
          correctAnswer: 'findElement',
          points: 2,
          difficulty: 'easy',
          explanation: 'findElement() returns a single WebElement (the first match), while findElements() returns a List<WebElement>.'
        },
        {
          id: 'q20',
          type: 'fill-blank',
          question: 'If an element cannot be found, findElement() throws ________Exception.',
          correctAnswer: 'NoSuchElement',
          points: 2,
          difficulty: 'medium',
          explanation: 'When findElement() cannot locate an element, it throws NoSuchElementException.'
        }
      ]
    },
    {
      id: 'section-d',
      title: 'Short Answer Questions',
      questions: [
        {
          id: 'q21',
          type: 'short',
          question: 'Explain the difference between findElement() and findElements() with examples.',
          sampleAnswer: 'findElement() vs findElements(): 1) Return Type - findElement() returns a single WebElement (first match), findElements() returns List<WebElement> (all matches). 2) No Match Behavior - findElement() throws NoSuchElementException if no element found, findElements() returns empty list (size 0). 3) Usage - findElement() for unique elements, findElements() for multiple elements. Examples: WebElement button = driver.findElement(By.id("submit")); returns single button. List<WebElement> links = driver.findElements(By.tagName("a")); returns all links. If no links exist, list.size() = 0, no exception thrown.',
          points: 3,
          difficulty: 'medium',
          keywords: ['findElement', 'findElements', 'WebElement', 'List', 'NoSuchElementException', 'empty list', 'single', 'multiple']
        },
        {
          id: 'q22',
          type: 'short',
          question: 'List all 8 basic locator strategies in Selenium and when to use each.',
          sampleAnswer: '8 Basic Locator Strategies: 1) ID - By.id("username") - Most reliable, use when element has unique ID. 2) Name - By.name("email") - Use for form elements with name attribute. 3) Class Name - By.className("btn-primary") - Use for elements with specific class (single class only). 4) Tag Name - By.tagName("input") - Use to find all elements of specific type. 5) Link Text - By.linkText("Click Here") - Use for links with exact text. 6) Partial Link Text - By.partialLinkText("Click") - Use for links with partial text match. 7) CSS Selector - By.cssSelector("#id .class") - Flexible, fast, use for complex selections. 8) XPath - By.xpath("//div[@id=\'test\']") - Most powerful, use when other locators fail. Preference order: ID > Name > CSS > XPath.',
          points: 4,
          difficulty: 'hard',
          keywords: ['ID', 'Name', 'Class', 'Tag', 'Link Text', 'Partial Link', 'CSS', 'XPath', '8 locators', 'By.']
        }
      ]
    }
  ]
};