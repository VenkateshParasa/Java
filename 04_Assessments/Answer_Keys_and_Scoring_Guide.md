# Answer Keys & Scoring Guide

## How to Use This Answer Key

1. **Attempt questions first** before checking answers
2. **Be honest** with self-assessment
3. **Understand the concept** behind each answer, not just memorize
4. **Review explanations** for questions you got wrong
5. **Re-attempt** questions after reviewing the topic

---

# JAVA CORE FUNDAMENTALS - ANSWER KEYS

## Day 1: Introduction & Setup - Answer Key

### MCQ Answers:
**Q1:** C) Java Virtual Machine
**Q2:** B) JRE only (to run Java programs)
**Q3:** B) .java
**Q4:** B) javac
**Q5:** C) main() method
**Q6:** B) public static void main(String[] args)

### Short Answer Answers:
**Q7:**
- **JVM**: Virtual machine that executes Java bytecode. Platform-specific.
- **JRE**: Runtime environment containing JVM + libraries needed to run Java applications.
- **JDK**: Development kit containing JRE + development tools (compiler, debugger) needed to develop Java applications.

**Q8:** Java is platform-independent because:
- Java code is compiled to bytecode (not machine code)
- Bytecode runs on JVM (available for all platforms)
- Same .class file runs on Windows, Mac, Linux without changes
- "Write Once, Run Anywhere" (WORA)

**Q9:** When you compile:
- `.java` source file is compiled using `javac`
- Generates `.class` file containing bytecode
- This bytecode is executed by JVM

### Coding Problem Answers:
**Q10:**
```java
public class HelloJava {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}
```

**Q11:**
```java
public class MyInfo {
    public static void main(String[] args) {
        System.out.println("Venkatesh");
        System.out.println("Java");
    }
}
```

**Score: ___/35**

---

## Day 2: Variables & Data Types - Answer Key

### MCQ Answers:
**Q1:** C) String (it's a reference type, not primitive)
**Q2:** B) 4 bytes
**Q3:** C) final
**Q4:** B) false
**Q5:** B) variable_2
**Q6:** B) Compilation error (cannot assign double to int without casting)
**Q7:** B) f or F

### Short Answer Answers:
**Q8:**
- **Primitive types**: Store actual values, fixed size, stored in stack. Examples: int, double, boolean
- **Reference types**: Store references/addresses to objects, variable size, stored in heap. Examples: String, Arrays, Objects

**Q9:** Type casting is converting one data type to another.
- **Implicit (Widening)**: Automatic, smaller to larger. Example: `int x = 5; double y = x;`
- **Explicit (Narrowing)**: Manual, larger to smaller. Example: `double x = 5.5; int y = (int)x;`

**Q10:** Benefits of final:
- Cannot be changed after initialization (immutability)
- Clear intent that value is constant
- Compiler optimization
- Better code readability

### Coding Problem Answers:
**Q11:**
```java
public class AllTypes {
    public static void main(String[] args) {
        byte b = 127;
        short s = 32000;
        int i = 100000;
        long l = 10000000L;
        float f = 3.14f;
        double d = 3.14159;
        char c = 'A';
        boolean bool = true;

        System.out.println("byte: " + b);
        System.out.println("short: " + s);
        System.out.println("int: " + i);
        System.out.println("long: " + l);
        System.out.println("float: " + f);
        System.out.println("double: " + d);
        System.out.println("char: " + c);
        System.out.println("boolean: " + bool);
    }
}
```

**Q12:**
```java
public class CircleArea {
    public static void main(String[] args) {
        final double PI = 3.14159;
        int radius = 5;
        double area = PI * radius * radius;
        System.out.println("Area of circle: " + area);
    }
}
```

**Q13:**
```java
public class TypeCasting {
    public static void main(String[] args) {
        double d = 9.99;
        int i = (int) d;  // Explicit casting
        System.out.println("Double: " + d);
        System.out.println("Int: " + i);  // Shows data loss: 9
        System.out.println("Data lost: " + (d - i));
    }
}
```

