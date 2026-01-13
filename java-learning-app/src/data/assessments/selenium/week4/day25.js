export default {
  title: "Day 25: Alerts & Popups - Assessment",
  passingScore: 70,
  timeLimit: 30,
  modes: {
    quick: {
      title: "Quick Assessment (10 questions)",
      timeLimit: 15,
      description: "A quick 15-minute assessment covering key alert and popup concepts"
    },
    full: {
      title: "Full Assessment (35 questions)",
      timeLimit: 45,
      description: "Comprehensive 45-minute assessment covering all alerts and popups handling topics"
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
          question: 'What is the primary interface used to handle JavaScript alerts in Selenium?',
          options: [
            'AlertHandler',
            'Alert',
            'JavaScriptAlert',
            'PopupHandler'
          ],
          correctAnswer: 1,
          explanation: 'The Alert interface in Selenium is used to handle JavaScript alert boxes, confirmation boxes, and prompt boxes.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q2',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which method is used to switch control to an alert in Selenium?',
          options: [
            'driver.getAlert()',
            'driver.switchTo().alert()',
            'driver.alert().switch()',
            'driver.handleAlert()'
          ],
          correctAnswer: 1,
          explanation: 'The driver.switchTo().alert() method is used to switch the driver\'s focus from the main page to the alert dialog.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q3',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What method is used to accept (click OK) an alert box?',
          options: [
            'alert.click()',
            'alert.accept()',
            'alert.ok()',
            'alert.confirm()'
          ],
          correctAnswer: 1,
          explanation: 'The accept() method is used to accept or click the OK button on an alert, confirmation, or prompt dialog.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q4',
          type: 'mcq',
          mode: ['full'],
          question: 'What method is used to dismiss (click Cancel) a confirmation box?',
          options: [
            'alert.cancel()',
            'alert.dismiss()',
            'alert.close()',
            'alert.reject()'
          ],
          correctAnswer: 1,
          explanation: 'The dismiss() method is used to dismiss or click the Cancel button on a confirmation or prompt dialog.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q5',
          type: 'mcq',
          mode: ['full'],
          question: 'Which method retrieves the text displayed in an alert box?',
          options: [
            'alert.getMessage()',
            'alert.getText()',
            'alert.readText()',
            'alert.getContent()'
          ],
          correctAnswer: 1,
          explanation: 'The getText() method returns the text message displayed in the alert, confirmation, or prompt box.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q6',
          type: 'mcq',
          mode: ['full'],
          question: 'How do you enter text into a JavaScript prompt box?',
          options: [
            'alert.enterText(String text)',
            'alert.sendKeys(String text)',
            'alert.inputText(String text)',
            'alert.type(String text)'
          ],
          correctAnswer: 1,
          explanation: 'The sendKeys() method is used to enter text into a JavaScript prompt box before accepting or dismissing it.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q7',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What exception is thrown when you try to interact with an alert that does not exist?',
          options: [
            'AlertNotFoundException',
            'NoAlertPresentException',
            'NoSuchAlertException',
            'AlertMissingException'
          ],
          correctAnswer: 1,
          explanation: 'NoAlertPresentException is thrown when you attempt to switch to or interact with an alert that is not present on the page.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q8',
          type: 'mcq',
          mode: ['full'],
          question: 'Which of the following is the correct sequence to handle a confirmation box and click Cancel?',
          options: [
            'driver.alert().dismiss()',
            'driver.switchTo().alert().dismiss()',
            'driver.getAlert().cancel()',
            'driver.switchTo().confirmation().dismiss()'
          ],
          correctAnswer: 1,
          explanation: 'First switch to the alert using switchTo().alert(), then call dismiss() to click the Cancel button.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q9',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the difference between a simple alert and a confirmation box?',
          options: [
            'Alert has OK and Cancel buttons, confirmation has only OK',
            'Alert has only OK button, confirmation has OK and Cancel buttons',
            'Alert displays text, confirmation displays images',
            'There is no difference'
          ],
          correctAnswer: 1,
          explanation: 'A simple alert box has only an OK button, while a confirmation box has both OK and Cancel buttons for user choice.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q10',
          type: 'mcq',
          mode: ['full'],
          question: 'Which JavaScript method is used to create a simple alert box in web applications?',
          options: [
            'window.alert()',
            'document.alert()',
            'browser.alert()',
            'window.popup()'
          ],
          correctAnswer: 0,
          explanation: 'The window.alert() JavaScript method displays a simple alert dialog with a message and an OK button.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q11',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What happens if you try to interact with the main page without dismissing an active alert?',
          options: [
            'The page interaction works normally',
            'An UnhandledAlertException is thrown',
            'The alert automatically closes',
            'The browser crashes'
          ],
          correctAnswer: 1,
          explanation: 'If an alert is present and not handled, attempting to interact with the page will throw an UnhandledAlertException.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q12',
          type: 'mcq',
          mode: ['full'],
          question: 'Which Wait strategy is commonly used to handle alerts that appear after some delay?',
          options: [
            'Thread.sleep()',
            'Implicit Wait',
            'Explicit Wait with ExpectedConditions.alertIsPresent()',
            'Fluent Wait only'
          ],
          correctAnswer: 2,
          explanation: 'Explicit Wait with ExpectedConditions.alertIsPresent() is the best practice for waiting for alerts to appear before interacting with them.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q13',
          type: 'mcq',
          mode: ['full'],
          question: 'Can Selenium handle authentication popups (browser native dialogs) using the Alert interface?',
          options: [
            'Yes, using alert.sendKeys()',
            'No, authentication popups require URL-based authentication',
            'Yes, using alert.authenticate()',
            'No, they cannot be automated at all'
          ],
          correctAnswer: 1,
          explanation: 'Browser native authentication popups cannot be handled with the Alert interface. They require passing credentials in the URL (e.g., http://username:password@website.com).',
          points: 4,
          difficulty: 'hard'
        },
        {
          id: 'q14',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the correct way to handle a prompt box and enter text "John"?',
          options: [
            'driver.switchTo().alert().sendKeys("John").accept()',
            'driver.alert().type("John").ok()',
            'driver.switchTo().prompt().input("John").confirm()',
            'driver.getAlert().setText("John").click()'
          ],
          correctAnswer: 0,
          explanation: 'Switch to the alert, use sendKeys() to enter text, and then accept() to submit. This is the correct sequence for handling prompt boxes.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q15',
          type: 'mcq',
          mode: ['full'],
          question: 'Which of the following alert types allows user input?',
          options: [
            'Simple alert box',
            'Confirmation box',
            'Prompt box',
            'All of the above'
          ],
          correctAnswer: 2,
          explanation: 'Only prompt boxes allow user input through a text field. Simple alerts only have OK, and confirmations have OK/Cancel buttons.',
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
          question: 'The Alert interface can handle both JavaScript alerts and browser native dialogs.',
          correctAnswer: false,
          explanation: 'False. The Alert interface can only handle JavaScript-based alerts (alert(), confirm(), prompt()). Browser native dialogs like authentication popups require different approaches.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q17',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'You must switch to an alert before you can interact with it.',
          correctAnswer: true,
          explanation: 'True. You must use driver.switchTo().alert() to switch control to the alert before calling methods like accept(), dismiss(), or getText().',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q18',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'The dismiss() method can be used to close a simple alert box.',
          correctAnswer: true,
          explanation: 'True. Both accept() and dismiss() will close a simple alert box since it only has one button (OK). However, accept() is more semantically correct.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q19',
          type: 'truefalse',
          mode: ['full'],
          question: 'You can inspect JavaScript alerts using browser DevTools.',
          correctAnswer: false,
          explanation: 'False. JavaScript alerts cannot be inspected using DevTools because they block the page and DevTools. You must handle them programmatically.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q20',
          type: 'truefalse',
          mode: ['full'],
          question: 'Implicit Wait automatically handles alerts when they appear.',
          correctAnswer: false,
          explanation: 'False. Implicit Wait does not handle alerts. You need Explicit Wait with ExpectedConditions.alertIsPresent() to wait for alerts.',
          points: 3,
          difficulty: 'hard'
        },
        {
          id: 'q21',
          type: 'truefalse',
          mode: ['full'],
          question: 'The getText() method can be called on an alert even after it has been dismissed.',
          correctAnswer: false,
          explanation: 'False. Once an alert is dismissed or accepted, it is removed from the page. You must call getText() before dismissing the alert.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q22',
          type: 'truefalse',
          mode: ['full'],
          question: 'Modal dialogs created with HTML/CSS can be handled using the Alert interface.',
          correctAnswer: false,
          explanation: 'False. HTML/CSS modal dialogs are part of the DOM and are handled like regular elements using findElement(). Only JavaScript alerts use the Alert interface.',
          points: 3,
          difficulty: 'hard'
        },
        {
          id: 'q23',
          type: 'truefalse',
          mode: ['full'],
          question: 'You can send empty text to a prompt box by calling sendKeys("") before accepting.',
          correctAnswer: true,
          explanation: 'True. You can send empty text or any string value to a prompt box using sendKeys() before accepting or dismissing it.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q24',
          type: 'truefalse',
          mode: ['full'],
          question: 'The confirm() JavaScript method creates a dialog that can only be accepted.',
          correctAnswer: false,
          explanation: 'False. The confirm() method creates a dialog with both OK and Cancel buttons, allowing users to accept or dismiss it.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q25',
          type: 'truefalse',
          mode: ['full'],
          question: 'UnhandledAlertException occurs when an alert appears but is not handled before other actions.',
          correctAnswer: true,
          explanation: 'True. If an alert is present and you try to perform other actions without handling it, Selenium throws UnhandledAlertException.',
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
          mode: ['quick', 'full'],
          question: 'The _____ method is used to switch control from the main page to an alert.',
          correctAnswer: 'switchTo().alert()',
          acceptedAnswers: ['switchTo().alert()', 'switchTo.alert', 'switchTo alert'],
          explanation: 'The switchTo().alert() method transfers control from the main page to the alert dialog.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q27',
          type: 'fillblank',
          mode: ['quick', 'full'],
          question: 'To click the OK button on an alert, you call the _____ method.',
          correctAnswer: 'accept()',
          acceptedAnswers: ['accept()', 'accept'],
          explanation: 'The accept() method clicks the OK button on alert, confirmation, or prompt dialogs.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q28',
          type: 'fillblank',
          mode: ['full'],
          question: 'The _____ method is used to retrieve the message displayed in an alert box.',
          correctAnswer: 'getText()',
          acceptedAnswers: ['getText()', 'getText', 'text'],
          explanation: 'The getText() method returns the text message displayed in the alert dialog.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q29',
          type: 'fillblank',
          mode: ['full'],
          question: 'To enter text into a prompt box, you use the _____ method.',
          correctAnswer: 'sendKeys()',
          acceptedAnswers: ['sendKeys()', 'sendKeys'],
          explanation: 'The sendKeys() method is used to input text into a JavaScript prompt dialog.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q30',
          type: 'fillblank',
          mode: ['full'],
          question: 'The exception _____ is thrown when trying to interact with a non-existent alert.',
          correctAnswer: 'NoAlertPresentException',
          acceptedAnswers: ['NoAlertPresentException', 'NoAlertPresent'],
          explanation: 'NoAlertPresentException is thrown when you attempt to switch to an alert that is not present.',
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
          question: 'What are the three types of JavaScript dialog boxes that can be handled using Selenium Alert interface?',
          sampleAnswer: 'The three types of JavaScript dialog boxes are: 1) Alert Box - displays a message with only an OK button, 2) Confirmation Box - displays a message with OK and Cancel buttons, and 3) Prompt Box - displays a message with a text input field and OK/Cancel buttons.',
          keywords: ['alert', 'confirmation', 'prompt', 'OK', 'Cancel', 'input', 'text field'],
          minKeywords: 3,
          explanation: 'The Alert interface handles three JavaScript dialog types: alert() for messages, confirm() for yes/no choices, and prompt() for user input.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q32',
          type: 'shortanswer',
          mode: ['quick', 'full'],
          question: 'Explain the difference between accept() and dismiss() methods in the Alert interface.',
          sampleAnswer: 'The accept() method clicks the OK button on an alert dialog, while the dismiss() method clicks the Cancel button. For simple alerts with only OK button, both methods close the alert, but for confirmation and prompt boxes, accept() represents user agreement while dismiss() represents cancellation.',
          keywords: ['accept', 'dismiss', 'OK', 'Cancel', 'button', 'confirmation', 'agreement', 'cancellation'],
          minKeywords: 3,
          explanation: 'accept() clicks OK (positive action) and dismiss() clicks Cancel (negative action), though both close simple alerts.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q33',
          type: 'shortanswer',
          mode: ['full'],
          question: 'How would you handle a prompt box that asks for your name and enter "Alice" before submitting?',
          sampleAnswer: 'First, switch to the alert using driver.switchTo().alert(). Then, use alert.sendKeys("Alice") to enter the name. Finally, call alert.accept() to submit the prompt. The complete code would be: Alert alert = driver.switchTo().alert(); alert.sendKeys("Alice"); alert.accept();',
          keywords: ['switchTo', 'alert', 'sendKeys', 'Alice', 'accept', 'prompt', 'submit'],
          minKeywords: 4,
          explanation: 'Handling a prompt requires switching to it, using sendKeys() to input text, and accept() to submit.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: 'q34',
          type: 'shortanswer',
          mode: ['full'],
          question: 'What is the recommended approach to wait for an alert to appear before interacting with it?',
          sampleAnswer: 'The recommended approach is to use Explicit Wait with ExpectedConditions.alertIsPresent(). Create a WebDriverWait object and use it to wait until the alert is present: WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10)); wait.until(ExpectedConditions.alertIsPresent()); Alert alert = driver.switchTo().alert();',
          keywords: ['Explicit Wait', 'ExpectedConditions', 'alertIsPresent', 'WebDriverWait', 'wait', 'until'],
          minKeywords: 3,
          explanation: 'Explicit Wait with ExpectedConditions.alertIsPresent() is the best practice for waiting for alerts to appear.',
          points: 4,
          difficulty: 'hard'
        },
        {
          id: 'q35',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Why cannot Selenium handle browser authentication popups using the Alert interface, and what is the alternative?',
          sampleAnswer: 'Browser authentication popups are native OS-level dialogs, not JavaScript alerts, so the Alert interface cannot interact with them. The alternative is to pass credentials directly in the URL using the format: http://username:password@website.com. Another approach is to handle authentication through cookies or tokens after logging in through the UI once.',
          keywords: ['native', 'OS', 'JavaScript', 'URL', 'username', 'password', 'credentials', 'cookies', 'authentication'],
          minKeywords: 4,
          explanation: 'Native authentication popups are not JavaScript-based and require URL-based credential passing (http://user:pass@site.com).',
          points: 4,
          difficulty: 'hard'
        }
      ]
    }
  ]
};
