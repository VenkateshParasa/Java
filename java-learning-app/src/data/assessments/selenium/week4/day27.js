export default {
  title: "Day 27: Actions Class - Assessment",
  passingScore: 70,
  timeLimit: 30,
  modes: {
    quick: {
      title: "Quick Assessment (10 questions)",
      timeLimit: 15,
      description: "A quick 15-minute assessment covering key Actions class concepts"
    },
    full: {
      title: "Full Assessment (35 questions)",
      timeLimit: 45,
      description: "Comprehensive 45-minute assessment covering all Actions class topics"
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
          question: 'Which class in Selenium is used for performing complex user interactions?',
          options: [
            'UserActions',
            'Actions',
            'InteractionManager',
            'MouseActions'
          ],
          correctAnswer: 1,
          explanation: 'The Actions class in Selenium provides an API for performing complex user interactions like mouse hover, drag-and-drop, and keyboard operations.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q2',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which method is used to execute the sequence of actions stored in Actions object?',
          options: [
            'execute()',
            'perform()',
            'build().perform()',
            'run()'
          ],
          correctAnswer: 2,
          explanation: 'build().perform() compiles all actions into a sequence and executes them. While perform() alone also works in newer versions, build().perform() is the recommended approach.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q3',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which method is used to hover the mouse over an element?',
          options: [
            'hover()',
            'mouseOver()',
            'moveToElement()',
            'hoverOver()'
          ],
          correctAnswer: 2,
          explanation: 'moveToElement(WebElement) moves the mouse pointer to the center of the specified element, simulating a hover action.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q4',
          type: 'mcq',
          mode: ['full'],
          question: 'How do you perform a right-click operation using Actions class?',
          options: [
            'rightClick()',
            'contextClick()',
            'secondaryClick()',
            'rightMouseClick()'
          ],
          correctAnswer: 1,
          explanation: 'contextClick() performs a right-click (context menu) operation. It can be used with or without specifying an element.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q5',
          type: 'mcq',
          mode: ['full'],
          question: 'Which method performs a double-click on an element?',
          options: [
            'click().click()',
            'doubleClick()',
            'clickTwice()',
            'dblClick()'
          ],
          correctAnswer: 1,
          explanation: 'doubleClick(WebElement) performs a double-click operation on the specified element.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q6',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the correct syntax to drag element A to element B?',
          options: [
            'actions.drag(A).drop(B).perform()',
            'actions.dragAndDrop(A, B).perform()',
            'actions.move(A).to(B).perform()',
            'actions.drag(A, B).perform()'
          ],
          correctAnswer: 1,
          explanation: 'dragAndDrop(source, target) performs a drag-and-drop operation from source element to target element.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q7',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which method is used to press and hold a key?',
          options: [
            'pressKey()',
            'holdKey()',
            'keyDown()',
            'pressAndHold()'
          ],
          correctAnswer: 2,
          explanation: 'keyDown(Keys key) presses and holds a modifier key like Ctrl, Alt, or Shift until keyUp() is called.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q8',
          type: 'mcq',
          mode: ['full'],
          question: 'How do you perform Ctrl+C using Actions class?',
          options: [
            'actions.keyPress(Keys.CONTROL, "c").perform()',
            'actions.keyDown(Keys.CONTROL).sendKeys("c").keyUp(Keys.CONTROL).perform()',
            'actions.keys(Keys.CONTROL + "c").perform()',
            'actions.sendKeys(Keys.chord(Keys.CONTROL, "c")).perform()'
          ],
          correctAnswer: 1,
          explanation: 'To perform Ctrl+C: press Control key with keyDown(), send "c" with sendKeys(), then release Control with keyUp().',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q9',
          type: 'mcq',
          mode: ['full'],
          question: 'What does the clickAndHold() method do?',
          options: [
            'Clicks and waits for page load',
            'Performs a long press',
            'Clicks at the current mouse location and holds without releasing',
            'Clicks repeatedly until released'
          ],
          correctAnswer: 2,
          explanation: 'clickAndHold() clicks at the current mouse location without releasing the button. Often used in drag operations.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q10',
          type: 'mcq',
          mode: ['full'],
          question: 'Which method releases the pressed mouse button?',
          options: [
            'mouseUp()',
            'release()',
            'unclick()',
            'releaseMouse()'
          ],
          correctAnswer: 1,
          explanation: 'release() releases the pressed left mouse button at the current mouse location.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q11',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'How do you scroll to an element using Actions class?',
          options: [
            'actions.scroll(element).perform()',
            'actions.scrollToElement(element).perform()',
            'actions.moveToElement(element).perform()',
            'actions.scrollTo(element).perform()'
          ],
          correctAnswer: 2,
          explanation: 'moveToElement() moves the mouse to the element, which also scrolls it into view if necessary.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q12',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the purpose of the build() method in Actions class?',
          options: [
            'To create a new Actions object',
            'To compile all actions into a single action sequence',
            'To initialize the WebDriver',
            'To validate the action sequence'
          ],
          correctAnswer: 1,
          explanation: 'build() generates a composite action containing all actions built so far. It returns an Action object that can be performed.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q13',
          type: 'mcq',
          mode: ['full'],
          question: 'Which method moves the mouse to an offset from the current position?',
          options: [
            'moveBy(xOffset, yOffset)',
            'moveByOffset(xOffset, yOffset)',
            'offsetMove(xOffset, yOffset)',
            'moveToOffset(xOffset, yOffset)'
          ],
          correctAnswer: 1,
          explanation: 'moveByOffset(xOffset, yOffset) moves the mouse from its current position by the given offset.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q14',
          type: 'mcq',
          mode: ['full'],
          question: 'How do you perform a drag-and-drop operation by pixel offset?',
          options: [
            'actions.dragBy(element, x, y).perform()',
            'actions.dragAndDropBy(element, x, y).perform()',
            'actions.drag(element).dropBy(x, y).perform()',
            'actions.moveElement(element, x, y).perform()'
          ],
          correctAnswer: 1,
          explanation: 'dragAndDropBy(source, xOffset, yOffset) drags the source element and drops it at the specified offset location.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q15',
          type: 'mcq',
          mode: ['full'],
          question: 'What happens if you call multiple action methods without perform()?',
          options: [
            'Actions execute immediately',
            'Actions are queued but not executed',
            'An exception is thrown',
            'Only the last action executes'
          ],
          correctAnswer: 1,
          explanation: 'Without perform(), actions are added to a queue but never executed. You must call build().perform() or perform() to execute them.',
          points: 3,
          difficulty: 'hard'
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
          question: 'The Actions class is used for performing complex user interactions like hover and drag-and-drop.',
          correctAnswer: true,
          explanation: 'True. Actions class provides methods for complex interactions that cannot be performed with simple click() or sendKeys() methods.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q17',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'You must call perform() method to execute the actions stored in Actions object.',
          correctAnswer: true,
          explanation: 'True. The perform() method executes all actions that have been built up in the Actions object.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q18',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'contextClick() performs a left-click operation.',
          correctAnswer: false,
          explanation: 'False. contextClick() performs a right-click (context menu) operation, not a left-click.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q19',
          type: 'truefalse',
          mode: ['full'],
          question: 'The dragAndDrop() method requires two WebElement parameters: source and target.',
          correctAnswer: true,
          explanation: 'True. dragAndDrop(source, target) requires both the source element to drag and the target element to drop onto.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q20',
          type: 'truefalse',
          mode: ['full'],
          question: 'keyDown() and keyUp() are used together to simulate keyboard shortcuts like Ctrl+C.',
          correctAnswer: true,
          explanation: 'True. keyDown() presses a modifier key, then you send other keys, and finally keyUp() releases the modifier key.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q21',
          type: 'truefalse',
          mode: ['full'],
          question: 'moveToElement() can be used to scroll an element into view.',
          correctAnswer: true,
          explanation: 'True. moveToElement() moves the mouse to the element and scrolls it into view if necessary.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q22',
          type: 'truefalse',
          mode: ['full'],
          question: 'Actions class can only be used for mouse operations, not keyboard operations.',
          correctAnswer: false,
          explanation: 'False. Actions class supports both mouse operations (hover, click) and keyboard operations (keyDown, keyUp, sendKeys).',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q23',
          type: 'truefalse',
          mode: ['full'],
          question: 'The build() method is optional when using Actions class.',
          correctAnswer: true,
          explanation: 'True. In modern Selenium versions, you can directly call perform() without build(). However, build().perform() is still recommended.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q24',
          type: 'truefalse',
          mode: ['full'],
          question: 'clickAndHold() automatically releases the mouse button after a timeout.',
          correctAnswer: false,
          explanation: 'False. clickAndHold() keeps the mouse button pressed until release() is explicitly called.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q25',
          type: 'truefalse',
          mode: ['full'],
          question: 'You can chain multiple action methods together before calling perform().',
          correctAnswer: true,
          explanation: 'True. Actions class supports method chaining, allowing you to build complex action sequences before executing them.',
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
          mode: ['quick', 'full'],
          question: 'To create an Actions object, use: Actions actions = new Actions(_____);',
          correctAnswer: 'driver',
          acceptedAnswers: ['driver', 'webdriver'],
          explanation: 'Actions constructor takes WebDriver instance as parameter: new Actions(driver).',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q27',
          type: 'fillblank',
          mode: ['quick', 'full'],
          question: 'The _____ method is used to hover over an element in Actions class.',
          correctAnswer: 'moveToElement()',
          acceptedAnswers: ['moveToElement()', 'moveToElement', 'moveToElement(element)'],
          explanation: 'moveToElement(WebElement) moves the mouse pointer to hover over the specified element.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q28',
          type: 'fillblank',
          mode: ['full'],
          question: 'To execute all actions in the Actions object, call _____ method.',
          correctAnswer: 'perform()',
          acceptedAnswers: ['perform()', 'perform', 'build().perform()', 'build().perform'],
          explanation: 'perform() or build().perform() executes all actions that have been queued in the Actions object.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q29',
          type: 'fillblank',
          mode: ['full'],
          question: 'The _____ method performs a right-click operation in Selenium.',
          correctAnswer: 'contextClick()',
          acceptedAnswers: ['contextClick()', 'contextClick'],
          explanation: 'contextClick() performs a right-click (context menu) operation.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q30',
          type: 'fillblank',
          mode: ['full'],
          question: 'To drag element A to element B, use: actions._____(A, B).perform();',
          correctAnswer: 'dragAndDrop',
          acceptedAnswers: ['dragAndDrop', 'dragAndDrop()'],
          explanation: 'dragAndDrop(source, target) drags the source element and drops it on the target element.',
          points: 2,
          difficulty: 'medium'
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
          question: 'Explain the purpose of the Actions class in Selenium and give two examples of operations it can perform.',
          sampleAnswer: 'The Actions class in Selenium is used to perform complex user interactions that cannot be done with simple WebDriver methods. Examples include: 1) Mouse hover (moveToElement) - to reveal hidden dropdown menus, 2) Drag-and-drop (dragAndDrop) - to move elements from one location to another, 3) Right-click (contextClick) - to open context menus, and 4) Keyboard shortcuts (keyDown/keyUp) - to perform copy-paste operations.',
          keywords: ['Actions', 'complex', 'interactions', 'hover', 'drag', 'drop', 'right-click', 'keyboard', 'moveToElement', 'dragAndDrop'],
          minKeywords: 4,
          explanation: 'Actions class enables complex user interactions like hover, drag-and-drop, and keyboard shortcuts.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q32',
          type: 'shortanswer',
          mode: ['quick', 'full'],
          question: 'What is the difference between click() method in WebDriver and click() method in Actions class?',
          sampleAnswer: 'WebDriver click() directly clicks the element immediately, while Actions click() adds the click operation to a queue and requires perform() to execute. Actions click() allows chaining multiple operations together, providing more flexibility for complex interactions. WebDriver click() is simpler for basic clicking, while Actions click() is useful when combining multiple actions in a sequence.',
          keywords: ['WebDriver', 'Actions', 'immediate', 'queue', 'perform', 'chain', 'sequence', 'multiple'],
          minKeywords: 4,
          explanation: 'WebDriver click() executes immediately; Actions click() queues the action and needs perform() to execute.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: 'q33',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Write the code to perform a mouse hover on a menu element and then click a submenu item.',
          sampleAnswer: 'Actions actions = new Actions(driver);\nWebElement menu = driver.findElement(By.id("menu"));\nWebElement submenu = driver.findElement(By.id("submenu"));\nactions.moveToElement(menu).moveToElement(submenu).click().build().perform();\n\nOr alternatively:\nactions.moveToElement(menu).pause(Duration.ofSeconds(1)).click(submenu).perform();',
          keywords: ['Actions', 'new Actions', 'driver', 'moveToElement', 'click', 'perform', 'menu', 'submenu'],
          minKeywords: 5,
          explanation: 'Use moveToElement() to hover over menu, then moveToElement() or click() on submenu, followed by perform().',
          points: 4,
          difficulty: 'hard'
        },
        {
          id: 'q34',
          type: 'shortanswer',
          mode: ['full'],
          question: 'How do you perform a Ctrl+A (select all) operation using the Actions class?',
          sampleAnswer: 'Actions actions = new Actions(driver);\nactions.keyDown(Keys.CONTROL).sendKeys("a").keyUp(Keys.CONTROL).perform();\n\nOr using chord:\nactions.sendKeys(Keys.chord(Keys.CONTROL, "a")).perform();\n\nThe keyDown presses Control, sendKeys sends "a", and keyUp releases Control.',
          keywords: ['Actions', 'keyDown', 'keyUp', 'Keys.CONTROL', 'sendKeys', 'perform', 'chord'],
          minKeywords: 4,
          explanation: 'Use keyDown(Keys.CONTROL), sendKeys("a"), keyUp(Keys.CONTROL), and perform() to simulate Ctrl+A.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: 'q35',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Explain the difference between dragAndDrop() and dragAndDropBy() methods.',
          sampleAnswer: 'dragAndDrop(source, target) drags a source element and drops it onto a target element. It requires two WebElement parameters. dragAndDropBy(source, xOffset, yOffset) drags a source element and drops it at a location specified by pixel coordinates (x and y offset from the source). dragAndDrop is used when you have a specific target element, while dragAndDropBy is used when you need to drop at a specific coordinate position.',
          keywords: ['dragAndDrop', 'dragAndDropBy', 'source', 'target', 'element', 'offset', 'coordinates', 'pixel', 'xOffset', 'yOffset'],
          minKeywords: 5,
          explanation: 'dragAndDrop uses target element; dragAndDropBy uses pixel coordinates for the drop location.',
          points: 4,
          difficulty: 'hard'
        }
      ]
    }
  ]
};