**Score: ___/44**

---

## Day 3: Operators & Expressions - Answer Key

### MCQ Answers:
**Q1:** C) 1
**Q2:** C) 6
**Q3:** B) ++x increments before use, x++ increments after use
**Q4:** B) false
**Q5:** C) 3
**Q6:** C) ()
**Q7:** B) 15

### Short Answer Answers:
**Q8:** Short-circuit evaluation means:
- In AND (&&): If first condition is false, second is not evaluated
- In OR (||): If first condition is true, second is not evaluated
- Example: `if (x != 0 && 10/x > 2)` - prevents division by zero

**Q9:**
- **Division (/)**: Returns quotient. `10 / 3 = 3`
- **Modulus (%)**: Returns remainder. `10 % 3 = 1`

### Coding Problem Answers:
**Q10:**
```java
public class Calculator {
    public static void main(String[] args) {
        int a = 10, b = 3;
        System.out.println("Addition: " + (a + b));
        System.out.println("Subtraction: " + (a - b));
        System.out.println("Multiplication: " + (a * b));
        System.out.println("Division: " + (a / b));
        System.out.println("Modulus: " + (a % b));
    }
}
```

**Q11:**
```java
public class EvenOdd {
    public static void main(String[] args) {
        int number = 10;
        if (number % 2 == 0) {
            System.out.println(number + " is Even");
        } else {
            System.out.println(number + " is Odd");
        }
    }
}
```

**Q12:**
```java
public class SwapNumbers {
    public static void main(String[] args) {
        int a = 5, b = 10;
        System.out.println("Before: a=" + a + ", b=" + b);

        a = a + b;  // a = 15
        b = a - b;  // b = 5
        a = a - b;  // a = 10

        System.out.println("After: a=" + a + ", b=" + b);
    }
}
```

**Score: ___/38**

---

# SELENIUM AUTOMATION - SAMPLE ANSWER KEYS

## Day 16: Selenium Introduction & Setup - Answer Key

### MCQ Answers:
**Q1:** B) A browser automation library
**Q2:** D) Selenium Runner (doesn't exist)
**Q3:** B) Automatic browser driver management
**Q4:** B) To provide flexibility and polymorphism

### Short Answer Answers:
**Q5:** Selenium WebDriver Architecture:
1. **Client Libraries** (Java bindings): API to write tests
2. **JSON Wire Protocol/W3C WebDriver**: Communication protocol
3. **Browser Drivers**: ChromeDriver, GeckoDriver, etc.
4. **Browsers**: Chrome, Firefox, Edge, etc.

**Q6:** Browser drivers are needed because:
- WebDriver communicates with browsers through drivers
- Each browser has its own driver (native to browser)
- Drivers translate WebDriver commands to browser-specific commands
- Acts as a bridge between WebDriver and browser

**Q7:** Advantages of WebDriver over RC:
- Direct browser communication (no server needed)
- Faster execution
- More realistic user interactions
- Supports mobile testing
- Better API design
- Active development and support

### Coding Problem Answers:
**Q8:**
```xml
<dependencies>
    <dependency>
        <groupId>org.seleniumhq.selenium</groupId>
        <artifactId>selenium-java</artifactId>
        <version>4.15.0</version>
    </dependency>
    <dependency>
        <groupId>io.github.bonigarcia</groupId>
        <artifactId>webdrivermanager</artifactId>
        <version>5.6.0</version>
    </dependency>
</dependencies>
```

**Q9:**
```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import io.github.bonigarcia.wdm.WebDriverManager;
```

**Score: ___/37**

---

## Day 17: First Selenium Script - Answer Key

### MCQ Answers:
**Q1:** C) get(url)
**Q2:** B) close() closes current window, quit() closes all windows
**Q3:** A) getTitle()
**Q4:** C) driver.manage().window().maximize()

