# Week 3: Week 2 Review, Screenshots, Browser Options & TestNG Basics

**Duration**: 8 Days | **Level**: Intermediate | **Prerequisites**: Selenium WebDriver Fundamentals (Week 1-2)

---

## 📋 Overview

Week 3 focuses on essential Selenium features and introduces TestNG, the powerful testing framework. You'll learn to capture screenshots for debugging and reporting, customize browser behavior with options, and master TestNG for organizing and running your tests professionally.

**What Makes This Week Special:**
- Learn screenshot strategies for debugging and reporting
- Master browser configuration for different environments
- Introduction to TestNG framework
- Organize tests with annotations and assertions
- Implement data-driven testing
- Build professional test suites

---

## 🎯 Learning Objectives

By the end of Week 3, you will be able to:
- Capture and manage screenshots effectively
- Configure browsers with ChromeOptions, FirefoxOptions, EdgeOptions
- Run browsers in headless mode for CI/CD
- Write TestNG tests with proper annotations
- Use TestNG assertions for validation
- Organize tests with groups and priorities
- Implement data-driven testing with DataProvider
- Create comprehensive test suites with testng.xml
- Use soft assertions and listeners

---

## 📚 Daily Breakdown

### [Day 15: Week 2 Review & Transition](day15_week2_review_transition.md)
**Focus**: Consolidation and Framework Introduction

**Topics**:
- Week 2 comprehensive review
- Actions class, web tables, file operations recap
- JavaScript executor review
- Current approach limitations
- Introduction to testing frameworks
- Why TestNG?
- Preparing for framework-based testing

**Key Skills**:
- Consolidate Week 2 knowledge
- Identify current limitations
- Understand framework benefits
- Prepare mindset for TestNG
- Plan test organization

**Practical Exercises**: 3 exercises
- Identify code improvements
- Plan test cases
- Design test data structure

---

### [Day 16: Screenshots & Visual Testing](day16_screenshots_visual_testing.md)
**Focus**: Capturing and Managing Screenshots

**Topics**:
- TakesScreenshot interface
- Full page screenshots
- Element screenshots
- Screenshot on test failure
- Screenshot utility class
- Visual testing basics
- Screenshot organization strategies

**Key Skills**:
- Use `TakesScreenshot` interface
- Capture screenshots with timestamps
- Implement screenshot on failure
- Create reusable screenshot utilities
- Organize screenshots by test/date

**Practical Exercises**: 7 exercises
- Basic screenshot capture
- Multiple screenshots in workflow
- Element-specific screenshots
- Screenshot on failure with TestNG
- Screenshot utility class creation
- Organized screenshot structure
- Screenshot comparison

---

### [Day 17: Browser Options & Capabilities](day17_browser_options_capabilities.md)
**Focus**: Customizing Browser Behavior

**Topics**:
- ChromeOptions configuration
- FirefoxOptions configuration
- EdgeOptions configuration
- Headless browser mode
- Window size and position
- Disable notifications
- Download directory configuration
- Mobile emulation
- Proxy configuration
- Browser factory pattern

**Key Skills**:
- Configure ChromeOptions for different scenarios
- Run browsers in headless mode
- Set custom download directories
- Emulate mobile devices
- Create browser factory for flexibility

**Practical Exercises**: 7 exercises
- Headless browser execution
- Custom window sizes
- Disable notifications
- Download configuration
- Browser factory implementation
- Mobile emulation
- Incognito mode testing

---

### [Day 18: TestNG Part 1 - Basics](day18_testng_part1.md)
**Focus**: Introduction to TestNG Framework

**Topics**:
- What is TestNG and why use it?
- TestNG installation and setup
- `@Test` annotation
- Running tests from IDE and Maven
- Basic assertions:
  - `Assert.assertEquals()`
  - `Assert.assertTrue()`
  - `Assert.assertFalse()`
  - `Assert.assertNotNull()`
- Test execution and reports

**Key Skills**:
- Set up TestNG in Maven project
- Write test methods with `@Test`
- Use assertions for validation
- Run tests from IDE
- Understand TestNG reports

**Practical Exercises**: 10 exercises
- TestNG setup and configuration
- Basic test methods
- Assertion practice
- Test execution
- Report analysis

---

### [Day 19: TestNG Part 2 - Annotations](day19_testng_part2.md)
**Focus**: TestNG Annotation Hierarchy

**Topics**:
- TestNG annotation lifecycle
- Setup annotations:
  - `@BeforeSuite` / `@AfterSuite`
  - `@BeforeTest` / `@AfterTest`
  - `@BeforeClass` / `@AfterClass`
  - `@BeforeMethod` / `@AfterMethod`
- Execution order
- Resource management
- Setup and teardown best practices

**Key Skills**:
- Use setup and teardown annotations
- Understand annotation hierarchy
- Manage test resources properly
- Initialize WebDriver in setup
- Clean up resources in teardown

**Practical Exercises**: 8 exercises
- Annotation hierarchy demonstration
- WebDriver setup/teardown
- Resource management
- Multiple test classes
- Execution order verification

---

### [Day 20: TestNG Part 3 - Organization](day20_testng_part3.md)
**Focus**: Test Organization and Management

