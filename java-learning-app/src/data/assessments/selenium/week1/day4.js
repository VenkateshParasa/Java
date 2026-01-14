export default {
  title: "Day 4: Working with Web Elements Assessment",
  description: "Test your understanding of finding elements, element methods, and element state verification",
  passingScore: 70,
  timeLimit: 23, // minutes
  modes: {
    quick: {
      questionCount: 10,
      timeLimit: 12,
      sections: ['section-a', 'section-b']
    },
    full: {
      questionCount: 24,
      timeLimit: 23,
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
          question: 'What does the click() method do in Selenium?',
          options: [
            'Double clicks an element',
            'Right clicks an element',
            'Performs a single left click on an element',
            'Highlights an element'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'The click() method simulates a single left mouse button click on the specified web element.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'Which method is used to enter text into an input field?',
          options: [
            'element.setText("text")',
            'element.type("text")',
            'element.sendKeys("text")',
            'element.input("text")'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'element.sendKeys("text") types text into input fields, textareas, or any editable element.'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'What does the clear() method do?',
          options: [
            'Clears browser cache',
            'Clears the text content of an input field',
            'Deletes all cookies',
            'Closes the browser'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'element.clear() clears the text content of text input elements like input fields and textareas.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'How do you check if an element is displayed on the page?',
          options: [
            'element.isVisible()',
            'element.isDisplayed()',
            'element.isShown()',
            'element.visible()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'element.isDisplayed() returns true if the element is visible on the page, false otherwise.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'Which method checks if an element is currently enabled for interaction?',
          options: [
            'element.isActive()',
            'element.isEnabled()',
            'element.canInteract()',
            'element.isClickable()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'element.isEnabled() returns true if the element is enabled and can be interacted with, false if disabled.'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'How do you verify if a checkbox or radio button is selected?',
          options: [
            'element.isChecked()',
            'element.isSelected()',
            'element.checked()',
            'element.getSelection()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'element.isSelected() returns true if a checkbox or radio button is selected, false otherwise.'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'Which method retrieves the value of an element\'s attribute?',
          options: [
            'element.get("attribute")',
            'element.getAttribute("attribute")',
            'element.attr("attribute")',
            'element.property("attribute")'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'element.getAttribute("attributeName") returns the value of the specified attribute as a String.'
        },
        {
          id: 'q8',
          type: 'mcq',
          question: 'What does element.getText() return?',
          options: [
            'The HTML of the element',
            'The visible text content of the element',
            'The value attribute of the element',
            'The inner text including hidden elements'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'element.getText() returns the visible text content of the element, excluding any HTML tags.'
        },
        {
          id: 'q9',
          type: 'mcq',
          question: 'How do you get the tag name of an element (e.g., "input", "div")?',
          options: [
            'element.getTag()',
            'element.tagName()',
            'element.getTagName()',
            'element.tag()'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'medium',
          explanation: 'element.getTagName() returns the tag name of the element as a String, such as "input", "div", "button", etc.'
        },
        {
          id: 'q10',
          type: 'mcq',
          question: 'What is the return type of element.getLocation()?',
          options: [
            'String',
            'Integer',
            'Point',
            'Dimension'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'medium',
          explanation: 'element.getLocation() returns a Point object containing the x and y coordinates of the element\'s position on the page.'
        },
        {
          id: 'q11',
          type: 'mcq',
          question: 'Which method returns the width and height of an element?',
          options: [
            'element.getSize()',
            'element.getDimensions()',
            'element.getWidth()',
            'element.getBounds()'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'medium',
          explanation: 'element.getSize() returns a Dimension object containing the width and height of the element in pixels.'
        },
        {
          id: 'q12',
          type: 'mcq',
          question: 'What does element.getCssValue("color") return?',
          options: [
            'The CSS class name',
            'The computed CSS value for the "color" property',
            'The inline style value',
            'The element ID'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'element.getCssValue("propertyName") returns the computed value of the specified CSS property as a String.'
        },
        {
          id: 'q13',
          type: 'mcq',
          question: 'What happens if you call click() on a disabled button?',
          options: [
            'The click is ignored silently',
            'It throws InvalidElementStateException',
            'It enables the button first, then clicks',
            'It clicks successfully'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'hard',
          explanation: 'Attempting to click a disabled element throws InvalidElementStateException because the element cannot be interacted with.'
        },
        {
          id: 'q14',
          type: 'mcq',
          question: 'How do you submit a form in Selenium?',
          options: [
            'form.submit()',
            'form.click()',
            'form.send()',
            'form.submitForm()'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'easy',
          explanation: 'element.submit() submits a form if the element is within a form element. This simulates pressing Enter in a form field.'
        }
      ]
    },
    {
      id: 'section-b',
      title: 'True/False Questions',
      questions: [
        {
          id: 'q15',
          type: 'true-false',
          question: 'sendKeys() can only be used with input elements.',
          correctAnswer: false,
          points: 2,
          difficulty: 'medium',
          explanation: 'False. sendKeys() can be used with any editable element including input fields, textareas, and contenteditable elements.'
        },
        {
          id: 'q16',
          type: 'true-false',
          question: 'isDisplayed() returns true even if an element has visibility:hidden CSS property.',
          correctAnswer: false,
          points: 2,
          difficulty: 'medium',
          explanation: 'False. isDisplayed() returns false for elements with visibility:hidden or display:none CSS properties.'
        },
        {
          id: 'q17',
          type: 'true-false',
          question: 'getText() returns empty string for hidden elements.',
          correctAnswer: true,
          points: 2,
          difficulty: 'medium',
          explanation: 'True. getText() returns an empty string if the element is not visible on the page.'
        },
        {
          id: 'q18',
          type: 'true-false',
          question: 'getAttribute("value") and getText() always return the same result for input fields.',
          correctAnswer: false,
          points: 2,
          difficulty: 'hard',
          explanation: 'False. For input fields, getAttribute("value") returns the current value, while getText() typically returns empty string since input fields don\'t have visible text content.'
        },
        {
          id: 'q19',
          type: 'true-false',
          question: 'You should always call clear() before sendKeys() when entering text.',
          correctAnswer: true,
          points: 2,
          difficulty: 'medium',
          explanation: 'True. It\'s a best practice to clear() existing text before sendKeys() to ensure the field contains only the intended text.'
        },
        {
          id: 'q20',
          type: 'true-false',
          question: 'isEnabled() and isDisplayed() check the same thing.',
          correctAnswer: false,
          points: 2,
          difficulty: 'easy',
          explanation: 'False. isEnabled() checks if an element can be interacted with (not disabled), while isDisplayed() checks if the element is visible on the page.'
        }
      ]
    },
    {
      id: 'section-c',
      title: 'Fill in the Blanks',
      questions: [
        {
          id: 'q21',
          type: 'fill-blank',
          question: 'The method ________ removes all text from an input field.',
          correctAnswer: 'clear',
          points: 2,
          difficulty: 'easy',
          explanation: 'element.clear() removes/clears all text content from text input elements.'
        },
        {
          id: 'q22',
          type: 'fill-blank',
          question: 'To get the value of the "href" attribute, use element.________("href").',
          correctAnswer: 'getAttribute',
          points: 2,
          difficulty: 'easy',
          explanation: 'element.getAttribute("href") retrieves the value of the href attribute from an element.'
        }
      ]
    },
    {
      id: 'section-d',
      title: 'Short Answer Questions',
      questions: [
        {
          id: 'q23',
          type: 'short',
          question: 'Explain the difference between getAttribute("value"), getText(), and getCssValue() with examples.',
          sampleAnswer: 'Three methods for getting element data: 1) getAttribute("value") - Gets the value attribute of HTML elements. Example: input.getAttribute("value") returns text in input field. Also works for other attributes like "href", "id", "class". 2) getText() - Gets visible text content between opening and closing tags. Example: <div>Hello</div>, div.getText() returns "Hello". Returns empty string for hidden elements or input fields. 3) getCssValue("property") - Gets computed CSS property values. Example: element.getCssValue("color") returns RGB color value like "rgba(255, 0, 0, 1)". Use case: getAttribute for HTML attributes, getText for visible content, getCssValue for styling information.',
          points: 4,
          difficulty: 'hard',
          keywords: ['getAttribute', 'getText', 'getCssValue', 'value', 'attribute', 'visible text', 'CSS', 'property', 'content']
        },
        {
          id: 'q24',
          type: 'short',
          question: 'Describe the three element state verification methods (isDisplayed, isEnabled, isSelected) and when to use each.',
          sampleAnswer: 'Three element state methods: 1) isDisplayed() - Checks if element is visible on page. Returns true if element has non-zero height/width and no visibility:hidden or display:none. Use before interacting with elements to avoid ElementNotVisibleException. Example: if(element.isDisplayed()) element.click(); 2) isEnabled() - Checks if element can be interacted with (not disabled). Returns true if element doesn\'t have disabled attribute. Use before sending keys or clicking. Example: if(button.isEnabled()) button.click(); 3) isSelected() - Checks if checkbox, radio button, or option is selected. Returns true if selected. Use for verifying selection state. Example: if(!checkbox.isSelected()) checkbox.click(); Best practice: Verify appropriate state before interaction to prevent exceptions.',
          points: 4,
          difficulty: 'medium',
          keywords: ['isDisplayed', 'isEnabled', 'isSelected', 'visible', 'disabled', 'checkbox', 'state', 'verification', 'interaction']
        }
      ]
    }
  ],
  week: 1,
  day: 4,
  topic: "Working with Web Elements"
};
