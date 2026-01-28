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

## Hands-On Exercises

### Exercise 1: Build Basic JSON Reader Utility (25 minutes)

**Objective:** Create a foundational JSON reading utility class using Gson library.

**Scenario:** You need to read test data from JSON files for your automation framework. Build a utility class that can parse JSON files and extract test data.

**Requirements:**
1. Create a `JsonReader` class with methods to read JSON files
2. Implement method to read JSON file to JsonObject
3. Create method to get specific value by key
4. Add method to read JSON array
5. Handle file not found exceptions
6. Test with sample JSON files

**Code Template:**

```java
package utils;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonArray;
import java.io.FileReader;
import java.io.IOException;

public class JsonReader {

    private Gson gson;

    public JsonReader() {
        // TODO: Initialize Gson instance
    }

    /**
     * Read JSON file and return JsonObject
     */
    public JsonObject readJsonFile(String filePath) {
        // TODO: Implement method to read JSON file
        // TODO: Return JsonObject
        // TODO: Handle IOException
        return null;
    }

    /**
     * Get value from JSON by key
     */
    public String getValue(String filePath, String key) {
        // TODO: Read JSON file
        // TODO: Get value by key
        // TODO: Return as String
        return null;
    }

    /**
     * Read JSON array from file
     */
    public JsonArray readJsonArray(String filePath) {
        // TODO: Read file and parse to JsonArray
        // TODO: Handle exceptions
        return null;
    }

    /**
     * Check if key exists in JSON
     */
    public boolean hasKey(String filePath, String key) {
        // TODO: Check if key exists in JSON file
        return false;
    }
}
```

**Test Class:**

```java
package tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import utils.JsonReader;

public class JsonReaderTest {

    private JsonReader jsonReader = new JsonReader();

    @Test
    public void testReadJsonFile() {
        String filePath = "src/test/resources/testdata/user.json";
        // TODO: Read JSON file
        // TODO: Assert not null
    }

    @Test
    public void testGetValue() {
        String filePath = "src/test/resources/testdata/user.json";
        String username = jsonReader.getValue(filePath, "username");
        // TODO: Assert username is correct
    }
}
```

**Expected Outcome:**
- JsonReader utility class successfully created
- Can read JSON files and parse to JsonObject
- Can extract values by key
- Proper exception handling implemented
- Tests pass successfully

**Common Mistakes to Avoid:**
1. Not closing FileReader after use
2. Not handling file not found exceptions
3. Not checking if key exists before accessing
4. Hardcoding file paths instead of using parameters
5. Not initializing Gson instance

**Solution Approach Hints:**
- Use try-with-resources for FileReader
- Use gson.fromJson() method for parsing
- Check jsonObject.has() before get()
- Return null safely when key doesn't exist

---

### Exercise 2: Create CSV Reader with Map Conversion (30 minutes)

**Objective:** Build a CSV reading utility that converts CSV data to List of Maps for easy data access.

**Scenario:** You want to read CSV test data where each row becomes a Map with column headers as keys. This makes data access more intuitive.

**Requirements:**
1. Create `CsvReader` class using OpenCSV library
2. Implement method to read CSV as List<String[]>
3. Create method to convert CSV to List<Map<String, String>>
4. Add method to get specific column data
5. Handle header row properly
6. Test with sample CSV file

**Code Template:**

```java
package utils;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;

public class CsvReader {

    /**
     * Read CSV file as List of String arrays
     */
    public List<String[]> readCSV(String filePath) {
        // TODO: Use CSVReader to read file
        // TODO: Return all rows
        // TODO: Handle exceptions
        return null;
    }

    /**
     * Read CSV as List of Maps (header -> value)
     */
    public List<Map<String, String>> readCSVAsMapList(String filePath) {
        List<Map<String, String>> dataList = new ArrayList<>();

        // TODO: Read CSV file
        // TODO: Get header row (first row)
        // TODO: For each data row, create Map with header as key
        // TODO: Add map to dataList

        return dataList;
    }

    /**
     * Get specific column data from CSV
     */
    public List<String> getColumnData(String filePath, String columnName) {
        List<String> columnData = new ArrayList<>();

        // TODO: Read CSV file
        // TODO: Find column index from header
        // TODO: Extract data from that column for all rows

        return columnData;
    }

    /**
     * Get row count (excluding header)
     */
    public int getRowCount(String filePath) {
        // TODO: Read CSV and return count minus header
        return 0;
    }

    /**
     * Get specific row as Map
     */
    public Map<String, String> getRow(String filePath, int rowIndex) {
        // TODO: Read CSV as map list
        // TODO: Return specific row
        return null;
    }
}
```

