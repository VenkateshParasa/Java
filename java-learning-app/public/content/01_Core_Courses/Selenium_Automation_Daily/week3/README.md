# Week 3: Selenium WebDriver Basics

**Duration**: 7 Days | **Level**: Beginner to Intermediate | **Prerequisites**: Java Fundamentals (Weeks 1-2)

---

## 📋 Overview

Week 3 marks a pivotal transition in your automation journey - from Java fundamentals to Selenium WebDriver. This week, you'll learn how to automate web browsers, locate elements on web pages, and interact with them programmatically. By the end of this week, you'll be able to write complete automation scripts that navigate websites, fill forms, click buttons, and verify page content.

**What Makes This Week Special:**
- First hands-on experience with browser automation
- Learn multiple strategies to locate web elements
- Master the art of element interaction
- Build a mini-project consolidating Week 1-2 Java knowledge

---

## 🎯 Learning Objectives

By the end of Week 3, you will be able to:
- Set up Selenium WebDriver with Maven
- Launch and control web browsers programmatically
- Navigate to URLs and control browser operations
- Locate web elements using 8 different locator strategies
- Master XPath with axes and functions
- Write efficient CSS Selectors
- Interact with various web elements (input fields, buttons, links, etc.)
- Retrieve text and attributes from web elements
- Verify element states (displayed, enabled, selected)
- Build a complete data-driven utility project (Day 15)

---

## 📚 Daily Breakdown

### [Day 15: Week 1-2 Review & Mini Project](day15_week_review_project.md)
**Focus**: Java Fundamentals Consolidation

**Topics**:
- Comprehensive review of Days 1-14
- OOP concepts application
- Collections for test data management
- Exception handling in automation context
- File handling for configuration

**Mini Project**: Test Data Management Utility
- Read test data from properties file
- Read test data from Excel (Apache POI)
- Store data in ArrayList and HashMap
- Implement exception handling
- Create utility methods
- Package organization

**Why This Day Matters**: Before diving into Selenium, you'll consolidate your Java knowledge through a practical project that you'll use throughout your automation framework.

---

### [Day 16: Selenium Introduction & Setup](day16_selenium_introduction_setup.md)
**Focus**: Understanding Selenium Architecture

**Topics**:
- What is Selenium WebDriver?
- Selenium components (IDE, WebDriver, Grid)
- WebDriver architecture and how it works
- Browser drivers concept
- Setting up Maven project for Selenium
- Adding Selenium dependencies to pom.xml
- WebDriverManager for automatic driver management
- WebDriver interface overview

**Practical Exercises**: 10 exercises
- Maven project setup
- Dependency management
- Understanding WebDriver interface
- Selenium architecture diagrams
- Project structure organization

**Key Deliverable**: Fully configured Selenium Maven project ready for automation

---

### [Day 17: First Selenium Script](day17_first_selenium_script.md)
**Focus**: Browser Automation Basics

**Topics**:
- Browser drivers (ChromeDriver, EdgeDriver, FirefoxDriver)
- WebDriverManager setup
- Launching browsers
- WebDriver basic commands:
  - get(url) - navigate to URL
  - getTitle() - retrieve page title
  - getCurrentUrl() - get current URL
  - getPageSource() - get HTML source
- Browser navigation:
  - navigate().to()
  - navigate().back()
  - navigate().forward()
  - navigate().refresh()
- Browser window management
- Closing browsers (close() vs quit())

**Practical Exercises**: 15 exercises
- Launch different browsers
- Navigate to websites
- Browser navigation operations
- Title verification
- URL verification
- Complete automation workflows

**Key Deliverable**: Working Selenium scripts that can launch browsers and navigate websites

---

### [Day 18: Locators - Part 1](day18_locators_part1.md)
**Focus**: Basic Locator Strategies

**Topics**:
- Why locators are crucial in automation
- findElement() vs findElements()
- WebElement interface
- Basic locators:
  - **ID**: Most reliable locator
  - **Name**: Common for form fields
  - **ClassName**: For styled elements
  - **TagName**: For generic elements
  - **LinkText**: For exact link text
  - **PartialLinkText**: For partial link matches
- Locator strategy selection
- Handling multiple elements

**Practical Exercises**: 15 exercises
- Locate elements using each locator type
- findElement practice
- findElements for multiple elements
- Count elements on page
- Form field location
- Button location
- Link location

**Key Deliverable**: Ability to locate any element using basic locators

---

### [Day 19: Locators - Part 2 (XPath)](day19_locators_part2_xpath.md)
**Focus**: Advanced XPath Techniques

**Topics**:
- XPath introduction and power
- Absolute vs Relative XPath (why relative is better)
- Basic XPath syntax
- XPath with attributes: `//tag[@attribute='value']`
- XPath functions:
  - text() - match by text content
  - contains() - partial matching
  - starts-with() - prefix matching
  - normalize-space() - handle whitespace
