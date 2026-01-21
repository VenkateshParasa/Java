# Day 32: TestNG Part 3 - Groups, Dependencies & Priorities

## Learning Objectives

By the end of this lesson, you will be able to:
- Understand and implement test grouping in TestNG
- Run specific groups from testng.xml
- Create group hierarchies and dependencies
- Use test dependencies with dependsOnMethods and dependsOnGroups
- Differentiate between hard and soft dependencies
- Control test execution order using priorities
- Combine groups, dependencies, and priorities effectively
- Use the alwaysRun attribute for critical tests
- Apply groups and dependencies in real Selenium projects
- Follow best practices for test organization

---

## 1. Introduction to Test Grouping

### What are Groups?

**Groups** in TestNG allow you to organize tests into logical categories. You can execute specific sets of tests based on their group membership.

### Why Use Groups?

- **Categorize tests** - Smoke, Regression, Sanity, etc.
- **Selective execution** - Run only specific test categories
- **Environment-specific** - Different tests for Dev, QA, Production
- **Feature-based** - Group by application features
- **Priority-based** - Critical, High, Medium, Low
- **Better organization** - Logical test structure
- **Flexible execution** - Include/exclude groups easily

### Common Group Categories

```
Smoke Tests     - Critical functionality
Regression Tests - Full test coverage
Sanity Tests    - Quick verification
Integration     - API/database tests
UI Tests        - Frontend tests
Database Tests  - Backend tests
Critical        - Must-pass tests
Optional        - Nice-to-have tests
```

---

## 2. Basic Test Grouping

### Simple Group Example

```java
import org.testng.annotations.Test;

public class BasicGroupExample {

    @Test(groups = "smoke")
    public void testLogin() {
        System.out.println("Smoke Test: Login");
    }

    @Test(groups = "smoke")
    public void testHomePage() {
        System.out.println("Smoke Test: Home Page");
    }

    @Test(groups = "regression")
    public void testCheckout() {
        System.out.println("Regression Test: Checkout");
    }

    @Test(groups = "regression")
    public void testPayment() {
        System.out.println("Regression Test: Payment");
    }

    @Test(groups = "sanity")
    public void testSearchFunctionality() {
        System.out.println("Sanity Test: Search");
    }
}
```

### Running Specific Groups

**testng.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Group Suite">
    <test name="Run Smoke Tests">
        <groups>
            <run>
                <include name="smoke"/>
            </run>
        </groups>
        <classes>
            <class name="tests.BasicGroupExample"/>
        </classes>
    </test>
</suite>
```

---

## 3. Multiple Groups per Test

### Assigning Multiple Groups

```java
import org.testng.annotations.Test;

public class MultipleGroupsExample {

    @Test(groups = {"smoke", "critical"})
    public void testUserLogin() {
        System.out.println("Test: User Login (Smoke + Critical)");
    }

    @Test(groups = {"smoke", "regression"})
    public void testDashboard() {
        System.out.println("Test: Dashboard (Smoke + Regression)");
    }

    @Test(groups = {"regression", "database"})
    public void testDataIntegrity() {
        System.out.println("Test: Data Integrity (Regression + Database)");
    }

    @Test(groups = {"sanity", "ui"})
    public void testUIElements() {
        System.out.println("Test: UI Elements (Sanity + UI)");
    }

    @Test(groups = {"critical", "security"})
    public void testAuthentication() {
        System.out.println("Test: Authentication (Critical + Security)");
    }
}
```

### Running Multiple Groups

**testng.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Multiple Groups Suite">
    <test name="Run Smoke and Critical Tests">
        <groups>
            <run>
                <include name="smoke"/>
                <include name="critical"/>
            </run>
        </groups>
        <classes>
            <class name="tests.MultipleGroupsExample"/>
        </classes>
    </test>
</suite>
```

---

## 4. Including and Excluding Groups

### Advanced Group Selection

```java
import org.testng.annotations.Test;

public class IncludeExcludeExample {

    @Test(groups = {"smoke", "p1"})
    public void test1() {
        System.out.println("Test 1: Smoke + P1");
    }

    @Test(groups = {"smoke", "p2"})
    public void test2() {
        System.out.println("Test 2: Smoke + P2");
    }

    @Test(groups = {"regression", "p1"})
    public void test3() {
        System.out.println("Test 3: Regression + P1");
    }

    @Test(groups = {"regression", "p2"})
    public void test4() {
        System.out.println("Test 4: Regression + P2");
    }

    @Test(groups = {"sanity", "skip"})
    public void test5() {
        System.out.println("Test 5: Sanity + Skip");
    }
}
```

### testng.xml with Include and Exclude

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Include Exclude Suite">
    <test name="Selective Tests">
        <groups>
            <run>
                <!-- Include these groups -->
                <include name="smoke"/>
                <include name="regression"/>

                <!-- But exclude these groups -->
                <exclude name="skip"/>
                <exclude name="p2"/>
            </run>
        </groups>
        <classes>
            <class name="tests.IncludeExcludeExample"/>
        </classes>
    </test>
</suite>
```

**Result:** Runs tests in smoke and regression groups, but excludes any test with skip or p2 groups.

---

## 5. Group Hierarchies (Meta Groups)

### Creating Group Hierarchies

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Group Hierarchy Suite">
    <test name="Meta Group Test">
        <groups>
            <!-- Define meta groups -->
            <define name="all">
                <include name="smoke"/>
                <include name="regression"/>
                <include name="sanity"/>
            </define>

            <define name="quick">
                <include name="smoke"/>
                <include name="sanity"/>
            </define>

            <define name="critical-tests">
                <include name="smoke"/>
                <include name="p1"/>
            </define>

            <!-- Run the meta group -->
            <run>
                <include name="quick"/>
            </run>
        </groups>
        <classes>
            <class name="tests.GroupHierarchyExample"/>
        </classes>
    </test>
</suite>
```

