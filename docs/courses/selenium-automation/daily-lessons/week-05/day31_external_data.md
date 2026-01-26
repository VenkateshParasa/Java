# Day 37: External Data Sources - Excel, CSV, JSON & Database

## Learning Objectives

By the end of this lesson, you will be able to:
- Understand data-driven testing concepts
- Read and write data from Excel files using Apache POI
- Create reusable Excel utility classes
- Work with CSV files for test data
- Parse and create JSON data using Jackson and Gson
- Connect to databases using JDBC
- Fetch test data from databases
- Use properties files for configuration management
- Integrate external data with TestNG DataProvider
- Implement a complete data-driven testing framework
- Apply best practices for test data management

---

## 1. Introduction to Data-Driven Testing

### What is Data-Driven Testing?

**Data-Driven Testing (DDT)** is a methodology where test data is separated from test scripts. The same test logic executes multiple times with different sets of data.

### Benefits of Data-Driven Testing

1. **Code Reusability** - Write test once, run with multiple data sets
2. **Maintainability** - Data changes don't require code changes
3. **Coverage** - Test more scenarios with less code
4. **Efficiency** - Reduce redundant test scripts
5. **Flexibility** - Easy to add new test data
6. **Collaboration** - Non-technical users can manage test data

### Data Sources

Common external data sources:
- **Excel Files** (.xlsx, .xls) - Most popular, easy to maintain
- **CSV Files** (.csv) - Simple, lightweight
- **JSON Files** (.json) - Structured data, APIs
- **Databases** (MySQL, PostgreSQL, etc.) - Central repository
- **Properties Files** (.properties) - Configuration data
- **XML Files** (.xml) - Structured configuration

### Traditional vs Data-Driven Approach

**Traditional Approach:**
```java
@Test
public void testLogin1() {
    login("user1@test.com", "pass123");
}

@Test
public void testLogin2() {
    login("user2@test.com", "pass456");
}

@Test
public void testLogin3() {
    login("user3@test.com", "pass789");
}
```

**Data-Driven Approach:**
```java
@Test(dataProvider = "loginData")
public void testLogin(String email, String password) {
    login(email, password);
}

@DataProvider(name = "loginData")
public Object[][] getLoginData() {
    return ExcelUtils.readExcel("testdata.xlsx", "Login");
}
```

---

## 2. Maven Dependencies

### Complete pom.xml Dependencies

Add these dependencies to your `pom.xml`:

```xml
<dependencies>
    <!-- Selenium WebDriver -->
    <dependency>
        <groupId>org.seleniumhq.selenium</groupId>
        <artifactId>selenium-java</artifactId>
        <version>4.15.0</version>
    </dependency>

    <!-- TestNG -->
    <dependency>
        <groupId>org.testng</groupId>
        <artifactId>testng</artifactId>
        <version>7.8.0</version>
        <scope>test</scope>
    </dependency>

    <!-- Apache POI for Excel -->
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

    <!-- OpenCSV for CSV Files -->
    <dependency>
        <groupId>com.opencsv</groupId>
        <artifactId>opencsv</artifactId>
        <version>5.9</version>
    </dependency>

    <!-- Jackson for JSON -->
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.16.0</version>
    </dependency>

    <!-- Gson for JSON (Alternative) -->
    <dependency>
        <groupId>com.google.code.gson</groupId>
        <artifactId>gson</artifactId>
        <version>2.10.1</version>
    </dependency>

    <!-- MySQL JDBC Driver -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.33</version>
    </dependency>

    <!-- PostgreSQL JDBC Driver (if needed) -->
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
        <version>42.7.1</version>
    </dependency>
</dependencies>
```

---

## 3. Reading Data from Excel - Apache POI

### Understanding Apache POI Components

- **Workbook** - Represents entire Excel file
- **Sheet** - Represents a worksheet
- **Row** - Represents a row in sheet
- **Cell** - Represents a cell in row

### Basic Excel Reading Example

```java
package utils;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileInputStream;
import java.io.IOException;

public class ExcelReaderBasic {

    public static void main(String[] args) {
        String filePath = "src/test/resources/testdata/TestData.xlsx";

        try (FileInputStream fis = new FileInputStream(filePath);
             Workbook workbook = new XSSFWorkbook(fis)) {

            // Get first sheet
            Sheet sheet = workbook.getSheetAt(0);

            // Iterate through rows
            for (Row row : sheet) {
                // Iterate through cells
                for (Cell cell : row) {
                    // Get cell value based on type
                    switch (cell.getCellType()) {
                        case STRING:
                            System.out.print(cell.getStringCellValue() + "\t");
                            break;
                        case NUMERIC:
                            if (DateUtil.isCellDateFormatted(cell)) {
                                System.out.print(cell.getDateCellValue() + "\t");
                            } else {
                                System.out.print(cell.getNumericCellValue() + "\t");
                            }
                            break;
                        case BOOLEAN:
                            System.out.print(cell.getBooleanCellValue() + "\t");
                            break;
                        case FORMULA:
                            System.out.print(cell.getCellFormula() + "\t");
                            break;
                        default:
                            System.out.print("BLANK\t");
                    }
                }
                System.out.println();
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### Reading Specific Cell Data

```java
package utils;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileInputStream;

public class ReadSpecificCellExample {

    public static String getCellData(String filePath, String sheetName,
                                    int rowNum, int colNum) {
        String cellValue = "";

        try (FileInputStream fis = new FileInputStream(filePath);
             Workbook workbook = new XSSFWorkbook(fis)) {

            Sheet sheet = workbook.getSheet(sheetName);
            Row row = sheet.getRow(rowNum);
            Cell cell = row.getCell(colNum);

            DataFormatter formatter = new DataFormatter();
            cellValue = formatter.formatCellValue(cell);

        } catch (Exception e) {
            System.out.println("Error reading cell: " + e.getMessage());
        }

        return cellValue;
    }

    public static void main(String[] args) {
        String filePath = "src/test/resources/testdata/TestData.xlsx";

        // Read cell at row 1, column 2
        String data = getCellData(filePath, "Sheet1", 1, 2);
        System.out.println("Cell Data: " + data);
    }
}
```

---

## 4. Writing Data to Excel

### Write Data Example

```java
package utils;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileOutputStream;
import java.io.IOException;

public class ExcelWriterBasic {

    public static void writeExcelData() {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Test Results");

        // Create header row
        Row headerRow = sheet.createRow(0);
        String[] headers = {"Test Case", "Status", "Comments"};

        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);

