# Selenium Automation Exercises

Welcome to the Selenium Automation exercises section! This directory contains comprehensive, hands-on exercises covering 45 days of Selenium WebDriver automation, from Java fundamentals to building complete testing frameworks.

## Organization Structure

Exercises are organized by **week** for easier navigation and progress tracking. Each weekly file contains 7 days of exercises (or 3 days for Week 7) with detailed instructions, code examples, and real-world scenarios.

### Weekly Files

| Week | File | Days | Topics Covered | Size |
|------|------|------|----------------|------|
| **Week 1** | [`week-01-days-01-07.md`](weekly/week-01-days-01-07.md) | 1-7 | Java Essentials: Basics, OOP, Collections | 41 KB |
| **Week 2** | [`week-02-days-08-14.md`](weekly/week-02-days-08-14.md) | 8-14 | Advanced Java: Exception Handling, File I/O, Threads | 59 KB |
| **Week 3** | [`week-03-days-15-21.md`](weekly/week-03-days-15-21.md) | 15-21 | Selenium Basics: Setup, Locators, WebDriver Commands | 60 KB |
| **Week 4** | [`week-04-days-22-28.md`](weekly/week-04-days-22-28.md) | 22-28 | Intermediate Selenium: XPath, CSS, Dropdowns, Alerts | 507 KB |
| **Week 5** | [`week-05-days-29-35.md`](weekly/week-05-days-29-35.md) | 29-35 | Advanced Techniques: TestNG, JavaScript, Waits, Screenshots | 296 KB |
| **Week 6** | [`week-06-days-36-42.md`](weekly/week-06-days-36-42.md) | 36-42 | Framework Building: TestNG, POM, Data-Driven Testing | 347 KB |
| **Week 7** | [`week-07-days-43-45.md`](weekly/week-07-days-43-45.md) | 43-45 | Final Project: Complete E-Commerce Automation Suite | 28 KB |

**Total:** 7 weeks, 45 days, ~1.3 MB of comprehensive exercise content

---

## Course Progression

### Phase 1: Java Fundamentals (Weeks 1-2, Days 1-14)
Build a solid Java foundation required for Selenium automation.

**Week 1: Java Essentials**
- Core Java syntax and data types
- Control structures and loops
- Object-oriented programming basics
- Collections Framework (ArrayList, HashMap)

**Week 2: Advanced Java**
- Exception handling
- File I/O operations
- Multithreading concepts
- Java 8 features (Lambdas, Streams)

### Phase 2: Selenium Fundamentals (Weeks 3-4, Days 15-28)
Learn core Selenium WebDriver concepts and web element interactions.

**Week 3: Selenium Basics**
- Selenium setup and configuration
- Browser automation basics
- Locating elements (ID, Name, Class, Tag)
- Basic WebDriver commands

**Week 4: Intermediate Selenium**
- Advanced locators (XPath, CSS Selectors)
- Dropdowns and checkboxes
- Alerts and popups
- Web element interactions

### Phase 3: Advanced Automation (Weeks 5-6, Days 29-42)
Master testing frameworks and design patterns.

**Week 5: TestNG & Advanced Techniques**
- TestNG framework setup
- JavaScript Executor
- Explicit and implicit waits
- Screenshots and reporting

**Week 6: Framework Building**
- Page Object Model (POM)
- Data-driven testing
- Configuration management
- Test suite organization

### Phase 4: Final Project (Week 7, Days 43-45)
Apply all learned concepts in a complete automation project.

**Week 7: E-Commerce Automation**
- Complete page object implementations
- Comprehensive test suite
- Data-driven test cases
- CI/CD ready framework

---

## How to Use These Exercises

### For Students

1. **Follow the weekly structure** - Complete Weeks 1-2 before starting Selenium
2. **Hands-on practice** - Type every line of code yourself (no copy-paste)
3. **Time commitment** - Plan for 2-3 hours per day (14-21 hours per week)
4. **Test everything** - Run and verify each exercise before moving forward
5. **Complete challenges** - Push yourself with bonus exercises

### Exercise Format

Each exercise includes:
- **Learning Objectives** - What you'll master in this exercise
- **Prerequisites** - Knowledge required before starting
- **Step-by-Step Instructions** - Detailed implementation guide
- **Complete Code Examples** - Working reference implementations
- **Expected Output** - Verification criteria
- **Common Mistakes** - Pitfalls to avoid
- **Challenge Tasks** - Advanced variations to test your skills

### Setup Requirements

**Software Needed:**
- JDK 11 or higher
- IntelliJ IDEA or Eclipse
- Maven or Gradle
- Chrome/Firefox browser
- ChromeDriver/GeckoDriver

**Selenium Dependencies:**
```xml
<!-- Add to pom.xml -->
<dependency>
    <groupId>org.seleniumhq.selenium</groupId>
    <artifactId>selenium-java</artifactId>
    <version>4.x.x</version>
</dependency>
<dependency>
    <groupId>org.testng</groupId>
    <artifactId>testng</artifactId>
    <version>7.x.x</version>
</dependency>
```

