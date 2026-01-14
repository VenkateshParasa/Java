export default {
  title: "Day 9: Drag and Drop, Sliders Assessment",
  description: "Test your understanding of drag and drop operations, sliders, and advanced mouse interactions",
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
          question: 'Which method is used to perform drag and drop operations in Selenium?',
          options: [
            'drag()',
            'dragAndDrop()',
            'dragTo()',
            'moveDrop()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'The dragAndDrop() method is used to perform drag and drop operations by specifying source and target elements.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'What are the two parameters required for dragAndDrop()?',
          options: [
            'x coordinate and y coordinate',
            'source element and target element',
            'start position and end position',
            'element and offset'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'dragAndDrop() requires two parameters: the source element (to drag) and the target element (where to drop).'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'Which method is used to drag an element by a specific offset?',
          options: [
            'dragByOffset()',
            'dragAndDropBy()',
            'offsetDrag()',
            'moveByOffset()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'The dragAndDropBy() method drags an element by a specific x and y offset from its current position.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'How do you manually perform drag and drop step by step?',
          options: [
            'click() -> move() -> release()',
            'clickAndHold() -> moveToElement() -> release()',
            'hold() -> drag() -> drop()',
            'press() -> move() -> unpress()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Manual drag and drop is performed using clickAndHold() on source, moveToElement() to target, and release() to drop.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'What is the purpose of clickAndHold() in drag operations?',
          options: [
            'To double-click an element',
            'To click and keep the mouse button pressed',
            'To wait before clicking',
            'To verify element is clickable'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'clickAndHold() clicks an element and holds the mouse button down, which is the first step in a drag operation.'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'How do you move a slider in Selenium?',
          options: [
            'slider.moveBy(offset)',
            'actions.dragAndDropBy(slider, xOffset, yOffset).perform()',
            'slider.setValue()',
            'actions.slide(slider, position).perform()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'To move a slider, use dragAndDropBy() with the slider element and the desired x-offset (for horizontal sliders) or y-offset (for vertical sliders).'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'What does the release() method do?',
          options: [
            'Releases keyboard keys',
            'Releases the held mouse button',
            'Releases focus from element',
            'Releases browser resources'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'The release() method releases the currently held mouse button, typically used after clickAndHold() in drag operations.'
        },
        {
          id: 'q8',
          type: 'mcq',
          question: 'Which sequence correctly performs a drag and drop operation?',
          options: [
            'actions.clickAndHold(source).moveToElement(target).release().perform()',
            'actions.click(source).drag(target).perform()',
            'actions.hold(source).drop(target).perform()',
            'actions.moveToElement(source).clickAndDrop(target).perform()'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'medium',
          explanation: 'The correct sequence is clickAndHold() on source, moveToElement() to target, release() to drop, and perform() to execute.'
        },
        {
          id: 'q9',
          type: 'mcq',
          question: 'How do you interact with a sortable list using drag and drop?',
          options: [
            'Click and drag items to new positions',
            'Use dragAndDrop() between list items',
            'Use JavaScript to reorder',
            'Both A and B'
          ],
          correctAnswer: 3,
          points: 2,
          difficulty: 'medium',
          explanation: 'Sortable lists can be reordered by clicking and dragging items or by using dragAndDrop() method between list items.'
        },
        {
          id: 'q10',
          type: 'mcq',
          question: 'What is HTML5 drag and drop?',
          options: [
            'A new version of Selenium drag and drop',
            'A browser feature for drag and drop interactions',
            'A JavaScript library',
            'A testing framework'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'HTML5 drag and drop is a browser API that allows elements to be draggable and provides events for drag and drop operations.'
        },
        {
          id: 'q11',
          type: 'mcq',
          question: 'Why might dragAndDrop() fail with HTML5 drag and drop?',
          options: [
            'HTML5 uses different event models',
            'Selenium does not support HTML5',
            'The method is deprecated',
            'Browser compatibility issues only'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'hard',
          explanation: 'HTML5 drag and drop uses a different event model (dragstart, dragover, drop events) that Selenium Actions class may not always trigger correctly.'
        },
        {
          id: 'q12',
          type: 'mcq',
          question: 'How can you handle HTML5 drag and drop when Actions class fails?',
          options: [
            'Use Robot class',
            'Use JavaScript executor to simulate drag events',
            'Use AutoIT',
            'It cannot be automated'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'hard',
          explanation: 'When Actions class fails with HTML5 drag and drop, JavaScript executor can be used to manually trigger dragstart, dragover, and drop events.'
        },
        {
          id: 'q13',
          type: 'mcq',
          question: 'What is the purpose of moveByOffset() in drag operations?',
          options: [
            'To move element by pixels',
            'To move mouse cursor by x and y coordinates',
            'To set element position',
            'To validate movement'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'moveByOffset() moves the mouse cursor from its current position by the specified x and y pixel offsets.'
        },
        {
          id: 'q14',
          type: 'mcq',
          question: 'How do you resize an element using Actions class?',
          options: [
            'resize(element, width, height)',
            'clickAndHold(resizeHandle).moveByOffset(x, y).release()',
            'element.setSize(width, height)',
            'dragToSize(element, dimensions)'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'To resize an element, click and hold the resize handle, move by the desired offset, and release the mouse button.'
        },
        {
          id: 'q15',
          type: 'mcq',
          question: 'What should you do if drag and drop is not working?',
          options: [
            'Add explicit waits',
            'Try JavaScript executor',
            'Use clickAndHold/moveToElement/release sequence',
            'All of the above'
          ],
          correctAnswer: 3,
          points: 2,
          difficulty: 'medium',
          explanation: 'If drag and drop fails, try adding waits, using JavaScript executor, or using the manual sequence of clickAndHold, moveToElement, and release.'
        },
        {
          id: 'q16',
          type: 'mcq',
          question: 'Which method is NOT part of drag and drop operations?',
          options: [
            'clickAndHold()',
            'release()',
            'doubleClick()',
            'moveToElement()'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'doubleClick() is not part of drag and drop operations. The main methods are clickAndHold(), moveToElement(), and release().'
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
          question: 'dragAndDrop() method automatically handles all types of drag and drop operations.',
          correctAnswer: false,
          points: 2,
          difficulty: 'medium',
          explanation: 'False. dragAndDrop() may not work with HTML5 drag and drop or complex scenarios. Manual approach or JavaScript may be needed.'
        },
        {
          id: 'q18',
          type: 'true-false',
          question: 'release() method must be called after clickAndHold() in drag operations.',
          correctAnswer: true,
          points: 2,
          difficulty: 'easy',
          explanation: 'True. release() is necessary to release the held mouse button and complete the drag operation.'
        },
        {
          id: 'q19',
          type: 'true-false',
          question: 'Sliders can only be moved horizontally in web applications.',
          correctAnswer: false,
          points: 2,
          difficulty: 'easy',
          explanation: 'False. Sliders can be horizontal or vertical. Use xOffset for horizontal and yOffset for vertical sliders.'
        },
        {
          id: 'q20',
          type: 'true-false',
          question: 'HTML5 drag and drop always works with Selenium Actions class.',
          correctAnswer: false,
          points: 2,
          difficulty: 'medium',
          explanation: 'False. HTML5 drag and drop uses different events and may require JavaScript executor to work properly with Selenium.'
        },
        {
          id: 'q21',
          type: 'true-false',
          question: 'dragAndDropBy() moves an element by a specified pixel offset.',
          correctAnswer: true,
          points: 2,
          difficulty: 'easy',
          explanation: 'True. dragAndDropBy() drags an element from its current position by the specified x and y pixel offset.'
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
          question: 'The ________ method is used to perform drag and drop between two elements.',
          correctAnswer: 'dragAndDrop',
          points: 2,
          difficulty: 'easy',
          explanation: 'The dragAndDrop() method takes source and target elements to perform drag and drop operations.'
        },
        {
          id: 'q23',
          type: 'fill-blank',
          question: 'To move a slider by pixels, use the ________ method.',
          correctAnswer: 'dragAndDropBy',
          points: 2,
          difficulty: 'easy',
          explanation: 'The dragAndDropBy() method is used to move sliders by specifying pixel offsets.'
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
          question: 'Explain two different ways to perform drag and drop operations in Selenium.',
          sampleAnswer: 'Two ways to perform drag and drop: 1) Using dragAndDrop() method - Simple one-line approach: actions.dragAndDrop(sourceElement, targetElement).perform(); Takes source and target elements as parameters. Quick but may fail with HTML5 drag and drop. 2) Using manual sequence - More control: actions.clickAndHold(sourceElement).moveToElement(targetElement).release().perform(); Breaks operation into steps: click and hold source, move to target, release mouse. More reliable for complex scenarios. Alternative: Use JavaScript executor for HTML5 drag and drop by triggering dragstart, dragover, and drop events. Example: js.executeScript("function simulateDrag(){...}"); Choose method based on application behavior and reliability requirements.',
          points: 3,
          difficulty: 'medium',
          keywords: ['dragAndDrop', 'clickAndHold', 'moveToElement', 'release', 'perform', 'source', 'target', 'JavaScript', 'HTML5']
        }
      ]
    }
  ]
};
