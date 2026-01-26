export default {
  title: "Day 37: External Data Sources - Excel, CSV, JSON, Database - Assessment",
  passingScore: 70,
  modes: {
    quick: {
      title: "Quick Assessment (10 questions)",
      timeLimit: 15
    },
    full: {
      title: "Full Assessment (35 questions)",
      timeLimit: 45
    }
  },
  sections: [
    {
      title: "Section A: Multiple Choice Questions",
      description: "Select the correct answer for each question (3 points each)",
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which Apache POI class is used to work with .xlsx Excel files?',
          options: [
            'XSSFWorkbook',
            'HSSFWorkbook',
            'ExcelWorkbook',
            'XLSXReader'
          ],
          correctAnswer: 0,
          explanation: 'XSSFWorkbook is used to work with .xlsx (Excel 2007 and later) files, while HSSFWorkbook is used for .xls (Excel 97-2003) files. It stands for XML SpreadSheet Format.',
          points: 3
        },
        {
          id: 'q2',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the correct way to read a cell value from an Excel sheet using Apache POI?',
          options: [
            'sheet.getRow(0).getCell(0).getStringCellValue()',
            'sheet.readCell(0, 0)',
            'workbook.getCell(0, 0)',
            'excel.getCellValue(0, 0)'
          ],
          correctAnswer: 0,
          explanation: 'The correct method chain is sheet.getRow(rowIndex).getCell(columnIndex).getStringCellValue(). You need to first get the row, then get the cell, and finally retrieve the value using the appropriate method based on cell type.',
          points: 3
        },
        {
          id: 'q3',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which library is commonly used for reading CSV files in Java with Selenium?',
          options: [
            'CSVParser',
            'OpenCSV',
            'Apache Commons CSV',
            'Both B and C'
          ],
          correctAnswer: 3,
          explanation: 'Both OpenCSV and Apache Commons CSV are popular libraries for reading CSV files in Java. OpenCSV is simpler to use, while Apache Commons CSV offers more advanced features. Both are widely used in test automation.',
          points: 3
        },
        {
          id: 'q4',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which JSON library is part of the Jackson framework for parsing JSON in Java?',
          options: [
            'JSONObject',
            'ObjectMapper',
            'JsonParser',
            'GsonBuilder'
          ],
          correctAnswer: 1,
          explanation: 'ObjectMapper is the core class in Jackson library for JSON parsing. It provides functionality for reading and writing JSON, converting Java objects to JSON and vice versa. GsonBuilder is part of Google\'s Gson library, not Jackson.',
          points: 3
        },
        {
          id: 'q5',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the correct JDBC URL format for connecting to a MySQL database?',
          options: [
            'jdbc:mysql://localhost:3306/database_name',
            'mysql://localhost:3306/database_name',
            'jdbc:db:mysql://localhost:3306/database_name',
            'connect:mysql://localhost:3306/database_name'
          ],
          correctAnswer: 0,
          explanation: 'The correct JDBC URL format for MySQL is jdbc:mysql://hostname:port/database_name. The "jdbc:" prefix identifies it as a JDBC connection, followed by the database type (mysql), hostname, port number (default 3306), and database name.',
          points: 3
        },
        {
          id: 'q6',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which method is used to execute a SELECT query in JDBC?',
          options: [
            'statement.execute()',
            'statement.executeUpdate()',
            'statement.executeQuery()',
            'statement.runQuery()'
          ],
          correctAnswer: 2,
          explanation: 'executeQuery() is used for SELECT statements that return a ResultSet. executeUpdate() is used for INSERT, UPDATE, DELETE statements that return the number of affected rows. execute() can be used for any SQL statement but is less commonly used.',
          points: 3
        },
        {
          id: 'q7',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What does the TestNG @DataProvider annotation do in data-driven testing?',
          options: [
            'It provides test configuration settings',
            'It supplies test data to test methods',
            'It configures the test execution order',
            'It defines test dependencies'
          ],
          correctAnswer: 1,
          explanation: '@DataProvider annotation is used to supply test data to test methods. It returns a 2D Object array where each array represents a set of parameters for one test iteration, enabling data-driven testing by running the same test with different datasets.',
          points: 3
        },
        {
          id: 'q8',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which cell type enum value is used in Apache POI for numeric cells?',
          options: [
            'CellType.NUMBER',
            'CellType.NUMERIC',
            'CellType.INTEGER',
            'CellType.DOUBLE'
          ],
          correctAnswer: 1,
          explanation: 'CellType.NUMERIC is the correct enum value in Apache POI for cells containing numeric values. You can check cell type using cell.getCellType() and retrieve numeric values using cell.getNumericCellValue().',
          points: 3
        },
        {
          id: 'q9',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the purpose of FileInputStream when reading Excel files?',
          options: [
            'To write data to Excel files',
            'To create new Excel files',
            'To read data from Excel files into memory',
            'To delete Excel files'
          ],
          correctAnswer: 2,
          explanation: 'FileInputStream is used to read data from Excel files into memory. It creates an input stream from the file that can be passed to XSSFWorkbook or HSSFWorkbook constructor to load the Excel file for processing.',
          points: 3
        },
        {
          id: 'q10',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which method is used to iterate through rows in a ResultSet?',
          options: [
            'resultSet.hasNext()',
            'resultSet.next()',
            'resultSet.moveNext()',
            'resultSet.iterate()'
          ],
          correctAnswer: 1,
          explanation: 'resultSet.next() moves the cursor to the next row and returns true if there is a next row, false otherwise. It is typically used in a while loop: while(resultSet.next()) to iterate through all rows returned by a query.',
          points: 3
        },
        {
          id: 'q11',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the correct way to write data to an Excel file using Apache POI?',
          options: [
            'Create workbook, sheet, row, cell, then write using FileOutputStream',
            'Use ExcelWriter class directly',
            'Call workbook.save() method',
            'Use sheet.writeData() method'
          ],
          correctAnswer: 0,
          explanation: 'The correct process is: 1) Create/load a workbook, 2) Create/get a sheet, 3) Create rows using sheet.createRow(), 4) Create cells using row.createCell(), 5) Set cell values, 6) Write the workbook to a file using FileOutputStream, and 7) Close the output stream.',
          points: 3
        },
        {
          id: 'q12',
          type: 'mcq',
          mode: ['full'],
          question: 'Which Gson method is used to convert a JSON string to a Java object?',
          options: [
            'gson.parse()',
            'gson.fromJson()',
            'gson.toObject()',
            'gson.deserialize()'
          ],
          correctAnswer: 1,
          explanation: 'gson.fromJson() is used to deserialize JSON strings into Java objects. You specify the JSON string and the target class type. The reverse operation (Java object to JSON) is done using gson.toJson().',
          points: 3
        },
        {
          id: 'q13',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the correct way to read a properties file in Java?',
          options: [
            'new PropertyReader("config.properties")',
            'Properties props = new Properties(); props.load(new FileInputStream("config.properties"));',
            'ConfigReader.read("config.properties")',
            'FileReader.readProperties("config.properties")'
          ],
          correctAnswer: 1,
          explanation: 'The correct way is to create a Properties object and use its load() method with a FileInputStream or FileReader. The properties file contains key-value pairs, and you can retrieve values using props.getProperty("key").',
          points: 3
        },
        {
          id: 'q14',
          type: 'mcq',
          mode: ['full'],
          question: 'Which interface must a JDBC driver implement to establish database connections?',
          options: [
            'DatabaseDriver',
            'Driver',
            'ConnectionDriver',
            'JDBCDriver'
          ],
          correctAnswer: 1,
          explanation: 'JDBC drivers must implement the java.sql.Driver interface. The DriverManager uses this interface to establish connections. Modern JDBC drivers automatically register themselves, but older versions required Class.forName() to load the driver.',
          points: 3
        },
        {
          id: 'q15',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the advantage of using parameterized queries with PreparedStatement?',
          options: [
            'Faster execution only',
            'Better syntax only',
            'Prevents SQL injection and improves performance',
            'Easier to write only'
          ],
          correctAnswer: 2,
          explanation: 'PreparedStatement offers two main advantages: 1) Security - prevents SQL injection attacks by properly escaping parameters, 2) Performance - the query is pre-compiled and can be reused with different parameters, making it faster for repeated executions.',
          points: 3
        }
      ]
    },
    {
      title: "Section B: True/False Questions",
      description: "Determine if each statement is true or false (2 points each)",
      questions: [
        {
          id: 'q16',
          type: 'truefalse',
          mode: ['full'],
          question: 'HSSFWorkbook is used for reading .xlsx files in Apache POI.',
          correctAnswer: false,
          explanation: 'False. HSSFWorkbook is used for .xls files (Excel 97-2003 format). XSSFWorkbook is used for .xlsx files (Excel 2007 and later format). HSSF stands for Horrible SpreadSheet Format, while XSSF stands for XML SpreadSheet Format.',
          points: 2
        },
        {
          id: 'q17',
          type: 'truefalse',
          mode: ['full'],
          question: 'The DataProvider method in TestNG must return a two-dimensional Object array.',
          correctAnswer: true,
          explanation: 'True. The @DataProvider annotated method must return Object[][] (2D array) or Iterator<Object[]>. Each row in the 2D array represents one set of test parameters, and each column represents a parameter value to be passed to the test method.',
          points: 2
        },
        {
          id: 'q18',
          type: 'truefalse',
          mode: ['full'],
          question: 'CSV files can contain complex nested data structures like JSON.',
          correctAnswer: false,
          explanation: 'False. CSV (Comma-Separated Values) files are flat file formats that store data in a simple tabular structure. They cannot natively represent nested or hierarchical data structures. JSON is better suited for complex, nested data structures.',
          points: 2
        },
        {
          id: 'q19',
          type: 'truefalse',
          mode: ['full'],
          question: 'ResultSet.next() must be called before accessing the first row of query results.',
          correctAnswer: true,
          explanation: 'True. The ResultSet cursor is initially positioned before the first row. You must call next() to move to the first row before accessing any data. This is why the typical pattern is while(rs.next()) { // access data }.',
          points: 2
        },
        {
          id: 'q20',
          type: 'truefalse',
          mode: ['full'],
          question: 'Jackson library can automatically convert JSON to Java objects without any configuration.',
          correctAnswer: true,
          explanation: 'True. Jackson ObjectMapper can automatically map JSON fields to Java object properties if the field names match (case-sensitive). For simple POJOs with matching field names, no additional configuration is needed. Custom mappings can be configured using annotations.',
          points: 2
        },
        {
          id: 'q21',
          type: 'truefalse',
          mode: ['full'],
          question: 'You must always close database connections, statements, and result sets to prevent resource leaks.',
          correctAnswer: true,
          explanation: 'True. Database resources must be properly closed to prevent memory leaks and connection pool exhaustion. Best practice is to use try-with-resources statement which automatically closes resources, or explicitly close them in a finally block.',
          points: 2
        },
        {
          id: 'q22',
          type: 'truefalse',
          mode: ['full'],
          question: 'Apache POI can write formulas to Excel cells in addition to static values.',
          correctAnswer: true,
          explanation: 'True. Apache POI supports writing Excel formulas using cell.setCellFormula(). You can write formulas like "SUM(A1:A10)" or "=A1*B1", and Excel will calculate them when the file is opened. POI also provides FormulaEvaluator to evaluate formulas programmatically.',
          points: 2
        },
        {
          id: 'q23',
          type: 'truefalse',
          mode: ['full'],
          question: 'Properties files in Java can only store String key-value pairs.',
          correctAnswer: true,
          explanation: 'True. Java Properties files store data as String key-value pairs. Even if you store numbers or booleans, they are stored as strings and must be parsed when retrieved (e.g., Integer.parseInt(props.getProperty("port"))).',
          points: 2
        },
        {
          id: 'q24',
          type: 'truefalse',
          mode: ['full'],
          question: 'OpenCSV library automatically handles quoted fields and special characters in CSV files.',
          correctAnswer: true,
          explanation: 'True. OpenCSV handles CSV format complexities including quoted fields, embedded commas, newlines within fields, and escape characters. It follows RFC 4180 CSV standard and provides configuration options for custom delimiters and quote characters.',
          points: 2
        },
        {
          id: 'q25',
          type: 'truefalse',
          mode: ['full'],
          question: 'You can use the same Connection object to execute multiple queries simultaneously in different threads.',
          correctAnswer: false,
          explanation: 'False. JDBC Connection objects are not thread-safe. Using the same connection across multiple threads can lead to unpredictable behavior and errors. Each thread should have its own connection, or you should use connection pooling with proper synchronization.',
          points: 2
        }
      ]
    },
    {
      title: "Section C: Fill in the Blank Questions",
      description: "Complete each statement with the correct term (4 points each)",
      questions: [
        {
          id: 'q26',
          type: 'fillblank',
          mode: ['full'],
          question: 'The ________ class in Apache POI is used to evaluate formulas in Excel cells.',
          correctAnswer: 'FormulaEvaluator',
          explanation: 'FormulaEvaluator is used to evaluate Excel formulas programmatically. You create it using workbook.getCreationHelper().createFormulaEvaluator() and use it to calculate formula results without opening the Excel file.',
          points: 4
        },
        {
          id: 'q27',
          type: 'fillblank',
          mode: ['full'],
          question: 'In JDBC, the ________ method is used to execute INSERT, UPDATE, or DELETE statements and returns the number of affected rows.',
          correctAnswer: 'executeUpdate',
          explanation: 'executeUpdate() is used for DML statements (INSERT, UPDATE, DELETE) and DDL statements. It returns an int representing the number of rows affected by the query. For SELECT queries, use executeQuery() instead.',
          points: 4
        },
        {
          id: 'q28',
          type: 'fillblank',
          mode: ['full'],
          question: 'The ________ annotation in TestNG links a test method with a data provider method.',
          correctAnswer: '@Test(dataProvider="dataProviderName")',
          explanation: 'The @Test annotation\'s dataProvider attribute specifies which @DataProvider method should supply data to the test. The dataProvider value must match the name attribute of the @DataProvider method.',
          points: 4
        },
        {
          id: 'q29',
          type: 'fillblank',
          mode: ['full'],
          question: 'In Jackson library, the ________ method converts a Java object to a JSON string.',
          correctAnswer: 'writeValueAsString',
          explanation: 'ObjectMapper.writeValueAsString() serializes a Java object into a JSON string. Alternatively, writeValue() can write directly to a file or output stream. The reverse operation is done using readValue() or fromJson().',
          points: 4
        },
        {
          id: 'q30',
          type: 'fillblank',
          mode: ['full'],
          question: 'The ________ class in OpenCSV is used to read CSV files line by line.',
          correctAnswer: 'CSVReader',
          explanation: 'CSVReader is the main class for reading CSV files in OpenCSV library. It provides methods like readNext() to read one line at a time, or readAll() to read the entire file into a List of String arrays.',
          points: 4
        }
      ]
    },
    {
      title: "Section D: Short Answer Questions",
      description: "Provide detailed answers for each question (8 points each)",
      questions: [
        {
          id: 'q31',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Explain how to implement a data-driven framework using Excel files with Apache POI. Include the key steps and classes involved.',
          keywords: [
            'XSSFWorkbook',
            'FileInputStream',
            'getRow',
            'getCell',
            'DataProvider',
            'test data',
            'iteration',
            'Object array'
          ],
          minKeywords: 4,
          sampleAnswer: 'To implement a data-driven framework using Excel with Apache POI: 1) Create a utility class to read Excel files using FileInputStream and XSSFWorkbook/HSSFWorkbook. 2) Use getSheet(), getRow(), and getCell() methods to extract data from specific cells. 3) Store test data in a 2D Object array by iterating through rows and columns. 4) Create a @DataProvider method that calls the Excel utility and returns the 2D array. 5) Link the DataProvider to test methods using @Test(dataProvider="name"). 6) The test method will execute once for each row of data in the Excel file. 7) Include error handling for file I/O and null checks for empty cells. 8) Close file streams properly using try-with-resources or finally blocks.',
          points: 8
        },
        {
          id: 'q32',
          type: 'shortanswer',
          mode: ['full'],
          question: 'What are the differences between using CSV and JSON files for test data in Selenium automation? When would you choose one over the other?',
          keywords: [
            'CSV',
            'JSON',
            'flat structure',
            'nested data',
            'simple',
            'complex',
            'hierarchical',
            'readable'
          ],
          minKeywords: 4,
          sampleAnswer: 'CSV vs JSON for test data: CSV files are best for simple, tabular data with a flat structure - ideal for login credentials, form inputs, or parameter sets. They are human-readable and easy to edit in Excel or text editors. However, CSV cannot represent nested or hierarchical data structures. JSON is better for complex test scenarios requiring nested objects, arrays, or hierarchical data. JSON supports multiple data types (numbers, booleans, nulls) while CSV stores everything as strings. Choose CSV for: simple parameter-based tests, large datasets with many rows, easy manual editing by non-technical users. Choose JSON for: API testing with complex request/response structures, configuration data with nested properties, test scenarios with variable-length arrays, or when you need to maintain data type information.',
          points: 8
        },
        {
          id: 'q33',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Describe the process of connecting to a database using JDBC, executing a query, and retrieving results. Include proper resource management.',
          keywords: [
            'DriverManager',
            'Connection',
            'Statement',
            'ResultSet',
            'executeQuery',
            'next',
            'close',
            'try-with-resources'
          ],
          minKeywords: 5,
          sampleAnswer: 'JDBC database interaction process: 1) Load the JDBC driver (modern drivers auto-register). 2) Establish connection using DriverManager.getConnection(url, username, password). 3) Create a Statement or PreparedStatement from the connection. 4) Execute query using executeQuery() for SELECT or executeUpdate() for DML. 5) Process ResultSet using while(rs.next()) loop and rs.getString()/getInt() methods. 6) Properly close resources in reverse order: ResultSet, Statement, Connection. Best practice: use try-with-resources statement which automatically closes resources: try(Connection conn = DriverManager.getConnection(...); Statement stmt = conn.createStatement(); ResultSet rs = stmt.executeQuery("SELECT...")) { while(rs.next()) { // process data } }. This ensures resources are closed even if exceptions occur, preventing connection leaks and database pool exhaustion.',
          points: 8
        },
        {
          id: 'q34',
          type: 'shortanswer',
          mode: ['full'],
          question: 'How do you handle different cell types (String, Numeric, Boolean, Formula) when reading Excel files using Apache POI? Provide code examples.',
          keywords: [
            'getCellType',
            'CellType',
            'switch',
            'getStringCellValue',
            'getNumericCellValue',
            'getBooleanCellValue',
            'getCellFormula',
            'DataFormatter'
          ],
          minKeywords: 4,
          sampleAnswer: 'To handle different cell types in Apache POI: 1) Use cell.getCellType() to determine the cell type. 2) Use a switch statement to handle each CellType enum value: STRING (getStringCellValue()), NUMERIC (getNumericCellValue() for numbers/dates), BOOLEAN (getBooleanCellValue()), FORMULA (getCellFormula() for formula string or use FormulaEvaluator for calculated value), BLANK (handle nulls). Example: switch(cell.getCellType()) { case STRING: value = cell.getStringCellValue(); break; case NUMERIC: if(DateUtil.isCellDateFormatted(cell)) { value = cell.getDateCellValue().toString(); } else { value = String.valueOf(cell.getNumericCellValue()); } break; case BOOLEAN: value = String.valueOf(cell.getBooleanCellValue()); break; case FORMULA: value = evaluator.evaluate(cell).formatAsString(); break; }. Alternatively, use DataFormatter class which automatically formats any cell type as a string: DataFormatter formatter = new DataFormatter(); String value = formatter.formatCellValue(cell);',
          points: 8
        },
        {
          id: 'q35',
          type: 'shortanswer',
          mode: ['full'],
          question: 'What are the advantages of using PreparedStatement over Statement in JDBC? Provide specific examples of when PreparedStatement is essential.',
          keywords: [
            'SQL injection',
            'security',
            'performance',
            'precompiled',
            'parameters',
            'setString',
            'setInt',
            'reusable'
          ],
          minKeywords: 4,
          sampleAnswer: 'PreparedStatement advantages over Statement: 1) Security - Prevents SQL injection attacks by properly escaping parameters. With Statement, concatenating user input directly into SQL is dangerous. PreparedStatement uses placeholders (?) and safely escapes values. 2) Performance - Query is precompiled and cached, allowing reuse with different parameters. Especially beneficial for repeated executions. 3) Readability - Cleaner code with parameter placeholders instead of string concatenation. 4) Type safety - Provides typed setter methods (setString, setInt, setDate) ensuring correct data types. Essential when: accepting user input (login forms, search queries), executing queries in loops with different parameters, working with special characters or quotes in data, building complex queries dynamically. Example: Instead of vulnerable "SELECT * FROM users WHERE username=\'" + input + "\'", use "SELECT * FROM users WHERE username=?" with pstmt.setString(1, input). This prevents injection even if input contains SQL commands. PreparedStatement also handles date/time formatting, binary data (setBlob), and null values correctly.',
          points: 8
        }
      ]
    }
  ]
};
