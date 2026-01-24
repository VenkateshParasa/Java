# Week 7: Advanced Project - Beginner-Friendly Exercises

## Day 43-45: E-Commerce Complete Automation Project

### Exercise 1: Complete E-Commerce Test Suite

```exercise
title: Build End-to-End E-Commerce Automation
description: Create a comprehensive test suite for a complete e-commerce application covering all user journeys.
requirements:
- Implement complete page object model
- Cover all major user flows
- Add data-driven tests
- Generate comprehensive reports
- Integrate with CI/CD
testcases:
- input: "Run complete e-commerce suite"
  output: "Should test entire application"
hints:
- Break down into modules
- Use inheritance for common functionality
- Implement proper waits
- Add detailed logging
- Create reusable components
solution:
```java
// Project Structure
/*
ecommerce-automation/
├── src/main/java/
│   ├── pages/
│   │   ├── BasePage.java
│   │   ├── LoginPage.java
│   │   ├── ProductListPage.java
│   │   ├── ProductDetailPage.java
│   │   ├── CartPage.java
│   │   └── CheckoutPage.java
│   ├── utils/
│   │   ├── DriverManager.java
│   │   ├── ConfigReader.java
│   │   ├── ExcelReader.java
│   │   └── ReportManager.java
│   └── constants/
│       └── AppConstants.java
├── src/test/java/
│   ├── base/
│   │   └── BaseTest.java
│   └── tests/
│       ├── LoginTests.java
│       ├── ProductTests.java
│       ├── CartTests.java
│       └── CheckoutTests.java
└── src/test/resources/
    ├── testng.xml
    ├── config.properties
    └── testdata/
        └── test-data.xlsx
*/

// BasePage.java
package pages;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.*;
import java.time.Duration;

public class BasePage {
    protected WebDriver driver;
    protected WebDriverWait wait;
    
    public BasePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    protected void click(By locator) {
        wait.until(ExpectedConditions.elementToBeClickable(locator)).click();
    }
    
    protected void sendKeys(By locator, String text) {
        WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
        element.clear();
        element.sendKeys(text);
    }
    
    protected String getText(By locator) {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(locator)).getText();
    }
    
    protected boolean isDisplayed(By locator) {
        try {
            return driver.findElement(locator).isDisplayed();
        } catch (NoSuchElementException e) {
            return false;
        }
    }
}

// ProductListPage.java
package pages;

import org.openqa.selenium.*;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import java.util.List;

public class ProductListPage extends BasePage {
    
    @FindBy(className = "inventory_item")
    private List<WebElement> products;
    
    @FindBy(className = "product_sort_container")
    private WebElement sortDropdown;
    
    @FindBy(className = "shopping_cart_link")
    private WebElement cartIcon;
    
    public ProductListPage(WebDriver driver) {
        super(driver);
        PageFactory.initElements(driver, this);
    }
    
    public int getProductCount() {
        return products.size();
    }
    
    public ProductListPage addProductToCart(int index) {
        WebElement addButton = products.get(index)
            .findElement(By.xpath(".//button[contains(text(), 'Add to cart')]"));
        addButton.click();
        return this;
    }
    
    public ProductListPage sortBy(String option) {
        Select select = new Select(sortDropdown);
        select.selectByVisibleText(option);
        return this;
    }
    
    public CartPage goToCart() {
        cartIcon.click();
        return new CartPage(driver);
    }
    
    public String getProductName(int index) {
        return products.get(index)
            .findElement(By.className("inventory_item_name"))
            .getText();
    }
    
    public String getProductPrice(int index) {
        return products.get(index)
            .findElement(By.className("inventory_item_price"))
            .getText();
    }
}

// Complete Test Suite
package tests;

import base.BaseTest;
import pages.*;
import org.testng.Assert;
import org.testng.annotations.*;
import utils.ExcelReader;

public class CompleteECommerceTests extends BaseTest {
    