### Short Answer Answers:
**Q5:**
- **driver.get(url)**: Waits for page to load completely (recommended)
- **driver.navigate().to(url)**: Doesn't wait, faster, but less reliable
- navigate() has additional methods: back(), forward(), refresh()

**Q6:** Use quit() when:
- Test is complete
- Multiple windows/tabs were opened
- Want to end WebDriver session completely
- Best practice for cleanup in @AfterMethod

### Coding Problem Answers:
**Q7:**
```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import io.github.bonigarcia.wdm.WebDriverManager;

public class FirstScript {
    public static void main(String[] args) {
        // Setup ChromeDriver
        WebDriverManager.chromedriver().setup();

        // Create driver instance
        WebDriver driver = new ChromeDriver();

        // Maximize window
        driver.manage().window().maximize();

        // Navigate to Google
        driver.get("https://www.google.com");

        // Print page title
        System.out.println("Page Title: " + driver.getTitle());

        // Close browser
        driver.quit();
    }
}
```

**Q8:**
```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import io.github.bonigarcia.wdm.WebDriverManager;

public class NavigationExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        driver.get("https://www.google.com");
        System.out.println("Opened Google");

        Thread.sleep(2000);
        driver.navigate().to("https://www.amazon.com");
        System.out.println("Navigated to Amazon");

        Thread.sleep(2000);
        driver.navigate().back();
        System.out.println("Back to Google");

        Thread.sleep(2000);
        driver.navigate().forward();
        System.out.println("Forward to Amazon");

        Thread.sleep(2000);
        driver.navigate().refresh();
        System.out.println("Page refreshed");

        driver.quit();
    }
}
```

**Score: ___/40**

---

## Day 35: Page Object Model - Sample Answer

### Coding Problem Answer (Q9):
```java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class LoginPage {

    WebDriver driver;

    // Locators using @FindBy
    @FindBy(id = "username")
    WebElement usernameField;

    @FindBy(id = "password")
    WebElement passwordField;

    @FindBy(id = "loginBtn")
    WebElement loginButton;

    // Constructor
    public LoginPage(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }

    // Action methods
    public void enterUsername(String username) {
        usernameField.clear();
        usernameField.sendKeys(username);
    }

    public void enterPassword(String password) {
        passwordField.clear();
        passwordField.sendKeys(password);
    }

    public void clickLogin() {
        loginButton.click();
    }

    // Combined login method
    public void login(String username, String password) {
        enterUsername(username);
        enterPassword(password);
        clickLogin();
    }
}
```

**Q10: Test Class**
```java
package tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import pages.LoginPage;
import io.github.bonigarcia.wdm.WebDriverManager;

public class LoginTest {

    WebDriver driver;
    LoginPage loginPage;

    @BeforeMethod
    public void setup() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://example.com/login");

        loginPage = new LoginPage(driver);
    }

    @Test
    public void testValidLogin() {
        loginPage.login("testuser@example.com", "password123");
        // Add assertions here
    }

    @AfterMethod
    public void teardown() {
        driver.quit();
    }
}
```

**Score: ___/49**

---

## Scoring Interpretation Guide

### Score Ranges and Actions:

#### 90-100% - Excellent!
- **Status**: Mastered the topic
- **Action**: Move to next day confidently
- **Note**: You're on track for success

#### 75-89% - Good!
- **Status**: Good understanding with minor gaps
- **Action**:
  - Review questions you got wrong
  - Quick revision of weak areas
  - Move to next day
- **Note**: Solid progress

#### 60-74% - Average
- **Status**: Basic understanding but needs reinforcement
- **Action**:
  - Re-read the day's material
  - Practice more coding examples
  - Review answers carefully
  - Attempt assessment again if time permits
- **Note**: Don't rush; strengthen foundation

