# Day 19: TestNG Part 2 - Parameters & Data Providers

## Learning Objectives

By the end of this lesson, you will be able to:
- Understand parameterization in TestNG
- Use @Parameters annotation effectively
- Pass parameters from testng.xml
- Create and use @DataProvider
- Implement data-driven testing
- Use DataProvider with multiple test methods
- Handle 2D arrays in DataProvider
- Use DataProvider with Excel files
- Implement custom data providers
- Apply best practices for parameterized testing

---

## 1. Introduction to Parameterization

### Why Parameterization?

Parameterization allows you to:
- **Run same test with different data** - Test multiple scenarios
- **Reduce code duplication** - Write once, test with many data sets
- **Data-driven testing** - Separate test logic from test data
- **Increase test coverage** - Test edge cases and boundary values
- **Maintain tests easily** - Change data without changing code

### Two Ways to Parameterize in TestNG

1. **@Parameters** - Pass parameters from testng.xml
2. **@DataProvider** - Provide data programmatically

---

## 2. @Parameters Annotation

### Basic Example

**Test Class:**
```java
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

public class ParametersExample {

    @Test
    @Parameters({"username", "password"})
    public void testLogin(String user, String pass) {
        System.out.println("Username: " + user);
        System.out.println("Password: " + pass);
    }
}
```

**testng.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Parameter Suite">
    <test name="Login Test">
        <parameter name="username" value="admin"/>
        <parameter name="password" value="admin123"/>
        <classes>
            <class name="tests.ParametersExample"/>
        </classes>
    </test>
</suite>
```

---

## 3. Multiple Parameter Values

### Different Parameters for Different Tests

**testng.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Multi Parameter Suite">
    <test name="Chrome Test">
        <parameter name="browser" value="chrome"/>
        <parameter name="url" value="https://google.com"/>
        <classes>
            <class name="tests.BrowserTest"/>
        </classes>
    </test>

    <test name="Firefox Test">
        <parameter name="browser" value="firefox"/>
        <parameter name="url" value="https://google.com"/>
        <classes>
            <class name="tests.BrowserTest"/>
        </classes>
    </test>
</suite>
```

**Test Class:**
```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

public class BrowserTest {

    @Test
    @Parameters({"browser", "url"})
    public void testBrowser(String browser, String url) {
        WebDriver driver;

        if (browser.equalsIgnoreCase("chrome")) {
            driver = new ChromeDriver();
        } else if (browser.equalsIgnoreCase("firefox")) {
            driver = new FirefoxDriver();
        } else {
            throw new IllegalArgumentException("Browser not supported");
        }

        driver.get(url);
        System.out.println("Browser: " + browser);
        System.out.println("URL: " + url);
        System.out.println("Title: " + driver.getTitle());

        driver.quit();
    }
}
```

---

## 4. Optional Parameters

### Setting Default Values

```java
import org.testng.annotations.Optional;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

public class OptionalParametersExample {

    @Test
    @Parameters({"env", "browser"})
    public void testWithOptional(
        @Optional("QA") String environment,
        @Optional("chrome") String browser
    ) {
        System.out.println("Environment: " + environment);
        System.out.println("Browser: " + browser);
    }
}
```

**testng.xml (with partial parameters):**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Optional Parameter Suite">
    <test name="Test with Browser Only">
        <parameter name="browser" value="firefox"/>
        <!-- env parameter not provided, will use default "QA" -->
        <classes>
            <class name="tests.OptionalParametersExample"/>
        </classes>
    </test>
</suite>
```

---

## 5. @DataProvider Annotation

### Basic DataProvider

```java
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

public class DataProviderExample {

    @DataProvider(name = "loginData")
    public Object[][] getLoginData() {
        return new Object[][] {
            {"user1", "pass1"},
            {"user2", "pass2"},
            {"user3", "pass3"}
        };
    }

    @Test(dataProvider = "loginData")
    public void testLogin(String username, String password) {
        System.out.println("Username: " + username + ", Password: " + password);
    }
}
```

**Output:**
```
Username: user1, Password: pass1
Username: user2, Password: pass2
Username: user3, Password: pass3
```

---

## 6. DataProvider with Different Data Types

### Mixed Data Types

```java
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

public class MixedDataTypesExample {

    @DataProvider(name = "userData")
    public Object[][] getUserData() {
        return new Object[][] {
            {"John", 25, true},
            {"Jane", 30, false},
            {"Bob", 35, true}
        };
    }

    @Test(dataProvider = "userData")
    public void testUserData(String name, int age, boolean active) {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Active: " + active);
        System.out.println("---");
    }
}
```

---

## 7. DataProvider in Separate Class

### DataProvider Class

```java
package dataproviders;

