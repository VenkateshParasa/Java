# Day 17: Browser Options & Capabilities

**Week 3: Screenshots, Browser Options & TestNG Basics**

---

## 📋 Table of Contents
- [Learning Objectives](#learning-objectives)
- [Understanding Browser Options](#understanding-browser-options)
- [ChromeOptions](#chromeoptions)
- [FirefoxOptions](#firefoxoptions)
- [EdgeOptions](#edgeoptions)
- [Desired Capabilities](#desired-capabilities)
- [Practical Exercises](#practical-exercises)
- [Key Takeaways](#key-takeaways)
- [Navigation](#navigation)

---

## 🎯 Learning Objectives

By the end of Day 17, you will be able to:
- Understand browser options and capabilities
- Configure [`ChromeOptions`](org.openqa.selenium.chrome.ChromeOptions)
- Configure [`FirefoxOptions`](org.openqa.selenium.firefox.FirefoxOptions)
- Configure [`EdgeOptions`](org.openqa.selenium.edge.EdgeOptions)
- Run browsers in headless mode
- Set browser window size and position
- Disable browser notifications
- Handle SSL certificates
- Set download directories
- Use browser profiles
- Configure proxy settings

---

## 📚 Understanding Browser Options

### What are Browser Options?

Browser options allow you to customize browser behavior before launching it:
- Window size and position
- Headless mode (no UI)
- Extensions and plugins
- User preferences
- Download settings
- Security settings

### Why Use Browser Options?

**Benefits**:
- **CI/CD Integration**: Run tests headless in pipelines
- **Performance**: Headless mode is faster
- **Consistency**: Same settings across environments
- **Flexibility**: Customize for different scenarios
- **Debugging**: Enable logging and developer tools

---

## 🌐 ChromeOptions

[`ChromeOptions`](org.openqa.selenium.chrome.ChromeOptions) is used to customize Chrome browser behavior.

### Basic ChromeOptions Example

```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import io.github.bonigarcia.wdm.WebDriverManager;

public class BasicChromeOptions {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        
        // Create ChromeOptions
        ChromeOptions options = new ChromeOptions();
        
        // Add arguments
        options.addArguments("--start-maximized");
        options.addArguments("--disable-notifications");
        
        // Create driver with options
        WebDriver driver = new ChromeDriver(options);
        
        try {
            driver.get("https://www.google.com");
            System.out.println("Browser opened with custom options!");
        } finally {
            driver.quit();
        }
    }
}
```

### Common Chrome Arguments

```java
ChromeOptions options = new ChromeOptions();

// Window Management
options.addArguments("--start-maximized");           // Start maximized
options.addArguments("--window-size=1920,1080");     // Set window size
options.addArguments("--window-position=0,0");       // Set position

// Headless Mode
options.addArguments("--headless");                  // Run without UI
options.addArguments("--disable-gpu");               // Disable GPU (for headless)

// Notifications & Popups
options.addArguments("--disable-notifications");     // Disable notifications
options.addArguments("--disable-popup-blocking");    // Disable popup blocking

// Security & Privacy
options.addArguments("--incognito");                 // Private browsing
options.addArguments("--disable-web-security");      // Disable web security
options.addArguments("--ignore-certificate-errors"); // Ignore SSL errors

// Performance
options.addArguments("--disable-extensions");        // Disable extensions
options.addArguments("--disable-dev-shm-usage");     // Overcome limited resource
options.addArguments("--no-sandbox");                // Bypass OS security model

// Logging
options.addArguments("--enable-logging");            // Enable logging
options.addArguments("--v=1");                       // Verbose logging
```

### Headless Chrome Example

```java
public class HeadlessChrome {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        options.addArguments("--disable-gpu");
        options.addArguments("--window-size=1920,1080");
        
        WebDriver driver = new ChromeDriver(options);
        
        try {
            driver.get("https://www.example.com");
            System.out.println("Title: " + driver.getTitle());
            System.out.println("Headless mode - no browser window visible!");
        } finally {
            driver.quit();
        }
    }
}
```

### Chrome Preferences

Set Chrome preferences using [`setExperimentalOption()`](org.openqa.selenium.chrome.ChromeOptions.setExperimentalOption()):

```java
import java.util.HashMap;
import java.util.Map;

public class ChromePreferences {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        
        ChromeOptions options = new ChromeOptions();
        
        // Set preferences
        Map<String, Object> prefs = new HashMap<>();
        
        // Download settings
        prefs.put("download.default_directory", "/path/to/downloads");
        prefs.put("download.prompt_for_download", false);
        prefs.put("download.directory_upgrade", true);
        
        // Disable PDF viewer
        prefs.put("plugins.always_open_pdf_externally", true);
        
        // Disable images (faster loading)
        prefs.put("profile.managed_default_content_settings.images", 2);
        
        // Set language
        prefs.put("intl.accept_languages", "en-US");
        
        options.setExperimentalOption("prefs", prefs);
        
        WebDriver driver = new ChromeDriver(options);
        
        try {
            driver.get("https://www.example.com");
            System.out.println("Browser opened with custom preferences!");
        } finally {
            driver.quit();
        }
    }
}
```

### Chrome Extensions

```java
public class ChromeWithExtension {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        
        ChromeOptions options = new ChromeOptions();
        
        // Add extension (.crx file)
        options.addExtensions(new File("path/to/extension.crx"));
        
        WebDriver driver = new ChromeDriver(options);
        
        try {
            driver.get("https://www.example.com");
            System.out.println("Browser opened with extension!");
        } finally {
            driver.quit();
        }
    }
}
```

### Chrome User Profile

```java
public class ChromeUserProfile {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        
        ChromeOptions options = new ChromeOptions();
        
        // Use existing Chrome profile
        String userProfile = "C:\\Users\\YourName\\AppData\\Local\\Google\\Chrome\\User Data";
        options.addArguments("user-data-dir=" + userProfile);
        options.addArguments("profile-directory=Default");
        
        WebDriver driver = new ChromeDriver(options);
        
        try {
            driver.get("https://www.gmail.com");
            System.out.println("Using existing Chrome profile - may be already logged in!");
        } finally {
            driver.quit();
        }
    }
}
```

---

## 🦊 FirefoxOptions

[`FirefoxOptions`](org.openqa.selenium.firefox.FirefoxOptions) customizes Firefox browser.

### Basic FirefoxOptions Example

```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import io.github.bonigarcia.wdm.WebDriverManager;

public class BasicFirefoxOptions {
    public static void main(String[] args) {
        WebDriverManager.firefoxdriver().setup();
        
        FirefoxOptions options = new FirefoxOptions();
        
        // Add arguments
        options.addArguments("--width=1920");
        options.addArguments("--height=1080");
        
        WebDriver driver = new FirefoxDriver(options);
        
        try {
            driver.get("https://www.mozilla.org");
            System.out.println("Firefox opened with custom options!");
        } finally {
            driver.quit();
        }
    }
}
```

### Headless Firefox

```java
public class HeadlessFirefox {
    public static void main(String[] args) {
        WebDriverManager.firefoxdriver().setup();
        
        FirefoxOptions options = new FirefoxOptions();
        options.addArguments("--headless");
        options.addArguments("--width=1920");
        options.addArguments("--height=1080");
        
        WebDriver driver = new FirefoxDriver(options);
        
        try {
            driver.get("https://www.example.com");
            System.out.println("Title: " + driver.getTitle());
            System.out.println("Firefox headless mode!");
        } finally {
            driver.quit();
        }
    }
}
```

### Firefox Preferences

```java
public class FirefoxPreferences {
    public static void main(String[] args) {
        WebDriverManager.firefoxdriver().setup();
        
        FirefoxOptions options = new FirefoxOptions();
        
        // Set preferences
        options.addPreference("browser.download.folderList", 2);
        options.addPreference("browser.download.dir", "/path/to/downloads");
        options.addPreference("browser.helperApps.neverAsk.saveToDisk", 
                            "application/pdf,application/zip");
        
        // Disable notifications
        options.addPreference("dom.webnotifications.enabled", false);
        
        // Set language
        options.addPreference("intl.accept_languages", "en-US");
        
        WebDriver driver = new FirefoxDriver(options);
        
        try {
            driver.get("https://www.example.com");
            System.out.println("Firefox with custom preferences!");
        } finally {
            driver.quit();
        }
    }
}
```

### Firefox Profile

```java
import org.openqa.selenium.firefox.FirefoxProfile;

public class FirefoxWithProfile {
    public static void main(String[] args) {
        WebDriverManager.firefoxdriver().setup();
        
        // Create Firefox profile
        FirefoxProfile profile = new FirefoxProfile();
        
        // Set profile preferences
        profile.setPreference("browser.download.folderList", 2);
        profile.setPreference("browser.download.dir", "/downloads");
        profile.setPreference("browser.helperApps.neverAsk.saveToDisk", 
                            "application/pdf");
        
        FirefoxOptions options = new FirefoxOptions();
        options.setProfile(profile);
        
        WebDriver driver = new FirefoxDriver(options);
        
        try {
            driver.get("https://www.example.com");
            System.out.println("Firefox with custom profile!");
        } finally {
            driver.quit();
        }
    }
}
```

---

## 🌊 EdgeOptions

[`EdgeOptions`](org.openqa.selenium.edge.EdgeOptions) customizes Microsoft Edge browser.

### Basic EdgeOptions Example

```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.edge.EdgeOptions;
import io.github.bonigarcia.wdm.WebDriverManager;

public class BasicEdgeOptions {
    public static void main(String[] args) {
        WebDriverManager.edgedriver().setup();
        
        EdgeOptions options = new EdgeOptions();
        
        // Add arguments (similar to Chrome)
        options.addArguments("--start-maximized");
        options.addArguments("--disable-notifications");
        
        WebDriver driver = new EdgeDriver(options);
        
        try {
            driver.get("https://www.microsoft.com");
            System.out.println("Edge opened with custom options!");
        } finally {
            driver.quit();
        }
    }
}
```

### Headless Edge

```java
public class HeadlessEdge {
    public static void main(String[] args) {
        WebDriverManager.edgedriver().setup();
        
        EdgeOptions options = new EdgeOptions();
        options.addArguments("--headless");
        options.addArguments("--disable-gpu");
        options.addArguments("--window-size=1920,1080");
        
        WebDriver driver = new EdgeDriver(options);
        
        try {
            driver.get("https://www.example.com");
            System.out.println("Title: " + driver.getTitle());
            System.out.println("Edge headless mode!");
        } finally {
            driver.quit();
        }
    }
}
```

**Note**: Edge is Chromium-based, so most Chrome arguments work with Edge.

---

## 🎯 Desired Capabilities (Legacy)

**Note**: Desired Capabilities are deprecated in Selenium 4. Use browser-specific Options classes instead.

### Modern Approach (Selenium 4)

```java
// ✅ GOOD: Use Options classes
ChromeOptions options = new ChromeOptions();
options.addArguments("--headless");
WebDriver driver = new ChromeDriver(options);

// ❌ BAD: Deprecated DesiredCapabilities
DesiredCapabilities capabilities = new DesiredCapabilities();
capabilities.setCapability("browserName", "chrome");
```

---

## 🛠️ Practical Use Cases

### 1. CI/CD Pipeline Configuration

```java
public class CIPipelineConfig {
    public static WebDriver getCIDriver() {
        WebDriverManager.chromedriver().setup();
        
        ChromeOptions options = new ChromeOptions();
        
        // Headless for CI/CD
        options.addArguments("--headless");
        options.addArguments("--disable-gpu");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        
        // Window size
        options.addArguments("--window-size=1920,1080");
        
        // Disable unnecessary features
        options.addArguments("--disable-extensions");
        options.addArguments("--disable-notifications");
        
        return new ChromeDriver(options);
    }
    
    public static void main(String[] args) {
        WebDriver driver = getCIDriver();
        
        try {
            driver.get("https://www.example.com");
            System.out.println("Running in CI/CD mode!");
        } finally {
            driver.quit();
        }
    }
}
```

### 2. Download File Configuration

```java
import java.util.HashMap;
import java.util.Map;

public class DownloadFileConfig {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        
        ChromeOptions options = new ChromeOptions();
        
        // Set download directory
        Map<String, Object> prefs = new HashMap<>();
        prefs.put("download.default_directory", 
                 System.getProperty("user.dir") + "/downloads");
        prefs.put("download.prompt_for_download", false);
        prefs.put("download.directory_upgrade", true);
        prefs.put("safebrowsing.enabled", true);
        
        options.setExperimentalOption("prefs", prefs);
        
        WebDriver driver = new ChromeDriver(options);
        
        try {
            driver.get("https://file-examples.com/");
            System.out.println("Ready to download files!");
            // Click download link
            // File will be saved to specified directory
        } finally {
            driver.quit();
        }
    }
}
```

### 3. Mobile Emulation

```java
import java.util.HashMap;
import java.util.Map;

public class MobileEmulation {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        
        ChromeOptions options = new ChromeOptions();
        
        // Emulate mobile device
        Map<String, String> mobileEmulation = new HashMap<>();
        mobileEmulation.put("deviceName", "iPhone 12 Pro");
        
        options.setExperimentalOption("mobileEmulation", mobileEmulation);
        
        WebDriver driver = new ChromeDriver(options);
        
        try {
            driver.get("https://www.example.com");
            System.out.println("Emulating iPhone 12 Pro!");
        } finally {
            driver.quit();
        }
    }
}
```

### 4. Proxy Configuration

```java
import org.openqa.selenium.Proxy;

public class ProxyConfiguration {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        
        // Create proxy
        Proxy proxy = new Proxy();
        proxy.setHttpProxy("proxy.example.com:8080");
        proxy.setSslProxy("proxy.example.com:8080");
        
        ChromeOptions options = new ChromeOptions();
        options.setProxy(proxy);
        
        WebDriver driver = new ChromeDriver(options);
        
        try {
            driver.get("https://www.example.com");
            System.out.println("Using proxy server!");
        } finally {
            driver.quit();
        }
    }
}
```

### 5. Browser Factory Pattern

```java
public class BrowserFactory {
    
    public static WebDriver getDriver(String browserName) {
        WebDriver driver;
        
        switch (browserName.toLowerCase()) {
            case "chrome":
                WebDriverManager.chromedriver().setup();
                ChromeOptions chromeOptions = new ChromeOptions();
                chromeOptions.addArguments("--start-maximized");
                driver = new ChromeDriver(chromeOptions);
                break;
                
            case "firefox":
                WebDriverManager.firefoxdriver().setup();
                FirefoxOptions firefoxOptions = new FirefoxOptions();
                firefoxOptions.addArguments("--width=1920");
                firefoxOptions.addArguments("--height=1080");
                driver = new FirefoxDriver(firefoxOptions);
                break;
                
            case "edge":
                WebDriverManager.edgedriver().setup();
                EdgeOptions edgeOptions = new EdgeOptions();
                edgeOptions.addArguments("--start-maximized");
                driver = new EdgeDriver(edgeOptions);
                break;
                
            case "chrome-headless":
                WebDriverManager.chromedriver().setup();
                ChromeOptions headlessOptions = new ChromeOptions();
                headlessOptions.addArguments("--headless");
                headlessOptions.addArguments("--disable-gpu");
                driver = new ChromeDriver(headlessOptions);
                break;
                
            default:
                throw new IllegalArgumentException("Browser not supported: " + browserName);
        }
        
        return driver;
    }
    
    public static void main(String[] args) {
        // Easy browser switching
        WebDriver driver = getDriver("chrome");
        
        try {
            driver.get("https://www.example.com");
            System.out.println("Browser: Chrome");
        } finally {
            driver.quit();
        }
    }
}
```

---

## 💻 Practical Exercises

### Exercise 1: Headless Browser
Create a script that:
1. Runs Chrome in headless mode
2. Opens 3 different websites
3. Prints titles of all pages
4. Measures execution time

### Exercise 2: Custom Window Size
Create a script that:
1. Opens browser with 800x600 size
2. Takes screenshot
3. Resizes to 1920x1080
4. Takes another screenshot
5. Compares both

### Exercise 3: Disable Notifications
Create a script that:
1. Opens a site with notifications
2. Disables notifications via options
3. Verifies no notification popup appears

### Exercise 4: Download Configuration
Create a script that:
1. Sets custom download directory
2. Downloads a PDF file
3. Verifies file exists in directory
4. Prints file path

### Exercise 5: Browser Factory
Create a BrowserFactory class that:
1. Supports Chrome, Firefox, Edge
2. Supports headless mode for each
3. Accepts browser name from command line
4. Returns configured WebDriver

### Exercise 6: Mobile Emulation
Create a script that:
1. Emulates iPhone 12
2. Opens responsive website
3. Takes screenshot
4. Verifies mobile view

### Exercise 7: Incognito Mode
Create a script that:
1. Opens Chrome in incognito
2. Verifies no cookies from previous session
3. Performs login
4. Closes browser
5. Reopens and verifies not logged in

---

## 🔑 Key Takeaways

### Essential Concepts

1. **Browser Options Classes**
   - ChromeOptions for Chrome
   - FirefoxOptions for Firefox
   - EdgeOptions for Edge
   - Pass to driver constructor

2. **Common Configurations**
   - Headless mode for CI/CD
   - Window size for consistency
   - Disable notifications
   - Custom download directory
   - Proxy settings

3. **Best Practices**
   - Use Options classes (not DesiredCapabilities)
   - Create browser factory for flexibility
   - Configure for environment (local vs CI/CD)
   - Document custom configurations
   - Test with different options

4. **Performance Tips**
   - Headless mode is faster
   - Disable unnecessary features
   - Use appropriate window size
   - Disable images for speed tests

### Common Use Cases

| Scenario | Configuration |
|----------|---------------|
| CI/CD Pipeline | Headless, no-sandbox, disable-dev-shm-usage |
| Local Development | Maximized window, visible browser |
| Download Testing | Custom download directory, no prompt |
| Mobile Testing | Mobile emulation, specific device |
| Security Testing | Proxy configuration, SSL handling |

---

## 🧭 Navigation

### Week 3 Progress:
- [← Day 16: Screenshots & Visual Testing](day16_screenshots_visual_testing.md)
- **Day 17: Browser Options & Capabilities** ← You are here
- [Day 18: TestNG Part 1 - Basics →](day18_testng_part1.md)
- [Day 19: TestNG Part 2 - Annotations](day19_testng_part2.md)
- [Day 20: TestNG Part 3 - Organization](day20_testng_part3.md)
- [Day 21: TestNG Part 4 - Data-Driven](day21_testng_part4.md)
- [Day 22: TestNG Part 5 - Advanced](day22_testng_part5.md)

### Related Resources:
- [Week 3 Overview](README.md)
- [Selenium Course Overview](../README.md)

---

## ✅ Day 17 Checklist

Before moving to Day 18, ensure you can:
- [ ] Use ChromeOptions effectively
- [ ] Configure headless mode
- [ ] Set window size and position
- [ ] Disable browser notifications
- [ ] Configure download directory
- [ ] Use FirefoxOptions
- [ ] Use EdgeOptions
- [ ] Create browser factory pattern
- [ ] Configure proxy settings
- [ ] Emulate mobile devices
- [ ] Complete all practice exercises

---

**🎉 Congratulations on completing Day 17!**

You now know how to customize browser behavior using options and capabilities. Tomorrow, we'll start learning TestNG, the powerful testing framework for Selenium!

**Next**: [Day 18: TestNG Part 1 - Basics →](day18_testng_part1.md)

---

*Last Updated: 2026-01-14*
*Difficulty: Intermediate*
*Estimated Time: 3-4 hours*