---

## Quick Navigation

### By Topic

**Java Fundamentals**
- [Variables & Data Types](weekly/week-01-days-01-07.md)
- [Object-Oriented Programming](weekly/week-01-days-01-07.md)
- [Collections Framework](weekly/week-01-days-01-07.md)
- [Exception Handling](weekly/week-02-days-08-14.md)
- [File I/O](weekly/week-02-days-08-14.md)

**Selenium Basics**
- [Setup & First Script](weekly/week-03-days-15-21.md)
- [Basic Locators](weekly/week-03-days-15-21.md)
- [WebDriver Commands](weekly/week-03-days-15-21.md)
- [Element Interactions](weekly/week-03-days-15-21.md)

**Advanced Locators**
- [XPath Strategies](weekly/week-04-days-22-28.md#day-22-advanced-xpath-locators)
- [CSS Selectors](weekly/week-04-days-22-28.md#day-23-css-selectors)
- [Dropdowns & Checkboxes](weekly/week-04-days-22-28.md#day-24-dropdowns-and-select-elements)
- [Alerts & Frames](weekly/week-04-days-22-28.md)

**Testing Frameworks**
- [TestNG Basics](weekly/week-05-days-29-35.md#day-29-testng-introduction)
- [Annotations & Assertions](weekly/week-05-days-29-35.md#day-30-testng-advanced)
- [JavaScript Executor](weekly/week-05-days-29-35.md#day-31-javascript-executor)
- [Waits & Synchronization](weekly/week-05-days-29-35.md#day-33-explicit-waits)

**Framework Design**
- [Page Object Model](weekly/week-06-days-36-42.md#day-41-complete-page-object-model-implementation)
- [Data-Driven Testing](weekly/week-06-days-36-42.md#day-42-data-driven-testing)
- [Configuration Management](weekly/week-06-days-36-42.md#day-36-framework-architecture)
- [Test Organization](weekly/week-06-days-36-42.md)

**Final Project**
- [E-Commerce Automation](weekly/week-07-days-43-45.md)

---

## File Details

### Week 1: Java Essentials (Days 1-7)
**File:** [`weekly/week-01-days-01-07.md`](weekly/week-01-days-01-07.md)
**Size:** 41 KB (1,212 lines)

**Topics:**
- Day 1: Java basics, variables, operators
- Day 2: Control flow, loops
- Day 3: Methods and functions
- Day 4: OOP concepts (classes, objects)
- Day 5: Inheritance and polymorphism
- Day 6: Collections (ArrayList, HashMap)
- Day 7: Exception basics

---

### Week 2: Advanced Java (Days 8-14)
**File:** [`weekly/week-02-days-08-14.md`](weekly/week-02-days-08-14.md)
**Size:** 59 KB (1,827 lines)

**Topics:**
- Day 8: Exception handling in depth
- Day 9: File I/O operations
- Day 10: File reading and writing
- Day 11: Multithreading basics
- Day 12: Thread synchronization
- Day 13: Java 8 features (Lambdas)
- Day 14: Stream API and functional programming

---

### Week 3: Selenium Basics (Days 15-21)
**File:** [`weekly/week-03-days-15-21.md`](weekly/week-03-days-15-21.md)
**Size:** 60 KB (1,580 lines)

**Topics:**
- Day 15: Selenium setup, WebDriver basics
- Day 16: Basic locators (ID, Name, Class)
- Day 17: LinkText and PartialLinkText
- Day 18: TagName and basic navigation
- Day 19: WebDriver commands (navigate, manage)
- Day 20: Element operations (click, sendKeys, getText)
- Day 21: Browser interactions and cookies

---

### Week 4: Intermediate Selenium (Days 22-28)
**File:** [`weekly/week-04-days-22-28.md`](weekly/week-04-days-22-28.md)
**Size:** 507 KB (13,814 lines)

**Topics:**
- Day 22: Advanced XPath (axes, functions, predicates) - 6 exercises
- Day 23: CSS Selectors (complete strategies) - 6 exercises
- Day 24: Dropdowns and Select elements - 4 exercises
- Day 25: Checkboxes and radio buttons - 4 exercises
- Day 26: Alerts, popups, and confirmations - 3 exercises
- Day 27-28: Additional advanced interactions

**Highlight:** Most comprehensive week with 23 detailed exercises covering advanced locator strategies.

---

### Week 5: TestNG & Advanced Techniques (Days 29-35)
**File:** [`weekly/week-05-days-29-35.md`](weekly/week-05-days-29-35.md)
**Size:** 296 KB (8,443 lines)

**Topics:**
- Day 29: TestNG introduction and annotations - 3 exercises
- Day 30: TestNG XML configuration and POM intro
- Day 31: JavaScript Executor - 5 exercises
- Day 32: Actions class and mouse/keyboard operations - 5 exercises
- Day 33: Explicit waits and FluentWait - 5 exercises
- Day 34: Screenshots and visual verification - 5 exercises
- Day 35: Frames, windows, and advanced handling - 5 exercises

**Highlight:** 28 comprehensive exercises covering TestNG framework and advanced Selenium techniques.

---

### Week 6: Framework Building (Days 36-42)
**File:** [`weekly/week-06-days-36-42.md`](weekly/week-06-days-36-42.md)
**Size:** 347 KB (11,555 lines)

**Topics:**
- Day 36: Framework architecture and design patterns
- Day 37: Web tables and dynamic content handling
- Day 38: TestNG basics (annotations, assertions) - 5 exercises
- Day 39: TestNG configuration and grouping - 6 exercises
- Day 40: Database integration and POM intro - 5 exercises
- Day 41: Complete Page Object Model implementation - 5 detailed exercises
- Day 42: Data-driven testing with DataProvider - 6 exercises

**Highlight:** Complete framework building guide with 27+ exercises focused on scalable automation architecture.

---

### Week 7: Final Project (Days 43-45)
**File:** [`weekly/week-07-days-43-45.md`](weekly/week-07-days-43-45.md)
**Size:** 28 KB (1,014 lines)

**Topics:**
- Day 43: E-Commerce project setup and page objects
- Day 44: Complete test suite implementation
- Day 45: Data-driven tests and framework refinement

**Deliverables:**
- Complete page object implementations (Login, Product, Cart, Checkout)
- 10+ automated test cases
- Data-driven test scenarios
- Configuration management
- TestNG XML suite
- Best practices documentation

---

## Statistics

- **Total Exercises:** 100+ hands-on automation exercises
- **Total Content:** ~1.3 MB across 7 files
- **Total Lines:** ~26,000 lines of content
- **Estimated Time:** 90-135 hours (2-3 hours/day × 45 days)
- **Difficulty Levels:** Beginner to Advanced
- **Real-World Scenarios:** 15+ practical automation projects

---

## Additional Resources

### Reference Documents
- **[CONSOLIDATION_SUMMARY.md](weekly/CONSOLIDATION_SUMMARY.md)** - Detailed merge report and content organization
- **[QUICK_REFERENCE.md](weekly/QUICK_REFERENCE.md)** - Quick topic guide and exercise summaries

### Supplementary Materials
- **Practice Websites:** [The Internet](https://the-internet.herokuapp.com/), [Sauce Demo](https://www.saucedemo.com/)
- **Selenium Docs:** [Official Documentation](https://www.selenium.dev/documentation/)
- **TestNG Guide:** [TestNG Documentation](https://testng.org/doc/)

---

## Learning Path Recommendations

### For Complete Beginners
1. Start with Week 1-2 (Java Fundamentals) - 2 weeks
2. Move to Week 3 (Selenium Basics) - 1 week
3. Progress to Week 4-5 (Intermediate/Advanced) - 2 weeks
4. Master Week 6 (Framework Building) - 1 week
5. Complete Week 7 (Final Project) - 3 days

**Total Time:** 6-7 weeks (part-time study)

### For Java Developers New to Selenium
1. Quick review of Week 1-2 (3-4 days)
2. Deep dive into Week 3-4 (10-12 days)
3. Master Week 5-6 (10-12 days)
4. Complete Week 7 (3 days)

**Total Time:** 4 weeks (part-time study)

### For Experienced QA Engineers
1. Skip to Week 3 (Selenium Basics review) - 2-3 days
2. Focus on Week 4-5 (Advanced techniques) - 1 week
3. Deep dive Week 6 (Framework patterns) - 1 week
4. Customize Week 7 (Project) - 2-3 days

**Total Time:** 2-3 weeks

---

## Tips for Success

1. **Practice Daily** - Consistency is key; 2 hours daily beats 14 hours on weekend
2. **Type, Don't Copy** - Muscle memory helps learning
3. **Debug Everything** - Understanding errors teaches more than perfect code
4. **Build Incrementally** - Each exercise builds on previous knowledge
5. **Customize Examples** - Adapt exercises to your own test scenarios
6. **Join Communities** - Ask questions on Stack Overflow, Selenium forums
7. **Read Documentation** - Official docs clarify concepts exercises introduce

---

## Course Completion

Upon finishing all 45 days, you will be able to:
- ✅ Write robust Selenium WebDriver scripts
- ✅ Design scalable Page Object Model frameworks
- ✅ Implement data-driven testing strategies
- ✅ Use TestNG for test organization and reporting
- ✅ Handle complex web elements and interactions
- ✅ Debug and troubleshoot automation issues
- ✅ Build maintainable, production-ready test suites

---

## Need Help?

- **Course Overview:** See [`../courses/selenium-automation/README.md`](../courses/selenium-automation/README.md)
- **Daily Lessons:** Check [`../courses/selenium-automation/daily-lessons/`](../courses/selenium-automation/daily-lessons/)
- **Main Documentation:** Visit [`../../README.md`](../../README.md)

---

**Last Updated:** January 26, 2026
**Status:** Complete - All 7 weeks consolidated, organized, and ready for use
**Contributors:** Consolidated from multiple supplementary files and organized by weeks
