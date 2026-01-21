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

*[Content continues in next part due to length...]*

---

## 17. Beginner-Friendly Exercises

Practice cross-browser testing and Selenium Grid with these hands-on exercises.

---

### Exercise 1: Create Browser Factory for Multiple Browsers (35 minutes)

**Objective**: Build a flexible BrowserFactory that supports Chrome, Firefox, and Edge with browser-specific configurations.

**Scenario**: Your team needs a centralized way to create browser instances with different configurations for cross-browser testing.

**Requirements**:
1. Create BrowserFactory class with getBrowser(String browserName) method
2. Support Chrome, Firefox, and Edge browsers
3. Add browser-specific options (headless mode, window size, etc.)
4. Implement proper error handling for unsupported browsers
5. Create a test class that uses the factory to test all browsers

**Code Template**:
```java
package com.automation.factory;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.edge.EdgeOptions;
import io.github.bonigarcia.wdm.WebDriverManager;

public class BrowserFactory {

    public static WebDriver getBrowser(String browserName) {
        WebDriver driver;

        switch (browserName.toLowerCase()) {
            case "chrome":
                // TODO: Setup ChromeDriver using WebDriverManager
                // TODO: Create ChromeOptions and configure settings
                // TODO: Return ChromeDriver instance
                break;

            case "firefox":
                // TODO: Setup FirefoxDriver using WebDriverManager
                // TODO: Create FirefoxOptions and configure settings
                // TODO: Return FirefoxDriver instance
                break;

            case "edge":
                // TODO: Setup EdgeDriver using WebDriverManager
                // TODO: Create EdgeOptions and configure settings
                // TODO: Return EdgeDriver instance
                break;

            default:
                // TODO: Throw exception for unsupported browser
        }

        return driver;
    }

    // TODO: Add method to get browser with custom options
    public static WebDriver getBrowser(String browserName, boolean headless) {
        // Implement headless configuration
    }
}
```

**Test Class**:
```java
package com.automation.tests;

import org.testng.annotations.*;
import org.openqa.selenium.WebDriver;
import com.automation.factory.BrowserFactory;

public class Exercise1_BrowserFactoryTest {

    private WebDriver driver;

    @Parameters("browser")
    @BeforeMethod
    public void setup(@Optional("chrome") String browser) {
        // TODO: Get driver from BrowserFactory
        driver = BrowserFactory.getBrowser(browser);
        driver.manage().window().maximize();
    }

    @Test
    public void testGoogleSearch() {
        // TODO: Navigate to Google
        // TODO: Verify page title
        // TODO: Print browser name
        System.out.println("Testing on: " + /* TODO: Get browser name */);
    }

    @AfterMethod
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

**Expected Outcome**:
- BrowserFactory creates Chrome, Firefox, and Edge drivers
- Each browser navigates to test URL successfully
- Browser-specific options are applied correctly
- Tests run on all configured browsers
- Proper error handling for invalid browser names

**Common Mistakes to Avoid**:
1. Not using WebDriverManager to setup drivers automatically
2. Hardcoding browser options instead of making them configurable
3. Not implementing null checks before quitting driver
4. Creating new factory instance instead of using static methods
5. Not handling browser-specific exceptions properly

**Solution Approach**:
- Use switch-case for browser selection
- Call `WebDriverManager.browserDriver().setup()` before creating driver
- Create browser-specific Options objects (ChromeOptions, FirefoxOptions, etc.)
- Add common options like `--start-maximized`, `--disable-notifications`
- For headless: `options.addArguments("--headless")`
- Use `instanceof` or Capabilities to get browser name
- Return WebDriver interface type for flexibility

---

### Exercise 2: Set Up Local Selenium Grid Hub and Nodes (40 minutes)

**Objective**: Configure and start Selenium Grid 4 in standalone mode and hub-node mode, then execute tests on the Grid.

**Scenario**: Your team wants to run tests in parallel across multiple browsers using Selenium Grid on local machines.

**Requirements**:
1. Download Selenium Server JAR (Grid 4)
2. Start Grid in standalone mode and verify it's running
3. Start Grid in hub-node mode (separate processes)
4. Create configuration files for hub and node
5. Write a test that executes on Grid using RemoteWebDriver

**Steps to Start Grid**:

**Standalone Mode**:
```bash
# TODO: Download selenium-server-<version>.jar
# TODO: Run command to start standalone Grid
java -jar selenium-server-4.15.0.jar standalone