**Topics**:
- Test prioritization (`priority` attribute)
- Enabling/disabling tests (`enabled` attribute)
- Test dependencies (`dependsOnMethods`, `dependsOnGroups`)
- Grouping tests (`groups` attribute)
- Running specific groups
- Test inclusion/exclusion
- `testng.xml` configuration
- Suite organization

**Key Skills**:
- Prioritize test execution
- Create test dependencies
- Group tests logically
- Configure testng.xml
- Run specific test groups

**Practical Exercises**: 10 exercises
- Test prioritization
- Test dependencies
- Group creation
- testng.xml configuration
- Selective test execution

---

### [Day 21: TestNG Part 4 - Data-Driven Testing](day21_testng_part4.md)
**Focus**: Parameterization and Data-Driven Testing

**Topics**:
- `@Parameters` annotation
- Parameters from testng.xml
- `@DataProvider` annotation
- Data provider methods
- Data provider with multiple parameters
- Data provider from external sources
- Parallel data provider execution
- Data-driven test design patterns

**Key Skills**:
- Use `@Parameters` for simple parameterization
- Create `@DataProvider` methods
- Pass multiple parameters to tests
- Read data from external sources
- Design data-driven tests

**Practical Exercises**: 10 exercises
- Parameters from testng.xml
- Basic DataProvider
- Multiple parameters
- DataProvider from Excel
- DataProvider from JSON
- Parallel data execution

---

### [Day 22: TestNG Part 5 - Advanced Features](day22_testng_part5.md)
**Focus**: Advanced TestNG Capabilities

**Topics**:
- Soft assertions (`SoftAssert`)
- Test listeners (`ITestListener`)
- Retry logic (`IRetryAnalyzer`)
- Custom annotations
- Test transformers
- Parallel test execution
- Thread count configuration
- TestNG advanced reporting

**Key Skills**:
- Use soft assertions for multiple validations
- Create custom test listeners
- Implement retry logic for flaky tests
- Configure parallel execution
- Generate advanced reports

**Practical Exercises**: 8 exercises
- Soft assertions implementation
- Custom test listener
- Retry analyzer
- Parallel execution
- Advanced reporting

---

## 🎯 Week 3 Learning Path

### Day-by-Day Focus:

**Day 15: Review & Transition**
- Consolidate Week 2 learning
- Understand framework need
- Prepare for TestNG

**Days 16-17: Selenium Advanced Features**
- Master screenshot capture and management
- Configure browsers for different scenarios
- Prepare for CI/CD integration

**Days 18-20: TestNG Fundamentals**
- Learn TestNG basics and annotations
- Organize tests professionally
- Manage test execution

**Days 21-22: TestNG Advanced**
- Implement data-driven testing
- Use advanced TestNG features
- Build robust test suites

---

## 📊 Progress Tracking

### Completion Checklist

#### Day 15: Week 2 Review
- [ ] Review Week 2 concepts
- [ ] Identify current limitations
- [ ] Understand framework benefits
- [ ] Prepare for TestNG
- [ ] Complete transition exercises

#### Day 16: Screenshots
- [ ] Use TakesScreenshot interface
- [ ] Capture full page screenshots
- [ ] Capture element screenshots
- [ ] Implement screenshot on failure
- [ ] Create screenshot utility class

#### Day 17: Browser Options
- [ ] Configure ChromeOptions
- [ ] Run headless browser
- [ ] Set window size and position
- [ ] Configure download directory
- [ ] Create browser factory

#### Day 18: TestNG Basics
- [ ] Set up TestNG in project
- [ ] Write test methods with @Test
- [ ] Use basic assertions
- [ ] Run tests from IDE
- [ ] Understand TestNG reports

#### Day 19: TestNG Annotations
- [ ] Use @BeforeMethod and @AfterMethod
- [ ] Use @BeforeClass and @AfterClass
- [ ] Understand annotation hierarchy
- [ ] Manage WebDriver lifecycle
- [ ] Clean up resources properly

#### Day 20: Test Organization
- [ ] Prioritize tests
- [ ] Create test dependencies
- [ ] Group tests logically
- [ ] Configure testng.xml
- [ ] Run specific test groups

#### Day 21: Data-Driven Testing
- [ ] Use @Parameters annotation
- [ ] Create @DataProvider methods
- [ ] Pass multiple parameters
- [ ] Read data from external sources
- [ ] Design data-driven tests

#### Day 22: Advanced TestNG
- [ ] Use soft assertions
- [ ] Create test listeners
- [ ] Implement retry logic
- [ ] Configure parallel execution
- [ ] Generate advanced reports

---

## 🔑 Key Takeaways

### Core Concepts Mastered:

**1. Screenshot Management**
- TakesScreenshot interface usage
- Screenshot strategies (full page, element, on failure)
- Screenshot organization and naming
- Visual testing basics

**2. Browser Configuration**
- ChromeOptions, FirefoxOptions, EdgeOptions
- Headless mode for CI/CD
- Custom browser settings
- Browser factory pattern

