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

## Navigation

- **Previous:** [Day 36: Page Object Model Part 2](./day36_pom_part2.md)
- **Next:** [Day 38: Logging & Reporting Part 1](./day38_logging_reporting_part1.md)
- **Week 6 Home:** [Week 6 Overview](./README.md)

---

**Happy Learning!** Mastering external data sources is essential for building robust and maintainable data-driven test automation frameworks.