# Verify Grid is running
# TODO: Open browser and navigate to http://localhost:4444
```

**Hub-Node Mode**:
```bash
# Terminal 1 - Start Hub
# TODO: Run command to start hub
java -jar selenium-server-4.15.0.jar hub

# Terminal 2 - Start Chrome Node
# TODO: Run command to start node
java -jar selenium-server-4.15.0.jar node --detect-drivers true

# Terminal 3 - Start Firefox Node
# TODO: Run command to start another node with different port
java -jar selenium-server-4.15.0.jar node --detect-drivers true --port 5556
```

**Code Template**:
```java
package com.automation.grid;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.testng.annotations.*;
import java.net.URL;

public class Exercise2_GridExecutionTest {

    private WebDriver driver;
    private String gridUrl = "http://localhost:4444";

    @Parameters("browser")
    @BeforeMethod
    public void setup(@Optional("chrome") String browser) throws Exception {
        // TODO: Create RemoteWebDriver based on browser parameter
        if (browser.equalsIgnoreCase("chrome")) {
            // TODO: Create ChromeOptions
            // TODO: Initialize RemoteWebDriver with Grid URL and options
        } else if (browser.equalsIgnoreCase("firefox")) {
            // TODO: Create FirefoxOptions
            // TODO: Initialize RemoteWebDriver with Grid URL and options
        }
    }

    @Test
    public void testOnGrid() {
        // TODO: Navigate to test URL
        driver.get("https://www.selenium.dev");

        // TODO: Get and print session information
        System.out.println("Session ID: " + ((RemoteWebDriver) driver).getSessionId());
        System.out.println("Browser: " + ((RemoteWebDriver) driver).getCapabilities().getBrowserName());

        // TODO: Perform test actions and assertions
        String title = driver.getTitle();
        System.out.println("Page Title: " + title);
    }