import org.testng.annotations.DataProvider;

public class TestDataProvider {

    @DataProvider(name = "loginData")
    public static Object[][] getLoginData() {
        return new Object[][] {
            {"admin", "admin123"},
            {"user1", "password1"},
            {"user2", "password2"}
        };
    }

    @DataProvider(name = "searchData")
    public static Object[][] getSearchData() {
        return new Object[][] {
            {"Selenium"},
            {"TestNG"},
            {"Java"}
        };
    }
}
```

### Using External DataProvider

```java
import org.testng.annotations.Test;

public class LoginTest {

    @Test(dataProvider = "loginData", dataProviderClass = TestDataProvider.class)
    public void testLogin(String username, String password) {
        System.out.println("Testing login with: " + username + " / " + password);
    }
}
```

---

## 8. DataProvider with Selenium

### Complete Example

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

public class LoginTestWithDataProvider {

    WebDriver driver;

    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

    @DataProvider(name = "loginCredentials")
    public Object[][] getLoginCredentials() {
        return new Object[][] {
            {"validuser@example.com", "ValidPass123", true},
            {"invaliduser@example.com", "WrongPass", false},
            {"", "password", false},
            {"user@example.com", "", false}
        };
    }

    @Test(dataProvider = "loginCredentials")
    public void testLogin(String email, String password, boolean shouldSucceed) {
        driver.get("https://example.com/login");

        driver.findElement(By.id("email")).sendKeys(email);
        driver.findElement(By.id("password")).sendKeys(password);
        driver.findElement(By.id("loginBtn")).click();

        // Wait for result
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        if (shouldSucceed) {
            // Verify successful login
            boolean isDashboardDisplayed = driver.findElement(By.id("dashboard")).isDisplayed();
            Assert.assertTrue(isDashboardDisplayed, "Login should succeed");
        } else {
            // Verify error message
            boolean isErrorDisplayed = driver.findElement(By.className("error")).isDisplayed();
            Assert.assertTrue(isErrorDisplayed, "Error message should be displayed");
        }
    }

    @AfterMethod
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

---

## 9. DataProvider with Excel Files

### Maven Dependencies

```xml
<dependencies>
    <!-- Apache POI for Excel -->
    <dependency>
        <groupId>org.apache.poi</groupId>
        <artifactId>poi</artifactId>
        <version>5.2.3</version>
    </dependency>
    <dependency>
        <groupId>org.apache.poi</groupId>
        <artifactId>poi-ooxml</artifactId>
        <version>5.2.3</version>
    </dependency>
</dependencies>
```

### Excel Utility Class

```java
package utils;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import java.io.FileInputStream;
import java.io.IOException;

public class ExcelUtils {

    public static Object[][] getExcelData(String filePath, String sheetName) {
        Object[][] data = null;

        try (FileInputStream fis = new FileInputStream(filePath);
             Workbook workbook = new XSSFWorkbook(fis)) {

            Sheet sheet = workbook.getSheet(sheetName);
            int rowCount = sheet.getLastRowNum();
            int colCount = sheet.getRow(0).getLastCellNum();

            data = new Object[rowCount][colCount];

            for (int i = 0; i < rowCount; i++) {
                Row row = sheet.getRow(i + 1); // Skip header row

                for (int j = 0; j < colCount; j++) {
                    Cell cell = row.getCell(j);
                    data[i][j] = getCellValue(cell);
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

        return data;
    }

    private static String getCellValue(Cell cell) {
        if (cell == null) {
            return "";
        }

        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    return cell.getDateCellValue().toString();
                }
                return String.valueOf((int) cell.getNumericCellValue());
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            case FORMULA:
                return cell.getCellFormula();
            default:
                return "";
        }
    }
}
```

### Using Excel DataProvider

```java
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;
import utils.ExcelUtils;

public class ExcelDataProviderTest {

    @DataProvider(name = "excelData")
    public Object[][] getExcelData() {
        String filePath = "src/test/resources/testdata.xlsx";
        return ExcelUtils.getExcelData(filePath, "LoginData");
    }

    @Test(dataProvider = "excelData")
    public void testWithExcelData(String username, String password, String expectedResult) {
        System.out.println("Username: " + username);
        System.out.println("Password: " + password);
        System.out.println("Expected: " + expectedResult);
        System.out.println("---");
    }
}
```

**Excel File Structure (testdata.xlsx):**
```
| Username       | Password  | ExpectedResult |
|----------------|-----------|----------------|
| admin          | admin123  | Pass           |
| user1          | pass123   | Pass           |
| invaliduser    | wrongpass | Fail           |
```

---

## 10. DataProvider with Method Reference

### Using Method Information

```java
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;
import java.lang.reflect.Method;

public class MethodDataProviderExample {

