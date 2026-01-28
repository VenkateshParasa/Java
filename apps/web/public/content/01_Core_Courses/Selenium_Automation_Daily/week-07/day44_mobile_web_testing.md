# Day 44: Mobile Web Testing & Responsive Design

## Learning Objectives

By the end of this lesson, you will be able to:
- Test responsive web designs
- Emulate mobile devices in desktop browsers
- Handle mobile-specific scenarios
- Test across different screen sizes
- Validate mobile user experience
- Use Chrome DevTools for mobile testing
- Implement mobile testing strategies

---

## 1. Introduction to Mobile Web Testing

### 1.1 Why Mobile Web Testing?

**Statistics:**
- Over 60% of web traffic comes from mobile devices
- Mobile-first design is now standard
- Different user behaviors on mobile vs desktop
- Touch interactions vs mouse clicks
- Smaller screens require different layouts

**Key Differences:**
```
Desktop vs Mobile:
- Screen size and resolution
- Input methods (mouse vs touch)
- Network conditions
- Browser capabilities
- Performance constraints
```

### 1.2 Mobile Testing Approaches

**1. Real Device Testing:**
- Most accurate
- Expensive and time-consuming
- Limited device coverage

**2. Emulation/Simulation:**
- Fast and cost-effective
- Good for initial testing
- May miss device-specific issues

**3. Cloud-Based Testing:**
- Access to many devices
- Scalable solution
- Requires internet connection

---

## 2. Chrome DevTools Mobile Emulation

### 2.1 Using Chrome DevTools

**Manual Emulation:**
```java
// Open Chrome DevTools
// Press F12 or Ctrl+Shift+I
// Click device toolbar icon or Ctrl+Shift+M
// Select device from dropdown
```

**Programmatic Emulation:**
```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import java.util.HashMap;
import java.util.Map;

public class MobileEmulation {
    
    public static WebDriver setupMobileEmulation(String deviceName) {
        ChromeOptions options = new ChromeOptions();
        
        // Method 1: Using device name
        Map<String, String> mobileEmulation = new HashMap<>();
        mobileEmulation.put("deviceName", deviceName);
        options.setExperimentalOption("mobileEmulation", mobileEmulation);
        
        return new ChromeDriver(options);
    }
    
    public static WebDriver setupCustomMobileEmulation(int width, int height, double pixelRatio) {
        ChromeOptions options = new ChromeOptions();
        
        // Method 2: Custom device metrics
        Map<String, Object> deviceMetrics = new HashMap<>();
        deviceMetrics.put("width", width);
        deviceMetrics.put("height", height);
        deviceMetrics.put("pixelRatio", pixelRatio);
        
        Map<String, Object> mobileEmulation = new HashMap<>();
        mobileEmulation.put("deviceMetrics", deviceMetrics);
        mobileEmulation.put("userAgent", 
            "Mozilla/5.0 (Linux; Android 11) AppleWebKit/537.36");
        
        options.setExperimentalOption("mobileEmulation", mobileEmulation);
        
        return new ChromeDriver(options);
    }
}
```

### 2.2 Common Device Presets

```java
public class DevicePresets {
    
    public static WebDriver iPhone12Pro() {
        return MobileEmulation.setupMobileEmulation("iPhone 12 Pro");
    }
    
    public static WebDriver iPadPro() {
        return MobileEmulation.setupMobileEmulation("iPad Pro");
    }
    
    public static WebDriver pixel5() {
        return MobileEmulation.setupMobileEmulation("Pixel 5");
    }
    
    public static WebDriver galaxyS20() {
        return MobileEmulation.setupMobileEmulation("Galaxy S20");
    }
    
    // Custom devices
    public static WebDriver customMobile() {
        return MobileEmulation.setupCustomMobileEmulation(375, 667, 2.0);
    }
}
```

---

## 3. Responsive Design Testing

### 3.1 Testing Different Viewports