    @AfterMethod
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

**TestNG XML**:
```xml
<!-- TODO: Create testng.xml for parallel execution -->
<suite name="Grid Test Suite" parallel="tests" thread-count="2">
    <test name="Chrome Test">
        <parameter name="browser" value="chrome"/>
        <classes>
            <class name="com.automation.grid.Exercise2_GridExecutionTest"/>
        </classes>
    </test>

    <test name="Firefox Test">
        <parameter name="browser" value="firefox"/>
        <classes>
            <class name="com.automation.grid.Exercise2_GridExecutionTest"/>
        </classes>
    </test>
</suite>
```

**Expected Outcome**:
- Grid Hub starts successfully on port 4444
- Grid UI is accessible at http://localhost:4444
- Nodes register with Hub successfully
- Tests execute on Grid remotely
- Session information is printed correctly
- Both Chrome and Firefox tests run in parallel

**Common Mistakes to Avoid**:
1. Not downloading correct Selenium Server version matching your code
2. Starting hub/nodes on same port causing conflicts
3. Not waiting for nodes to register before running tests
4. Using local WebDriver instead of RemoteWebDriver
5. Not handling URL exceptions when connecting to Grid

**Solution Approach**:
- Download selenium-server JAR from https://www.selenium.dev/downloads/
- For standalone: Use `java -jar selenium-server.jar standalone`
- For hub: Use `java -jar selenium-server.jar hub`
- For node: Use `java -jar selenium-server.jar node --detect-drivers true`
- Check Grid UI at http://localhost:4444 to see registered nodes
- Use `new RemoteWebDriver(new URL(gridUrl), options)` to connect
- Cast to RemoteWebDriver to access session details
- Always check Grid is running before executing tests

---

### Exercise 3: Implement ThreadLocal for Parallel Cross-Browser Testing (45 minutes)

**Objective**: Create thread-safe WebDriver management using ThreadLocal to enable parallel test execution across multiple browsers.

**Scenario**: Your test suite needs to run the same tests on Chrome, Firefox, and Edge simultaneously without thread interference.

**Requirements**:
1. Create DriverManager class using ThreadLocal pattern
2. Implement getDriver() and setDriver() methods
3. Implement removeDriver() for cleanup
4. Create BaseTest class that manages driver lifecycle
5. Write parallel tests using TestNG that run on multiple browsers
6. Verify thread safety by logging thread IDs

**Code Template**:
```java
package com.automation.driver;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.edge.EdgeDriver;
import io.github.bonigarcia.wdm.WebDriverManager;

public class DriverManager {

    // TODO: Create ThreadLocal variable for WebDriver
    private static ThreadLocal<WebDriver> driver = new ThreadLocal<>();

    public static WebDriver getDriver() {
        // TODO: Return driver from ThreadLocal
        // TODO: If null, throw exception or create new driver
    }

    public static void setDriver(WebDriver driverInstance) {
        // TODO: Set driver in ThreadLocal
    }

    public static void createDriver(String browser) {
        WebDriver driverInstance;

        switch (browser.toLowerCase()) {
            case "chrome":
                // TODO: Setup and create ChromeDriver
                break;
            case "firefox":
                // TODO: Setup and create FirefoxDriver
                break;
            case "edge":
                // TODO: Setup and create EdgeDriver
                break;
            default:
                throw new IllegalArgumentException("Browser not supported: " + browser);
        }

        // TODO: Set driver in ThreadLocal
        // TODO: Maximize window
    }

    public static void quitDriver() {
        // TODO: Get driver from ThreadLocal
        // TODO: Quit driver if not null
        // TODO: Remove driver from ThreadLocal
    }
}
```

**BaseTest Class**:
```java
package com.automation.base;

import org.testng.annotations.*;
import com.automation.driver.DriverManager;
import org.openqa.selenium.WebDriver;

public class BaseTest {

    @Parameters("browser")
    @BeforeMethod
    public void setup(@Optional("chrome") String browser) {
        // TODO: Create driver using DriverManager
        // TODO: Log thread ID and browser
        System.out.println("Thread ID: " + Thread.currentThread().getId() +
                         " - Browser: " + browser);
    }

    protected WebDriver getDriver() {
        // TODO: Return driver from DriverManager
        return DriverManager.getDriver();
    }

    @AfterMethod
    public void teardown() {
        // TODO: Quit driver using DriverManager
        System.out.println("Thread ID: " + Thread.currentThread().getId() +
                         " - Teardown complete");
    }
}
```

**Test Class**:
```java
package com.automation.tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import com.automation.base.BaseTest;

public class Exercise3_ParallelCrossBrowserTest extends BaseTest {

    @Test
    public void testHomePage() {
        // TODO: Navigate using getDriver()
        getDriver().get("https://www.selenium.dev");

        // TODO: Log thread and browser info
        System.out.println("Thread: " + Thread.currentThread().getId());

        // TODO: Perform assertions
        String title = getDriver().getTitle();
        Assert.assertTrue(title.contains("Selenium"));
    }

    @Test
    public void testDownloadsPage() {
        // TODO: Navigate to downloads page
        getDriver().get("https://www.selenium.dev/downloads");

        // TODO: Verify page loaded
        Assert.assertTrue(getDriver().getCurrentUrl().contains("downloads"));
    }
}
```

**TestNG XML for Parallel Execution**:
```xml
<!-- TODO: Configure suite for parallel test execution -->
<suite name="Parallel Cross-Browser Suite" parallel="tests" thread-count="3">
    <test name="Chrome Tests">
        <parameter name="browser" value="chrome"/>
        <classes>
            <class name="com.automation.tests.Exercise3_ParallelCrossBrowserTest"/>
        </classes>
    </test>

    <test name="Firefox Tests">
        <parameter name="browser" value="firefox"/>
        <classes>
            <class name="com.automation.tests.Exercise3_ParallelCrossBrowserTest"/>
        </classes>
    </test>

    <test name="Edge Tests">
        <parameter name="browser" value="edge"/>
        <classes>
            <class name="com.automation.tests.Exercise3_ParallelCrossBrowserTest"/>
        </classes>
    </test>
</suite>
```

**Expected Outcome**:
- Each thread gets its own WebDriver instance
- No thread interference during parallel execution
- Different thread IDs printed for each browser
- All tests pass on all browsers
- Proper cleanup after each test
- No "driver already closed" or "null pointer" exceptions

**Common Mistakes to Avoid**:
1. Forgetting to call remove() on ThreadLocal causing memory leaks
2. Sharing driver instance across threads without ThreadLocal
3. Not checking if driver is null before operations
4. Calling quit() without removing from ThreadLocal
5. Using class-level driver variable instead of ThreadLocal

**Solution Approach**:
- Declare: `private static ThreadLocal<WebDriver> driver = new ThreadLocal<>()`
- Set: `driver.set(driverInstance)`
- Get: `driver.get()`
- Remove: `driver.remove()` (crucial for cleanup)
- Always remove driver in finally block or @AfterMethod
- Use thread-count in testng.xml to control parallelism
- Log Thread.currentThread().getId() to verify thread safety
- Each test tag in testng.xml runs in separate thread

---

### Exercise 4: Configure Grid with Docker Compose (50 minutes)

**Objective**: Set up Selenium Grid using Docker and Docker Compose with Hub and multiple browser nodes.

**Scenario**: Your team wants to quickly spin up a Grid environment without manual installation, using containerization.

**Requirements**:
1. Install Docker Desktop and verify installation
2. Create docker-compose.yml file for Grid setup
3. Configure Hub and Node services (Chrome, Firefox, Edge)
4. Start Grid using Docker Compose
5. Write tests that connect to Dockerized Grid
6. Scale nodes dynamically

**docker-compose.yml Template**:
```yaml
version: '3'
services:
  # TODO: Configure Selenium Hub service
  selenium-hub:
    image: selenium/hub:4.15.0
    container_name: selenium-hub
    ports:
      - "4444:4444"  # TODO: Expose port for Hub UI and connections
      - "4442:4442"  # Event bus publish port
      - "4443:4443"  # Event bus subscribe port
    environment:
      - SE_SESSION_REQUEST_TIMEOUT=300
      - SE_SESSION_RETRY_INTERVAL=5

  # TODO: Configure Chrome Node service
  chrome-node:
    image: selenium/node-chrome:4.15.0
    depends_on:
      - selenium-hub
    environment:
      - SE_EVENT_BUS_HOST=selenium-hub
      - SE_EVENT_BUS_PUBLISH_PORT=4442
      - SE_EVENT_BUS_SUBSCRIBE_PORT=4443
      - SE_NODE_MAX_SESSIONS=2
    ports:
      - "5900:5900"  # VNC port for debugging
    shm_size: '2gb'  # Shared memory for browser

  # TODO: Configure Firefox Node service
  firefox-node:
    image: selenium/node-firefox:4.15.0
    depends_on:
      - selenium-hub
    environment:
      - SE_EVENT_BUS_HOST=selenium-hub
      - SE_EVENT_BUS_PUBLISH_PORT=4442
      - SE_EVENT_BUS_SUBSCRIBE_PORT=4443
      - SE_NODE_MAX_SESSIONS=2
    ports:
      - "5901:5900"
    shm_size: '2gb'

  # TODO: Configure Edge Node service (optional)
  edge-node:
    image: selenium/node-edge:4.15.0
    depends_on:
      - selenium-hub
    environment:
      - SE_EVENT_BUS_HOST=selenium-hub
      - SE_EVENT_BUS_PUBLISH_PORT=4442
      - SE_EVENT_BUS_SUBSCRIBE_PORT=4443
      - SE_NODE_MAX_SESSIONS=2
    ports:
      - "5902:5900"
    shm_size: '2gb'
```

**Docker Commands**:
```bash
# TODO: Start Grid containers
docker-compose up -d

# TODO: Check running containers
docker-compose ps

# TODO: View logs
docker-compose logs -f selenium-hub

# TODO: Scale Chrome nodes to 3
docker-compose up -d --scale chrome-node=3

# TODO: Stop and remove containers
docker-compose down
```

**Test Code**:
```java
package com.automation.docker;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.testng.annotations.*;
import java.net.URL;

public class Exercise4_DockerGridTest {

    private WebDriver driver;
    private String gridUrl = "http://localhost:4444";

    @Parameters("browser")
    @BeforeMethod
    public void setup(@Optional("chrome") String browser) throws Exception {
        System.out.println("Connecting to Docker Grid at: " + gridUrl);

        // TODO: Create RemoteWebDriver for Docker Grid
        if (browser.equalsIgnoreCase("chrome")) {
            ChromeOptions options = new ChromeOptions();
            driver = new RemoteWebDriver(new URL(gridUrl), options);
        } else if (browser.equalsIgnoreCase("firefox")) {
            FirefoxOptions options = new FirefoxOptions();
            driver = new RemoteWebDriver(new URL(gridUrl), options);
        }

        System.out.println("Connected to browser: " + browser);
    }

    @Test
    public void testDockerGrid() {
        // TODO: Navigate and test
        driver.get("https://www.docker.com");

        // TODO: Print session details
        System.out.println("Session ID: " +
            ((RemoteWebDriver) driver).getSessionId());
        System.out.println("Browser: " +
            ((RemoteWebDriver) driver).getCapabilities().getBrowserName());
        System.out.println("Platform: " +
            ((RemoteWebDriver) driver).getCapabilities().getPlatformName());

        // TODO: Perform test
        String title = driver.getTitle();
        System.out.println("Page Title: " + title);
    }

    @AfterMethod
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

**Expected Outcome**:
- Docker containers start successfully
- Grid Hub accessible at http://localhost:4444
- Chrome, Firefox, and Edge nodes register with Hub
- Tests execute on containerized browsers
- Grid UI shows active sessions
- Containers can be scaled up/down easily
- Clean shutdown with docker-compose down

**Common Mistakes to Avoid**:
1. Not installing Docker Desktop before attempting to run
2. Using wrong Docker image versions (hub and node versions must match)
3. Not configuring shm_size causing browser crashes
4. Missing depends_on causing nodes to start before hub
5. Not exposing port 4444 preventing client connections

**Solution Approach**:
- Install Docker Desktop from docker.com
- Create docker-compose.yml in project root
- Use official Selenium Docker images: selenium/hub and selenium/node-*
- Set shm_size to at least 2gb for browser stability
- Use depends_on to ensure hub starts before nodes
- Environment variables configure node-to-hub connection
- VNC ports (5900+) allow debugging with VNC viewer
- Run `docker-compose up -d` to start in detached mode
- Access Grid UI at http://localhost:4444 to verify setup
- Use `docker-compose logs <service>` to debug issues

---

### Exercise 5: Implement Cross-Browser Testing with Cloud Platform (45 minutes)

**Objective**: Configure and execute tests on BrowserStack cloud platform for cross-browser and cross-platform testing.

**Scenario**: Your team needs to test on browsers and OS combinations not available locally, using a cloud testing platform.

**Requirements**:
1. Sign up for BrowserStack free trial account
2. Get username and access key from account settings
3. Configure RemoteWebDriver to connect to BrowserStack
4. Set desired capabilities for browser, OS, and device
5. Execute tests on multiple browser/OS combinations
6. View test results in BrowserStack dashboard

**Code Template**:
```java
package com.automation.cloud;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.annotations.*;
import java.net.URL;

public class Exercise5_BrowserStackTest {

