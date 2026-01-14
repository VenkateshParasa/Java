# Day 27: JSON & CSV Data Handling

## Learning Objectives

By the end of this lesson, you will be able to:
- Understand JSON and CSV data formats
- Parse JSON data using Gson and Jackson libraries
- Read and write CSV files using OpenCSV
- Implement data-driven testing with JSON and CSV
- Compare different data formats (Excel vs JSON vs CSV)
- Create utility classes for JSON and CSV operations
- Use JSON/CSV data with TestNG DataProvider
- Handle complex JSON structures
- Apply best practices for data format selection

---

## Table of Contents

1. [Introduction to JSON and CSV](#1-introduction-to-json-and-csv)
2. [JSON Parsing with Gson](#2-json-parsing-with-gson)
3. [JSON Parsing with Jackson](#3-json-parsing-with-jackson)
4. [CSV Reading with OpenCSV](#4-csv-reading-with-opencsv)
5. [JSON Utility Class](#5-json-utility-class)
6. [CSV Utility Class](#6-csv-utility-class)
7. [Data-Driven Testing with JSON](#7-data-driven-testing-with-json)
8. [Data-Driven Testing with CSV](#8-data-driven-testing-with-csv)
9. [Comparing Data Formats](#9-comparing-data-formats)
10. [Best Practices](#10-best-practices)
11. [Complete Examples](#11-complete-examples)
12. [Key Takeaways](#12-key-takeaways)
13. [Interview Questions](#13-interview-questions)

---

## 1. Introduction to JSON and CSV

### What is JSON?

**JSON (JavaScript Object Notation)** is a lightweight data-interchange format that's easy for humans to read and write, and easy for machines to parse and generate.

**Sample JSON:**
```json
{
  "testCase": "TC001",
  "username": "user@test.com",
  "password": "Pass@123",
  "expectedResult": "Login Success"
}
```

### What is CSV?

**CSV (Comma-Separated Values)** is a simple file format used to store tabular data in plain text.

**Sample CSV:**
```csv
TestCase,Username,Password,ExpectedResult
TC001,user@test.com,Pass@123,Login Success
TC002,invalid@test.com,wrong,Login Failed
```

### JSON vs CSV Comparison

```java
package concepts;

public class DataFormatComparison {
    
    /*
     * JSON Advantages:
     * - Hierarchical/nested data structure
     * - Self-describing (includes field names)
     * - Supports complex data types (arrays, objects)
     * - Easy to parse and generate
     * - Widely used in APIs
     * 
     * JSON Disadvantages:
     * - Larger file size
     * - More verbose
     * - Requires parsing library
     * 
     * CSV Advantages:
     * - Simple and lightweight
     * - Smaller file size
     * - Easy to edit in text editor or Excel
     * - Fast to parse
     * - Universal support
     * 
     * CSV Disadvantages:
     * - Flat structure only
     * - No data type information
     * - Issues with special characters
     * - No standard for nested data
     */
}
```

---

## 2. JSON Parsing with Gson

### Maven Dependency

```xml
<dependency>
    <groupId>com.google.code.gson</groupId>
    <artifactId>gson</artifactId>
    <version>2.10.1</version>
</dependency>
```

### Basic JSON Parsing

**testdata.json:**
```json
{
  "username": "testuser@example.com",
  "password": "Test@123",
  "firstName": "John",
  "lastName": "Doe"
}
```

```java
package utils;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.io.FileReader;
import java.io.IOException;

public class BasicGsonExample {
    
    /**
     * Read JSON file and parse
     */
    public static void readJsonFile(String filePath) {
        try {
            Gson gson = new Gson();
            FileReader reader = new FileReader(filePath);
            
            // Parse to JsonObject
            JsonObject jsonObject = gson.fromJson(reader, JsonObject.class);
            
            // Get values
            String username = jsonObject.get("username").getAsString();
            String password = jsonObject.get("password").getAsString();
            
            System.out.println("Username: " + username);
            System.out.println("Password: " + password);
            
            reader.close();
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### JSON to Java Object

**User.java:**
```java
package models;

public class User {
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    
    // Constructors
    public User() {}
    
    public User(String username, String password, String firstName, String lastName) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    
    // Getters and Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    
    @Override
    public String toString() {
        return "User{username='" + username + "', firstName='" + firstName + 
               "', lastName='" + lastName + "'}";
    }
}
```

**Parsing JSON to Object:**
```java
package utils;

import com.google.gson.Gson;
import models.User;
import java.io.FileReader;
import java.io.IOException;

public class GsonObjectMapping {
    
    /**
     * Parse JSON to User object
     */
    public static User readUserFromJson(String filePath) {
        try {
            Gson gson = new Gson();
            FileReader reader = new FileReader(filePath);
            
            // Directly map to User object
            User user = gson.fromJson(reader, User.class);
            
            reader.close();
            return user;
            
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
```

### JSON Array Parsing

**users.json:**
```json
[
  {
    "username": "user1@test.com",
    "password": "Pass@123",
    "firstName": "John",
    "lastName": "Doe"
  },
  {
    "username": "user2@test.com",
    "password": "Pass@456",
    "firstName": "Jane",
    "lastName": "Smith"
  }
]
```

```java
package utils;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import models.User;
import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.List;

public class GsonArrayParsing {
    
    /**
     * Parse JSON array to List of objects
     */
    public static List<User> readUsersFromJson(String filePath) {
        try {
            Gson gson = new Gson();
            FileReader reader = new FileReader(filePath);
            
            // Define type for List<User>
            Type userListType = new TypeToken<List<User>>(){}.getType();
            
            // Parse to List
            List<User> users = gson.fromJson(reader, userListType);
            
            reader.close();
            return users;
            
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
```

### Complex JSON Structure

**testdata.json:**
```json
{
  "environment": "QA",
  "users": [
    {
      "username": "user1@test.com",
      "password": "Pass@123",
      "role": "user"
    },
    {
      "username": "admin@test.com",
      "password": "Admin@123",
      "role": "admin"
    }
  ],
  "products": [
    {
      "name": "Laptop",
      "price": 999.99,
      "category": "Electronics"
    }
  ]
}
```

**TestData.java:**
```java
package models;

import java.util.List;

public class TestData {
    private String environment;
    private List<User> users;
    private List<Product> products;
    
    // Getters and Setters
    public String getEnvironment() { return environment; }
    public void setEnvironment(String environment) { this.environment = environment; }
    
    public List<User> getUsers() { return users; }
    public void setUsers(List<User> users) { this.users = users; }
    
    public List<Product> getProducts() { return products; }
    public void setProducts(List<Product> products) { this.products = products; }
}

class Product {
    private String name;
    private double price;
    private String category;
    
    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}
```

---

## 3. JSON Parsing with Jackson

### Maven Dependency

```xml
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.16.1</version>
</dependency>
```

### Basic Jackson Usage

```java
package utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import models.User;
import java.io.File;
import java.io.IOException;

public class JacksonExample {
    
    /**
     * Read JSON using Jackson
     */
    public static User readUserWithJackson(String filePath) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            User user = mapper.readValue(new File(filePath), User.class);
            return user;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
    
    /**
     * Write object to JSON
     */
    public static void writeUserToJson(User user, String filePath) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            mapper.writerWithDefaultPrettyPrinter()
                  .writeValue(new File(filePath), user);
            System.out.println("JSON file created: " + filePath);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

---

## 4. CSV Reading with OpenCSV

### Maven Dependency

```xml
<dependency>
    <groupId>com.opencsv</groupId>
    <artifactId>opencsv</artifactId>
    <version>5.9</version>
</dependency>
```

### Basic CSV Reading

**testdata.csv:**
```csv
TestCase,Username,Password,ExpectedResult
TC001,user@test.com,Pass@123,Login Success
TC002,invalid@test.com,wrong,Login Failed
TC003,user@test.com,,Error: Required
```

```java
package utils;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import java.io.FileReader;
import java.io.IOException;
import java.util.List;

public class BasicCSVReader {
    
    /**
     * Read all CSV data
     */
    public static List<String[]> readCSV(String filePath) {
        try {
            CSVReader reader = new CSVReader(new FileReader(filePath));
            List<String[]> allData = reader.readAll();
            reader.close();
            return allData;
        } catch (IOException | CsvException e) {
            e.printStackTrace();
            return null;
        }
    }
    
    /**
     * Read CSV and print
     */
    public static void printCSVData(String filePath) {
        List<String[]> data = readCSV(filePath);
        
        if (data != null) {
            for (String[] row : data) {
                for (String cell : row) {
                    System.out.print(cell + "\t");
                }
                System.out.println();
            }
        }
    }
    
    /**
     * Read CSV skipping header
     */
    public static List<String[]> readCSVWithoutHeader(String filePath) {
        try {
            CSVReader reader = new CSVReader(new FileReader(filePath));
            List<String[]> allData = reader.readAll();
            reader.close();
            
            // Remove header (first row)
            if (!allData.isEmpty()) {
                allData.remove(0);
            }
            
            return allData;
        } catch (IOException | CsvException e) {
            e.printStackTrace();
            return null;
        }
    }
}
```

### CSV to Object Mapping

```java
package utils;

import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import models.User;
import java.io.FileReader;
import java.io.IOException;
import java.util.List;

public class CSVBeanMapping {
    
    /**
     * Map CSV to Java objects
     */
    public static List<User> readUsersFromCSV(String filePath) {
        try {
            FileReader reader = new FileReader(filePath);
            
            CsvToBean<User> csvToBean = new CsvToBeanBuilder<User>(reader)
                .withType(User.class)
                .withIgnoreLeadingWhiteSpace(true)
                .build();
            
            List<User> users = csvToBean.parse();
            reader.close();
            
            return users;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
```

---

## 5. JSON Utility Class

```java
package utils;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

public class JsonUtils {
    
    private static Gson gson = new Gson();
    
    /**
     * Read JSON file to JsonObject
     */
    public static JsonObject readJsonFile(String filePath) {
        try {
            FileReader reader = new FileReader(filePath);
            JsonObject jsonObject = gson.fromJson(reader, JsonObject.class);
            reader.close();
            return jsonObject;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
    
    /**
     * Read JSON file to specific class
     */
    public static <T> T readJsonFile(String filePath, Class<T> classType) {
        try {
            FileReader reader = new FileReader(filePath);
            T object = gson.fromJson(reader, classType);
            reader.close();
            return object;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
    
    /**
     * Read JSON array to List
     */
    public static <T> List<T> readJsonArray(String filePath, Class<T> classType) {
        try {
            FileReader reader = new FileReader(filePath);
            Type listType = TypeToken.getParameterized(List.class, classType).getType();
            List<T> list = gson.fromJson(reader, listType);
            reader.close();
            return list;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
    
    /**
     * Write object to JSON file
     */
    public static void writeJsonFile(Object object, String filePath) {
        try {
            FileWriter writer = new FileWriter(filePath);
            gson.toJson(object, writer);
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    /**
     * Get value from JSON by key
     */
    public static String getJsonValue(String filePath, String key) {
        JsonObject jsonObject = readJsonFile(filePath);
        if (jsonObject != null && jsonObject.has(key)) {
            return jsonObject.get(key).getAsString();
        }
        return null;
    }
    
    /**
     * Get nested value from JSON
     */
    public static String getNestedValue(String filePath, String... keys) {
        JsonObject jsonObject = readJsonFile(filePath);
        
        for (int i = 0; i < keys.length - 1; i++) {
            if (jsonObject != null && jsonObject.has(keys[i])) {
                jsonObject = jsonObject.getAsJsonObject(keys[i]);
            } else {
                return null;
            }
        }
        
        if (jsonObject != null && jsonObject.has(keys[keys.length - 1])) {
            return jsonObject.get(keys[keys.length - 1]).getAsString();
        }
        
        return null;
    }
    
    /**
     * Convert JSON array to 2D array for TestNG DataProvider
     */
    public static Object[][] jsonArrayToDataProvider(String filePath) {
        try {
            FileReader reader = new FileReader(filePath);
            JsonArray jsonArray = gson.fromJson(reader, JsonArray.class);
            reader.close();
            
            Object[][] data = new Object[jsonArray.size()][];
            
            for (int i = 0; i < jsonArray.size(); i++) {
                JsonObject jsonObject = jsonArray.get(i).getAsJsonObject();
                List<Object> rowData = new ArrayList<>();
                
                for (String key : jsonObject.keySet()) {
                    JsonElement element = jsonObject.get(key);
                    if (element.isJsonPrimitive()) {
                        rowData.add(element.getAsString());
                    }
                }
                
                data[i] = rowData.toArray();
            }
            
            return data;
            
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
```

---

## 6. CSV Utility Class

```java
package utils;

import com.opencsv.CSVReader;
import com.opencsv.CSVWriter;
import com.opencsv.exceptions.CsvException;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CsvUtils {
    
    /**
     * Read all CSV data
     */
    public static List<String[]> readCSV(String filePath) {
        try {
            CSVReader reader = new CSVReader(new FileReader(filePath));
            List<String[]> data = reader.readAll();
            reader.close();
            return data;
        } catch (IOException | CsvException e) {
            e.printStackTrace();
            return null;
        }
    }
    
    /**
     * Read CSV without header
     */
    public static List<String[]> readCSVData(String filePath) {
        List<String[]> allData = readCSV(filePath);
        if (allData != null && !allData.isEmpty()) {
            allData.remove(0); // Remove header
        }
        return allData;
    }
    
    /**
     * Get CSV data as List of Maps (column name -> value)
     */
    public static List<Map<String, String>> readCSVAsMapList(String filePath) {
        List<Map<String, String>> dataList = new ArrayList<>();
        List<String[]> allData = readCSV(filePath);
        
        if (allData == null || allData.isEmpty()) {
            return dataList;
        }
        
        String[] headers = allData.get(0);
        
        for (int i = 1; i < allData.size(); i++) {
            String[] row = allData.get(i);
            Map<String, String> dataMap = new HashMap<>();
            
            for (int j = 0; j < headers.length && j < row.length; j++) {
                dataMap.put(headers[j], row[j]);
            }
            
            dataList.add(dataMap);
        }
        
        return dataList;
    }
    
    /**
     * Get specific column data
     */
    public static List<String> getColumnData(String filePath, String columnName) {
        List<String> columnData = new ArrayList<>();
        List<String[]> allData = readCSV(filePath);
        
        if (allData == null || allData.isEmpty()) {
            return columnData;
        }
        
        String[] headers = allData.get(0);
        int columnIndex = -1;
        
        // Find column index
        for (int i = 0; i < headers.length; i++) {
            if (headers[i].equals(columnName)) {
                columnIndex = i;
                break;
            }
        }
        
        if (columnIndex == -1) {
            return columnData;
        }
        
        // Get column data
        for (int i = 1; i < allData.size(); i++) {
            String[] row = allData.get(i);
            if (columnIndex < row.length) {
                columnData.add(row[columnIndex]);
            }
        }
        
        return columnData;
    }
    
    /**
     * Write data to CSV
     */
    public static void writeCSV(String filePath, List<String[]> data) {
        try {
            CSVWriter writer = new CSVWriter(new FileWriter(filePath));
            writer.writeAll(data);
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    /**
     * Convert CSV to 2D array for TestNG DataProvider
     */
    public static Object[][] csvToDataProvider(String filePath) {
        List<String[]> data = readCSVData(filePath);
        
        if (data == null || data.isEmpty()) {
            return new Object[0][0];
        }
        
        Object[][] dataProvider = new Object[data.size()][];
        
        for (int i = 0; i < data.size(); i++) {
            dataProvider[i] = data.get(i);
        }
        
        return dataProvider;
    }
    
    /**
     * Get row count (excluding header)
     */
    public static int getRowCount(String filePath) {
        List<String[]> data = readCSV(filePath);
        return (data != null) ? data.size() - 1 : 0;
    }
    
    /**
     * Get column count
     */
    public static int getColumnCount(String filePath) {
        List<String[]> data = readCSV(filePath);
        return (data != null && !data.isEmpty()) ? data.get(0).length : 0;
    }
}
```

---

## 7. Data-Driven Testing with JSON

### JSON Test Data

**login-tests.json:**
```json
[
  {
    "testCase": "TC001",
    "username": "user@test.com",
    "password": "Pass@123",
    "expectedResult": "Login Success"
  },
  {
    "testCase": "TC002",
    "username": "invalid@test.com",
    "password": "wrong",
    "expectedResult": "Invalid credentials"
  }
]
```

### DataProvider with JSON

```java
package dataproviders;

import org.testng.annotations.DataProvider;
import utils.JsonUtils;

public class JsonDataProvider {
    
    @DataProvider(name = "loginData")
    public Object[][] getLoginDataFromJson() {
        String jsonPath = "src/test/resources/testdata/login-tests.json";
        return JsonUtils.jsonArrayToDataProvider(jsonPath);
    }
}
```

### Test Using JSON Data

```java
package tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import dataproviders.JsonDataProvider;

public class JsonDataDrivenTest {
    
    @Test(dataProvider = "loginData", dataProviderClass = JsonDataProvider.class)
    public void testLogin(String testCase, String username, 
                         String password, String expectedResult) {
        
        System.out.println("Executing: " + testCase);
        
        // Perform login
        loginPage.login(username, password);
        
        // Verify result
        String actualResult = homePage.isLoggedIn() ? 
            "Login Success" : loginPage.getErrorMessage();
        
        Assert.assertEquals(actualResult, expectedResult);
    }
}
```

---

## 8. Data-Driven Testing with CSV

### CSV Test Data

**login-tests.csv:**
```csv
TestCase,Username,Password,ExpectedResult
TC001,user@test.com,Pass@123,Login Success
TC002,invalid@test.com,wrong,Invalid credentials
TC003,user@test.com,,Error: Password required
```

### DataProvider with CSV

```java
package dataproviders;

import org.testng.annotations.DataProvider;
import utils.CsvUtils;

public class CsvDataProvider {
    
    @DataProvider(name = "loginData")
    public Object[][] getLoginDataFromCSV() {
        String csvPath = "src/test/resources/testdata/login-tests.csv";
        return CsvUtils.csvToDataProvider(csvPath);
    }
}
```

### Test Using CSV Data

```java
package tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import dataproviders.CsvDataProvider;

public class CsvDataDrivenTest {
    
    @Test(dataProvider = "loginData", dataProviderClass = CsvDataProvider.class)
    public void testLogin(String testCase, String username, 
                         String password, String expectedResult) {
        
        System.out.println("Executing: " + testCase);
        
        loginPage.login(username, password);
        
        String actualResult = homePage.isLoggedIn() ? 
            "Login Success" : loginPage.getErrorMessage();
        
        Assert.assertEquals(actualResult, expectedResult);
    }
}
```

---

## 9. Comparing Data Formats

### When to Use Each Format

```java
package concepts;

public class DataFormatSelection {
    
    /*
     * Use Excel When:
     * - Non-technical users need to manage test data
     * - Complex tabular data with multiple sheets
     * - Need formulas and calculations
     * - Visual data organization is important
     * - Integration with business tools
     * 
     * Use JSON When:
     * - Hierarchical/nested data structures
     * - API testing (JSON is standard for APIs)
     * - Complex object relationships
     * - Need to represent arrays and objects
     * - Modern web applications
     * 
     * Use CSV When:
     * - Simple tabular data
     * - Large datasets (performance)
     * - Need lightweight format
     * - Easy manual editing
     * - Universal compatibility
     * - Fast parsing required
     */
}
```

---

## 12. Key Takeaways

1. **JSON** is ideal for hierarchical data and API testing
2. **CSV** is best for simple tabular data and performance
3. **Gson** and **Jackson** are popular JSON parsing libraries
4. **OpenCSV** simplifies CSV operations in Java
5. **Utility classes** centralize data operations
6. **TestNG DataProvider** works seamlessly with all formats
7. **Format selection** depends on data complexity and use case
8. **JSON** supports nested structures, CSV doesn't
9. **CSV** is faster and more lightweight than JSON
10. **Both formats** enable effective data-driven testing

---

## 13. Interview Questions

### Basic Level

1. **Q: What are the main differences between JSON and CSV?**
   
   A: JSON supports hierarchical/nested structures, includes field names, supports complex data types. CSV is flat/tabular, simpler, smaller file size, faster to parse, but limited to simple data structures.

2. **Q: Which Java libraries are commonly used for JSON parsing?**
   
   A: Gson (by Google) and Jackson are the most popular. Gson is simpler and easier to use, Jackson is more powerful and feature-rich.

### Intermediate Level

3. **Q: How do you implement data-driven testing with JSON in TestNG?**
   
   A: Create JSON file with test data array, create utility method to parse JSON to Object[][], create DataProvider method that returns the array, use @DataProvider annotation in test method.

4. **Q: How do you handle nested JSON structures?**
   
   A: Create corresponding Java classes with nested objects/lists, use Gson/Jackson to map JSON to objects, access nested values using dot notation or getter methods.

### Advanced Level

5. **Q: Design a flexible data management system supporting multiple formats.**
   
   A: Create DataReader interface with common methods, implement ExcelDataReader, JsonDataReader, CsvDataReader classes, use Factory pattern to create appropriate reader, provide unified API for all formats, support format conversion, implement caching for performance.

---

## Navigation

- [Previous: Day 26 - Excel Data Reading](day26_excel_data_reading.md)
- [Next: Day 28 - Parallel Execution](day28_parallel_execution.md)
- [Week 4 Overview](README.md)

---

**Congratulations!** You've learned how to work with JSON and CSV data formats in Selenium automation. These lightweight formats complement Excel and provide flexibility in how you manage test data.