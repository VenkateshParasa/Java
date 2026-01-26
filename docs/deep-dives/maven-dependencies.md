# Deep Dive: Maven and Dependencies for Selenium Automation
## Complete Guide from Basics to Production-Ready Setup

---

## 📚 Table of Contents
1. [Introduction & Overview](#introduction)
2. [Maven Fundamentals](#fundamentals)
3. [Dependency Management](#dependencies)
4. [Essential Selenium Dependencies](#selenium-deps)
5. [Maven Build Lifecycle](#lifecycle)
6. [Plugins Configuration](#plugins)
7. [Profiles & Environments](#profiles)
8. [Running Tests with Maven](#running-tests)
9. [Maven Best Practices](#best-practices)
10. [Complete Example](#complete-example)

---

## <a name="introduction"></a>📖 Introduction & Overview

### What is Maven?

**Definition:**
> Apache Maven is a powerful project management and build automation tool primarily used for Java projects. It provides a uniform build system, dependency management, and project information management.

### Why Maven for Test Automation?

**Without Maven - The Problem:**
```
MyProject/
├── selenium-java-4.15.0.jar
├── testng-7.8.0.jar
├── poi-5.2.3.jar
├── poi-ooxml-5.2.3.jar
├── commons-io-2.11.0.jar
├── log4j-2.20.0.jar
├── ... 50+ more jar files manually downloaded
└── src/
    └── MyTest.java
```

**Problems:**
- ❌ Manual jar download and management
- ❌ Version compatibility issues
- ❌ Missing transitive dependencies
- ❌ Different setups on different machines
- ❌ No standardized build process
- ❌ Hard to share project with team
- ❌ Classpath configuration nightmare

**With Maven - The Solution:**
```
MyProject/
├── pom.xml  ← All dependencies defined here
└── src/
    ├── main/
    │   └── java/
    └── test/
        └── java/
            └── MyTest.java
```

**Benefits:**
- ✅ Automatic dependency download
- ✅ Transitive dependency resolution
- ✅ Version management
- ✅ Standardized project structure
- ✅ Automated build process
- ✅ Easy project sharing
- ✅ Integration with CI/CD tools

### Maven vs Gradle Comparison

| Feature | Maven | Gradle |
|---------|-------|--------|
| **Configuration** | XML (pom.xml) | Groovy/Kotlin DSL (build.gradle) |
| **Learning Curve** | Easier for beginners | Steeper learning curve |
| **Build Speed** | Slower | Faster (incremental builds) |
| **Flexibility** | Convention over configuration | Highly flexible |
| **Plugin Ecosystem** | Mature, extensive | Growing, modern |
| **IDE Support** | Excellent (all IDEs) | Excellent (all IDEs) |
| **Industry Adoption** | Very high (Java standard) | Growing (Android standard) |
| **Documentation** | Extensive | Good but less comprehensive |
| **Best for Selenium** | ✅ Excellent choice | ✅ Also excellent |

**Verdict for Selenium:**
- Maven: Better for teams new to build tools, more documentation, simpler XML
- Gradle: Better for complex projects, faster builds, more flexibility
- Both are excellent choices - Maven is more common in traditional Java shops

---

## <a name="fundamentals"></a>🏗️ Maven Fundamentals

### Maven Project Structure (Convention over Configuration)

```
my-selenium-project/
├── pom.xml                          ← Maven configuration file
├── src/
│   ├── main/
│   │   ├── java/                    ← Main source code
│   │   │   └── com/
│   │   │       └── example/
│   │   │           ├── pages/       ← Page Object classes
│   │   │           ├── utils/       ← Utility classes
│   │   │           └── config/      ← Configuration classes
│   │   └── resources/               ← Main resources (config files, etc.)
│   │       ├── config.properties
│   │       └── log4j2.xml
│   └── test/
│       ├── java/                    ← Test source code
│       │   └── com/
│       │       └── example/
│       │           └── tests/       ← Test classes
│       │               ├── LoginTest.java
│       │               └── CheckoutTest.java
│       └── resources/               ← Test resources
│           └── testng.xml
├── target/                          ← Build output (auto-generated)
│   ├── classes/                     ← Compiled main classes
│   ├── test-classes/                ← Compiled test classes
│   ├── surefire-reports/            ← Test reports
│   └── my-selenium-project.jar      ← Final artifact
└── .gitignore                       ← Git ignore file

```

**Key Points:**
- **src/main/java**: Production code (Page Objects, utilities, framework code)
- **src/test/java**: Test code (TestNG/JUnit test classes)
- **src/main/resources**: Config files, property files for main code
- **src/test/resources**: testng.xml, test data files
- **target/**: All build outputs (never commit to Git)

### pom.xml File Explained

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">

    <!-- POM Model Version (always 4.0.0 for Maven 2+) -->
    <modelVersion>4.0.0</modelVersion>

    <!-- ===== PROJECT COORDINATES ===== -->

    <!-- Group ID: Company/organization domain in reverse -->
    <groupId>com.example</groupId>

    <!-- Artifact ID: Project name -->
    <artifactId>selenium-automation-framework</artifactId>

    <!-- Version: Project version -->
    <version>1.0-SNAPSHOT</version>

    <!-- Packaging type: jar, war, pom, etc. -->
    <packaging>jar</packaging>

    <!-- ===== PROJECT INFORMATION ===== -->

    <name>Selenium Automation Framework</name>
    <description>End-to-end test automation framework using Selenium WebDriver</description>
    <url>http://www.example.com</url>

    <!-- ===== PROPERTIES ===== -->
    <!-- Define reusable properties -->
    <properties>
        <!-- Java version -->
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>

        <!-- Encoding -->
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>

        <!-- Dependency versions (easier to manage) -->
        <selenium.version>4.15.0</selenium.version>
        <testng.version>7.8.0</testng.version>
    </properties>

    <!-- ===== DEPENDENCIES ===== -->
    <dependencies>
        <!-- Dependencies go here -->
    </dependencies>

    <!-- ===== BUILD CONFIGURATION ===== -->
    <build>
        <plugins>
            <!-- Build plugins go here -->
        </plugins>
    </build>

</project>
```

### Maven Coordinates (GAV)

Maven identifies projects using three coordinates:

**G**roupId + **A**rtifactId + **V**ersion = **GAV**

```xml
<!-- Example: Selenium WebDriver -->
<dependency>
    <groupId>org.seleniumhq.selenium</groupId>      <!-- Who created it -->
    <artifactId>selenium-java</artifactId>          <!-- What is it -->
    <version>4.15.0</version>                       <!-- Which version -->
</dependency>
```

**Understanding GroupId:**
- Usually reverse domain name: com.google, org.apache, io.github
- Example: `org.seleniumhq.selenium` → selenium.org domain

**Understanding ArtifactId:**
- Project/module name
- Example: `selenium-java` → Selenium Java bindings

**Understanding Version:**
- Format: major.minor.patch
- Example: `4.15.0` → Major 4, Minor 15, Patch 0
- `SNAPSHOT`: Development version (e.g., `1.0-SNAPSHOT`)
- `RELEASE`: Stable version (e.g., `1.0-RELEASE` or just `1.0`)

### Project Object Model (POM) Hierarchy

```
Super POM (Built into Maven)
    ↓
Parent POM (Optional - for multi-module projects)
    ↓
Project POM (Your pom.xml)
```

**Super POM:**
- Built into Maven
- Defines default configurations
- Includes default repository (Maven Central)
- Defines default build directory (target/)

**Effective POM:**
```bash
# View the effective POM (combination of Super POM + Your POM)
mvn help:effective-pom
```

---

## <a name="dependencies"></a>📦 Dependency Management

### Adding Dependencies

**Step 1: Find the dependency**
- Visit https://mvnrepository.com/
- Search for library (e.g., "selenium java")
- Copy Maven dependency XML

**Step 2: Add to pom.xml**
```xml
<dependencies>
    <dependency>
        <groupId>org.seleniumhq.selenium</groupId>
        <artifactId>selenium-java</artifactId>
        <version>4.15.0</version>
    </dependency>
</dependencies>
```

**Step 3: Maven automatically:**
- Downloads the jar from Maven Central
- Saves it to local repository (`~/.m2/repository/`)
- Adds it to project classpath

### Dependency Scopes

Scopes define when a dependency is available on the classpath.

```xml
<dependencies>
    <!-- COMPILE scope (default) -->
    <!-- Available in all phases: compile, test, runtime -->
    <dependency>
        <groupId>org.seleniumhq.selenium</groupId>
        <artifactId>selenium-java</artifactId>
        <version>4.15.0</version>
        <scope>compile</scope>  <!-- Can be omitted (default) -->
    </dependency>

    <!-- TEST scope -->
    <!-- Only available during test compilation and execution -->
    <dependency>
        <groupId>org.testng</groupId>
        <artifactId>testng</artifactId>
        <version>7.8.0</version>
        <scope>test</scope>  <!-- IMPORTANT: Keeps test libraries out of production -->
    </dependency>

    <!-- RUNTIME scope -->
    <!-- Not needed for compilation but required at runtime -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.33</version>
        <scope>runtime</scope>
    </dependency>

    <!-- PROVIDED scope -->
    <!-- Provided by JDK or container, not packaged -->
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>javax.servlet-api</artifactId>
        <version>4.0.1</version>
        <scope>provided</scope>
    </dependency>

    <!-- SYSTEM scope -->
    <!-- Like provided but you specify the jar path (avoid if possible) -->
    <dependency>
        <groupId>com.example</groupId>
        <artifactId>custom-lib</artifactId>
        <version>1.0</version>
        <scope>system</scope>
        <systemPath>${project.basedir}/lib/custom-lib.jar</systemPath>
    </dependency>

    <!-- IMPORT scope -->
    <!-- Only used in <dependencyManagement> to import BOMs -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-dependencies</artifactId>
        <version>2.7.0</version>
        <type>pom</type>
        <scope>import</scope>
    </dependency>
</dependencies>
```

**Scope Summary:**

| Scope | Compile | Test Compile | Runtime | Test Runtime | Packaged |
|-------|---------|--------------|---------|--------------|----------|
| compile | ✅ | ✅ | ✅ | ✅ | ✅ |
| test | ❌ | ✅ | ❌ | ✅ | ❌ |
| runtime | ❌ | ❌ | ✅ | ✅ | ✅ |
| provided | ✅ | ✅ | ❌ | ❌ | ❌ |
| system | ✅ | ✅ | ✅ | ✅ | ❌ |

### Transitive Dependencies

**What are transitive dependencies?**
Dependencies of your dependencies.

**Example:**
```
Your Project
    └── depends on → Selenium WebDriver 4.15.0
            └── depends on → Byte Buddy 1.14.9
                    └── depends on → Some other library
```

Maven automatically downloads all transitive dependencies!

**Viewing dependency tree:**
```bash
# Show all dependencies including transitive
mvn dependency:tree

# Show only direct dependencies
mvn dependency:list

# Analyze dependencies
mvn dependency:analyze
```

**Example Output:**
```
[INFO] com.example:selenium-automation-framework:jar:1.0-SNAPSHOT
[INFO] +- org.seleniumhq.selenium:selenium-java:jar:4.15.0:compile
[INFO] |  +- org.seleniumhq.selenium:selenium-api:jar:4.15.0:compile
[INFO] |  +- org.seleniumhq.selenium:selenium-chrome-driver:jar:4.15.0:compile
[INFO] |  |  \- com.google.guava:guava:jar:32.1.3-jre:compile
[INFO] |  |     +- com.google.guava:failureaccess:jar:1.0.1:compile
[INFO] |  |     \- com.google.guava:listenablefuture:jar:9999.0-empty-to-avoid-conflict-with-guava:compile
[INFO] |  +- net.bytebuddy:byte-buddy:jar:1.14.9:compile
```

### Dependency Exclusions

Sometimes transitive dependencies cause conflicts. You can exclude them:

```xml
<dependencies>
    <dependency>
        <groupId>org.seleniumhq.selenium</groupId>
        <artifactId>selenium-java</artifactId>
        <version>4.15.0</version>

        <!-- Exclude specific transitive dependencies -->
        <exclusions>
            <exclusion>
                <!-- Exclude old version of Guava -->
                <groupId>com.google.guava</groupId>
                <artifactId>guava</artifactId>
            </exclusion>
        </exclusions>
    </dependency>

    <!-- Add the version you want explicitly -->
    <dependency>
        <groupId>com.google.guava</groupId>
        <artifactId>guava</artifactId>
        <version>33.0.0-jre</version>
    </dependency>
</dependencies>
```

### Version Management with Properties

```xml
<properties>
    <!-- Define versions as properties -->
    <selenium.version>4.15.0</selenium.version>
    <testng.version>7.8.0</testng.version>
    <extentreports.version>5.1.1</extentreports.version>
    <poi.version>5.2.3</poi.version>
    <log4j.version>2.20.0</log4j.version>
</properties>

<dependencies>
    <!-- Use properties for versions -->
    <dependency>
        <groupId>org.seleniumhq.selenium</groupId>
        <artifactId>selenium-java</artifactId>
        <version>${selenium.version}</version>  <!-- Reference property -->
    </dependency>

    <dependency>
        <groupId>org.testng</groupId>
        <artifactId>testng</artifactId>
        <version>${testng.version}</version>
        <scope>test</scope>
    </dependency>
</dependencies>
```

**Benefits:**
- ✅ Update version in one place
- ✅ Easy to see all versions at a glance
- ✅ Consistency across related dependencies

### Dependency Conflicts Resolution

**Problem: Version Conflict**
```
Your Project
    ├── Dependency A → requires Guava 30.0
    └── Dependency B → requires Guava 32.0
```

**Maven's Conflict Resolution Strategy:**
1. **Nearest Definition Wins**: Dependency closer in tree wins
2. **First Declaration Wins**: If same distance, first in pom.xml wins

**Example:**
```xml
<!-- Both require different versions of commons-io -->
<dependencies>
    <dependency>
        <groupId>org.apache.poi</groupId>
        <artifactId>poi</artifactId>
        <version>5.2.3</version>
        <!-- Brings commons-io 2.11.0 -->
    </dependency>

    <dependency>
        <groupId>org.apache.commons</groupId>
        <artifactId>commons-io</artifactId>
        <version>2.15.0</version>
        <!-- Explicitly declare the version you want -->
    </dependency>
</dependencies>
```

**Find conflicts:**
```bash
# Analyze dependency conflicts
mvn dependency:tree -Dverbose

# Find specific dependency
mvn dependency:tree -Dincludes=commons-io:commons-io
```

### Dependency Management Section

For multi-module projects or to enforce version consistency:

```xml
<dependencyManagement>
    <dependencies>
        <!-- Define versions here (not actually added to classpath) -->
        <dependency>
            <groupId>org.seleniumhq.selenium</groupId>
            <artifactId>selenium-java</artifactId>
            <version>4.15.0</version>
        </dependency>

        <dependency>
            <groupId>org.testng</groupId>
            <artifactId>testng</artifactId>
            <version>7.8.0</version>
        </dependency>
    </dependencies>
</dependencyManagement>

<dependencies>
    <!-- No version needed - inherited from dependencyManagement -->
    <dependency>
        <groupId>org.seleniumhq.selenium</groupId>
        <artifactId>selenium-java</artifactId>
    </dependency>

    <dependency>
        <groupId>org.testng</groupId>
        <artifactId>testng</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

**Benefits:**
- ✅ Centralized version management
- ✅ Consistent versions across modules
- ✅ Child modules don't need to specify versions

---

## <a name="selenium-deps"></a>🔧 Essential Selenium Dependencies

### Complete Selenium Automation Dependencies

```xml
<properties>
    <!-- Versions -->
    <selenium.version>4.15.0</selenium.version>
    <testng.version>7.8.0</testng.version>
    <webdrivermanager.version>5.6.2</webdrivermanager.version>
    <extentreports.version>5.1.1</extentreports.version>
    <poi.version>5.2.3</poi.version>
    <log4j.version>2.20.0</log4j.version>
    <jackson.version>2.15.2</jackson.version>
    <rest-assured.version>5.3.2</rest-assured.version>
    <allure.version>2.24.0</allure.version>
    <javafaker.version>1.0.2</javafaker.version>
</properties>

<dependencies>
    <!-- ===== SELENIUM WEBDRIVER ===== -->
    <dependency>
        <groupId>org.seleniumhq.selenium</groupId>
        <artifactId>selenium-java</artifactId>
        <version>${selenium.version}</version>
    </dependency>

    <!-- ===== TEST FRAMEWORK ===== -->
    <dependency>
        <groupId>org.testng</groupId>
        <artifactId>testng</artifactId>
        <version>${testng.version}</version>
        <scope>test</scope>
    </dependency>

    <!-- ===== DRIVER MANAGEMENT ===== -->
    <!-- Automatically manages ChromeDriver, GeckoDriver, etc. -->
    <dependency>
        <groupId>io.github.bonigarcia</groupId>
        <artifactId>webdrivermanager</artifactId>
        <version>${webdrivermanager.version}</version>
    </dependency>

    <!-- ===== REPORTING ===== -->
    <!-- ExtentReports - Beautiful HTML reports -->
    <dependency>
        <groupId>com.aventstack</groupId>
        <artifactId>extentreports</artifactId>
        <version>${extentreports.version}</version>
    </dependency>

    <!-- Allure Reporting -->
    <dependency>
        <groupId>io.qameta.allure</groupId>
        <artifactId>allure-testng</artifactId>
        <version>${allure.version}</version>
    </dependency>

    <!-- ===== EXCEL DATA HANDLING ===== -->
    <!-- Apache POI for Excel files -->
    <dependency>
        <groupId>org.apache.poi</groupId>
        <artifactId>poi</artifactId>
        <version>${poi.version}</version>
    </dependency>

    <dependency>
        <groupId>org.apache.poi</groupId>
        <artifactId>poi-ooxml</artifactId>
        <version>${poi.version}</version>
    </dependency>

    <!-- ===== LOGGING ===== -->
    <!-- Log4j 2 for logging -->
    <dependency>
        <groupId>org.apache.logging.log4j</groupId>
        <artifactId>log4j-core</artifactId>
        <version>${log4j.version}</version>
    </dependency>

    <dependency>
        <groupId>org.apache.logging.log4j</groupId>
        <artifactId>log4j-api</artifactId>
        <version>${log4j.version}</version>
    </dependency>

    <!-- ===== JSON HANDLING ===== -->
    <!-- Jackson for JSON parsing -->
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>${jackson.version}</version>
    </dependency>

    <!-- Gson for JSON (alternative to Jackson) -->
    <dependency>
        <groupId>com.google.code.gson</groupId>
        <artifactId>gson</artifactId>
        <version>2.10.1</version>
    </dependency>

    <!-- ===== API TESTING ===== -->
    <!-- REST Assured for API automation -->
    <dependency>
        <groupId>io.rest-assured</groupId>
        <artifactId>rest-assured</artifactId>
        <version>${rest-assured.version}</version>
        <scope>test</scope>
    </dependency>

    <!-- ===== TEST DATA GENERATION ===== -->
    <!-- JavaFaker for generating test data -->
    <dependency>
        <groupId>com.github.javafaker</groupId>
        <artifactId>javafaker</artifactId>
        <version>${javafaker.version}</version>
    </dependency>

    <!-- ===== ASSERTIONS ===== -->
    <!-- AssertJ for fluent assertions -->
    <dependency>
        <groupId>org.assertj</groupId>
        <artifactId>assertj-core</artifactId>
        <version>3.24.2</version>
        <scope>test</scope>
    </dependency>

    <!-- ===== UTILITIES ===== -->
    <!-- Apache Commons IO -->
    <dependency>
        <groupId>commons-io</groupId>
        <artifactId>commons-io</artifactId>
        <version>2.15.0</version>
    </dependency>

    <!-- Apache Commons Lang -->
    <dependency>
        <groupId>org.apache.commons</groupId>
        <artifactId>commons-lang3</artifactId>
        <version>3.14.0</version>
    </dependency>

    <!-- ===== SCREENSHOT COMPARISON ===== -->
    <!-- Ashot for screenshot utilities -->
    <dependency>
        <groupId>ru.yandex.qatools.ashot</groupId>
        <artifactId>ashot</artifactId>
        <version>1.5.4</version>
    </dependency>

    <!-- ===== DATABASE ===== -->
    <!-- MySQL Connector (if needed) -->
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <version>8.2.0</version>
        <scope>runtime</scope>
    </dependency>

    <!-- ===== MOCKING (for unit tests) ===== -->
    <!-- Mockito -->
    <dependency>
        <groupId>org.mockito</groupId>
        <artifactId>mockito-core</artifactId>
        <version>5.7.0</version>
        <scope>test</scope>
    </dependency>
</dependencies>
```

### Dependency Purpose Explained

| Dependency | Purpose | When to Use |
|------------|---------|-------------|
| **selenium-java** | WebDriver core library | Always (required) |
| **testng** | Test framework | Always (or JUnit) |
| **webdrivermanager** | Auto-download browser drivers | Recommended (no manual driver setup) |
| **extentreports** | HTML test reports | For beautiful reports |
| **poi / poi-ooxml** | Read/write Excel files | Data-driven testing from Excel |
| **log4j** | Logging framework | Professional logging |
| **jackson-databind / gson** | JSON parsing | API testing, JSON config files |
| **rest-assured** | API testing | When testing REST APIs |
| **javafaker** | Generate fake data | Create realistic test data |
| **assertj** | Fluent assertions | Readable assertion syntax |
| **commons-io / commons-lang3** | Utility methods | File operations, string utils |
| **ashot** | Screenshot utilities | Full-page screenshots |
| **allure-testng** | Allure reporting | Advanced reporting with trends |

---

## <a name="lifecycle"></a>🔄 Maven Build Lifecycle

### Three Built-in Lifecycles

Maven has three independent build lifecycles:

1. **clean** - Cleans the project
2. **default** - Builds the project
3. **site** - Creates project documentation

### Clean Lifecycle Phases

```
clean lifecycle:
    pre-clean → clean → post-clean
```

```bash
# Clean the project (delete target/ directory)
mvn clean

# Full command with phases
mvn pre-clean clean post-clean
```

### Default Lifecycle Phases (Most Important)

```
default lifecycle:
    validate → compile → test → package → verify → install → deploy
         ↓         ↓       ↓        ↓         ↓        ↓        ↓
    [Pre-phases for each main phase]
```

**Complete Default Lifecycle:**

1. **validate**: Validate project structure and configuration
2. **initialize**: Initialize build state
3. **generate-sources**: Generate any source code
4. **process-sources**: Process source code
5. **generate-resources**: Generate resources
6. **process-resources**: Copy resources to target
7. **compile**: Compile source code
8. **process-classes**: Post-process compiled files
9. **generate-test-sources**: Generate test source code
10. **process-test-sources**: Process test source code
11. **generate-test-resources**: Generate test resources
12. **process-test-resources**: Copy test resources
13. **test-compile**: Compile test code
14. **process-test-classes**: Post-process test compiled files
15. **test**: Run tests using Surefire plugin
16. **prepare-package**: Prepare for packaging
17. **package**: Create JAR/WAR
18. **pre-integration-test**: Prepare for integration tests
19. **integration-test**: Run integration tests
20. **post-integration-test**: Cleanup after integration tests
21. **verify**: Verify package is valid
22. **install**: Install package to local repository
23. **deploy**: Deploy to remote repository

### Common Maven Commands

```bash
# ===== CLEAN =====

# Clean target directory
mvn clean

# ===== COMPILE =====

# Compile main source code only
mvn compile

# Compile main + test source code
mvn test-compile

# ===== TEST =====

# Run tests
mvn test

# Clean and test
mvn clean test

# Skip tests
mvn clean install -DskipTests

# Skip test compilation and execution
mvn clean install -Dmaven.test.skip=true

# ===== PACKAGE =====

# Create JAR file (includes: compile → test → package)
mvn package

# Create JAR without running tests
mvn package -DskipTests

# ===== INSTALL =====

# Install to local Maven repository (~/.m2/repository)
mvn install

# Clean and install
mvn clean install

# ===== VERIFY =====

# Run integration tests
mvn verify

# ===== FULL BUILD =====

# Complete build: clean → compile → test → package
mvn clean package

# Complete build with install
mvn clean install

# ===== SPECIFIC TEST EXECUTION =====

# Run single test class
mvn test -Dtest=LoginTest

# Run multiple test classes
mvn test -Dtest=LoginTest,CheckoutTest

# Run test methods matching pattern
mvn test -Dtest=LoginTest#testValidLogin

# Run all tests in package
mvn test -Dtest=com.example.tests.**
```

### Phase Execution Order

**Important:** When you run a phase, all previous phases execute automatically.

```bash
# Running "test" executes all these phases:
mvn test
# Executes: validate → compile → test-compile → test

# Running "package" executes:
mvn package
# Executes: validate → compile → test → package

# Running "install" executes:
mvn install
# Executes: validate → compile → test → package → install
```

### Site Lifecycle

```
site lifecycle:
    pre-site → site → post-site → site-deploy
```

```bash
# Generate project documentation site
mvn site

# Deploy site to server
mvn site-deploy
```

---

## <a name="plugins"></a>🔌 Plugins Configuration

### What are Maven Plugins?

Plugins are the heart of Maven. They perform tasks during build lifecycle phases.

**Two types of plugins:**
1. **Build plugins**: Execute during the build (configured in `<build>`)
2. **Reporting plugins**: Execute during site generation (configured in `<reporting>`)

### Maven Compiler Plugin

Controls Java version and compilation.

```xml
<build>
    <plugins>
        <!-- Compiler Plugin -->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.11.0</version>
            <configuration>
                <!-- Java version -->
                <source>11</source>  <!-- Source code Java version -->
                <target>11</target>  <!-- Compiled bytecode Java version -->

                <!-- Alternative: Use release (Java 9+) -->
                <!-- <release>11</release> -->

                <!-- Encoding -->
                <encoding>UTF-8</encoding>

                <!-- Show warnings -->
                <showWarnings>true</showWarnings>
                <showDeprecation>true</showDeprecation>
            </configuration>
        </plugin>
    </plugins>
</build>
```

### Maven Surefire Plugin (Test Execution)

Executes unit tests during `test` phase.

```xml
<build>
    <plugins>
        <!-- Surefire Plugin for TestNG -->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>3.2.2</version>
            <configuration>
                <!-- TestNG suite file -->
                <suiteXmlFiles>
                    <suiteXmlFile>src/test/resources/testng.xml</suiteXmlFile>
                </suiteXmlFiles>

                <!-- Multiple suite files -->
                <!--
                <suiteXmlFiles>
                    <suiteXmlFile>testng-smoke.xml</suiteXmlFile>
                    <suiteXmlFile>testng-regression.xml</suiteXmlFile>
                </suiteXmlFiles>
                -->

                <!-- Include specific tests -->
                <!--
                <includes>
                    <include>**/*Test.java</include>
                    <include>**/*Tests.java</include>
                </includes>
                -->

                <!-- Exclude specific tests -->
                <!--
                <excludes>
                    <exclude>**/*IntegrationTest.java</exclude>
                </excludes>
                -->

                <!-- Parallel execution -->
                <parallel>methods</parallel>
                <threadCount>3</threadCount>

                <!-- Rerun failed tests -->
                <rerunFailingTestsCount>2</rerunFailingTestsCount>

                <!-- System properties -->
                <systemPropertyVariables>
                    <browser>chrome</browser>
                    <environment>qa</environment>
                </systemPropertyVariables>

                <!-- Test output -->
                <printSummary>true</printSummary>
            </configuration>
        </plugin>
    </plugins>
</build>
```

**Running with system properties:**
```bash
# Override properties from command line
mvn test -Dbrowser=firefox -Denvironment=staging
```

### Maven Failsafe Plugin (Integration Tests)

Executes integration tests during `verify` phase.

```xml
<build>
    <plugins>
        <!-- Failsafe Plugin for Integration Tests -->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-failsafe-plugin</artifactId>
            <version>3.2.2</version>
            <configuration>
                <!-- Integration test suite -->
                <suiteXmlFiles>
                    <suiteXmlFile>testng-integration.xml</suiteXmlFile>
                </suiteXmlFiles>

                <!-- Naming convention for integration tests -->
                <includes>
                    <include>**/*IT.java</include>
                    <include>**/*IntegrationTest.java</include>
                </includes>
            </configuration>
            <executions>
                <execution>
                    <goals>
                        <goal>integration-test</goal>
                        <goal>verify</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```

**Usage:**
```bash
# Run integration tests
mvn verify

# Run only integration tests (skip unit tests)
mvn verify -DskipUnitTests
```

### Build Helper Plugin

Adds additional source directories.

```xml
<build>
    <plugins>
        <!-- Build Helper Plugin -->
        <plugin>
            <groupId>org.codehaus.mojo</groupId>
            <artifactId>build-helper-maven-plugin</artifactId>
            <version>3.4.0</version>
            <executions>
                <execution>
                    <id>add-test-source</id>
                    <phase>generate-test-sources</phase>
                    <goals>
                        <goal>add-test-source</goal>
                    </goals>
                    <configuration>
                        <sources>
                            <source>src/integration-test/java</source>
                        </sources>
                    </configuration>
                </execution>
                <execution>
                    <id>add-test-resource</id>
                    <phase>generate-test-resources</phase>
                    <goals>
                        <goal>add-test-resource</goal>
                    </goals>
                    <configuration>
                        <resources>
                            <resource>
                                <directory>src/integration-test/resources</directory>
                            </resource>
                        </resources>
                    </configuration>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```

### Allure Maven Plugin

For Allure reporting.

```xml
<build>
    <plugins>
        <!-- Allure Maven Plugin -->
        <plugin>
            <groupId>io.qameta.allure</groupId>
            <artifactId>allure-maven</artifactId>
            <version>2.12.0</version>
            <configuration>
                <reportVersion>2.24.0</reportVersion>
                <resultsDirectory>${project.build.directory}/allure-results</resultsDirectory>
            </configuration>
        </plugin>
    </plugins>
</build>
```

**Usage:**
```bash
# Generate Allure report
mvn allure:report

# Serve Allure report (opens in browser)
mvn allure:serve
```

---

## <a name="profiles"></a>👥 Profiles & Environments

### What are Maven Profiles?

Profiles allow you to customize builds for different environments or scenarios.

### Creating Profiles

```xml
<profiles>
    <!-- ===== QA ENVIRONMENT ===== -->
    <profile>
        <id>qa</id>
        <activation>
            <activeByDefault>true</activeByDefault>  <!-- Default profile -->
        </activation>
        <properties>
            <environment>qa</environment>
            <base.url>https://qa.example.com</base.url>
            <db.url>jdbc:mysql://qa-db:3306/testdb</db.url>
            <browser>chrome</browser>
        </properties>
        <build>
            <plugins>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-surefire-plugin</artifactId>
                    <configuration>
                        <suiteXmlFiles>
                            <suiteXmlFile>testng-qa.xml</suiteXmlFile>
                        </suiteXmlFiles>
                    </configuration>
                </plugin>
            </plugins>
        </build>
    </profile>

    <!-- ===== STAGING ENVIRONMENT ===== -->
    <profile>
        <id>staging</id>
        <properties>
            <environment>staging</environment>
            <base.url>https://staging.example.com</base.url>
            <db.url>jdbc:mysql://staging-db:3306/testdb</db.url>
            <browser>chrome</browser>
        </properties>
        <build>
            <plugins>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-surefire-plugin</artifactId>
                    <configuration>
                        <suiteXmlFiles>
                            <suiteXmlFile>testng-staging.xml</suiteXmlFile>
                        </suiteXmlFiles>
                    </configuration>
                </plugin>
            </plugins>
        </build>
    </profile>

    <!-- ===== PRODUCTION ENVIRONMENT ===== -->
    <profile>
        <id>prod</id>
        <properties>
            <environment>production</environment>
            <base.url>https://www.example.com</base.url>
            <db.url>jdbc:mysql://prod-db:3306/testdb</db.url>
            <browser>chrome</browser>
        </properties>
        <build>
            <plugins>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-surefire-plugin</artifactId>
                    <configuration>
                        <suiteXmlFiles>
                            <suiteXmlFile>testng-smoke.xml</suiteXmlFile>
                        </suiteXmlFiles>
                    </configuration>
                </plugin>
            </plugins>
        </build>
    </profile>

    <!-- ===== SMOKE TESTS ===== -->
    <profile>
        <id>smoke</id>
        <build>
            <plugins>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-surefire-plugin</artifactId>
                    <configuration>
                        <groups>smoke</groups>
                        <suiteXmlFiles>
                            <suiteXmlFile>testng-smoke.xml</suiteXmlFile>
                        </suiteXmlFiles>
                    </configuration>
                </plugin>
            </plugins>
        </build>
    </profile>

    <!-- ===== REGRESSION TESTS ===== -->
    <profile>
        <id>regression</id>
        <build>
            <plugins>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-surefire-plugin</artifactId>
                    <configuration>
                        <groups>regression</groups>
                        <suiteXmlFiles>
                            <suiteXmlFile>testng-regression.xml</suiteXmlFile>
                        </suiteXmlFiles>
                        <parallel>methods</parallel>
                        <threadCount>5</threadCount>
                    </configuration>
                </plugin>
            </plugins>
        </build>
    </profile>

    <!-- ===== CROSS-BROWSER PROFILES ===== -->
    <profile>
        <id>chrome</id>
        <properties>
            <browser>chrome</browser>
        </properties>
    </profile>

    <profile>
        <id>firefox</id>
        <properties>
            <browser>firefox</browser>
        </properties>
    </profile>

    <profile>
        <id>edge</id>
        <properties>
            <browser>edge</browser>
        </properties>
    </profile>
</profiles>
```

### Activating Profiles

```bash
# ===== Activate single profile =====
mvn clean test -Pqa

# ===== Activate multiple profiles =====
mvn clean test -Pqa,smoke

# ===== Activate profile with additional properties =====
mvn clean test -Pqa -Dbrowser=firefox

# ===== Environment + Test Type =====
mvn clean test -Pstaging,regression

# ===== Cross-browser testing =====
mvn clean test -Pqa,chrome
mvn clean test -Pqa,firefox

# ===== List active profiles =====
mvn help:active-profiles

# ===== List all profiles =====
mvn help:all-profiles
```

### Advanced Profile Activation

```xml
<profiles>
    <!-- Activate by JDK version -->
    <profile>
        <id>jdk11</id>
        <activation>
            <jdk>11</jdk>
        </activation>
        <!-- Configuration for JDK 11 -->
    </profile>

    <!-- Activate by OS -->
    <profile>
        <id>windows</id>
        <activation>
            <os>
                <family>windows</family>
            </os>
        </activation>
        <!-- Windows-specific configuration -->
    </profile>

    <!-- Activate by property -->
    <profile>
        <id>debug</id>
        <activation>
            <property>
                <name>debug</name>
                <value>true</value>
            </property>
        </activation>
        <!-- Debug configuration -->
    </profile>

    <!-- Activate by file presence -->
    <profile>
        <id>local</id>
        <activation>
            <file>
                <exists>local.properties</exists>
            </file>
        </activation>
        <!-- Local environment configuration -->
    </profile>
</profiles>
```

---

## <a name="running-tests"></a>🏃 Running Tests with Maven

### Basic Test Execution

```bash
# Run all tests
mvn test

# Run all tests with clean
mvn clean test

# Run tests without cleaning
mvn test

# Skip tests
mvn install -DskipTests

# Skip test compilation and execution
mvn install -Dmaven.test.skip=true
```

### Running Specific Tests

```bash
# ===== Single test class =====
mvn test -Dtest=LoginTest

# ===== Multiple test classes =====
mvn test -Dtest=LoginTest,CheckoutTest,SearchTest

# ===== Test classes by pattern =====
mvn test -Dtest=*Test

# All classes ending with Test
mvn test -Dtest="**/*Test"

# All classes starting with Test
mvn test -Dtest="Test*"

# ===== Specific test method =====
mvn test -Dtest=LoginTest#testValidLogin

# ===== Multiple test methods =====
mvn test -Dtest=LoginTest#testValidLogin+testInvalidLogin

# ===== Test methods by pattern =====
mvn test -Dtest=LoginTest#test*

# ===== Package-level execution =====
mvn test -Dtest=com.example.tests.**
```

### Running with TestNG Groups

```bash
# Run specific TestNG group
mvn test -Dgroups=smoke

# Run multiple groups
mvn test -Dgroups=smoke,regression

# Exclude groups
mvn test -DexcludedGroups=broken,slow

# Combine include and exclude
mvn test -Dgroups=regression -DexcludedGroups=slow
```

### Test Filtering with Surefire

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>3.2.2</version>
            <configuration>
                <!-- Include patterns -->
                <includes>
                    <include>**/*Test.java</include>
                    <include>**/*Tests.java</include>
                    <include>**/*TestCase.java</include>
                </includes>

                <!-- Exclude patterns -->
                <excludes>
                    <exclude>**/Abstract*.java</exclude>
                    <exclude>**/*IntegrationTest.java</exclude>
                </excludes>
            </configuration>
        </plugin>
    </plugins>
</build>
```

### Parallel Execution Configuration

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>3.2.2</version>
            <configuration>
                <!-- Parallel at method level -->
                <parallel>methods</parallel>
                <threadCount>3</threadCount>

                <!-- Parallel at class level -->
                <!-- <parallel>classes</parallel> -->
                <!-- <threadCount>2</threadCount> -->

                <!-- Parallel at both levels -->
                <!-- <parallel>both</parallel> -->
                <!-- <threadCount>4</threadCount> -->

                <!-- Use unlimited threads (use with caution) -->
                <!-- <parallel>methods</parallel> -->
                <!-- <useUnlimitedThreads>true</useUnlimitedThreads> -->
            </configuration>
        </plugin>
    </plugins>
</build>
```

**Command line override:**
```bash
# Override parallel configuration
mvn test -Dparallel=methods -DthreadCount=5
```

### System Properties

```bash
# Pass system properties to tests
mvn test -Dbrowser=chrome -Durl=https://example.com

# Multiple properties
mvn test -Dbrowser=firefox -Dheadless=true -Dtimeout=30
```

**Access in test code:**
```java
public class ConfigTest {
    @Test
    public void testWithProperties() {
        String browser = System.getProperty("browser", "chrome");
        String url = System.getProperty("url", "https://default.com");

        System.out.println("Browser: " + browser);
        System.out.println("URL: " + url);
    }
}
```

---

## <a name="best-practices"></a>📋 Maven Best Practices

### 1. pom.xml Organization

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project>
    <!-- 1. Project coordinates -->
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>selenium-framework</artifactId>
    <version>1.0-SNAPSHOT</version>

    <!-- 2. Project information -->
    <name>Selenium Automation Framework</name>
    <description>Enterprise test automation framework</description>

    <!-- 3. Properties (versions, configuration) -->
    <properties>
        <!-- Java version -->
        <!-- Dependency versions -->
        <!-- Build configuration -->
    </properties>

    <!-- 4. Dependency Management (optional) -->
    <dependencyManagement>
        <!-- Version control for dependencies -->
    </dependencyManagement>

    <!-- 5. Dependencies -->
    <dependencies>
        <!-- Organized by category with comments -->
    </dependencies>

    <!-- 6. Build configuration -->
    <build>
        <plugins>
            <!-- Build plugins -->
        </plugins>
    </build>

    <!-- 7. Profiles -->
    <profiles>
        <!-- Environment and execution profiles -->
    </profiles>
</project>
```

### 2. Property Management Best Practices

```xml
<properties>
    <!-- ===== JAVA VERSION ===== -->
    <maven.compiler.source>11</maven.compiler.source>
    <maven.compiler.target>11</maven.compiler.target>

    <!-- ===== ENCODING ===== -->
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>

    <!-- ===== CORE DEPENDENCIES ===== -->
    <selenium.version>4.15.0</selenium.version>
    <testng.version>7.8.0</testng.version>

    <!-- ===== SUPPORTING LIBRARIES ===== -->
    <webdrivermanager.version>5.6.2</webdrivermanager.version>
    <extentreports.version>5.1.1</extentreports.version>

    <!-- ===== PLUGIN VERSIONS ===== -->
    <maven-compiler-plugin.version>3.11.0</maven-compiler-plugin.version>
    <maven-surefire-plugin.version>3.2.2</maven-surefire-plugin.version>
</properties>
```

### 3. Dependency Organization

```xml
<dependencies>
    <!-- ========================================= -->
    <!-- WEB DRIVER                               -->
    <!-- ========================================= -->
    <dependency>
        <groupId>org.seleniumhq.selenium</groupId>
        <artifactId>selenium-java</artifactId>
        <version>${selenium.version}</version>
    </dependency>

    <!-- ========================================= -->
    <!-- TEST FRAMEWORK                           -->
    <!-- ========================================= -->
    <dependency>
        <groupId>org.testng</groupId>
        <artifactId>testng</artifactId>
        <version>${testng.version}</version>
        <scope>test</scope>
    </dependency>

    <!-- ========================================= -->
    <!-- REPORTING                                -->
    <!-- ========================================= -->
    <dependency>
        <groupId>com.aventstack</groupId>
        <artifactId>extentreports</artifactId>
        <version>${extentreports.version}</version>
    </dependency>

    <!-- ... more dependencies organized by category ... -->
</dependencies>
```

### 4. Multi-Module Project Structure

```
selenium-framework/
├── pom.xml                          ← Parent POM
├── core/                            ← Core framework module
│   ├── pom.xml
│   └── src/
│       └── main/
│           └── java/
│               ├── pages/
│               ├── utils/
│               └── config/
├── web-tests/                       ← Web UI tests module
│   ├── pom.xml
│   └── src/
│       └── test/
│           └── java/
│               └── tests/
├── api-tests/                       ← API tests module
│   ├── pom.xml
│   └── src/
│       └── test/
│           └── java/
│               └── tests/
└── mobile-tests/                    ← Mobile tests module
    ├── pom.xml
    └── src/
        └── test/
            └── java/
                └── tests/
```

**Parent pom.xml:**
```xml
<project>
    <groupId>com.example</groupId>
    <artifactId>selenium-framework</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>pom</packaging>  <!-- Parent must be POM type -->

    <!-- Child modules -->
    <modules>
        <module>core</module>
        <module>web-tests</module>
        <module>api-tests</module>
        <module>mobile-tests</module>
    </modules>

    <!-- Common dependencies for all modules -->
    <dependencyManagement>
        <dependencies>
            <!-- Define versions here -->
        </dependencies>
    </dependencyManagement>
</project>
```

### 5. Repository Management

```xml
<!-- Use repositories only when needed (Maven Central is default) -->
<repositories>
    <!-- Custom repository -->
    <repository>
        <id>company-repo</id>
        <name>Company Repository</name>
        <url>https://repo.company.com/maven2</url>
    </repository>
</repositories>

<!-- Plugin repositories -->
<pluginRepositories>
    <pluginRepository>
        <id>company-plugin-repo</id>
        <name>Company Plugin Repository</name>
        <url>https://repo.company.com/maven2</url>
    </pluginRepository>
</pluginRepositories>
```

### 6. Version Management Strategies

```xml
<!-- ❌ BAD: Hardcoded versions everywhere -->
<dependency>
    <groupId>org.seleniumhq.selenium</groupId>
    <artifactId>selenium-java</artifactId>
    <version>4.15.0</version>
</dependency>

<!-- ✅ GOOD: Version in property -->
<properties>
    <selenium.version>4.15.0</selenium.version>
</properties>
<dependency>
    <groupId>org.seleniumhq.selenium</groupId>
    <artifactId>selenium-java</artifactId>
    <version>${selenium.version}</version>
</dependency>

<!-- ✅ BETTER: Version in dependencyManagement -->
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.seleniumhq.selenium</groupId>
            <artifactId>selenium-java</artifactId>
            <version>4.15.0</version>
        </dependency>
    </dependencies>
</dependencyManagement>
<dependencies>
    <dependency>
        <groupId>org.seleniumhq.selenium</groupId>
        <artifactId>selenium-java</artifactId>
        <!-- No version needed -->
    </dependency>
</dependencies>
```

---

## <a name="complete-example"></a>🎯 Complete Example

### Full Production-Ready pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">

    <modelVersion>4.0.0</modelVersion>

    <!-- ========================================= -->
    <!-- PROJECT COORDINATES                      -->
    <!-- ========================================= -->
    <groupId>com.example</groupId>
    <artifactId>selenium-automation-framework</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>jar</packaging>

    <name>Selenium Automation Framework</name>
    <description>Enterprise-grade test automation framework</description>
    <url>https://www.example.com</url>

    <!-- ========================================= -->
    <!-- PROPERTIES                               -->
    <!-- ========================================= -->
    <properties>
        <!-- Java Version -->
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>

        <!-- Encoding -->
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>

        <!-- Core Dependencies -->
        <selenium.version>4.15.0</selenium.version>
        <testng.version>7.8.0</testng.version>

        <!-- Driver Management -->
        <webdrivermanager.version>5.6.2</webdrivermanager.version>

        <!-- Reporting -->
        <extentreports.version>5.1.1</extentreports.version>
        <allure.version>2.24.0</allure.version>

        <!-- Data Handling -->
        <poi.version>5.2.3</poi.version>
        <jackson.version>2.15.2</jackson.version>

        <!-- Logging -->
        <log4j.version>2.20.0</log4j.version>

        <!-- Utilities -->
        <commons-io.version>2.15.0</commons-io.version>
        <javafaker.version>1.0.2</javafaker.version>

        <!-- Plugins -->
        <maven-compiler-plugin.version>3.11.0</maven-compiler-plugin.version>
        <maven-surefire-plugin.version>3.2.2</maven-surefire-plugin.version>
    </properties>

    <!-- ========================================= -->
    <!-- DEPENDENCIES                             -->
    <!-- ========================================= -->
    <dependencies>
        <!-- Selenium WebDriver -->
        <dependency>
            <groupId>org.seleniumhq.selenium</groupId>
            <artifactId>selenium-java</artifactId>
            <version>${selenium.version}</version>
        </dependency>

        <!-- TestNG -->
        <dependency>
            <groupId>org.testng</groupId>
            <artifactId>testng</artifactId>
            <version>${testng.version}</version>
            <scope>test</scope>
        </dependency>

        <!-- WebDriver Manager -->
        <dependency>
            <groupId>io.github.bonigarcia</groupId>
            <artifactId>webdrivermanager</artifactId>
            <version>${webdrivermanager.version}</version>
        </dependency>

        <!-- ExtentReports -->
        <dependency>
            <groupId>com.aventstack</groupId>
            <artifactId>extentreports</artifactId>
            <version>${extentreports.version}</version>
        </dependency>

        <!-- Allure TestNG -->
        <dependency>
            <groupId>io.qameta.allure</groupId>
            <artifactId>allure-testng</artifactId>
            <version>${allure.version}</version>
        </dependency>

        <!-- Apache POI (Excel) -->
        <dependency>
            <groupId>org.apache.poi</groupId>
            <artifactId>poi</artifactId>
            <version>${poi.version}</version>
        </dependency>
        <dependency>
            <groupId>org.apache.poi</groupId>
            <artifactId>poi-ooxml</artifactId>
            <version>${poi.version}</version>
        </dependency>

        <!-- Jackson (JSON) -->
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>${jackson.version}</version>
        </dependency>

        <!-- Log4j 2 -->
        <dependency>
            <groupId>org.apache.logging.log4j</groupId>
            <artifactId>log4j-core</artifactId>
            <version>${log4j.version}</version>
        </dependency>
        <dependency>
            <groupId>org.apache.logging.log4j</groupId>
            <artifactId>log4j-api</artifactId>
            <version>${log4j.version}</version>
        </dependency>

        <!-- Commons IO -->
        <dependency>
            <groupId>commons-io</groupId>
            <artifactId>commons-io</artifactId>
            <version>${commons-io.version}</version>
        </dependency>

        <!-- JavaFaker -->
        <dependency>
            <groupId>com.github.javafaker</groupId>
            <artifactId>javafaker</artifactId>
            <version>${javafaker.version}</version>
        </dependency>
    </dependencies>

    <!-- ========================================= -->
    <!-- BUILD CONFIGURATION                      -->
    <!-- ========================================= -->
    <build>
        <plugins>
            <!-- Compiler Plugin -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>${maven-compiler-plugin.version}</version>
                <configuration>
                    <source>11</source>
                    <target>11</target>
                    <encoding>UTF-8</encoding>
                </configuration>
            </plugin>

            <!-- Surefire Plugin -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <version>${maven-surefire-plugin.version}</version>
                <configuration>
                    <suiteXmlFiles>
                        <suiteXmlFile>src/test/resources/testng.xml</suiteXmlFile>
                    </suiteXmlFiles>
                    <systemPropertyVariables>
                        <browser>${browser}</browser>
                        <environment>${environment}</environment>
                    </systemPropertyVariables>
                </configuration>
            </plugin>

            <!-- Allure Plugin -->
            <plugin>
                <groupId>io.qameta.allure</groupId>
                <artifactId>allure-maven</artifactId>
                <version>2.12.0</version>
            </plugin>
        </plugins>
    </build>

    <!-- ========================================= -->
    <!-- PROFILES                                 -->
    <!-- ========================================= -->
    <profiles>
        <!-- QA Environment -->
        <profile>
            <id>qa</id>
            <activation>
                <activeByDefault>true</activeByDefault>
            </activation>
            <properties>
                <environment>qa</environment>
                <browser>chrome</browser>
            </properties>
        </profile>

        <!-- Staging Environment -->
        <profile>
            <id>staging</id>
            <properties>
                <environment>staging</environment>
                <browser>chrome</browser>
            </properties>
        </profile>

        <!-- Smoke Tests -->
        <profile>
            <id>smoke</id>
            <build>
                <plugins>
                    <plugin>
                        <groupId>org.apache.maven.plugins</groupId>
                        <artifactId>maven-surefire-plugin</artifactId>
                        <configuration>
                            <groups>smoke</groups>
                        </configuration>
                    </plugin>
                </plugins>
            </build>
        </profile>

        <!-- Regression Tests -->
        <profile>
            <id>regression</id>
            <build>
                <plugins>
                    <plugin>
                        <groupId>org.apache.maven.plugins</groupId>
                        <artifactId>maven-surefire-plugin</artifactId>
                        <configuration>
                            <groups>regression</groups>
                            <parallel>methods</parallel>
                            <threadCount>3</threadCount>
                        </configuration>
                    </plugin>
                </plugins>
            </build>
        </profile>
    </profiles>

</project>
```

### Complete Directory Structure

```
selenium-automation-framework/
├── pom.xml
├── README.md
├── .gitignore
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── example/
│   │   │           ├── config/
│   │   │           │   ├── ConfigReader.java
│   │   │           │   └── DriverFactory.java
│   │   │           ├── pages/
│   │   │           │   ├── BasePage.java
│   │   │           │   ├── LoginPage.java
│   │   │           │   └── HomePage.java
│   │   │           └── utils/
│   │   │               ├── ExcelUtils.java
│   │   │               ├── ScreenshotUtils.java
│   │   │               └── WaitUtils.java
│   │   └── resources/
│   │       ├── config.properties
│   │       └── log4j2.xml
│   └── test/
│       ├── java/
│       │   └── com/
│       │       └── example/
│       │           ├── base/
│       │           │   └── BaseTest.java
│       │           ├── tests/
│       │           │   ├── LoginTest.java
│       │           │   ├── SearchTest.java
│       │           │   └── CheckoutTest.java
│       │           └── listeners/
│       │               ├── TestListener.java
│       │               └── RetryAnalyzer.java
│       └── resources/
│           ├── testng.xml
│           ├── testng-smoke.xml
│           ├── testng-regression.xml
│           └── testdata/
│               └── LoginData.xlsx
└── target/
    ├── classes/
    ├── test-classes/
    ├── surefire-reports/
    └── allure-results/
```

### Common Maven Commands Reference

```bash
# ===== BASIC COMMANDS =====

# Clean project
mvn clean

# Compile source code
mvn compile

# Run tests
mvn test

# Package application
mvn package

# Install to local repository
mvn install

# ===== COMBINED COMMANDS =====

# Clean and compile
mvn clean compile

# Clean and test
mvn clean test

# Clean and package
mvn clean package

# Clean and install
mvn clean install

# ===== PROFILE ACTIVATION =====

# Run with QA profile
mvn clean test -Pqa

# Run smoke tests on staging
mvn clean test -Pstaging,smoke

# Run regression tests on QA
mvn clean test -Pqa,regression

# ===== SPECIFIC TEST EXECUTION =====

# Run single test
mvn test -Dtest=LoginTest

# Run multiple tests
mvn test -Dtest=LoginTest,CheckoutTest

# Run test method
mvn test -Dtest=LoginTest#testValidLogin

# Run with groups
mvn test -Dgroups=smoke

# ===== SYSTEM PROPERTIES =====

# Pass browser property
mvn test -Dbrowser=firefox

# Multiple properties
mvn test -Dbrowser=chrome -Dheadless=true

# ===== SKIP TESTS =====

# Skip test execution
mvn install -DskipTests

# Skip test compilation
mvn install -Dmaven.test.skip=true

# ===== DEPENDENCY COMMANDS =====

# Show dependency tree
mvn dependency:tree

# List dependencies
mvn dependency:list

# Analyze dependencies
mvn dependency:analyze

# Download sources
mvn dependency:sources

# ===== OTHER USEFUL COMMANDS =====

# Show effective POM
mvn help:effective-pom

# Show active profiles
mvn help:active-profiles

# Generate Allure report
mvn allure:report

# Serve Allure report
mvn allure:serve
```

---

## Troubleshooting Guide

### Common Issues and Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| **"Cannot resolve dependency"** | Artifact not in repository | Check artifact coordinates, Maven Central availability |
| **"Failed to execute goal"** | Plugin configuration error | Review plugin configuration, check versions |
| **"Source option 5 is no longer supported"** | Old Java version in pom.xml | Update maven.compiler.source/target to 8+ |
| **Tests not running** | Test naming convention | Ensure tests match Surefire patterns (*Test.java) |
| **"Could not find artifact"** | Transitive dependency issue | Use `mvn dependency:tree` to debug |
| **OutOfMemoryError** | Maven heap size too small | Increase heap: `export MAVEN_OPTS="-Xmx1024m"` |
| **Slow Maven build** | Downloading dependencies | Dependencies are cached after first download |
| **Profile not activating** | Wrong profile ID | Check profile ID, use `mvn help:active-profiles` |

### Maven Settings (~/.m2/settings.xml)

```xml
<settings>
    <!-- Local repository location -->
    <localRepository>/path/to/custom/repo</localRepository>

    <!-- Proxy configuration (if needed) -->
    <proxies>
        <proxy>
            <id>company-proxy</id>
            <active>true</active>
            <protocol>http</protocol>
            <host>proxy.company.com</host>
            <port>8080</port>
            <username>proxyuser</username>
            <password>proxypass</password>
        </proxy>
    </proxies>

    <!-- Active profiles -->
    <activeProfiles>
        <activeProfile>qa</activeProfile>
    </activeProfiles>
</settings>
```

---

**Total Lines: ~750+**
**Document Type: Comprehensive Technical Guide**
**Target Audience: Selenium Test Automation Engineers**
**Coverage: Complete Maven and dependency management for production-ready test automation frameworks**