**Test Class:**

```java
package tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import utils.CsvReader;
import java.util.List;
import java.util.Map;

public class CsvReaderTest {

    private CsvReader csvReader = new CsvReader();
    private String csvFile = "src/test/resources/testdata/users.csv";

    @Test
    public void testReadCSVAsMapList() {
        List<Map<String, String>> data = csvReader.readCSVAsMapList(csvFile);
        // TODO: Assert not empty
        // TODO: Assert first row has expected data
    }

    @Test
    public void testGetColumnData() {
        List<String> usernames = csvReader.getColumnData(csvFile, "Username");
        // TODO: Assert list not empty
        // TODO: Verify first username
    }

    @Test
    public void testGetRowCount() {
        int count = csvReader.getRowCount(csvFile);
        // TODO: Assert count is correct
    }
}
```

**Expected Outcome:**
- CsvReader utility class works correctly
- CSV data converted to List of Maps successfully
- Can access data using column names as keys
- Column extraction works properly
- All tests pass

**Common Mistakes to Avoid:**
1. Not skipping header row when processing data
2. Not checking if column name exists
3. Not handling empty cells properly
4. Assuming fixed column count
5. Not closing CSVReader

**Solution Approach Hints:**
- First row is always header in CSV with headers
- Use Map to associate column name with value
- Handle null/empty cells with default values
- Use try-with-resources for CSVReader

---

### Exercise 3: Implement Data-Driven Login Test with JSON (35 minutes)

**Objective:** Create complete data-driven login tests using JSON test data with TestNG DataProvider.

**Scenario:** You have multiple login test scenarios stored in JSON format. Implement data-driven tests that read from JSON and execute login tests.

**Requirements:**
1. Create JSON file with login test data (5 scenarios)
2. Create LoginData model class
3. Build JsonDataProvider class
4. Implement method to convert JSON to DataProvider format
5. Create login test using DataProvider
6. Verify results for each scenario

**JSON Test Data (login-tests.json):**

```json
[
  {
    "testCase": "TC001_Valid_Login",
    "username": "validuser@test.com",
    "password": "ValidPass@123",
    "expectedResult": "success",
    "expectedMessage": "Welcome"
  },
  {
    "testCase": "TC002_Invalid_Username",
    "username": "invalid@test.com",
    "password": "ValidPass@123",
    "expectedResult": "failure",
    "expectedMessage": "Invalid credentials"
  },
  {
    "testCase": "TC003_Invalid_Password",
    "username": "validuser@test.com",
    "password": "wrongpass",
    "expectedResult": "failure",
    "expectedMessage": "Invalid credentials"
  },
  {
    "testCase": "TC004_Empty_Username",
    "username": "",
    "password": "ValidPass@123",
    "expectedResult": "failure",
    "expectedMessage": "Username is required"
  },
  {
    "testCase": "TC005_Empty_Password",
    "username": "validuser@test.com",
    "password": "",
    "expectedResult": "failure",
    "expectedMessage": "Password is required"
  }
]
```

**Code Template:**