    private WebDriver driver;

    // TODO: Replace with your BrowserStack credentials
    public static final String USERNAME = "YOUR_USERNAME";
    public static final String ACCESS_KEY = "YOUR_ACCESS_KEY";
    public static final String URL = "https://" + USERNAME + ":" + ACCESS_KEY +
                                     "@hub-cloud.browserstack.com/wd/hub";

    @Parameters({"browser", "browserVersion", "os", "osVersion"})
    @BeforeMethod
    public void setup(@Optional("Chrome") String browser,
                     @Optional("latest") String browserVersion,
                     @Optional("Windows") String os,
                     @Optional("10") String osVersion) throws Exception {

        // TODO: Create DesiredCapabilities
        DesiredCapabilities capabilities = new DesiredCapabilities();

        // TODO: Set browser capabilities
        capabilities.setCapability("browserName", browser);
        capabilities.setCapability("browserVersion", browserVersion);

        // TODO: Set OS capabilities
        capabilities.setCapability("os", os);
        capabilities.setCapability("osVersion", osVersion);

        // TODO: Set BrowserStack specific capabilities
        capabilities.setCapability("name", "Exercise 5 - Cross Browser Test");
        capabilities.setCapability("build", "BrowserStack Build 1");
        capabilities.setCapability("project", "Cross Browser Testing Project");

        // TODO: Enable various BrowserStack features
        capabilities.setCapability("browserstack.debug", "true");
        capabilities.setCapability("browserstack.console", "info");
        capabilities.setCapability("browserstack.networkLogs", "true");

        // TODO: Create RemoteWebDriver
        driver = new RemoteWebDriver(new URL(URL), capabilities);

        System.out.println("Testing on BrowserStack: " + browser + " " +
                         browserVersion + " on " + os + " " + osVersion);
    }

