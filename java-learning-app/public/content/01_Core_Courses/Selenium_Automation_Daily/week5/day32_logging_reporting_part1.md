# Day 38: Logging & Reporting Part 1 - Log4j & SLF4J

## Learning Objectives

By the end of this lesson, you will be able to:
- Understand the importance of logging in test automation
- Implement Log4j2 in Selenium test framework
- Configure different log levels effectively
- Set up Log4j2 using XML, JSON, and properties files
- Use console and file appenders for log output
- Create custom log patterns for better readability
- Implement rolling file appenders for log management
- Understand and use SLF4J (Simple Logging Facade)
- Integrate SLF4J with Log4j2 backend
- Apply logging best practices in test automation
- Create reusable logger utility classes
- Debug and troubleshoot tests using logs
- Write production-ready logging implementations

---

## 1. Introduction to Logging in Test Automation

### What is Logging?

**Logging** is the process of recording events, activities, and messages that occur during test execution. It provides visibility into what's happening inside your test automation framework.

### Why Logging is Critical in Test Automation

1. **Debugging Failed Tests**
   - Understand why a test failed
   - Track execution flow
   - Identify the exact point of failure

2. **Performance Monitoring**
   - Track test execution time
   - Identify performance bottlenecks
   - Monitor resource usage

3. **Audit Trail**
   - Record what actions were performed
   - Track configuration changes
   - Maintain historical records

4. **Production Support**
   - Troubleshoot issues in different environments
   - Provide evidence of test execution
   - Help developers reproduce issues

5. **Compliance and Reporting**
   - Meet regulatory requirements
   - Generate detailed test reports
   - Document test evidence

### Logging vs Print Statements

```java
// BAD - Using System.out.println()
public void testLogin() {
    System.out.println("Starting login test");  // ❌ No control
    driver.get("https://example.com");
    System.out.println("Opened website");  // ❌ Can't disable
    // More test code
}

// GOOD - Using Logger
public void testLogin() {
    logger.info("Starting login test");  // ✓ Configurable
    driver.get("https://example.com");
    logger.debug("Navigated to URL: {}", driver.getCurrentUrl());  // ✓ Levels
    // More test code
}
```

**Problems with System.out.println():**
- Can't control output (always prints)
- No log levels (DEBUG, INFO, ERROR)
- No timestamps
- No log file support
- Hard to filter logs
- Performance impact

**Benefits of Logging Framework:**
- Configurable log levels
- Automatic timestamps
- Write to files and console
- Filter by package/class
- Structured log format
- Better performance

---

## 2. Log4j2 Fundamentals

### What is Log4j2?

**Apache Log4j 2** is a fast, flexible, and reliable logging framework for Java applications. It's the successor to Log4j 1.x with significant improvements.

### Key Features of Log4j2

1. **Performance**: Asynchronous loggers for high throughput
2. **Flexibility**: Multiple configuration formats (XML, JSON, YAML, Properties)
3. **Plugin Architecture**: Extensible and customizable
4. **Lambda Support**: Java 8 lambda expressions for lazy evaluation
5. **Custom Log Levels**: Define your own log levels
6. **Automatic Reloading**: Configuration changes without restart

### Log4j2 Architecture

```
Application Code
     ↓
Logger (LogManager.getLogger())
     ↓
LoggerConfig (Configuration)
     ↓
Appenders (Console, File, etc.)
     ↓
Layouts (Pattern, JSON, XML)
     ↓
Final Output (Console, File, Database)
```

### Maven Dependencies

**pom.xml:**
```xml
<dependencies>
    <!-- Log4j2 Core -->
    <dependency>
        <groupId>org.apache.logging.log4j</groupId>
        <artifactId>log4j-core</artifactId>
        <version>2.23.0</version>
    </dependency>

    <!-- Log4j2 API -->
    <dependency>
        <groupId>org.apache.logging.log4j</groupId>
        <artifactId>log4j-api</artifactId>
        <version>2.23.0</version>
    </dependency>

    <!-- SLF4J Bridge for Log4j2 (Optional - covered later) -->
    <dependency>
        <groupId>org.apache.logging.log4j</groupId>
        <artifactId>log4j-slf4j2-impl</artifactId>
        <version>2.23.0</version>
    </dependency>
</dependencies>
```

### Basic Usage Example

```java
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class BasicLoggingExample {
    // Create logger instance
    private static final Logger logger = LogManager.getLogger(BasicLoggingExample.class);

    public static void main(String[] args) {
        logger.info("Application started");
        logger.debug("Debug information");
        logger.error("An error occurred");
        logger.warn("Warning message");
    }
}
```

---

## 3. Log Levels in Log4j2

### Understanding Log Levels

Log levels help categorize log messages by severity. Log4j2 provides six standard log levels:

### Log Level Hierarchy

```
ALL (Lowest)
  ↓
TRACE (Most verbose)
  ↓
DEBUG
  ↓
INFO
  ↓
WARN
  ↓
ERROR
  ↓
FATAL
  ↓
OFF (Highest - No logging)
```

### 1. TRACE

**Purpose:** Very detailed diagnostic information

**When to Use:**
- Tracing code execution step by step
- Debugging complex logic
- Development only

```java
logger.trace("Entering method calculateTotal()");
logger.trace("Parameter values: item={}, quantity={}", item, quantity);
logger.trace("Exiting method calculateTotal() with result: {}", result);
```

### 2. DEBUG

**Purpose:** Detailed debugging information

**When to Use:**
- Development and testing
- Debugging test failures
- Understanding test flow

```java
logger.debug("Finding element with locator: {}", locator);
logger.debug("Element found: {}", element);
logger.debug("Current URL: {}", driver.getCurrentUrl());
logger.debug("Test data: username={}, password=***", username);
```

### 3. INFO

**Purpose:** General informational messages

**When to Use:**
- Test execution milestones
- Important business events
- Production logging

```java
logger.info("Starting test: testLoginWithValidCredentials");
logger.info("User logged in successfully: {}", username);
logger.info("Test completed with status: PASSED");
logger.info("Total execution time: {} ms", duration);
```

### 4. WARN

**Purpose:** Warning messages - potential problems

**When to Use:**
- Recoverable errors
- Deprecated feature usage
- Configuration issues

```java
logger.warn("Element not found on first attempt, retrying...");
logger.warn("Using default timeout value: {} seconds", defaultTimeout);
logger.warn("Test environment is not configured properly");
```

### 5. ERROR

**Purpose:** Error messages - something went wrong

**When to Use:**
- Test failures
- Exceptions
- Unrecoverable errors

```java
logger.error("Test failed: {}", testName);
logger.error("Failed to connect to database", exception);
logger.error("Element not found: {}", locator);
```

### 6. FATAL

**Purpose:** Critical errors - application should terminate

**When to Use:**
- System failures
- Critical resources unavailable
- Cannot continue execution

```java
logger.fatal("Cannot initialize WebDriver");
logger.fatal("Configuration file not found: {}", configPath);
logger.fatal("Database connection failed - cannot proceed");
```

### Complete Example with All Log Levels

```java
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class LogLevelsExample {
    private static final Logger logger = LogManager.getLogger(LogLevelsExample.class);

    public void performLogin(String username, String password) {
        logger.trace("Method entry: performLogin()");
        logger.debug("Login parameters - username: {}", username);

        try {
            logger.info("Attempting to login with user: {}", username);

            // Find elements
            logger.debug("Locating username field");
            WebElement usernameField = driver.findElement(By.id("username"));

            // Enter credentials
            logger.debug("Entering username");
            usernameField.sendKeys(username);

            logger.debug("Entering password");
            driver.findElement(By.id("password")).sendKeys(password);

            // Click login
            logger.info("Clicking login button");
            driver.findElement(By.id("loginBtn")).click();

            // Verify login
            if (isLoginSuccessful()) {
                logger.info("Login successful for user: {}", username);
            } else {
                logger.warn("Login verification failed - unexpected page displayed");
            }

        } catch (NoSuchElementException e) {
            logger.error("Login failed - element not found", e);
            throw e;
        } catch (Exception e) {
            logger.fatal("Critical error during login", e);
            throw e;
        } finally {
            logger.trace("Method exit: performLogin()");
        }
    }

    private boolean isLoginSuccessful() {
        try {
            return driver.findElement(By.id("dashboard")).isDisplayed();
        } catch (NoSuchElementException e) {
            logger.debug("Dashboard element not found - login may have failed");
            return false;
        }
    }
}
```

### Setting Log Level in Configuration

When you set a log level, only that level and higher severity messages are logged:

```xml
<!-- Root level set to INFO -->
<!-- Will log: INFO, WARN, ERROR, FATAL -->
<!-- Will NOT log: DEBUG, TRACE -->
<Root level="INFO">
    <AppenderRef ref="Console"/>
</Root>

<!-- For development - set to DEBUG -->
<Root level="DEBUG">
    <AppenderRef ref="Console"/>
</Root>

<!-- For production - set to WARN or ERROR -->
<Root level="WARN">
    <AppenderRef ref="Console"/>
</Root>
```

---

## 4. Log4j2 Configuration - XML Format

### Why Configure Log4j2?

Default configuration is limited. Custom configuration allows:
- Control log levels
- Define output destinations
- Format log messages
- Set up rolling policies
- Configure different loggers for different packages

### Configuration File Location

Log4j2 looks for configuration in this order:
1. `log4j2-test.xml` in classpath (for test scope)
2. `log4j2.xml` in classpath
3. `log4j2.json` in classpath
4. `log4j2.properties` in classpath

**Recommended location:** `src/test/resources/log4j2.xml`

### Basic XML Configuration

**src/test/resources/log4j2.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="WARN">
    <!-- Appenders define where logs go -->
    <Appenders>
        <!-- Console Appender -->
        <Console name="Console" target="SYSTEM_OUT">
            <PatternLayout pattern="%d{HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n"/>
        </Console>
    </Appenders>

    <!-- Loggers define logging behavior -->
    <Loggers>
        <!-- Root logger - applies to all classes -->
        <Root level="INFO">
            <AppenderRef ref="Console"/>
        </Root>
    </Loggers>
</Configuration>
```

### Complete XML Configuration Example

**src/test/resources/log4j2.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="WARN" monitorInterval="30">

    <!-- Properties for reusability -->
    <Properties>
        <Property name="LOG_PATTERN">
            %d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n
        </Property>
        <Property name="LOG_DIR">logs</Property>
    </Properties>

    <!-- Appenders -->
    <Appenders>
        <!-- Console Appender -->
        <Console name="Console" target="SYSTEM_OUT">
            <PatternLayout pattern="${LOG_PATTERN}"/>
        </Console>

        <!-- File Appender -->
        <File name="FileAppender" fileName="${LOG_DIR}/test-automation.log"
              append="true">
            <PatternLayout pattern="${LOG_PATTERN}"/>
        </File>

        <!-- Rolling File Appender -->
        <RollingFile name="RollingFile"
                     fileName="${LOG_DIR}/app.log"
                     filePattern="${LOG_DIR}/app-%d{yyyy-MM-dd}-%i.log.gz">
            <PatternLayout pattern="${LOG_PATTERN}"/>
            <Policies>
                <!-- Roll over daily -->
                <TimeBasedTriggeringPolicy interval="1" modulate="true"/>
                <!-- Roll over when file reaches 10MB -->
                <SizeBasedTriggeringPolicy size="10 MB"/>
            </Policies>
            <!-- Keep 30 days of logs -->
            <DefaultRolloverStrategy max="30"/>
        </RollingFile>
    </Appenders>

    <!-- Loggers -->
    <Loggers>
        <!-- Specific logger for your test package -->
        <Logger name="com.automation.tests" level="DEBUG" additivity="false">
            <AppenderRef ref="Console"/>
            <AppenderRef ref="RollingFile"/>
        </Logger>

        <!-- Specific logger for page objects -->
        <Logger name="com.automation.pages" level="INFO" additivity="false">
            <AppenderRef ref="Console"/>
            <AppenderRef ref="RollingFile"/>
        </Logger>

        <!-- Reduce Selenium logging -->
        <Logger name="org.openqa.selenium" level="WARN" additivity="false">
            <AppenderRef ref="Console"/>
        </Logger>

        <!-- Root logger -->
        <Root level="INFO">
            <AppenderRef ref="Console"/>
            <AppenderRef ref="FileAppender"/>
        </Root>
    </Loggers>
</Configuration>
```