#### Below 60% - Needs Work
- **Status**: Significant gaps in understanding
- **Action**:
  - **Stop**: Don't move to next day yet
  - Re-study the entire day's material
  - Watch additional tutorials if needed
  - Practice all coding examples
  - Attempt assessment again
  - Only move forward when scoring 70%+
- **Note**: Building strong foundation is critical

---

## Tips for Using Answer Keys Effectively

### 1. Self-Assessment Strategy:
- Mark your answers BEFORE checking answer key
- Give yourself honest scores
- Don't give partial credit too easily
- Be strict with coding problems (code must work!)

### 2. Learning from Mistakes:
- For each wrong answer, write down:
  - Why you got it wrong
  - What the correct concept is
  - An example to remember it
- Keep a "Common Mistakes" notebook

### 3. Code Review:
- Don't just check if answer matches
- Understand WHY the code is written that way
- Try variations of the code
- Make sure your code actually runs

### 4. Conceptual Understanding:
- For short answers, your wording doesn't need to match exactly
- But the core concept should be correct
- If you can explain it to someone else, you understand it

### 5. Retaking Assessments:
- It's okay to retake after studying
- Wait at least a day before retaking
- Don't memorize answers; understand concepts
- Different score on retake still shows learning

---

## Common Pitfall Areas (Watch Out!)

### Java Core:
- **Strings**: Using == instead of .equals()
- **Arrays**: Off-by-one errors (forgetting 0-based indexing)
- **OOP**: Confusing instance vs static members
- **Exceptions**: Not understanding checked vs unchecked
- **Collections**: Using wrong collection for the need

### Selenium:
- **Waits**: Using Thread.sleep() instead of proper waits
- **Locators**: Using absolute XPath instead of relative
- **Element Interactions**: Not waiting for element to be ready
- **POM**: Putting test logic in page classes
- **TestNG**: Wrong annotation hierarchy/execution order

---

## Progress Tracking Template

### Weekly Self-Assessment:

**Week 1 (Java Basics)**
- Average Score: ____%
- Strongest Topic: __________
- Weakest Topic: __________
- Action Items:
  1. _________________
  2. _________________

**Week 2 (OOP & Collections)**
- Average Score: ____%
- Strongest Topic: __________
- Weakest Topic: __________
- Action Items:
  1. _________________
  2. _________________

**Week 3-4 (Selenium Basics)**
- Average Score: ____%
- Strongest Topic: __________
- Weakest Topic: __________
- Action Items:
  1. _________________
  2. _________________

**Week 5-8 (Framework)**
- Average Score: ____%
- Strongest Topic: __________
- Weakest Topic: __________
- Action Items:
  1. _________________
  2. _________________

---

## Final Notes

### Remember:
- **Accuracy > Speed**: Better to understand deeply than finish quickly
- **Practice > Theory**: Doing is more important than reading
- **Consistency > Intensity**: Daily practice beats cramming
- **Quality > Quantity**: One well-understood concept > ten memorized facts

### When to Seek Help:
- Consistently scoring below 60%
- Can't understand answer explanations
- Code examples don't work
- Concepts are confusing even after review

### Resources for Help:
- Stack Overflow (search your specific questions)
- Selenium documentation
- Java documentation
- YouTube tutorials for visual learning
- Practice platforms: HackerRank, LeetCode

---

## Certification of Completion

Once you've completed all assessments with satisfactory scores, fill this out:

**I, ______________, have completed:**
- [ ] Java Core Fundamentals (30 days)
- [ ] Selenium Automation (45 days)

**My overall average score: ____%**

**I am ready to:**
- [ ] Build automation frameworks
- [ ] Apply for QA automation roles
- [ ] Start contributing to real projects

**Date: __________**

**Signature: __________**

---

**Congratulations on your learning journey! Use this answer key wisely to maximize your understanding, not just to check boxes. Real learning happens when you understand WHY, not just WHAT.**