```java
// LoginData.java
package models;

public class LoginData {
    private String testCase;
    private String username;
    private String password;
    private String expectedResult;
    private String expectedMessage;

    // TODO: Generate getters and setters

    @Override
    public String toString() {
        return testCase;
    }
}

// JsonDataProvider.java
package dataproviders;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import models.LoginData;
import org.testng.annotations.DataProvider;
import java.io.FileReader;
import java.lang.reflect.Type;
import java.util.List;

public class JsonDataProvider {

    @DataProvider(name = "loginData")
    public Object[][] getLoginData() {
        String jsonPath = "src/test/resources/testdata/login-tests.json";

        // TODO: Read JSON file
        // TODO: Parse to List<LoginData>
        // TODO: Convert to Object[][]
        // TODO: Return 2D array for DataProvider

        return new Object[0][0];
    }
}

// LoginTest.java
package tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import dataproviders.JsonDataProvider;
import models.LoginData;

public class LoginTest extends BaseTest {

    @Test(dataProvider = "loginData", dataProviderClass = JsonDataProvider.class)
    public void testLogin(LoginData loginData) {
        System.out.println("Executing: " + loginData.getTestCase());

        // TODO: Navigate to login page
        // TODO: Enter username
        // TODO: Enter password
        // TODO: Click login button
        // TODO: Verify expected result
        // TODO: Assert expectedMessage appears
    }
}
```

**Expected Outcome:**
- JSON data successfully parsed to LoginData objects
- DataProvider returns correct data format
- All 5 test scenarios execute
- Each test validates expected result and message
- Test report shows individual results for each scenario

**Common Mistakes to Avoid:**
1. Incorrect DataProvider return type (must be Object[][])
2. Not using TypeToken for generic List parsing
3. Not handling JSON parsing exceptions
4. Forgetting to close FileReader
5. Not setting proper test names in report

**Solution Approach Hints:**
- Use Gson with TypeToken for List<LoginData>
- Convert List to 2D Object array for TestNG
- Each array element should be LoginData object
- Use descriptive test names from testCase field

---

### Exercise 4: Build CSV to TestNG DataProvider Converter (35 minutes)

**Objective:** Create a reusable utility to convert CSV files to TestNG DataProvider format with dynamic column mapping.

**Scenario:** You want to use CSV files for multiple different tests. Build a generic converter that works with any CSV structure.

**Requirements:**
1. Create flexible CsvDataProvider class
2. Implement method to read any CSV file
3. Convert CSV data to Object[][] for TestNG
4. Support different data types (String, int, boolean)
5. Handle dynamic column counts
6. Test with registration form CSV data

**CSV Test Data (registration-tests.csv):**

```csv
TestCase,FirstName,LastName,Email,Password,Age,AcceptTerms,ExpectedResult
TC001,John,Doe,john@test.com,Pass@123,25,true,success
TC002,Jane,Smith,jane@test.com,Pass@456,30,true,success
TC003,Bob,,bob@test.com,Pass@789,22,true,failure
TC004,Alice,Johnson,invalid-email,Pass@111,28,true,failure
TC005,Tom,Brown,tom@test.com,short,35,true,failure
TC006,Lisa,White,lisa@test.com,Pass@222,40,false,failure
```

**Code Template:**

```java
package dataproviders;

import com.opencsv.CSVReader;
import org.testng.annotations.DataProvider;
import java.io.FileReader;
import java.util.List;

public class CsvDataProvider {

    /**
     * Generic CSV to DataProvider converter
     */
    @DataProvider(name = "csvData")
    public static Object[][] getCsvData(String filePath) {
        // TODO: Read CSV file
        // TODO: Get all rows including header
        // TODO: Remove header row
        // TODO: Convert List<String[]> to Object[][]
        // TODO: Return 2D array

        return new Object[0][0];
    }

    /**
     * Registration test data provider
     */
    @DataProvider(name = "registrationData")
    public Object[][] getRegistrationData() {
        String csvPath = "src/test/resources/testdata/registration-tests.csv";
        return getCsvData(csvPath);
    }

    /**
     * Convert CSV row to proper data types
     */
    private static Object convertDataType(String value, String columnName) {
        // TODO: Convert to int if column is Age
        // TODO: Convert to boolean if column is AcceptTerms
        // TODO: Return String for others
        return value;
    }
}

// RegistrationTest.java
package tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import dataproviders.CsvDataProvider;

public class RegistrationTest extends BaseTest {

    @Test(dataProvider = "registrationData", dataProviderClass = CsvDataProvider.class)
    public void testRegistration(String testCase, String firstName, String lastName,
                                 String email, String password, String age,
                                 String acceptTerms, String expectedResult) {

        System.out.println("Executing: " + testCase);

        // TODO: Navigate to registration page
        // TODO: Fill form with provided data
        // TODO: Submit form
        // TODO: Verify expected result

        System.out.println("Test Data: " + firstName + " " + lastName +
                         " - " + email);
    }
}
```