### XML Configuration Elements Explained

#### 1. Configuration Element

```xml
<Configuration status="WARN" monitorInterval="30">
```

- `status`: Internal Log4j2 logging level
- `monitorInterval`: Seconds to check for config changes (auto-reload)

#### 2. Properties

```xml
<Properties>
    <Property name="LOG_PATTERN">%d{yyyy-MM-dd HH:mm:ss} %-5level - %msg%n</Property>
</Properties>
```

Define reusable values using `${propertyName}`

#### 3. Appenders

Define output destinations (Console, File, Database, etc.)

#### 4. Loggers

Define logging behavior for specific packages or classes

#### 5. Root Logger

Fallback logger for all classes without specific logger configuration

---

## 5. Log4j2 Configuration - JSON Format

### JSON Configuration Example

**src/test/resources/log4j2.json:**
```json
{
  "configuration": {
    "status": "WARN",
    "monitorInterval": 30,

    "properties": {
      "property": [
        {
          "name": "LOG_PATTERN",
          "value": "%d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n"
        },
        {
          "name": "LOG_DIR",
          "value": "logs"
        }
      ]
    },

    "appenders": {
      "Console": {
        "name": "Console",
        "target": "SYSTEM_OUT",
        "PatternLayout": {
          "pattern": "${LOG_PATTERN}"
        }
      },

      "RollingFile": {
        "name": "RollingFile",
        "fileName": "${LOG_DIR}/app.log",
        "filePattern": "${LOG_DIR}/app-%d{yyyy-MM-dd}-%i.log.gz",
        "PatternLayout": {
          "pattern": "${LOG_PATTERN}"
        },
        "Policies": {
          "TimeBasedTriggeringPolicy": {
            "interval": 1,
            "modulate": true
          },
          "SizeBasedTriggeringPolicy": {
            "size": "10 MB"
          }
        },
        "DefaultRolloverStrategy": {
          "max": "30"
        }
      }
    },

    "loggers": {
      "logger": [
        {
          "name": "com.automation.tests",
          "level": "DEBUG",
          "additivity": false,
          "AppenderRef": [
            { "ref": "Console" },
            { "ref": "RollingFile" }
          ]
        }
      ],
      "root": {
        "level": "INFO",
        "AppenderRef": [
          { "ref": "Console" },
          { "ref": "RollingFile" }
        ]
      }
    }
  }
}
```

### JSON Configuration with Jackson

To use JSON configuration, add Jackson dependencies:

```xml
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.16.1</version>
</dependency>

<dependency>
    <groupId>com.fasterxml.jackson.dataformat</groupId>
    <artifactId>jackson-dataformat-yaml</artifactId>
    <version>2.16.1</version>
</dependency>
```

---

## 6. Log4j2 Configuration - Properties Format

### Properties Configuration Example

**src/test/resources/log4j2.properties:**
```properties
# Root logger
status = WARN
name = PropertiesConfig

# Properties
property.LOG_PATTERN = %d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n
property.LOG_DIR = logs

# Console Appender
appender.console.type = Console
appender.console.name = Console
appender.console.layout.type = PatternLayout
appender.console.layout.pattern = ${LOG_PATTERN}

# File Appender
appender.file.type = File
appender.file.name = FileAppender
appender.file.fileName = ${LOG_DIR}/test-automation.log
appender.file.layout.type = PatternLayout
appender.file.layout.pattern = ${LOG_PATTERN}

# Rolling File Appender
appender.rolling.type = RollingFile
appender.rolling.name = RollingFile
appender.rolling.fileName = ${LOG_DIR}/app.log
appender.rolling.filePattern = ${LOG_DIR}/app-%d{yyyy-MM-dd}-%i.log.gz
appender.rolling.layout.type = PatternLayout
appender.rolling.layout.pattern = ${LOG_PATTERN}
appender.rolling.policies.type = Policies
appender.rolling.policies.time.type = TimeBasedTriggeringPolicy
appender.rolling.policies.time.interval = 1
appender.rolling.policies.time.modulate = true
appender.rolling.policies.size.type = SizeBasedTriggeringPolicy
appender.rolling.policies.size.size = 10MB
appender.rolling.strategy.type = DefaultRolloverStrategy
appender.rolling.strategy.max = 30

# Logger for test package
logger.tests.name = com.automation.tests
logger.tests.level = DEBUG
logger.tests.additivity = false
logger.tests.appenderRef.console.ref = Console
logger.tests.appenderRef.rolling.ref = RollingFile

# Logger for Selenium (reduce verbosity)
logger.selenium.name = org.openqa.selenium
logger.selenium.level = WARN

# Root Logger
rootLogger.level = INFO
rootLogger.appenderRef.console.ref = Console
rootLogger.appenderRef.file.ref = FileAppender
```

---

## 7. Console and File Appenders

### Console Appender

Writes logs to console (stdout/stderr)

```xml
<Console name="ConsoleAppender" target="SYSTEM_OUT">
    <PatternLayout pattern="%d{HH:mm:ss.SSS} %-5level %logger{36} - %msg%n"/>
</Console>

<!-- For error logs to stderr -->
<Console name="ErrorConsole" target="SYSTEM_ERR">
    <PatternLayout pattern="%d{HH:mm:ss.SSS} [ERROR] %logger{36} - %msg%n"/>
    <ThresholdFilter level="ERROR" onMatch="ACCEPT" onMismatch="DENY"/>
</Console>
```

### File Appender

Writes logs to a single file

```xml
<File name="FileAppender" fileName="logs/application.log" append="true">
    <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n"/>
</File>

<!-- Separate file for error logs -->
<File name="ErrorFile" fileName="logs/errors.log">
    <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %level %logger{36} - %msg%n"/>
    <ThresholdFilter level="ERROR" onMatch="ACCEPT" onMismatch="DENY"/>
</File>
```

### Appender Properties

- `name`: Unique identifier for the appender
- `fileName`: Path to log file
- `append`:
  - `true`: Append to existing file
  - `false`: Overwrite file on each run

---

## 8. Custom Log Patterns

### Pattern Layout Basics

Pattern layout controls how log messages are formatted.

### Common Pattern Conversion Specifiers

| Pattern | Description | Example |
|---------|-------------|---------|
| `%d` | Date/Time | `2024-01-15 14:30:25` |
| `%t` | Thread name | `main` |
| `%level` | Log level | `INFO` |
| `%-5level` | Log level (left-aligned, width 5) | `INFO ` |
| `%logger` | Logger name (full) | `com.automation.tests.LoginTest` |
| `%logger{36}` | Logger name (max 36 chars) | `c.a.tests.LoginTest` |
| `%C` | Class name (full) | `com.automation.tests.LoginTest` |
| `%M` | Method name | `testLogin` |
| `%L` | Line number | `45` |
| `%msg` | Log message | `User logged in` |
| `%n` | New line | Line break |
| `%ex` | Exception stack trace | Full stack trace |
| `%throwable{short}` | Short exception | First line of exception |

### Pattern Examples

#### 1. Simple Pattern

```xml
<PatternLayout pattern="%d{HH:mm:ss} %-5level - %msg%n"/>
```

Output:
```
14:30:25 INFO  - Starting test
14:30:26 DEBUG - Finding element
14:30:27 ERROR - Test failed
```

#### 2. Detailed Pattern

```xml
<PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n"/>
```

Output:
```
2024-01-15 14:30:25.123 [main] INFO  c.a.tests.LoginTest - Starting test
2024-01-15 14:30:26.456 [main] DEBUG c.a.pages.LoginPage - Finding element
2024-01-15 14:30:27.789 [main] ERROR c.a.tests.LoginTest - Test failed
```

#### 3. Pattern with Class and Method

```xml
<PatternLayout pattern="%d{HH:mm:ss.SSS} [%t] %-5level %C.%M:%L - %msg%n"/>
```

Output:
```
14:30:25.123 [main] INFO  LoginTest.testLogin:45 - Starting test
14:30:26.456 [main] DEBUG LoginPage.enterCredentials:78 - Entering username
```

#### 4. Colorized Console Pattern (ANSI Colors)

```xml
<Console name="Console" target="SYSTEM_OUT">
    <PatternLayout>
        <Pattern>%d{HH:mm:ss.SSS} %highlight{%-5level}{FATAL=red, ERROR=red, WARN=yellow, INFO=green, DEBUG=cyan, TRACE=blue} %style{%logger{36}}{cyan} - %msg%n</Pattern>
    </PatternLayout>
</Console>
```

#### 5. Custom Patterns for Different Appenders

```xml
<Appenders>
    <!-- Console - concise format -->
    <Console name="Console" target="SYSTEM_OUT">
        <PatternLayout pattern="%d{HH:mm:ss} %-5level - %msg%n"/>
    </Console>

    <!-- File - detailed format -->
    <File name="FileAppender" fileName="logs/detailed.log">
        <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5level %logger{36}.%M:%L - %msg%n"/>
    </File>

    <!-- Error File - with stack trace -->
    <File name="ErrorFile" fileName="logs/errors.log">
        <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %level %logger{36} - %msg%n%throwable"/>
    </File>
</Appenders>
```

### Complete Custom Pattern Example

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="WARN">
    <Appenders>
        <!-- Console with colors and emojis -->
        <Console name="Console" target="SYSTEM_OUT">
            <PatternLayout>
                <Pattern>%d{HH:mm:ss.SSS} %highlight{%-5level}{FATAL=red, ERROR=red, WARN=yellow, INFO=green, DEBUG=cyan} %style{[%t]}{blue} %style{%logger{36}}{magenta} - %msg%n%throwable{short}</Pattern>
            </PatternLayout>
        </Console>

        <!-- Detailed file log -->
        <RollingFile name="DetailedLog" fileName="logs/detailed.log"
                     filePattern="logs/detailed-%d{yyyy-MM-dd}-%i.log">
            <PatternLayout>
                <Pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} | %-5level | %t | %logger{36}.%M:%L | %msg%n</Pattern>
            </PatternLayout>
            <Policies>
                <TimeBasedTriggeringPolicy/>
                <SizeBasedTriggeringPolicy size="10 MB"/>
            </Policies>
        </RollingFile>

        <!-- Test execution log - simplified -->
        <RollingFile name="TestLog" fileName="logs/test-execution.log"
                     filePattern="logs/test-execution-%d{yyyy-MM-dd}.log">
            <PatternLayout>
                <Pattern>%d{HH:mm:ss} | %-5level | %msg%n</Pattern>
            </PatternLayout>
            <Policies>
                <TimeBasedTriggeringPolicy/>
            </Policies>
        </RollingFile>
    </Appenders>

    <Loggers>
        <Root level="INFO">
            <AppenderRef ref="Console"/>
            <AppenderRef ref="DetailedLog"/>
            <AppenderRef ref="TestLog"/>
        </Root>
    </Loggers>
</Configuration>
```

---

## 9. Rolling File Appenders

### Why Rolling File Appenders?

**Problems with regular File Appender:**
- Log files grow indefinitely
- Can fill up disk space
- Hard to manage large files
- Performance issues with huge files

**Rolling File Appender Solution:**
- Automatically creates new log files
- Based on size or time
- Archives old logs
- Deletes old logs automatically

### Basic Rolling File Appender

```xml
<RollingFile name="RollingFile"
             fileName="logs/app.log"
             filePattern="logs/app-%d{yyyy-MM-dd}-%i.log">
    <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss} %-5level - %msg%n"/>
    <Policies>
        <TimeBasedTriggeringPolicy interval="1" modulate="true"/>
        <SizeBasedTriggeringPolicy size="10 MB"/>
    </Policies>
    <DefaultRolloverStrategy max="30"/>
</RollingFile>
```

### Rolling Policies

#### 1. Time-Based Triggering Policy

Rolls logs based on time interval:

```xml
<!-- Roll daily at midnight -->
<TimeBasedTriggeringPolicy interval="1" modulate="true"/>

<!-- Roll every hour -->
<TimeBasedTriggeringPolicy interval="1" modulate="false"/>

<!-- File pattern determines frequency -->
filePattern="logs/app-%d{yyyy-MM-dd}.log"      <!-- Daily -->
filePattern="logs/app-%d{yyyy-MM-dd-HH}.log"   <!-- Hourly -->
filePattern="logs/app-%d{yyyy-MM}.log"         <!-- Monthly -->
```

#### 2. Size-Based Triggering Policy

Rolls logs when file reaches specified size:

```xml
<!-- Roll when file reaches 10 MB -->
<SizeBasedTriggeringPolicy size="10 MB"/>