```java
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.Test;

public class ResponsiveTest {
    
    @Test
    public void testResponsiveLayout() {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com");
        
        // Test different screen sizes
        testViewport(driver, 320, 568, "iPhone SE");
        testViewport(driver, 375, 667, "iPhone 8");
        testViewport(driver, 414, 896, "iPhone 11 Pro Max");
        testViewport(driver, 768, 1024, "iPad");
        testViewport(driver, 1920, 1080, "Desktop");
        
        driver.quit();
    }
    
    private void testViewport(WebDriver driver, int width, int height, String device) {
        System.out.println("Testing on " + device + " (" + width + "x" + height + ")");
        
        // Set window size
        driver.manage().window().setSize(new Dimension(width, height));
        
        // Wait for layout to adjust
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        // Verify responsive elements
        verifyResponsiveElements(driver, device);
    }
    
    private void verifyResponsiveElements(WebDriver driver, String device) {
        // Check if mobile menu is visible on small screens
        // Check if desktop menu is visible on large screens
        // Verify image sizes
        // Check font sizes
        // Validate layout structure
    }
}
```

### 3.2 Breakpoint Testing

```java
public class BreakpointTest {
    
    private static final int[] BREAKPOINTS = {320, 480, 768, 1024, 1280, 1920};
    
    @Test
    public void testAllBreakpoints() {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com");
        
        for (int width : BREAKPOINTS) {
            testBreakpoint(driver, width);
        }
        
        driver.quit();
    }
    
    private void testBreakpoint(WebDriver driver, int width) {
        driver.manage().window().setSize(new Dimension(width, 800));
        
        // Take screenshot
        takeScreenshot(driver, "breakpoint_" + width);
        
        // Verify layout
        verifyLayout(driver, width);
    }
    
    private void verifyLayout(WebDriver driver, int width) {
        if (width < 768) {
            // Mobile layout checks
            Assert.assertTrue(isMobileMenuVisible(driver));
            Assert.assertFalse(isDesktopMenuVisible(driver));
        } else {
            // Desktop layout checks
            Assert.assertFalse(isMobileMenuVisible(driver));
            Assert.assertTrue(isDesktopMenuVisible(driver));
        }
    }
}
```

---

## 4. Touch Interactions

### 4.1 Simulating Touch Events

```java
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class TouchInteractions {
    
    private WebDriver driver;
    private JavascriptExecutor js;
    
    public TouchInteractions(WebDriver driver) {
        this.driver = driver;
        this.js = (JavascriptExecutor) driver;
    }
    
    // Simulate tap
    public void tap(WebElement element) {
        js.executeScript(
            "var event = new TouchEvent('touchstart', {" +
            "  bubbles: true," +
            "  cancelable: true," +
            "  view: window" +
            "});" +
            "arguments[0].dispatchEvent(event);",
            element
        );
    }
    
    // Simulate swipe
    public void swipe(WebElement element, String direction) {
        String script = 
            "var element = arguments[0];" +
            "var direction = arguments[1];" +
            "var touchStart = new TouchEvent('touchstart');" +
            "var touchMove = new TouchEvent('touchmove');" +
            "var touchEnd = new TouchEvent('touchend');" +
            "element.dispatchEvent(touchStart);" +
            "element.dispatchEvent(touchMove);" +
            "element.dispatchEvent(touchEnd);";
        
        js.executeScript(script, element, direction);
    }
    
    // Simulate pinch zoom
    public void pinchZoom(WebElement element, double scale) {
        String script = 
            "var element = arguments[0];" +
            "var scale = arguments[1];" +
            "element.style.transform = 'scale(' + scale + ')';";
        
        js.executeScript(script, element, scale);
    }
}
```

### 4.2 Mobile Gestures

```java
public class MobileGestures {
    
    private WebDriver driver;
    private JavascriptExecutor js;
    
    public MobileGestures(WebDriver driver) {
        this.driver = driver;
        this.js = (JavascriptExecutor) driver;
    }
    
    // Scroll on mobile
    public void scrollDown(int pixels) {
        js.executeScript("window.scrollBy(0, " + pixels + ")");
    }
    
    public void scrollToElement(WebElement element) {
        js.executeScript("arguments[0].scrollIntoView({behavior: 'smooth'});", element);
    }
    
    // Pull to refresh
    public void pullToRefresh() {
        js.executeScript(
            "window.scrollTo(0, -100);" +
            "setTimeout(function() { window.scrollTo(0, 0); }, 500);"
        );
    }
    
    // Horizontal swipe
    public void swipeLeft() {
        js.executeScript("window.scrollBy(100, 0)");
    }
    
    public void swipeRight() {
        js.executeScript("window.scrollBy(-100, 0)");
    }
}
```