    @Test
    public void testOnBrowserStack() {
        // TODO: Navigate to test URL
        driver.get("https://www.browserstack.com");

        // TODO: Perform test actions
        String title = driver.getTitle();
        System.out.println("Page Title: " + title);

        // TODO: Mark test as passed/failed in BrowserStack
        // This helps in BrowserStack dashboard
        try {
            org.junit.Assert.assertTrue(title.contains("BrowserStack"));
            markTestStatus("passed", "Test passed successfully", driver);
        } catch (AssertionError e) {
            markTestStatus("failed", e.getMessage(), driver);
            throw e;
        }
    }

    @AfterMethod
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }

    // Helper method to mark test status in BrowserStack
    public static void markTestStatus(String status, String reason, WebDriver driver) {
        // TODO: Use JavascriptExecutor to mark test status
        org.openqa.selenium.JavascriptExecutor jse =
            (org.openqa.selenium.JavascriptExecutor) driver;
        jse.executeScript(
            "browserstack_executor: {\"action\": \"setSessionStatus\", " +
            "\"arguments\": {\"status\": \"" + status + "\", " +
            "\"reason\": \"" + reason + "\"}}"
        );
    }
}
```

**TestNG XML for Multiple Configurations**:
```xml
<suite name="BrowserStack Cross-Browser Suite" parallel="tests" thread-count="3">
    <!-- Chrome on Windows 10 -->
    <test name="Chrome Windows 10">
        <parameter name="browser" value="Chrome"/>
        <parameter name="browserVersion" value="latest"/>
        <parameter name="os" value="Windows"/>
        <parameter name="osVersion" value="10"/>
        <classes>
            <class name="com.automation.cloud.Exercise5_BrowserStackTest"/>
        </classes>
    </test>

    <!-- Firefox on Windows 11 -->
    <test name="Firefox Windows 11">
        <parameter name="browser" value="Firefox"/>
        <parameter name="browserVersion" value="latest"/>
        <parameter name="os" value="Windows"/>
        <parameter name="osVersion" value="11"/>
        <classes>
            <class name="com.automation.cloud.Exercise5_BrowserStackTest"/>
        </classes>
    </test>

    <!-- Safari on Mac -->
    <test name="Safari macOS">
        <parameter name="browser" value="Safari"/>
        <parameter name="browserVersion" value="latest"/>
        <parameter name="os" value="OS X"/>
        <parameter name="osVersion" value="Ventura"/>
        <classes>
            <class name="com.automation.cloud.Exercise5_BrowserStackTest"/>
        </classes>
    </test>
