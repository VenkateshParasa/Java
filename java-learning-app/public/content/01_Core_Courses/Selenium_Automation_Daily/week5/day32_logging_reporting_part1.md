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