---

## 5. Mobile-Specific Testing Scenarios

### 5.1 Hamburger Menu Testing

```java
public class HamburgerMenuTest {
    
    @Test
    public void testMobileMenu() {
        WebDriver driver = setupMobileDevice();
        driver.get("https://example.com");
        
        // Find hamburger menu
        WebElement hamburger = driver.findElement(By.className("hamburger-menu"));
        
        // Verify it's visible on mobile
        Assert.assertTrue(hamburger.isDisplayed(), "Hamburger menu should be visible");
        
        // Click to open menu
        hamburger.click();
        
        // Wait for menu to open
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        WebElement menu = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("mobile-menu"))
        );
        
        // Verify menu items
        List<WebElement> menuItems = menu.findElements(By.tagName("a"));
        Assert.assertTrue(menuItems.size() > 0, "Menu should have items");
        
        // Click menu item
        menuItems.get(0).click();
        
        // Verify navigation
        Assert.assertTrue(driver.getCurrentUrl().contains("expected-page"));
        
        driver.quit();
    }
}
```

### 5.2 Form Input on Mobile

```java
public class MobileFormTest {
    
    @Test
    public void testMobileFormInput() {
        WebDriver driver = setupMobileDevice();
        driver.get("https://example.com/form");
        
        // Test text input
        WebElement nameField = driver.findElement(By.id("name"));
        nameField.sendKeys("John Doe");
        
        // Verify input type for mobile keyboard
        String inputType = nameField.getAttribute("type");
        Assert.assertEquals(inputType, "text");
        
        // Test email input (should show email keyboard)
        WebElement emailField = driver.findElement(By.id("email"));
        Assert.assertEquals(emailField.getAttribute("type"), "email");
        emailField.sendKeys("john@example.com");
        
        // Test phone input (should show numeric keyboard)
        WebElement phoneField = driver.findElement(By.id("phone"));
        Assert.assertEquals(phoneField.getAttribute("type"), "tel");
        phoneField.sendKeys("1234567890");
        
        // Test date picker on mobile
        WebElement dateField = driver.findElement(By.id("date"));
        dateField.click();
        // Mobile date picker should appear
        
        // Submit form
        WebElement submitButton = driver.findElement(By.id("submit"));
        submitButton.click();
        
        // Verify submission
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        WebElement successMessage = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("success"))
        );
        Assert.assertTrue(successMessage.isDisplayed());
        
        driver.quit();
    }
}
```

### 5.3 Image Loading on Mobile

```java
public class MobileImageTest {
    
    @Test
    public void testResponsiveImages() {
        WebDriver driver = setupMobileDevice();
        driver.get("https://example.com");
        
        // Find images
        List<WebElement> images = driver.findElements(By.tagName("img"));
        
        for (WebElement image : images) {
            // Check if image has srcset for responsive images
            String srcset = image.getAttribute("srcset");
            if (srcset != null && !srcset.isEmpty()) {
                System.out.println("Image has responsive srcset: " + srcset);
            }
            
            // Verify image is loaded
            Boolean imageLoaded = (Boolean) ((JavascriptExecutor) driver)
                .executeScript("return arguments[0].complete && " +
                              "arguments[0].naturalHeight !== 0", image);
            
            Assert.assertTrue(imageLoaded, "Image should be loaded");
            
            // Check image dimensions
            int width = image.getSize().getWidth();
            int height = image.getSize().getHeight();
            System.out.println("Image size: " + width + "x" + height);
        }
        
        driver.quit();
    }
}
```

---

## 6. Performance Testing on Mobile

### 6.1 Page Load Time

