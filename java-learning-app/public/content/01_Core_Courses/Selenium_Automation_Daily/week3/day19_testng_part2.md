# Day 31: TestNG Part 2 - Parameters & Data Providers

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

- **Previous:** [Day 30: TestNG Part 1](./day30_testng_part1.md)
- **Next:** [Day 32: TestNG Part 3](./day32_testng_part3.md)
- **Week 5 Home:** [Week 5 Overview](./README.md)

---

**Happy Learning!** Data-driven testing with TestNG enables comprehensive test coverage with minimal code.