### Test Class for Hierarchy

```java
import org.testng.annotations.Test;

public class GroupHierarchyExample {

    @Test(groups = "smoke")
    public void smokeTest1() {
        System.out.println("Smoke Test 1");
    }

    @Test(groups = "smoke")
    public void smokeTest2() {
        System.out.println("Smoke Test 2");
    }

    @Test(groups = "regression")
    public void regressionTest1() {
        System.out.println("Regression Test 1");
    }

    @Test(groups = "sanity")
    public void sanityTest1() {
        System.out.println("Sanity Test 1");
    }

    @Test(groups = "p1")
    public void priorityTest1() {
        System.out.println("Priority 1 Test");
    }
}
```

---

## 6. Group Dependencies

### Group-Level Dependencies

```java
import org.testng.annotations.Test;

public class GroupDependencyExample {

    @Test(groups = "init")
    public void initializeSystem() {
        System.out.println("Step 1: Initialize System");
    }

    @Test(groups = "init")
    public void setupDatabase() {
        System.out.println("Step 2: Setup Database");
    }

    @Test(groups = "execute", dependsOnGroups = "init")
    public void executeTest1() {
        System.out.println("Step 3: Execute Test 1 (depends on init)");
    }

    @Test(groups = "execute", dependsOnGroups = "init")
    public void executeTest2() {
        System.out.println("Step 4: Execute Test 2 (depends on init)");
    }

    @Test(groups = "cleanup", dependsOnGroups = "execute")
    public void cleanupTest() {
        System.out.println("Step 5: Cleanup (depends on execute)");
    }

    @Test(dependsOnGroups = {"init", "execute", "cleanup"})
    public void finalReport() {
        System.out.println("Step 6: Final Report (depends on all)");
    }
}
```

**Execution Order:**
```
Step 1: Initialize System
Step 2: Setup Database
Step 3: Execute Test 1 (depends on init)
Step 4: Execute Test 2 (depends on init)
Step 5: Cleanup (depends on execute)
Step 6: Final Report (depends on all)
```

---

## 7. Test Dependencies with dependsOnMethods

### Basic Method Dependency

```java
import org.testng.annotations.Test;

public class MethodDependencyExample {

    @Test
    public void serverStarted() {
        System.out.println("Test 1: Server Started");
    }

    @Test(dependsOnMethods = "serverStarted")
    public void loginSuccessful() {
        System.out.println("Test 2: Login Successful (depends on serverStarted)");
    }

    @Test(dependsOnMethods = "loginSuccessful")
    public void logoutSuccessful() {
        System.out.println("Test 3: Logout Successful (depends on loginSuccessful)");
    }
}
```

**Output:**
```
Test 1: Server Started
Test 2: Login Successful (depends on serverStarted)
Test 3: Logout Successful (depends on loginSuccessful)
```

### Multiple Method Dependencies

```java
import org.testng.annotations.Test;

public class MultipleMethodDependencies {

    @Test
    public void setupEnvironment() {
        System.out.println("Test 1: Setup Environment");
    }

    @Test
    public void createTestData() {
        System.out.println("Test 2: Create Test Data");
    }

    @Test(dependsOnMethods = {"setupEnvironment", "createTestData"})
    public void runMainTest() {
        System.out.println("Test 3: Run Main Test (depends on setup and data)");
    }

    @Test(dependsOnMethods = "runMainTest")
    public void verifyResults() {
        System.out.println("Test 4: Verify Results (depends on main test)");
    }

    @Test(dependsOnMethods = "verifyResults")
    public void cleanup() {
        System.out.println("Test 5: Cleanup (depends on verification)");
    }
}
```

---

## 8. Hard vs Soft Dependencies

### Hard Dependencies (Default)

```java
import org.testng.Assert;
import org.testng.annotations.Test;

public class HardDependencyExample {

    @Test
    public void test1() {
        System.out.println("Test 1: Starting...");
        Assert.fail("Test 1 Failed!");  // This test fails
        System.out.println("Test 1: Completed");
    }

    @Test(dependsOnMethods = "test1")
    public void test2() {
        // This will be SKIPPED because test1 failed
        System.out.println("Test 2: This won't execute");
    }

    @Test(dependsOnMethods = "test2")
    public void test3() {
        // This will also be SKIPPED
        System.out.println("Test 3: This won't execute either");
    }
}
```

**Result:**
```
Test 1: Starting...
Test 1 Failed!
Test 2: SKIPPED
Test 3: SKIPPED
```

### Soft Dependencies (alwaysRun = true)

```java
import org.testng.Assert;
import org.testng.annotations.Test;

public class SoftDependencyExample {

    @Test
    public void test1() {
        System.out.println("Test 1: Starting...");
        Assert.fail("Test 1 Failed!");
        System.out.println("Test 1: Completed");
    }

    @Test(dependsOnMethods = "test1", alwaysRun = true)
    public void test2() {
        // This will STILL EXECUTE even though test1 failed
        System.out.println("Test 2: Running despite test1 failure (alwaysRun = true)");
    }

    @Test(dependsOnMethods = "test2")
    public void test3() {
        // This will execute because test2 passed
        System.out.println("Test 3: Running because test2 passed");
    }
}
```

**Result:**
```
Test 1: Starting...
Test 1 Failed!
Test 2: Running despite test1 failure (alwaysRun = true)
Test 3: Running because test2 passed
```

---

## 9. Test Priorities

### Basic Priority

