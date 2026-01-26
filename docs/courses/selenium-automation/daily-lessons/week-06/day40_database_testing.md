# Day 47: Database Testing & Validation in Test Automation

## Learning Objectives

By the end of this session, you will be able to:

1. Understand the importance and scope of database testing in test automation
2. Set up and configure JDBC (Java Database Connectivity) for various databases
3. Establish and manage database connections efficiently in test frameworks
4. Execute SQL queries (SELECT, INSERT, UPDATE, DELETE) programmatically
5. Validate database state before and after test execution
6. Implement database utilities for common operations
7. Design and implement test data setup and cleanup strategies
8. Work with different database systems (MySQL, PostgreSQL, Oracle, SQL Server)
9. Implement connection pooling for performance optimization
10. Integrate database validation with Selenium test frameworks
11. Use PreparedStatements to prevent SQL injection and improve performance
12. Handle database transactions in test automation scenarios
13. Implement database testing patterns and best practices
14. Debug and troubleshoot database connectivity issues
15. Design secure database testing frameworks with proper credential management

---

## 1. Introduction to Database Testing

### What is Database Testing?

Database testing is the process of validating the database layer of an application to ensure:
- Data integrity and consistency
- Correct CRUD operations (Create, Read, Update, Delete)
- Proper transaction handling
- Schema validation
- Performance and scalability
- Security measures

### Types of Database Testing

1. **Structural Testing**
   - Schema validation
   - Table structure verification
   - Index validation
   - Constraint checking

2. **Functional Testing**
   - CRUD operation validation
   - Business logic verification
   - Stored procedure testing
   - Trigger validation

3. **Non-Functional Testing**
   - Performance testing
   - Load testing
   - Security testing
   - Data migration testing

---

## 2. Why Database Testing in Automation?

### Key Benefits

1. **End-to-End Validation**
   - Verify that UI actions correctly update the database
   - Validate data flow from frontend to backend

2. **Test Data Management**
   - Set up test data before test execution
   - Clean up test data after test completion
   - Verify data state at any point

3. **Faster Test Execution**
   - Direct database queries are faster than UI navigation
   - Setup and cleanup operations are more efficient

4. **Complete Coverage**
   - Test scenarios that are difficult to verify through UI
   - Validate backend processes and calculations

5. **Data-Driven Testing**
   - Fetch test data directly from database
   - Validate against expected results stored in database

### When to Use Database Testing

```
✓ Validating user registration/login data
✓ Verifying order details in e-commerce applications
✓ Checking transaction records in banking applications
✓ Validating data synchronization between systems
✓ Setting up complex test data scenarios
✓ Cleaning up test data after execution
✓ Verifying audit logs and timestamps
✓ Testing data migration and transformation
```

---

## 3. JDBC (Java Database Connectivity)

### What is JDBC?

JDBC is a Java API that enables Java applications to interact with databases. It provides methods to query and update data in a database.

### JDBC Architecture

```
Java Application
      ↓
JDBC API (java.sql.*)
      ↓
JDBC Driver Manager
      ↓
JDBC Driver (Database Specific)
      ↓
Database
```

### JDBC Components

1. **DriverManager**: Manages database drivers
2. **Connection**: Represents database connection
3. **Statement**: Executes SQL queries
4. **PreparedStatement**: Pre-compiled SQL statements
5. **CallableStatement**: Executes stored procedures
6. **ResultSet**: Holds data retrieved from database

---

## 4. Setting Up JDBC

### Step 1: Add Database Driver Dependencies

#### Maven Dependencies (pom.xml)

```xml
<!-- MySQL Driver -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.33</version>
</dependency>

<!-- PostgreSQL Driver -->
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <version>42.6.0</version>
</dependency>

<!-- Oracle Driver -->
<dependency>
    <groupId>com.oracle.database.jdbc</groupId>
    <artifactId>ojdbc8</artifactId>
    <version>21.9.0.0</version>
</dependency>

<!-- SQL Server Driver -->
<dependency>
    <groupId>com.microsoft.sqlserver</groupId>
    <artifactId>mssql-jdbc</artifactId>
    <version>12.2.0.jre11</version>
</dependency>

<!-- H2 Database (for testing) -->
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <version>2.1.214</version>
    <scope>test</scope>
</dependency>

<!-- HikariCP for Connection Pooling -->
<dependency>
    <groupId>com.zaxxer</groupId>
    <artifactId>HikariCP</artifactId>
    <version>5.0.1</version>
</dependency>
```

### Step 2: Database Connection Strings

```java
public class DatabaseConfig {

    // MySQL
    public static final String MYSQL_URL =
        "jdbc:mysql://localhost:3306/testdb?useSSL=false&serverTimezone=UTC";
    public static final String MYSQL_USER = "root";
    public static final String MYSQL_PASSWORD = "password";

    // PostgreSQL
    public static final String POSTGRES_URL =
        "jdbc:postgresql://localhost:5432/testdb";
    public static final String POSTGRES_USER = "postgres";
    public static final String POSTGRES_PASSWORD = "password";

    // Oracle
    public static final String ORACLE_URL =
        "jdbc:oracle:thin:@localhost:1521:xe";
    public static final String ORACLE_USER = "system";
    public static final String ORACLE_PASSWORD = "password";

    // SQL Server
    public static final String SQLSERVER_URL =
        "jdbc:sqlserver://localhost:1433;databaseName=testdb";
    public static final String SQLSERVER_USER = "sa";
    public static final String SQLSERVER_PASSWORD = "password";

    // H2 (In-memory for testing)
    public static final String H2_URL =
        "jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1";
    public static final String H2_USER = "sa";
    public static final String H2_PASSWORD = "";
}
```

---

## 5. Creating Database Connections

### Basic Connection Example

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {

    public static Connection getConnection() {
        Connection connection = null;

        try {
            // Load JDBC driver (optional for JDBC 4.0+)
            Class.forName("com.mysql.cj.jdbc.Driver");

            // Establish connection
            connection = DriverManager.getConnection(
                DatabaseConfig.MYSQL_URL,
                DatabaseConfig.MYSQL_USER,
                DatabaseConfig.MYSQL_PASSWORD
            );

            System.out.println("Database connected successfully!");

        } catch (ClassNotFoundException e) {
            System.err.println("JDBC Driver not found: " + e.getMessage());
        } catch (SQLException e) {
            System.err.println("Connection failed: " + e.getMessage());
        }

        return connection;
    }

    public static void closeConnection(Connection connection) {
        if (connection != null) {
            try {
                connection.close();
                System.out.println("Connection closed successfully!");
            } catch (SQLException e) {
                System.err.println("Error closing connection: " + e.getMessage());
            }
        }
    }
}
```

### Connection with Try-With-Resources

```java
public class DatabaseConnectionModern {

    public static void executeQuery() {
        String url = DatabaseConfig.MYSQL_URL;
        String user = DatabaseConfig.MYSQL_USER;
        String password = DatabaseConfig.MYSQL_PASSWORD;

        // Try-with-resources automatically closes connection
        try (Connection conn = DriverManager.getConnection(url, user, password)) {

            if (conn != null) {
                System.out.println("Connected to database successfully!");
                // Execute queries here
            }

        } catch (SQLException e) {
            System.err.println("Database connection error: " + e.getMessage());
            e.printStackTrace();
        }
        // Connection is automatically closed here
    }
}
```

### Singleton Connection Manager

```java
public class ConnectionManager {

    private static ConnectionManager instance;
    private Connection connection;

    private ConnectionManager() {
        try {
            connection = DriverManager.getConnection(
                DatabaseConfig.MYSQL_URL,
                DatabaseConfig.MYSQL_USER,
                DatabaseConfig.MYSQL_PASSWORD
            );
        } catch (SQLException e) {
            throw new RuntimeException("Error connecting to database", e);
        }
    }

    public static ConnectionManager getInstance() {
        if (instance == null) {
            synchronized (ConnectionManager.class) {
                if (instance == null) {
                    instance = new ConnectionManager();
                }
            }
        }
        return instance;
    }

    public Connection getConnection() {
        try {
            if (connection == null || connection.isClosed()) {
                connection = DriverManager.getConnection(
                    DatabaseConfig.MYSQL_URL,
                    DatabaseConfig.MYSQL_USER,
                    DatabaseConfig.MYSQL_PASSWORD
                );
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error getting connection", e);
        }
        return connection;
    }

    public void closeConnection() {
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException e) {
                System.err.println("Error closing connection: " + e.getMessage());
            }
        }
    }
}
```

---

## 6. Executing SQL Queries

### Statement vs PreparedStatement vs CallableStatement

| Feature | Statement | PreparedStatement | CallableStatement |
|---------|-----------|-------------------|-------------------|
| SQL Injection | Vulnerable | Protected | Protected |
| Performance | Slower | Faster (pre-compiled) | Faster |
| Use Case | Simple queries | Parameterized queries | Stored procedures |
| Readability | Less readable | More readable | Moderate |

### Using Statement (Not Recommended for Production)

```java
import java.sql.*;

public class StatementExample {