    @DataProvider(name = "dynamicData")
    public Object[][] getDynamicData(Method method) {
        Object[][] data = null;

        if (method.getName().equals("testLogin")) {
            data = new Object[][] {
                {"user1", "pass1"},
                {"user2", "pass2"}
            };
        } else if (method.getName().equals("testSearch")) {
            data = new Object[][] {
                {"Selenium"},
                {"TestNG"}
            };
        }

        return data;
    }

    @Test(dataProvider = "dynamicData")
    public void testLogin(String username, String password) {
        System.out.println("Login: " + username + " / " + password);
    }

    @Test(dataProvider = "dynamicData")
    public void testSearch(String keyword) {
        System.out.println("Search: " + keyword);
    }
}
```

---

## 11. Parallel Execution with DataProvider

### testng.xml Configuration

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Parallel Data Provider Suite" parallel="methods" thread-count="3">
    <test name="Data Provider Test">
        <classes>
            <class name="tests.ParallelDataProviderTest"/>
        </classes>
    </test>
</suite>
```

### Test Class

```java
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

public class ParallelDataProviderTest {

    @DataProvider(name = "testData", parallel = true)
    public Object[][] getTestData() {
        return new Object[][] {
            {"Data1"},
            {"Data2"},
            {"Data3"},
            {"Data4"},
            {"Data5"}
        };
    }

    @Test(dataProvider = "testData")
    public void testParallel(String data) {
        System.out.println("Thread: " + Thread.currentThread().getId() + " - Data: " + data);
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

---

## 12. DataProvider Indices

### Running Specific Data Sets

```java
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

public class DataProviderIndicesExample {

    @DataProvider(name = "testData", indices = {0, 2, 4})
    public Object[][] getData() {
        return new Object[][] {
            {"Data0"},  // Will run (index 0)
            {"Data1"},  // Will NOT run
            {"Data2"},  // Will run (index 2)
            {"Data3"},  // Will NOT run
            {"Data4"}   // Will run (index 4)
        };
    }

    @Test(dataProvider = "testData")
    public void testWithSelectedIndices(String data) {
        System.out.println("Running with: " + data);
    }
}
```

---

## 13. Complete Data-Driven Framework Example

### Test Data Provider

```java
package dataproviders;

import org.testng.annotations.DataProvider;

public class LoginDataProvider {

    @DataProvider(name = "validLogins")
    public static Object[][] getValidLogins() {
        return new Object[][] {
            {"admin@example.com", "Admin@123"},
            {"user@example.com", "User@123"}
        };
    }

    @DataProvider(name = "invalidLogins")
    public static Object[][] getInvalidLogins() {
        return new Object[][] {
            {"invalid@example.com", "WrongPass"},
            {"", "password"},
            {"user@example.com", ""},
            {"", ""}
        };
    }
}
```

### Test Class

```java
package tests;

import dataproviders.LoginDataProvider;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class DataDrivenLoginTest {

    WebDriver driver;
    String baseUrl = "https://example.com/login";

    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get(baseUrl);
    }

    @Test(dataProvider = "validLogins", dataProviderClass = LoginDataProvider.class,
          priority = 1, description = "Test valid login scenarios")
    public void testValidLogin(String email, String password) {
        driver.findElement(By.id("email")).sendKeys(email);
        driver.findElement(By.id("password")).sendKeys(password);
        driver.findElement(By.id("loginBtn")).click();

        // Verify successful login
        Assert.assertTrue(driver.getCurrentUrl().contains("dashboard"),
            "Should redirect to dashboard");
        System.out.println("Valid login successful: " + email);
    }

    @Test(dataProvider = "invalidLogins", dataProviderClass = LoginDataProvider.class,
          priority = 2, description = "Test invalid login scenarios")
    public void testInvalidLogin(String email, String password) {
        driver.findElement(By.id("email")).sendKeys(email);
        driver.findElement(By.id("password")).sendKeys(password);
        driver.findElement(By.id("loginBtn")).click();

        // Verify error message displayed
        boolean errorDisplayed = driver.findElement(By.className("error-message")).isDisplayed();
        Assert.assertTrue(errorDisplayed, "Error message should be displayed");
        System.out.println("Invalid login rejected correctly: " + email);
    }