```java
public class MobilePerformanceTest {
    
    @Test
    public void testMobilePageLoadTime() {
        WebDriver driver = setupMobileDevice();
        
        long startTime = System.currentTimeMillis();
        driver.get("https://example.com");
        long endTime = System.currentTimeMillis();
        
        long loadTime = endTime - startTime;
        System.out.println("Page load time: " + loadTime + "ms");
        
        // Mobile pages should load within 3 seconds
        Assert.assertTrue(loadTime < 3000, 
            "Page should load within 3 seconds on mobile");
        
        // Get performance metrics
        JavascriptExecutor js = (JavascriptExecutor) driver;
        Long domContentLoaded = (Long) js.executeScript(
            "return performance.timing.domContentLoadedEventEnd - " +
            "performance.timing.navigationStart;"
        );
        
        System.out.println("DOM Content Loaded: " + domContentLoaded + "ms");
        
        driver.quit();
    }
}
```

### 6.2 Network Throttling

```java
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.devtools.DevTools;
import org.openqa.selenium.devtools.v120.network.Network;
import org.openqa.selenium.devtools.v120.network.model.ConnectionType;

public class NetworkThrottling {
    
    @Test
    public void testWith3GNetwork() {
        ChromeDriver driver = new ChromeDriver();
        DevTools devTools = driver.getDevTools();
        devTools.createSession();
        
        // Enable network
        devTools.send(Network.enable(Optional.empty(), Optional.empty(), Optional.empty()));
        
        // Emulate 3G network
        devTools.send(Network.emulateNetworkConditions(
            false,  // offline
            100,    // latency (ms)
            750000, // download throughput (bytes/sec) - 750 KB/s
            250000, // upload throughput (bytes/sec) - 250 KB/s
            Optional.of(ConnectionType.CELLULAR3G)
        ));
        
        // Test page load with throttled network
        long startTime = System.currentTimeMillis();
        driver.get("https://example.com");
        long endTime = System.currentTimeMillis();
        
        System.out.println("Load time on 3G: " + (endTime - startTime) + "ms");
        
        driver.quit();
    }
}
```

---

## 7. Cross-Device Testing Strategy

### 7.1 Device Test Matrix

```java
public class DeviceTestMatrix {
    
    private static final String[][] DEVICES = {
        {"iPhone SE", "375x667"},
        {"iPhone 12", "390x844"},
        {"iPhone 12 Pro Max", "428x926"},
        {"iPad", "768x1024"},
        {"iPad Pro", "1024x1366"},
        {"Pixel 5", "393x851"},
        {"Galaxy S20", "360x800"},
        {"Galaxy Tab", "800x1280"}
    };
    
    @Test
    public void testAcrossDevices() {
        for (String[] device : DEVICES) {
            String deviceName = device[0];
            String[] dimensions = device[1].split("x");
            int width = Integer.parseInt(dimensions[0]);
            int height = Integer.parseInt(dimensions[1]);
            
            System.out.println("Testing on " + deviceName);
            testDevice(deviceName, width, height);
        }
    }
    
    private void testDevice(String deviceName, int width, int height) {
        WebDriver driver = MobileEmulation.setupCustomMobileEmulation(width, height, 2.0);
        
        try {
            driver.get("https://example.com");
            
            // Run device-specific tests
            verifyLayout(driver, deviceName);
            testNavigation(driver);
            testForms(driver);
            
            // Take screenshot
            takeScreenshot(driver, deviceName);
            
        } finally {
            driver.quit();
        }
    }
}
```

---

## 8. Best Practices

### 8.1 Mobile Testing Checklist

```
✓ Test on multiple screen sizes
✓ Verify touch interactions
✓ Check responsive images
✓ Test form inputs with mobile keyboards
✓ Verify hamburger menu functionality
✓ Test page load performance
✓ Check network throttling scenarios
✓ Verify orientation changes (portrait/landscape)
✓ Test with different pixel densities
✓ Validate mobile-specific features
```

### 8.2 Common Mobile Issues