- XPath operators (and, or)
- XPath axes:
  - parent - navigate to parent
  - child - navigate to children
  - following-sibling - next siblings
  - preceding-sibling - previous siblings
  - ancestor - all ancestors
  - descendant - all descendants
- Dynamic XPath strategies
- XPath for tables and complex structures

**Practical Exercises**: 20 exercises
- Basic XPath expressions
- Attribute-based XPath
- Text-based XPath
- XPath with functions
- XPath axes practice
- Dynamic element location
- Table row/column navigation
- Complex XPath scenarios

**Key Deliverable**: Master XPath to locate any element on any webpage

---

### [Day 20: Locators - Part 3 (CSS Selector)](day20_locators_part3_css.md)
**Focus**: CSS Selector Mastery

**Topics**:
- CSS Selector introduction
- CSS syntax and structure
- CSS with ID: `#idValue`
- CSS with class: `.className`
- CSS with attributes:
  - `[attribute='value']` - exact match
  - `[attribute*='value']` - contains
  - `[attribute^='value']` - starts with
  - `[attribute$='value']` - ends with
- CSS combinators:
  - Space (descendant)
  - `>` (direct child)
  - `+` (adjacent sibling)
  - `~` (general sibling)
- CSS pseudo-classes:
  - :first-child
  - :last-child
  - :nth-child(n)
  - :nth-of-type(n)
- CSS vs XPath comparison
- Performance considerations
- When to use CSS vs XPath

**Practical Exercises**: 18 exercises
- CSS with ID and class
- Attribute selectors
- Contains/starts-with/ends-with
- Child and descendant selectors
- Sibling selectors
- Nth-child selections
- Complex CSS selectors
- CSS vs XPath comparison

**Key Deliverable**: Expertise in CSS Selectors as an alternative to XPath

---

### [Day 21: WebElement Interactions](day21_webelement_interactions.md)
**Focus**: Element Interaction Methods

**Topics**:
- WebElement interface deep dive
- Input operations:
  - sendKeys() - enter text
  - clear() - clear text fields
- Click operations:
  - click() - click any clickable element
- Text retrieval:
  - getText() - get visible text
  - getAttribute() - get attribute values
  - getCssValue() - get CSS properties
- Element state verification:
  - isDisplayed() - check visibility
  - isEnabled() - check if enabled
  - isSelected() - check if selected (checkbox/radio)
- Form operations:
  - submit() - submit forms
- Element properties and attributes
- Working with different element types

**Practical Exercises**: 20 exercises
- sendKeys on various inputs
- Click buttons and links
- clear and re-enter text
- getText from different elements
- getAttribute practice
- getCssValue usage
- isDisplayed checks
- isEnabled checks
- isSelected for checkboxes
- Form automation
- Login form complete workflow
- Registration form
- Search functionality
- Dynamic element interaction

**Key Deliverable**: Complete mastery of element interaction methods

---

## 🎯 Week 3 Mini-Projects

### Day 15 Project: Test Data Management Utility
**Objective**: Build a reusable utility for managing test data

**Features**:
- ConfigReader class for properties files
- ExcelReader class for Excel files
- TestDataManager using ArrayList and HashMap
- Exception handling throughout
- Package organization (utils, config, data)

**Skills Applied**:
- File I/O
- Collections (ArrayList, HashMap)
- Exception handling
- OOP principles
- Package structure

---

### End-of-Week Challenge: Web Automation Suite
**Objective**: Automate a complete user journey on a practice website

**Test Scenarios**:
1. Navigate to practice website
2. Locate and fill registration form
3. Click submit button
4. Verify success message
5. Navigate to login page
6. Enter credentials
7. Verify login success
8. Perform search
9. Verify search results

**Requirements**:
- Use at least 5 different locator types
- Use both XPath and CSS Selectors
- Verify element states
- Print results to console
- Handle basic exceptions

---

## 📊 Progress Tracking

### Completion Checklist

#### Day 15: Java Review
- [ ] Complete Test Data Management Utility project
- [ ] Implement ConfigReader class
- [ ] Implement ExcelReader class
- [ ] Use Collections effectively
- [ ] Handle exceptions properly

#### Day 16: Selenium Setup
- [ ] Create Maven project
- [ ] Add Selenium dependencies
- [ ] Add WebDriverManager dependency
- [ ] Understand WebDriver architecture
- [ ] Setup project structure

#### Day 17: First Script
- [ ] Launch Chrome browser
- [ ] Navigate to websites
- [ ] Use basic WebDriver commands
- [ ] Browser navigation operations
- [ ] Understand close() vs quit()