**Expected Outcome:**
- Generic CSV DataProvider works with any CSV file
- All CSV data converted to TestNG format correctly
- 6 registration tests execute with different scenarios
- Data types properly handled
- Test report clear and organized

**Common Mistakes to Avoid:**
1. Not removing header row before creating DataProvider
2. Returning wrong data structure for TestNG
3. Not handling empty cells in CSV
4. Assuming fixed column count
5. Not validating file exists before reading

**Solution Approach Hints:**
- Read all rows, store header separately
- Skip first row (header) when creating data array
- Each CSV row becomes one Object[] in result
- Handle null values with empty strings

---

### Exercise 5: Implement Nested JSON Parsing for Complex Test Data (40 minutes)

**Objective:** Parse complex nested JSON structures containing test configuration, users, and products.

**Scenario:** Your test data has complex hierarchy with environment config, multiple users with different roles, and product catalog. Parse this structure correctly.

**Complex JSON (test-config.json):**

```json
{
  "environment": {
    "name": "QA",
    "baseUrl": "https://qa.example.com",
    "timeout": 30,
    "retryCount": 2
  },
  "users": [
    {
      "role": "admin",
      "username": "admin@test.com",
      "password": "Admin@123",
      "permissions": ["read", "write", "delete"]
    },
    {
      "role": "user",
      "username": "user@test.com",
      "password": "User@123",
      "permissions": ["read"]
    }
  ],
  "products": [
    {
      "id": "P001",
      "name": "Laptop",
      "price": 999.99,
      "category": "Electronics",
      "inStock": true
    },
    {
      "id": "P002",
      "name": "Mouse",
      "price": 29.99,
      "category": "Accessories",
      "inStock": true
    }
  ],
  "testSettings": {
    "takeScreenshot": true,
    "generateReport": true,
    "parallel": false
  }
}
```

**Code Template:**

```java
// Environment.java
package models;

public class Environment {
    private String name;
    private String baseUrl;
    private int timeout;
    private int retryCount;

    // TODO: Generate getters and setters
}

// User.java
package models;
import java.util.List;

public class User {
    private String role;
    private String username;
    private String password;
    private List<String> permissions;

    // TODO: Generate getters and setters
}

// Product.java
package models;

public class Product {
    private String id;
    private String name;
    private double price;
    private String category;
    private boolean inStock;

    // TODO: Generate getters and setters
}

// TestSettings.java
package models;

public class TestSettings {
    private boolean takeScreenshot;
    private boolean generateReport;
    private boolean parallel;

    // TODO: Generate getters and setters
}

// TestConfiguration.java
package models;
import java.util.List;

public class TestConfiguration {
    private Environment environment;
    private List<User> users;
    private List<Product> products;
    private TestSettings testSettings;

    // TODO: Generate getters and setters

    /**
     * Get user by role
     */
    public User getUserByRole(String role) {
        // TODO: Find and return user with matching role
        return null;
    }

    /**
     * Get product by ID
     */
    public Product getProductById(String productId) {
        // TODO: Find and return product with matching ID
        return null;
    }
}

// ComplexJsonReader.java
package utils;

import com.google.gson.Gson;
import models.TestConfiguration;
import java.io.FileReader;

public class ComplexJsonReader {

    private Gson gson;

    public ComplexJsonReader() {
        this.gson = new Gson();
    }

    /**
     * Read and parse complex JSON to TestConfiguration object
     */
    public TestConfiguration readConfig(String filePath) {
        // TODO: Read JSON file
        // TODO: Parse to TestConfiguration object
        // TODO: Return configuration
        return null;
    }
}

// ComplexJsonTest.java
package tests;

import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import utils.ComplexJsonReader;
import models.*;

public class ComplexJsonTest {

    private TestConfiguration config;

    @BeforeClass
    public void setup() {
        ComplexJsonReader reader = new ComplexJsonReader();
        config = reader.readConfig("src/test/resources/testdata/test-config.json");
    }

    @Test
    public void testEnvironmentConfig() {
        // TODO: Get environment from config
        // TODO: Assert environment name is "QA"
        // TODO: Assert baseUrl is correct
        // TODO: Assert timeout is 30
    }

    @Test
    public void testUserData() {
        // TODO: Get admin user
        // TODO: Assert username is correct
        // TODO: Assert permissions contain "delete"
    }

    @Test
    public void testProductData() {
        // TODO: Get product by ID "P001"
        // TODO: Assert product name is "Laptop"
        // TODO: Assert price is 999.99
        // TODO: Assert inStock is true
    }

    @Test
    public void testSettings() {
        // TODO: Get test settings
        // TODO: Assert takeScreenshot is true
        // TODO: Assert parallel is false
    }
}
```