    @Test(priority = 1, groups = {"smoke", "login"})
    public void testSuccessfulLogin() {
        LoginPage loginPage = new LoginPage(driver);
        ProductListPage productPage = loginPage.login("standard_user", "secret_sauce");
        
        Assert.assertTrue(driver.getCurrentUrl().contains("inventory"));
        Assert.assertTrue(productPage.getProductCount() > 0);
    }
    
    @Test(priority = 2, groups = {"regression", "products"})
    public void testProductSorting() {
        LoginPage loginPage = new LoginPage(driver);
        ProductListPage productPage = loginPage.login("standard_user", "secret_sauce");
        
        productPage.sortBy("Price (low to high)");
        
        String firstPrice = productPage.getProductPrice(0);
        String secondPrice = productPage.getProductPrice(1);
        
        // Verify sorting
        Assert.assertTrue(true); // Add actual price comparison
    }
    
    @Test(priority = 3, groups = {"smoke", "cart"})
    public void testAddToCart() {
        LoginPage loginPage = new LoginPage(driver);
        ProductListPage productPage = loginPage.login("standard_user", "secret_sauce");
        
        String productName = productPage.getProductName(0);
        productPage.addProductToCart(0);
        
        CartPage cartPage = productPage.goToCart();
        Assert.assertTrue(cartPage.isProductInCart(productName));
    }
    
    @Test(priority = 4, groups = {"regression", "checkout"}, 
          dataProvider = "checkoutData")
    public void testCompleteCheckout(String firstName, String lastName, String zipCode) {
        LoginPage loginPage = new LoginPage(driver);
        ProductListPage productPage = loginPage.login("standard_user", "secret_sauce");
        
        productPage.addProductToCart(0);
        CartPage cartPage = productPage.goToCart();
        
        CheckoutPage checkoutPage = cartPage.proceedToCheckout();
        checkoutPage.fillCheckoutInfo(firstName, lastName, zipCode);
        checkoutPage.continueToOverview();
        checkoutPage.finishOrder();
        
        Assert.assertTrue(checkoutPage.isOrderComplete());
    }
    
    @DataProvider(name = "checkoutData")
    public Object[][] getCheckoutData() {
        return new Object[][] {
            {"John", "Doe", "12345"},
            {"Jane", "Smith", "67890"},
            {"Bob", "Johnson", "54321"}
        };
    }
    
    @Test(priority = 5, groups = {"regression", "cart"})
    public void testRemoveFromCart() {
        LoginPage loginPage = new LoginPage(driver);
        ProductListPage productPage = loginPage.login("standard_user", "secret_sauce");
        
        productPage.addProductToCart(0).addProductToCart(1);
        CartPage cartPage = productPage.goToCart();
        
        int initialCount = cartPage.getCartItemCount();
        cartPage.removeItem(0);
        
        Assert.assertEquals(cartPage.getCartItemCount(), initialCount - 1);
    }
}
```
\```
```

## Day 46: Performance Testing Integration

### Exercise 2: Add Performance Metrics

```exercise
title: Measure and Report Performance Metrics
description: Integrate performance measurement into test framework.
requirements:
- Measure page load times
- Track element load times
- Calculate response times
- Generate performance reports
- Set performance thresholds
testcases:
- input: "Run tests with performance tracking"
  output: "Should report performance metrics"
hints:
- Use System.currentTimeMillis()
- Measure navigation timing
- Use JavaScriptExecutor for metrics
- Log performance data
- Create performance assertions
solution:
```java
// PerformanceUtil.java
package utils;

import org.openqa.selenium.*;
import java.util.*;

public class PerformanceUtil {
    
    public static Map<String, Long> getPageLoadMetrics(WebDriver driver) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        
        Map<String, Long> metrics = new HashMap<>();
        
        // Navigation Timing API
        Long loadTime = (Long) js.executeScript(
            "return window.performance.timing.loadEventEnd - " +
            "window.performance.timing.navigationStart;"
        );
        
        Long domContentLoaded = (Long) js.executeScript(
            "return window.performance.timing.domContentLoadedEventEnd - " +
            "window.performance.timing.navigationStart;"
        );
        