<!-- Other size examples -->
<SizeBasedTriggeringPolicy size="5 KB"/>
<SizeBasedTriggeringPolicy size="100 MB"/>
<SizeBasedTriggeringPolicy size="1 GB"/>
```

#### 3. On Startup Triggering Policy

Rolls logs on application startup:

```xml
<OnStartupTriggeringPolicy/>
```

### Rollover Strategy

Controls how many log files to keep:

```xml
<!-- Keep maximum 30 rolled files -->
<DefaultRolloverStrategy max="30"/>

<!-- Keep files based on time (delete files older than 30 days) -->
<DefaultRolloverStrategy>
    <Delete basePath="logs" maxDepth="1">
        <IfFileName glob="app-*.log"/>
        <IfLastModified age="30d"/>
    </Delete>
</DefaultRolloverStrategy>
```

### Complete Rolling File Examples

#### Example 1: Daily Rolling with Size Limit

```xml
<RollingFile name="DailyRolling"
             fileName="logs/test-automation.log"
             filePattern="logs/test-automation-%d{yyyy-MM-dd}-%i.log.gz">
    <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n"/>

    <Policies>
        <!-- Roll at midnight -->
        <TimeBasedTriggeringPolicy interval="1" modulate="true"/>
        <!-- Also roll if size exceeds 50 MB -->
        <SizeBasedTriggeringPolicy size="50 MB"/>
    </Policies>

    <!-- Keep 90 days of logs -->
    <DefaultRolloverStrategy max="90">
        <Delete basePath="logs" maxDepth="1">
            <IfFileName glob="test-automation-*.log.gz"/>
            <IfLastModified age="90d"/>
        </Delete>
    </DefaultRolloverStrategy>
</RollingFile>
```

#### Example 2: Hourly Rolling for Debugging

```xml
<RollingFile name="HourlyRolling"
             fileName="logs/debug.log"
             filePattern="logs/debug-%d{yyyy-MM-dd-HH}-%i.log">
    <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5level %logger{36}.%M:%L - %msg%n"/>

    <Policies>
        <!-- Roll every hour -->
        <TimeBasedTriggeringPolicy interval="1" modulate="false"/>
        <!-- Roll if size exceeds 20 MB -->
        <SizeBasedTriggeringPolicy size="20 MB"/>
    </Policies>

    <!-- Keep 24 hours of logs -->
    <DefaultRolloverStrategy max="24"/>
</RollingFile>
```

#### Example 3: Size-Based Only (For Test Runs)

```xml
<RollingFile name="TestRunLog"
             fileName="logs/test-run.log"
             filePattern="logs/test-run-%i.log">
    <PatternLayout pattern="%d{HH:mm:ss.SSS} %-5level - %msg%n"/>

    <Policies>
        <!-- Roll when exceeds 5 MB -->
        <SizeBasedTriggeringPolicy size="5 MB"/>
        <!-- Also roll on application startup -->
        <OnStartupTriggeringPolicy/>
    </Policies>

    <!-- Keep only 5 most recent files -->
    <DefaultRolloverStrategy max="5"/>
</RollingFile>
```

### Complete Configuration with Multiple Rolling Appenders

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="WARN">
    <Properties>
        <Property name="LOG_DIR">logs</Property>
        <Property name="PATTERN">%d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n</Property>
    </Properties>

    <Appenders>
        <Console name="Console" target="SYSTEM_OUT">
            <PatternLayout pattern="%d{HH:mm:ss.SSS} %-5level - %msg%n"/>
        </Console>

        <!-- General application log - daily rolling -->
        <RollingFile name="AppLog"
                     fileName="${LOG_DIR}/application.log"
                     filePattern="${LOG_DIR}/archives/application-%d{yyyy-MM-dd}-%i.log.gz">
            <PatternLayout pattern="${PATTERN}"/>
            <Policies>
                <TimeBasedTriggeringPolicy interval="1" modulate="true"/>
                <SizeBasedTriggeringPolicy size="50 MB"/>
            </Policies>
            <DefaultRolloverStrategy max="30"/>
        </RollingFile>

        <!-- Error log - separate file -->
        <RollingFile name="ErrorLog"
                     fileName="${LOG_DIR}/errors.log"
                     filePattern="${LOG_DIR}/archives/errors-%d{yyyy-MM-dd}-%i.log.gz">
            <PatternLayout pattern="${PATTERN}"/>
            <ThresholdFilter level="ERROR" onMatch="ACCEPT" onMismatch="DENY"/>
            <Policies>
                <TimeBasedTriggeringPolicy interval="1" modulate="true"/>
                <SizeBasedTriggeringPolicy size="10 MB"/>
            </Policies>
            <DefaultRolloverStrategy max="60"/>
        </RollingFile>

        <!-- Test execution log - size-based -->
        <RollingFile name="TestLog"
                     fileName="${LOG_DIR}/test-execution.log"
                     filePattern="${LOG_DIR}/test-execution-%i.log">
            <PatternLayout pattern="%d{HH:mm:ss.SSS} %-5level - %msg%n"/>
            <Policies>
                <OnStartupTriggeringPolicy/>
                <SizeBasedTriggeringPolicy size="10 MB"/>
            </Policies>
            <DefaultRolloverStrategy max="10"/>
        </RollingFile>
    </Appenders>

    <Loggers>
        <Logger name="com.automation" level="DEBUG" additivity="false">
            <AppenderRef ref="Console"/>
            <AppenderRef ref="AppLog"/>
            <AppenderRef ref="ErrorLog"/>
        </Logger>

        <Root level="INFO">
            <AppenderRef ref="Console"/>
            <AppenderRef ref="TestLog"/>
        </Root>
    </Loggers>
</Configuration>
```

---

## 10. SLF4J - Simple Logging Facade for Java

### What is SLF4J?

**SLF4J** (Simple Logging Facade for Java) is an abstraction layer for various logging frameworks. It provides a common API while allowing you to plug in different logging implementations.

### Why Use SLF4J?

1. **Framework Independence**
   - Switch logging frameworks without code changes
   - Code against interface, not implementation

2. **Library Compatibility**
   - Most Java libraries use SLF4J
   - Unified logging across dependencies

3. **Performance**
   - Lazy evaluation with parameterized messages
   - Minimal overhead

4. **Flexibility**
   - Choose backend at deployment time
   - No code changes needed

### SLF4J Architecture

```
Your Application Code
         ↓
    SLF4J API (org.slf4j)
         ↓
   SLF4J Binding
         ↓
Actual Logging Framework
(Log4j2, Logback, JUL, etc.)
```

### SLF4J Maven Dependencies

```xml
<dependencies>
    <!-- SLF4J API -->
    <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-api</artifactId>
        <version>2.0.11</version>
    </dependency>

    <!-- SLF4J to Log4j2 Bridge -->
    <dependency>
        <groupId>org.apache.logging.log4j</groupId>
        <artifactId>log4j-slf4j2-impl</artifactId>
        <version>2.23.0</version>
    </dependency>

    <!-- Log4j2 Implementation -->
    <dependency>
        <groupId>org.apache.logging.log4j</groupId>
        <artifactId>log4j-core</artifactId>
        <version>2.23.0</version>
    </dependency>

    <dependency>
        <groupId>org.apache.logging.log4j</groupId>
        <artifactId>log4j-api</artifactId>
        <version>2.23.0</version>
    </dependency>
</dependencies>
```

### Basic SLF4J Usage

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SLF4JExample {
    // Create logger using SLF4J
    private static final Logger logger = LoggerFactory.getLogger(SLF4JExample.class);

    public void demonstrateLogging() {
        logger.trace("This is TRACE level");
        logger.debug("This is DEBUG level");
        logger.info("This is INFO level");
        logger.warn("This is WARN level");
        logger.error("This is ERROR level");
    }
}
```

### SLF4J vs Log4j2 Comparison

```java
// Direct Log4j2 usage
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

private static final Logger logger = LogManager.getLogger(MyClass.class);

// SLF4J usage (recommended)
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

private static final Logger logger = LoggerFactory.getLogger(MyClass.class);
```

### SLF4J Parameterized Messages

SLF4J supports efficient parameterized logging:

```java
// BAD - String concatenation (evaluated even if logging disabled)
logger.debug("User " + username + " logged in at " + timestamp);

// GOOD - SLF4J parameterized (only evaluated if logging enabled)
logger.debug("User {} logged in at {}", username, timestamp);

// Multiple parameters
logger.info("Test: {}, Status: {}, Duration: {} ms", testName, status, duration);

// With exception
logger.error("Login failed for user: {}", username, exception);
```

---

## 11. Using SLF4J with Log4j2

### Complete Setup

#### Step 1: Add Dependencies

```xml
<dependencies>
    <!-- SLF4J API -->
    <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-api</artifactId>
        <version>2.0.11</version>
    </dependency>

    <!-- Log4j2 SLF4J Binding -->
    <dependency>
        <groupId>org.apache.logging.log4j</groupId>
        <artifactId>log4j-slf4j2-impl</artifactId>
        <version>2.23.0</version>
    </dependency>

    <!-- Log4j2 Core -->
    <dependency>
        <groupId>org.apache.logging.log4j</groupId>
        <artifactId>log4j-core</artifactId>
        <version>2.23.0</version>
    </dependency>

    <!-- Log4j2 API -->
    <dependency>
        <groupId>org.apache.logging.log4j</groupId>
        <artifactId>log4j-api</artifactId>
        <version>2.23.0</version>
    </dependency>
</dependencies>
```

#### Step 2: Configure Log4j2

**src/test/resources/log4j2.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="WARN">
    <Appenders>
        <Console name="Console" target="SYSTEM_OUT">
            <PatternLayout pattern="%d{HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n"/>
        </Console>
    </Appenders>

    <Loggers>
        <Root level="INFO">
            <AppenderRef ref="Console"/>
        </Root>
    </Loggers>
</Configuration>
```

#### Step 3: Use SLF4J in Code

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LoginTest {
    private static final Logger logger = LoggerFactory.getLogger(LoginTest.class);

    public void testLogin() {
        logger.info("Starting login test");

        // Test implementation
        logger.debug("Navigating to login page");
        logger.info("Login successful");
    }
}
```

### Complete Example with SLF4J and Log4j2

```java
package com.automation.tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.testng.Assert;
import org.testng.annotations.*;

public class LoginTestWithSLF4J {
    // SLF4J Logger
    private static final Logger logger = LoggerFactory.getLogger(LoginTestWithSLF4J.class);

    private WebDriver driver;
    private String baseUrl = "https://example.com";

    @BeforeClass
    public void setupClass() {
        logger.info("=== Setting up LoginTestWithSLF4J class ===");
    }

    @BeforeMethod
    public void setup() {
        logger.info("Initializing WebDriver");
        driver = new ChromeDriver();
        driver.manage().window().maximize();

        logger.debug("Navigating to URL: {}", baseUrl);
        driver.get(baseUrl + "/login");
    }

    @Test(description = "Test login with valid credentials")
    public void testValidLogin() {
        logger.info("Starting test: testValidLogin");

        try {
            // Enter username
            logger.debug("Locating username field");
            WebElement usernameField = driver.findElement(By.id("username"));
            logger.debug("Entering username: testuser");
            usernameField.sendKeys("testuser");

            // Enter password
            logger.debug("Locating password field");
            WebElement passwordField = driver.findElement(By.id("password"));
            logger.debug("Entering password");
            passwordField.sendKeys("password123");

            // Click login
            logger.info("Clicking login button");
            driver.findElement(By.id("loginBtn")).click();

            // Verify login
            logger.debug("Verifying successful login");
            WebElement dashboard = driver.findElement(By.id("dashboard"));
            Assert.assertTrue(dashboard.isDisplayed(), "Dashboard should be displayed");

            logger.info("Test PASSED: testValidLogin");

        } catch (Exception e) {
            logger.error("Test FAILED: testValidLogin", e);
            throw e;
        }
    }

