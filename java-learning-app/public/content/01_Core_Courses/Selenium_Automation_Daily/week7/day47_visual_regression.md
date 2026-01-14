# Day 47: Visual Regression Testing

## Learning Objectives

By the end of this lesson, you will be able to:
- Understand visual regression testing concepts
- Use Ashot for screenshot comparison
- Implement Percy for visual testing
- Leverage Applitools Eyes for AI-powered testing
- Create baseline images
- Handle dynamic content in visual tests
- Integrate visual testing in CI/CD

---

## 1. Introduction to Visual Regression Testing

### 1.1 What is Visual Regression?

**Definition:**
Visual regression testing detects unintended visual changes in your application's UI by comparing screenshots.

**Why Visual Testing?**
```
✓ Catches CSS/layout bugs
✓ Detects cross-browser rendering issues
✓ Identifies responsive design problems
✓ Validates UI consistency
✓ Automates visual QA
✓ Reduces manual testing effort
```

**Common Use Cases:**
- CSS changes verification
- Cross-browser compatibility
- Responsive design validation
- Theme/branding consistency
- Localization testing

---

## 2. Ashot - Screenshot Utility

### 2.1 Setup

```xml
<!-- pom.xml -->
<dependency>
    <groupId>ru.yandex.qatools.ashot</groupId>
    <artifactId>ashot</artifactId>
    <version>1.5.4</version>
</dependency>
```

### 2.2 Basic Screenshot Capture

```java
import ru.yandex.qatools.ashot.AShot;
import ru.yandex.qatools.ashot.Screenshot;
import ru.yandex.qatools.ashot.shooting.ShootingStrategies;
import javax.imageio.ImageIO;
import java.io.File;

public class AshotExample {
    
    @Test
    public void captureFullPageScreenshot() throws Exception {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com");
        
        // Capture full page screenshot
        Screenshot screenshot = new AShot()
            .shootingStrategy(ShootingStrategies.viewportPasting(1000))
            .takeScreenshot(driver);
        
        // Save screenshot
        ImageIO.write(screenshot.getImage(), "PNG", 
            new File("screenshots/fullpage.png"));
        
        driver.quit();
    }
    
    @Test
    public void captureElementScreenshot() throws Exception {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com");
        
        WebElement element = driver.findElement(By.id("header"));
        
        // Capture element screenshot
        Screenshot screenshot = new AShot()
            .takeScreenshot(driver, element);
        
        ImageIO.write(screenshot.getImage(), "PNG", 
            new File("screenshots/element.png"));
        
        driver.quit();
    }
}
```

### 2.3 Screenshot Comparison

```java
import ru.yandex.qatools.ashot.comparison.ImageDiff;
import ru.yandex.qatools.ashot.comparison.ImageDiffer;

public class ScreenshotComparison {
    
    @Test
    public void compareScreenshots() throws Exception {
        // Load baseline and current screenshots
        BufferedImage baseline = ImageIO.read(
            new File("screenshots/baseline.png")
        );
        BufferedImage current = ImageIO.read(
            new File("screenshots/current.png")
        );
        
        // Compare images
        ImageDiffer imgDiff = new ImageDiffer();
        ImageDiff diff = imgDiff.makeDiff(baseline, current);
        
        // Check if images are different
        if (diff.hasDiff()) {
            System.out.println("Visual differences detected!");
            
            // Save diff image
            ImageIO.write(diff.getMarkedImage(), "PNG", 
                new File("screenshots/diff.png"));
            
            // Get difference percentage
            int diffSize = diff.getDiffSize();
            System.out.println("Difference pixels: " + diffSize);
            
            Assert.fail("Visual regression detected");
        } else {
            System.out.println("No visual differences");
        }
    }
}
```

---

## 3. Percy Visual Testing

### 3.1 Setup

```xml
<!-- pom.xml -->
<dependency>
    <groupId>io.percy</groupId>
    <artifactId>percy-java-selenium</artifactId>
    <version>1.0.0</version>
</dependency>
```

