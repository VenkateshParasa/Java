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