    @Test(description = "Test login with invalid credentials")
    public void testInvalidLogin() {
        logger.info("Starting test: testInvalidLogin");

        try {
            logger.debug("Entering invalid credentials");
            driver.findElement(By.id("username")).sendKeys("invaliduser");
            driver.findElement(By.id("password")).sendKeys("wrongpass");
            driver.findElement(By.id("loginBtn")).click();

            logger.debug("Verifying error message");
            WebElement errorMsg = driver.findElement(By.className("error-message"));
            Assert.assertTrue(errorMsg.isDisplayed(), "Error message should be displayed");

            logger.info("Test PASSED: testInvalidLogin");

        } catch (Exception e) {
            logger.error("Test FAILED: testInvalidLogin", e);
            throw e;
        }
    }

    @AfterMethod
    public void teardown() {
        if (driver != null) {
            logger.info("Closing browser");
            driver.quit();
        }
    }

    @AfterClass
    public void teardownClass() {
        logger.info("=== LoginTestWithSLF4J class completed ===");
    }
}
```

---

## 12. Logging Best Practices

### 1. Use Appropriate Log Levels

```java
// GOOD - Correct log levels
logger.trace("Method entry: calculateTotal()");
logger.debug("Intermediate calculation: subtotal = {}", subtotal);
logger.info("Order placed successfully: Order ID = {}", orderId);
logger.warn("Inventory low for product: {}", productId);
logger.error("Payment processing failed", exception);

// BAD - Wrong log levels
logger.info("Variable value: x = 5");  // Should be DEBUG
logger.error("User clicked button");   // Should be INFO or DEBUG
```

### 2. Use Parameterized Messages

```java
// BAD - String concatenation
logger.debug("User " + username + " logged in at " + timestamp);

// GOOD - Parameterized
logger.debug("User {} logged in at {}", username, timestamp);
```

### 3. Log Method Entry and Exit (TRACE level)

```java
public void processOrder(Order order) {
    logger.trace("Entering processOrder() with order: {}", order.getId());

    try {
        // Business logic
        logger.debug("Processing payment for order: {}", order.getId());

    } finally {
        logger.trace("Exiting processOrder()");
    }
}
```

### 4. Log Exceptions Properly

```java
// GOOD - Log exception with message
try {
    driver.findElement(By.id("element")).click();
} catch (NoSuchElementException e) {
    logger.error("Element not found: {}", By.id("element"), e);
    throw e;
}

// Also log the full stack trace for ERROR level
catch (Exception e) {
    logger.error("Unexpected error occurred", e);
}
```

### 5. Don't Log Sensitive Information

```java
// BAD - Logging sensitive data
logger.info("User password: {}", password);
logger.info("Credit card: {}", creditCard);
logger.debug("API Key: {}", apiKey);

// GOOD - Mask or omit sensitive data
logger.info("User logged in with username: {}", username);
logger.debug("Payment processed successfully");
logger.info("API request authenticated");
```

### 6. Use Logger Per Class

```java
// GOOD - Logger per class
public class LoginPage {
    private static final Logger logger = LoggerFactory.getLogger(LoginPage.class);
}

public class HomePage {
    private static final Logger logger = LoggerFactory.getLogger(HomePage.class);
}

// BAD - Shared logger
public class LoginPage {
    private static final Logger logger = LoggerFactory.getLogger("MyLogger");  // ❌
}
```

### 7. Avoid Logging in Loops (Use DEBUG/TRACE)

```java
// BAD - INFO level in loop
for (WebElement element : elements) {
    logger.info("Processing element: {}", element);  // ❌ Too verbose
}

// GOOD - DEBUG or aggregate INFO
logger.debug("Processing {} elements", elements.size());
for (WebElement element : elements) {
    logger.trace("Processing element: {}", element);
}
logger.info("Processed {} elements successfully", elements.size());
```

### 8. Log Context Information

```java
// Include relevant context
logger.info("Test execution started - Environment: {}, Browser: {}",
            environment, browserType);

logger.error("Test failed - Test: {}, URL: {}, User: {}",
             testName, currentUrl, username, exception);
```

### 9. Use Descriptive Messages

```java
// BAD - Unclear messages
logger.info("Done");
logger.error("Error occurred");

// GOOD - Descriptive messages
logger.info("Login test completed successfully");
logger.error("Failed to locate login button on page: {}", pageUrl);
```

### 10. Structure Logs Consistently

```java
// Consistent format across tests
logger.info("========================================");
logger.info("Test: {}", testName);
logger.info("Started at: {}", startTime);
logger.info("========================================");

// Test execution

logger.info("========================================");
logger.info("Test: {} - Status: {}", testName, status);
logger.info("Duration: {} ms", duration);
logger.info("========================================");
```

---

## 13. Integrating Logging with Test Framework

### TestNG Listener with Logging

```java
package com.automation.listeners;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.testng.*;

public class TestListener implements ITestListener {
    private static final Logger logger = LoggerFactory.getLogger(TestListener.class);

    @Override
    public void onStart(ITestContext context) {
        logger.info("======================================");
        logger.info("Test Suite Started: {}", context.getName());
        logger.info("======================================");
    }

    @Override
    public void onTestStart(ITestResult result) {
        logger.info(">>> Test Started: {}.{}",
                   result.getTestClass().getName(),
                   result.getMethod().getMethodName());
    }

    @Override
    public void onTestSuccess(ITestResult result) {
        logger.info("<<< Test PASSED: {}.{} - Duration: {} ms",
                   result.getTestClass().getName(),
                   result.getMethod().getMethodName(),
                   result.getEndMillis() - result.getStartMillis());
    }

    @Override
    public void onTestFailure(ITestResult result) {
        logger.error("<<< Test FAILED: {}.{}",
                    result.getTestClass().getName(),
                    result.getMethod().getMethodName(),
                    result.getThrowable());
    }

    @Override
    public void onTestSkipped(ITestResult result) {
        logger.warn("<<< Test SKIPPED: {}.{}",
                   result.getTestClass().getName(),
                   result.getMethod().getMethodName());
    }

    @Override
    public void onFinish(ITestContext context) {
        logger.info("======================================");
        logger.info("Test Suite Finished: {}", context.getName());
        logger.info("Total Tests: {}", context.getAllTestMethods().length);
        logger.info("Passed: {}", context.getPassedTests().size());
        logger.info("Failed: {}", context.getFailedTests().size());
        logger.info("Skipped: {}", context.getSkippedTests().size());
        logger.info("======================================");
    }
}
```

### Register Listener in testng.xml

```xml
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Test Suite">
    <listeners>
        <listener class-name="com.automation.listeners.TestListener"/>
    </listeners>

    <test name="Login Tests">
        <classes>
            <class name="com.automation.tests.LoginTest"/>
        </classes>
    </test>
</suite>
```

---

## 14. Logger Utility Class

### Complete Logger Utility Implementation

```java
package com.automation.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LoggerUtil {

    /**
     * Get logger for calling class
     */
    public static Logger getLogger() {
        // Get the class that called this method
        StackTraceElement[] stackTrace = Thread.currentThread().getStackTrace();
        String callingClass = stackTrace[2].getClassName();

        try {
            return LoggerFactory.getLogger(Class.forName(callingClass));
        } catch (ClassNotFoundException e) {
            return LoggerFactory.getLogger(LoggerUtil.class);
        }
    }

    /**
     * Log test start
     */
    public static void logTestStart(String testName) {
        Logger logger = getLogger();
        logger.info("========================================");
        logger.info("TEST STARTED: {}", testName);
        logger.info("========================================");
    }

    /**
     * Log test end
     */
    public static void logTestEnd(String testName, String status, long duration) {
        Logger logger = getLogger();
        logger.info("========================================");
        logger.info("TEST COMPLETED: {}", testName);
        logger.info("Status: {}", status);
        logger.info("Duration: {} ms", duration);
        logger.info("========================================");
    }

    /**
     * Log step
     */
    public static void logStep(String step) {
        Logger logger = getLogger();
        logger.info("STEP: {}", step);
    }

    /**
     * Log pass
     */
    public static void logPass(String message) {
        Logger logger = getLogger();
        logger.info("PASS: {}", message);
    }

    /**
     * Log fail
     */
    public static void logFail(String message) {
        Logger logger = getLogger();
        logger.error("FAIL: {}", message);
    }

    /**
     * Log fail with exception
     */
    public static void logFail(String message, Throwable throwable) {
        Logger logger = getLogger();
        logger.error("FAIL: {}", message, throwable);
    }

    /**
     * Log info
     */
    public static void info(String message, Object... args) {
        Logger logger = getLogger();
        logger.info(message, args);
    }

    /**
     * Log debug
     */
    public static void debug(String message, Object... args) {
        Logger logger = getLogger();
        logger.debug(message, args);
    }

    /**
     * Log error
     */
    public static void error(String message, Object... args) {
        Logger logger = getLogger();
        logger.error(message, args);
    }

    /**
     * Log error with exception
     */
    public static void error(String message, Throwable throwable) {
        Logger logger = getLogger();
        logger.error(message, throwable);
    }
}
```

### Using Logger Utility

```java
package com.automation.tests;

import com.automation.utils.LoggerUtil;
import org.testng.annotations.Test;

public class LoginTestWithUtility {

    @Test
    public void testLogin() {
        long startTime = System.currentTimeMillis();
        String testName = "testLogin";

        LoggerUtil.logTestStart(testName);

        try {
            LoggerUtil.logStep("Navigate to login page");
            // driver.get("https://example.com/login");

            LoggerUtil.logStep("Enter username");
            // enterUsername("testuser");

            LoggerUtil.logStep("Enter password");
            // enterPassword("password123");

            LoggerUtil.logStep("Click login button");
            // clickLogin();

            LoggerUtil.logPass("Login successful");

            long duration = System.currentTimeMillis() - startTime;
            LoggerUtil.logTestEnd(testName, "PASSED", duration);

        } catch (Exception e) {
            LoggerUtil.logFail("Login failed", e);
            long duration = System.currentTimeMillis() - startTime;
            LoggerUtil.logTestEnd(testName, "FAILED", duration);
            throw e;
        }
    }
}
```

---

## 15. Complete Logging Example

### Project Structure

```
selenium-automation/
├── src/
│   ├── main/
│   │   └── java/
│   │       ├── pages/
│   │       │   ├── BasePage.java
│   │       │   ├── LoginPage.java
│   │       │   └── HomePage.java
│   │       ├── utils/
│   │       │   └── LoggerUtil.java
│   │       └── listeners/
│   │           └── TestListener.java
│   └── test/
│       ├── java/
│       │   └── tests/
│       │       ├── BaseTest.java
│       │       └── LoginTest.java
│       └── resources/
│           └── log4j2.xml
├── logs/
└── pom.xml
```

### BasePage with Logging

```java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.time.Duration;

public class BasePage {
    protected WebDriver driver;
    protected WebDriverWait wait;
    protected Logger logger;

    public BasePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        this.logger = LoggerFactory.getLogger(this.getClass());
        PageFactory.initElements(driver, this);

        logger.debug("Initialized page: {}", this.getClass().getSimpleName());
    }

    protected void click(WebElement element) {
        try {
            logger.debug("Waiting for element to be clickable");
            wait.until(ExpectedConditions.elementToBeClickable(element));
            logger.debug("Clicking element: {}", element);
            element.click();
            logger.debug("Element clicked successfully");
        } catch (Exception e) {
            logger.error("Failed to click element: {}", element, e);
            throw e;
        }
    }

    protected void type(WebElement element, String text) {
        try {
            logger.debug("Waiting for element to be visible");
            wait.until(ExpectedConditions.visibilityOf(element));
            element.clear();
            logger.debug("Typing text into element (masked for security)");
            element.sendKeys(text);
            logger.debug("Text entered successfully");
        } catch (Exception e) {
            logger.error("Failed to type into element: {}", element, e);
            throw e;
        }
    }

    protected boolean isDisplayed(WebElement element) {
        try {
            boolean displayed = element.isDisplayed();
            logger.debug("Element visibility check: {}", displayed);
            return displayed;
        } catch (Exception e) {
            logger.debug("Element not displayed: {}", element);
            return false;
        }
    }
}
```

### LoginPage with Logging

```java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class LoginPage extends BasePage {

    @FindBy(id = "username")
    private WebElement usernameField;

    @FindBy(id = "password")
    private WebElement passwordField;

    @FindBy(id = "loginBtn")
    private WebElement loginButton;

    public LoginPage(WebDriver driver) {
        super(driver);
    }

    public void enterUsername(String username) {
        logger.info("Entering username: {}", username);
        type(usernameField, username);
    }

    public void enterPassword(String password) {
        logger.info("Entering password");
        type(passwordField, password);
    }

    public HomePage clickLogin() {
        logger.info("Clicking login button");
        click(loginButton);
        return new HomePage(driver);
    }

    public HomePage login(String username, String password) {
        logger.info("Performing login for user: {}", username);
        enterUsername(username);
        enterPassword(password);
        return clickLogin();
    }
}
```

### Test Class with Logging

```java
package tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.testng.Assert;
import org.testng.annotations.*;
import pages.HomePage;
import pages.LoginPage;