```java
import io.percy.selenium.Percy;

public class PercyTest {
    
    private WebDriver driver;
    private Percy percy;
    
    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        percy = new Percy(driver);
    }
    
    @Test
    public void testHomePage() {
        driver.get("https://example.com");
        
        // Take Percy snapshot
        percy.snapshot("Home Page");
    }
    
    @Test
    public void testResponsiveDesign() {
        driver.get("https://example.com");
        
        // Take snapshots at different widths
        percy.snapshot("Home - Desktop", 
            new PercyOptions().widths(Arrays.asList(1280)));
        percy.snapshot("Home - Tablet", 
            new PercyOptions().widths(Arrays.asList(768)));
        percy.snapshot("Home - Mobile", 
            new PercyOptions().widths(Arrays.asList(375)));
    }
    
    @AfterMethod
    public void teardown() {
        driver.quit();
    }
}
```

### 3.2 Advanced Percy Options

```java
public class PercyAdvanced {
    
    @Test
    public void testWithOptions() {
        driver.get("https://example.com");
        
        PercyOptions options = new PercyOptions()
            .widths(Arrays.asList(375, 768, 1280))
            .minHeight(1024)
            .percyCSS(".dynamic-content { display: none; }")
            .enableJavaScript(true);
        
        percy.snapshot("Page with Options", options);
    }
    
    @Test
    public void testWithIgnoreRegions() {
        driver.get("https://example.com");
        
        // Ignore dynamic regions
        PercyOptions options = new PercyOptions()
            .ignoreRegions(Arrays.asList(
                "#timestamp",
                ".advertisement",
                "[data-dynamic='true']"
            ));
        
        percy.snapshot("Page with Ignored Regions", options);
    }
}
```

---

## 4. Applitools Eyes

### 4.1 Setup

```xml
<!-- pom.xml -->
<dependency>
    <groupId>com.applitools</groupId>
    <artifactId>eyes-selenium-java5</artifactId>
    <version>5.15.0</version>
</dependency>
```

### 4.2 Basic Usage

```java
import com.applitools.eyes.selenium.Eyes;
import com.applitools.eyes.RectangleSize;

public class ApplitoolsTest {
    
    private Eyes eyes;
    private WebDriver driver;
    
    @BeforeMethod
    public void setup() {
        eyes = new Eyes();
        eyes.setApiKey("YOUR_API_KEY");
        
        driver = new ChromeDriver();
    }
    
    @Test
    public void testVisualRegression() {
        try {
            // Start the test
            eyes.open(driver, "My App", "Home Page Test", 
                new RectangleSize(1024, 768));
            
            driver.get("https://example.com");
            
            // Visual checkpoint
            eyes.checkWindow("Home Page");
            
            // Click and check again
            driver.findElement(By.id("menu")).click();
            eyes.checkWindow("Menu Opened");
            
            // End the test
            eyes.close();
        } finally {
            eyes.abortIfNotClosed();
            driver.quit();
        }
    }
}
```

### 4.3 Advanced Applitools Features

```java
import com.applitools.eyes.MatchLevel;
import com.applitools.eyes.selenium.fluent.Target;

public class ApplitoolsAdvanced {
    
    @Test
    public void testWithMatchLevel() {
        eyes.setMatchLevel(MatchLevel.LAYOUT);
        eyes.open(driver, "My App", "Layout Test");
        
        driver.get("https://example.com");
        eyes.checkWindow("Layout Check");
        
        eyes.close();
    }
    
    @Test
    public void testWithRegions() {
        eyes.open(driver, "My App", "Region Test");
        driver.get("https://example.com");
        
        // Check specific region
        eyes.check("Header", Target.region(By.id("header")));
        
        // Check with ignore regions
        eyes.check("Full Page", 
            Target.window()
                .ignore(By.className("ad"))
                .ignore(By.id("timestamp"))
        );
        
        eyes.close();
    }
    
    @Test
    public void testResponsive() {
        eyes.open(driver, "My App", "Responsive Test");
        driver.get("https://example.com");
        
        // Check across multiple viewports
        eyes.check("Responsive", 
            Target.window()
                .fully()
                .layoutBreakpoints(true)
        );
        
        eyes.close();
    }
}
```

---

## 5. Handling Dynamic Content

### 5.1 Ignore Regions