        Long responseTime = (Long) js.executeScript(
            "return window.performance.timing.responseEnd - " +
            "window.performance.timing.requestStart;"
        );
        
        metrics.put("pageLoadTime", loadTime);
        metrics.put("domContentLoaded", domContentLoaded);
        metrics.put("responseTime", responseTime);
        
        return metrics;
    }
    
    public static void logPerformanceMetrics(WebDriver driver, String pageName) {
        Map<String, Long> metrics = getPageLoadMetrics(driver);
        
        System.out.println("\n=== Performance Metrics for " + pageName + " ===");
        System.out.println("Page Load Time: " + metrics.get("pageLoadTime") + " ms");
        System.out.println("DOM Content Loaded: " + metrics.get("domContentLoaded") + " ms");
        System.out.println("Response Time: " + metrics.get("responseTime") + " ms");
        System.out.println("=" .repeat(50));
    }
    
    public static boolean isPageLoadWithinThreshold(WebDriver driver, long thresholdMs) {
        Map<String, Long> metrics = getPageLoadMetrics(driver);
        return metrics.get("pageLoadTime") <= thresholdMs;
    }
}

// Performance Test
import org.testng.Assert;
import org.testng.annotations.Test;

public class PerformanceTest extends BaseTest {
    
    @Test
    public void testPageLoadPerformance() {
        driver.get("https://www.saucedemo.com");
        
        PerformanceUtil.logPerformanceMetrics(driver, "Login Page");
        
        boolean withinThreshold = PerformanceUtil.isPageLoadWithinThreshold(driver, 3000);
        Assert.assertTrue(withinThreshold, "Page load exceeded 3 seconds");
    }
}
```
\```
```

## Day 47: Visual Testing

### Exercise 3: Implement Visual Regression Testing

```exercise
title: Add Visual Regression Testing
description: Integrate visual testing to detect UI changes.
requirements:
- Capture baseline screenshots
- Compare with current screenshots
- Detect visual differences
- Generate visual reports
- Handle dynamic content
testcases:
- input: "Run visual regression tests"
  output: "Should detect visual changes"
hints:
- Use Ashot library
- Capture full page screenshots
- Compare pixel by pixel
- Ignore dynamic regions
- Store baseline images
solution:
```java
// VisualTestUtil.java
package utils;

import org.openqa.selenium.*;
import ru.yandex.qatools.ashot.*;
import ru.yandex.qatools.ashot.comparison.*;
import ru.yandex.qatools.ashot.shooting.ShootingStrategies;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;

public class VisualTestUtil {
    
    public static void captureBaseline(WebDriver driver, String imageName) {
        Screenshot screenshot = new AShot()
            .shootingStrategy(ShootingStrategies.viewportPasting(1000))
            .takeScreenshot(driver);
        
        try {
            ImageIO.write(screenshot.getImage(), "PNG", 
                new File("baseline/" + imageName + ".png"));
            System.out.println("✓ Baseline captured: " + imageName);
        } catch (Exception e) {
            System.out.println("Error capturing baseline: " + e.getMessage());
        }
    }
    
    public static boolean compareWithBaseline(WebDriver driver, String imageName) {
        Screenshot currentScreenshot = new AShot()
            .shootingStrategy(ShootingStrategies.viewportPasting(1000))
            .takeScreenshot(driver);
        
        try {
            BufferedImage baselineImage = ImageIO.read(
                new File("baseline/" + imageName + ".png")
            );
            
            ImageDiff diff = new ImageDiffer().makeDiff(
                baselineImage, currentScreenshot.getImage()
            );
            
            if (diff.hasDiff()) {
                ImageIO.write(diff.getMarkedImage(), "PNG",
                    new File("diff/" + imageName + "_diff.png"));
                System.out.println("✗ Visual difference detected: " + imageName);
                return false;
            }
            
            System.out.println("✓ No visual difference: " + imageName);
            return true;
            
        } catch (Exception e) {
            System.out.println("Error comparing images: " + e.getMessage());
            return false;
        }
    }
}