    @AfterMethod
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

---

## 14. Best Practices

1. **Use Descriptive DataProvider Names**
   ```java
   @DataProvider(name = "validLoginCredentials")  // Good
   @DataProvider(name = "data")  // Bad
   ```

2. **Separate DataProviders from Tests**
   ```java
   // Create separate DataProvider classes
   public class TestDataProviders {
       @DataProvider(name = "loginData")
       public static Object[][] getLoginData() { ... }
   }
   ```

3. **Use External Data Sources**
   ```java
   // Excel, CSV, Database instead of hardcoded data
   @DataProvider(name = "excelData")
   public Object[][] getExcelData() {
       return ExcelUtils.getExcelData("testdata.xlsx", "Sheet1");
   }
   ```

4. **Handle Null and Empty Values**
   ```java
   @Test(dataProvider = "testData")
   public void testLogin(String username, String password) {
       if (username == null || username.isEmpty()) {
           // Handle empty username
       }
   }
   ```

5. **Use Optional for Parameters**
   ```java
   @Parameters({"env", "browser"})
   public void test(
       @Optional("QA") String env,
       @Optional("chrome") String browser
   ) { ... }
   ```

---

---

## ⚠️ Common Mistakes to Avoid

### 1. Parameter Name Mismatch
**Problem**: Parameter name in @Parameters annotation doesn't match the name in testng.xml.
**Why It's Wrong**: TestNG won't be able to inject the parameter, causing NullPointerException or using default values.
**Correct Approach**: Ensure parameter names match exactly (case-sensitive).

```java
// ❌ WRONG: Parameter name mismatch
@Test
@Parameters({"userName"})  // Expecting "userName"
public void testLogin(String username) {  // But parameter is "username" in XML
    System.out.println(username);
}

// testng.xml has:
// <parameter name="username" value="admin"/>

// ✅ CORRECT: Matching parameter names
@Test
@Parameters({"username"})  // Matches XML
public void testLogin(String username) {
    System.out.println(username);
}
```

### 2. Not Using @Optional for Parameters
**Problem**: Forgetting @Optional annotation when parameter might not be provided in testng.xml.
**Why It's Wrong**: Test fails with ParameterException if parameter is missing.
**Correct Approach**: Always use @Optional with default value for optional parameters.

```java
// ❌ WRONG: No @Optional annotation
@Test
@Parameters({"browser", "env"})
public void testSetup(String browser, String env) {
    // Fails if env parameter not in testng.xml
}

// ✅ CORRECT: Use @Optional for optional parameters
@Test
@Parameters({"browser", "env"})
public void testSetup(String browser, @Optional("QA") String env) {
    // Uses "QA" if env not provided
    System.out.println("Browser: " + browser + ", Env: " + env);
}
```

### 3. Wrong DataProvider Return Type
**Problem**: DataProvider returns Object[] instead of Object[][].
**Why It's Wrong**: TestNG expects a 2D array where each row represents one test execution.
**Correct Approach**: Always return Object[][] from DataProvider.

```java
// ❌ WRONG: Returning Object[] (1D array)
@DataProvider(name = "loginData")
public Object[] getLoginData() {
    return new Object[] {"user1", "pass1"};  // Wrong!
}

// ✅ CORRECT: Returning Object[][] (2D array)
@DataProvider(name = "loginData")
public Object[][] getLoginData() {
    return new Object[][] {
        {"user1", "pass1"},
        {"user2", "pass2"},
        {"user3", "pass3"}
    };
}
```

### 4. Forgetting to Name DataProvider
**Problem**: Not providing a name for DataProvider or mismatching names in @Test.
**Why It's Wrong**: TestNG can't link the DataProvider to the test method.
**Correct Approach**: Name DataProvider and reference it correctly in @Test.

```java
// ❌ WRONG: DataProvider without name
@DataProvider
public Object[][] getData() {
    return new Object[][] {{"data"}};
}

@Test(dataProvider = "getData")  // Won't work!
public void testWithData(String data) { }

// ✅ CORRECT: Named DataProvider
@DataProvider(name = "testData")
public Object[][] getData() {
    return new Object[][] {{"data"}};
}

@Test(dataProvider = "testData")  // Matches the name
public void testWithData(String data) { }
```

### 5. Incorrect Parameter Count in Test Method
**Problem**: Test method parameters don't match DataProvider column count.
**Why It's Wrong**: Causes IllegalArgumentException at runtime.
**Correct Approach**: Ensure test method has correct number of parameters matching DataProvider columns.

```java
// ❌ WRONG: Parameter count mismatch
@DataProvider(name = "userData")
public Object[][] getUserData() {
    return new Object[][] {
        {"John", "john@example.com", 25},  // 3 columns
        {"Jane", "jane@example.com", 30}
    };
}

@Test(dataProvider = "userData")
public void testUser(String name, String email) {  // Only 2 parameters!
    // IllegalArgumentException!
}

// ✅ CORRECT: Matching parameter count
@Test(dataProvider = "userData")
public void testUser(String name, String email, int age) {  // 3 parameters
    System.out.println(name + ", " + email + ", " + age);
}
```

### 6. Not Making External DataProvider Static
**Problem**: DataProvider in separate class is not static when using dataProviderClass.
**Why It's Wrong**: TestNG can't invoke non-static method from another class.
**Correct Approach**: Make external DataProvider methods static.

```java
// ❌ WRONG: Non-static DataProvider in separate class
public class TestDataProviders {
    @DataProvider(name = "loginData")
    public Object[][] getLoginData() {  // Not static!
        return new Object[][] {{"user", "pass"}};
    }
}

@Test(dataProvider = "loginData", dataProviderClass = TestDataProviders.class)
public void testLogin(String user, String pass) {
    // Fails! Method must be static
}

// ✅ CORRECT: Static DataProvider
public class TestDataProviders {
    @DataProvider(name = "loginData")
    public static Object[][] getLoginData() {  // Static
        return new Object[][] {{"user", "pass"}};
    }
}
```

---

## 💡 Best Practices

### 1. Use Descriptive Parameter Names
**Why**: Makes test code self-documenting and easier to understand.
**How**: Choose clear, meaningful names for parameters.

```java
// ✅ GOOD: Clear parameter names
@Test
@Parameters({"browserType", "environmentUrl", "timeout Seconds"})
public void setupTest(String browserType, String environmentUrl, String timeoutSeconds) {
    System.out.println("Browser: " + browserType);
    System.out.println("URL: " + environmentUrl);
}

// ❌ BAD: Unclear names
@Parameters({"p1", "p2", "p3"})
public void setupTest(String p1, String p2, String p3) {
    // What do these parameters mean?
}
```

### 2. Organize DataProviders in Separate Classes
**Why**: Improves code organization, reusability, and maintainability.
**How**: Create dedicated classes for DataProviders.

```java
// ✅ GOOD: Organized DataProvider class
package dataproviders;

public class LoginDataProvider {

    @DataProvider(name = "validLogins")
    public static Object[][] getValidLogins() {
        return new Object[][] {
            {"admin@example.com", "Admin@123"},
            {"user@example.com", "User@123"}
        };
    }

    @DataProvider(name = "invalidLogins")
    public static Object[][] getInvalidLogins() {
        return new Object[][] {
            {"invalid@example.com", "wrong"},
            {"", "password"}
        };
    }
}

// Use in test class
@Test(dataProvider = "validLogins", dataProviderClass = LoginDataProvider.class)
public void testValidLogin(String email, String password) {
    // Test logic
}
```

### 3. Use @Optional with Meaningful Defaults
**Why**: Makes tests runnable without testng.xml and provides sensible defaults.
**How**: Provide @Optional with appropriate default values.

```java
// ✅ GOOD: Meaningful defaults
@Test
@Parameters({"browser", "env", "headless"})
public void setupTest(
    @Optional("chrome") String browser,
    @Optional("QA") String env,
    @Optional("false") String headless
) {
    // Runs with defaults if parameters not provided
}
```

### 4. Include Expected Results in DataProvider
**Why**: Makes data-driven tests more comprehensive by including expected outcomes.
**How**: Add expected result as last column in DataProvider.

```java
// ✅ GOOD: DataProvider with expected results
@DataProvider(name = "loginTestData")
public static Object[][] getLoginTestData() {
    return new Object[][] {
        // username, password, shouldSucceed
        {"valid@example.com", "ValidPass123", true},
        {"invalid@example.com", "WrongPass", false},
        {"", "password", false},
        {"user@example.com", "", false}
    };
}

@Test(dataProvider = "loginTestData")
public void testLogin(String username, String password, boolean shouldSucceed) {
    driver.get("https://example.com/login");
    // Login logic

    if (shouldSucceed) {
        Assert.assertTrue(driver.getCurrentUrl().contains("dashboard"));
    } else {
        Assert.assertTrue(driver.findElement(By.className("error")).isDisplayed());
    }
}
```

### 5. Use Method-Based DataProvider for Dynamic Data
**Why**: Allows DataProvider to return different data based on test method.
**How**: Use Method parameter in DataProvider to check calling method name.

```java
// ✅ GOOD: Dynamic DataProvider based on method
@DataProvider(name = "dynamicData")
public Object[][] getDynamicData(Method method) {
    if (method.getName().equals("testLogin")) {
        return new Object[][] {
            {"admin", "admin123"},
            {"user", "user123"}
        };
    } else if (method.getName().equals("testSearch")) {
        return new Object[][] {
            {"Selenium"},
            {"TestNG"}
        };
    }
    return new Object[][] {{}};
}
```

### 6. Externalize Test Data to Files
**Why**: Separates test data from test logic, making it easier to manage and update.
**How**: Read data from Excel, CSV, or JSON files in DataProvider.

```java
// ✅ GOOD: Reading from external file
@DataProvider(name = "excelData")
public Object[][] getExcelData() {
    String filePath = "src/test/resources/testdata.xlsx";
    String sheetName = "LoginData";
    return ExcelUtils.getExcelData(filePath, sheetName);
}

@Test(dataProvider = "excelData")
public void testWithExcelData(String username, String password, String expectedResult) {
    // Test logic
}
```

### 7. Use Parallel DataProvider for Performance
**Why**: Reduces test execution time by running data sets concurrently.
**How**: Set parallel=true in DataProvider annotation.

```java
// ✅ GOOD: Parallel DataProvider
@DataProvider(name = "parallelData", parallel = true)
public Object[][] getParallelData() {
    return new Object[][] {
        {"Data1"},
        {"Data2"},
        {"Data3"},
        {"Data4"}
    };
}

@Test(dataProvider = "parallelData")
public void testParallel(String data) {
    System.out.println("Thread: " + Thread.currentThread().getId() + " - " + data);
    // Test logic
}
```

---

## 15. Practice Exercises

### Exercise 1: Multi-Browser Login Test with @Parameters (20 minutes)

**Objective:** Use @Parameters to test login functionality across different browsers.

**Scenario:** You need to verify that the login feature works consistently across Chrome, Firefox, and Edge browsers.

**Requirements:**
1. Create a test method that accepts browser and URL as parameters
2. Create a testng.xml file with three separate tests for Chrome, Firefox, and Edge
3. Each test should navigate to a login page and verify the page title
4. Use @Optional to provide default values for browser and URL

**Code Template:**
```java
public class BrowserLoginTest {

    @Test
    @Parameters({"browser", "url"})
    public void testLoginPageOnBrowser(String browser, String url) {
        // Your implementation here
    }
}
```

**Expected Outcome:**
- Test runs three times, once for each browser
- Each test creates the appropriate browser instance
- Page title is verified in each browser
- Console output shows which browser is being tested

**Solution Approach:**
1. Create a switch statement to handle different browser types
2. Initialize WebDriver based on the browser parameter
3. Navigate to the URL and capture the page title
4. Use assertions to verify the title
5. Remember to quit the driver after the test
6. In testng.xml, create three `<test>` tags with different browser parameters

**Common Mistakes to Avoid:**
- Forgetting to quit the driver (causes resource leaks)
- Not handling unsupported browser types
- Missing @Optional annotation (causes errors when parameters not provided)
- Not maximizing the browser window (affects element visibility)

---

### Exercise 2: Search Functionality with Basic DataProvider (25 minutes)

**Objective:** Implement data-driven testing for a search feature using @DataProvider.

**Scenario:** You need to test the search functionality with multiple search terms to ensure it returns results for various inputs.

**Requirements:**
1. Create a DataProvider that returns 5 different search keywords
2. Create a test method that accepts a search keyword parameter
3. The test should search for each keyword on a search page
4. Verify that search results are displayed for each keyword
5. Print the number of results found for each search

**Code Template:**
```java
public class SearchDataProviderTest {

    @DataProvider(name = "searchKeywords")
    public Object[][] getSearchKeywords() {
        // Return 2D array with search keywords
    }

    @Test(dataProvider = "searchKeywords")
    public void testSearch(String keyword) {
        // Your implementation here
    }
}
```

**Expected Outcome:**
- Test executes 5 times with different keywords
- Each execution searches for a different keyword
- Results count is displayed for each search
- All searches complete successfully

**Solution Approach:**
1. Create a 2D Object array in the DataProvider with keywords
2. Initialize WebDriver in @BeforeMethod
3. Navigate to the search page
4. Enter the keyword in search box and click search
5. Count the number of result elements displayed
6. Use assertions to verify results are present
7. Quit driver in @AfterMethod

**Common Mistakes to Avoid:**
- Incorrect DataProvider return type (must be Object[][])
- Forgetting to name the DataProvider
- Not matching DataProvider name in @Test annotation
- Not handling cases where search returns no results
- Hardcoding wait times instead of using WebDriverWait

---

### Exercise 3: User Registration with Multiple Data Types (30 minutes)

**Objective:** Create a data-driven test that handles different data types using DataProvider.

**Scenario:** You need to test user registration with various combinations of user data including name, age, email, and active status.

**Requirements:**
1. Create a DataProvider that returns mixed data types (String, int, boolean)
2. Create at least 4 test data sets with different user profiles
3. Implement a registration test that accepts all parameters
4. Validate that appropriate users are registered successfully
5. Use assertions to verify registration based on data provided

**Code Template:**
```java
public class UserRegistrationTest {

    @DataProvider(name = "userData")
    public Object[][] getUserData() {
        return new Object[][] {
            // name, age, email, isActive
            {"John Doe", 25, "john@example.com", true},
            // Add 3 more data sets
        };
    }

    @Test(dataProvider = "userData")
    public void testUserRegistration(String name, int age, String email, boolean isActive) {
        // Your implementation here
    }
}
```

**Expected Outcome:**
- Test runs 4 times with different user data
- Each user profile is tested for registration
- Active users should register successfully
- Test output shows which user is being processed
- All data types are handled correctly

**Solution Approach:**
1. Create the DataProvider with 4 different user profiles
2. Mix valid and edge case data (e.g., minimum age, special characters in name)
3. In the test method, fill out registration form fields
4. Handle the isActive flag to determine expected behavior
5. Verify registration success or failure based on the data
6. Use soft assertions if you want to continue testing even after failures
7. Log meaningful messages for each test iteration

**Common Mistakes to Avoid:**
- Mismatching parameter types between DataProvider and test method
- Not considering edge cases (empty strings, null values)
- Forgetting to clear form fields between test iterations
- Not validating the data before using it
- Hardcoding expected results instead of deriving them from input data

---

### Exercise 4: External DataProvider for Login Credentials (35 minutes)

**Objective:** Organize test data by creating a separate DataProvider class and using it across multiple test classes.

**Scenario:** Your team needs to reuse login credentials across multiple test classes. Create a centralized DataProvider that can be shared.

**Requirements:**
1. Create a separate class called `TestDataProviders` with login data
2. Make the DataProvider method static
3. Create two test classes that use the external DataProvider
4. First test class: LoginTest (test valid and invalid logins)
5. Second test class: LoginSecurityTest (test security aspects of login)
6. Both tests should use the same DataProvider using `dataProviderClass` attribute

**Code Template:**
```java
// TestDataProviders.java
public class TestDataProviders {

    @DataProvider(name = "loginCredentials")
    public static Object[][] getLoginCredentials() {
        // Return login data with username, password, shouldSucceed
    }
}

// LoginTest.java
public class LoginTest {

    @Test(dataProvider = "loginCredentials", dataProviderClass = TestDataProviders.class)
    public void testLogin(String username, String password, boolean shouldSucceed) {
        // Your implementation here
    }
}
```

**Expected Outcome:**
- DataProvider class is in a separate package/folder
- Multiple test classes successfully use the external DataProvider
- No code duplication for test data
- Each test class can focus on its specific testing concerns
- Easy to update test data in one central location

**Solution Approach:**
1. Create a new package `dataproviders`
2. Create `TestDataProviders` class with static DataProvider method
3. Include data for valid users, invalid users, empty credentials, SQL injection attempts
4. In test classes, use `dataProviderClass = TestDataProviders.class`
5. Implement login logic in each test class
6. Use assertions appropriate to each test's purpose
7. Add proper logging to track which credentials are being tested

**Common Mistakes to Avoid:**
- Forgetting to make DataProvider method static (causes runtime error)
- Not specifying the correct dataProviderClass in @Test annotation
- Incorrect package imports for the DataProvider class
- Creating instance methods instead of static methods
- Not maintaining consistent data structure across different uses

---

### Exercise 5: Form Validation with DataProvider and Selenium (40 minutes)

**Objective:** Create a comprehensive form validation test using DataProvider with real Selenium interactions.

**Scenario:** You need to test a contact form that has Name, Email, Phone, and Message fields with various valid and invalid inputs.

**Requirements:**
1. Create a DataProvider with 6-7 test cases covering:
   - Valid complete form submission
   - Invalid email formats
   - Missing required fields
   - Phone number with invalid format
   - Message exceeding character limit
2. Implement form interaction with Selenium
3. Verify appropriate error messages for invalid inputs
4. Verify successful submission for valid inputs
5. Use WebDriverWait for dynamic elements

**Code Template:**
```java
public class FormValidationTest {
    WebDriver driver;

    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

    @DataProvider(name = "formData")
    public Object[][] getFormData() {
        return new Object[][] {
            // name, email, phone, message, shouldSucceed, expectedError
            {"John Doe", "john@example.com", "1234567890", "Hello", true, ""},
            // Add 5-6 more test cases
        };
    }

    @Test(dataProvider = "formData")
    public void testContactForm(String name, String email, String phone,
                                 String message, boolean shouldSucceed, String expectedError) {
        // Your implementation here
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
- All 6-7 test cases execute successfully
- Form is filled correctly for each test case
- Error messages are validated for invalid inputs
- Success message is verified for valid submission
- Clean browser session for each test iteration

**Solution Approach:**
1. Create comprehensive test data covering positive and negative scenarios
2. Navigate to the form page in the test method
3. Clear and fill each form field with the provided data
4. Click the submit button
5. Use WebDriverWait to wait for either error messages or success message
6. Verify the outcome matches the expected result (shouldSucceed flag)
7. If shouldSucceed is false, verify the specific error message appears
8. Take screenshots on failure (bonus)

**Common Mistakes to Avoid:**
- Not clearing form fields before entering new data (causes data accumulation)
- Using Thread.sleep instead of WebDriverWait (makes tests flaky)
- Not handling stale element exceptions
- Forgetting to reset the page between test iterations
- Not verifying all error messages, only success cases
- Hardcoding wait times that may not work in all environments
- Not checking if elements are visible before interacting with them

---

### Exercise 6: Excel DataProvider Integration (Advanced - 45 minutes)

**Objective:** Integrate Excel files for test data management and create a reusable Excel utility.

**Scenario:** Your team wants to maintain test data in Excel files that non-technical team members can update. Create an Excel reader and use it with DataProvider.

**Requirements:**
1. Add Apache POI dependencies to your project
2. Create an ExcelUtils class with methods to read Excel data
3. Create an Excel file with login test data (Username, Password, Expected Result)
4. Create a DataProvider that reads from the Excel file
5. Implement a test that uses the Excel-based DataProvider
6. Handle different cell types (String, Numeric, Boolean)

**Code Template:**
```java
// ExcelUtils.java
public class ExcelUtils {