```java
public class DynamicContentHandling {
    
    @Test
    public void ignoreTimestamps() {
        driver.get("https://example.com");
        
        // Using Ashot
        Screenshot screenshot = new AShot()
            .coordsProvider(new WebDriverCoordsProvider())
            .ignoredElements(
                driver.findElement(By.className("timestamp")),
                driver.findElement(By.id("random-ad"))
            )
            .takeScreenshot(driver);
    }
    
    @Test
    public void ignoreWithCSS() {
        driver.get("https://example.com");
        
        // Using Percy
        PercyOptions options = new PercyOptions()
            .percyCSS(
                ".timestamp { visibility: hidden; }" +
                ".advertisement { display: none; }"
            );
        
        percy.snapshot("Page without dynamic content", options);
    }
}
```

### 5.2 Wait for Stability

```java
public class WaitForStability {
    
    @Test
    public void waitForAnimations() {
        driver.get("https://example.com");
        
        // Wait for animations to complete
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.invisibilityOfElementLocated(
            By.className("loading-spinner")
        ));
        
        // Wait for specific element to be stable
        wait.until(driver -> {
            WebElement element = driver.findElement(By.id("content"));
            String height1 = element.getCssValue("height");
            try { Thread.sleep(100); } catch (Exception e) {}
            String height2 = element.getCssValue("height");
            return height1.equals(height2);
        });
        
        // Now take screenshot
        percy.snapshot("Stable Page");
    }
}
```

---

## 6. Visual Testing Framework

### 6.1 Base Test Class

```java
public class VisualTestBase {
    
    protected WebDriver driver;
    protected Percy percy;
    protected Eyes eyes;
    
    @BeforeMethod
    public void setupVisualTesting() {
        driver = new ChromeDriver();
        
        // Setup Percy
        percy = new Percy(driver);
        
        // Setup Applitools
        eyes = new Eyes();
        eyes.setApiKey(System.getenv("APPLITOOLS_API_KEY"));
        eyes.setBatch(new BatchInfo("Visual Regression Suite"));
    }
    
    @AfterMethod
    public void teardownVisualTesting() {
        if (eyes != null) {
            eyes.abortIfNotClosed();
        }
        if (driver != null) {
            driver.quit();
        }
    }
    
    protected void visualCheck(String name) {
        // Take Percy snapshot
        percy.snapshot(name);
        
        // Take Applitools checkpoint
        if (eyes.getIsOpen()) {
            eyes.checkWindow(name);
        }
    }
}
```

### 6.2 Page Object with Visual Testing

```java
public class HomePage extends VisualTestBase {
    
    @FindBy(id = "header")
    private WebElement header;
    
    @FindBy(id = "content")
    private WebElement content;
    
    public HomePage(WebDriver driver) {
        PageFactory.initElements(driver, this);
    }
    
    public void verifyHeaderVisually() {
        visualCheck("Home Page Header");
    }
    
    public void verifyFullPage() {
        visualCheck("Home Page Full");
    }
    
    public void verifyResponsive() {
        PercyOptions options = new PercyOptions()
            .widths(Arrays.asList(375, 768, 1280));
        percy.snapshot("Home Page Responsive", options);
    }
}
```

---

## 7. CI/CD Integration

### 7.1 Jenkins Pipeline

```groovy
pipeline {
    agent any
    
    environment {
        PERCY_TOKEN = credentials('percy-token')
        APPLITOOLS_API_KEY = credentials('applitools-key')
    }
    
    stages {
        stage('Visual Tests') {
            steps {
                sh '''
                    export PERCY_TOKEN=$PERCY_TOKEN
                    export APPLITOOLS_API_KEY=$APPLITOOLS_API_KEY
                    mvn clean test -Dtest=VisualTests
                '''
            }
        }
        
        stage('Percy Build') {
            steps {
                sh 'npx percy finalize'
            }
        }
    }
    
    post {
        always {
            publishHTML([
                reportDir: 'target/percy-screenshots',
                reportFiles: 'index.html',
                reportName: 'Percy Report'
            ])
        }
    }
}
```

### 7.2 GitHub Actions