public class LoginTest {
    private static final Logger logger = LoggerFactory.getLogger(LoginTest.class);

    private WebDriver driver;
    private LoginPage loginPage;
    private String baseUrl = "https://example.com";

    @BeforeClass
    public void setupClass() {
        logger.info("========================================");
        logger.info("Setting up LoginTest class");
        logger.info("========================================");
    }

    @BeforeMethod
    public void setup() {
        logger.info("Initializing WebDriver");
        driver = new ChromeDriver();
        driver.manage().window().maximize();

        logger.info("Navigating to URL: {}", baseUrl);
        driver.get(baseUrl + "/login");

        loginPage = new LoginPage(driver);
    }

    @Test(description = "Test login with valid credentials")
    public void testValidLogin() {
        logger.info("========================================");
        logger.info("TEST: testValidLogin");
        logger.info("========================================");

        long startTime = System.currentTimeMillis();

        try {
            logger.info("Step 1: Performing login");
            HomePage homePage = loginPage.login("testuser", "password123");

            logger.info("Step 2: Verifying dashboard is displayed");
            Assert.assertTrue(homePage.isDashboardDisplayed(),
                            "Dashboard should be displayed");

            logger.info("TEST PASSED: testValidLogin");

        } catch (Exception e) {
            logger.error("TEST FAILED: testValidLogin", e);
            throw e;

        } finally {
            long duration = System.currentTimeMillis() - startTime;
            logger.info("Test duration: {} ms", duration);
        }
    }

    @Test(description = "Test login with invalid credentials")
    public void testInvalidLogin() {
        logger.info("========================================");
        logger.info("TEST: testInvalidLogin");
        logger.info("========================================");

        try {
            logger.info("Attempting login with invalid credentials");
            loginPage.login("invaliduser", "wrongpassword");

            logger.info("Verifying error message is displayed");
            Assert.assertTrue(loginPage.isErrorDisplayed(),
                            "Error message should be displayed");

            logger.info("TEST PASSED: testInvalidLogin");

        } catch (Exception e) {
            logger.error("TEST FAILED: testInvalidLogin", e);
            throw e;
        }
    }

    @AfterMethod
    public void teardown() {
        if (driver != null) {
            logger.info("Closing browser");
            driver.quit();
        }
    }

    @AfterClass
    public void teardownClass() {
        logger.info("========================================");
        logger.info("LoginTest class completed");
        logger.info("========================================");
    }
}
```

### Complete log4j2.xml Configuration

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="WARN" monitorInterval="30">

    <Properties>
        <Property name="LOG_PATTERN">
            %d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n
        </Property>
        <Property name="LOG_DIR">logs</Property>
        <Property name="ARCHIVE_DIR">${LOG_DIR}/archives</Property>
    </Properties>

    <Appenders>
        <!-- Console Appender with colors -->
        <Console name="Console" target="SYSTEM_OUT">
            <PatternLayout>
                <Pattern>%d{HH:mm:ss.SSS} %highlight{%-5level}{FATAL=red, ERROR=red, WARN=yellow, INFO=green, DEBUG=cyan} [%t] %style{%logger{36}}{cyan} - %msg%n</Pattern>
            </PatternLayout>
        </Console>

        <!-- Main application log -->
        <RollingFile name="AppLog"
                     fileName="${LOG_DIR}/test-automation.log"
                     filePattern="${ARCHIVE_DIR}/test-automation-%d{yyyy-MM-dd}-%i.log.gz">
            <PatternLayout pattern="${LOG_PATTERN}"/>
            <Policies>
                <TimeBasedTriggeringPolicy interval="1" modulate="true"/>
                <SizeBasedTriggeringPolicy size="50 MB"/>
            </Policies>
            <DefaultRolloverStrategy max="30"/>
        </RollingFile>

        <!-- Error log - separate file -->
        <RollingFile name="ErrorLog"
                     fileName="${LOG_DIR}/errors.log"
                     filePattern="${ARCHIVE_DIR}/errors-%d{yyyy-MM-dd}-%i.log.gz">
            <PatternLayout pattern="${LOG_PATTERN}"/>
            <ThresholdFilter level="ERROR" onMatch="ACCEPT" onMismatch="DENY"/>
            <Policies>
                <TimeBasedTriggeringPolicy interval="1" modulate="true"/>
                <SizeBasedTriggeringPolicy size="10 MB"/>
            </Policies>
            <DefaultRolloverStrategy max="60"/>
        </RollingFile>

        <!-- Test execution log - concise format -->
        <RollingFile name="TestLog"
                     fileName="${LOG_DIR}/test-execution.log"
                     filePattern="${LOG_DIR}/test-execution-%i.log">
            <PatternLayout pattern="%d{HH:mm:ss.SSS} %-5level - %msg%n"/>
            <Policies>
                <OnStartupTriggeringPolicy/>
                <SizeBasedTriggeringPolicy size="10 MB"/>
            </Policies>
            <DefaultRolloverStrategy max="10"/>
        </RollingFile>
    </Appenders>

    <Loggers>
        <!-- Your test package - DEBUG level -->
        <Logger name="tests" level="DEBUG" additivity="false">
            <AppenderRef ref="Console"/>
            <AppenderRef ref="AppLog"/>
            <AppenderRef ref="ErrorLog"/>
        </Logger>

        <!-- Your page package - INFO level -->
        <Logger name="pages" level="INFO" additivity="false">
            <AppenderRef ref="Console"/>
            <AppenderRef ref="AppLog"/>
            <AppenderRef ref="ErrorLog"/>
        </Logger>

        <!-- Reduce Selenium verbosity -->
        <Logger name="org.openqa.selenium" level="WARN" additivity="false">
            <AppenderRef ref="Console"/>
        </Logger>

        <!-- Reduce TestNG verbosity -->
        <Logger name="org.testng" level="WARN" additivity="false">
            <AppenderRef ref="Console"/>
        </Logger>

        <!-- Root logger -->
        <Root level="INFO">
            <AppenderRef ref="Console"/>
            <AppenderRef ref="TestLog"/>
        </Root>
    </Loggers>
</Configuration>
```

---

## 16. Key Takeaways

1. **Logging is Essential** for debugging, monitoring, and maintaining test automation
2. **Log4j2** is a powerful, flexible logging framework for Java
3. **Log Levels** (TRACE, DEBUG, INFO, WARN, ERROR, FATAL) help categorize messages
4. **Configuration** can be done using XML, JSON, or Properties files
5. **Appenders** define where logs are written (Console, File, Database)
6. **Pattern Layouts** control log message formatting
7. **Rolling File Appenders** manage log file size and rotation automatically
8. **SLF4J** provides abstraction layer for logging frameworks
9. **Best Practices** include using parameterized messages, appropriate log levels, and masking sensitive data
10. **Logger Utility Classes** provide reusable logging functionality
11. **Integration with TestNG** provides comprehensive test execution logging
12. **Structured Logging** makes debugging and troubleshooting easier

---

## 17. Common Interview Questions

### Conceptual Questions

1. **What is logging and why is it important in test automation?**
   - Recording events during test execution for debugging and monitoring

2. **Explain the difference between System.out.println() and Logger.**
   - Logger provides levels, configuration, file output, and better performance

3. **What are the different log levels in Log4j2?**
   - TRACE, DEBUG, INFO, WARN, ERROR, FATAL (from most to least verbose)

4. **When would you use DEBUG vs INFO log level?**
   - DEBUG for detailed debugging info, INFO for important milestones

5. **What is the purpose of log appenders?**
   - Define where log messages are written (console, file, database)

### Technical Questions

6. **How do you configure Log4j2 in a project?**
   - Add dependencies and create log4j2.xml in src/test/resources

7. **What is a Rolling File Appender?**
   - Automatically creates new log files based on size or time

8. **Explain the difference between additivity="true" and additivity="false".**
   - True: logs propagate to parent logger, False: logs only to configured appenders

9. **What is SLF4J and why use it?**
   - Abstraction layer that allows switching logging frameworks without code changes

10. **How do you log exceptions properly?**
    - Use logger.error() with exception as second parameter

### Practical Questions

11. **How would you set up different log levels for different packages?**
    - Use Logger elements in log4j2.xml with specific package names

12. **How do you implement logging in Page Object Model?**
    - Add logger to BasePage, use in all page classes

13. **How would you create separate log files for errors only?**
    - Use ThresholdFilter with ERROR level in RollingFile appender

14. **What pattern would you use for production vs development?**
    - Production: Concise, Development: Detailed with class/method/line numbers

15. **How do you integrate logging with TestNG listeners?**
    - Implement ITestListener and add logging in lifecycle methods

---

## Navigation

- **Previous:** [Day 37: External Data Sources](./day37_external_data.md)
- **Next:** [Day 39: Logging & Reporting Part 2 - Extent Reports](./day39_logging_reporting_part2.md)
- **Week 6 Home:** [Week 6 Overview](./README.md)

---

**Happy Learning!** Effective logging is crucial for building maintainable and debuggable test automation frameworks. Master these concepts to create production-ready test automation solutions.

---

## 18. Beginner-Friendly Exercises

Practice these exercises to master logging and reporting concepts. Each exercise builds on previous knowledge and includes complete solutions.

---

### Exercise 1: Basic Log4j2 Setup and Configuration (40 minutes)

**Objective:** Set up Log4j2 in your Selenium project with multiple appenders and custom log patterns.

**Scenario:** You need to implement logging in your test automation framework with both console and file output.

**Requirements:**
1. Add Log4j2 Maven dependencies (log4j-core and log4j-api)
2. Create log4j2.xml configuration file with:
   - Console appender with colored output
   - File appender for detailed logs
   - Error-only file appender
3. Configure different log patterns for each appender
4. Set up package-specific log levels
5. Test the configuration in a sample test class

**Code Template:**

```java
package tests;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.*;

public class LoggingSetupExercise {

    // TODO: Create logger instance for this class
    private static final Logger logger = null;

    private WebDriver driver;

    @BeforeClass
    public void setupClass() {
        // TODO: Log suite setup information
    }

    @BeforeMethod
    public void setup() {
        // TODO: Log test initialization
        // TODO: Initialize browser
        // TODO: Log browser launch
    }

    @Test(description = "Test with comprehensive logging")
    public void testWithLogging() {
        // TODO: Log test start

        try {
            // TODO: Log navigation
            driver.get("https://www.saucedemo.com");

            // TODO: Log page title retrieval
            String pageTitle = driver.getTitle();

            // TODO: Log verification steps
            if (pageTitle.contains("Swag Labs")) {
                // TODO: Log success
            } else {
                // TODO: Log warning
            }

        } catch (Exception e) {
            // TODO: Log error with exception
            throw e;
        }
    }

    @AfterMethod
    public void teardown() {
        if (driver != null) {
            // TODO: Log browser closure
            driver.quit();
        }
    }

    @AfterClass
    public void teardownClass() {
        // TODO: Log suite completion
    }
}
```

**log4j2.xml Template:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="WARN">

    <!-- TODO: Define properties for log pattern and directory -->
    <Properties>
        <Property name="LOG_PATTERN">???</Property>
        <Property name="LOG_DIR">???</Property>
    </Properties>

    <Appenders>
        <!-- TODO: Configure Console Appender with colors -->

        <!-- TODO: Configure File Appender for all logs -->

        <!-- TODO: Configure separate Error File Appender -->

    </Appenders>

    <Loggers>
        <!-- TODO: Configure logger for test package -->

        <!-- TODO: Configure Root logger -->

    </Loggers>
