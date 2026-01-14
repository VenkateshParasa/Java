export default {
  title: "Day 8: Actions Class Assessment",
  description: "Test your understanding of Selenium Actions class for mouse and keyboard operations",
  passingScore: 70,
  timeLimit: 22, // minutes
  modes: {
    quick: {
      questionCount: 10,
      timeLimit: 12,
      sections: ['section-a', 'section-b']
    },
    full: {
      questionCount: 24,
      timeLimit: 22,
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
          question: 'What is the Actions class in Selenium used for?',
          options: [
            'To handle browser navigation',
            'To perform complex user interactions like mouse hover and keyboard operations',
            'To manage test execution',
            'To handle alerts and popups'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'The Actions class is used to perform complex user interactions including mouse movements, keyboard operations, drag and drop, and other advanced user gestures.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'How do you create an Actions object in Selenium?',
          options: [
            'Actions actions = new Actions();',
            'Actions actions = new Actions(driver);',
            'Actions actions = driver.getActions();',
            'Actions actions = Actions.create(driver);'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'An Actions object is created by passing the WebDriver instance to its constructor: Actions actions = new Actions(driver);'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'Which method is used to hover over an element?',
          options: [
            'hover()',
            'mouseOver()',
            'moveToElement()',
            'hoverElement()'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'The moveToElement() method is used to move the mouse pointer to the middle of an element, effectively hovering over it.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'What is the difference between build() and perform() methods?',
          options: [
            'build() executes actions, perform() creates them',
            'build() creates a composite action, perform() executes it',
            'They are the same method',
            'build() is deprecated, use perform() only'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'build() generates a composite action from all actions added so far, while perform() executes the action. You can use build().perform() or just perform() which internally calls build().'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'Which method performs a double-click operation?',
          options: [
            'click().click()',
            'doubleClick()',
            'clickTwice()',
            'dblClick()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'The doubleClick() method is used to perform a double-click operation on an element or at the current mouse position.'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'How do you perform a right-click (context menu) operation?',
          options: [
            'rightClick()',
            'contextClick()',
            'menuClick()',
            'secondaryClick()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'The contextClick() method is used to perform a right-click operation, which typically opens a context menu.'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'Which method is used to click and hold an element?',
          options: [
            'holdClick()',
            'pressAndHold()',
            'clickAndHold()',
            'hold()'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'The clickAndHold() method clicks (without releasing) at the current mouse location or on the specified element.'
        },
        {
          id: 'q8',
          type: 'mcq',
          question: 'How do you release a held mouse button?',
          options: [
            'unclick()',
            'release()',
            'drop()',
            'releaseClick()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'The release() method releases the currently held mouse button at the current mouse location or on the specified element.'
        },
        {
          id: 'q9',
          type: 'mcq',
          question: 'Which method is used to hold down a keyboard key?',
          options: [
            'pressKey()',
            'holdKey()',
            'keyDown()',
            'pushKey()'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'The keyDown() method performs a modifier key press (like Shift, Control, Alt) without releasing it.'
        },
        {
          id: 'q10',
          type: 'mcq',
          question: 'Which method releases a pressed keyboard key?',
          options: [
            'releaseKey()',
            'keyRelease()',
            'keyUp()',
            'unpressKey()'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'The keyUp() method releases a modifier key that was pressed with keyDown().'
        },
        {
          id: 'q11',
          type: 'mcq',
          question: 'How do you perform Ctrl+A (Select All) using Actions class?',
          options: [
            'actions.sendKeys(Keys.CONTROL + "a").perform();',
            'actions.keyDown(Keys.CONTROL).sendKeys("a").keyUp(Keys.CONTROL).perform();',
            'actions.pressKeys(Keys.CONTROL, "a").perform();',
            'actions.sendKeys(Keys.chord(Keys.CONTROL, "a")).perform();'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'To perform keyboard shortcuts, use keyDown() to press the modifier key, sendKeys() for the character, and keyUp() to release the modifier.'
        },
        {
          id: 'q12',
          type: 'mcq',
          question: 'What does the sendKeys() method do in the Actions class?',
          options: [
            'Only sends modifier keys',
            'Sends a series of keystrokes to the active element',
            'Clears and sends keys',
            'Validates key inputs'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'The sendKeys() method in Actions class sends a series of keystrokes to the currently focused element or to a specified element.'
        },
        {
          id: 'q13',
          type: 'mcq',
          question: 'Which is the correct way to chain multiple actions?',
          options: [
            'actions.moveToElement(el1); actions.click(); actions.perform();',
            'actions.moveToElement(el1).click().perform();',
            'actions.moveToElement(el1) + actions.click() + perform();',
            'actions.perform(moveToElement(el1), click());'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Actions can be chained using method chaining (dot notation), and all actions are executed when perform() is called at the end.'
        },
        {
          id: 'q14',
          type: 'mcq',
          question: 'What happens if you forget to call perform()?',
          options: [
            'Actions execute automatically',
            'Actions are stored but not executed',
            'An exception is thrown',
            'Only the last action executes'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'If perform() is not called, the actions are built but never executed. The perform() method is required to actually execute the actions.'
        },
        {
          id: 'q15',
          type: 'mcq',
          question: 'How do you move the mouse by a specific offset?',
          options: [
            'moveByOffset(xOffset, yOffset)',
            'moveMouse(x, y)',
            'offsetMove(x, y)',
            'mouseMove(xOffset, yOffset)'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'medium',
          explanation: 'The moveByOffset(xOffset, yOffset) method moves the mouse from its current position (or 0,0) by the given offset.'
        },
        {
          id: 'q16',
          type: 'mcq',
          question: 'Which Keys constant represents the Enter key?',
          options: [
            'Keys.ENTER',
            'Keys.RETURN',
            'Both Keys.ENTER and Keys.RETURN',
            'Keys.NEWLINE'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'medium',
          explanation: 'Both Keys.ENTER and Keys.RETURN represent the Enter/Return key. They can be used interchangeably in Selenium.'
        }
      ]
    },
    {
      id: 'section-b',
      title: 'True/False Questions',
      questions: [
        {
          id: 'q17',
          type: 'true-false',
          question: 'The Actions class can only perform mouse operations.',
          correctAnswer: false,
          points: 2,
          difficulty: 'easy',
          explanation: 'False. The Actions class can perform both mouse operations (hover, click, drag) and keyboard operations (key press, shortcuts).'
        },
        {
          id: 'q18',
          type: 'true-false',
          question: 'You must call perform() to execute actions built with the Actions class.',
          correctAnswer: true,
          points: 2,
          difficulty: 'easy',
          explanation: 'True. The perform() method is required to execute the actions. Without it, actions are built but not executed.'
        },
        {
          id: 'q19',
          type: 'true-false',
          question: 'build().perform() and perform() do the same thing.',
          correctAnswer: true,
          points: 2,
          difficulty: 'medium',
          explanation: 'True. The perform() method internally calls build() if it hasn\'t been called yet, so both achieve the same result.'
        },
        {
          id: 'q20',
          type: 'true-false',
          question: 'contextClick() performs a double-click operation.',
          correctAnswer: false,
          points: 2,
          difficulty: 'easy',
          explanation: 'False. contextClick() performs a right-click (context menu) operation. doubleClick() performs a double-click.'
        },
        {
          id: 'q21',
          type: 'true-false',
          question: 'keyDown() must always be paired with keyUp() for modifier keys.',
          correctAnswer: true,
          points: 2,
          difficulty: 'medium',
          explanation: 'True. For proper cleanup and to avoid keys remaining pressed, keyDown() should always be followed by keyUp() for modifier keys.'
        }
      ]
    },
    {
      id: 'section-c',
      title: 'Fill in the Blanks',
      questions: [
        {
          id: 'q22',
          type: 'fill-blank',
          question: 'To execute all built actions, you must call the ________ method.',
          correctAnswer: 'perform',
          points: 2,
          difficulty: 'easy',
          explanation: 'The perform() method is used to execute all actions that have been built using the Actions class.'
        },
        {
          id: 'q23',
          type: 'fill-blank',
          question: 'The ________ method is used to hover over an element in Selenium.',
          correctAnswer: 'moveToElement',
          points: 2,
          difficulty: 'easy',
          explanation: 'The moveToElement() method moves the mouse pointer to the center of an element, creating a hover effect.'
        }
      ]
    },
    {
      id: 'section-d',
      title: 'Short Answer Questions',
      questions: [
        {
          id: 'q24',
          type: 'short',
          question: 'Explain the difference between click() in WebElement and click() in Actions class.',
          sampleAnswer: 'Difference between WebElement.click() and Actions.click(): 1) WebElement.click() - Direct method on WebElement, immediately executes click, simple single action, no need for perform(). Example: driver.findElement(By.id("btn")).click(); 2) Actions.click() - Part of Actions class, requires perform() to execute, can be chained with other actions, simulates actual user mouse click. Example: actions.click(element).perform(); Use WebElement.click() for simple clicks, Actions.click() when combining with other actions like hover, or when you need precise mouse control. Actions class provides more control and flexibility for complex user interactions.',
          points: 3,
          difficulty: 'medium',
          keywords: ['WebElement', 'Actions', 'click', 'perform', 'chain', 'immediate', 'complex', 'interactions']
        }
      ]
    }
  ]
};
