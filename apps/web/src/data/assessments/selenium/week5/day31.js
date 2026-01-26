export default {
  title: "Day 31: TestNG Part 2 - Assessment",
  passingScore: 70,
  timeLimit: 30,
  modes: {
    quick: {
      title: "Quick Assessment (10 questions)",
      timeLimit: 15,
      description: "A quick 15-minute assessment covering key TestNG Parameters and Data Providers concepts"
    },
    full: {
      title: "Full Assessment (35 questions)",
      timeLimit: 45,
      description: "Comprehensive 45-minute assessment covering all TestNG Parameters and Data Providers topics"
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
          question: 'What is the primary purpose of @Parameters annotation in TestNG?',
          options: [
            'To create test dependencies',
            'To pass data from testng.xml to test methods',
            'To define test groups',
            'To enable parallel execution'
          ],
          correctAnswer: 1,
          explanation: '@Parameters annotation is used to pass data from testng.xml file to test methods, enabling configuration-based test data management.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q2',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the return type of a @DataProvider method?',
          options: [
            'String[]',
            'List<String>',
            'Object[][] or Iterator<Object[]>',
            'Map<String, Object>'
          ],
          correctAnswer: 2,
          explanation: 'A @DataProvider method must return Object[][] (2D array) or Iterator<Object[]> to supply multiple sets of data to test methods.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q3',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'How do you link a @DataProvider to a test method?',
          options: [
            '@Test(dataProvider = "providerName")',
            '@Test(data = "providerName")',
            '@Test(provider = "providerName")',
            '@Test(dataSource = "providerName")'
          ],
          correctAnswer: 0,
          explanation: 'Use @Test(dataProvider = "providerName") to link a DataProvider method to a test method, where providerName matches the name attribute of @DataProvider.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q4',
          type: 'mcq',
          mode: ['full'],
          question: 'Where must parameter values be defined when using @Parameters annotation?',
          options: [
            'In the test method',
            'In the testng.xml file using <parameter> tags',
            'In a properties file',
            'In the @BeforeTest method'
          ],
          correctAnswer: 1,
          explanation: 'Parameter values for @Parameters annotation must be defined in testng.xml file using <parameter name="paramName" value="paramValue"/> tags.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q5',
          type: 'mcq',
          mode: ['full'],
          question: 'What happens if a parameter defined in @Parameters is not found in testng.xml?',
          options: [
            'The test runs with null value',
            'TestNG throws ParameterException',
            'The test is skipped',
            'Default value is used'
          ],
          correctAnswer: 1,
          explanation: 'If a required parameter is not found in testng.xml, TestNG throws a ParameterException and the test fails to execute.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q6',
          type: 'mcq',
          mode: ['full'],
          question: 'Can a @DataProvider method be in a different class than the test method?',
          options: [
            'No, they must be in the same class',
            'Yes, using dataProviderClass attribute',
            'Yes, but only in parent class',
            'No, TestNG does not support this'
          ],
          correctAnswer: 1,
          explanation: 'Yes, a DataProvider can be in a different class using @Test(dataProvider="name", dataProviderClass=ClassName.class) to reference external data providers.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q7',
          type: 'mcq',
          mode: ['full'],
          question: 'Which annotation attribute enables parallel execution of data-driven tests?',
          options: [
            '@DataProvider(threadPoolSize = n)',
            '@DataProvider(parallel = true)',
            '@DataProvider(threads = n)',
            '@DataProvider(concurrent = n)'
          ],
          correctAnswer: 1,
          explanation: '@DataProvider(parallel = true) enables parallel execution of test iterations. Use threadPoolSize attribute to specify number of threads.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q8',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the correct syntax for a DataProvider method that provides 2 parameters per iteration?',
          options: [
            'return new Object[] {"data1", "data2"};',
            'return new Object[][] {{"data1", "data2"}, {"data3", "data4"}};',
            'return new Object[] {{"data1", "data2"}};',
            'return new String[][] {{"data1", "data2"}};'
          ],
          correctAnswer: 1,
          explanation: 'DataProvider must return Object[][], where each inner array represents one test iteration with parameters. Object[][] {{"data1", "data2"}, {"data3", "data4"}} provides data for 2 test executions.',
          points: 3,
          difficulty: 'hard'
        },
        {
          id: 'q9',
          type: 'mcq',
          mode: ['full'],
          question: 'How can you pass data from Excel to TestNG tests?',
          options: [
            'TestNG has built-in Excel support',
            'Using @Parameters with Excel file path',
            'Using @DataProvider with Apache POI library',
            'Excel cannot be used with TestNG'
          ],
          correctAnswer: 2,
          explanation: 'Use @DataProvider method with Apache POI library to read Excel files and return data as Object[][]. TestNG does not have built-in Excel support.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q10',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the advantage of using @DataProvider over @Parameters?',
          options: [
            '@DataProvider is faster',
            '@DataProvider can handle large datasets and supports dynamic data generation',
            '@Parameters is deprecated',
            'There is no difference'
          ],
          correctAnswer: 1,
          explanation: '@DataProvider is more flexible, supports large datasets, allows programmatic data generation, and can read from external sources like Excel, databases, etc.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q11',
          type: 'mcq',
          mode: ['full'],
          question: 'Can you use both @Parameters and @DataProvider in the same test method?',
          options: [
            'Yes, they work together',
            'No, only one can be used at a time',
            'Yes, but @Parameters takes priority',
            'Yes, but only in parallel mode'
          ],
          correctAnswer: 1,
          explanation: 'No, you cannot use both @Parameters and @DataProvider on the same test method. They are mutually exclusive data-passing mechanisms.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q12',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the correct way to name a DataProvider?',
          options: [
            '@DataProvider(name = "testData")',
            '@DataProvider("testData")',
            'Both A and B are correct',
            '@DataProvider(id = "testData")'
          ],
          correctAnswer: 2,
          explanation: 'Both @DataProvider(name = "testData") and @DataProvider("testData") are valid ways to name a DataProvider. The shorthand form uses the value attribute.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q13',
          type: 'mcq',
          mode: ['full'],
          question: 'Which library is commonly used to read Excel files in TestNG data providers?',
          options: [
            'JExcel',
            'Apache POI',
            'Excel4J',
            'TestNG-Excel'
          ],
          correctAnswer: 1,
          explanation: 'Apache POI is the most commonly used library for reading Excel files (.xls and .xlsx) in Java and TestNG data providers.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q14',
          type: 'mcq',
          mode: ['full'],
          question: 'What method is used to access a @DataProvider from a different class?',
          options: [
            '@Test(dataProvider="name", dataProviderClass=ClassName.class)',
            '@Test(dataProvider="name", class=ClassName.class)',
            '@Test(provider="name", providerClass=ClassName.class)',
            '@Test(data="name", dataClass=ClassName.class)'
          ],
          correctAnswer: 0,
          explanation: 'Use @Test(dataProvider="name", dataProviderClass=ClassName.class) to reference a DataProvider method from a different class. The DataProvider method must be static.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q15',
          type: 'mcq',
          mode: ['full'],
          question: 'How many times will a test method execute if its DataProvider returns 5 rows of data?',
          options: [
            'Once with all 5 rows',
            '5 times, once for each row',
            'Depends on parallel setting',
            'Cannot be determined'
          ],
          correctAnswer: 1,
          explanation: 'The test method will execute 5 times, once for each row of data returned by the DataProvider. Each execution is treated as a separate test iteration.',
          points: 3,
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
          question: '@DataProvider methods must be static to be used across different classes.',
          correctAnswer: true,
          explanation: 'True. When a DataProvider is in a different class than the test method, it must be declared as static to be accessible via dataProviderClass attribute.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q17',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'Parameters from testng.xml can only be passed to @Test methods.',
          correctAnswer: false,
          explanation: 'False. Parameters can be passed to @Test methods, @BeforeMethod, @BeforeClass, @BeforeTest, @BeforeSuite, and their corresponding @After methods.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q18',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'A DataProvider can return an Iterator<Object[]> instead of Object[][].',
          correctAnswer: true,
          explanation: 'True. DataProvider methods can return either Object[][] or Iterator<Object[]>, providing flexibility for lazy data loading and memory efficiency.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q19',
          type: 'truefalse',
          mode: ['full'],
          question: 'You can use @Parameters to pass complex objects like Lists or Maps.',
          correctAnswer: false,
          explanation: 'False. @Parameters only supports simple data types (String, int, boolean, etc.) from testng.xml. For complex objects, use @DataProvider.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q20',
          type: 'truefalse',
          mode: ['full'],
          question: 'DataProvider methods can accept Method and ITestContext parameters to access test context.',
          correctAnswer: true,
          explanation: 'True. DataProvider methods can accept Method and ITestContext parameters to access information about the test method and test context.',
          points: 2,
          difficulty: 'hard'
        },
        {
          id: 'q21',
          type: 'truefalse',
          mode: ['full'],
          question: 'The name attribute in @DataProvider is mandatory.',
          correctAnswer: false,
          explanation: 'False. If name is not specified, TestNG uses the method name as the DataProvider name by default.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q22',
          type: 'truefalse',
          mode: ['full'],
          question: 'Parameters defined at test level override parameters defined at suite level in testng.xml.',
          correctAnswer: true,
          explanation: 'True. TestNG follows a hierarchy where parameters at lower levels (test) override those at higher levels (suite). Test > Class > Suite.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q23',
          type: 'truefalse',
          mode: ['full'],
          question: 'Data-driven testing with @DataProvider automatically generates separate test reports for each data set.',
          correctAnswer: true,
          explanation: 'True. Each execution with different data from DataProvider is treated as a separate test case in the TestNG report, showing individual pass/fail status.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q24',
          type: 'truefalse',
          mode: ['full'],
          question: 'You can use @DataProvider with @BeforeMethod or @BeforeClass annotations.',
          correctAnswer: false,
          explanation: 'False. @DataProvider can only be used with @Test methods, not with configuration methods like @BeforeMethod or @BeforeClass.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q25',
          type: 'truefalse',
          mode: ['full'],
          question: 'Parallel execution with DataProvider can significantly reduce test execution time.',
          correctAnswer: true,
          explanation: 'True. Using parallel=true with threadPoolSize in @DataProvider enables concurrent execution of test iterations, reducing overall execution time.',
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
          question: 'The annotation used to supply test data from testng.xml to test methods is _____.',
          correctAnswer: '@Parameters',
          acceptedAnswers: ['@Parameters', '@parameters', 'Parameters'],
          explanation: '@Parameters annotation is used to pass data from testng.xml configuration file to test methods.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q27',
          type: 'fillblank',
          mode: ['quick', 'full'],
          question: 'A @DataProvider method must return _____ or Iterator<Object[]>.',
          correctAnswer: 'Object[][]',
          acceptedAnswers: ['Object[][]', 'object[][]', 'Object array', 'two-dimensional Object array'],
          explanation: 'A DataProvider method must return a two-dimensional Object array (Object[][]) or an Iterator<Object[]>.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q28',
          type: 'fillblank',
          mode: ['full'],
          question: 'To enable parallel execution of DataProvider iterations, use the _____ attribute.',
          correctAnswer: 'parallel',
          acceptedAnswers: ['parallel', 'parallel=true'],
          explanation: 'The parallel attribute in @DataProvider(parallel=true) enables parallel execution of test iterations with different data sets.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q29',
          type: 'fillblank',
          mode: ['full'],
          question: 'The Apache _____ library is commonly used to read Excel files in TestNG data providers.',
          correctAnswer: 'POI',
          acceptedAnswers: ['POI', 'poi', 'Apache POI'],
          explanation: 'Apache POI is the standard library for reading and writing Excel files in Java applications and TestNG tests.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q30',
          type: 'fillblank',
          mode: ['full'],
          question: 'To reference a DataProvider from a different class, use the _____ attribute in @Test annotation.',
          correctAnswer: 'dataProviderClass',
          acceptedAnswers: ['dataProviderClass', 'dataproviderclass'],
          explanation: 'The dataProviderClass attribute specifies the class containing the DataProvider method when it is in a different class.',
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
          question: 'Explain the key differences between @Parameters and @DataProvider in TestNG.',
          sampleAnswer: '@Parameters passes data from testng.xml file and is suitable for simple, static configuration data. It only supports primitive types and strings. @DataProvider is a method-based approach that returns Object[][] or Iterator, supporting complex objects, dynamic data generation, and large datasets. @DataProvider is more flexible and can read from external sources like Excel, databases, or APIs, while @Parameters is limited to XML configuration.',
          keywords: ['testng.xml', 'Object[][]', 'complex', 'dynamic', 'flexible', 'Excel', 'static', 'method', 'primitive'],
          minKeywords: 4,
          explanation: '@Parameters uses testng.xml for static data, while @DataProvider uses methods for dynamic, complex data from various sources.',
          points: 5,
          difficulty: 'medium'
        },
        {
          id: 'q32',
          type: 'shortanswer',
          mode: ['quick', 'full'],
          question: 'Write a simple @DataProvider method that provides username and password combinations for login testing.',
          sampleAnswer: '@DataProvider(name = "loginData")\npublic Object[][] getLoginData() {\n  return new Object[][] {\n    {"user1", "pass1"},\n    {"user2", "pass2"},\n    {"admin", "admin123"}\n  };\n}\nThis DataProvider returns 3 sets of credentials, each containing a username and password. The test method will execute 3 times with different combinations.',
          keywords: ['@DataProvider', 'Object[][]', 'return', 'new Object', 'name', 'public', 'credentials', 'array'],
          minKeywords: 4,
          explanation: 'A DataProvider method is annotated with @DataProvider, returns Object[][], and contains test data in a two-dimensional array format.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: 'q33',
          type: 'shortanswer',
          mode: ['full'],
          question: 'How do you implement parallel execution of data-driven tests using DataProvider? Explain the configuration.',
          sampleAnswer: 'To enable parallel execution, use @DataProvider(parallel = true) annotation. Additionally, specify threadPoolSize to control the number of concurrent threads: @DataProvider(parallel = true). You can also set threadPoolSize attribute like @DataProvider(name="data", parallel=true). Each data set from the DataProvider will be executed concurrently using the specified number of threads, significantly reducing execution time for large datasets. Ensure your test code is thread-safe when using parallel execution.',
          keywords: ['parallel', 'true', 'threadPoolSize', 'concurrent', 'threads', '@DataProvider', 'thread-safe', 'execution'],
          minKeywords: 4,
          explanation: 'Use @DataProvider(parallel=true) with optional threadPoolSize attribute to enable concurrent execution of test iterations with different data sets.',
          points: 5,
          difficulty: 'hard'
        },
        {
          id: 'q34',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Describe the steps to read test data from an Excel file and use it in a TestNG DataProvider.',
          sampleAnswer: 'Steps to read Excel data: 1) Add Apache POI dependency to project, 2) Create a DataProvider method that reads the Excel file using FileInputStream, 3) Create Workbook object (XSSFWorkbook for .xlsx), 4) Get Sheet and iterate through rows using getPhysicalNumberOfRows(), 5) For each row, iterate through cells and store data in Object[][], 6) Return the data array from DataProvider, 7) Link DataProvider to test method using @Test(dataProvider="name"). Handle exceptions and close resources properly. This enables data-driven testing with external Excel files.',
          keywords: ['Apache POI', 'FileInputStream', 'Workbook', 'Sheet', 'rows', 'cells', 'Object[][]', '@DataProvider', 'XSSFWorkbook', 'iterate'],
          minKeywords: 5,
          explanation: 'Use Apache POI to read Excel file, iterate through rows and cells, store data in Object[][], and return from DataProvider method.',
          points: 5,
          difficulty: 'hard'
        },
        {
          id: 'q35',
          type: 'shortanswer',
          mode: ['full'],
          question: 'How can you use a DataProvider from a different class? Provide the syntax and explain the requirements.',
          sampleAnswer: 'To use a DataProvider from a different class: 1) The DataProvider method must be declared as static in the external class, 2) Use @Test annotation with both dataProvider and dataProviderClass attributes: @Test(dataProvider="providerName", dataProviderClass=ExternalClass.class), 3) The external class containing the DataProvider should be accessible (proper package imports). Example: @Test(dataProvider="loginData", dataProviderClass=DataProviders.class). This approach promotes reusability by centralizing data providers in separate utility classes that can be shared across multiple test classes.',
          keywords: ['static', 'dataProviderClass', 'external', 'class', '@Test', 'dataProvider', 'reusability', 'import', 'separate'],
          minKeywords: 4,
          explanation: 'Declare DataProvider as static in external class and reference using @Test(dataProvider="name", dataProviderClass=ClassName.class).',
          points: 4,
          difficulty: 'medium'
        }
      ]
    }
  ]
};