    public static void queryWithStatement() {
        try (Connection conn = ConnectionManager.getInstance().getConnection();
             Statement stmt = conn.createStatement()) {

            String sql = "SELECT * FROM users WHERE status = 'active'";
            ResultSet rs = stmt.executeQuery(sql);

            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                String email = rs.getString("email");

                System.out.println("ID: " + id + ", Name: " + name + ", Email: " + email);
            }

            rs.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // WARNING: This is vulnerable to SQL injection!
    public static void unsafeQuery(String username) {
        try (Connection conn = ConnectionManager.getInstance().getConnection();
             Statement stmt = conn.createStatement()) {

            // DON'T DO THIS - SQL Injection vulnerability
            String sql = "SELECT * FROM users WHERE username = '" + username + "'";
            ResultSet rs = stmt.executeQuery(sql);

            // Process results...

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```

### Using PreparedStatement (Recommended)

```java
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class PreparedStatementExample {

    // SELECT Query
    public static List<User> getUsersByStatus(String status) {
        List<User> users = new ArrayList<>();
        String sql = "SELECT id, username, email, created_at FROM users WHERE status = ?";

        try (Connection conn = ConnectionManager.getInstance().getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            // Set parameter
            pstmt.setString(1, status);

            // Execute query
            ResultSet rs = pstmt.executeQuery();

            // Process results
            while (rs.next()) {
                User user = new User();
                user.setId(rs.getInt("id"));
                user.setUsername(rs.getString("username"));
                user.setEmail(rs.getString("email"));
                user.setCreatedAt(rs.getTimestamp("created_at"));
                users.add(user);
            }

            rs.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return users;
    }

    // INSERT Query
    public static int insertUser(String username, String email, String password) {
        String sql = "INSERT INTO users (username, email, password, status, created_at) " +
                     "VALUES (?, ?, ?, ?, ?)";
        int generatedId = -1;

        try (Connection conn = ConnectionManager.getInstance().getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            pstmt.setString(1, username);
            pstmt.setString(2, email);
            pstmt.setString(3, password);
            pstmt.setString(4, "active");
            pstmt.setTimestamp(5, new Timestamp(System.currentTimeMillis()));

            int rowsAffected = pstmt.executeUpdate();
            System.out.println(rowsAffected + " row(s) inserted.");

            // Get generated ID
            ResultSet rs = pstmt.getGeneratedKeys();
            if (rs.next()) {
                generatedId = rs.getInt(1);
                System.out.println("Generated ID: " + generatedId);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return generatedId;
    }

    // UPDATE Query
    public static boolean updateUserEmail(int userId, String newEmail) {
        String sql = "UPDATE users SET email = ?, updated_at = ? WHERE id = ?";

        try (Connection conn = ConnectionManager.getInstance().getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, newEmail);
            pstmt.setTimestamp(2, new Timestamp(System.currentTimeMillis()));
            pstmt.setInt(3, userId);

            int rowsAffected = pstmt.executeUpdate();
            System.out.println(rowsAffected + " row(s) updated.");

            return rowsAffected > 0;

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // DELETE Query
    public static boolean deleteUser(int userId) {
        String sql = "DELETE FROM users WHERE id = ?";

        try (Connection conn = ConnectionManager.getInstance().getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, userId);

            int rowsAffected = pstmt.executeUpdate();
            System.out.println(rowsAffected + " row(s) deleted.");

            return rowsAffected > 0;

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // Complex Query with Multiple Parameters
    public static List<Order> getOrdersByDateRange(String customerId, Date startDate, Date endDate) {
        List<Order> orders = new ArrayList<>();
        String sql = "SELECT o.id, o.order_number, o.total_amount, o.status, o.created_at " +
                     "FROM orders o " +
                     "WHERE o.customer_id = ? AND o.created_at BETWEEN ? AND ? " +
                     "ORDER BY o.created_at DESC";

        try (Connection conn = ConnectionManager.getInstance().getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, customerId);
            pstmt.setDate(2, startDate);
            pstmt.setDate(3, endDate);

            ResultSet rs = pstmt.executeQuery();

            while (rs.next()) {
                Order order = new Order();
                order.setId(rs.getInt("id"));
                order.setOrderNumber(rs.getString("order_number"));
                order.setTotalAmount(rs.getDouble("total_amount"));
                order.setStatus(rs.getString("status"));
                order.setCreatedAt(rs.getTimestamp("created_at"));
                orders.add(order);
            }

            rs.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return orders;
    }
}
```

---

## 7. Working with ResultSet

### ResultSet Navigation

```java
public class ResultSetExample {

    public static void demonstrateResultSetNavigation() {
        String sql = "SELECT id, name, email FROM users";

        try (Connection conn = ConnectionManager.getInstance().getConnection();
             Statement stmt = conn.createStatement(
                 ResultSet.TYPE_SCROLL_INSENSITIVE,
                 ResultSet.CONCUR_READ_ONLY);
             ResultSet rs = stmt.executeQuery(sql)) {

            // Move to first row
            if (rs.first()) {
                System.out.println("First row: " + rs.getString("name"));
            }

            // Move to last row
            if (rs.last()) {
                System.out.println("Last row: " + rs.getString("name"));
            }

            // Get row count
            int rowCount = rs.getRow();
            System.out.println("Total rows: " + rowCount);

            // Move to specific row
            if (rs.absolute(3)) {
                System.out.println("Third row: " + rs.getString("name"));
            }

            // Iterate forward
            rs.beforeFirst();
            while (rs.next()) {
                System.out.println(rs.getString("name"));
            }

            // Iterate backward
            rs.afterLast();
            while (rs.previous()) {
                System.out.println(rs.getString("name"));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Get all column values
    public static void displayAllColumns() {
        String sql = "SELECT * FROM users LIMIT 1";

        try (Connection conn = ConnectionManager.getInstance().getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {

            ResultSetMetaData metaData = rs.getMetaData();
            int columnCount = metaData.getColumnCount();

            if (rs.next()) {
                for (int i = 1; i <= columnCount; i++) {
                    String columnName = metaData.getColumnName(i);
                    String columnType = metaData.getColumnTypeName(i);
                    Object value = rs.getObject(i);

                    System.out.println(columnName + " (" + columnType + "): " + value);
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Convert ResultSet to List of Maps
    public static List<Map<String, Object>> resultSetToList(ResultSet rs) throws SQLException {
        List<Map<String, Object>> rows = new ArrayList<>();
        ResultSetMetaData metaData = rs.getMetaData();
        int columnCount = metaData.getColumnCount();

        while (rs.next()) {
            Map<String, Object> row = new HashMap<>();
            for (int i = 1; i <= columnCount; i++) {
                String columnName = metaData.getColumnName(i);
                Object value = rs.getObject(i);
                row.put(columnName, value);
            }
            rows.add(row);
        }

        return rows;
    }
}
```

---

## 8. Common Database Operations in Testing

### Test Data Setup

```java
public class TestDataSetup {

    public static void setupTestUser(String username, String email) {
        String sql = "INSERT INTO users (username, email, password, status, created_at) " +
                     "VALUES (?, ?, ?, ?, ?)";

        try (Connection conn = ConnectionManager.getInstance().getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, username);
            pstmt.setString(2, email);
            pstmt.setString(3, "Test@123"); // Default test password
            pstmt.setString(4, "active");
            pstmt.setTimestamp(5, new Timestamp(System.currentTimeMillis()));

            pstmt.executeUpdate();
            System.out.println("Test user created: " + username);

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void setupMultipleTestUsers(int count) {
        for (int i = 1; i <= count; i++) {
            String username = "testuser" + i;
            String email = "testuser" + i + "@test.com";
            setupTestUser(username, email);
        }
    }

    public static void setupTestOrder(int userId, double amount) {
        String sql = "INSERT INTO orders (user_id, order_number, total_amount, status, created_at) " +
                     "VALUES (?, ?, ?, ?, ?)";

        try (Connection conn = ConnectionManager.getInstance().getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            String orderNumber = "ORD-" + System.currentTimeMillis();

            pstmt.setInt(1, userId);
            pstmt.setString(2, orderNumber);
            pstmt.setDouble(3, amount);
            pstmt.setString(4, "pending");
            pstmt.setTimestamp(5, new Timestamp(System.currentTimeMillis()));

            pstmt.executeUpdate();
            System.out.println("Test order created: " + orderNumber);

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```

### Pre-condition Checks

```java
public class PreConditionChecks {

    public static boolean userExists(String username) {
        String sql = "SELECT COUNT(*) as count FROM users WHERE username = ?";

        try (Connection conn = ConnectionManager.getInstance().getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, username);
            ResultSet rs = pstmt.executeQuery();

            if (rs.next()) {
                return rs.getInt("count") > 0;
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }

    public static boolean emailIsUnique(String email) {
        String sql = "SELECT COUNT(*) as count FROM users WHERE email = ?";

        try (Connection conn = ConnectionManager.getInstance().getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, email);
            ResultSet rs = pstmt.executeQuery();

            if (rs.next()) {
                return rs.getInt("count") == 0;
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }

    public static int getUserCount() {
        String sql = "SELECT COUNT(*) as count FROM users";

        try (Connection conn = ConnectionManager.getInstance().getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {

            if (rs.next()) {
                return rs.getInt("count");
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return 0;
    }

    public static boolean tableExists(String tableName) {
        try (Connection conn = ConnectionManager.getInstance().getConnection()) {

            DatabaseMetaData metaData = conn.getMetaData();
            ResultSet rs = metaData.getTables(null, null, tableName, null);

            return rs.next();

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}
```

### Post-execution Validation

```java
public class PostExecutionValidation {

    public static boolean validateUserCreated(String username, String expectedEmail) {
        String sql = "SELECT email FROM users WHERE username = ?";

        try (Connection conn = ConnectionManager.getInstance().getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, username);
            ResultSet rs = pstmt.executeQuery();

            if (rs.next()) {
                String actualEmail = rs.getString("email");
                return expectedEmail.equals(actualEmail);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }

    public static boolean validateOrderStatus(String orderNumber, String expectedStatus) {
        String sql = "SELECT status FROM orders WHERE order_number = ?";

        try (Connection conn = ConnectionManager.getInstance().getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, orderNumber);
            ResultSet rs = pstmt.executeQuery();

            if (rs.next()) {
                String actualStatus = rs.getString("status");
                return expectedStatus.equals(actualStatus);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }

    public static double getTotalOrderAmount(int userId) {
        String sql = "SELECT SUM(total_amount) as total FROM orders WHERE user_id = ?";

        try (Connection conn = ConnectionManager.getInstance().getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, userId);
            ResultSet rs = pstmt.executeQuery();

            if (rs.next()) {
                return rs.getDouble("total");
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return 0.0;
    }

    public static int getOrderCount(int userId, String status) {
        String sql = "SELECT COUNT(*) as count FROM orders WHERE user_id = ? AND status = ?";

        try (Connection conn = ConnectionManager.getInstance().getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, userId);
            pstmt.setString(2, status);
            ResultSet rs = pstmt.executeQuery();

            if (rs.next()) {
                return rs.getInt("count");
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return 0;
    }
}
```

### Data Cleanup

```java
public class DataCleanup {

    public static void cleanupTestUsers() {
        String sql = "DELETE FROM users WHERE username LIKE 'testuser%'";

        try (Connection conn = ConnectionManager.getInstance().getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            int rowsDeleted = pstmt.executeUpdate();
            System.out.println("Cleaned up " + rowsDeleted + " test users.");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void deleteUserByUsername(String username) {
        String sql = "DELETE FROM users WHERE username = ?";

        try (Connection conn = ConnectionManager.getInstance().getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, username);
            int rowsDeleted = pstmt.executeUpdate();

            if (rowsDeleted > 0) {
                System.out.println("User deleted: " + username);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void cleanupOldRecords(int daysOld) {
        String sql = "DELETE FROM users WHERE created_at < ?";

        try (Connection conn = ConnectionManager.getInstance().getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            Calendar cal = Calendar.getInstance();
            cal.add(Calendar.DAY_OF_MONTH, -daysOld);
            Timestamp cutoffDate = new Timestamp(cal.getTimeInMillis());

            pstmt.setTimestamp(1, cutoffDate);
            int rowsDeleted = pstmt.executeUpdate();

            System.out.println("Cleaned up " + rowsDeleted + " old records.");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void truncateTable(String tableName) {
        String sql = "TRUNCATE TABLE " + tableName;

        try (Connection conn = ConnectionManager.getInstance().getConnection();
             Statement stmt = conn.createStatement()) {

            stmt.executeUpdate(sql);
            System.out.println("Table truncated: " + tableName);

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void cleanupTestData() {
        // Clean up in proper order (foreign key constraints)
        String[] cleanupQueries = {
            "DELETE FROM order_items WHERE order_id IN (SELECT id FROM orders WHERE order_number LIKE 'TEST-%')",
            "DELETE FROM orders WHERE order_number LIKE 'TEST-%'",
            "DELETE FROM users WHERE email LIKE '%@test.com'",
            "DELETE FROM users WHERE username LIKE 'testuser%'"
        };

        try (Connection conn = ConnectionManager.getInstance().getConnection();
             Statement stmt = conn.createStatement()) {

            for (String sql : cleanupQueries) {
                int rowsDeleted = stmt.executeUpdate(sql);
                System.out.println("Cleaned up " + rowsDeleted + " records.");
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```

---

## 9. Working with Different Databases

### Database-Specific Connection Managers

```java
public class DatabaseFactory {

    public enum DatabaseType {
        MYSQL, POSTGRESQL, ORACLE, SQLSERVER, H2
    }

    public static Connection getConnection(DatabaseType dbType) {
        Connection connection = null;

        try {
            switch (dbType) {
                case MYSQL:
                    connection = getMySQLConnection();
                    break;
                case POSTGRESQL:
                    connection = getPostgreSQLConnection();
                    break;
                case ORACLE:
                    connection = getOracleConnection();
                    break;
                case SQLSERVER:
                    connection = getSQLServerConnection();
                    break;
                case H2:
                    connection = getH2Connection();
                    break;
                default:
                    throw new IllegalArgumentException("Unsupported database type: " + dbType);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return connection;
    }

    private static Connection getMySQLConnection() throws SQLException {
        return DriverManager.getConnection(
            DatabaseConfig.MYSQL_URL,
            DatabaseConfig.MYSQL_USER,
            DatabaseConfig.MYSQL_PASSWORD
        );
    }

    private static Connection getPostgreSQLConnection() throws SQLException {
        return DriverManager.getConnection(
            DatabaseConfig.POSTGRES_URL,
            DatabaseConfig.POSTGRES_USER,
            DatabaseConfig.POSTGRES_PASSWORD
        );
    }

    private static Connection getOracleConnection() throws SQLException {
        return DriverManager.getConnection(
            DatabaseConfig.ORACLE_URL,
            DatabaseConfig.ORACLE_USER,
            DatabaseConfig.ORACLE_PASSWORD
        );
    }

    private static Connection getSQLServerConnection() throws SQLException {
        return DriverManager.getConnection(
            DatabaseConfig.SQLSERVER_URL,
            DatabaseConfig.SQLSERVER_USER,
            DatabaseConfig.SQLSERVER_PASSWORD
        );
    }

    private static Connection getH2Connection() throws SQLException {
        return DriverManager.getConnection(
            DatabaseConfig.H2_URL,
            DatabaseConfig.H2_USER,
            DatabaseConfig.H2_PASSWORD
        );
    }
}
```

### Database-Specific SQL Queries

```java
public class DatabaseSpecificQueries {

    // Get current date/time - different syntax for different databases
    public static String getCurrentTimestampQuery(DatabaseFactory.DatabaseType dbType) {
        switch (dbType) {
            case MYSQL:
                return "SELECT NOW()";
            case POSTGRESQL:
                return "SELECT NOW()";
            case ORACLE:
                return "SELECT SYSDATE FROM DUAL";
            case SQLSERVER:
                return "SELECT GETDATE()";
            case H2:
                return "SELECT CURRENT_TIMESTAMP()";
            default:
                return "SELECT NOW()";
        }
    }

    // Limit query - different syntax
    public static String getLimitQuery(DatabaseFactory.DatabaseType dbType, int limit) {
        switch (dbType) {
            case MYSQL:
            case POSTGRESQL:
            case H2:
                return "SELECT * FROM users LIMIT " + limit;
            case ORACLE:
                return "SELECT * FROM users WHERE ROWNUM <= " + limit;
            case SQLSERVER:
                return "SELECT TOP " + limit + " * FROM users";
            default:
                return "SELECT * FROM users LIMIT " + limit;
        }
    }

    // Auto-increment - different implementations
    public static String getAutoIncrementDefinition(DatabaseFactory.DatabaseType dbType) {
        switch (dbType) {
            case MYSQL:
                return "AUTO_INCREMENT";
            case POSTGRESQL:
                return "SERIAL";
            case ORACLE:
                return "GENERATED ALWAYS AS IDENTITY";
            case SQLSERVER:
                return "IDENTITY(1,1)";
            case H2:
                return "AUTO_INCREMENT";
            default:
                return "AUTO_INCREMENT";
        }
    }
}
```

---

## 10. Connection Pooling

### Why Connection Pooling?

Creating a new database connection is expensive:
- Takes time (100-500ms per connection)
- Consumes resources
- Impacts performance

Connection pooling:
- Reuses connections
- Improves performance
- Reduces resource consumption
- Manages connection lifecycle

### HikariCP Connection Pool

```java
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

public class ConnectionPool {

    private static HikariDataSource dataSource;

    static {
        HikariConfig config = new HikariConfig();

        // Database connection properties
        config.setJdbcUrl(DatabaseConfig.MYSQL_URL);
        config.setUsername(DatabaseConfig.MYSQL_USER);
        config.setPassword(DatabaseConfig.MYSQL_PASSWORD);

        // Pool configuration
        config.setMaximumPoolSize(10);                    // Maximum pool size
        config.setMinimumIdle(5);                         // Minimum idle connections
        config.setConnectionTimeout(30000);               // 30 seconds
        config.setIdleTimeout(600000);                    // 10 minutes
        config.setMaxLifetime(1800000);                   // 30 minutes

        // Performance optimization
        config.setAutoCommit(true);
        config.setConnectionTestQuery("SELECT 1");

        // Pool name for monitoring
        config.setPoolName("TestAutomationPool");

        // Additional settings
        config.addDataSourceProperty("cachePrepStmts", "true");
        config.addDataSourceProperty("prepStmtCacheSize", "250");
        config.addDataSourceProperty("prepStmtCacheSqlLimit", "2048");

        dataSource = new HikariDataSource(config);
    }

    public static Connection getConnection() throws SQLException {
        return dataSource.getConnection();
    }

    public static void closePool() {
        if (dataSource != null && !dataSource.isClosed()) {
            dataSource.close();
        }
    }

    // Get pool statistics
    public static void printPoolStats() {
        System.out.println("=== Connection Pool Statistics ===");
        System.out.println("Active Connections: " + dataSource.getHikariPoolMXBean().getActiveConnections());
        System.out.println("Idle Connections: " + dataSource.getHikariPoolMXBean().getIdleConnections());
        System.out.println("Total Connections: " + dataSource.getHikariPoolMXBean().getTotalConnections());
        System.out.println("Threads Awaiting Connection: " + dataSource.getHikariPoolMXBean().getThreadsAwaitingConnection());
    }
}
```

### Using Connection Pool

```java
public class ConnectionPoolUsage {

    public static void executeQueryWithPool() {
        String sql = "SELECT * FROM users WHERE status = ?";

        try (Connection conn = ConnectionPool.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, "active");
            ResultSet rs = pstmt.executeQuery();

            while (rs.next()) {
                System.out.println("User: " + rs.getString("username"));
            }

            rs.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }
        // Connection is automatically returned to pool
    }

    public static void demonstratePoolBenefit() {
        long startTime = System.currentTimeMillis();

        // Execute 100 queries using connection pool
        for (int i = 0; i < 100; i++) {
            executeQueryWithPool();
        }

        long endTime = System.currentTimeMillis();
        System.out.println("Time taken with pool: " + (endTime - startTime) + "ms");

        ConnectionPool.printPoolStats();
    }
}
```

---

## 11. Database Utilities Class

### Comprehensive Database Utility

```java
import java.sql.*;
import java.util.*;

public class DatabaseUtils {

    // Execute SELECT query and return ResultSet as List of Maps
    public static List<Map<String, Object>> executeQuery(String sql, Object... params) {
        List<Map<String, Object>> results = new ArrayList<>();

        try (Connection conn = ConnectionPool.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            // Set parameters
            setParameters(pstmt, params);

            // Execute query
            ResultSet rs = pstmt.executeQuery();
            ResultSetMetaData metaData = rs.getMetaData();
            int columnCount = metaData.getColumnCount();

            // Process results
            while (rs.next()) {
                Map<String, Object> row = new HashMap<>();
                for (int i = 1; i <= columnCount; i++) {
                    String columnName = metaData.getColumnName(i);
                    Object value = rs.getObject(i);
                    row.put(columnName, value);
                }
                results.add(row);
            }

            rs.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return results;
    }

    // Execute UPDATE, INSERT, DELETE
    public static int executeUpdate(String sql, Object... params) {
        int rowsAffected = 0;

        try (Connection conn = ConnectionPool.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            setParameters(pstmt, params);
            rowsAffected = pstmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return rowsAffected;
    }

    // Execute INSERT and return generated key
    public static int executeInsertWithGeneratedKey(String sql, Object... params) {
        int generatedKey = -1;

        try (Connection conn = ConnectionPool.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            setParameters(pstmt, params);
            pstmt.executeUpdate();

            ResultSet rs = pstmt.getGeneratedKeys();
            if (rs.next()) {
                generatedKey = rs.getInt(1);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return generatedKey;
    }

    // Get single value from query
    public static Object getSingleValue(String sql, Object... params) {
        Object result = null;

        try (Connection conn = ConnectionPool.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            setParameters(pstmt, params);
            ResultSet rs = pstmt.executeQuery();

            if (rs.next()) {
                result = rs.getObject(1);
            }

            rs.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return result;
    }

    // Get count
    public static int getCount(String tableName, String whereClause, Object... params) {
        String sql = "SELECT COUNT(*) FROM " + tableName;
        if (whereClause != null && !whereClause.isEmpty()) {
            sql += " WHERE " + whereClause;
        }

        Object result = getSingleValue(sql, params);
        return result != null ? ((Number) result).intValue() : 0;
    }

    // Check if record exists
    public static boolean recordExists(String tableName, String whereClause, Object... params) {
        return getCount(tableName, whereClause, params) > 0;
    }

    // Get single record as Map
    public static Map<String, Object> getSingleRecord(String sql, Object... params) {
        List<Map<String, Object>> results = executeQuery(sql, params);
        return results.isEmpty() ? null : results.get(0);
    }

    // Execute batch operations
    public static int[] executeBatch(String sql, List<Object[]> paramsList) {
        int[] results = null;

        try (Connection conn = ConnectionPool.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            conn.setAutoCommit(false);

            for (Object[] params : paramsList) {
                setParameters(pstmt, params);
                pstmt.addBatch();
            }

            results = pstmt.executeBatch();
            conn.commit();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return results;
    }

    // Helper method to set parameters
    private static void setParameters(PreparedStatement pstmt, Object... params) throws SQLException {
        for (int i = 0; i < params.length; i++) {
            Object param = params[i];

            if (param == null) {
                pstmt.setNull(i + 1, Types.NULL);
            } else if (param instanceof String) {
                pstmt.setString(i + 1, (String) param);
            } else if (param instanceof Integer) {
                pstmt.setInt(i + 1, (Integer) param);
            } else if (param instanceof Long) {
                pstmt.setLong(i + 1, (Long) param);
            } else if (param instanceof Double) {
                pstmt.setDouble(i + 1, (Double) param);
            } else if (param instanceof Boolean) {
                pstmt.setBoolean(i + 1, (Boolean) param);
            } else if (param instanceof Date) {
                pstmt.setDate(i + 1, (Date) param);
            } else if (param instanceof Timestamp) {
                pstmt.setTimestamp(i + 1, (Timestamp) param);
            } else {
                pstmt.setObject(i + 1, param);
            }
        }
    }

    // Transaction support
    public static void executeInTransaction(List<String> queries, List<Object[]> paramsList) {
        Connection conn = null;
        try {
            conn = ConnectionPool.getConnection();
            conn.setAutoCommit(false);

            for (int i = 0; i < queries.size(); i++) {
                String sql = queries.get(i);
                Object[] params = i < paramsList.size() ? paramsList.get(i) : new Object[0];

                try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                    setParameters(pstmt, params);
                    pstmt.executeUpdate();
                }
            }

            conn.commit();
            System.out.println("Transaction committed successfully.");

        } catch (SQLException e) {
            if (conn != null) {
                try {
                    conn.rollback();
                    System.out.println("Transaction rolled back due to error.");
                } catch (SQLException ex) {
                    ex.printStackTrace();
                }
            }
            e.printStackTrace();
        } finally {
            if (conn != null) {
                try {
                    conn.setAutoCommit(true);
                    conn.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    // Get table structure
    public static void printTableStructure(String tableName) {
        try (Connection conn = ConnectionPool.getConnection()) {

            DatabaseMetaData metaData = conn.getMetaData();
            ResultSet columns = metaData.getColumns(null, null, tableName, null);

            System.out.println("\n=== Table Structure: " + tableName + " ===");
            while (columns.next()) {
                String columnName = columns.getString("COLUMN_NAME");
                String columnType = columns.getString("TYPE_NAME");
                int columnSize = columns.getInt("COLUMN_SIZE");
                String nullable = columns.getString("IS_NULLABLE");

                System.out.println(columnName + " " + columnType + "(" + columnSize + ") " +
                                   (nullable.equals("YES") ? "NULL" : "NOT NULL"));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```

### Using Database Utils

```java
public class DatabaseUtilsUsage {

    public static void demonstrateUtils() {
        // Get all users
        List<Map<String, Object>> users = DatabaseUtils.executeQuery(
            "SELECT * FROM users WHERE status = ?", "active"
        );
        System.out.println("Total users: " + users.size());

        // Insert user
        int userId = DatabaseUtils.executeInsertWithGeneratedKey(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            "johndoe", "john@test.com", "pass123"
        );
        System.out.println("Created user ID: " + userId);

        // Get single value
        Object count = DatabaseUtils.getSingleValue(
            "SELECT COUNT(*) FROM users WHERE status = ?", "active"
        );
        System.out.println("Active users count: " + count);

        // Check if exists
        boolean exists = DatabaseUtils.recordExists(
            "users", "username = ?", "johndoe"
        );
        System.out.println("User exists: " + exists);

        // Update user
        int rowsUpdated = DatabaseUtils.executeUpdate(
            "UPDATE users SET email = ? WHERE username = ?",
            "newemail@test.com", "johndoe"
        );
        System.out.println("Rows updated: " + rowsUpdated);

        // Get single record
        Map<String, Object> user = DatabaseUtils.getSingleRecord(
            "SELECT * FROM users WHERE username = ?", "johndoe"
        );
        System.out.println("User details: " + user);

        // Batch insert
        List<Object[]> batchParams = Arrays.asList(
            new Object[]{"user1", "user1@test.com", "pass1"},
            new Object[]{"user2", "user2@test.com", "pass2"},
            new Object[]{"user3", "user3@test.com", "pass3"}
        );

        int[] results = DatabaseUtils.executeBatch(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            batchParams
        );
        System.out.println("Batch insert results: " + Arrays.toString(results));
    }
}
```

---

## 12. Integrating Database Testing with Selenium

### Test Base Class with Database Support

```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.*;

public class BaseTest {

    protected WebDriver driver;

    @BeforeSuite
    public void setupDatabase() {
        System.out.println("Setting up database connection pool...");
        // Connection pool is initialized in static block
        ConnectionPool.printPoolStats();
    }

    @AfterSuite
    public void teardownDatabase() {
        System.out.println("Closing database connection pool...");
        ConnectionPool.closePool();
    }

    @BeforeClass
    public void setupTestData() {
        System.out.println("Setting up test data for class: " + this.getClass().getSimpleName());
        // Override in test classes to setup specific test data
    }

    @AfterClass
    public void cleanupTestData() {
        System.out.println("Cleaning up test data for class: " + this.getClass().getSimpleName());
        // Override in test classes to cleanup specific test data
    }

    @BeforeMethod
    public void setupBrowser() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

    @AfterMethod
    public void closeBrowser() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

### User Registration Test with Database Validation

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.testng.Assert;
import org.testng.annotations.Test;
import java.util.Map;

public class UserRegistrationTest extends BaseTest {

    private String testUsername = "testuser_" + System.currentTimeMillis();
    private String testEmail = testUsername + "@test.com";
    private String testPassword = "Test@123";

    @Test
    public void testUserRegistration() {
        // Pre-condition: Verify user doesn't exist
        boolean userExistsBefore = DatabaseUtils.recordExists(
            "users", "username = ?", testUsername
        );
        Assert.assertFalse(userExistsBefore, "User should not exist before registration");

        // Navigate to registration page
        driver.get("https://example.com/register");

        // Fill registration form
        driver.findElement(By.id("username")).sendKeys(testUsername);
        driver.findElement(By.id("email")).sendKeys(testEmail);
        driver.findElement(By.id("password")).sendKeys(testPassword);
        driver.findElement(By.id("confirmPassword")).sendKeys(testPassword);
        driver.findElement(By.id("submitBtn")).click();

        // Wait for registration to complete
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Database validation: Verify user created
        Map<String, Object> user = DatabaseUtils.getSingleRecord(
            "SELECT * FROM users WHERE username = ?", testUsername
        );

        Assert.assertNotNull(user, "User should be created in database");
        Assert.assertEquals(user.get("username"), testUsername);
        Assert.assertEquals(user.get("email"), testEmail);
        Assert.assertEquals(user.get("status"), "active");
        Assert.assertNotNull(user.get("created_at"));

        System.out.println("User registered successfully with ID: " + user.get("id"));
    }

    @AfterClass
    @Override
    public void cleanupTestData() {
        // Cleanup test user
        DatabaseUtils.executeUpdate("DELETE FROM users WHERE username = ?", testUsername);
        System.out.println("Test user cleaned up: " + testUsername);
    }
}
```

### Order Management Test with Database Validation

```java
import org.openqa.selenium.By;
import org.testng.Assert;
import org.testng.annotations.Test;
import java.util.List;
import java.util.Map;

public class OrderManagementTest extends BaseTest {

    private int testUserId;
    private String orderNumber;

    @BeforeClass
    @Override
    public void setupTestData() {
        // Create test user in database
        testUserId = DatabaseUtils.executeInsertWithGeneratedKey(
            "INSERT INTO users (username, email, password, status) VALUES (?, ?, ?, ?)",
            "ordertest_user", "ordertest@test.com", "Test@123", "active"
        );
        System.out.println("Test user created with ID: " + testUserId);
    }

    @Test(priority = 1)
    public void testCreateOrder() {
        // Login and create order through UI
        driver.get("https://example.com/login");
        driver.findElement(By.id("username")).sendKeys("ordertest_user");
        driver.findElement(By.id("password")).sendKeys("Test@123");
        driver.findElement(By.id("loginBtn")).click();

        // Navigate to products and add to cart
        driver.get("https://example.com/products");
        driver.findElement(By.className("add-to-cart")).click();

        // Proceed to checkout
        driver.findElement(By.id("checkoutBtn")).click();
        driver.findElement(By.id("placeOrderBtn")).click();

        // Wait for order creation
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Database validation: Get latest order
        Map<String, Object> order = DatabaseUtils.getSingleRecord(
            "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC LIMIT 1",
            testUserId
        );

        Assert.assertNotNull(order, "Order should be created in database");
        orderNumber = (String) order.get("order_number");
        Assert.assertNotNull(orderNumber);
        Assert.assertEquals(order.get("status"), "pending");

        System.out.println("Order created: " + orderNumber);
    }

    @Test(priority = 2, dependsOnMethods = "testCreateOrder")
    public void testOrderItems() {
        // Validate order items in database
        List<Map<String, Object>> orderItems = DatabaseUtils.executeQuery(
            "SELECT * FROM order_items WHERE order_id = " +
            "(SELECT id FROM orders WHERE order_number = ?)",
            orderNumber
        );

        Assert.assertFalse(orderItems.isEmpty(), "Order should have items");

        // Validate total amount
        Double calculatedTotal = orderItems.stream()
            .mapToDouble(item -> ((Number) item.get("quantity")).doubleValue() *
                                ((Number) item.get("price")).doubleValue())
            .sum();

        Double dbTotal = (Double) DatabaseUtils.getSingleValue(
            "SELECT total_amount FROM orders WHERE order_number = ?",
            orderNumber
        );

        Assert.assertEquals(calculatedTotal, dbTotal, 0.01, "Total amount should match");
    }

    @Test(priority = 3, dependsOnMethods = "testCreateOrder")
    public void testUpdateOrderStatus() {
        // Update order status to 'processing'
        int rowsUpdated = DatabaseUtils.executeUpdate(
            "UPDATE orders SET status = ? WHERE order_number = ?",
            "processing", orderNumber
        );

        Assert.assertEquals(rowsUpdated, 1, "Order status should be updated");

        // Verify in UI
        driver.get("https://example.com/orders/" + orderNumber);
        String statusText = driver.findElement(By.className("order-status")).getText();

        Assert.assertEquals(statusText, "Processing");
    }

    @AfterClass
    @Override
    public void cleanupTestData() {
        // Cleanup order items first (foreign key)
        DatabaseUtils.executeUpdate(
            "DELETE FROM order_items WHERE order_id IN " +
            "(SELECT id FROM orders WHERE user_id = ?)",
            testUserId
        );

        // Cleanup orders
        DatabaseUtils.executeUpdate("DELETE FROM orders WHERE user_id = ?", testUserId);

        // Cleanup user
        DatabaseUtils.executeUpdate("DELETE FROM users WHERE id = ?", testUserId);

        System.out.println("Test data cleaned up for user ID: " + testUserId);
    }
}
```

---

## 13. TestNG Integration with Database Validation

### Data Provider from Database

```java
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;
import java.util.List;
import java.util.Map;

public class DataDrivenDatabaseTest extends BaseTest {

    @DataProvider(name = "usersFromDB")
    public Object[][] getUsersFromDatabase() {
        List<Map<String, Object>> users = DatabaseUtils.executeQuery(
            "SELECT username, email FROM users WHERE status = ? LIMIT 5",
            "active"
        );

        Object[][] data = new Object[users.size()][2];
        for (int i = 0; i < users.size(); i++) {
            Map<String, Object> user = users.get(i);
            data[i][0] = user.get("username");
            data[i][1] = user.get("email");
        }

        return data;
    }

    @Test(dataProvider = "usersFromDB")
    public void testUserLogin(String username, String email) {
        System.out.println("Testing login for: " + username + " (" + email + ")");

        driver.get("https://example.com/login");
        driver.findElement(By.id("username")).sendKeys(username);
        driver.findElement(By.id("password")).sendKeys("Test@123");
        driver.findElement(By.id("loginBtn")).click();

        // Validate login success
        // Add assertions here
    }

    @DataProvider(name = "testProducts")
    public Object[][] getTestProducts() {
        List<Map<String, Object>> products = DatabaseUtils.executeQuery(
            "SELECT product_id, product_name, price FROM products WHERE status = 'active' LIMIT 10"
        );

        Object[][] data = new Object[products.size()][3];
        for (int i = 0; i < products.size(); i++) {
            Map<String, Object> product = products.get(i);
            data[i][0] = product.get("product_id");
            data[i][1] = product.get("product_name");
            data[i][2] = product.get("price");
        }

        return data;
    }

    @Test(dataProvider = "testProducts")
    public void testProductDisplay(int productId, String productName, double price) {
        driver.get("https://example.com/product/" + productId);

        String displayedName = driver.findElement(By.className("product-name")).getText();
        String displayedPrice = driver.findElement(By.className("product-price")).getText();

        Assert.assertEquals(displayedName, productName);
        Assert.assertTrue(displayedPrice.contains(String.valueOf(price)));

        System.out.println("Product validated: " + productName);
    }
}
```

### Custom TestNG Listener with Database Logging

```java
import org.testng.*;

public class DatabaseTestListener implements ITestListener {

    @Override
    public void onTestStart(ITestResult result) {
        String testName = result.getMethod().getMethodName();
        String className = result.getTestClass().getName();

        // Log test start in database
        DatabaseUtils.executeInsert(
            "INSERT INTO test_execution_log (test_class, test_method, status, start_time) " +
            "VALUES (?, ?, ?, ?)",
            className, testName, "RUNNING", new Timestamp(System.currentTimeMillis())
        );
    }

    @Override
    public void onTestSuccess(ITestResult result) {
        String testName = result.getMethod().getMethodName();
        String className = result.getTestClass().getName();
        long duration = result.getEndMillis() - result.getStartMillis();

        // Update test status in database
        DatabaseUtils.executeUpdate(
            "UPDATE test_execution_log SET status = ?, end_time = ?, duration = ? " +
            "WHERE test_class = ? AND test_method = ? AND status = 'RUNNING'",
            "PASSED", new Timestamp(result.getEndMillis()), duration, className, testName
        );
    }

    @Override
    public void onTestFailure(ITestResult result) {
        String testName = result.getMethod().getMethodName();
        String className = result.getTestClass().getName();
        String errorMessage = result.getThrowable().getMessage();
        long duration = result.getEndMillis() - result.getStartMillis();

        // Update test status with error details
        DatabaseUtils.executeUpdate(
            "UPDATE test_execution_log SET status = ?, end_time = ?, duration = ?, error_message = ? " +
            "WHERE test_class = ? AND test_method = ? AND status = 'RUNNING'",
            "FAILED", new Timestamp(result.getEndMillis()), duration, errorMessage, className, testName
        );
    }

    @Override
    public void onTestSkipped(ITestResult result) {
        String testName = result.getMethod().getMethodName();
        String className = result.getTestClass().getName();

        DatabaseUtils.executeUpdate(
            "UPDATE test_execution_log SET status = ? WHERE test_class = ? AND test_method = ?",
            "SKIPPED", className, testName
        );
    }
}
```

---

## 14. Best Practices for Database Testing

### 1. Connection Management

```java
public class BestPracticeExamples {

    // GOOD: Use try-with-resources
    public void goodConnectionManagement() {
        String sql = "SELECT * FROM users";

        try (Connection conn = ConnectionPool.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {

            while (rs.next()) {
                // Process results
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        // All resources automatically closed
    }

    // BAD: Manual resource management
    public void badConnectionManagement() {
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try {
            conn = ConnectionPool.getConnection();
            pstmt = conn.prepareStatement("SELECT * FROM users");
            rs = pstmt.executeQuery();

            while (rs.next()) {
                // Process results
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // Error-prone cleanup
            try {
                if (rs != null) rs.close();
                if (pstmt != null) pstmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
```

### 2. SQL Query Best Practices

```java
public class QueryBestPractices {

    // GOOD: Use PreparedStatement
    public void goodQuery(String username) {
        String sql = "SELECT * FROM users WHERE username = ?";

        try (Connection conn = ConnectionPool.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, username);
            ResultSet rs = pstmt.executeQuery();

            // Process results

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // BAD: SQL Injection vulnerability
    public void badQuery(String username) {
        String sql = "SELECT * FROM users WHERE username = '" + username + "'";
        // If username = "admin' OR '1'='1", this will return all users!

        try (Connection conn = ConnectionPool.getConnection();
             Statement stmt = conn.createStatement()) {

            ResultSet rs = stmt.executeQuery(sql);
            // Process results

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```

### 3. Test Data Isolation

```java
public class TestDataIsolation {

    // GOOD: Use unique identifiers
    @Test
    public void testWithUniqueData() {
        String uniqueId = "test_" + System.currentTimeMillis();
        String username = "user_" + uniqueId;
        String email = username + "@test.com";

        // Create test data
        DatabaseUtils.executeInsert(
            "INSERT INTO users (username, email) VALUES (?, ?)",
            username, email
        );

        // Run test
        // ...

        // Cleanup
        DatabaseUtils.executeUpdate("DELETE FROM users WHERE username = ?", username);
    }

    // GOOD: Use transactions for rollback
    @Test
    public void testWithTransaction() {
        Connection conn = null;
        try {
            conn = ConnectionPool.getConnection();
            conn.setAutoCommit(false);

            // Create test data
            try (PreparedStatement pstmt = conn.prepareStatement(
                "INSERT INTO users (username, email) VALUES (?, ?)")) {
                pstmt.setString(1, "testuser");
                pstmt.setString(2, "test@test.com");
                pstmt.executeUpdate();
            }

            // Run test
            // ...

            // Rollback - no cleanup needed
            conn.rollback();

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if (conn != null) {
                try {
                    conn.setAutoCommit(true);
                    conn.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
```

### 4. Performance Optimization

```java
public class PerformanceOptimization {

    // GOOD: Use batch operations
    public void goodBatchInsert(List<User> users) {
        String sql = "INSERT INTO users (username, email) VALUES (?, ?)";

        try (Connection conn = ConnectionPool.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            conn.setAutoCommit(false);

            for (User user : users) {
                pstmt.setString(1, user.getUsername());
                pstmt.setString(2, user.getEmail());
                pstmt.addBatch();
            }

            pstmt.executeBatch();
            conn.commit();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // BAD: Individual inserts
    public void badIndividualInserts(List<User> users) {
        String sql = "INSERT INTO users (username, email) VALUES (?, ?)";

        for (User user : users) {
            try (Connection conn = ConnectionPool.getConnection();
                 PreparedStatement pstmt = conn.prepareStatement(sql)) {

                pstmt.setString(1, user.getUsername());
                pstmt.setString(2, user.getEmail());
                pstmt.executeUpdate();

            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
```

### Key Best Practices Summary

```
✓ Always use PreparedStatement (never concatenate SQL)
✓ Use connection pooling (HikariCP)
✓ Close resources with try-with-resources
✓ Use unique test data identifiers
✓ Clean up test data after execution
✓ Use transactions for complex operations
✓ Implement proper error handling
✓ Use batch operations for multiple inserts/updates
✓ Validate database state before and after tests
✓ Keep database credentials secure
✓ Use separate test database (never use production)
✓ Implement retry logic for transient failures
✓ Log database operations for debugging
✓ Use database constraints to ensure data integrity
✓ Test with realistic data volumes
```

---

## 15. Common Challenges and Solutions

### Challenge 1: Connection Leaks

```java
public class ConnectionLeakSolution {

    // Problem: Connection not closed
    public void connectionLeak() {
        try {
            Connection conn = ConnectionPool.getConnection();
            PreparedStatement pstmt = conn.prepareStatement("SELECT * FROM users");
            ResultSet rs = pstmt.executeQuery();

            // If exception occurs here, resources not closed!

        } catch (SQLException e) {
            e.printStackTrace();
        }
        // Connection leaked!
    }

    // Solution: Use try-with-resources
    public void noConnectionLeak() {
        try (Connection conn = ConnectionPool.getConnection();
             PreparedStatement pstmt = conn.prepareStatement("SELECT * FROM users");
             ResultSet rs = pstmt.executeQuery()) {

            // Process results

        } catch (SQLException e) {
            e.printStackTrace();
        }
        // Resources automatically closed
    }
}
```

### Challenge 2: Test Data Conflicts

```java
public class TestDataConflicts {

    // Problem: Hard-coded test data
    @Test
    public void testWithHardcodedData() {
        String username = "testuser"; // Same for all test runs

        // This will fail if user already exists
        DatabaseUtils.executeInsert(
            "INSERT INTO users (username, email) VALUES (?, ?)",
            username, "test@test.com"
        );
    }

    // Solution: Dynamic unique data
    @Test
    public void testWithUniqueData() {
        String timestamp = String.valueOf(System.currentTimeMillis());
        String username = "testuser_" + timestamp;
        String email = "testuser_" + timestamp + "@test.com";

        DatabaseUtils.executeInsert(
            "INSERT INTO users (username, email) VALUES (?, ?)",
            username, email
        );

        // Cleanup
        DatabaseUtils.executeUpdate("DELETE FROM users WHERE username = ?", username);
    }

    // Alternative: Check and delete before creating
    @Test
    public void testWithCleanup() {
        String username = "testuser";

        // Delete if exists
        DatabaseUtils.executeUpdate("DELETE FROM users WHERE username = ?", username);

        // Now create
        DatabaseUtils.executeInsert(
            "INSERT INTO users (username, email) VALUES (?, ?)",
            username, "test@test.com"
        );

        // Test logic...

        // Cleanup
        DatabaseUtils.executeUpdate("DELETE FROM users WHERE username = ?", username);
    }
}
```

### Challenge 3: Database State Dependencies

```java
public class DatabaseStateDependencies {

    // Problem: Tests depend on specific database state
    @Test
    public void testDependentOnState() {
        // Assumes user with ID 1 exists
        Map<String, Object> user = DatabaseUtils.getSingleRecord(
            "SELECT * FROM users WHERE id = 1"
        );

        // Will fail if user doesn't exist or has different data
        Assert.assertEquals(user.get("username"), "admin");
    }

    // Solution: Setup required state in test
    @Test
    public void testWithStateSetup() {
        // Create test user
        int userId = DatabaseUtils.executeInsertWithGeneratedKey(
            "INSERT INTO users (username, email) VALUES (?, ?)",
            "admin", "admin@test.com"
        );

        // Now test
        Map<String, Object> user = DatabaseUtils.getSingleRecord(
            "SELECT * FROM users WHERE id = ?", userId
        );

        Assert.assertEquals(user.get("username"), "admin");

        // Cleanup
        DatabaseUtils.executeUpdate("DELETE FROM users WHERE id = ?", userId);
    }
}
```

### Challenge 4: Transaction Handling

```java
public class TransactionHandling {

    // Problem: Incomplete transaction
    public void incompleteTransaction() {
        Connection conn = null;
        try {
            conn = ConnectionPool.getConnection();
            conn.setAutoCommit(false);

            // Operation 1
            DatabaseUtils.executeUpdate("UPDATE accounts SET balance = balance - 100 WHERE id = 1");

            // If error occurs here, first operation is not rolled back!

            // Operation 2
            DatabaseUtils.executeUpdate("UPDATE accounts SET balance = balance + 100 WHERE id = 2");

            conn.commit();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Solution: Proper transaction handling
    public void properTransaction() {
        Connection conn = null;
        try {
            conn = ConnectionPool.getConnection();
            conn.setAutoCommit(false);

            try {
                // Operation 1
                try (PreparedStatement pstmt1 = conn.prepareStatement(
                    "UPDATE accounts SET balance = balance - ? WHERE id = ?")) {
                    pstmt1.setDouble(1, 100.0);
                    pstmt1.setInt(2, 1);
                    pstmt1.executeUpdate();
                }

                // Operation 2
                try (PreparedStatement pstmt2 = conn.prepareStatement(
                    "UPDATE accounts SET balance = balance + ? WHERE id = ?")) {
                    pstmt2.setDouble(1, 100.0);
                    pstmt2.setInt(2, 2);
                    pstmt2.executeUpdate();
                }

                conn.commit();
                System.out.println("Transaction completed successfully");

            } catch (SQLException e) {
                conn.rollback();
                System.out.println("Transaction rolled back");
                throw e;
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if (conn != null) {
                try {
                    conn.setAutoCommit(true);
                    conn.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
```

---

## 16. Security Considerations

### 1. Credential Management

```java
public class SecureCredentialManagement {

    // BAD: Hardcoded credentials
    public static final String BAD_PASSWORD = "mypassword123";

    // GOOD: Load from properties file
    public static class DatabaseCredentials {
        private static Properties props;

        static {
            props = new Properties();
            try {
                props.load(new FileInputStream("config/database.properties"));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        public static String getUrl() {
            return props.getProperty("db.url");
        }

        public static String getUsername() {
            return props.getProperty("db.username");
        }

        public static String getPassword() {
            return props.getProperty("db.password");
        }
    }

    // BETTER: Load from environment variables
    public static class EnvironmentCredentials {
        public static String getUrl() {
            return System.getenv("DB_URL");
        }

        public static String getUsername() {
            return System.getenv("DB_USERNAME");
        }

        public static String getPassword() {
            return System.getenv("DB_PASSWORD");
        }
    }

    // BEST: Use secure vault (HashiCorp Vault, AWS Secrets Manager, etc.)
    public static class VaultCredentials {
        public static String getPassword() {
            // Fetch from secure vault
            // return VaultClient.getSecret("database/password");
            return "fetched-from-vault";
        }
    }
}
```

### 2. SQL Injection Prevention

```java
public class SQLInjectionPrevention {

    // VULNERABLE: SQL Injection
    public void vulnerableQuery(String username) {
        String sql = "SELECT * FROM users WHERE username = '" + username + "'";
        // If username = "admin' OR '1'='1' --", returns all users!
    }

    // SECURE: PreparedStatement
    public void secureQuery(String username) {
        String sql = "SELECT * FROM users WHERE username = ?";

        try (Connection conn = ConnectionPool.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, username);
            ResultSet rs = pstmt.executeQuery();

            // Safe from SQL injection

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Input validation
    public boolean isValidUsername(String username) {
        // Only allow alphanumeric and underscore
        return username != null && username.matches("^[a-zA-Z0-9_]+$");
    }

    public void secureQueryWithValidation(String username) {
        if (!isValidUsername(username)) {
            throw new IllegalArgumentException("Invalid username format");
        }

        secureQuery(username);
    }
}
```

### 3. Database Access Control

```java
public class DatabaseAccessControl {

    // Use read-only user for SELECT operations
    public static Connection getReadOnlyConnection() throws SQLException {
        String url = DatabaseCredentials.getUrl();
        String user = "readonly_user";
        String password = "readonly_password";

        Connection conn = DriverManager.getConnection(url, user, password);
        conn.setReadOnly(true);

        return conn;
    }

    // Use limited-privilege user for test automation
    public static Connection getTestAutomationConnection() throws SQLException {
        // This user should only have access to test database
        // and limited permissions (no DROP, ALTER, etc.)
        String url = "jdbc:mysql://localhost:3306/test_db";
        String user = "test_automation_user";
        String password = System.getenv("TEST_DB_PASSWORD");

        return DriverManager.getConnection(url, user, password);
    }
}
```

### 4. Sensitive Data Handling

```java
public class SensitiveDataHandling {

    // Don't log sensitive data
    public void secureLogging(String username, String password) {
        // BAD
        System.out.println("Login attempt: " + username + " / " + password);

        // GOOD
        System.out.println("Login attempt for user: " + username);
    }

    // Mask sensitive data in logs
    public static String maskEmail(String email) {
        if (email == null || !email.contains("@")) {
            return email;
        }

        String[] parts = email.split("@");
        String username = parts[0];
        String masked = username.substring(0, Math.min(2, username.length())) + "***";

        return masked + "@" + parts[1];
    }

    // Don't return passwords in queries
    public Map<String, Object> getUserSecurely(String username) {
        // GOOD: Don't select password field
        String sql = "SELECT id, username, email, status FROM users WHERE username = ?";

        return DatabaseUtils.getSingleRecord(sql, username);
    }
}
```

---

## 17. Complete Database Testing Framework

### Framework Structure

```
src/
├── main/
│   └── java/
│       └── com/automation/database/
│           ├── config/
│           │   ├── DatabaseConfig.java
│           │   └── ConnectionPool.java
│           ├── utils/
│           │   ├── DatabaseUtils.java
│           │   ├── QueryBuilder.java
│           │   └── TestDataManager.java
│           └── models/
│               ├── User.java
│               └── Order.java
└── test/
    └── java/
        └── com/automation/tests/
            ├── base/
            │   └── BaseTest.java
            ├── database/
            │   ├── UserDatabaseTest.java
            │   └── OrderDatabaseTest.java
            └── integration/
                └── EndToEndTest.java
```

### Query Builder Utility

```java
public class QueryBuilder {

    private StringBuilder query;
    private List<Object> parameters;

    public QueryBuilder() {
        this.query = new StringBuilder();
        this.parameters = new ArrayList<>();
    }

    public QueryBuilder select(String... columns) {
        query.append("SELECT ");
        query.append(columns.length == 0 ? "*" : String.join(", ", columns));
        return this;
    }

    public QueryBuilder from(String table) {
        query.append(" FROM ").append(table);
        return this;
    }

    public QueryBuilder where(String condition, Object... params) {
        query.append(" WHERE ").append(condition);
        parameters.addAll(Arrays.asList(params));
        return this;
    }

    public QueryBuilder and(String condition, Object... params) {
        query.append(" AND ").append(condition);
        parameters.addAll(Arrays.asList(params));
        return this;
    }

    public QueryBuilder or(String condition, Object... params) {
        query.append(" OR ").append(condition);
        parameters.addAll(Arrays.asList(params));
        return this;
    }

    public QueryBuilder orderBy(String column, String direction) {
        query.append(" ORDER BY ").append(column).append(" ").append(direction);
        return this;
    }

    public QueryBuilder limit(int limit) {
        query.append(" LIMIT ").append(limit);
        return this;
    }

    public String getQuery() {
        return query.toString();
    }

    public Object[] getParameters() {
        return parameters.toArray();
    }

    public List<Map<String, Object>> execute() {
        return DatabaseUtils.executeQuery(getQuery(), getParameters());
    }

    // Usage example
    public static void main(String[] args) {
        // Build and execute query
        List<Map<String, Object>> results = new QueryBuilder()
            .select("id", "username", "email")
            .from("users")
            .where("status = ?", "active")
            .and("created_at > ?", "2024-01-01")
            .orderBy("created_at", "DESC")
            .limit(10)
            .execute();

        System.out.println("Found " + results.size() + " users");
    }
}
```

### Test Data Manager

```java
public class TestDataManager {

    private static final String TEST_DATA_PREFIX = "TEST_";
    private static List<String> createdUsernames = new ArrayList<>();
    private static List<String> createdOrderNumbers = new ArrayList<>();

    // User management
    public static int createTestUser(String username, String email) {
        String testUsername = TEST_DATA_PREFIX + username;

        int userId = DatabaseUtils.executeInsertWithGeneratedKey(
            "INSERT INTO users (username, email, password, status, created_at) " +
            "VALUES (?, ?, ?, ?, ?)",
            testUsername, email, "Test@123", "active",
            new Timestamp(System.currentTimeMillis())
        );

        createdUsernames.add(testUsername);
        System.out.println("Created test user: " + testUsername + " (ID: " + userId + ")");

        return userId;
    }

    public static User getTestUser(String username) {
        String testUsername = TEST_DATA_PREFIX + username;

        Map<String, Object> userData = DatabaseUtils.getSingleRecord(
            "SELECT * FROM users WHERE username = ?", testUsername
        );

        if (userData == null) {
            return null;
        }

        User user = new User();
        user.setId((Integer) userData.get("id"));
        user.setUsername((String) userData.get("username"));
        user.setEmail((String) userData.get("email"));
        user.setStatus((String) userData.get("status"));

        return user;
    }

    // Order management
    public static String createTestOrder(int userId, double amount) {
        String orderNumber = TEST_DATA_PREFIX + "ORD_" + System.currentTimeMillis();

        DatabaseUtils.executeInsert(
            "INSERT INTO orders (user_id, order_number, total_amount, status, created_at) " +
            "VALUES (?, ?, ?, ?, ?)",
            userId, orderNumber, amount, "pending",
            new Timestamp(System.currentTimeMillis())
        );

        createdOrderNumbers.add(orderNumber);
        System.out.println("Created test order: " + orderNumber);

        return orderNumber;
    }

    // Cleanup all test data
    public static void cleanupAllTestData() {
        System.out.println("Cleaning up all test data...");

        // Cleanup orders
        for (String orderNumber : createdOrderNumbers) {
            DatabaseUtils.executeUpdate(
                "DELETE FROM order_items WHERE order_id = (SELECT id FROM orders WHERE order_number = ?)",
                orderNumber
            );
            DatabaseUtils.executeUpdate(
                "DELETE FROM orders WHERE order_number = ?",
                orderNumber
            );
        }

        // Cleanup users
        for (String username : createdUsernames) {
            DatabaseUtils.executeUpdate(
                "DELETE FROM users WHERE username = ?",
                username
            );
        }

        createdUsernames.clear();
        createdOrderNumbers.clear();

        System.out.println("Test data cleanup completed.");
    }

    // Generate bulk test data
    public static List<Integer> createBulkTestUsers(int count) {
        List<Integer> userIds = new ArrayList<>();

        for (int i = 1; i <= count; i++) {
            String username = "bulkuser_" + i + "_" + System.currentTimeMillis();
            String email = username + "@test.com";
            int userId = createTestUser(username, email);
            userIds.add(userId);
        }

        System.out.println("Created " + count + " bulk test users");
        return userIds;
    }
}
```

---

## 18. Practical Exercises

### Exercise 1: Basic Database Operations

Create a test class that:
1. Connects to a database
2. Creates a test user
3. Retrieves the user details
4. Updates the user's email
5. Verifies the update
6. Deletes the user
7. Verifies deletion

### Exercise 2: E-commerce Order Flow

Implement tests for:
1. Create a new user in the database
2. Create a new order for the user
3. Add multiple items to the order
4. Calculate and verify the total amount
5. Update order status to "processing"
6. Verify order details in database
7. Clean up all test data

### Exercise 3: Data-Driven Testing

1. Create a data provider that reads user credentials from database
2. Use the credentials to test login functionality
3. Validate successful logins in database (login_history table)
4. Generate a report of test results

### Exercise 4: Database Performance Testing

1. Implement connection pooling with HikariCP
2. Create a test that executes 1000 queries
3. Measure execution time with and without connection pooling
4. Compare and report the performance difference

### Exercise 5: Transaction Testing

1. Create a banking scenario with two accounts
2. Implement a money transfer operation
3. Test successful transaction (money deducted and added correctly)
4. Test failed transaction (ensure rollback works)
5. Verify database consistency

### Exercise 6: Integration Test

1. Register a user through UI
2. Validate user creation in database
3. Login with the created user
4. Create an order through UI
5. Validate order details in database
6. Update order status in database
7. Verify status change reflects in UI
8. Clean up all test data

---

## 19. Key Takeaways

1. **Database testing is essential** for complete test coverage in automation frameworks

2. **JDBC provides standardized API** for Java applications to interact with databases

3. **PreparedStatement is crucial** for preventing SQL injection and improving performance

4. **Connection pooling significantly improves** test execution performance

5. **Always close database resources** using try-with-resources pattern

6. **Test data management is critical** - setup before tests, cleanup after tests

7. **Use unique identifiers** (timestamps, UUIDs) to avoid test data conflicts

8. **Database validation complements UI testing** by verifying backend state

9. **Transactions ensure data consistency** in multi-step operations

10. **Different databases have different SQL syntax** - abstract database-specific code

11. **Security is paramount** - never hardcode credentials, prevent SQL injection

12. **Connection leaks cause serious issues** - always ensure proper resource cleanup

13. **Batch operations improve performance** for multiple inserts/updates

14. **ResultSet provides flexible data access** with various navigation methods

15. **Database utilities reduce code duplication** and improve maintainability

16. **Integration with TestNG enables** data-driven and comprehensive testing

17. **Test data isolation prevents** test interference and flakiness

18. **Proper error handling and logging** are essential for debugging

19. **Connection pooling configuration** should be tuned based on test load

20. **Regular cleanup of test data** prevents database bloat and conflicts

---

## 20. Interview Questions

### Basic Questions

1. **What is JDBC and why is it used in test automation?**
   - Java Database Connectivity API for database interaction
   - Used for test data setup, validation, and cleanup
   - Enables direct database verification bypassing UI

2. **What is the difference between Statement and PreparedStatement?**
   - PreparedStatement is pre-compiled and more efficient
   - PreparedStatement prevents SQL injection
   - PreparedStatement is better for parameterized queries

3. **Explain the JDBC architecture.**
   - JDBC API layer (java.sql package)
   - JDBC Driver Manager
   - JDBC Driver (database-specific)
   - Database

4. **What are the steps to connect to a database using JDBC?**
   - Load JDBC driver (optional for JDBC 4.0+)
   - Create connection using DriverManager
   - Create Statement/PreparedStatement
   - Execute query
   - Process ResultSet
   - Close resources

5. **What is a ResultSet and how do you navigate through it?**
   - Object containing query results
   - Navigate using next(), previous(), first(), last()
   - Access data using get methods (getString, getInt, etc.)

### Intermediate Questions

6. **How do you prevent SQL injection in JDBC?**
   - Use PreparedStatement instead of Statement
   - Never concatenate user input into SQL strings
   - Validate and sanitize input
   - Use parameterized queries

7. **What is connection pooling and why is it important?**
   - Reusing database connections instead of creating new ones
   - Improves performance significantly
   - Reduces resource consumption
   - Examples: HikariCP, Apache DBCP

8. **How do you handle transactions in JDBC?**
   - Set autoCommit to false
   - Execute multiple operations
   - Commit on success or rollback on failure
   - Restore autoCommit state

9. **What is the difference between executeQuery, executeUpdate, and execute?**
   - executeQuery: For SELECT (returns ResultSet)
   - executeUpdate: For INSERT/UPDATE/DELETE (returns row count)
   - execute: For any SQL (returns boolean)

10. **How do you get auto-generated keys after insert?**
    - Use Statement.RETURN_GENERATED_KEYS flag
    - Call getGeneratedKeys() on PreparedStatement
    - Process returned ResultSet

### Advanced Questions

11. **How would you design a database testing framework?**
    - Connection pool manager
    - Database utility class
    - Test data manager
    - Query builder
    - Integration with test framework (TestNG)
    - Logging and reporting

12. **Explain batch processing in JDBC.**
    - Execute multiple SQL statements in single call
    - Use addBatch() and executeBatch()
    - More efficient than individual executions
    - Must handle partial failures

13. **How do you handle database-specific SQL differences?**
    - Factory pattern for database-specific implementations
    - Configuration-driven SQL selection
    - Database abstraction layer
    - Use ORM frameworks (JPA, Hibernate)

14. **What are the best practices for test data management?**
    - Use unique identifiers
    - Setup before tests, cleanup after
    - Use transactions for rollback
    - Maintain test data isolation
    - Use test data builders/factories

15. **How would you test database performance in automation?**
    - Measure query execution time
    - Test with connection pooling vs without
    - Test batch operations vs individual
    - Monitor connection pool statistics
    - Test with realistic data volumes

---

## Conclusion

Database testing is a critical component of comprehensive test automation. By mastering JDBC, connection management, SQL operations, and integration patterns, you can build robust test frameworks that validate both UI and backend functionality. Remember to follow best practices for security, performance, and test data management to create maintainable and reliable automated tests.

---

## Beginner-Friendly Exercises

### Exercise 1: Setup JDBC Connection and Execute Basic Queries (45 minutes)

**Objective**: Learn to establish a database connection and execute basic SQL queries using JDBC.

**Real-world Scenario**: You're testing a user management system and need to verify that user data is correctly stored in the database after registration through the UI.

**Requirements**:
1. Set up JDBC connection to a database (H2 or MySQL)
2. Create a simple users table with test data
3. Execute SELECT query to retrieve all users
4. Execute SELECT query to find a specific user by ID
5. Print and validate query results

**Code Template**:
```java
package com.automation.database.exercises;

import java.sql.*;
import org.testng.annotations.*;
import static org.testng.Assert.*;

public class Exercise1_BasicJDBC {

    private Connection connection;
    private static final String DB_URL = "jdbc:h2:mem:testdb";
    private static final String DB_USER = "sa";
    private static final String DB_PASSWORD = "";

    @BeforeClass
    public void setupDatabase() throws SQLException {
        // TODO: Establish database connection
        connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);

        // TODO: Create users table
        String createTableSQL = "CREATE TABLE users (" +
            "id INT PRIMARY KEY AUTO_INCREMENT, " +
            "username VARCHAR(50), " +
            "email VARCHAR(100), " +
            "status VARCHAR(20))";

        // Execute create table statement

        // TODO: Insert test data
        String insertSQL = "INSERT INTO users (username, email, status) VALUES (?, ?, ?)";

        // Insert 3 test users
    }

    @Test(priority = 1)
    public void testGetAllUsers() throws SQLException {
        // TODO: Execute SELECT query to get all users
        String query = "SELECT * FROM users";

        // TODO: Create Statement and execute query
        Statement statement = connection.createStatement();
        ResultSet resultSet = statement.executeQuery(query);

        // TODO: Count number of users
        int userCount = 0;
        while (resultSet.next()) {
            userCount++;
            // Print user details
            System.out.println("User ID: " + resultSet.getInt("id"));
            System.out.println("Username: " + resultSet.getString("username"));
            System.out.println("Email: " + resultSet.getString("email"));
            System.out.println("---");
        }

        // TODO: Verify expected number of users
        assertEquals(userCount, 3, "Should have 3 users");

        // TODO: Close resources
    }

    @Test(priority = 2)
    public void testGetUserById() throws SQLException {
        // TODO: Execute SELECT query with WHERE clause
        String query = "SELECT * FROM users WHERE id = ?";

        // TODO: Use PreparedStatement
        PreparedStatement preparedStatement = connection.prepareStatement(query);
        preparedStatement.setInt(1, 1);

        ResultSet resultSet = preparedStatement.executeQuery();

        // TODO: Verify user found
        assertTrue(resultSet.next(), "User with ID 1 should exist");

        // TODO: Validate user data
        String username = resultSet.getString("username");
        assertNotNull(username, "Username should not be null");

        System.out.println("Found user: " + username);

        // TODO: Close resources
    }

    @Test(priority = 3)
    public void testGetUserByEmail() throws SQLException {
        // TODO: Query user by email
        String query = "SELECT * FROM users WHERE email = ?";

        // TODO: Execute query with email parameter

        // TODO: Verify results
        // TODO: Print user details
    }

    @Test(priority = 4)
    public void testCountUsers() throws SQLException {
        // TODO: Execute COUNT query
        String query = "SELECT COUNT(*) as total FROM users";

        // TODO: Get count from result
        // TODO: Verify count equals 3
    }

    @AfterClass
    public void cleanup() throws SQLException {
        // TODO: Close database connection
        if (connection != null && !connection.isClosed()) {
            connection.close();
        }
    }
}
```

**Expected Outcome**:
- Database connection is successfully established
- Users table is created with test data
- SELECT queries retrieve correct data
- PreparedStatement prevents SQL injection
- All query results are properly validated
- Resources are properly closed after use

**Common Mistakes to Avoid**:
1. Not closing ResultSet, Statement, and Connection resources
2. Using Statement instead of PreparedStatement for parameterized queries
3. Not handling SQLException properly
4. Forgetting to close connection in @AfterClass
5. Not validating query results before using data

**Solution Approach (Hints)**:
- Use try-with-resources for automatic resource management
- Always use PreparedStatement for queries with parameters
- Execute: `statement.executeUpdate(createTableSQL)` for DDL
- ResultSet navigation: `while(rs.next())` for multiple rows
- Close in reverse order: ResultSet → Statement → Connection

---

### Exercise 2: Database CRUD Operations with PreparedStatement (50 minutes)

**Objective**: Implement complete CRUD (Create, Read, Update, Delete) operations using PreparedStatement.

**Real-world Scenario**: You need to manage test data for product testing - creating products, updating prices, and cleaning up after tests.

**Requirements**:
1. Create a products table in the database
2. Implement INSERT operation to add products
3. Implement UPDATE operation to modify product data
4. Implement DELETE operation to remove products
5. Validate all operations with SELECT queries

**Code Template**:
```java
package com.automation.database.exercises;

import java.sql.*;
import org.testng.annotations.*;
import static org.testng.Assert.*;

public class Exercise2_CRUDOperations {

    private Connection connection;
    private static final String DB_URL = "jdbc:h2:mem:testdb";
    private static final String DB_USER = "sa";
    private static final String DB_PASSWORD = "";

    @BeforeClass
    public void setupDatabase() throws SQLException {
        // TODO: Establish connection
        connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);

        // TODO: Create products table
        String createTableSQL = "CREATE TABLE products (" +
            "id INT PRIMARY KEY AUTO_INCREMENT, " +
            "name VARCHAR(100), " +
            "price DECIMAL(10,2), " +
            "quantity INT, " +
            "category VARCHAR(50))";

        // Execute create table
    }

    @Test(priority = 1)
    public void testCreateProduct() throws SQLException {
        // TODO: Prepare INSERT statement
        String insertSQL = "INSERT INTO products (name, price, quantity, category) " +
                          "VALUES (?, ?, ?, ?)";

        PreparedStatement pstmt = connection.prepareStatement(insertSQL,
            Statement.RETURN_GENERATED_KEYS);

        // TODO: Set parameters
        pstmt.setString(1, "Laptop");
        pstmt.setDouble(2, 999.99);
        pstmt.setInt(3, 10);
        pstmt.setString(4, "Electronics");

        // TODO: Execute update
        int rowsAffected = pstmt.executeUpdate();

        // TODO: Verify insertion
        assertEquals(rowsAffected, 1, "Should insert 1 row");

        // TODO: Get generated ID
        ResultSet generatedKeys = pstmt.getGeneratedKeys();
        assertTrue(generatedKeys.next(), "Should have generated key");
        int productId = generatedKeys.getInt(1);

        System.out.println("Created product with ID: " + productId);

        // TODO: Verify product exists
        String selectSQL = "SELECT * FROM products WHERE id = ?";
        PreparedStatement selectStmt = connection.prepareStatement(selectSQL);
        selectStmt.setInt(1, productId);

        ResultSet rs = selectStmt.executeQuery();
        assertTrue(rs.next(), "Product should exist");
        assertEquals(rs.getString("name"), "Laptop");

        // TODO: Close resources
    }

    @Test(priority = 2)
    public void testReadProduct() throws SQLException {
        // TODO: Insert a product first
        insertProduct("Mouse", 29.99, 50, "Accessories");

        // TODO: Read the product
        String selectSQL = "SELECT * FROM products WHERE name = ?";

        // TODO: Verify all fields match expected values
    }

    @Test(priority = 3)
    public void testUpdateProduct() throws SQLException {
        // TODO: Insert a product
        int productId = insertProduct("Keyboard", 49.99, 20, "Accessories");

        // TODO: Update product price
        String updateSQL = "UPDATE products SET price = ? WHERE id = ?";
        PreparedStatement pstmt = connection.prepareStatement(updateSQL);
        pstmt.setDouble(1, 39.99);
        pstmt.setInt(2, productId);

        // TODO: Execute update
        int rowsAffected = pstmt.executeUpdate();
        assertEquals(rowsAffected, 1, "Should update 1 row");

        // TODO: Verify update
        String selectSQL = "SELECT price FROM products WHERE id = ?";
        PreparedStatement selectStmt = connection.prepareStatement(selectSQL);
        selectStmt.setInt(1, productId);

        ResultSet rs = selectStmt.executeQuery();
        assertTrue(rs.next());
        assertEquals(rs.getDouble("price"), 39.99, 0.01);

        System.out.println("Product price updated successfully");

        // TODO: Close resources
    }

    @Test(priority = 4)
    public void testDeleteProduct() throws SQLException {
        // TODO: Insert a product
        int productId = insertProduct("Monitor", 299.99, 5, "Electronics");

        // TODO: Delete the product
        String deleteSQL = "DELETE FROM products WHERE id = ?";

        // TODO: Execute delete
        // TODO: Verify deletion (should affect 1 row)

        // TODO: Verify product doesn't exist
        String selectSQL = "SELECT * FROM products WHERE id = ?";

        // TODO: Execute select and verify no results
    }

    @Test(priority = 5)
    public void testBulkInsert() throws SQLException {
        // TODO: Insert multiple products using batch
        String insertSQL = "INSERT INTO products (name, price, quantity, category) " +
                          "VALUES (?, ?, ?, ?)";
        PreparedStatement pstmt = connection.prepareStatement(insertSQL);

        // Add products to batch
        String[] products = {"Product1", "Product2", "Product3"};
        for (int i = 0; i < products.length; i++) {
            pstmt.setString(1, products[i]);
            pstmt.setDouble(2, 10.00 + i);
            pstmt.setInt(3, 10);
            pstmt.setString(4, "Test");
            pstmt.addBatch();
        }

        // TODO: Execute batch
        int[] results = pstmt.executeBatch();

        // TODO: Verify all inserts succeeded
        assertEquals(results.length, 3);

        // TODO: Count products
        String countSQL = "SELECT COUNT(*) FROM products";
        Statement stmt = connection.createStatement();
        ResultSet rs = stmt.executeQuery(countSQL);
        rs.next();
        int count = rs.getInt(1);

        System.out.println("Total products: " + count);

        // TODO: Close resources
    }

    // Helper method
    private int insertProduct(String name, double price, int quantity, String category)
        throws SQLException {
        String insertSQL = "INSERT INTO products (name, price, quantity, category) " +
                          "VALUES (?, ?, ?, ?)";
        PreparedStatement pstmt = connection.prepareStatement(insertSQL,
            Statement.RETURN_GENERATED_KEYS);

        pstmt.setString(1, name);
        pstmt.setDouble(2, price);
        pstmt.setInt(3, quantity);
        pstmt.setString(4, category);

        pstmt.executeUpdate();

        ResultSet rs = pstmt.getGeneratedKeys();
        rs.next();
        int id = rs.getInt(1);

        pstmt.close();
        return id;
    }

    @AfterClass
    public void cleanup() throws SQLException {
        if (connection != null && !connection.isClosed()) {
            connection.close();
        }
    }
}
```

**Expected Outcome**:
- Products table is created successfully
- INSERT operations add products and return generated IDs
- UPDATE operations modify existing products
- DELETE operations remove products
- Batch inserts handle multiple products efficiently
- All operations are validated with SELECT queries

**Common Mistakes to Avoid**:
1. Not using RETURN_GENERATED_KEYS when inserting
2. Forgetting to commit changes in non-autocommit mode
3. Not validating operations with SELECT queries
4. Mixing Statement and PreparedStatement incorrectly
5. Not handling SQLException for each operation

**Solution Approach (Hints)**:
- Use `Statement.RETURN_GENERATED_KEYS` flag for INSERT
- Get generated keys: `pstmt.getGeneratedKeys()`
- Batch operations: `pstmt.addBatch()` then `pstmt.executeBatch()`
- Always validate operations with corresponding SELECT
- Use helper methods to avoid code duplication

---

### Exercise 3: Database Utility Class and Connection Pooling (55 minutes)

**Objective**: Create a reusable DatabaseUtils class with connection pooling for efficient database operations.

**Real-world Scenario**: Your framework needs a centralized database utility that manages connections efficiently and provides reusable methods for common operations.

**Requirements**:
1. Create DatabaseUtils class with connection management
2. Implement connection pooling using HikariCP
3. Create utility methods for SELECT, INSERT, UPDATE, DELETE
4. Implement proper resource management
5. Create tests using the utility class

**Code Template**:

**pom.xml** (add dependency):
```xml
<dependency>
    <groupId>com.zaxxer</groupId>
    <artifactId>HikariCP</artifactId>
    <version>5.0.1</version>
</dependency>
```

**DatabaseUtils.java**:
```java
package com.automation.database.utils;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import java.sql.*;
import java.util.*;

public class DatabaseUtils {

    private static HikariDataSource dataSource;

    // TODO: Initialize connection pool
    static {
        // TODO: Create HikariConfig
        // TODO: Set database properties
        // TODO: Create HikariDataSource
    }

    public static void initializeConnectionPool(String jdbcUrl, String username,
                                               String password) {
        HikariConfig config = new HikariConfig();
        // TODO: Configure connection pool
        config.setJdbcUrl(jdbcUrl);
        config.setUsername(username);
        config.setPassword(password);
        config.setMaximumPoolSize(10);
        config.setMinimumIdle(2);
        config.setConnectionTimeout(30000);

        dataSource = new HikariDataSource(config);
    }

    public static Connection getConnection() throws SQLException {
        // TODO: Return connection from pool
        return dataSource.getConnection();
    }

    public static ResultSet executeQuery(String query, Object... params)
        throws SQLException {
        // TODO: Execute SELECT query with parameters
        // TODO: Return ResultSet
        return null;
    }

    public static int executeUpdate(String query, Object... params)
        throws SQLException {
        // TODO: Execute INSERT/UPDATE/DELETE
        // TODO: Return number of affected rows
        return 0;
    }

    public static int executeInsert(String query, Object... params)
        throws SQLException {
        // TODO: Execute INSERT and return generated ID
        return 0;
    }

    public static List<Map<String, Object>> getResultsAsList(String query,
                                                             Object... params)
        throws SQLException {
        // TODO: Execute query and convert ResultSet to List of Maps
        List<Map<String, Object>> results = new ArrayList<>();

        // TODO: Implement conversion logic

        return results;
    }

    public static Map<String, Object> getSingleResult(String query, Object... params)
        throws SQLException {
        // TODO: Get single row as Map
        List<Map<String, Object>> results = getResultsAsList(query, params);
        return results.isEmpty() ? null : results.get(0);
    }

    public static boolean exists(String query, Object... params) throws SQLException {
        // TODO: Check if record exists
        return false;
    }

    public static int getCount(String query, Object... params) throws SQLException {
        // TODO: Get count from query
        return 0;
    }

    public static void closePool() {
        // TODO: Close connection pool
        if (dataSource != null && !dataSource.isClosed()) {
            dataSource.close();
        }
    }

    // Private helper method to set parameters
    private static void setParameters(PreparedStatement pstmt, Object... params)
        throws SQLException {
        // TODO: Set parameters on PreparedStatement
        for (int i = 0; i < params.length; i++) {
            pstmt.setObject(i + 1, params[i]);
        }
    }
}
```

**Exercise3_DatabaseUtilsTests.java**:
```java
package com.automation.database.exercises;

import com.automation.database.utils.DatabaseUtils;
import org.testng.annotations.*;
import java.sql.*;
import java.util.*;
import static org.testng.Assert.*;

public class Exercise3_DatabaseUtilsTests {

    @BeforeClass
    public void setup() throws SQLException {
        // TODO: Initialize connection pool
        DatabaseUtils.initializeConnectionPool(
            "jdbc:h2:mem:testdb",
            "sa",
            ""
        );

        // TODO: Create test table
        try (Connection conn = DatabaseUtils.getConnection()) {
            String createTableSQL = "CREATE TABLE employees (" +
                "id INT PRIMARY KEY AUTO_INCREMENT, " +
                "name VARCHAR(100), " +
                "email VARCHAR(100), " +
                "salary DECIMAL(10,2), " +
                "department VARCHAR(50))";

            Statement stmt = conn.createStatement();
            stmt.executeUpdate(createTableSQL);
        }
    }

    @Test(priority = 1)
    public void testInsertUsingUtils() throws SQLException {
        // TODO: Insert employee using DatabaseUtils
        String insertSQL = "INSERT INTO employees (name, email, salary, department) " +
                          "VALUES (?, ?, ?, ?)";

        int employeeId = DatabaseUtils.executeInsert(insertSQL,
            "John Doe", "john@example.com", 50000.00, "IT");

        // TODO: Verify insertion
        assertTrue(employeeId > 0, "Should return generated ID");

        // Verify employee exists
        String selectSQL = "SELECT * FROM employees WHERE id = ?";
        Map<String, Object> result = DatabaseUtils.getSingleResult(selectSQL, employeeId);

        assertNotNull(result, "Employee should exist");
        assertEquals(result.get("NAME"), "John Doe");
    }

    @Test(priority = 2)
    public void testGetResultsAsList() throws SQLException {
        // TODO: Insert multiple employees
        String insertSQL = "INSERT INTO employees (name, email, salary, department) " +
                          "VALUES (?, ?, ?, ?)";

        DatabaseUtils.executeUpdate(insertSQL, "Alice Smith",
            "alice@example.com", 60000.00, "HR");
        DatabaseUtils.executeUpdate(insertSQL, "Bob Johnson",
            "bob@example.com", 55000.00, "IT");

        // TODO: Get all IT employees
        String selectSQL = "SELECT * FROM employees WHERE department = ?";
        List<Map<String, Object>> results =
            DatabaseUtils.getResultsAsList(selectSQL, "IT");

        // TODO: Verify results
        assertTrue(results.size() >= 1, "Should have at least 1 IT employee");

        // Print results
        for (Map<String, Object> row : results) {
            System.out.println("Employee: " + row.get("NAME") +
                             ", Salary: " + row.get("SALARY"));
        }
    }

    @Test(priority = 3)
    public void testUpdateUsingUtils() throws SQLException {
        // TODO: Insert employee
        String insertSQL = "INSERT INTO employees (name, email, salary, department) " +
                          "VALUES (?, ?, ?, ?)";
        int empId = DatabaseUtils.executeInsert(insertSQL,
            "Charlie Brown", "charlie@example.com", 45000.00, "Sales");

        // TODO: Update salary
        String updateSQL = "UPDATE employees SET salary = ? WHERE id = ?";
        int rowsUpdated = DatabaseUtils.executeUpdate(updateSQL, 50000.00, empId);

        // TODO: Verify update
        assertEquals(rowsUpdated, 1, "Should update 1 row");

        Map<String, Object> result = DatabaseUtils.getSingleResult(
            "SELECT salary FROM employees WHERE id = ?", empId);
        assertEquals(((Number) result.get("SALARY")).doubleValue(), 50000.00, 0.01);
    }

    @Test(priority = 4)
    public void testExistsMethod() throws SQLException {
        // TODO: Test exists method
        boolean exists = DatabaseUtils.exists(
            "SELECT 1 FROM employees WHERE email = ?",
            "john@example.com"
        );

        assertTrue(exists, "Employee with email should exist");

        boolean notExists = DatabaseUtils.exists(
            "SELECT 1 FROM employees WHERE email = ?",
            "nonexistent@example.com"
        );

        assertFalse(notExists, "Non-existent email should return false");
    }

    @Test(priority = 5)
    public void testGetCount() throws SQLException {
        // TODO: Get total employee count
        int totalCount = DatabaseUtils.getCount("SELECT COUNT(*) FROM employees");

        assertTrue(totalCount > 0, "Should have employees");

        // TODO: Get department-specific count
        int itCount = DatabaseUtils.getCount(
            "SELECT COUNT(*) FROM employees WHERE department = ?", "IT");

        System.out.println("Total employees: " + totalCount);
        System.out.println("IT employees: " + itCount);
    }

    @AfterClass
    public void cleanup() {
        // TODO: Close connection pool
        DatabaseUtils.closePool();
    }
}
```

**Expected Outcome**:
- Connection pool is initialized with HikariCP
- DatabaseUtils provides reusable database operations
- All utility methods work correctly
- Results are properly converted to Java objects
- Connection pooling improves performance
- Resources are properly managed

**Common Mistakes to Avoid**:
1. Not configuring connection pool properly
2. Forgetting to close ResultSet in utility methods
3. Not handling null results properly
4. Hardcoding database credentials
5. Not closing the connection pool in cleanup

**Solution Approach (Hints)**:
- Use HikariConfig for connection pool configuration
- Set pool size based on expected load
- Use try-with-resources for automatic resource management
- Convert ResultSet to List<Map<String, Object>> for easier handling
- Store credentials in properties file

---

### Exercise 4: Database Validation with Selenium Tests (60 minutes)

**Objective**: Integrate database validation with Selenium UI tests to verify end-to-end data flow.

**Real-world Scenario**: Test user registration where a user signs up through UI, and you need to verify that the user data is correctly stored in the database.

**Requirements**:
1. Create user registration test using Selenium
2. Validate user data in database after UI registration
3. Set up test data via database before UI test
4. Clean up test data after test execution
5. Verify UI and database data consistency

**Code Template**:
```java
package com.automation.hybrid.exercises;

import com.automation.database.utils.DatabaseUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.*;
import io.github.bonigarcia.wdm.WebDriverManager;
import java.sql.*;
import java.util.Map;
import static org.testng.Assert.*;

public class Exercise4_HybridDatabaseTests {

    private WebDriver driver;
    private String testEmail;

    @BeforeClass
    public void setup() throws SQLException {
        // TODO: Setup WebDriver
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();

        // TODO: Initialize database connection pool
        DatabaseUtils.initializeConnectionPool(
            "jdbc:h2:mem:testdb", "sa", ""
        );

        // TODO: Create users table
        try (Connection conn = DatabaseUtils.getConnection()) {
            String createTableSQL = "CREATE TABLE users (" +
                "id INT PRIMARY KEY AUTO_INCREMENT, " +
                "username VARCHAR(50), " +
                "email VARCHAR(100) UNIQUE, " +
                "password VARCHAR(100), " +
                "created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)";

            Statement stmt = conn.createStatement();
            stmt.executeUpdate(createTableSQL);
        }
    }

    @Test(priority = 1)
    public void testUserRegistrationWithDBValidation() throws SQLException {
        // TODO: Generate unique test data
        testEmail = "testuser" + System.currentTimeMillis() + "@example.com";
        String username = "testuser" + System.currentTimeMillis();
        String password = "Test@123";

        // TODO: In real scenario, navigate to registration page
        // driver.get("https://example.com/register");

        // Simulate registration (in real test, interact with UI)
        System.out.println("Simulating user registration via UI...");

        // TODO: Insert user as if UI did it (simulating backend behavior)
        String insertSQL = "INSERT INTO users (username, email, password) " +
                          "VALUES (?, ?, ?)";
        int userId = DatabaseUtils.executeInsert(insertSQL,
            username, testEmail, password);

        // TODO: Verify user in database
        String selectSQL = "SELECT * FROM users WHERE email = ?";
        Map<String, Object> user = DatabaseUtils.getSingleResult(selectSQL, testEmail);

        // TODO: Validate user data
        assertNotNull(user, "User should exist in database");
        assertEquals(user.get("USERNAME"), username);
        assertEquals(user.get("EMAIL"), testEmail);

        System.out.println("User registered successfully with ID: " + userId);
        System.out.println("Username: " + user.get("USERNAME"));
        System.out.println("Email: " + user.get("EMAIL"));
    }

    @Test(priority = 2, dependsOnMethods = "testUserRegistrationWithDBValidation")
    public void testLoginWithDBCreatedUser() throws SQLException {
        // TODO: Verify user exists before attempting login
        boolean userExists = DatabaseUtils.exists(
            "SELECT 1 FROM users WHERE email = ?", testEmail
        );

        assertTrue(userExists, "User should exist in database");

        // TODO: In real scenario, perform login via UI
        // driver.get("https://example.com/login");
        // loginPage.login(testEmail, "Test@123");

        System.out.println("Simulating login with DB-verified credentials");

        // TODO: Verify login timestamp update (in real scenario)
        String updateSQL = "UPDATE users SET last_login = CURRENT_TIMESTAMP " +
                          "WHERE email = ?";
        int rowsUpdated = DatabaseUtils.executeUpdate(updateSQL, testEmail);

        assertEquals(rowsUpdated, 1, "Should update login timestamp");
    }

    @Test(priority = 3)
    public void testSetupTestDataViaDB() throws SQLException {
        // TODO: Setup test user via database (faster than UI)
        String insertSQL = "INSERT INTO users (username, email, password) " +
                          "VALUES (?, ?, ?)";

        int userId1 = DatabaseUtils.executeInsert(insertSQL,
            "admin_user", "admin@example.com", "Admin@123");
        int userId2 = DatabaseUtils.executeInsert(insertSQL,
            "test_user", "testuser@example.com", "Test@123");

        // TODO: Verify setup
        int userCount = DatabaseUtils.getCount("SELECT COUNT(*) FROM users");
        assertTrue(userCount >= 2, "Should have at least 2 users");

        System.out.println("Test data setup completed");
        System.out.println("Created users: " + userId1 + ", " + userId2);

        // TODO: In real scenario, proceed with UI tests using this data
    }

    @Test(priority = 4)
    public void testUIActionWithDBVerification() throws SQLException {
        // TODO: Create a user
        String email = "actionuser@example.com";
        DatabaseUtils.executeInsert(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            "actionuser", email, "Pass@123"
        );

        // TODO: Simulate UI action (e.g., update profile)
        System.out.println("Simulating profile update via UI...");

        // Update via database (simulating backend)
        String updateSQL = "UPDATE users SET username = ? WHERE email = ?";
        DatabaseUtils.executeUpdate(updateSQL, "updated_user", email);

        // TODO: Verify update in database
        Map<String, Object> user = DatabaseUtils.getSingleResult(
            "SELECT * FROM users WHERE email = ?", email
        );

        assertEquals(user.get("USERNAME"), "updated_user",
            "Username should be updated");

        System.out.println("Profile updated and verified in database");
    }

    @Test(priority = 5)
    public void testDatabaseStateValidation() throws SQLException {
        // TODO: Test complex database state validation

        // 1. Count users by registration date
        String countSQL = "SELECT COUNT(*) FROM users " +
                         "WHERE created_date > CURRENT_TIMESTAMP - INTERVAL '1' HOUR";
        int recentUsers = DatabaseUtils.getCount(countSQL);

        System.out.println("Recent users (last hour): " + recentUsers);

        // 2. Verify no duplicate emails
        String duplicateSQL = "SELECT email, COUNT(*) as count FROM users " +
                             "GROUP BY email HAVING COUNT(*) > 1";
        int duplicates = DatabaseUtils.getCount(duplicateSQL);

        assertEquals(duplicates, 0, "Should have no duplicate emails");

        // 3. Verify all users have required fields
        String invalidSQL = "SELECT COUNT(*) FROM users " +
                           "WHERE username IS NULL OR email IS NULL";
        int invalidUsers = DatabaseUtils.getCount(invalidSQL);

        assertEquals(invalidUsers, 0, "All users should have required fields");
    }

    @AfterMethod
    public void afterEachTest() {
        // TODO: Capture screenshot if test fails
        // In real scenario: if test failed, take screenshot
    }

    @AfterClass
    public void cleanup() throws SQLException {
        // TODO: Delete test users
        if (testEmail != null) {
            DatabaseUtils.executeUpdate("DELETE FROM users WHERE email = ?",
                testEmail);
        }

        // TODO: Clean up all test data
        DatabaseUtils.executeUpdate("DELETE FROM users WHERE email LIKE '%@example.com'");

        // TODO: Close browser
        if (driver != null) {
            driver.quit();
        }

        // TODO: Close database connection pool
        DatabaseUtils.closePool();
    }
}
```

**Expected Outcome**:
- Selenium tests successfully interact with UI
- Database validation confirms UI actions
- Test data setup via database is faster than UI
- Data consistency between UI and database is verified
- Test data is properly cleaned up after execution
- Hybrid approach provides comprehensive validation

**Common Mistakes to Avoid**:
1. Not verifying database state before UI actions
2. Forgetting to clean up test data after tests
3. Not using unique identifiers for test data
4. Hard-coded waits instead of database verification
5. Not handling database connection in test setup/teardown

**Solution Approach (Hints)**:
- Always verify database state before proceeding to UI
- Use timestamps in test data: `System.currentTimeMillis()`
- Query database instead of waiting for UI updates
- Clean up test data in @AfterClass or @AfterMethod
- Use database to setup complex test scenarios faster

---

### Exercise 5: Transaction Management and Data Integrity (50 minutes)

**Objective**: Learn to manage database transactions, handle rollbacks, and ensure data integrity in tests.

**Real-world Scenario**: Test an order processing system where multiple database operations must succeed or fail together (atomicity).

**Requirements**:
1. Implement transaction management with commit/rollback
2. Test successful transaction completion
3. Test transaction rollback on failure
4. Verify data integrity after rollback
5. Implement savepoints for partial rollback

**Code Template**:
```java
package com.automation.database.exercises;

import java.sql.*;
import org.testng.annotations.*;
import static org.testng.Assert.*;

public class Exercise5_TransactionManagement {

    private Connection connection;
    private static final String DB_URL = "jdbc:h2:mem:testdb";

    @BeforeClass
    public void setup() throws SQLException {
        connection = DriverManager.getConnection(DB_URL, "sa", "");

        // TODO: Create tables for order processing
        Statement stmt = connection.createStatement();

        String createOrdersTable = "CREATE TABLE orders (" +
            "id INT PRIMARY KEY AUTO_INCREMENT, " +
            "customer_id INT, " +
            "total_amount DECIMAL(10,2), " +
            "status VARCHAR(20))";

        String createOrderItemsTable = "CREATE TABLE order_items (" +
            "id INT PRIMARY KEY AUTO_INCREMENT, " +
            "order_id INT, " +
            "product_id INT, " +
            "quantity INT, " +
            "price DECIMAL(10,2))";

        String createInventoryTable = "CREATE TABLE inventory (" +
            "product_id INT PRIMARY KEY, " +
            "quantity INT)";

        stmt.executeUpdate(createOrdersTable);
        stmt.executeUpdate(createOrderItemsTable);
        stmt.executeUpdate(createInventoryTable);

        // TODO: Insert test inventory
        stmt.executeUpdate("INSERT INTO inventory VALUES (1, 100)");
        stmt.executeUpdate("INSERT INTO inventory VALUES (2, 50)");
    }

    @Test(priority = 1)
    public void testSuccessfulTransaction() throws SQLException {
        // TODO: Disable auto-commit
        connection.setAutoCommit(false);

        try {
            // Step 1: Create order
            String insertOrderSQL = "INSERT INTO orders (customer_id, total_amount, status) " +
                                   "VALUES (?, ?, ?)";
            PreparedStatement orderStmt = connection.prepareStatement(insertOrderSQL,
                Statement.RETURN_GENERATED_KEYS);

            orderStmt.setInt(1, 1001);
            orderStmt.setDouble(2, 150.00);
            orderStmt.setString(3, "PENDING");
            orderStmt.executeUpdate();

            ResultSet rs = orderStmt.getGeneratedKeys();
            rs.next();
            int orderId = rs.getInt(1);

            // Step 2: Add order items
            String insertItemSQL = "INSERT INTO order_items " +
                "(order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)";
            PreparedStatement itemStmt = connection.prepareStatement(insertItemSQL);

            itemStmt.setInt(1, orderId);
            itemStmt.setInt(2, 1);
            itemStmt.setInt(3, 2);
            itemStmt.setDouble(4, 50.00);
            itemStmt.executeUpdate();

            // Step 3: Update inventory
            String updateInventorySQL = "UPDATE inventory SET quantity = quantity - ? " +
                                       "WHERE product_id = ?";
            PreparedStatement invStmt = connection.prepareStatement(updateInventorySQL);

            invStmt.setInt(1, 2);
            invStmt.setInt(2, 1);
            invStmt.executeUpdate();

            // TODO: Commit transaction
            connection.commit();

            System.out.println("Transaction committed successfully");

            // TODO: Verify all operations
            // Verify order exists
            PreparedStatement verifyOrder = connection.prepareStatement(
                "SELECT * FROM orders WHERE id = ?");
            verifyOrder.setInt(1, orderId);
            ResultSet orderRs = verifyOrder.executeQuery();
            assertTrue(orderRs.next(), "Order should exist");

            // Verify inventory updated
            PreparedStatement verifyInv = connection.prepareStatement(
                "SELECT quantity FROM inventory WHERE product_id = ?");
            verifyInv.setInt(1, 1);
            ResultSet invRs = verifyInv.executeQuery();
            invRs.next();
            assertEquals(invRs.getInt("quantity"), 98, "Inventory should be reduced");

        } catch (SQLException e) {
            // TODO: Rollback on error
            connection.rollback();
            throw e;
        } finally {
            // TODO: Restore auto-commit
            connection.setAutoCommit(true);
        }
    }

    @Test(priority = 2)
    public void testTransactionRollback() throws SQLException {
        // TODO: Get initial inventory
        PreparedStatement getInvStmt = connection.prepareStatement(
            "SELECT quantity FROM inventory WHERE product_id = ?");
        getInvStmt.setInt(1, 1);
        ResultSet rs = getInvStmt.executeQuery();
        rs.next();
        int initialQuantity = rs.getInt("quantity");

        // TODO: Disable auto-commit
        connection.setAutoCommit(false);

        try {
            // Create order
            PreparedStatement orderStmt = connection.prepareStatement(
                "INSERT INTO orders (customer_id, total_amount, status) VALUES (?, ?, ?)",
                Statement.RETURN_GENERATED_KEYS
            );
            orderStmt.setInt(1, 1002);
            orderStmt.setDouble(2, 200.00);
            orderStmt.setString(3, "PENDING");
            orderStmt.executeUpdate();

            ResultSet generatedKeys = orderStmt.getGeneratedKeys();
            generatedKeys.next();
            int orderId = generatedKeys.getInt(1);

            // TODO: Simulate error - try to deduct more than available
            PreparedStatement updateInv = connection.prepareStatement(
                "UPDATE inventory SET quantity = quantity - ? WHERE product_id = ?");
            updateInv.setInt(1, 1000); // More than available
            updateInv.setInt(2, 1);
            updateInv.executeUpdate();

            // TODO: Check if quantity is negative (business logic violation)
            PreparedStatement checkInv = connection.prepareStatement(
                "SELECT quantity FROM inventory WHERE product_id = ?");
            checkInv.setInt(1, 1);
            ResultSet invRs = checkInv.executeQuery();
            invRs.next();
            int newQuantity = invRs.getInt("quantity");

            if (newQuantity < 0) {
                throw new SQLException("Insufficient inventory");
            }

            connection.commit();

        } catch (SQLException e) {
            // TODO: Rollback transaction
            System.out.println("Error occurred, rolling back: " + e.getMessage());
            connection.rollback();

            // TODO: Verify rollback - inventory should be unchanged
            PreparedStatement verifyInv = connection.prepareStatement(
                "SELECT quantity FROM inventory WHERE product_id = ?");
            verifyInv.setInt(1, 1);
            ResultSet invRs = verifyInv.executeQuery();
            invRs.next();
            assertEquals(invRs.getInt("quantity"), initialQuantity,
                "Inventory should be rolled back");

            System.out.println("Transaction rolled back successfully");

        } finally {
            connection.setAutoCommit(true);
        }
    }

    @Test(priority = 3)
    public void testSavepoints() throws SQLException {
        connection.setAutoCommit(false);
        Savepoint savepoint1 = null;

        try {
            // TODO: Create first order
            PreparedStatement order1 = connection.prepareStatement(
                "INSERT INTO orders (customer_id, total_amount, status) VALUES (?, ?, ?)");
            order1.setInt(1, 1003);
            order1.setDouble(2, 100.00);
            order1.setString(3, "PENDING");
            order1.executeUpdate();

            // TODO: Create savepoint
            savepoint1 = connection.setSavepoint("SavePoint1");

            // TODO: Create second order
            PreparedStatement order2 = connection.prepareStatement(
                "INSERT INTO orders (customer_id, total_amount, status) VALUES (?, ?, ?)");
            order2.setInt(1, 1004);
            order2.setDouble(2, 200.00);
            order2.setString(3, "PENDING");
            order2.executeUpdate();

            // TODO: Simulate error in second operation
            // Rollback to savepoint
            System.out.println("Error in second order, rolling back to savepoint");
            connection.rollback(savepoint1);

            // TODO: Commit first order
            connection.commit();

            // TODO: Verify first order exists, second doesn't
            PreparedStatement verify = connection.prepareStatement(
                "SELECT COUNT(*) FROM orders WHERE customer_id IN (1003, 1004)");
            ResultSet rs = verify.executeQuery();
            rs.next();
            int count = rs.getInt(1);

            assertEquals(count, 1, "Should have only first order");

            System.out.println("Savepoint rollback successful");

        } catch (SQLException e) {
            connection.rollback();
            throw e;
        } finally {
            connection.setAutoCommit(true);
        }
    }

    @Test(priority = 4)
    public void testDataIntegrity() throws SQLException {
        // TODO: Test referential integrity
        connection.setAutoCommit(false);

        try {
            // Try to insert order item without order (should fail)
            PreparedStatement stmt = connection.prepareStatement(
                "INSERT INTO order_items (order_id, product_id, quantity, price) " +
                "VALUES (?, ?, ?, ?)");

            stmt.setInt(1, 99999); // Non-existent order
            stmt.setInt(2, 1);
            stmt.setInt(3, 1);
            stmt.setDouble(4, 50.00);

            try {
                stmt.executeUpdate();
                connection.commit();
                fail("Should fail due to referential integrity");
            } catch (SQLException e) {
                // Expected failure
                System.out.println("Referential integrity maintained: " + e.getMessage());
                connection.rollback();
            }

        } finally {
            connection.setAutoCommit(true);
        }
    }

    @AfterClass
    public void cleanup() throws SQLException {
        if (connection != null && !connection.isClosed()) {
            connection.close();
        }
    }
}
```

**Expected Outcome**:
- Successful transactions commit all operations
- Failed transactions rollback completely
- Data integrity is maintained after rollback
- Savepoints allow partial rollback
- Inventory and orders remain consistent
- Business logic validation prevents invalid states

**Common Mistakes to Avoid**:
1. Forgetting to disable auto-commit before transactions
2. Not restoring auto-commit in finally block
3. Not handling SQLException properly
4. Committing before all validations complete
5. Not testing rollback scenarios

**Solution Approach (Hints)**:
- Always use try-catch-finally for transactions
- Set `connection.setAutoCommit(false)` before transaction
- Use `connection.commit()` on success
- Use `connection.rollback()` on failure
- Restore auto-commit in finally: `connection.setAutoCommit(true)`
- Savepoints: `connection.setSavepoint("name")`

---

### Exercise 6: Advanced Database Testing Patterns (55 minutes)

**Objective**: Implement advanced database testing patterns including test data builders, database assertions, and query optimization.

**Real-world Scenario**: Build a comprehensive database testing framework with reusable patterns for complex test scenarios.

**Requirements**:
1. Create a Test Data Builder pattern for database entities
2. Implement custom database assertions
3. Create a database state comparison utility
4. Implement query performance testing
5. Build a test data cleanup strategy

**Code Template**:

**UserBuilder.java** (Test Data Builder):
```java
package com.automation.database.builders;

import java.sql.*;
import com.automation.database.utils.DatabaseUtils;

public class UserBuilder {
    private String username;
    private String email;
    private String password;
    private String status = "ACTIVE";
    private String role = "USER";

    public UserBuilder withUsername(String username) {
        this.username = username;
        return this;
    }

    public UserBuilder withEmail(String email) {
        this.email = email;
        return this;
    }

    public UserBuilder withPassword(String password) {
        this.password = password;
        return this;
    }

    public UserBuilder withStatus(String status) {
        this.status = status;
        return this;
    }

    public UserBuilder withRole(String role) {
        this.role = role;
        return this;
    }

    public int build() throws SQLException {
        // TODO: Insert user and return ID
        String insertSQL = "INSERT INTO users (username, email, password, status, role) " +
                          "VALUES (?, ?, ?, ?, ?)";

        return DatabaseUtils.executeInsert(insertSQL,
            username, email, password, status, role);
    }

    public static UserBuilder aUser() {
        return new UserBuilder();
    }
}
```

**DatabaseAssertions.java**:
```java
package com.automation.database.assertions;

import java.sql.*;
import java.util.*;
import com.automation.database.utils.DatabaseUtils;
import static org.testng.Assert.*;

public class DatabaseAssertions {

    public static void assertRecordExists(String table, String column, Object value)
        throws SQLException {
        // TODO: Assert record exists
        String query = "SELECT COUNT(*) FROM " + table + " WHERE " + column + " = ?";
        int count = DatabaseUtils.getCount(query, value);

        assertTrue(count > 0, "Record should exist in " + table +
            " where " + column + " = " + value);
    }

    public static void assertRecordNotExists(String table, String column, Object value)
        throws SQLException {
        // TODO: Assert record doesn't exist
        String query = "SELECT COUNT(*) FROM " + table + " WHERE " + column + " = ?";
        int count = DatabaseUtils.getCount(query, value);

        assertEquals(count, 0, "Record should not exist in " + table +
            " where " + column + " = " + value);
    }

    public static void assertColumnValue(String table, String whereColumn,
                                        Object whereValue, String columnToCheck,
                                        Object expectedValue) throws SQLException {
        // TODO: Assert specific column value
        String query = "SELECT " + columnToCheck + " FROM " + table +
                      " WHERE " + whereColumn + " = ?";

        Map<String, Object> result = DatabaseUtils.getSingleResult(query, whereValue);
        assertNotNull(result, "Record should exist");

        Object actualValue = result.get(columnToCheck.toUpperCase());
        assertEquals(actualValue, expectedValue,
            "Column " + columnToCheck + " should have expected value");
    }

    public static void assertRowCount(String table, int expectedCount)
        throws SQLException {
        // TODO: Assert row count
        int actualCount = DatabaseUtils.getCount("SELECT COUNT(*) FROM " + table);
        assertEquals(actualCount, expectedCount,
            "Table " + table + " should have " + expectedCount + " rows");
    }

    public static void assertColumnNotNull(String table, String column,
                                          String whereColumn, Object whereValue)
        throws SQLException {
        // TODO: Assert column is not null
        String query = "SELECT " + column + " FROM " + table +
                      " WHERE " + whereColumn + " = ?";

        Map<String, Object> result = DatabaseUtils.getSingleResult(query, whereValue);
        assertNotNull(result, "Record should exist");

        Object value = result.get(column.toUpperCase());
        assertNotNull(value, "Column " + column + " should not be null");
    }
}
```

**Exercise6_AdvancedPatterns.java**:
```java
package com.automation.database.exercises;

import com.automation.database.builders.UserBuilder;
import com.automation.database.assertions.DatabaseAssertions;
import com.automation.database.utils.DatabaseUtils;
import org.testng.annotations.*;
import java.sql.*;
import static org.testng.Assert.*;

public class Exercise6_AdvancedPatterns {

    @BeforeClass
    public void setup() throws SQLException {
        // TODO: Initialize database
        DatabaseUtils.initializeConnectionPool("jdbc:h2:mem:testdb", "sa", "");

        // TODO: Create users table
        try (Connection conn = DatabaseUtils.getConnection()) {
            String createTableSQL = "CREATE TABLE users (" +
                "id INT PRIMARY KEY AUTO_INCREMENT, " +
                "username VARCHAR(50), " +
                "email VARCHAR(100), " +
                "password VARCHAR(100), " +
                "status VARCHAR(20), " +
                "role VARCHAR(20), " +
                "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)";

            Statement stmt = conn.createStatement();
            stmt.executeUpdate(createTableSQL);
        }
    }

    @Test(priority = 1)
    public void testUserBuilder() throws SQLException {
        // TODO: Use builder pattern to create user
        int userId = UserBuilder.aUser()
            .withUsername("john_doe")
            .withEmail("john@example.com")
            .withPassword("password123")
            .withRole("ADMIN")
            .withStatus("ACTIVE")
            .build();

        System.out.println("Created user with ID: " + userId);

        // TODO: Verify using custom assertions
        DatabaseAssertions.assertRecordExists("users", "id", userId);
        DatabaseAssertions.assertColumnValue("users", "id", userId, "role", "ADMIN");
        DatabaseAssertions.assertColumnValue("users", "id", userId, "status", "ACTIVE");
    }

    @Test(priority = 2)
    public void testMultipleUsersWithBuilder() throws SQLException {
        // TODO: Create multiple users with different configurations
        int user1 = UserBuilder.aUser()
            .withUsername("admin_user")
            .withEmail("admin@example.com")
            .withPassword("admin123")
            .withRole("ADMIN")
            .build();

        int user2 = UserBuilder.aUser()
            .withUsername("regular_user")
            .withEmail("user@example.com")
            .withPassword("user123")
            .withRole("USER")
            .build();

        int user3 = UserBuilder.aUser()
            .withUsername("inactive_user")
            .withEmail("inactive@example.com")
            .withPassword("inactive123")
            .withStatus("INACTIVE")
            .build();

        // TODO: Verify using assertions
        DatabaseAssertions.assertRowCount("users", 4); // Including user from test 1

        // Verify specific users
        DatabaseAssertions.assertColumnValue("users", "id", user1, "role", "ADMIN");
        DatabaseAssertions.assertColumnValue("users", "id", user3, "status", "INACTIVE");
    }

    @Test(priority = 3)
    public void testDatabaseAssertions() throws SQLException {
        // TODO: Create test user
        int userId = UserBuilder.aUser()
            .withUsername("test_assertions")
            .withEmail("assertions@example.com")
            .withPassword("test123")
            .build();

        // TODO: Test various assertions
        DatabaseAssertions.assertRecordExists("users", "email", "assertions@example.com");
        DatabaseAssertions.assertColumnNotNull("users", "created_at", "id", userId);
        DatabaseAssertions.assertColumnValue("users", "email",
            "assertions@example.com", "username", "test_assertions");

        // TODO: Test negative assertion
        DatabaseAssertions.assertRecordNotExists("users", "email",
            "nonexistent@example.com");

        System.out.println("All database assertions passed");
    }

    @Test(priority = 4)
    public void testQueryPerformance() throws SQLException {
        // TODO: Insert bulk test data
        System.out.println("Inserting test data...");

        for (int i = 0; i < 100; i++) {
            UserBuilder.aUser()
                .withUsername("user" + i)
                .withEmail("user" + i + "@example.com")
                .withPassword("pass" + i)
                .build();
        }

        // TODO: Test query performance
        long startTime = System.currentTimeMillis();

        String query = "SELECT * FROM users WHERE status = ?";
        DatabaseUtils.getResultsAsList(query, "ACTIVE");

        long endTime = System.currentTimeMillis();
        long queryTime = endTime - startTime;

        System.out.println("Query execution time: " + queryTime + "ms");

        // TODO: Verify performance threshold
        assertTrue(queryTime < 1000, "Query should complete within 1 second");

        // TODO: Test with index
        try (Connection conn = DatabaseUtils.getConnection()) {
            Statement stmt = conn.createStatement();
            stmt.executeUpdate("CREATE INDEX idx_status ON users(status)");
        }

        startTime = System.currentTimeMillis();
        DatabaseUtils.getResultsAsList(query, "ACTIVE");
        endTime = System.currentTimeMillis();
        long indexedQueryTime = endTime - startTime;

        System.out.println("Indexed query time: " + indexedQueryTime + "ms");
    }

    @Test(priority = 5)
    public void testDataCleanupStrategy() throws SQLException {
        // TODO: Mark test data with special marker
        String testMarker = "_TEST_" + System.currentTimeMillis();

        int user1 = UserBuilder.aUser()
            .withUsername("cleanup_user1" + testMarker)
            .withEmail("cleanup1" + testMarker + "@example.com")
            .withPassword("pass1")
            .build();

        int user2 = UserBuilder.aUser()
            .withUsername("cleanup_user2" + testMarker)
            .withEmail("cleanup2" + testMarker + "@example.com")
            .withPassword("pass2")
            .build();

        // TODO: Verify users created
        DatabaseAssertions.assertRecordExists("users", "id", user1);
        DatabaseAssertions.assertRecordExists("users", "id", user2);

        // TODO: Cleanup test data using marker
        String cleanupSQL = "DELETE FROM users WHERE email LIKE ?";
        int deletedCount = DatabaseUtils.executeUpdate(cleanupSQL,
            "%" + testMarker + "@example.com");

        System.out.println("Cleaned up " + deletedCount + " test records");

        // TODO: Verify cleanup
        DatabaseAssertions.assertRecordNotExists("users", "id", user1);
        DatabaseAssertions.assertRecordNotExists("users", "id", user2);
    }

    @AfterClass
    public void cleanup() {
        DatabaseUtils.closePool();
    }
}
```

**Expected Outcome**:
- Test Data Builder creates users with fluent API
- Custom assertions provide clear database validation
- Query performance is measured and optimized
- Test data cleanup is efficient and reliable
- All patterns work together seamlessly
- Code is reusable and maintainable

**Common Mistakes to Avoid**:
1. Not using builder pattern for complex test data
2. Writing repetitive assertion code
3. Not measuring query performance
4. Inadequate test data cleanup
5. Not creating unique identifiers for test data

**Solution Approach (Hints)**:
- Builder pattern returns `this` for method chaining
- Use generic assertion methods for reusability
- Measure time with `System.currentTimeMillis()`
- Use unique markers for test data identification
- Create indexes to improve query performance
- Clean up based on test markers or timestamps

---

**Next Steps:**
- Practice JDBC operations with different databases
- Implement connection pooling in your framework
- Create comprehensive database utility classes
- Integrate database validation with existing Selenium tests
- Explore advanced topics like stored procedures and triggers testing

**Happy Testing!**

---

## Common Mistakes

### 1. Not Closing Database Connections Properly

**Problem:**
```java
// Bad - Connection leak
public void getData() {
    try {
        Connection conn = DriverManager.getConnection(url, user, pass);
        Statement stmt = conn.createStatement();
        ResultSet rs = stmt.executeQuery("SELECT * FROM users");
        // Processing...
    } catch (SQLException e) {
        e.printStackTrace();
    }
    // Connection never closed - memory leak!
}
```

**Why It's Wrong:**
- Unclosed connections remain open indefinitely
- Database connection pool exhaustion
- Application performance degradation
- Eventual OutOfMemoryError
- Prevents other tests from getting connections

**Solution:**
```java
// Good - Proper resource management
public void getData() {
    try (Connection conn = DriverManager.getConnection(url, user, pass);
         Statement stmt = conn.createStatement();
         ResultSet rs = stmt.executeQuery("SELECT * FROM users")) {

        // Process results
        while (rs.next()) {
            // Processing logic
        }

    } catch (SQLException e) {
        e.printStackTrace();
    }
    // All resources automatically closed
}

// Alternative - Manual cleanup
public void getDataManual() {
    Connection conn = null;
    Statement stmt = null;
    ResultSet rs = null;

    try {
        conn = DriverManager.getConnection(url, user, pass);
        stmt = conn.createStatement();
        rs = stmt.executeQuery("SELECT * FROM users");

        while (rs.next()) {
            // Process
        }

    } catch (SQLException e) {
        e.printStackTrace();
    } finally {
        try {
            if (rs != null) rs.close();
            if (stmt != null) stmt.close();
            if (conn != null) conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```

**Best Practice:**
- Always use try-with-resources for JDBC objects
- Close resources in reverse order: ResultSet → Statement → Connection
- Implement connection pooling (HikariCP) for better management
- Monitor active connections in production
- Set connection timeout values appropriately

---

### 2. Using Statement Instead of PreparedStatement

**Problem:**
```java
// Bad - SQL Injection vulnerability
public User getUser(String username) {
    String sql = "SELECT * FROM users WHERE username = '" + username + "'";

    try (Connection conn = getConnection();
         Statement stmt = conn.createStatement();
         ResultSet rs = stmt.executeQuery(sql)) {

        if (rs.next()) {
            return mapUser(rs);
        }
    } catch (SQLException e) {
        e.printStackTrace();
    }
    return null;
}

// If username = "admin' OR '1'='1' --"
// SQL becomes: SELECT * FROM users WHERE username = 'admin' OR '1'='1' --'
// Returns all users!
```

**Why It's Wrong:**
- Vulnerable to SQL injection attacks
- No query compilation/caching
- Poor performance for repeated queries
- Difficult to handle special characters
- No type safety

**Solution:**
```java
// Good - Using PreparedStatement
public User getUser(String username) {
    String sql = "SELECT * FROM users WHERE username = ?";

    try (Connection conn = getConnection();
         PreparedStatement pstmt = conn.prepareStatement(sql)) {

        pstmt.setString(1, username);

        try (ResultSet rs = pstmt.executeQuery()) {
            if (rs.next()) {
                return mapUser(rs);
            }
        }

    } catch (SQLException e) {
        e.printStackTrace();
    }
    return null;
}

// Even with malicious input, PreparedStatement treats it as literal string
// Safe from SQL injection
```

**Best Practice:**
- Always use PreparedStatement for queries with parameters
- Never concatenate user input into SQL strings
- Validate input before database operations
- Use parameterized queries: `?` placeholders
- PreparedStatement is pre-compiled and cached by database
- Provides better performance for repeated queries

---

### 3. Not Handling Transactions Properly

**Problem:**
```java
// Bad - Incomplete transaction handling
public void transferMoney(int fromAccount, int toAccount, double amount) {
    try (Connection conn = getConnection()) {
        conn.setAutoCommit(false);

        // Deduct from source account
        String deductSQL = "UPDATE accounts SET balance = balance - ? WHERE id = ?";
        PreparedStatement deductStmt = conn.prepareStatement(deductSQL);
        deductStmt.setDouble(1, amount);
        deductStmt.setInt(2, fromAccount);
        deductStmt.executeUpdate();

        // If exception occurs here, first update is not rolled back

        // Add to destination account
        String addSQL = "UPDATE accounts SET balance = balance + ? WHERE id = ?";
        PreparedStatement addStmt = conn.prepareStatement(addSQL);
        addStmt.setDouble(1, amount);
        addStmt.setInt(2, toAccount);
        addStmt.executeUpdate();

        conn.commit();
    } catch (SQLException e) {
        // No rollback! First update persists
        e.printStackTrace();
    }
}
```

**Why It's Wrong:**
- No rollback on failure leaves database in inconsistent state
- Partial transactions commit
- Data integrity violated
- AutoCommit not restored in finally block
- Lost data or corrupted records

**Solution:**
```java
// Good - Proper transaction handling
public void transferMoney(int fromAccount, int toAccount, double amount) {
    Connection conn = null;

    try {
        conn = getConnection();
        conn.setAutoCommit(false);

        // Deduct from source
        try (PreparedStatement deductStmt = conn.prepareStatement(
            "UPDATE accounts SET balance = balance - ? WHERE id = ?")) {
            deductStmt.setDouble(1, amount);
            deductStmt.setInt(2, fromAccount);
            deductStmt.executeUpdate();
        }

        // Add to destination
        try (PreparedStatement addStmt = conn.prepareStatement(
            "UPDATE accounts SET balance = balance + ? WHERE id = ?")) {
            addStmt.setDouble(1, amount);
            addStmt.setInt(2, toAccount);
            addStmt.executeUpdate();
        }

        // Both operations successful - commit
        conn.commit();
        System.out.println("Transfer successful");

    } catch (SQLException e) {
        // Rollback on any error
        if (conn != null) {
            try {
                conn.rollback();
                System.out.println("Transaction rolled back");
            } catch (SQLException ex) {
                ex.printStackTrace();
            }
        }
        e.printStackTrace();
        throw new RuntimeException("Transfer failed", e);

    } finally {
        // Always restore autoCommit
        if (conn != null) {
            try {
                conn.setAutoCommit(true);
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
```

**Best Practice:**
- Always use transactions for multi-step operations
- Disable autoCommit before starting transaction
- Commit on success, rollback on failure
- Restore autoCommit in finally block
- Use savepoints for complex transactions
- Test rollback scenarios explicitly
- Log transaction success/failure

---

### 4. Hardcoding Database Credentials

**Problem:**
```java
// Bad - Hardcoded credentials in code
public class DatabaseConfig {
    public static final String URL = "jdbc:mysql://localhost:3306/proddb";
    public static final String USERNAME = "admin";
    public static final String PASSWORD = "Admin@123";  // Exposed!

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USERNAME, PASSWORD);
    }
}

// Committed to version control - security breach!
```

**Why It's Wrong:**
- Credentials visible in source code
- Committed to version control (Git history)
- Difficult to change per environment
- Security vulnerability
- Fails code review and security audits
- Cannot use different credentials for dev/test/prod

**Solution:**
```java
// Good - Externalized configuration
// database.properties file (in .gitignore)
/*
db.url=jdbc:mysql://localhost:3306/testdb
db.username=test_user
db.password=test_pass_encrypted
*/

public class DatabaseConfig {
    private static Properties properties;

    static {
        try {
            properties = new Properties();
            FileInputStream fis = new FileInputStream("config/database.properties");
            properties.load(fis);
        } catch (IOException e) {
            throw new RuntimeException("Failed to load database config", e);
        }
    }

    public static String getUrl() {
        return properties.getProperty("db.url");
    }

    public static String getUsername() {
        return properties.getProperty("db.username");
    }

    public static String getPassword() {
        // Decrypt password before use
        String encrypted = properties.getProperty("db.password");
        return decrypt(encrypted);
    }
}

// Better - Use environment variables
public class DatabaseConfig {
    public static String getUrl() {
        return System.getenv("DB_URL");
    }

    public static String getUsername() {
        return System.getenv("DB_USERNAME");
    }

    public static String getPassword() {
        return System.getenv("DB_PASSWORD");
    }
}

// Best - Use secrets management
public class DatabaseConfig {
    private static SecretsManager secretsManager;

    public static String getPassword() {
        // Fetch from HashiCorp Vault, AWS Secrets Manager, etc.
        return secretsManager.getSecret("database/password");
    }
}
```

**Best Practice:**
- Never hardcode credentials in source code
- Use properties files (add to .gitignore)
- Use environment variables for CI/CD
- Encrypt sensitive configuration
- Use secrets management tools (Vault, AWS Secrets Manager)
- Different configs for dev/test/prod environments
- Rotate credentials regularly
- Implement proper access controls

---

### 5. Not Using Connection Pooling

**Problem:**
```java
// Bad - Creating new connection for every query
public class DatabaseOperations {

    public void executeQuery1() {
        try (Connection conn = DriverManager.getConnection(url, user, pass);
             Statement stmt = conn.createStatement()) {
            // Execute query
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void executeQuery2() {
        try (Connection conn = DriverManager.getConnection(url, user, pass);
             Statement stmt = conn.createStatement()) {
            // Execute query
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Each test method creates new connection
    // Creating connection is expensive (100-500ms)
}
```

**Why It's Wrong:**
- Creating connections is slow and expensive
- High overhead for each database operation
- Poor performance under load
- Resource wastage
- Database server overload
- Test execution takes much longer

**Solution:**
```java
// Good - Using HikariCP connection pool
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

public class ConnectionPool {
    private static HikariDataSource dataSource;

    static {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(DatabaseConfig.getUrl());
        config.setUsername(DatabaseConfig.getUsername());
        config.setPassword(DatabaseConfig.getPassword());

        // Pool configuration
        config.setMaximumPoolSize(10);
        config.setMinimumIdle(5);
        config.setConnectionTimeout(30000);
        config.setIdleTimeout(600000);
        config.setMaxLifetime(1800000);

        // Performance
        config.addDataSourceProperty("cachePrepStmts", "true");
        config.addDataSourceProperty("prepStmtCacheSize", "250");
        config.addDataSourceProperty("prepStmtCacheSqlLimit", "2048");

        dataSource = new HikariDataSource(config);
    }

    public static Connection getConnection() throws SQLException {
        return dataSource.getConnection();
    }

    public static void closePool() {
        if (dataSource != null) {
            dataSource.close();
        }
    }
}

// Usage
public void executeQuery() {
    try (Connection conn = ConnectionPool.getConnection();
         Statement stmt = conn.createStatement()) {
        // Execute query - connection from pool (fast)
    } catch (SQLException e) {
        e.printStackTrace();
    }
    // Connection returned to pool, not closed
}

// Cleanup in test suite
@AfterSuite
public void cleanup() {
    ConnectionPool.closePool();
}
```

**Best Practice:**
- Always use connection pooling in test automation
- HikariCP is the recommended pool (fastest, reliable)
- Configure pool size based on expected load
- Set appropriate timeouts
- Close pool after test suite completion
- Monitor pool statistics for optimization
- Use pool for all database operations

---

### 6. Not Cleaning Up Test Data

**Problem:**
```java
// Bad - Test data left in database
@Test
public void testUserRegistration() {
    String username = "testuser";
    String email = "test@example.com";

    // Insert test user
    DatabaseUtils.executeInsert(
        "INSERT INTO users (username, email) VALUES (?, ?)",
        username, email
    );

    // Test logic...

    // No cleanup - test data remains in database!
}

// After 1000 test runs:
// - Database filled with test data
// - Performance degradation
// - Unique constraint violations
// - Test failures due to existing data
```

**Why It's Wrong:**
- Database fills with test data over time
- Test data interferes with subsequent tests
- Unique constraint violations
- Performance issues with large datasets
- Difficult to identify real vs test data
- Database maintenance problems

**Solution:**
```java
// Good - Proper test data cleanup
@Test
public void testUserRegistration() {
    String username = "testuser_" + System.currentTimeMillis();
    String email = username + "@example.com";
    int userId = -1;

    try {
        // Insert test user
        userId = DatabaseUtils.executeInsertWithGeneratedKey(
            "INSERT INTO users (username, email) VALUES (?, ?)",
            username, email
        );

        // Test logic...
        Assert.assertTrue(userId > 0);

        // Verify in database
        Map<String, Object> user = DatabaseUtils.getSingleRecord(
            "SELECT * FROM users WHERE id = ?", userId
        );
        Assert.assertNotNull(user);

    } finally {
        // Cleanup - always executes
        if (userId > 0) {
            DatabaseUtils.executeUpdate(
                "DELETE FROM users WHERE id = ?", userId
            );
        }
    }
}

// Alternative - Using @AfterMethod
private int createdUserId;

@Test
public void testUserRegistration() {
    String username = "testuser_" + System.currentTimeMillis();
    String email = username + "@example.com";

    createdUserId = DatabaseUtils.executeInsertWithGeneratedKey(
        "INSERT INTO users (username, email) VALUES (?, ?)",
        username, email
    );

    // Test logic...
}

@AfterMethod
public void cleanup() {
    if (createdUserId > 0) {
        DatabaseUtils.executeUpdate(
            "DELETE FROM users WHERE id = ?", createdUserId
        );
    }
}

// Best - Test Data Manager
public class TestDataManager {
    private static List<Integer> createdUserIds = new ArrayList<>();

    public static int createTestUser(String username, String email) {
        int userId = DatabaseUtils.executeInsertWithGeneratedKey(
            "INSERT INTO users (username, email) VALUES (?, ?)",
            username, email
        );
        createdUserIds.add(userId);
        return userId;
    }

    public static void cleanupAllTestData() {
        for (int userId : createdUserIds) {
            DatabaseUtils.executeUpdate(
                "DELETE FROM users WHERE id = ?", userId
            );
        }
        createdUserIds.clear();
    }
}

@AfterClass
public void cleanupClass() {
    TestDataManager.cleanupAllTestData();
}
```

**Best Practice:**
- Always clean up test data after tests
- Use unique identifiers (timestamps, UUIDs) for test data
- Implement cleanup in @AfterMethod or finally block
- Use test data manager for centralized cleanup
- Clean up in correct order (handle foreign keys)
- Use transactions with rollback for isolated tests
- Consider using separate test database
- Implement automated cleanup jobs for orphaned data

---

## Best Practices

### 1. Implement Database Utility Class

**Why:**
Centralized database operations reduce code duplication and provide consistent error handling.

**How:**
```java
public class DatabaseUtils {

    // Execute SELECT and return List of Maps
    public static List<Map<String, Object>> executeQuery(String sql, Object... params) {
        List<Map<String, Object>> results = new ArrayList<>();

        try (Connection conn = ConnectionPool.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            setParameters(pstmt, params);

            try (ResultSet rs = pstmt.executeQuery()) {
                ResultSetMetaData metaData = rs.getMetaData();
                int columnCount = metaData.getColumnCount();

                while (rs.next()) {
                    Map<String, Object> row = new HashMap<>();
                    for (int i = 1; i <= columnCount; i++) {
                        String columnName = metaData.getColumnName(i);
                        Object value = rs.getObject(i);
                        row.put(columnName, value);
                    }
                    results.add(row);
                }
            }

        } catch (SQLException e) {
            throw new RuntimeException("Query execution failed: " + sql, e);
        }

        return results;
    }

    // Execute INSERT/UPDATE/DELETE
    public static int executeUpdate(String sql, Object... params) {
        try (Connection conn = ConnectionPool.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            setParameters(pstmt, params);
            return pstmt.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException("Update execution failed: " + sql, e);
        }
    }

    // Execute INSERT and return generated key
    public static int executeInsertWithGeneratedKey(String sql, Object... params) {
        try (Connection conn = ConnectionPool.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            setParameters(pstmt, params);
            pstmt.executeUpdate();

            try (ResultSet rs = pstmt.getGeneratedKeys()) {
                if (rs.next()) {
                    return rs.getInt(1);
                }
            }

            return -1;

        } catch (SQLException e) {
            throw new RuntimeException("Insert execution failed: " + sql, e);
        }
    }

    // Get single record
    public static Map<String, Object> getSingleRecord(String sql, Object... params) {
        List<Map<String, Object>> results = executeQuery(sql, params);
        return results.isEmpty() ? null : results.get(0);
    }

    // Check if record exists
    public static boolean recordExists(String tableName, String whereClause, Object... params) {
        String sql = "SELECT COUNT(*) as count FROM " + tableName + " WHERE " + whereClause;
        Map<String, Object> result = getSingleRecord(sql, params);
        return result != null && ((Number) result.get("count")).intValue() > 0;
    }

    // Get count
    public static int getCount(String sql, Object... params) {
        Map<String, Object> result = getSingleRecord(sql, params);
        if (result != null) {
            Object count = result.values().iterator().next();
            return ((Number) count).intValue();
        }
        return 0;
    }

    // Helper to set parameters
    private static void setParameters(PreparedStatement pstmt, Object... params) throws SQLException {
        for (int i = 0; i < params.length; i++) {
            pstmt.setObject(i + 1, params[i]);
        }
    }
}

// Usage in tests
@Test
public void testDatabaseOperations() {
    // Insert
    int userId = DatabaseUtils.executeInsertWithGeneratedKey(
        "INSERT INTO users (username, email) VALUES (?, ?)",
        "john_doe", "john@example.com"
    );

    // Query
    List<Map<String, Object>> users = DatabaseUtils.executeQuery(
        "SELECT * FROM users WHERE id = ?", userId
    );

    // Check existence
    boolean exists = DatabaseUtils.recordExists(
        "users", "username = ?", "john_doe"
    );

    // Update
    int rowsUpdated = DatabaseUtils.executeUpdate(
        "UPDATE users SET email = ? WHERE id = ?",
        "newemail@example.com", userId
    );

    // Delete
    DatabaseUtils.executeUpdate("DELETE FROM users WHERE id = ?", userId);
}
```

**Benefits:**
- Reduces code duplication across tests
- Consistent error handling and logging
- Easy to add new utility methods
- Simplified test code
- Centralized connection management
- Better maintainability

---

### 2. Use Fluent Interface for Database Operations

**Why:**
Fluent interfaces make test code more readable and maintainable.

**How:**
```java
public class QueryBuilder {
    private StringBuilder query;
    private List<Object> parameters;

    public QueryBuilder() {
        this.query = new StringBuilder();
        this.parameters = new ArrayList<>();
    }

    public QueryBuilder select(String... columns) {
        query.append("SELECT ");
        query.append(columns.length == 0 ? "*" : String.join(", ", columns));
        return this;
    }

    public QueryBuilder from(String table) {
        query.append(" FROM ").append(table);
        return this;
    }

    public QueryBuilder where(String condition, Object... params) {
        query.append(" WHERE ").append(condition);
        parameters.addAll(Arrays.asList(params));
        return this;
    }

    public QueryBuilder and(String condition, Object... params) {
        query.append(" AND ").append(condition);
        parameters.addAll(Arrays.asList(params));
        return this;
    }

    public QueryBuilder orderBy(String column, String direction) {
        query.append(" ORDER BY ").append(column).append(" ").append(direction);
        return this;
    }

    public QueryBuilder limit(int limit) {
        query.append(" LIMIT ").append(limit);
        return this;
    }

    public List<Map<String, Object>> execute() {
        return DatabaseUtils.executeQuery(query.toString(), parameters.toArray());
    }

    public String getQuery() {
        return query.toString();
    }
}

// Usage in tests - much more readable
@Test
public void testFluentQuery() {
    List<Map<String, Object>> results = new QueryBuilder()
        .select("id", "username", "email")
        .from("users")
        .where("status = ?", "active")
        .and("created_at > ?", "2024-01-01")
        .orderBy("created_at", "DESC")
        .limit(10)
        .execute();

    Assert.assertFalse(results.isEmpty());
}

// Compared to traditional approach
@Test
public void testTraditionalQuery() {
    String sql = "SELECT id, username, email FROM users " +
                 "WHERE status = ? AND created_at > ? " +
                 "ORDER BY created_at DESC LIMIT 10";

    List<Map<String, Object>> results = DatabaseUtils.executeQuery(
        sql, "active", "2024-01-01"
    );
}
```

**Benefits:**
- More readable and maintainable code
- Reduces SQL syntax errors
- Easy to build complex queries programmatically
- Better IDE auto-completion support
- Clearer intent in test code

---

### 3. Implement Test Data Builder Pattern

**Why:**
Test data builders provide flexible and readable test data creation.

**How:**
```java
public class UserBuilder {
    private String username;
    private String email;
    private String password = "Default@123";
    private String status = "active";
    private String role = "user";

    public static UserBuilder aUser() {
        return new UserBuilder();
    }

    public UserBuilder withUsername(String username) {
        this.username = username;
        return this;
    }

    public UserBuilder withEmail(String email) {
        this.email = email;
        return this;
    }

    public UserBuilder withPassword(String password) {
        this.password = password;
        return this;
    }

    public UserBuilder withStatus(String status) {
        this.status = status;
        return this;
    }

    public UserBuilder asAdmin() {
        this.role = "admin";
        return this;
    }

    public UserBuilder asInactive() {
        this.status = "inactive";
        return this;
    }

    public int build() {
        String sql = "INSERT INTO users (username, email, password, status, role) " +
                     "VALUES (?, ?, ?, ?, ?)";

        return DatabaseUtils.executeInsertWithGeneratedKey(
            sql, username, email, password, status, role
        );
    }
}

// Usage in tests - very readable
@Test
public void testUserBuilder() {
    // Create regular user
    int userId1 = UserBuilder.aUser()
        .withUsername("john_doe")
        .withEmail("john@example.com")
        .build();

    // Create admin user
    int userId2 = UserBuilder.aUser()
        .withUsername("admin_user")
        .withEmail("admin@example.com")
        .asAdmin()
        .build();

    // Create inactive user
    int userId3 = UserBuilder.aUser()
        .withUsername("inactive_user")
        .withEmail("inactive@example.com")
        .asInactive()
        .build();

    // Verify users created
    Assert.assertTrue(userId1 > 0);
    Assert.assertTrue(userId2 > 0);
    Assert.assertTrue(userId3 > 0);
}
```

**Benefits:**
- Clear and readable test data creation
- Flexible - easy to create variations
- Reduces code duplication
- Self-documenting code
- Easy to maintain and extend
- Encapsulates database insert logic

---

### 4. Validate Database State Before and After Tests

**Why:**
Database state validation ensures tests start from known state and verify correct changes.

**How:**
```java
@Test
public void testUserRegistration() {
    String username = "newuser_" + System.currentTimeMillis();
    String email = username + "@example.com";

    // Pre-condition: User should not exist
    boolean userExistsBefore = DatabaseUtils.recordExists(
        "users", "username = ?", username
    );
    Assert.assertFalse(userExistsBefore, "User should not exist before registration");

    // Get initial user count
    int initialCount = DatabaseUtils.getCount("SELECT COUNT(*) FROM users");

    // Perform registration through UI
    registrationPage.registerUser(username, email, "Password@123");

    // Post-condition: User should exist in database
    boolean userExistsAfter = DatabaseUtils.recordExists(
        "users", "username = ?", username
    );
    Assert.assertTrue(userExistsAfter, "User should exist after registration");

    // Verify user count increased by 1
    int finalCount = DatabaseUtils.getCount("SELECT COUNT(*) FROM users");
    Assert.assertEquals(finalCount, initialCount + 1, "User count should increase by 1");

    // Verify user details in database
    Map<String, Object> user = DatabaseUtils.getSingleRecord(
        "SELECT * FROM users WHERE username = ?", username
    );

    Assert.assertNotNull(user, "User record should exist");
    Assert.assertEquals(user.get("email"), email);
    Assert.assertEquals(user.get("status"), "active");
    Assert.assertNotNull(user.get("created_at"));

    // Cleanup
    DatabaseUtils.executeUpdate("DELETE FROM users WHERE username = ?", username);
}

@Test
public void testOrderCreation() {
    int userId = createTestUser();

    // Pre-condition: User should have no orders
    int orderCountBefore = DatabaseUtils.getCount(
        "SELECT COUNT(*) FROM orders WHERE user_id = ?", userId
    );
    Assert.assertEquals(orderCountBefore, 0, "User should have no orders initially");

    // Create order through UI
    checkoutPage.placeOrder(userId);

    // Post-condition: Order should exist
    int orderCountAfter = DatabaseUtils.getCount(
        "SELECT COUNT(*) FROM orders WHERE user_id = ?", userId
    );
    Assert.assertEquals(orderCountAfter, 1, "User should have 1 order");

    // Verify order details
    Map<String, Object> order = DatabaseUtils.getSingleRecord(
        "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC LIMIT 1",
        userId
    );

    Assert.assertNotNull(order);
    Assert.assertEquals(order.get("status"), "pending");
    Assert.assertTrue((Double) order.get("total_amount") > 0);
}
```

**Benefits:**
- Ensures tests start from known state
- Verifies correct database changes
- Catches unexpected database modifications
- Provides detailed failure information
- Increases test reliability
- Documents expected behavior

---

### 5. Use Database Assertions for Better Test Clarity

**Why:**
Custom database assertions make test intent clear and provide better error messages.

**How:**
```java
public class DatabaseAssertions {

    public static void assertRecordExists(String tableName, String column, Object value) {
        boolean exists = DatabaseUtils.recordExists(
            tableName, column + " = ?", value
        );

        Assert.assertTrue(exists,
            String.format("Record should exist in %s where %s = %s",
                tableName, column, value));
    }

    public static void assertRecordNotExists(String tableName, String column, Object value) {
        boolean exists = DatabaseUtils.recordExists(
            tableName, column + " = ?", value
        );

        Assert.assertFalse(exists,
            String.format("Record should not exist in %s where %s = %s",
                tableName, column, value));
    }

    public static void assertColumnValue(String tableName, String whereColumn,
                                        Object whereValue, String checkColumn,
                                        Object expectedValue) {
        Map<String, Object> record = DatabaseUtils.getSingleRecord(
            "SELECT * FROM " + tableName + " WHERE " + whereColumn + " = ?",
            whereValue
        );

        Assert.assertNotNull(record, "Record not found");
        Assert.assertEquals(record.get(checkColumn), expectedValue,
            String.format("Column %s should have value %s", checkColumn, expectedValue));
    }

    public static void assertRowCount(String tableName, int expectedCount) {
        int actualCount = DatabaseUtils.getCount(
            "SELECT COUNT(*) FROM " + tableName
        );

        Assert.assertEquals(actualCount, expectedCount,
            String.format("Table %s should have %d rows", tableName, expectedCount));
    }

    public static void assertColumnNotNull(String tableName, String whereColumn,
                                          Object whereValue, String checkColumn) {
        Map<String, Object> record = DatabaseUtils.getSingleRecord(
            "SELECT * FROM " + tableName + " WHERE " + whereColumn + " = ?",
            whereValue
        );

        Assert.assertNotNull(record, "Record not found");
        Assert.assertNotNull(record.get(checkColumn),
            String.format("Column %s should not be null", checkColumn));
    }
}

// Usage in tests - much clearer
@Test
public void testUserCreation() {
    String username = "testuser_" + System.currentTimeMillis();

    // Pre-condition
    DatabaseAssertions.assertRecordNotExists("users", "username", username);

    // Create user
    int userId = createUser(username);

    // Post-condition assertions
    DatabaseAssertions.assertRecordExists("users", "id", userId);
    DatabaseAssertions.assertColumnValue("users", "id", userId, "username", username);
    DatabaseAssertions.assertColumnValue("users", "id", userId, "status", "active");
    DatabaseAssertions.assertColumnNotNull("users", "id", userId, "created_at");
}
```

**Benefits:**
- Clear and readable test assertions
- Better error messages on failure
- Self-documenting test code
- Reusable across tests
- Reduces boilerplate code
- Easier debugging when tests fail

---

### 6. Implement Retry Logic for Transient Database Failures

**Why:**
Network issues and database locks can cause transient failures that should be retried.

**How:**
```java
public class DatabaseRetryUtils {

    public static <T> T executeWithRetry(Supplier<T> operation, int maxRetries) {
        int attempts = 0;
        Exception lastException = null;

        while (attempts < maxRetries) {
            try {
                return operation.get();
            } catch (Exception e) {
                lastException = e;
                attempts++;

                if (attempts < maxRetries) {
                    System.out.println("Database operation failed, retrying... (" +
                                     attempts + "/" + maxRetries + ")");

                    try {
                        Thread.sleep(1000 * attempts); // Exponential backoff
                    } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                    }
                }
            }
        }

        throw new RuntimeException("Operation failed after " + maxRetries + " retries",
                                 lastException);
    }

    public static void executeUpdateWithRetry(String sql, Object... params) {
        executeWithRetry(() -> {
            DatabaseUtils.executeUpdate(sql, params);
            return null;
        }, 3);
    }

    public static List<Map<String, Object>> executeQueryWithRetry(String sql, Object... params) {
        return executeWithRetry(() -> DatabaseUtils.executeQuery(sql, params), 3);
    }
}

// Usage
@Test
public void testWithRetry() {
    // Retry on transient failures
    DatabaseRetryUtils.executeUpdateWithRetry(
        "UPDATE users SET status = ? WHERE id = ?",
        "inactive", 123
    );

    List<Map<String, Object>> results = DatabaseRetryUtils.executeQueryWithRetry(
        "SELECT * FROM users WHERE status = ?",
        "active"
    );
}
```

**Benefits:**
- Handles transient failures gracefully
- Reduces flaky test failures
- Improves test reliability
- Provides exponential backoff
- Easy to configure retry count
- Better production-like behavior

---

### 7. Monitor and Log Database Operations

**Why:**
Logging database operations helps with debugging and performance analysis.

**How:**
```java
public class DatabaseLogger {
    private static final Logger logger = LogManager.getLogger(DatabaseLogger.class);

    public static List<Map<String, Object>> executeQueryWithLogging(
            String sql, Object... params) {
        long startTime = System.currentTimeMillis();

        logger.info("Executing query: {}", sql);
        logger.debug("Parameters: {}", Arrays.toString(params));

        try {
            List<Map<String, Object>> results = DatabaseUtils.executeQuery(sql, params);

            long executionTime = System.currentTimeMillis() - startTime;
            logger.info("Query executed successfully. Rows: {}, Time: {}ms",
                       results.size(), executionTime);

            if (executionTime > 1000) {
                logger.warn("Slow query detected: {}ms for SQL: {}", executionTime, sql);
            }

            return results;

        } catch (Exception e) {
            long executionTime = System.currentTimeMillis() - startTime;
            logger.error("Query failed after {}ms. SQL: {}, Error: {}",
                        executionTime, sql, e.getMessage());
            throw e;
        }
    }

    public static int executeUpdateWithLogging(String sql, Object... params) {
        long startTime = System.currentTimeMillis();

        logger.info("Executing update: {}", sql);
        logger.debug("Parameters: {}", Arrays.toString(params));

        try {
            int rowsAffected = DatabaseUtils.executeUpdate(sql, params);

            long executionTime = System.currentTimeMillis() - startTime;
            logger.info("Update executed successfully. Rows affected: {}, Time: {}ms",
                       rowsAffected, executionTime);

            return rowsAffected;

        } catch (Exception e) {
            long executionTime = System.currentTimeMillis() - startTime;
            logger.error("Update failed after {}ms. SQL: {}, Error: {}",
                        executionTime, sql, e.getMessage());
            throw e;
        }
    }
}

// Configure logging in log4j2.xml
/*
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="WARN">
    <Appenders>
        <Console name="Console" target="SYSTEM_OUT">
            <PatternLayout pattern="%d{HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n"/>
        </Console>
        <File name="DatabaseLog" fileName="logs/database.log">
            <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n"/>
        </File>
    </Appenders>
    <Loggers>
        <Logger name="DatabaseLogger" level="debug" additivity="false">
            <AppenderRef ref="Console"/>
            <AppenderRef ref="DatabaseLog"/>
        </Logger>
        <Root level="info">
            <AppenderRef ref="Console"/>
        </Root>
    </Loggers>
</Configuration>
*/
```

**Benefits:**
- Easy debugging of database issues
- Performance monitoring and optimization
- Audit trail of database operations
- Identifies slow queries
- Helps diagnose test failures
- Production-ready logging practices

---

**Happy Testing!**
