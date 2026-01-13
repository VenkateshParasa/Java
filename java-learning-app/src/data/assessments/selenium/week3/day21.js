export default {
  title: "Day 21: WebElement Interactions - Assessment",
  passingScore: 70,
  timeLimit: 30,
  modes: {
    quick: {
      title: "Quick Assessment (10 questions)",
      timeLimit: 15,
      description: "A quick 15-minute assessment covering key WebElement interaction methods"
    },
    full: {
      title: "Full Assessment (35 questions)",
      timeLimit: 45,
      description: "Comprehensive 45-minute assessment covering all WebElement interaction techniques"
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
          question: 'Which method is used to enter text into an input field?',
          options: [
            'enterText()',
            'sendKeys()',
            'typeText()',
            'input()'
          ],
          correctAnswer: 1,
          explanation: 'element.sendKeys("text") is the method used to enter text into input fields in Selenium.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q2',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What does the clear() method do?',
          options: [
            'Clears browser cache',
            'Removes existing text from input fields',
            'Clears all form data',
            'Closes the browser'
          ],
          correctAnswer: 1,
          explanation: 'element.clear() removes existing text from input fields, preparing them for new text entry.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q3',
          type: 'mcq',
          mode: ['full'],
          question: 'What happens when you call sendKeys() without calling clear() first?',
          options: [
            'Old text is replaced',
            'New text is appended to existing text',
            'Error is thrown',
            'Nothing happens'
          ],
          correctAnswer: 1,
          explanation: 'sendKeys() appends text to existing content. Always use clear() first to replace text: element.clear(); element.sendKeys("new text");',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q4',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which method retrieves the visible text of an element?',
          options: [
            'getValue()',
            'getText()',
            'readText()',
            'fetchText()'
          ],
          correctAnswer: 1,
          explanation: 'element.getText() retrieves the visible text content of an element as a String.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q5',
          type: 'mcq',
          mode: ['full'],
          question: 'How do you retrieve the value entered in an input field?',
          options: [
            'element.getText()',
            'element.getValue()',
            'element.getAttribute("value")',
            'element.getInputValue()'
          ],
          correctAnswer: 2,
          explanation: 'For input fields, use element.getAttribute("value") to get the entered value. getText() does not work for input fields.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q6',
          type: 'mcq',
          mode: ['full'],
          question: 'Which method retrieves the value of an element\'s attribute?',
          options: [
            'getProperty()',
            'getAttribute()',
            'fetchAttribute()',
            'readAttribute()'
          ],
          correctAnswer: 1,
          explanation: 'element.getAttribute("attributeName") retrieves the value of any HTML attribute (id, class, href, etc.).',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q7',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which method retrieves CSS property values of an element?',
          options: [
            'getStyle()',
            'getCssValue()',
            'getProperty()',
            'getCss()'
          ],
          correctAnswer: 1,
          explanation: 'element.getCssValue("propertyName") retrieves CSS property values like color, font-size, background-color.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q8',
          type: 'mcq',
          mode: ['full'],
          question: 'What format does getCssValue() return colors in?',
          options: [
            'Hexadecimal (#ff0000)',
            'Named colors (red)',
            'rgba format (rgba(255, 0, 0, 1))',
            'RGB format (rgb(255, 0, 0))'
          ],
          correctAnswer: 2,
          explanation: 'getCssValue("color") returns colors in rgba format, not hexadecimal or named colors.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q9',
          type: 'mcq',
          mode: ['full'],
          question: 'Which method checks if an element is visible on the page?',
          options: [
            'isVisible()',
            'isDisplayed()',
            'isShown()',
            'checkVisibility()'
          ],
          correctAnswer: 1,
          explanation: 'element.isDisplayed() returns true if the element is visible, false if hidden (display:none, visibility:hidden).',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q10',
          type: 'mcq',
          mode: ['full'],
          question: 'Which method checks if an element is enabled/interactive?',
          options: [
            'isActive()',
            'isEnabled()',
            'isClickable()',
            'isInteractive()'
          ],
          correctAnswer: 1,
          explanation: 'element.isEnabled() returns true if the element is enabled (interactive), false if disabled.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q11',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which method checks if a checkbox or radio button is selected?',
          options: [
            'isChecked()',
            'isSelected()',
            'isActive()',
            'getValue()'
          ],
          correctAnswer: 1,
          explanation: 'element.isSelected() returns true if a checkbox or radio button is selected/checked.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q12',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the difference between submit() and click()?',
          options: [
            'No difference',
            'submit() submits a form; click() clicks a button',
            'submit() is faster',
            'click() works only with buttons'
          ],
          correctAnswer: 1,
          explanation: 'submit() submits a form (can be called on any form element). click() simulates a mouse click on the submit button.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q13',
          type: 'mcq',
          mode: ['full'],
          question: 'How do you use the ENTER key with sendKeys()?',
          options: [
            'sendKeys("\\n")',
            'sendKeys(Keys.ENTER)',
            'sendKeys("ENTER")',
            'pressEnter()'
          ],
          correctAnswer: 1,
          explanation: 'Use the Keys enum: element.sendKeys(Keys.ENTER). You need to import org.openqa.selenium.Keys.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q14',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the correct pattern to check a checkbox?',
          options: [
            'checkbox.click()',
            'if (!checkbox.isSelected()) { checkbox.click(); }',
            'checkbox.check()',
            'checkbox.select()'
          ],
          correctAnswer: 1,
          explanation: 'Check a checkbox only if not already checked: if (!checkbox.isSelected()) { checkbox.click(); }',
          points: 3,
          difficulty: 'hard'
        },
        {
          id: 'q15',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Before interacting with an element, you should verify:',
          options: [
            'Only isDisplayed()',
            'Only isEnabled()',
            'Both isDisplayed() and isEnabled()',
            'No verification needed'
          ],
          correctAnswer: 2,
          explanation: 'Best practice: Verify both isDisplayed() and isEnabled() before interacting with elements.',
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
          question: 'You should always call clear() before sendKeys() when replacing text.',
          correctAnswer: true,
          explanation: 'True. Always clear() before sendKeys() to replace text, otherwise new text is appended to existing text.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q17',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'getText() can be used to retrieve the value from an input field.',
          correctAnswer: false,
          explanation: 'False. For input fields, use getAttribute("value"). getText() returns empty string for input elements.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q18',
          type: 'truefalse',
          mode: ['full'],
          question: 'getAttribute("textContent") returns all text including hidden elements.',
          correctAnswer: true,
          explanation: 'True. getAttribute("textContent") returns all text including hidden. getText() returns only visible text.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q19',
          type: 'truefalse',
          mode: ['full'],
          question: 'isDisplayed() returns false for elements with display:none or visibility:hidden.',
          correctAnswer: true,
          explanation: 'True. isDisplayed() returns false for elements that are hidden via CSS (display:none, visibility:hidden).',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q20',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'isSelected() works for checkboxes and radio buttons.',
          correctAnswer: true,
          explanation: 'True. isSelected() is specifically for checkboxes and radio buttons to check if they are selected.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q21',
          type: 'truefalse',
          mode: ['full'],
          question: 'You can call submit() on any element within a form to submit the form.',
          correctAnswer: true,
          explanation: 'True. submit() can be called on any form element (input, button, form tag itself) to submit the parent form.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q22',
          type: 'truefalse',
          mode: ['full'],
          question: 'click() only works on button elements.',
          correctAnswer: false,
          explanation: 'False. click() works on any clickable element: buttons, links, checkboxes, radio buttons, images, divs with click handlers.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q23',
          type: 'truefalse',
          mode: ['full'],
          question: 'Keys enum must be imported from org.openqa.selenium.Keys.',
          correctAnswer: true,
          explanation: 'True. You must import org.openqa.selenium.Keys to use special keys like Keys.ENTER, Keys.TAB.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q24',
          type: 'truefalse',
          mode: ['full'],
          question: 'To uncheck a checkbox, you simply click it regardless of its current state.',
          correctAnswer: false,
          explanation: 'False. Check state first: if (checkbox.isSelected()) { checkbox.click(); } to safely uncheck.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q25',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'An element must be displayed AND enabled to be clickable.',
          correctAnswer: true,
          explanation: 'True. An element must be both isDisplayed() and isEnabled() to be successfully clickable.',
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
          question: 'The _____ method enters text into input fields.',
          correctAnswer: 'sendKeys()',
          acceptedAnswers: ['sendKeys()', 'sendKeys'],
          explanation: 'element.sendKeys("text") is the method to enter text into input fields.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q27',
          type: 'fillblank',
          mode: ['full'],
          question: 'The _____ method removes existing text from input fields.',
          correctAnswer: 'clear()',
          acceptedAnswers: ['clear()', 'clear'],
          explanation: 'element.clear() removes all existing text from input fields.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q28',
          type: 'fillblank',
          mode: ['full'],
          question: 'To get the value from an input field, use element.getAttribute("_____").',
          correctAnswer: 'value',
          acceptedAnswers: ['value'],
          explanation: 'element.getAttribute("value") retrieves the value entered in an input field.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q29',
          type: 'fillblank',
          mode: ['quick', 'full'],
          question: 'The _____ method checks if an element is visible on the page.',
          correctAnswer: 'isDisplayed()',
          acceptedAnswers: ['isDisplayed()', 'isDisplayed'],
          explanation: 'element.isDisplayed() returns true if element is visible, false if hidden.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q30',
          type: 'fillblank',
          mode: ['full'],
          question: 'The _____ method checks if a checkbox is selected.',
          correctAnswer: 'isSelected()',
          acceptedAnswers: ['isSelected()', 'isSelected'],
          explanation: 'element.isSelected() returns true if checkbox/radio is selected.',
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
          question: 'Explain the difference between getText() and getAttribute("value").',
          sampleAnswer: 'getText() retrieves visible text content from elements like headings, paragraphs, buttons, and divs. It returns empty string for input fields. getAttribute("value") retrieves the value attribute from input fields, which contains the text entered by the user. For input fields, always use getAttribute("value"), not getText().',
          keywords: ['getText', 'getAttribute', 'value', 'visible', 'input', 'text', 'empty'],
          minKeywords: 4,
          explanation: 'getText() gets visible text; getAttribute("value") gets input field values.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: 'q32',
          type: 'shortanswer',
          mode: ['full'],
          question: 'List the three element state verification methods and their purposes.',
          sampleAnswer: 'The three state verification methods are: 1) isDisplayed() - checks if element is visible (returns false for display:none or visibility:hidden), 2) isEnabled() - checks if element is enabled/interactive (returns false for disabled attribute), and 3) isSelected() - checks if checkbox or radio button is selected/checked.',
          keywords: ['isDisplayed', 'isEnabled', 'isSelected', 'visible', 'enabled', 'disabled', 'checkbox', 'selected'],
          minKeywords: 5,
          explanation: 'isDisplayed() checks visibility, isEnabled() checks if interactive, isSelected() checks checkbox/radio selection.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q33',
          type: 'shortanswer',
          mode: ['full'],
          question: 'What is the best practice pattern for checking a checkbox?',
          sampleAnswer: 'The best practice is to check the current state first: if (!checkbox.isSelected()) { checkbox.click(); }. This ensures you only click if the checkbox is not already checked. Simply clicking without checking state will toggle the checkbox, which may uncheck it if it was already checked.',
          keywords: ['isSelected', 'click', 'check', 'state', 'toggle', 'if', '!'],
          minKeywords: 4,
          explanation: 'Check state first: if (!checkbox.isSelected()) { checkbox.click(); } to avoid unintended toggling.',
          points: 4,
          difficulty: 'hard'
        },
        {
          id: 'q34',
          type: 'shortanswer',
          mode: ['full'],
          question: 'What should you verify before clicking an element?',
          sampleAnswer: 'Before clicking an element, verify that: 1) isDisplayed() returns true - element is visible, 2) isEnabled() returns true - element is not disabled, and 3) Element is not obscured by another element. Pattern: if (element.isDisplayed() && element.isEnabled()) { element.click(); }. This prevents NoSuchElementException and ensures successful interaction.',
          keywords: ['isDisplayed', 'isEnabled', 'visible', 'enabled', 'verify', 'before', 'click'],
          minKeywords: 4,
          explanation: 'Verify isDisplayed() and isEnabled() before clicking to ensure element is ready for interaction.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q35',
          type: 'shortanswer',
          mode: ['quick', 'full'],
          question: 'Demonstrate the correct pattern for replacing text in an input field.',
          sampleAnswer: 'The correct pattern is: 1) Locate the element, 2) Call clear() to remove existing text, 3) Call sendKeys() to enter new text. Example: WebElement username = driver.findElement(By.id("username")); username.clear(); username.sendKeys("new_user"); This ensures old text is removed before entering new text.',
          keywords: ['clear', 'sendKeys', 'locate', 'remove', 'replace', 'pattern', 'findElement'],
          minKeywords: 4,
          explanation: 'Pattern: element.clear(); element.sendKeys("new text"); - Always clear before entering text.',
          points: 3,
          difficulty: 'medium'
        }
      ]
    }
  ]
};
