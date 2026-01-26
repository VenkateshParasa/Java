export default {
  title: "Day 6: Handling Dropdowns, Alerts, and Frames Assessment",
  description: "Test your understanding of Select class, alert handling, frame switching, and window management",
  passingScore: 70,
  timeLimit: 25, // minutes
  modes: {
    quick: {
      questionCount: 10,
      timeLimit: 12,
      sections: ['section-a', 'section-b']
    },
    full: {
      questionCount: 25,
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
          question: 'Which class is used to handle dropdown elements in Selenium?',
          options: [
            'Dropdown',
            'Select',
            'DropdownHandler',
            'WebElement'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'The Select class from org.openqa.selenium.support.ui package is used to interact with dropdown elements (<select> tags).'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'How do you select an option by visible text in a dropdown?',
          options: [
            'select.selectByText("text")',
            'select.selectByVisibleText("text")',
            'select.chooseByText("text")',
            'select.pickByText("text")'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'select.selectByVisibleText("text") selects an option from dropdown based on its visible text.'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'Which method selects a dropdown option using its value attribute?',
          options: [
            'select.selectValue("value")',
            'select.selectByAttribute("value")',
            'select.selectByValue("value")',
            'select.chooseValue("value")'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'select.selectByValue("value") selects an option based on its value attribute.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'How do you select the third option in a dropdown (index starts at 0)?',
          options: [
            'select.selectByIndex(2)',
            'select.selectByIndex(3)',
            'select.selectOption(2)',
            'select.select(3)'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'medium',
          explanation: 'select.selectByIndex(2) selects the option at index 2 (third option, since indexing starts at 0).'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'Which method checks if a dropdown supports multiple selections?',
          options: [
            'select.isMultiple()',
            'select.allowsMultiple()',
            'select.canSelectMultiple()',
            'select.multiSelect()'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'medium',
          explanation: 'select.isMultiple() returns true if the dropdown has the multiple attribute, allowing multiple selections.'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'How do you switch to an alert in Selenium?',
          options: [
            'driver.getAlert()',
            'driver.switchTo().alert()',
            'driver.alert()',
            'driver.findAlert()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'driver.switchTo().alert() switches focus to the alert dialog and returns an Alert object.'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'Which method accepts an alert dialog?',
          options: [
            'alert.ok()',
            'alert.accept()',
            'alert.confirm()',
            'alert.yes()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'alert.accept() clicks the OK button on an alert or confirmation dialog.'
        },
        {
          id: 'q8',
          type: 'mcq',
          question: 'How do you dismiss/cancel an alert or confirmation dialog?',
          options: [
            'alert.cancel()',
            'alert.close()',
            'alert.dismiss()',
            'alert.no()'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'alert.dismiss() clicks the Cancel button on a confirmation dialog or closes an alert.'
        },
        {
          id: 'q9',
          type: 'mcq',
          question: 'Which method retrieves the text from an alert?',
          options: [
            'alert.getMessage()',
            'alert.getText()',
            'alert.readText()',
            'alert.getAlertText()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'alert.getText() returns the text message displayed in the alert dialog.'
        },
        {
          id: 'q10',
          type: 'mcq',
          question: 'How do you enter text in a prompt dialog?',
          options: [
            'alert.enterText("text")',
            'alert.sendKeys("text")',
            'alert.input("text")',
            'alert.type("text")'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'alert.sendKeys("text") enters text into the input field of a prompt dialog before accepting.'
        },
        {
          id: 'q11',
          type: 'mcq',
          question: 'How do you switch to a frame by index?',
          options: [
            'driver.switchTo().frame(0)',
            'driver.goToFrame(0)',
            'driver.frame(0)',
            'driver.changeFrame(0)'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'easy',
          explanation: 'driver.switchTo().frame(0) switches to the frame at index 0. Frame indices start at 0.'
        },
        {
          id: 'q12',
          type: 'mcq',
          question: 'How do you switch back to the main page from a frame?',
          options: [
            'driver.switchTo().mainContent()',
            'driver.switchTo().defaultContent()',
            'driver.exitFrame()',
            'driver.switchTo().parent()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'driver.switchTo().defaultContent() switches back to the main page content from any nested frame.'
        },
        {
          id: 'q13',
          type: 'mcq',
          question: 'Can you switch to a frame using a WebElement?',
          options: [
            'No, only by index or name',
            'Yes, using driver.switchTo().frame(webElement)',
            'Yes, using driver.frame(webElement)',
            'No, frames require iframe ID'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Yes, driver.switchTo().frame(webElement) can switch to a frame using the WebElement representing the frame/iframe.'
        },
        {
          id: 'q14',
          type: 'mcq',
          question: 'What does driver.getWindowHandles() return?',
          options: [
            'String',
            'List<String>',
            'Set<String>',
            'Array<String>'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'medium',
          explanation: 'driver.getWindowHandles() returns a Set<String> containing unique handles (IDs) for all open browser windows/tabs.'
        },
        {
          id: 'q15',
          type: 'mcq',
          question: 'How do you switch to a different browser window?',
          options: [
            'driver.switchTo().window(windowHandle)',
            'driver.changeWindow(windowHandle)',
            'driver.goToWindow(windowHandle)',
            'driver.selectWindow(windowHandle)'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'easy',
          explanation: 'driver.switchTo().window(windowHandle) switches control to the window with the specified handle.'
        }
      ]
    },
    {
      id: 'section-b',
      title: 'True/False Questions',
      questions: [
        {
          id: 'q16',
          type: 'true-false',
          question: 'The Select class can only be used with <select> HTML elements.',
          correctAnswer: true,
          points: 2,
          difficulty: 'easy',
          explanation: 'True. The Select class is specifically designed for <select> dropdown elements. Custom dropdowns need different approaches.'
        },
        {
          id: 'q17',
          type: 'true-false',
          question: 'You can interact with page elements while an alert is present without handling it.',
          correctAnswer: false,
          points: 2,
          difficulty: 'medium',
          explanation: 'False. When an alert is present, you must handle it (accept/dismiss) before interacting with other page elements.'
        },
        {
          id: 'q18',
          type: 'true-false',
          question: 'Frames and iframes are handled the same way in Selenium.',
          correctAnswer: true,
          points: 2,
          difficulty: 'easy',
          explanation: 'True. Both <frame> and <iframe> elements are handled using the same switchTo().frame() methods.'
        },
        {
          id: 'q19',
          type: 'true-false',
          question: 'You must switch to a frame before accessing elements inside it.',
          correctAnswer: true,
          points: 2,
          difficulty: 'easy',
          explanation: 'True. Elements inside frames are not directly accessible. You must first switch to the frame using switchTo().frame().'
        },
        {
          id: 'q20',
          type: 'true-false',
          question: 'getWindowHandle() returns handles for all open windows.',
          correctAnswer: false,
          points: 2,
          difficulty: 'medium',
          explanation: 'False. getWindowHandle() returns only the current window\'s handle. Use getWindowHandles() (plural) for all windows.'
        },
        {
          id: 'q21',
          type: 'true-false',
          question: 'deselectAll() works on single-select dropdowns.',
          correctAnswer: false,
          points: 2,
          difficulty: 'medium',
          explanation: 'False. deselectAll() only works on multi-select dropdowns. Single-select dropdowns always have one option selected.'
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
          question: 'To get all selected options in a multi-select dropdown, use select.________().',
          correctAnswer: 'getAllSelectedOptions',
          points: 2,
          difficulty: 'medium',
          explanation: 'select.getAllSelectedOptions() returns a List<WebElement> of all selected options in a multi-select dropdown.'
        },
        {
          id: 'q23',
          type: 'fill-blank',
          question: 'The exception thrown when trying to switch to a non-existent alert is ________Exception.',
          correctAnswer: 'NoAlertPresent',
          points: 2,
          difficulty: 'medium',
          explanation: 'NoAlertPresentException is thrown when attempting to switch to an alert that does not exist.'
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
          question: 'Explain how to handle a multi-window scenario: open a new window, switch to it, perform actions, and return to original window.',
          sampleAnswer: 'Multi-window handling steps: 1) Store original window handle: String mainWindow = driver.getWindowHandle(); 2) Trigger action that opens new window (click link): driver.findElement(By.id("openWindow")).click(); 3) Get all window handles: Set<String> allWindows = driver.getWindowHandles(); 4) Iterate to find new window: for(String window : allWindows) { if(!window.equals(mainWindow)) { driver.switchTo().window(window); break; } } 5) Perform actions in new window: driver.findElement(By.id("element")).click(); 6) Close new window if needed: driver.close(); 7) Switch back to main window: driver.switchTo().window(mainWindow); Important: Always store original handle before switching. Use Set iterator or convert to List for easier navigation with multiple windows.',
          points: 5,
          difficulty: 'hard',
          keywords: ['getWindowHandle', 'getWindowHandles', 'switchTo', 'window', 'Set', 'handle', 'iterate', 'close', 'main window']
        },
        {
          id: 'q25',
          type: 'short',
          question: 'Compare and contrast the three types of JavaScript alerts (alert, confirm, prompt) and how to handle each in Selenium.',
          sampleAnswer: 'Three alert types: 1) Simple Alert - Shows message with OK button only. Purpose: Display information. Handling: Alert alert = driver.switchTo().alert(); String text = alert.getText(); alert.accept(); Only accept() works. 2) Confirmation Alert - Shows message with OK and Cancel buttons. Purpose: Get user confirmation. Handling: alert.accept() for OK, alert.dismiss() for Cancel. Code: if(condition) alert.accept(); else alert.dismiss(); 3) Prompt Alert - Shows input field with OK and Cancel. Purpose: Get user input. Handling: alert.sendKeys("input text"); then alert.accept() or alert.dismiss(); Example: alert.sendKeys("John"); alert.accept(); Common methods: getText() reads message, sendKeys() enters text (prompt only), accept() clicks OK, dismiss() clicks Cancel. Best practice: Wait for alert before handling: wait.until(ExpectedConditions.alertIsPresent());',
          points: 5,
          difficulty: 'hard',
          keywords: ['alert', 'confirm', 'prompt', 'accept', 'dismiss', 'sendKeys', 'getText', 'OK', 'Cancel', 'input', 'switchTo']
        }
      ]
    }
  ],
  week: 1,
  day: 6,
  topic: "Handling Dropdowns, Alerts, and Frames"
};
