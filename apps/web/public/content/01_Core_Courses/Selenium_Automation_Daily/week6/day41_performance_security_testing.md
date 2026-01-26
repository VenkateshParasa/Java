# Day 48: Performance & Security Testing Basics

## Table of Contents
1. [Learning Objectives](#learning-objectives)
2. [Introduction to Performance Testing](#introduction-to-performance-testing)
3. [Types of Performance Testing](#types-of-performance-testing)
4. [Performance Metrics](#performance-metrics)
5. [Performance Testing with Selenium](#performance-testing-with-selenium)
6. [Navigation Timing API](#navigation-timing-api)
7. [Resource Timing API](#resource-timing-api)
8. [Performance Marks and Measures](#performance-marks-and-measures)
9. [JMeter Basics Integration](#jmeter-basics-integration)
10. [Lighthouse Integration](#lighthouse-integration)
11. [Performance Best Practices](#performance-best-practices)
12. [Common Performance Bottlenecks](#common-performance-bottlenecks)
13. [Introduction to Security Testing](#introduction-to-security-testing)
14. [OWASP Top 10 Vulnerabilities](#owasp-top-10-vulnerabilities)
15. [XSS Testing](#xss-testing)
16. [SQL Injection Testing](#sql-injection-testing)
17. [CSRF Testing](#csrf-testing)
18. [Security Headers Validation](#security-headers-validation)
19. [SSL/TLS Certificate Testing](#ssltls-certificate-testing)
20. [Authentication & Authorization Testing](#authentication-authorization-testing)
21. [Sensitive Data Exposure Testing](#sensitive-data-exposure-testing)
22. [Security Testing Best Practices](#security-testing-best-practices)
23. [Practical Exercises](#practical-exercises)
24. [Key Takeaways](#key-takeaways)
25. [Interview Questions](#interview-questions)

---

## Learning Objectives

By the end of this lesson, you will be able to:

1. Understand performance testing concepts and types
2. Measure key performance metrics using Selenium
3. Implement Navigation Timing API for page load analysis
4. Use Resource Timing API for resource performance
5. Create performance marks and measures
6. Integrate JMeter with Selenium tests
7. Use Lighthouse for web performance audits
8. Identify and resolve performance bottlenecks
9. Understand OWASP Top 10 security vulnerabilities
10. Test for XSS (Cross-Site Scripting) vulnerabilities
11. Detect SQL Injection vulnerabilities
12. Validate CSRF protection mechanisms
13. Test security headers and SSL/TLS certificates
14. Implement authentication and authorization testing
15. Detect sensitive data exposure issues
16. Apply security testing best practices
17. Integrate performance and security tests in automation framework
18. Create comprehensive performance and security test reports
19. Use industry-standard tools for security testing
20. Follow compliance and security standards

---

## Introduction to Performance Testing

### What is Performance Testing?

**Performance Testing** is a type of non-functional testing that determines how a system performs in terms of responsiveness, stability, scalability, and speed under a particular workload.

### Why Performance Testing Matters

```
Business Impact:
┌─────────────────────────────────────┐
│ 1 second delay = 7% loss in         │
│ conversions (Amazon study)           │
│                                      │
│ 100ms delay = 1% drop in sales      │
│ (Amazon)                             │
│                                      │
│ 2 second delay = 103% increase in   │
│ bounce rate (Google)                 │
└─────────────────────────────────────┘
```

### Performance Testing Goals

1. **Validate Speed**: Ensure application responds quickly
2. **Check Stability**: Verify system remains stable under load
3. **Verify Scalability**: Test if system scales with increased load
4. **Identify Bottlenecks**: Find performance issues before production
5. **Capacity Planning**: Determine infrastructure requirements
6. **User Experience**: Ensure smooth user experience

### Performance Testing Process

```
1. Identify Test Environment
          ↓
2. Define Performance Criteria
          ↓
3. Plan & Design Tests
          ↓
4. Configure Test Environment
          ↓
5. Implement Test Design
          ↓
6. Execute Tests
          ↓
7. Analyze Results
          ↓
8. Retest & Optimize
```

---

## Types of Performance Testing

### 1. Load Testing

**Purpose**: Verify system behavior under expected load conditions.

```java
/**
 * Load Testing Example
 * Simulating 100 concurrent users accessing the application
 */
@Test
public void loadTest() {
    int numberOfUsers = 100;
    List<Thread> threads = new ArrayList<>();

    for (int i = 0; i < numberOfUsers; i++) {
        Thread thread = new Thread(() -> {
            WebDriver driver = DriverManager.getDriver();
            try {
                driver.get("https://example.com");
                // Perform user actions
                performUserJourney(driver);
            } finally {
                driver.quit();
            }
        });
        threads.add(thread);
        thread.start();
    }

    // Wait for all threads to complete
    for (Thread thread : threads) {
        thread.join();
    }
}
```

### 2. Stress Testing

**Purpose**: Test system behavior under extreme conditions beyond normal capacity.

```java
/**
 * Stress Testing Example
 * Gradually increase load until system breaks
 */
@Test
public void stressTest() {
    int startUsers = 10;
    int maxUsers = 1000;
    int increment = 50;

    for (int users = startUsers; users <= maxUsers; users += increment) {
        long startTime = System.currentTimeMillis();

        try {
            simulateLoad(users);
            long responseTime = System.currentTimeMillis() - startTime;

            System.out.println("Users: " + users +
                             ", Response Time: " + responseTime + "ms");

            if (responseTime > 5000) { // 5 second threshold
                System.out.println("Breaking point reached at " + users + " users");
                break;
            }
        } catch (Exception e) {
            System.out.println("System failed at " + users + " users");
            break;
        }
    }
}
```

### 3. Spike Testing

**Purpose**: Test system behavior with sudden increases in load.

```java
/**
 * Spike Testing Example
 * Sudden increase from baseline to peak load
 */
@Test
public void spikeTest() {
    // Baseline load
    int baselineUsers = 50;
    simulateLoad(baselineUsers);
    Thread.sleep(30000); // 30 seconds

    // Sudden spike
    int spikeUsers = 500;
    long startTime = System.currentTimeMillis();
    simulateLoad(spikeUsers);
    long responseTime = System.currentTimeMillis() - startTime;

    System.out.println("Spike Response Time: " + responseTime + "ms");
    Assert.assertTrue(responseTime < 10000, "Spike response time exceeded 10 seconds");

    // Back to baseline
    Thread.sleep(30000);
    simulateLoad(baselineUsers);
}
```

### 4. Endurance Testing (Soak Testing)

**Purpose**: Test system stability over extended period.

```java
/**
 * Endurance Testing Example
 * Run sustained load for extended duration
 */
@Test
public void enduranceTest() {
    int numberOfUsers = 100;
    long testDuration = 4 * 60 * 60 * 1000; // 4 hours
    long startTime = System.currentTimeMillis();

    ExecutorService executor = Executors.newFixedThreadPool(numberOfUsers);

    while (System.currentTimeMillis() - startTime < testDuration) {
        for (int i = 0; i < numberOfUsers; i++) {
            executor.submit(() -> {
                WebDriver driver = DriverManager.getDriver();
                try {
                    performUserJourney(driver);

                    // Monitor memory usage
                    long memoryUsed = Runtime.getRuntime().totalMemory() -
                                     Runtime.getRuntime().freeMemory();
                    System.out.println("Memory Used: " + memoryUsed / (1024 * 1024) + "MB");
                } finally {
                    driver.quit();
                }
            });
        }
        Thread.sleep(60000); // 1 minute interval
    }

    executor.shutdown();
}
```

### 5. Scalability Testing

**Purpose**: Test application's ability to scale up or down.

```java
/**
 * Scalability Testing Example
 * Test if system scales linearly with increased resources
 */
@Test
public void scalabilityTest() {
    int[] userLoads = {100, 200, 400, 800, 1600};
    Map<Integer, Long> results = new HashMap<>();

    for (int users : userLoads) {
        long responseTime = measureAverageResponseTime(users);
        results.put(users, responseTime);

        System.out.println("Users: " + users +
                         ", Avg Response Time: " + responseTime + "ms");
    }

    // Analyze scalability
    analyzeScalability(results);
}

private void analyzeScalability(Map<Integer, Long> results) {
    // Check if response time increases linearly or exponentially
    List<Integer> users = new ArrayList<>(results.keySet());
    Collections.sort(users);

    for (int i = 1; i < users.size(); i++) {
        int prevUsers = users.get(i - 1);
        int currentUsers = users.get(i);

        long prevTime = results.get(prevUsers);
        long currentTime = results.get(currentUsers);

        double scaleFactor = (double) currentUsers / prevUsers;
        double timeFactor = (double) currentTime / prevTime;

        System.out.println("Scale Factor: " + scaleFactor +
                         ", Time Factor: " + timeFactor);

        // Good scalability: time factor should be close to scale factor
        if (timeFactor > scaleFactor * 1.5) {
            System.out.println("WARNING: Poor scalability detected");
        }
    }
}
```

### 6. Volume Testing

**Purpose**: Test system with large volumes of data.

```java
/**
 * Volume Testing Example
 * Test database with large data volumes
 */
@Test
public void volumeTest() {
    WebDriver driver = new ChromeDriver();

    try {
        driver.get("https://example.com/search");

        // Test with increasing data volumes
        int[] recordCounts = {1000, 10000, 100000, 1000000};

        for (int records : recordCounts) {
            long startTime = System.currentTimeMillis();

            // Trigger search that returns specified number of records
            searchWithRecordCount(driver, records);

            long loadTime = System.currentTimeMillis() - startTime;

            System.out.println("Records: " + records +
                             ", Load Time: " + loadTime + "ms");

            // Verify page remains responsive
            Assert.assertTrue(loadTime < 30000,
                "Page load time exceeded 30 seconds for " + records + " records");
        }
    } finally {
        driver.quit();
    }
}
```

---

## Performance Metrics

### Key Performance Indicators (KPIs)

```
1. Response Time
   ├── Client Response Time
   ├── Network Latency
   ├── Server Processing Time
   └── Database Query Time

2. Throughput
   ├── Requests per Second (RPS)
   ├── Transactions per Second (TPS)
   └── Pages per Second

3. Resource Utilization
   ├── CPU Usage
   ├── Memory Usage
   ├── Disk I/O
   └── Network Bandwidth

4. Error Rate
   ├── HTTP Error Rate
   ├── Application Error Rate
   └── Timeout Rate

5. Concurrency
   ├── Concurrent Users
   ├── Concurrent Connections
   └── Active Sessions
```

### Measuring Response Time

```java
package performance;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class ResponseTimeTest {

    /**
     * Measure page load response time
     */
    @Test
    public void measureResponseTime() {
        WebDriver driver = new ChromeDriver();

        try {
            long startTime = System.currentTimeMillis();
            driver.get("https://example.com");
            long endTime = System.currentTimeMillis();

            long responseTime = endTime - startTime;

            System.out.println("Page Load Time: " + responseTime + "ms");

            // Performance assertions
            Assert.assertTrue(responseTime < 3000,
                "Page load time should be less than 3 seconds");

            // Log metrics
            logPerformanceMetric("PageLoadTime", responseTime);
        } finally {
            driver.quit();
        }
    }

    /**
     * Measure element load time
     */
    @Test
    public void measureElementLoadTime() {
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://example.com");

            long startTime = System.currentTimeMillis();
            WebElement element = driver.findElement(By.id("dynamic-content"));
            long endTime = System.currentTimeMillis();

            long loadTime = endTime - startTime;

            System.out.println("Element Load Time: " + loadTime + "ms");
            Assert.assertTrue(loadTime < 2000,
                "Element should load within 2 seconds");
        } finally {
            driver.quit();
        }
    }

    /**
     * Measure transaction response time
     */
    @Test
    public void measureTransactionTime() {
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://example.com/login");

            long startTime = System.currentTimeMillis();

            // Perform login transaction
            driver.findElement(By.id("username")).sendKeys("testuser");
            driver.findElement(By.id("password")).sendKeys("password");
            driver.findElement(By.id("login-btn")).click();

            // Wait for dashboard to load
            new WebDriverWait(driver, Duration.ofSeconds(10))
                .until(ExpectedConditions.presenceOfElementLocated(
                    By.id("dashboard")));

            long endTime = System.currentTimeMillis();
            long transactionTime = endTime - startTime;

            System.out.println("Login Transaction Time: " + transactionTime + "ms");

            // Service Level Agreement (SLA) validation
            Assert.assertTrue(transactionTime < 5000,
                "Login transaction should complete within 5 seconds");
        } finally {
            driver.quit();
        }
    }
}
```

### Measuring Throughput

```java
/**
 * Throughput Measurement
 */
public class ThroughputTest {

    @Test
    public void measureThroughput() {
        int totalRequests = 1000;
        int concurrentUsers = 100;

        ExecutorService executor = Executors.newFixedThreadPool(concurrentUsers);
        CountDownLatch latch = new CountDownLatch(totalRequests);

        AtomicInteger successCount = new AtomicInteger(0);
        AtomicInteger failureCount = new AtomicInteger(0);

        long startTime = System.currentTimeMillis();

        for (int i = 0; i < totalRequests; i++) {
            executor.submit(() -> {
                try {
                    WebDriver driver = DriverManager.getDriver();
                    driver.get("https://example.com");
                    successCount.incrementAndGet();
                    driver.quit();
                } catch (Exception e) {
                    failureCount.incrementAndGet();
                } finally {
                    latch.countDown();
                }
            });
        }

        latch.await();
        long endTime = System.currentTimeMillis();

        long duration = endTime - startTime;
        double throughput = (double) totalRequests / (duration / 1000.0);

        System.out.println("Total Requests: " + totalRequests);
        System.out.println("Successful: " + successCount.get());
        System.out.println("Failed: " + failureCount.get());
        System.out.println("Duration: " + duration + "ms");
        System.out.println("Throughput: " + throughput + " requests/second");

        executor.shutdown();
    }
}
```

### Measuring Resource Utilization

```java
/**
 * Resource Utilization Monitoring
 */
public class ResourceMonitor {

    public static void monitorSystemResources() {
        OperatingSystemMXBean osBean = ManagementFactory.getOperatingSystemMXBean();
        MemoryMXBean memoryBean = ManagementFactory.getMemoryMXBean();

        // CPU Usage
        double cpuLoad = osBean.getSystemLoadAverage();
        System.out.println("CPU Load: " + cpuLoad);

        // Memory Usage
        MemoryUsage heapUsage = memoryBean.getHeapMemoryUsage();
        long usedMemory = heapUsage.getUsed() / (1024 * 1024);
        long maxMemory = heapUsage.getMax() / (1024 * 1024);

        System.out.println("Memory Used: " + usedMemory + "MB");
        System.out.println("Max Memory: " + maxMemory + "MB");
        System.out.println("Memory Usage: " +
            (usedMemory * 100.0 / maxMemory) + "%");

        // Thread Count
        ThreadMXBean threadBean = ManagementFactory.getThreadMXBean();
        int threadCount = threadBean.getThreadCount();
        System.out.println("Active Threads: " + threadCount);
    }

    @Test
    public void monitorResourcesDuringTest() {
        ExecutorService monitorExecutor = Executors.newSingleThreadExecutor();

        // Start monitoring
        Future<?> monitoringTask = monitorExecutor.submit(() -> {
            while (!Thread.currentThread().isInterrupted()) {
                monitorSystemResources();
                System.out.println("---");
                Thread.sleep(5000); // Monitor every 5 seconds
            }
        });

        // Run performance test
        runPerformanceTest();

        // Stop monitoring
        monitoringTask.cancel(true);
        monitorExecutor.shutdown();
    }
}
```

---

## Performance Testing with Selenium

### Basic Performance Test Framework

```java
package performance;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.annotations.*;
import java.util.*;

public class PerformanceTestFramework {

    private WebDriver driver;
    private PerformanceMetrics metrics;

    @BeforeMethod
    public void setUp() {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--disable-extensions");
        options.addArguments("--disable-gpu");
        options.setPageLoadStrategy(PageLoadStrategy.NORMAL);

        driver = new ChromeDriver(options);
        metrics = new PerformanceMetrics();
    }

    @Test
    public void testPageLoadPerformance() {
        String url = "https://example.com";

        // Measure page load time
        long loadTime = measurePageLoad(url);
        metrics.addMetric("PageLoadTime", loadTime);

        // Get navigation timing
        Map<String, Long> timings = getNavigationTiming();
        metrics.addAllMetrics(timings);

        // Get resource timing
        List<ResourceTiming> resources = getResourceTiming();
        analyzeResourcePerformance(resources);

        // Generate report
        metrics.generateReport();

        // Assertions
        Assert.assertTrue(loadTime < 3000, "Page load time exceeded 3 seconds");
    }

    private long measurePageLoad(String url) {
        long startTime = System.currentTimeMillis();
        driver.get(url);
        long endTime = System.currentTimeMillis();

        return endTime - startTime;
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}

/**
 * Performance Metrics Container
 */
class PerformanceMetrics {
    private Map<String, Object> metrics = new HashMap<>();

    public void addMetric(String name, Object value) {
        metrics.put(name, value);
    }

    public void addAllMetrics(Map<String, ?> metricsMap) {
        metrics.putAll(metricsMap);
    }

    public void generateReport() {
        System.out.println("=== Performance Test Report ===");
        metrics.forEach((key, value) ->
            System.out.println(key + ": " + value));
    }

    public Map<String, Object> getMetrics() {
        return new HashMap<>(metrics);
    }
}
```

### Page Load Time Measurement

```java
/**
 * Comprehensive Page Load Time Testing
 */
public class PageLoadTimeTest {

    @Test
    public void testMultiplePageLoads() {
        String[] urls = {
            "https://example.com",
            "https://example.com/products",
            "https://example.com/about",
            "https://example.com/contact"
        };

        Map<String, List<Long>> loadTimes = new HashMap<>();
        int iterations = 5;

        for (String url : urls) {
            List<Long> times = new ArrayList<>();

            for (int i = 0; i < iterations; i++) {
                WebDriver driver = new ChromeDriver();
                try {
                    long loadTime = measurePageLoad(driver, url);
                    times.add(loadTime);
                    Thread.sleep(2000); // Cool down period
                } finally {
                    driver.quit();
                }
            }

            loadTimes.put(url, times);
        }

        // Analyze results
        analyzeLoadTimes(loadTimes);
    }

    private long measurePageLoad(WebDriver driver, String url) {
        long startTime = System.currentTimeMillis();
        driver.get(url);

        // Wait for page to be fully loaded
        new WebDriverWait(driver, Duration.ofSeconds(30))
            .until(webDriver -> ((JavascriptExecutor) webDriver)
                .executeScript("return document.readyState").equals("complete"));

        long endTime = System.currentTimeMillis();
        return endTime - startTime;
    }

    private void analyzeLoadTimes(Map<String, List<Long>> loadTimes) {
        System.out.println("=== Page Load Time Analysis ===");

        for (Map.Entry<String, List<Long>> entry : loadTimes.entrySet()) {
            String url = entry.getKey();
            List<Long> times = entry.getValue();

            long min = Collections.min(times);
            long max = Collections.max(times);
            double avg = times.stream().mapToLong(Long::longValue).average().orElse(0);

            System.out.println("\nURL: " + url);
            System.out.println("Min: " + min + "ms");
            System.out.println("Max: " + max + "ms");
            System.out.println("Avg: " + String.format("%.2f", avg) + "ms");

            // Performance grade
            String grade = getPerformanceGrade(avg);
            System.out.println("Grade: " + grade);
        }
    }

    private String getPerformanceGrade(double avgLoadTime) {
        if (avgLoadTime < 1000) return "Excellent (A)";
        if (avgLoadTime < 2000) return "Good (B)";
        if (avgLoadTime < 3000) return "Average (C)";
        if (avgLoadTime < 5000) return "Poor (D)";
        return "Unacceptable (F)";
    }
}
```

---

## Navigation Timing API

### Understanding Navigation Timing

```
Navigation Timing Events:
┌─────────────────────────────────────────────────────────────┐
│ navigationStart → redirectStart → redirectEnd →             │
│ fetchStart → domainLookupStart → domainLookupEnd →         │
│ connectStart → connectEnd → requestStart →                  │
│ responseStart → responseEnd → domLoading →                  │
│ domInteractive → domContentLoadedEventStart →               │
│ domContentLoadedEventEnd → domComplete →                    │
│ loadEventStart → loadEventEnd                               │
└─────────────────────────────────────────────────────────────┘
```

### Implementing Navigation Timing

```java
package performance.timing;

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import java.util.HashMap;
import java.util.Map;

public class NavigationTimingHelper {

    private WebDriver driver;
    private JavascriptExecutor js;

    public NavigationTimingHelper(WebDriver driver) {
        this.driver = driver;
        this.js = (JavascriptExecutor) driver;
    }

    /**
     * Get all navigation timing metrics
     */
    public Map<String, Long> getAllNavigationTimings() {
        Map<String, Long> timings = new HashMap<>();

        // Get performance.timing object
        String script = "return JSON.stringify(window.performance.timing);";
        String timingJson = (String) js.executeScript(script);

        // Parse and calculate metrics
        timings.put("DNS Lookup", getDNSLookupTime());
        timings.put("TCP Connection", getTCPConnectionTime());
        timings.put("Request Time", getRequestTime());
        timings.put("Response Time", getResponseTime());
        timings.put("DOM Processing", getDOMProcessingTime());
        timings.put("DOM Interactive", getDOMInteractiveTime());
        timings.put("DOM Complete", getDOMCompleteTime());
        timings.put("Page Load Time", getPageLoadTime());
        timings.put("Full Load Time", getFullyLoadedTime());

        return timings;
    }

    /**
     * DNS Lookup Time
     * Time spent performing DNS lookup
     */
    public long getDNSLookupTime() {
        String script =
            "var timing = window.performance.timing;" +
            "return timing.domainLookupEnd - timing.domainLookupStart;";

        return (Long) js.executeScript(script);
    }

    /**
     * TCP Connection Time
     * Time to establish TCP connection
     */
    public long getTCPConnectionTime() {
        String script =
            "var timing = window.performance.timing;" +
            "return timing.connectEnd - timing.connectStart;";

        return (Long) js.executeScript(script);
    }

    /**
     * Request Time
     * Time for server to receive request
     */
    public long getRequestTime() {
        String script =
            "var timing = window.performance.timing;" +
            "return timing.responseStart - timing.requestStart;";

        return (Long) js.executeScript(script);
    }

    /**
     * Response Time
     * Time to download response
     */
    public long getResponseTime() {
        String script =
            "var timing = window.performance.timing;" +
            "return timing.responseEnd - timing.responseStart;";

        return (Long) js.executeScript(script);
    }

    /**
     * DOM Processing Time
     * Time to process DOM
     */
    public long getDOMProcessingTime() {
        String script =
            "var timing = window.performance.timing;" +
            "return timing.domComplete - timing.domLoading;";

        return (Long) js.executeScript(script);
    }

    /**
     * DOM Interactive Time
     * Time until DOM is interactive
     */
    public long getDOMInteractiveTime() {
        String script =
            "var timing = window.performance.timing;" +
            "return timing.domInteractive - timing.navigationStart;";

        return (Long) js.executeScript(script);
    }

    /**
     * DOM Complete Time
     * Time until DOM is complete
     */
    public long getDOMCompleteTime() {
        String script =
            "var timing = window.performance.timing;" +
            "return timing.domComplete - timing.navigationStart;";

        return (Long) js.executeScript(script);
    }

    /**
     * Page Load Time
     * Time from navigation start to load event
     */
    public long getPageLoadTime() {
        String script =
            "var timing = window.performance.timing;" +
            "return timing.loadEventStart - timing.navigationStart;";

        return (Long) js.executeScript(script);
    }

    /**
     * Fully Loaded Time
     * Total time until page is fully loaded
     */
    public long getFullyLoadedTime() {
        String script =
            "var timing = window.performance.timing;" +
            "return timing.loadEventEnd - timing.navigationStart;";

        return (Long) js.executeScript(script);
    }

    /**
     * Time to First Byte (TTFB)
     */
    public long getTimeToFirstByte() {
        String script =
            "var timing = window.performance.timing;" +
            "return timing.responseStart - timing.navigationStart;";

        return (Long) js.executeScript(script);
    }

    /**
     * Backend Time
     * Time spent on backend processing
     */
    public long getBackendTime() {
        String script =
            "var timing = window.performance.timing;" +
            "return timing.responseEnd - timing.requestStart;";

        return (Long) js.executeScript(script);
    }

    /**
     * Frontend Time
     * Time spent on frontend rendering
     */
    public long getFrontendTime() {
        String script =
            "var timing = window.performance.timing;" +
            "return timing.loadEventEnd - timing.responseEnd;";

        return (Long) js.executeScript(script);
    }

    /**
     * Print detailed timing report
     */
    public void printDetailedReport() {
        System.out.println("=== Navigation Timing Report ===\n");

        Map<String, Long> timings = getAllNavigationTimings();

        timings.forEach((metric, time) -> {
            System.out.println(String.format("%-25s: %d ms", metric, time));
        });

        System.out.println("\nAdditional Metrics:");
        System.out.println(String.format("%-25s: %d ms",
            "Time to First Byte", getTimeToFirstByte()));
        System.out.println(String.format("%-25s: %d ms",
            "Backend Time", getBackendTime()));
        System.out.println(String.format("%-25s: %d ms",
            "Frontend Time", getFrontendTime()));
    }
}

/**
 * Navigation Timing Test Example
 */
public class NavigationTimingTest {

    @Test
    public void testNavigationTiming() {
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://example.com");

            NavigationTimingHelper timingHelper =
                new NavigationTimingHelper(driver);

            // Get all timings
            Map<String, Long> timings = timingHelper.getAllNavigationTimings();

            // Print report
            timingHelper.printDetailedReport();

            // Performance assertions
            long pageLoadTime = timingHelper.getPageLoadTime();
            Assert.assertTrue(pageLoadTime < 3000,
                "Page load time should be less than 3 seconds");

            long ttfb = timingHelper.getTimeToFirstByte();
            Assert.assertTrue(ttfb < 1000,
                "Time to First Byte should be less than 1 second");

            long dnsLookup = timingHelper.getDNSLookupTime();
            Assert.assertTrue(dnsLookup < 500,
                "DNS lookup should be less than 500ms");

        } finally {
            driver.quit();
        }
    }
}
```

---

## Resource Timing API

### Understanding Resource Timing

```java
package performance.timing;

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import java.util.*;

public class ResourceTimingHelper {

    private WebDriver driver;
    private JavascriptExecutor js;

    public ResourceTimingHelper(WebDriver driver) {
        this.driver = driver;
        this.js = (JavascriptExecutor) driver;
    }

    /**
     * Get all resource timings
     */
    public List<ResourceEntry> getAllResourceTimings() {
        String script =
            "var resources = window.performance.getEntriesByType('resource');" +
            "var result = [];" +
            "for (var i = 0; i < resources.length; i++) {" +
            "  var r = resources[i];" +
            "  result.push({" +
            "    name: r.name," +
            "    initiatorType: r.initiatorType," +
            "    duration: r.duration," +
            "    transferSize: r.transferSize || 0," +
            "    encodedBodySize: r.encodedBodySize || 0," +
            "    decodedBodySize: r.decodedBodySize || 0," +
            "    startTime: r.startTime," +
            "    responseEnd: r.responseEnd" +
            "  });" +
            "}" +
            "return JSON.stringify(result);";

        String json = (String) js.executeScript(script);
        return parseResourceEntries(json);
    }

    /**
     * Get resources by type
     */
    public List<ResourceEntry> getResourcesByType(String type) {
        List<ResourceEntry> allResources = getAllResourceTimings();
        List<ResourceEntry> filtered = new ArrayList<>();

        for (ResourceEntry resource : allResources) {
            if (resource.getInitiatorType().equals(type)) {
                filtered.add(resource);
            }
        }

        return filtered;
    }

    /**
     * Get slowest resources
     */
    public List<ResourceEntry> getSlowestResources(int count) {
        List<ResourceEntry> resources = getAllResourceTimings();

        resources.sort((r1, r2) ->
            Double.compare(r2.getDuration(), r1.getDuration()));

        return resources.subList(0, Math.min(count, resources.size()));
    }

    /**
     * Get largest resources
     */
    public List<ResourceEntry> getLargestResources(int count) {
        List<ResourceEntry> resources = getAllResourceTimings();

        resources.sort((r1, r2) ->
            Long.compare(r2.getTransferSize(), r1.getTransferSize()));

        return resources.subList(0, Math.min(count, resources.size()));
    }

    /**
     * Analyze resource performance
     */
    public ResourceAnalysis analyzeResources() {
        List<ResourceEntry> resources = getAllResourceTimings();

        ResourceAnalysis analysis = new ResourceAnalysis();

        for (ResourceEntry resource : resources) {
            analysis.addResource(resource);
        }

        return analysis;
    }

    /**
     * Print resource report
     */
    public void printResourceReport() {
        System.out.println("=== Resource Timing Report ===\n");

        ResourceAnalysis analysis = analyzeResources();

        System.out.println("Total Resources: " + analysis.getTotalCount());
        System.out.println("Total Size: " + formatBytes(analysis.getTotalSize()));
        System.out.println("Total Duration: " +
            String.format("%.2f", analysis.getTotalDuration()) + "ms");

        System.out.println("\nBreakdown by Type:");
        Map<String, Integer> countByType = analysis.getCountByType();
        Map<String, Long> sizeByType = analysis.getSizeByType();

        for (String type : countByType.keySet()) {
            System.out.println(String.format("  %s: %d resources, %s",
                type, countByType.get(type), formatBytes(sizeByType.get(type))));
        }

        System.out.println("\nSlowest Resources:");
        List<ResourceEntry> slowest = getSlowestResources(5);
        for (int i = 0; i < slowest.size(); i++) {
            ResourceEntry r = slowest.get(i);
            System.out.println(String.format("  %d. %s (%.2fms)",
                i + 1, getResourceFileName(r.getName()), r.getDuration()));
        }

        System.out.println("\nLargest Resources:");
        List<ResourceEntry> largest = getLargestResources(5);
        for (int i = 0; i < largest.size(); i++) {
            ResourceEntry r = largest.get(i);
            System.out.println(String.format("  %d. %s (%s)",
                i + 1, getResourceFileName(r.getName()),
                formatBytes(r.getTransferSize())));
        }
    }

    private String formatBytes(long bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return String.format("%.2f KB", bytes / 1024.0);
        return String.format("%.2f MB", bytes / (1024.0 * 1024.0));
    }

    private String getResourceFileName(String url) {
        String[] parts = url.split("/");
        return parts[parts.length - 1];
    }

    private List<ResourceEntry> parseResourceEntries(String json) {
        // Parse JSON and create ResourceEntry objects
        // Implementation depends on JSON parsing library
        return new ArrayList<>();
    }
}

/**
 * Resource Entry Model
 */
class ResourceEntry {
    private String name;
    private String initiatorType;
    private double duration;
    private long transferSize;
    private long encodedBodySize;
    private long decodedBodySize;
    private double startTime;
    private double responseEnd;

    // Getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getInitiatorType() { return initiatorType; }
    public void setInitiatorType(String type) { this.initiatorType = type; }

    public double getDuration() { return duration; }
    public void setDuration(double duration) { this.duration = duration; }

    public long getTransferSize() { return transferSize; }
    public void setTransferSize(long size) { this.transferSize = size; }

    public long getEncodedBodySize() { return encodedBodySize; }
    public void setEncodedBodySize(long size) { this.encodedBodySize = size; }

    public long getDecodedBodySize() { return decodedBodySize; }
    public void setDecodedBodySize(long size) { this.decodedBodySize = size; }

    public double getStartTime() { return startTime; }
    public void setStartTime(double time) { this.startTime = time; }

    public double getResponseEnd() { return responseEnd; }
    public void setResponseEnd(double time) { this.responseEnd = time; }
}

/**
 * Resource Analysis Model
 */
class ResourceAnalysis {
    private int totalCount = 0;
    private long totalSize = 0;
    private double totalDuration = 0;

    private Map<String, Integer> countByType = new HashMap<>();
    private Map<String, Long> sizeByType = new HashMap<>();
    private Map<String, Double> durationByType = new HashMap<>();

    public void addResource(ResourceEntry resource) {
        totalCount++;
        totalSize += resource.getTransferSize();
        totalDuration += resource.getDuration();

        String type = resource.getInitiatorType();

        countByType.put(type, countByType.getOrDefault(type, 0) + 1);
        sizeByType.put(type, sizeByType.getOrDefault(type, 0L) +
            resource.getTransferSize());
        durationByType.put(type, durationByType.getOrDefault(type, 0.0) +
            resource.getDuration());
    }

    // Getters
    public int getTotalCount() { return totalCount; }
    public long getTotalSize() { return totalSize; }
    public double getTotalDuration() { return totalDuration; }
    public Map<String, Integer> getCountByType() { return countByType; }
    public Map<String, Long> getSizeByType() { return sizeByType; }
    public Map<String, Double> getDurationByType() { return durationByType; }
}
```

### Resource Timing Test Example

```java
/**
 * Resource Timing Test
 */
public class ResourceTimingTest {

    @Test
    public void testResourcePerformance() {
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://example.com");

            // Wait for all resources to load
            Thread.sleep(5000);

            ResourceTimingHelper resourceHelper =
                new ResourceTimingHelper(driver);

            // Print full report
            resourceHelper.printResourceReport();

            // Specific resource type analysis
            List<ResourceEntry> images =
                resourceHelper.getResourcesByType("img");
            System.out.println("\nImage Resources: " + images.size());

            List<ResourceEntry> scripts =
                resourceHelper.getResourcesByType("script");
            System.out.println("Script Resources: " + scripts.size());

            List<ResourceEntry> stylesheets =
                resourceHelper.getResourcesByType("css");
            System.out.println("Stylesheet Resources: " + stylesheets.size());

            // Performance assertions
            ResourceAnalysis analysis = resourceHelper.analyzeResources();

            // Total page size should be reasonable
            Assert.assertTrue(analysis.getTotalSize() < 5 * 1024 * 1024,
                "Total page size should be less than 5MB");

            // No single resource should be too large
            List<ResourceEntry> largest = resourceHelper.getLargestResources(1);
            if (!largest.isEmpty()) {
                Assert.assertTrue(largest.get(0).getTransferSize() < 2 * 1024 * 1024,
                    "No single resource should exceed 2MB");
            }

            // No resource should take too long
            List<ResourceEntry> slowest = resourceHelper.getSlowestResources(1);
            if (!slowest.isEmpty()) {
                Assert.assertTrue(slowest.get(0).getDuration() < 5000,
                    "No resource should take more than 5 seconds");
            }

        } finally {
            driver.quit();
        }
    }
}
```

---

## Performance Marks and Measures

### Using Performance API

```java
package performance.timing;

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import java.util.*;

public class PerformanceMarksHelper {

    private WebDriver driver;
    private JavascriptExecutor js;

    public PerformanceMarksHelper(WebDriver driver) {
        this.driver = driver;
        this.js = (JavascriptExecutor) driver;
    }

    /**
     * Create a performance mark
     */
    public void mark(String markName) {
        String script = "window.performance.mark('" + markName + "');";
        js.executeScript(script);
        System.out.println("Mark created: " + markName);
    }

    /**
     * Create a performance measure
     */
    public double measure(String measureName, String startMark, String endMark) {
        String script =
            "window.performance.measure('" + measureName + "', " +
            "'" + startMark + "', '" + endMark + "');" +
            "var measures = window.performance.getEntriesByName('" + measureName + "');" +
            "return measures[measures.length - 1].duration;";

        Number duration = (Number) js.executeScript(script);
        double durationMs = duration.doubleValue();

        System.out.println("Measure '" + measureName + "': " +
            String.format("%.2f", durationMs) + "ms");

        return durationMs;
    }

    /**
     * Get all marks
     */
    public List<String> getAllMarks() {
        String script =
            "var marks = window.performance.getEntriesByType('mark');" +
            "return marks.map(function(m) { return m.name; });";

        return (List<String>) js.executeScript(script);
    }

    /**
     * Get all measures
     */
    public Map<String, Double> getAllMeasures() {
        String script =
            "var measures = window.performance.getEntriesByType('measure');" +
            "var result = {};" +
            "for (var i = 0; i < measures.length; i++) {" +
            "  result[measures[i].name] = measures[i].duration;" +
            "}" +
            "return result;";

        return (Map<String, Double>) js.executeScript(script);
    }

    /**
     * Clear marks
     */
    public void clearMarks(String markName) {
        if (markName == null) {
            js.executeScript("window.performance.clearMarks();");
            System.out.println("All marks cleared");
        } else {
            js.executeScript("window.performance.clearMarks('" + markName + "');");
            System.out.println("Mark cleared: " + markName);
        }
    }

    /**
     * Clear measures
     */
    public void clearMeasures(String measureName) {
        if (measureName == null) {
            js.executeScript("window.performance.clearMeasures();");
            System.out.println("All measures cleared");
        } else {
            js.executeScript("window.performance.clearMeasures('" + measureName + "');");
            System.out.println("Measure cleared: " + measureName);
        }
    }
}

/**
 * Performance Marks Test Example
 */
public class PerformanceMarksTest {

    @Test
    public void testUserJourneyPerformance() {
        WebDriver driver = new ChromeDriver();
        PerformanceMarksHelper perfHelper = new PerformanceMarksHelper(driver);

        try {
            // Mark start of navigation
            perfHelper.mark("navigation-start");
            driver.get("https://example.com");
            perfHelper.mark("navigation-end");

            // Measure navigation time
            double navTime = perfHelper.measure("navigation-time",
                "navigation-start", "navigation-end");

            // Mark start of login
            perfHelper.mark("login-start");
            driver.findElement(By.id("username")).sendKeys("testuser");
            driver.findElement(By.id("password")).sendKeys("password");
            driver.findElement(By.id("login-btn")).click();

            // Wait for dashboard
            new WebDriverWait(driver, Duration.ofSeconds(10))
                .until(ExpectedConditions.presenceOfElementLocated(
                    By.id("dashboard")));
            perfHelper.mark("login-end");

            // Measure login time
            double loginTime = perfHelper.measure("login-time",
                "login-start", "login-end");

            // Mark start of search
            perfHelper.mark("search-start");
            driver.findElement(By.id("search")).sendKeys("test query");
            driver.findElement(By.id("search-btn")).click();

            // Wait for results
            new WebDriverWait(driver, Duration.ofSeconds(10))
                .until(ExpectedConditions.presenceOfElementLocated(
                    By.className("search-results")));
            perfHelper.mark("search-end");

            // Measure search time
            double searchTime = perfHelper.measure("search-time",
                "search-start", "search-end");

            // Print all measures
            System.out.println("\n=== User Journey Performance ===");
            Map<String, Double> allMeasures = perfHelper.getAllMeasures();
            allMeasures.forEach((name, duration) ->
                System.out.println(String.format("%s: %.2f ms", name, duration)));

            // Assertions
            Assert.assertTrue(navTime < 3000,
                "Navigation should complete within 3 seconds");
            Assert.assertTrue(loginTime < 5000,
                "Login should complete within 5 seconds");
            Assert.assertTrue(searchTime < 2000,
                "Search should complete within 2 seconds");

        } finally {
            driver.quit();
        }
    }

    @Test
    public void testPageInteractionTiming() {
        WebDriver driver = new ChromeDriver();
        PerformanceMarksHelper perfHelper = new PerformanceMarksHelper(driver);

        try {
            driver.get("https://example.com");

            // Test button click response time
            perfHelper.mark("button-click-start");
            driver.findElement(By.id("submit-btn")).click();

            new WebDriverWait(driver, Duration.ofSeconds(10))
                .until(ExpectedConditions.visibilityOfElementLocated(
                    By.id("success-message")));
            perfHelper.mark("button-click-end");

            double clickResponseTime = perfHelper.measure("click-response",
                "button-click-start", "button-click-end");

            // Test form submission time
            perfHelper.mark("form-submit-start");
            driver.findElement(By.id("name")).sendKeys("John Doe");
            driver.findElement(By.id("email")).sendKeys("john@example.com");
            driver.findElement(By.id("form-submit")).click();

            new WebDriverWait(driver, Duration.ofSeconds(10))
                .until(ExpectedConditions.visibilityOfElementLocated(
                    By.id("confirmation")));
            perfHelper.mark("form-submit-end");

            double formSubmitTime = perfHelper.measure("form-submit",
                "form-submit-start", "form-submit-end");

            // Test dynamic content loading
            perfHelper.mark("dynamic-load-start");
            driver.findElement(By.id("load-more")).click();

            new WebDriverWait(driver, Duration.ofSeconds(10))
                .until(ExpectedConditions.numberOfElementsToBeMoreThan(
                    By.className("content-item"), 10));
            perfHelper.mark("dynamic-load-end");

            double dynamicLoadTime = perfHelper.measure("dynamic-load",
                "dynamic-load-start", "dynamic-load-end");

            // Print results
            System.out.println("\n=== Page Interaction Timing ===");
            System.out.println("Button Click Response: " +
                String.format("%.2f", clickResponseTime) + "ms");
            System.out.println("Form Submission: " +
                String.format("%.2f", formSubmitTime) + "ms");
            System.out.println("Dynamic Content Load: " +
                String.format("%.2f", dynamicLoadTime) + "ms");

            // Performance assertions
            Assert.assertTrue(clickResponseTime < 1000,
                "Button click should respond within 1 second");
            Assert.assertTrue(formSubmitTime < 3000,
                "Form submission should complete within 3 seconds");
            Assert.assertTrue(dynamicLoadTime < 2000,
                "Dynamic content should load within 2 seconds");

        } finally {
            driver.quit();
        }
    }
}
```

This is the first part of the comprehensive Day 48 content. Should I continue with the remaining sections (JMeter Integration, Lighthouse Integration, Security Testing sections, etc.)?
---

## JMeter Basics Integration

### Introduction to JMeter

**Apache JMeter** is an open-source load testing tool used for analyzing and measuring performance of web applications. It can be integrated with Selenium for comprehensive performance testing.

### JMeter Components

```
Test Plan
├── Thread Group (Users)
│   ├── HTTP Request Sampler
│   ├── Listeners (Results)
│   ├── Assertions
│   └── Timers
├── Config Elements
└── Controllers
```

### Setting Up JMeter with Maven

```xml
<\!-- pom.xml -->
<dependencies>
    <\!-- JMeter Core -->
    <dependency>
        <groupId>org.apache.jmeter</groupId>
        <artifactId>ApacheJMeter_core</artifactId>
        <version>5.6.2</version>
    </dependency>

    <\!-- JMeter HTTP -->
    <dependency>
        <groupId>org.apache.jmeter</groupId>
        <artifactId>ApacheJMeter_http</artifactId>
        <version>5.6.2</version>
    </dependency>

    <\!-- JMeter Java -->
    <dependency>
        <groupId>org.apache.jmeter</groupId>
        <artifactId>ApacheJMeter_java</artifactId>
        <version>5.6.2</version>
    </dependency>
</dependencies>
```

### Creating JMeter Test

```java
package performance.jmeter;

import org.apache.jmeter.control.LoopController;
import org.apache.jmeter.engine.StandardJMeterEngine;
import org.apache.jmeter.protocol.http.sampler.HTTPSampler;
import org.apache.jmeter.reporters.ResultCollector;
import org.apache.jmeter.reporters.Summariser;
import org.apache.jmeter.testelement.TestPlan;
import org.apache.jmeter.threads.ThreadGroup;
import org.apache.jmeter.util.JMeterUtils;
import org.apache.jorphan.collections.HashTree;

public class JMeterIntegration {

    public void runLoadTest(String url, int users, int loopCount) {
        // Initialize JMeter
        JMeterUtils.loadJMeterProperties("jmeter.properties");
        JMeterUtils.initLocale();

        // Create Test Plan
        TestPlan testPlan = new TestPlan("Performance Test Plan");

        // Create Thread Group
        ThreadGroup threadGroup = new ThreadGroup();
        threadGroup.setName("User Thread Group");
        threadGroup.setNumThreads(users);
        threadGroup.setRampUp(10); // Ramp up time in seconds

        // Loop Controller
        LoopController loopController = new LoopController();
        loopController.setLoops(loopCount);
        loopController.setFirst(true);
        loopController.initialize();

        threadGroup.setSamplerController(loopController);

        // HTTP Sampler
        HTTPSampler httpSampler = new HTTPSampler();
        httpSampler.setDomain(extractDomain(url));
        httpSampler.setPort(80);
        httpSampler.setPath(extractPath(url));
        httpSampler.setMethod("GET");
        httpSampler.setName("HTTP Request");

        // Summariser for console output
        Summariser summer = new Summariser("summary");
        ResultCollector logger = new ResultCollector(summer);

        // Build test tree
        HashTree testPlanTree = new HashTree();
        testPlanTree.add(testPlan);

        HashTree threadGroupTree = testPlanTree.add(testPlan, threadGroup);
        threadGroupTree.add(httpSampler);
        threadGroupTree.add(logger);

        // Run Test
        StandardJMeterEngine jmeter = new StandardJMeterEngine();
        jmeter.configure(testPlanTree);
        jmeter.run();

        System.out.println("JMeter Load Test Completed");
    }

    private String extractDomain(String url) {
        return url.split("/")[2];
    }

    private String extractPath(String url) {
        String[] parts = url.split("/");
        return parts.length > 3 ? "/" + String.join("/",
            Arrays.copyOfRange(parts, 3, parts.length)) : "/";
    }
}

/**
 * JMeter Test Example
 */
public class JMeterTest {

    @Test
    public void testWebsitePerformanceWithJMeter() {
        JMeterIntegration jmeter = new JMeterIntegration();

        // Run load test with 50 users, each performing 10 iterations
        jmeter.runLoadTest("https://example.com", 50, 10);
    }
}
```

### Selenium + JMeter Integration

```java
/**
 * Combined Selenium and JMeter Testing
 */
public class SeleniumJMeterIntegration {

    @Test
    public void performanceTestWithSelenium() throws Exception {
        // Step 1: Use Selenium to capture user journey
        WebDriver driver = new ChromeDriver();
        List<String> urlsToTest = new ArrayList<>();

        try {
            // Navigate and capture URLs
            driver.get("https://example.com");
            urlsToTest.add(driver.getCurrentUrl());

            driver.findElement(By.linkText("Products")).click();
            urlsToTest.add(driver.getCurrentUrl());

            driver.findElement(By.linkText("About")).click();
            urlsToTest.add(driver.getCurrentUrl());

        } finally {
            driver.quit();
        }

        // Step 2: Use JMeter to load test those URLs
        JMeterIntegration jmeter = new JMeterIntegration();

        for (String url : urlsToTest) {
            System.out.println("\nLoad testing: " + url);
            jmeter.runLoadTest(url, 100, 10);
        }
    }
}
```

---

## Lighthouse Integration

### Introduction to Lighthouse

**Lighthouse** is an open-source, automated tool for improving web page quality. It provides audits for performance, accessibility, SEO, and more.

### Lighthouse via Chrome DevTools Protocol

```java
package performance.lighthouse;

import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.devtools.DevTools;
import org.openqa.selenium.devtools.v118.performance.Performance;
import org.openqa.selenium.devtools.v118.performance.model.Metric;

import java.util.List;

public class LighthouseIntegration {

    public void runLighthouseAudit(String url) {
        ChromeOptions options = new ChromeOptions();
        ChromeDriver driver = new ChromeDriver(options);
        DevTools devTools = driver.getDevTools();

        try {
            devTools.createSession();
            devTools.send(Performance.enable());

            driver.get(url);

            // Get performance metrics
            List<Metric> metrics = devTools.send(Performance.getMetrics());

            System.out.println("=== Lighthouse Metrics ===");
            for (Metric metric : metrics) {
                System.out.println(metric.getName() + ": " + metric.getValue());
            }

        } finally {
            devTools.close();
            driver.quit();
        }
    }
}
```

### Using Lighthouse CLI from Java

```java
/**
 * Lighthouse CLI Integration
 */
public class LighthouseCLI {

    public LighthouseReport runAudit(String url) throws Exception {
        // Execute Lighthouse CLI
        ProcessBuilder builder = new ProcessBuilder(
            "lighthouse",
            url,
            "--output=json",
            "--output-path=./lighthouse-report.json",
            "--chrome-flags=\"--headless\""
        );

        Process process = builder.start();
        process.waitFor();

        // Parse results
        String json = new String(Files.readAllBytes(
            Paths.get("./lighthouse-report.json")));

        return parseLighthouseReport(json);
    }

    private LighthouseReport parseLighthouseReport(String json) {
        // Parse JSON and extract key metrics
        LighthouseReport report = new LighthouseReport();

        // Parse performance score, FCP, LCP, TBT, CLS, Speed Index
        // Implementation depends on JSON parsing library

        return report;
    }
}

/**
 * Lighthouse Report Model
 */
class LighthouseReport {
    private int performanceScore;
    private double firstContentfulPaint;
    private double largestContentfulPaint;
    private double totalBlockingTime;
    private double cumulativeLayoutShift;
    private double speedIndex;

    // Getters and setters
    public int getPerformanceScore() {
        return performanceScore;
    }

    public void setPerformanceScore(int score) {
        this.performanceScore = score;
    }

    public double getFirstContentfulPaint() {
        return firstContentfulPaint;
    }

    public double getLargestContentfulPaint() {
        return largestContentfulPaint;
    }

    // Additional getters and setters...

    public void printReport() {
        System.out.println("=== Lighthouse Performance Report ===");
        System.out.println("Performance Score: " + performanceScore + "/100");
        System.out.println("First Contentful Paint: " + firstContentfulPaint + "s");
        System.out.println("Largest Contentful Paint: " + largestContentfulPaint + "s");
        System.out.println("Total Blocking Time: " + totalBlockingTime + "ms");
        System.out.println("Cumulative Layout Shift: " + cumulativeLayoutShift);
        System.out.println("Speed Index: " + speedIndex);
    }
}

/**
 * Lighthouse Test Example
 */
public class LighthouseTest {

    @Test
    public void testWebsitePerformance() throws Exception {
        LighthouseCLI lighthouse = new LighthouseCLI();

        String url = "https://example.com";
        LighthouseReport report = lighthouse.runAudit(url);

        // Print report
        report.printReport();

        // Performance assertions
        Assert.assertTrue(report.getPerformanceScore() >= 90,
            "Performance score should be at least 90");

        Assert.assertTrue(report.getFirstContentfulPaint() < 1.8,
            "FCP should be less than 1.8 seconds");

        Assert.assertTrue(report.getLargestContentfulPaint() < 2.5,
            "LCP should be less than 2.5 seconds");

        Assert.assertTrue(report.getCumulativeLayoutShift() < 0.1,
            "CLS should be less than 0.1");
    }
}
```

---

## Performance Best Practices

### 1. Page Load Optimization

```
Best Practices:
✓ Minimize HTTP requests
✓ Enable compression (Gzip)
✓ Optimize images
✓ Minify CSS, JavaScript
✓ Use Content Delivery Network (CDN)
✓ Enable browser caching
✓ Reduce server response time
✓ Eliminate render-blocking resources
✓ Prioritize above-the-fold content
✓ Use async/defer for scripts
```

### 2. Image Optimization

```java
/**
 * Test image optimization
 */
@Test
public void testImageOptimization() {
    WebDriver driver = new ChromeDriver();

    try {
        driver.get("https://example.com");

        ResourceTimingHelper resourceHelper = new ResourceTimingHelper(driver);
        List<ResourceEntry> images = resourceHelper.getResourcesByType("img");

        System.out.println("=== Image Optimization Report ===");
        System.out.println("Total Images: " + images.size());

        long totalImageSize = 0;
        int oversizedImages = 0;

        for (ResourceEntry image : images) {
            long size = image.getTransferSize();
            totalImageSize += size;

            if (size > 200 * 1024) { // 200KB threshold
                oversizedImages++;
                System.out.println("WARNING: Large image detected - " +
                    image.getName() + " (" + formatBytes(size) + ")");
            }
        }

        System.out.println("Total Image Size: " + formatBytes(totalImageSize));
        System.out.println("Oversized Images: " + oversizedImages);

        // Assertions
        Assert.assertTrue(oversizedImages == 0,
            "All images should be optimized (< 200KB)");

        Assert.assertTrue(totalImageSize < 2 * 1024 * 1024,
            "Total image size should be less than 2MB");

    } finally {
        driver.quit();
    }
}
```

### 3. Caching Strategy

```java
/**
 * Test caching headers
 */
@Test
public void testCachingHeaders() {
    RestAssured.baseURI = "https://example.com";

    Response response = given()
        .when()
        .get("/")
        .then()
        .extract()
        .response();

    // Verify caching headers
    String cacheControl = response.getHeader("Cache-Control");
    Assert.assertNotNull(cacheControl, "Cache-Control header should be present");

    String expires = response.getHeader("Expires");
    String etag = response.getHeader("ETag");

    System.out.println("Cache-Control: " + cacheControl);
    System.out.println("Expires: " + expires);
    System.out.println("ETag: " + etag);

    // Static resources should have long cache time
    Response cssResponse = given()
        .when()
        .get("/styles/main.css")
        .then()
        .extract()
        .response();

    String cssCacheControl = cssResponse.getHeader("Cache-Control");
    Assert.assertTrue(cssCacheControl.contains("max-age"),
        "CSS should have max-age caching");
}
```

### 4. Lazy Loading Verification

```java
/**
 * Test lazy loading implementation
 */
@Test
public void testLazyLoading() {
    WebDriver driver = new ChromeDriver();

    try {
        driver.get("https://example.com");

        // Check for lazy loading attribute
        List<WebElement> images = driver.findElements(By.tagName("img"));

        int lazyLoadedImages = 0;
        for (WebElement img : images) {
            String loading = img.getAttribute("loading");
            if ("lazy".equals(loading)) {
                lazyLoadedImages++;
            }
        }

        System.out.println("Total Images: " + images.size());
        System.out.println("Lazy Loaded Images: " + lazyLoadedImages);

        // Below-the-fold images should be lazy loaded
        Assert.assertTrue(lazyLoadedImages > 0,
            "Page should implement lazy loading for images");

    } finally {
        driver.quit();
    }
}
```

---

## Common Performance Bottlenecks

### 1. Large JavaScript Files

```java
@Test
public void detectLargeJavaScriptFiles() {
    WebDriver driver = new ChromeDriver();

    try {
        driver.get("https://example.com");

        ResourceTimingHelper resourceHelper = new ResourceTimingHelper(driver);
        List<ResourceEntry> scripts = resourceHelper.getResourcesByType("script");

        System.out.println("=== JavaScript Analysis ===");

        for (ResourceEntry script : scripts) {
            long size = script.getTransferSize();

            if (size > 500 * 1024) { // 500KB
                System.out.println("WARNING: Large JS file - " +
                    script.getName() + " (" + formatBytes(size) + ")");
            }
        }

    } finally {
        driver.quit();
    }
}
```

### 2. Render-Blocking Resources

```java
@Test
public void detectRenderBlockingResources() {
    WebDriver driver = new ChromeDriver();

    try {
        driver.get("https://example.com");

        // Check for render-blocking scripts
        List<WebElement> scripts = driver.findElements(By.tagName("script"));

        int blockingScripts = 0;
        for (WebElement script : scripts) {
            String async = script.getAttribute("async");
            String defer = script.getAttribute("defer");

            if (async == null && defer == null) {
                blockingScripts++;
                String src = script.getAttribute("src");
                System.out.println("Render-blocking script: " + src);
            }
        }

        System.out.println("Render-blocking scripts found: " + blockingScripts);

        Assert.assertTrue(blockingScripts == 0,
            "No render-blocking scripts should be present");

    } finally {
        driver.quit();
    }
}
```

### 3. Excessive DOM Size

```java
@Test
public void testDOMSize() {
    WebDriver driver = new ChromeDriver();

    try {
        driver.get("https://example.com");

        JavascriptExecutor js = (JavascriptExecutor) driver;

        // Count DOM elements
        Long domElements = (Long) js.executeScript(
            "return document.getElementsByTagName('*').length;");

        // Check DOM depth
        Long domDepth = (Long) js.executeScript(
            "function getDepth(element) {" +
            "  var depth = 0;" +
            "  while(element.parentNode) {" +
            "    depth++;" +
            "    element = element.parentNode;" +
            "  }" +
            "  return depth;" +
            "}" +
            "var allElements = document.getElementsByTagName('*');" +
            "var maxDepth = 0;" +
            "for(var i=0; i<allElements.length; i++) {" +
            "  var depth = getDepth(allElements[i]);" +
            "  if(depth > maxDepth) maxDepth = depth;" +
            "}" +
            "return maxDepth;");

        System.out.println("=== DOM Analysis ===");
        System.out.println("Total Elements: " + domElements);
        System.out.println("Max Depth: " + domDepth);

        // Performance thresholds
        Assert.assertTrue(domElements < 1500,
            "DOM should have less than 1500 elements");
        Assert.assertTrue(domDepth < 32,
            "DOM depth should be less than 32 levels");

    } finally {
        driver.quit();
    }
}
```

### 4. Memory Leaks Detection

```java
@Test
public void detectMemoryLeaks() {
    WebDriver driver = new ChromeDriver();

    try {
        JavascriptExecutor js = (JavascriptExecutor) driver;

        // Take initial memory snapshot
        driver.get("https://example.com");
        Long initialMemory = (Long) js.executeScript(
            "return performance.memory.usedJSHeapSize;");

        // Perform actions multiple times
        for (int i = 0; i < 10; i++) {
            driver.navigate().refresh();
            Thread.sleep(2000);
        }

        // Take final memory snapshot
        Long finalMemory = (Long) js.executeScript(
            "return performance.memory.usedJSHeapSize;");

        double memoryIncrease = (finalMemory - initialMemory) /
            (1024.0 * 1024.0);

        System.out.println("=== Memory Leak Detection ===");
        System.out.println("Initial Memory: " +
            (initialMemory / (1024 * 1024)) + " MB");
        System.out.println("Final Memory: " +
            (finalMemory / (1024 * 1024)) + " MB");
        System.out.println("Memory Increase: " +
            String.format("%.2f", memoryIncrease) + " MB");

        // Check for significant memory increase
        Assert.assertTrue(memoryIncrease < 50,
            "Memory increase should be less than 50MB");

    } finally {
        driver.quit();
    }
}
```

---

## Introduction to Security Testing

### What is Security Testing?

**Security Testing** identifies vulnerabilities, threats, and risks in software applications to ensure that data and resources are protected from potential intruders.

### Security Testing Objectives

```
1. Confidentiality: Ensure data privacy
2. Integrity: Ensure data accuracy
3. Authentication: Verify user identity
4. Authorization: Control access rights
5. Availability: Ensure system accessibility
6. Non-repudiation: Prevent denial of actions
```

### Types of Security Testing

```
1. Vulnerability Scanning
2. Security Scanning
3. Penetration Testing
4. Risk Assessment
5. Security Auditing
6. Ethical Hacking
7. Posture Assessment
```

### Security Testing in SDLC

```
Requirements Phase
    ↓ Security requirements analysis
Design Phase
    ↓ Threat modeling
Implementation Phase
    ↓ Secure coding practices
Testing Phase
    ↓ Security testing
Deployment Phase
    ↓ Security configuration
Maintenance Phase
    ↓ Security monitoring
```

---

## OWASP Top 10 Vulnerabilities

### OWASP Top 10 (2021)

```
1. Broken Access Control
2. Cryptographic Failures
3. Injection
4. Insecure Design
5. Security Misconfiguration
6. Vulnerable and Outdated Components
7. Identification and Authentication Failures
8. Software and Data Integrity Failures
9. Security Logging and Monitoring Failures
10. Server-Side Request Forgery (SSRF)
```

### 1. Broken Access Control

```java
@Test
public void testAccessControl() {
    WebDriver driver = new ChromeDriver();

    try {
        // Login as regular user
        loginAs(driver, "user@example.com", "userpass");

        // Try to access admin panel
        driver.get("https://example.com/admin");

        // Should be redirected or show error
        String currentUrl = driver.getCurrentUrl();
        Assert.assertFalse(currentUrl.contains("/admin"),
            "Regular user should not access admin panel");

        // Verify access denied message
        WebElement errorMessage = driver.findElement(By.className("error"));
        Assert.assertTrue(errorMessage.isDisplayed(),
            "Access denied message should be displayed");

    } finally {
        driver.quit();
    }
}
```

### 2. Cryptographic Failures

```java
@Test
public void testPasswordEncryption() {
    WebDriver driver = new ChromeDriver();

    try {
        driver.get("https://example.com/register");

        // Enter password
        WebElement passwordField = driver.findElement(By.id("password"));
        passwordField.sendKeys("TestPassword123\!");

        // Check if password is masked
        String inputType = passwordField.getAttribute("type");
        Assert.assertEquals(inputType, "password",
            "Password field should be masked");

        // Submit form and check if password is sent securely
        driver.findElement(By.id("submit")).click();

        // Verify HTTPS is used
        Assert.assertTrue(driver.getCurrentUrl().startsWith("https://"),
            "Password should be transmitted over HTTPS");

    } finally {
        driver.quit();
    }
}
```

### 3. Injection Vulnerabilities

```java
@Test
public void testSQLInjectionPrevention() {
    WebDriver driver = new ChromeDriver();

    try {
        driver.get("https://example.com/login");

        // Attempt SQL injection
        driver.findElement(By.id("username"))
            .sendKeys("admin' OR '1'='1");
        driver.findElement(By.id("password"))
            .sendKeys("anything");
        driver.findElement(By.id("login-btn")).click();

        // Should not login successfully
        Assert.assertFalse(isUserLoggedIn(driver),
            "SQL injection should be prevented");

        // Should show error message
        WebElement error = driver.findElement(By.className("error"));
        Assert.assertTrue(error.isDisplayed(),
            "Invalid credentials message should appear");

    } finally {
        driver.quit();
    }
}
```

---

## XSS Testing

### Types of XSS

```
1. Reflected XSS: Malicious script reflected off web server
2. Stored XSS: Malicious script stored in database
3. DOM-based XSS: Attack payload executed in DOM
```

### Reflected XSS Testing

```java
package security.xss;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.Test;

public class ReflectedXSSTest {

    @Test
    public void testReflectedXSS() {
        WebDriver driver = new ChromeDriver();

        try {
            // Test search functionality for XSS
            driver.get("https://example.com/search");

            String xssPayload = "<script>alert('XSS')</script>";

            WebElement searchBox = driver.findElement(By.id("search"));
            searchBox.sendKeys(xssPayload);
            searchBox.submit();

            // Wait a moment for any potential alert
            Thread.sleep(2000);

            // Check if script was executed (alert appeared)
            try {
                driver.switchTo().alert();
                Assert.fail("XSS vulnerability detected\! Alert was triggered");
            } catch (Exception e) {
                // No alert means XSS was prevented
                System.out.println("XSS attack prevented successfully");
            }

            // Verify output is escaped
            String pageSource = driver.getPageSource();
            Assert.assertTrue(
                pageSource.contains("&lt;script&gt;") ||
                pageSource.contains("&amp;lt;script&amp;gt;"),
                "Script tags should be escaped");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }

    @Test
    public void testXSSInURLParameters() {
        WebDriver driver = new ChromeDriver();

        try {
            // Test with XSS payload in URL
            String xssUrl = "https://example.com/page?name=<script>alert('XSS')</script>";
            driver.get(xssUrl);

            Thread.sleep(2000);

            // Check for alert
            try {
                driver.switchTo().alert();
                Assert.fail("XSS vulnerability in URL parameters");
            } catch (Exception e) {
                System.out.println("URL parameter XSS prevented");
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

### Stored XSS Testing

```java
public class StoredXSSTest {

    @Test
    public void testStoredXSS() {
        WebDriver driver = new ChromeDriver();

        try {
            // Login
            loginAs(driver, "testuser@example.com", "password");

            // Navigate to comment section
            driver.get("https://example.com/article/1");

            String xssPayload = "<img src=x onerror=alert('XSS')>";

            // Submit comment with XSS payload
            WebElement commentBox = driver.findElement(By.id("comment"));
            commentBox.sendKeys(xssPayload);
            driver.findElement(By.id("submit-comment")).click();

            // Refresh page to load stored comment
            driver.navigate().refresh();
            Thread.sleep(2000);

            // Check if stored XSS was executed
            try {
                driver.switchTo().alert();
                Assert.fail("Stored XSS vulnerability detected\!");
            } catch (Exception e) {
                System.out.println("Stored XSS prevented");
            }

            // Verify comment is sanitized
            String pageSource = driver.getPageSource();
            Assert.assertFalse(pageSource.contains("<img src=x onerror="),
                "XSS payload should be sanitized");

        } finally {
            driver.quit();
        }
    }
}
```

### DOM-based XSS Testing

```java
public class DOMBasedXSSTest {

    @Test
    public void testDOMBasedXSS() {
        WebDriver driver = new ChromeDriver();

        try {
            // URL with hash containing XSS payload
            driver.get("https://example.com/page#<img src=x onerror=alert('XSS')>");

            Thread.sleep(2000);

            // Check if DOM-based XSS was executed
            try {
                driver.switchTo().alert();
                Assert.fail("DOM-based XSS vulnerability detected\!");
            } catch (Exception e) {
                System.out.println("DOM-based XSS prevented");
            }

            // Check if content was safely handled
            JavascriptExecutor js = (JavascriptExecutor) driver;
            String hashContent = (String) js.executeScript(
                "return window.location.hash;");

            // Verify payload is still in hash but not executed
            Assert.assertTrue(hashContent.contains("<img"),
                "Hash should contain payload");

            // But page should not contain executed script
            List<WebElement> images = driver.findElements(By.tagName("img"));
            for (WebElement img : images) {
                String onerror = img.getAttribute("onerror");
                Assert.assertNull(onerror,
                    "No image should have onerror handler");
            }

        } finally {
            driver.quit();
        }
    }
}
```

### XSS Test Payloads

```java
public class XSSPayloads {

    public static final String[] XSS_PAYLOADS = {
        "<script>alert('XSS')</script>",
        "<img src=x onerror=alert('XSS')>",
        "<svg/onload=alert('XSS')>",
        "javascript:alert('XSS')",
        "<iframe src=javascript:alert('XSS')>",
        "<input onfocus=alert('XSS') autofocus>",
        "<select onfocus=alert('XSS') autofocus>",
        "<textarea onfocus=alert('XSS') autofocus>",
        "<body onload=alert('XSS')>",
        "<marquee onstart=alert('XSS')>",
        "\"><script>alert('XSS')</script>",
        "'-alert('XSS')-'",
        "\";alert('XSS');//",
        "</script><script>alert('XSS')</script>"
    };

    @Test
    public void testMultipleXSSPayloads() {
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://example.com/search");

            int vulnerabilitiesFound = 0;

            for (String payload : XSS_PAYLOADS) {
                System.out.println("Testing payload: " + payload);

                WebElement searchBox = driver.findElement(By.id("search"));
                searchBox.clear();
                searchBox.sendKeys(payload);
                searchBox.submit();

                Thread.sleep(1000);

                try {
                    driver.switchTo().alert();
                    vulnerabilitiesFound++;
                    driver.switchTo().alert().dismiss();
                    System.out.println("VULNERABLE to: " + payload);
                } catch (Exception e) {
                    System.out.println("Protected against: " + payload);
                }

                driver.navigate().back();
            }

            Assert.assertEquals(vulnerabilitiesFound, 0,
                "Application should be protected against all XSS payloads");

            System.out.println("\n=== XSS Test Summary ===");
            System.out.println("Total Payloads Tested: " + XSS_PAYLOADS.length);
            System.out.println("Vulnerabilities Found: " + vulnerabilitiesFound);

        } finally {
            driver.quit();
        }
    }
}
```

---

## SQL Injection Testing

### Understanding SQL Injection

```
SQL Injection Types:
1. Classic SQL Injection
2. Blind SQL Injection
3. Time-based Blind SQL Injection
4. Union-based SQL Injection
5. Error-based SQL Injection
```

### Basic SQL Injection Test

```java
package security.sqli;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.Test;

public class SQLInjectionTest {

    @Test
    public void testBasicSQLInjection() {
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://example.com/login");

            // Test classic SQL injection
            String[] sqlPayloads = {
                "admin' OR '1'='1",
                "admin' OR '1'='1' --",
                "admin' OR '1'='1' #",
                "admin' OR '1'='1'/*",
                "' OR 1=1--",
                "' OR 'a'='a",
                "admin'--",
                "') OR ('1'='1"
            };

            for (String payload : sqlPayloads) {
                System.out.println("Testing SQL payload: " + payload);

                driver.findElement(By.id("username")).clear();
                driver.findElement(By.id("username")).sendKeys(payload);
                driver.findElement(By.id("password")).clear();
                driver.findElement(By.id("password")).sendKeys("anything");
                driver.findElement(By.id("login-btn")).click();

                // Check if bypass was successful
                if (isUserLoggedIn(driver)) {
                    Assert.fail("SQL Injection vulnerability\! Payload: " + payload);
                }

                System.out.println("Protected against: " + payload);

                // Navigate back to login
                driver.get("https://example.com/login");
            }

            System.out.println("All SQL injection tests passed");

        } finally {
            driver.quit();
        }
    }

    private boolean isUserLoggedIn(WebDriver driver) {
        try {
            driver.findElement(By.id("logout-btn"));
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
```

### Blind SQL Injection Test

```java
public class BlindSQLInjectionTest {

    @Test
    public void testBlindSQLInjection() {
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://example.com/product?id=1");

            // Test boolean-based blind SQL injection
            String[] blindPayloads = {
                "1' AND '1'='1",    // Should return normal page
                "1' AND '1'='2"     // Should return different result
            };

            String normalResponse = driver.getPageSource();

            // Test first payload (true condition)
            driver.get("https://example.com/product?id=" + blindPayloads[0]);
            String trueResponse = driver.getPageSource();

            // Test second payload (false condition)
            driver.get("https://example.com/product?id=" + blindPayloads[1]);
            String falseResponse = driver.getPageSource();

            // If responses differ based on SQL condition, it's vulnerable
            if (\!trueResponse.equals(normalResponse) &&
                \!falseResponse.equals(normalResponse) &&
                \!trueResponse.equals(falseResponse)) {

                Assert.fail("Blind SQL Injection vulnerability detected\!");
            }

            System.out.println("Protected against blind SQL injection");

        } finally {
            driver.quit();
        }
    }
}
```

### Time-based SQL Injection Test

```java
public class TimeBased SQLInjectionTest {

    @Test
    public void testTimeBasedSQLInjection() {
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://example.com/search");

            // Time-based SQL injection payloads
            String timeBasedPayload = "1' AND SLEEP(5)--";

            long startTime = System.currentTimeMillis();

            WebElement searchBox = driver.findElement(By.id("search"));
            searchBox.sendKeys(timeBasedPayload);
            searchBox.submit();

            // Wait for response
            new WebDriverWait(driver, Duration.ofSeconds(10))
                .until(ExpectedConditions.presenceOfElementLocated(
                    By.id("results")));

            long endTime = System.currentTimeMillis();
            long responseTime = endTime - startTime;

            System.out.println("Response time: " + responseTime + "ms");

            // If response took significantly longer, might be vulnerable
            if (responseTime > 5000) {
                Assert.fail("Time-based SQL Injection vulnerability\! " +
                    "Response delayed by " + responseTime + "ms");
            }

            System.out.println("Protected against time-based SQL injection");

        } finally {
            driver.quit();
        }
    }
}
```

---

## CSRF Testing

### Understanding CSRF

**Cross-Site Request Forgery (CSRF)** is an attack that forces an end user to execute unwanted actions on a web application in which they're currently authenticated.

### CSRF Token Validation

```java
package security.csrf;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.Test;
import io.restassured.RestAssured;
import io.restassured.response.Response;

public class CSRFTest {

    @Test
    public void testCSRFTokenPresence() {
        WebDriver driver = new ChromeDriver();

        try {
            // Login
            loginAs(driver, "testuser@example.com", "password");

            // Navigate to form page
            driver.get("https://example.com/update-profile");

            // Check for CSRF token
            WebElement form = driver.findElement(By.id("profile-form"));
            WebElement csrfToken = form.findElement(
                By.cssSelector("input[name='csrf_token'], input[name='_token']"));

            Assert.assertNotNull(csrfToken, "CSRF token should be present");

            String tokenValue = csrfToken.getAttribute("value");
            Assert.assertFalse(tokenValue.isEmpty(),
                "CSRF token should have a value");

            System.out.println("CSRF token found: " + tokenValue);

        } finally {
            driver.quit();
        }
    }

    @Test
    public void testCSRFProtection() {
        // Attempt to submit form without CSRF token
        Response response = RestAssured
            .given()
                .formParam("name", "Test User")
                .formParam("email", "test@example.com")
            .when()
                .post("https://example.com/update-profile")
            .then()
                .extract()
                .response();

        int statusCode = response.getStatusCode();

        // Should receive 403 Forbidden or 400 Bad Request
        Assert.assertTrue(statusCode == 403 || statusCode == 400,
            "Request without CSRF token should be rejected");

        System.out.println("CSRF protection working - Status: " + statusCode);
    }

    @Test
    public void testCSRFTokenReuse() {
        WebDriver driver = new ChromeDriver();

        try {
            // Login and get CSRF token
            loginAs(driver, "testuser@example.com", "password");

            driver.get("https://example.com/update-profile");
            WebElement csrfInput = driver.findElement(By.name("csrf_token"));
            String firstToken = csrfInput.getAttribute("value");

            // Submit form
            driver.findElement(By.id("name")).clear();
            driver.findElement(By.id("name")).sendKeys("Updated Name");
            driver.findElement(By.id("submit")).click();

            // Get new CSRF token
            driver.get("https://example.com/update-profile");
            csrfInput = driver.findElement(By.name("csrf_token"));
            String secondToken = csrfInput.getAttribute("value");

            // Tokens should be different (one-time use)
            Assert.assertNotEquals(firstToken, secondToken,
                "CSRF tokens should not be reusable");

            System.out.println("CSRF token rotation working correctly");

        } finally {
            driver.quit();
        }
    }
}
```

---

## Security Headers Validation

### Important Security Headers

```
1. Content-Security-Policy (CSP)
2. X-Frame-Options
3. X-Content-Type-Options
4. Strict-Transport-Security (HSTS)
5. X-XSS-Protection
6. Referrer-Policy
7. Permissions-Policy
```

### Security Headers Test

```java
package security.headers;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.util.HashMap;
import java.util.Map;

public class SecurityHeadersTest {

    @Test
    public void testSecurityHeaders() {
        Response response = RestAssured
            .given()
            .when()
            .get("https://example.com")
            .then()
            .extract()
            .response();

        Map<String, String> headers = new HashMap<>();
        response.getHeaders().forEach(header ->
            headers.put(header.getName(), header.getValue()));

        System.out.println("=== Security Headers Analysis ===\n");

        // 1. Content-Security-Policy
        validateCSP(headers);

        // 2. X-Frame-Options
        validateXFrameOptions(headers);

        // 3. X-Content-Type-Options
        validateXContentTypeOptions(headers);

        // 4. Strict-Transport-Security
        validateHSTS(headers);

        // 5. X-XSS-Protection
        validateXSSProtection(headers);

        // 6. Referrer-Policy
        validateReferrerPolicy(headers);

        // 7. Permissions-Policy
        validatePermissionsPolicy(headers);
    }

    private void validateCSP(Map<String, String> headers) {
        String csp = headers.get("Content-Security-Policy");

        if (csp == null) {
            System.out.println("❌ Content-Security-Policy: MISSING");
            Assert.fail("Content-Security-Policy header is missing");
        } else {
            System.out.println("✓ Content-Security-Policy: PRESENT");
            System.out.println("  Value: " + csp);

            // Check for unsafe directives
            if (csp.contains("'unsafe-inline'") || csp.contains("'unsafe-eval'")) {
                System.out.println("  ⚠ WARNING: Contains unsafe directives");
            }
        }
    }

    private void validateXFrameOptions(Map<String, String> headers) {
        String xFrameOptions = headers.get("X-Frame-Options");

        if (xFrameOptions == null) {
            System.out.println("\n❌ X-Frame-Options: MISSING");
            System.out.println("  Risk: Clickjacking attacks possible");
        } else {
            System.out.println("\n✓ X-Frame-Options: " + xFrameOptions);

            Assert.assertTrue(
                xFrameOptions.equalsIgnoreCase("DENY") ||
                xFrameOptions.equalsIgnoreCase("SAMEORIGIN"),
                "X-Frame-Options should be DENY or SAMEORIGIN");
        }
    }

    private void validateXContentTypeOptions(Map<String, String> headers) {
        String xContentTypeOptions = headers.get("X-Content-Type-Options");

        if (xContentTypeOptions == null) {
            System.out.println("\n❌ X-Content-Type-Options: MISSING");
        } else {
            System.out.println("\n✓ X-Content-Type-Options: " + xContentTypeOptions);
            Assert.assertEquals(xContentTypeOptions, "nosniff",
                "X-Content-Type-Options should be 'nosniff'");
        }
    }

    private void validateHSTS(Map<String, String> headers) {
        String hsts = headers.get("Strict-Transport-Security");

        if (hsts == null) {
            System.out.println("\n❌ Strict-Transport-Security: MISSING");
            System.out.println("  Risk: Man-in-the-middle attacks possible");
        } else {
            System.out.println("\n✓ Strict-Transport-Security: PRESENT");
            System.out.println("  Value: " + hsts);

            // Check for recommended settings
            if (hsts.contains("max-age")) {
                System.out.println("  ✓ max-age directive present");
            }
            if (hsts.contains("includeSubDomains")) {
                System.out.println("  ✓ includeSubDomains directive present");
            }
            if (hsts.contains("preload")) {
                System.out.println("  ✓ preload directive present");
            }
        }
    }

    private void validateXSSProtection(Map<String, String> headers) {
        String xssProtection = headers.get("X-XSS-Protection");

        if (xssProtection == null) {
            System.out.println("\n⚠ X-XSS-Protection: MISSING (optional)");
        } else {
            System.out.println("\n✓ X-XSS-Protection: " + xssProtection);
        }
    }

    private void validateReferrerPolicy(Map<String, String> headers) {
        String referrerPolicy = headers.get("Referrer-Policy");

        if (referrerPolicy == null) {
            System.out.println("\n❌ Referrer-Policy: MISSING");
        } else {
            System.out.println("\n✓ Referrer-Policy: " + referrerPolicy);
        }
    }

    private void validatePermissionsPolicy(Map<String, String> headers) {
        String permissionsPolicy = headers.get("Permissions-Policy");

        if (permissionsPolicy == null) {
            System.out.println("\n⚠ Permissions-Policy: MISSING (optional)");
        } else {
            System.out.println("\n✓ Permissions-Policy: PRESENT");
            System.out.println("  Value: " + permissionsPolicy);
        }
    }
}
```

---

## SSL/TLS Certificate Testing

### Certificate Validation

```java
package security.ssl;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.Test;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLPeerUnverifiedException;
import javax.net.ssl.SSLSession;
import java.net.URL;
import java.security.cert.Certificate;
import java.security.cert.X509Certificate;
import java.util.Date;

public class SSLCertificateTest {

    @Test
    public void testHTTPSConnection() {
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://example.com");

            String url = driver.getCurrentUrl();

            Assert.assertTrue(url.startsWith("https://"),
                "Connection should use HTTPS");

            System.out.println("✓ HTTPS connection established");

        } finally {
            driver.quit();
        }
    }

    @Test
    public void testCertificateValidity() throws Exception {
        String urlString = "https://example.com";
        URL url = new URL(urlString);

        HttpsURLConnection connection =
            (HttpsURLConnection) url.openConnection();
        connection.connect();

        Certificate[] certificates = connection.getServerCertificates();

        System.out.println("=== SSL/TLS Certificate Analysis ===\n");

        for (Certificate cert : certificates) {
            if (cert instanceof X509Certificate) {
                X509Certificate x509cert = (X509Certificate) cert;

                System.out.println("Subject: " + x509cert.getSubjectDN());
                System.out.println("Issuer: " + x509cert.getIssuerDN());
                System.out.println("Serial Number: " + x509cert.getSerialNumber());
                System.out.println("Valid From: " + x509cert.getNotBefore());
                System.out.println("Valid Until: " + x509cert.getNotAfter());
                System.out.println("Signature Algorithm: " +
                    x509cert.getSigAlgName());

                // Check if certificate is valid
                try {
                    x509cert.checkValidity();
                    System.out.println("\n✓ Certificate is valid");
                } catch (Exception e) {
                    Assert.fail("Certificate is not valid: " + e.getMessage());
                }

                // Check expiration warning
                Date now = new Date();
                Date expiry = x509cert.getNotAfter();
                long daysUntilExpiry = (expiry.getTime() - now.getTime()) /
                    (1000 * 60 * 60 * 24);

                System.out.println("Days until expiration: " + daysUntilExpiry);

                if (daysUntilExpiry < 30) {
                    System.out.println("⚠ WARNING: Certificate expires soon\!");
                }
            }
        }

        connection.disconnect();
    }

    @Test
    public void testSSLProtocol() throws Exception {
        URL url = new URL("https://example.com");
        HttpsURLConnection connection =
            (HttpsURLConnection) url.openConnection();
        connection.connect();

        SSLSession session = connection.getSSLSession();

        String protocol = session.getProtocol();
        String cipherSuite = session.getCipherSuite();

        System.out.println("=== SSL/TLS Protocol Analysis ===");
        System.out.println("Protocol: " + protocol);
        System.out.println("Cipher Suite: " + cipherSuite);

        // Verify secure protocol is used
        Assert.assertTrue(
            protocol.equals("TLSv1.2") || protocol.equals("TLSv1.3"),
            "Should use TLS 1.2 or higher");

        // Check for weak ciphers
        Assert.assertFalse(cipherSuite.contains("NULL"),
            "Cipher suite should not be NULL");
        Assert.assertFalse(cipherSuite.contains("EXPORT"),
            "Export ciphers should not be used");
        Assert.assertFalse(cipherSuite.contains("DES"),
            "DES ciphers should not be used");

        System.out.println("✓ Secure SSL/TLS configuration");

        connection.disconnect();
    }
}
```

---

## Authentication & Authorization Testing

### Authentication Testing

```java
package security.auth;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.Test;

public class AuthenticationTest {

    @Test
    public void testWeakPasswordPrevention() {
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://example.com/register");

            String[] weakPasswords = {
                "123456",
                "password",
                "qwerty",
                "abc123",
                "12345678"
            };

            for (String weakPassword : weakPasswords) {
                driver.findElement(By.id("password")).clear();
                driver.findElement(By.id("password")).sendKeys(weakPassword);
                driver.findElement(By.id("confirm-password")).clear();
                driver.findElement(By.id("confirm-password"))
                    .sendKeys(weakPassword);

                driver.findElement(By.id("submit")).click();

                // Should show error for weak password
                Assert.assertTrue(
                    driver.findElement(By.className("error")).isDisplayed(),
                    "Weak password should be rejected: " + weakPassword);

                driver.navigate().refresh();
            }

            System.out.println("✓ Weak password prevention working");

        } finally {
            driver.quit();
        }
    }

    @Test
    public void testAccountLockout() {
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://example.com/login");

            int maxAttempts = 5;

            for (int i = 1; i <= maxAttempts + 1; i++) {
                driver.findElement(By.id("username")).clear();
                driver.findElement(By.id("username"))
                    .sendKeys("testuser@example.com");
                driver.findElement(By.id("password")).clear();
                driver.findElement(By.id("password"))
                    .sendKeys("wrongpassword" + i);
                driver.findElement(By.id("login-btn")).click();

                Thread.sleep(1000);

                if (i > maxAttempts) {
                    // Account should be locked
                    String errorMessage = driver.findElement(
                        By.className("error")).getText();

                    Assert.assertTrue(
                        errorMessage.contains("locked") ||
                        errorMessage.contains("too many attempts"),
                        "Account should be locked after " + maxAttempts +
                        " failed attempts");

                    System.out.println("✓ Account lockout working");
                    break;
                }

                driver.navigate().refresh();
            }

        } finally {
            driver.quit();
        }
    }

    @Test
    public void testSessionTimeout() throws Exception {
        WebDriver driver = new ChromeDriver();

        try {
            // Login
            loginAs(driver, "testuser@example.com", "password");

            // Verify logged in
            Assert.assertTrue(isUserLoggedIn(driver),
                "User should be logged in");

            // Wait for session timeout (e.g., 15 minutes)
            System.out.println("Waiting for session timeout...");
            Thread.sleep(15 * 60 * 1000); // 15 minutes

            // Try to access protected page
            driver.get("https://example.com/dashboard");

            // Should be redirected to login
            Assert.assertTrue(driver.getCurrentUrl().contains("/login"),
                "Session should timeout after inactivity");

            System.out.println("✓ Session timeout working");

        } finally {
            driver.quit();
        }
    }
}
```

### Authorization Testing

```java
public class AuthorizationTest {

    @Test
    public void testRoleBasedAccess() {
        WebDriver driver = new ChromeDriver();

        try {
            // Test as regular user
            loginAs(driver, "user@example.com", "userpass");

            // Try to access admin page
            driver.get("https://example.com/admin/users");

            // Should be denied
            Assert.assertTrue(
                driver.getCurrentUrl().contains("/access-denied") ||
                driver.getPageSource().contains("Access Denied"),
                "Regular user should not access admin pages");

            logout(driver);

            // Test as admin
            loginAs(driver, "admin@example.com", "adminpass");

            // Should access admin page
            driver.get("https://example.com/admin/users");

            Assert.assertTrue(
                driver.getCurrentUrl().contains("/admin/users"),
                "Admin should access admin pages");

            System.out.println("✓ Role-based access control working");

        } finally {
            driver.quit();
        }
    }

    @Test
    public void testDirectObjectReference() {
        WebDriver driver = new ChromeDriver();

        try {
            // Login as User 1
            loginAs(driver, "user1@example.com", "password");

            // Access own profile
            driver.get("https://example.com/profile?id=1");
            Assert.assertTrue(driver.getPageSource().contains("user1"),
                "User should access own profile");

            // Try to access another user's profile
            driver.get("https://example.com/profile?id=2");

            // Should be denied
            Assert.assertTrue(
                driver.getCurrentUrl().contains("/access-denied") ||
                \!driver.getPageSource().contains("user2"),
                "User should not access other user's profile");

            System.out.println("✓ Direct object reference protection working");

        } finally {
            driver.quit();
        }
    }
}
```

---

## Sensitive Data Exposure Testing

### Testing for Sensitive Data in URLs

```java
package security.data;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.Test;

public class SensitiveDataTest {

    @Test
    public void testSensitiveDataInURL() {
        WebDriver driver = new ChromeDriver();

        try {
            // Login
            driver.get("https://example.com/login");
            driver.findElement(By.id("username"))
                .sendKeys("testuser@example.com");
            driver.findElement(By.id("password"))
                .sendKeys("password123");
            driver.findElement(By.id("login-btn")).click();

            String url = driver.getCurrentUrl();

            // Check if password or sensitive data is in URL
            Assert.assertFalse(url.contains("password"),
                "Password should not be in URL");
            Assert.assertFalse(url.contains("ssn"),
                "SSN should not be in URL");
            Assert.assertFalse(url.contains("credit"),
                "Credit card should not be in URL");

            System.out.println("✓ No sensitive data in URL");

        } finally {
            driver.quit();
        }
    }

    @Test
    public void testPasswordMasking() {
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://example.com/login");

            WebElement passwordField = driver.findElement(By.id("password"));

            // Check input type
            String inputType = passwordField.getAttribute("type");
            Assert.assertEquals(inputType, "password",
                "Password field should be masked");

            // Check autocomplete
            String autocomplete = passwordField.getAttribute("autocomplete");
            Assert.assertTrue(
                autocomplete == null ||
                autocomplete.equals("off") ||
                autocomplete.equals("current-password"),
                "Password autocomplete should be configured properly");

            System.out.println("✓ Password masking configured correctly");

        } finally {
            driver.quit();
        }
    }

    @Test
    public void testSensitiveDataInPageSource() {
        WebDriver driver = new ChromeDriver();

        try {
            // Login
            loginAs(driver, "testuser@example.com", "password");

            driver.get("https://example.com/profile");

            String pageSource = driver.getPageSource();

            // Check for exposed sensitive data patterns
            Assert.assertFalse(pageSource.matches(".*\\d{3}-\\d{2}-\\d{4}.*"),
                "SSN pattern found in page source");

            Assert.assertFalse(
                pageSource.matches(".*\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}.*"),
                "Credit card pattern found in page source");

            // Check if full credit card is displayed (should be masked)
            if (pageSource.contains("**** **** **** ")) {
                System.out.println("✓ Credit card properly masked");
            }

            System.out.println("✓ Sensitive data properly protected");

        } finally {
            driver.quit();
        }
    }

    @Test
    public void testDataEncryptionInTransit() throws Exception {
        // All sensitive operations should use HTTPS
        String[] sensitivePages = {
            "/login",
            "/register",
            "/payment",
            "/profile",
            "/change-password"
        };

        for (String page : sensitivePages) {
            URL url = new URL("https://example.com" + page);

            HttpsURLConnection connection =
                (HttpsURLConnection) url.openConnection();
            connection.connect();

            int responseCode = connection.getResponseCode();

            // Should successfully connect via HTTPS
            Assert.assertTrue(responseCode == 200 || responseCode == 302,
                "Page should be accessible via HTTPS: " + page);

            System.out.println("✓ " + page + " uses HTTPS");

            connection.disconnect();
        }
    }
}
```

---

## Security Testing Best Practices

### 1. Security Testing Checklist

```
Authentication & Session Management:
☐ Password complexity enforced
☐ Account lockout after failed attempts
☐ Session timeout implemented
☐ Secure password reset flow
☐ Multi-factor authentication (if applicable)
☐ Remember me functionality secure

Authorization:
☐ Role-based access control
☐ Vertical privilege escalation prevented
☐ Horizontal privilege escalation prevented
☐ Direct object reference protection

Input Validation:
☐ XSS prevention
☐ SQL injection prevention
☐ Command injection prevention
☐ Path traversal prevention
☐ File upload validation

Data Protection:
☐ Sensitive data encrypted in transit (HTTPS)
☐ Sensitive data encrypted at rest
☐ No sensitive data in URLs
☐ No sensitive data in logs
☐ Proper error handling (no information disclosure)

Security Headers:
☐ Content-Security-Policy
☐ X-Frame-Options
☐ X-Content-Type-Options
☐ Strict-Transport-Security
☐ X-XSS-Protection

SSL/TLS:
☐ Valid SSL certificate
☐ TLS 1.2 or higher
☐ No weak ciphers
☐ Certificate expiration monitoring
```

### 2. Automated Security Testing Framework

```java
package security.framework;

import org.testng.annotations.Test;
import java.util.ArrayList;
import java.util.List;

public class SecurityTestSuite {

    private List<SecurityVulnerability> vulnerabilities = new ArrayList<>();

    @Test
    public void runComprehensiveSecurityTests() {
        System.out.println("=== Comprehensive Security Test Suite ===\n");

        // Run all security tests
        testAuthentication();
        testAuthorization();
        testInputValidation();
        testSessionManagement();
        testDataProtection();
        testSecurityHeaders();
        testSSLTLS();

        // Generate security report
        generateSecurityReport();
    }

    private void testAuthentication() {
        System.out.println("Testing Authentication...");
        AuthenticationTest authTest = new AuthenticationTest();
        // Run authentication tests
        // Log vulnerabilities if found
    }

    private void testAuthorization() {
        System.out.println("Testing Authorization...");
        AuthorizationTest authzTest = new AuthorizationTest();
        // Run authorization tests
    }

    private void testInputValidation() {
        System.out.println("Testing Input Validation...");
        // XSS tests
        XSSTest xssTest = new XSSTest();

        // SQL Injection tests
        SQLInjectionTest sqlTest = new SQLInjectionTest();
    }

    private void testSessionManagement() {
        System.out.println("Testing Session Management...");
        // Session timeout, fixation, etc.
    }

    private void testDataProtection() {
        System.out.println("Testing Data Protection...");
        SensitiveDataTest dataTest = new SensitiveDataTest();
    }

    private void testSecurityHeaders() {
        System.out.println("Testing Security Headers...");
        SecurityHeadersTest headersTest = new SecurityHeadersTest();
    }

    private void testSSLTLS() {
        System.out.println("Testing SSL/TLS...");
        SSLCertificateTest sslTest = new SSLCertificateTest();
    }

    private void generateSecurityReport() {
        System.out.println("\n=== Security Test Report ===\n");
        System.out.println("Total Vulnerabilities Found: " +
            vulnerabilities.size());

        if (vulnerabilities.isEmpty()) {
            System.out.println("✓ No vulnerabilities detected\!");
        } else {
            System.out.println("\nVulnerabilities:");
            for (SecurityVulnerability vuln : vulnerabilities) {
                System.out.println("- " + vuln.getSeverity() + ": " +
                    vuln.getDescription());
            }
        }
    }
}

class SecurityVulnerability {
    private String name;
    private String severity;
    private String description;
    private String remediation;

    // Constructor, getters, setters
    public String getSeverity() { return severity; }
    public String getDescription() { return description; }
}
```

---

## Practical Exercises

### Exercise 1: Performance Testing

**Objective**: Measure and optimize page load performance

**Tasks**:
1. Create performance tests for 5 different pages
2. Measure Navigation Timing metrics
3. Analyze Resource Timing for each page
4. Identify performance bottlenecks
5. Generate performance report with recommendations

### Exercise 2: XSS Vulnerability Testing

**Objective**: Test application for XSS vulnerabilities

**Tasks**:
1. Test Reflected XSS in search functionality
2. Test Stored XSS in comment/feedback forms
3. Test DOM-based XSS
4. Use at least 10 different XSS payloads
5. Document findings and recommendations

### Exercise 3: Authentication Security

**Objective**: Validate authentication security mechanisms

**Tasks**:
1. Test weak password prevention
2. Test account lockout mechanism
3. Test session timeout
4. Test password reset flow
5. Test "Remember Me" functionality security

### Exercise 4: Security Headers

**Objective**: Validate all security headers

**Tasks**:
1. Check for all 7 critical security headers
2. Validate CSP directives
3. Test HSTS configuration
4. Verify X-Frame-Options protection
5. Generate security headers report

### Exercise 5: SQL Injection Testing

**Objective**: Test for SQL injection vulnerabilities

**Tasks**:
1. Test login form for SQL injection
2. Test search functionality
3. Test URL parameters
4. Test blind SQL injection
5. Test time-based SQL injection

---

## Key Takeaways

1. **Performance Testing** identifies speed, stability, and scalability issues
2. **Load Testing** verifies system under expected conditions
3. **Stress Testing** tests system limits and breaking points
4. **Navigation Timing API** provides detailed page load metrics
5. **Resource Timing API** analyzes individual resource performance
6. **Performance Marks** enable custom performance measurements
7. **JMeter Integration** enables comprehensive load testing
8. **Lighthouse** provides holistic web performance audits
9. **Security Testing** identifies vulnerabilities before production
10. **OWASP Top 10** are the most critical security risks
11. **XSS Prevention** requires input validation and output encoding
12. **SQL Injection** can be prevented with parameterized queries
13. **CSRF Tokens** protect against cross-site request forgery
14. **Security Headers** provide defense-in-depth protection
15. **SSL/TLS** ensures data encryption in transit
16. **Authentication** must enforce strong passwords and account lockout
17. **Authorization** must prevent privilege escalation
18. **Sensitive Data** must never be exposed in URLs or logs
19. **Security Testing** should be automated and continuous
20. **Performance and Security** are both critical quality attributes

---

## Interview Questions

### Performance Testing Questions

**Q1: What is the difference between Load Testing and Stress Testing?**

A: Load Testing verifies system behavior under expected load conditions, while Stress Testing tests the system beyond normal capacity to find its breaking point. Load testing ensures the system meets performance requirements, while stress testing identifies maximum capacity and failure modes.

**Q2: Explain Navigation Timing API and its key metrics.**

A: Navigation Timing API provides detailed timing information about page navigation. Key metrics include:
- DNS Lookup Time: Time to resolve domain name
- TCP Connection Time: Time to establish connection
- Request Time: Time for server to receive request
- Response Time: Time to download response
- DOM Processing Time: Time to process DOM
- Page Load Time: Total time from navigation start to load complete

**Q3: What is Time to First Byte (TTFB) and why is it important?**

A: TTFB is the time from navigation start to when the browser receives the first byte of response from the server. It's important because it measures backend performance and network latency. High TTFB indicates server processing issues or network problems.

**Q4: How do you measure performance in Selenium tests?**

A: Performance can be measured using:
1. System.currentTimeMillis() for basic timing
2. Navigation Timing API via JavaScript execution
3. Resource Timing API for resource-level metrics
4. Performance marks and measures
5. Chrome DevTools Protocol for detailed metrics
6. Integration with tools like JMeter or Lighthouse

**Q5: What are Core Web Vitals?**

A: Core Web Vitals are Google's metrics for user experience:
1. LCP (Largest Contentful Paint): Loading performance (< 2.5s)
2. FID (First Input Delay): Interactivity (< 100ms)
3. CLS (Cumulative Layout Shift): Visual stability (< 0.1)

### Security Testing Questions

**Q6: What is Cross-Site Scripting (XSS) and how do you test for it?**

A: XSS is a vulnerability where attackers inject malicious scripts into web pages. Testing involves:
1. Injecting XSS payloads into input fields
2. Checking if scripts execute (e.g., alert appears)
3. Verifying output is properly escaped
4. Testing reflected, stored, and DOM-based XSS
5. Using multiple payload variations

**Q7: How do you prevent SQL Injection?**

A: SQL Injection prevention:
1. Use parameterized queries/prepared statements
2. Use ORM frameworks
3. Input validation and sanitization
4. Principle of least privilege for database accounts
5. Use stored procedures
6. Avoid dynamic SQL construction
7. Implement Web Application Firewall (WAF)

**Q8: What is CSRF and how is it prevented?**

A: CSRF (Cross-Site Request Forgery) forces users to execute unwanted actions while authenticated. Prevention:
1. Use CSRF tokens (unique per session)
2. Validate token on server side
3. Use SameSite cookie attribute
4. Check Referer header
5. Use custom request headers
6. Implement re-authentication for sensitive operations

**Q9: Explain the importance of Content-Security-Policy header.**

A: CSP header prevents XSS attacks by:
1. Specifying allowed content sources
2. Preventing inline script execution
3. Blocking eval() and similar functions
4. Controlling which resources can be loaded
5. Reporting violations to specified endpoint
6. Providing defense-in-depth security

**Q10: How do you test authentication security?**

A: Authentication security testing includes:
1. Password complexity enforcement
2. Account lockout after failed attempts
3. Session timeout validation
4. Secure password reset flow
5. Multi-factor authentication (if applicable)
6. Credential enumeration prevention
7. Brute force protection
8. Session fixation prevention

### Advanced Questions

**Q11: Design a comprehensive performance testing strategy for a high-traffic e-commerce website.**

A: Strategy should include:
1. Identify critical user journeys
2. Set performance baselines and SLAs
3. Implement progressive testing:
   - Smoke tests (< 3s page load)
   - Load tests (1000 concurrent users)
   - Stress tests (find breaking point)
   - Endurance tests (24-hour sustained load)
4. Monitor key metrics (response time, throughput, errors)
5. Test in production-like environment
6. Use CDN and caching strategies
7. Optimize database queries
8. Implement performance budgets
9. Continuous monitoring in production
10. Regular performance regression testing

**Q12: How would you implement automated security testing in a CI/CD pipeline?**

A: Implementation approach:
1. Static Analysis (SAST):
   - SonarQube for code vulnerabilities
   - Dependency scanning (OWASP Dependency Check)
2. Dynamic Analysis (DAST):
   - OWASP ZAP for automated scanning
   - Custom Selenium security tests
3. Security Headers validation
4. SSL/TLS certificate validation
5. Authentication/Authorization tests
6. XSS and SQL Injection tests
7. API security testing
8. Container security scanning
9. Infrastructure as Code scanning
10. Security reporting and alerting
11. Fail builds on critical vulnerabilities
12. Regular security audits

**Q13: Explain how you would detect and prevent memory leaks in web applications using Selenium.**

A: Detection and prevention:
1. Use performance.memory API to monitor heap size
2. Execute user journey multiple times
3. Compare initial vs final memory usage
4. Check for continuous memory growth
5. Use Chrome DevTools Memory Profiler
6. Analyze heap snapshots
7. Look for detached DOM nodes
8. Check for event listener leaks
9. Monitor closure usage
10. Implement proper cleanup in tests

**Q14: What is the difference between authentication and authorization testing?**

A: 
Authentication Testing verifies identity:
- Login mechanisms
- Password policies
- Session management
- Multi-factor authentication
- Account lockout
- Password reset

Authorization Testing verifies access rights:
- Role-based access control
- Resource-level permissions
- Vertical privilege escalation
- Horizontal privilege escalation
- Direct object references
- API endpoint protection

**Q15: How do you test for Insecure Direct Object References (IDOR)?**

A: IDOR testing approach:
1. Login as User A
2. Access User A's resource (note the ID)
3. Try to access User B's resource using their ID
4. Verify access is denied
5. Test with different resource types (documents, profiles, orders)
6. Try parameter manipulation (id=1, id=2, etc.)
7. Test with encoded/obfuscated IDs
8. Verify server-side authorization
9. Check API endpoints
10. Test both GET and POST requests

---

## Beginner-Friendly Exercises

### Exercise 1: Basic Page Load Performance Measurement (40 minutes)

**Objective**: Learn to measure and validate page load performance using Navigation Timing API.

**Real-world Scenario**: You need to ensure that your e-commerce homepage loads within acceptable time limits (less than 3 seconds) to provide good user experience and meet performance SLAs.

**Requirements**:
1. Set up a basic performance test class
2. Implement Navigation Timing API metrics collection
3. Calculate key performance metrics (load time, DOM ready time)
4. Create assertions for performance thresholds
5. Generate a simple performance report

**Code Template**:
```java
package com.automation.performance.exercises;

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.*;
import io.github.bonigarcia.wdm.WebDriverManager;
import static org.testng.Assert.*;

public class Exercise1_BasicPerformanceTest {

    private WebDriver driver;
    private JavascriptExecutor js;

    @BeforeClass
    public void setup() {
        // TODO: Setup WebDriver
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        js = (JavascriptExecutor) driver;
        driver.manage().window().maximize();
    }

    @Test(priority = 1)
    public void testPageLoadPerformance() {
        // TODO: Navigate to test website
        driver.get("https://www.example.com");

        // TODO: Wait for page to fully load
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // TODO: Get Navigation Timing metrics
        Long navigationStart = (Long) js.executeScript(
            "return window.performance.timing.navigationStart;");
        Long loadEventEnd = (Long) js.executeScript(
            "return window.performance.timing.loadEventEnd;");
        Long domContentLoadedEventEnd = (Long) js.executeScript(
            "return window.performance.timing.domContentLoadedEventEnd;");

        // TODO: Calculate performance metrics
        long pageLoadTime = loadEventEnd - navigationStart;
        long domReadyTime = domContentLoadedEventEnd - navigationStart;

        // TODO: Print metrics
        System.out.println("=== Performance Metrics ===");
        System.out.println("Page Load Time: " + pageLoadTime + " ms");
        System.out.println("DOM Ready Time: " + domReadyTime + " ms");

        // TODO: Assert performance thresholds
        assertTrue(pageLoadTime < 3000,
            "Page load time should be less than 3 seconds. Actual: " + pageLoadTime + " ms");
        assertTrue(domReadyTime < 2000,
            "DOM ready time should be less than 2 seconds. Actual: " + domReadyTime + " ms");

        System.out.println("Performance test PASSED!");
    }

    @Test(priority = 2)
    public void testDetailedNavigationTiming() {
        driver.get("https://www.example.com");

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // TODO: Get all Navigation Timing metrics
        Long navigationStart = (Long) js.executeScript(
            "return window.performance.timing.navigationStart;");
        Long fetchStart = (Long) js.executeScript(
            "return window.performance.timing.fetchStart;");
        Long domainLookupStart = (Long) js.executeScript(
            "return window.performance.timing.domainLookupStart;");
        Long domainLookupEnd = (Long) js.executeScript(
            "return window.performance.timing.domainLookupEnd;");
        Long connectStart = (Long) js.executeScript(
            "return window.performance.timing.connectStart;");
        Long connectEnd = (Long) js.executeScript(
            "return window.performance.timing.connectEnd;");
        Long requestStart = (Long) js.executeScript(
            "return window.performance.timing.requestStart;");
        Long responseStart = (Long) js.executeScript(
            "return window.performance.timing.responseStart;");
        Long responseEnd = (Long) js.executeScript(
            "return window.performance.timing.responseEnd;");

        // TODO: Calculate individual metrics
        long dnsLookupTime = domainLookupEnd - domainLookupStart;
        long tcpConnectionTime = connectEnd - connectStart;
        long serverResponseTime = responseEnd - requestStart;
        long ttfb = responseStart - navigationStart;  // Time To First Byte

        // TODO: Print detailed metrics
        System.out.println("\n=== Detailed Performance Metrics ===");
        System.out.println("DNS Lookup Time: " + dnsLookupTime + " ms");
        System.out.println("TCP Connection Time: " + tcpConnectionTime + " ms");
        System.out.println("Server Response Time: " + serverResponseTime + " ms");
        System.out.println("Time To First Byte (TTFB): " + ttfb + " ms");

        // TODO: Verify individual metrics
        assertTrue(dnsLookupTime < 100, "DNS lookup should be fast");
        assertTrue(serverResponseTime < 1000, "Server response should be under 1 second");
    }

    @Test(priority = 3)
    public void testComparePerformanceAcrossPages() {
        // TODO: Test multiple pages and compare performance
        String[] urls = {
            "https://www.example.com",
            "https://www.example.com/about",
            "https://www.example.com/contact"
        };

        for (String url : urls) {
            driver.get(url);

            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            // TODO: Get load time
            Long navigationStart = (Long) js.executeScript(
                "return window.performance.timing.navigationStart;");
            Long loadEventEnd = (Long) js.executeScript(
                "return window.performance.timing.loadEventEnd;");

            long pageLoadTime = loadEventEnd - navigationStart;

            // TODO: Print results
            System.out.println("\nURL: " + url);
            System.out.println("Load Time: " + pageLoadTime + " ms");

            // TODO: Verify threshold
            assertTrue(pageLoadTime < 5000,
                "Page " + url + " took too long to load: " + pageLoadTime + " ms");
        }
    }

    @AfterClass
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

**Expected Outcome**:
- Navigation Timing API metrics are successfully collected
- Page load time and DOM ready time are calculated accurately
- Performance assertions validate against defined thresholds
- Detailed timing breakdown shows DNS, TCP, and server response times
- Tests can compare performance across multiple pages
- Clear performance reports are printed to console

**Common Mistakes to Avoid**:
1. Not waiting for page to fully load before collecting metrics
2. Using Thread.sleep instead of proper waits (acceptable for this basic exercise)
3. Not handling null values from performance API
4. Setting unrealistic performance thresholds
5. Not considering network conditions affecting results

**Solution Approach (Hints)**:
- Use JavascriptExecutor to access window.performance.timing
- Calculate metrics by subtracting timestamps: `endTime - startTime`
- Add waits to ensure loadEventEnd is populated
- Use meaningful variable names for different timing events
- Print metrics in milliseconds for easier reading
- Set thresholds based on actual measurements, not guesses

---

### Exercise 2: Resource Performance Analysis with Resource Timing API (50 minutes)

**Objective**: Analyze individual resource loading performance to identify slow assets and optimization opportunities.

**Real-world Scenario**: Your web page loads slowly, and you need to identify which specific resources (images, CSS, JavaScript) are causing the delay to optimize loading performance.

**Requirements**:
1. Implement Resource Timing API data collection
2. Analyze different resource types (images, scripts, stylesheets)
3. Identify slowest loading resources
4. Calculate resource loading statistics
5. Generate a performance report with recommendations

**Code Template**:
```java
package com.automation.performance.exercises;

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.*;
import io.github.bonigarcia.wdm.WebDriverManager;
import java.util.*;

public class Exercise2_ResourcePerformanceAnalysis {

    private WebDriver driver;
    private JavascriptExecutor js;

    @BeforeClass
    public void setup() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        js = (JavascriptExecutor) driver;
        driver.manage().window().maximize();
    }

    @Test(priority = 1)
    public void testAnalyzeAllResources() {
        // TODO: Navigate to website
        driver.get("https://www.example.com");

        try {
            Thread.sleep(3000);  // Wait for resources to load
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // TODO: Get all resource performance entries
        String script = "var resources = window.performance.getEntriesByType('resource');" +
                       "return resources.map(r => ({" +
                       "  name: r.name," +
                       "  duration: r.duration," +
                       "  size: r.transferSize," +
                       "  type: r.initiatorType" +
                       "}));";

        @SuppressWarnings("unchecked")
        List<Map<String, Object>> resources =
            (List<Map<String, Object>>) js.executeScript(script);

        // TODO: Print resource information
        System.out.println("=== Resource Performance Analysis ===");
        System.out.println("Total Resources: " + resources.size());

        for (Map<String, Object> resource : resources) {
            String name = (String) resource.get("name");
            Number duration = (Number) resource.get("duration");
            Number size = (Number) resource.get("size");
            String type = (String) resource.get("type");

            System.out.println("\nResource: " + getResourceFileName(name));
            System.out.println("Type: " + type);
            System.out.println("Duration: " + duration.longValue() + " ms");
            System.out.println("Size: " + size.longValue() + " bytes");
        }
    }

    @Test(priority = 2)
    public void testIdentifySlowestResources() {
        driver.get("https://www.example.com");

        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // TODO: Get resource entries
        String script = "var resources = window.performance.getEntriesByType('resource');" +
                       "return resources.map(r => ({" +
                       "  name: r.name," +
                       "  duration: r.duration" +
                       "}));";

        @SuppressWarnings("unchecked")
        List<Map<String, Object>> resources =
            (List<Map<String, Object>>) js.executeScript(script);

        // TODO: Sort by duration (slowest first)
        resources.sort((r1, r2) -> {
            Number d1 = (Number) r1.get("duration");
            Number d2 = (Number) r2.get("duration");
            return Long.compare(d2.longValue(), d1.longValue());
        });

        // TODO: Print top 5 slowest resources
        System.out.println("\n=== Top 5 Slowest Resources ===");
        for (int i = 0; i < Math.min(5, resources.size()); i++) {
            Map<String, Object> resource = resources.get(i);
            String name = (String) resource.get("name");
            Number duration = (Number) resource.get("duration");

            System.out.println("\n" + (i + 1) + ". " + getResourceFileName(name));
            System.out.println("   Load Time: " + duration.longValue() + " ms");
        }

        // TODO: Verify no resource takes too long
        Map<String, Object> slowestResource = resources.get(0);
        Number slowestDuration = (Number) slowestResource.get("duration");

        if (slowestDuration.longValue() > 5000) {
            System.out.println("\nWARNING: Slowest resource took " +
                slowestDuration.longValue() + " ms to load!");
        }
    }

    @Test(priority = 3)
    public void testAnalyzeResourcesByType() {
        driver.get("https://www.example.com");

        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // TODO: Get resources grouped by type
        String script = "var resources = window.performance.getEntriesByType('resource');" +
                       "return resources.map(r => ({" +
                       "  type: r.initiatorType," +
                       "  duration: r.duration," +
                       "  size: r.transferSize" +
                       "}));";

        @SuppressWarnings("unchecked")
        List<Map<String, Object>> resources =
            (List<Map<String, Object>>) js.executeScript(script);

        // TODO: Group resources by type
        Map<String, List<Map<String, Object>>> resourcesByType = new HashMap<>();

        for (Map<String, Object> resource : resources) {
            String type = (String) resource.get("type");
            resourcesByType.computeIfAbsent(type, k -> new ArrayList<>()).add(resource);
        }

        // TODO: Calculate statistics per type
        System.out.println("\n=== Resource Statistics by Type ===");

        for (Map.Entry<String, List<Map<String, Object>>> entry : resourcesByType.entrySet()) {
            String type = entry.getKey();
            List<Map<String, Object>> typeResources = entry.getValue();

            long totalDuration = 0;
            long totalSize = 0;

            for (Map<String, Object> resource : typeResources) {
                Number duration = (Number) resource.get("duration");
                Number size = (Number) resource.get("size");
                totalDuration += duration.longValue();
                totalSize += size.longValue();
            }

            long avgDuration = typeResources.size() > 0 ?
                totalDuration / typeResources.size() : 0;

            System.out.println("\nType: " + type);
            System.out.println("Count: " + typeResources.size());
            System.out.println("Total Load Time: " + totalDuration + " ms");
            System.out.println("Average Load Time: " + avgDuration + " ms");
            System.out.println("Total Size: " + formatBytes(totalSize));
        }
    }

    @Test(priority = 4)
    public void testResourceLoadingRecommendations() {
        driver.get("https://www.example.com");

        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // TODO: Get all resources
        String script = "var resources = window.performance.getEntriesByType('resource');" +
                       "return resources.map(r => ({" +
                       "  name: r.name," +
                       "  duration: r.duration," +
                       "  size: r.transferSize," +
                       "  type: r.initiatorType" +
                       "}));";

        @SuppressWarnings("unchecked")
        List<Map<String, Object>> resources =
            (List<Map<String, Object>>) js.executeScript(script);

        // TODO: Generate recommendations
        System.out.println("\n=== Performance Recommendations ===");

        List<String> recommendations = new ArrayList<>();

        // Check for large images
        for (Map<String, Object> resource : resources) {
            String type = (String) resource.get("type");
            Number size = (Number) resource.get("size");
            Number duration = (Number) resource.get("duration");

            if ("img".equals(type) && size.longValue() > 500000) {
                recommendations.add("Large image detected: " +
                    getResourceFileName((String) resource.get("name")) +
                    " (" + formatBytes(size.longValue()) + "). Consider compression.");
            }

            if (duration.longValue() > 3000) {
                recommendations.add("Slow loading resource: " +
                    getResourceFileName((String) resource.get("name")) +
                    " (" + duration.longValue() + " ms). Investigate network or server issues.");
            }
        }

        // TODO: Print recommendations
        if (recommendations.isEmpty()) {
            System.out.println("No major performance issues detected.");
        } else {
            for (int i = 0; i < recommendations.size(); i++) {
                System.out.println((i + 1) + ". " + recommendations.get(i));
            }
        }
    }

    // Helper methods
    private String getResourceFileName(String url) {
        String[] parts = url.split("/");
        return parts[parts.length - 1];
    }

    private String formatBytes(long bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024) + " KB";
        return (bytes / (1024 * 1024)) + " MB";
    }

    @AfterClass
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

**Expected Outcome**:
- Resource Timing API successfully retrieves all page resources
- Resources are analyzed by type (images, scripts, stylesheets)
- Slowest loading resources are identified and reported
- Resource statistics (count, total size, average load time) are calculated
- Performance recommendations are generated based on analysis
- Clear, actionable reports help identify optimization opportunities

**Common Mistakes to Avoid**:
1. Not waiting long enough for all resources to load before analysis
2. Not handling resources with missing transferSize property
3. Hardcoding resource count expectations (varies by page)
4. Not sorting resources properly (JavaScript number comparison)
5. Ignoring resource type when making optimization recommendations

**Solution Approach (Hints)**:
- Use `window.performance.getEntriesByType('resource')` to get all resources
- Map resource entries to JavaScript objects with needed properties
- Cast JavaScript results to `List<Map<String, Object>>` in Java
- Use `Number` type for numeric values from JavaScript
- Sort using Java Comparator: `resources.sort((r1, r2) -> ...)`
- Group by type using HashMap with computeIfAbsent
- Format file sizes: bytes → KB → MB for readability

---

### Exercise 3: Custom Performance Marks and Measures (45 minutes)

**Objective**: Implement custom performance marks and measures to track specific user journey timings.

**Real-world Scenario**: You need to measure how long specific actions take in your application (e.g., search, filter, checkout) to identify performance bottlenecks in user workflows.

**Requirements**:
1. Create custom performance marks at key points
2. Implement performance measures between marks
3. Track multi-step user journey timings
4. Collect and analyze custom metrics
5. Validate performance against benchmarks

**Code Template**:
```java
package com.automation.performance.exercises;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.*;
import io.github.bonigarcia.wdm.WebDriverManager;
import static org.testng.Assert.*;

public class Exercise3_CustomPerformanceMarks {

    private WebDriver driver;
    private JavascriptExecutor js;

    @BeforeClass
    public void setup() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        js = (JavascriptExecutor) driver;
        driver.manage().window().maximize();
    }

    @Test(priority = 1)
    public void testBasicPerformanceMarks() {
        driver.get("https://www.example.com");

        // TODO: Create performance mark at journey start
        js.executeScript("window.performance.mark('journey-start');");

        System.out.println("=== Custom Performance Marks Test ===");

        // Simulate some user action
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // TODO: Create mark at journey end
        js.executeScript("window.performance.mark('journey-end');");

        // TODO: Create measure between marks
        js.executeScript(
            "window.performance.measure('journey-duration', 'journey-start', 'journey-end');");

        // TODO: Get the measure
        String script = "var measure = window.performance.getEntriesByName('journey-duration')[0];" +
                       "return measure.duration;";

        Number duration = (Number) js.executeScript(script);

        // TODO: Print results
        System.out.println("Journey Duration: " + duration.longValue() + " ms");

        // TODO: Verify performance
        assertTrue(duration.longValue() < 5000,
            "Journey should complete within 5 seconds");
    }

    @Test(priority = 2)
    public void testMultiStepUserJourney() {
        // TODO: Simulate an e-commerce user journey
        driver.get("https://www.example.com");

        // Mark: Journey Start
        js.executeScript("window.performance.mark('user-journey-start');");

        System.out.println("\n=== Multi-Step User Journey Performance ===");

        // Step 1: View homepage
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        js.executeScript("window.performance.mark('homepage-viewed');");

        // Step 2: Navigate to products
        // (Simulated - in real test, you'd actually navigate)
        try {
            Thread.sleep(800);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        js.executeScript("window.performance.mark('products-page-loaded');");

        // Step 3: Search for product
        try {
            Thread.sleep(600);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        js.executeScript("window.performance.mark('search-completed');");

        // Step 4: Add to cart
        try {
            Thread.sleep(400);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        js.executeScript("window.performance.mark('added-to-cart');");

        // Mark: Journey End
        js.executeScript("window.performance.mark('user-journey-end');");

        // TODO: Create measures for each step
        js.executeScript(
            "window.performance.measure('homepage-time', 'user-journey-start', 'homepage-viewed');" +
            "window.performance.measure('products-time', 'homepage-viewed', 'products-page-loaded');" +
            "window.performance.measure('search-time', 'products-page-loaded', 'search-completed');" +
            "window.performance.measure('add-to-cart-time', 'search-completed', 'added-to-cart');" +
            "window.performance.measure('total-journey-time', 'user-journey-start', 'user-journey-end');");

        // TODO: Get all measures
        String script = "var measures = window.performance.getEntriesByType('measure');" +
                       "return measures.map(m => ({ name: m.name, duration: m.duration }));";

        @SuppressWarnings("unchecked")
        java.util.List<java.util.Map<String, Object>> measures =
            (java.util.List<java.util.Map<String, Object>>) js.executeScript(script);

        // TODO: Print step-by-step timings
        for (java.util.Map<String, Object> measure : measures) {
            String name = (String) measure.get("name");
            Number duration = (Number) measure.get("duration");

            System.out.println(name + ": " + duration.longValue() + " ms");
        }

        // TODO: Verify each step meets performance criteria
        // This would be done based on actual measurements
    }

    @Test(priority = 3)
    public void testSearchPerformance() {
        driver.get("https://www.example.com");

        // TODO: Mark before search
        js.executeScript("window.performance.mark('search-start');");

        // Simulate search action (in real test, interact with search field)
        try {
            // TODO: In real scenario:
            // driver.findElement(By.id("search")).sendKeys("laptop");
            // driver.findElement(By.id("search-button")).click();

            Thread.sleep(1200);  // Simulating search processing time
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // TODO: Mark after search results appear
        js.executeScript("window.performance.mark('search-results-displayed');");

        // TODO: Create measure
        js.executeScript(
            "window.performance.measure('search-duration', 'search-start', 'search-results-displayed');");

        // TODO: Get search duration
        String script = "var measure = window.performance.getEntriesByName('search-duration')[0];" +
                       "return measure.duration;";

        Number searchDuration = (Number) js.executeScript(script);

        System.out.println("\n=== Search Performance ===");
        System.out.println("Search Duration: " + searchDuration.longValue() + " ms");

        // TODO: Verify search performance
        assertTrue(searchDuration.longValue() < 2000,
            "Search should return results within 2 seconds. Actual: " +
            searchDuration.longValue() + " ms");
    }

    @Test(priority = 4)
    public void testClearPerformanceMarks() {
        // TODO: Create some marks
        js.executeScript(
            "window.performance.mark('mark1');" +
            "window.performance.mark('mark2');" +
            "window.performance.mark('mark3');");

        // TODO: Get count before clearing
        String countScript = "return window.performance.getEntriesByType('mark').length;";
        Number beforeCount = (Number) js.executeScript(countScript);

        System.out.println("\n=== Clear Performance Marks Test ===");
        System.out.println("Marks before clearing: " + beforeCount.intValue());

        // TODO: Clear specific mark
        js.executeScript("window.performance.clearMarks('mark1');");

        Number afterClearOne = (Number) js.executeScript(countScript);
        System.out.println("Marks after clearing one: " + afterClearOne.intValue());

        // TODO: Clear all marks
        js.executeScript("window.performance.clearMarks();");

        Number afterClearAll = (Number) js.executeScript(countScript);
        System.out.println("Marks after clearing all: " + afterClearAll.intValue());

        // TODO: Verify marks are cleared
        assertEquals(afterClearAll.intValue(), 0, "All marks should be cleared");
    }

    @Test(priority = 5)
    public void testComparePerformanceAcrossRuns() {
        System.out.println("\n=== Performance Comparison Across Multiple Runs ===");

        java.util.List<Long> durations = new java.util.ArrayList<>();

        // TODO: Run the same action multiple times
        for (int i = 1; i <= 3; i++) {
            driver.get("https://www.example.com");

            js.executeScript("window.performance.mark('run-" + i + "-start');");

            // Simulate action
            try {
                Thread.sleep((long) (Math.random() * 1000 + 500));
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            js.executeScript("window.performance.mark('run-" + i + "-end');");
            js.executeScript(
                "window.performance.measure('run-" + i + "', 'run-" + i + "-start', 'run-" + i + "-end');");

            // Get duration
            String script = "var measure = window.performance.getEntriesByName('run-" + i + "')[0];" +
                           "return measure.duration;";

            Number duration = (Number) js.executeScript(script);
            durations.add(duration.longValue());

            System.out.println("Run " + i + ": " + duration.longValue() + " ms");
        }

        // TODO: Calculate average
        long sum = 0;
        for (Long d : durations) {
            sum += d;
        }
        long average = sum / durations.size();

        System.out.println("\nAverage Duration: " + average + " ms");

        // TODO: Verify consistency (variance shouldn't be too high)
        for (Long d : durations) {
            long variance = Math.abs(d - average);
            assertTrue(variance < 1000,
                "Performance should be consistent. Variance: " + variance + " ms");
        }
    }

    @AfterClass
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

**Expected Outcome**:
- Custom performance marks are successfully created at key points
- Measures accurately calculate duration between marks
- Multi-step user journeys are tracked with individual step timings
- Performance data is collected and analyzed across multiple runs
- Marks can be cleared individually or all at once
- Performance consistency is validated across multiple executions

**Common Mistakes to Avoid**:
1. Creating marks before page/action is ready
2. Not clearing marks between test runs causing data pollution
3. Using same mark names across different tests
4. Not handling async operations before creating marks
5. Forgetting to create measures after creating marks

**Solution Approach (Hints)**:
- Create marks: `window.performance.mark('mark-name')`
- Create measures: `window.performance.measure('measure-name', 'start-mark', 'end-mark')`
- Get marks: `window.performance.getEntriesByType('mark')`
- Get measures: `window.performance.getEntriesByType('measure')`
- Clear marks: `window.performance.clearMarks()` or `clearMarks('specific-mark')`
- Use descriptive mark names: 'search-start', 'search-end', 'checkout-begin'
- Calculate averages: sum all durations and divide by count

---

### Exercise 4: Security Headers Validation (50 minutes)

**Objective**: Implement automated security header validation to ensure proper security configurations are in place.

**Real-world Scenario**: Your web application must have proper security headers configured (CSP, HSTS, X-Frame-Options) to protect against common web vulnerabilities. You need to automate validation of these headers.

**Requirements**:
1. Extract and validate HTTP response headers
2. Check for presence of critical security headers
3. Validate security header values
4. Test Content Security Policy (CSP) configuration
5. Generate security audit report

**Code Template**:
```java
package com.automation.security.exercises;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.*;
import io.github.bonigarcia.wdm.WebDriverManager;
import java.util.*;
import static org.testng.Assert.*;

public class Exercise4_SecurityHeadersValidation {

    private WebDriver driver;
    private Map<String, String> responseHeaders;

    @BeforeClass
    public void setup() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        responseHeaders = new HashMap<>();
    }

    @BeforeMethod
    public void captureHeaders() {
        // TODO: Use Chrome DevTools to capture response headers
        // Note: This is a simplified version. In real scenarios, you might use:
        // - Chrome DevTools Protocol
        // - REST Assured for API endpoints
        // - Manual header inspection via browser tools

        responseHeaders.clear();
        responseHeaders.put("strict-transport-security", "max-age=31536000; includeSubDomains");
        responseHeaders.put("x-content-type-options", "nosniff");
        responseHeaders.put("x-frame-options", "DENY");
        responseHeaders.put("x-xss-protection", "1; mode=block");
        responseHeaders.put("content-security-policy", "default-src 'self'");

        // In real implementation, you would capture actual headers
    }

    @Test(priority = 1)
    public void testSecurityHeadersPresence() {
        driver.get("https://www.example.com");

        System.out.println("=== Security Headers Presence Test ===");

        // TODO: Define required security headers
        List<String> requiredHeaders = Arrays.asList(
            "strict-transport-security",
            "x-content-type-options",
            "x-frame-options",
            "x-xss-protection",
            "content-security-policy"
        );

        // TODO: Check for presence of each header
        List<String> missingHeaders = new ArrayList<>();

        for (String header : requiredHeaders) {
            if (responseHeaders.containsKey(header.toLowerCase())) {
                System.out.println("✓ " + header + ": PRESENT");
            } else {
                System.out.println("✗ " + header + ": MISSING");
                missingHeaders.add(header);
            }
        }

        // TODO: Verify all required headers are present
        assertTrue(missingHeaders.isEmpty(),
            "Missing security headers: " + String.join(", ", missingHeaders));
    }

    @Test(priority = 2)
    public void testStrictTransportSecurity() {
        driver.get("https://www.example.com");

        System.out.println("\n=== Strict-Transport-Security (HSTS) Test ===");

        // TODO: Get HSTS header
        String hsts = responseHeaders.get("strict-transport-security");

        assertNotNull(hsts, "Strict-Transport-Security header should be present");

        System.out.println("HSTS Header: " + hsts);

        // TODO: Validate HSTS configuration
        // Should have max-age
        assertTrue(hsts.contains("max-age="),
            "HSTS should specify max-age");

        // Extract max-age value
        String maxAge = extractValue(hsts, "max-age=");
        long maxAgeSeconds = Long.parseLong(maxAge.split(";")[0].trim());

        System.out.println("Max-Age: " + maxAgeSeconds + " seconds");

        // TODO: Verify max-age is at least 1 year (31536000 seconds)
        assertTrue(maxAgeSeconds >= 31536000,
            "HSTS max-age should be at least 1 year. Current: " + maxAgeSeconds);

        // TODO: Check for includeSubDomains
        if (hsts.toLowerCase().contains("includesubdomains")) {
            System.out.println("✓ includeSubDomains: ENABLED");
        } else {
            System.out.println("⚠ includeSubDomains: NOT ENABLED (recommended)");
        }

        // TODO: Check for preload
        if (hsts.toLowerCase().contains("preload")) {
            System.out.println("✓ preload: ENABLED");
        } else {
            System.out.println("⚠ preload: NOT ENABLED (optional)");
        }
    }

    @Test(priority = 3)
    public void testContentSecurityPolicy() {
        driver.get("https://www.example.com");

        System.out.println("\n=== Content-Security-Policy (CSP) Test ===");

        // TODO: Get CSP header
        String csp = responseHeaders.get("content-security-policy");

        assertNotNull(csp, "Content-Security-Policy header should be present");

        System.out.println("CSP Header: " + csp);

        // TODO: Validate CSP directives
        List<String> requiredDirectives = Arrays.asList(
            "default-src",
            "script-src",
            "style-src"
        );

        List<String> missingDirectives = new ArrayList<>();

        for (String directive : requiredDirectives) {
            if (csp.toLowerCase().contains(directive.toLowerCase())) {
                System.out.println("✓ " + directive + ": PRESENT");
            } else {
                System.out.println("✗ " + directive + ": MISSING");
                missingDirectives.add(directive);
            }
        }

        // TODO: Verify critical directives are present
        assertTrue(missingDirectives.isEmpty() || missingDirectives.size() < requiredDirectives.size(),
            "CSP should have at least one source directive");

        // TODO: Check for unsafe-inline (should not be present)
        if (csp.toLowerCase().contains("'unsafe-inline'")) {
            System.out.println("⚠ WARNING: 'unsafe-inline' detected - reduces CSP effectiveness");
        }

        // TODO: Check for unsafe-eval (should not be present)
        if (csp.toLowerCase().contains("'unsafe-eval'")) {
            System.out.println("⚠ WARNING: 'unsafe-eval' detected - allows eval() execution");
        }
    }

    @Test(priority = 4)
    public void testXFrameOptions() {
        driver.get("https://www.example.com");

        System.out.println("\n=== X-Frame-Options Test ===");

        // TODO: Get X-Frame-Options header
        String xFrameOptions = responseHeaders.get("x-frame-options");

        assertNotNull(xFrameOptions, "X-Frame-Options header should be present");

        System.out.println("X-Frame-Options: " + xFrameOptions);

        // TODO: Validate value
        List<String> validValues = Arrays.asList("DENY", "SAMEORIGIN");

        assertTrue(validValues.contains(xFrameOptions.toUpperCase()),
            "X-Frame-Options should be DENY or SAMEORIGIN. Current: " + xFrameOptions);

        if ("DENY".equalsIgnoreCase(xFrameOptions)) {
            System.out.println("✓ Clickjacking protection: MAXIMUM (DENY)");
        } else if ("SAMEORIGIN".equalsIgnoreCase(xFrameOptions)) {
            System.out.println("✓ Clickjacking protection: MODERATE (SAMEORIGIN)");
        }
    }

    @Test(priority = 5)
    public void testXContentTypeOptions() {
        driver.get("https://www.example.com");

        System.out.println("\n=== X-Content-Type-Options Test ===");

        // TODO: Get X-Content-Type-Options header
        String xContentType = responseHeaders.get("x-content-type-options");

        assertNotNull(xContentType, "X-Content-Type-Options header should be present");

        System.out.println("X-Content-Type-Options: " + xContentType);

        // TODO: Validate value should be 'nosniff'
        assertEquals(xContentType.toLowerCase(), "nosniff",
            "X-Content-Type-Options should be 'nosniff'");

        System.out.println("✓ MIME-sniffing protection: ENABLED");
    }

    @Test(priority = 6)
    public void testXXSSProtection() {
        driver.get("https://www.example.com");

        System.out.println("\n=== X-XSS-Protection Test ===");

        // TODO: Get X-XSS-Protection header
        String xssProtection = responseHeaders.get("x-xss-protection");

        assertNotNull(xssProtection, "X-XSS-Protection header should be present");

        System.out.println("X-XSS-Protection: " + xssProtection);

        // TODO: Validate value
        assertTrue(xssProtection.startsWith("1"),
            "X-XSS-Protection should be enabled (1)");

        if (xssProtection.contains("mode=block")) {
            System.out.println("✓ XSS Filter: ENABLED with blocking mode");
        } else {
            System.out.println("⚠ XSS Filter: ENABLED but not in blocking mode");
        }
    }

    @Test(priority = 7)
    public void testGenerateSecurityReport() {
        driver.get("https://www.example.com");

        System.out.println("\n=== Security Headers Audit Report ===");

        int totalChecks = 0;
        int passedChecks = 0;
        int warnings = 0;

        // TODO: Define all security checks
        Map<String, String> securityChecks = new LinkedHashMap<>();
        securityChecks.put("Strict-Transport-Security", responseHeaders.get("strict-transport-security"));
        securityChecks.put("Content-Security-Policy", responseHeaders.get("content-security-policy"));
        securityChecks.put("X-Frame-Options", responseHeaders.get("x-frame-options"));
        securityChecks.put("X-Content-Type-Options", responseHeaders.get("x-content-type-options"));
        securityChecks.put("X-XSS-Protection", responseHeaders.get("x-xss-protection"));

        // TODO: Evaluate each check
        for (Map.Entry<String, String> check : securityChecks.entrySet()) {
            totalChecks++;
            String header = check.getKey();
            String value = check.getValue();

            if (value != null && !value.isEmpty()) {
                passedChecks++;
                System.out.println("✓ " + header + ": PASS");
            } else {
                warnings++;
                System.out.println("✗ " + header + ": FAIL (Missing)");
            }
        }

        // TODO: Calculate security score
        double securityScore = (passedChecks * 100.0) / totalChecks;

        System.out.println("\n=== Summary ===");
        System.out.println("Total Checks: " + totalChecks);
        System.out.println("Passed: " + passedChecks);
        System.out.println("Failed: " + warnings);
        System.out.println("Security Score: " + String.format("%.1f", securityScore) + "%");

        // TODO: Provide grade
        String grade;
        if (securityScore >= 90) grade = "A (Excellent)";
        else if (securityScore >= 80) grade = "B (Good)";
        else if (securityScore >= 70) grade = "C (Fair)";
        else if (securityScore >= 60) grade = "D (Poor)";
        else grade = "F (Fail)";

        System.out.println("Grade: " + grade);

        // TODO: Verify minimum security score
        assertTrue(securityScore >= 80,
            "Security score should be at least 80%. Current: " + securityScore + "%");
    }

    // Helper method
    private String extractValue(String header, String key) {
        int index = header.indexOf(key);
        if (index >= 0) {
            return header.substring(index + key.length());
        }
        return "";
    }

    @AfterClass
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

**Expected Outcome**:
- All critical security headers are detected and validated
- HSTS configuration is properly verified (max-age, includeSubDomains)
- Content Security Policy directives are checked
- X-Frame-Options protects against clickjacking
- X-Content-Type-Options prevents MIME-sniffing
- X-XSS-Protection is configured correctly
- Comprehensive security audit report is generated with scoring

**Common Mistakes to Avoid**:
1. Not checking for header presence before validating values
2. Case-sensitive header name comparisons (headers should be lowercase)
3. Not parsing header values correctly (comma-separated, semicolon-separated)
4. Accepting weak security configurations (short HSTS max-age, unsafe CSP)
5. Not providing clear security recommendations in reports

**Solution Approach (Hints)**:
- Header names are case-insensitive, convert to lowercase for comparison
- Use `responseHeaders.containsKey()` to check presence
- Parse HSTS: look for "max-age=", "includeSubDomains", "preload"
- Parse CSP: check for directives like "default-src", avoid "'unsafe-inline'"
- X-Frame-Options valid values: "DENY" or "SAMEORIGIN"
- X-Content-Type-Options should be "nosniff"
- X-XSS-Protection should start with "1" and contain "mode=block"
- Calculate score: (passed / total) * 100

---

### Exercise 5: XSS Vulnerability Testing (55 minutes)

**Objective**: Implement basic Cross-Site Scripting (XSS) vulnerability detection tests using common XSS payloads.

**Real-world Scenario**: Your web application accepts user input in various forms. You need to test that input fields properly sanitize and encode user input to prevent XSS attacks.

**Requirements**:
1. Test input fields with common XSS payloads
2. Verify that malicious scripts are not executed
3. Check both reflected and stored XSS scenarios
4. Validate HTML encoding of user input
5. Generate XSS vulnerability report

**Code Template**:
```java
package com.automation.security.exercises;

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.*;
import io.github.bonigarcia.wdm.WebDriverManager;
import java.time.Duration;
import java.util.*;
import static org.testng.Assert.*;

public class Exercise5_XSSVulnerabilityTesting {

    private WebDriver driver;
    private WebDriverWait wait;
    private List<String> xssPayloads;
    private Map<String, Boolean> testResults;

    @BeforeClass
    public void setup() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        driver.manage().window().maximize();
        testResults = new LinkedHashMap<>();

        // TODO: Define common XSS payloads
        xssPayloads = Arrays.asList(
            "<script>alert('XSS')</script>",
            "<img src=x onerror=alert('XSS')>",
            "<svg onload=alert('XSS')>",
            "javascript:alert('XSS')",
            "<iframe src='javascript:alert(\"XSS\")'></iframe>",
            "<body onload=alert('XSS')>",
            "\"><script>alert('XSS')</script>",
            "'-alert('XSS')-'",
            "<input onfocus=alert('XSS') autofocus>",
            "<marquee onstart=alert('XSS')>"
        );
    }

    @Test(priority = 1)
    public void testBasicXSSInSearchField() {
        // TODO: Navigate to test page
        // Note: Use a test application or XSS practice site
        driver.get("https://xss-game.appspot.com/level1/frame");

        System.out.println("=== Basic XSS Test in Search Field ===");

        // TODO: Test simple XSS payload
        String payload = "<script>alert('XSS')</script>";

        try {
            // Find search/input field
            WebElement searchField = driver.findElement(By.name("query"));

            // TODO: Enter XSS payload
            searchField.sendKeys(payload);
            searchField.submit();

            // Wait a moment
            Thread.sleep(1000);

            // TODO: Check if alert appeared (vulnerability exists)
            try {
                Alert alert = driver.switchTo().alert();
                String alertText = alert.getText();
                alert.accept();

                System.out.println("✗ VULNERABLE: XSS alert triggered");
                System.out.println("Alert text: " + alertText);
                testResults.put("Basic XSS in search field", true);

                fail("Application is vulnerable to XSS attack");

            } catch (Exception e) {
                // No alert = input was properly sanitized
                System.out.println("✓ SAFE: XSS payload was sanitized");
                testResults.put("Basic XSS in search field", false);
            }

        } catch (Exception e) {
            System.out.println("⚠ Test error: " + e.getMessage());
            testResults.put("Basic XSS in search field", false);
        }
    }

    @Test(priority = 2)
    public void testMultipleXSSPayloads() {
        System.out.println("\n=== Testing Multiple XSS Payloads ===");

        int vulnerableCount = 0;
        int safeCount = 0;

        for (int i = 0; i < Math.min(5, xssPayloads.size()); i++) {
            String payload = xssPayloads.get(i);

            System.out.println("\nTesting payload " + (i + 1) + ": " + payload);

            try {
                driver.get("https://xss-game.appspot.com/level1/frame");

                WebElement inputField = driver.findElement(By.name("query"));
                inputField.clear();
                inputField.sendKeys(payload);
                inputField.submit();

                Thread.sleep(500);

                // TODO: Check for alert
                try {
                    Alert alert = wait.until(ExpectedConditions.alertIsPresent());
                    alert.accept();

                    System.out.println("  Result: VULNERABLE ✗");
                    vulnerableCount++;
                    testResults.put("Payload " + (i + 1), true);

                } catch (Exception e) {
                    System.out.println("  Result: SAFE ✓");
                    safeCount++;
                    testResults.put("Payload " + (i + 1), false);
                }

            } catch (Exception e) {
                System.out.println("  Result: ERROR - " + e.getMessage());
                safeCount++;
            }
        }

        // TODO: Print summary
        System.out.println("\n=== Payload Test Summary ===");
        System.out.println("Vulnerable: " + vulnerableCount);
        System.out.println("Safe: " + safeCount);

        // TODO: Verify no vulnerabilities
        assertEquals(vulnerableCount, 0,
            "Application should not be vulnerable to any XSS payloads");
    }

    @Test(priority = 3)
    public void testReflectedXSS() {
        System.out.println("\n=== Reflected XSS Test ===");

        // TODO: Construct URL with XSS payload in parameter
        String baseUrl = "https://xss-game.appspot.com/level1/frame";
        String xssPayload = "<script>alert('Reflected-XSS')</script>";
        String encodedPayload = java.net.URLEncoder.encode(xssPayload,
            java.nio.charset.StandardCharsets.UTF_8);

        String urlWithPayload = baseUrl + "?query=" + encodedPayload;

        System.out.println("Testing URL: " + urlWithPayload);

        try {
            // TODO: Navigate to URL with payload
            driver.get(urlWithPayload);

            Thread.sleep(1000);

            // TODO: Check if script executed
            try {
                Alert alert = driver.switchTo().alert();
                String alertText = alert.getText();
                alert.accept();

                System.out.println("✗ VULNERABLE: Reflected XSS executed");
                System.out.println("Alert text: " + alertText);

                fail("Application is vulnerable to reflected XSS");

            } catch (Exception e) {
                System.out.println("✓ SAFE: Reflected XSS was prevented");
            }

        } catch (Exception e) {
            System.out.println("⚠ Test error: " + e.getMessage());
        }
    }

    @Test(priority = 4)
    public void testStoredXSS() {
        System.out.println("\n=== Stored XSS Test ===");

        // TODO: This tests if XSS payload stored in DB executes when retrieved
        // Note: This requires an application with data persistence

        String payload = "<script>alert('Stored-XSS')</script>";

        try {
            // TODO: Submit payload to be stored (e.g., in comment, profile, etc.)
            // Example: driver.get("https://example.com/comment");
            // driver.findElement(By.id("comment")).sendKeys(payload);
            // driver.findElement(By.id("submit")).click();

            // For demonstration purposes
            System.out.println("Submitting payload: " + payload);
            System.out.println("(In real test, submit to comment/profile form)");

            Thread.sleep(1000);

            // TODO: Navigate to page where stored data is displayed
            // driver.get("https://example.com/view-comments");

            Thread.sleep(1000);

            // TODO: Check if stored script executes
            try {
                Alert alert = driver.switchTo().alert();
                alert.accept();

                System.out.println("✗ VULNERABLE: Stored XSS executed");
                fail("Application is vulnerable to stored XSS");

            } catch (Exception e) {
                System.out.println("✓ SAFE: Stored XSS was prevented");
            }

        } catch (Exception e) {
            System.out.println("⚠ Test skipped or error: " + e.getMessage());
        }
    }

    @Test(priority = 5)
    public void testHTMLEncoding() {
        System.out.println("\n=== HTML Encoding Validation Test ===");

        String payload = "<script>alert('XSS')</script>";

        try {
            driver.get("https://xss-game.appspot.com/level1/frame");

            WebElement inputField = driver.findElement(By.name("query"));
            inputField.sendKeys(payload);
            inputField.submit();

            Thread.sleep(1000);

            // TODO: Get page source and check if payload is encoded
            String pageSource = driver.getPageSource();

            // Properly encoded payload should appear as HTML entities
            boolean isEncoded = false;

            // Check for HTML encoding patterns
            if (pageSource.contains("&lt;script&gt;") ||
                pageSource.contains("&lt;") ||
                !pageSource.contains("<script>alert('XSS')</script>")) {

                System.out.println("✓ SAFE: Payload is HTML encoded");
                isEncoded = true;
            } else {
                System.out.println("✗ VULNERABLE: Payload is not encoded");
            }

            // TODO: Verify encoding is applied
            assertTrue(isEncoded, "User input should be HTML encoded");

        } catch (Exception e) {
            System.out.println("⚠ Test error: " + e.getMessage());
        }
    }

    @Test(priority = 6)
    public void testGenerateXSSReport() {
        System.out.println("\n=== XSS Vulnerability Report ===");

        int totalTests = testResults.size();
        int vulnerabilities = 0;
        int safeInputs = 0;

        // TODO: Analyze results
        for (Map.Entry<String, Boolean> result : testResults.entrySet()) {
            String testName = result.getKey();
            Boolean isVulnerable = result.getValue();

            if (isVulnerable) {
                vulnerabilities++;
                System.out.println("✗ " + testName + ": VULNERABLE");
            } else {
                safeInputs++;
                System.out.println("✓ " + testName + ": SAFE");
            }
        }

        // TODO: Calculate security score
        double securityScore = (safeInputs * 100.0) / totalTests;

        System.out.println("\n=== Summary ===");
        System.out.println("Total Tests: " + totalTests);
        System.out.println("Vulnerabilities Found: " + vulnerabilities);
        System.out.println("Safe Inputs: " + safeInputs);
        System.out.println("Security Score: " + String.format("%.1f", securityScore) + "%");

        // TODO: Provide recommendations
        if (vulnerabilities > 0) {
            System.out.println("\n=== Recommendations ===");
            System.out.println("1. Implement input validation and sanitization");
            System.out.println("2. Use HTML encoding for all user inputs");
            System.out.println("3. Apply Content Security Policy (CSP) headers");
            System.out.println("4. Use HttpOnly and Secure flags for cookies");
            System.out.println("5. Implement WAF (Web Application Firewall)");
        }

        // TODO: Verify no critical vulnerabilities
        assertEquals(vulnerabilities, 0,
            "No XSS vulnerabilities should be present");
    }

    @AfterClass
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

**Expected Outcome**:
- Multiple XSS payloads are tested against input fields
- Alerts triggered by XSS indicate vulnerabilities
- Reflected XSS in URL parameters is detected
- Stored XSS in database is identified
- HTML encoding of user input is verified
- Comprehensive XSS vulnerability report is generated

**Common Mistakes to Avoid**:
1. Not handling alert popups properly (test may hang)
2. Testing against production websites (use test environments)
3. Not clearing input fields between tests
4. Assuming no alert means safe (check HTML encoding too)
5. Not using try-catch for alert detection

**Solution Approach (Hints)**:
- Use `driver.switchTo().alert()` to detect XSS alerts
- Wrap alert detection in try-catch (throws exception if no alert)
- Use `alert.accept()` to close alert dialogs
- Check page source for HTML-encoded payload: `&lt;script&gt;`
- URL encode payloads for GET parameters: `URLEncoder.encode()`
- Wait after submitting: `Thread.sleep()` or WebDriverWait
- Test multiple payload variations to ensure comprehensive coverage

---

### Exercise 6: SSL/TLS Certificate Validation (45 minutes)

**Objective**: Implement automated SSL/TLS certificate validation to ensure secure HTTPS connections.

**Real-world Scenario**: Your production web application must use valid SSL certificates to ensure secure communication. You need to automate checks for certificate validity, expiration, and proper configuration.

**Requirements**:
1. Verify HTTPS is enforced (no HTTP access)
2. Validate SSL certificate is trusted and not self-signed
3. Check certificate expiration date
4. Verify certificate issuer and subject
5. Test TLS version and cipher suites

**Code Template**:
```java
package com.automation.security.exercises;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.*;
import io.github.bonigarcia.wdm.WebDriverManager;
import javax.net.ssl.*;
import java.net.URL;
import java.security.cert.Certificate;
import java.security.cert.X509Certificate;
import java.util.Date;
import static org.testng.Assert.*;

public class Exercise6_SSLCertificateValidation {

    private WebDriver driver;

    @BeforeClass
    public void setup() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

    @Test(priority = 1)
    public void testHTTPSEnforcement() {
        System.out.println("=== HTTPS Enforcement Test ===");

        String httpUrl = "http://www.google.com";
        String httpsUrl = "https://www.google.com";

        // TODO: Navigate to HTTP URL
        driver.get(httpUrl);

        // Wait for redirect
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // TODO: Check if redirected to HTTPS
        String currentUrl = driver.getCurrentUrl();

        System.out.println("Accessed URL: " + httpUrl);
        System.out.println("Current URL: " + currentUrl);

        // TODO: Verify HTTPS is enforced
        assertTrue(currentUrl.startsWith("https://"),
            "HTTP should redirect to HTTPS. Current URL: " + currentUrl);

        System.out.println("✓ HTTPS enforcement: PASSED");
    }

    @Test(priority = 2)
    public void testSSLCertificateValidity() {
        System.out.println("\n=== SSL Certificate Validity Test ===");

        String url = "https://www.google.com";

        try {
            // TODO: Get SSL certificate details
            URL websiteUrl = new URL(url);
            HttpsURLConnection connection = (HttpsURLConnection) websiteUrl.openConnection();
            connection.connect();

            // TODO: Get certificates
            Certificate[] certificates = connection.getServerCertificates();

            System.out.println("Certificate chain length: " + certificates.length);

            // TODO: Get the site certificate (first in chain)
            X509Certificate siteCertificate = (X509Certificate) certificates[0];

            // TODO: Print certificate details
            System.out.println("\n=== Certificate Details ===");
            System.out.println("Subject: " + siteCertificate.getSubjectDN());
            System.out.println("Issuer: " + siteCertificate.getIssuerDN());
            System.out.println("Serial Number: " + siteCertificate.getSerialNumber());
            System.out.println("Valid From: " + siteCertificate.getNotBefore());
            System.out.println("Valid Until: " + siteCertificate.getNotAfter());

            // TODO: Verify certificate is valid (not expired)
            try {
                siteCertificate.checkValidity();
                System.out.println("✓ Certificate is VALID");
            } catch (Exception e) {
                System.out.println("✗ Certificate is INVALID: " + e.getMessage());
                fail("SSL certificate is not valid");
            }

            connection.disconnect();

        } catch (Exception e) {
            System.out.println("Error validating certificate: " + e.getMessage());
            fail("Failed to validate SSL certificate");
        }
    }

    @Test(priority = 3)
    public void testCertificateExpiration() {
        System.out.println("\n=== Certificate Expiration Check ===");

        String url = "https://www.google.com";

        try {
            URL websiteUrl = new URL(url);
            HttpsURLConnection connection = (HttpsURLConnection) websiteUrl.openConnection();
            connection.connect();

            X509Certificate certificate = (X509Certificate) connection.getServerCertificates()[0];

            // TODO: Get expiration date
            Date expirationDate = certificate.getNotAfter();
            Date currentDate = new Date();

            System.out.println("Current Date: " + currentDate);
            System.out.println("Expiration Date: " + expirationDate);

            // TODO: Calculate days until expiration
            long diffInMillis = expirationDate.getTime() - currentDate.getTime();
            long daysUntilExpiration = diffInMillis / (1000 * 60 * 60 * 24);

            System.out.println("Days until expiration: " + daysUntilExpiration);

            // TODO: Verify certificate is not expiring soon (within 30 days)
            assertTrue(daysUntilExpiration > 30,
                "Certificate expires in " + daysUntilExpiration +
                " days. Renew before expiration!");

            if (daysUntilExpiration > 365) {
                System.out.println("✓ Certificate is valid for over a year");
            } else if (daysUntilExpiration > 90) {
                System.out.println("✓ Certificate is valid for over 90 days");
            } else if (daysUntilExpiration > 30) {
                System.out.println("⚠ Certificate expires in less than 90 days");
            } else {
                System.out.println("✗ Certificate expires in less than 30 days - RENEW SOON!");
            }

            connection.disconnect();

        } catch (Exception e) {
            fail("Failed to check certificate expiration: " + e.getMessage());
        }
    }

    @Test(priority = 4)
    public void testCertificateIssuer() {
        System.out.println("\n=== Certificate Issuer Validation ===");

        String url = "https://www.google.com";

        try {
            URL websiteUrl = new URL(url);
            HttpsURLConnection connection = (HttpsURLConnection) websiteUrl.openConnection();
            connection.connect();

            X509Certificate certificate = (X509Certificate) connection.getServerCertificates()[0];

            // TODO: Get issuer details
            String issuer = certificate.getIssuerDN().toString();
            String subject = certificate.getSubjectDN().toString();

            System.out.println("Certificate Subject: " + subject);
            System.out.println("Certificate Issuer: " + issuer);

            // TODO: Verify issuer is not same as subject (not self-signed)
            assertNotEquals(issuer, subject,
                "Certificate should not be self-signed");

            System.out.println("✓ Certificate is issued by trusted CA");

            // TODO: Check for known trusted issuers (optional)
            String[] trustedIssuers = {"DigiCert", "Let's Encrypt", "GlobalSign", "GeoTrust"};

            boolean isTrustedIssuer = false;
            for (String trustedIssuer : trustedIssuers) {
                if (issuer.contains(trustedIssuer)) {
                    System.out.println("✓ Issued by trusted CA: " + trustedIssuer);
                    isTrustedIssuer = true;
                    break;
                }
            }

            if (!isTrustedIssuer) {
                System.out.println("⚠ Issuer not in common trusted CA list");
            }

            connection.disconnect();

        } catch (Exception e) {
            fail("Failed to validate certificate issuer: " + e.getMessage());
        }
    }

    @Test(priority = 5)
    public void testTLSVersion() {
        System.out.println("\n=== TLS Version Check ===");

        String url = "https://www.google.com";

        try {
            URL websiteUrl = new URL(url);
            HttpsURLConnection connection = (HttpsURLConnection) websiteUrl.openConnection();
            connection.connect();

            // TODO: Get SSL session details
            SSLSession sslSession = connection.getSSLSession();

            String protocol = sslSession.getProtocol();
            String cipherSuite = sslSession.getCipherSuite();

            System.out.println("Protocol: " + protocol);
            System.out.println("Cipher Suite: " + cipherSuite);

            // TODO: Verify TLS version is secure (TLS 1.2 or higher)
            assertTrue(protocol.equals("TLSv1.2") || protocol.equals("TLSv1.3"),
                "TLS version should be 1.2 or higher. Current: " + protocol);

            if (protocol.equals("TLSv1.3")) {
                System.out.println("✓ Using latest TLS 1.3 protocol");
            } else if (protocol.equals("TLSv1.2")) {
                System.out.println("✓ Using secure TLS 1.2 protocol");
            }

            // TODO: Verify cipher suite is strong
            assertFalse(cipherSuite.contains("NULL") ||
                       cipherSuite.contains("EXPORT") ||
                       cipherSuite.contains("DES"),
                "Weak cipher suite detected: " + cipherSuite);

            System.out.println("✓ Strong cipher suite in use");

            connection.disconnect();

        } catch (Exception e) {
            fail("Failed to check TLS version: " + e.getMessage());
        }
    }

    @Test(priority = 6)
    public void testGenerateSSLReport() {
        System.out.println("\n=== SSL/TLS Security Report ===");

        String url = "https://www.google.com";

        try {
            URL websiteUrl = new URL(url);
            HttpsURLConnection connection = (HttpsURLConnection) websiteUrl.openConnection();
            connection.connect();

            X509Certificate certificate = (X509Certificate) connection.getServerCertificates()[0];
            SSLSession sslSession = connection.getSSLSession();

            // TODO: Collect all SSL/TLS information
            System.out.println("URL: " + url);
            System.out.println("\n--- Certificate Information ---");
            System.out.println("Subject: " + certificate.getSubjectDN());
            System.out.println("Issuer: " + certificate.getIssuerDN());
            System.out.println("Valid From: " + certificate.getNotBefore());
            System.out.println("Valid Until: " + certificate.getNotAfter());

            // Calculate expiration days
            long daysUntilExpiration = (certificate.getNotAfter().getTime() -
                new Date().getTime()) / (1000 * 60 * 60 * 24);

            System.out.println("Days Until Expiration: " + daysUntilExpiration);

            System.out.println("\n--- Connection Security ---");
            System.out.println("Protocol: " + sslSession.getProtocol());
            System.out.println("Cipher Suite: " + sslSession.getCipherSuite());

            // TODO: Generate security score
            int securityScore = 100;
            List<String> issues = new ArrayList<>();

            // Check expiration
            if (daysUntilExpiration < 30) {
                securityScore -= 30;
                issues.add("Certificate expires in less than 30 days");
            } else if (daysUntilExpiration < 90) {
                securityScore -= 10;
                issues.add("Certificate expires in less than 90 days");
            }

            // Check protocol
            String protocol = sslSession.getProtocol();
            if (!protocol.equals("TLSv1.3") && !protocol.equals("TLSv1.2")) {
                securityScore -= 40;
                issues.add("Using outdated TLS protocol: " + protocol);
            }

            // Check self-signed
            if (certificate.getIssuerDN().equals(certificate.getSubjectDN())) {
                securityScore -= 50;
                issues.add("Certificate is self-signed");
            }

            // TODO: Print final score
            System.out.println("\n=== Security Assessment ===");
            System.out.println("Security Score: " + securityScore + "/100");

            if (issues.isEmpty()) {
                System.out.println("Status: EXCELLENT - No issues found");
            } else {
                System.out.println("Status: ISSUES FOUND");
                System.out.println("\nIssues:");
                for (int i = 0; i < issues.size(); i++) {
                    System.out.println((i + 1) + ". " + issues.get(i));
                }
            }

            // TODO: Verify minimum security score
            assertTrue(securityScore >= 70,
                "Security score should be at least 70. Current: " + securityScore);

            connection.disconnect();

        } catch (Exception e) {
            fail("Failed to generate SSL report: " + e.getMessage());
        }
    }

    @AfterClass
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

**Expected Outcome**:
- HTTPS enforcement is verified (HTTP redirects to HTTPS)
- SSL certificate validity is confirmed (not expired)
- Certificate expiration date is checked (alerts if < 30 days)
- Certificate issuer is validated (not self-signed)
- TLS version is verified (1.2 or 1.3)
- Cipher suites are checked for strength
- Comprehensive SSL/TLS security report is generated

**Common Mistakes to Avoid**:
1. Not handling SSL exceptions properly
2. Accepting invalid certificates in test code
3. Not checking certificate chain (only checking site certificate)
4. Ignoring cipher suite strength
5. Not testing HTTPS enforcement (allowing HTTP access)

**Solution Approach (Hints)**:
- Use `HttpsURLConnection` to get SSL details
- Get certificates: `connection.getServerCertificates()`
- Cast to X509Certificate: `(X509Certificate) certificates[0]`
- Check validity: `certificate.checkValidity()`
- Compare dates: `certificate.getNotAfter().getTime() - new Date().getTime()`
- Get protocol: `sslSession.getProtocol()`
- Verify issuer != subject to ensure not self-signed
- Calculate days: milliseconds / (1000 * 60 * 60 * 24)

---

## Navigation

- [Previous: Day 40 - Database Testing](day40_database_testing.md)
- [Next: Day 42 - Framework Best Practices](day42_framework_best_practices.md)
- [Week 6 Overview](README.md)
- [Course Home](../README.md)

---

**Congratulations\!** You have completed Day 48 on Performance & Security Testing Basics. You now have the knowledge to implement comprehensive performance monitoring and security validation in your test automation framework.
