# Day 26: Excel Data Reading & Data-Driven Testing

## Learning Objectives

By the end of this lesson, you will be able to:
- Understand the importance of Excel in test automation
- Set up Apache POI library for Excel operations
- Read data from Excel files (.xlsx and .xls)
- Write data to Excel files
- Create an Excel utility class for reusability
- Implement data-driven testing with Excel
- Use TestNG DataProvider with Excel data
- Handle different data types in Excel
- Manage multiple sheets in Excel workbooks
- Apply best practices for Excel-based testing

---

## Table of Contents

1. [Introduction to Excel in Test Automation](#1-introduction-to-excel-in-test-automation)
2. [Apache POI Library Setup](#2-apache-poi-library-setup)
3. [Reading Excel Files](#3-reading-excel-files)
4. [Writing to Excel Files](#4-writing-to-excel-files)
5. [Excel Utility Class](#5-excel-utility-class)
6. [Data-Driven Testing with Excel](#6-data-driven-testing-with-excel)
7. [TestNG DataProvider with Excel](#7-testng-dataprovider-with-excel)
8. [Handling Different Data Types](#8-handling-different-data-types)
9. [Best Practices](#9-best-practices)
10. [Complete Examples](#10-complete-examples)
11. [Practical Exercises](#11-practical-exercises)
12. [Key Takeaways](#12-key-takeaways)
13. [Interview Questions](#13-interview-questions)

---

## 1. Introduction to Excel in Test Automation

### Why Use Excel for Test Data?

```java
package concepts;

public class ExcelInTestAutomation {
    
    /*
     * Benefits of Using Excel:
     * 
     * 1. Familiar Format
     *    - Non-technical users can manage test data
     *    - Business analysts can contribute
     *    - Easy to understand and edit
     * 
     * 2. Structured Data
     *    - Tabular format perfect for test cases
     *    - Multiple sheets for organization
     *    - Support for formulas and calculations
     * 
     * 3. Large Data Sets
     *    - Handle thousands of test cases
     *    - Efficient data management
     *    - Easy to filter and sort
     * 
     * 4. Data-Driven Testing
     *    - Separate test logic from test data
     *    - Run same test with multiple data sets
     *    - Easy to add new test scenarios
     * 
     * 5. Reporting
     *    - Write test results back to Excel
     *    - Generate reports in familiar format
     *    - Easy to share with stakeholders
     */
}
```

### Excel File Formats

- **`.xlsx`** - Excel 2007 and later (XML-based)
- **`.xls`** - Excel 97-2003 (Binary format)

---

## 2. Apache POI Library Setup

### Maven Dependencies

Add to `pom.xml`:

```xml
<dependencies>
    <!-- Apache POI for Excel operations -->
    <dependency>
        <groupId>org.apache.poi</groupId>
        <artifactId>poi</artifactId>
        <version>5.2.5</version>
    </dependency>
    
    <!-- Apache POI OOXML for .xlsx files -->
    <dependency>
        <groupId>org.apache.poi</groupId>
        <artifactId>poi-ooxml</artifactId>
        <version>5.2.5</version>
    </dependency>
    
    <!-- TestNG for data-driven testing -->
    <dependency>
        <groupId>org.testng</groupId>
        <artifactId>testng</artifactId>
        <version>7.8.0</version>
    </dependency>
</dependencies>
```

### Key Apache POI Classes

```java
package concepts;

public class ApachePOIClasses {
    
    /*
     * Important Classes:
     * 
     * Workbook Interfaces:
     * - Workbook: Interface for Excel workbook
     * - XSSFWorkbook: For .xlsx files (Excel 2007+)
     * - HSSFWorkbook: For .xls files (Excel 97-2003)
     * 
     * Sheet Classes:
     * - Sheet: Interface for worksheet
     * - XSSFSheet: .xlsx sheet implementation
     * - HSSFSheet: .xls sheet implementation
     * 
     * Row and Cell:
     * - Row: Represents a row in sheet
     * - Cell: Represents a cell in row
     * 
     * Cell Types:
     * - CellType.STRING
     * - CellType.NUMERIC
     * - CellType.BOOLEAN
     * - CellType.FORMULA
     * - CellType.BLANK
     */
}
```

---

## 3. Reading Excel Files

### Basic Excel Reading

```java
package utils;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileInputStream;
import java.io.IOException;

public class BasicExcelReader {
    
    /**
     * Read Excel file and print all data
     */
    public static void readExcelFile(String filePath) {
        try {
            // Open Excel file
            FileInputStream fis = new FileInputStream(filePath);
            
            // Create workbook instance
            Workbook workbook = new XSSFWorkbook(fis);
            
            // Get first sheet
            Sheet sheet = workbook.getSheetAt(0);
            
            // Iterate through rows
            for (Row row : sheet) {
                // Iterate through cells
                for (Cell cell : row) {
                    // Print cell value based on type
                    switch (cell.getCellType()) {
                        case STRING:
                            System.out.print(cell.getStringCellValue() + "\t");
                            break;
                        case NUMERIC:
                            System.out.print(cell.getNumericCellValue() + "\t");
                            break;
                        case BOOLEAN:
                            System.out.print(cell.getBooleanCellValue() + "\t");
                            break;
                        default:
                            System.out.print(" \t");
                    }
                }
                System.out.println();
            }
            
            // Close resources
            workbook.close();
            fis.close();
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    /**
     * Read specific cell value
     */
    public static String getCellValue(String filePath, String sheetName, 
                                     int rowNum, int colNum) {
        try {
            FileInputStream fis = new FileInputStream(filePath);
            Workbook workbook = new XSSFWorkbook(fis);
            Sheet sheet = workbook.getSheet(sheetName);
            
            Row row = sheet.getRow(rowNum);
            Cell cell = row.getCell(colNum);
            
            String value = cell.getStringCellValue();
            
            workbook.close();
            fis.close();
            
            return value;
            
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
    
    /**
     * Get row count
     */
    public static int getRowCount(String filePath, String sheetName) {
        try {
            FileInputStream fis = new FileInputStream(filePath);
            Workbook workbook = new XSSFWorkbook(fis);
            Sheet sheet = workbook.getSheet(sheetName);
            
            int rowCount = sheet.getLastRowNum() + 1;
            
            workbook.close();
            fis.close();
            
            return rowCount;
            
        } catch (IOException e) {
            e.printStackTrace();
            return 0;
        }
    }
    
    /**
     * Get column count
     */
    public static int getColumnCount(String filePath, String sheetName) {
        try {
            FileInputStream fis = new FileInputStream(filePath);
            Workbook workbook = new XSSFWorkbook(fis);
            Sheet sheet = workbook.getSheet(sheetName);
            
            Row row = sheet.getRow(0);
            int colCount = row.getLastCellNum();
            
            workbook.close();
            fis.close();
            
            return colCount;
            
        } catch (IOException e) {
            e.printStackTrace();
            return 0;
        }
    }
}
```

### Reading All Data into Array

```java
package utils;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileInputStream;
import java.io.IOException;

public class ExcelToArrayReader {
    
    /**
     * Read all data from sheet into 2D array
     */
    public static Object[][] getExcelData(String filePath, String sheetName) {
        Object[][] data = null;
        
        try {
            FileInputStream fis = new FileInputStream(filePath);
            Workbook workbook = new XSSFWorkbook(fis);
            Sheet sheet = workbook.getSheet(sheetName);
            
            int rowCount = sheet.getLastRowNum();
            int colCount = sheet.getRow(0).getLastCellNum();
            
            // Initialize array (excluding header row)
            data = new Object[rowCount][colCount];
            
            // Read data starting from row 1 (skip header)
            for (int i = 1; i <= rowCount; i++) {
                Row row = sheet.getRow(i);
                for (int j = 0; j < colCount; j++) {
                    Cell cell = row.getCell(j);
                    data[i-1][j] = getCellValueAsString(cell);
                }
            }
            
            workbook.close();
            fis.close();
            
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        return data;
    }
    
    /**
     * Get cell value as string regardless of type
     */
    private static String getCellValueAsString(Cell cell) {
        if (cell == null) {
            return "";
        }
        
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    return cell.getDateCellValue().toString();
                } else {
                    return String.valueOf(cell.getNumericCellValue());
                }
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

---

## 4. Writing to Excel Files

### Basic Excel Writing

```java
package utils;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileOutputStream;
import java.io.IOException;

public class BasicExcelWriter {
    
    /**
     * Create new Excel file with data
     */
    public static void createExcelFile(String filePath) {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("TestData");
        
        // Create header row
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("Test Case");
        headerRow.createCell(1).setCellValue("Username");
        headerRow.createCell(2).setCellValue("Password");
        headerRow.createCell(3).setCellValue("Expected Result");
        
        // Create data rows
        Row row1 = sheet.createRow(1);
        row1.createCell(0).setCellValue("TC001");
        row1.createCell(1).setCellValue("user1@test.com");
        row1.createCell(2).setCellValue("Pass@123");
        row1.createCell(3).setCellValue("Login Success");
        
        Row row2 = sheet.createRow(2);
        row2.createCell(0).setCellValue("TC002");
        row2.createCell(1).setCellValue("invalid@test.com");
        row2.createCell(2).setCellValue("wrong");
        row2.createCell(3).setCellValue("Login Failed");
        
        // Auto-size columns
        for (int i = 0; i < 4; i++) {
            sheet.autoSizeColumn(i);
        }
        
        // Write to file
        try {
            FileOutputStream fos = new FileOutputStream(filePath);
            workbook.write(fos);
            workbook.close();
            fos.close();
            System.out.println("Excel file created successfully!");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    /**
     * Write test results to Excel
     */
    public static void writeTestResult(String filePath, String sheetName,
                                      int rowNum, String result) {
        try {
            FileInputStream fis = new FileInputStream(filePath);
            Workbook workbook = new XSSFWorkbook(fis);
            Sheet sheet = workbook.getSheet(sheetName);
            
            Row row = sheet.getRow(rowNum);
            if (row == null) {
                row = sheet.createRow(rowNum);
            }
            
            // Write result in last column
            int lastCol = row.getLastCellNum();
            Cell cell = row.createCell(lastCol);
            cell.setCellValue(result);
            
            fis.close();
            
            // Write back to file
            FileOutputStream fos = new FileOutputStream(filePath);
            workbook.write(fos);
            workbook.close();
            fos.close();
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

---

## 5. Excel Utility Class

### Comprehensive Excel Utility

```java
package utils;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ExcelUtils {
    
    private String filePath;
    private Workbook workbook;
    private Sheet sheet;
    private FileInputStream fis;
    
    /**
     * Constructor - opens Excel file
     */
    public ExcelUtils(String filePath, String sheetName) {
        this.filePath = filePath;
        try {
            fis = new FileInputStream(filePath);
            workbook = new XSSFWorkbook(fis);
            sheet = workbook.getSheet(sheetName);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    /**
     * Get row count
     */
    public int getRowCount() {
        return sheet.getLastRowNum() + 1;
    }
    
    /**
     * Get column count
     */
    public int getColumnCount() {
        return sheet.getRow(0).getLastCellNum();
    }
    
    /**
     * Get cell data as string
     */
    public String getCellData(int rowNum, int colNum) {
        try {
            Cell cell = sheet.getRow(rowNum).getCell(colNum);
            return getCellValueAsString(cell);
        } catch (Exception e) {
            return "";
        }
    }
    
    /**
     * Set cell data
     */
    public void setCellData(int rowNum, int colNum, String value) {
        try {
            Row row = sheet.getRow(rowNum);
            if (row == null) {
                row = sheet.createRow(rowNum);
            }
            
            Cell cell = row.getCell(colNum);
            if (cell == null) {
                cell = row.createCell(colNum);
            }
            
            cell.setCellValue(value);
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    /**
     * Get all data as 2D array (excluding header)
     */
    public Object[][] getAllData() {
        int rowCount = getRowCount() - 1; // Exclude header
        int colCount = getColumnCount();
        
        Object[][] data = new Object[rowCount][colCount];
        
        for (int i = 1; i <= rowCount; i++) {
            for (int j = 0; j < colCount; j++) {
                data[i-1][j] = getCellData(i, j);
            }
        }
        
        return data;
    }
    
    /**
     * Get data as list of maps (column name -> value)
     */
    public List<Map<String, String>> getDataAsMapList() {
        List<Map<String, String>> dataList = new ArrayList<>();
        
        // Get headers
        Row headerRow = sheet.getRow(0);
        List<String> headers = new ArrayList<>();
        for (Cell cell : headerRow) {
            headers.add(cell.getStringCellValue());
        }
        
        // Get data rows
        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            Map<String, String> dataMap = new HashMap<>();
            
            for (int j = 0; j < headers.size(); j++) {
                String header = headers.get(j);
                String value = getCellData(i, j);
                dataMap.put(header, value);
            }
            
            dataList.add(dataMap);
        }
        
        return dataList;
    }
    
    /**
     * Get column data by column name
     */
    public List<String> getColumnData(String columnName) {
        List<String> columnData = new ArrayList<>();
        
        // Find column index
        Row headerRow = sheet.getRow(0);
        int colIndex = -1;
        for (int i = 0; i < headerRow.getLastCellNum(); i++) {
            if (headerRow.getCell(i).getStringCellValue().equals(columnName)) {
                colIndex = i;
                break;
            }
        }
        
        if (colIndex == -1) {
            throw new RuntimeException("Column not found: " + columnName);
        }
        
        // Get column data
        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            columnData.add(getCellData(i, colIndex));
        }
        
        return columnData;
    }
    
    /**
     * Get cell value as string
     */
    private String getCellValueAsString(Cell cell) {
        if (cell == null) {
            return "";
        }
        
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    return cell.getDateCellValue().toString();
                } else {
                    // Remove decimal for whole numbers
                    double numValue = cell.getNumericCellValue();
                    if (numValue == (long) numValue) {
                        return String.valueOf((long) numValue);
                    } else {
                        return String.valueOf(numValue);
                    }
                }
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            case FORMULA:
                return cell.getCellFormula();
            case BLANK:
                return "";
            default:
                return "";
        }
    }
    
    /**
     * Save and close workbook
     */
    public void saveAndClose() {
        try {
            fis.close();
            FileOutputStream fos = new FileOutputStream(filePath);
            workbook.write(fos);
            workbook.close();
            fos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    /**
     * Close without saving
     */
    public void close() {
        try {
            if (fis != null) fis.close();
            if (workbook != null) workbook.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

---

## 6. Data-Driven Testing with Excel

### Sample Excel File Structure

**LoginTestData.xlsx - Sheet: "LoginTests"**

| TestCase | Username | Password | ExpectedResult | Status |
|----------|----------|----------|----------------|--------|
| TC001 | user@test.com | Pass@123 | Login Success | |
| TC002 | invalid@test.com | wrong | Login Failed | |
| TC003 | | Pass@123 | Error: Required | |
| TC004 | user@test.com | | Error: Required | |

### Data-Driven Test Example

```java
package tests;

import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import utils.ExcelUtils;

public class DataDrivenLoginTest {
    
    private ExcelUtils excel;
    private String excelPath = "src/test/resources/testdata/LoginTestData.xlsx";
    
    @BeforeClass
    public void setup() {
        excel = new ExcelUtils(excelPath, "LoginTests");
    }
    
    @Test
    public void testLoginWithExcelData() {
        int rowCount = excel.getRowCount();
        
        // Start from row 1 (skip header)
        for (int i = 1; i < rowCount; i++) {
            String testCase = excel.getCellData(i, 0);
            String username = excel.getCellData(i, 1);
            String password = excel.getCellData(i, 2);
            String expectedResult = excel.getCellData(i, 3);
            
            System.out.println("Executing: " + testCase);
            
            // Perform login
            loginPage.login(username, password);
            
            // Verify result
            String actualResult;
            if (homePage.isLoggedIn()) {
                actualResult = "Login Success";
            } else {
                actualResult = loginPage.getErrorMessage();
            }
            
            // Write result back to Excel
            excel.setCellData(i, 4, actualResult);
            
            // Assert
            Assert.assertEquals(actualResult, expectedResult, 
                "Test case " + testCase + " failed");
        }
    }
    
    @AfterClass
    public void teardown() {
        excel.saveAndClose();
    }
}
```

---

## 7. TestNG DataProvider with Excel

### DataProvider Method

```java
package dataproviders;

import org.testng.annotations.DataProvider;
import utils.ExcelUtils;

public class ExcelDataProvider {
    
    /**
     * DataProvider that reads from Excel
     */
    @DataProvider(name = "loginData")
    public Object[][] getLoginData() {
        String excelPath = "src/test/resources/testdata/LoginTestData.xlsx";
        ExcelUtils excel = new ExcelUtils(excelPath, "LoginTests");
        
        Object[][] data = excel.getAllData();
        excel.close();
        
        return data;
    }
    
    /**
     * Generic DataProvider
     */
    @DataProvider(name = "excelData")
    public Object[][] getExcelData(String filePath, String sheetName) {
        ExcelUtils excel = new ExcelUtils(filePath, sheetName);
        Object[][] data = excel.getAllData();
        excel.close();
        return data;
    }
}
```

### Using DataProvider in Tests

```java
package tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import dataproviders.ExcelDataProvider;

public class LoginTestWithDataProvider {
    
    @Test(dataProvider = "loginData", dataProviderClass = ExcelDataProvider.class)
    public void testLogin(String testCase, String username, String password, 
                         String expectedResult) {
        
        System.out.println("Executing: " + testCase);
        
        // Perform login
        loginPage.login(username, password);
        
        // Verify result
        String actualResult;
        if (homePage.isLoggedIn()) {
            actualResult = "Login Success";
        } else {
            actualResult = loginPage.getErrorMessage();
        }
        
        // Assert
        Assert.assertEquals(actualResult, expectedResult);
    }
}
```

---

## 8. Handling Different Data Types

### Reading Different Cell Types

```java
package utils;

import org.apache.poi.ss.usermodel.*;

public class CellTypeHandler {
    
    /**
     * Get cell value based on type
     */
    public static Object getCellValue(Cell cell) {
        if (cell == null) {
            return null;
        }
        
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
                
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    return cell.getDateCellValue();
                } else {
                    return cell.getNumericCellValue();
                }
                
            case BOOLEAN:
                return cell.getBooleanCellValue();
                
            case FORMULA:
                // Evaluate formula and return result
                FormulaEvaluator evaluator = cell.getSheet()
                    .getWorkbook()
                    .getCreationHelper()
                    .createFormulaEvaluator();
                CellValue cellValue = evaluator.evaluate(cell);
                
                switch (cellValue.getCellType()) {
                    case STRING:
                        return cellValue.getStringValue();
                    case NUMERIC:
                        return cellValue.getNumberValue();
                    case BOOLEAN:
                        return cellValue.getBooleanValue();
                    default:
                        return null;
                }
                
            case BLANK:
                return "";
                
            default:
                return null;
        }
    }
}
```

---

## 9. Best Practices

### 1. File Organization

```
project/
├── src/test/resources/
│   └── testdata/
│       ├── LoginTestData.xlsx
│       ├── ProductTestData.xlsx
│       └── CheckoutTestData.xlsx
```

### 2. Excel File Structure

```
Best Practices:
- Use first row for headers
- Use meaningful column names
- Keep data consistent in columns
- Use separate sheets for different test types
- Include TestCase ID column
- Add Status/Result column for reporting
```

### 3. Error Handling

```java
public class SafeExcelUtils {
    
    public static String getCellDataSafely(ExcelUtils excel, int row, int col) {
        try {
            return excel.getCellData(row, col);
        } catch (Exception e) {
            System.out.println("Error reading cell [" + row + "," + col + "]: " + e.getMessage());
            return "";
        }
    }
}
```

---

## 11. Practical Exercises

---

### Exercise 1: Build Basic Excel Reader (25 min)

**Objective:** Create a foundational Excel reading utility to read data from Excel files.

**Scenario:** Your team stores test data in Excel files. Build a basic ExcelReader class that can read different data types from Excel sheets.

**Requirements:**
1. Set up Apache POI Maven dependencies
2. Create `ExcelReader` class with basic read methods
3. Implement getCellData(), getRowCount(), getColumnCount()
4. Handle different cell types (String, Numeric, Boolean)
5. Create sample Excel file with test data
6. Write tests to verify reading functionality

**Code Template:**

```java
// TODO 1: Add Maven dependencies to pom.xml
<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi</artifactId>
    <version>5.2.5</version>
</dependency>
<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi-ooxml</artifactId>
    <version>5.2.5</version>
</dependency>

// TODO 2: Create sample Excel file
// Create TestData.xlsx with sheet "LoginTests"
// Columns: TestCase | Username | Password | Expected Result
// Row 1: TC001 | user@test.com | Pass@123 | Login Success
// Row 2: TC002 | invalid | wrong | Login Failed

// TODO 3: Implement ExcelReader class
package utils;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import java.io.FileInputStream;
import java.io.IOException;

public class ExcelReader {

    private String filePath;
    private Workbook workbook;
    private Sheet sheet;

    // TODO 4: Implement constructor
    public ExcelReader(String filePath, String sheetName) {
        this.filePath = filePath;
        try {
            FileInputStream fis = new FileInputStream(filePath);
            workbook = new XSSFWorkbook(fis);
            sheet = workbook.getSheet(sheetName);
            fis.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // TODO 5: Implement getRowCount()
    public int getRowCount() {
        // Your code here
        return 0;
    }

    // TODO 6: Implement getColumnCount()
    public int getColumnCount() {
        // Your code here
        return 0;
    }

    // TODO 7: Implement getCellData()
    public String getCellData(int rowNum, int colNum) {
        try {
            Cell cell = sheet.getRow(rowNum).getCell(colNum);
            return getCellValueAsString(cell);
        } catch (Exception e) {
            return "";
        }
    }

    // TODO 8: Implement getCellValueAsString()
    private String getCellValueAsString(Cell cell) {
        if (cell == null) {
            return "";
        }

        switch (cell.getCellType()) {
            case STRING:
                // Your code here
                return "";
            case NUMERIC:
                // Handle both numbers and dates
                // Your code here
                return "";
            case BOOLEAN:
                // Your code here
                return "";
            default:
                return "";
        }
    }

    // TODO 9: Implement close()
    public void close() {
        try {
            if (workbook != null) {
                workbook.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

**Test Class:**

```java
package tests;

import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import utils.ExcelReader;

public class ExcelReaderTest {

    private ExcelReader excelReader;
    private String excelPath = "src/test/resources/testdata/TestData.xlsx";

    @BeforeClass
    public void setup() {
        excelReader = new ExcelReader(excelPath, "LoginTests");
    }

    @Test
    public void testReadExcelData() {
        // TODO: Test reading cell data
        String testCase = excelReader.getCellData(1, 0);
        String username = excelReader.getCellData(1, 1);

        Assert.assertEquals(testCase, "TC001");
        Assert.assertNotNull(username);
    }

    @Test
    public void testRowAndColumnCount() {
        // TODO: Test row and column counts
        int rowCount = excelReader.getRowCount();
        int colCount = excelReader.getColumnCount();

        Assert.assertTrue(rowCount > 0);
        Assert.assertTrue(colCount > 0);
    }

    @AfterClass
    public void teardown() {
        excelReader.close();
    }
}
```

**Expected Outcome:**
- Successfully read Excel file data
- Handle different cell types correctly
- Get accurate row and column counts
- Tests verify Excel reading functionality
- Proper resource management with close()

**Common Mistakes to Avoid:**
- Not closing workbook after use
- Not handling null cells
- Forgetting to handle different cell types
- Using wrong row/column indices (0-based)
- Not handling IOException properly

---

### Exercise 2: Create Comprehensive ExcelUtils Class (35 min)

**Objective:** Build a reusable ExcelUtils class with advanced Excel operations for framework use.

**Scenario:** Your framework needs a comprehensive utility for Excel operations including reading, writing, and data conversion. Create ExcelUtils with multiple useful methods.

**Requirements:**
1. Create ExcelUtils class with constructor
2. Implement getAllData() to return 2D array
3. Implement getDataAsMapList() for named columns
4. Add setCellData() for writing results
5. Implement getColumnData() by column name
6. Add saveAndClose() method
7. Write comprehensive tests

**Code Template:**

```java
package utils;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ExcelUtils {

    private String filePath;
    private Workbook workbook;
    private Sheet sheet;
    private FileInputStream fis;

    public ExcelUtils(String filePath, String sheetName) {
        this.filePath = filePath;
        try {
            fis = new FileInputStream(filePath);
            workbook = new XSSFWorkbook(fis);
            sheet = workbook.getSheet(sheetName);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // TODO 1: Implement getAllData() - returns 2D array excluding header
    public Object[][] getAllData() {
        int rowCount = getRowCount() - 1; // Exclude header
        int colCount = getColumnCount();

        Object[][] data = new Object[rowCount][colCount];

        // TODO: Fill the array with data (start from row 1)
        // Your code here

        return data;
    }

    // TODO 2: Implement getDataAsMapList() - returns List of Maps
    public List<Map<String, String>> getDataAsMapList() {
        List<Map<String, String>> dataList = new ArrayList<>();

        // TODO: Get headers from row 0
        Row headerRow = sheet.getRow(0);
        List<String> headers = new ArrayList<>();
        // Your code here

        // TODO: Get data rows and create maps
        // Your code here

        return dataList;
    }

    // TODO 3: Implement setCellData() for writing
    public void setCellData(int rowNum, int colNum, String value) {
        try {
            Row row = sheet.getRow(rowNum);
            if (row == null) {
                row = sheet.createRow(rowNum);
            }

            Cell cell = row.getCell(colNum);
            if (cell == null) {
                cell = row.createCell(colNum);
            }

            // Your code here
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // TODO 4: Implement getColumnData() by column name
    public List<String> getColumnData(String columnName) {
        List<String> columnData = new ArrayList<>();

        // Find column index by name
        Row headerRow = sheet.getRow(0);
        int colIndex = -1;

        // TODO: Find column index
        // Your code here

        if (colIndex == -1) {
            throw new RuntimeException("Column not found: " + columnName);
        }

        // TODO: Get all data from this column
        // Your code here

        return columnData;
    }

    // Helper methods
    public int getRowCount() {
        return sheet.getLastRowNum() + 1;
    }

    public int getColumnCount() {
        return sheet.getRow(0).getLastCellNum();
    }

    public String getCellData(int rowNum, int colNum) {
        try {
            Cell cell = sheet.getRow(rowNum).getCell(colNum);
            return getCellValueAsString(cell);
        } catch (Exception e) {
            return "";
        }
    }

    private String getCellValueAsString(Cell cell) {
        // TODO: Implement cell value conversion
        return "";
    }

    // TODO 5: Implement saveAndClose()
    public void saveAndClose() {
        try {
            // Close input stream
            // Write to file
            // Close workbook
            // Your code here
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void close() {
        try {
            if (fis != null) fis.close();
            if (workbook != null) workbook.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

**Expected Outcome:**
- Comprehensive Excel utility with multiple methods
- Data returned in various formats (array, map list)
- Writing capability for test results
- Column access by name
- All methods tested and working

**Common Mistakes to Avoid:**
- Not handling row/cell creation for writing
- Forgetting to save before closing
- Not handling missing columns gracefully
- Memory issues with large files
- Not cloning properties when returning

---

### Exercise 3: Implement Data-Driven Testing with Excel (40 min)

**Objective:** Create a complete data-driven test that reads test cases from Excel and writes results back.

**Scenario:** Your team wants to run login tests with multiple datasets from Excel. Implement a data-driven approach that reads test data, executes tests, and writes results back to Excel.

**Requirements:**
1. Create Excel file with comprehensive test data
2. Read test data in test method
3. Execute test for each data row
4. Write test results back to Excel
5. Handle pass/fail status
6. Generate summary report
7. Test with multiple scenarios

**Excel Structure:**

| TestCase | Username | Password | Expected Result | Actual Result | Status |
|----------|----------|----------|-----------------|---------------|--------|
| TC001 | user@test.com | Pass@123 | Login Success | | |
| TC002 | invalid@test.com | wrong | Login Failed | | |
| TC003 | | Pass@123 | Error: Required | | |
| TC004 | user@test.com | | Error: Required | | |

**Code Template:**

```java
package tests;

import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import utils.ExcelUtils;

public class DataDrivenLoginTest extends BaseTest {

    private ExcelUtils excel;
    private String excelPath = "src/test/resources/testdata/LoginTestData.xlsx";
    private int passCount = 0;
    private int failCount = 0;

    @BeforeClass
    public void setup() {
        super.setup();
        excel = new ExcelUtils(excelPath, "LoginTests");
    }

    @Test
    public void testLoginWithExcelData() {
        int rowCount = excel.getRowCount();

        // TODO: Iterate through all test data rows
        for (int i = 1; i < rowCount; i++) {
            // Read test data
            String testCase = excel.getCellData(i, 0);
            String username = excel.getCellData(i, 1);
            String password = excel.getCellData(i, 2);
            String expectedResult = excel.getCellData(i, 3);

            System.out.println("Executing: " + testCase);

            // TODO: Execute login
            // Your code here

            // TODO: Get actual result
            String actualResult = "";
            // Your code here

            // TODO: Write actual result to Excel
            excel.setCellData(i, 4, actualResult);

            // TODO: Determine pass/fail status
            String status = "";
            if (actualResult.equals(expectedResult)) {
                status = "PASS";
                passCount++;
            } else {
                status = "FAIL";
                failCount++;
            }

            // TODO: Write status to Excel
            excel.setCellData(i, 5, status);

            // TODO: Add assertion
            Assert.assertEquals(actualResult, expectedResult,
                "Test case " + testCase + " failed");
        }
    }

    @AfterClass
    public void teardown() {
        // TODO: Write summary
        System.out.println("===== Test Summary =====");
        System.out.println("Total: " + (passCount + failCount));
        System.out.println("Passed: " + passCount);
        System.out.println("Failed: " + failCount);
        System.out.println("=======================");

        // TODO: Save and close Excel
        excel.saveAndClose();

        super.teardown();
    }
}
```

**Expected Outcome:**
- Tests run for all Excel data rows
- Results written back to Excel file
- Pass/fail status calculated correctly
- Summary report printed
- Excel file updated with results

**Common Mistakes to Avoid:**
- Not saving Excel after writing
- Starting loop from row 0 (header)
- Not handling test failures gracefully
- Forgetting to close Excel resources
- Not resetting test state between iterations

---

### Exercise 4: Create TestNG DataProvider with Excel (35 min)

**Objective:** Integrate Excel data with TestNG DataProvider for data-driven testing.

**Scenario:** Your framework uses TestNG and you want to leverage DataProvider with Excel data. Create a reusable DataProvider that reads from Excel files.

**Requirements:**
1. Create ExcelDataProvider class
2. Implement @DataProvider method reading from Excel
3. Create generic DataProvider accepting file/sheet names
4. Use DataProvider in test methods
5. Handle multiple test scenarios
6. Test with different data sets

**Code Template:**

```java
package dataproviders;

import org.testng.annotations.DataProvider;
import utils.ExcelUtils;

public class ExcelDataProvider {

    // TODO 1: Create specific DataProvider for login tests
    @DataProvider(name = "loginData")
    public Object[][] getLoginData() {
        String excelPath = "src/test/resources/testdata/LoginTestData.xlsx";
        ExcelUtils excel = new ExcelUtils(excelPath, "LoginTests");

        // TODO: Get all data and close Excel
        Object[][] data = excel.getAllData();
        excel.close();

        return data;
    }

    // TODO 2: Create generic DataProvider
    @DataProvider(name = "excelData")
    public static Object[][] getExcelData(String filePath, String sheetName) {
        // Your code here
        return null;
    }

    // TODO 3: Create DataProvider that returns Map List
    @DataProvider(name = "excelDataMap")
    public Object[][] getExcelDataAsMap() {
        String excelPath = "src/test/resources/testdata/LoginTestData.xlsx";
        ExcelUtils excel = new ExcelUtils(excelPath, "LoginTests");

        // TODO: Get data as map list
        // Convert to Object[][] for TestNG
        // Your code here

        excel.close();
        return null;
    }
}
```

**Test Class Using DataProvider:**

```java
package tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import dataproviders.ExcelDataProvider;

public class LoginTestWithDataProvider extends BaseTest {

    // TODO: Use DataProvider in test
    @Test(dataProvider = "loginData", dataProviderClass = ExcelDataProvider.class)
    public void testLogin(String testCase, String username, String password,
                         String expectedResult) {

        System.out.println("Executing: " + testCase);

        // TODO: Perform login
        // Your code here

        // TODO: Get actual result and verify
        String actualResult = "";
        // Your code here

        Assert.assertEquals(actualResult, expectedResult);
    }

    // TODO: Create test using map-based DataProvider
    @Test(dataProvider = "excelDataMap", dataProviderClass = ExcelDataProvider.class)
    public void testLoginWithMap(Map<String, String> testData) {
        String testCase = testData.get("TestCase");
        String username = testData.get("Username");
        String password = testData.get("Password");
        String expectedResult = testData.get("Expected Result");

        // TODO: Execute test
        // Your code here
    }
}
```

**Expected Outcome:**
- TestNG DataProvider reading from Excel
- Tests parameterized with Excel data
- Multiple data sets handled automatically
- Clean test report with each data set
- Reusable DataProvider across tests

**Common Mistakes to Avoid:**
- Not closing Excel after reading
- Wrong data type in Object[][]
- Not matching parameter count
- Memory leaks with large Excel files
- Not handling null values in data

---

### Exercise 5: Handle Multiple Sheets and Data Types (40 min)

**Objective:** Create utilities to work with multiple Excel sheets and various data types.

**Scenario:** Your test data is organized across multiple sheets (Login Data, Product Data, Payment Data). Build utilities to work with multiple sheets and handle complex data types.

**Requirements:**
1. Create Excel file with multiple sheets
2. Implement MultiSheetExcelReader class
3. Handle numeric data (prices, quantities)
4. Handle date formats
5. Support reading specific sheets dynamically
6. Test reading from different sheets

**Excel Structure:**

**Sheet: LoginData**
| Username | Password | Role |
|----------|----------|------|
| admin@test.com | Admin@123 | Admin |
| user@test.com | User@123 | User |

**Sheet: ProductData**
| ProductName | Price | Stock | ReleaseDate |
|-------------|-------|-------|-------------|
| Laptop | 999.99 | 50 | 01/15/2024 |
| Mouse | 29.99 | 200 | 02/01/2024 |

**Code Template:**

```java
package utils;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class MultiSheetExcelReader {

    private String filePath;
    private Workbook workbook;

    public MultiSheetExcelReader(String filePath) {
        this.filePath = filePath;
        try {
            FileInputStream fis = new FileInputStream(filePath);
            workbook = new XSSFWorkbook(fis);
            fis.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // TODO 1: Get all sheet names
    public String[] getAllSheetNames() {
        int sheetCount = workbook.getNumberOfSheets();
        String[] sheetNames = new String[sheetCount];

        // Your code here

        return sheetNames;
    }

    // TODO 2: Get data from specific sheet
    public Object[][] getDataFromSheet(String sheetName) {
        Sheet sheet = workbook.getSheet(sheetName);
        if (sheet == null) {
            throw new RuntimeException("Sheet not found: " + sheetName);
        }

        // TODO: Get data from sheet
        // Your code here

        return null;
    }

    // TODO 3: Get cell value with correct type
    public Object getCellValue(Cell cell) {
        if (cell == null) {
            return null;
        }

        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();

            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    // TODO: Return Date
                    return null;
                } else {
                    // TODO: Return numeric value
                    return null;
                }

            case BOOLEAN:
                return cell.getBooleanCellValue();

            case FORMULA:
                // TODO: Evaluate formula
                return null;

            default:
                return null;
        }
    }

    // TODO 4: Get typed data (returns Map with correct types)
    public Map<String, Object> getTypedRowData(String sheetName, int rowNum) {
        Sheet sheet = workbook.getSheet(sheetName);
        Row headerRow = sheet.getRow(0);
        Row dataRow = sheet.getRow(rowNum);

        Map<String, Object> rowData = new HashMap<>();

        // TODO: Build map with column name -> typed value
        // Your code here

        return rowData;
    }

    // TODO 5: Get numeric value (for prices, quantities)
    public double getNumericCellValue(String sheetName, int rowNum, int colNum) {
        Sheet sheet = workbook.getSheet(sheetName);
        Cell cell = sheet.getRow(rowNum).getCell(colNum);

        // TODO: Return numeric value
        return 0.0;
    }

    // TODO 6: Get date value
    public Date getDateCellValue(String sheetName, int rowNum, int colNum) {
        Sheet sheet = workbook.getSheet(sheetName);
        Cell cell = sheet.getRow(rowNum).getCell(colNum);

        // TODO: Return date
        return null;
    }

    public void close() {
        try {
            if (workbook != null) {
                workbook.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

**Test Class:**

```java
package tests;

import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import utils.MultiSheetExcelReader;
import java.util.Map;

public class MultiSheetExcelTest {

    private MultiSheetExcelReader excelReader;
    private String excelPath = "src/test/resources/testdata/TestData.xlsx";

    @BeforeClass
    public void setup() {
        excelReader = new MultiSheetExcelReader(excelPath);
    }

    @Test
    public void testReadLoginData() {
        // TODO: Read from LoginData sheet
        Object[][] data = excelReader.getDataFromSheet("LoginData");
        Assert.assertNotNull(data);
        Assert.assertTrue(data.length > 0);
    }

    @Test
    public void testReadProductDataWithTypes() {
        // TODO: Read typed data from ProductData sheet
        Map<String, Object> productData = excelReader.getTypedRowData("ProductData", 1);

        String productName = (String) productData.get("ProductName");
        Double price = (Double) productData.get("Price");
        Integer stock = (Integer) productData.get("Stock");

        Assert.assertNotNull(productName);
        Assert.assertTrue(price > 0);
        Assert.assertTrue(stock > 0);
    }

    @Test
    public void testGetAllSheets() {
        // TODO: Test getting all sheet names
        String[] sheets = excelReader.getAllSheetNames();
        Assert.assertTrue(sheets.length > 0);
    }

    @AfterClass
    public void teardown() {
        excelReader.close();
    }
}
```

**Expected Outcome:**
- Successfully read from multiple sheets
- Correct handling of different data types
- Numeric values returned as numbers (not strings)
- Dates properly formatted
- Type-safe data access

**Common Mistakes to Avoid:**
- Not checking if sheet exists
- Converting all data to strings
- Not handling date formats
- Losing precision with numeric values
- Not handling formula cells

---

### Exercise 6: Build Complete Excel-Based Test Framework (45 min)

**Objective:** Create a mini test framework that uses Excel for test data, expected results, and result reporting.

**Scenario:** Your organization wants a complete Excel-driven testing solution. Build a framework that reads test scenarios from Excel, executes them, and generates an Excel report.

**Requirements:**
1. Create comprehensive Excel test suite
2. Implement TestExecutor that reads and runs tests
3. Support multiple test types (Login, Search, Checkout)
4. Write detailed results to separate sheet
5. Generate summary statistics
6. Create reusable framework components

**Excel Structure:**

**Sheet: TestSuite**
| TestID | TestType | Active | Priority |
|--------|----------|--------|----------|
| LOGIN_01 | Login | Yes | High |
| SEARCH_01 | Search | Yes | Medium |
| CHECKOUT_01 | Checkout | No | Low |

**Sheet: LoginTests**
| TestID | Username | Password | ExpectedResult |
|--------|----------|----------|----------------|
| LOGIN_01 | user@test.com | Pass@123 | Success |

**Sheet: TestResults**
| TestID | TestType | ExecutionTime | Status | ActualResult | Timestamp |
|--------|----------|---------------|--------|--------------|-----------|

**Code Template:**

```java
package framework;

import utils.ExcelUtils;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class ExcelTestExecutor {

    private ExcelUtils testSuiteExcel;
    private ExcelUtils resultsExcel;
    private String testDataPath;
    private String resultsPath;

    private int totalTests = 0;
    private int passedTests = 0;
    private int failedTests = 0;
    private int skippedTests = 0;

    public ExcelTestExecutor(String testDataPath, String resultsPath) {
        this.testDataPath = testDataPath;
        this.resultsPath = resultsPath;
    }

    // TODO 1: Read and execute all active tests
    public void executeTestSuite() {
        testSuiteExcel = new ExcelUtils(testDataPath, "TestSuite");

        // TODO: Get active test list
        List<TestCase> activeTests = getActiveTests();

        System.out.println("Found " + activeTests.size() + " active tests");

        // TODO: Execute each test
        for (TestCase testCase : activeTests) {
            executeTest(testCase);
        }

        // TODO: Generate summary
        generateSummaryReport();

        testSuiteExcel.close();
    }

    // TODO 2: Get list of active tests
    private List<TestCase> getActiveTests() {
        List<TestCase> activeTests = new ArrayList<>();
        int rowCount = testSuiteExcel.getRowCount();

        for (int i = 1; i < rowCount; i++) {
            String testId = testSuiteExcel.getCellData(i, 0);
            String testType = testSuiteExcel.getCellData(i, 1);
            String active = testSuiteExcel.getCellData(i, 2);
            String priority = testSuiteExcel.getCellData(i, 3);

            if ("Yes".equalsIgnoreCase(active)) {
                activeTests.add(new TestCase(testId, testType, priority));
            }
        }

        return activeTests;
    }

    // TODO 3: Execute individual test
    private void executeTest(TestCase testCase) {
        System.out.println("Executing: " + testCase.testId);

        long startTime = System.currentTimeMillis();
        String status = "";
        String actualResult = "";

        try {
            // TODO: Get test data based on test type
            ExcelUtils testDataExcel = new ExcelUtils(testDataPath,
                testCase.testType + "Tests");

            // TODO: Find row for this test ID
            int testRow = findTestRow(testDataExcel, testCase.testId);

            if (testRow == -1) {
                status = "SKIP";
                actualResult = "Test data not found";
                skippedTests++;
            } else {
                // TODO: Execute test based on type
                actualResult = executeTestByType(testCase.testType,
                    testDataExcel, testRow);

                // TODO: Compare with expected result
                String expectedResult = testDataExcel.getCellData(testRow,
                    testDataExcel.getColumnCount() - 1);

                if (actualResult.equals(expectedResult)) {
                    status = "PASS";
                    passedTests++;
                } else {
                    status = "FAIL";
                    failedTests++;
                }
            }

            testDataExcel.close();

        } catch (Exception e) {
            status = "ERROR";
            actualResult = "Exception: " + e.getMessage();
            failedTests++;
            e.printStackTrace();
        }

        long endTime = System.currentTimeMillis();
        long executionTime = endTime - startTime;

        // TODO: Write result to Excel
        writeTestResult(testCase, status, actualResult, executionTime);

        totalTests++;
    }

    // TODO 4: Find test row by test ID
    private int findTestRow(ExcelUtils excel, String testId) {
        int rowCount = excel.getRowCount();
        for (int i = 1; i < rowCount; i++) {
            String rowTestId = excel.getCellData(i, 0);
            if (rowTestId.equals(testId)) {
                return i;
            }
        }
        return -1;
    }

    // TODO 5: Execute test based on type
    private String executeTestByType(String testType, ExcelUtils testData,
                                     int rowNum) {
        // TODO: Implement test execution logic
        // This would call your actual test methods

        switch (testType) {
            case "Login":
                return executeLoginTest(testData, rowNum);
            case "Search":
                return executeSearchTest(testData, rowNum);
            case "Checkout":
                return executeCheckoutTest(testData, rowNum);
            default:
                return "Unknown test type";
        }
    }

    // TODO 6: Write test result
    private void writeTestResult(TestCase testCase, String status,
                                 String actualResult, long executionTime) {
        // Open results Excel
        resultsExcel = new ExcelUtils(resultsPath, "TestResults");

        int nextRow = resultsExcel.getRowCount();

        // TODO: Write result data
        resultsExcel.setCellData(nextRow, 0, testCase.testId);
        resultsExcel.setCellData(nextRow, 1, testCase.testType);
        resultsExcel.setCellData(nextRow, 2, executionTime + "ms");
        resultsExcel.setCellData(nextRow, 3, status);
        resultsExcel.setCellData(nextRow, 4, actualResult);
        resultsExcel.setCellData(nextRow, 5, getCurrentTimestamp());

        resultsExcel.saveAndClose();
    }

    // TODO 7: Generate summary report
    private void generateSummaryReport() {
        System.out.println("\n======= Test Execution Summary =======");
        System.out.println("Total Tests: " + totalTests);
        System.out.println("Passed: " + passedTests);
        System.out.println("Failed: " + failedTests);
        System.out.println("Skipped: " + skippedTests);
        System.out.println("Pass Rate: " +
            String.format("%.2f%%", (passedTests * 100.0 / totalTests)));
        System.out.println("=====================================\n");
    }

    private String getCurrentTimestamp() {
        return LocalDateTime.now()
            .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }

    // Inner class for test case
    private class TestCase {
        String testId;
        String testType;
        String priority;

        TestCase(String testId, String testType, String priority) {
            this.testId = testId;
            this.testType = testType;
            this.priority = priority;
        }
    }

    // Placeholder methods for actual test execution
    private String executeLoginTest(ExcelUtils testData, int rowNum) {
        // Your actual login test logic here
        return "Success";
    }

    private String executeSearchTest(ExcelUtils testData, int rowNum) {
        // Your actual search test logic here
        return "Success";
    }

    private String executeCheckoutTest(ExcelUtils testData, int rowNum) {
        // Your actual checkout test logic here
        return "Success";
    }
}
```

**Expected Outcome:**
- Complete test execution from Excel
- Results written to Excel report
- Summary statistics generated
- Support for multiple test types
- Reusable framework structure

**Common Mistakes to Avoid:**
- Not handling test data not found
- Not closing Excel files properly
- Not handling exceptions in tests
- Not generating meaningful reports
- Hardcoding sheet/column names

---

## Solution Approach for Exercises

### Exercise 1 Solution Hints:
- Use FileInputStream for reading Excel
- XSSFWorkbook for .xlsx files
- getLastRowNum() returns last row index (0-based)
- getLastCellNum() returns column count
- Use switch statement for cell types

### Exercise 2 Solution Hints:
- getAllData() starts from row 1 (skip header)
- Use List<Map<String, String>> for named access
- FileOutputStream needed for writing
- Always close input stream before output
- Test each method independently

### Exercise 3 Solution Hints:
- Loop through rows starting from 1
- Write results to columns 4 and 5
- Save Excel in @AfterClass
- Print summary before closing
- Handle test failures without stopping loop

### Exercise 4 Solution Hints:
- DataProvider returns Object[][]
- Close Excel after getting data
- Match parameter count in test method
- Use meaningful DataProvider names
- Consider separate file for test data

### Exercise 5 Solution Hints:
- Use DateUtil.isCellDateFormatted() for dates
- Store numeric values as Double/Integer
- Handle null cells gracefully
- getNumberOfSheets() for sheet count
- Use workbook.getSheet(name) for specific sheet

### Exercise 6 Solution Hints:
- Read test suite to get active tests
- Execute tests one by one
- Write results after each test
- Calculate statistics as you go
- Use try-catch for each test execution

---

## 12. Key Takeaways

1. **Apache POI** is the standard library for Excel operations in Java
2. **XSSFWorkbook** handles .xlsx files, **HSSFWorkbook** handles .xls files
3. **ExcelUtils** class centralizes Excel operations
4. **Data-driven testing** separates test logic from test data
5. **TestNG DataProvider** integrates seamlessly with Excel data
6. **Cell types** must be handled appropriately (String, Numeric, Boolean, Formula)
7. **Resource management** is critical - always close workbooks and streams
8. **Error handling** prevents test failures from file issues
9. **File organization** keeps test data manageable
10. **Writing results** back to Excel enables reporting

---

## 13. Interview Questions

### Basic Level

1. **Q: What is Apache POI and why is it used?**
   
   A: Apache POI is a Java library for reading and writing Microsoft Office files, including Excel. It's used in test automation to implement data-driven testing by reading test data from Excel files and writing test results back.

2. **Q: What's the difference between XSSFWorkbook and HSSFWorkbook?**
   
   A: XSSFWorkbook is for .xlsx files (Excel 2007+, XML-based), while HSSFWorkbook is for .xls files (Excel 97-2003, binary format). XSSF is recommended for new projects.

### Intermediate Level

3. **Q: How do you implement data-driven testing with Excel and TestNG?**
   
   A: Create ExcelUtils class to read Excel data, create DataProvider method that returns Object[][], use @DataProvider annotation in test method, pass Excel data as test parameters, execute test for each data row.

4. **Q: How do you handle different cell types in Excel?**
   
   A: Use cell.getCellType() to check type, then use appropriate getter: getStringCellValue() for STRING, getNumericCellValue() for NUMERIC, getBooleanCellValue() for BOOLEAN, handle FORMULA by evaluating it, check for DATE using DateUtil.isCellDateFormatted().

### Advanced Level

5. **Q: Design a robust Excel-based data-driven testing framework.**
   
   A: Should include: ExcelUtils class with comprehensive methods, DataProvider factory for different Excel files, error handling and logging, support for multiple sheets, ability to write results back, caching for performance, thread-safe design for parallel execution, validation of Excel structure, support for formulas and different data types.

---

## Navigation

- [Previous: Day 25 - Properties Files](day25_properties_files.md)
- [Next: Day 27 - JSON & CSV Data](day27_json_csv_data.md)
- [Week 4 Overview](README.md)

---

**Congratulations!** You've learned how to use Excel for data-driven testing in Selenium automation. Excel integration is a powerful skill that enables non-technical team members to contribute test data and makes your framework more flexible and maintainable.