**3. TestNG Framework**
- Test annotations and lifecycle
- Assertions for validation
- Test organization and grouping
- Data-driven testing
- Advanced features (listeners, retry, parallel)

**4. Professional Testing**
- Proper test structure
- Resource management
- Test suite organization
- Reporting and debugging

---

## 📈 Assessment

### Week 3 Assessments Available:
- [Day 16 Assessment](../../../src/data/assessments/selenium/week3/day16.js) - Screenshots
- [Day 17 Assessment](../../../src/data/assessments/selenium/week3/day17.js) - Browser Options
- [Day 18 Assessment](../../../src/data/assessments/selenium/week3/day18.js) - TestNG Basics
- [Day 19 Assessment](../../../src/data/assessments/selenium/week3/day19.js) - TestNG Annotations
- [Day 20 Assessment](../../../src/data/assessments/selenium/week3/day20.js) - Test Organization
- [Day 21 Assessment](../../../src/data/assessments/selenium/week3/day21.js) - Data-Driven Testing
- [Day 22 Assessment](../../../src/data/assessments/selenium/week3/day22.js) - Advanced TestNG

### Assessment Criteria:
- Screenshot implementation proficiency
- Browser configuration knowledge
- TestNG framework understanding
- Test organization skills
- Data-driven testing capability

---

## 💡 Tips for Success

### Study Tips:
1. **Practice Screenshots**: Take screenshots at every important step
2. **Experiment with Options**: Try different browser configurations
3. **Master TestNG**: TestNG is crucial for professional testing
4. **Organize Tests**: Good organization saves time later
5. **Data-Driven Mindset**: Think about parameterization from the start

### Common Pitfalls to Avoid:
- Not organizing screenshots properly
- Forgetting to configure headless mode for CI/CD
- Mixing test logic with setup/teardown
- Not using assertions properly
- Ignoring test dependencies
- Poor testng.xml configuration

### Best Practices:
- Always capture screenshots on failure
- Use browser factory for flexibility
- Follow TestNG annotation hierarchy
- Group tests logically
- Use DataProvider for data-driven tests
- Implement proper resource cleanup

---

## 📚 Additional Resources

### Official Documentation:
- [Selenium Screenshots](https://www.selenium.dev/documentation/webdriver/interactions/screenshots/)
- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)
- [TestNG Official Documentation](https://testng.org/doc/)
- [TestNG Annotations](https://testng.org/doc/documentation-main.html#annotations)

### Video Tutorials:
- Search for "Selenium Screenshots Tutorial"
- Look for "Chrome Options Selenium"
- "TestNG Complete Tutorial" playlists
- "Data-Driven Testing with TestNG"

### Practice Platforms:
- Use practice websites from Week 1-2
- Experiment with different browser configurations
- Create test suites for real applications

---

## 🧭 Navigation

### Course Structure:
- [Week 1: Selenium WebDriver Fundamentals](../week1/README.md)
- [Week 2: Advanced Interactions](../week2/README.md)
- **Week 3: Screenshots, Browser Options & TestNG** ← You are here
- [Week 4: Page Object Model & Data Management](../week4/README.md)
- [Week 5: Logging, Reporting & Utilities](../week5/README.md)
- [Week 6: Database, API & CI/CD](../week6/README.md)
- [Week 7: Final Project & Advanced Topics](../week7/README.md)

### Week 3 Daily Files:
1. [Day 15: Week 2 Review & Transition](day15_week2_review_transition.md)
2. [Day 16: Screenshots & Visual Testing](day16_screenshots_visual_testing.md)
3. [Day 17: Browser Options & Capabilities](day17_browser_options_capabilities.md)
4. [Day 18: TestNG Part 1 - Basics](day18_testng_part1.md)
5. [Day 19: TestNG Part 2 - Annotations](day19_testng_part2.md)
6. [Day 20: TestNG Part 3 - Organization](day20_testng_part3.md)
7. [Day 21: TestNG Part 4 - Data-Driven](day21_testng_part4.md)
8. [Day 22: TestNG Part 5 - Advanced](day22_testng_part5.md)

### Related Resources:
- [Week 3 Exercises](../../../03_BEGINNER_FRIENDLY_Exercises/Selenium/Week3_Days16-22_TestNG.md)
- [Selenium Course Overview](../README.md)

---

## 🎓 What's Next?

### Week 4 Preview: Page Object Model & Data Management

After mastering Week 3, you'll advance to:
- **Page Object Model**: Design pattern for maintainable tests
- **POM Best Practices**: Advanced POM techniques
- **External Data**: Properties, Excel, JSON, CSV
- **Parallel Execution**: Run tests concurrently
- **Cross-Browser Testing**: Test across multiple browsers

Get ready to build professional, maintainable test frameworks!

---

## ✅ Ready to Start?

Begin Week 3 with [Day 15: Week 2 Review & Transition →](day15_week2_review_transition.md)

---

**🎉 Welcome to Week 3!**

This week bridges the gap between basic Selenium and professional test automation. Master screenshots, browser configuration, and TestNG to build production-ready test suites. Practice daily and enjoy the journey! 💻

---

*Last Updated: 2026-01-14*
*Status: Complete - All 8 days implemented*