</suite>
```

**Expected Outcome**:
- Tests execute on BrowserStack cloud infrastructure
- Multiple browser/OS combinations tested simultaneously
- Test results visible in BrowserStack dashboard
- Screenshots and logs available for debugging
- Test marked as passed/failed in dashboard
- Video recording available for failed tests

**Common Mistakes to Avoid**:
1. Not signing up for BrowserStack account first
2. Hardcoding credentials instead of using environment variables
3. Using incorrect capability names (case-sensitive)
4. Not setting "name", "build", "project" capabilities
5. Forgetting to mark test status causing all tests to show as "completed"

**Solution Approach**:
- Sign up at browserstack.com for free trial
- Get credentials from Settings > Automate
- Use format: `https://USERNAME:ACCESS_KEY@hub-cloud.browserstack.com/wd/hub`
- Use DesiredCapabilities to set browser, OS, and features
- Enable debugging features: browserstack.debug, browserstack.console
- Use JavascriptExecutor with "browserstack_executor" to mark status
- View results at https://automate.browserstack.com
- Use environment variables for credentials:
  ```java
  String username = System.getenv("BROWSERSTACK_USERNAME");
  String accessKey = System.getenv("BROWSERSTACK_ACCESS_KEY");
  ```

---

### Exercise 6: Create Complete Cross-Browser Test Report (50 minutes)