</Configuration>
```

**Expected Output:**
```
Console:
14:30:25.123 INFO  LoggingSetupExercise - Setting up test suite
14:30:25.456 INFO  LoggingSetupExercise - Initializing browser
14:30:26.789 INFO  LoggingSetupExercise - Test started: testWithLogging
14:30:27.012 INFO  LoggingSetupExercise - Navigating to https://www.saucedemo.com
14:30:28.234 INFO  LoggingSetupExercise - Page title: Swag Labs
14:30:28.456 PASS  LoggingSetupExercise - Page title verification successful

File: logs/application.log (detailed logs)
File: logs/errors.log (error logs only)
```

**Common Mistakes to Avoid:**
1. Forgetting to create logs directory - causes file write failures
2. Using System.out.println() instead of logger methods
3. Not setting proper log levels for different environments
4. Incorrect log4j2.xml location (must be in src/test/resources)
5. Using wrong pattern syntax causing configuration errors

**Solution Hints:**
<details>
<summary>Click to see hints</summary>

1. Logger instantiation:
```java
private static final Logger logger = LogManager.getLogger(LoggingSetupExercise.class);
```

2. Log4j2.xml console appender:
```xml
<Console name="Console" target="SYSTEM_OUT">
    <PatternLayout>
        <Pattern>%d{HH:mm:ss.SSS} %highlight{%-5level}{FATAL=red, ERROR=red, WARN=yellow, INFO=green, DEBUG=cyan} %logger{36} - %msg%n</Pattern>
    </PatternLayout>
</Console>
```

3. File appender:
```xml
<File name="FileAppender" fileName="${LOG_DIR}/application.log">
    <PatternLayout pattern="${LOG_PATTERN}"/>
</File>
```

4. Logger configuration:
```xml
<Logger name="tests" level="DEBUG" additivity="false">
    <AppenderRef ref="Console"/>
    <AppenderRef ref="FileAppender"/>
</Logger>
```

5. Logging methods:
```java
logger.info("Starting test: {}", testName);
logger.debug("Current URL: {}", driver.getCurrentUrl());
logger.error("Test failed", exception);
```
</details>

---

### Exercise 2: Implementing LoggerUtil with SLF4J (35 minutes)

**Objective:** Create a reusable LoggerUtil class using SLF4J facade with Log4j2 backend.

**Scenario:** Build a logger utility that provides consistent logging methods across your framework.

**Requirements:**
1. Add SLF4J API and Log4j2 SLF4J bridge dependencies
2. Create LoggerUtil class with static helper methods
3. Implement methods for: info, debug, error, warn
4. Add test step logging with formatted messages
5. Create methods for test start/end logging
6. Test the utility in multiple test classes

**Code Template:**

```java
package utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LoggerUtil {

    /**
     * Get logger for calling class automatically
     */
    public static Logger getLogger() {
        // TODO: Get stack trace and determine calling class
        // TODO: Return logger for that class
        return null;
    }

    /**
     * Log test start with banner
     */
    public static void logTestStart(String testName) {
        // TODO: Get logger
        // TODO: Log separator line
        // TODO: Log "TEST STARTED: testName"
        // TODO: Log separator line
    }

    /**
     * Log test end with status and duration
     */
    public static void logTestEnd(String testName, String status, long durationMs) {
        // TODO: Get logger
        // TODO: Log separator line
        // TODO: Log "TEST COMPLETED: testName"
        // TODO: Log "Status: status"
        // TODO: Log "Duration: durationMs ms"
        // TODO: Log separator line
    }

    /**
     * Log test step
     */
    public static void logStep(String step) {
        // TODO: Get logger and log "STEP: step"
    }

    /**
     * Log pass message
     */
    public static void logPass(String message) {
        // TODO: Get logger and log "PASS: message"
    }

    /**
     * Log fail message
     */
    public static void logFail(String message) {
        // TODO: Get logger and log "FAIL: message"
    }

    /**
     * Log fail message with exception
     */
    public static void logFail(String message, Throwable throwable) {
        // TODO: Get logger and log error with exception
    }

    /**
     * Log info with variable arguments
     */
    public static void info(String message, Object... args) {
        // TODO: Implement with SLF4J parameterized logging
    }

    /**
     * Log debug with variable arguments
     */
    public static void debug(String message, Object... args) {
        // TODO: Implement with SLF4J parameterized logging
    }

    /**
     * Log error with variable arguments
     */
    public static void error(String message, Object... args) {
        // TODO: Implement
    }
}
```

**Test Class Template:**

```java
package tests;

import utils.LoggerUtil;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.*;

public class LoggerUtilTest {

    private WebDriver driver;

    @Test
    public void testLoginWithLoggerUtil() {
        long startTime = System.currentTimeMillis();
        String testName = "testLoginWithLoggerUtil";

        // TODO: Log test start using LoggerUtil

        try {
            // TODO: Log step - Navigate to website
            driver.get("https://www.saucedemo.com");

            // TODO: Log step - Enter username
            driver.findElement(By.id("user-name")).sendKeys("standard_user");

            // TODO: Log step - Enter password
            driver.findElement(By.id("password")).sendKeys("secret_sauce");

            // TODO: Log step - Click login
            driver.findElement(By.id("login-button")).click();

            // TODO: Log pass - Login successful

            long duration = System.currentTimeMillis() - startTime;
            // TODO: Log test end with PASSED status

        } catch (Exception e) {
            // TODO: Log fail with exception
            long duration = System.currentTimeMillis() - startTime;
            // TODO: Log test end with FAILED status
            throw e;
        }
    }
}
```

**Expected Output:**
```
========================================
TEST STARTED: testLoginWithLoggerUtil
========================================
STEP: Navigate to https://www.saucedemo.com
STEP: Enter username: standard_user
STEP: Enter password
STEP: Click login button
PASS: Login successful
========================================
TEST COMPLETED: testLoginWithLoggerUtil
Status: PASSED
Duration: 3456 ms
========================================
```

**Common Mistakes to Avoid:**
1. Using Log4j2 classes directly instead of SLF4J facade
2. Not handling null values in parameterized logging
3. Creating new logger instances repeatedly instead of reusing
4. Missing SLF4J bridge dependency causing runtime errors
5. Using string concatenation instead of parameterized messages

**Solution Hints:**
<details>
<summary>Click to see hints</summary>

1. Get calling class:
```java
StackTraceElement[] stackTrace = Thread.currentThread().getStackTrace();
String callingClass = stackTrace[2].getClassName();
return LoggerFactory.getLogger(Class.forName(callingClass));
```

2. Parameterized logging:
```java
public static void info(String message, Object... args) {
    Logger logger = getLogger();
    logger.info(message, args);
}
```

3. Test start logging:
```java
public static void logTestStart(String testName) {
    Logger logger = getLogger();
    logger.info("========================================");
    logger.info("TEST STARTED: {}", testName);
    logger.info("========================================");
}
```

4. Usage in tests:
```java
LoggerUtil.logTestStart("testLogin");
LoggerUtil.logStep("Navigate to login page");
LoggerUtil.info("Using username: {}", username);
LoggerUtil.logPass("Login successful");
```
</details>

---

### Exercise 3: Implementing Rolling File Appenders (40 minutes)

**Objective:** Configure rolling file appenders for automatic log rotation and management.

**Scenario:** Your test suite generates large log files. Implement rolling file appenders to manage log file size and retention.

**Requirements:**
1. Create RollingFile appender with time-based policy (daily)
2. Add size-based policy (10MB limit)
3. Configure log compression (.gz format)
4. Set retention policy (30 days)
5. Create separate rolling appenders for different log levels
6. Test log rotation by generating large logs

**log4j2.xml Template:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="WARN">

    <Properties>
        <Property name="LOG_PATTERN">%d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n</Property>
        <Property name="LOG_DIR">logs</Property>
        <Property name="ARCHIVE_DIR">${LOG_DIR}/archives</Property>
    </Properties>

    <Appenders>
        <!-- TODO: Configure Console Appender -->

        <!-- TODO: Configure RollingFile for all logs
             - Daily rotation at midnight
             - Size rotation at 10 MB
             - Compression enabled
             - Keep 30 days
        -->

        <!-- TODO: Configure RollingFile for error logs only
             - Daily rotation
             - Size rotation at 5 MB
             - Keep 60 days
        -->

        <!-- TODO: Configure RollingFile for test execution logs
             - Rotation on startup
             - Size rotation at 10 MB
             - Keep 10 most recent files
        -->

    </Appenders>

    <Loggers>
        <!-- TODO: Configure loggers -->
    </Loggers>
</Configuration>
```

**Test Code Template:**

```java
package tests;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.testng.annotations.Test;

public class RollingFileAppenderTest {

    private static final Logger logger = LoggerFactory.getLogger(RollingFileAppenderTest.class);

    @Test
    public void testLogRotation() {
        // TODO: Generate logs to test rotation
        for (int i = 0; i < 10000; i++) {
            // TODO: Log info messages
            // TODO: Log debug messages
            // TODO: Log error messages every 100 iterations
        }

        // TODO: Verify log files are created in correct directories
    }

    @Test
    public void testErrorLogSeparation() {
        // TODO: Log various levels
        logger.info("This is info message");
        logger.debug("This is debug message");
        logger.error("This is error message");
        logger.warn("This is warning message");

        // TODO: Verify only errors go to error log file
    }
}
```

**Verification Steps:**
```java
package tests;

import java.io.File;
import org.testng.Assert;
import org.testng.annotations.Test;

public class LogFileVerification {

    @Test
    public void verifyLogFilesCreated() {
        // TODO: Check if application.log exists
        File appLog = new File("logs/application.log");
        Assert.assertTrue(appLog.exists(), "Application log file should exist");

        // TODO: Check if errors.log exists
        // TODO: Check if test-execution.log exists

        // TODO: Verify archives directory is created
        File archiveDir = new File("logs/archives");
        Assert.assertTrue(archiveDir.exists(), "Archive directory should exist");
    }

    @Test
    public void verifyLogRotation() {
        // TODO: Check for archived log files
        File archiveDir = new File("logs/archives");
        File[] archivedFiles = archiveDir.listFiles((dir, name) ->
            name.startsWith("application-") && name.endsWith(".log.gz"));

        // TODO: Assert archived files exist after rotation
    }
}
```

**Expected File Structure:**
```
logs/
├── application.log
├── errors.log
├── test-execution.log
└── archives/
    ├── application-2024-01-15-001.log.gz
    ├── application-2024-01-16-001.log.gz
    ├── errors-2024-01-15-001.log.gz
    └── test-execution-001.log
```

**Common Mistakes to Avoid:**
1. Incorrect file pattern causing rotation failures
2. Missing compression in file pattern (.gz extension)
3. Not setting proper DefaultRolloverStrategy max value
4. Using same file name for different appenders
5. Not creating log directory structure in advance

**Solution Hints:**
<details>
<summary>Click to see hints</summary>

1. Daily rolling with size and compression:
```xml
<RollingFile name="AppLog"
             fileName="${LOG_DIR}/application.log"
             filePattern="${ARCHIVE_DIR}/application-%d{yyyy-MM-dd}-%i.log.gz">
    <PatternLayout pattern="${LOG_PATTERN}"/>
    <Policies>
        <TimeBasedTriggeringPolicy interval="1" modulate="true"/>
        <SizeBasedTriggeringPolicy size="10 MB"/>
    </Policies>
    <DefaultRolloverStrategy max="30"/>
</RollingFile>
```

2. Error-only appender:
```xml
<RollingFile name="ErrorLog"
             fileName="${LOG_DIR}/errors.log"
             filePattern="${ARCHIVE_DIR}/errors-%d{yyyy-MM-dd}-%i.log.gz">
    <PatternLayout pattern="${LOG_PATTERN}"/>
    <ThresholdFilter level="ERROR" onMatch="ACCEPT" onMismatch="DENY"/>
    <Policies>
        <TimeBasedTriggeringPolicy interval="1" modulate="true"/>
        <SizeBasedTriggeringPolicy size="5 MB"/>
    </Policies>
    <DefaultRolloverStrategy max="60"/>
</RollingFile>
```

3. On-startup rotation:
```xml
<RollingFile name="TestLog"
             fileName="${LOG_DIR}/test-execution.log"
             filePattern="${LOG_DIR}/test-execution-%i.log">
    <PatternLayout pattern="%d{HH:mm:ss.SSS} %-5level - %msg%n"/>
    <Policies>
        <OnStartupTriggeringPolicy/>
        <SizeBasedTriggeringPolicy size="10 MB"/>
    </Policies>
    <DefaultRolloverStrategy max="10"/>
</RollingFile>
```