```java
import org.testng.annotations.Test;

public class PriorityExample {

    @Test(priority = 3)
    public void testC() {
        System.out.println("Test C - Priority 3");
    }

    @Test(priority = 1)
    public void testA() {
        System.out.println("Test A - Priority 1");
    }

    @Test(priority = 2)
    public void testB() {
        System.out.println("Test B - Priority 2");
    }

    @Test  // No priority = 0 (default)
    public void testD() {
        System.out.println("Test D - No Priority (0)");
    }

    @Test(priority = -1)
    public void testE() {
        System.out.println("Test E - Priority -1");
    }
}
```

**Output:**
```
Test E - Priority -1
Test D - No Priority (0)
Test A - Priority 1
Test B - Priority 2
Test C - Priority 3
```

**Note:** Lower priority numbers execute first.

---

## 10. Combining Groups, Dependencies, and Priorities

### Complex Test Orchestration

```java
import org.testng.annotations.Test;

public class ComplexOrchestrationExample {

    @Test(groups = "init", priority = 1)
    public void initializeDatabase() {
        System.out.println("1. Initialize Database (init, priority 1)");
    }

    @Test(groups = "init", priority = 2, dependsOnMethods = "initializeDatabase")
    public void loadTestData() {
        System.out.println("2. Load Test Data (init, priority 2, depends on init DB)");
    }

    @Test(groups = {"smoke", "login"}, priority = 1, dependsOnGroups = "init")
    public void testLogin() {
        System.out.println("3. Test Login (smoke+login, priority 1, depends on init group)");
    }

    @Test(groups = {"smoke", "dashboard"}, priority = 2, dependsOnMethods = "testLogin")
    public void testDashboard() {
        System.out.println("4. Test Dashboard (smoke+dashboard, priority 2, depends on login)");
    }

    @Test(groups = "regression", priority = 3, dependsOnGroups = "smoke")
    public void testAdvancedFeatures() {
        System.out.println("5. Test Advanced Features (regression, priority 3, depends on smoke)");
    }

    @Test(groups = "cleanup", priority = 100, dependsOnGroups = {"init", "smoke", "regression"}, alwaysRun = true)
    public void cleanupTestData() {
        System.out.println("6. Cleanup Test Data (cleanup, priority 100, always runs)");
    }
}
```

### testng.xml for Complex Orchestration

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Complex Orchestration Suite">
    <test name="Full Test Execution">
        <groups>
            <run>
                <include name="init"/>
                <include name="smoke"/>
                <include name="regression"/>
                <include name="cleanup"/>
            </run>
        </groups>
        <classes>
            <class name="tests.ComplexOrchestrationExample"/>
        </classes>
    </test>
</suite>
```

---

## 11. AlwaysRun Attribute

### Critical Cleanup Tests

```java
import org.testng.Assert;
import org.testng.annotations.Test;

public class AlwaysRunExample {

    @Test(groups = "setup")
    public void setupTest() {
        System.out.println("1. Setup Test");
    }

    @Test(groups = "main", dependsOnGroups = "setup")
    public void mainTest() {
        System.out.println("2. Main Test - Starting");
        Assert.fail("Main Test Failed!");  // Fails intentionally
    }

    @Test(groups = "verification", dependsOnGroups = "main")
    public void verificationTest() {
        // This will be SKIPPED because mainTest failed
        System.out.println("3. Verification Test - SKIPPED");
    }

    @Test(groups = "cleanup", dependsOnGroups = {"setup", "main", "verification"}, alwaysRun = true)
    public void cleanupTest() {
        // This ALWAYS runs regardless of other test failures
        System.out.println("4. Cleanup Test - ALWAYS RUNS (alwaysRun = true)");
        System.out.println("   Cleaning up resources...");
    }

    @Test(dependsOnMethods = "cleanupTest")
    public void finalReport() {
        System.out.println("5. Final Report - Runs because cleanup passed");
    }
}
```

**Output:**
```
1. Setup Test
2. Main Test - Starting
Main Test Failed!
3. Verification Test - SKIPPED
4. Cleanup Test - ALWAYS RUNS (alwaysRun = true)
   Cleaning up resources...
5. Final Report - Runs because cleanup passed
```

---

## 12. Real-World Selenium Example with Groups

### Complete E-commerce Test Suite

```java
package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.*;

public class EcommerceTestSuite {

    WebDriver driver;
    String baseUrl = "https://example-ecommerce.com";

