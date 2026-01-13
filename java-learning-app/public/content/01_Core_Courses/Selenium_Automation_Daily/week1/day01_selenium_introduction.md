# Day 1: Introduction to Selenium WebDriver

**Week 1: Getting Started with Selenium**

---

## 📋 Table of Contents
- [Learning Objectives](#learning-objectives)
- [What is Selenium?](#what-is-selenium)
- [Selenium Components](#selenium-components)
- [Why Selenium?](#why-selenium)
- [Setting Up Your Environment](#setting-up-your-environment)
- [Your First Selenium Script](#your-first-selenium-script)
- [Key Takeaways](#key-takeaways)
- [Practice Exercises](#practice-exercises)

---

## 🎯 Learning Objectives

By the end of this lesson, you will be able to:
- ✅ Understand what Selenium is and its purpose
- ✅ Identify the different components of Selenium
- ✅ Set up Selenium WebDriver in your project
- ✅ Write and run your first Selenium automation script
- ✅ Understand the basic WebDriver commands

---

## 🤔 What is Selenium?

**Selenium** is an open-source automation testing framework used to automate web browsers. It allows you to write scripts in various programming languages (Java, Python, C#, etc.) to control web browsers and perform automated testing.

### Real-World Analogy
Think of Selenium as a **robot that can use a web browser just like a human**:
- It can click buttons
- Fill out forms
- Navigate between pages
- Verify content on pages
- Take screenshots
- And much more!

### Key Features
- 🌐 **Cross-browser support**: Chrome, Firefox, Safari, Edge
- 💻 **Multi-language support**: Java, Python, C#, Ruby, JavaScript
- 🆓 **Open-source**: Free to use
- 🔧 **Flexible**: Can be integrated with various testing frameworks
- 📱 **Mobile testing**: Supports mobile browser automation

---

## 🧩 Selenium Components

Selenium is not just one tool, but a suite of tools:

### 1. Selenium WebDriver ⭐ (What we'll use)
- **Purpose**: Automates web browsers programmatically
- **How it works**: Directly communicates with the browser
- **Best for**: Functional testing, regression testing, cross-browser testing

### 2. Selenium IDE
- **Purpose**: Record and playback tool
- **How it works**: Browser extension (Chrome/Firefox)
- **Best for**: Quick prototyping, learning

### 3. Selenium Grid
- **Purpose**: Run tests in parallel across multiple machines
- **How it works**: Distributes tests across different browsers/OS
- **Best for**: Large-scale testing, CI/CD pipelines

---

## 💡 Why Selenium?

### Advantages ✅

| Feature | Benefit |
|---------|---------|
| **Open Source** | Free to use, large community support |
| **Language Support** | Write tests in your preferred language |
| **Browser Support** | Works with all major browsers |
| **Integration** | Easily integrates with TestNG, JUnit, Maven, Jenkins |
| **Reusability** | Write once, run on multiple browsers |
| **Parallel Execution** | Run multiple tests simultaneously |

### When to Use Selenium

✅ **Good for:**
- Web application testing
- Regression testing
- Cross-browser testing
- Functional testing
- Automating repetitive tasks

❌ **Not suitable for:**
- Desktop application testing
- Mobile app testing (use Appium instead)
- Image/CAPTCHA verification
- Performance testing (use JMeter instead)

---

## 🛠️ Setting Up Your Environment

### Prerequisites

Before starting with Selenium, ensure you have:

1. **Java JDK** (version 8 or higher)
   ```bash
   java -version
   ```

2. **IDE** (IntelliJ IDEA, Eclipse, or VS Code)

3. **Maven** (for dependency management)
   ```bash
   mvn -version
   ```

4. **Web Browser** (Chrome, Firefox, or Edge)

### Maven Dependencies

Add these dependencies to your `pom.xml`:

```xml
<dependencies>
    <!-- Selenium Java -->
    <dependency>
        <groupId>org.seleniumhq.selenium</groupId>
        <artifactId>selenium-java</artifactId>
        <version>4.15.0</version>
    </dependency>
    
    <!-- WebDriverManager (automatically manages browser drivers) -->
    <dependency>
        <groupId>io.github.bonigarcia</groupId>
        <artifactId>webdrivermanager</artifactId>
        <version>5.6.2</version>
    </dependency>
</dependencies>
```

### Why WebDriverManager?

**Without WebDriverManager:**
```java
// You need to manually download chromedriver.exe
System.setProperty("webdriver.chrome.driver", "path/to/chromedriver.exe");
WebDriver driver = new ChromeDriver();
```

**With WebDriverManager:**
```java
// Automatically downloads and sets up the driver
WebDriverManager.chromedriver().setup();
WebDriver driver = new ChromeDriver();
```

---

## 🚀 Your First Selenium Script

Let's write a simple script that opens Google and prints the page title.

### Step 1: Create a Java Class

```java
package com.automation.tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import io.github.bonigarcia.wdm.WebDriverManager;

public class FirstSeleniumTest {
    
    public static void main(String[] args) {
        
        // Step 1: Setup ChromeDriver
        System.out.println("Setting up ChromeDriver...");
        WebDriverManager.chromedriver().setup();
        
        // Step 2: Create WebDriver instance (opens browser)
        System.out.println("Opening Chrome browser...");
        WebDriver driver = new ChromeDriver();
        
        try {
            // Step 3: Navigate to Google
            System.out.println("Navigating to Google...");
            driver.get("https://www.google.com");
            
            // Step 4: Get and print page title
            String pageTitle = driver.getTitle();
            System.out.println("Page Title: " + pageTitle);
            
            // Step 5: Verify title
            if (pageTitle.equals("Google")) {
                System.out.println("✅ Test PASSED: Title is correct!");
            } else {
                System.out.println("❌ Test FAILED: Title is incorrect!");
            }
            
            // Wait for 3 seconds to see the browser
            Thread.sleep(3000);
            
        } catch (Exception e) {
            System.out.println("Error occurred: " + e.getMessage());
            e.printStackTrace();
            
        } finally {
            // Step 6: Close browser
            System.out.println("Closing browser...");
            driver.quit();
            System.out.println("Test completed!");
        }
    }
}
```

### Expected Output

```
Setting up ChromeDriver...
Opening Chrome browser...
Navigating to Google...
Page Title: Google
✅ Test PASSED: Title is correct!
Closing browser...
Test completed!
```

### What Happens When You Run This?

1. **Chrome browser opens** (you'll see it on your screen)
2. **Google homepage loads**
3. **Title is printed** in console
4. **Browser waits** for 3 seconds
5. **Browser closes** automatically

---

## 🔑 Understanding the Code

### WebDriver Interface

```java
WebDriver driver = new ChromeDriver();
```

- `WebDriver` is an **interface** (contract)
- `ChromeDriver` is the **implementation** for Chrome
- You can easily switch browsers:
  ```java
  WebDriver driver = new FirefoxDriver();  // Firefox
  WebDriver driver = new EdgeDriver();     // Edge
  ```

### Essential WebDriver Methods

| Method | Purpose | Example |
|--------|---------|---------|
| `get(url)` | Navigate to URL | `driver.get("https://google.com")` |
| `getTitle()` | Get page title | `String title = driver.getTitle()` |
| `getCurrentUrl()` | Get current URL | `String url = driver.getCurrentUrl()` |
| `getPageSource()` | Get HTML source | `String html = driver.getPageSource()` |
| `close()` | Close current window | `driver.close()` |
| `quit()` | Close all windows & end session | `driver.quit()` |

### close() vs quit()

```java
// close() - Closes only the current browser window
driver.close();

// quit() - Closes ALL browser windows and ends the WebDriver session
driver.quit();  // ✅ Always use this in finally block
```

---

## 🎯 Key Takeaways

### What You Learned Today

1. ✅ **Selenium is a browser automation tool** for testing web applications
2. ✅ **WebDriver is the main component** we use for automation
3. ✅ **WebDriverManager simplifies** driver setup
4. ✅ **Basic WebDriver commands** like get(), getTitle(), quit()
5. ✅ **Always close the browser** using quit() in finally block

### Best Practices

```java
// ✅ GOOD: Always use try-finally
WebDriver driver = new ChromeDriver();
try {
    driver.get("https://example.com");
    // Your test code
} finally {
    driver.quit();  // Always executes
}

// ❌ BAD: No cleanup
WebDriver driver = new ChromeDriver();
driver.get("https://example.com");
// If error occurs, browser stays open!
```

---

## 💻 Practice Exercises

### Exercise 1: Basic Navigation
Write a script that:
1. Opens Chrome browser
2. Navigates to `https://www.wikipedia.org`
3. Prints the page title
4. Prints the current URL
5. Closes the browser

### Exercise 2: Multiple Pages
Write a script that:
1. Opens `https://www.google.com`
2. Prints the title
3. Navigates to `https://www.github.com`
4. Prints the title
5. Closes the browser

### Exercise 3: Title Verification
Write a script that:
1. Opens `https://www.amazon.com`
2. Verifies if title contains "Amazon"
3. Prints "PASS" or "FAIL"
4. Closes the browser

### Exercise 4: Error Handling
Modify the first script to:
1. Handle exceptions properly
2. Print meaningful error messages
3. Ensure browser closes even if error occurs

---

## 🧭 Navigation

- **Previous**: [Course Introduction](../README.md)
- **Next**: [Day 2: Locators - Finding Elements](day02_locators_basics.md)
- **Week Overview**: [Week 1 Overview](README.md)

---

## ✅ Day 1 Checklist

Before moving to Day 2, ensure you can:

- [ ] Explain what Selenium is and its purpose
- [ ] List the components of Selenium suite
- [ ] Set up Selenium WebDriver in a Maven project
- [ ] Write a basic script to open a browser
- [ ] Use get(), getTitle(), and quit() methods
- [ ] Understand the difference between close() and quit()
- [ ] Handle exceptions in Selenium scripts
- [ ] Complete all practice exercises

---

## 📚 Additional Resources

- [Selenium Official Documentation](https://www.selenium.dev/documentation/)
- [WebDriverManager GitHub](https://github.com/bonigarcia/webdrivermanager)
- [Selenium Java API](https://www.selenium.dev/selenium/docs/api/java/)

---

*Last Updated: 2026-01-12*  
*Difficulty: Beginner*  
*Estimated Time: 2-3 hours*