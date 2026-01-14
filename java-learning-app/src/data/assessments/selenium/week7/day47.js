export default {
  title: "Day 47: Database Testing - Assessment",
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
      description: "Choose the best answer for each question (3 points each)",
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What does JDBC stand for in Java database connectivity?',
          options: [
            'Java Database Connection',
            'Java Database Connectivity',
            'Java Data Base Controller',
            'Java Direct Base Connection'
          ],
          correctAnswer: 1,
          explanation: 'JDBC stands for Java Database Connectivity. It is an API that enables Java applications to interact with databases by executing SQL statements and processing results.',
          points: 3
        },
        {
          id: 'q2',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which class is used to establish a database connection in JDBC?',
          options: [
            'DatabaseManager',
            'ConnectionFactory',
            'DriverManager',
            'DatabaseConnector'
          ],
          correctAnswer: 2,
          explanation: 'DriverManager class is used to establish a database connection in JDBC. It manages the set of JDBC drivers and provides methods like getConnection() to create database connections.',
          points: 3
        },
        {
          id: 'q3',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the correct order of steps to execute a SQL query using JDBC?',
          options: [
            'Create Statement → Execute Query → Get Connection → Process ResultSet',
            'Get Connection → Create Statement → Execute Query → Process ResultSet',
            'Execute Query → Get Connection → Create Statement → Process ResultSet',
            'Process ResultSet → Execute Query → Create Statement → Get Connection'
          ],
          correctAnswer: 1,
          explanation: 'The correct order is: (1) Get Connection using DriverManager, (2) Create Statement or PreparedStatement, (3) Execute Query, (4) Process ResultSet. This follows the natural flow of database operations.',
          points: 3
        },
        {
          id: 'q4',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which method of PreparedStatement is used to execute SELECT queries?',
          options: [
            'execute()',
            'executeUpdate()',
            'executeQuery()',
            'executeSelect()'
          ],
          correctAnswer: 2,
          explanation: 'executeQuery() method is used for SELECT queries that return a ResultSet. executeUpdate() is for INSERT/UPDATE/DELETE, and execute() returns a boolean for any SQL statement.',
          points: 3
        },
        {
          id: 'q5',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the PRIMARY advantage of PreparedStatement over Statement?',
          options: [
            'Better performance and SQL injection prevention',
            'Simpler syntax',
            'Faster compilation',
            'Supports more database types'
          ],
          correctAnswer: 0,
          explanation: 'PreparedStatement offers better performance through query pre-compilation and reusability, and prevents SQL injection attacks by properly escaping parameters. It is the preferred choice for parameterized queries.',
          points: 3
        },
        {
          id: 'q6',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which interface is used to iterate through database query results?',
          options: [
            'QueryResult',
            'DataSet',
            'ResultSet',
            'RecordSet'
          ],
          correctAnswer: 2,
          explanation: 'ResultSet interface represents the result set of a database query. It provides methods like next(), getString(), getInt() to navigate through and retrieve data from query results.',
          points: 3
        },
        {
          id: 'q7',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the best practice for test data setup in database testing?',
          options: [
            'Use production data directly',
            'Create dedicated test data that is isolated and repeatable',
            'Randomly generate data during test execution',
            'Share test data across all test environments'
          ],
          correctAnswer: 1,
          explanation: 'Best practice is to create dedicated test data that is isolated, repeatable, and independent. This ensures tests are reliable, do not interfere with each other, and can be run in any environment.',
          points: 3
        },
        {
          id: 'q8',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which validation strategy is used to verify data integrity after UI actions in test automation?',
          options: [
            'Verify only UI elements',
            'Query database and compare with expected values',
            'Check application logs',
            'Validate API responses only'
          ],
          correctAnswer: 1,
          explanation: 'The most reliable validation strategy is to query the database after UI actions and compare actual values with expected values. This verifies that UI actions correctly persist data to the backend.',
          points: 3
        },
        {
          id: 'q9',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is connection pooling in database testing?',
          options: [
            'Creating multiple database instances',
            'Reusing a pool of established database connections',
            'Executing queries in parallel',
            'Backing up database connections'
          ],
          correctAnswer: 1,
          explanation: 'Connection pooling is a technique that maintains a pool of reusable database connections. Instead of creating a new connection for each request, connections are borrowed from the pool and returned after use, improving performance.',
          points: 3
        },
        {
          id: 'q10',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which method is used to close database resources properly?',
          options: [
            'terminate()',
            'dispose()',
            'close()',
            'shutdown()'
          ],
          correctAnswer: 2,
          explanation: 'The close() method is used to close JDBC resources (Connection, Statement, ResultSet). Best practice is to close resources in a finally block or use try-with-resources to ensure proper cleanup.',
          points: 3
        },
        {
          id: 'q11',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the purpose of the JDBC driver in database connectivity?',
          options: [
            'To create database schemas',
            'To translate JDBC calls into database-specific protocol',
            'To encrypt database connections',
            'To generate SQL queries automatically'
          ],
          correctAnswer: 1,
          explanation: 'The JDBC driver translates standard JDBC API calls into database-specific protocol that the database can understand. Different databases (MySQL, Oracle, PostgreSQL) require different JDBC drivers.',
          points: 3
        },
        {
          id: 'q12',
          type: 'mcq',
          mode: ['full'],
          question: 'Which type of JDBC driver is pure Java and platform independent?',
          options: [
            'Type 1: JDBC-ODBC Bridge',
            'Type 2: Native-API Driver',
            'Type 3: Network Protocol Driver',
            'Type 4: Thin Driver'
          ],
          correctAnswer: 3,
          explanation: 'Type 4 (Thin Driver) is a pure Java driver that communicates directly with the database using its native protocol. It is platform-independent, offers best performance, and is the most commonly used JDBC driver type.',
          points: 3
        },
        {
          id: 'q13',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the correct way to parameterize a PreparedStatement query?',
          options: [
            'Use string concatenation to build the query',
            'Use ? placeholders and setXxx() methods',
            'Use ${variable} syntax',
            'Use # symbol for parameters'
          ],
          correctAnswer: 1,
          explanation: 'PreparedStatement uses ? as placeholders for parameters. Values are set using setXxx() methods like setString(index, value), setInt(index, value). This prevents SQL injection and improves performance.',
          points: 3
        },
        {
          id: 'q14',
          type: 'mcq',
          mode: ['full'],
          question: 'When should database transactions be committed in test automation?',
          options: [
            'After every single SQL statement',
            'Never commit, always rollback to maintain clean state',
            'Commit based on test requirements and data setup needs',
            'Automatically by JDBC'
          ],
          correctAnswer: 2,
          explanation: 'Transaction management depends on test requirements. For test data setup, commit changes; for validation-only queries, no commit needed. Some tests may require rollback to maintain clean state. Use connection.setAutoCommit() appropriately.',
          points: 3
        },
        {
          id: 'q15',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the recommended approach for managing database credentials in a test automation framework?',
          options: [
            'Hardcode credentials in test classes',
            'Store in external configuration files with encryption',
            'Share credentials in version control',
            'Use default database passwords'
          ],
          correctAnswer: 1,
          explanation: 'Best practice is to store database credentials in external configuration files (properties, YAML) with encryption or use environment variables. Never hardcode or commit credentials to version control for security reasons.',
          points: 3
        }
      ]
    },
    {
      title: "Section B: True/False Questions",
      description: "Indicate whether each statement is true or false (2 points each)",
      questions: [
        {
          id: 'q16',
          type: 'truefalse',
          mode: ['full'],
          question: 'PreparedStatement automatically prevents SQL injection attacks by properly escaping parameters.',
          correctAnswer: true,
          explanation: 'True. PreparedStatement prevents SQL injection by treating parameter values as data rather than executable code. The driver properly escapes special characters, making injection attacks ineffective.',
          points: 2
        },
        {
          id: 'q17',
          type: 'truefalse',
          mode: ['full'],
          question: 'ResultSet.next() method must be called before accessing the first row of query results.',
          correctAnswer: true,
          explanation: 'True. ResultSet cursor initially points before the first row. You must call next() to move to the first row before accessing data. next() returns false when no more rows are available.',
          points: 2
        },
        {
          id: 'q18',
          type: 'truefalse',
          mode: ['full'],
          question: 'It is acceptable to share database connections across multiple test threads without synchronization.',
          correctAnswer: false,
          explanation: 'False. Database connections are not thread-safe. Sharing connections across threads without synchronization can lead to race conditions. Each thread should use its own connection or implement proper synchronization.',
          points: 2
        },
        {
          id: 'q19',
          type: 'truefalse',
          mode: ['full'],
          question: 'Database cleanup should be performed after each test to ensure test isolation and repeatability.',
          correctAnswer: true,
          explanation: 'True. Cleaning up test data after each test ensures test isolation, prevents data pollution, and makes tests repeatable. This is typically done in @AfterMethod or @AfterClass using DELETE statements or database reset scripts.',
          points: 2
        },
        {
          id: 'q20',
          type: 'truefalse',
          mode: ['full'],
          question: 'Connection pooling should always be used in test automation frameworks for better performance.',
          correctAnswer: true,
          explanation: 'True. Connection pooling significantly improves performance by reusing connections instead of creating new ones for each test. Libraries like HikariCP or Apache DBCP2 should be used in automation frameworks.',
          points: 2
        },
        {
          id: 'q21',
          type: 'truefalse',
          mode: ['full'],
          question: 'executeUpdate() method returns the number of rows affected by INSERT, UPDATE, or DELETE operations.',
          correctAnswer: true,
          explanation: 'True. The executeUpdate() method returns an integer representing the row count for INSERT, UPDATE, DELETE statements. This can be used to verify that the expected number of records were affected.',
          points: 2
        },
        {
          id: 'q22',
          type: 'truefalse',
          mode: ['full'],
          question: 'JDBC resources (Connection, Statement, ResultSet) are automatically closed when the JVM exits, so explicit closing is optional.',
          correctAnswer: false,
          explanation: 'False. While resources may eventually be garbage collected, they should be explicitly closed to free up database resources immediately. Use try-with-resources or close in finally blocks to prevent resource leaks.',
          points: 2
        },
        {
          id: 'q23',
          type: 'truefalse',
          mode: ['full'],
          question: 'Database validation in test automation should verify both UI display and backend data persistence.',
          correctAnswer: true,
          explanation: 'True. Comprehensive validation includes checking UI elements for correct display AND querying the database to verify data is correctly persisted. This ensures end-to-end data integrity.',
          points: 2
        },
        {
          id: 'q24',
          type: 'truefalse',
          mode: ['full'],
          question: 'Using SELECT * in automation queries is recommended for better performance and maintainability.',
          correctAnswer: false,
          explanation: 'False. SELECT * is discouraged because it retrieves unnecessary columns, impacts performance, and breaks when schema changes. Always specify only the columns needed for validation or test data.',
          points: 2
        },
        {
          id: 'q25',
          type: 'truefalse',
          mode: ['full'],
          question: 'Database test data should be created using SQL scripts in @BeforeMethod or @BeforeClass annotations for consistency.',
          correctAnswer: true,
          explanation: 'True. Creating test data using SQL scripts in TestNG setup methods (@BeforeMethod, @BeforeClass) ensures consistent, repeatable test data for each test run. This follows the "Given-When-Then" pattern for test automation.',
          points: 2
        }
      ]
    },
    {
      title: "Section C: Fill in the Blanks",
      description: "Complete each statement with the correct term (4 points each)",
      questions: [
        {
          id: 'q26',
          type: 'fillblank',
          mode: ['full'],
          question: 'The __________ class in JDBC is used to manage database drivers and establish connections using the getConnection() method.',
          correctAnswer: 'DriverManager',
          explanation: 'DriverManager is the basic service for managing a set of JDBC drivers. It provides static methods like getConnection(url, username, password) to establish database connections.',
          points: 4
        },
        {
          id: 'q27',
          type: 'fillblank',
          mode: ['full'],
          question: 'The __________ interface represents the result set returned by a database query and provides methods to navigate and retrieve data.',
          correctAnswer: 'ResultSet',
          explanation: 'ResultSet interface represents a table of data returned by executing a query. It maintains a cursor pointing to the current row and provides methods like next(), getString(), getInt() to access data.',
          points: 4
        },
        {
          id: 'q28',
          type: 'fillblank',
          mode: ['full'],
          question: 'In PreparedStatement, the __________ method is used to set a String parameter value at a specified index.',
          correctAnswer: 'setString',
          explanation: 'setString(int parameterIndex, String value) is used to set String parameters in PreparedStatement. Similar methods exist for other types: setInt(), setDouble(), setDate(), etc.',
          points: 4
        },
        {
          id: 'q29',
          type: 'fillblank',
          mode: ['full'],
          question: 'The __________ pattern maintains a pool of reusable database connections to improve application performance.',
          correctAnswer: 'connection pooling',
          explanation: 'Connection pooling is a design pattern that creates and maintains a pool of database connections. Connections are borrowed from the pool, used, and returned, avoiding the overhead of creating new connections.',
          points: 4
        },
        {
          id: 'q30',
          type: 'fillblank',
          mode: ['full'],
          question: 'The JDBC connection URL format typically starts with jdbc: followed by the __________ subprotocol identifier.',
          correctAnswer: 'database',
          explanation: 'JDBC URL format is jdbc:<database>://<host>:<port>/<database_name>. For example: jdbc:mysql://localhost:3306/testdb or jdbc:postgresql://localhost:5432/testdb. The database type (mysql, postgresql, oracle) identifies the JDBC driver.',
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
          question: 'Explain how to create a reusable DatabaseUtil class for test automation. Include key methods for connection management, query execution, and data validation.',
          keywords: ['DatabaseUtil', 'getConnection', 'closeConnection', 'executeQuery', 'executeUpdate', 'validateData', 'ResultSet', 'PreparedStatement', 'singleton', 'static', 'properties', 'config'],
          minKeywords: 2,
          sampleAnswer: 'A DatabaseUtil class should include: (1) getConnection() method that reads database properties (URL, username, password) from config file and returns a Connection using DriverManager. Consider using connection pooling. (2) closeConnection() method to properly close Connection, Statement, and ResultSet resources. (3) executeQuery(String sql, Object... params) method that creates PreparedStatement, sets parameters, executes query, and returns ResultSet. (4) executeUpdate(String sql, Object... params) for INSERT/UPDATE/DELETE operations. (5) validateData(String query, String column, Object expectedValue) method that executes query, retrieves specified column value, and compares with expected value. (6) getRowCount(String tableName, String condition) to count records. Make it a utility class with static methods or implement singleton pattern. Handle exceptions appropriately and ensure all resources are closed using try-with-resources.',
          points: 8
        },
        {
          id: 'q32',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Describe a comprehensive test data management strategy for database testing in automation frameworks. Include data setup, cleanup, and isolation techniques.',
          keywords: ['@BeforeMethod', '@AfterMethod', 'SQL', 'script', 'INSERT', 'DELETE', 'TRUNCATE', 'transaction', 'rollback', 'isolation', 'dedicated', 'unique', 'timestamp', 'independent', 'cleanup'],
          minKeywords: 2,
          sampleAnswer: 'A comprehensive test data management strategy includes: (1) Data Setup - Use @BeforeClass or @BeforeMethod to execute SQL scripts that create test data. Load scripts from resources folder or generate data programmatically. Use unique identifiers (timestamps, UUIDs) to avoid conflicts. (2) Data Isolation - Each test should create its own dedicated test data rather than sharing. Use unique email addresses, usernames, or IDs per test. (3) Data Cleanup - Implement @AfterMethod or @AfterClass to delete test data using DELETE or TRUNCATE statements. Query records by unique test identifiers. (4) Transaction Management - Consider using database transactions with rollback for tests that should not persist data. (5) Data Validation - Create test data with known values that can be easily validated. (6) Environment Separation - Use separate test databases or schemas for different test environments. (7) Factory Pattern - Implement TestDataFactory to generate consistent test data objects. This ensures tests are independent, repeatable, and leave no data pollution.',
          points: 8
        },
        {
          id: 'q33',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Explain the difference between Statement and PreparedStatement in JDBC. When should each be used and why is PreparedStatement preferred for automation frameworks?',
          keywords: ['Statement', 'PreparedStatement', 'SQL injection', 'precompiled', 'cache', 'performance', 'parameter', 'setString', 'setInt', 'placeholder', '?', 'security', 'reuse'],
          minKeywords: 2,
          sampleAnswer: 'Statement vs PreparedStatement differences: (1) Compilation - Statement is compiled every time it executes. PreparedStatement is precompiled once and can be reused with different parameters, improving performance. (2) SQL Injection - Statement is vulnerable to SQL injection when using string concatenation. PreparedStatement prevents injection by properly escaping parameters. (3) Syntax - Statement uses direct SQL strings: stmt.executeQuery("SELECT * FROM users"). PreparedStatement uses placeholders: pstmt = conn.prepareStatement("SELECT * FROM users WHERE id = ?"); pstmt.setInt(1, userId). (4) Performance - PreparedStatement offers better performance for repeated queries due to query plan caching by database. (5) Readability - PreparedStatement with parameters is cleaner than string concatenation. PreparedStatement should be preferred in automation frameworks because it is secure, performs better for repeated queries, handles different data types properly, and prevents SQL injection attacks. Use Statement only for static queries without parameters.',
          points: 8
        },
        {
          id: 'q34',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Describe how to integrate database validation into a Selenium test scenario. Provide a step-by-step approach for verifying that UI actions correctly persist data to the database.',
          keywords: ['Selenium', 'UI', 'action', 'database', 'validate', 'query', 'SELECT', 'assert', 'compare', 'expected', 'actual', 'DatabaseUtil', 'ResultSet', 'assertEquals', 'verify', 'persistence'],
          minKeywords: 2,
          sampleAnswer: 'Steps to integrate database validation in Selenium tests: (1) Setup - Create test data in database using DatabaseUtil in @BeforeMethod. Record the initial state or expected values. (2) UI Action - Perform the UI action using Selenium WebDriver (e.g., fill registration form and submit, update profile information, place order). (3) Wait - Add appropriate wait time or synchronization to ensure data is persisted (explicit wait or a small delay). (4) Database Query - Execute SQL SELECT query using DatabaseUtil to retrieve the relevant record from database. Use unique identifiers from step 1 to locate the exact record. (5) Validation - Compare database values with expected values using assertions. Example: String actualEmail = resultSet.getString("email"); Assert.assertEquals(actualEmail, expectedEmail, "Email not saved correctly"). (6) Verify all relevant fields that should have been updated by the UI action. (7) Cleanup - Delete test data in @AfterMethod. This approach ensures end-to-end validation by verifying that UI actions correctly persist data to the backend database.',
          points: 8
        },
        {
          id: 'q35',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Explain how to implement connection pooling in a test automation framework using HikariCP. What are the benefits and configuration considerations?',
          keywords: ['HikariCP', 'connection pool', 'DataSource', 'HikariConfig', 'maximumPoolSize', 'minimumIdle', 'connectionTimeout', 'idleTimeout', 'performance', 'reuse', 'configuration', 'getConnection', 'close', 'dependency'],
          minKeywords: 2,
          sampleAnswer: 'Implementing HikariCP connection pooling: (1) Add Dependency - Include HikariCP dependency in pom.xml or build.gradle. (2) Configuration - Create HikariConfig object and set properties: jdbcUrl, username, password, maximumPoolSize (e.g., 10), minimumIdle (e.g., 5), connectionTimeout (e.g., 30000ms), idleTimeout (e.g., 600000ms). Load these from config file. (3) Create DataSource - Initialize HikariDataSource with the config: dataSource = new HikariDataSource(config). Make this singleton. (4) Get Connections - Instead of DriverManager.getConnection(), use dataSource.getConnection(). Connection is borrowed from pool. (5) Return Connections - Always close connections in finally block or try-with-resources. This returns connection to pool rather than closing it. (6) Shutdown - Close dataSource when application/test suite ends using dataSource.close(). Benefits: Significantly better performance due to connection reuse, reduced latency, efficient resource management, automatic connection validation, and configurable pool size. Configuration considerations: Set maximumPoolSize based on test parallelism, configure connection timeout appropriately, enable connection leak detection, use separate pools for different databases if needed.',
          points: 8
        }
      ]
    }
  ]
};