**Objective**: Build a comprehensive reporting system that captures browser-specific test results, failures, and execution metrics.

**Scenario**: Your team needs detailed reports showing which tests passed/failed on which browsers, with execution time and failure reasons.

**Requirements**:
1. Create BrowserTestResult class to store test data
2. Create CrossBrowserTestReporter class to collect results
3. Capture test results for each browser separately
4. Generate HTML report with browser-wise summary
5. Include pass/fail counts, execution time, and failure details
6. Integrate with TestNG listeners for automatic reporting

**Code Template**:
```java
package com.automation.reporting;

import java.util.*;

public class BrowserTestResult {
    private String browserName;
    private String browserVersion;
    private String testName;
    private String status;  // PASS, FAIL, SKIP
    private long executionTime;
    private String failureReason;
    private String timestamp;

    // TODO: Create constructor
    public BrowserTestResult(String browserName, String testName, String status) {
        this.browserName = browserName;
        this.testName = testName;
        this.status = status;
        this.timestamp = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
                             .format(new Date());
    }

    // TODO: Add getters and setters
    // ... (generate using IDE)
}
```

**Reporter Class**:
```java
package com.automation.reporting;

import java.io.*;
import java.util.*;

public class CrossBrowserTestReporter {

    private static Map<String, List<BrowserTestResult>> results = new HashMap<>();

    public static void addResult(String browser, BrowserTestResult result) {
        // TODO: Add result to map
        results.computeIfAbsent(browser, k -> new ArrayList<>()).add(result);
    }

    public static void generateHTMLReport(String filePath) throws IOException {
        // TODO: Create HTML report file
        StringBuilder html = new StringBuilder();

        // TODO: Add HTML header
        html.append("<!DOCTYPE html><html><head>");
        html.append("<title>Cross-Browser Test Report</title>");
        html.append("<style>");
        html.append("body { font-family: Arial; margin: 20px; }");
        html.append("table { border-collapse: collapse; width: 100%; }");
        html.append("th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }");
        html.append("th { background-color: #4CAF50; color: white; }");
        html.append(".pass { background-color: #90EE90; }");
        html.append(".fail { background-color: #FFB6C1; }");
        html.append(".skip { background-color: #FFE4B5; }");
        html.append("</style></head><body>");

        // TODO: Add report title and timestamp
        html.append("<h1>Cross-Browser Test Execution Report</h1>");
        html.append("<p>Generated: ").append(new Date()).append("</p>");

        // TODO: Add summary section
        html.append("<h2>Summary</h2>");
        html.append("<table>");
        html.append("<tr><th>Browser</th><th>Total</th><th>Pass</th><th>Fail</th><th>Skip</th><th>Pass %</th></tr>");

        // TODO: Calculate and add summary for each browser
        for (String browser : results.keySet()) {
            List<BrowserTestResult> browserResults = results.get(browser);
            int total = browserResults.size();
            int pass = 0, fail = 0, skip = 0;

            for (BrowserTestResult result : browserResults) {
                if (result.getStatus().equals("PASS")) pass++;
                else if (result.getStatus().equals("FAIL")) fail++;
                else if (result.getStatus().equals("SKIP")) skip++;
            }

            double passPercentage = (pass * 100.0) / total;

            html.append("<tr>");
            html.append("<td>").append(browser).append("</td>");
            html.append("<td>").append(total).append("</td>");
            html.append("<td class='pass'>").append(pass).append("</td>");
            html.append("<td class='fail'>").append(fail).append("</td>");
            html.append("<td class='skip'>").append(skip).append("</td>");
            html.append("<td>").append(String.format("%.2f%%", passPercentage)).append("</td>");
            html.append("</tr>");
        }

        html.append("</table>");

        // TODO: Add detailed results section
        html.append("<h2>Detailed Results</h2>");

        for (String browser : results.keySet()) {
            html.append("<h3>").append(browser).append("</h3>");
            html.append("<table>");
            html.append("<tr><th>Test Name</th><th>Status</th><th>Execution Time</th><th>Timestamp</th><th>Failure Reason</th></tr>");

            for (BrowserTestResult result : results.get(browser)) {
                String rowClass = result.getStatus().toLowerCase();
                html.append("<tr class='").append(rowClass).append("'>");
                html.append("<td>").append(result.getTestName()).append("</td>");
                html.append("<td>").append(result.getStatus()).append("</td>");
                html.append("<td>").append(result.getExecutionTime()).append(" ms</td>");
                html.append("<td>").append(result.getTimestamp()).append("</td>");
                html.append("<td>").append(result.getFailureReason() != null ? result.getFailureReason() : "-").append("</td>");
                html.append("</tr>");
            }

            html.append("</table>");
        }

        html.append("</body></html>");

        // TODO: Write HTML to file
        try (FileWriter writer = new FileWriter(filePath)) {
            writer.write(html.toString());
        }

        System.out.println("Report generated: " + filePath);
    }

    public static void clearResults() {
        results.clear();
    }
}
```