    @BeforeMethod(groups = {"smoke", "regression", "sanity"})
    public void setup() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        System.out.println("Browser initialized");
    }

    @Test(groups = {"smoke", "critical"}, priority = 1)
    public void testHomePage() {
        driver.get(baseUrl);
        String title = driver.getTitle();
        Assert.assertTrue(title.contains("E-commerce"), "Home page title verification");
        System.out.println("SMOKE TEST: Home page loaded successfully");
    }

    @Test(groups = {"smoke", "critical", "authentication"}, priority = 2, dependsOnMethods = "testHomePage")
    public void testUserLogin() {
        driver.get(baseUrl + "/login");
        driver.findElement(By.id("email")).sendKeys("testuser@example.com");
        driver.findElement(By.id("password")).sendKeys("Test@123");
        driver.findElement(By.id("loginBtn")).click();

        // Wait and verify login
        try { Thread.sleep(2000); } catch (InterruptedException e) {}

        boolean isLoggedIn = driver.findElement(By.id("userProfile")).isDisplayed();
        Assert.assertTrue(isLoggedIn, "User should be logged in");
        System.out.println("SMOKE TEST: User login successful");
    }

    @Test(groups = {"smoke", "search"}, priority = 3, dependsOnMethods = "testUserLogin")
    public void testProductSearch() {
        driver.findElement(By.id("searchBox")).sendKeys("laptop");
        driver.findElement(By.id("searchBtn")).click();

        try { Thread.sleep(2000); } catch (InterruptedException e) {}

        int resultCount = driver.findElements(By.className("product-item")).size();
        Assert.assertTrue(resultCount > 0, "Search should return results");
        System.out.println("SMOKE TEST: Product search working - " + resultCount + " results");
    }

    @Test(groups = {"regression", "cart"}, priority = 4, dependsOnMethods = "testProductSearch")
    public void testAddToCart() {
        driver.findElement(By.className("add-to-cart-btn")).click();

        try { Thread.sleep(1000); } catch (InterruptedException e) {}

        String cartCount = driver.findElement(By.id("cartCount")).getText();
        Assert.assertEquals(cartCount, "1", "Cart should have 1 item");
        System.out.println("REGRESSION TEST: Add to cart successful");
    }

    @Test(groups = {"regression", "cart"}, priority = 5, dependsOnMethods = "testAddToCart")
    public void testViewCart() {
        driver.findElement(By.id("cartIcon")).click();

        try { Thread.sleep(1000); } catch (InterruptedException e) {}

        boolean isCartPage = driver.getCurrentUrl().contains("/cart");
        Assert.assertTrue(isCartPage, "Should navigate to cart page");
        System.out.println("REGRESSION TEST: View cart successful");
    }

    @Test(groups = {"regression", "checkout", "payment"}, priority = 6, dependsOnMethods = "testViewCart")
    public void testCheckoutProcess() {
        driver.findElement(By.id("checkoutBtn")).click();

        try { Thread.sleep(2000); } catch (InterruptedException e) {}

        // Fill shipping information
        driver.findElement(By.id("address")).sendKeys("123 Test Street");
        driver.findElement(By.id("city")).sendKeys("Test City");
        driver.findElement(By.id("zipcode")).sendKeys("12345");
        driver.findElement(By.id("continueBtn")).click();

        try { Thread.sleep(1000); } catch (InterruptedException e) {}

        boolean isPaymentPage = driver.getCurrentUrl().contains("/payment");
        Assert.assertTrue(isPaymentPage, "Should navigate to payment page");
        System.out.println("REGRESSION TEST: Checkout process successful");
    }

    @Test(groups = {"sanity", "ui"}, priority = 7)
    public void testFooterLinks() {
        driver.get(baseUrl);

        boolean aboutLinkExists = driver.findElement(By.linkText("About Us")).isDisplayed();
        boolean contactLinkExists = driver.findElement(By.linkText("Contact")).isDisplayed();
        boolean termsLinkExists = driver.findElement(By.linkText("Terms")).isDisplayed();

        Assert.assertTrue(aboutLinkExists && contactLinkExists && termsLinkExists,
            "All footer links should be present");
        System.out.println("SANITY TEST: Footer links verified");
    }

    @Test(groups = {"regression", "negative"}, priority = 8)
    public void testInvalidLogin() {
        driver.get(baseUrl + "/login");
        driver.findElement(By.id("email")).sendKeys("invalid@example.com");
        driver.findElement(By.id("password")).sendKeys("wrongpassword");
        driver.findElement(By.id("loginBtn")).click();

        try { Thread.sleep(1000); } catch (InterruptedException e) {}

        boolean errorDisplayed = driver.findElement(By.className("error-message")).isDisplayed();
        Assert.assertTrue(errorDisplayed, "Error message should be displayed");
        System.out.println("REGRESSION TEST: Invalid login handled correctly");
    }

    @Test(groups = {"database", "backend"}, priority = 9, dependsOnGroups = "smoke")
    public void testOrderPersistence() {
        // This would typically check database for order persistence
        System.out.println("DATABASE TEST: Verify order persisted in database");
        // Database verification logic here
        Assert.assertTrue(true, "Order should be persisted");
    }

    @AfterMethod(groups = {"smoke", "regression", "sanity"}, alwaysRun = true)
    public void teardown() {
        if (driver != null) {
            driver.quit();
            System.out.println("Browser closed");
        }
    }
}
```

---

## 13. testng.xml for Real-World Scenarios

### Smoke Test Suite

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Smoke Test Suite" verbose="1">
    <test name="Critical Smoke Tests">
        <groups>
            <run>
                <include name="smoke"/>
            </run>
        </groups>
        <classes>
            <class name="tests.EcommerceTestSuite"/>
        </classes>
    </test>
</suite>
```

### Regression Test Suite

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Regression Test Suite" verbose="1">
    <test name="Full Regression Tests">
        <groups>
            <run>
                <include name="smoke"/>
                <include name="regression"/>
                <exclude name="database"/>  <!-- Exclude database tests -->
            </run>
        </groups>
        <classes>
            <class name="tests.EcommerceTestSuite"/>
        </classes>
    </test>
</suite>
```

### Complete Test Suite

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Complete Test Suite" verbose="1">
    <test name="All Tests">
        <groups>
            <define name="all-tests">
                <include name="smoke"/>
                <include name="regression"/>
                <include name="sanity"/>
            </define>

            <define name="critical-path">
                <include name="critical"/>
                <include name="authentication"/>
                <include name="checkout"/>
            </define>

            <run>
                <include name="all-tests"/>
            </run>
        </groups>
        <classes>
            <class name="tests.EcommerceTestSuite"/>
        </classes>
    </test>
</suite>
```

### Environment-Specific Suite

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="QA Environment Suite" verbose="1">
    <test name="QA Tests">
        <groups>
            <run>
                <include name="smoke"/>
                <include name="regression"/>
                <include name="database"/>  <!-- Include DB tests in QA -->
                <exclude name="production-only"/>
            </run>
        </groups>
        <classes>
            <class name="tests.EcommerceTestSuite"/>
        </classes>
    </test>
