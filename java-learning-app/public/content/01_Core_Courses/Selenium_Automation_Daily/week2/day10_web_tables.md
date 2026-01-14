# Day 10: Working with Web Tables

## Table of Contents
1. [Learning Objectives](#learning-objectives)
2. [Introduction to Web Tables](#introduction-to-web-tables)
3. [Types of Tables](#types-of-tables)
4. [Locating Table Elements](#locating-table-elements)
5. [Reading Table Data](#reading-table-data)
6. [Searching in Tables](#searching-in-tables)
7. [Dynamic Tables](#dynamic-tables)
8. [Table Interactions](#table-interactions)
9. [Creating Table Utility Methods](#creating-table-utility-methods)
10. [Complex Table Scenarios](#complex-table-scenarios)
11. [Best Practices](#best-practices)
12. [Practice Exercises](#practice-exercises)
13. [Interview Questions](#interview-questions)
14. [Key Takeaways](#key-takeaways)

---

## Learning Objectives

By the end of this lesson, you will be able to:

- Understand the structure and types of web tables
- Locate and identify table elements using various strategies
- Read data from static and dynamic tables
- Search for specific data within tables
- Handle pagination, sorting, and filtering in dynamic tables
- Interact with table elements (links, checkboxes, buttons)
- Create reusable utility methods for table operations
- Handle complex table scenarios including nested tables
- Apply best practices for web table automation
- Debug common issues when working with tables

---

## Introduction to Web Tables

### What are Web Tables?

Web tables are HTML elements used to organize and display data in rows and columns on web pages. They are commonly used in:

- Data grids and reports
- User management interfaces
- Financial dashboards
- Product catalogs
- Search results
- Admin panels

### Why are Tables Important in Automation?

Tables present unique challenges in test automation:

1. **Dynamic Content**: Data may change frequently
2. **Complex Structure**: Multiple levels of nesting
3. **Interactive Elements**: Buttons, links, and inputs within cells
4. **Large Datasets**: Pagination and lazy loading
5. **Variable Structure**: Different numbers of rows/columns

### Basic HTML Table Structure

```html
<table>
  <thead>
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
      <th>Header 3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Row 1, Cell 1</td>
      <td>Row 1, Cell 2</td>
      <td>Row 1, Cell 3</td>
    </tr>
    <tr>
      <td>Row 2, Cell 1</td>
      <td>Row 2, Cell 2</td>
      <td>Row 2, Cell 3</td>
    </tr>
  </tbody>
</table>
```

**Key Elements:**
- `<table>`: Container for the entire table
- `<thead>`: Table header section
- `<tbody>`: Table body section
- `<tfoot>`: Table footer section (optional)
- `<tr>`: Table row
- `<th>`: Header cell
- `<td>`: Data cell

---

## Types of Tables

### 1. Static Tables

Static tables have fixed data that doesn't change dynamically:

```html
<table id="staticTable">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>John Doe</td>
      <td>john@example.com</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jane Smith</td>
      <td>jane@example.com</td>
    </tr>
  </tbody>
</table>
```

**Characteristics:**
- Fixed number of rows
- No pagination
- No sorting/filtering
- Predictable structure

### 2. Dynamic Tables

Dynamic tables have data that changes based on user interactions or backend updates:

```html
<table id="dynamicTable">
  <thead>
    <tr>
      <th class="sortable">Name ↑</th>
      <th class="sortable">Age</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody id="tableBody">
    <!-- Rows loaded dynamically via JavaScript -->
  </tbody>
  <tfoot>
    <tr>
      <td colspan="3">
        <div class="pagination">
          <button class="prev">Previous</button>
          <span>Page 1 of 10</span>
          <button class="next">Next</button>
        </div>
      </td>
    </tr>
  </tfoot>
</table>
```

**Characteristics:**
- Variable number of rows
- Pagination controls
- Sortable columns
- Filterable data
- AJAX loading

### 3. Responsive Tables

Tables that adapt to different screen sizes:

```html
<div class="table-responsive">
  <table class="table">
    <!-- Table content -->
  </table>
</div>
```

---

## Locating Table Elements

### Finding the Table

```java
// By ID
WebElement table = driver.findElement(By.id("employeeTable"));

// By Class Name
WebElement table = driver.findElement(By.className("data-table"));

// By Tag Name (if there's only one table)
WebElement table = driver.findElement(By.tagName("table"));

// By CSS Selector
WebElement table = driver.findElement(By.cssSelector("table.employee-data"));

// By XPath
WebElement table = driver.findElement(By.xpath("//table[@id='employeeTable']"));
```

### Understanding Table Structure

```java
public class TableStructureExample {

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/table-page");

        // Locate table
        WebElement table = driver.findElement(By.id("dataTable"));

        // Find header
        WebElement thead = table.findElement(By.tagName("thead"));

        // Find body
        WebElement tbody = table.findElement(By.tagName("tbody"));

        // Find footer (if exists)
        List<WebElement> tfoot = table.findElements(By.tagName("tfoot"));

        System.out.println("Table found with:");
        System.out.println("Header: " + (thead != null));
        System.out.println("Body: " + (tbody != null));
        System.out.println("Footer: " + (!tfoot.isEmpty()));

        driver.quit();
    }
}
```

### Locating Rows

```java
public class LocateRowsExample {

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/table-page");

        WebElement table = driver.findElement(By.id("dataTable"));

        // Method 1: Find all rows in tbody
        List<WebElement> rows = table.findElements(By.xpath(".//tbody/tr"));
        System.out.println("Total rows: " + rows.size());

        // Method 2: Find specific row by index (1-based)
        WebElement firstRow = table.findElement(By.xpath(".//tbody/tr[1]"));

        // Method 3: Find row by content
        WebElement specificRow = table.findElement(
            By.xpath(".//tbody/tr[td[text()='John Doe']]")
        );

        // Method 4: Find header rows
        List<WebElement> headerRows = table.findElements(By.xpath(".//thead/tr"));

        driver.quit();
    }
}
```

### Locating Columns

```java
public class LocateColumnsExample {

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/table-page");

        WebElement table = driver.findElement(By.id("dataTable"));

        // Find all cells in first row to get column count
        List<WebElement> headerCells = table.findElements(By.xpath(".//thead/tr[1]/th"));
        System.out.println("Total columns: " + headerCells.size());

        // Get all cells from a specific column (e.g., 2nd column)
        List<WebElement> secondColumnCells = table.findElements(
            By.xpath(".//tbody/tr/td[2]")
        );

        System.out.println("Values in second column:");
        for (WebElement cell : secondColumnCells) {
            System.out.println(cell.getText());
        }

        driver.quit();
    }
}
```

### Locating Individual Cells

```java
public class LocateCellsExample {

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/table-page");

        WebElement table = driver.findElement(By.id("dataTable"));

        // Method 1: By row and column index (2nd row, 3rd column)
        WebElement cell = table.findElement(By.xpath(".//tbody/tr[2]/td[3]"));
        System.out.println("Cell value: " + cell.getText());

        // Method 2: Find cell with specific text
        WebElement specificCell = table.findElement(
            By.xpath(".//tbody/tr/td[text()='Active']")
        );

        // Method 3: Find cell containing partial text
        WebElement partialMatchCell = table.findElement(
            By.xpath(".//tbody/tr/td[contains(text(), 'john@')]")
        );

        // Method 4: Find cell in specific row with class
        WebElement styledCell = table.findElement(
            By.xpath(".//tbody/tr[1]/td[@class='highlight']")
        );

        driver.quit();
    }
}
```

---

## Reading Table Data

### Getting Row Count

```java
public class GetRowCountExample {

    public static int getRowCount(WebDriver driver, By tableLocator) {
        WebElement table = driver.findElement(tableLocator);
        List<WebElement> rows = table.findElements(By.xpath(".//tbody/tr"));
        return rows.size();
    }

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/table-page");

        // Get row count
        int totalRows = getRowCount(driver, By.id("dataTable"));
        System.out.println("Total rows: " + totalRows);

        // Alternative: Direct XPath count
        List<WebElement> rows = driver.findElements(
            By.xpath("//table[@id='dataTable']/tbody/tr")
        );
        System.out.println("Row count (alternative): " + rows.size());

        driver.quit();
    }
}
```

### Getting Column Count

```java
public class GetColumnCountExample {

    public static int getColumnCount(WebDriver driver, By tableLocator) {
        WebElement table = driver.findElement(tableLocator);

        // Try to get from header first
        List<WebElement> headerCells = table.findElements(By.xpath(".//thead/tr[1]/th"));

        if (!headerCells.isEmpty()) {
            return headerCells.size();
        }

        // If no header, get from first data row
        List<WebElement> firstRowCells = table.findElements(By.xpath(".//tbody/tr[1]/td"));
        return firstRowCells.size();
    }

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/table-page");

        int totalColumns = getColumnCount(driver, By.id("dataTable"));
        System.out.println("Total columns: " + totalColumns);

        driver.quit();
    }
}
```

### Extracting Cell Values

```java
public class ExtractCellValuesExample {

    // Get cell value by row and column index (1-based)
    public static String getCellValue(WebDriver driver, By tableLocator,
                                     int row, int column) {
        WebElement table = driver.findElement(tableLocator);
        String xpath = String.format(".//tbody/tr[%d]/td[%d]", row, column);
        WebElement cell = table.findElement(By.xpath(xpath));
        return cell.getText();
    }

    // Get cell value by row index and column name
    public static String getCellValueByColumnName(WebDriver driver,
                                                  By tableLocator,
                                                  int row,
                                                  String columnName) {
        WebElement table = driver.findElement(tableLocator);

        // Find column index by header name
        List<WebElement> headers = table.findElements(By.xpath(".//thead/tr/th"));
        int columnIndex = -1;

        for (int i = 0; i < headers.size(); i++) {
            if (headers.get(i).getText().trim().equals(columnName)) {
                columnIndex = i + 1; // XPath is 1-based
                break;
            }
        }

        if (columnIndex == -1) {
            throw new RuntimeException("Column not found: " + columnName);
        }

        String xpath = String.format(".//tbody/tr[%d]/td[%d]", row, columnIndex);
        WebElement cell = table.findElement(By.xpath(xpath));
        return cell.getText();
    }

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/table-page");

        // Example 1: Get cell by position
        String value1 = getCellValue(driver, By.id("dataTable"), 2, 3);
        System.out.println("Cell (2,3): " + value1);

        // Example 2: Get cell by column name
        String email = getCellValueByColumnName(driver, By.id("dataTable"), 1, "Email");
        System.out.println("Email in row 1: " + email);

        driver.quit();
    }
}
```

### Reading Entire Rows

```java
import java.util.ArrayList;
import java.util.List;

public class ReadRowExample {

    // Get all values from a specific row
    public static List<String> getRowData(WebDriver driver, By tableLocator, int rowIndex) {
        List<String> rowData = new ArrayList<>();
        WebElement table = driver.findElement(tableLocator);

        String xpath = String.format(".//tbody/tr[%d]/td", rowIndex);
        List<WebElement> cells = table.findElements(By.xpath(xpath));

        for (WebElement cell : cells) {
            rowData.add(cell.getText());
        }

        return rowData;
    }

    // Get all rows as a list of lists
    public static List<List<String>> getAllRowsData(WebDriver driver, By tableLocator) {
        List<List<String>> allRows = new ArrayList<>();
        WebElement table = driver.findElement(tableLocator);

        List<WebElement> rows = table.findElements(By.xpath(".//tbody/tr"));

        for (WebElement row : rows) {
            List<String> rowData = new ArrayList<>();
            List<WebElement> cells = row.findElements(By.tagName("td"));

            for (WebElement cell : cells) {
                rowData.add(cell.getText());
            }

            allRows.add(rowData);
        }

        return allRows;
    }

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/table-page");

        // Example 1: Get specific row
        List<String> row2 = getRowData(driver, By.id("dataTable"), 2);
        System.out.println("Row 2 data: " + row2);

        // Example 2: Get all rows
        List<List<String>> allData = getAllRowsData(driver, By.id("dataTable"));
        System.out.println("\nAll table data:");
        for (int i = 0; i < allData.size(); i++) {
            System.out.println("Row " + (i + 1) + ": " + allData.get(i));
        }

        driver.quit();
    }
}
```

### Reading Entire Columns

```java
import java.util.ArrayList;
import java.util.List;

public class ReadColumnExample {

    // Get all values from a specific column by index
    public static List<String> getColumnData(WebDriver driver,
                                            By tableLocator,
                                            int columnIndex) {
        List<String> columnData = new ArrayList<>();
        WebElement table = driver.findElement(tableLocator);

        String xpath = String.format(".//tbody/tr/td[%d]", columnIndex);
        List<WebElement> cells = table.findElements(By.xpath(xpath));

        for (WebElement cell : cells) {
            columnData.add(cell.getText());
        }

        return columnData;
    }

    // Get all values from a column by header name
    public static List<String> getColumnDataByName(WebDriver driver,
                                                   By tableLocator,
                                                   String columnName) {
        WebElement table = driver.findElement(tableLocator);

        // Find column index
        List<WebElement> headers = table.findElements(By.xpath(".//thead/tr/th"));
        int columnIndex = -1;

        for (int i = 0; i < headers.size(); i++) {
            if (headers.get(i).getText().trim().equals(columnName)) {
                columnIndex = i + 1;
                break;
            }
        }

        if (columnIndex == -1) {
            throw new RuntimeException("Column not found: " + columnName);
        }

        return getColumnData(driver, tableLocator, columnIndex);
    }

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/table-page");

        // Example 1: Get column by index
        List<String> column2 = getColumnData(driver, By.id("dataTable"), 2);
        System.out.println("Column 2 data: " + column2);

        // Example 2: Get column by name
        List<String> emails = getColumnDataByName(driver, By.id("dataTable"), "Email");
        System.out.println("\nAll emails:");
        emails.forEach(System.out::println);

        driver.quit();
    }
}
```

### Reading Headers

```java
import java.util.ArrayList;
import java.util.List;

public class ReadHeadersExample {

    public static List<String> getHeaders(WebDriver driver, By tableLocator) {
        List<String> headers = new ArrayList<>();
        WebElement table = driver.findElement(tableLocator);

        List<WebElement> headerCells = table.findElements(By.xpath(".//thead/tr/th"));

        for (WebElement header : headerCells) {
            headers.add(header.getText());
        }

        return headers;
    }

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/table-page");

        List<String> headers = getHeaders(driver, By.id("dataTable"));
        System.out.println("Table headers: " + headers);

        driver.quit();
    }
}
```

---

## Searching in Tables

### Finding Specific Data

```java
public class SearchTableExample {

    // Check if a value exists in the table
    public static boolean isValuePresent(WebDriver driver,
                                        By tableLocator,
                                        String searchValue) {
        WebElement table = driver.findElement(tableLocator);

        try {
            String xpath = String.format(".//tbody/tr/td[text()='%s']", searchValue);
            WebElement cell = table.findElement(By.xpath(xpath));
            return cell.isDisplayed();
        } catch (NoSuchElementException e) {
            return false;
        }
    }

    // Check if a value containing partial text exists
    public static boolean isPartialValuePresent(WebDriver driver,
                                               By tableLocator,
                                               String partialValue) {
        WebElement table = driver.findElement(tableLocator);

        try {
            String xpath = String.format(".//tbody/tr/td[contains(text(),'%s')]", partialValue);
            WebElement cell = table.findElement(By.xpath(xpath));
            return cell.isDisplayed();
        } catch (NoSuchElementException e) {
            return false;
        }
    }

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/table-page");

        // Example 1: Exact match
        boolean found1 = isValuePresent(driver, By.id("dataTable"), "John Doe");
        System.out.println("'John Doe' found: " + found1);

        // Example 2: Partial match
        boolean found2 = isPartialValuePresent(driver, By.id("dataTable"), "john@");
        System.out.println("Email containing 'john@' found: " + found2);

        driver.quit();
    }
}
```

### Searching by Column

```java
import java.util.ArrayList;
import java.util.List;

public class SearchByColumnExample {

    // Find all rows where a specific column contains a value
    public static List<Integer> findRowsByColumnValue(WebDriver driver,
                                                     By tableLocator,
                                                     String columnName,
                                                     String searchValue) {
        List<Integer> matchingRows = new ArrayList<>();
        WebElement table = driver.findElement(tableLocator);

        // Get column index
        List<WebElement> headers = table.findElements(By.xpath(".//thead/tr/th"));
        int columnIndex = -1;

        for (int i = 0; i < headers.size(); i++) {
            if (headers.get(i).getText().trim().equals(columnName)) {
                columnIndex = i + 1;
                break;
            }
        }

        if (columnIndex == -1) {
            return matchingRows;
        }

        // Find matching rows
        List<WebElement> rows = table.findElements(By.xpath(".//tbody/tr"));

        for (int i = 0; i < rows.size(); i++) {
            String xpath = String.format(".//td[%d]", columnIndex);
            WebElement cell = rows.get(i).findElement(By.xpath(xpath));

            if (cell.getText().equals(searchValue)) {
                matchingRows.add(i + 1); // 1-based index
            }
        }

        return matchingRows;
    }

    // Get value from another column in the same row
    public static String getValueFromMatchingRow(WebDriver driver,
                                                By tableLocator,
                                                String searchColumn,
                                                String searchValue,
                                                String targetColumn) {
        WebElement table = driver.findElement(tableLocator);

        // Get column indices
        List<WebElement> headers = table.findElements(By.xpath(".//thead/tr/th"));
        int searchColumnIndex = -1;
        int targetColumnIndex = -1;

        for (int i = 0; i < headers.size(); i++) {
            String headerText = headers.get(i).getText().trim();
            if (headerText.equals(searchColumn)) {
                searchColumnIndex = i + 1;
            }
            if (headerText.equals(targetColumn)) {
                targetColumnIndex = i + 1;
            }
        }

        if (searchColumnIndex == -1 || targetColumnIndex == -1) {
            throw new RuntimeException("Column not found");
        }

        // Find the row
        String xpath = String.format(
            ".//tbody/tr[td[%d][text()='%s']]/td[%d]",
            searchColumnIndex, searchValue, targetColumnIndex
        );

        WebElement targetCell = table.findElement(By.xpath(xpath));
        return targetCell.getText();
    }

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/table-page");

        // Example 1: Find rows with specific value
        List<Integer> rows = findRowsByColumnValue(
            driver, By.id("dataTable"), "Status", "Active"
        );
        System.out.println("Rows with Status='Active': " + rows);

        // Example 2: Get email for a specific name
        String email = getValueFromMatchingRow(
            driver, By.id("dataTable"), "Name", "John Doe", "Email"
        );
        System.out.println("John Doe's email: " + email);

        driver.quit();
    }
}
```

### Conditional Searches

```java
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

public class ConditionalSearchExample {

    static class RowData {
        private List<String> values;
        private int rowIndex;

        public RowData(int rowIndex, List<String> values) {
            this.rowIndex = rowIndex;
            this.values = values;
        }

        public int getRowIndex() {
            return rowIndex;
        }

        public List<String> getValues() {
            return values;
        }

        public String getValue(int columnIndex) {
            return values.get(columnIndex);
        }
    }

    // Find rows matching a condition
    public static List<RowData> findRowsByCondition(WebDriver driver,
                                                    By tableLocator,
                                                    Predicate<RowData> condition) {
        List<RowData> matchingRows = new ArrayList<>();
        WebElement table = driver.findElement(tableLocator);

        List<WebElement> rows = table.findElements(By.xpath(".//tbody/tr"));

        for (int i = 0; i < rows.size(); i++) {
            List<WebElement> cells = rows.get(i).findElements(By.tagName("td"));
            List<String> cellValues = new ArrayList<>();

            for (WebElement cell : cells) {
                cellValues.add(cell.getText());
            }

            RowData rowData = new RowData(i + 1, cellValues);

            if (condition.test(rowData)) {
                matchingRows.add(rowData);
            }
        }

        return matchingRows;
    }

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/table-page");

        // Example 1: Find rows where age > 30 (assuming age is in column 2)
        List<RowData> adultsOver30 = findRowsByCondition(
            driver,
            By.id("dataTable"),
            row -> {
                try {
                    int age = Integer.parseInt(row.getValue(1)); // Column index 1 (0-based)
                    return age > 30;
                } catch (NumberFormatException e) {
                    return false;
                }
            }
        );

        System.out.println("Rows with age > 30: " + adultsOver30.size());

        // Example 2: Find rows where email contains "gmail"
        List<RowData> gmailUsers = findRowsByCondition(
            driver,
            By.id("dataTable"),
            row -> row.getValue(2).contains("gmail") // Email in column 2 (0-based)
        );

        System.out.println("Gmail users: " + gmailUsers.size());

        // Example 3: Complex condition - Active users with age > 25
        List<RowData> activeAdults = findRowsByCondition(
            driver,
            By.id("dataTable"),
            row -> {
                try {
                    int age = Integer.parseInt(row.getValue(1));
                    String status = row.getValue(3);
                    return age > 25 && status.equals("Active");
                } catch (Exception e) {
                    return false;
                }
            }
        );

        System.out.println("Active users over 25: " + activeAdults.size());

        driver.quit();
    }
}
```

### Getting Row Index by Value

```java
public class GetRowIndexExample {

    // Get row index where a specific column has a specific value
    public static int getRowIndexByValue(WebDriver driver,
                                        By tableLocator,
                                        String columnName,
                                        String searchValue) {
        WebElement table = driver.findElement(tableLocator);

        // Get column index
        List<WebElement> headers = table.findElements(By.xpath(".//thead/tr/th"));
        int columnIndex = -1;

        for (int i = 0; i < headers.size(); i++) {
            if (headers.get(i).getText().trim().equals(columnName)) {
                columnIndex = i + 1;
                break;
            }
        }

        if (columnIndex == -1) {
            return -1;
        }

        // Find row
        List<WebElement> rows = table.findElements(By.xpath(".//tbody/tr"));

        for (int i = 0; i < rows.size(); i++) {
            String xpath = String.format(".//td[%d]", columnIndex);
            WebElement cell = rows.get(i).findElement(By.xpath(xpath));

            if (cell.getText().equals(searchValue)) {
                return i + 1; // 1-based index
            }
        }

        return -1; // Not found
    }

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/table-page");

        int rowIndex = getRowIndexByValue(
            driver, By.id("dataTable"), "Name", "John Doe"
        );

        if (rowIndex != -1) {
            System.out.println("John Doe found at row: " + rowIndex);
        } else {
            System.out.println("John Doe not found");
        }

        driver.quit();
    }
}
```

---

## Dynamic Tables

### Handling Pagination

```java
import java.util.ArrayList;
import java.util.List;

public class PaginationExample {

    // Get data from all pages
    public static List<List<String>> getAllPagesData(WebDriver driver,
                                                     By tableLocator,
                                                     By nextButtonLocator) {
        List<List<String>> allData = new ArrayList<>();

        do {
            // Read current page data
            WebElement table = driver.findElement(tableLocator);
            List<WebElement> rows = table.findElements(By.xpath(".//tbody/tr"));

            for (WebElement row : rows) {
                List<String> rowData = new ArrayList<>();
                List<WebElement> cells = row.findElements(By.tagName("td"));

                for (WebElement cell : cells) {
                    rowData.add(cell.getText());
                }

                allData.add(rowData);
            }

            // Try to go to next page
            try {
                WebElement nextButton = driver.findElement(nextButtonLocator);

                if (!nextButton.isEnabled() ||
                    nextButton.getAttribute("class").contains("disabled")) {
                    break; // No more pages
                }

                nextButton.click();
                Thread.sleep(1000); // Wait for page to load

            } catch (NoSuchElementException | InterruptedException e) {
                break; // No more pages or interrupted
            }

        } while (true);

        return allData;
    }

    // Search across all pages
    public static boolean searchAcrossPages(WebDriver driver,
                                           By tableLocator,
                                           By nextButtonLocator,
                                           String searchValue) {
        do {
            WebElement table = driver.findElement(tableLocator);

            try {
                String xpath = String.format(".//tbody/tr/td[text()='%s']", searchValue);
                WebElement cell = table.findElement(By.xpath(xpath));

                if (cell.isDisplayed()) {
                    return true; // Found
                }
            } catch (NoSuchElementException e) {
                // Not on this page, continue
            }

            // Go to next page
            try {
                WebElement nextButton = driver.findElement(nextButtonLocator);

                if (!nextButton.isEnabled() ||
                    nextButton.getAttribute("class").contains("disabled")) {
                    break;
                }

                nextButton.click();
                Thread.sleep(1000);

            } catch (NoSuchElementException | InterruptedException e) {
                break;
            }

        } while (true);

        return false; // Not found
    }

    // Navigate to a specific page
    public static void navigateToPage(WebDriver driver,
                                     By paginationLocator,
                                     int pageNumber) {
        WebElement pagination = driver.findElement(paginationLocator);

        // Click on page number
        String xpath = String.format(".//a[text()='%d']", pageNumber);
        WebElement pageLink = pagination.findElement(By.xpath(xpath));
        pageLink.click();

        // Wait for table to load
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/paginated-table");

        // Example 1: Get all data from all pages
        List<List<String>> allData = getAllPagesData(
            driver,
            By.id("dataTable"),
            By.cssSelector("button.next")
        );
        System.out.println("Total records across all pages: " + allData.size());

        // Reset to first page
        driver.get("https://example.com/paginated-table");

        // Example 2: Search across pages
        boolean found = searchAcrossPages(
            driver,
            By.id("dataTable"),
            By.cssSelector("button.next"),
            "John Doe"
        );
        System.out.println("Found 'John Doe': " + found);

        driver.quit();
    }
}
```

### Handling Sorting

```java
import java.util.ArrayList;
import java.util.List;

public class SortingExample {

    // Click on a column header to sort
    public static void sortByColumn(WebDriver driver,
                                   By tableLocator,
                                   String columnName) {
        WebElement table = driver.findElement(tableLocator);

        // Find and click the header
        String xpath = String.format(".//thead/tr/th[text()='%s']", columnName);
        WebElement header = table.findElement(By.xpath(xpath));
        header.click();

        // Wait for sort to complete
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    // Verify if column is sorted (ascending)
    public static boolean isColumnSortedAscending(WebDriver driver,
                                                 By tableLocator,
                                                 String columnName) {
        WebElement table = driver.findElement(tableLocator);

        // Get column index
        List<WebElement> headers = table.findElements(By.xpath(".//thead/tr/th"));
        int columnIndex = -1;

        for (int i = 0; i < headers.size(); i++) {
            if (headers.get(i).getText().trim().equals(columnName)) {
                columnIndex = i + 1;
                break;
            }
        }

        if (columnIndex == -1) {
            return false;
        }

        // Get all values in the column
        String xpath = String.format(".//tbody/tr/td[%d]", columnIndex);
        List<WebElement> cells = table.findElements(By.xpath(xpath));

        List<String> values = new ArrayList<>();
        for (WebElement cell : cells) {
            values.add(cell.getText());
        }

        // Check if sorted
        for (int i = 0; i < values.size() - 1; i++) {
            if (values.get(i).compareTo(values.get(i + 1)) > 0) {
                return false;
            }
        }

        return true;
    }

    // Get sort indicator (↑ or ↓) for a column
    public static String getSortIndicator(WebDriver driver,
                                         By tableLocator,
                                         String columnName) {
        WebElement table = driver.findElement(tableLocator);
        String xpath = String.format(".//thead/tr/th[text()='%s']", columnName);
        WebElement header = table.findElement(By.xpath(xpath));

        String headerText = header.getText();

        if (headerText.contains("↑") || headerText.contains("▲")) {
            return "ascending";
        } else if (headerText.contains("↓") || headerText.contains("▼")) {
            return "descending";
        } else {
            return "none";
        }
    }

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/sortable-table");

        // Example 1: Sort by column
        sortByColumn(driver, By.id("dataTable"), "Name");
        System.out.println("Sorted by Name");

        // Example 2: Verify sorting
        boolean isSorted = isColumnSortedAscending(driver, By.id("dataTable"), "Name");
        System.out.println("Is sorted ascending: " + isSorted);

        // Example 3: Check sort indicator
        String indicator = getSortIndicator(driver, By.id("dataTable"), "Name");
        System.out.println("Sort indicator: " + indicator);

        driver.quit();
    }
}
```

### Handling Filtering

```java
public class FilteringExample {

    // Apply filter to a column
    public static void applyFilter(WebDriver driver,
                                  By filterInputLocator,
                                  String filterValue) {
        WebElement filterInput = driver.findElement(filterInputLocator);
        filterInput.clear();
        filterInput.sendKeys(filterValue);
        filterInput.sendKeys(Keys.ENTER);

        // Wait for filter to apply
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    // Clear filter
    public static void clearFilter(WebDriver driver, By filterInputLocator) {
        WebElement filterInput = driver.findElement(filterInputLocator);
        filterInput.clear();
        filterInput.sendKeys(Keys.ENTER);

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    // Get filtered row count
    public static int getFilteredRowCount(WebDriver driver, By tableLocator) {
        WebElement table = driver.findElement(tableLocator);
        List<WebElement> visibleRows = table.findElements(
            By.xpath(".//tbody/tr[not(contains(@style,'display: none'))]")
        );
        return visibleRows.size();
    }

    // Apply multiple filters
    public static void applyMultipleFilters(WebDriver driver,
                                           java.util.Map<By, String> filters) {
        for (java.util.Map.Entry<By, String> entry : filters.entrySet()) {
            WebElement filterInput = driver.findElement(entry.getKey());
            filterInput.clear();
            filterInput.sendKeys(entry.getValue());
        }

        // Wait for filters to apply
        try {
            Thread.sleep(1500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/filterable-table");

        // Example 1: Apply single filter
        applyFilter(driver, By.id("nameFilter"), "John");
        int filteredCount = getFilteredRowCount(driver, By.id("dataTable"));
        System.out.println("Filtered rows: " + filteredCount);

        // Example 2: Clear filter
        clearFilter(driver, By.id("nameFilter"));

        // Example 3: Apply multiple filters
        java.util.Map<By, String> filters = new java.util.HashMap<>();
        filters.put(By.id("nameFilter"), "John");
        filters.put(By.id("statusFilter"), "Active");
        applyMultipleFilters(driver, filters);

        driver.quit();
    }
}
```

### Handling Dynamic Row Loading (AJAX)

```java
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import java.time.Duration;

public class DynamicLoadingExample {

    // Wait for table to load rows
    public static void waitForTableToLoad(WebDriver driver,
                                         By tableLocator,
                                         int expectedMinRows) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        wait.until(driver1 -> {
            WebElement table = driver1.findElement(tableLocator);
            List<WebElement> rows = table.findElements(By.xpath(".//tbody/tr"));
            return rows.size() >= expectedMinRows;
        });
    }

    // Wait for specific row to appear
    public static void waitForRowWithValue(WebDriver driver,
                                          By tableLocator,
                                          String value) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        wait.until(driver1 -> {
            WebElement table = driver1.findElement(tableLocator);
            try {
                String xpath = String.format(".//tbody/tr/td[text()='%s']", value);
                WebElement cell = table.findElement(By.xpath(xpath));
                return cell.isDisplayed();
            } catch (NoSuchElementException e) {
                return false;
            }
        });
    }

    // Handle lazy loading (scroll to load more)
    public static void scrollToLoadMore(WebDriver driver, By tableLocator) {
        WebElement table = driver.findElement(tableLocator);

        // Scroll to bottom of table
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].scrollIntoView(false);", table);

        // Wait for new rows to load
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    // Get all rows with infinite scroll
    public static List<List<String>> getAllRowsWithInfiniteScroll(WebDriver driver,
                                                                  By tableLocator) {
        List<List<String>> allData = new ArrayList<>();
        int previousRowCount = 0;
        int currentRowCount;

        do {
            WebElement table = driver.findElement(tableLocator);
            List<WebElement> rows = table.findElements(By.xpath(".//tbody/tr"));
            currentRowCount = rows.size();

            // Read new rows
            for (int i = previousRowCount; i < currentRowCount; i++) {
                List<String> rowData = new ArrayList<>();
                List<WebElement> cells = rows.get(i).findElements(By.tagName("td"));

                for (WebElement cell : cells) {
                    rowData.add(cell.getText());
                }

                allData.add(rowData);
            }

            // Scroll to load more
            if (currentRowCount > previousRowCount) {
                scrollToLoadMore(driver, tableLocator);
                previousRowCount = currentRowCount;
            } else {
                break; // No more data
            }

        } while (true);

        return allData;
    }

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/dynamic-table");

        // Example 1: Wait for table to load
        waitForTableToLoad(driver, By.id("dataTable"), 10);
        System.out.println("Table loaded");

        // Example 2: Wait for specific row
        waitForRowWithValue(driver, By.id("dataTable"), "John Doe");
        System.out.println("Specific row found");

        // Example 3: Handle infinite scroll
        List<List<String>> allData = getAllRowsWithInfiniteScroll(driver, By.id("dataTable"));
        System.out.println("Total rows loaded: " + allData.size());

        driver.quit();
    }
}
```

---

## Table Interactions

### Clicking Links in Tables

```java
public class TableLinksExample {

    // Click a link in a specific cell
    public static void clickLinkInCell(WebDriver driver,
                                      By tableLocator,
                                      int row,
                                      int column) {
        WebElement table = driver.findElement(tableLocator);
        String xpath = String.format(".//tbody/tr[%d]/td[%d]//a", row, column);
        WebElement link = table.findElement(By.xpath(xpath));
        link.click();
    }

    // Click a link by text in table
    public static void clickLinkByText(WebDriver driver,
                                      By tableLocator,
                                      String linkText) {
        WebElement table = driver.findElement(tableLocator);
        String xpath = String.format(".//tbody/tr/td//a[text()='%s']", linkText);
        WebElement link = table.findElement(By.xpath(xpath));
        link.click();
    }

    // Click edit link for a specific row by identifier
    public static void clickEditForRow(WebDriver driver,
                                      By tableLocator,
                                      String columnName,
                                      String identifier) {
        WebElement table = driver.findElement(tableLocator);

        // Find column index
        List<WebElement> headers = table.findElements(By.xpath(".//thead/tr/th"));
        int columnIndex = -1;

        for (int i = 0; i < headers.size(); i++) {
            if (headers.get(i).getText().trim().equals(columnName)) {
                columnIndex = i + 1;
                break;
            }
        }

        if (columnIndex == -1) {
            throw new RuntimeException("Column not found: " + columnName);
        }

        // Find and click edit link
        String xpath = String.format(
            ".//tbody/tr[td[%d][text()='%s']]//a[contains(text(),'Edit')]",
            columnIndex, identifier
        );
        WebElement editLink = table.findElement(By.xpath(xpath));
        editLink.click();
    }

    // Click delete with confirmation
    public static void clickDeleteWithConfirmation(WebDriver driver,
                                                   By tableLocator,
                                                   int row) {
        WebElement table = driver.findElement(tableLocator);
        String xpath = String.format(".//tbody/tr[%d]//a[contains(text(),'Delete')]", row);
        WebElement deleteLink = table.findElement(By.xpath(xpath));
        deleteLink.click();

        // Handle confirmation alert
        try {
            Thread.sleep(500);
            Alert alert = driver.switchTo().alert();
            alert.accept();
        } catch (Exception e) {
            // No alert or already handled
        }
    }

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/table-with-links");

        // Example 1: Click link in specific cell
        clickLinkInCell(driver, By.id("dataTable"), 2, 4);
        driver.navigate().back();

        // Example 2: Click link by text
        clickLinkByText(driver, By.id("dataTable"), "View Details");
        driver.navigate().back();

        // Example 3: Click edit for specific user
        clickEditForRow(driver, By.id("dataTable"), "Name", "John Doe");

        driver.quit();
    }
}
```

### Handling Checkboxes in Tables

```java
import java.util.ArrayList;
import java.util.List;

public class TableCheckboxExample {

    // Select checkbox in a specific row
    public static void selectCheckboxInRow(WebDriver driver,
                                          By tableLocator,
                                          int row) {
        WebElement table = driver.findElement(tableLocator);
        String xpath = String.format(".//tbody/tr[%d]//input[@type='checkbox']", row);
        WebElement checkbox = table.findElement(By.xpath(xpath));

        if (!checkbox.isSelected()) {
            checkbox.click();
        }
    }

    // Select checkbox by row identifier
    public static void selectCheckboxByIdentifier(WebDriver driver,
                                                 By tableLocator,
                                                 String columnName,
                                                 String identifier) {
        WebElement table = driver.findElement(tableLocator);

        // Get column index
        List<WebElement> headers = table.findElements(By.xpath(".//thead/tr/th"));
        int columnIndex = -1;

        for (int i = 0; i < headers.size(); i++) {
            if (headers.get(i).getText().trim().equals(columnName)) {
                columnIndex = i + 1;
                break;
            }
        }

        if (columnIndex == -1) {
            throw new RuntimeException("Column not found: " + columnName);
        }

        // Find and click checkbox
        String xpath = String.format(
            ".//tbody/tr[td[%d][text()='%s']]//input[@type='checkbox']",
            columnIndex, identifier
        );
        WebElement checkbox = table.findElement(By.xpath(xpath));

        if (!checkbox.isSelected()) {
            checkbox.click();
        }
    }

    // Select all checkboxes
    public static void selectAllCheckboxes(WebDriver driver, By tableLocator) {
        WebElement table = driver.findElement(tableLocator);
        List<WebElement> checkboxes = table.findElements(
            By.xpath(".//tbody/tr//input[@type='checkbox']")
        );

        for (WebElement checkbox : checkboxes) {
            if (!checkbox.isSelected()) {
                checkbox.click();
            }
        }
    }

    // Select header checkbox (select all)
    public static void clickSelectAllCheckbox(WebDriver driver, By tableLocator) {
        WebElement table = driver.findElement(tableLocator);
        WebElement headerCheckbox = table.findElement(
            By.xpath(".//thead//input[@type='checkbox']")
        );
        headerCheckbox.click();
    }

    // Unselect checkbox
    public static void unselectCheckboxInRow(WebDriver driver,
                                            By tableLocator,
                                            int row) {
        WebElement table = driver.findElement(tableLocator);
        String xpath = String.format(".//tbody/tr[%d]//input[@type='checkbox']", row);
        WebElement checkbox = table.findElement(By.xpath(xpath));

        if (checkbox.isSelected()) {
            checkbox.click();
        }
    }

    // Get all selected row indices
    public static List<Integer> getSelectedRowIndices(WebDriver driver, By tableLocator) {
        List<Integer> selectedRows = new ArrayList<>();
        WebElement table = driver.findElement(tableLocator);
        List<WebElement> rows = table.findElements(By.xpath(".//tbody/tr"));

        for (int i = 0; i < rows.size(); i++) {
            try {
                WebElement checkbox = rows.get(i).findElement(
                    By.xpath(".//input[@type='checkbox']")
                );

                if (checkbox.isSelected()) {
                    selectedRows.add(i + 1); // 1-based index
                }
            } catch (NoSuchElementException e) {
                // Row doesn't have checkbox
            }
        }

        return selectedRows;
    }

    // Check if checkbox is selected in a row
    public static boolean isCheckboxSelected(WebDriver driver,
                                            By tableLocator,
                                            int row) {
        WebElement table = driver.findElement(tableLocator);
        String xpath = String.format(".//tbody/tr[%d]//input[@type='checkbox']", row);
        WebElement checkbox = table.findElement(By.xpath(xpath));
        return checkbox.isSelected();
    }

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/table-with-checkboxes");

        // Example 1: Select specific row
        selectCheckboxInRow(driver, By.id("dataTable"), 2);

        // Example 2: Select by identifier
        selectCheckboxByIdentifier(driver, By.id("dataTable"), "Name", "John Doe");

        // Example 3: Select all
        selectAllCheckboxes(driver, By.id("dataTable"));

        // Example 4: Get selected rows
        List<Integer> selected = getSelectedRowIndices(driver, By.id("dataTable"));
        System.out.println("Selected rows: " + selected);

        driver.quit();
    }
}
```

### Handling Radio Buttons in Tables

```java
public class TableRadioButtonExample {

    // Select radio button in a specific row
    public static void selectRadioButtonInRow(WebDriver driver,
                                             By tableLocator,
                                             int row) {
        WebElement table = driver.findElement(tableLocator);
        String xpath = String.format(".//tbody/tr[%d]//input[@type='radio']", row);
        WebElement radioButton = table.findElement(By.xpath(xpath));
        radioButton.click();
    }

    // Select radio button by row identifier
    public static void selectRadioButtonByIdentifier(WebDriver driver,
                                                    By tableLocator,
                                                    String columnName,
                                                    String identifier) {
        WebElement table = driver.findElement(tableLocator);

        // Get column index
        List<WebElement> headers = table.findElements(By.xpath(".//thead/tr/th"));
        int columnIndex = -1;

        for (int i = 0; i < headers.size(); i++) {
            if (headers.get(i).getText().trim().equals(columnName)) {
                columnIndex = i + 1;
                break;
            }
        }

        if (columnIndex == -1) {
            throw new RuntimeException("Column not found: " + columnName);
        }

        // Find and click radio button
        String xpath = String.format(
            ".//tbody/tr[td[%d][text()='%s']]//input[@type='radio']",
            columnIndex, identifier
        );
        WebElement radioButton = table.findElement(By.xpath(xpath));
        radioButton.click();
    }

    // Get index of selected radio button
    public static int getSelectedRadioButtonRow(WebDriver driver, By tableLocator) {
        WebElement table = driver.findElement(tableLocator);
        List<WebElement> rows = table.findElements(By.xpath(".//tbody/tr"));

        for (int i = 0; i < rows.size(); i++) {
            try {
                WebElement radioButton = rows.get(i).findElement(
                    By.xpath(".//input[@type='radio']")
                );

                if (radioButton.isSelected()) {
                    return i + 1; // 1-based index
                }
            } catch (NoSuchElementException e) {
                // Row doesn't have radio button
            }
        }

        return -1; // None selected
    }

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/table-with-radio-buttons");

        // Example 1: Select radio button in row 2
        selectRadioButtonInRow(driver, By.id("dataTable"), 2);

        // Example 2: Select by identifier
        selectRadioButtonByIdentifier(driver, By.id("dataTable"), "Name", "Jane Smith");

        // Example 3: Get selected row
        int selectedRow = getSelectedRadioButtonRow(driver, By.id("dataTable"));
        System.out.println("Selected row: " + selectedRow);

        driver.quit();
    }
}
```

### Editing Table Data

```java
public class EditTableDataExample {

    // Edit cell value (for editable tables)
    public static void editCellValue(WebDriver driver,
                                    By tableLocator,
                                    int row,
                                    int column,
                                    String newValue) {
        WebElement table = driver.findElement(tableLocator);
        String xpath = String.format(".//tbody/tr[%d]/td[%d]", row, column);
        WebElement cell = table.findElement(By.xpath(xpath));

        // Double-click to edit
        Actions actions = new Actions(driver);
        actions.doubleClick(cell).perform();

        // Find input field (might appear after double-click)
        try {
            Thread.sleep(500);
            WebElement input = cell.findElement(By.tagName("input"));
            input.clear();
            input.sendKeys(newValue);
            input.sendKeys(Keys.ENTER);
        } catch (Exception e) {
            // Try direct editing
            cell.clear();
            cell.sendKeys(newValue);
            cell.sendKeys(Keys.ENTER);
        }
    }

    // Edit cell with inline editor
    public static void editCellWithInlineEditor(WebDriver driver,
                                               By tableLocator,
                                               int row,
                                               int column,
                                               String newValue) {
        WebElement table = driver.findElement(tableLocator);

        // Click edit button
        String editButtonXpath = String.format(".//tbody/tr[%d]//button[contains(text(),'Edit')]", row);
        WebElement editButton = table.findElement(By.xpath(editButtonXpath));
        editButton.click();

        // Wait for edit mode
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Edit the cell
        String inputXpath = String.format(".//tbody/tr[%d]/td[%d]//input", row, column);
        WebElement input = table.findElement(By.xpath(inputXpath));
        input.clear();
        input.sendKeys(newValue);

        // Save
        String saveButtonXpath = String.format(".//tbody/tr[%d]//button[contains(text(),'Save')]", row);
        WebElement saveButton = table.findElement(By.xpath(saveButtonXpath));
        saveButton.click();
    }

    // Edit multiple cells in a row
    public static void editRowData(WebDriver driver,
                                  By tableLocator,
                                  int row,
                                  java.util.Map<Integer, String> columnValues) {
        WebElement table = driver.findElement(tableLocator);

        // Click edit for the row
        String editXpath = String.format(".//tbody/tr[%d]//button[contains(text(),'Edit')]", row);
        WebElement editButton = table.findElement(By.xpath(editXpath));
        editButton.click();

        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Edit each specified column
        for (java.util.Map.Entry<Integer, String> entry : columnValues.entrySet()) {
            String inputXpath = String.format(
                ".//tbody/tr[%d]/td[%d]//input", row, entry.getKey()
            );
            WebElement input = table.findElement(By.xpath(inputXpath));
            input.clear();
            input.sendKeys(entry.getValue());
        }

        // Save
        String saveXpath = String.format(".//tbody/tr[%d]//button[contains(text(),'Save')]", row);
        WebElement saveButton = table.findElement(By.xpath(saveXpath));
        saveButton.click();
    }

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/editable-table");

        // Example 1: Edit single cell
        editCellValue(driver, By.id("dataTable"), 2, 3, "new@email.com");

        // Example 2: Edit with inline editor
        editCellWithInlineEditor(driver, By.id("dataTable"), 1, 2, "Updated Name");

        // Example 3: Edit multiple cells
        java.util.Map<Integer, String> updates = new java.util.HashMap<>();
        updates.put(2, "John Updated");
        updates.put(3, "john.updated@email.com");
        editRowData(driver, By.id("dataTable"), 1, updates);

        driver.quit();
    }
}
```

---

## Creating Table Utility Methods

### TableUtils Class

```java
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.*;

public class TableUtils {

    private WebDriver driver;
    private WebElement table;

    public TableUtils(WebDriver driver, By tableLocator) {
        this.driver = driver;
        this.table = driver.findElement(tableLocator);
    }

    // Get row count
    public int getRowCount() {
        List<WebElement> rows = table.findElements(By.xpath(".//tbody/tr"));
        return rows.size();
    }

    // Get column count
    public int getColumnCount() {
        List<WebElement> headers = table.findElements(By.xpath(".//thead/tr[1]/th"));
        if (!headers.isEmpty()) {
            return headers.size();
        }

        List<WebElement> firstRowCells = table.findElements(By.xpath(".//tbody/tr[1]/td"));
        return firstRowCells.size();
    }

    // Get headers
    public List<String> getHeaders() {
        List<String> headers = new ArrayList<>();
        List<WebElement> headerCells = table.findElements(By.xpath(".//thead/tr/th"));

        for (WebElement cell : headerCells) {
            headers.add(cell.getText());
        }

        return headers;
    }

    // Get cell value by position
    public String getCellValue(int row, int column) {
        String xpath = String.format(".//tbody/tr[%d]/td[%d]", row, column);
        WebElement cell = table.findElement(By.xpath(xpath));
        return cell.getText();
    }

    // Get cell value by row and column name
    public String getCellValue(int row, String columnName) {
        int columnIndex = getColumnIndex(columnName);
        return getCellValue(row, columnIndex);
    }

    // Get column index by name
    public int getColumnIndex(String columnName) {
        List<WebElement> headers = table.findElements(By.xpath(".//thead/tr/th"));

        for (int i = 0; i < headers.size(); i++) {
            if (headers.get(i).getText().trim().equals(columnName)) {
                return i + 1; // 1-based
            }
        }

        return -1;
    }

    // Get row data
    public List<String> getRowData(int rowIndex) {
        List<String> rowData = new ArrayList<>();
        String xpath = String.format(".//tbody/tr[%d]/td", rowIndex);
        List<WebElement> cells = table.findElements(By.xpath(xpath));

        for (WebElement cell : cells) {
            rowData.add(cell.getText());
        }

        return rowData;
    }

    // Get column data
    public List<String> getColumnData(int columnIndex) {
        List<String> columnData = new ArrayList<>();
        String xpath = String.format(".//tbody/tr/td[%d]", columnIndex);
        List<WebElement> cells = table.findElements(By.xpath(xpath));

        for (WebElement cell : cells) {
            columnData.add(cell.getText());
        }

        return columnData;
    }

    // Get column data by name
    public List<String> getColumnData(String columnName) {
        int columnIndex = getColumnIndex(columnName);
        return getColumnData(columnIndex);
    }

    // Get all table data
    public List<List<String>> getAllData() {
        List<List<String>> allData = new ArrayList<>();
        List<WebElement> rows = table.findElements(By.xpath(".//tbody/tr"));

        for (WebElement row : rows) {
            List<String> rowData = new ArrayList<>();
            List<WebElement> cells = row.findElements(By.tagName("td"));

            for (WebElement cell : cells) {
                rowData.add(cell.getText());
            }

            allData.add(rowData);
        }

        return allData;
    }

    // Search for value
    public boolean containsValue(String value) {
        try {
            String xpath = String.format(".//tbody/tr/td[text()='%s']", value);
            WebElement cell = table.findElement(By.xpath(xpath));
            return cell.isDisplayed();
        } catch (NoSuchElementException e) {
            return false;
        }
    }

    // Find row index by column value
    public int findRowIndex(String columnName, String value) {
        int columnIndex = getColumnIndex(columnName);
        List<WebElement> rows = table.findElements(By.xpath(".//tbody/tr"));

        for (int i = 0; i < rows.size(); i++) {
            String xpath = String.format(".//td[%d]", columnIndex);
            WebElement cell = rows.get(i).findElement(By.xpath(xpath));

            if (cell.getText().equals(value)) {
                return i + 1; // 1-based
            }
        }

        return -1;
    }

    // Get value from row by identifier
    public String getValueFromRow(String searchColumn, String searchValue, String targetColumn) {
        int searchColumnIndex = getColumnIndex(searchColumn);
        int targetColumnIndex = getColumnIndex(targetColumn);

        String xpath = String.format(
            ".//tbody/tr[td[%d][text()='%s']]/td[%d]",
            searchColumnIndex, searchValue, targetColumnIndex
        );

        WebElement targetCell = table.findElement(By.xpath(xpath));
        return targetCell.getText();
    }

    // Click element in cell
    public void clickInCell(int row, int column, String elementType) {
        String xpath = String.format(".//tbody/tr[%d]/td[%d]//%s", row, column, elementType);
        WebElement element = table.findElement(By.xpath(xpath));
        element.click();
    }

    // Select checkbox in row
    public void selectCheckbox(int row) {
        String xpath = String.format(".//tbody/tr[%d]//input[@type='checkbox']", row);
        WebElement checkbox = table.findElement(By.xpath(xpath));

        if (!checkbox.isSelected()) {
            checkbox.click();
        }
    }

    // Wait for table to load
    public void waitForLoad(int expectedMinRows) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        wait.until(driver1 -> {
            List<WebElement> rows = table.findElements(By.xpath(".//tbody/tr"));
            return rows.size() >= expectedMinRows;
        });
    }

    // Print table (for debugging)
    public void printTable() {
        List<String> headers = getHeaders();
        List<List<String>> data = getAllData();

        System.out.println("Table Headers: " + headers);
        System.out.println("---");

        for (int i = 0; i < data.size(); i++) {
            System.out.println("Row " + (i + 1) + ": " + data.get(i));
        }
    }
}
```

### Using TableUtils

```java
public class TableUtilsExample {

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/table-page");

        // Create TableUtils instance
        TableUtils tableUtils = new TableUtils(driver, By.id("dataTable"));

        // Get basic info
        System.out.println("Row count: " + tableUtils.getRowCount());
        System.out.println("Column count: " + tableUtils.getColumnCount());
        System.out.println("Headers: " + tableUtils.getHeaders());

        // Get specific data
        String email = tableUtils.getCellValue(1, "Email");
        System.out.println("Email in row 1: " + email);

        // Get column data
        List<String> names = tableUtils.getColumnData("Name");
        System.out.println("All names: " + names);

        // Search
        boolean hasJohn = tableUtils.containsValue("John Doe");
        System.out.println("Contains 'John Doe': " + hasJohn);

        // Find row
        int rowIndex = tableUtils.findRowIndex("Name", "Jane Smith");
        System.out.println("Jane Smith is in row: " + rowIndex);

        // Get related value
        String janeEmail = tableUtils.getValueFromRow("Name", "Jane Smith", "Email");
        System.out.println("Jane's email: " + janeEmail);

        // Print entire table
        tableUtils.printTable();

        driver.quit();
    }
}
```

---

## Complex Table Scenarios

### Nested Tables

```java
public class NestedTableExample {

    // Get data from nested table
    public static List<List<String>> getNestedTableData(WebDriver driver,
                                                        By parentTableLocator,
                                                        int parentRow) {
        WebElement parentTable = driver.findElement(parentTableLocator);

        // Find nested table in specific row
        String xpath = String.format(".//tbody/tr[%d]//table", parentRow);
        WebElement nestedTable = parentTable.findElement(By.xpath(xpath));

        // Read nested table data
        List<List<String>> nestedData = new ArrayList<>();
        List<WebElement> rows = nestedTable.findElements(By.xpath(".//tbody/tr"));

        for (WebElement row : rows) {
            List<String> rowData = new ArrayList<>();
            List<WebElement> cells = row.findElements(By.tagName("td"));

            for (WebElement cell : cells) {
                rowData.add(cell.getText());
            }

            nestedData.add(rowData);
        }

        return nestedData;
    }

    // Expand row to show nested table
    public static void expandRow(WebDriver driver, By tableLocator, int row) {
        WebElement table = driver.findElement(tableLocator);
        String xpath = String.format(".//tbody/tr[%d]//button[@class='expand']", row);
        WebElement expandButton = table.findElement(By.xpath(xpath));
        expandButton.click();

        // Wait for expansion
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/nested-table");

        // Expand row to show nested table
        expandRow(driver, By.id("parentTable"), 1);

        // Get nested table data
        List<List<String>> nestedData = getNestedTableData(
            driver, By.id("parentTable"), 1
        );

        System.out.println("Nested table data:");
        for (List<String> row : nestedData) {
            System.out.println(row);
        }

        driver.quit();
    }
}
```

### Tables with Merged Cells

```java
public class MergedCellsExample {

    // Handle merged cells with colspan
    public static String getCellValueWithColspan(WebDriver driver,
                                                By tableLocator,
                                                int row,
                                                int logicalColumn) {
        WebElement table = driver.findElement(tableLocator);
        String rowXpath = String.format(".//tbody/tr[%d]", row);
        WebElement rowElement = table.findElement(By.xpath(rowXpath));

        List<WebElement> cells = rowElement.findElements(By.tagName("td"));
        int currentColumn = 1;

        for (WebElement cell : cells) {
            String colspanAttr = cell.getAttribute("colspan");
            int colspan = colspanAttr != null ? Integer.parseInt(colspanAttr) : 1;

            if (logicalColumn >= currentColumn && logicalColumn < currentColumn + colspan) {
                return cell.getText();
            }

            currentColumn += colspan;
        }

        return null;
    }

    // Get actual cell count considering colspan
    public static int getLogicalColumnCount(WebDriver driver, By tableLocator) {
        WebElement table = driver.findElement(tableLocator);
        List<WebElement> headerCells = table.findElements(By.xpath(".//thead/tr[1]/th"));

        int totalColumns = 0;

        for (WebElement cell : headerCells) {
            String colspanAttr = cell.getAttribute("colspan");
            int colspan = colspanAttr != null ? Integer.parseInt(colspanAttr) : 1;
            totalColumns += colspan;
        }

        return totalColumns;
    }

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/table-with-merged-cells");

        // Get logical column count
        int logicalColumns = getLogicalColumnCount(driver, By.id("mergedTable"));
        System.out.println("Logical column count: " + logicalColumns);

        // Get cell value considering colspan
        String value = getCellValueWithColspan(driver, By.id("mergedTable"), 2, 3);
        System.out.println("Cell value: " + value);

        driver.quit();
    }
}
```

### Tables Without Headers

```java
public class NoHeaderTableExample {

    // Read table without thead
    public static List<List<String>> readTableWithoutHeader(WebDriver driver,
                                                           By tableLocator) {
        List<List<String>> allData = new ArrayList<>();
        WebElement table = driver.findElement(tableLocator);

        // Read all rows (including what might be header)
        List<WebElement> rows = table.findElements(By.xpath(".//tr"));

        for (WebElement row : rows) {
            List<String> rowData = new ArrayList<>();

            // Try both th and td
            List<WebElement> cells = row.findElements(By.xpath(".//th | .//td"));

            for (WebElement cell : cells) {
                rowData.add(cell.getText());
            }

            allData.add(rowData);
        }

        return allData;
    }

    // Identify header row in table without thead
    public static int identifyHeaderRow(WebDriver driver, By tableLocator) {
        WebElement table = driver.findElement(tableLocator);
        List<WebElement> rows = table.findElements(By.xpath(".//tr"));

        for (int i = 0; i < rows.size(); i++) {
            List<WebElement> thCells = rows.get(i).findElements(By.tagName("th"));

            if (!thCells.isEmpty()) {
                return i + 1; // This is likely the header row
            }

            // Check if first row has bold text (common pattern)
            if (i == 0) {
                List<WebElement> cells = rows.get(i).findElements(By.tagName("td"));
                if (!cells.isEmpty()) {
                    String fontWeight = cells.get(0).getCssValue("font-weight");
                    if (fontWeight.equals("bold") || fontWeight.equals("700")) {
                        return 1;
                    }
                }
            }
        }

        return -1; // No header found
    }

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/table-without-header");

        // Identify header
        int headerRow = identifyHeaderRow(driver, By.id("simpleTable"));
        System.out.println("Header row: " + headerRow);

        // Read all data
        List<List<String>> allData = readTableWithoutHeader(driver, By.id("simpleTable"));

        System.out.println("Table data:");
        for (int i = 0; i < allData.size(); i++) {
            System.out.println("Row " + (i + 1) + ": " + allData.get(i));
        }

        driver.quit();
    }
}
```

### Tables with Row Groups

```java
public class RowGroupTableExample {

    // Get data from specific row group
    public static List<List<String>> getRowGroupData(WebDriver driver,
                                                    By tableLocator,
                                                    String groupName) {
        List<List<String>> groupData = new ArrayList<>();
        WebElement table = driver.findElement(tableLocator);

        // Find the group header row
        String headerXpath = String.format(
            ".//tbody/tr[@class='group-header' and contains(text(),'%s')]",
            groupName
        );

        try {
            WebElement groupHeader = table.findElement(By.xpath(headerXpath));

            // Get following rows until next group header
            WebElement currentRow = groupHeader;

            while (true) {
                try {
                    currentRow = currentRow.findElement(
                        By.xpath("./following-sibling::tr[1]")
                    );

                    // Check if it's another group header
                    if (currentRow.getAttribute("class").contains("group-header")) {
                        break;
                    }

                    // Read row data
                    List<String> rowData = new ArrayList<>();
                    List<WebElement> cells = currentRow.findElements(By.tagName("td"));

                    for (WebElement cell : cells) {
                        rowData.add(cell.getText());
                    }

                    groupData.add(rowData);

                } catch (NoSuchElementException e) {
                    break; // No more rows
                }
            }

        } catch (NoSuchElementException e) {
            System.out.println("Group not found: " + groupName);
        }

        return groupData;
    }

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/grouped-table");

        // Get data from specific group
        List<List<String>> groupData = getRowGroupData(
            driver, By.id("groupedTable"), "Group A"
        );

        System.out.println("Group A data:");
        for (List<String> row : groupData) {
            System.out.println(row);
        }

        driver.quit();
    }
}
```

---

## Best Practices

### 1. Use Relative XPath

Always use relative XPath from table element to avoid finding elements from other tables:

```java
// Good
WebElement table = driver.findElement(By.id("dataTable"));
WebElement cell = table.findElement(By.xpath(".//tbody/tr[2]/td[3]"));

// Avoid
WebElement cell = driver.findElement(By.xpath("//tbody/tr[2]/td[3]"));
```

### 2. Handle StaleElementReferenceException

Re-locate table elements after page updates:

```java
public String getCellValueSafely(WebDriver driver, By tableLocator, int row, int column) {
    try {
        WebElement table = driver.findElement(tableLocator);
        String xpath = String.format(".//tbody/tr[%d]/td[%d]", row, column);
        WebElement cell = table.findElement(By.xpath(xpath));
        return cell.getText();
    } catch (StaleElementReferenceException e) {
        // Re-locate and try again
        WebElement table = driver.findElement(tableLocator);
        String xpath = String.format(".//tbody/tr[%d]/td[%d]", row, column);
        WebElement cell = table.findElement(By.xpath(xpath));
        return cell.getText();
    }
}
```

### 3. Wait for Table Updates

Always wait after interactions that update the table:

```java
public void sortAndWait(WebDriver driver, By tableLocator, String columnName) {
    WebElement table = driver.findElement(tableLocator);
    String xpath = String.format(".//thead/tr/th[text()='%s']", columnName);
    WebElement header = table.findElement(By.xpath(xpath));

    // Get a cell value before sorting
    String beforeValue = table.findElement(By.xpath(".//tbody/tr[1]/td[1]")).getText();

    // Click to sort
    header.click();

    // Wait for table to update
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    wait.until(driver1 -> {
        WebElement firstCell = driver1.findElement(By.xpath(
            "//table[@id='dataTable']//tbody/tr[1]/td[1]"
        ));
        return !firstCell.getText().equals(beforeValue);
    });
}
```

### 4. Create Reusable Utility Methods

Encapsulate common operations in utility classes:

```java
public class TableHelper {

    public static TableUtils getTable(WebDriver driver, String tableId) {
        return new TableUtils(driver, By.id(tableId));
    }

    public static void verifyTableContains(TableUtils table, String value) {
        if (!table.containsValue(value)) {
            throw new AssertionError("Table does not contain: " + value);
        }
    }

    public static void printTableSummary(TableUtils table) {
        System.out.println("Table Summary:");
        System.out.println("  Rows: " + table.getRowCount());
        System.out.println("  Columns: " + table.getColumnCount());
        System.out.println("  Headers: " + table.getHeaders());
    }
}
```

### 5. Use Explicit Waits

Don't rely on fixed sleeps:

```java
// Bad
Thread.sleep(2000);

// Good
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//table[@id='dataTable']//tbody/tr")));
```

### 6. Handle Empty Tables

Check if table has data before processing:

```java
public List<List<String>> getTableDataSafely(WebDriver driver, By tableLocator) {
    WebElement table = driver.findElement(tableLocator);
    List<WebElement> rows = table.findElements(By.xpath(".//tbody/tr"));

    if (rows.isEmpty()) {
        System.out.println("Table is empty");
        return new ArrayList<>();
    }

    // Check for "No data" message row
    if (rows.size() == 1) {
        String firstRowText = rows.get(0).getText();
        if (firstRowText.toLowerCase().contains("no data") ||
            firstRowText.toLowerCase().contains("no records")) {
            System.out.println("Table has no data");
            return new ArrayList<>();
        }
    }

    // Process rows
    List<List<String>> data = new ArrayList<>();
    for (WebElement row : rows) {
        List<String> rowData = new ArrayList<>();
        List<WebElement> cells = row.findElements(By.tagName("td"));

        for (WebElement cell : cells) {
            rowData.add(cell.getText());
        }

        data.add(rowData);
    }

    return data;
}
```

### 7. Validate Table Structure

Verify expected structure before operations:

```java
public boolean validateTableStructure(WebDriver driver,
                                     By tableLocator,
                                     List<String> expectedHeaders) {
    TableUtils table = new TableUtils(driver, tableLocator);
    List<String> actualHeaders = table.getHeaders();

    if (actualHeaders.size() != expectedHeaders.size()) {
        System.out.println("Column count mismatch");
        return false;
    }

    for (int i = 0; i < expectedHeaders.size(); i++) {
        if (!actualHeaders.get(i).equals(expectedHeaders.get(i))) {
            System.out.println("Header mismatch at position " + i);
            return false;
        }
    }

    return true;
}
```

### 8. Log Table Operations

Add logging for debugging:

```java
import java.util.logging.Logger;

public class TableOperations {
    private static final Logger logger = Logger.getLogger(TableOperations.class.getName());

    public String getCellValue(WebDriver driver, By tableLocator, int row, int column) {
        logger.info(String.format("Getting cell value at row %d, column %d", row, column));

        try {
            WebElement table = driver.findElement(tableLocator);
            String xpath = String.format(".//tbody/tr[%d]/td[%d]", row, column);
            WebElement cell = table.findElement(By.xpath(xpath));
            String value = cell.getText();

            logger.info(String.format("Cell value: %s", value));
            return value;

        } catch (Exception e) {
            logger.severe(String.format("Failed to get cell value: %s", e.getMessage()));
            throw e;
        }
    }
}
```

### 9. Handle Special Characters

Escape special characters in XPath:

```java
public boolean containsValueWithSpecialChars(WebDriver driver,
                                            By tableLocator,
                                            String value) {
    WebElement table = driver.findElement(tableLocator);

    // Escape single quotes
    String escapedValue = value.replace("'", "&apos;");

    try {
        String xpath = String.format(".//tbody/tr/td[text()='%s']", escapedValue);
        WebElement cell = table.findElement(By.xpath(xpath));
        return cell.isDisplayed();
    } catch (NoSuchElementException e) {
        return false;
    }
}
```

### 10. Test with Different Table States

Test your table operations with:
- Empty tables
- Single row tables
- Tables with maximum rows
- Tables during loading
- Tables with errors

---

## Practice Exercises

### Exercise 1: Basic Table Reading

**Task:** Create a program that reads a table and displays all employee information.

**Requirements:**
- Read all rows from the table
- Display each employee's Name, Department, and Salary
- Calculate and display the average salary

```java
// Your code here
public class Exercise1 {
    public static void main(String[] args) {
        // Initialize driver and navigate to table page
        // Read table data
        // Calculate average
        // Display results
    }
}
```

**Expected Output:**
```
Employee 1: John Doe, IT, $75000
Employee 2: Jane Smith, HR, $65000
Average Salary: $70000
```

---

### Exercise 2: Search and Verify

**Task:** Search for a specific employee and verify their details.

**Requirements:**
- Search for an employee by name
- Verify their department matches expected value
- Verify their salary is within expected range
- Print success/failure message

```java
// Your code here
public class Exercise2 {
    public static void main(String[] args) {
        // Search for "John Doe"
        // Verify department is "IT"
        // Verify salary is between $70000 and $80000
    }
}
```

---

### Exercise 3: Handle Pagination

**Task:** Create a program that searches across all pages of a paginated table.

**Requirements:**
- Navigate through all pages
- Collect all email addresses
- Find a specific user by email
- Print the page number where the user was found

```java
// Your code here
public class Exercise3 {
    public static void main(String[] args) {
        // Search across all pages for "john.doe@example.com"
        // Print page number and row number where found
    }
}
```

---

### Exercise 4: Sort Verification

**Task:** Verify that table sorting works correctly.

**Requirements:**
- Sort the table by Name column (ascending)
- Verify that names are in alphabetical order
- Sort by Salary column (descending)
- Verify that salaries are in descending order

```java
// Your code here
public class Exercise4 {
    public static void main(String[] args) {
        // Sort by Name
        // Verify alphabetical order
        // Sort by Salary descending
        // Verify descending order
    }
}
```

---

### Exercise 5: Bulk Selection

**Task:** Select multiple employees based on criteria using checkboxes.

**Requirements:**
- Select all employees in "IT" department
- Select all employees with salary > $70000
- Count total selected employees
- Click "Delete Selected" button

```java
// Your code here
public class Exercise5 {
    public static void main(String[] args) {
        // Find and select IT employees
        // Find and select high-earning employees
        // Count selections
        // Perform bulk action
    }
}
```

---

### Exercise 6: Dynamic Table with Filters

**Task:** Apply multiple filters and extract filtered data.

**Requirements:**
- Apply department filter for "Sales"
- Apply status filter for "Active"
- Apply date range filter
- Extract all filtered records
- Export to CSV format (print to console)

```java
// Your code here
public class Exercise6 {
    public static void main(String[] args) {
        // Apply filters
        // Extract filtered data
        // Format as CSV
        // Print results
    }
}
```

---

## Interview Questions

### Q1: What is the difference between `<th>` and `<td>` tags in HTML tables?

**Answer:**
- `<th>` (table header) is used for header cells, typically in `<thead>`
- `<td>` (table data) is used for data cells in `<tbody>`
- `<th>` is bold and centered by default
- `<th>` is semantically different and helps screen readers
- Both can be used in any row, but `<th>` indicates importance

---

### Q2: How do you handle StaleElementReferenceException when working with dynamic tables?

**Answer:**
```java
// Method 1: Re-locate the element
try {
    element.click();
} catch (StaleElementReferenceException e) {
    element = driver.findElement(locator);
    element.click();
}

// Method 2: Use a retry mechanism
public void clickWithRetry(WebElement element, By locator, int maxRetries) {
    for (int i = 0; i < maxRetries; i++) {
        try {
            element.click();
            return;
        } catch (StaleElementReferenceException e) {
            if (i == maxRetries - 1) throw e;
            element = driver.findElement(locator);
        }
    }
}

// Method 3: Always re-locate before action
public void safeClick(WebDriver driver, By locator) {
    driver.findElement(locator).click();
}
```

---

### Q3: How would you verify that a table is sorted correctly?

**Answer:**
```java
public boolean isTableSorted(List<String> columnData, boolean ascending) {
    for (int i = 0; i < columnData.size() - 1; i++) {
        int comparison = columnData.get(i).compareTo(columnData.get(i + 1));

        if (ascending && comparison > 0) {
            return false;
        }

        if (!ascending && comparison < 0) {
            return false;
        }
    }

    return true;
}

// For numeric sorting
public boolean isNumericallySorted(List<String> columnData, boolean ascending) {
    for (int i = 0; i < columnData.size() - 1; i++) {
        double current = Double.parseDouble(columnData.get(i).replaceAll("[^0-9.]", ""));
        double next = Double.parseDouble(columnData.get(i + 1).replaceAll("[^0-9.]", ""));

        if (ascending && current > next) {
            return false;
        }

        if (!ascending && current < next) {
            return false;
        }
    }

    return true;
}
```

---

### Q4: How do you handle tables that load data via AJAX?

**Answer:**
```java
// Method 1: Wait for specific number of rows
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(driver1 -> {
    List<WebElement> rows = driver1.findElements(By.xpath("//table[@id='dataTable']//tbody/tr"));
    return rows.size() >= expectedCount;
});

// Method 2: Wait for loading indicator to disappear
wait.until(ExpectedConditions.invisibilityOfElementLocated(By.className("loading-spinner")));

// Method 3: Wait for specific data to appear
wait.until(ExpectedConditions.textToBePresentInElementLocated(
    By.xpath("//table[@id='dataTable']//tbody/tr[1]/td[1]"),
    expectedText
));

// Method 4: Wait for table attribute change
wait.until(driver1 -> {
    WebElement table = driver1.findElement(By.id("dataTable"));
    return !table.getAttribute("class").contains("loading");
});
```

---

### Q5: What is the best way to locate a cell in a table?

**Answer:**
The best method depends on the situation:

```java
// 1. By position (when structure is stable)
WebElement cell = driver.findElement(By.xpath("//table[@id='dataTable']/tbody/tr[2]/td[3]"));

// 2. By header name and row content (most reliable)
String xpath = "//table[@id='dataTable']//tr[td[1]='John Doe']/td[2]";

// 3. Using table utility with column name
TableUtils table = new TableUtils(driver, By.id("dataTable"));
String value = table.getCellValue(2, "Email");

// 4. By data attributes (if available)
WebElement cell = driver.findElement(By.xpath("//td[@data-row='2'][@data-column='email']"));

// Best practice: Use column names instead of indices
```

---

### Q6: How would you extract data from a table with colspan attributes?

**Answer:**
```java
public List<String> getRowDataWithColspan(WebElement row) {
    List<String> data = new ArrayList<>();
    List<WebElement> cells = row.findElements(By.tagName("td"));

    for (WebElement cell : cells) {
        String colspanAttr = cell.getAttribute("colspan");
        int colspan = colspanAttr != null ? Integer.parseInt(colspanAttr) : 1;

        String cellValue = cell.getText();

        // Add value for each spanned column
        for (int i = 0; i < colspan; i++) {
            data.add(cellValue);
        }
    }

    return data;
}
```

---

### Q7: How do you handle infinite scroll tables?

**Answer:**
```java
public List<List<String>> extractAllDataWithInfiniteScroll(WebDriver driver, By tableLocator) {
    List<List<String>> allData = new ArrayList<>();
    JavascriptExecutor js = (JavascriptExecutor) driver;

    int previousHeight = 0;
    int currentHeight;

    while (true) {
        // Get current data
        WebElement table = driver.findElement(tableLocator);
        List<WebElement> rows = table.findElements(By.xpath(".//tbody/tr"));

        // Store new rows
        for (int i = allData.size(); i < rows.size(); i++) {
            List<WebElement> cells = rows.get(i).findElements(By.tagName("td"));
            List<String> rowData = new ArrayList<>();

            for (WebElement cell : cells) {
                rowData.add(cell.getText());
            }

            allData.add(rowData);
        }

        // Scroll to bottom
        js.executeScript("window.scrollTo(0, document.body.scrollHeight);");

        try {
            Thread.sleep(2000); // Wait for load
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Check if more data loaded
        currentHeight = rows.size();
        if (currentHeight == previousHeight) {
            break; // No more data
        }

        previousHeight = currentHeight;
    }

    return allData;
}
```

---

### Q8: What strategies would you use to optimize table data extraction from large tables?

**Answer:**
1. **Pagination**: Extract data page by page instead of all at once
2. **Parallel Processing**: Use multiple threads for independent pages
3. **Selective Extraction**: Only extract needed columns
4. **Streaming**: Process rows as they're extracted
5. **Caching**: Cache unchanging data like headers

```java
// Example: Selective extraction
public List<String> extractSpecificColumns(WebDriver driver,
                                          By tableLocator,
                                          List<String> columnNames) {
    List<Integer> columnIndices = new ArrayList<>();
    TableUtils table = new TableUtils(driver, tableLocator);

    // Get column indices
    for (String columnName : columnNames) {
        columnIndices.add(table.getColumnIndex(columnName));
    }

    // Extract only needed columns
    List<String> selectedData = new ArrayList<>();
    int rowCount = table.getRowCount();

    for (int row = 1; row <= rowCount; row++) {
        for (int colIndex : columnIndices) {
            selectedData.add(table.getCellValue(row, colIndex));
        }
    }

    return selectedData;
}
```

---

### Q9: How do you verify that a row was successfully deleted from a table?

**Answer:**
```java
public void verifyRowDeleted(WebDriver driver,
                            By tableLocator,
                            String identifier,
                            String columnName) {
    TableUtils table = new TableUtils(driver, tableLocator);

    // Method 1: Try to find the row
    int rowIndex = table.findRowIndex(columnName, identifier);

    if (rowIndex == -1) {
        System.out.println("Row successfully deleted");
    } else {
        throw new AssertionError("Row still exists at index: " + rowIndex);
    }

    // Method 2: Check row count
    int rowCountBefore = // stored before deletion
    int rowCountAfter = table.getRowCount();

    if (rowCountAfter == rowCountBefore - 1) {
        System.out.println("Row count decreased by 1");
    } else {
        throw new AssertionError("Row count mismatch");
    }

    // Method 3: Wait for row to disappear
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    wait.until(ExpectedConditions.invisibilityOfElementLocated(
        By.xpath(String.format("//table//tr[td[text()='%s']]", identifier))
    ));
}
```

---

### Q10: What is the difference between static and dynamic XPath for tables?

**Answer:**

**Static XPath:**
```java
// Hard-coded indices
"//table[@id='dataTable']/tbody/tr[2]/td[3]"

// Pros: Simple, fast
// Cons: Breaks if table structure changes
```

**Dynamic XPath:**
```java
// Based on content
"//table[@id='dataTable']//tr[td[1]='John Doe']/td[3]"

// Based on header name (requires combining with index)
String columnName = "Email";
int columnIndex = getColumnIndex(columnName);
String xpath = String.format("//table[@id='dataTable']//tr[2]/td[%d]", columnIndex);

// Pros: More reliable, adapts to structure changes
// Cons: Slightly slower, more complex
```

**Best Practice:** Use dynamic XPath for maintainable automation.

---

### Q11: How would you handle a table where rows are dynamically added/removed?

**Answer:**
```java
public class DynamicTableMonitor {

    private WebDriver driver;
    private By tableLocator;
    private List<String> knownRowIds;

    public DynamicTableMonitor(WebDriver driver, By tableLocator) {
        this.driver = driver;
        this.tableLocator = tableLocator;
        this.knownRowIds = new ArrayList<>();
    }

    // Track current rows
    public void snapshot() {
        knownRowIds.clear();
        WebElement table = driver.findElement(tableLocator);
        List<WebElement> rows = table.findElements(By.xpath(".//tbody/tr"));

        for (WebElement row : rows) {
            String rowId = row.getAttribute("id");
            if (rowId != null && !rowId.isEmpty()) {
                knownRowIds.add(rowId);
            }
        }
    }

    // Detect new rows
    public List<String> getNewRows() {
        List<String> newRows = new ArrayList<>();
        WebElement table = driver.findElement(tableLocator);
        List<WebElement> rows = table.findElements(By.xpath(".//tbody/tr"));

        for (WebElement row : rows) {
            String rowId = row.getAttribute("id");
            if (rowId != null && !knownRowIds.contains(rowId)) {
                newRows.add(rowId);
            }
        }

        return newRows;
    }

    // Wait for new row to appear
    public void waitForNewRow(int timeoutSeconds) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeoutSeconds));

        int initialCount = knownRowIds.size();

        wait.until(driver1 -> {
            WebElement table = driver1.findElement(tableLocator);
            List<WebElement> rows = table.findElements(By.xpath(".//tbody/tr"));
            return rows.size() > initialCount;
        });
    }
}
```

---

### Q12: How do you extract data from a table and save it to a CSV file?

**Answer:**
```java
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

public class TableToCSV {

    public static void exportTableToCSV(WebDriver driver,
                                       By tableLocator,
                                       String filename) {
        TableUtils table = new TableUtils(driver, tableLocator);

        try (FileWriter writer = new FileWriter(filename)) {
            // Write headers
            List<String> headers = table.getHeaders();
            writer.write(String.join(",", headers));
            writer.write("\n");

            // Write data rows
            List<List<String>> allData = table.getAllData();

            for (List<String> row : allData) {
                // Escape commas and quotes
                List<String> escapedRow = new ArrayList<>();
                for (String cell : row) {
                    String escaped = cell.replace("\"", "\"\"");
                    if (escaped.contains(",") || escaped.contains("\"") || escaped.contains("\n")) {
                        escaped = "\"" + escaped + "\"";
                    }
                    escapedRow.add(escaped);
                }

                writer.write(String.join(",", escapedRow));
                writer.write("\n");
            }

            System.out.println("Table exported to: " + filename);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/table-page");

        exportTableToCSV(driver, By.id("dataTable"), "table_data.csv");

        driver.quit();
    }
}
```

---

### Q13: What approach would you take to test table pagination functionality?

**Answer:**
```java
public class PaginationTester {

    public static void testPagination(WebDriver driver, By tableLocator) {
        // Test 1: Verify page numbers
        List<WebElement> pageLinks = driver.findElements(By.cssSelector(".pagination a"));
        int totalPages = pageLinks.size() - 2; // Exclude prev/next
        System.out.println("Total pages: " + totalPages);

        // Test 2: Verify each page loads different data
        Set<String> allFirstRowValues = new HashSet<>();

        for (int page = 1; page <= totalPages; page++) {
            navigateToPage(driver, page);

            WebElement table = driver.findElement(tableLocator);
            String firstRowValue = table.findElement(By.xpath(".//tbody/tr[1]/td[1]")).getText();

            if (allFirstRowValues.contains(firstRowValue)) {
                System.out.println("FAIL: Duplicate data on page " + page);
            } else {
                allFirstRowValues.add(firstRowValue);
                System.out.println("PASS: Page " + page + " has unique data");
            }
        }

        // Test 3: Verify prev/next buttons
        testNavigationButtons(driver, tableLocator);

        // Test 4: Verify total record count
        verifyTotalCount(driver, totalPages);
    }

    private static void testNavigationButtons(WebDriver driver, By tableLocator) {
        // Go to first page
        driver.findElement(By.cssSelector(".pagination a:first-child")).click();

        // Verify prev button is disabled
        WebElement prevButton = driver.findElement(By.cssSelector(".pagination .prev"));
        if (prevButton.getAttribute("class").contains("disabled")) {
            System.out.println("PASS: Prev button disabled on first page");
        } else {
            System.out.println("FAIL: Prev button should be disabled on first page");
        }

        // Navigate to last page
        List<WebElement> pageLinks = driver.findElements(By.cssSelector(".pagination a"));
        pageLinks.get(pageLinks.size() - 1).click();

        // Verify next button is disabled
        WebElement nextButton = driver.findElement(By.cssSelector(".pagination .next"));
        if (nextButton.getAttribute("class").contains("disabled")) {
            System.out.println("PASS: Next button disabled on last page");
        } else {
            System.out.println("FAIL: Next button should be disabled on last page");
        }
    }

    private static void verifyTotalCount(WebDriver driver, int totalPages) {
        // Get displayed total (e.g., "Showing 1-10 of 100")
        String paginationText = driver.findElement(By.className("pagination-info")).getText();
        // Parse and verify count
        // Implementation depends on text format
    }
}
```

---

### Q14: How would you handle a table that uses virtual scrolling (only visible rows are in DOM)?

**Answer:**
```java
public class VirtualScrollTableHandler {

    public static void scrollToRow(WebDriver driver, By tableLocator, int targetRow) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        WebElement table = driver.findElement(tableLocator);

        // Calculate scroll position (assuming fixed row height)
        int rowHeight = 40; // pixels
        int scrollPosition = (targetRow - 1) * rowHeight;

        // Scroll the table container
        js.executeScript(
            "arguments[0].scrollTop = arguments[1];",
            table,
            scrollPosition
        );

        // Wait for row to be rendered
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        wait.until(driver1 -> {
            try {
                WebElement row = table.findElement(
                    By.xpath(String.format(".//tr[@data-row-index='%d']", targetRow))
                );
                return row.isDisplayed();
            } catch (NoSuchElementException e) {
                return false;
            }
        });
    }

    public static String getVirtualRowData(WebDriver driver,
                                          By tableLocator,
                                          int rowIndex,
                                          int columnIndex) {
        // Scroll to make row visible
        scrollToRow(driver, tableLocator, rowIndex);

        // Now access the row
        WebElement table = driver.findElement(tableLocator);
        String xpath = String.format(
            ".//tr[@data-row-index='%d']/td[%d]",
            rowIndex,
            columnIndex
        );

        WebElement cell = table.findElement(By.xpath(xpath));
        return cell.getText();
    }
}
```

---

### Q15: What is your strategy for debugging table-related test failures?

**Answer:**

1. **Take Screenshots**
```java
public void debugTableIssue(WebDriver driver, By tableLocator) {
    // Capture screenshot
    File screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
    // Save with timestamp

    // Log page source
    String pageSource = driver.getPageSource();
    // Save to file

    // Log table HTML
    WebElement table = driver.findElement(tableLocator);
    String tableHTML = table.getAttribute("outerHTML");
    System.out.println("Table HTML:\n" + tableHTML);
}
```

2. **Verify Element State**
```java
public void verifyTableState(WebDriver driver, By tableLocator) {
    WebElement table = driver.findElement(tableLocator);

    System.out.println("Table displayed: " + table.isDisplayed());
    System.out.println("Table enabled: " + table.isEnabled());
    System.out.println("Table location: " + table.getLocation());
    System.out.println("Table size: " + table.getSize());

    List<WebElement> rows = table.findElements(By.xpath(".//tbody/tr"));
    System.out.println("Row count: " + rows.size());

    if (!rows.isEmpty()) {
        System.out.println("First row text: " + rows.get(0).getText());
    }
}
```

3. **Check for JavaScript Errors**
```java
public void checkJavaScriptErrors(WebDriver driver) {
    JavascriptExecutor js = (JavascriptExecutor) driver;
    List<Object> errors = (List<Object>) js.executeScript(
        "return window.jsErrors || []"
    );

    if (!errors.isEmpty()) {
        System.out.println("JavaScript errors found:");
        errors.forEach(System.out::println);
    }
}
```

4. **Validate Timing**
```java
public void validateTableLoadTime(WebDriver driver, By tableLocator) {
    long startTime = System.currentTimeMillis();

    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
    wait.until(ExpectedConditions.presenceOfElementLocated(tableLocator));

    long endTime = System.currentTimeMillis();
    long loadTime = endTime - startTime;

    System.out.println("Table load time: " + loadTime + "ms");

    if (loadTime > 5000) {
        System.out.println("WARNING: Slow table load");
    }
}
```

---

## Key Takeaways

1. **Table Structure Understanding**
   - Know the difference between `<thead>`, `<tbody>`, and `<tfoot>`
   - Understand `<th>` vs `<td>` elements
   - Recognize table hierarchy: table → row → cell

2. **Locating Elements**
   - Use relative XPath from table element
   - Prefer dynamic XPath over static indices
   - Use column names instead of positions when possible

3. **Handling Dynamic Content**
   - Always wait for table updates after interactions
   - Handle StaleElementReferenceException with retries
   - Use explicit waits instead of Thread.sleep()

4. **Pagination Strategies**
   - Collect data page by page
   - Verify navigation buttons work correctly
   - Handle "no more pages" condition

5. **Table Interactions**
   - Checkboxes: verify selection state before clicking
   - Links: handle navigation and return
   - Editing: wait for edit mode to activate

6. **Utility Methods**
   - Create reusable TableUtils class
   - Encapsulate common operations
   - Add logging for debugging

7. **Complex Scenarios**
   - Nested tables: locate and process separately
   - Merged cells: handle colspan/rowspan attributes
   - Virtual scrolling: scroll to make rows visible

8. **Best Practices**
   - Validate table structure before operations
   - Handle empty tables gracefully
   - Add meaningful error messages
   - Log table operations for debugging

9. **Performance Optimization**
   - Extract only needed columns
   - Use pagination for large tables
   - Cache unchanging data like headers

10. **Testing Strategies**
    - Test with different data volumes
    - Verify sorting and filtering
    - Check pagination edge cases
    - Validate data integrity

---

## Navigation

[← Previous: Day 9](/content/selenium/week2/day9) | [Next: Day 11 →](/content/selenium/week2/day11)

---

**Additional Resources:**
- [Selenium Documentation](https://www.selenium.dev/documentation/)
- [HTML Table Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table)
- [XPath Tutorial](https://www.w3schools.com/xml/xpath_intro.asp)

---

*Last Updated: 2026-01-14*