```yaml
name: Visual Regression Tests

on: [push, pull_request]

jobs:
  visual-tests:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Set up JDK
      uses: actions/setup-java@v2
      with:
        java-version: '11'
    
    - name: Run Visual Tests
      env:
        PERCY_TOKEN: ${{ secrets.PERCY_TOKEN }}
        APPLITOOLS_API_KEY: ${{ secrets.APPLITOOLS_API_KEY }}
      run: mvn clean test -Dtest=VisualTests
    
    - name: Upload Screenshots
      if: failure()
      uses: actions/upload-artifact@v2
      with:
        name: screenshots
        path: target/screenshots/
```

---

## 8. Best Practices

### 8.1 Baseline Management

```java
public class BaselineManagement {
    
    @Test
    public void createBaseline() {
        driver.get("https://example.com");
        
        // Create baseline screenshot
        Screenshot baseline = new AShot()
            .shootingStrategy(ShootingStrategies.viewportPasting(1000))
            .takeScreenshot(driver);
        
        // Save with version
        String version = "v1.0.0";
        ImageIO.write(baseline.getImage(), "PNG", 
            new File("baselines/" + version + "/homepage.png"));
    }
    
    @Test
    public void updateBaseline() {
        // Only update baseline when intentional changes are made
        if (System.getProperty("updateBaseline", "false").equals("true")) {
            createBaseline();
        }
    }
}
```

### 8.2 Test Organization

```java
@Test(groups = {"visual", "smoke"})
public void visualSmokeTest() {
    // Critical visual tests
}

@Test(groups = {"visual", "regression"})
public void visualRegressionTest() {
    // Comprehensive visual tests
}

@Test(groups = {"visual", "responsive"})
public void responsiveVisualTest() {
    // Responsive design tests
}
```

---

## 9. Troubleshooting

### 9.1 Common Issues

```java
public class VisualTestTroubleshooting {
    
    // Issue: Flaky tests due to animations
    @Test
    public void handleAnimations() {
        driver.get("https://example.com");
        
        // Disable animations with CSS
        ((JavascriptExecutor) driver).executeScript(
            "document.querySelectorAll('*').forEach(el => {" +
            "  el.style.transition = 'none !important';" +
            "  el.style.animation = 'none !important';" +
            "});"
        );
        
        percy.snapshot("No Animations");
    }
    
    // Issue: Font rendering differences
    @Test
    public void handleFonts() {
        // Wait for fonts to load
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(driver -> 
            ((JavascriptExecutor) driver).executeScript(
                "return document.fonts.ready"
            )
        );
        
        percy.snapshot("Fonts Loaded");
    }
    
    // Issue: Scrollbar differences
    @Test
    public void hideScrollbars() {
        ((JavascriptExecutor) driver).executeScript(
            "document.body.style.overflow = 'hidden';"
        );
        
        percy.snapshot("No Scrollbars");
    }
}
```

---

## 10. Key Takeaways

1. **Visual regression catches UI bugs automatically**
2. **Multiple tools available (Ashot, Percy, Applitools)**
3. **Handle dynamic content with ignore regions**
4. **Integrate visual tests in CI/CD pipeline**
5. **Maintain baselines properly**
6. **Use AI-powered tools for smart comparisons**

---

## 11. Practice Exercises

### Exercise 1: Basic Screenshot Comparison
Implement screenshot comparison using Ashot.

### Exercise 2: Percy Integration
Set up Percy and create responsive snapshots.

### Exercise 3: Applitools Testing
Use Applitools Eyes for AI-powered visual testing.

### Exercise 4: Dynamic Content Handling
Handle timestamps and ads in visual tests.

### Exercise 5: CI/CD Integration
Integrate visual tests in your CI/CD pipeline.

---

## Navigation

- **Previous:** [Day 46: Cloud Testing Platforms](./day46_cloud_testing.md)
- **Next:** [Day 48: Test Maintenance & Optimization](./day48_test_maintenance.md)
- **Week 7 Home:** [Week 7 Overview](./README.md)

---

**Congratulations!** You've learned visual regression testing. Visual testing ensures UI consistency and catches visual bugs automatically!

**Next:** Learn test maintenance and optimization strategies.