```java
public class MobileIssueDetection {
    
    // Check for horizontal scrolling (usually unwanted)
    public boolean hasHorizontalScroll(WebDriver driver) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        Long scrollWidth = (Long) js.executeScript("return document.body.scrollWidth");
        Long clientWidth = (Long) js.executeScript("return document.body.clientWidth");
        return scrollWidth > clientWidth;
    }
    
    // Check for tiny tap targets
    public boolean hasTinyTapTargets(WebDriver driver) {
        List<WebElement> clickableElements = driver.findElements(
            By.cssSelector("a, button, input[type='button'], input[type='submit']")
        );
        
        for (WebElement element : clickableElements) {
            int width = element.getSize().getWidth();
            int height = element.getSize().getHeight();
            
            // Minimum recommended tap target size is 44x44 pixels
            if (width < 44 || height < 44) {
                System.out.println("Warning: Small tap target found - " + 
                                 width + "x" + height);
                return true;
            }
        }
        return false;
    }
    
    // Check for viewport meta tag
    public boolean hasViewportMetaTag(WebDriver driver) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        Object viewport = js.executeScript(
            "return document.querySelector('meta[name=\"viewport\"]');"
        );
        return viewport != null;
    }
}
```

---

## 9. Key Takeaways

1. **Mobile emulation** is cost-effective for initial testing
2. **Test multiple screen sizes** and breakpoints
3. **Touch interactions** differ from mouse clicks
4. **Performance matters** more on mobile
5. **Network conditions** affect mobile experience
6. **Real device testing** is still important for final validation

---

## 10. Practice Exercises

### Exercise 1: Responsive Layout Test
Create tests for 5 different screen sizes and verify layout changes.

### Exercise 2: Mobile Menu Test
Test hamburger menu functionality on mobile devices.

### Exercise 3: Form Input Test
Verify mobile keyboard types for different input fields.

### Exercise 4: Performance Test
Measure and compare page load times on mobile vs desktop.

### Exercise 5: Cross-Device Test
Create a test suite that runs on 3 different mobile devices.

---

## Common Mistakes

### 1. Testing Only on Desktop Emulation
- **Problem**: Relying solely on Chrome DevTools mobile emulation without testing on real devices
- **Why it's wrong**: Emulation doesn't capture device-specific issues like memory constraints, actual touch behavior, or hardware limitations
- **Correct approach**: Use emulation for rapid testing but validate critical flows on real devices or cloud-based device farms

### 2. Ignoring Touch Event Differences
- **Problem**: Assuming mouse click events work the same as touch tap events in automated tests
- **Why it's wrong**: Touch events have different timing, behavior, and event propagation compared to mouse events. Some elements may only respond to touch events
- **Correct approach**: Use appropriate touch simulation methods, test for touch-specific interactions like swipe and pinch, verify touch target sizes meet minimum standards (44x44 pixels)

### 3. Not Testing Different Screen Orientations
- **Problem**: Testing only in portrait mode without considering landscape orientation
- **Why it's wrong**: Many mobile users switch orientations, layouts may break, navigation patterns differ
- **Correct approach**: Test both portrait and landscape orientations, verify responsive layouts adapt correctly, ensure functionality works in both modes

### 4. Overlooking Mobile-Specific Form Inputs
- **Problem**: Not verifying that correct mobile keyboards appear (numeric, email, tel) for input fields
- **Why it's wrong**: Wrong keyboard types frustrate users and increase input errors
- **Correct approach**: Ensure input fields have correct type attributes (type="email", type="tel"), test that appropriate mobile keyboards appear

### 5. Not Handling Mobile Network Conditions
- **Problem**: Testing only on fast WiFi connections without simulating slower mobile networks
- **Why it's wrong**: Real mobile users often have poor connectivity (3G, 4G with weak signal), pages may timeout or behave differently
- **Correct approach**: Use network throttling in tests, simulate 3G and 4G conditions, verify app handles slow connections gracefully

### 6. Forgetting to Test Tap Target Sizes
- **Problem**: Not validating that clickable elements are large enough for finger taps
- **Why it's wrong**: Small tap targets (< 44x44 pixels) cause user frustration and accidental clicks
- **Correct approach**: Implement automated checks for minimum tap target sizes, verify spacing between clickable elements, test actual tap accuracy