#### Day 18: Basic Locators
- [ ] Use ID locator
- [ ] Use Name locator
- [ ] Use ClassName locator
- [ ] Use TagName locator
- [ ] Use LinkText locator
- [ ] Use PartialLinkText locator
- [ ] Understand findElement vs findElements

#### Day 19: XPath
- [ ] Write basic XPath
- [ ] Use XPath with attributes
- [ ] Use text() and contains()
- [ ] Use XPath axes
- [ ] Create dynamic XPath
- [ ] Navigate tables with XPath

#### Day 20: CSS Selectors
- [ ] Use CSS with ID
- [ ] Use CSS with class
- [ ] Use attribute selectors
- [ ] Use CSS combinators
- [ ] Use pseudo-classes
- [ ] Compare CSS vs XPath

#### Day 21: Element Interactions
- [ ] Use sendKeys() method
- [ ] Use click() method
- [ ] Use clear() method
- [ ] Use getText() method
- [ ] Use getAttribute() method
- [ ] Check element states
- [ ] Automate complete forms

---

## 🔑 Key Takeaways

### Week 3 Core Concepts:

**1. Selenium Architecture**
- WebDriver is an interface
- Browser drivers implement WebDriver
- WebDriverManager simplifies driver management
- Maven manages dependencies

**2. Locator Strategy Priority**
```
1. ID (most reliable)
2. Name
3. CSS Selector
4. XPath
5. LinkText
6. ClassName
7. TagName (least reliable)
```

**3. XPath Best Practices**
- Always use relative XPath, never absolute
- Prefer attribute-based XPath
- Use text() for unique text
- Use contains() for dynamic attributes
- Leverage axes for complex navigation

**4. CSS Selector Advantages**
- Faster than XPath (in most browsers)
- Cleaner syntax for simple cases
- Better for attribute-based location
- Native browser support

**5. Element Interaction Patterns**
```java
// Find element
WebElement element = driver.findElement(By.id("username"));

// Interact
element.sendKeys("testuser");
element.click();
element.clear();

// Verify
boolean displayed = element.isDisplayed();
String text = element.getText();
String value = element.getAttribute("value");
```