</suite>
```

---

## 14. Cross-Class Dependencies

### Setup Class

```java
package tests;

import org.testng.annotations.Test;

public class SetupTests {

    @Test(groups = "environment-setup", priority = 1)
    public void setupDatabase() {
        System.out.println("SETUP: Initialize database");
    }

    @Test(groups = "environment-setup", priority = 2)
    public void createTestUsers() {
        System.out.println("SETUP: Create test users");
    }

    @Test(groups = "environment-setup", priority = 3)
    public void loadProducts() {
        System.out.println("SETUP: Load product catalog");
    }
}
```

### Main Test Class

```java
package tests;

import org.testng.annotations.Test;

public class MainTests {

    @Test(groups = "functional", dependsOnGroups = "environment-setup")
    public void testProductListing() {
        System.out.println("MAIN TEST: Product listing test");
    }

    @Test(groups = "functional", dependsOnGroups = "environment-setup")
    public void testUserRegistration() {
        System.out.println("MAIN TEST: User registration test");
    }

    @Test(groups = "functional", dependsOnMethods = {"testProductListing", "testUserRegistration"})
    public void testPurchaseFlow() {
        System.out.println("MAIN TEST: Purchase flow test");
    }
}
```

### Cleanup Class

```java
package tests;

import org.testng.annotations.Test;

public class CleanupTests {

    @Test(groups = "cleanup", dependsOnGroups = {"environment-setup", "functional"}, alwaysRun = true)
    public void removeTestData() {
        System.out.println("CLEANUP: Remove test data");
    }

    @Test(groups = "cleanup", dependsOnMethods = "removeTestData", alwaysRun = true)
    public void resetDatabase() {
        System.out.println("CLEANUP: Reset database");
    }

    @Test(groups = "cleanup", dependsOnMethods = "resetDatabase", alwaysRun = true)
    public void generateReport() {
        System.out.println("CLEANUP: Generate test report");
    }
}
```

### testng.xml for Cross-Class

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Cross-Class Dependency Suite" verbose="1">
    <test name="Complete Test Flow">
        <groups>
            <run>
                <include name="environment-setup"/>
                <include name="functional"/>
                <include name="cleanup"/>
            </run>
        </groups>
        <classes>
            <class name="tests.SetupTests"/>
            <class name="tests.MainTests"/>
            <class name="tests.CleanupTests"/>
        </classes>
    </test>
</suite>
```

---

## 15. Regular Expressions in Groups

### Using Regex Patterns

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Regex Group Suite">
    <test name="Pattern-Based Tests">
        <groups>
            <run>
                <!-- Include all groups starting with "test" -->
                <include name="test.*"/>

                <!-- Include all groups ending with "smoke" -->
                <include name=".*smoke"/>

                <!-- Exclude all groups containing "skip" -->
                <exclude name=".*skip.*"/>
            </run>
        </groups>
        <classes>
            <class name="tests.RegexGroupExample"/>
        </classes>
    </test>
</suite>
```

### Test Class with Pattern-Based Groups

```java
import org.testng.annotations.Test;

public class RegexGroupExample {

    @Test(groups = "test-login")
    public void testLogin() {
        System.out.println("Test: Login (matches test.*)");
    }

    @Test(groups = "test-checkout")
    public void testCheckout() {
        System.out.println("Test: Checkout (matches test.*)");
    }

    @Test(groups = "ui-smoke")
    public void uiSmokeTest() {
        System.out.println("Test: UI Smoke (matches .*smoke)");
    }

    @Test(groups = "api-smoke")
    public void apiSmokeTest() {
        System.out.println("Test: API Smoke (matches .*smoke)");
    }

    @Test(groups = "skip-this-test")
    public void skipThisTest() {
        System.out.println("Test: This won't run (matches .*skip.*)");
    }

    @Test(groups = "regression")
    public void regressionTest() {
        System.out.println("Test: Regression (no pattern match)");
    }
}
```

---

## 16. Best Practices

### 1. Use Meaningful Group Names

```java
// Good - Clear purpose
@Test(groups = {"smoke", "critical", "authentication"})
public void testUserLogin() { }

// Bad - Unclear purpose
@Test(groups = {"g1", "test1", "a"})
public void testUserLogin() { }
```

### 2. Organize Tests by Multiple Criteria

```java
@Test(groups = {"smoke", "ui", "critical", "authentication"})
public void testLogin() {
    // Categorized by: test type, test layer, priority, feature
}

@Test(groups = {"regression", "api", "medium", "checkout"})
public void testPaymentAPI() {
    // Multiple dimensions of organization
}
```

### 3. Use Dependencies Wisely

```java
// Good - Logical dependency
@Test(groups = "setup")
public void createTestData() { }

@Test(groups = "execution", dependsOnGroups = "setup")
public void runTest() { }

// Bad - Unnecessary tight coupling
@Test
public void test1() { }

@Test(dependsOnMethods = "test1")
public void test2() { }  // If test2 is independent, don't create dependency
```

### 4. Always Use alwaysRun for Cleanup

```java
@Test(groups = "cleanup", dependsOnGroups = {"setup", "execution"}, alwaysRun = true)
public void cleanupResources() {
    // This will ALWAYS run to clean up resources
    // Even if other tests fail
}
```

### 5. Combine Priority with Dependencies

```java
@Test(groups = "init", priority = 1)
public void initialize() { }

@Test(groups = "init", priority = 2, dependsOnMethods = "initialize")
public void configure() { }