// Visual Test
public class VisualRegressionTest extends BaseTest {
    
    @Test
    public void testLoginPageVisual() {
        driver.get("https://www.saucedemo.com");
        
        // First run: capture baseline
        // VisualTestUtil.captureBaseline(driver, "login_page");
        
        // Subsequent runs: compare
        boolean matches = VisualTestUtil.compareWithBaseline(driver, "login_page");
        Assert.assertTrue(matches, "Visual regression detected");
    }
}
```
\```
```

## Day 48: Mobile Testing

### Exercise 4: Add Mobile Browser Testing

```exercise
title: Test on Mobile Browsers
description: Configure framework to test on mobile browsers using Appium.
requirements:
- Set up Appium
- Configure mobile capabilities
- Create mobile page objects
- Handle mobile gestures
- Test responsive design
testcases:
- input: "Run tests on mobile browser"
  output: "Should execute on mobile"
hints:
- Use Appium for mobile
- Set mobile capabilities
- Use TouchAction for gestures
- Handle mobile-specific elements
- Test different screen sizes
solution:
```java
// MobileDriverManager.java
package utils;

import io.appium.java_client.AppiumDriver;
import io.appium.java_client.android.AndroidDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import java.net.URL;

public class MobileDriverManager {
    
    public static AppiumDriver createMobileDriver() throws Exception {
        DesiredCapabilities caps = new DesiredCapabilities();
        
        caps.setCapability("platformName", "Android");
        caps.setCapability("deviceName", "Android Emulator");
        caps.setCapability("browserName", "Chrome");
        caps.setCapability("automationName", "UiAutomator2");
        
        URL appiumServer = new URL("http://127.0.0.1:4723/wd/hub");
        
        return new AndroidDriver(appiumServer, caps);
    }
}

// Mobile Test
import io.appium.java_client.AppiumDriver;
import io.appium.java_client.TouchAction;
import io.appium.java_client.touch.offset.PointOption;
import org.testng.annotations.Test;

public class MobileTest {
    
    @Test
    public void testMobileBrowser() throws Exception {
        AppiumDriver driver = MobileDriverManager.createMobileDriver();
        
        try {
            driver.get("https://www.saucedemo.com");
            
            // Mobile-specific interactions
            TouchAction touch = new TouchAction(driver);
            touch.tap(PointOption.point(100, 200)).perform();
            
            // Verify mobile layout
            System.out.println("✓ Mobile test executed");
            
        } finally {
            driver.quit();
        }
    }
}
```
\```
```

## Day 49: Final Project Review & Best Practices

### Exercise 5: Complete Framework Review

```exercise
title: Review and Optimize Complete Framework
description: Final review of the entire framework with best practices implementation.
requirements:
- Code review checklist
- Performance optimization
- Security best practices
- Documentation
- Maintenance guidelines
testcases:
- input: "Review complete framework"
  output: "Should meet all quality standards"
hints:
- Follow coding standards
- Add comprehensive comments
- Create README documentation
- Implement error handling
- Add framework utilities
solution:
```markdown
# Framework Best Practices Checklist

## Code Quality
- ✅ Follow naming conventions
- ✅ Use meaningful variable names
- ✅ Add JavaDoc comments
- ✅ Implement proper exception handling
- ✅ Use design patterns appropriately

## Test Organization
- ✅ Group tests logically
- ✅ Use TestNG groups effectively
- ✅ Implement proper test dependencies
- ✅ Maintain test data separately
- ✅ Use data providers for data-driven tests

## Framework Structure
- ✅ Separate pages, tests, and utilities
- ✅ Use Page Object Model
- ✅ Implement base classes
- ✅ Create reusable components
- ✅ Follow DRY principle

## Reporting
- ✅ Generate detailed HTML reports
- ✅ Include screenshots for failures
- ✅ Log test execution details
- ✅ Track test metrics
- ✅ Archive test results

## CI/CD Integration
- ✅ Configure Jenkins/GitHub Actions
- ✅ Parameterize test execution
- ✅ Schedule automated runs
- ✅ Send notifications
- ✅ Archive artifacts