4. Log generation for testing:
```java
for (int i = 0; i < 10000; i++) {
    logger.info("Test log entry number: {}", i);
    if (i % 100 == 0) {
        logger.error("Periodic error log at iteration: {}", i);
    }
}
```
</details>

---

### Exercise 4: Implementing TestNG Listener with Logging (45 minutes)

**Objective:** Create a TestNG listener that logs all test lifecycle events with proper formatting.

**Scenario:** Automatically log all test events (start, pass, fail, skip) without modifying individual test classes.

**Requirements:**
1. Implement ITestListener interface
2. Log suite start and end with summary
3. Log individual test start, success, failure, and skip
4. Add duration tracking for each test
5. Include test parameters and descriptions in logs
6. Create formatted summary at suite completion

**Code Template:**

```java
package listeners;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.testng.*;

public class LoggingTestListener implements ITestListener {

    private static final Logger logger = LoggerFactory.getLogger(LoggingTestListener.class);

    // TODO: Track test counts
    private int passedTests = 0;
    private int failedTests = 0;
    private int skippedTests = 0;

    @Override
    public void onStart(ITestContext context) {
        // TODO: Log suite start
        // TODO: Log test suite name
        // TODO: Log total test count
    }

    @Override
    public void onTestStart(ITestResult result) {
        // TODO: Log test start with class and method name
        // TODO: Log test description if available
        // TODO: Log test parameters if any
    }

    @Override
    public void onTestSuccess(ITestResult result) {
        // TODO: Increment passed count
        // TODO: Calculate test duration
        // TODO: Log success message with duration
    }

    @Override
    public void onTestFailure(ITestResult result) {
        // TODO: Increment failed count
        // TODO: Calculate test duration
        // TODO: Log failure message
        // TODO: Log exception details
    }

    @Override
    public void onTestSkipped(ITestResult result) {
        // TODO: Increment skipped count
        // TODO: Log skip message
        // TODO: Log skip reason if available
    }

    @Override
    public void onFinish(ITestContext context) {
        // TODO: Log suite completion
        // TODO: Log summary statistics
        // TODO: Log passed, failed, skipped counts
        // TODO: Calculate and log total execution time
        // TODO: Calculate pass percentage
    }

    /**
     * Helper method to format duration
     */
    private String formatDuration(long millis) {
        // TODO: Convert milliseconds to readable format
        // TODO: Return formatted string (e.g., "3.45s" or "1m 23s")
        return null;
    }
}
```

**Sample Test Classes:**

```java
package tests;

import org.testng.Assert;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

public class SampleTests {

    @Test(description = "Verify successful scenario")
    public void testPass() {
        // TODO: Add test logic that passes
        Assert.assertTrue(true);
    }

    @Test(description = "Verify failure handling")
    public void testFail() {
        // TODO: Add test logic that fails
        Assert.assertTrue(false, "Intentional failure for demonstration");
    }

    @Test(description = "Test that should be skipped", enabled = false)
    public void testSkip() {
        // TODO: This test will be skipped
    }

    @Parameters({"browser", "environment"})
    @Test(description = "Test with parameters")
    public void testWithParameters(String browser, String environment) {
        // TODO: Use parameters in test
        System.out.println("Browser: " + browser);
        System.out.println("Environment: " + environment);
    }
}
```

**testng.xml:**

```xml
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Logging Test Suite">

    <!-- TODO: Register the listener -->
    <listeners>
        <listener class-name="???"/>
    </listeners>

    <!-- TODO: Define parameters -->
    <parameter name="browser" value="chrome"/>
    <parameter name="environment" value="QA"/>

    <test name="Sample Tests">
        <classes>
            <class name="tests.SampleTests"/>
        </classes>
    </test>
</suite>
```

**Expected Output:**
```
======================================
Test Suite Started: Logging Test Suite
Total Tests: 4
======================================

>>> Test Started: tests.SampleTests.testPass
    Description: Verify successful scenario

<<< Test PASSED: tests.SampleTests.testPass
    Duration: 1.23s

>>> Test Started: tests.SampleTests.testFail
    Description: Verify failure handling

<<< Test FAILED: tests.SampleTests.testFail
    Duration: 0.45s
    Reason: Intentional failure for demonstration
    Exception: java.lang.AssertionError: Intentional failure

<<< Test SKIPPED: tests.SampleTests.testSkip
    Description: Test that should be skipped

>>> Test Started: tests.SampleTests.testWithParameters
    Description: Test with parameters
    Parameters: browser=chrome, environment=QA

<<< Test PASSED: tests.SampleTests.testWithParameters
    Duration: 2.34s

======================================
Test Suite Finished: Logging Test Suite
Total Tests: 4
Passed: 2
Failed: 1
Skipped: 1
Pass Rate: 50.0%
Total Execution Time: 12.5s
======================================
```

**Common Mistakes to Avoid:**
1. Not registering listener in testng.xml
2. Forgetting to handle null descriptions or parameters
3. Not calculating duration properly (start vs end time)
4. Missing exception logging in onTestFailure
5. Not formatting test names properly (showing full path)

**Solution Hints:**
<details>
<summary>Click to see hints</summary>

1. Listener registration in testng.xml:
```xml
<listeners>
    <listener class-name="listeners.LoggingTestListener"/>
</listeners>
```

2. Test start logging:
```java
@Override
public void onTestStart(ITestResult result) {
    logger.info(">>> Test Started: {}.{}",
               result.getTestClass().getName(),
               result.getMethod().getMethodName());

    String description = result.getMethod().getDescription();
    if (description != null && !description.isEmpty()) {
        logger.info("    Description: {}", description);
    }
}
```

3. Test failure logging:
```java
@Override
public void onTestFailure(ITestResult result) {
    failedTests++;
    long duration = result.getEndMillis() - result.getStartMillis();

    logger.error("<<< Test FAILED: {}.{}",
                result.getTestClass().getName(),
                result.getMethod().getMethodName());
    logger.error("    Duration: {}ms", duration);
    logger.error("    Reason: {}", result.getThrowable().getMessage());
}
```

4. Suite completion summary:
```java
@Override
public void onFinish(ITestContext context) {
    logger.info("======================================");
    logger.info("Test Suite Finished: {}", context.getName());
    logger.info("Total Tests: {}", context.getAllTestMethods().length);
    logger.info("Passed: {}", passedTests);
    logger.info("Failed: {}", failedTests);
    logger.info("Skipped: {}", skippedTests);

    double passRate = (passedTests * 100.0) /
                      (passedTests + failedTests + skippedTests);
    logger.info("Pass Rate: {:.1f}%", passRate);
    logger.info("======================================");
}
```

5. Duration formatting:
```java
private String formatDuration(long millis) {
    if (millis < 1000) {
        return millis + "ms";
    } else if (millis < 60000) {
        return String.format("%.2fs", millis / 1000.0);
    } else {
        long minutes = millis / 60000;
        long seconds = (millis % 60000) / 1000;
        return String.format("%dm %ds", minutes, seconds);
    }
}
```
</details>

---

### Exercise 5: Implementing Package-Specific Logging Levels (35 minutes)

**Objective:** Configure different log levels for different packages and reduce third-party library verbosity.

**Scenario:** Your framework has multiple packages, and you want detailed logs from your code but minimal logs from Selenium and TestNG.

**Requirements:**
1. Set DEBUG level for your test package
2. Set INFO level for your page package
3. Set WARN level for Selenium package
4. Set WARN level for TestNG package
5. Create custom logger for specific test class
6. Test the configuration and verify log levels