**6. Common Pitfalls to Avoid**
- Using absolute XPath
- Not handling NoSuchElementException
- Using Thread.sleep() (we'll learn proper waits in Week 4)
- Not closing browser (memory leak)
- Confusing close() and quit()

---

## 📈 Assessment

### Week 3 Assessments Available:
- [Day 15 Assessment](../../../src/data/assessments/selenium/week3/day15.js) - Java Review
- [Day 16 Assessment](../../../src/data/assessments/selenium/week3/day16.js) - Selenium Setup
- [Day 17 Assessment](../../../src/data/assessments/selenium/week3/day17.js) - First Script
- [Day 18 Assessment](../../../src/data/assessments/selenium/week3/day18.js) - Basic Locators
- [Day 19 Assessment](../../../src/data/assessments/selenium/week3/day19.js) - XPath
- [Day 20 Assessment](../../../src/data/assessments/selenium/week3/day20.js) - CSS Selectors
- [Day 21 Assessment](../../../src/data/assessments/selenium/week3/day21.js) - Element Interactions

### Assessment Criteria:
- Understanding of Selenium architecture
- Ability to write correct locators
- Element interaction proficiency
- Problem-solving with different locator strategies
- Code organization and best practices

---

## 💡 Tips for Success

### Study Tips:
1. **Practice on Real Websites**: Use practice websites daily
2. **Chrome DevTools**: Master the Elements tab for locator practice
3. **Try Multiple Locators**: For each element, practice 3 different ways to locate it
4. **Build Muscle Memory**: Type all code yourself, don't copy-paste
5. **Debug Locators**: Use browser console to test XPath and CSS

### Recommended Practice Websites:
1. **The Internet** - http://the-internet.herokuapp.com/
   - Great for learning basic interactions
   - Various element types
   - No ads or popups

2. **Sauce Demo** - https://www.saucedemo.com/
   - E-commerce practice site
   - Login functionality
   - Product catalog

3. **DemoQA** - https://demoqa.com/
   - Comprehensive practice site
   - Forms, alerts, frames
   - Modern UI elements

4. **Automation Practice** - http://automationpractice.com/
   - Full e-commerce site
   - Real-world scenarios
   - Complex workflows

5. **OrangeHRM Demo** - https://opensource-demo.orangehrmlive.com/
   - Enterprise application
   - Login system
   - CRUD operations

### Chrome DevTools Tips:
- **F12**: Open DevTools
- **Ctrl+Shift+C**: Inspect element
- **Ctrl+F in Elements**: Search for elements
- **Test XPath**: `$x("//your/xpath")` in Console
- **Test CSS**: `$$("your css selector")` in Console

### Common Pitfalls to Avoid:
- Not installing WebDriverManager dependency
- Using absolute XPath from browser (always write relative)
- Forgetting to call quit() (browser stays open)
- Not handling element not found exceptions
- Testing locators only in browser, not in Selenium
- Using Thread.sleep() instead of proper waits (coming in Week 4)

### Best Practices:
- Always use WebDriverManager (no manual driver downloads)
- Prefer ID locator when available
- Use relative XPath, never absolute
- Close browser after tests (quit() in finally block)
- Keep locators simple and maintainable
- Comment complex locators
- Use meaningful variable names

---

## 📚 Additional Resources

### Official Documentation:
- [Selenium WebDriver Documentation](https://www.selenium.dev/documentation/webdriver/)
- [WebDriver W3C Specification](https://www.w3.org/TR/webdriver/)
- [Selenium Java Bindings](https://www.selenium.dev/selenium/docs/api/java/index.html)

### XPath Resources:
- [XPath Tutorial - W3Schools](https://www.w3schools.com/xml/xpath_intro.asp)
- [XPath Cheatsheet](https://devhints.io/xpath)
- [XPath Axes Explained](https://www.w3schools.com/xml/xpath_axes.asp)

### CSS Selector Resources:
- [CSS Selectors - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
- [CSS Selector Reference](https://www.w3schools.com/cssref/css_selectors.asp)
- [CSS Selector Cheatsheet](https://devhints.io/css)

### Video Tutorials:
- Search for "Selenium WebDriver Java Tutorial" on YouTube
- Look for "XPath in Selenium" tutorials
- "CSS Selector vs XPath" comparison videos

### Browser Extensions:
- **ChroPath**: XPath and CSS helper for Chrome
- **SelectorsHub**: Advanced locator tool
- **XPath Helper**: Simple XPath tool for Chrome

### Practice Platforms:
- [Selenium Practice](http://www.seleniumeasy.com/test/)
- [Practice Form](https://demoqa.com/automation-practice-form)
- [Guru99 Practice](https://demo.guru99.com/test/login.html)

---

## 🧭 Navigation

### Course Structure:
- [Week 1: Core Java Quick Start](../week1/README.md)
- [Week 2: Advanced Java for Automation](../week2/README.md)
- **Week 3: Selenium WebDriver Basics** ← You are here
- [Week 4: Intermediate Selenium](../week4/README.md)
- [Week 5: TestNG & Page Object Model](../week5/README.md)
- [Week 6: Framework Building](../week6/README.md)
- [Week 7: Advanced Topics & Capstone Project](../week7/README.md)

### Week 3 Daily Files:
1. [Day 15: Week 1-2 Review & Mini Project](day15_week_review_project.md)
2. [Day 16: Selenium Introduction & Setup](day16_selenium_introduction_setup.md)
3. [Day 17: First Selenium Script](day17_first_selenium_script.md)
4. [Day 18: Locators - Part 1](day18_locators_part1.md)
5. [Day 19: Locators - Part 2 (XPath)](day19_locators_part2_xpath.md)
6. [Day 20: Locators - Part 3 (CSS Selector)](day20_locators_part3_css.md)
7. [Day 21: WebElement Interactions](day21_webelement_interactions.md)

### Related Resources:
- [Week 3 Exercises](../../../03_BEGINNER_FRIENDLY_Exercises/Selenium/Week3_Days15-21_Selenium_Basics.md)
- [Selenium Course Overview](../README.md)
- [Back to Course Home](../../README.md)

---

## 🎓 What's Next?

### Week 4 Preview: Intermediate Selenium

After mastering Week 3 basics, you'll advance to:
- **Dropdowns & Checkboxes**: Select class and form elements
- **Waits**: Implicit, Explicit, and Fluent waits for synchronization
- **Alerts & Pop-ups**: Handling JavaScript alerts
- **Frames & Windows**: Switching contexts
- **Actions Class**: Mouse hover, drag-drop, keyboard actions
- **JavaScript Executor**: Executing JavaScript for complex operations
- **Screenshots**: Capturing evidence and debugging

Get ready to handle real-world automation challenges!

---

## ✅ Ready to Start?

Begin your Selenium journey with [Day 15: Week 1-2 Review & Mini Project →](day15_week_review_project.md)

Or jump straight to Selenium with [Day 16: Selenium Introduction & Setup →](day16_selenium_introduction_setup.md)

---

**🎉 Welcome to Week 3 - Your Selenium Journey Begins!**

This week transforms you from a Java programmer into a browser automation engineer. By the end of Week 3, you'll have the skills to automate any website. Practice daily, experiment fearlessly, and enjoy the journey! 💻

---

*Last Updated: 2026-01-12*
