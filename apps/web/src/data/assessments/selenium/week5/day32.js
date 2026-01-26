export default {
  title: "Day 32: TestNG Part 3 - Assessment",
  passingScore: 70,
  timeLimit: 45,
  modes: {
    quick: {
      title: "Quick Assessment (10 questions)",
      timeLimit: 15,
      description: "A quick 15-minute assessment covering key TestNG groups, dependencies, and priorities concepts"
    },
    full: {
      title: "Full Assessment (35 questions)",
      timeLimit: 45,
      description: "Comprehensive 45-minute assessment covering all TestNG groups, dependencies, and priorities topics"
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
          question: 'Which annotation is used to assign a test method to a group in TestNG?',
          options: [
            '@Group',
            '@TestGroup',
            '@Test(groups = {"groupName"})',
            '@BelongsTo(group = "groupName")'
          ],
          correctAnswer: 2,
          explanation: '@Test(groups = {"groupName"}) is used to assign a test method to one or more groups in TestNG.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q2',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'How do you specify that a test depends on another test method?',
          options: [
            '@Test(dependsOn = "methodName")',
            '@Test(dependsOnMethods = {"methodName"})',
            '@DependsOn("methodName")',
            '@Test(requires = "methodName")'
          ],
          correctAnswer: 1,
          explanation: '@Test(dependsOnMethods = {"methodName"}) specifies that the test method depends on another method.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q3',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the default priority value for a test method in TestNG?',
          options: [
            '0',
            '1',
            '-1',
            '100'
          ],
          correctAnswer: 0,
          explanation: 'The default priority value for a test method in TestNG is 0. Lower priority values are executed first.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q4',
          type: 'mcq',
          mode: ['full'],
          question: 'What happens when a test method that others depend on fails?',
          options: [
            'Dependent tests execute normally',
            'Dependent tests are skipped',
            'Dependent tests fail with an error',
            'All tests in the suite stop'
          ],
          correctAnswer: 1,
          explanation: 'When a test method fails, all methods that depend on it are skipped by default in TestNG.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q5',
          type: 'mcq',
          mode: ['full'],
          question: 'Which attribute makes a test run even if the methods it depends on fail?',
          options: [
            '@Test(ignoreFailure = true)',
            '@Test(alwaysRun = true)',
            '@Test(forceRun = true)',
            '@Test(runAnyway = true)'
          ],
          correctAnswer: 1,
          explanation: '@Test(alwaysRun = true) ensures a test runs regardless of whether its dependencies pass or fail.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q6',
          type: 'mcq',
          mode: ['full'],
          question: 'How do you specify that a test depends on a group of tests?',
          options: [
            '@Test(dependsOn = "groupName")',
            '@Test(dependsOnGroups = {"groupName"})',
            '@Test(requiresGroup = "groupName")',
            '@Test(afterGroup = "groupName")'
          ],
          correctAnswer: 1,
          explanation: '@Test(dependsOnGroups = {"groupName"}) makes a test depend on all methods in the specified group.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q7',
          type: 'mcq',
          mode: ['full'],
          question: 'In what order are tests executed when they have different priorities?',
          options: [
            'Alphabetical order',
            'Lower priority numbers first',
            'Higher priority numbers first',
            'Random order'
          ],
          correctAnswer: 1,
          explanation: 'Tests with lower priority numbers execute first. Priority -1 runs before priority 0, which runs before priority 1.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q8',
          type: 'mcq',
          mode: ['full'],
          question: 'Can a test method belong to multiple groups?',
          options: [
            'No, only one group per method',
            'Yes, using comma-separated values: @Test(groups = "group1,group2")',
            'Yes, using array syntax: @Test(groups = {"group1", "group2"})',
            'Only if you use @MultiGroup annotation'
          ],
          correctAnswer: 2,
          explanation: 'A test method can belong to multiple groups using array syntax: @Test(groups = {"group1", "group2"}).',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q9',
          type: 'mcq',
          mode: ['full'],
          question: 'How do you run specific groups from the testng.xml file?',
          options: [
            'Using <groups> tag with <include> tags',
            'Using <run-groups> tag',
            'Using <execute-groups> tag',
            'Using <test-groups> tag'
          ],
          correctAnswer: 0,
          explanation: 'Use <groups> tag with <run><include name="groupName"/></run> in testng.xml to run specific groups.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q10',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the purpose of group dependencies in TestNG?',
          options: [
            'To organize tests into categories',
            'To ensure all tests in one group run before tests in another group',
            'To run groups in parallel',
            'To exclude certain groups from execution'
          ],
          correctAnswer: 1,
          explanation: 'Group dependencies ensure all tests in one group complete before tests in the dependent group start executing.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q11',
          type: 'mcq',
          mode: ['full'],
          question: 'Can you specify multiple dependencies for a single test method?',
          options: [
            'No, only one dependency allowed',
            'Yes, using @Test(dependsOnMethods = {"method1", "method2"})',
            'Yes, but only with groups, not methods',
            'Only in testng.xml, not in annotations'
          ],
          correctAnswer: 1,
          explanation: 'Multiple dependencies can be specified using array syntax: @Test(dependsOnMethods = {"method1", "method2"}).',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q12',
          type: 'mcq',
          mode: ['full'],
          question: 'What happens when two test methods have the same priority?',
          options: [
            'TestNG throws an error',
            'They execute in alphabetical order',
            'They execute in the order they appear in the class',
            'Execution order is random'
          ],
          correctAnswer: 2,
          explanation: 'When tests have the same priority, they execute in the order they are defined in the class.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q13',
          type: 'mcq',
          mode: ['full'],
          question: 'Which is NOT a valid use case for TestNG groups?',
          options: [
            'Organizing tests by functionality (smoke, regression)',
            'Separating tests by execution environment (dev, staging)',
            'Controlling execution order of all tests',
            'Categorizing tests by test type (UI, API, integration)'
          ],
          correctAnswer: 2,
          explanation: 'Groups are for categorization and selective execution, not for controlling execution order. Use priorities or dependencies for order.',
          points: 3,
          difficulty: 'hard'
        },
        {
          id: 'q14',
          type: 'mcq',
          mode: ['full'],
          question: 'How do you exclude specific groups from execution in testng.xml?',
          options: [
            'Using <exclude name="groupName"/> inside <groups>',
            'Using <skip-group name="groupName"/>',
            'Using <ignore groups="groupName"/>',
            'Using @Test(enabled = false) on the group'
          ],
          correctAnswer: 0,
          explanation: 'Use <exclude name="groupName"/> inside the <groups><run> section of testng.xml to exclude groups.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q15',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the relationship between priority and dependencies?',
          options: [
            'Dependencies override priorities',
            'Priorities override dependencies',
            'They work independently - dependencies are checked first',
            'They cannot be used together'
          ],
          correctAnswer: 2,
          explanation: 'Dependencies take precedence. Within non-dependent tests, priorities determine order. Both can be used together.',
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
          question: 'A test method can belong to multiple groups in TestNG.',
          correctAnswer: true,
          explanation: 'True. A test can belong to multiple groups using array syntax: @Test(groups = {"group1", "group2"}).',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q17',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'Lower priority numbers execute before higher priority numbers in TestNG.',
          correctAnswer: true,
          explanation: 'True. Tests are executed in ascending order of priority. Priority 0 runs before priority 1.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q18',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'When a test method fails, all methods that depend on it will also fail.',
          correctAnswer: false,
          explanation: 'False. When a test fails, dependent tests are skipped (not failed) unless alwaysRun = true is used.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q19',
          type: 'truefalse',
          mode: ['full'],
          question: 'The alwaysRun attribute forces a test to execute even if its dependencies fail.',
          correctAnswer: true,
          explanation: 'True. @Test(alwaysRun = true) ensures the test runs regardless of dependency failures.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q20',
          type: 'truefalse',
          mode: ['full'],
          question: 'You can specify dependencies on both methods and groups in the same test.',
          correctAnswer: true,
          explanation: 'True. A test can use both dependsOnMethods and dependsOnGroups attributes simultaneously.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q21',
          type: 'truefalse',
          mode: ['full'],
          question: 'Groups can only be defined at the method level, not at the class level.',
          correctAnswer: false,
          explanation: 'False. Groups can be defined at both class level (applies to all methods) and method level using @Test annotation.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q22',
          type: 'truefalse',
          mode: ['full'],
          question: 'Priority attribute works across different classes in TestNG.',
          correctAnswer: true,
          explanation: 'True. Priority works across all test methods in the suite, regardless of which class they are in.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q23',
          type: 'truefalse',
          mode: ['full'],
          question: 'The default priority for a test method is 1.',
          correctAnswer: false,
          explanation: 'False. The default priority for a test method is 0, not 1.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q24',
          type: 'truefalse',
          mode: ['full'],
          question: 'You can run groups from the command line without using testng.xml.',
          correctAnswer: true,
          explanation: 'True. You can run specific groups using the -groups parameter from the command line.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q25',
          type: 'truefalse',
          mode: ['full'],
          question: 'Dependencies can create circular references between test methods.',
          correctAnswer: false,
          explanation: 'False. TestNG detects and prevents circular dependencies between test methods to avoid infinite loops.',
          points: 2,
          difficulty: 'hard'
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
          question: 'To assign a test to a group named "smoke", use: @Test(_____ = {"smoke"})',
          correctAnswer: 'groups',
          acceptedAnswers: ['groups'],
          explanation: 'The groups attribute is used to assign a test to one or more groups: @Test(groups = {"smoke"}).',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q27',
          type: 'fillblank',
          mode: ['quick', 'full'],
          question: 'To specify that testB depends on testA, use: @Test(_____ = {"testA"})',
          correctAnswer: 'dependsOnMethods',
          acceptedAnswers: ['dependsOnMethods'],
          explanation: 'The dependsOnMethods attribute creates method dependencies: @Test(dependsOnMethods = {"testA"}).',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q28',
          type: 'fillblank',
          mode: ['full'],
          question: 'To make a test run first, set priority to: @Test(priority = _____)',
          correctAnswer: '-1',
          acceptedAnswers: ['-1', 'negative number', 'lowest number'],
          explanation: 'Setting priority = -1 or any negative number makes tests run earlier than default priority 0.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q29',
          type: 'fillblank',
          mode: ['full'],
          question: 'To make a test run even if its dependencies fail, use: @Test(_____ = true)',
          correctAnswer: 'alwaysRun',
          acceptedAnswers: ['alwaysRun'],
          explanation: 'The alwaysRun attribute forces test execution regardless of dependency failures.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q30',
          type: 'fillblank',
          mode: ['full'],
          question: 'To make a test depend on a group named "sanity", use: @Test(_____ = {"sanity"})',
          correctAnswer: 'dependsOnGroups',
          acceptedAnswers: ['dependsOnGroups'],
          explanation: 'The dependsOnGroups attribute creates dependencies on all tests in specified groups.',
          points: 3,
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
          question: 'Explain the purpose of test groups in TestNG and provide two practical use cases.',
          sampleAnswer: 'Test groups in TestNG allow you to categorize and organize test methods into logical groups for selective execution. Practical use cases include: 1) Organizing tests by test type like smoke, regression, sanity - allowing quick smoke tests before full regression, 2) Separating tests by functionality like login, checkout, search - enabling focused testing of specific features, 3) Categorizing by environment like dev, staging, production - running appropriate tests for each environment, 4) Grouping by priority like critical, high, medium, low - executing high-priority tests first.',
          keywords: ['groups', 'categorize', 'organize', 'selective', 'execution', 'smoke', 'regression', 'sanity', 'functionality', 'environment', 'priority'],
          minKeywords: 4,
          explanation: 'Groups enable categorization and selective execution of tests based on different criteria.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: 'q32',
          type: 'shortanswer',
          mode: ['quick', 'full'],
          question: 'What is the difference between dependsOnMethods and dependsOnGroups?',
          sampleAnswer: 'dependsOnMethods creates a dependency on specific test methods by name. The test will only run after the specified methods complete successfully. Example: @Test(dependsOnMethods = {"login", "navigate"}) makes the test wait for both login and navigate methods. dependsOnGroups creates a dependency on all tests within a group. The test runs only after all tests in the specified group complete. Example: @Test(dependsOnGroups = {"smoke"}) waits for all tests in the smoke group. dependsOnMethods is more specific and fine-grained, while dependsOnGroups is broader and depends on multiple tests at once.',
          keywords: ['dependsOnMethods', 'dependsOnGroups', 'specific', 'methods', 'group', 'all tests', 'wait', 'complete', 'fine-grained', 'broader'],
          minKeywords: 5,
          explanation: 'dependsOnMethods depends on specific methods; dependsOnGroups depends on all methods in a group.',
          points: 5,
          difficulty: 'medium'
        },
        {
          id: 'q33',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Write the code to create a test method that belongs to both "smoke" and "regression" groups and depends on a method named "setup".',
          sampleAnswer: '@Test(groups = {"smoke", "regression"}, dependsOnMethods = {"setup"})\npublic void testLogin() {\n    // test implementation\n}\n\nThis test belongs to both smoke and regression groups using array syntax in the groups attribute. It depends on the setup method using dependsOnMethods, ensuring setup runs successfully before this test executes.',
          keywords: ['@Test', 'groups', 'smoke', 'regression', 'dependsOnMethods', 'setup', 'array', 'curly braces'],
          minKeywords: 5,
          explanation: 'Use groups with array syntax for multiple groups and dependsOnMethods for method dependency.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: 'q34',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Explain how priorities work in TestNG and what happens when tests have the same priority.',
          sampleAnswer: 'Priorities in TestNG control the execution order of test methods. Tests are executed in ascending order based on their priority value - lower numbers run first. The default priority is 0. For example, priority = -1 runs before priority = 0, which runs before priority = 1. When multiple tests have the same priority value, TestNG executes them in the order they appear in the class file. Priorities work across classes within a test suite. You can use negative priorities to make tests run earlier and positive priorities to make them run later.',
          keywords: ['priority', 'execution order', 'ascending', 'lower', 'first', 'default', 'zero', 'same priority', 'order in class', 'negative', 'positive'],
          minKeywords: 6,
          explanation: 'Priorities control execution order (lower first). Same priority tests run in definition order.',
          points: 5,
          difficulty: 'medium'
        },
        {
          id: 'q35',
          type: 'shortanswer',
          mode: ['full'],
          question: 'What is the alwaysRun attribute and when would you use it? Provide an example scenario.',
          sampleAnswer: 'The alwaysRun attribute in TestNG forces a test method to execute even when its dependencies fail. By default, when a test fails, all tests depending on it are skipped. Setting alwaysRun = true overrides this behavior. Example scenario: A cleanup or logout method should always run regardless of whether the main test passes or fails to ensure proper cleanup. Code example:\n@Test(dependsOnMethods = {"testLogin", "testCheckout"}, alwaysRun = true)\npublic void testLogout() {\n    // This will run even if testLogin or testCheckout fails\n}\nThis is particularly useful for teardown methods, cleanup operations, or critical tests that must execute.',
          keywords: ['alwaysRun', 'true', 'execute', 'dependencies fail', 'skipped', 'cleanup', 'logout', 'teardown', 'override', 'regardless'],
          minKeywords: 5,
          explanation: 'alwaysRun = true makes tests run even when dependencies fail, useful for cleanup operations.',
          points: 5,
          difficulty: 'hard'
        }
      ]
    }
  ]
};