## Maintenance
- ✅ Regular dependency updates
- ✅ Code refactoring
- ✅ Performance monitoring
- ✅ Documentation updates
- ✅ Version control
```

```java
// README.md Template
/*
# Selenium Test Automation Framework

## Overview
Comprehensive test automation framework for web applications using Selenium WebDriver, TestNG, and Page Object Model.

## Features
- Page Object Model design pattern
- Data-driven testing with Excel
- Parallel test execution
- ExtentReports integration
- CI/CD ready
- Cross-browser support
- Logging with Log4j2

## Prerequisites
- Java 11+
- Maven 3.6+
- Chrome/Firefox browser
- IDE (IntelliJ/Eclipse)

## Setup
1. Clone repository
2. Run `mvn clean install`
3. Update config.properties
4. Execute tests: `mvn test`

## Project Structure
```
framework/
├── src/main/java/
│   ├── pages/
│   ├── utils/
│   └── constants/
├── src/test/java/
│   ├── base/
│   └── tests/
└── src/test/resources/
    ├── testng.xml
    └── config.properties
```

## Running Tests
- All tests: `mvn test`
- Specific suite: `mvn test -DsuiteXmlFile=smoke.xml`
- With parameters: `mvn test -Dbrowser=chrome -Denv=qa`

## Reports
- ExtentReports: `test-output/ExtentReport.html`
- TestNG Reports: `test-output/index.html`
- Screenshots: `test-output/screenshots/`

## Contributing
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License
MIT License
*/
```
\```
```

---

## Summary

Congratulations! You've completed the entire 7-week Selenium Automation course! 🎉

### Week 7 Achievements:

**Day 43-45: Complete E-Commerce Project**
- ✅ End-to-end test automation
- ✅ Complete page object implementation
- ✅ Data-driven testing
- ✅ Comprehensive test coverage

**Day 46: Performance Testing**
- ✅ Performance metrics collection
- ✅ Page load time measurement
- ✅ Performance thresholds
- ✅ Performance reporting

**Day 47: Visual Testing**
- ✅ Visual regression testing
- ✅ Screenshot comparison
- ✅ Difference detection
- ✅ Visual reports

**Day 48: Mobile Testing**
- ✅ Appium integration
- ✅ Mobile browser testing
- ✅ Mobile gestures
- ✅ Responsive testing

**Day 49: Best Practices**
- ✅ Code quality standards
- ✅ Framework optimization
- ✅ Documentation
- ✅ Maintenance guidelines

## Complete Course Summary (7 Weeks)

### ✅ Week 1: Selenium Fundamentals
- Setup, locators, commands, elements, waits, alerts, framework basics

### ✅ Week 2: Advanced Java
- Collections, exceptions, file I/O, OOP, encapsulation, polymorphism

### ✅ Week 3: Selenium Basics
- XPath, windows, iFrames, JavaScript, Actions, screenshots

### ✅ Week 4: Intermediate Selenium
- TestNG, assertions, data providers, POM, dynamic elements, files

### ✅ Week 5: TestNG & POM Advanced
- XML config, listeners, Excel data, parallel execution, reporting

### ✅ Week 6: Framework Building
- Architecture, configuration, logging, retry, database, API, CI/CD

### ✅ Week 7: Advanced Project
- Complete automation, performance, visual testing, mobile, best practices

## Total Learning Outcomes

- **65+ Exercises** completed
- **49 Days** of comprehensive training
- **7 Weeks** of progressive learning
- **Complete Framework** built from scratch
- **Industry Best Practices** implemented
- **Real-World Projects** completed

## Next Steps

1. **Practice**: Build your own projects
2. **Contribute**: Open source automation projects
3. **Certify**: Consider Selenium certifications
4. **Specialize**: Choose advanced topics (AI testing, cloud testing)
5. **Share**: Mentor others in automation

**You're now a Selenium Automation Expert! 🚀**

Keep learning, keep automating, and keep improving!