**TestNG Listener**:
```java
package com.automation.listeners;

import org.testng.*;
import com.automation.reporting.*;

public class CrossBrowserReportListener implements ITestListener {

    private long startTime;

    @Override
    public void onTestStart(ITestResult result) {
        startTime = System.currentTimeMillis();
    }

    @Override
    public void onTestSuccess(ITestResult result) {
        // TODO: Get browser name from parameters or capabilities
        String browser = getBrowserName(result);
        long executionTime = System.currentTimeMillis() - startTime;

        BrowserTestResult testResult = new BrowserTestResult(
            browser,
            result.getMethod().getMethodName(),
            "PASS"
        );
        testResult.setExecutionTime(executionTime);

        CrossBrowserTestReporter.addResult(browser, testResult);
    }

    @Override
    public void onTestFailure(ITestResult result) {
        // TODO: Record failure with reason
        String browser = getBrowserName(result);
        long executionTime = System.currentTimeMillis() - startTime;

        BrowserTestResult testResult = new BrowserTestResult(
            browser,
            result.getMethod().getMethodName(),
            "FAIL"
        );
        testResult.setExecutionTime(executionTime);
        testResult.setFailureReason(result.getThrowable().getMessage());

        CrossBrowserTestReporter.addResult(browser, testResult);
    }

    @Override
    public void onFinish(ITestContext context) {
        // TODO: Generate report after all tests complete
        try {
            CrossBrowserTestReporter.generateHTMLReport("cross-browser-report.html");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private String getBrowserName(ITestResult result) {
        // TODO: Extract browser name from test parameters
        ITestNGMethod method = result.getMethod();
        String browser = method.getXmlTest().getParameter("browser");
        return browser != null ? browser : "Unknown";
    }
}
```

**Usage in TestNG XML**:
```xml
<suite name="Cross-Browser Suite">
    <listeners>
        <listener class-name="com.automation.listeners.CrossBrowserReportListener"/>
    </listeners>

    <!-- Test configurations -->
</suite>
```

**Expected Outcome**:
- HTML report generated with browser-wise summary
- Pass/Fail/Skip counts for each browser
- Pass percentage calculated for each browser
- Detailed test results with execution time
- Failure reasons captured and displayed
- Color-coded results (green=pass, red=fail, yellow=skip)
- Professional-looking report accessible in browser

**Common Mistakes to Avoid**:
1. Not implementing all ITestListener methods (use default implementations)
2. Forgetting to register listener in testng.xml
3. Not handling null parameters when getting browser name
4. Not closing FileWriter causing incomplete report
5. Not using thread-safe collections when tests run in parallel

**Solution Approach**:
- Use HashMap to group results by browser name
- Use computeIfAbsent to create lists lazily
- Extract browser name from TestNG parameters or WebDriver capabilities
- Calculate summary stats by iterating through results
- Use StringBuilder for efficient HTML generation
- Apply CSS classes for colored status indicators
- Write complete HTML structure with proper tags
- Use try-with-resources for file operations
- Register listener in testng.xml <listeners> section
- For thread-safety, use ConcurrentHashMap if tests run in parallel

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
