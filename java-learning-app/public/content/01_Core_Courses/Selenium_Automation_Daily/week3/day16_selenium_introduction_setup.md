# Day 16: Selenium Introduction & Setup

**Week 3: Selenium WebDriver Basics**

---

## 📋 Table of Contents
- [Learning Objectives](#learning-objectives)
- [Topics Covered](#topics-covered)
- [Detailed Content](#detailed-content)
- [Practical Exercises](#practical-exercises)
- [Key Takeaways](#key-takeaways)
- [Additional Resources](#additional-resources)
- [Navigation](#navigation)

---

## 🎯 Learning Objectives

By the end of Day 16, you will be able to:
- Explain what Selenium WebDriver is and its purpose
- Understand Selenium suite components (IDE, WebDriver, Grid)
- Describe WebDriver architecture and how it communicates with browsers
- Understand the concept of browser drivers
- Create a Maven project for Selenium automation
- Add Selenium dependencies to pom.xml
- Configure WebDriverManager for automatic driver management
- Understand the WebDriver interface and its implementations
- Set up proper project structure for automation framework

---

## 📚 Topics Covered

### 1. What is Selenium?

**Selenium** is an open-source suite of tools and libraries for automating web browsers. It's the most popular tool for web application testing and browser automation.

#### Brief History:
- **2004**: Selenium Core created by Jason Huggins at ThoughtWorks
- **2006**: Selenium WebDriver developed by Simon Stewart
- **2008**: Selenium merged into a single tool
- **2011**: Selenium 2.0 released (WebDriver + Selenium RC)
- **2016**: Selenium 3.0 released (WebDriver only)
- **2021**: Selenium 4.0 released (W3C WebDriver protocol)

#### Why Selenium?
- **Open Source**: Free to use, large community
- **Cross-Browser**: Chrome, Firefox, Edge, Safari, Opera
- **Cross-Platform**: Windows, Mac, Linux
- **Language Support**: Java, Python, C#, Ruby, JavaScript
- **Framework Integration**: TestNG, JUnit, Cucumber
- **CI/CD Integration**: Jenkins, GitLab CI, GitHub Actions
- **Industry Standard**: Most widely used automation tool

---

### 2. Selenium Suite Components

Selenium is not just one tool, but a suite of tools:

#### **Selenium IDE (Integrated Development Environment)**
- **Type**: Browser extension
- **Purpose**: Record and playback automation scripts
- **Pros**:
  - No coding required
  - Quick script creation
  - Good for prototyping
- **Cons**:
  - Limited functionality
  - Not suitable for complex scenarios
  - Maintenance challenges
- **Use Case**: Quick demos, learning Selenium basics

#### **Selenium WebDriver**
- **Type**: Programming library
- **Purpose**: Write automation scripts in programming languages
- **Pros**:
  - Full programming capabilities
  - Complex test scenarios
  - Better maintenance
  - CI/CD integration
- **Cons**:
  - Requires programming knowledge
  - Steeper learning curve
- **Use Case**: Professional automation testing (what we'll learn)

#### **Selenium Grid**
- **Type**: Distributed test execution system
- **Purpose**: Run tests on multiple machines and browsers in parallel
- **Pros**:
  - Parallel execution
  - Cross-browser testing
  - Faster test execution
- **Use Case**: Running test suites across different browser/OS combinations

**Focus of This Course**: Selenium WebDriver with Java

---

### 3. Selenium WebDriver Architecture

Understanding architecture helps you troubleshoot issues and write better code.

#### **Architecture Diagram**:
```
┌─────────────────────────────────────────────────────────────┐
│                    Test Script (Java)                        │
│  WebDriver driver = new ChromeDriver();                      │
│  driver.get("https://example.com");                          │
└────────────────┬─────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│           Selenium WebDriver (Java Bindings)                 │
│  - WebDriver interface                                       │
│  - ChromeDriver, FirefoxDriver, EdgeDriver classes          │
└────────────────┬─────────────────────────────────────────────┘
                 │
                 ▼ JSON Wire Protocol / W3C WebDriver Protocol
┌─────────────────────────────────────────────────────────────┐
│                   Browser Driver                             │
│  - chromedriver.exe (for Chrome)                            │
│  - geckodriver.exe (for Firefox)                            │
│  - msedgedriver.exe (for Edge)                              │
└────────────────┬─────────────────────────────────────────────┘
                 │
                 ▼ Browser-specific protocol
┌─────────────────────────────────────────────────────────────┐
│                     Actual Browser                           │
│  - Chrome, Firefox, Edge, Safari                            │
└─────────────────────────────────────────────────────────────┘
```

#### **How It Works**:
1. **Your Test Script** writes commands using Selenium WebDriver API
2. **Selenium WebDriver** converts commands to HTTP requests (JSON format)
3. **Browser Driver** receives commands and communicates with the browser
4. **Browser** executes the commands and sends responses back
5. **Response** travels back through the chain to your test script

#### **Key Concepts**:
- **WebDriver Interface**: Contract that defines automation commands
- **Driver Implementations**: ChromeDriver, FirefoxDriver, EdgeDriver
- **Browser Driver**: Executable that controls the specific browser
- **W3C Protocol**: Standard communication protocol (Selenium 4+)

---

### 4. Browser Drivers

Each browser needs a specific driver executable.

#### **What is a Browser Driver?**
A browser driver is a separate executable that Selenium WebDriver uses to control the browser. Think of it as a translator between Selenium and the browser.

#### **Common Browser Drivers**:

| Browser | Driver Name | Executable | Download |
|---------|-------------|------------|----------|
| Chrome | ChromeDriver | chromedriver.exe | https://chromedriver.chromium.org/ |
| Firefox | GeckoDriver | geckodriver.exe | https://github.com/mozilla/geckodriver |
| Edge | EdgeDriver | msedgedriver.exe | https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/ |
| Safari | SafariDriver | Built-in | Pre-installed on Mac |

#### **Manual Driver Management (Old Way - Don't Use)**:
```java
// Set system property pointing to driver executable
System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver.exe");
WebDriver driver = new ChromeDriver();
```

**Problems with Manual Management**:
- Need to download driver manually
- Driver version must match browser version
- Different paths on different machines
- Tedious to maintain

#### **Automatic Driver Management (Modern Way - Use This)**:
We'll use **WebDriverManager** library that automatically:
- Downloads the correct driver version
- Matches driver version with browser version
- Sets up system properties
- Works across all machines

---

### 5. Setting Up Maven Project

Maven is a build automation and dependency management tool for Java projects.

#### **Why Maven for Selenium?**
- **Dependency Management**: Automatically downloads Selenium JARs
- **Version Control**: Easy to specify and update versions
- **Build Lifecycle**: Compile, test, package commands
- **Portability**: Works same way on any machine
- **Team Collaboration**: Everyone uses same dependencies

#### **pom.xml Structure**:
The `pom.xml` (Project Object Model) file is Maven's configuration file.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <!-- Project Coordinates -->
    <groupId>com.automation</groupId>
    <artifactId>selenium-framework</artifactId>
    <version>1.0-SNAPSHOT</version>

    <!-- Java Version -->
    <properties>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <!-- Dependencies -->
    <dependencies>
        <!-- Selenium Java -->
        <dependency>
            <groupId>org.seleniumhq.selenium</groupId>
            <artifactId>selenium-java</artifactId>
            <version>4.16.1</version>
        </dependency>

        <!-- WebDriverManager -->
        <dependency>
            <groupId>io.github.bonigarcia</groupId>
            <artifactId>webdrivermanager</artifactId>
            <version>5.6.3</version>
        </dependency>
    </dependencies>
</project>
```

#### **Understanding Dependencies**:

**selenium-java**: Main Selenium library
- Contains WebDriver interface
- Contains all driver implementations (ChromeDriver, FirefoxDriver, etc.)
- Contains By class for locators
- Contains supporting classes

**webdrivermanager**: Automatic driver management
- Automatically downloads browser drivers
- Matches driver version with browser version
- Manages driver lifecycle

---

### 6. WebDriver Interface

WebDriver is an **interface** in Java, not a class.

#### **Why Interface?**
- Provides common contract for all browser drivers
- Allows polymorphism (one variable, multiple driver types)
- Enables easy browser switching

#### **WebDriver Hierarchy**:
```
Interface: WebDriver
    │
    ├── Class: ChromeDriver (implements WebDriver)
    ├── Class: FirefoxDriver (implements WebDriver)
    ├── Class: EdgeDriver (implements WebDriver)
    └── Class: SafariDriver (implements WebDriver)
```

#### **Common WebDriver Methods** (We'll explore these on Day 17):
```java
// Navigation
void get(String url)
String getTitle()
String getCurrentUrl()
String getPageSource()

// Element Location
WebElement findElement(By locator)
List<WebElement> findElements(By locator)

// Browser Control
void close()
void quit()

// Window Management
void manage().window().maximize()
void manage().window().fullscreen()

// Navigation
void navigate().to(String url)
void navigate().back()
void navigate().forward()
void navigate().refresh()

// And many more...
```

---

### 7. Project Structure Best Practices

A well-organized project makes development and maintenance easier.

#### **Standard Selenium Project Structure**:
```
selenium-automation-framework/
├── src/
│   ├── main/
│   │   └── java/
│   │       ├── pages/          # Page Object classes
│   │       ├── utils/          # Utility classes
│   │       └── config/         # Configuration classes
│   └── test/
│       ├── java/
│       │   ├── tests/          # Test classes
│       │   └── base/           # Base test setup
│       └── resources/
│           ├── testdata/       # Test data files
│           └── config.properties  # Configuration file
├── test-output/                # Test reports
├── screenshots/                # Screenshot storage
├── logs/                       # Log files
├── pom.xml                     # Maven configuration
└── README.md                   # Project documentation
```

#### **Package Naming Conventions**:
- `com.automation.tests` - Test classes
- `com.automation.pages` - Page Object classes
- `com.automation.utils` - Utility classes
- `com.automation.base` - Base/common classes

---

## 💻 Practical Exercises

### Exercise 1: Create Maven Project in IntelliJ IDEA

**📝 Problem Statement:**
Create a new Maven project in IntelliJ IDEA for Selenium automation.

**Requirements:**
- Use IntelliJ IDEA
- Create Maven project
- GroupId: com.automation
- ArtifactId: selenium-tests
- Java version: 11 or higher

**Steps:**
1. Open IntelliJ IDEA
2. File → New → Project
3. Select "Maven"
4. Enter GroupId: com.automation
5. Enter ArtifactId: selenium-tests
6. Click Finish

**💡 Verification:**
- Project structure created
- pom.xml file exists
- src/main/java and src/test/java folders present

---

### Exercise 2: Configure pom.xml with Selenium Dependency

**📝 Problem Statement:**
Add Selenium Java dependency to your pom.xml file.

**Requirements:**
- Add selenium-java dependency (version 4.16.1 or latest)
- Set Java compiler version to 11
- Set UTF-8 encoding

**Solution:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.automation</groupId>
    <artifactId>selenium-tests</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.seleniumhq.selenium</groupId>
            <artifactId>selenium-java</artifactId>
            <version>4.16.1</version>
        </dependency>
    </dependencies>
</project>
```

**💡 After Saving:**
- IntelliJ will show popup "Maven projects need to be imported"
- Click "Enable Auto-Import" or "Import Changes"
- Maven will download Selenium JARs (check bottom right progress)

---

### Exercise 3: Add WebDriverManager Dependency

**📝 Problem Statement:**
Add WebDriverManager dependency to eliminate manual driver management.

**Requirements:**
- Add webdrivermanager dependency (version 5.6.3 or latest)
- Keep it in the same dependencies section

**Solution:**
Add this to your `<dependencies>` section in pom.xml:
```xml
<dependency>
    <groupId>io.github.bonigarcia</groupId>
    <artifactId>webdrivermanager</artifactId>
    <version>5.6.3</version>
</dependency>
```

**Complete dependencies section:**
```xml
<dependencies>
    <!-- Selenium Java -->
    <dependency>
        <groupId>org.seleniumhq.selenium</groupId>
        <artifactId>selenium-java</artifactId>
        <version>4.16.1</version>
    </dependency>

    <!-- WebDriverManager -->
    <dependency>
        <groupId>io.github.bonigarcia</groupId>
        <artifactId>webdrivermanager</artifactId>
        <version>5.6.3</version>
    </dependency>
</dependencies>
```

---

### Exercise 4: Verify Selenium Setup

**📝 Problem Statement:**
Create a simple Java class to verify that Selenium is properly configured.

**Requirements:**
- Create class in src/test/java package
- Import Selenium WebDriver classes
- Verify no compilation errors

**Solution:**
```java
package com.automation.tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import io.github.bonigarcia.wdm.WebDriverManager;

public class SetupVerification {
    public static void main(String[] args) {
        System.out.println("Selenium setup verification started...");

        // This will download ChromeDriver if needed
        WebDriverManager.chromedriver().setup();

        System.out.println("Selenium WebDriver is properly configured!");
        System.out.println("You are ready to start automation!");
    }
}
```

**💡 What This Does:**
- Imports Selenium and WebDriverManager classes
- Calls WebDriverManager to setup ChromeDriver
- If no errors, your setup is correct!

**Expected Output:**
```
Selenium setup verification started...
Selenium WebDriver is properly configured!
You are ready to start automation!
```

---

### Exercise 5: Understanding WebDriver Interface

**📝 Problem Statement:**
Explore the WebDriver interface and understand its methods.

**Requirements:**
- Navigate to WebDriver interface source code
- List 10 important methods
- Understand method signatures

**Solution:**
```java
package com.automation.tests;

import org.openqa.selenium.WebDriver;

public class WebDriverInterfaceExploration {
    public static void main(String[] args) {
        /*
         * WebDriver is an interface with important methods:
         *
         * 1. void get(String url) - Navigate to URL
         * 2. String getTitle() - Get page title
         * 3. String getCurrentUrl() - Get current URL
         * 4. String getPageSource() - Get page HTML
         * 5. void close() - Close current window
         * 6. void quit() - Close all windows and end session
         * 7. WebElement findElement(By by) - Find single element
         * 8. List<WebElement> findElements(By by) - Find multiple elements
         * 9. Navigation navigate() - Get navigation object
         * 10. Options manage() - Get options object
         */

        System.out.println("WebDriver Interface Exploration");
        System.out.println("================================");
        System.out.println("WebDriver is implemented by:");
        System.out.println("- ChromeDriver");
        System.out.println("- FirefoxDriver");
        System.out.println("- EdgeDriver");
        System.out.println("- SafariDriver");
    }
}
```

**💡 In IntelliJ:**
- Ctrl+Click (or Cmd+Click on Mac) on "WebDriver" to see source
- Explore available methods
- Read JavaDoc comments

---

### Exercise 6: Maven Dependency Tree

**📝 Problem Statement:**
Understand what JARs are included when you add selenium-java dependency.

**Requirements:**
- View Maven dependency tree
- Identify transitive dependencies

**Steps:**
1. Open Terminal in IntelliJ (View → Tool Windows → Terminal)
2. Run command:
```bash
mvn dependency:tree
```

**Expected Output:**
```
[INFO] com.automation:selenium-tests:jar:1.0-SNAPSHOT
[INFO] +- org.seleniumhq.selenium:selenium-java:jar:4.16.1:compile
[INFO] |  +- org.seleniumhq.selenium:selenium-api:jar:4.16.1:compile
[INFO] |  +- org.seleniumhq.selenium:selenium-chrome-driver:jar:4.16.1:compile
[INFO] |  +- org.seleniumhq.selenium:selenium-firefox-driver:jar:4.16.1:compile
[INFO] |  +- org.seleniumhq.selenium:selenium-edge-driver:jar:4.16.1:compile
[INFO] |  ... (many more)
```

**💡 Understanding:**
- selenium-java includes drivers for all browsers
- Transitive dependencies are automatically downloaded
- No need to add individual driver dependencies

---

### Exercise 7: Create Project Package Structure

**📝 Problem Statement:**
Set up a proper package structure for your automation framework.

**Requirements:**
- Create packages for tests, pages, utils, base
- Follow naming conventions
- Organize code logically

**Steps:**
1. Right-click on src/test/java
2. New → Package
3. Create these packages:
   - com.automation.tests
   - com.automation.pages
   - com.automation.utils
   - com.automation.base

**Verification:**
```
src/
├── test/
│   └── java/
│       └── com/
│           └── automation/
│               ├── base/
│               ├── pages/
│               ├── tests/
│               └── utils/
```

---

### Exercise 8: Create Base Package Classes

**📝 Problem Statement:**
Create placeholder classes in each package to establish structure.

**Requirements:**
- Create BaseTest class in base package
- Create placeholder files in each package

**Solution:**
```java
// File: src/test/java/com/automation/base/BaseTest.java
package com.automation.base;

public class BaseTest {
    // This will contain common setup and teardown methods
    // We'll implement this in coming days
}
```

```java
// File: src/test/java/com/automation/utils/DriverManager.java
package com.automation.utils;

public class DriverManager {
    // This will manage WebDriver instances
    // We'll implement this in coming weeks
}
```

```java
// File: src/test/java/com/automation/tests/SampleTest.java
package com.automation.tests;

public class SampleTest {
    // Test classes will go here
}
```

```java
// File: src/test/java/com/automation/pages/LoginPage.java
package com.automation.pages;

public class LoginPage {
    // Page object classes will go here
}
```

---

### Exercise 9: Check Selenium Version

**📝 Problem Statement:**
Write code to print the Selenium version you're using.

**Requirements:**
- Use Selenium's BuildInfo class
- Print version to console

**Solution:**
```java
package com.automation.tests;

import org.openqa.selenium.BuildInfo;

public class SeleniumVersionCheck {
    public static void main(String[] args) {
        BuildInfo buildInfo = new BuildInfo();

        System.out.println("=================================");
        System.out.println("Selenium Version Information");
        System.out.println("=================================");
        System.out.println("Release Label: " + buildInfo.getReleaseLabel());
        System.out.println("Build Revision: " + buildInfo.getBuildRevision());
        System.out.println("Build Time: " + buildInfo.getBuildTime());
        System.out.println("=================================");
    }
}
```

**Expected Output:**
```
=================================
Selenium Version Information
=================================
Release Label: 4.16.1
Build Revision: 9b1c55150d
Build Time: 2024-01-04T18:30:00
=================================
```

---

### Exercise 10: Research and Compare Browser Drivers

**📝 Problem Statement:**
Create a document comparing different browser drivers.

**Requirements:**
- Research ChromeDriver, GeckoDriver, EdgeDriver
- Compare features, speed, compatibility
- Document findings

**Solution:**
Create a file: `browser-drivers-comparison.md`

```markdown
# Browser Drivers Comparison

## ChromeDriver
- **Browser**: Google Chrome
- **Executable**: chromedriver.exe
- **Pros**: Fast, stable, most commonly used
- **Cons**: Requires matching Chrome version
- **Use Case**: Primary choice for most projects

## GeckoDriver
- **Browser**: Mozilla Firefox
- **Executable**: geckodriver.exe
- **Pros**: Open source browser, good for testing
- **Cons**: Slightly slower than Chrome
- **Use Case**: Cross-browser testing

## EdgeDriver
- **Browser**: Microsoft Edge
- **Executable**: msedgedriver.exe
- **Pros**: Good for Windows environments, Chromium-based
- **Cons**: Less popular than Chrome
- **Use Case**: Testing on Edge browser, Windows users

## Recommendation
- Start with ChromeDriver (most widely supported)
- Add Firefox for cross-browser testing
- Edge for Windows-specific scenarios
```

---

## 🔑 Key Takeaways

1. **Selenium WebDriver**:
   - Open-source browser automation tool
   - Supports multiple browsers and languages
   - Industry standard for web automation

2. **Architecture**:
   - Your Code → Selenium WebDriver → Browser Driver → Browser
   - W3C WebDriver protocol for communication
   - Each browser needs its own driver

3. **Maven Setup**:
   - pom.xml manages dependencies
   - selenium-java: Main Selenium library
   - webdrivermanager: Automatic driver management

4. **WebDriver Interface**:
   - Contract for all browser drivers
   - Implemented by ChromeDriver, FirefoxDriver, EdgeDriver
   - Enables polymorphism for easy browser switching

5. **Project Structure**:
   - Organize code into packages (tests, pages, utils, base)
   - Follow standard naming conventions
   - Prepare for framework development

6. **Best Practices**:
   - Always use WebDriverManager (no manual driver downloads)
   - Use latest Selenium version
   - Organize code from day one
   - Use Maven for dependency management

---

## 📖 Additional Resources

### Official Documentation:
- [Selenium Official Website](https://www.selenium.dev/)
- [Selenium WebDriver Documentation](https://www.selenium.dev/documentation/webdriver/)
- [Selenium Java API](https://www.selenium.dev/selenium/docs/api/java/index.html)
- [Maven Official Guide](https://maven.apache.org/guides/index.html)

### WebDriverManager:
- [WebDriverManager GitHub](https://github.com/bonigarcia/webdrivermanager)
- [WebDriverManager Documentation](https://bonigarcia.dev/webdrivermanager/)

### Browser Drivers:
- [ChromeDriver](https://chromedriver.chromium.org/)
- [GeckoDriver for Firefox](https://github.com/mozilla/geckodriver)
- [EdgeDriver](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/)

### Video Tutorials:
- Search "Selenium WebDriver Setup with Maven" on YouTube
- Look for "WebDriverManager Tutorial"
- "Selenium 4 New Features" videos

### Maven Central Repository:
- [Selenium Java on Maven Central](https://mvnrepository.com/artifact/org.seleniumhq.selenium/selenium-java)
- [WebDriverManager on Maven Central](https://mvnrepository.com/artifact/io.github.bonigarcia/webdrivermanager)

---

## 🧭 Navigation

### Week 3 Progress:
- [Week 3 Overview](README.md)
- **Day 16: Selenium Introduction & Setup** ← You are here
- [Day 17: First Selenium Script](day17_first_selenium_script.md)
- [Day 18: Locators - Part 1](day18_locators_part1.md)
- [Day 19: Locators - Part 2 (XPath)](day19_locators_part2_xpath.md)
- [Day 20: Locators - Part 3 (CSS Selector)](day20_locators_part3_css.md)
- [Day 21: WebElement Interactions](day21_webelement_interactions.md)

### Related Resources:
- [Day 16 Assessment](../../../src/data/assessments/selenium/week3/day16.js)
- [Week 3 Exercises](../../../03_BEGINNER_FRIENDLY_Exercises/Selenium/Week3_Days15-21_Selenium_Basics.md)
- [Selenium Course Overview](../README.md)

---

## ✅ Day 16 Checklist

Before moving to Day 17, ensure you can:
- [ ] Explain what Selenium WebDriver is
- [ ] Describe Selenium architecture
- [ ] Understand the role of browser drivers
- [ ] Create a Maven project
- [ ] Add Selenium dependencies to pom.xml
- [ ] Add WebDriverManager dependency
- [ ] Set up proper project package structure
- [ ] Import Selenium classes without errors
- [ ] Understand WebDriver interface
- [ ] Know where to find Selenium documentation

---

**🎉 Congratulations on completing Day 16!**

You've laid the foundation for Selenium automation. Your project is set up and ready. Tomorrow, you'll write your first browser automation script and see Selenium in action!

**Next**: [Day 17: First Selenium Script →](day17_first_selenium_script.md)

---

*Last Updated: 2026-01-12*