@Test(groups = "main", priority = 1, dependsOnGroups = "init")
public void mainTest() { }
```

### 6. Document Group Purposes

```java
/**
 * Test Groups:
 * - smoke: Quick validation tests (5-10 minutes)
 * - regression: Complete test coverage (30-60 minutes)
 * - sanity: Basic health check (2-3 minutes)
 * - critical: Must-pass tests for production
 * - database: Tests requiring database
 */
public class DocumentedTests {
    @Test(groups = "smoke")
    public void smokeTest() { }
}
```

### 7. Create Hierarchical Suites

```xml
<!-- master-suite.xml -->
<suite name="Master Suite">
    <suite-files>
        <suite-file path="smoke-suite.xml"/>
        <suite-file path="regression-suite.xml"/>
        <suite-file path="integration-suite.xml"/>
    </suite-files>
</suite>
```

---

---

## 17. Practice Exercises

### Exercise 1: Organize Tests into Smoke and Regression Groups (20 minutes)

**Objective:** Learn to categorize tests using groups for different test execution scenarios.

**Scenario:** You have a test suite with various tests. Organize them into smoke tests (quick critical checks) and regression tests (comprehensive testing).

**Requirements:**
1. Create 5 test methods in a single class
2. Assign 2 tests to "smoke" group
3. Assign 3 tests to "regression" group
4. One test should belong to both "smoke" and "regression" groups
5. Create two testng.xml files: one for smoke tests, one for regression tests

**Code Template:**
```java
public class TestOrganizationExample {

    @Test(groups = "smoke")
    public void testCriticalFeature1() {
        // Your implementation here
    }

    @Test(groups = {"smoke", "regression"})
    public void testImportantFeature() {
        // Your implementation here
    }

    @Test(groups = "regression")
    public void testDetailedFeature1() {
        // Your implementation here
    }

    // Add 2 more test methods
}
```

**Expected Outcome:**
- Running smoke suite executes only smoke tests (3 tests)
- Running regression suite executes only regression tests (4 tests)
- Common test executes in both suites
- Clear console output showing which group is running

**Solution Approach:**
1. Create test methods with meaningful names
2. Add @Test annotation with groups attribute
3. Create testng-smoke.xml with `<include name="smoke"/>`
4. Create testng-regression.xml with `<include name="regression"/>`
5. Add print statements to identify which test is running
6. Run each suite separately and verify the output

**Common Mistakes to Avoid:**
- Misspelling group names (groups are case-sensitive)
- Forgetting to specify groups in testng.xml run section
- Not considering that one test can belong to multiple groups
- Confusing groups with priorities (they serve different purposes)

---

### Exercise 2: Test Dependencies Chain (25 minutes)

**Objective:** Implement a series of dependent tests using dependsOnMethods.

**Scenario:** You need to test an e-commerce flow where each step depends on the previous step: Navigate to site -> Login -> Add to Cart -> Checkout -> Payment.

**Requirements:**
1. Create 5 test methods representing the e-commerce flow
2. Implement dependsOnMethods to ensure correct execution order
3. Use @BeforeMethod to initialize WebDriver
4. Use @AfterMethod to clean up resources
5. Intentionally fail one test to observe how dependencies are skipped

**Code Template:**
```java
public class EcommerceDependencyTest {
    WebDriver driver;

    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

    @Test(priority = 1)
    public void testNavigateToSite() {
        // Your implementation here
    }

    @Test(priority = 2, dependsOnMethods = "testNavigateToSite")
    public void testLogin() {
        // Your implementation here
    }

    @Test(priority = 3, dependsOnMethods = "testLogin")
    public void testAddToCart() {
        // Your implementation here
    }

    // Add testCheckout and testPayment with appropriate dependencies