### 7. Ignoring Viewport Meta Tag Validation
- **Problem**: Not verifying the viewport meta tag is present and correctly configured
- **Why it's wrong**: Missing or incorrect viewport settings cause layout issues, unintended zooming, and poor mobile experience
- **Correct approach**: Automatically verify viewport meta tag exists with correct settings, check that initial-scale and width are properly set

### 8. Not Testing Hamburger Menu Functionality
- **Problem**: Assuming desktop navigation works on mobile without testing mobile-specific menus
- **Why it's wrong**: Hamburger menus have different interaction patterns, may have animation issues, or JavaScript binding problems
- **Correct approach**: Explicitly test hamburger menu opening/closing, verify menu items are accessible, test navigation from mobile menu

---

## Interview Questions

### Basic Level

1. **Q: What is the difference between mobile web testing and mobile app testing?**
   - A: Mobile web testing involves testing websites accessed through mobile browsers, while mobile app testing involves testing native or hybrid applications installed on mobile devices. Mobile web tests use standard Selenium WebDriver, while app tests require tools like Appium.

2. **Q: How do you test responsive design in Selenium?**
   - A: By setting different browser window sizes using `driver.manage().window().setSize(new Dimension(width, height))` and verifying that layouts adjust appropriately for each viewport size.

3. **Q: What is the purpose of mobile emulation in Chrome DevTools?**
   - A: Mobile emulation allows testing mobile-specific features like touch interactions, device metrics, user agents, and screen sizes without needing actual mobile devices, making testing faster and more cost-effective.

### Intermediate Level

4. **Q: How do you implement mobile device emulation in Selenium?**
   - A: Using ChromeOptions with the `mobileEmulation` experimental option, you can specify either a device name (like "iPhone 12 Pro") or custom device metrics (width, height, pixel ratio, user agent) to emulate mobile devices.

5. **Q: What are breakpoints in responsive design testing and why are they important?**
   - A: Breakpoints are specific viewport widths where a website's layout changes to adapt to different screen sizes (typically 320px, 768px, 1024px, 1920px). Testing at these points ensures the site displays correctly across all device categories (mobile, tablet, desktop).

6. **Q: How do you handle touch interactions in Selenium for mobile web testing?**
   - A: By using JavascriptExecutor to dispatch touch events (touchstart, touchmove, touchend) or by using the Actions class with click methods. For advanced interactions, you can create custom JavaScript to simulate swipes, pinch-zoom, and tap gestures.

7. **Q: What challenges do you face when testing hamburger menus on mobile devices?**
   - A: Common challenges include: menu not visible on desktop, animations causing timing issues, click events not triggering properly on touch devices, and menu overlays blocking other elements. These require proper waits and sometimes JavaScript clicks.

### Advanced Level

8. **Q: How would you implement network throttling in Selenium to test mobile network conditions?**
   - A: Using Chrome DevTools Protocol (CDP) with Selenium 4, you can emulate network conditions like 3G or 4G using `devTools.send(Network.emulateNetworkConditions())` to test page load performance under slow network conditions common on mobile devices.

9. **Q: How do you create a cross-device testing strategy for mobile web applications?**
   - A: Create a device matrix covering popular devices (iPhone SE, iPhone 12, iPad, Pixel 5, Galaxy S20), implement parallel execution for efficiency, use cloud testing platforms for real device access, combine emulation for quick feedback with real device testing for validation, and prioritize devices based on user analytics.

10. **Q: How would you detect and handle mobile-specific issues like tiny tap targets or horizontal scrolling?**
    - A: Implement utility methods to check element dimensions (minimum 44x44 pixels for tap targets), use JavascriptExecutor to compare scrollWidth vs clientWidth to detect horizontal scrolling, validate viewport meta tags, and create custom assertions to verify mobile usability standards are met.

---

## Navigation

- **Previous:** [Day 43: Cross-Browser Testing](./day43_cross_browser_testing.md)
- **Next:** [Day 45: Docker & Containerization](./day45_docker_containerization.md)
- **Week 7 Home:** [Week 7 Overview](./README.md)

---

**Congratulations!** You've learned mobile web testing strategies. Mobile testing is crucial in today's mobile-first world!

**Next:** Learn about Docker and containerization for test automation.