**log4j2.xml Template:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="WARN">

    <Properties>
        <Property name="LOG_PATTERN">%d{HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n</Property>
        <Property name="LOG_DIR">logs</Property>
    </Properties>

    <Appenders>
        <Console name="Console" target="SYSTEM_OUT">
            <PatternLayout pattern="${LOG_PATTERN}"/>
        </Console>

        <RollingFile name="AppLog"
                     fileName="${LOG_DIR}/application.log"
                     filePattern="${LOG_DIR}/application-%d{yyyy-MM-dd}.log">
            <PatternLayout pattern="${LOG_PATTERN}"/>
            <Policies>
                <TimeBasedTriggeringPolicy/>
            </Policies>
        </RollingFile>
    </Appenders>

    <Loggers>
        <!-- TODO: Configure logger for tests package with DEBUG level -->

        <!-- TODO: Configure logger for pages package with INFO level -->

        <!-- TODO: Configure logger for utils package with DEBUG level -->

        <!-- TODO: Configure logger for Selenium to reduce verbosity -->

        <!-- TODO: Configure logger for TestNG to reduce verbosity -->

        <!-- TODO: Configure logger for specific test class with TRACE level -->

        <!-- TODO: Configure Root logger -->

    </Loggers>
</Configuration>
```

**Test Package Classes:**

```java
package tests;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.testng.annotations.Test;

public class DetailedLoggingTest {

    private static final Logger logger = LoggerFactory.getLogger(DetailedLoggingTest.class);

    @Test
    public void testWithDetailedLogs() {
        // TODO: Log TRACE level (should not appear for most loggers)
        logger.trace("TRACE: Method entry");

        // TODO: Log DEBUG level (should appear for test package)
        logger.debug("DEBUG: Initializing test data");

        // TODO: Log INFO level (should appear for all)
        logger.info("INFO: Test execution started");

        // TODO: Log WARN level (should appear for all)
        logger.warn("WARN: Using default configuration");

        // TODO: Log ERROR level (should appear for all)
        logger.error("ERROR: Test assertion failed");
    }
}
```

```java
package pages;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LoginPage {

    private static final Logger logger = LoggerFactory.getLogger(LoginPage.class);

    public void login(String username, String password) {
        // TODO: These DEBUG logs should NOT appear (INFO level for pages)
        logger.debug("DEBUG: Finding username field");
        logger.debug("DEBUG: Finding password field");

        // TODO: These INFO logs SHOULD appear
        logger.info("INFO: Performing login for user: {}", username);
        logger.info("INFO: Login completed successfully");
    }
}
```

```java
package utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ConfigReader {

    private static final Logger logger = LoggerFactory.getLogger(ConfigReader.class);

    public String getProperty(String key) {
        // TODO: These DEBUG logs SHOULD appear (DEBUG level for utils)
        logger.debug("DEBUG: Reading property: {}", key);
        logger.debug("DEBUG: Property value retrieved successfully");

        // TODO: This INFO log SHOULD appear
        logger.info("INFO: Configuration loaded");

        return "value";
    }
}
```

**Verification Test:**

```java
package tests;

import org.testng.annotations.Test;
import pages.LoginPage;
import utils.ConfigReader;

public class LogLevelVerificationTest {

    @Test
    public void verifyLogLevels() {
        // TODO: Call method from tests package (DEBUG level)
        DetailedLoggingTest test = new DetailedLoggingTest();
        test.testWithDetailedLogs();

        // TODO: Call method from pages package (INFO level)
        LoginPage loginPage = new LoginPage();
        loginPage.login("testuser", "password");

        // TODO: Call method from utils package (DEBUG level)
        ConfigReader config = new ConfigReader();
        config.getProperty("base.url");

        // TODO: Verify in console which logs appear
    }
}
```

**Expected Console Output:**
```
14:30:25.123 [main] DEBUG tests.DetailedLoggingTest - DEBUG: Initializing test data
14:30:25.124 [main] INFO  tests.DetailedLoggingTest - INFO: Test execution started
14:30:25.125 [main] WARN  tests.DetailedLoggingTest - WARN: Using default configuration
14:30:25.126 [main] ERROR tests.DetailedLoggingTest - ERROR: Test assertion failed

14:30:25.127 [main] INFO  pages.LoginPage - INFO: Performing login for user: testuser
14:30:25.128 [main] INFO  pages.LoginPage - INFO: Login completed successfully

14:30:25.129 [main] DEBUG utils.ConfigReader - DEBUG: Reading property: base.url
14:30:25.130 [main] DEBUG utils.ConfigReader - DEBUG: Property value retrieved successfully
14:30:25.131 [main] INFO  utils.ConfigReader - INFO: Configuration loaded
```

**Common Mistakes to Avoid:**
1. Setting additivity="true" causing duplicate logs
2. Not using correct package names in logger configuration
3. Forgetting to set level attribute in Logger elements
4. Root logger level overriding package-specific levels
5. Not testing all log levels to verify configuration

**Solution Hints:**
<details>
<summary>Click to see hints</summary>

1. Test package logger (DEBUG):
```xml
<Logger name="tests" level="DEBUG" additivity="false">
    <AppenderRef ref="Console"/>
    <AppenderRef ref="AppLog"/>
</Logger>
```

2. Pages package logger (INFO):
```xml
<Logger name="pages" level="INFO" additivity="false">
    <AppenderRef ref="Console"/>
    <AppenderRef ref="AppLog"/>
</Logger>
```

3. Utils package logger (DEBUG):
```xml
<Logger name="utils" level="DEBUG" additivity="false">
    <AppenderRef ref="Console"/>
    <AppenderRef ref="AppLog"/>
</Logger>
```

4. Reduce Selenium verbosity:
```xml
<Logger name="org.openqa.selenium" level="WARN" additivity="false">
    <AppenderRef ref="Console"/>
</Logger>
```

5. Reduce TestNG verbosity:
```xml
<Logger name="org.testng" level="WARN" additivity="false">
    <AppenderRef ref="Console"/>
</Logger>
```

6. Specific class with TRACE level:
```xml
<Logger name="tests.DetailedLoggingTest" level="TRACE" additivity="false">
    <AppenderRef ref="Console"/>
    <AppenderRef ref="AppLog"/>
</Logger>
```

7. Root logger:
```xml
<Root level="INFO">
    <AppenderRef ref="Console"/>
    <AppenderRef ref="AppLog"/>
</Root>
```
</details>

---

### Exercise 6: Creating Production-Ready Logging Framework (50 minutes)

**Objective:** Build a complete, production-ready logging framework with multiple appenders, filters, and utility methods.

**Scenario:** Create an enterprise-level logging framework for your Selenium automation that can be used across multiple projects.

**Requirements:**
1. Create comprehensive log4j2.xml with all appender types
2. Implement LogManager utility with helper methods
3. Add automatic exception logging
4. Implement log file cleanup for old logs
5. Create environment-specific log configurations
6. Add performance logging capability
7. Integrate with test framework

**Advanced log4j2.xml:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="WARN" monitorInterval="30">

    <Properties>
        <Property name="LOG_PATTERN">
            %d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n
        </Property>
        <Property name="LOG_DIR">logs</Property>
        <Property name="ARCHIVE_DIR">${LOG_DIR}/archives</Property>
        <Property name="ENV">${sys:test.env:-qa}</Property>
    </Properties>

    <Appenders>
        <!-- TODO: Console Appender with colors -->

        <!-- TODO: Main Application Log with daily rotation -->

        <!-- TODO: Error Log (ERROR and above only) -->

        <!-- TODO: Debug Log (DEBUG and above) -->

        <!-- TODO: Performance Log (custom for timing logs) -->

        <!-- TODO: Test Execution Log (clean format for CI/CD) -->

    </Appenders>

    <Loggers>
        <!-- TODO: Configure all package loggers -->

        <!-- TODO: Configure third-party library loggers -->

        <!-- TODO: Root logger with environment-based level -->

    </Loggers>
</Configuration>
```

**LogManager Utility:**

```java
package framework.logging;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.File;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class LogManager {

    private static final String LOG_DIR = "logs";
    private static final String ARCHIVE_DIR = "logs/archives";
    private static final int LOG_RETENTION_DAYS = 30;

    /**
     * Get logger for calling class
     */
    public static Logger getLogger() {
        // TODO: Implement automatic logger retrieval
        return null;
    }

    /**
     * Get logger for specific class
     */
    public static Logger getLogger(Class<?> clazz) {
        // TODO: Return logger for specified class
        return null;
    }

    /**
     * Initialize logging framework
     */
    public static void initialize() {
        // TODO: Create log directories
        // TODO: Clean old log files
        // TODO: Log initialization message
    }

    /**
     * Clean old log files
     */
    public static void cleanOldLogs() {
        // TODO: Find files older than retention period
        // TODO: Delete old files
        // TODO: Log cleanup summary
    }

    /**
     * Log test start with metadata
     */
    public static void logTestStart(String testName, String description) {
        // TODO: Log formatted test start
        // TODO: Include timestamp
        // TODO: Include test metadata
    }

    /**
     * Log test end with results
     */
    public static void logTestEnd(String testName, String status,
                                   long duration, Throwable error) {
        // TODO: Log formatted test end
        // TODO: Include status and duration
        // TODO: Include error details if failed
    }

    /**
     * Log performance metrics
     */
    public static void logPerformance(String operation, long durationMs) {
        // TODO: Log to performance log
        // TODO: Include operation name and duration
    }

    /**
     * Log with exception details
     */
    public static void logException(Logger logger, String message, Throwable throwable) {
        // TODO: Log error message
        // TODO: Log exception type
        // TODO: Log full stack trace
        // TODO: Log cause chain
    }

    /**
     * Create structured log entry
     */
    public static String createLogEntry(String category, String message,
                                       String... details) {
        // TODO: Format structured log entry
        // TODO: Include category, message, and details
        return null;
    }

    /**
     * Helper method to format duration
     */
    private static String formatDuration(long millis) {
        // TODO: Convert to readable format
        return null;
    }
}
```

**Performance Logging Utility:**

```java
package framework.logging;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class PerformanceLogger {

    private static final Logger perfLogger = LoggerFactory.getLogger("PERFORMANCE");

    /**
     * Log operation timing
     */
    public static void logTiming(String operation, long durationMs) {
        // TODO: Log performance metric
    }

    /**
     * Time and log operation execution
     */
    public static <T> T timeOperation(String operationName,
                                     java.util.function.Supplier<T> operation) {
        // TODO: Record start time
        // TODO: Execute operation
        // TODO: Record end time
        // TODO: Log timing
        // TODO: Return result
        return null;
    }

    /**
     * Time and log void operation
     */
    public static void timeOperation(String operationName, Runnable operation) {
        // TODO: Similar to above but for void operations
    }
}
```

**Integration Test:**

```java
package tests;

import framework.logging.LogManager;
import framework.logging.PerformanceLogger;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.slf4j.Logger;
import org.testng.annotations.*;

public class ProductionLoggingFrameworkTest {

    private Logger logger;
    private WebDriver driver;

    @BeforeSuite
    public void suiteSetup() {
        // TODO: Initialize logging framework
        LogManager.initialize();

        // TODO: Clean old logs
        LogManager.cleanOldLogs();
    }

    @BeforeMethod
    public void setup() {
        // TODO: Get logger
        logger = LogManager.getLogger();

        // TODO: Initialize browser
        driver = new ChromeDriver();
    }

    @Test
    public void testWithProductionLogging() {
        String testName = "testWithProductionLogging";
        long startTime = System.currentTimeMillis();

        try {
            // TODO: Log test start with metadata
            LogManager.logTestStart(testName, "Comprehensive production logging test");

            // TODO: Navigate with performance logging
            PerformanceLogger.timeOperation("Navigate to homepage", () -> {
                driver.get("https://www.saucedemo.com");
            });

            // TODO: Log business operation
            logger.info("Performing login operation");

            // TODO: Simulate some actions with timing
            String pageTitle = PerformanceLogger.timeOperation(
                "Get page title",
                () -> driver.getTitle()
            );

            logger.info("Page title retrieved: {}", pageTitle);

            // TODO: Log successful completion
            long duration = System.currentTimeMillis() - startTime;
            LogManager.logTestEnd(testName, "PASSED", duration, null);

        } catch (Exception e) {
            // TODO: Log exception with full details
            long duration = System.currentTimeMillis() - startTime;
            LogManager.logException(logger, "Test failed", e);
            LogManager.logTestEnd(testName, "FAILED", duration, e);
            throw e;
        }
    }

    @AfterMethod
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

**Expected Output Structure:**
```
logs/
├── application.log (all logs)
├── errors.log (errors only)
├── debug.log (debug and above)
├── performance.log (timing metrics)
├── test-execution.log (test results)
└── archives/
    ├── application-2024-01-15-001.log.gz
    ├── errors-2024-01-15-001.log.gz
    └── ... (older rotated logs)

Console Output:
[INIT] Logging framework initialized
[INIT] Log directories created
[CLEANUP] Removed 5 old log files
========================================
TEST STARTED: testWithProductionLogging
Description: Comprehensive production logging test
Started at: 2024-01-15 14:30:25
========================================
[PERF] Navigate to homepage: 1234ms
[INFO] Performing login operation
[PERF] Get page title: 45ms
[INFO] Page title retrieved: Swag Labs
========================================
TEST COMPLETED: testWithProductionLogging
Status: PASSED
Duration: 2.5s
Ended at: 2024-01-15 14:30:28
========================================
```

**Common Mistakes to Avoid:**
1. Not initializing log directories before writing
2. Missing exception in catch block logging
3. Not cleaning old logs causing disk space issues
4. Incorrect file patterns in rolling appenders
5. Not handling null values in utility methods

**Solution Hints:**
<details>
<summary>Click to see hints</summary>

1. Initialize logging:
```java
public static void initialize() {
    createDirectory(LOG_DIR);
    createDirectory(ARCHIVE_DIR);
    Logger logger = LoggerFactory.getLogger(LogManager.class);
    logger.info("Logging framework initialized");
    cleanOldLogs();
}

private static void createDirectory(String path) {
    File dir = new File(path);
    if (!dir.exists()) {
        dir.mkdirs();
    }
}
```

2. Clean old logs:
```java
public static void cleanOldLogs() {
    File logDir = new File(LOG_DIR);
    File[] files = logDir.listFiles();
    if (files == null) return;

    long cutoffTime = System.currentTimeMillis() -
                     (LOG_RETENTION_DAYS * 24 * 60 * 60 * 1000L);
    int deletedCount = 0;

    for (File file : files) {
        if (file.lastModified() < cutoffTime) {
            if (file.delete()) {
                deletedCount++;
            }
        }
    }

    Logger logger = LoggerFactory.getLogger(LogManager.class);
    logger.info("Cleaned {} old log files", deletedCount);
}
```

3. Performance timing:
```java
public static <T> T timeOperation(String operationName,
                                 Supplier<T> operation) {
    long startTime = System.currentTimeMillis();
    T result = operation.get();
    long duration = System.currentTimeMillis() - startTime;
    perfLogger.info("{}: {}ms", operationName, duration);
    return result;
}
```

4. Exception logging:
```java
public static void logException(Logger logger, String message,
                               Throwable throwable) {
    logger.error("Exception occurred: {}", message);
    logger.error("Exception type: {}", throwable.getClass().getName());
    logger.error("Exception message: {}", throwable.getMessage());
    logger.error("Stack trace:", throwable);

    Throwable cause = throwable.getCause();
    if (cause != null) {
        logger.error("Caused by: {}", cause.getMessage());
    }
}
```

5. Test logging with metadata:
```java
public static void logTestStart(String testName, String description) {
    Logger logger = getLogger();
    logger.info("========================================");
    logger.info("TEST STARTED: {}", testName);
    if (description != null && !description.isEmpty()) {
        logger.info("Description: {}", description);
    }
    logger.info("Started at: {}", LocalDateTime.now().format(
        DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
    logger.info("========================================");
}
```
</details>

---

## Practice Project: Complete Logging Implementation

Create a comprehensive logging framework for a multi-page test automation project.

**Requirements:**
1. Configure Log4j2 with all appender types
2. Implement LoggerUtil with helper methods
3. Create TestNG listener for automatic logging
4. Add package-specific log levels
5. Implement performance logging
6. Create log cleanup utility
7. Test with real Selenium tests

**Acceptance Criteria:**
- All tests have automatic logging
- Logs are properly formatted and readable
- Old logs are automatically cleaned
- Performance metrics are tracked
- Exception details are captured
- Different log levels work correctly
- Log files rotate properly

---

## Additional Resources

- [Log4j2 Official Documentation](https://logging.apache.org/log4j/2.x/)
- [SLF4J User Manual](http://www.slf4j.org/manual.html)
- [Log4j2 Configuration Documentation](https://logging.apache.org/log4j/2.x/manual/configuration.html)
- [TestNG Listeners Documentation](https://testng.org/doc/documentation-main.html#testng-listeners)

**Remember:** Good logging is essential for debugging, monitoring, and maintaining test automation frameworks!