    public static Object[][] getExcelData(String filePath, String sheetName) {
        // Your implementation here
        // Read Excel file and return as Object[][]
    }

    private static String getCellValue(Cell cell) {
        // Handle different cell types
    }
}

// ExcelDataTest.java
public class ExcelDataTest {

    @DataProvider(name = "excelData")
    public Object[][] getExcelData() {
        String filePath = "src/test/resources/testdata.xlsx";
        return ExcelUtils.getExcelData(filePath, "LoginData");
    }

    @Test(dataProvider = "excelData")
    public void testWithExcelData(String username, String password, String expectedResult) {
        // Your implementation here
    }
}
```

**Expected Outcome:**
- Excel file is successfully read
- All rows from Excel are converted to test data
- Test executes for each row in the Excel sheet
- Different cell types (text, numbers) are handled correctly
- Easy to add new test cases by just adding rows to Excel

**Solution Approach:**
1. Add Apache POI dependencies to pom.xml or build.gradle
2. Create testdata.xlsx in src/test/resources with appropriate columns
3. Implement ExcelUtils.getExcelData() method:
   - Open the file using FileInputStream
   - Create Workbook and get Sheet by name
   - Calculate number of rows and columns
   - Iterate through rows and cells
   - Convert each row to an Object array
   - Return as 2D Object array
4. Implement getCellValue() to handle STRING, NUMERIC, BOOLEAN, FORMULA types
5. Create the test method to use the data
6. Add error handling for file not found or sheet not found

**Common Mistakes to Avoid:**
- Forgetting to add Apache POI dependencies (causes ClassNotFoundException)
- Not handling the header row in Excel (skipping first row)
- Incorrect file path (use relative paths from project root)
- Not closing FileInputStream and Workbook (resource leak)
- Not handling empty cells (causes NullPointerException)
- Forgetting to convert numeric values to appropriate types
- Not handling date cells correctly
- Hardcoding row/column numbers instead of dynamically calculating them

---

## 15. Key Takeaways

1. **@Parameters** passes data from testng.xml
2. **@DataProvider** provides data programmatically
3. **DataProvider returns 2D Object array**
4. **Multiple data sets** run test multiple times
5. **External DataProvider** uses dataProviderClass attribute
6. **Excel integration** enables large-scale data-driven testing
7. **Parallel DataProvider** runs data sets concurrently
8. **Optional parameters** provide default values
9. **Method-based DataProvider** provides dynamic data
10. **Separate data from tests** for maintainability

---

## 16. Common Interview Questions

1. What is parameterization in TestNG?
2. What's the difference between @Parameters and @DataProvider?
3. How do you pass parameters from testng.xml?
4. What does DataProvider return?
5. How do you use DataProvider from another class?
6. How do you read test data from Excel?
7. Can DataProvider run in parallel?
8. How do you handle optional parameters?
9. What are the advantages of data-driven testing?
10. How do you select specific data sets using indices?

---

## Navigation

- **Previous:** [Day 18: TestNG Part 1](./day18_testng_part1.md)
- **Next:** [Day 20: TestNG Part 3](./day20_testng_part3.md)
- **Week 3 Home:** [Week 3 Overview](./README.md)
- **Course Home:** [Selenium Course Overview](../README.md)

---

**Happy Learning!** Data-driven testing with TestNG enables comprehensive test coverage with minimal code.