    @AfterMethod
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

**Expected Outcome:**
- Tests execute in the correct order based on dependencies
- If a test fails, dependent tests are automatically skipped
- TestNG report shows the dependency chain clearly
- No orphaned browser instances

**Solution Approach:**
1. Implement each test method with simple navigation or assertions
2. Chain dependencies: Login depends on Navigate, AddToCart depends on Login, etc.
3. Use System.out.println to log each step
4. For the failure test, add Assert.fail() in one method (e.g., testLogin)
5. Observe how subsequent tests are skipped
6. Remove the Assert.fail() and verify all tests pass

**Common Mistakes to Avoid:**
- Circular dependencies (A depends on B, B depends on A)
- Spelling method names incorrectly in dependsOnMethods
- Forgetting that skipped tests still show in reports
- Not considering that @AfterMethod runs even for skipped tests
- Creating unnecessarily tight coupling between independent tests

---

### Exercise 3: Group Dependencies with alwaysRun (30 minutes)

**Objective:** Use group-level dependencies and understand the alwaysRun attribute for critical cleanup tasks.

**Scenario:** Create a test suite with initialization, execution, and cleanup groups where cleanup must always run regardless of test failures.

**Requirements:**
1. Create tests in three groups: "init", "execution", "cleanup"
2. Make execution group depend on init group
3. Make cleanup group depend on execution group but with alwaysRun = true
4. Implement at least 2 tests in each group
5. Intentionally fail a test in execution group to verify cleanup still runs

**Code Template:**
```java
public class GroupDependencyWithCleanup {

    @Test(groups = "init", priority = 1)
    public void setupDatabase() {
        System.out.println("Initializing database...");
        // Your implementation here
    }

    @Test(groups = "init", priority = 2)
    public void createTestData() {
        System.out.println("Creating test data...");
        // Your implementation here
    }

    @Test(groups = "execution", dependsOnGroups = "init", priority = 3)
    public void executeMainTest() {
        System.out.println("Executing main test...");
        // Add Assert.fail() here to test cleanup behavior
    }

    @Test(groups = "cleanup", dependsOnGroups = {"init", "execution"}, alwaysRun = true, priority = 10)
    public void cleanupResources() {
        System.out.println("Cleaning up resources...");
        // Your implementation here - this should ALWAYS run
    }

    // Add more tests to each group
}
```

**Expected Outcome:**
- Init tests run first
- Execution tests run after init completes
- Cleanup tests ALWAYS run, even if execution tests fail
- Console output clearly shows the execution flow
- TestNG report shows cleanup as "PASSED" even when other tests fail

**Solution Approach:**
1. Implement init tests with simple setup logic
2. Implement execution tests with actual test logic
3. Add Assert.fail() in one execution test to simulate failure
4. Implement cleanup with actual cleanup logic (close connections, delete files, etc.)
5. Mark cleanup with alwaysRun = true
6. Run the suite and verify cleanup executes despite failures
7. Check TestNG reports to see the status of each test

**Common Mistakes to Avoid:**
- Forgetting alwaysRun = true on cleanup tests (they'll be skipped on failure)
- Not prioritizing cleanup to run last
- Creating complex dependencies that are hard to debug
- Not including all dependent groups in the dependsOnGroups list
- Relying on alwaysRun for tests that aren't actually cleanup operations

---

### Exercise 4: Priority-Based Execution Control (25 minutes)

**Objective:** Master the use of priority attribute to control test execution order.

**Scenario:** You have multiple independent tests that need to run in a specific order based on business priority, not dependencies.

**Requirements:**
1. Create 6 test methods with different priorities (-1, 0, 1, 2, 3, and no priority)
2. Do NOT use dependsOnMethods (tests are independent)
3. Each test should print its priority and timestamp
4. Run the tests and observe the execution order
5. Create a testng.xml with parallel="false" to ensure sequential execution

**Code Template:**
```java
public class PriorityBasedExecution {

    @Test(priority = 2)
    public void testMediumPriority() {
        System.out.println("Priority 2 - Medium Priority Test - " + System.currentTimeMillis());
        // Your implementation here
    }

    @Test(priority = -1)
    public void testHighestPriority() {
        System.out.println("Priority -1 - Highest Priority Test - " + System.currentTimeMillis());
        // Your implementation here
    }

    @Test
    public void testDefaultPriority() {
        System.out.println("Priority 0 (default) - Default Priority Test - " + System.currentTimeMillis());
        // Your implementation here
    }

    // Add 3 more tests with priorities 1, 3, and 0
}
```

**Expected Outcome:**
- Tests execute in order: -1, 0, 0, 1, 2, 3
- Tests with same priority execute in alphabetical order by method name
- Console output clearly shows execution sequence
- All tests are independent (no skipping if one fails)

**Solution Approach:**
1. Create test methods with simple assertions
2. Assign different priority values
3. Add timestamps to output to verify execution order
4. Run tests and note the console output order
5. Try changing priorities and observe the difference
6. Document when to use priority vs. dependsOnMethods

**Common Mistakes to Avoid:**
- Using priority when dependencies are actually needed (use dependsOnMethods instead)
- Assuming negative priorities always run first (they do, but can be confusing)
- Forgetting that tests with same priority run alphabetically
- Using priority in parallel execution (priority works per thread)
- Over-relying on priority instead of making tests truly independent

---

### Exercise 5: Complex Test Orchestration (40 minutes)

**Objective:** Combine groups, dependencies, and priorities to create a sophisticated test execution strategy.

**Scenario:** Build a complete test framework for a web application with environment setup, smoke tests, regression tests, and teardown, all properly orchestrated.

**Requirements:**
1. Create tests in 4 groups: "environment-setup", "smoke", "regression", "teardown"
2. Use priorities within groups to control execution order
3. Use group dependencies: smoke depends on environment-setup, regression depends on smoke
4. Make teardown alwaysRun and depend on all other groups
5. Create a testng.xml that runs specific groups with proper configuration
6. Include at least 2 tests per group (8 tests total)

**Code Template:**
```java
public class CompleteTestOrchestration {

    @Test(groups = "environment-setup", priority = 1)
    public void initializeDatabase() {
        System.out.println("1. Database initialized");
        // Your implementation here
    }

    @Test(groups = "environment-setup", priority = 2)
    public void setupTestUsers() {
        System.out.println("2. Test users created");
        // Your implementation here
    }

    @Test(groups = {"smoke", "critical"}, dependsOnGroups = "environment-setup", priority = 1)
    public void smokeTestLogin() {
        System.out.println("3. Smoke: Login test");
        // Your implementation here
    }

    @Test(groups = "smoke", dependsOnGroups = "environment-setup", priority = 2)
    public void smokeTestHomepage() {
        System.out.println("4. Smoke: Homepage test");
        // Your implementation here
    }

    @Test(groups = "regression", dependsOnGroups = {"environment-setup", "smoke"}, priority = 1)
    public void regressionTestCheckout() {
        System.out.println("5. Regression: Checkout test");
        // Your implementation here
    }

    // Add more tests for regression and teardown groups
}
```

**testng.xml Template:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Complete Suite">
    <test name="Full Test Execution">
        <groups>
            <run>
                <include name="environment-setup"/>
                <include name="smoke"/>
                <include name="regression"/>
                <include name="teardown"/>
            </run>
        </groups>
        <classes>
            <class name="tests.CompleteTestOrchestration"/>
        </classes>
    </test>
</suite>
```

**Expected Outcome:**
- Environment setup runs first
- Smoke tests run after setup
- Regression tests run after smoke
- Teardown always runs at the end, even if tests fail
- Clear execution flow with proper logging
- Ability to run only specific groups (e.g., just smoke tests)

**Solution Approach:**
1. Design the test flow on paper first
2. Implement each test with simple logic and logging
3. Apply groups, priorities, and dependencies systematically
4. Create testng.xml files for different scenarios (smoke-only, full regression)
5. Test failure scenarios by intentionally failing tests
6. Verify teardown always runs using alwaysRun = true
7. Document the execution flow and group purposes

**Common Mistakes to Avoid:**
- Creating overly complex dependency chains
- Not testing the failure scenarios
- Forgetting to make teardown alwaysRun
- Mixing different organization strategies inconsistently
- Not documenting the purpose of each group
- Creating circular dependencies
- Not considering parallel execution implications

---

### Exercise 6: Cross-Browser Testing with Groups and Parameters (45 minutes)

**Objective:** Implement a real-world cross-browser testing framework using groups, parameters, and test organization.

**Scenario:** Create a framework that runs tests across Chrome and Firefox, organizing them by test type (smoke/regression) and allowing selective execution.

**Requirements:**
1. Create a base test class with browser initialization from parameters
2. Create test classes with methods in different groups
3. Implement at least 3 tests: login, search, and checkout
4. Categorize tests into smoke and regression groups
5. Create testng.xml files for:
   - Chrome smoke tests
   - Firefox smoke tests
   - Both browsers regression tests
6. Use group hierarchies to create "all-smoke" and "all-regression" meta-groups

**Code Template:**
```java
// BaseTest.java
public class BaseTest {
    protected WebDriver driver;

    @BeforeMethod
    @Parameters("browser")
    public void setup(@Optional("chrome") String browser) {
        if (browser.equalsIgnoreCase("chrome")) {
            driver = new ChromeDriver();
        } else if (browser.equalsIgnoreCase("firefox")) {
            driver = new FirefoxDriver();
        }
        driver.manage().window().maximize();
        System.out.println("Browser initialized: " + browser);
    }

    @AfterMethod
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}

// CrossBrowserTest.java
public class CrossBrowserTest extends BaseTest {

    @Test(groups = {"smoke", "login"}, priority = 1)
    public void testLogin() {
        System.out.println("Testing login on " +
            driver.getClass().getSimpleName());
        driver.get("https://example.com/login");
        // Your implementation here
    }

    @Test(groups = {"smoke", "search"}, priority = 2)
    public void testSearch() {
        System.out.println("Testing search on " +
            driver.getClass().getSimpleName());
        // Your implementation here
    }

    @Test(groups = {"regression", "checkout"}, priority = 3)
    public void testCheckout() {
        System.out.println("Testing checkout on " +
            driver.getClass().getSimpleName());
        // Your implementation here
    }
}
```

**testng.xml Template (Chrome Smoke):**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Chrome Smoke Suite">
    <test name="Chrome Smoke Tests">
        <parameter name="browser" value="chrome"/>
        <groups>
            <run>
                <include name="smoke"/>
            </run>
        </groups>
        <classes>
            <class name="tests.CrossBrowserTest"/>
        </classes>
    </test>
</suite>
```

**Expected Outcome:**
- Chrome smoke suite runs only smoke tests in Chrome
- Firefox smoke suite runs only smoke tests in Firefox
- Regression suite runs in both browsers
- Easy to add new browsers by just adding parameters
- Clean separation of test organization from browser configuration

**Solution Approach:**
1. Create BaseTest with parameterized browser setup
2. Implement test methods with appropriate group annotations
3. Create multiple testng.xml files for different scenarios
4. Run each suite and verify browser and test selection
5. Create a master suite that includes both browsers
6. Add parallel execution to run browsers simultaneously (bonus)
7. Document the framework structure and usage

**Common Mistakes to Avoid:**
- Not closing browsers properly (resource leaks)
- Hardcoding browser initialization instead of using parameters
- Creating separate test classes for each browser (redundant)
- Not using groups effectively to categorize tests
- Forgetting @Optional annotation (causes errors when parameter not provided)
- Not maximizing browser (causes element visibility issues)
- Missing parameter in testng.xml (causes NullPointerException)
- Creating tight coupling between tests and specific browsers

---

## 17. Key Takeaways

1. **Groups organize tests** into logical categories for selective execution
2. **Multiple groups per test** enable flexible test categorization
3. **Include/exclude groups** in testng.xml for selective execution
4. **Group hierarchies (meta groups)** create reusable group combinations
5. **dependsOnMethods** creates method-level dependencies
6. **dependsOnGroups** creates group-level dependencies
7. **Hard dependencies** skip dependent tests when dependency fails
8. **Soft dependencies (alwaysRun = true)** execute tests regardless of failures
9. **Priority** controls execution order (lower numbers run first)
10. **Combining groups, dependencies, and priorities** creates powerful test orchestration

---

## 18. Common Interview Questions

1. What are groups in TestNG?
2. How do you run specific groups from testng.xml?
3. Can a test belong to multiple groups?
4. What's the difference between dependsOnMethods and dependsOnGroups?
5. What's the difference between hard and soft dependencies?
6. What does alwaysRun = true do?
7. How does priority work in TestNG?
8. What happens when a test with dependencies fails?
9. How do you create group hierarchies?
10. Can you use regular expressions in group names?

---

## Navigation

- **Previous:** [Day 31: TestNG Part 2 - Parameters & Data Providers](./day31_testng_part2.md)
- **Next:** [Day 33: TestNG Part 4 - Listeners & Reporting](./day33_testng_part4.md)
- **Week 5 Home:** [Week 5 Overview](./README.md)

---

**Happy Learning!** Mastering groups, dependencies, and priorities enables sophisticated test orchestration and efficient test execution.