**Expected Outcome:**
- Complex nested JSON successfully parsed
- All model classes properly mapped
- Can access nested data through object hierarchy
- Helper methods work for finding specific items
- All tests pass with correct assertions

**Common Mistakes to Avoid:**
1. Model class field names not matching JSON keys
2. Not handling null nested objects
3. Forgetting to initialize Lists in JSON
4. Not using proper generic types for collections
5. Case-sensitive mismatches in field names

**Solution Approach Hints:**
- Gson automatically maps JSON to nested objects
- Field names in Java must match JSON keys exactly
- Use @SerializedName if names need to differ
- Lists are automatically populated if JSON has arrays

---

### Exercise 6: Create Unified Data Reader Supporting Multiple Formats (45 minutes)

**Objective:** Build a flexible DataReader that can read JSON, CSV, or Excel based on file extension and provide unified interface.

**Scenario:** Your framework should support multiple data formats. Create a smart data reader that automatically detects file type and uses appropriate parser.

**Requirements:**
1. Create DataReader interface with common methods
2. Implement JsonDataReaderImpl, CsvDataReaderImpl
3. Create DataReaderFactory to return correct reader
4. Support automatic format detection
5. Provide unified data access API
6. Test with different file formats

**Code Template:**

```java
// DataReader.java
package utils.datareader;

import java.util.List;
import java.util.Map;

public interface DataReader {

    /**
     * Read data file and return as List of Maps
     */
    List<Map<String, String>> readData(String filePath);

    /**
     * Get specific row by index
     */
    Map<String, String> getRow(String filePath, int rowIndex);

    /**
     * Get row count
     */
    int getRowCount(String filePath);

    /**
     * Get value by row index and column name
     */
    String getValue(String filePath, int rowIndex, String columnName);
}

// JsonDataReaderImpl.java
package utils.datareader;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import java.io.FileReader;
import java.util.*;

public class JsonDataReaderImpl implements DataReader {

    @Override
    public List<Map<String, String>> readData(String filePath) {
        // TODO: Read JSON array from file
        // TODO: Convert each JSON object to Map
        // TODO: Return list of maps
        return null;
    }

    @Override
    public Map<String, String> getRow(String filePath, int rowIndex) {
        // TODO: Read all data
        // TODO: Return specific row
        return null;
    }

    @Override
    public int getRowCount(String filePath) {
        // TODO: Read data and return count
        return 0;
    }

    @Override
    public String getValue(String filePath, int rowIndex, String columnName) {
        // TODO: Get specific row
        // TODO: Return value for column
        return null;
    }
}

// CsvDataReaderImpl.java
package utils.datareader;

import com.opencsv.CSVReader;
import java.io.FileReader;
import java.util.*;

public class CsvDataReaderImpl implements DataReader {

    @Override
    public List<Map<String, String>> readData(String filePath) {
        // TODO: Read CSV file
        // TODO: Get header row
        // TODO: Convert each row to Map using headers
        // TODO: Return list of maps
        return null;
    }

    @Override
    public Map<String, String> getRow(String filePath, int rowIndex) {
        // TODO: Read all data
        // TODO: Return specific row
        return null;
    }

    @Override
    public int getRowCount(String filePath) {
        // TODO: Read CSV and return count
        return 0;
    }

    @Override
    public String getValue(String filePath, int rowIndex, String columnName) {
        // TODO: Get row and return column value
        return null;
    }
}

// DataReaderFactory.java
package utils.datareader;

public class DataReaderFactory {

    /**
     * Get appropriate DataReader based on file extension
     */
    public static DataReader getDataReader(String filePath) {
        // TODO: Get file extension
        // TODO: Return JsonDataReaderImpl for .json
        // TODO: Return CsvDataReaderImpl for .csv
        // TODO: Throw exception for unsupported format

        throw new IllegalArgumentException("Unsupported file format");
    }

    /**
     * Get file extension from path
     */
    private static String getFileExtension(String filePath) {
        // TODO: Extract and return extension
        return null;
    }
}

// UnifiedDataReaderTest.java
package tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import utils.datareader.DataReader;
import utils.datareader.DataReaderFactory;
import java.util.List;
import java.util.Map;

public class UnifiedDataReaderTest {

    @Test
    public void testReadJsonData() {
        String jsonFile = "src/test/resources/testdata/users.json";
        DataReader reader = DataReaderFactory.getDataReader(jsonFile);

        List<Map<String, String>> data = reader.readData(jsonFile);
        // TODO: Assert data not empty
        // TODO: Verify first row data
    }

    @Test
    public void testReadCsvData() {
        String csvFile = "src/test/resources/testdata/users.csv";
        DataReader reader = DataReaderFactory.getDataReader(csvFile);

        List<Map<String, String>> data = reader.readData(csvFile);
        // TODO: Assert data not empty
        // TODO: Verify first row data
    }

    @Test
    public void testGetSpecificValue() {
        String jsonFile = "src/test/resources/testdata/users.json";
        DataReader reader = DataReaderFactory.getDataReader(jsonFile);

        String username = reader.getValue(jsonFile, 0, "username");
        // TODO: Assert username is correct
    }

    @Test
    public void testMultipleFormats() {
        String[] files = {
            "src/test/resources/testdata/users.json",
            "src/test/resources/testdata/users.csv"
        };

        for (String file : files) {
            DataReader reader = DataReaderFactory.getDataReader(file);
            int count = reader.getRowCount(file);
            // TODO: Assert count > 0
            System.out.println("File: " + file + ", Rows: " + count);
        }
    }
}
```

**Expected Outcome:**
- Unified interface for different data formats
- Factory correctly returns appropriate reader
- Same code works with JSON and CSV files
- Automatic format detection works
- All tests pass for both formats

**Common Mistakes to Avoid:**
1. Not handling file extension case sensitivity
2. Not validating file exists before reading
3. Different data structures from different readers
4. Not closing file readers properly
5. Not handling unsupported formats gracefully

**Solution Approach Hints:**
- Use toLowerCase() for extension comparison
- Both readers should return same Map structure
- Factory pattern simplifies reader selection
- Interface ensures consistent behavior

---

## Navigation

- [Previous: Day 26 - Excel Data Reading](day26_excel_data_reading.md)
- [Next: Day 28 - Parallel Execution](day28_parallel_execution.md)
- [Week 4 Overview](README.md)

---

**Congratulations!** You've learned how to work with JSON and CSV data formats in Selenium automation. These lightweight formats complement Excel and provide flexibility in how you manage test data.