            // Apply bold style to header
            CellStyle headerStyle = workbook.createCellStyle();
            Font font = workbook.createFont();
            font.setBold(true);
            headerStyle.setFont(font);
            cell.setCellStyle(headerStyle);
        }

        // Create data rows
        Object[][] testData = {
            {"Login Test", "Pass", "Successful login"},
            {"Search Test", "Pass", "Results displayed"},
            {"Checkout Test", "Fail", "Payment failed"}
        };

        int rowNum = 1;
        for (Object[] data : testData) {
            Row row = sheet.createRow(rowNum++);
            int colNum = 0;
            for (Object field : data) {
                Cell cell = row.createCell(colNum++);
                if (field instanceof String) {
                    cell.setCellValue((String) field);
                } else if (field instanceof Integer) {
                    cell.setCellValue((Integer) field);
                }
            }
        }

        // Auto-size columns
        for (int i = 0; i < headers.length; i++) {
            sheet.autoSizeColumn(i);
        }

        // Write to file
        try (FileOutputStream fos = new FileOutputStream(
                "src/test/resources/testdata/TestResults.xlsx")) {
            workbook.write(fos);
            System.out.println("Excel file created successfully!");
        } catch (IOException e) {
            e.printStackTrace();
        }

        try {
            workbook.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        writeExcelData();
    }
}
```

### Update Existing Excel File

```java
package utils;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class ExcelUpdater {

    public static void updateCellValue(String filePath, String sheetName,
                                      int rowNum, int colNum, String value) {
        try (FileInputStream fis = new FileInputStream(filePath);
             Workbook workbook = new XSSFWorkbook(fis)) {

            Sheet sheet = workbook.getSheet(sheetName);
            Row row = sheet.getRow(rowNum);

            if (row == null) {
                row = sheet.createRow(rowNum);
            }

            Cell cell = row.getCell(colNum);
            if (cell == null) {
                cell = row.createCell(colNum);
            }

            cell.setCellValue(value);

            // Write back to file
            try (FileOutputStream fos = new FileOutputStream(filePath)) {
                workbook.write(fos);
                System.out.println("Cell updated successfully!");
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        updateCellValue("src/test/resources/testdata/TestData.xlsx",
                       "Sheet1", 1, 2, "Updated Value");
    }
}
```

---

## 5. Complete Excel Utility Class

### ExcelUtils.java

```java
package utils;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class ExcelUtils {

    private String filePath;
    private Workbook workbook;
    private Sheet sheet;

    // Constructor
    public ExcelUtils(String filePath, String sheetName) {
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

    // Get row count
    public int getRowCount() {
        return sheet.getLastRowNum() + 1;
    }

    // Get column count
    public int getColumnCount() {
        return sheet.getRow(0).getLastCellNum();
    }

    // Get cell data as String
    public String getCellData(int rowNum, int colNum) {
        try {
            DataFormatter formatter = new DataFormatter();
            Cell cell = sheet.getRow(rowNum).getCell(colNum);
            return formatter.formatCellValue(cell);
        } catch (Exception e) {
            return "";
        }
    }

    // Get cell data by column name
    public String getCellData(int rowNum, String columnName) {
        int colNum = getColumnNumber(columnName);
        return getCellData(rowNum, colNum);
    }

    // Get column number by name
    private int getColumnNumber(String columnName) {
        Row headerRow = sheet.getRow(0);
        for (Cell cell : headerRow) {
            if (cell.getStringCellValue().trim().equalsIgnoreCase(columnName)) {
                return cell.getColumnIndex();
            }
        }
        return -1;
    }

    // Set cell data
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

            FileOutputStream fos = new FileOutputStream(filePath);
            workbook.write(fos);
            fos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Set cell data by column name
    public void setCellData(int rowNum, String columnName, String value) {
        int colNum = getColumnNumber(columnName);
        setCellData(rowNum, colNum, value);
    }

    // Read all data as 2D array
    public Object[][] getAllData() {
        int rowCount = getRowCount();
        int colCount = getColumnCount();

        Object[][] data = new Object[rowCount - 1][colCount];

        for (int i = 1; i < rowCount; i++) {
            for (int j = 0; j < colCount; j++) {
                data[i - 1][j] = getCellData(i, j);
            }
        }

        return data;
    }

    // Read data for specific columns
    public Object[][] getDataByColumns(String... columnNames) {
        int rowCount = getRowCount();
        Object[][] data = new Object[rowCount - 1][columnNames.length];

        for (int i = 1; i < rowCount; i++) {
            for (int j = 0; j < columnNames.length; j++) {
                data[i - 1][j] = getCellData(i, columnNames[j]);
            }
        }

        return data;
    }

    // Read data with condition
    public List<Object[]> getDataWithCondition(String columnName, String value) {
        List<Object[]> filteredData = new ArrayList<>();
        int rowCount = getRowCount();
        int colCount = getColumnCount();
        int filterColNum = getColumnNumber(columnName);

        for (int i = 1; i < rowCount; i++) {
            String cellValue = getCellData(i, filterColNum);
            if (cellValue.equalsIgnoreCase(value)) {
                Object[] rowData = new Object[colCount];
                for (int j = 0; j < colCount; j++) {
                    rowData[j] = getCellData(i, j);
                }
                filteredData.add(rowData);
            }
        }

        return filteredData;
    }

    // Apply cell style
    public void applyCellStyle(int rowNum, int colNum, CellStyle style) {
        try {
            Row row = sheet.getRow(rowNum);
            Cell cell = row.getCell(colNum);
            cell.setCellStyle(style);

            FileOutputStream fos = new FileOutputStream(filePath);
            workbook.write(fos);
            fos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Create pass/fail style
    public CellStyle getPassStyle() {
        CellStyle style = workbook.createCellStyle();
        Font font = workbook.createFont();
        font.setColor(IndexedColors.GREEN.getIndex());
        font.setBold(true);
        style.setFont(font);
        return style;
    }

    public CellStyle getFailStyle() {
        CellStyle style = workbook.createCellStyle();
        Font font = workbook.createFont();
        font.setColor(IndexedColors.RED.getIndex());
        font.setBold(true);
        style.setFont(font);
        return style;
    }

    // Close workbook
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

### Using ExcelUtils

```java
package tests;

import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;
import utils.ExcelUtils;

public class ExcelUtilsTest {

    @Test(dataProvider = "loginData")
    public void testLogin(String username, String password, String expected) {
        System.out.println("Username: " + username);
        System.out.println("Password: " + password);
        System.out.println("Expected: " + expected);
        System.out.println("------------------------");
    }

    @DataProvider(name = "loginData")
    public Object[][] getLoginData() {
        String filePath = "src/test/resources/testdata/LoginData.xlsx";
        ExcelUtils excel = new ExcelUtils(filePath, "Login");

        Object[][] data = excel.getDataByColumns("Username", "Password", "Expected");
        excel.close();

        return data;
    }
}
```

---

## 6. Reading Data from CSV Files

### Basic CSV Reading

```java
package utils;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;

import java.io.FileReader;
import java.io.IOException;
import java.util.List;

public class CSVReaderBasic {

    public static void readCSV(String filePath) {
        try (CSVReader reader = new CSVReader(new FileReader(filePath))) {
            List<String[]> records = reader.readAll();

            for (String[] record : records) {
                for (String field : record) {
                    System.out.print(field + "\t");
                }
                System.out.println();
            }

        } catch (IOException | CsvException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        readCSV("src/test/resources/testdata/TestData.csv");
    }
}
```

### Writing to CSV

```java
package utils;

import com.opencsv.CSVWriter;

import java.io.FileWriter;
import java.io.IOException;

public class CSVWriterBasic {

    public static void writeCSV(String filePath) {
        try (CSVWriter writer = new CSVWriter(new FileWriter(filePath))) {

            // Write header
            String[] header = {"TestCase", "Status", "Comments"};
            writer.writeNext(header);

            // Write data
            String[] record1 = {"Login Test", "Pass", "Success"};
            String[] record2 = {"Search Test", "Pass", "Results found"};
            String[] record3 = {"Checkout Test", "Fail", "Payment error"};

            writer.writeNext(record1);
            writer.writeNext(record2);
            writer.writeNext(record3);

            System.out.println("CSV file created successfully!");

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        writeCSV("src/test/resources/testdata/Results.csv");
    }
}
```

---

## 7. CSV Utility Class

### CSVUtils.java

```java
package utils;

import com.opencsv.CSVReader;
import com.opencsv.CSVWriter;
import com.opencsv.exceptions.CsvException;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class CSVUtils {

    // Read all data from CSV
    public static Object[][] readCSV(String filePath) {
        List<String[]> records = new ArrayList<>();

        try (CSVReader reader = new CSVReader(new FileReader(filePath))) {
            records = reader.readAll();

            // Remove header row
            if (!records.isEmpty()) {
                records.remove(0);
            }

        } catch (IOException | CsvException e) {
            e.printStackTrace();
        }

        // Convert List to 2D array
        Object[][] data = new Object[records.size()][];
        for (int i = 0; i < records.size(); i++) {
            data[i] = records.get(i);
        }

        return data;
    }

    // Read specific columns from CSV
    public static Object[][] readCSVColumns(String filePath, int... columnIndexes) {
        List<String[]> allRecords = new ArrayList<>();

        try (CSVReader reader = new CSVReader(new FileReader(filePath))) {
            allRecords = reader.readAll();

            // Remove header
            if (!allRecords.isEmpty()) {
                allRecords.remove(0);
            }

        } catch (IOException | CsvException e) {
            e.printStackTrace();
        }

        // Extract specific columns
        Object[][] data = new Object[allRecords.size()][columnIndexes.length];

        for (int i = 0; i < allRecords.size(); i++) {
            String[] record = allRecords.get(i);
            for (int j = 0; j < columnIndexes.length; j++) {
                data[i][j] = record[columnIndexes[j]];
            }
        }

        return data;
    }

    // Write data to CSV
    public static void writeCSV(String filePath, String[] header, List<String[]> data) {
        try (CSVWriter writer = new CSVWriter(new FileWriter(filePath))) {

            // Write header
            if (header != null) {
                writer.writeNext(header);
            }

            // Write data
            writer.writeAll(data);

            System.out.println("CSV file written successfully!");

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Append data to existing CSV
    public static void appendToCSV(String filePath, String[] data) {
        try (CSVWriter writer = new CSVWriter(new FileWriter(filePath, true))) {
            writer.writeNext(data);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Get row count
    public static int getRowCount(String filePath) {
        int count = 0;
        try (CSVReader reader = new CSVReader(new FileReader(filePath))) {
            List<String[]> records = reader.readAll();
            count = records.size() - 1; // Exclude header
        } catch (IOException | CsvException e) {
            e.printStackTrace();
        }
        return count;
    }
}
```

### Using CSVUtils with TestNG

```java
package tests;

import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;
import utils.CSVUtils;

public class CSVDataDrivenTest {

    @Test(dataProvider = "csvData")
    public void testWithCSVData(String username, String password, String expected) {
        System.out.println("Testing with:");
        System.out.println("Username: " + username);
        System.out.println("Password: " + password);
        System.out.println("Expected: " + expected);
        System.out.println("------------------------");
    }

    @DataProvider(name = "csvData")
    public Object[][] getCSVData() {
        String filePath = "src/test/resources/testdata/LoginData.csv";
        return CSVUtils.readCSV(filePath);
    }
}
```

---

## 8. Reading/Writing JSON Data

### Using Jackson Library

#### Read JSON Example

```java
package utils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;

public class JacksonJSONReader {

    public static void readJSON(String filePath) {
        ObjectMapper mapper = new ObjectMapper();

        try {
            // Read JSON file
            JsonNode rootNode = mapper.readTree(new File(filePath));

            // Access data
            String username = rootNode.get("username").asText();
            String password = rootNode.get("password").asText();

            System.out.println("Username: " + username);
            System.out.println("Password: " + password);

            // Access array
            JsonNode testCases = rootNode.get("testCases");
            for (JsonNode testCase : testCases) {
                System.out.println(testCase.asText());
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        readJSON("src/test/resources/testdata/config.json");
    }
}
```

#### Write JSON Example

```java
package utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.io.File;
import java.io.IOException;

public class JacksonJSONWriter {

    public static void writeJSON(String filePath) {
        ObjectMapper mapper = new ObjectMapper();

        // Create root object
        ObjectNode root = mapper.createObjectNode();
        root.put("username", "testuser");
        root.put("password", "pass123");
        root.put("browser", "chrome");

        // Create array
        ArrayNode testCases = mapper.createArrayNode();
        testCases.add("Login Test");
        testCases.add("Search Test");
        testCases.add("Checkout Test");

        root.set("testCases", testCases);

        try {
            // Write to file with pretty print
            mapper.writerWithDefaultPrettyPrinter()
                  .writeValue(new File(filePath), root);
            System.out.println("JSON file created!");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        writeJSON("src/test/resources/testdata/output.json");
    }
}
```

### Using Gson Library

#### Read JSON with Gson

```java
package utils;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import java.io.FileReader;
import java.io.IOException;

public class GsonJSONReader {

    public static void readJSON(String filePath) {
        Gson gson = new Gson();

        try (FileReader reader = new FileReader(filePath)) {
            JsonObject jsonObject = gson.fromJson(reader, JsonObject.class);

            String username = jsonObject.get("username").getAsString();
            String password = jsonObject.get("password").getAsString();

            System.out.println("Username: " + username);
            System.out.println("Password: " + password);

            // Read array
            JsonArray testCases = jsonObject.getAsJsonArray("testCases");
            for (int i = 0; i < testCases.size(); i++) {
                System.out.println(testCases.get(i).getAsString());
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        readJSON("src/test/resources/testdata/config.json");
    }
}
```

#### Write JSON with Gson

```java
package utils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import java.io.FileWriter;
import java.io.IOException;

public class GsonJSONWriter {

    public static void writeJSON(String filePath) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();

        JsonObject root = new JsonObject();
        root.addProperty("username", "testuser");
        root.addProperty("password", "pass123");
        root.addProperty("browser", "chrome");

        JsonArray testCases = new JsonArray();
        testCases.add("Login Test");
        testCases.add("Search Test");
        testCases.add("Checkout Test");

        root.add("testCases", testCases);

        try (FileWriter writer = new FileWriter(filePath)) {
            gson.toJson(root, writer);
            System.out.println("JSON file created!");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        writeJSON("src/test/resources/testdata/output.json");
    }
}
```

---

## 9. JSON Utility Class

### JSONUtils.java

```java
package utils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class JSONUtils {

    private static ObjectMapper mapper = new ObjectMapper();

    // Read JSON and return as JsonNode
    public static JsonNode readJSON(String filePath) {
        try {
            return mapper.readTree(new File(filePath));
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    // Get value by key
    public static String getValue(String filePath, String key) {
        JsonNode root = readJSON(filePath);
        if (root != null && root.has(key)) {
            return root.get(key).asText();
        }
        return null;
    }

    // Get nested value
    public static String getNestedValue(String filePath, String... keys) {
        JsonNode node = readJSON(filePath);

        for (String key : keys) {
            if (node != null && node.has(key)) {
                node = node.get(key);
            } else {
                return null;
            }
        }

        return node != null ? node.asText() : null;
    }

    // Read array from JSON
    public static List<String> getArrayValues(String filePath, String arrayKey) {
        List<String> values = new ArrayList<>();
        JsonNode root = readJSON(filePath);

        if (root != null && root.has(arrayKey)) {
            JsonNode arrayNode = root.get(arrayKey);
            if (arrayNode.isArray()) {
                for (JsonNode node : arrayNode) {
                    values.add(node.asText());
                }
            }
        }

        return values;
    }

    // Convert JSON array to 2D Object array for TestNG
    public static Object[][] jsonArrayToDataProvider(String filePath, String arrayKey) {
        List<Object[]> dataList = new ArrayList<>();
        JsonNode root = readJSON(filePath);

        if (root != null && root.has(arrayKey)) {
            JsonNode arrayNode = root.get(arrayKey);

            for (JsonNode item : arrayNode) {
                List<Object> rowData = new ArrayList<>();
                Iterator<JsonNode> elements = item.elements();

                while (elements.hasNext()) {
                    rowData.add(elements.next().asText());
                }

                dataList.add(rowData.toArray());
            }
        }

        return dataList.toArray(new Object[0][]);
    }

    // Read test data from JSON
    public static Object[][] getTestData(String filePath, String testName) {
        List<Object[]> testDataList = new ArrayList<>();
        JsonNode root = readJSON(filePath);

        if (root != null && root.has("tests")) {
            JsonNode tests = root.get("tests");

            for (JsonNode test : tests) {
                if (test.get("name").asText().equals(testName)) {
                    JsonNode dataArray = test.get("data");

                    for (JsonNode dataNode : dataArray) {
                        List<Object> rowData = new ArrayList<>();
                        dataNode.elements().forEachRemaining(
                            element -> rowData.add(element.asText())
                        );
                        testDataList.add(rowData.toArray());
                    }
                }
            }
        }

        return testDataList.toArray(new Object[0][]);
    }
}
```

### Using JSONUtils with TestNG

```java
package tests;

import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;
import utils.JSONUtils;

public class JSONDataDrivenTest {

    @Test(dataProvider = "jsonData")
    public void testWithJSONData(String username, String password) {
        System.out.println("Username: " + username);
        System.out.println("Password: " + password);
        System.out.println("------------------------");
    }

    @DataProvider(name = "jsonData")
    public Object[][] getJSONData() {
        String filePath = "src/test/resources/testdata/loginData.json";
        return JSONUtils.getTestData(filePath, "loginTest");
    }
}
```

---

## 10. Database Connectivity - JDBC

### Basic Database Connection

```java
package utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnectionBasic {

    public static Connection getConnection() {
        Connection connection = null;

        String url = "jdbc:mysql://localhost:3306/testdb";
        String username = "root";
        String password = "password";

        try {
            // Load MySQL JDBC Driver
            Class.forName("com.mysql.cj.jdbc.Driver");

            // Establish connection
            connection = DriverManager.getConnection(url, username, password);
            System.out.println("Database connected successfully!");

        } catch (ClassNotFoundException e) {
            System.out.println("MySQL JDBC Driver not found!");
            e.printStackTrace();
        } catch (SQLException e) {
            System.out.println("Connection failed!");
            e.printStackTrace();
        }

        return connection;
    }

    public static void main(String[] args) {
        Connection conn = getConnection();

        if (conn != null) {
            try {
                conn.close();
                System.out.println("Connection closed.");
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
```

### Execute SELECT Query

```java
package utils;

import java.sql.*;

public class DatabaseQueryExample {

    public static void executeSelectQuery() {
        String url = "jdbc:mysql://localhost:3306/testdb";
        String username = "root";
        String password = "password";

        String query = "SELECT * FROM users";

        try (Connection conn = DriverManager.getConnection(url, username, password);
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(query)) {

            // Process result set
            while (rs.next()) {
                int id = rs.getInt("id");
                String user = rs.getString("username");
                String email = rs.getString("email");

                System.out.println("ID: " + id + ", Username: " + user + ", Email: " + email);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        executeSelectQuery();
    }
}
```

### Execute INSERT, UPDATE, DELETE

```java
package utils;

import java.sql.*;

public class DatabaseUpdateExample {

    public static void insertData() {
        String url = "jdbc:mysql://localhost:3306/testdb";
        String username = "root";
        String password = "password";

        String insertQuery = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

        try (Connection conn = DriverManager.getConnection(url, username, password);
             PreparedStatement pstmt = conn.prepareStatement(insertQuery)) {

            pstmt.setString(1, "testuser");
            pstmt.setString(2, "test@example.com");
            pstmt.setString(3, "pass123");

            int rowsAffected = pstmt.executeUpdate();
            System.out.println(rowsAffected + " row(s) inserted.");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void updateData() {
        String url = "jdbc:mysql://localhost:3306/testdb";
        String username = "root";
        String password = "password";

        String updateQuery = "UPDATE users SET email = ? WHERE username = ?";

        try (Connection conn = DriverManager.getConnection(url, username, password);
             PreparedStatement pstmt = conn.prepareStatement(updateQuery)) {

            pstmt.setString(1, "newemail@example.com");
            pstmt.setString(2, "testuser");

            int rowsAffected = pstmt.executeUpdate();
            System.out.println(rowsAffected + " row(s) updated.");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void deleteData() {
        String url = "jdbc:mysql://localhost:3306/testdb";
        String username = "root";
        String password = "password";

        String deleteQuery = "DELETE FROM users WHERE username = ?";

        try (Connection conn = DriverManager.getConnection(url, username, password);
             PreparedStatement pstmt = conn.prepareStatement(deleteQuery)) {

            pstmt.setString(1, "testuser");

            int rowsAffected = pstmt.executeUpdate();
            System.out.println(rowsAffected + " row(s) deleted.");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        insertData();
        updateData();
        deleteData();
    }
}
```

---

## 11. Database Utility Class

### DatabaseUtils.java

```java
package utils;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DatabaseUtils {

    private String url;
    private String username;
    private String password;
    private Connection connection;

    // Constructor
    public DatabaseUtils(String url, String username, String password) {
        this.url = url;
        this.username = username;
        this.password = password;
    }

    // Get connection
    public Connection getConnection() {
        try {
            if (connection == null || connection.isClosed()) {
                connection = DriverManager.getConnection(url, username, password);
                System.out.println("Database connected!");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return connection;
    }

    // Close connection
    public void closeConnection() {
        try {
            if (connection != null && !connection.isClosed()) {
                connection.close();
                System.out.println("Connection closed!");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Execute query and return ResultSet as List of Maps
    public List<Map<String, String>> executeQuery(String query) {
        List<Map<String, String>> results = new ArrayList<>();

        try (Statement stmt = getConnection().createStatement();
             ResultSet rs = stmt.executeQuery(query)) {

            ResultSetMetaData metaData = rs.getMetaData();
            int columnCount = metaData.getColumnCount();

            while (rs.next()) {
                Map<String, String> row = new HashMap<>();
                for (int i = 1; i <= columnCount; i++) {
                    String columnName = metaData.getColumnName(i);
                    String value = rs.getString(i);
                    row.put(columnName, value);
                }
                results.add(row);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return results;
    }

    // Execute query with parameters
    public List<Map<String, String>> executeQuery(String query, Object... params) {
        List<Map<String, String>> results = new ArrayList<>();

        try (PreparedStatement pstmt = getConnection().prepareStatement(query)) {

            for (int i = 0; i < params.length; i++) {
                pstmt.setObject(i + 1, params[i]);
            }

            ResultSet rs = pstmt.executeQuery();
            ResultSetMetaData metaData = rs.getMetaData();
            int columnCount = metaData.getColumnCount();

            while (rs.next()) {
                Map<String, String> row = new HashMap<>();
                for (int i = 1; i <= columnCount; i++) {
                    String columnName = metaData.getColumnName(i);
                    String value = rs.getString(i);
                    row.put(columnName, value);
                }
                results.add(row);
            }

            rs.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return results;
    }

    // Execute update (INSERT, UPDATE, DELETE)
    public int executeUpdate(String query, Object... params) {
        int rowsAffected = 0;

        try (PreparedStatement pstmt = getConnection().prepareStatement(query)) {

            for (int i = 0; i < params.length; i++) {
                pstmt.setObject(i + 1, params[i]);
            }

            rowsAffected = pstmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return rowsAffected;
    }

    // Get single value from database
    public String getSingleValue(String query, Object... params) {
        String value = null;

        try (PreparedStatement pstmt = getConnection().prepareStatement(query)) {

            for (int i = 0; i < params.length; i++) {
                pstmt.setObject(i + 1, params[i]);
            }

            ResultSet rs = pstmt.executeQuery();
            if (rs.next()) {
                value = rs.getString(1);
            }
            rs.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return value;
    }

    // Get row count
    public int getRowCount(String tableName) {
        String query = "SELECT COUNT(*) FROM " + tableName;
        String count = getSingleValue(query);
        return count != null ? Integer.parseInt(count) : 0;
    }

    // Convert query results to Object array for DataProvider
    public Object[][] getDataAsArray(String query) {
        List<Map<String, String>> results = executeQuery(query);

        if (results.isEmpty()) {
            return new Object[0][0];
        }

        int rows = results.size();
        int cols = results.get(0).size();

        Object[][] data = new Object[rows][cols];

        for (int i = 0; i < rows; i++) {
            Map<String, String> row = results.get(i);
            int j = 0;
            for (String value : row.values()) {
                data[i][j++] = value;
            }
        }

        return data;
    }

    // Get specific columns as array
    public Object[][] getColumnsAsArray(String query, String... columnNames) {
        List<Map<String, String>> results = executeQuery(query);

        if (results.isEmpty()) {
            return new Object[0][0];
        }

        Object[][] data = new Object[results.size()][columnNames.length];

        for (int i = 0; i < results.size(); i++) {
            Map<String, String> row = results.get(i);
            for (int j = 0; j < columnNames.length; j++) {
                data[i][j] = row.get(columnNames[j]);
            }
        }

        return data;
    }
}
```

### Using DatabaseUtils with TestNG

```java
package tests;

import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;
import utils.DatabaseUtils;

public class DatabaseDataDrivenTest {

    DatabaseUtils dbUtils;

    @BeforeClass
    public void setupDatabase() {
        String url = "jdbc:mysql://localhost:3306/testdb";
        String username = "root";
        String password = "password";

        dbUtils = new DatabaseUtils(url, username, password);
    }

    @Test(dataProvider = "userData")
    public void testWithDatabaseData(String username, String email, String role) {
        System.out.println("Testing with:");
        System.out.println("Username: " + username);
        System.out.println("Email: " + email);
        System.out.println("Role: " + role);
        System.out.println("------------------------");
    }

    @DataProvider(name = "userData")
    public Object[][] getUserData() {
        String query = "SELECT username, email, role FROM users WHERE active = 1";
        return dbUtils.getColumnsAsArray(query, "username", "email", "role");
    }

    @AfterClass
    public void cleanupDatabase() {
        dbUtils.closeConnection();
    }
}
```

---

## 12. Properties Files for Configuration

### Reading Properties File

```java
package utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class PropertiesReaderBasic {

    public static void readProperties() {
        Properties prop = new Properties();

        try (FileInputStream fis = new FileInputStream(
                "src/test/resources/config.properties")) {

            prop.load(fis);

            String browser = prop.getProperty("browser");
            String url = prop.getProperty("url");
            String timeout = prop.getProperty("timeout");

            System.out.println("Browser: " + browser);
            System.out.println("URL: " + url);
            System.out.println("Timeout: " + timeout);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        readProperties();
    }
}
```

### Writing Properties File

```java
package utils;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Properties;

public class PropertiesWriterBasic {

    public static void writeProperties() {
        Properties prop = new Properties();

        prop.setProperty("browser", "chrome");
        prop.setProperty("url", "https://example.com");
        prop.setProperty("timeout", "30");
        prop.setProperty("headless", "false");

        try (FileOutputStream fos = new FileOutputStream(
                "src/test/resources/config.properties")) {

            prop.store(fos, "Test Configuration");
            System.out.println("Properties file created!");

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        writeProperties();
    }
}
```

### ConfigReader Utility

```java
package utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class ConfigReader {

    private static Properties properties;
    private static final String CONFIG_FILE = "src/test/resources/config.properties";

    // Static block to load properties
    static {
        try {
            FileInputStream fis = new FileInputStream(CONFIG_FILE);
            properties = new Properties();
            properties.load(fis);
            fis.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Get property value
    public static String getProperty(String key) {
        return properties.getProperty(key);
    }

    // Get property with default value
    public static String getProperty(String key, String defaultValue) {
        return properties.getProperty(key, defaultValue);
    }

    // Get browser
    public static String getBrowser() {
        return getProperty("browser", "chrome");
    }

    // Get URL
    public static String getURL() {
        return getProperty("url");
    }

    // Get timeout
    public static int getTimeout() {
        String timeout = getProperty("timeout", "30");
        return Integer.parseInt(timeout);
    }

    // Get headless mode
    public static boolean isHeadless() {
        String headless = getProperty("headless", "false");
        return Boolean.parseBoolean(headless);
    }
}
```

### Using ConfigReader

```java
package tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import utils.ConfigReader;

import java.time.Duration;

public class ConfigReaderTest {

    WebDriver driver;

    @BeforeMethod
    public void setup() {
        String browser = ConfigReader.getBrowser();

        if (browser.equalsIgnoreCase("chrome")) {
            ChromeOptions options = new ChromeOptions();
            if (ConfigReader.isHeadless()) {
                options.addArguments("--headless");
            }
            driver = new ChromeDriver(options);
        }

        driver.manage().timeouts().implicitlyWait(
            Duration.ofSeconds(ConfigReader.getTimeout())
        );
    }

    @Test
    public void testWithConfig() {
        driver.get(ConfigReader.getURL());
        System.out.println("Page Title: " + driver.getTitle());
    }
}
```

---

## 13. Complete Data-Driven Framework Example

### Project Structure

```
src/test/
├── java/
│   ├── pages/
│   │   └── LoginPage.java
│   ├── tests/
│   │   └── DataDrivenLoginTest.java
│   └── utils/
│       ├── ExcelUtils.java
│       ├── CSVUtils.java
│       ├── JSONUtils.java
│       ├── DatabaseUtils.java
│       └── ConfigReader.java
└── resources/
    ├── config.properties
    └── testdata/
        ├── LoginData.xlsx
        ├── LoginData.csv
        └── loginData.json
```

### LoginPage.java (Page Object)

```java
package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class LoginPage {

    WebDriver driver;

    // Locators
    By usernameField = By.id("username");
    By passwordField = By.id("password");
    By loginButton = By.id("login");
    By errorMessage = By.className("error");
    By successMessage = By.className("success");

    // Constructor
    public LoginPage(WebDriver driver) {
        this.driver = driver;
    }

    // Actions
    public void enterUsername(String username) {
        driver.findElement(usernameField).sendKeys(username);
    }

    public void enterPassword(String password) {
        driver.findElement(passwordField).sendKeys(password);
    }

    public void clickLogin() {
        driver.findElement(loginButton).click();
    }

    public void login(String username, String password) {
        enterUsername(username);
        enterPassword(password);
        clickLogin();
    }

    public String getErrorMessage() {
        return driver.findElement(errorMessage).getText();
    }

    public String getSuccessMessage() {
        return driver.findElement(successMessage).getText();
    }

    public boolean isLoginSuccessful() {
        try {
            return driver.findElement(successMessage).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
}
```

### Complete Test Class

```java
package tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.*;
import pages.LoginPage;
import utils.*;

import java.time.Duration;

public class DataDrivenLoginTest {

    WebDriver driver;
    LoginPage loginPage;

    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        driver.get(ConfigReader.getURL());

        loginPage = new LoginPage(driver);
    }

    // Test with Excel data
    @Test(dataProvider = "excelData", priority = 1)
    public void testLoginWithExcel(String username, String password, String expected) {
        loginPage.login(username, password);

        if (expected.equalsIgnoreCase("success")) {
            Assert.assertTrue(loginPage.isLoginSuccessful(), "Login should succeed");
        } else {
            String errorMsg = loginPage.getErrorMessage();
            Assert.assertFalse(errorMsg.isEmpty(), "Error message should be displayed");
        }
    }

    // Test with CSV data
    @Test(dataProvider = "csvData", priority = 2)
    public void testLoginWithCSV(String username, String password, String expected) {
        loginPage.login(username, password);

        if (expected.equalsIgnoreCase("success")) {
            Assert.assertTrue(loginPage.isLoginSuccessful(), "Login should succeed");
        } else {
            String errorMsg = loginPage.getErrorMessage();
            Assert.assertFalse(errorMsg.isEmpty(), "Error message should be displayed");
        }
    }

    // Test with JSON data
    @Test(dataProvider = "jsonData", priority = 3)
    public void testLoginWithJSON(String username, String password) {
        loginPage.login(username, password);
        Assert.assertTrue(loginPage.isLoginSuccessful(), "Login should succeed");
    }

    // Test with Database data
    @Test(dataProvider = "databaseData", priority = 4)
    public void testLoginWithDatabase(String username, String password) {
        loginPage.login(username, password);
        Assert.assertTrue(loginPage.isLoginSuccessful(), "Login should succeed");
    }

    // Data Providers
    @DataProvider(name = "excelData")
    public Object[][] getExcelData() {
        String filePath = "src/test/resources/testdata/LoginData.xlsx";
        ExcelUtils excel = new ExcelUtils(filePath, "Login");
        Object[][] data = excel.getDataByColumns("Username", "Password", "Expected");
        excel.close();
        return data;
    }

    @DataProvider(name = "csvData")
    public Object[][] getCSVData() {
        String filePath = "src/test/resources/testdata/LoginData.csv";
        return CSVUtils.readCSV(filePath);
    }

    @DataProvider(name = "jsonData")
    public Object[][] getJSONData() {
        String filePath = "src/test/resources/testdata/loginData.json";
        return JSONUtils.getTestData(filePath, "loginTest");
    }

    @DataProvider(name = "databaseData")
    public Object[][] getDatabaseData() {
        DatabaseUtils db = new DatabaseUtils(
            "jdbc:mysql://localhost:3306/testdb",
            "root",
            "password"
        );

        String query = "SELECT username, password FROM test_users WHERE active = 1";
        Object[][] data = db.getColumnsAsArray(query, "username", "password");

        db.closeConnection();
        return data;
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

## 14. Best Practices for Test Data Management

### 1. Separate Test Data from Test Code

**Good Practice:**
```
src/test/resources/testdata/
├── LoginData.xlsx
├── SearchData.csv
└── config.json
```

### 2. Use Meaningful Data File Names

```
LoginData.xlsx          ✓ Good
TestData.xlsx           ✗ Bad
data.xlsx               ✗ Bad
```

### 3. Version Control Test Data

- Keep test data files in version control
- Use `.gitignore` for sensitive data
- Document data file format

### 4. Maintain Data Consistency

```java
// Use constants for column names
public class TestDataColumns {
    public static final String USERNAME = "Username";
    public static final String PASSWORD = "Password";
    public static final String EXPECTED = "Expected";
}
```

### 5. Validate Test Data

```java
@DataProvider(name = "validatedData")
public Object[][] getValidatedData() {
    Object[][] rawData = ExcelUtils.readExcel("data.xlsx", "Sheet1");

    // Validate data
    for (Object[] row : rawData) {
        if (row[0] == null || row[0].toString().isEmpty()) {
            throw new RuntimeException("Invalid test data: Empty username");
        }
    }

    return rawData;
}
```

### 6. Use Configuration Files

```properties
# config.properties
test.data.path=src/test/resources/testdata/
excel.file.name=LoginData.xlsx
csv.file.name=SearchData.csv
json.file.name=apiData.json

db.url=jdbc:mysql://localhost:3306/testdb
db.username=root
db.password=password
```

### 7. Handle Large Datasets Efficiently

```java
// Read data in batches
public Object[][] getLargeDataset() {
    int batchSize = 100;
    int startRow = 0;

    ExcelUtils excel = new ExcelUtils("LargeData.xlsx", "Sheet1");
    // Implement pagination logic
    return excel.getDataRange(startRow, batchSize);
}
```

### 8. Implement Data Cleanup

```java
@AfterClass
public void cleanupTestData() {
    // Delete temporary data
    // Reset database to original state
    // Clear cache files
}
```

### 9. Use Data Factories

```java
public class TestDataFactory {

    public static Object[][] getLoginData(String source) {
        switch (source.toLowerCase()) {
            case "excel":
                return getExcelLoginData();
            case "csv":
                return getCSVLoginData();
            case "json":
                return getJSONLoginData();
            case "database":
                return getDatabaseLoginData();
            default:
                throw new IllegalArgumentException("Invalid data source: " + source);
        }
    }

    private static Object[][] getExcelLoginData() {
        // Excel implementation
        return new Object[0][];
    }

    private static Object[][] getCSVLoginData() {
        // CSV implementation
        return new Object[0][];
    }

    private static Object[][] getJSONLoginData() {
        // JSON implementation
        return new Object[0][];
    }

    private static Object[][] getDatabaseLoginData() {
        // Database implementation
        return new Object[0][];
    }
}
```

### 10. Document Test Data Format

```
# LoginData.xlsx Format

Sheet: Login
Columns:
- Username (String): User's login username
- Password (String): User's password
- Expected (String): Expected result (Success/Fail)

Example:
| Username       | Password  | Expected |
|----------------|-----------|----------|
| validuser      | pass123   | Success  |
| invaliduser    | wrongpass | Fail     |
```

---

## 15. Key Takeaways

1. **Data-Driven Testing** separates test logic from test data
2. **Apache POI** is the standard library for Excel operations
3. **OpenCSV** provides simple CSV file handling
4. **Jackson/Gson** are popular libraries for JSON processing
5. **JDBC** enables database connectivity for test data
6. **Properties files** are ideal for configuration management
7. **TestNG DataProvider** integrates seamlessly with external data
8. **Utility classes** promote code reusability
9. **Proper data management** improves test maintenance
10. **Multiple data sources** provide flexibility in framework design

---

## 16. Common Interview Questions

1. What is data-driven testing and why is it important?
2. How do you read data from Excel using Apache POI?
3. Explain the difference between Workbook, Sheet, Row, and Cell in Apache POI.
4. How do you integrate Excel data with TestNG DataProvider?
5. What is the difference between Jackson and Gson?
6. How do you connect to a database using JDBC?
7. What are PreparedStatements and why should you use them?
8. How do you handle different data types when reading from Excel?
9. What are the best practices for managing test data?
10. How do you choose between Excel, CSV, JSON, and Database for test data?
11. Explain how to create a reusable Excel utility class.
12. How do you handle large datasets in data-driven testing?
13. What is the purpose of properties files in test automation?
14. How do you implement data-driven testing with multiple data sources?
15. What are the advantages and disadvantages of each data source type?

---

## 17. Hands-On Exercises

These progressive exercises will help you master external data sources and data-driven testing. Start with Exercise 1 and work your way through each one.

---

### Exercise 1: Build Excel Utility and Read Test Data (30 minutes)

**Objective:** Create a complete Excel utility class and use it to read test data for a login test.

**Scenario:** You need to create an ExcelUtils class that can read login credentials from an Excel file and use them in data-driven tests.

**Instructions:**

1. Create `ExcelUtils.java` utility class
2. Implement methods to read data from Excel
3. Create an Excel file with login test data
4. Create test class using TestNG DataProvider
5. Run data-driven tests with Excel data

**Code Template:**

```java
package utils;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileInputStream;
import java.io.IOException;

public class ExcelUtils {

    private String filePath;
    private Workbook workbook;
    private Sheet sheet;

    // TODO: Implement constructor
    public ExcelUtils(String filePath, String sheetName) {
        // Your code here
        // 1. Store filePath
        // 2. Open FileInputStream
        // 3. Create XSSFWorkbook
        // 4. Get sheet by name
        // 5. Close FileInputStream
    }

    // TODO: Implement getRowCount method
    public int getRowCount() {
        // Your code here
        // Return sheet.getLastRowNum() + 1
        return 0;
    }

    // TODO: Implement getColumnCount method
    public int getColumnCount() {
        // Your code here
        // Get first row and return column count
        return 0;
    }

    // TODO: Implement getCellData method
    public String getCellData(int rowNum, int colNum) {
        // Your code here
        // 1. Use DataFormatter for consistent string output
        // 2. Get cell from row
        // 3. Format and return cell value
        return "";
    }

    // TODO: Implement getCellData by column name
    public String getCellData(int rowNum, String columnName) {
        // Your code here
        // 1. Find column number by name
        // 2. Call getCellData(rowNum, colNum)
        return "";
    }

    // TODO: Implement helper method to find column number
    private int getColumnNumber(String columnName) {
        // Your code here
        // 1. Get header row (row 0)
        // 2. Iterate through cells
        // 3. Compare cell value with columnName
        // 4. Return column index if found
        return -1;
    }

    // TODO: Implement getAllData method for DataProvider
    public Object[][] getAllData() {
        // Your code here
        // 1. Get row and column counts
        // 2. Create 2D Object array (exclude header row)
        // 3. Loop through all data rows
        // 4. Fill array with cell values
        // 5. Return data array
        return new Object[0][0];
    }

    // TODO: Implement getDataByColumns method
    public Object[][] getDataByColumns(String... columnNames) {
        // Your code here
        // 1. Get row count
        // 2. Create 2D array with size [rows-1][columnNames.length]
        // 3. For each row, get values for specified columns
        // 4. Return data array
        return new Object[0][0];
    }

    // TODO: Implement close method
    public void close() {
        // Your code here
        // Close workbook properly
    }
}
```

**Test Class Template:**

```java
package tests;

import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;
import utils.ExcelUtils;

public class ExcelDataDrivenTest {

    @Test(dataProvider = "loginData")
    public void testLogin(String username, String password, String expected) {
        // TODO: Implement test logic
        System.out.println("Testing with:");
        System.out.println("Username: " + username);
        System.out.println("Password: " + password);
        System.out.println("Expected: " + expected);
        System.out.println("------------------------");

        // Add actual login test logic here
    }

    @DataProvider(name = "loginData")
    public Object[][] getLoginData() {
        // TODO: Implement DataProvider
        String filePath = "src/test/resources/testdata/LoginData.xlsx";
        // 1. Create ExcelUtils instance
        // 2. Get data using getDataByColumns
        // 3. Close ExcelUtils
        // 4. Return data
        return null;
    }
}
```

**Excel File Format (LoginData.xlsx):**

Create an Excel file with this structure:

| Username | Password | Expected |
|----------|----------|----------|
| validuser1 | pass123 | Success |
| validuser2 | pass456 | Success |
| invaliduser | wrong | Fail |
| emptyuser | | Fail |

**Expected Output:**
- ExcelUtils successfully reads all rows from Excel
- DataProvider supplies data to test method
- Test runs 4 times with different data sets
- All data printed correctly

**Common Mistakes to Avoid:**
1. ❌ Forgetting to close FileInputStream in constructor
2. ❌ Not handling null cells in getCellData
3. ❌ Including header row in data array
4. ❌ Not using DataFormatter for consistent string output
5. ❌ Forgetting to close workbook in close() method

**Solution Hints:**
- Use try-with-resources for FileInputStream
- DataFormatter handles all cell types consistently
- getLastRowNum() returns 0-based index, add 1 for count
- Header row is at index 0, data starts at index 1
- Close workbook in finally block or close() method

---

### Exercise 2: CSV Data Provider with Filtering (35 minutes)

**Objective:** Create a CSV utility class that can read and filter test data based on conditions.

**Scenario:** Build a CSVUtils class that reads test data from CSV files and provides filtering capabilities for running specific test scenarios.

**Instructions:**

1. Create `CSVUtils.java` utility class using OpenCSV
2. Implement methods to read all data and filtered data
3. Create CSV file with test data
4. Create test class with multiple DataProviders
5. Test with filtered and unfiltered data

**Code Template:**

```java
package utils;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class CSVUtils {

    // TODO: Implement readCSV method
    public static Object[][] readCSV(String filePath) {
        List<String[]> records = new ArrayList<>();

        // Your code here
        // 1. Create CSVReader with FileReader
        // 2. Read all records using reader.readAll()
        // 3. Remove header row if present
        // 4. Convert List to 2D Object array
        // 5. Return array

        return new Object[0][0];
    }

    // TODO: Implement readCSVWithFilter method
    public static Object[][] readCSVWithFilter(String filePath, int columnIndex, String filterValue) {
        List<String[]> allRecords = new ArrayList<>();
        List<String[]> filteredRecords = new ArrayList<>();

        // Your code here
        // 1. Read all records using CSVReader
        // 2. Remove header row
        // 3. Filter records based on column value
        // 4. Convert filtered list to 2D array
        // 5. Return filtered array

        return new Object[0][0];
    }

    // TODO: Implement readSpecificColumns method
    public static Object[][] readSpecificColumns(String filePath, int... columnIndexes) {
        List<String[]> allRecords = new ArrayList<>();

        // Your code here
        // 1. Read all records
        // 2. Remove header
        // 3. Extract only specified columns
        // 4. Create new array with selected columns
        // 5. Return array

        return new Object[0][0];
    }

    // TODO: Implement getRowCount method
    public static int getRowCount(String filePath) {
        // Your code here
        // 1. Read all records
        // 2. Return count minus header row
        return 0;
    }

    // TODO: Implement getColumnCount method
    public static int getColumnCount(String filePath) {
        // Your code here
        // 1. Read first record
        // 2. Return length of array
        return 0;
    }
}
```

**Test Class Template:**

```java
package tests;

import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;
import utils.CSVUtils;

public class CSVDataDrivenTest {

    @Test(dataProvider = "allData")
    public void testWithAllData(String testCase, String username, String password, String expected) {
        // TODO: Print all data
        System.out.println("Test: " + testCase);
        System.out.println("Username: " + username);
        System.out.println("Password: " + password);
        System.out.println("Expected: " + expected);
        System.out.println("------------------------");
    }

    @Test(dataProvider = "positiveData")
    public void testWithPositiveData(String testCase, String username, String password, String expected) {
        // TODO: Test only positive scenarios
        System.out.println("Positive Test: " + testCase);
        System.out.println("Username: " + username);
        System.out.println("Expected: " + expected);
    }

    @Test(dataProvider = "negativeData")
    public void testWithNegativeData(String testCase, String username, String password, String expected) {
        // TODO: Test only negative scenarios
        System.out.println("Negative Test: " + testCase);
        System.out.println("Username: " + username);
        System.out.println("Expected: " + expected);
    }

    @DataProvider(name = "allData")
    public Object[][] getAllData() {
        // TODO: Return all data from CSV
        String filePath = "src/test/resources/testdata/TestData.csv";
        return CSVUtils.readCSV(filePath);
    }

    @DataProvider(name = "positiveData")
    public Object[][] getPositiveData() {
        // TODO: Filter and return only positive test data
        String filePath = "src/test/resources/testdata/TestData.csv";
        // Use readCSVWithFilter to get only "Success" expected results
        return null;
    }

    @DataProvider(name = "negativeData")
    public Object[][] getNegativeData() {
        // TODO: Filter and return only negative test data
        String filePath = "src/test/resources/testdata/TestData.csv";
        // Use readCSVWithFilter to get only "Fail" expected results
        return null;
    }
}
```

**CSV File Format (TestData.csv):**

```csv
TestCase,Username,Password,Expected
Valid Login,validuser,pass123,Success
Another Valid Login,testuser,test456,Success
Invalid Password,validuser,wrongpass,Fail
Empty Username,,pass123,Fail
Invalid Username,baduser,pass123,Fail
```

**Expected Output:**
- All data test runs 5 times
- Positive data test runs 2 times (Success cases)
- Negative data test runs 3 times (Fail cases)
- Filtering works correctly
- All data printed properly

**Common Mistakes to Avoid:**
1. ❌ Not closing CSVReader properly
2. ❌ Forgetting to remove header row
3. ❌ Wrong column index in filter method
4. ❌ Not handling CsvException
5. ❌ Returning empty array when no matches found in filter

**Solution Hints:**
- Use try-with-resources for CSVReader
- reader.readAll() returns List<String[]>
- First element (index 0) is usually header
- Filter by comparing record[columnIndex] with filterValue
- Check if list is empty before converting to array

---

### Exercise 3: JSON Test Data with Nested Objects (40 minutes)

**Objective:** Create a JSON utility that handles complex JSON structures with nested objects and arrays for test data.

**Scenario:** Build JSONUtils to parse complex JSON test data structures including nested objects and arrays for API and UI testing.

**Instructions:**

1. Create `JSONUtils.java` using Jackson library
2. Implement methods for nested JSON navigation
3. Create JSON file with complex test data
4. Create test class with DataProvider
5. Test with nested JSON data

**Code Template:**

```java
package utils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class JSONUtils {

    private static ObjectMapper mapper = new ObjectMapper();

    // TODO: Implement readJSON method
    public static JsonNode readJSON(String filePath) {
        // Your code here
        // 1. Use ObjectMapper to read tree from file
        // 2. Return root JsonNode
        // 3. Handle IOException
        return null;
    }

    // TODO: Implement getValue method
    public static String getValue(String filePath, String key) {
        // Your code here
        // 1. Read JSON root node
        // 2. Check if key exists
        // 3. Return value as string
        return null;
    }

    // TODO: Implement getNestedValue method
    public static String getNestedValue(String filePath, String... keys) {
        // Your code here
        // 1. Read JSON root
        // 2. Navigate through keys sequentially
        // 3. Return final value as string
        return null;
    }

    // TODO: Implement getArrayValues method
    public static List<String> getArrayValues(String filePath, String arrayKey) {
        List<String> values = new ArrayList<>();

        // Your code here
        // 1. Read JSON root
        // 2. Get array node by key
        // 3. Check if it's an array
        // 4. Iterate and collect values
        // 5. Return list

        return values;
    }

    // TODO: Implement getTestDataFromArray method
    public static Object[][] getTestDataFromArray(String filePath, String arrayKey) {
        List<Object[]> dataList = new ArrayList<>();

        // Your code here
        // 1. Read JSON root
        // 2. Get array node
        // 3. For each object in array:
        //    - Create Object array for row
        //    - Add all field values to array
        // 4. Convert List to 2D Object array
        // 5. Return array

        return new Object[0][0];
    }

    // TODO: Implement getTestDataByName method
    public static Object[][] getTestDataByName(String filePath, String testName) {
        List<Object[]> testDataList = new ArrayList<>();

        // Your code here
        // 1. Read JSON root
        // 2. Get "tests" array
        // 3. Find test object by name
        // 4. Get "data" array from test object
        // 5. Convert to 2D Object array
        // 6. Return array

        return new Object[0][0];
    }
}
```

**Test Class Template:**

```java
package tests;

import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;
import utils.JSONUtils;

import java.util.List;

public class JSONDataDrivenTest {

    @Test(dataProvider = "loginData")
    public void testLoginWithJSON(String username, String password, String expected) {
        // TODO: Implement login test
        System.out.println("Username: " + username);
        System.out.println("Password: " + password);
        System.out.println("Expected: " + expected);
        System.out.println("------------------------");
    }

    @Test
    public void testReadNestedConfig() {
        // TODO: Read nested configuration values
        String filePath = "src/test/resources/testdata/config.json";

        // Read simple value
        String browser = JSONUtils.getValue(filePath, "browser");
        System.out.println("Browser: " + browser);

        // Read nested value
        String dbHost = JSONUtils.getNestedValue(filePath, "database", "host");
        System.out.println("DB Host: " + dbHost);

        // Read array values
        List<String> testSuites = JSONUtils.getArrayValues(filePath, "testSuites");
        System.out.println("Test Suites: " + testSuites);
    }

    @DataProvider(name = "loginData")
    public Object[][] getLoginData() {
        // TODO: Read login data from JSON
        String filePath = "src/test/resources/testdata/testData.json";
        return JSONUtils.getTestDataByName(filePath, "loginTests");
    }
}
```

**JSON File Format (testData.json):**

```json
{
  "tests": [
    {
      "name": "loginTests",
      "description": "Login test scenarios",
      "data": [
        ["validuser1", "pass123", "Success"],
        ["validuser2", "pass456", "Success"],
        ["invaliduser", "wrongpass", "Fail"],
        ["", "pass123", "Fail"]
      ]
    },
    {
      "name": "searchTests",
      "description": "Search test scenarios",
      "data": [
        ["laptop", "10"],
        ["phone", "5"],
        ["tablet", "3"]
      ]
    }
  ]
}
```

**JSON Config File (config.json):**

```json
{
  "browser": "chrome",
  "timeout": 30,
  "database": {
    "host": "localhost",
    "port": 3306,
    "name": "testdb"
  },
  "testSuites": ["smoke", "regression", "sanity"]
}
```

**Expected Output:**
- Login test runs 4 times with JSON data
- Nested config values read correctly
- Array values extracted properly
- All data types handled correctly

**Common Mistakes to Avoid:**
1. ❌ Not checking if JsonNode exists before accessing
2. ❌ Forgetting to handle IOException
3. ❌ Not checking if node is actually an array
4. ❌ Wrong order of nested keys
5. ❌ Not using asText() to convert JsonNode to String

**Solution Hints:**
- Use mapper.readTree() to read JSON file
- Check node.has(key) before accessing
- Use node.isArray() to verify array type
- Navigate nested objects with sequential get() calls
- Iterator<JsonNode> for looping through arrays

---

### Exercise 4: Database Data Provider with Connection Pooling (40 minutes)

**Objective:** Create a robust Database utility class with connection management and integration with TestNG DataProvider.

**Scenario:** Build DatabaseUtils to fetch test data from MySQL database, manage connections efficiently, and provide data to TestNG tests.

**Instructions:**

1. Create `DatabaseUtils.java` with JDBC
2. Implement connection management
3. Create methods to query and fetch data
4. Set up test database and table
5. Create test class using database data

**Code Template:**

```java
package utils;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DatabaseUtils {

    private String url;
    private String username;
    private String password;
    private Connection connection;

    // TODO: Implement constructor
    public DatabaseUtils(String url, String username, String password) {
        // Your code here
        // Store connection details
    }

    // TODO: Implement getConnection method
    public Connection getConnection() {
        // Your code here
        // 1. Check if connection is null or closed
        // 2. Create new connection using DriverManager
        // 3. Return connection
        // 4. Handle SQLException
        return null;
    }

    // TODO: Implement closeConnection method
    public void closeConnection() {
        // Your code here
        // 1. Check if connection is not null and not closed
        // 2. Close connection
        // 3. Print confirmation message
    }

    // TODO: Implement executeQuery method
    public List<Map<String, String>> executeQuery(String query) {
        List<Map<String, String>> results = new ArrayList<>();

        // Your code here
        // 1. Get connection
        // 2. Create Statement
        // 3. Execute query and get ResultSet
        // 4. Get ResultSetMetaData for column info
        // 5. Iterate through ResultSet:
        //    - Create Map for each row
        //    - Put column name and value in map
        //    - Add map to results list
        // 6. Close ResultSet and Statement
        // 7. Return results

        return results;
    }

    // TODO: Implement executeQueryWithParams method
    public List<Map<String, String>> executeQueryWithParams(String query, Object... params) {
        List<Map<String, String>> results = new ArrayList<>();

        // Your code here
        // 1. Get connection
        // 2. Create PreparedStatement
        // 3. Set parameters using loop
        // 4. Execute query
        // 5. Process ResultSet same as above
        // 6. Return results

        return results;
    }

    // TODO: Implement getDataAsArray method
    public Object[][] getDataAsArray(String query) {
        // Your code here
        // 1. Execute query and get List<Map>
        // 2. Check if results are empty
        // 3. Create 2D Object array
        // 4. Fill array with values from maps
        // 5. Return array
        return new Object[0][0];
    }

    // TODO: Implement getColumnsAsArray method
    public Object[][] getColumnsAsArray(String query, String... columnNames) {
        // Your code here
        // 1. Execute query
        // 2. Create array with specific columns only
        // 3. For each row, extract specified columns
        // 4. Return array
        return new Object[0][0];
    }

    // TODO: Implement getSingleValue method
    public String getSingleValue(String query, Object... params) {
        // Your code here
        // 1. Execute query with params
        // 2. Get first value from first row
        // 3. Return as string
        return null;
    }

    // TODO: Implement getRowCount method
    public int getRowCount(String tableName) {
        // Your code here
        // 1. Create COUNT query
        // 2. Execute and get single value
        // 3. Parse to int and return
        return 0;
    }
}
```

**SQL Setup Script:**

```sql
-- Create test database
CREATE DATABASE IF NOT EXISTS testdb;
USE testdb;

-- Create test_users table
CREATE TABLE IF NOT EXISTS test_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    role VARCHAR(20),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert test data
INSERT INTO test_users (username, password, email, role, active) VALUES
('validuser1', 'pass123', 'valid1@test.com', 'user', TRUE),
('validuser2', 'pass456', 'valid2@test.com', 'user', TRUE),
('adminuser', 'admin123', 'admin@test.com', 'admin', TRUE),
('testuser', 'test789', 'test@test.com', 'user', TRUE),
('inactiveuser', 'pass000', 'inactive@test.com', 'user', FALSE);

-- Verify data
SELECT * FROM test_users;
```

**Test Class Template:**

```java
package tests;

import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;
import utils.DatabaseUtils;

public class DatabaseDataDrivenTest {

    DatabaseUtils dbUtils;

    @BeforeClass
    public void setupDatabase() {
        // TODO: Initialize DatabaseUtils
        String url = "jdbc:mysql://localhost:3306/testdb";
        String username = "root";
        String password = "password";

        dbUtils = new DatabaseUtils(url, username, password);

        // Verify connection
        System.out.println("Database connected successfully!");
    }

    @Test(dataProvider = "activeUsers")
    public void testWithActiveUsers(String username, String password, String email) {
        // TODO: Test with active users only
        System.out.println("Testing with active user:");
        System.out.println("Username: " + username);
        System.out.println("Password: " + password);
        System.out.println("Email: " + email);
        System.out.println("------------------------");
    }

    @Test(dataProvider = "adminUsers")
    public void testWithAdminUsers(String username, String role) {
        // TODO: Test with admin users
        System.out.println("Testing with admin:");
        System.out.println("Username: " + username);
        System.out.println("Role: " + role);
    }

    @Test
    public void testDatabaseOperations() {
        // TODO: Test various database operations

        // Get row count
        int count = dbUtils.getRowCount("test_users");
        System.out.println("Total users: " + count);

        // Get single value
        String email = dbUtils.getSingleValue(
            "SELECT email FROM test_users WHERE username = ?",
            "validuser1"
        );
        System.out.println("Email: " + email);
    }

    @DataProvider(name = "activeUsers")
    public Object[][] getActiveUsers() {
        // TODO: Get only active users
        String query = "SELECT username, password, email FROM test_users WHERE active = TRUE";
        return dbUtils.getColumnsAsArray(query, "username", "password", "email");
    }

    @DataProvider(name = "adminUsers")
    public Object[][] getAdminUsers() {
        // TODO: Get only admin users
        String query = "SELECT username, role FROM test_users WHERE role = 'admin'";
        return dbUtils.getColumnsAsArray(query, "username", "role");
    }

    @AfterClass
    public void cleanupDatabase() {
        // TODO: Close database connection
        if (dbUtils != null) {
            dbUtils.closeConnection();
        }
    }
}
```

**Expected Output:**
- Database connection established successfully
- Active users test runs 4 times (active users only)
- Admin users test runs 1 time (admin only)
- Row count retrieved correctly
- Single value query works
- Connection closed properly

**Common Mistakes to Avoid:**
1. ❌ Not closing database connections
2. ❌ SQL injection vulnerability (not using PreparedStatement)
3. ❌ Forgetting to close ResultSet and Statement
4. ❌ Not handling SQLException properly
5. ❌ Wrong JDBC URL format for MySQL

**Solution Hints:**
- Use DriverManager.getConnection(url, username, password)
- Always use PreparedStatement for queries with parameters
- Close resources in reverse order: ResultSet → Statement → Connection
- ResultSetMetaData provides column information
- Use getColumnCount() and getColumnName(i) for metadata

---

### Exercise 5: Multi-Source Data Provider Factory (45 minutes)

**Objective:** Create a unified test data factory that can switch between multiple data sources (Excel, CSV, JSON, Database).

**Scenario:** Build TestDataFactory that provides a single interface to fetch test data from any source, making tests flexible and maintainable.

**Instructions:**

1. Create `TestDataFactory.java` with strategy pattern
2. Implement methods for each data source
3. Create configuration to switch data sources
4. Create unified test class
5. Test with different data sources

**Code Template:**

```java
package utils;

public class TestDataFactory {

    public enum DataSource {
        EXCEL, CSV, JSON, DATABASE
    }

    // TODO: Implement getLoginData method
    public static Object[][] getLoginData(DataSource source) {
        // Your code here
        // Use switch statement to return data from appropriate source
        switch (source) {
            case EXCEL:
                return getLoginDataFromExcel();
            case CSV:
                return getLoginDataFromCSV();
            case JSON:
                return getLoginDataFromJSON();
            case DATABASE:
                return getLoginDataFromDatabase();
            default:
                throw new IllegalArgumentException("Invalid data source: " + source);
        }
    }

    // TODO: Implement getLoginDataFromExcel
    private static Object[][] getLoginDataFromExcel() {
        // Your code here
        // 1. Define file path
        // 2. Create ExcelUtils
        // 3. Get data
        // 4. Close Excel
        // 5. Return data
        return new Object[0][0];
    }

    // TODO: Implement getLoginDataFromCSV
    private static Object[][] getLoginDataFromCSV() {
        // Your code here
        // Use CSVUtils to read data
        return new Object[0][0];
    }

    // TODO: Implement getLoginDataFromJSON
    private static Object[][] getLoginDataFromJSON() {
        // Your code here
        // Use JSONUtils to read data
        return new Object[0][0];
    }

    // TODO: Implement getLoginDataFromDatabase
    private static Object[][] getLoginDataFromDatabase() {
        // Your code here
        // 1. Create DatabaseUtils
        // 2. Execute query
        // 3. Get data array
        // 4. Close connection
        // 5. Return data
        return new Object[0][0];
    }

    // TODO: Implement getConfiguredDataSource method
    public static DataSource getConfiguredDataSource() {
        // Your code here
        // 1. Read from config.properties or environment variable
        // 2. Parse string to DataSource enum
        // 3. Return enum value
        return DataSource.EXCEL; // Default
    }

    // TODO: Implement getSearchData method
    public static Object[][] getSearchData(DataSource source) {
        // Your code here
        // Similar to getLoginData but for search test data
        return new Object[0][0];
    }
}
```

**Config Properties Template (config.properties):**

```properties
# Data source configuration
data.source=EXCEL
# Supported values: EXCEL, CSV, JSON, DATABASE

# File paths
excel.file.path=src/test/resources/testdata/LoginData.xlsx
csv.file.path=src/test/resources/testdata/LoginData.csv
json.file.path=src/test/resources/testdata/testData.json

# Database configuration
db.url=jdbc:mysql://localhost:3306/testdb
db.username=root
db.password=password
db.query=SELECT username, password, expected FROM test_login_data
```

**Enhanced ConfigReader Template:**

```java
package utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class ConfigReader {

    private static Properties properties;
    private static final String CONFIG_FILE = "src/test/resources/config.properties";

    static {
        // TODO: Load properties in static block
        // Your code here
    }

    public static String getProperty(String key) {
        return properties.getProperty(key);
    }

    public static String getDataSource() {
        return getProperty("data.source", "EXCEL");
    }

    public static String getExcelFilePath() {
        return getProperty("excel.file.path");
    }

    public static String getCSVFilePath() {
        return getProperty("csv.file.path");
    }

    public static String getJSONFilePath() {
        return getProperty("json.file.path");
    }

    public static String getDatabaseURL() {
        return getProperty("db.url");
    }

    public static String getDatabaseUsername() {
        return getProperty("db.username");
    }

    public static String getDatabasePassword() {
        return getProperty("db.password");
    }

    public static String getDatabaseQuery() {
        return getProperty("db.query");
    }
}
```

**Test Class Template:**

```java
package tests;

import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;
import utils.ConfigReader;
import utils.TestDataFactory;
import utils.TestDataFactory.DataSource;

public class MultiSourceDataTest {

    @Test(dataProvider = "loginData")
    public void testLogin(String username, String password, String expected) {
        // TODO: Implement test
        System.out.println("Testing login with:");
        System.out.println("Username: " + username);
        System.out.println("Password: " + password);
        System.out.println("Expected: " + expected);
        System.out.println("Data Source: " + ConfigReader.getDataSource());
        System.out.println("------------------------");

        // Add actual test logic here
    }

    @Test
    public void testWithExcelData() {
        // TODO: Explicitly test with Excel data
        Object[][] data = TestDataFactory.getLoginData(DataSource.EXCEL);
        System.out.println("Excel data count: " + data.length);
    }

    @Test
    public void testWithCSVData() {
        // TODO: Explicitly test with CSV data
        Object[][] data = TestDataFactory.getLoginData(DataSource.CSV);
        System.out.println("CSV data count: " + data.length);
    }

    @Test
    public void testWithJSONData() {
        // TODO: Explicitly test with JSON data
        Object[][] data = TestDataFactory.getLoginData(DataSource.JSON);
        System.out.println("JSON data count: " + data.length);
    }

    @Test
    public void testWithDatabaseData() {
        // TODO: Explicitly test with Database data
        Object[][] data = TestDataFactory.getLoginData(DataSource.DATABASE);
        System.out.println("Database data count: " + data.length);
    }

    @DataProvider(name = "loginData")
    public Object[][] getLoginData() {
        // TODO: Get data source from configuration
        String sourceStr = ConfigReader.getDataSource();
        DataSource source = DataSource.valueOf(sourceStr);

        // Return data from configured source
        return TestDataFactory.getLoginData(source);
    }
}
```

**Expected Output:**
- Test runs with configured data source
- Can switch between sources by changing config
- All sources provide same data format
- Factory pattern works correctly
- Configuration properly loaded

**Common Mistakes to Avoid:**
1. ❌ Not handling invalid data source enum values
2. ❌ Hardcoding file paths instead of using configuration
3. ❌ Not closing resources in factory methods
4. ❌ Inconsistent data format across sources
5. ❌ Not validating configuration values

**Solution Hints:**
- Use enum for type-safe data source selection
- Always read paths and settings from config file
- Ensure all methods return same Object[][] format
- Close database connection in finally block
- Use valueOf() to convert String to enum

---

### Exercise 6: Complete Data-Driven Framework Integration (45 minutes)

**Objective:** Build a complete end-to-end data-driven test framework integrating all data sources with Page Object Model.

**Scenario:** Create a production-ready data-driven framework with Excel, CSV, JSON, and Database support, integrated with POM and configuration management.

**Instructions:**

1. Create complete project structure
2. Build all utility classes
3. Create Page Objects
4. Implement comprehensive test class
5. Run complete test suite with multiple data sources

**Project Structure:**

```
src/test/
├── java/
│   ├── pages/
│   │   ├── BasePage.java
│   │   └── LoginPage.java
│   ├── tests/
│   │   └── CompleteDataDrivenTest.java
│   └── utils/
│       ├── ExcelUtils.java
│       ├── CSVUtils.java
│       ├── JSONUtils.java
│       ├── DatabaseUtils.java
│       ├── TestDataFactory.java
│       └── ConfigReader.java
└── resources/
    ├── config.properties
    └── testdata/
        ├── LoginData.xlsx
        ├── LoginData.csv
        └── testData.json
```

**BasePage Template:**

```java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public abstract class BasePage {

    protected WebDriver driver;
    protected WebDriverWait wait;

    public BasePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        PageFactory.initElements(driver, this);
    }

    // TODO: Add common methods
    protected void click(WebElement element) {
        wait.until(ExpectedConditions.elementToBeClickable(element));
        element.click();
    }

    protected void type(WebElement element, String text) {
        wait.until(ExpectedConditions.visibilityOf(element));
        element.clear();
        element.sendKeys(text);
    }

    protected boolean isDisplayed(WebElement element) {
        try {
            return element.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
}
```

**LoginPage Template:**

```java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class LoginPage extends BasePage {

    @FindBy(id = "username")
    private WebElement usernameField;

    @FindBy(id = "password")
    private WebElement passwordField;

    @FindBy(id = "loginBtn")
    private WebElement loginButton;

    @FindBy(className = "error-message")
    private WebElement errorMessage;

    @FindBy(className = "success-message")
    private WebElement successMessage;

    public LoginPage(WebDriver driver) {
        super(driver);
    }

    // TODO: Implement login method
    public void login(String username, String password) {
        // Your code here
    }

    // TODO: Implement verification methods
    public boolean isLoginSuccessful() {
        // Your code here
        return false;
    }

    public String getErrorMessage() {
        // Your code here
        return "";
    }
}
```

**Complete Test Class Template:**

```java
package tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.*;
import pages.LoginPage;
import utils.ConfigReader;
import utils.TestDataFactory;
import utils.TestDataFactory.DataSource;

import java.time.Duration;

public class CompleteDataDrivenTest {

    WebDriver driver;
    LoginPage loginPage;

    @BeforeMethod
    public void setup() {
        // TODO: Setup WebDriver
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        driver.get(ConfigReader.getProperty("app.url", "https://example.com/login"));

        loginPage = new LoginPage(driver);
    }

    @Test(dataProvider = "excelLoginData", groups = {"excel", "smoke"})
    public void testLoginWithExcelData(String username, String password, String expected) {
        // TODO: Implement test logic
        System.out.println("Testing with Excel data:");
        loginPage.login(username, password);

        if (expected.equalsIgnoreCase("Success")) {
            Assert.assertTrue(loginPage.isLoginSuccessful(),
                "Login should succeed for: " + username);
        } else {
            Assert.assertFalse(loginPage.getErrorMessage().isEmpty(),
                "Error message should be displayed for: " + username);
        }
    }

    @Test(dataProvider = "csvLoginData", groups = {"csv", "smoke"})
    public void testLoginWithCSVData(String username, String password, String expected) {
        // TODO: Same test logic as Excel test
        System.out.println("Testing with CSV data:");
        loginPage.login(username, password);

        if (expected.equalsIgnoreCase("Success")) {
            Assert.assertTrue(loginPage.isLoginSuccessful());
        }
    }

    @Test(dataProvider = "jsonLoginData", groups = {"json", "regression"})
    public void testLoginWithJSONData(String username, String password, String expected) {
        // TODO: Same test logic
        System.out.println("Testing with JSON data:");
        loginPage.login(username, password);
    }

    @Test(dataProvider = "dbLoginData", groups = {"database", "regression"})
    public void testLoginWithDatabaseData(String username, String password, String expected) {
        // TODO: Same test logic
        System.out.println("Testing with Database data:");
        loginPage.login(username, password);
    }

    @Test(dataProvider = "configuredLoginData", groups = {"smoke", "regression"})
    public void testLoginWithConfiguredSource(String username, String password, String expected) {
        // TODO: Test with source from config
        System.out.println("Testing with configured data source:");
        System.out.println("Source: " + ConfigReader.getDataSource());
        loginPage.login(username, password);
    }

    // Data Providers
    @DataProvider(name = "excelLoginData")
    public Object[][] getExcelLoginData() {
        return TestDataFactory.getLoginData(DataSource.EXCEL);
    }

    @DataProvider(name = "csvLoginData")
    public Object[][] getCSVLoginData() {
        return TestDataFactory.getLoginData(DataSource.CSV);
    }

    @DataProvider(name = "jsonLoginData")
    public Object[][] getJSONLoginData() {
        return TestDataFactory.getLoginData(DataSource.JSON);
    }

    @DataProvider(name = "dbLoginData")
    public Object[][] getDatabaseLoginData() {
        return TestDataFactory.getLoginData(DataSource.DATABASE);
    }

    @DataProvider(name = "configuredLoginData")
    public Object[][] getConfiguredLoginData() {
        String source = ConfigReader.getDataSource();
        return TestDataFactory.getLoginData(DataSource.valueOf(source));
    }

    @AfterMethod
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

**TestNG XML Configuration:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Data-Driven Test Suite">

    <test name="Excel Data Tests">
        <groups>
            <run>
                <include name="excel"/>
            </run>
        </groups>
        <classes>
            <class name="tests.CompleteDataDrivenTest"/>
        </classes>
    </test>

    <test name="CSV Data Tests">
        <groups>
            <run>
                <include name="csv"/>
            </run>
        </groups>
        <classes>
            <class name="tests.CompleteDataDrivenTest"/>
        </classes>
    </test>

    <test name="All Smoke Tests">
        <groups>
            <run>
                <include name="smoke"/>
            </run>
        </groups>
        <classes>
            <class name="tests.CompleteDataDrivenTest"/>
        </classes>
    </test>

</suite>
```

**Tasks to Complete:**

1. Implement all utility classes (ExcelUtils, CSVUtils, JSONUtils, DatabaseUtils)
2. Complete TestDataFactory with all data source methods
3. Implement BasePage common methods
4. Complete LoginPage methods
5. Implement all test methods
6. Create all test data files
7. Configure config.properties
8. Run tests with different groups

**Expected Output:**
- All utility classes work correctly
- Data factory switches sources seamlessly
- Tests run with all data sources
- Page Object Model integration works
- Configuration management effective
- TestNG groups execute properly

**Common Mistakes to Avoid:**
1. ❌ Not consistent data format across all sources
2. ❌ Missing proper exception handling in utilities
3. ❌ Not closing resources (Excel, Database connections)
4. ❌ Hardcoding file paths and configurations
5. ❌ Not using Page Object Model correctly
6. ❌ Missing proper wait strategies
7. ❌ Not implementing reusable base methods

**Solution Hints:**
- All data sources must return Object[][] with same structure
- Use try-with-resources for all file and database operations
- ConfigReader should be static and load once
- BasePage should have all common WebDriver operations
- TestDataFactory is the single point for data access
- Use TestNG groups for flexible test execution
- Ensure proper cleanup in @AfterMethod

---

## Navigation

- **Previous:** [Day 30: Advanced POM Patterns](./day30_advanced_pom_patterns.md)
- **Next:** [Day 32: Logging & Reporting Part 1](./day32_logging_reporting_part1.md)
- **Week 5 Home:** [Week 5 Overview](./README.md)

---

**Congratulations!** You have mastered working with external data sources for data-driven testing. These skills are essential for building scalable and maintainable test automation frameworks that can handle complex real-world testing scenarios.

**Next:** In Day 38, we'll explore logging and reporting frameworks to track test execution and generate comprehensive test reports.

**Happy Learning!** Mastering external data sources is essential for building robust and maintainable data-driven test automation frameworks.
