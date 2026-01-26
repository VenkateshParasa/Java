export default {
  title: "Day 22: Dropdowns & Checkboxes - Assessment",
  passingScore: 70,
  timeLimit: 30,
  modes: {
    quick: {
      title: "Quick Assessment (10 questions)",
      timeLimit: 15,
      description: "A quick 15-minute assessment covering key dropdown and checkbox handling concepts"
    },
    full: {
      title: "Full Assessment (35 questions)",
      timeLimit: 45,
      description: "Comprehensive 45-minute assessment covering all dropdown, checkbox, and radio button operations"
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
          question: 'Which class is used to handle dropdowns in Selenium?',
          options: [
            'DropdownHandler',
            'Select',
            'DropdownElement',
            'SelectElement'
          ],
          correctAnswer: 1,
          explanation: 'The Select class from org.openqa.selenium.support.ui.Select is used to handle dropdown elements in Selenium.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q2',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the correct import statement for the Select class?',
          options: [
            'import org.openqa.selenium.Select;',
            'import org.openqa.selenium.support.ui.Select;',
            'import selenium.support.Select;',
            'import selenium.ui.Select;'
          ],
          correctAnswer: 1,
          explanation: 'The correct import is: import org.openqa.selenium.support.ui.Select; to use the Select class for dropdown handling.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q3',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which HTML tag must a dropdown have to use the Select class?',
          options: [
            '<dropdown>',
            '<select>',
            '<list>',
            '<options>'
          ],
          correctAnswer: 1,
          explanation: 'The Select class only works with dropdown elements that have the <select> HTML tag. It will throw an exception for other elements.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q4',
          type: 'mcq',
          mode: ['full'],
          question: 'How many methods does the Select class provide to select options?',
          options: [
            '1',
            '2',
            '3',
            '4'
          ],
          correctAnswer: 2,
          explanation: 'The Select class provides 3 methods to select options: selectByVisibleText(), selectByValue(), and selectByIndex().',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q5',
          type: 'mcq',
          mode: ['full'],
          question: 'Which method selects a dropdown option by the text displayed to users?',
          options: [
            'selectByText()',
            'selectByVisibleText()',
            'selectByDisplayText()',
            'selectByLabel()'
          ],
          correctAnswer: 1,
          explanation: 'selectByVisibleText("text") selects an option by the visible text displayed to users in the dropdown.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q6',
          type: 'mcq',
          mode: ['full'],
          question: 'Which method selects a dropdown option by the value attribute of the <option> tag?',
          options: [
            'selectByAttribute()',
            'selectByValue()',
            'selectByOptionValue()',
            'selectOption()'
          ],
          correctAnswer: 1,
          explanation: 'selectByValue("value") selects an option based on the value attribute of the <option> tag.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q7',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'In selectByIndex(), what is the index of the first option in a dropdown?',
          options: [
            '1',
            '0',
            '-1',
            'null'
          ],
          correctAnswer: 1,
          explanation: 'selectByIndex(0) selects the first option. Dropdown indices are 0-based, so the first option has index 0.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q8',
          type: 'mcq',
          mode: ['full'],
          question: 'Which method retrieves the currently selected option in a dropdown?',
          options: [
            'getSelected()',
            'getFirstSelectedOption()',
            'getSelectedOption()',
            'getCurrentOption()'
          ],
          correctAnswer: 1,
          explanation: 'getFirstSelectedOption() returns a WebElement representing the currently selected option in the dropdown.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q9',
          type: 'mcq',
          mode: ['full'],
          question: 'How do you get the text of the currently selected option?',
          options: [
            'select.getSelectedText()',
            'select.getFirstSelectedOption().getText()',
            'select.getCurrentText()',
            'select.getText()'
          ],
          correctAnswer: 1,
          explanation: 'Use select.getFirstSelectedOption().getText() to retrieve the visible text of the currently selected option.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q10',
          type: 'mcq',
          mode: ['full'],
          question: 'Which method returns all available options in a dropdown?',
          options: [
            'getOptions()',
            'getAllOptions()',
            'getOptionsList()',
            'fetchOptions()'
          ],
          correctAnswer: 0,
          explanation: 'getOptions() returns a List<WebElement> containing all available options in the dropdown.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q11',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What exception is thrown if you try to use Select on a non-<select> element?',
          options: [
            'NoSuchElementException',
            'UnexpectedTagNameException',
            'InvalidElementException',
            'ElementNotSelectableException'
          ],
          correctAnswer: 1,
          explanation: 'UnexpectedTagNameException is thrown when you try to create a Select object with an element that is not a <select> tag.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q12',
          type: 'mcq',
          mode: ['full'],
          question: 'How do you check if a dropdown supports multiple selections?',
          options: [
            'select.isMultiple()',
            'select.isMultiSelect()',
            'select.supportsMultiple()',
            'select.allowsMultiple()'
          ],
          correctAnswer: 0,
          explanation: 'select.isMultiple() returns true if the dropdown has the multiple attribute, allowing multiple selections.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q13',
          type: 'mcq',
          mode: ['full'],
          question: 'Which method deselects all selected options in a multi-select dropdown?',
          options: [
            'clearAll()',
            'deselectAll()',
            'removeAll()',
            'unselectAll()'
          ],
          correctAnswer: 1,
          explanation: 'deselectAll() deselects all currently selected options in a multi-select dropdown. It throws exception if dropdown is not multi-select.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q14',
          type: 'mcq',
          mode: ['full'],
          question: 'How do you handle checkboxes in Selenium?',
          options: [
            'Use the Checkbox class',
            'Use the Select class',
            'Use click() method directly on the WebElement',
            'Use the CheckboxHandler class'
          ],
          correctAnswer: 2,
          explanation: 'Checkboxes are handled using the standard WebElement click() method. There is no special Checkbox class in Selenium.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q15',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the best practice pattern for checking a checkbox?',
          options: [
            'Always click() the checkbox',
            'if (!checkbox.isSelected()) { checkbox.click(); }',
            'checkbox.check()',
            'checkbox.select()'
          ],
          correctAnswer: 1,
          explanation: 'Best practice: Check state first using if (!checkbox.isSelected()) { checkbox.click(); } to avoid unintended toggling.',
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
          question: 'The Select class can be used with any HTML element.',
          correctAnswer: false,
          explanation: 'False. The Select class only works with <select> tag elements. Using it with other elements throws UnexpectedTagNameException.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q17',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'selectByIndex() uses 0-based indexing.',
          correctAnswer: true,
          explanation: 'True. selectByIndex(0) selects the first option, selectByIndex(1) selects the second, and so on.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q18',
          type: 'truefalse',
          mode: ['full'],
          question: 'You must import org.openqa.selenium.support.ui.Select to use the Select class.',
          correctAnswer: true,
          explanation: 'True. The Select class is located in the org.openqa.selenium.support.ui package and must be imported.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q19',
          type: 'truefalse',
          mode: ['full'],
          question: 'getFirstSelectedOption() returns a String value.',
          correctAnswer: false,
          explanation: 'False. getFirstSelectedOption() returns a WebElement object. Use .getText() on it to get the String value.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q20',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'You can select multiple options in a single-select dropdown.',
          correctAnswer: false,
          explanation: 'False. Only dropdowns with the multiple attribute (multi-select dropdowns) allow multiple selections.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q21',
          type: 'truefalse',
          mode: ['full'],
          question: 'deselectByVisibleText() can be used on single-select dropdowns.',
          correctAnswer: false,
          explanation: 'False. Deselect methods (deselectByVisibleText, deselectByValue, deselectByIndex, deselectAll) only work on multi-select dropdowns and throw exception otherwise.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q22',
          type: 'truefalse',
          mode: ['full'],
          question: 'isSelected() can be used to check if a checkbox is checked.',
          correctAnswer: true,
          explanation: 'True. checkbox.isSelected() returns true if the checkbox is checked, false if unchecked.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q23',
          type: 'truefalse',
          mode: ['full'],
          question: 'Clicking a checkbox always checks it, regardless of its current state.',
          correctAnswer: false,
          explanation: 'False. click() toggles the checkbox state. If checked, it unchecks; if unchecked, it checks. Always verify state first.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q24',
          type: 'truefalse',
          mode: ['full'],
          question: 'Radio buttons and checkboxes are handled using the same methods.',
          correctAnswer: true,
          explanation: 'True. Both use click() to select and isSelected() to check state. The difference is in behavior: radio buttons allow only one selection per group.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q25',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'getOptions() returns the count of options in a dropdown.',
          correctAnswer: false,
          explanation: 'False. getOptions() returns a List<WebElement> of all options. Use getOptions().size() to get the count.',
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
          question: 'The _____ class is used to handle dropdown elements in Selenium.',
          correctAnswer: 'Select',
          acceptedAnswers: ['Select', 'select'],
          explanation: 'The Select class from org.openqa.selenium.support.ui package is used for dropdown handling.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q27',
          type: 'fillblank',
          mode: ['full'],
          question: 'To select a dropdown option by visible text, use select.selectBy_____("text").',
          correctAnswer: 'VisibleText',
          acceptedAnswers: ['VisibleText', 'visibleText'],
          explanation: 'selectByVisibleText("text") selects an option by the text visible to users.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q28',
          type: 'fillblank',
          mode: ['full'],
          question: 'The method _____ returns all available options in a dropdown.',
          correctAnswer: 'getOptions()',
          acceptedAnswers: ['getOptions()', 'getOptions'],
          explanation: 'getOptions() returns a List<WebElement> containing all dropdown options.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q29',
          type: 'fillblank',
          mode: ['quick', 'full'],
          question: 'To check if a checkbox is selected, use checkbox._____().',
          correctAnswer: 'isSelected',
          acceptedAnswers: ['isSelected()', 'isSelected'],
          explanation: 'checkbox.isSelected() returns true if checked, false if unchecked.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q30',
          type: 'fillblank',
          mode: ['full'],
          question: 'The method _____ checks if a dropdown supports multiple selections.',
          correctAnswer: 'isMultiple()',
          acceptedAnswers: ['isMultiple()', 'isMultiple'],
          explanation: 'select.isMultiple() returns true if the dropdown has the multiple attribute.',
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
          question: 'List the three methods to select options from a dropdown and explain when to use each.',
          sampleAnswer: 'The three selection methods are: 1) selectByVisibleText("text") - Use when you know the exact text displayed to users; most readable and preferred. 2) selectByValue("value") - Use when you need to select by the value attribute of the <option> tag; useful when text is dynamic but value is stable. 3) selectByIndex(index) - Use when you need to select by position (0-based); least reliable as position may change.',
          keywords: ['selectByVisibleText', 'selectByValue', 'selectByIndex', 'text', 'value', 'index', 'visible'],
          minKeywords: 4,
          explanation: 'Three methods: selectByVisibleText() for visible text, selectByValue() for value attribute, selectByIndex() for position.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: 'q32',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Write the complete code to select "India" from a dropdown with id="country".',
          sampleAnswer: 'WebElement countryDropdown = driver.findElement(By.id("country")); Select select = new Select(countryDropdown); select.selectByVisibleText("India"); OR you can chain: Select select = new Select(driver.findElement(By.id("country"))); select.selectByVisibleText("India");',
          keywords: ['WebElement', 'findElement', 'By.id', 'Select', 'new', 'selectByVisibleText', 'country'],
          minKeywords: 5,
          explanation: 'Create Select object with the dropdown element, then use selectByVisibleText("India").',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q33',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Explain the difference between single-select and multi-select dropdowns in Selenium.',
          sampleAnswer: 'Single-select dropdowns (<select>) allow only one option to be selected at a time. When you select a new option, the previous selection is automatically deselected. Multi-select dropdowns (<select multiple>) allow multiple options to be selected simultaneously. You can check using isMultiple(), and multi-select dropdowns support deselect methods (deselectAll, deselectByValue, etc.) which single-select dropdowns do not.',
          keywords: ['single-select', 'multi-select', 'multiple', 'one', 'many', 'isMultiple', 'deselect'],
          minKeywords: 4,
          explanation: 'Single-select allows one option; multi-select allows multiple options and supports deselect methods.',
          points: 4,
          difficulty: 'hard'
        },
        {
          id: 'q34',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Write the pattern to safely check and uncheck a checkbox.',
          sampleAnswer: 'To check: if (!checkbox.isSelected()) { checkbox.click(); } - This checks only if not already checked. To uncheck: if (checkbox.isSelected()) { checkbox.click(); } - This unchecks only if currently checked. Always verify state before clicking to avoid unintended toggling, as click() simply toggles the current state.',
          keywords: ['isSelected', 'click', 'if', 'check', 'uncheck', 'toggle', '!', 'state'],
          minKeywords: 5,
          explanation: 'Check: if (!isSelected()) click(). Uncheck: if (isSelected()) click(). Always verify state first.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q35',
          type: 'shortanswer',
          mode: ['quick', 'full'],
          question: 'How do you print all available options from a dropdown?',
          sampleAnswer: 'Use getOptions() to get all options as List<WebElement>, then iterate and print: List<WebElement> options = select.getOptions(); for (WebElement option : options) { System.out.println(option.getText()); } OR using streams: select.getOptions().forEach(option -> System.out.println(option.getText()));',
          keywords: ['getOptions', 'List', 'WebElement', 'for', 'getText', 'iterate', 'print', 'forEach'],
          minKeywords: 4,
          explanation: 'Use getOptions() to get List<WebElement>, then iterate and call getText() on each option.',
          points: 3,
          difficulty: 'medium'
        }
      ]
    }
  ]
};
