# Day 43: Cross-Browser Testing & Selenium Grid

## Learning Objectives

By the end of this lesson, you will be able to:
- Understand the importance and challenges of cross-browser testing
- Set up and configure different browsers (Chrome, Firefox, Edge, Safari)
- Configure browser-specific options and capabilities
- Understand Selenium Grid architecture (Hub and Nodes)
- Set up and configure Selenium Grid 4
- Create and manage Grid configuration files
- Execute tests on remote browsers using Grid
- Implement parallel test execution across multiple browsers
- Use RemoteWebDriver for distributed testing
- Integrate Docker with Selenium Grid for containerized testing
- Work with cloud-based testing platforms (BrowserStack, Sauce Labs, LambdaTest)
- Apply cross-browser testing best practices
- Handle browser-specific issues and challenges
- Prepare for cross-browser testing interview questions

---

## Table of Contents

1. [Introduction to Cross-Browser Testing](#1-introduction-to-cross-browser-testing)
2. [Why Cross-Browser Testing Matters](#2-why-cross-browser-testing-matters)
3. [Setting Up Different Browsers](#3-setting-up-different-browsers)
4. [Browser-Specific Configurations](#4-browser-specific-configurations)
5. [Introduction to Selenium Grid](#5-introduction-to-selenium-grid)
6. [Grid Architecture - Hub and Nodes](#6-grid-architecture---hub-and-nodes)
7. [Setting Up Selenium Grid 4](#7-setting-up-selenium-grid-4)
8. [Grid Configuration Files](#8-grid-configuration-files)
9. [Running Tests on Grid](#9-running-tests-on-grid)
10. [Parallel Execution Across Browsers](#10-parallel-execution-across-browsers)
11. [Remote WebDriver Usage](#11-remote-webdriver-usage)
12. [Docker Integration with Selenium Grid](#12-docker-integration-with-selenium-grid)
13. [Cloud-Based Testing Platforms](#13-cloud-based-testing-platforms)
14. [Best Practices for Cross-Browser Testing](#14-best-practices-for-cross-browser-testing)
15. [Common Challenges and Solutions](#15-common-challenges-and-solutions)
16. [Complete Implementation Examples](#16-complete-implementation-examples)
17. [Practical Exercises](#17-practical-exercises)
18. [Key Takeaways](#18-key-takeaways)
19. [Interview Questions](#19-interview-questions)

---

## 1. Introduction to Cross-Browser Testing

### What is Cross-Browser Testing?

**Cross-Browser Testing** is the practice of testing web applications across different browsers, browser versions, and operating systems to ensure consistent functionality, appearance, and user experience.

### The Browser Landscape

```
Major Browsers (2024):
├── Chrome (Chromium-based)
│   ├── Google Chrome
│   ├── Microsoft Edge
│   ├── Opera
│   └── Brave
├── Firefox (Gecko)
├── Safari (WebKit)
└── Legacy/Special
    ├── Internet Explorer (deprecated)
    └── Mobile Browsers
```

### Why Different Browsers?

Each browser uses a different rendering engine:

- **Chrome/Edge**: Blink (Chromium)
- **Firefox**: Gecko
- **Safari**: WebKit
- **Internet Explorer**: Trident (deprecated)

These engines interpret HTML, CSS, and JavaScript differently, leading to potential inconsistencies.

### Testing Scope

```java
package concepts;

public class CrossBrowserTestingScope {

    public void defineTestingScope() {
        /*
         * What to test across browsers:
         *
         * 1. Functional Testing
         *    - All user workflows work consistently
         *    - Forms submit correctly
         *    - Navigation functions properly
         *
         * 2. Visual Testing
         *    - Layout renders correctly
         *    - CSS styles apply properly
         *    - Responsive design works
         *
         * 3. Compatibility Testing
         *    - JavaScript features work
         *    - HTML5 features supported
         *    - API compatibility
         *
         * 4. Performance Testing
         *    - Page load times
         *    - Resource utilization
         *    - Memory leaks
         *
         * 5. Security Testing
         *    - Browser security features
         *    - Certificate handling
         *    - Cookie management
         */
    }
}
```

---

## 2. Why Cross-Browser Testing Matters

### Real-World Impact

**Case Study: E-Commerce Website**

```
Scenario: Checkout button doesn't work in Firefox
Impact:
- 15% of users use Firefox
- Lost revenue: $50,000/month
- Brand reputation damage
- Customer frustration

Solution: Cross-browser testing before deployment
```

### Browser Market Share (2024)

```
Desktop Browsers:
- Chrome: ~65%
- Edge: ~12%
- Safari: ~10%
- Firefox: ~8%
- Others: ~5%

Mobile Browsers:
- Chrome: ~65%
- Safari: ~25%
- Samsung Internet: ~5%
- Others: ~5%
```

### Business Reasons

1. **User Coverage**: Reach all potential users
2. **Quality Assurance**: Consistent user experience
3. **Brand Reputation**: Professional appearance
4. **Compliance**: Industry standards
5. **Market Share**: Don't lose users to browser issues

### Technical Reasons

```java
package concepts;

public class TechnicalReasons {

    /*
     * Browser Differences:
     *
     * 1. JavaScript Engine Variations
     *    - V8 (Chrome/Edge)
     *    - SpiderMonkey (Firefox)
     *    - JavaScriptCore (Safari)
     *
     * 2. CSS Rendering Differences
     *    - Flexbox implementation
     *    - Grid layout support
     *    - Vendor prefixes
     *
     * 3. HTML5 Feature Support
     *    - Canvas API
     *    - WebGL
     *    - WebRTC
     *
     * 4. DOM Manipulation
     *    - Event handling
     *    - Element positioning
     *    - Shadow DOM
     *
     * 5. Security Policies
     *    - CORS handling
     *    - Certificate validation
     *    - Cookie policies
     */
}
```

---

## 3. Setting Up Different Browsers

### Prerequisites

**Maven Dependencies:**

```xml
<dependencies>
    <!-- Selenium WebDriver -->
    <dependency>
        <groupId>org.seleniumhq.selenium</groupId>
        <artifactId>selenium-java</artifactId>
        <version>4.16.1</version>
    </dependency>

    <!-- WebDriverManager for automatic driver management -->
    <dependency>
        <groupId>io.github.bonigarcia</groupId>
        <artifactId>webdrivermanager</artifactId>
        <version>5.6.3</version>
    </dependency>

    <!-- TestNG for parallel execution -->
    <dependency>
        <groupId>org.testng</groupId>
        <artifactId>testng</artifactId>
        <version>7.8.0</version>
    </dependency>
</dependencies>
```

### Chrome Browser Setup

```java
package browsers;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public class ChromeBrowserSetup {

    /**
     * Basic Chrome setup
     */
    public WebDriver createChromeDriver() {
        // Setup ChromeDriver using WebDriverManager
        WebDriverManager.chromedriver().setup();

        // Create ChromeDriver instance
        WebDriver driver = new ChromeDriver();

        return driver;
    }

    /**
     * Chrome with options
     */
    public WebDriver createChromeDriverWithOptions() {
        WebDriverManager.chromedriver().setup();

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--start-maximized");
        options.addArguments("--disable-notifications");
        options.addArguments("--disable-popup-blocking");

        return new ChromeDriver(options);
    }

    /**
     * Headless Chrome
     */
    public WebDriver createHeadlessChrome() {
        WebDriverManager.chromedriver().setup();

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless=new");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--window-size=1920,1080");

        return new ChromeDriver(options);
    }
}
```

### Firefox Browser Setup

```java
package browsers;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.firefox.FirefoxProfile;

public class FirefoxBrowserSetup {

    /**
     * Basic Firefox setup
     */
    public WebDriver createFirefoxDriver() {
        WebDriverManager.firefoxdriver().setup();
        return new FirefoxDriver();
    }

    /**
     * Firefox with options
     */
    public WebDriver createFirefoxDriverWithOptions() {
        WebDriverManager.firefoxdriver().setup();

        FirefoxOptions options = new FirefoxOptions();
        options.addArguments("--width=1920");
        options.addArguments("--height=1080");

        // Firefox profile settings
        FirefoxProfile profile = new FirefoxProfile();
        profile.setPreference("browser.download.folderList", 2);
        profile.setPreference("browser.download.dir", "/path/to/downloads");
        profile.setPreference("browser.helperApps.neverAsk.saveToDisk",
            "application/pdf,application/zip");

        options.setProfile(profile);

        return new FirefoxDriver(options);
    }

    /**
     * Headless Firefox
     */
    public WebDriver createHeadlessFirefox() {
        WebDriverManager.firefoxdriver().setup();

        FirefoxOptions options = new FirefoxOptions();
        options.addArguments("--headless");
        options.addArguments("--width=1920");
        options.addArguments("--height=1080");

        return new FirefoxDriver(options);
    }
}
```

### Edge Browser Setup

```java
package browsers;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.edge.EdgeOptions;

public class EdgeBrowserSetup {

    /**
     * Basic Edge setup
     */
    public WebDriver createEdgeDriver() {
        WebDriverManager.edgedriver().setup();
        return new EdgeDriver();
    }

    /**
     * Edge with options
     */
    public WebDriver createEdgeDriverWithOptions() {
        WebDriverManager.edgedriver().setup();

        EdgeOptions options = new EdgeOptions();
        options.addArguments("--start-maximized");
        options.addArguments("--disable-notifications");
        options.addArguments("--inprivate"); // InPrivate browsing

        return new EdgeDriver(options);
    }

    /**
     * Headless Edge
     */
    public WebDriver createHeadlessEdge() {
        WebDriverManager.edgedriver().setup();

        EdgeOptions options = new EdgeOptions();
        options.addArguments("--headless=new");
        options.addArguments("--window-size=1920,1080");

        return new EdgeDriver(options);
    }
}
```

### Safari Browser Setup

```java
package browsers;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.safari.SafariDriver;
import org.openqa.selenium.safari.SafariOptions;

public class SafariBrowserSetup {

    /**
     * Basic Safari setup (Mac only)
     *
     * Prerequisites:
     * 1. Enable "Allow Remote Automation" in Safari > Develop menu
     * 2. Run: sudo safaridriver --enable
     */
    public WebDriver createSafariDriver() {
        return new SafariDriver();
    }

    /**
     * Safari with options
     */
    public WebDriver createSafariDriverWithOptions() {
        SafariOptions options = new SafariOptions();
        options.setAutomaticInspection(false);
        options.setAutomaticProfiling(false);

        return new SafariDriver(options);
    }

    /**
     * Note: Safari doesn't support headless mode
     * Note: Safari only works on macOS
     */
}
```

### Browser Factory Pattern

```java
package browsers;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.edge.EdgeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.safari.SafariDriver;

public class BrowserFactory {

    public enum BrowserType {
        CHROME,
        FIREFOX,
        EDGE,
        SAFARI
    }

    /**
     * Creates WebDriver instance based on browser type
     */
    public static WebDriver createDriver(BrowserType browserType) {
        return createDriver(browserType, false);
    }

    /**
     * Creates WebDriver instance with headless option
     */
    public static WebDriver createDriver(BrowserType browserType, boolean headless) {
        WebDriver driver;

        switch (browserType) {
            case CHROME:
                WebDriverManager.chromedriver().setup();
                ChromeOptions chromeOptions = new ChromeOptions();
                if (headless) {
                    chromeOptions.addArguments("--headless=new");
                    chromeOptions.addArguments("--window-size=1920,1080");
                }
                driver = new ChromeDriver(chromeOptions);
                break;

            case FIREFOX:
                WebDriverManager.firefoxdriver().setup();
                FirefoxOptions firefoxOptions = new FirefoxOptions();
                if (headless) {
                    firefoxOptions.addArguments("--headless");
                }
                driver = new FirefoxDriver(firefoxOptions);
                break;

            case EDGE:
                WebDriverManager.edgedriver().setup();
                EdgeOptions edgeOptions = new EdgeOptions();
                if (headless) {
                    edgeOptions.addArguments("--headless=new");
                    edgeOptions.addArguments("--window-size=1920,1080");
                }
                driver = new EdgeDriver(edgeOptions);
                break;

            case SAFARI:
                // Safari doesn't support headless mode
                driver = new SafariDriver();
                break;

            default:
                throw new IllegalArgumentException("Unsupported browser: " + browserType);
        }

        return driver;
    }

    /**
     * Creates driver from string (useful for configuration)
     */
    public static WebDriver createDriver(String browserName) {
        BrowserType browserType = BrowserType.valueOf(browserName.toUpperCase());
        return createDriver(browserType);
    }
}
```

---

## 4. Browser-Specific Configurations

### Chrome Capabilities and Options

```java
package browsers.config;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import io.github.bonigarcia.wdm.WebDriverManager;
import java.util.HashMap;
import java.util.Map;

public class ChromeConfiguration {

    /**
     * Comprehensive Chrome configuration
     */
    public WebDriver createConfiguredChromeDriver() {
        WebDriverManager.chromedriver().setup();

        ChromeOptions options = new ChromeOptions();

        // Window management
        options.addArguments("--start-maximized");
        options.addArguments("--window-size=1920,1080");

        // Performance optimization
        options.addArguments("--disable-gpu");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");

        // Disable unwanted features
        options.addArguments("--disable-notifications");
        options.addArguments("--disable-popup-blocking");
        options.addArguments("--disable-infobars");
        options.addArguments("--disable-extensions");

        // Privacy and security
        options.addArguments("--incognito");

        // SSL/Certificate handling
        options.addArguments("--ignore-certificate-errors");
        options.addArguments("--allow-insecure-localhost");

        // Experimental options
        options.setExperimentalOption("excludeSwitches",
            new String[]{"enable-automation", "enable-logging"});

        Map<String, Object> prefs = new HashMap<>();

        // Download settings
        prefs.put("download.default_directory", "/path/to/downloads");
        prefs.put("download.prompt_for_download", false);
        prefs.put("download.directory_upgrade", true);
        prefs.put("safebrowsing.enabled", false);

        // Notification settings
        prefs.put("profile.default_content_setting_values.notifications", 2);

        // Geolocation
        prefs.put("profile.default_content_setting_values.geolocation", 2);

        options.setExperimentalOption("prefs", prefs);

        // Set page load strategy
        options.setPageLoadStrategy(org.openqa.selenium.PageLoadStrategy.NORMAL);

        // Set browser binary location (if custom)
        // options.setBinary("/path/to/chrome");

        return new ChromeDriver(options);
    }

    /**
     * Chrome with mobile emulation
     */
    public WebDriver createMobileEmulationChrome() {
        WebDriverManager.chromedriver().setup();

        ChromeOptions options = new ChromeOptions();

        Map<String, Object> mobileEmulation = new HashMap<>();
        mobileEmulation.put("deviceName", "iPhone 12 Pro");

        // Or custom device metrics
        /*
        Map<String, Object> deviceMetrics = new HashMap<>();
        deviceMetrics.put("width", 375);
        deviceMetrics.put("height", 812);
        deviceMetrics.put("pixelRatio", 3.0);

        Map<String, Object> mobileEmulation = new HashMap<>();
        mobileEmulation.put("deviceMetrics", deviceMetrics);
        mobileEmulation.put("userAgent", "Mozilla/5.0...");
        */

        options.setExperimentalOption("mobileEmulation", mobileEmulation);

        return new ChromeDriver(options);
    }

    /**
     * Chrome with proxy
     */
    public WebDriver createChromeWithProxy(String proxyAddress) {
        WebDriverManager.chromedriver().setup();

        ChromeOptions options = new ChromeOptions();

        org.openqa.selenium.Proxy proxy = new org.openqa.selenium.Proxy();
        proxy.setHttpProxy(proxyAddress);
        proxy.setSslProxy(proxyAddress);

        options.setCapability("proxy", proxy);

        return new ChromeDriver(options);
    }
}
```

### Firefox Capabilities and Options

```java
package browsers.config;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.firefox.FirefoxProfile;
import io.github.bonigarcia.wdm.WebDriverManager;

public class FirefoxConfiguration {

    /**
     * Comprehensive Firefox configuration
     */
    public WebDriver createConfiguredFirefoxDriver() {
        WebDriverManager.firefoxdriver().setup();

        FirefoxOptions options = new FirefoxOptions();

        // Create and configure Firefox profile
        FirefoxProfile profile = new FirefoxProfile();

        // Download settings
        profile.setPreference("browser.download.folderList", 2);
        profile.setPreference("browser.download.dir", "/path/to/downloads");
        profile.setPreference("browser.download.useDownloadDir", true);
        profile.setPreference("browser.helperApps.neverAsk.saveToDisk",
            "application/pdf,application/zip,application/octet-stream");
        profile.setPreference("browser.download.manager.showWhenStarting", false);
        profile.setPreference("pdfjs.disabled", true);

        // Notification settings
        profile.setPreference("dom.webnotifications.enabled", false);
        profile.setPreference("dom.push.enabled", false);

        // Privacy settings
        profile.setPreference("browser.privatebrowsing.autostart", true);

        // Certificate handling
        profile.setPreference("accept_untrusted_certs", true);
        profile.setPreference("assume_untrusted_cert_issuer", false);

        // Disable auto-updates
        profile.setPreference("app.update.enabled", false);

        // Set profile to options
        options.setProfile(profile);

        // Add arguments
        options.addArguments("--width=1920");
        options.addArguments("--height=1080");

        // Set page load strategy
        options.setPageLoadStrategy(org.openqa.selenium.PageLoadStrategy.NORMAL);

        return new FirefoxDriver(options);
    }

    /**
     * Firefox with custom binary
     */
    public WebDriver createFirefoxWithCustomBinary(String binaryPath) {
        WebDriverManager.firefoxdriver().setup();

        FirefoxOptions options = new FirefoxOptions();
        options.setBinary(binaryPath);

        return new FirefoxDriver(options);
    }

    /**
     * Firefox with proxy
     */
    public WebDriver createFirefoxWithProxy(String proxyAddress) {
        WebDriverManager.firefoxdriver().setup();

        FirefoxOptions options = new FirefoxOptions();

        org.openqa.selenium.Proxy proxy = new org.openqa.selenium.Proxy();
        proxy.setHttpProxy(proxyAddress);
        proxy.setSslProxy(proxyAddress);

        options.setCapability("proxy", proxy);

        return new FirefoxDriver(options);
    }
}
```

### Edge Capabilities and Options

```java
package browsers.config;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.edge.EdgeOptions;
import io.github.bonigarcia.wdm.WebDriverManager;
import java.util.HashMap;
import java.util.Map;

public class EdgeConfiguration {

    /**
     * Comprehensive Edge configuration
     */
    public WebDriver createConfiguredEdgeDriver() {
        WebDriverManager.edgedriver().setup();

        EdgeOptions options = new EdgeOptions();

        // Window management
        options.addArguments("--start-maximized");
        options.addArguments("--window-size=1920,1080");

        // Performance
        options.addArguments("--disable-gpu");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");

        // Disable features
        options.addArguments("--disable-notifications");
        options.addArguments("--disable-popup-blocking");
        options.addArguments("--disable-extensions");

        // Privacy
        options.addArguments("--inprivate");

        // Experimental options (same as Chrome)
        options.setExperimentalOption("excludeSwitches",
            new String[]{"enable-automation"});

        Map<String, Object> prefs = new HashMap<>();
        prefs.put("download.default_directory", "/path/to/downloads");
        prefs.put("download.prompt_for_download", false);
        prefs.put("profile.default_content_setting_values.notifications", 2);

        options.setExperimentalOption("prefs", prefs);

        return new EdgeDriver(options);
    }
}
```

### Safari Capabilities and Options

```java
package browsers.config;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.safari.SafariDriver;
import org.openqa.selenium.safari.SafariOptions;

public class SafariConfiguration {

    /**
     * Safari configuration
     * Note: Safari has limited configuration options compared to other browsers
     */
    public WebDriver createConfiguredSafariDriver() {
        SafariOptions options = new SafariOptions();

        // Disable automatic inspection
        options.setAutomaticInspection(false);

        // Disable automatic profiling
        options.setAutomaticProfiling(false);

        // Use technology preview (if installed)
        // options.setUseTechnologyPreview(true);

        return new SafariDriver(options);
    }

    /**
     * Safari Technology Preview
     */
    public WebDriver createSafariTechnologyPreview() {
        SafariOptions options = new SafariOptions();
        options.setUseTechnologyPreview(true);

        return new SafariDriver(options);
    }
}
```

---

## 5. Introduction to Selenium Grid

### What is Selenium Grid?

**Selenium Grid** is a tool that allows you to run tests on different machines against different browsers in parallel. It enables distributed test execution across multiple environments.

### Grid Benefits

```java
package grid.concepts;

public class GridBenefits {

    /*
     * Benefits of Selenium Grid:
     *
     * 1. Parallel Execution
     *    - Run tests simultaneously across multiple machines
     *    - Significantly reduce test execution time
     *    - Example: 100 tests in 10 minutes instead of 100 minutes
     *
     * 2. Cross-Browser Testing
     *    - Test on multiple browsers simultaneously
     *    - Chrome, Firefox, Edge, Safari
     *    - Different browser versions
     *
     * 3. Cross-Platform Testing
     *    - Windows, Mac, Linux
     *    - Different OS versions
     *    - Mobile platforms
     *
     * 4. Resource Optimization
     *    - Utilize available computing resources
     *    - Distribute load across machines
     *    - Better hardware utilization
     *
     * 5. Scalability
     *    - Add/remove nodes as needed
     *    - Scale based on demand
     *    - Cloud integration
     *
     * 6. Centralized Management
     *    - Single point of control
     *    - Easy monitoring
     *    - Session management
     */
}
```

### Grid Use Cases

```
Use Case 1: Cross-Browser Testing
- Run same test on Chrome, Firefox, Edge simultaneously
- Verify consistency across browsers
- Time saved: 67%

Use Case 2: Parallel Test Execution
- Run 100 tests across 10 machines
- Each machine runs 10 tests
- Time saved: 90%

Use Case 3: Cloud Integration
- Use cloud-based nodes
- On-demand scaling
- Cost optimization

Use Case 4: Different Environments
- Test on different OS versions
- Test on different screen resolutions
- Test with different network conditions
```

### Grid vs Local Execution

```java
package grid.concepts;

public class GridVsLocal {

    public void compareExecutionModes() {
        /*
         * Local Execution:
         * - Tests run on single machine
         * - Sequential execution (mostly)
         * - Limited browser/OS coverage
         * - Setup time: Low
         * - Execution time: High
         * - Scalability: Limited
         *
         * Grid Execution:
         * - Tests run on multiple machines
         * - Parallel execution
         * - Multiple browser/OS support
         * - Setup time: Medium
         * - Execution time: Low
         * - Scalability: High
         *
         * Example:
         * 100 tests, 3 browsers each = 300 test runs
         *
         * Local: ~5 hours
         * Grid (10 nodes): ~30 minutes
         */
    }
}
```

---

## 6. Grid Architecture - Hub and Nodes

### Grid 4 Architecture

Selenium Grid 4 has evolved from the traditional Hub-Node architecture to support multiple deployment modes.

### Architecture Modes

```
1. Standalone Mode
   - Single machine
   - All components in one process
   - Good for development/testing

2. Hub and Node Mode (Classic)
   - Separate Hub and Nodes
   - Hub routes requests to nodes
   - Traditional Grid setup

3. Distributed Mode
   - Event Bus, Session Map, Distributor, Router
   - Highly scalable
   - Enterprise deployments

4. Fully Distributed Mode
   - All components run independently
   - Maximum flexibility
   - Cloud-native deployments
```

### Hub-Node Architecture

```
┌─────────────────────────────────────────────────┐
│                    Hub                          │
│  - Receives test requests                       │
│  - Routes to available nodes                    │
│  - Manages sessions                             │
│  - Monitors node health                         │
└─────────────────┬───────────────────────────────┘
                  │
                  │
     ┌────────────┼────────────┐
     │            │            │
     ▼            ▼            ▼
┌─────────┐  ┌─────────┐  ┌─────────┐
│ Node 1  │  │ Node 2  │  │ Node 3  │
│ Chrome  │  │ Firefox │  │  Edge   │
│ Firefox │  │  Edge   │  │  Safari │
│ Windows │  │  Linux  │  │   Mac   │
└─────────┘  └─────────┘  └─────────┘
```

### Hub Responsibilities

```java
package grid.concepts;

public class HubResponsibilities {

    /*
     * Hub Functions:
     *
     * 1. Request Routing
     *    - Receives test requests from clients
     *    - Routes to appropriate nodes
     *    - Load balancing
     *
     * 2. Session Management
     *    - Creates new sessions
     *    - Maintains active sessions
     *    - Session cleanup
     *
     * 3. Node Registration
     *    - Accepts node registrations
     *    - Validates node capabilities
     *    - Maintains node registry
     *
     * 4. Health Monitoring
     *    - Checks node availability
     *    - Detects failed nodes
     *    - Removes unresponsive nodes
     *
     * 5. Capability Matching
     *    - Matches test requirements to node capabilities
     *    - Finds best available node
     *    - Handles capability priorities
     */
}
```

### Node Responsibilities

```java
package grid.concepts;

public class NodeResponsibilities {

    /*
     * Node Functions:
     *
     * 1. Self-Registration
     *    - Registers with Hub
     *    - Provides capability information
     *    - Maintains heartbeat
     *
     * 2. Browser Management
     *    - Starts browser instances
     *    - Manages browser processes
     *    - Closes browsers after tests
     *
     * 3. Test Execution
     *    - Executes test commands
     *    - Manages WebDriver sessions
     *    - Returns results to Hub
     *
     * 4. Resource Management
     *    - Controls concurrent sessions
     *    - Manages system resources
     *    - Prevents overload
     *
     * 5. Health Reporting
     *    - Reports status to Hub
     *    - Provides capability updates
     *    - Handles shutdown gracefully
     */
}
```

### Communication Flow

```
Test Execution Flow:

1. Test Request
   Client → Hub: "I need Chrome on Windows"

2. Capability Matching
   Hub: Searches for matching node
   Hub: Finds Node 1 with Chrome/Windows

3. Session Creation
   Hub → Node 1: Create session
   Node 1: Starts Chrome browser
   Node 1 → Hub: Session created, ID: xyz123

4. Test Execution
   Client → Hub → Node 1: Execute commands
   Node 1: Executes in Chrome
   Node 1 → Hub → Client: Command results

5. Session Cleanup
   Client → Hub: Test complete
   Hub → Node 1: Close session
   Node 1: Closes Chrome
```

---

## 7. Setting Up Selenium Grid 4

### Downloading Grid

```bash
# Download Selenium Server (Grid) JAR
# Visit: https://github.com/SeleniumHQ/selenium/releases

# Or use wget/curl
wget https://github.com/SeleniumHQ/selenium/releases/download/selenium-4.16.0/selenium-server-4.16.1.jar

# Or Maven dependency
# Grid is included in selenium-server artifact
```

### Starting Grid in Standalone Mode

```bash
# Standalone mode - simplest setup
java -jar selenium-server-4.16.1.jar standalone

# With custom port
java -jar selenium-server-4.16.1.jar standalone --port 4444

# With specific browsers
java -jar selenium-server-4.16.1.jar standalone --drivers chrome,firefox,edge

# With logging
java -jar selenium-server-4.16.1.jar standalone --log-level FINE
```

### Starting Grid in Hub-Node Mode

**Start Hub:**

```bash
# Start Hub
java -jar selenium-server-4.16.1.jar hub

# Hub with custom port
java -jar selenium-server-4.16.1.jar hub --port 4444

# Hub with custom session timeout
java -jar selenium-server-4.16.1.jar hub --session-timeout 300

# Hub with custom request timeout
java -jar selenium-server-4.16.1.jar hub --session-request-timeout 300
```

**Start Nodes:**

```bash
# Start Node and register with Hub
java -jar selenium-server-4.16.1.jar node --hub http://localhost:4444

# Node with specific browsers
java -jar selenium-server-4.16.1.jar node \
  --hub http://localhost:4444 \
  --drivers chrome,firefox

# Node with custom configuration
java -jar selenium-server-4.16.1.jar node \
  --hub http://localhost:4444 \
  --port 5555 \
  --max-sessions 5

# Node with specific capabilities
java -jar selenium-server-4.16.1.jar node \
  --hub http://localhost:4444 \
  --detect-drivers false \
  --driver-implementation chrome \
  --driver-implementation firefox
```

### Grid Status and Monitoring

```bash
# Check Grid status
curl http://localhost:4444/status

# Grid UI (available in Grid 4)
# Open browser: http://localhost:4444

# Check specific node
curl http://localhost:5555/status

# GraphQL endpoint for advanced queries
curl http://localhost:4444/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{grid {sessionCount}}"}'
```

### Grid Setup Script

```bash
#!/bin/bash

# setup-grid.sh - Script to start Selenium Grid

GRID_JAR="selenium-server-4.16.1.jar"
HUB_PORT=4444
NODE1_PORT=5555
NODE2_PORT=5556

# Function to check if port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "Port $1 is already in use"
        return 1
    fi
    return 0
}

# Start Hub
start_hub() {
    echo "Starting Selenium Grid Hub on port $HUB_PORT..."
    java -jar $GRID_JAR hub --port $HUB_PORT > hub.log 2>&1 &
    echo $! > hub.pid
    echo "Hub started with PID $(cat hub.pid)"
    sleep 5
}

# Start Node
start_node() {
    local port=$1
    echo "Starting Node on port $port..."
    java -jar $GRID_JAR node \
        --hub http://localhost:$HUB_PORT \
        --port $port \
        --max-sessions 3 \
        > node_$port.log 2>&1 &
    echo $! > node_$port.pid
    echo "Node started with PID $(cat node_$port.pid)"
}

# Stop Grid
stop_grid() {
    echo "Stopping Grid..."
    if [ -f hub.pid ]; then
        kill $(cat hub.pid)
        rm hub.pid
    fi

    for pid_file in node_*.pid; do
        if [ -f $pid_file ]; then
            kill $(cat $pid_file)
            rm $pid_file
        fi
    done

    echo "Grid stopped"
}

# Main script
case "$1" in
    start)
        if check_port $HUB_PORT; then
            start_hub
            start_node $NODE1_PORT
            start_node $NODE2_PORT
            echo "Grid setup complete. Access UI at http://localhost:$HUB_PORT"
        fi
        ;;
    stop)
        stop_grid
        ;;
    restart)
        stop_grid
        sleep 2
        start_hub
        start_node $NODE1_PORT
        start_node $NODE2_PORT
        ;;
    *)
        echo "Usage: $0 {start|stop|restart}"
        exit 1
        ;;
esac
```

---

## 8. Grid Configuration Files

### Node Configuration File

**node-config.toml:**

```toml
[node]
detect-drivers = true
max-sessions = 5
session-timeout = 300
override-max-sessions = false

[server]
port = 5555

[sessionqueue]
session-request-timeout = 300
session-retry-interval = 5

[relay]
url = "http://localhost:4444"
status-endpoint = "/status"
protocol-version = "HTTP/1.1"

[network]
relax-checks = false

[logging]
level = "INFO"
```

**Start node with configuration:**

```bash
java -jar selenium-server-4.16.1.jar node --config node-config.toml
```

### Hub Configuration File

**hub-config.toml:**

```toml
[hub]
session-timeout = 300
session-request-timeout = 300
publish-url = "http://localhost:4444"

[server]
port = 4444

[sessionqueue]
session-request-timeout = 300
session-retry-interval = 5

[sessionmap]
scheme = "http"
host = "localhost"
port = 5556

[distributor]
scheme = "http"
host = "localhost"
port = 5553

[router]
scheme = "http"
host = "localhost"
port = 4444

[network]
relax-checks = true

[logging]
level = "INFO"
```

### JSON Configuration (Legacy)

**node-config.json:**

```json
{
  "capabilities": [
    {
      "browserName": "chrome",
      "maxInstances": 3,
      "seleniumProtocol": "WebDriver",
      "webdriver.chrome.driver": "/path/to/chromedriver"
    },
    {
      "browserName": "firefox",
      "maxInstances": 3,
      "seleniumProtocol": "WebDriver",
      "webdriver.gecko.driver": "/path/to/geckodriver"
    }
  ],
  "port": 5555,
  "hub": "http://localhost:4444",
  "maxSession": 5,
  "register": true,
  "registerCycle": 5000,
  "nodeTimeout": 120,
  "timeout": 300
}
```

### Advanced Configuration

**advanced-node-config.toml:**

```toml
[node]
detect-drivers = false
max-sessions = 10
session-timeout = 600
override-max-sessions = true
drain-after-session-count = 100
heartbeat-period = 60

[server]
port = 5555
max-threads = 24

# Chrome configuration
[[node.driver-configuration]]
name = "chrome"
max-sessions = 5
stereotype = """
{
  "browserName": "chrome",
  "browserVersion": "120",
  "platformName": "Windows 11",
  "goog:chromeOptions": {
    "args": ["--start-maximized", "--disable-notifications"],
    "binary": "C:/Program Files/Google/Chrome/Application/chrome.exe"
  }
}
"""

# Firefox configuration
[[node.driver-configuration]]
name = "firefox"
max-sessions = 3
stereotype = """
{
  "browserName": "firefox",
  "browserVersion": "121",
  "platformName": "Windows 11",
  "moz:firefoxOptions": {
    "args": ["-private"],
    "binary": "C:/Program Files/Mozilla Firefox/firefox.exe"
  }
}
"""

# Edge configuration
[[node.driver-configuration]]
name = "msedge"
max-sessions = 2
stereotype = """
{
  "browserName": "MicrosoftEdge",
  "browserVersion": "120",
  "platformName": "Windows 11",
  "ms:edgeOptions": {
    "args": ["--start-maximized"]
  }
}
"""

[relay]
url = "http://localhost:4444"
status-endpoint = "/status"

[logging]
level = "FINE"
```

---

## 9. Running Tests on Grid

### Basic RemoteWebDriver Usage

```java
package grid.tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.net.URL;

public class BasicGridTest {

    private WebDriver driver;
    private String gridUrl = "http://localhost:4444";

    @BeforeMethod
    public void setup() throws Exception {
        // Create Chrome capabilities
        ChromeOptions options = new ChromeOptions();

        // Connect to Grid
        driver = new RemoteWebDriver(new URL(gridUrl), options);
    }

    @Test
    public void testOnGrid() {
        driver.get("https://www.google.com");
        System.out.println("Page Title: " + driver.getTitle());

        // Test logic here
    }

    @AfterMethod
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

### Cross-Browser Grid Tests

```java
package grid.tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.edge.EdgeOptions;
import org.testng.annotations.*;

import java.net.URL;

public class CrossBrowserGridTest {

    private WebDriver driver;
    private String gridUrl = "http://localhost:4444";

    @Parameters({"browser"})
    @BeforeMethod
    public void setup(@Optional("chrome") String browser) throws Exception {
        switch (browser.toLowerCase()) {
            case "chrome":
                ChromeOptions chromeOptions = new ChromeOptions();
                driver = new RemoteWebDriver(new URL(gridUrl), chromeOptions);
                break;

            case "firefox":
                FirefoxOptions firefoxOptions = new FirefoxOptions();
                driver = new RemoteWebDriver(new URL(gridUrl), firefoxOptions);
                break;

            case "edge":
                EdgeOptions edgeOptions = new EdgeOptions();
                driver = new RemoteWebDriver(new URL(gridUrl), edgeOptions);
                break;

            default:
                throw new IllegalArgumentException("Browser not supported: " + browser);
        }

        driver.manage().window().maximize();
    }

    @Test
    public void testLogin() {
        driver.get("https://example.com/login");

        // Test logic
        System.out.println("Running on: " +
            ((RemoteWebDriver) driver).getCapabilities().getBrowserName());
    }

    @AfterMethod
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

### TestNG XML for Grid

**grid-cross-browser-suite.xml:**

```xml
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Cross Browser Grid Suite" parallel="tests" thread-count="3">

    <!-- Chrome Tests -->
    <test name="Chrome Tests">
        <parameter name="browser" value="chrome"/>
        <classes>
            <class name="grid.tests.CrossBrowserGridTest"/>
        </classes>
    </test>

    <!-- Firefox Tests -->
    <test name="Firefox Tests">
        <parameter name="browser" value="firefox"/>
        <classes>
            <class name="grid.tests.CrossBrowserGridTest"/>
        </classes>
    </test>

    <!-- Edge Tests -->
    <test name="Edge Tests">
        <parameter name="browser" value="edge"/>
        <classes>
            <class name="grid.tests.CrossBrowserGridTest"/>
        </classes>
    </test>

</suite>
```

### Grid Test with Custom Capabilities

```java
package grid.tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.annotations.*;

import java.net.URL;
import java.util.HashMap;
import java.util.Map;

public class CustomCapabilitiesGridTest {

    private WebDriver driver;
    private String gridUrl = "http://localhost:4444";

    @Test
    public void testWithCustomCapabilities() throws Exception {
        ChromeOptions options = new ChromeOptions();

        // Add Chrome arguments
        options.addArguments("--start-maximized");
        options.addArguments("--disable-notifications");

        // Add experimental options
        Map<String, Object> prefs = new HashMap<>();
        prefs.put("download.default_directory", "/path/to/downloads");
        options.setExperimentalOption("prefs", prefs);

        // Platform and version
        options.setPlatformName("Windows 11");
        options.setBrowserVersion("120");

        // Additional capabilities
        options.setCapability("se:recordVideo", true);
        options.setCapability("se:timeZone", "US/Pacific");
        options.setCapability("se:screenResolution", "1920x1080");

        // Connect to Grid
        driver = new RemoteWebDriver(new URL(gridUrl), options);

        // Test execution
        driver.get("https://example.com");
        System.out.println("Title: " + driver.getTitle());

        driver.quit();
    }
}
```

---

## 10. Parallel Execution Across Browsers

### TestNG Parallel Execution

**parallel-suite.xml:**

```xml
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Parallel Cross Browser Suite"
       parallel="tests"
       thread-count="5">

    <test name="Chrome-Windows">
        <parameter name="browser" value="chrome"/>
        <parameter name="platform" value="WINDOWS"/>
        <classes>
            <class name="tests.LoginTest"/>
            <class name="tests.SearchTest"/>
            <class name="tests.CheckoutTest"/>
        </classes>
    </test>

    <test name="Firefox-Windows">
        <parameter name="browser" value="firefox"/>
        <parameter name="platform" value="WINDOWS"/>
        <classes>
            <class name="tests.LoginTest"/>
            <class name="tests.SearchTest"/>
            <class name="tests.CheckoutTest"/>
        </classes>
    </test>

    <test name="Edge-Windows">
        <parameter name="browser" value="edge"/>
        <parameter name="platform" value="WINDOWS"/>
        <classes>
            <class name="tests.LoginTest"/>
            <class name="tests.SearchTest"/>
            <class name="tests.CheckoutTest"/>
        </classes>
    </test>

    <test name="Safari-Mac">
        <parameter name="browser" value="safari"/>
        <parameter name="platform" value="MAC"/>
        <classes>
            <class name="tests.LoginTest"/>
            <class name="tests.SearchTest"/>
            <class name="tests.CheckoutTest"/>
        </classes>
    </test>

    <test name="Chrome-Linux">
        <parameter name="browser" value="chrome"/>
        <parameter name="platform" value="LINUX"/>
        <classes>
            <class name="tests.LoginTest"/>
            <class name="tests.SearchTest"/>
            <class name="tests.CheckoutTest"/>
        </classes>
    </test>

</suite>
```

### Thread-Safe Base Test Class

```java
package tests.base;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.edge.EdgeOptions;
import org.openqa.selenium.safari.SafariOptions;
import org.testng.annotations.*;

import java.net.URL;

public class BaseGridTest {

    // ThreadLocal to maintain separate WebDriver instances per thread
    protected static ThreadLocal<WebDriver> driver = new ThreadLocal<>();

    private String gridUrl = "http://localhost:4444";

    public static WebDriver getDriver() {
        return driver.get();
    }

    @Parameters({"browser", "platform"})
    @BeforeMethod
    public void setup(
            @Optional("chrome") String browser,
            @Optional("WINDOWS") String platform) throws Exception {

        WebDriver webDriver = createDriver(browser, platform);
        driver.set(webDriver);

        getDriver().manage().window().maximize();
    }

    private WebDriver createDriver(String browser, String platform) throws Exception {
        switch (browser.toLowerCase()) {
            case "chrome":
                ChromeOptions chromeOptions = new ChromeOptions();
                chromeOptions.setPlatformName(platform);
                return new RemoteWebDriver(new URL(gridUrl), chromeOptions);

            case "firefox":
                FirefoxOptions firefoxOptions = new FirefoxOptions();
                firefoxOptions.setPlatformName(platform);
                return new RemoteWebDriver(new URL(gridUrl), firefoxOptions);

            case "edge":
                EdgeOptions edgeOptions = new EdgeOptions();
                edgeOptions.setPlatformName(platform);
                return new RemoteWebDriver(new URL(gridUrl), edgeOptions);

            case "safari":
                SafariOptions safariOptions = new SafariOptions();
                safariOptions.setPlatformName(platform);
                return new RemoteWebDriver(new URL(gridUrl), safariOptions);

            default:
                throw new IllegalArgumentException("Browser not supported: " + browser);
        }
    }

    @AfterMethod
    public void teardown() {
        if (getDriver() != null) {
            getDriver().quit();
            driver.remove();
        }
    }
}
```

### Parallel Test Example

```java
package tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import tests.base.BaseGridTest;

public class ParallelLoginTest extends BaseGridTest {

    @Test
    public void testValidLogin() {
        getDriver().get("https://example.com/login");

        // Log browser info
        org.openqa.selenium.remote.RemoteWebDriver remoteDriver =
            (org.openqa.selenium.remote.RemoteWebDriver) getDriver();

        System.out.println("Thread: " + Thread.currentThread().getId());
        System.out.println("Browser: " +
            remoteDriver.getCapabilities().getBrowserName());
        System.out.println("Platform: " +
            remoteDriver.getCapabilities().getPlatformName());

        // Test logic
        String title = getDriver().getTitle();
        Assert.assertTrue(title.contains("Login"));
    }

    @Test
    public void testInvalidLogin() {
        getDriver().get("https://example.com/login");

        // Test logic for invalid login
        System.out.println("Testing invalid login on: " +
            Thread.currentThread().getId());
    }
}
```

### DataProvider with Browsers

```java
package tests;

import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.edge.EdgeOptions;

import java.net.URL;

public class DataProviderCrossBrowserTest {

    @DataProvider(name = "browsers", parallel = true)
    public Object[][] browserProvider() {
        return new Object[][] {
            {"chrome"},
            {"firefox"},
            {"edge"}
        };
    }

    @Test(dataProvider = "browsers")
    public void testAcrossBrowsers(String browser) throws Exception {
        String gridUrl = "http://localhost:4444";
        WebDriver driver = null;

        try {
            switch (browser.toLowerCase()) {
                case "chrome":
                    driver = new RemoteWebDriver(
                        new URL(gridUrl), new ChromeOptions());
                    break;
                case "firefox":
                    driver = new RemoteWebDriver(
                        new URL(gridUrl), new FirefoxOptions());
                    break;
                case "edge":
                    driver = new RemoteWebDriver(
                        new URL(gridUrl), new EdgeOptions());
                    break;
            }

            driver.get("https://example.com");
            System.out.println(browser + " - Title: " + driver.getTitle());

            // Test assertions

        } finally {
            if (driver != null) {
                driver.quit();
            }
        }
    }
}
```

---

## Hands-On Exercises

### Exercise 1: Build Browser Factory with Multiple Browser Support (30 minutes)

**Objective:** Create a flexible Browser Factory that can create different browser instances with proper configuration.

**Scenario:** Your tests need to run on Chrome, Firefox, Edge, and Safari. Build a centralized factory to manage browser creation with appropriate options.

**Requirements:**
1. Create BrowserFactory class with enum for browser types
2. Implement method to create driver based on browser type
3. Add support for headless mode
4. Include browser-specific options
5. Handle WebDriverManager setup
6. Test with all supported browsers

**Code Template:**

```java
package utils;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.edge.EdgeOptions;
import org.openqa.selenium.safari.SafariDriver;
import org.openqa.selenium.safari.SafariOptions;

public class BrowserFactory {

    public enum BrowserType {
        CHROME,
        FIREFOX,
        EDGE,
        SAFARI
    }

    /**
     * Create WebDriver based on browser type
     */
    public static WebDriver createDriver(BrowserType browserType) {
        // TODO: Call createDriver with headless=false
        return null;
    }

    /**
     * Create WebDriver with headless option
     */
    public static WebDriver createDriver(BrowserType browserType, boolean headless) {
        WebDriver driver = null;

        switch (browserType) {
            case CHROME:
                // TODO: Setup ChromeDriver with WebDriverManager
                // TODO: Create ChromeOptions
                // TODO: Add headless argument if needed
                // TODO: Add other common options
                // TODO: Create ChromeDriver instance
                break;

            case FIREFOX:
                // TODO: Setup FirefoxDriver
                // TODO: Create FirefoxOptions
                // TODO: Add headless argument if needed
                // TODO: Create FirefoxDriver instance
                break;

            case EDGE:
                // TODO: Setup EdgeDriver
                // TODO: Create EdgeOptions
                // TODO: Add headless argument if needed
                // TODO: Create EdgeDriver instance
                break;

            case SAFARI:
                // TODO: Safari doesn't support headless
                // TODO: Create SafariDriver
                break;

            default:
                throw new IllegalArgumentException("Browser not supported: " + browserType);
        }

        // TODO: Maximize window (except for headless)
        return driver;
    }

    /**
     * Create driver from string (for configuration files)
     */
    public static WebDriver createDriver(String browserName) {
        // TODO: Convert string to BrowserType enum
        // TODO: Call createDriver with enum
        return null;
    }

    /**
     * Get Chrome with custom options
     */
    public static WebDriver createChromeWithOptions(ChromeOptions options) {
        // TODO: Setup ChromeDriver
        // TODO: Return new ChromeDriver with options
        return null;
    }

    /**
     * Get Firefox with custom options
     */
    public static WebDriver createFirefoxWithOptions(FirefoxOptions options) {
        // TODO: Setup FirefoxDriver
        // TODO: Return new FirefoxDriver with options
        return null;
    }
}
```

**Test Class:**

```java
package tests;

import org.openqa.selenium.WebDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;
import utils.BrowserFactory;
import utils.BrowserFactory.BrowserType;

public class BrowserFactoryTest {

    private WebDriver driver;

    @DataProvider(name = "browsers")
    public Object[][] browserProvider() {
        return new Object[][] {
            {BrowserType.CHROME},
            {BrowserType.FIREFOX},
            {BrowserType.EDGE}
            // Add SAFARI if running on Mac
        };
    }

    @Test(dataProvider = "browsers")
    public void testBrowserCreation(BrowserType browserType) {
        // TODO: Create driver using factory
        driver = BrowserFactory.createDriver(browserType);

        // TODO: Navigate to test site
        driver.get("https://www.google.com");

        // TODO: Assert title
        Assert.assertTrue(driver.getTitle().contains("Google"));
    }

    @Test
    public void testHeadlessChrome() {
        // TODO: Create headless Chrome
        driver = BrowserFactory.createDriver(BrowserType.CHROME, true);

        // TODO: Navigate and test
        driver.get("https://www.example.com");
        Assert.assertTrue(driver.getTitle().length() > 0);
    }

    @Test
    public void testStringBrowserName() {
        // TODO: Create driver using string
        driver = BrowserFactory.createDriver("chrome");

        // TODO: Navigate and test
        driver.get("https://www.example.com");
        Assert.assertNotNull(driver.getTitle());
    }

    @AfterMethod
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

**Expected Outcome:**
- Browser Factory successfully creates all supported browsers
- Headless mode works for Chrome, Firefox, and Edge
- String-based browser creation works
- All browsers navigate correctly
- Tests pass for all browser types

**Common Mistakes to Avoid:**
1. Not calling WebDriverManager.setup() before creating driver
2. Not handling Safari separately (no headless support)
3. Forgetting to maximize window
4. Not checking for null before operations
5. Browser-specific option conflicts

**Solution Approach Hints:**
- Use enum for type safety
- Each browser has its own Options class
- Headless mode uses different arguments per browser
- Chrome/Edge: "--headless=new", Firefox: "--headless"

---

### Exercise 2: Set Up Selenium Grid and Run Tests Remotely (40 minutes)

**Objective:** Set up Selenium Grid (Hub and Node) and execute tests on remote browser instances.

**Scenario:** You need to run tests on a remote machine using Selenium Grid. Set up Grid infrastructure and configure tests to use RemoteWebDriver.

**Requirements:**
1. Download Selenium Server JAR
2. Start Grid Hub on port 4444
3. Start Grid Node connected to Hub
4. Create GridManager utility class
5. Implement tests using RemoteWebDriver
6. Verify tests execute on Grid

**Setup Steps:**

```bash
# Download Selenium Server (if not already downloaded)
# wget https://github.com/SeleniumHQ/selenium/releases/download/selenium-4.16.0/selenium-server-4.16.1.jar

# Terminal 1: Start Hub
java -jar selenium-server-4.16.1.jar hub --port 4444

# Terminal 2: Start Node
java -jar selenium-server-4.16.1.jar node --hub http://localhost:4444
```

**Code Template:**

```java
// GridManager.java
package utils;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.edge.EdgeOptions;
import java.net.URL;

public class GridManager {

    private static final String GRID_HUB_URL = "http://localhost:4444";

    /**
     * Create RemoteWebDriver for Chrome
     */
    public static WebDriver createRemoteChromeDriver() {
        // TODO: Create ChromeOptions
        // TODO: Create URL object for hub
        // TODO: Return new RemoteWebDriver
        return null;
    }

    /**
     * Create RemoteWebDriver for Firefox
     */
    public static WebDriver createRemoteFirefoxDriver() {
        // TODO: Create FirefoxOptions
        // TODO: Return new RemoteWebDriver
        return null;
    }

    /**
     * Create RemoteWebDriver for Edge
     */
    public static WebDriver createRemoteEdgeDriver() {
        // TODO: Create EdgeOptions
        // TODO: Return new RemoteWebDriver
        return null;
    }

    /**
     * Create RemoteWebDriver with browser name
     */
    public static WebDriver createRemoteDriver(String browser) {
        // TODO: Switch on browser name
        // TODO: Call appropriate method
        return null;
    }

    /**
     * Create RemoteWebDriver with custom hub URL
     */
    public static WebDriver createRemoteDriver(String browser, String hubUrl) {
        try {
            URL url = new URL(hubUrl);

            switch (browser.toLowerCase()) {
                case "chrome":
                    // TODO: Return RemoteWebDriver with ChromeOptions
                    break;
                case "firefox":
                    // TODO: Return RemoteWebDriver with FirefoxOptions
                    break;
                case "edge":
                    // TODO: Return RemoteWebDriver with EdgeOptions
                    break;
                default:
                    throw new IllegalArgumentException("Browser not supported: " + browser);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * Check if Grid Hub is running
     */
    public static boolean isGridHubAvailable() {
        // TODO: Try to connect to hub /status endpoint
        // TODO: Return true if successful
        return false;
    }
}

// GridBaseTest.java
package tests.grid;

import org.openqa.selenium.WebDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Optional;
import org.testng.annotations.Parameters;
import utils.GridManager;

public class GridBaseTest {

    protected WebDriver driver;

    @Parameters({"browser"})
    @BeforeMethod
    public void setup(@Optional("chrome") String browser) {
        System.out.println("Creating RemoteWebDriver for: " + browser);

        // TODO: Check if Grid is available
        // TODO: Create remote driver using GridManager
        // TODO: Maximize window
    }

    @AfterMethod
    public void teardown() {
        // TODO: Quit driver if not null
    }
}

// GridLoginTest.java
package tests.grid;

import org.testng.Assert;
import org.testng.annotations.Test;

public class GridLoginTest extends GridBaseTest {

    @Test
    public void testLoginOnGrid() {
        System.out.println("Executing login test on Grid");

        // TODO: Navigate to login page
        driver.get("https://example.com/login");

        // TODO: Get title
        String title = driver.getTitle();

        // TODO: Assert title
        Assert.assertTrue(title.length() > 0);

        System.out.println("Test executed on Grid successfully");
    }

    @Test
    public void testSearchOnGrid() {
        System.out.println("Executing search test on Grid");

        // TODO: Navigate to homepage
        driver.get("https://example.com");

        // TODO: Verify page loaded
        Assert.assertNotNull(driver.getTitle());
    }
}
```

**TestNG XML:**

```xml
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Grid Test Suite" parallel="tests" thread-count="3">

    <test name="Chrome on Grid">
        <parameter name="browser" value="chrome"/>
        <classes>
            <class name="tests.grid.GridLoginTest"/>
        </classes>
    </test>

    <test name="Firefox on Grid">
        <parameter name="browser" value="firefox"/>
        <classes>
            <class name="tests.grid.GridLoginTest"/>
        </classes>
    </test>

    <test name="Edge on Grid">
        <parameter name="browser" value="edge"/>
        <classes>
            <class name="tests.grid.GridLoginTest"/>
        </classes>
    </test>

</suite>
```

**Expected Outcome:**
- Grid Hub starts successfully on port 4444
- Grid Node registers with Hub
- Tests connect to Grid and execute remotely
- Multiple browsers run in parallel
- Grid UI shows active sessions

**Common Mistakes to Avoid:**
1. Not starting Hub before Node
2. Wrong Hub URL in Node connection
3. Not handling MalformedURLException
4. Forgetting to check Grid availability
5. Port conflicts with other services

**Solution Approach Hints:**
- RemoteWebDriver requires URL and Options
- Grid UI available at http://localhost:4444
- Check Grid status before running tests
- Each test gets routed to available Node

---

### Exercise 3: Implement Parallel Cross-Browser Testing (40 minutes)

**Objective:** Execute same test across multiple browsers in parallel using TestNG parallel execution.

**Scenario:** You need to verify login functionality works identically across Chrome, Firefox, and Edge. Run tests in parallel for all browsers simultaneously.

**Requirements:**
1. Create thread-safe BaseTest for cross-browser tests
2. Implement login test that works on all browsers
3. Configure TestNG for parallel browser execution
4. Use ThreadLocal for WebDriver management
5. Collect results for each browser
6. Compare cross-browser behavior

**Code Template:**

```java
// CrossBrowserDriverManager.java
package utils;

import org.openqa.selenium.WebDriver;

public class CrossBrowserDriverManager {

    private static ThreadLocal<WebDriver> driver = new ThreadLocal<>();
    private static ThreadLocal<String> browserName = new ThreadLocal<>();

    /**
     * Set driver for current thread
     */
    public static void setDriver(WebDriver driverInstance, String browser) {
        // TODO: Set driver in ThreadLocal
        // TODO: Set browser name in ThreadLocal
    }

    /**
     * Get driver for current thread
     */
    public static WebDriver getDriver() {
        // TODO: Return driver from ThreadLocal
        return null;
    }

    /**
     * Get browser name for current thread
     */
    public static String getBrowserName() {
        // TODO: Return browser name from ThreadLocal
        return null;
    }

    /**
     * Quit driver and remove from ThreadLocal
     */
    public static void quitDriver() {
        // TODO: Quit driver if exists
        // TODO: Remove from ThreadLocal
        // TODO: Remove browser name from ThreadLocal
    }

    /**
     * Get thread information
     */
    public static String getThreadInfo() {
        // TODO: Return thread ID, name, and browser
        return null;
    }
}

// CrossBrowserBaseTest.java
package tests.crossbrowser;

import org.openqa.selenium.WebDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Optional;
import org.testng.annotations.Parameters;
import utils.BrowserFactory;
import utils.CrossBrowserDriverManager;

public class CrossBrowserBaseTest {

    protected WebDriver driver;

    @Parameters({"browser"})
    @BeforeMethod
    public void setup(@Optional("chrome") String browser) {
        System.out.println("Setting up browser: " + browser + " - " +
                         Thread.currentThread().getId());

        // TODO: Create driver using BrowserFactory
        // TODO: Set driver in CrossBrowserDriverManager
        // TODO: Get driver instance
        // TODO: Maximize window
    }

    @AfterMethod
    public void teardown() {
        System.out.println("Tearing down browser: " +
                         CrossBrowserDriverManager.getBrowserName() +
                         " - " + Thread.currentThread().getId());

        // TODO: Quit driver using CrossBrowserDriverManager
    }

    protected String getBrowserInfo() {
        return CrossBrowserDriverManager.getThreadInfo();
    }
}

// CrossBrowserLoginTest.java
package tests.crossbrowser;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.testng.Assert;
import org.testng.annotations.Test;
import utils.CrossBrowserDriverManager;
import java.time.Duration;

public class CrossBrowserLoginTest extends CrossBrowserBaseTest {

    @Test
    public void testLoginFunctionality() {
        String browser = CrossBrowserDriverManager.getBrowserName();
        System.out.println("Testing login on " + browser);

        // TODO: Navigate to login page
        driver.get("https://practicetestautomation.com/practice-test-login/");

        // TODO: Wait for page to load
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        // TODO: Find username field and enter text
        // TODO: Find password field and enter text
        // TODO: Click login button

        // TODO: Wait for success message or dashboard
        // TODO: Assert login successful

        System.out.println("Login test passed on " + browser);
    }

    @Test
    public void testInvalidLogin() {
        String browser = CrossBrowserDriverManager.getBrowserName();
        System.out.println("Testing invalid login on " + browser);

        // TODO: Navigate to login page
        driver.get("https://practicetestautomation.com/practice-test-login/");

        // TODO: Enter invalid credentials
        // TODO: Click login button
        // TODO: Verify error message appears
        // TODO: Assert error message text

        System.out.println("Invalid login test passed on " + browser);
    }

    @Test
    public void testEmptyCredentials() {
        String browser = CrossBrowserDriverManager.getBrowserName();
        System.out.println("Testing empty credentials on " + browser);

        // TODO: Navigate to login page
        driver.get("https://practicetestautomation.com/practice-test-login/");

        // TODO: Leave fields empty and click login
        // TODO: Verify validation messages
        // TODO: Assert appropriate error shown

        System.out.println("Empty credentials test passed on " + browser);
    }
}
```

**TestNG XML - Parallel Cross-Browser:**

```xml
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Cross-Browser Parallel Suite" parallel="tests" thread-count="3">

    <test name="Chrome Tests">
        <parameter name="browser" value="chrome"/>
        <classes>
            <class name="tests.crossbrowser.CrossBrowserLoginTest"/>
        </classes>
    </test>

    <test name="Firefox Tests">
        <parameter name="browser" value="firefox"/>
        <classes>
            <class name="tests.crossbrowser.CrossBrowserLoginTest"/>
        </classes>
    </test>

    <test name="Edge Tests">
        <parameter name="browser" value="edge"/>
        <classes>
            <class name="tests.crossbrowser.CrossBrowserLoginTest"/>
        </classes>
    </test>

</suite>
```

**Expected Outcome:**
- All three browsers execute tests in parallel
- No conflicts between browser instances
- Each thread uses its own WebDriver
- Test results show browser-specific information
- All tests pass consistently across browsers

**Common Mistakes to Avoid:**
1. Not using ThreadLocal for WebDriver
2. Sharing test data across threads
3. Browser-specific element locators failing
4. Different wait times needed per browser
5. Not cleaning up ThreadLocal properly

**Solution Approach Hints:**
- ThreadLocal ensures each browser gets own driver
- Use CSS selectors that work across browsers
- Add explicit waits for dynamic elements
- Log browser name in each test for debugging

---

### Exercise 4: Create Browser-Specific Configuration Manager (35 minutes)

**Objective:** Build a configuration system that manages browser-specific options and capabilities.

**Scenario:** Different browsers require different configurations. Create a system to manage browser options centrally with support for profiles and capabilities.

**Requirements:**
1. Create BrowserConfig class for storing configurations
2. Implement ConfigManager to load configurations
3. Support browser-specific options from properties file
4. Handle capabilities like download directory, notifications
5. Load configurations for different environments
6. Test with custom configurations

**Properties File (browser-config.properties):**

```properties
# Chrome Configuration
chrome.headless=false
chrome.maximize=true
chrome.disable.notifications=true
chrome.disable.popups=true
chrome.download.directory=/tmp/downloads
chrome.arguments=--disable-gpu,--no-sandbox

# Firefox Configuration
firefox.headless=false
firefox.maximize=true
firefox.download.directory=/tmp/downloads
firefox.arguments=-private

# Edge Configuration
edge.headless=false
edge.maximize=true
edge.disable.notifications=true
edge.arguments=--inprivate

# Common Settings
implicit.wait=10
page.load.timeout=30
script.timeout=30
```

**Code Template:**

```java
// BrowserConfig.java
package config;

import java.util.List;

public class BrowserConfig {

    private String browser;
    private boolean headless;
    private boolean maximize;
    private boolean disableNotifications;
    private String downloadDirectory;
    private List<String> arguments;

    // TODO: Generate getters and setters

    // TODO: Add builder pattern for easy construction
    public static class Builder {
        private BrowserConfig config = new BrowserConfig();

        public Builder browser(String browser) {
            config.browser = browser;
            return this;
        }

        public Builder headless(boolean headless) {
            config.headless = headless;
            return this;
        }

        // TODO: Add other builder methods

        public BrowserConfig build() {
            return config;
        }
    }
}

// BrowserConfigManager.java
package config;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;

public class BrowserConfigManager {

    private Properties properties;

    public BrowserConfigManager(String configFile) {
        // TODO: Load properties file
        // TODO: Handle exceptions
    }

    /**
     * Get configuration for specific browser
     */
    public BrowserConfig getBrowserConfig(String browser) {
        // TODO: Read browser-specific properties
        // TODO: Create BrowserConfig object
        // TODO: Set all configurations
        // TODO: Return config

        BrowserConfig.Builder builder = new BrowserConfig.Builder();
        // TODO: Set properties from file

        return null;
    }

    /**
     * Get property value
     */
    private String getProperty(String key) {
        // TODO: Return property value
        return null;
    }

    /**
     * Get boolean property
     */
    private boolean getBooleanProperty(String key) {
        // TODO: Parse and return boolean
        return false;
    }

    /**
     * Get comma-separated property as list
     */
    private List<String> getListProperty(String key) {
        // TODO: Split by comma and return list
        return null;
    }

    /**
     * Get implicit wait timeout
     */
    public int getImplicitWait() {
        // TODO: Return implicit wait value
        return 10;
    }

    /**
     * Get page load timeout
     */
    public int getPageLoadTimeout() {
        // TODO: Return page load timeout
        return 30;
    }
}

// ConfiguredBrowserFactory.java
package utils;

import config.BrowserConfig;
import config.BrowserConfigManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import io.github.bonigarcia.wdm.WebDriverManager;
import java.time.Duration;

public class ConfiguredBrowserFactory {

    private static BrowserConfigManager configManager =
        new BrowserConfigManager("src/test/resources/config/browser-config.properties");

    /**
     * Create driver with configuration
     */
    public static WebDriver createConfiguredDriver(String browser) {
        // TODO: Get browser configuration
        BrowserConfig config = configManager.getBrowserConfig(browser);

        WebDriver driver = null;

        switch (browser.toLowerCase()) {
            case "chrome":
                // TODO: Setup ChromeDriver
                // TODO: Create ChromeOptions
                // TODO: Apply configurations from config object
                // TODO: Set headless if needed
                // TODO: Add arguments
                // TODO: Set download directory
                // TODO: Create driver
                break;

            case "firefox":
                // TODO: Setup FirefoxDriver
                // TODO: Create FirefoxOptions
                // TODO: Apply configurations
                // TODO: Create driver
                break;

            // TODO: Add other browsers
        }

        // TODO: Set timeouts from config
        if (driver != null) {
            driver.manage().timeouts().implicitlyWait(
                Duration.ofSeconds(configManager.getImplicitWait()));
            driver.manage().timeouts().pageLoadTimeout(
                Duration.ofSeconds(configManager.getPageLoadTimeout()));
        }

        return driver;
    }
}

// ConfiguredBrowserTest.java
package tests;

import org.openqa.selenium.WebDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;
import utils.ConfiguredBrowserFactory;

public class ConfiguredBrowserTest {

    private WebDriver driver;

    @Parameters({"browser"})
    @Test
    public void testWithConfiguration(String browser) {
        // TODO: Create driver with configuration
        driver = ConfiguredBrowserFactory.createConfiguredDriver(browser);

        // TODO: Test that configuration is applied
        driver.get("https://www.example.com");

        // TODO: Verify page loaded
        Assert.assertNotNull(driver.getTitle());

        System.out.println("Browser " + browser + " configured correctly");
    }

    @AfterMethod
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

**Expected Outcome:**
- Configuration loaded from properties file
- Browser-specific settings applied correctly
- Different browsers use their own configurations
- Timeouts and options work as configured
- Easy to modify configurations without code changes

**Common Mistakes to Avoid:**
1. Not handling missing properties gracefully
2. Hardcoding paths in configuration
3. Not validating boolean values
4. Forgetting to apply all configurations
5. Not handling different property formats

**Solution Approach Hints:**
- Use Properties class to load file
- Prefix properties with browser name
- Parse comma-separated values for lists
- Provide sensible defaults for missing properties

---

### Exercise 5: Implement Browser Compatibility Utility (40 minutes)

**Objective:** Create utilities to handle browser-specific differences and compatibility issues.

**Scenario:** Different browsers handle certain actions differently. Build utilities to abstract browser-specific behavior and provide consistent interface.

**Requirements:**
1. Create BrowserDetector to identify current browser
2. Implement ActionHelper with browser-specific actions
3. Create WaitHelper with adaptive waits
4. Handle JavaScript execution differences
5. Implement fallback mechanisms
6. Test across multiple browsers

**Code Template:**

```java
// BrowserDetector.java
package utils;

import org.openqa.selenium.Capabilities;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.RemoteWebDriver;

public class BrowserDetector {

    /**
     * Get browser name from driver
     */
    public static String getBrowserName(WebDriver driver) {
        // TODO: Cast to RemoteWebDriver
        // TODO: Get capabilities
        // TODO: Return browser name
        return null;
    }

    /**
     * Check if browser is Chrome
     */
    public static boolean isChrome(WebDriver driver) {
        // TODO: Get browser name and check
        return false;
    }

    /**
     * Check if browser is Firefox
     */
    public static boolean isFirefox(WebDriver driver) {
        // TODO: Check browser name
        return false;
    }

    /**
     * Check if browser is Edge
     */
    public static boolean isEdge(WebDriver driver) {
        // TODO: Check browser name
        return false;
    }

    /**
     * Check if browser is Safari
     */
    public static boolean isSafari(WebDriver driver) {
        // TODO: Check browser name
        return false;
    }

    /**
     * Get browser version
     */
    public static String getBrowserVersion(WebDriver driver) {
        // TODO: Get version from capabilities
        return null;
    }
}

// BrowserCompatibleActions.java
package utils;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.interactions.Actions;

public class BrowserCompatibleActions {

    private WebDriver driver;
    private JavascriptExecutor jsExecutor;

    public BrowserCompatibleActions(WebDriver driver) {
        this.driver = driver;
        this.jsExecutor = (JavascriptExecutor) driver;
    }

    /**
     * Click element with fallback
     */
    public void click(WebElement element) {
        try {
            // TODO: Try normal click
            element.click();
        } catch (Exception e) {
            System.out.println("Normal click failed, trying JavaScript click");
            // TODO: Fallback to JavaScript click
            jsExecutor.executeScript("arguments[0].click();", element);
        }
    }

    /**
     * Scroll element into view (browser-compatible)
     */
    public void scrollIntoView(WebElement element) {
        if (BrowserDetector.isFirefox(driver)) {
            // TODO: Firefox-specific scroll
            jsExecutor.executeScript(
                "arguments[0].scrollIntoView({block: 'center'});", element);
        } else {
            // TODO: Standard scroll
            jsExecutor.executeScript(
                "arguments[0].scrollIntoView(true);", element);
        }
    }

    /**
     * Send keys with browser compatibility
     */
    public void sendKeys(WebElement element, String text) {
        // TODO: Clear element first
        element.clear();

        if (BrowserDetector.isSafari(driver)) {
            // TODO: Safari may need character-by-character input
            for (char c : text.toCharArray()) {
                element.sendKeys(String.valueOf(c));
                try {
                    Thread.sleep(10);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        } else {
            // TODO: Standard sendKeys
            element.sendKeys(text);
        }
    }

    /**
     * Hover over element (browser-compatible)
     */
    public void hover(WebElement element) {
        Actions actions = new Actions(driver);

        if (BrowserDetector.isEdge(driver)) {
            // TODO: Edge may need JavaScript hover
            jsExecutor.executeScript(
                "var event = new MouseEvent('mouseover', {bubbles: true}); " +
                "arguments[0].dispatchEvent(event);", element);
        } else {
            // TODO: Standard Actions hover
            actions.moveToElement(element).perform();
        }
    }

    /**
     * Execute JavaScript with error handling
     */
    public Object executeScript(String script, Object... args) {
        try {
            // TODO: Execute script
            return jsExecutor.executeScript(script, args);
        } catch (Exception e) {
            System.out.println("JavaScript execution failed: " + e.getMessage());
            return null;
        }
    }

    /**
     * Get element text (browser-compatible)
     */
    public String getText(WebElement element) {
        String text = element.getText();

        // TODO: If text is empty, try innerText
        if (text == null || text.isEmpty()) {
            text = (String) jsExecutor.executeScript(
                "return arguments[0].innerText;", element);
        }

        // TODO: If still empty, try textContent
        if (text == null || text.isEmpty()) {
            text = (String) jsExecutor.executeScript(
                "return arguments[0].textContent;", element);
        }

        return text;
    }
}

// AdaptiveWaitHelper.java
package utils;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import java.time.Duration;

public class AdaptiveWaitHelper {

    private WebDriver driver;
    private WebDriverWait wait;

    public AdaptiveWaitHelper(WebDriver driver) {
        this.driver = driver;
        // TODO: Adjust timeout based on browser
        int timeout = getBrowserSpecificTimeout();
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(timeout));
    }

    /**
     * Get browser-specific timeout
     */
    private int getBrowserSpecificTimeout() {
        // TODO: Return different timeouts for different browsers
        // Safari may need longer waits
        if (BrowserDetector.isSafari(driver)) {
            return 15;
        } else if (BrowserDetector.isEdge(driver)) {
            return 12;
        }
        return 10;
    }

    /**
     * Wait for element with retry
     */
    public WebElement waitForElement(WebElement element) {
        // TODO: Wait for element to be visible
        // TODO: Add retry logic for flaky elements
        return wait.until(ExpectedConditions.visibilityOf(element));
    }

    /**
     * Wait for element to be clickable with browser adjustment
     */
    public WebElement waitForClickable(WebElement element) {
        // TODO: Wait for clickable
        // TODO: For Safari, add extra wait after
        WebElement clickableElement =
            wait.until(ExpectedConditions.elementToBeClickable(element));

        if (BrowserDetector.isSafari(driver)) {
            try {
                Thread.sleep(500); // Extra wait for Safari
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        return clickableElement;
    }
}

// BrowserCompatibilityTest.java
package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;
import utils.*;

public class BrowserCompatibilityTest {

    private WebDriver driver;
    private BrowserCompatibleActions actions;

    @Parameters({"browser"})
    @BeforeMethod
    public void setup(String browser) {
        driver = BrowserFactory.createDriver(browser);
        actions = new BrowserCompatibleActions(driver);
    }

    @Test
    public void testCompatibleClick() {
        driver.get("https://www.example.com");

        // TODO: Find element and click using compatible action
        WebElement link = driver.findElement(By.tagName("a"));
        actions.click(link);

        // TODO: Verify navigation
        System.out.println("Compatible click worked on: " +
                         BrowserDetector.getBrowserName(driver));
    }

    @Test
    public void testCompatibleScroll() {
        driver.get("https://www.example.com");

        // TODO: Find element to scroll to
        WebElement footer = driver.findElement(By.tagName("footer"));

        // TODO: Scroll into view
        actions.scrollIntoView(footer);

        System.out.println("Compatible scroll worked on: " +
                         BrowserDetector.getBrowserName(driver));
    }

    @AfterMethod
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

**Expected Outcome:**
- Browser detection works correctly
- Browser-specific actions handle differences automatically
- Fallback mechanisms prevent test failures
- Same test code works across all browsers
- Better reliability across browser versions

**Common Mistakes to Avoid:**
1. Not implementing fallback mechanisms
2. Hardcoding browser-specific logic everywhere
3. Not handling JavaScript execution errors
4. Inconsistent wait times across browsers
5. Not testing fallback paths

**Solution Approach Hints:**
- Try standard approach first, then fallback
- Use capabilities to detect browser
- JavaScript can overcome many browser differences
- Different browsers may need different wait times

---

### Exercise 6: Build Cross-Browser Test Report with Browser Details (45 minutes)

**Objective:** Generate comprehensive test reports showing results for each browser with browser-specific information.

**Scenario:** After running cross-browser tests, you need detailed reports showing which tests passed/failed on which browsers. Create reporting system with browser details.

**Requirements:**
1. Create TestResult class to store test outcomes
2. Implement BrowserTestReporter to collect results
3. Generate HTML report with browser breakdown
4. Include browser version and platform information
5. Show comparison across browsers
6. Highlight browser-specific failures

**Code Template:**

```java
// TestResult.java
package reporting;

public class TestResult {

    private String testName;
    private String browser;
    private String browserVersion;
    private String platform;
    private String status; // PASS, FAIL, SKIP
    private String errorMessage;
    private long executionTime;

    // TODO: Generate getters and setters
    // TODO: Add constructor
    // TODO: Override toString()

    public static class Builder {
        private TestResult result = new TestResult();

        public Builder testName(String testName) {
            result.testName = testName;
            return this;
        }

        public Builder browser(String browser) {
            result.browser = browser;
            return this;
        }

        // TODO: Add other builder methods

        public TestResult build() {
            return result;
        }
    }
}

// BrowserTestReporter.java
package reporting;

import org.openqa.selenium.WebDriver;
import utils.BrowserDetector;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class BrowserTestReporter {

    private static List<TestResult> testResults = new ArrayList<>();
    private static ThreadLocal<Long> testStartTime = new ThreadLocal<>();

    /**
     * Start test timing
     */
    public static void startTest() {
        testStartTime.set(System.currentTimeMillis());
    }

    /**
     * Record test result
     */
    public static void recordResult(String testName, WebDriver driver,
                                   String status, String errorMessage) {
        long executionTime = System.currentTimeMillis() - testStartTime.get();

        // TODO: Get browser information
        // TODO: Create TestResult object
        // TODO: Add to results list

        TestResult result = new TestResult.Builder()
            .testName(testName)
            .browser(BrowserDetector.getBrowserName(driver))
            // TODO: Set other properties
            .build();

        synchronized (testResults) {
            testResults.add(result);
        }

        testStartTime.remove();
    }

    /**
     * Generate HTML report
     */
    public static void generateHTMLReport(String filePath) {
        // TODO: Create HTML content
        StringBuilder html = new StringBuilder();
        html.append("<!DOCTYPE html>\n");
        html.append("<html><head>\n");
        html.append("<title>Cross-Browser Test Report</title>\n");
        html.append("<style>\n");
        html.append("  table { border-collapse: collapse; width: 100%; }\n");
        html.append("  th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }\n");
        html.append("  th { background-color: #4CAF50; color: white; }\n");
        html.append("  .pass { background-color: #90EE90; }\n");
        html.append("  .fail { background-color: #FFB6C1; }\n");
        html.append("  .skip { background-color: #FFD700; }\n");
        html.append("</style>\n");
        html.append("</head><body>\n");
        html.append("<h1>Cross-Browser Test Report</h1>\n");

        // TODO: Add summary section
        html.append(generateSummary());

        // TODO: Add detailed results table
        html.append(generateResultsTable());

        // TODO: Add browser comparison
        html.append(generateBrowserComparison());

        html.append("</body></html>");

        // TODO: Write to file
        try (FileWriter writer = new FileWriter(filePath)) {
            writer.write(html.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * Generate summary HTML
     */
    private static String generateSummary() {
        // TODO: Calculate total, passed, failed, skipped
        // TODO: Return HTML string
        return "";
    }

    /**
     * Generate results table HTML
     */
    private static String generateResultsTable() {
        StringBuilder table = new StringBuilder();
        table.append("<h2>Detailed Results</h2>\n");
        table.append("<table>\n");
        table.append("<tr><th>Test Name</th><th>Browser</th><th>Version</th>");
        table.append("<th>Platform</th><th>Status</th><th>Time (ms)</th></tr>\n");

        // TODO: Add row for each test result
        for (TestResult result : testResults) {
            String rowClass = result.getStatus().toLowerCase();
            table.append("<tr class='" + rowClass + "'>\n");
            table.append("<td>" + result.getTestName() + "</td>\n");
            table.append("<td>" + result.getBrowser() + "</td>\n");
            // TODO: Add other columns
            table.append("</tr>\n");
        }

        table.append("</table>\n");
        return table.toString();
    }

    /**
     * Generate browser comparison HTML
     */
    private static String generateBrowserComparison() {
        // TODO: Group results by browser
        // TODO: Show pass/fail count per browser
        // TODO: Return HTML string
        return "";
    }

    /**
     * Get results summary
     */
    public static Map<String, Integer> getSummary() {
        Map<String, Integer> summary = new HashMap<>();
        // TODO: Calculate pass, fail, skip counts
        return summary;
    }

    /**
     * Clear all results
     */
    public static void clearResults() {
        testResults.clear();
    }
}

// ReportingBaseTest.java
package tests.reporting;

import org.openqa.selenium.WebDriver;
import org.testng.ITestResult;
import org.testng.annotations.*;
import reporting.BrowserTestReporter;
import utils.BrowserFactory;

public class ReportingBaseTest {

    protected WebDriver driver;

    @Parameters({"browser"})
    @BeforeMethod
    public void setup(String browser) {
        driver = BrowserFactory.createDriver(browser);
        BrowserTestReporter.startTest();
    }

    @AfterMethod
    public void teardown(ITestResult result) {
        // TODO: Determine test status
        String status = "PASS";
        String errorMessage = null;

        if (result.getStatus() == ITestResult.FAILURE) {
            status = "FAIL";
            errorMessage = result.getThrowable().getMessage();
        } else if (result.getStatus() == ITestResult.SKIP) {
            status = "SKIP";
        }

        // TODO: Record result
        BrowserTestReporter.recordResult(
            result.getName(),
            driver,
            status,
            errorMessage
        );

        // TODO: Quit driver
        if (driver != null) {
            driver.quit();
        }
    }

    @AfterSuite
    public void generateReport() {
        // TODO: Generate HTML report
        String reportPath = "target/cross-browser-report.html";
        BrowserTestReporter.generateHTMLReport(reportPath);
        System.out.println("Report generated: " + reportPath);
    }
}
```

**Expected Outcome:**
- Test results collected for all browsers
- HTML report generated with browser details
- Summary shows pass/fail counts per browser
- Browser comparison highlights differences
- Report opens in browser for viewing

**Common Mistakes to Avoid:**
1. Not synchronizing access to shared results list
2. Not cleaning up ThreadLocal variables
3. Poor HTML formatting in report
4. Not handling null browser information
5. Report generation failing silently

**Solution Approach Hints:**
- Use synchronized block for thread-safe list access
- Group results by browser for comparison
- Include browser version and platform in report
- Use CSS classes for visual status indicators

---

## 18. Key Takeaways

1. **Cross-Browser Testing** ensures consistent functionality across different browsers
2. **Selenium Grid** enables parallel test execution across multiple environments
3. **Grid 4 Architecture** supports standalone, hub-node, and distributed modes
4. **RemoteWebDriver** connects tests to remote browser instances
5. **Docker Integration** simplifies Grid setup and management
6. **Cloud Platforms** (BrowserStack, Sauce Labs, LambdaTest) provide on-demand browsers
7. **Browser Factory Pattern** centralizes browser configuration
8. **ThreadLocal Pattern** ensures thread-safe parallel execution
9. **Configuration Management** allows flexible test execution
10. **Browser-Specific Handling** addresses platform differences
11. **Parallel Execution** significantly reduces test execution time
12. **Best Practices** include proper waits, error handling, and reporting
13. **Common Challenges** have established solutions
14. **Visual Testing** complements functional cross-browser testing
15. **Test Categorization** optimizes test coverage strategy
16. **Monitoring and Reporting** tracks browser-specific failures
17. **Resource Management** prevents test environment issues
18. **Capability Matching** ensures tests run on appropriate browsers
19. **Session Management** maintains test isolation
20. **Continuous Improvement** through metrics and feedback

---

## 19. Interview Questions

### Basic Level

1. **Q: What is cross-browser testing and why is it important?**

   A: Cross-browser testing is the practice of testing web applications across different browsers, browser versions, and operating systems to ensure consistent functionality and user experience. It's important because different browsers use different rendering engines, JavaScript execution varies, CSS interpretation differs, and it ensures quality and coverage for the entire user base.

2. **Q: What is Selenium Grid and what problem does it solve?**

   A: Selenium Grid is a tool that allows running tests on different machines against different browsers in parallel. It solves long test execution times through parallelization, enables cross-browser and cross-platform testing, optimizes resource utilization, and provides scalability for test automation.

3. **Q: What are the main components of Selenium Grid architecture?**

   A: Grid 4 supports multiple architectures: Standalone (all components in one process), Hub-Node (traditional Grid with Hub routing requests to Nodes), Distributed (separate components like Router, Distributor, Session Map, Node), and Fully Distributed (all components run independently).

### Intermediate Level

4. **Q: How do you handle browser-specific issues in Selenium tests?**

   A: Use browser detection to apply specific logic, implement fallback mechanisms (e.g., JavaScript click), use explicit waits instead of sleeps, standardize viewport sizes, apply browser-specific configuration, test JavaScript compatibility, use CSS selectors over XPath, and implement proper exception handling.

5. **Q: Explain how RemoteWebDriver works.**

   A: RemoteWebDriver implements the WebDriver interface and connects to a remote Selenium server (Grid/Hub). It sends commands over HTTP protocol, Grid routes commands to the appropriate Node, Node executes commands on the actual browser, and results are returned through Hub to the test client. It supports all WebDriver operations and requires URL and Capabilities.

6. **Q: How do you implement parallel cross-browser testing with TestNG?**

   A: Use ThreadLocal for WebDriver instances, configure TestNG XML with parallel="tests", create separate test tags for each browser, pass browser parameter to each test, use thread-safe design patterns, implement proper cleanup in @AfterMethod, set appropriate thread-count, and handle browser initialization in @BeforeMethod.

### Advanced Level

7. **Q: Design a scalable cross-browser testing framework architecture.**

   A: Architecture should include Browser Factory for centralized browser creation, Configuration Management for environment-specific settings, Grid Manager for local/remote execution, Thread Management using ThreadLocal, Capability Builder to construct browser capabilities, Platform Integration for cloud platforms, Reporting for browser-specific failure tracking, Resource Management for proper cleanup, Retry Mechanism for transient failures, and CI/CD Integration for automated execution.

8. **Q: How would you set up Selenium Grid in Docker for a CI/CD pipeline?**

   A: Create docker-compose.yml with Hub and Nodes, configure environment variables for customization, use Selenium official Docker images, set up health checks for reliability, configure volume mounts for artifacts, implement scaling for Nodes, integrate with CI/CD tools, use Docker networks for isolation, implement proper teardown, and monitor resource usage.

---

## Navigation

- [Previous: Day 42 - Exception Handling & Framework Exceptions](../week6/day42_exception_handling_framework.md)
- [Next: Day 44 - Framework Best Practices & Design Patterns](day44_framework_best_practices.md)
- [Week 7 Overview](README.md)
- [Course Home](../../README.md)

---

**Congratulations!** You've completed Day 43 on Cross-Browser Testing & Selenium Grid. You now have the knowledge to implement comprehensive cross-browser testing strategies and leverage Selenium Grid for distributed test execution.
