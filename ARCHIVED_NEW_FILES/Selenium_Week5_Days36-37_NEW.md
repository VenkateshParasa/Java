---

## PHASE 3: SELENIUM ADVANCED WEB INTERACTIONS (Days 36-37)

### Day 36: Handling Web Tables

---

#### Exercise 1: Understanding Static Web Tables (25 minutes)

**What you'll learn:** How to locate and extract data from static HTML tables

**Practice Website:** https://www.techlistic.com/p/demo-selenium-practice.html

**Step-by-Step:**

1. **Open browser manually**
   - Go to: https://www.techlistic.com/p/demo-selenium-practice.html
   - Scroll down to see the table "Structure of Countries"
   - Right-click on table → Inspect

2. **In DevTools (Elements tab):**
   - You'll see: `<table class="tsc_table_s13" ...>`
   - Table has `<thead>` for headers and `<tbody>` for data rows

**Create new package: `com.automation.webtables`**
**Create new class: `StaticTableBasics`**

```java
package com.automation.webtables;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.List;

public class StaticTableBasics {
    public static void main(String[] args) {
        System.out.println("===== HANDLING STATIC WEB TABLES =====\n");

        // Setup
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            // Navigate to demo page
            driver.get("https://www.techlistic.com/p/demo-selenium-practice.html");
            Thread.sleep(2000);
            System.out.println("✅ Opened: " + driver.getTitle());
            System.out.println();

            // ========================================
            // STEP 1: LOCATE THE TABLE
            // ========================================
            System.out.println("--- STEP 1: LOCATE THE TABLE ---");
            System.out.println("Strategy: Use class name or unique identifier");
            System.out.println();

            // Locate table by class
            String tableXPath = "//table[@class='tsc_table_s13']";
            WebElement table = driver.findElement(By.xpath(tableXPath));
            System.out.println("✅ Table found using XPath: " + tableXPath);
            System.out.println("   Table tag: " + table.getTagName());
            System.out.println();

            // ========================================
            // STEP 2: GET TABLE HEADERS
            // ========================================
            System.out.println("--- STEP 2: GET TABLE HEADERS ---");
            System.out.println("Strategy: Find all <th> elements in <thead>");
            System.out.println();

            String headerXPath = "//table[@class='tsc_table_s13']//thead//th";
            List<WebElement> headers = driver.findElements(By.xpath(headerXPath));

            System.out.println("Total columns: " + headers.size());
            System.out.println("\nTable Headers:");
            System.out.println("----------------------------------------");
            for (int i = 0; i < headers.size(); i++) {
                System.out.println((i + 1) + ". " + headers.get(i).getText());
            }
            System.out.println("----------------------------------------");
            System.out.println();

            // ========================================
            // STEP 3: COUNT TOTAL ROWS
            // ========================================
            System.out.println("--- STEP 3: COUNT TOTAL ROWS ---");
            System.out.println("Strategy: Find all <tr> elements in <tbody>");
            System.out.println();

            String rowsXPath = "//table[@class='tsc_table_s13']//tbody//tr";
            List<WebElement> rows = driver.findElements(By.xpath(rowsXPath));

            int totalRows = rows.size();
            System.out.println("✅ Total data rows: " + totalRows);
            System.out.println();

            // ========================================
            // STEP 4: GET SPECIFIC CELL DATA
            // ========================================
            System.out.println("--- STEP 4: GET SPECIFIC CELL DATA ---");
            System.out.println("Strategy: Use row and column index");
            System.out.println();

            // Get data from Row 2, Column 1 (India)
            // XPath format: //table//tbody//tr[rowNum]//td[colNum]
            String cellXPath = "//table[@class='tsc_table_s13']//tbody//tr[2]//td[1]";
            WebElement cell = driver.findElement(By.xpath(cellXPath));
            System.out.println("Cell [Row 2, Col 1]: " + cell.getText());
            System.out.println();

            // Get data from Row 3, Column 2 (Canada's capital)
            String cell2XPath = "//table[@class='tsc_table_s13']//tbody//tr[3]//td[2]";
            WebElement cell2 = driver.findElement(By.xpath(cell2XPath));
            System.out.println("Cell [Row 3, Col 2]: " + cell2.getText());
            System.out.println();

            // ========================================
            // STEP 5: PRINT ENTIRE TABLE DATA
            // ========================================
            System.out.println("--- STEP 5: PRINT ENTIRE TABLE ---");
            System.out.println();

            System.out.println("Country\t\t\tCapital\t\t\tLanguage\t\tCurrency");
            System.out.println("=============================================================================");

            for (int row = 1; row <= totalRows; row++) {
                // Get all cells in current row
                String rowXPath = "//table[@class='tsc_table_s13']//tbody//tr[" + row + "]//td";
                List<WebElement> cells = driver.findElements(By.xpath(rowXPath));

                // Print each cell in the row
                for (WebElement cellData : cells) {
                    System.out.print(cellData.getText() + "\t\t");
                }
                System.out.println();
            }
            System.out.println("=============================================================================");
            System.out.println();

            // ========================================
            // STEP 6: SEARCH FOR SPECIFIC DATA
            // ========================================
            System.out.println("--- STEP 6: SEARCH FOR SPECIFIC DATA ---");
            System.out.println("Task: Find which row contains 'USA'");
            System.out.println();

            boolean found = false;
            for (int row = 1; row <= totalRows; row++) {
                String countryXPath = "//table[@class='tsc_table_s13']//tbody//tr[" + row + "]//td[1]";
                WebElement country = driver.findElement(By.xpath(countryXPath));

                if (country.getText().equals("USA")) {
                    System.out.println("✅ Found 'USA' in row: " + row);

                    // Get all data for USA row
                    String usaRowXPath = "//table[@class='tsc_table_s13']//tbody//tr[" + row + "]//td";
                    List<WebElement> usaData = driver.findElements(By.xpath(usaRowXPath));

                    System.out.println("\nUSA Details:");
                    System.out.println("  Country: " + usaData.get(0).getText());
                    System.out.println("  Capital: " + usaData.get(1).getText());
                    System.out.println("  Language: " + usaData.get(2).getText());
                    System.out.println("  Currency: " + usaData.get(3).getText());

                    found = true;
                    break;
                }
            }

            if (!found) {
                System.out.println("❌ 'USA' not found in table");
            }
            System.out.println();

            // ========================================
            // STEP 7: GET SPECIFIC COLUMN DATA
            // ========================================
            System.out.println("--- STEP 7: GET ALL DATA FROM ONE COLUMN ---");
            System.out.println("Task: Extract all country names (Column 1)");
            System.out.println();

            System.out.println("All Countries in Table:");
            for (int row = 1; row <= totalRows; row++) {
                String countryXPath = "//table[@class='tsc_table_s13']//tbody//tr[" + row + "]//td[1]";
                WebElement country = driver.findElement(By.xpath(countryXPath));
                System.out.println("  " + row + ". " + country.getText());
            }
            System.out.println();

            // ========================================
            // STEP 8: CONDITIONAL DATA EXTRACTION
            // ========================================
            System.out.println("--- STEP 8: CONDITIONAL DATA EXTRACTION ---");
            System.out.println("Task: Find countries with capital starting with 'O'");
            System.out.println();

            System.out.println("Countries with capital starting with 'O':");
            int count = 0;
            for (int row = 1; row <= totalRows; row++) {
                String capitalXPath = "//table[@class='tsc_table_s13']//tbody//tr[" + row + "]//td[2]";
                String countryXPath = "//table[@class='tsc_table_s13']//tbody//tr[" + row + "]//td[1]";

                WebElement capital = driver.findElement(By.xpath(capitalXPath));
                WebElement country = driver.findElement(By.xpath(countryXPath));

                if (capital.getText().startsWith("O")) {
                    count++;
                    System.out.println("  " + country.getText() + " → " + capital.getText());
                }
            }

            if (count == 0) {
                System.out.println("  (No capitals starting with 'O' found)");
            }
            System.out.println();

            System.out.println("=====================================");
            System.out.println("STATIC TABLE SUMMARY:");
            System.out.println("  ✅ Located table using class/id");
            System.out.println("  ✅ Extracted headers from <thead>");
            System.out.println("  ✅ Counted rows using <tbody>//tr");
            System.out.println("  ✅ Accessed cells using [row][col]");
            System.out.println("  ✅ Searched for specific data");
            System.out.println("  ✅ Extracted column data");
            System.out.println("  ✅ Applied conditional filtering");
            System.out.println("=====================================");

            Thread.sleep(2000);

        } catch (Exception e) {
            System.out.println("\n❌ ERROR: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("\n✅ Browser closed");
        }
    }
}
```

**Expected Output:**
```
===== HANDLING STATIC WEB TABLES =====

✅ Opened: Selenium Demo Practice Page
(Include demo pages for beginners)

--- STEP 1: LOCATE THE TABLE ---
Strategy: Use class name or unique identifier

✅ Table found using XPath: //table[@class='tsc_table_s13']
   Table tag: table

--- STEP 2: GET TABLE HEADERS ---
Strategy: Find all <th> elements in <thead>

Total columns: 4

Table Headers:
----------------------------------------
1. Country
2. Capital
3. Official Language(s)
4. Currency
----------------------------------------

--- STEP 3: COUNT TOTAL ROWS ---
Strategy: Find all <tr> elements in <tbody>

✅ Total data rows: 5

--- STEP 4: GET SPECIFIC CELL DATA ---
Strategy: Use row and column index

Cell [Row 2, Col 1]: India

Cell [Row 3, Col 2]: Ottawa

--- STEP 5: PRINT ENTIRE TABLE ---

Country			Capital			Language		Currency
=============================================================================
China			Beijing			Chinese			Renminbi
India			New Delhi		Hindi, English		Indian rupee
Canada			Ottawa			English, French		Canadian dollar
USA			Washington, D.C.	English			United States dollar
Russia			Moscow			Russian			Russian ruble
=============================================================================

--- STEP 6: SEARCH FOR SPECIFIC DATA ---
Task: Find which row contains 'USA'

✅ Found 'USA' in row: 4

USA Details:
  Country: USA
  Capital: Washington, D.C.
  Language: English
  Currency: United States dollar

--- STEP 7: GET ALL DATA FROM ONE COLUMN ---
Task: Extract all country names (Column 1)

All Countries in Table:
  1. China
  2. India
  3. Canada
  4. USA
  5. Russia

--- STEP 8: CONDITIONAL DATA EXTRACTION ---
Task: Find countries with capital starting with 'O'

Countries with capital starting with 'O':
  Canada → Ottawa

=====================================
STATIC TABLE SUMMARY:
  ✅ Located table using class/id
  ✅ Extracted headers from <thead>
  ✅ Counted rows using <tbody>//tr
  ✅ Accessed cells using [row][col]
  ✅ Searched for specific data
  ✅ Extracted column data
  ✅ Applied conditional filtering
=====================================

✅ Browser closed
```

**What Happens in Browser:**
1. Chrome opens maximized
2. Navigates to Techlistic demo page
3. Page loads with visible table
4. Code reads table data (no visible interaction)
5. Browser stays open for 2 seconds
6. Browser closes

**✅ Success Criteria:**
- Table located successfully
- Headers extracted correctly (4 columns)
- All rows counted (5 rows)
- Specific cell data retrieved
- Entire table printed in console
- 'USA' found and details displayed
- All countries listed
- Conditional search works

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| NoSuchElementException | Table XPath incorrect | Inspect table and verify class name |
| IndexOutOfBoundsException | Row/column index too high | Check totalRows and totalColumns first |
| StaleElementReferenceException | Page refreshed during execution | Re-locate table after page changes |
| "Cannot find element in row X" | Row doesn't exist | Verify row count before accessing |

**💡 Key Concepts:**

**1. Table Structure:**
```html
<table>
    <thead>
        <tr>
            <th>Header 1</th>
            <th>Header 2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Row 1, Col 1</td>
            <td>Row 1, Col 2</td>
        </tr>
        <tr>
            <td>Row 2, Col 1</td>
            <td>Row 2, Col 2</td>
        </tr>
    </tbody>
</table>
```

**2. XPath Patterns for Tables:**
```java
// Get all headers
//table//thead//th

// Get all rows
//table//tbody//tr

// Get specific cell (row 2, column 3)
//table//tbody//tr[2]//td[3]

// Get all cells in row 1
//table//tbody//tr[1]//td

// Count total rows
driver.findElements(By.xpath("//table//tbody//tr")).size()
```

**3. Iteration Pattern:**
```java
// Loop through all rows
for (int row = 1; row <= totalRows; row++) {
    // Loop through all columns
    for (int col = 1; col <= totalCols; col++) {
        String xpath = "//table//tr[" + row + "]//td[" + col + "]";
        String data = driver.findElement(By.xpath(xpath)).getText();
    }
}
```

**🎯 Practice Challenge:**

1. Extract all capitals (column 2) into a List
2. Find the country with "Renminbi" currency
3. Count how many countries have English as a language
4. Create a method: `getCellData(row, col)` that returns cell text
5. Create a method: `findRowByCountry(String countryName)` that returns row number

---

#### Exercise 2: Dynamic Table Handling (30 minutes)

**What you'll learn:** Handle tables with dynamic data and changing rows

**Practice Website:** https://demo.guru99.com/test/web-table-element.php

**Create new class: `DynamicTableHandling`**

```java
package com.automation.webtables;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.ArrayList;
import java.util.List;

public class DynamicTableHandling {
    public static void main(String[] args) {
        System.out.println("===== DYNAMIC TABLE HANDLING =====\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            // Navigate to dynamic table demo
            driver.get("https://demo.guru99.com/test/web-table-element.php");
            Thread.sleep(2000);
            System.out.println("✅ Opened: " + driver.getTitle());
            System.out.println();

            // ========================================
            // STEP 1: ANALYZE TABLE STRUCTURE
            // ========================================
            System.out.println("--- STEP 1: ANALYZE DYNAMIC TABLE ---");
            System.out.println("Note: This table has dynamic data (stock prices)");
            System.out.println();

            // Locate table
            String tableXPath = "//table[@class='dataTable']";
            WebElement table = driver.findElement(By.xpath(tableXPath));
            System.out.println("✅ Table located");
            System.out.println();

            // ========================================
            // STEP 2: GET HEADERS DYNAMICALLY
            // ========================================
            System.out.println("--- STEP 2: EXTRACT HEADERS ---");

            String headerXPath = "//table[@class='dataTable']//thead//th";
            List<WebElement> headers = driver.findElements(By.xpath(headerXPath));

            System.out.println("Total columns: " + headers.size());
            System.out.println("\nColumn Headers:");
            for (int i = 0; i < headers.size(); i++) {
                System.out.println("  Col " + (i + 1) + ": " + headers.get(i).getText());
            }
            System.out.println();

            // ========================================
            // STEP 3: COUNT ROWS DYNAMICALLY
            // ========================================
            System.out.println("--- STEP 3: COUNT DYNAMIC ROWS ---");
            System.out.println("Important: Rows may change, always count dynamically!");
            System.out.println();

            String rowsXPath = "//table[@class='dataTable']//tbody//tr";
            List<WebElement> rows = driver.findElements(By.xpath(rowsXPath));
            int totalRows = rows.size();

            System.out.println("✅ Total rows found: " + totalRows);
            System.out.println();

            // ========================================
            // STEP 4: EXTRACT COMPANY NAMES
            // ========================================
            System.out.println("--- STEP 4: EXTRACT ALL COMPANY NAMES ---");
            System.out.println();

            List<String> companies = new ArrayList<>();

            for (int row = 1; row <= totalRows; row++) {
                String companyXPath = "//table[@class='dataTable']//tbody//tr[" + row + "]//td[1]";
                WebElement company = driver.findElement(By.xpath(companyXPath));
                companies.add(company.getText());
            }

            System.out.println("Companies in table:");
            for (int i = 0; i < companies.size(); i++) {
                System.out.println("  " + (i + 1) + ". " + companies.get(i));
            }
            System.out.println();

            // ========================================
            // STEP 5: FIND HIGHEST MARKET CAP
            // ========================================
            System.out.println("--- STEP 5: FIND HIGHEST MARKET CAP ---");
            System.out.println("Strategy: Compare all market cap values");
            System.out.println();

            double highestMarketCap = 0;
            String companyWithHighestCap = "";
            int rowWithHighestCap = 0;

            for (int row = 1; row <= totalRows; row++) {
                // Get market cap from column 2
                String marketCapXPath = "//table[@class='dataTable']//tbody//tr[" + row + "]//td[2]";
                String companyXPath = "//table[@class='dataTable']//tbody//tr[" + row + "]//td[1]";

                WebElement marketCapElement = driver.findElement(By.xpath(marketCapXPath));
                WebElement companyElement = driver.findElement(By.xpath(companyXPath));

                // Parse market cap (remove commas and convert to double)
                String marketCapText = marketCapElement.getText().replace(",", "");
                double marketCap = Double.parseDouble(marketCapText);

                if (marketCap > highestMarketCap) {
                    highestMarketCap = marketCap;
                    companyWithHighestCap = companyElement.getText();
                    rowWithHighestCap = row;
                }
            }

            System.out.println("✅ Highest Market Cap Found!");
            System.out.println("   Company: " + companyWithHighestCap);
            System.out.println("   Market Cap: " + String.format("%,.2f", highestMarketCap));
            System.out.println("   Row Number: " + rowWithHighestCap);
            System.out.println();

            // ========================================
            // STEP 6: SEARCH BY COMPANY NAME
            // ========================================
            System.out.println("--- STEP 6: SEARCH FOR SPECIFIC COMPANY ---");
            String searchCompany = "Google";
            System.out.println("Searching for: " + searchCompany);
            System.out.println();

            boolean companyFound = false;
            for (int row = 1; row <= totalRows; row++) {
                String companyXPath = "//table[@class='dataTable']//tbody//tr[" + row + "]//td[1]";
                WebElement company = driver.findElement(By.xpath(companyXPath));

                if (company.getText().contains(searchCompany)) {
                    System.out.println("✅ Found '" + searchCompany + "' in row " + row);

                    // Extract all data for this row
                    String rowDataXPath = "//table[@class='dataTable']//tbody//tr[" + row + "]//td";
                    List<WebElement> rowData = driver.findElements(By.xpath(rowDataXPath));

                    System.out.println("\n" + searchCompany + " Details:");
                    for (int i = 0; i < rowData.size(); i++) {
                        System.out.println("  " + headers.get(i).getText() + ": " + rowData.get(i).getText());
                    }

                    companyFound = true;
                    break;
                }
            }

            if (!companyFound) {
                System.out.println("❌ Company '" + searchCompany + "' not found");
            }
            System.out.println();

            // ========================================
            // STEP 7: FILTER BY CONDITION
            // ========================================
            System.out.println("--- STEP 7: FILTER COMPANIES BY MARKET CAP ---");
            System.out.println("Task: Find companies with Market Cap > 100,000");
            System.out.println();

            System.out.println("Companies with Market Cap > 100,000:");
            int filteredCount = 0;

            for (int row = 1; row <= totalRows; row++) {
                String marketCapXPath = "//table[@class='dataTable']//tbody//tr[" + row + "]//td[2]";
                String companyXPath = "//table[@class='dataTable']//tbody//tr[" + row + "]//td[1]";

                String marketCapText = driver.findElement(By.xpath(marketCapXPath)).getText().replace(",", "");
                double marketCap = Double.parseDouble(marketCapText);

                if (marketCap > 100000) {
                    filteredCount++;
                    String companyName = driver.findElement(By.xpath(companyXPath)).getText();
                    System.out.println("  " + filteredCount + ". " + companyName + " → " +
                                     String.format("%,.2f", marketCap));
                }
            }

            System.out.println("\n✅ Total companies matching criteria: " + filteredCount);
            System.out.println();

            // ========================================
            // STEP 8: EXTRACT SPECIFIC COLUMN
            // ========================================
            System.out.println("--- STEP 8: EXTRACT % CHANGE COLUMN ---");
            System.out.println();

            System.out.println("% Change for all companies:");
            for (int row = 1; row <= totalRows; row++) {
                String companyXPath = "//table[@class='dataTable']//tbody//tr[" + row + "]//td[1]";
                String changeXPath = "//table[@class='dataTable']//tbody//tr[" + row + "]//td[5]"; // Assuming column 5 is % change

                String company = driver.findElement(By.xpath(companyXPath)).getText();
                String change = driver.findElement(By.xpath(changeXPath)).getText();

                System.out.println("  " + company + ": " + change);
            }
            System.out.println();

            // ========================================
            // STEP 9: VERIFY DATA INTEGRITY
            // ========================================
            System.out.println("--- STEP 9: VERIFY TABLE DATA ---");
            System.out.println();

            // Check if any cells are empty
            int emptyCells = 0;
            for (int row = 1; row <= totalRows; row++) {
                String rowCellsXPath = "//table[@class='dataTable']//tbody//tr[" + row + "]//td";
                List<WebElement> cells = driver.findElements(By.xpath(rowCellsXPath));

                for (WebElement cell : cells) {
                    if (cell.getText().trim().isEmpty()) {
                        emptyCells++;
                    }
                }
            }

            if (emptyCells == 0) {
                System.out.println("✅ Data integrity check passed!");
                System.out.println("   All cells contain data");
            } else {
                System.out.println("⚠️ Warning: Found " + emptyCells + " empty cells");
            }
            System.out.println();

            // ========================================
            // STEP 10: CREATE SUMMARY REPORT
            // ========================================
            System.out.println("--- STEP 10: TABLE SUMMARY REPORT ---");
            System.out.println();
            System.out.println("========================================");
            System.out.println("DYNAMIC TABLE ANALYSIS REPORT");
            System.out.println("========================================");
            System.out.println("Total Companies: " + totalRows);
            System.out.println("Total Columns: " + headers.size());
            System.out.println("Highest Market Cap: " + companyWithHighestCap);
            System.out.println("Market Cap Value: " + String.format("%,.2f", highestMarketCap));
            System.out.println("Companies > 100K Cap: " + filteredCount);
            System.out.println("Empty Cells Found: " + emptyCells);
            System.out.println("========================================");
            System.out.println();

            System.out.println("=====================================");
            System.out.println("DYNAMIC TABLE HANDLING SUMMARY:");
            System.out.println("  ✅ Analyzed dynamic table structure");
            System.out.println("  ✅ Counted rows dynamically");
            System.out.println("  ✅ Extracted specific columns");
            System.out.println("  ✅ Found max/min values");
            System.out.println("  ✅ Searched by company name");
            System.out.println("  ✅ Filtered by conditions");
            System.out.println("  ✅ Verified data integrity");
            System.out.println("  ✅ Generated summary report");
            System.out.println("=====================================");

            Thread.sleep(2000);

        } catch (Exception e) {
            System.out.println("\n❌ ERROR: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("\n✅ Browser closed");
        }
    }
}
```

**Expected Output:**
```
===== DYNAMIC TABLE HANDLING =====

✅ Opened: Web Table Element

--- STEP 1: ANALYZE DYNAMIC TABLE ---
Note: This table has dynamic data (stock prices)

✅ Table located

--- STEP 2: EXTRACT HEADERS ---
Total columns: 6

Column Headers:
  Col 1: Company
  Col 2: Market Cap
  Col 3: Price
  Col 4: Change
  Col 5: % Change
  Col 6: Volume

--- STEP 3: COUNT DYNAMIC ROWS ---
Important: Rows may change, always count dynamically!

✅ Total rows found: 22

--- STEP 4: EXTRACT ALL COMPANY NAMES ---

Companies in table:
  1. Apple Inc.
  2. Microsoft Corp
  3. Google Inc.
  4. Amazon.com Inc.
  5. Tesla Inc.
  [... and more companies]

--- STEP 5: FIND HIGHEST MARKET CAP ---
Strategy: Compare all market cap values

✅ Highest Market Cap Found!
   Company: Apple Inc.
   Market Cap: 2,450,000.00
   Row Number: 1

--- STEP 6: SEARCH FOR SPECIFIC COMPANY ---
Searching for: Google

✅ Found 'Google' in row 3

Google Details:
  Company: Google Inc.
  Market Cap: 1,850,000
  Price: 2,750.50
  Change: +25.30
  % Change: +0.93%
  Volume: 1,234,567

--- STEP 7: FILTER COMPANIES BY MARKET CAP ---
Task: Find companies with Market Cap > 100,000

Companies with Market Cap > 100,000:
  1. Apple Inc. → 2,450,000.00
  2. Microsoft Corp → 1,920,000.00
  3. Google Inc. → 1,850,000.00
  4. Amazon.com Inc. → 1,650,000.00
  5. Tesla Inc. → 850,000.00

✅ Total companies matching criteria: 5

--- STEP 8: EXTRACT % CHANGE COLUMN ---

% Change for all companies:
  Apple Inc.: +1.25%
  Microsoft Corp: -0.45%
  Google Inc.: +0.93%
  Amazon.com Inc.: +2.10%
  Tesla Inc.: -1.85%
  [... more data]

--- STEP 9: VERIFY TABLE DATA ---

✅ Data integrity check passed!
   All cells contain data

--- STEP 10: TABLE SUMMARY REPORT ---

========================================
DYNAMIC TABLE ANALYSIS REPORT
========================================
Total Companies: 22
Total Columns: 6
Highest Market Cap: Apple Inc.
Market Cap Value: 2,450,000.00
Companies > 100K Cap: 5
Empty Cells Found: 0
========================================

=====================================
DYNAMIC TABLE HANDLING SUMMARY:
  ✅ Analyzed dynamic table structure
  ✅ Counted rows dynamically
  ✅ Extracted specific columns
  ✅ Found max/min values
  ✅ Searched by company name
  ✅ Filtered by conditions
  ✅ Verified data integrity
  ✅ Generated summary report
=====================================

✅ Browser closed
```

**What Happens in Browser:**
1. Browser opens and navigates to Guru99 web table demo
2. Table with stock data loads
3. Code reads all data from table (no visible interaction)
4. All calculations happen in code
5. Browser closes after 2 seconds

**✅ Success Criteria:**
- Table located and analyzed
- All headers extracted correctly
- Row count obtained dynamically
- Company names extracted into List
- Highest market cap found correctly
- Google company found and details displayed
- Filtering by market cap works
- % Change column extracted
- Data integrity verified
- Summary report generated

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| NumberFormatException | Cannot parse number with commas | Use .replace(",", "") before parsing |
| IndexOutOfBoundsException | Accessing column that doesn't exist | Verify column count before accessing |
| StaleElementReferenceException | Table data refreshed | Re-locate elements after refresh |
| NullPointerException | Element not found | Add null check before getText() |

**💡 Key Concepts:**

**1. Dynamic Row Counting:**
```java
// ALWAYS count rows dynamically for dynamic tables
List<WebElement> rows = driver.findElements(By.xpath("//table//tbody//tr"));
int totalRows = rows.size(); // This may change!
```

**2. Number Parsing from Tables:**
```java
// Remove commas and parse
String marketCapText = "1,234,567.89";
String cleaned = marketCapText.replace(",", "");
double value = Double.parseDouble(cleaned); // 1234567.89
```

**3. Finding Max/Min Values:**
```java
double maxValue = 0;
String companyWithMax = "";

for (int row = 1; row <= totalRows; row++) {
    String valueText = driver.findElement(By.xpath("...")).getText();
    double value = Double.parseDouble(valueText.replace(",", ""));

    if (value > maxValue) {
        maxValue = value;
        companyWithMax = driver.findElement(By.xpath("...")).getText();
    }
}
```

**4. Data Collection into Lists:**
```java
List<String> companies = new ArrayList<>();
for (int row = 1; row <= totalRows; row++) {
    String company = driver.findElement(By.xpath("...")).getText();
    companies.add(company);
}
```

**🎯 Practice Challenge:**

1. Find the company with lowest price
2. Calculate average market cap of all companies
3. Find companies with negative % change (declining stocks)
4. Extract all data into a 2D array
5. Create a method `getColumnData(int columnNumber)` that returns List<String>
6. Sort companies by market cap (highest to lowest)

---

#### Exercise 3: Table Row and Column Iteration (25 minutes)

**What you'll learn:** Advanced iteration techniques for web tables

**Create new class: `TableIterationTechniques`**

```java
package com.automation.webtables;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TableIterationTechniques {
    public static void main(String[] args) {
        System.out.println("===== TABLE ITERATION TECHNIQUES =====\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            // Navigate to page
            driver.get("https://www.techlistic.com/p/demo-selenium-practice.html");
            Thread.sleep(2000);
            System.out.println("✅ Opened demo page");
            System.out.println();

            // ========================================
            // TECHNIQUE 1: ROW-BY-ROW ITERATION
            // ========================================
            System.out.println("--- TECHNIQUE 1: ROW-BY-ROW ITERATION ---");
            System.out.println("Use case: Process each row as a unit");
            System.out.println();

            String rowsXPath = "//table[@class='tsc_table_s13']//tbody//tr";
            List<WebElement> rows = driver.findElements(By.xpath(rowsXPath));

            System.out.println("Processing each row:");
            for (int i = 0; i < rows.size(); i++) {
                WebElement row = rows.get(i);
                System.out.println("\nRow " + (i + 1) + ":");

                // Get all cells in this row
                List<WebElement> cells = row.findElements(By.tagName("td"));

                for (int j = 0; j < cells.size(); j++) {
                    System.out.println("  Column " + (j + 1) + ": " + cells.get(j).getText());
                }
            }
            System.out.println();

            // ========================================
            // TECHNIQUE 2: COLUMN-BY-COLUMN ITERATION
            // ========================================
            System.out.println("--- TECHNIQUE 2: COLUMN-BY-COLUMN ITERATION ---");
            System.out.println("Use case: Analyze data in specific columns");
            System.out.println();

            int totalRows = rows.size();
            int totalColumns = 4; // We know there are 4 columns

            for (int col = 1; col <= totalColumns; col++) {
                System.out.println("\nColumn " + col + " data:");

                for (int row = 1; row <= totalRows; row++) {
                    String cellXPath = "//table[@class='tsc_table_s13']//tbody//tr[" + row + "]//td[" + col + "]";
                    WebElement cell = driver.findElement(By.xpath(cellXPath));
                    System.out.println("  Row " + row + ": " + cell.getText());
                }
            }
            System.out.println();

            // ========================================
            // TECHNIQUE 3: NESTED LOOP (COMPLETE TABLE)
            // ========================================
            System.out.println("--- TECHNIQUE 3: NESTED LOOP ITERATION ---");
            System.out.println("Use case: Access every cell in order");
            System.out.println();

            System.out.println("Complete table scan:");
            for (int row = 1; row <= totalRows; row++) {
                System.out.print("Row " + row + ": ");

                for (int col = 1; col <= totalColumns; col++) {
                    String cellXPath = "//table[@class='tsc_table_s13']//tbody//tr[" + row + "]//td[" + col + "]";
                    String cellData = driver.findElement(By.xpath(cellXPath)).getText();
                    System.out.print("[" + cellData + "] ");
                }
                System.out.println();
            }
            System.out.println();

            // ========================================
            // TECHNIQUE 4: MAP-BASED STORAGE
            // ========================================
            System.out.println("--- TECHNIQUE 4: STORE TABLE IN MAP ---");
            System.out.println("Use case: Create searchable data structure");
            System.out.println();

            // Store table data in Map<String, Map<String, String>>
            // Outer Map: Country name → Inner Map
            // Inner Map: Column header → Value

            Map<String, Map<String, String>> tableData = new HashMap<>();

            // Get headers
            String headerXPath = "//table[@class='tsc_table_s13']//thead//th";
            List<WebElement> headers = driver.findElements(By.xpath(headerXPath));

            // Iterate rows and build map
            for (int row = 1; row <= totalRows; row++) {
                String cellsXPath = "//table[@class='tsc_table_s13']//tbody//tr[" + row + "]//td";
                List<WebElement> cells = driver.findElements(By.xpath(cellsXPath));

                String country = cells.get(0).getText(); // First column is country
                Map<String, String> countryData = new HashMap<>();

                for (int col = 0; col < cells.size(); col++) {
                    String header = headers.get(col).getText();
                    String value = cells.get(col).getText();
                    countryData.put(header, value);
                }

                tableData.put(country, countryData);
            }

            System.out.println("✅ Table data stored in Map");
            System.out.println("\nAccessing data from Map:");

            // Access USA data
            String searchCountry = "USA";
            if (tableData.containsKey(searchCountry)) {
                Map<String, String> usaData = tableData.get(searchCountry);
                System.out.println("\n" + searchCountry + " data:");
                for (Map.Entry<String, String> entry : usaData.entrySet()) {
                    System.out.println("  " + entry.getKey() + ": " + entry.getValue());
                }
            }
            System.out.println();

            // ========================================
            // TECHNIQUE 5: CONDITIONAL ITERATION
            // ========================================
            System.out.println("--- TECHNIQUE 5: CONDITIONAL ITERATION ---");
            System.out.println("Use case: Process only rows matching criteria");
            System.out.println();

            System.out.println("Finding rows where language contains 'English':");
            for (int row = 1; row <= totalRows; row++) {
                String languageXPath = "//table[@class='tsc_table_s13']//tbody//tr[" + row + "]//td[3]";
                WebElement language = driver.findElement(By.xpath(languageXPath));

                if (language.getText().contains("English")) {
                    // Process this row
                    String countryXPath = "//table[@class='tsc_table_s13']//tbody//tr[" + row + "]//td[1]";
                    String capitalXPath = "//table[@class='tsc_table_s13']//tbody//tr[" + row + "]//td[2]";

                    String country = driver.findElement(By.xpath(countryXPath)).getText();
                    String capital = driver.findElement(By.xpath(capitalXPath)).getText();

                    System.out.println("  " + country + " (Capital: " + capital + ")");
                }
            }
            System.out.println();

            // ========================================
            // TECHNIQUE 6: REVERSE ITERATION
            // ========================================
            System.out.println("--- TECHNIQUE 6: REVERSE ITERATION ---");
            System.out.println("Use case: Process table from bottom to top");
            System.out.println();

            System.out.println("Countries in reverse order:");
            for (int row = totalRows; row >= 1; row--) {
                String countryXPath = "//table[@class='tsc_table_s13']//tbody//tr[" + row + "]//td[1]";
                String country = driver.findElement(By.xpath(countryXPath)).getText();
                System.out.println("  " + row + ". " + country);
            }
            System.out.println();

            // ========================================
            // TECHNIQUE 7: SKIP PATTERN ITERATION
            // ========================================
            System.out.println("--- TECHNIQUE 7: SKIP PATTERN ITERATION ---");
            System.out.println("Use case: Process every Nth row");
            System.out.println();

            System.out.println("Processing every 2nd row (even rows only):");
            for (int row = 2; row <= totalRows; row += 2) {
                String countryXPath = "//table[@class='tsc_table_s13']//tbody//tr[" + row + "]//td[1]";
                String country = driver.findElement(By.xpath(countryXPath)).getText();
                System.out.println("  Row " + row + ": " + country);
            }
            System.out.println();

            // ========================================
            // TECHNIQUE 8: EARLY EXIT ITERATION
            // ========================================
            System.out.println("--- TECHNIQUE 8: EARLY EXIT ITERATION ---");
            System.out.println("Use case: Stop when condition is met");
            System.out.println();

            System.out.println("Finding first country with 'Dollar' in currency:");
            boolean found = false;
            for (int row = 1; row <= totalRows; row++) {
                String currencyXPath = "//table[@class='tsc_table_s13']//tbody//tr[" + row + "]//td[4]";
                String currency = driver.findElement(By.xpath(currencyXPath)).getText();

                if (currency.contains("Dollar")) {
                    String countryXPath = "//table[@class='tsc_table_s13']//tbody//tr[" + row + "]//td[1]";
                    String country = driver.findElement(By.xpath(countryXPath)).getText();

                    System.out.println("  ✅ Found: " + country + " → " + currency);
                    System.out.println("  Stopped iteration at row " + row);
                    found = true;
                    break; // Early exit
                }
            }

            if (!found) {
                System.out.println("  ❌ No country with 'Dollar' found");
            }
            System.out.println();

            // ========================================
            // TECHNIQUE 9: PARALLEL COLUMN PROCESSING
            // ========================================
            System.out.println("--- TECHNIQUE 9: PARALLEL COLUMN PROCESSING ---");
            System.out.println("Use case: Compare data from multiple columns");
            System.out.println();

            System.out.println("Country → Capital mapping:");
            for (int row = 1; row <= totalRows; row++) {
                String countryXPath = "//table[@class='tsc_table_s13']//tbody//tr[" + row + "]//td[1]";
                String capitalXPath = "//table[@class='tsc_table_s13']//tbody//tr[" + row + "]//td[2]";

                String country = driver.findElement(By.xpath(countryXPath)).getText();
                String capital = driver.findElement(By.xpath(capitalXPath)).getText();

                System.out.println("  " + country + " → " + capital);
            }
            System.out.println();

            // ========================================
            // TECHNIQUE 10: COUNT AND AGGREGATE
            // ========================================
            System.out.println("--- TECHNIQUE 10: COUNTING & AGGREGATION ---");
            System.out.println();

            // Count countries by continent (assuming we can determine this)
            int asianCountries = 0;
            int americanCountries = 0;
            int europeanCountries = 0;

            for (int row = 1; row <= totalRows; row++) {
                String countryXPath = "//table[@class='tsc_table_s13']//tbody//tr[" + row + "]//td[1]";
                String country = driver.findElement(By.xpath(countryXPath)).getText();

                // Simple classification (in real scenario, use better logic)
                if (country.equals("China") || country.equals("India")) {
                    asianCountries++;
                } else if (country.equals("USA") || country.equals("Canada")) {
                    americanCountries++;
                } else if (country.equals("Russia")) {
                    europeanCountries++;
                }
            }

            System.out.println("Country Distribution:");
            System.out.println("  Asian countries: " + asianCountries);
            System.out.println("  American countries: " + americanCountries);
            System.out.println("  European countries: " + europeanCountries);
            System.out.println();

            System.out.println("=====================================");
            System.out.println("ITERATION TECHNIQUES SUMMARY:");
            System.out.println("  1. Row-by-row → Process complete rows");
            System.out.println("  2. Column-by-column → Analyze columns");
            System.out.println("  3. Nested loops → Complete table scan");
            System.out.println("  4. Map storage → Searchable structure");
            System.out.println("  5. Conditional → Filter while iterating");
            System.out.println("  6. Reverse → Bottom to top");
            System.out.println("  7. Skip pattern → Every Nth row");
            System.out.println("  8. Early exit → Stop when found");
            System.out.println("  9. Parallel columns → Compare data");
            System.out.println("  10. Aggregation → Count & summarize");
            System.out.println("=====================================");

            Thread.sleep(2000);

        } catch (Exception e) {
            System.out.println("\n❌ ERROR: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("\n✅ Browser closed");
        }
    }
}
```

**Expected Output:**
```
===== TABLE ITERATION TECHNIQUES =====

✅ Opened demo page

--- TECHNIQUE 1: ROW-BY-ROW ITERATION ---
Use case: Process each row as a unit

Processing each row:

Row 1:
  Column 1: China
  Column 2: Beijing
  Column 3: Chinese
  Column 4: Renminbi

Row 2:
  Column 1: India
  Column 2: New Delhi
  Column 3: Hindi, English
  Column 4: Indian rupee

[... more rows]

--- TECHNIQUE 2: COLUMN-BY-COLUMN ITERATION ---
Use case: Analyze data in specific columns

Column 1 data:
  Row 1: China
  Row 2: India
  Row 3: Canada
  Row 4: USA
  Row 5: Russia

Column 2 data:
  Row 1: Beijing
  Row 2: New Delhi
  Row 3: Ottawa
  Row 4: Washington, D.C.
  Row 5: Moscow

[... more columns]

--- TECHNIQUE 3: NESTED LOOP ITERATION ---
Use case: Access every cell in order

Complete table scan:
Row 1: [China] [Beijing] [Chinese] [Renminbi]
Row 2: [India] [New Delhi] [Hindi, English] [Indian rupee]
Row 3: [Canada] [Ottawa] [English, French] [Canadian dollar]
Row 4: [USA] [Washington, D.C.] [English] [United States dollar]
Row 5: [Russia] [Moscow] [Russian] [Russian ruble]

--- TECHNIQUE 4: STORE TABLE IN MAP ---
Use case: Create searchable data structure

✅ Table data stored in Map

Accessing data from Map:

USA data:
  Country: USA
  Capital: Washington, D.C.
  Official Language(s): English
  Currency: United States dollar

--- TECHNIQUE 5: CONDITIONAL ITERATION ---
Use case: Process only rows matching criteria

Finding rows where language contains 'English':
  India (Capital: New Delhi)
  Canada (Capital: Ottawa)
  USA (Capital: Washington, D.C.)

--- TECHNIQUE 6: REVERSE ITERATION ---
Use case: Process table from bottom to top

Countries in reverse order:
  5. Russia
  4. USA
  3. Canada
  2. India
  1. China

--- TECHNIQUE 7: SKIP PATTERN ITERATION ---
Use case: Process every Nth row

Processing every 2nd row (even rows only):
  Row 2: India
  Row 4: USA

--- TECHNIQUE 8: EARLY EXIT ITERATION ---
Use case: Stop when condition is met

Finding first country with 'Dollar' in currency:
  ✅ Found: Canada → Canadian dollar
  Stopped iteration at row 3

--- TECHNIQUE 9: PARALLEL COLUMN PROCESSING ---
Use case: Compare data from multiple columns

Country → Capital mapping:
  China → Beijing
  India → New Delhi
  Canada → Ottawa
  USA → Washington, D.C.
  Russia → Moscow

--- TECHNIQUE 10: COUNTING & AGGREGATION ---

Country Distribution:
  Asian countries: 2
  American countries: 2
  European countries: 1

=====================================
ITERATION TECHNIQUES SUMMARY:
  1. Row-by-row → Process complete rows
  2. Column-by-column → Analyze columns
  3. Nested loops → Complete table scan
  4. Map storage → Searchable structure
  5. Conditional → Filter while iterating
  6. Reverse → Bottom to top
  7. Skip pattern → Every Nth row
  8. Early exit → Stop when found
  9. Parallel columns → Compare data
  10. Aggregation → Count & summarize
=====================================

✅ Browser closed
```

**What Happens in Browser:**
1. Browser opens to demo page
2. Table loads and is visible
3. Code performs all iterations (no visible changes)
4. All processing happens in code/console
5. Browser closes

**✅ Success Criteria:**
- All 10 iteration techniques demonstrated
- Row-by-row iteration prints all cells
- Column-by-column shows vertical data
- Nested loop shows complete table
- Map storage works and data retrievable
- Conditional iteration filters correctly
- Reverse iteration shows bottom-to-top
- Skip pattern processes even rows
- Early exit stops at first match
- Parallel processing maps countries to capitals
- Aggregation counts countries by region

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| IndexOutOfBoundsException | Column index exceeds count | Verify totalColumns before loop |
| StaleElementReferenceException | Re-locating elements in loop | Use fresh XPath in each iteration |
| ConcurrentModificationException | Modifying list while iterating | Use index-based loop or iterator |
| NullPointerException | Map key doesn't exist | Check containsKey() before get() |

**💡 Key Concepts:**

**1. Row-by-Row Iteration:**
```java
List<WebElement> rows = driver.findElements(By.xpath("//table//tbody//tr"));
for (WebElement row : rows) {
    List<WebElement> cells = row.findElements(By.tagName("td"));
    // Process cells in this row
}
```

**2. Column-by-Column Iteration:**
```java
for (int col = 1; col <= totalColumns; col++) {
    for (int row = 1; row <= totalRows; row++) {
        String xpath = "//table//tr[" + row + "]//td[" + col + "]";
        // Process cell
    }
}
```

**3. Nested Loop Pattern:**
```java
for (int row = 1; row <= totalRows; row++) {
    for (int col = 1; col <= totalColumns; col++) {
        String xpath = "//table//tr[" + row + "]//td[" + col + "]";
        String data = driver.findElement(By.xpath(xpath)).getText();
    }
}
```

**4. Map-Based Storage:**
```java
Map<String, Map<String, String>> tableData = new HashMap<>();
for (each row) {
    String key = firstColumnValue;
    Map<String, String> rowData = new HashMap<>();
    for (each column) {
        rowData.put(headerName, cellValue);
    }
    tableData.put(key, rowData);
}
```

**🎯 Practice Challenge:**

1. Create method `getRowData(int rowNumber)` that returns Map<String, String>
2. Implement `searchInColumn(int columnNum, String searchText)` that returns row number
3. Create `getCellValue(String countryName, String columnHeader)` using Map
4. Implement `sortTableByColumn(int columnNum)` that prints sorted data
5. Create `exportTableToCSV()` method that generates CSV format string
6. Find all countries where capital name starts with same letter as country name

---

[Continuing with remaining exercises for Day 36 and Day 37...]

### Day 37: Working with Cookies

---

#### Exercise 1: Understanding Browser Cookies (20 minutes)

**What you'll learn:** What cookies are and how to view them in Selenium

**Practice Website:** https://www.amazon.com

**Step-by-Step:**

1. **Understanding Cookies:**
   - Cookies are small data files stored by websites
   - Used for session management, personalization, tracking
   - Each cookie has: name, value, domain, path, expiry, httpOnly, secure flags

2. **In Browser DevTools:**
   - Open DevTools (F12)
   - Go to Application tab
   - Expand Cookies section
   - You'll see all cookies for current domain

**Create new package: `com.automation.cookies`**
**Create new class: `CookieBasics`**

```java
package com.automation.cookies;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.Cookie;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.Set;

public class CookieBasics {
    public static void main(String[] args) {
        System.out.println("===== UNDERSTANDING BROWSER COOKIES =====\n");

        // Setup
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            // ========================================
            // STEP 1: NAVIGATE TO WEBSITE
            // ========================================
            System.out.println("--- STEP 1: NAVIGATE TO WEBSITE ---");
            driver.get("https://www.amazon.com");
            Thread.sleep(3000);
            System.out.println("✅ Opened: " + driver.getTitle());
            System.out.println("   URL: " + driver.getCurrentUrl());
            System.out.println();

            // ========================================
            // STEP 2: GET ALL COOKIES
            // ========================================
            System.out.println("--- STEP 2: GET ALL COOKIES ---");
            System.out.println("Method: driver.manage().getCookies()");
            System.out.println();

            Set<Cookie> allCookies = driver.manage().getCookies();
            System.out.println("✅ Total cookies found: " + allCookies.size());
            System.out.println();

            // ========================================
            // STEP 3: DISPLAY ALL COOKIE DETAILS
            // ========================================
            System.out.println("--- STEP 3: DISPLAY ALL COOKIES ---");
            System.out.println();

            int count = 1;
            for (Cookie cookie : allCookies) {
                System.out.println("Cookie #" + count + ":");
                System.out.println("  Name: " + cookie.getName());
                System.out.println("  Value: " + cookie.getValue());
                System.out.println("  Domain: " + cookie.getDomain());
                System.out.println("  Path: " + cookie.getPath());
                System.out.println("  Expiry: " + cookie.getExpiry());
                System.out.println("  Is Secure: " + cookie.isSecure());
                System.out.println("  Is HttpOnly: " + cookie.isHttpOnly());
                System.out.println("  SameSite: " + cookie.getSameSite());
                System.out.println("----------------------------------------");
                count++;
            }
            System.out.println();

            // ========================================
            // STEP 4: GET SPECIFIC COOKIE BY NAME
            // ========================================
            System.out.println("--- STEP 4: GET SPECIFIC COOKIE ---");
            System.out.println("Method: driver.manage().getCookieNamed(\"cookieName\")");
            System.out.println();

            // Try to get session cookie (name may vary)
            Cookie sessionCookie = driver.manage().getCookieNamed("session-id");

            if (sessionCookie != null) {
                System.out.println("✅ Found 'session-id' cookie:");
                System.out.println("   Name: " + sessionCookie.getName());
                System.out.println("   Value: " + sessionCookie.getValue());
                System.out.println("   Domain: " + sessionCookie.getDomain());
            } else {
                System.out.println("⚠️ 'session-id' cookie not found");
                System.out.println("   (Cookie names may vary by website)");
            }
            System.out.println();

            // ========================================
            // STEP 5: COOKIE ATTRIBUTES EXPLANATION
            // ========================================
            System.out.println("--- STEP 5: COOKIE ATTRIBUTES EXPLAINED ---");
            System.out.println();

            System.out.println("Cookie Attributes:");
            System.out.println("==================");
            System.out.println();

            System.out.println("1. NAME:");
            System.out.println("   - Unique identifier for the cookie");
            System.out.println("   - Example: 'session-id', 'user-pref', 'auth-token'");
            System.out.println();

            System.out.println("2. VALUE:");
            System.out.println("   - The actual data stored in the cookie");
            System.out.println("   - Can be encrypted or plain text");
            System.out.println();

            System.out.println("3. DOMAIN:");
            System.out.println("   - Which domain can access this cookie");
            System.out.println("   - Example: '.amazon.com' (dot means all subdomains)");
            System.out.println();

            System.out.println("4. PATH:");
            System.out.println("   - Which URL path can access this cookie");
            System.out.println("   - Example: '/' means entire site");
            System.out.println();

            System.out.println("5. EXPIRY:");
            System.out.println("   - When the cookie will be automatically deleted");
            System.out.println("   - null = session cookie (deleted when browser closes)");
            System.out.println();

            System.out.println("6. SECURE:");
            System.out.println("   - true = cookie only sent over HTTPS");
            System.out.println("   - false = can be sent over HTTP too");
            System.out.println();

            System.out.println("7. HTTPONLY:");
            System.out.println("   - true = JavaScript cannot access this cookie");
            System.out.println("   - false = JavaScript can read/modify");
            System.out.println("   - Security feature to prevent XSS attacks");
            System.out.println();

            System.out.println("8. SAMESITE:");
            System.out.println("   - Controls cross-site cookie sending");
            System.out.println("   - Values: Strict, Lax, None");
            System.out.println();

            // ========================================
            // STEP 6: ANALYZE COOKIE TYPES
            // ========================================
            System.out.println("--- STEP 6: ANALYZE COOKIE TYPES ---");
            System.out.println();

            int sessionCookies = 0;
            int persistentCookies = 0;
            int secureCookies = 0;
            int httpOnlyCookies = 0;

            for (Cookie cookie : allCookies) {
                // Count session vs persistent
                if (cookie.getExpiry() == null) {
                    sessionCookies++;
                } else {
                    persistentCookies++;
                }

                // Count secure cookies
                if (cookie.isSecure()) {
                    secureCookies++;
                }

                // Count HttpOnly cookies
                if (cookie.isHttpOnly()) {
                    httpOnlyCookies++;
                }
            }

            System.out.println("Cookie Analysis:");
            System.out.println("  Total Cookies: " + allCookies.size());
            System.out.println("  Session Cookies: " + sessionCookies + " (expire when browser closes)");
            System.out.println("  Persistent Cookies: " + persistentCookies + " (have expiry date)");
            System.out.println("  Secure Cookies: " + secureCookies + " (HTTPS only)");
            System.out.println("  HttpOnly Cookies: " + httpOnlyCookies + " (JavaScript protected)");
            System.out.println();

            // ========================================
            // STEP 7: PRINT COOKIE NAMES
            // ========================================
            System.out.println("--- STEP 7: ALL COOKIE NAMES ---");
            System.out.println();

            System.out.println("Cookie Names on this site:");
            count = 1;
            for (Cookie cookie : allCookies) {
                System.out.println("  " + count + ". " + cookie.getName());
                count++;
            }
            System.out.println();

            // ========================================
            // STEP 8: VERIFY COOKIE EXISTS
            // ========================================
            System.out.println("--- STEP 8: VERIFY COOKIE EXISTS ---");
            System.out.println();

            String checkCookieName = "session-id";
            System.out.println("Checking if '" + checkCookieName + "' cookie exists...");

            boolean cookieExists = driver.manage().getCookieNamed(checkCookieName) != null;

            if (cookieExists) {
                System.out.println("✅ YES - '" + checkCookieName + "' cookie exists");
            } else {
                System.out.println("❌ NO - '" + checkCookieName + "' cookie does not exist");
            }
            System.out.println();

            System.out.println("=====================================");
            System.out.println("COOKIE BASICS SUMMARY:");
            System.out.println("  ✅ Navigated to website");
            System.out.println("  ✅ Retrieved all cookies using getCookies()");
            System.out.println("  ✅ Displayed cookie details");
            System.out.println("  ✅ Retrieved specific cookie by name");
            System.out.println("  ✅ Understood cookie attributes");
            System.out.println("  ✅ Analyzed cookie types");
            System.out.println("  ✅ Listed all cookie names");
            System.out.println("  ✅ Verified cookie existence");
            System.out.println("=====================================");

            Thread.sleep(2000);

        } catch (Exception e) {
            System.out.println("\n❌ ERROR: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("\n✅ Browser closed");
        }
    }
}
```

**Expected Output:**
```
===== UNDERSTANDING BROWSER COOKIES =====

--- STEP 1: NAVIGATE TO WEBSITE ---
✅ Opened: Amazon.com. Spend less. Smile more.
   URL: https://www.amazon.com/

--- STEP 2: GET ALL COOKIES ---
Method: driver.manage().getCookies()

✅ Total cookies found: 8

--- STEP 3: DISPLAY ALL COOKIES ---

Cookie #1:
  Name: session-id
  Value: 142-1234567-8901234
  Domain: .amazon.com
  Path: /
  Expiry: Tue Jan 24 2027 10:30:45 GMT-0800 (Pacific Standard Time)
  Is Secure: true
  Is HttpOnly: false
  SameSite: null
----------------------------------------
Cookie #2:
  Name: ubid-main
  Value: 132-5678901-2345678
  Domain: .amazon.com
  Path: /
  Expiry: Tue Jan 24 2027 10:30:45 GMT-0800 (Pacific Standard Time)
  Is Secure: true
  Is HttpOnly: false
  SameSite: null
----------------------------------------
[... more cookies]

--- STEP 4: GET SPECIFIC COOKIE ---
Method: driver.manage().getCookieNamed("cookieName")

✅ Found 'session-id' cookie:
   Name: session-id
   Value: 142-1234567-8901234
   Domain: .amazon.com

--- STEP 5: COOKIE ATTRIBUTES EXPLAINED ---

Cookie Attributes:
==================

1. NAME:
   - Unique identifier for the cookie
   - Example: 'session-id', 'user-pref', 'auth-token'

2. VALUE:
   - The actual data stored in the cookie
   - Can be encrypted or plain text

3. DOMAIN:
   - Which domain can access this cookie
   - Example: '.amazon.com' (dot means all subdomains)

4. PATH:
   - Which URL path can access this cookie
   - Example: '/' means entire site

5. EXPIRY:
   - When the cookie will be automatically deleted
   - null = session cookie (deleted when browser closes)

6. SECURE:
   - true = cookie only sent over HTTPS
   - false = can be sent over HTTP too

7. HTTPONLY:
   - true = JavaScript cannot access this cookie
   - false = JavaScript can read/modify
   - Security feature to prevent XSS attacks

8. SAMESITE:
   - Controls cross-site cookie sending
   - Values: Strict, Lax, None

--- STEP 6: ANALYZE COOKIE TYPES ---

Cookie Analysis:
  Total Cookies: 8
  Session Cookies: 2 (expire when browser closes)
  Persistent Cookies: 6 (have expiry date)
  Secure Cookies: 8 (HTTPS only)
  HttpOnly Cookies: 4 (JavaScript protected)

--- STEP 7: ALL COOKIE NAMES ---

Cookie Names on this site:
  1. session-id
  2. ubid-main
  3. lc-main
  4. skin
  5. csm-hit
  6. session-token
  7. x-main
  8. at-main

--- STEP 8: VERIFY COOKIE EXISTS ---

Checking if 'session-id' cookie exists...
✅ YES - 'session-id' cookie exists

=====================================
COOKIE BASICS SUMMARY:
  ✅ Navigated to website
  ✅ Retrieved all cookies using getCookies()
  ✅ Displayed cookie details
  ✅ Retrieved specific cookie by name
  ✅ Understood cookie attributes
  ✅ Analyzed cookie types
  ✅ Listed all cookie names
  ✅ Verified cookie existence
=====================================

✅ Browser closed
```

**What Happens in Browser:**
1. Chrome opens and navigates to Amazon.com
2. Page loads completely (may show cookie consent banner)
3. Cookies are set by website automatically
4. Code reads all cookies (no visible action)
5. Browser closes

**✅ Success Criteria:**
- Successfully navigated to website
- All cookies retrieved (count > 0)
- Cookie details displayed correctly
- Specific cookie retrieved by name
- Cookie attributes explained
- Cookie types analyzed and counted
- All cookie names listed
- Cookie existence verification works

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| NullPointerException | getCookieNamed() returns null | Check if cookie exists before accessing |
| "No cookies found" | Page not fully loaded | Add Thread.sleep() or wait |
| "Invalid cookie domain" | Domain mismatch | Ensure you're on correct domain |
| SecurityException | HTTPS vs HTTP mismatch | Use correct protocol |

**💡 Key Concepts:**

**1. Getting All Cookies:**
```java
Set<Cookie> cookies = driver.manage().getCookies();
for (Cookie cookie : cookies) {
    System.out.println(cookie.getName());
}
```

**2. Getting Specific Cookie:**
```java
Cookie specificCookie = driver.manage().getCookieNamed("session-id");
if (specificCookie != null) {
    System.out.println(specificCookie.getValue());
}
```

**3. Cookie Attributes:**
```java
Cookie cookie = driver.manage().getCookieNamed("session-id");
String name = cookie.getName();
String value = cookie.getValue();
String domain = cookie.getDomain();
String path = cookie.getPath();
Date expiry = cookie.getExpiry();
boolean isSecure = cookie.isSecure();
boolean isHttpOnly = cookie.isHttpOnly();
```

**4. Cookie Types:**
- **Session Cookie**: Expiry is null, deleted when browser closes
- **Persistent Cookie**: Has expiry date, survives browser restart
- **Secure Cookie**: Only sent over HTTPS
- **HttpOnly Cookie**: Cannot be accessed by JavaScript

**🎯 Practice Challenge:**

1. Navigate to https://www.google.com and count cookies
2. Find all cookies that expire after 1 year from now
3. Create a method `printCookieSummary()` that displays count, types, and domains
4. Find the cookie with longest value
5. Check if any cookies have path other than "/"
6. List all unique domains in cookies

---

#### Exercise 2: Adding Cookies - addCookie() Method (25 minutes)

**What you'll learn:** How to create and add custom cookies to the browser

**Create new class: `AddCookiesDemo`**

```java
package com.automation.cookies;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.Cookie;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.Date;

public class AddCookiesDemo {
    public static void main(String[] args) {
        System.out.println("===== ADDING COOKIES WITH addCookie() =====\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            // ========================================
            // STEP 1: NAVIGATE TO WEBSITE FIRST
            // ========================================
            System.out.println("--- STEP 1: NAVIGATE TO WEBSITE ---");
            System.out.println("⚠️ IMPORTANT: Must navigate to domain before adding cookies!");
            System.out.println();

            driver.get("https://www.example.com");
            Thread.sleep(2000);
            System.out.println("✅ Opened: " + driver.getCurrentUrl());
            System.out.println();

            // Check existing cookies
            int initialCookieCount = driver.manage().getCookies().size();
            System.out.println("Initial cookie count: " + initialCookieCount);
            System.out.println();

            // ========================================
            // STEP 2: CREATE SIMPLE COOKIE
            // ========================================
            System.out.println("--- STEP 2: CREATE SIMPLE COOKIE ---");
            System.out.println("Method: new Cookie(name, value)");
            System.out.println();

            // Create cookie with just name and value
            Cookie simpleCookie = new Cookie("user_preference", "dark_mode");

            System.out.println("Created cookie:");
            System.out.println("  Name: " + simpleCookie.getName());
            System.out.println("  Value: " + simpleCookie.getValue());
            System.out.println("  Domain: " + simpleCookie.getDomain() + " (will be set automatically)");
            System.out.println();

            // Add cookie to browser
            driver.manage().addCookie(simpleCookie);
            System.out.println("✅ Cookie added successfully!");
            System.out.println();

            // Verify cookie was added
            Cookie retrievedCookie = driver.manage().getCookieNamed("user_preference");
            if (retrievedCookie != null) {
                System.out.println("✅ Verification: Cookie found in browser");
                System.out.println("   Value: " + retrievedCookie.getValue());
            }
            System.out.println();

            // ========================================
            // STEP 3: CREATE COOKIE WITH ALL ATTRIBUTES
            // ========================================
            System.out.println("--- STEP 3: CREATE COOKIE WITH ALL ATTRIBUTES ---");
            System.out.println("Using Cookie.Builder pattern");
            System.out.println();

            // Calculate expiry date (30 days from now)
            Date expiryDate = new Date();
            expiryDate.setTime(expiryDate.getTime() + (30L * 24 * 60 * 60 * 1000)); // 30 days

            Cookie detailedCookie = new Cookie.Builder("session_token", "abc123xyz")
                .domain(".example.com")
                .path("/")
                .expiryDate(expiryDate)
                .isSecure(false) // Set to true for HTTPS only
                .isHttpOnly(true) // JavaScript cannot access
                .build();

            System.out.println("Created detailed cookie:");
            System.out.println("  Name: " + detailedCookie.getName());
            System.out.println("  Value: " + detailedCookie.getValue());
            System.out.println("  Domain: " + detailedCookie.getDomain());
            System.out.println("  Path: " + detailedCookie.getPath());
            System.out.println("  Expiry: " + detailedCookie.getExpiry());
            System.out.println("  Is Secure: " + detailedCookie.isSecure());
            System.out.println("  Is HttpOnly: " + detailedCookie.isHttpOnly());
            System.out.println();

            driver.manage().addCookie(detailedCookie);
            System.out.println("✅ Detailed cookie added successfully!");
            System.out.println();

            // ========================================
            // STEP 4: ADD MULTIPLE COOKIES
            // ========================================
            System.out.println("--- STEP 4: ADD MULTIPLE COOKIES ---");
            System.out.println();

            // Create array of cookies
            Cookie[] cookies = {
                new Cookie("language", "en-US"),
                new Cookie("theme", "blue"),
                new Cookie("font_size", "medium"),
                new Cookie("notifications", "enabled"),
                new Cookie("user_id", "12345")
            };

            System.out.println("Adding " + cookies.length + " cookies...");
            for (Cookie cookie : cookies) {
                driver.manage().addCookie(cookie);
                System.out.println("  ✅ Added: " + cookie.getName() + " = " + cookie.getValue());
            }
            System.out.println();

            // ========================================
            // STEP 5: VERIFY ALL ADDED COOKIES
            // ========================================
            System.out.println("--- STEP 5: VERIFY ALL COOKIES ---");
            System.out.println();

            int currentCookieCount = driver.manage().getCookies().size();
            System.out.println("Current cookie count: " + currentCookieCount);
            System.out.println("Cookies added: " + (currentCookieCount - initialCookieCount));
            System.out.println();

            System.out.println("All cookies in browser:");
            int count = 1;
            for (Cookie cookie : driver.manage().getCookies()) {
                System.out.println("  " + count + ". " + cookie.getName() + " = " + cookie.getValue());
                count++;
            }
            System.out.println();

            // ========================================
            // STEP 6: REFRESH AND VERIFY PERSISTENCE
            // ========================================
            System.out.println("--- STEP 6: VERIFY COOKIE PERSISTENCE ---");
            System.out.println("Refreshing page to verify cookies persist...");
            System.out.println();

            driver.navigate().refresh();
            Thread.sleep(2000);

            // Check if cookies still exist
            Cookie persistedCookie = driver.manage().getCookieNamed("user_preference");
            if (persistedCookie != null) {
                System.out.println("✅ SUCCESS: Cookies persisted after refresh!");
                System.out.println("   'user_preference' = " + persistedCookie.getValue());
            } else {
                System.out.println("❌ FAILED: Cookie not found after refresh");
            }
            System.out.println();

            // ========================================
            // STEP 7: UPDATE EXISTING COOKIE
            // ========================================
            System.out.println("--- STEP 7: UPDATE EXISTING COOKIE ---");
            System.out.println("Note: addCookie() overwrites if cookie name exists");
            System.out.println();

            Cookie oldCookie = driver.manage().getCookieNamed("theme");
            System.out.println("Old value: " + oldCookie.getValue());

            // Create new cookie with same name but different value
            Cookie updatedCookie = new Cookie("theme", "dark");
            driver.manage().addCookie(updatedCookie);

            Cookie newCookie = driver.manage().getCookieNamed("theme");
            System.out.println("New value: " + newCookie.getValue());
            System.out.println("✅ Cookie updated successfully!");
            System.out.println();

            // ========================================
            // STEP 8: PRACTICAL EXAMPLE - USER PREFERENCES
            // ========================================
            System.out.println("--- STEP 8: PRACTICAL EXAMPLE ---");
            System.out.println("Scenario: Save user preferences as cookies");
            System.out.println();

            // Simulate user preferences
            String username = "john_doe";
            String preferredLanguage = "Spanish";
            String timezone = "PST";
            boolean emailNotifications = true;

            // Create preference cookies
            Cookie userCookie = new Cookie("username", username);
            Cookie langCookie = new Cookie("preferred_language", preferredLanguage);
            Cookie tzCookie = new Cookie("timezone", timezone);
            Cookie notifCookie = new Cookie("email_notifications", String.valueOf(emailNotifications));

            // Add all preference cookies
            driver.manage().addCookie(userCookie);
            driver.manage().addCookie(langCookie);
            driver.manage().addCookie(tzCookie);
            driver.manage().addCookie(notifCookie);

            System.out.println("✅ User preferences saved as cookies:");
            System.out.println("   Username: " + username);
            System.out.println("   Language: " + preferredLanguage);
            System.out.println("   Timezone: " + timezone);
            System.out.println("   Email Notifications: " + emailNotifications);
            System.out.println();

            // Retrieve and display
            System.out.println("Retrieving preferences from cookies:");
            String savedUsername = driver.manage().getCookieNamed("username").getValue();
            String savedLanguage = driver.manage().getCookieNamed("preferred_language").getValue();
            String savedTimezone = driver.manage().getCookieNamed("timezone").getValue();
            String savedNotifications = driver.manage().getCookieNamed("email_notifications").getValue();

            System.out.println("  Retrieved Username: " + savedUsername);
            System.out.println("  Retrieved Language: " + savedLanguage);
            System.out.println("  Retrieved Timezone: " + savedTimezone);
            System.out.println("  Retrieved Notifications: " + savedNotifications);
            System.out.println();

            // ========================================
            // STEP 9: ERROR HANDLING
            // ========================================
            System.out.println("--- STEP 9: ERROR HANDLING ---");
            System.out.println();

            System.out.println("Attempting to add cookie with invalid domain...");
            try {
                Cookie invalidCookie = new Cookie.Builder("test", "value")
                    .domain(".wrongdomain.com") // Different from current domain
                    .build();

                driver.manage().addCookie(invalidCookie);
                System.out.println("Cookie added (may fail on some browsers)");
            } catch (Exception e) {
                System.out.println("❌ ERROR: " + e.getMessage());
                System.out.println("   Reason: Cookie domain must match current page domain");
            }
            System.out.println();

            System.out.println("=====================================");
            System.out.println("addCookie() SUMMARY:");
            System.out.println("  ✅ Created simple cookies (name + value)");
            System.out.println("  ✅ Created detailed cookies (all attributes)");
            System.out.println("  ✅ Added multiple cookies at once");
            System.out.println("  ✅ Verified cookie persistence");
            System.out.println("  ✅ Updated existing cookies");
            System.out.println("  ✅ Practical user preference example");
            System.out.println("  ✅ Error handling for invalid cookies");
            System.out.println("=====================================");
            System.out.println();

            System.out.println("KEY RULES:");
            System.out.println("  1. Must navigate to domain before adding cookies");
            System.out.println("  2. Cookie domain must match current page domain");
            System.out.println("  3. addCookie() overwrites if cookie name exists");
            System.out.println("  4. Session cookies (no expiry) deleted when browser closes");
            System.out.println("  5. Persistent cookies (with expiry) survive browser restart");

            Thread.sleep(2000);

        } catch (Exception e) {
            System.out.println("\n❌ ERROR: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("\n✅ Browser closed");
        }
    }
}
```

**Expected Output:**
```
===== ADDING COOKIES WITH addCookie() =====

--- STEP 1: NAVIGATE TO WEBSITE ---
⚠️ IMPORTANT: Must navigate to domain before adding cookies!

✅ Opened: https://www.example.com/

Initial cookie count: 0

--- STEP 2: CREATE SIMPLE COOKIE ---
Method: new Cookie(name, value)

Created cookie:
  Name: user_preference
  Value: dark_mode
  Domain: null (will be set automatically)

✅ Cookie added successfully!

✅ Verification: Cookie found in browser
   Value: dark_mode

--- STEP 3: CREATE COOKIE WITH ALL ATTRIBUTES ---
Using Cookie.Builder pattern

Created detailed cookie:
  Name: session_token
  Value: abc123xyz
  Domain: .example.com
  Path: /
  Expiry: Sat Feb 23 2026 10:30:00 GMT-0800
  Is Secure: false
  Is HttpOnly: true

✅ Detailed cookie added successfully!

--- STEP 4: ADD MULTIPLE COOKIES ---

Adding 5 cookies...
  ✅ Added: language = en-US
  ✅ Added: theme = blue
  ✅ Added: font_size = medium
  ✅ Added: notifications = enabled
  ✅ Added: user_id = 12345

--- STEP 5: VERIFY ALL COOKIES ---

Current cookie count: 7
Cookies added: 7

All cookies in browser:
  1. user_preference = dark_mode
  2. session_token = abc123xyz
  3. language = en-US
  4. theme = blue
  5. font_size = medium
  6. notifications = enabled
  7. user_id = 12345

--- STEP 6: VERIFY COOKIE PERSISTENCE ---
Refreshing page to verify cookies persist...

✅ SUCCESS: Cookies persisted after refresh!
   'user_preference' = dark_mode

--- STEP 7: UPDATE EXISTING COOKIE ---
Note: addCookie() overwrites if cookie name exists

Old value: blue
New value: dark
✅ Cookie updated successfully!

--- STEP 8: PRACTICAL EXAMPLE ---
Scenario: Save user preferences as cookies

✅ User preferences saved as cookies:
   Username: john_doe
   Language: Spanish
   Timezone: PST
   Email Notifications: true

Retrieving preferences from cookies:
  Retrieved Username: john_doe
  Retrieved Language: Spanish
  Retrieved Timezone: PST
  Retrieved Notifications: true

--- STEP 9: ERROR HANDLING ---

Attempting to add cookie with invalid domain...
❌ ERROR: invalid cookie domain
   Reason: Cookie domain must match current page domain

=====================================
addCookie() SUMMARY:
  ✅ Created simple cookies (name + value)
  ✅ Created detailed cookies (all attributes)
  ✅ Added multiple cookies at once
  ✅ Verified cookie persistence
  ✅ Updated existing cookies
  ✅ Practical user preference example
  ✅ Error handling for invalid cookies
=====================================

KEY RULES:
  1. Must navigate to domain before adding cookies
  2. Cookie domain must match current page domain
  3. addCookie() overwrites if cookie name exists
  4. Session cookies (no expiry) deleted when browser closes
  5. Persistent cookies (with expiry) survive browser restart

✅ Browser closed
```

**What Happens in Browser:**
1. Browser opens and navigates to example.com
2. Initially no cookies (example.com is simple page)
3. Code adds 7 custom cookies
4. Page refreshes to verify persistence
5. All cookies remain (visible in DevTools)
6. Browser closes

**✅ Success Criteria:**
- Successfully navigated before adding cookies
- Simple cookie created and added
- Detailed cookie with all attributes added
- Multiple cookies added successfully
- Cookie count increased correctly
- Cookies persisted after page refresh
- Existing cookie updated successfully
- User preference cookies added and retrieved
- Error handling for invalid domain works

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| "unable to set cookie" | No navigation before addCookie() | Call driver.get() first |
| "invalid cookie domain" | Domain doesn't match current page | Use correct domain or null (auto-detect) |
| IllegalArgumentException | Cookie name/value has invalid chars | Avoid spaces, semicolons in name/value |
| "cookie has expired" | Expiry date in past | Set expiry date in future |

**💡 Key Concepts:**

**1. Simple Cookie Creation:**
```java
Cookie cookie = new Cookie("name", "value");
driver.manage().addCookie(cookie);
```

**2. Detailed Cookie with Builder:**
```java
Date expiry = new Date(System.currentTimeMillis() + 86400000); // 1 day

Cookie cookie = new Cookie.Builder("name", "value")
    .domain(".example.com")
    .path("/")
    .expiryDate(expiry)
    .isSecure(true)
    .isHttpOnly(true)
    .build();

driver.manage().addCookie(cookie);
```

**3. Adding Multiple Cookies:**
```java
Cookie[] cookies = {
    new Cookie("cookie1", "value1"),
    new Cookie("cookie2", "value2"),
    new Cookie("cookie3", "value3")
};

for (Cookie c : cookies) {
    driver.manage().addCookie(c);
}
```

**4. Updating Cookie:**
```java
// Adding cookie with same name overwrites existing one
driver.manage().addCookie(new Cookie("theme", "dark"));
```

**🎯 Practice Challenge:**

1. Create a cookie that expires in 7 days
2. Add 10 different cookies with user preferences
3. Create method `addUserPreferences(String username, String lang, String theme)`
4. Update a cookie value 3 times and verify final value
5. Create persistent cookie and session cookie, verify difference after browser restart
6. Handle error when trying to add cookie before navigation

---

#### Exercise 3: Deleting Cookies - deleteCookie() and deleteAllCookies() (20 minutes)

**What you'll learn:** How to remove individual cookies and clear all cookies

**Create new class: `DeleteCookiesDemo`**

```java
package com.automation.cookies;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.Cookie;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class DeleteCookiesDemo {
    public static void main(String[] args) {
        System.out.println("===== DELETING COOKIES =====\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            // ========================================
            // SETUP: ADD SOME TEST COOKIES
            // ========================================
            System.out.println("--- SETUP: CREATING TEST ENVIRONMENT ---");
            System.out.println();

            driver.get("https://www.example.com");
            Thread.sleep(2000);

            // Add test cookies
            driver.manage().addCookie(new Cookie("cookie1", "value1"));
            driver.manage().addCookie(new Cookie("cookie2", "value2"));
            driver.manage().addCookie(new Cookie("cookie3", "value3"));
            driver.manage().addCookie(new Cookie("user_session", "abc123"));
            driver.manage().addCookie(new Cookie("auth_token", "xyz789"));

            int initialCount = driver.manage().getCookies().size();
            System.out.println("✅ Setup complete");
            System.out.println("   Total cookies: " + initialCount);
            System.out.println();

            System.out.println("Current cookies:");
            for (Cookie cookie : driver.manage().getCookies()) {
                System.out.println("  - " + cookie.getName());
            }
            System.out.println();

            // ========================================
            // METHOD 1: DELETE BY COOKIE NAME
            // ========================================
            System.out.println("--- METHOD 1: DELETE BY COOKIE NAME ---");
            System.out.println("Method: driver.manage().deleteCookieNamed(\"name\")");
            System.out.println();

            String cookieToDelete = "cookie1";
            System.out.println("Deleting cookie: " + cookieToDelete);

            // Verify cookie exists before deleting
            Cookie beforeDelete = driver.manage().getCookieNamed(cookieToDelete);
            if (beforeDelete != null) {
                System.out.println("✅ Cookie exists: " + beforeDelete.getName() + " = " + beforeDelete.getValue());
            }

            // Delete the cookie
            driver.manage().deleteCookieNamed(cookieToDelete);
            System.out.println("🗑️ Deleted cookie: " + cookieToDelete);

            // Verify cookie is deleted
            Cookie afterDelete = driver.manage().getCookieNamed(cookieToDelete);
            if (afterDelete == null) {
                System.out.println("✅ Verification: Cookie successfully deleted");
            } else {
                System.out.println("❌ Error: Cookie still exists");
            }

            System.out.println("Remaining cookies: " + driver.manage().getCookies().size());
            System.out.println();

            // ========================================
            // METHOD 2: DELETE BY COOKIE OBJECT
            // ========================================
            System.out.println("--- METHOD 2: DELETE BY COOKIE OBJECT ---");
            System.out.println("Method: driver.manage().deleteCookie(cookieObject)");
            System.out.println();

            // Get cookie object first
            Cookie cookieToRemove = driver.manage().getCookieNamed("cookie2");

            if (cookieToRemove != null) {
                System.out.println("Found cookie: " + cookieToRemove.getName());
                System.out.println("  Value: " + cookieToRemove.getValue());

                // Delete using cookie object
                driver.manage().deleteCookie(cookieToRemove);
                System.out.println("🗑️ Deleted cookie object");

                // Verify deletion
                if (driver.manage().getCookieNamed("cookie2") == null) {
                    System.out.println("✅ Cookie successfully removed");
                }
            }

            System.out.println("Remaining cookies: " + driver.manage().getCookies().size());
            System.out.println();

            // ========================================
            // METHOD 3: DELETE MULTIPLE SPECIFIC COOKIES
            // ========================================
            System.out.println("--- METHOD 3: DELETE MULTIPLE COOKIES ---");
            System.out.println();

            String[] cookiesToDelete = {"cookie3", "user_session"};

            System.out.println("Deleting " + cookiesToDelete.length + " cookies:");
            for (String cookieName : cookiesToDelete) {
                System.out.println("  🗑️ Deleting: " + cookieName);
                driver.manage().deleteCookieNamed(cookieName);
            }

            System.out.println("✅ Multiple cookies deleted");
            System.out.println("Remaining cookies: " + driver.manage().getCookies().size());
            System.out.println();

            // ========================================
            // METHOD 4: DELETE ALL COOKIES
            // ========================================
            System.out.println("--- METHOD 4: DELETE ALL COOKIES ---");
            System.out.println("Method: driver.manage().deleteAllCookies()");
            System.out.println();

            // Add some more cookies first
            driver.manage().addCookie(new Cookie("temp1", "test1"));
            driver.manage().addCookie(new Cookie("temp2", "test2"));
            driver.manage().addCookie(new Cookie("temp3", "test3"));

            int beforeDeleteAll = driver.manage().getCookies().size();
            System.out.println("Cookies before deleteAll: " + beforeDeleteAll);

            // Delete all cookies
            driver.manage().deleteAllCookies();
            System.out.println("🗑️ Executed: deleteAllCookies()");

            int afterDeleteAll = driver.manage().getCookies().size();
            System.out.println("Cookies after deleteAll: " + afterDeleteAll);

            if (afterDeleteAll == 0) {
                System.out.println("✅ SUCCESS: All cookies deleted!");
            } else {
                System.out.println("⚠️ Warning: " + afterDeleteAll + " cookies remaining");
            }
            System.out.println();

            // ========================================
            // METHOD 5: CONDITIONAL DELETION
            // ========================================
            System.out.println("--- METHOD 5: CONDITIONAL DELETION ---");
            System.out.println("Delete cookies matching specific criteria");
            System.out.println();

            // Add test cookies
            driver.manage().addCookie(new Cookie("user_pref_theme", "dark"));
            driver.manage().addCookie(new Cookie("user_pref_lang", "en"));
            driver.manage().addCookie(new Cookie("user_pref_font", "12"));
            driver.manage().addCookie(new Cookie("session_id", "123"));
            driver.manage().addCookie(new Cookie("auth_token", "456"));

            System.out.println("Total cookies: " + driver.manage().getCookies().size());
            System.out.println("\nDeleting all cookies starting with 'user_pref_':");

            // Delete cookies matching pattern
            int deletedCount = 0;
            for (Cookie cookie : driver.manage().getCookies()) {
                if (cookie.getName().startsWith("user_pref_")) {
                    System.out.println("  🗑️ Deleting: " + cookie.getName());
                    driver.manage().deleteCookie(cookie);
                    deletedCount++;
                }
            }

            System.out.println("\n✅ Deleted " + deletedCount + " cookies matching criteria");
            System.out.println("Remaining cookies: " + driver.manage().getCookies().size());
            System.out.println();

            // ========================================
            // METHOD 6: DELETE AND VERIFY PATTERN
            // ========================================
            System.out.println("--- METHOD 6: DELETE WITH VERIFICATION ---");
            System.out.println("Best practice: Always verify deletion");
            System.out.println();

            // Add a cookie
            String testCookie = "test_cookie";
            driver.manage().addCookie(new Cookie(testCookie, "test_value"));
            System.out.println("Added cookie: " + testCookie);

            // Delete and verify
            driver.manage().deleteCookieNamed(testCookie);
            System.out.println("Attempted to delete: " + testCookie);

            // Verification
            Cookie verifyDelete = driver.manage().getCookieNamed(testCookie);
            if (verifyDelete == null) {
                System.out.println("✅ VERIFIED: Cookie deleted successfully");
            } else {
                System.out.println("❌ FAILED: Cookie still exists");
            }
            System.out.println();

            // ========================================
            // PRACTICAL EXAMPLE: LOGOUT SCENARIO
            // ========================================
            System.out.println("--- PRACTICAL EXAMPLE: LOGOUT SCENARIO ---");
            System.out.println();

            // Simulate logged-in state
            driver.manage().addCookie(new Cookie("user_id", "12345"));
            driver.manage().addCookie(new Cookie("session_token", "abc123xyz"));
            driver.manage().addCookie(new Cookie("auth_status", "authenticated"));
            driver.manage().addCookie(new Cookie("remember_me", "true"));

            System.out.println("User logged in. Session cookies:");
            for (Cookie cookie : driver.manage().getCookies()) {
                System.out.println("  - " + cookie.getName() + " = " + cookie.getValue());
            }
            System.out.println();

            // Simulate logout: Delete session-related cookies
            System.out.println("Performing logout...");
            driver.manage().deleteCookieNamed("session_token");
            driver.manage().deleteCookieNamed("auth_status");
            System.out.println("🗑️ Deleted: session_token");
            System.out.println("🗑️ Deleted: auth_status");
            System.out.println();

            System.out.println("After logout. Remaining cookies:");
            for (Cookie cookie : driver.manage().getCookies()) {
                System.out.println("  - " + cookie.getName() + " = " + cookie.getValue());
            }
            System.out.println("\n✅ Logout complete (kept user_id and remember_me for auto-login)");
            System.out.println();

            // ========================================
            // EDGE CASES
            // ========================================
            System.out.println("--- EDGE CASES & ERROR HANDLING ---");
            System.out.println();

            // Try to delete non-existent cookie
            System.out.println("1. Deleting non-existent cookie:");
            driver.manage().deleteCookieNamed("nonexistent_cookie");
            System.out.println("   ✅ No error thrown (safe operation)");
            System.out.println();

            // Try to delete null cookie
            System.out.println("2. Deleting null cookie object:");
            try {
                driver.manage().deleteCookie(null);
                System.out.println("   ⚠️ Accepted null (implementation dependent)");
            } catch (Exception e) {
                System.out.println("   ❌ Error: " + e.getClass().getSimpleName());
            }
            System.out.println();

            // Delete all when already empty
            System.out.println("3. Delete all cookies when none exist:");
            driver.manage().deleteAllCookies();
            driver.manage().deleteAllCookies(); // Call again
            System.out.println("   ✅ No error thrown");
            System.out.println();

            System.out.println("=====================================");
            System.out.println("COOKIE DELETION SUMMARY:");
            System.out.println("  ✅ deleteCookieNamed() - by name");
            System.out.println("  ✅ deleteCookie() - by object");
            System.out.println("  ✅ Delete multiple specific cookies");
            System.out.println("  ✅ deleteAllCookies() - remove all");
            System.out.println("  ✅ Conditional deletion (pattern matching)");
            System.out.println("  ✅ Delete with verification");
            System.out.println("  ✅ Practical logout scenario");
            System.out.println("  ✅ Error handling for edge cases");
            System.out.println("=====================================");
            System.out.println();

            System.out.println("BEST PRACTICES:");
            System.out.println("  1. Always verify cookie exists before deleting");
            System.out.println("  2. Verify deletion was successful");
            System.out.println("  3. Use deleteAllCookies() for clean slate");
            System.out.println("  4. Handle null/non-existent gracefully");
            System.out.println("  5. For logout: delete session cookies, keep preferences");

            Thread.sleep(2000);

        } catch (Exception e) {
            System.out.println("\n❌ ERROR: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("\n✅ Browser closed");
        }
    }
}
```

**Expected Output:**
```
===== DELETING COOKIES =====

--- SETUP: CREATING TEST ENVIRONMENT ---

✅ Setup complete
   Total cookies: 5

Current cookies:
  - cookie1
  - cookie2
  - cookie3
  - user_session
  - auth_token

--- METHOD 1: DELETE BY COOKIE NAME ---
Method: driver.manage().deleteCookieNamed("name")

Deleting cookie: cookie1
✅ Cookie exists: cookie1 = value1
🗑️ Deleted cookie: cookie1
✅ Verification: Cookie successfully deleted
Remaining cookies: 4

--- METHOD 2: DELETE BY COOKIE OBJECT ---
Method: driver.manage().deleteCookie(cookieObject)

Found cookie: cookie2
  Value: value2
🗑️ Deleted cookie object
✅ Cookie successfully removed
Remaining cookies: 3

--- METHOD 3: DELETE MULTIPLE COOKIES ---

Deleting 2 cookies:
  🗑️ Deleting: cookie3
  🗑️ Deleting: user_session
✅ Multiple cookies deleted
Remaining cookies: 1

--- METHOD 4: DELETE ALL COOKIES ---
Method: driver.manage().deleteAllCookies()

Cookies before deleteAll: 4
🗑️ Executed: deleteAllCookies()
Cookies after deleteAll: 0
✅ SUCCESS: All cookies deleted!

--- METHOD 5: CONDITIONAL DELETION ---
Delete cookies matching specific criteria

Total cookies: 5

Deleting all cookies starting with 'user_pref_':
  🗑️ Deleting: user_pref_theme
  🗑️ Deleting: user_pref_lang
  🗑️ Deleting: user_pref_font

✅ Deleted 3 cookies matching criteria
Remaining cookies: 2

--- METHOD 6: DELETE WITH VERIFICATION ---
Best practice: Always verify deletion

Added cookie: test_cookie
Attempted to delete: test_cookie
✅ VERIFIED: Cookie deleted successfully

--- PRACTICAL EXAMPLE: LOGOUT SCENARIO ---

User logged in. Session cookies:
  - user_id = 12345
  - session_token = abc123xyz
  - auth_status = authenticated
  - remember_me = true

Performing logout...
🗑️ Deleted: session_token
🗑️ Deleted: auth_status

After logout. Remaining cookies:
  - user_id = 12345
  - remember_me = true

✅ Logout complete (kept user_id and remember_me for auto-login)

--- EDGE CASES & ERROR HANDLING ---

1. Deleting non-existent cookie:
   ✅ No error thrown (safe operation)

2. Deleting null cookie object:
   ❌ Error: IllegalArgumentException

3. Delete all cookies when none exist:
   ✅ No error thrown

=====================================
COOKIE DELETION SUMMARY:
  ✅ deleteCookieNamed() - by name
  ✅ deleteCookie() - by object
  ✅ Delete multiple specific cookies
  ✅ deleteAllCookies() - remove all
  ✅ Conditional deletion (pattern matching)
  ✅ Delete with verification
  ✅ Practical logout scenario
  ✅ Error handling for edge cases
=====================================

BEST PRACTICES:
  1. Always verify cookie exists before deleting
  2. Verify deletion was successful
  3. Use deleteAllCookies() for clean slate
  4. Handle null/non-existent gracefully
  5. For logout: delete session cookies, keep preferences

✅ Browser closed
```

**What Happens in Browser:**
1. Browser opens, navigates to example.com
2. Multiple cookies added
3. Cookies deleted one by one (visible in DevTools if open)
4. All cookies cleared at one point
5. More cookies added for testing
6. Browser closes

**✅ Success Criteria:**
- Individual cookie deleted by name
- Cookie deleted using cookie object
- Multiple cookies deleted successfully
- All cookies deleted with deleteAllCookies()
- Conditional deletion (pattern matching) works
- Deletion verified successfully
- Logout scenario correctly removes only session cookies
- No errors on edge cases (non-existent, null)

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| IllegalArgumentException | Passing null to deleteCookie() | Check for null before deleting |
| "Cookie not found" | Trying to verify non-existent cookie | Use getCookieNamed() != null check |
| Cookies not deleting | Page not fully loaded | Add wait before deletion |
| ConcurrentModificationException | Deleting while iterating | Create list copy or use iterator |

**💡 Key Concepts:**

**1. Delete by Name:**
```java
driver.manage().deleteCookieNamed("cookieName");
```

**2. Delete by Object:**
```java
Cookie cookie = driver.manage().getCookieNamed("cookieName");
driver.manage().deleteCookie(cookie);
```

**3. Delete All:**
```java
driver.manage().deleteAllCookies();
```

**4. Delete with Verification:**
```java
driver.manage().deleteCookieNamed("cookieName");
if (driver.manage().getCookieNamed("cookieName") == null) {
    System.out.println("Deleted successfully");
}
```

**5. Conditional Deletion:**
```java
for (Cookie cookie : driver.manage().getCookies()) {
    if (cookie.getName().startsWith("temp_")) {
        driver.manage().deleteCookie(cookie);
    }
}
```

**🎯 Practice Challenge:**

1. Create 20 cookies, then delete only ones with "session" in name
2. Implement logout method that removes all auth-related cookies
3. Create method `clearUserPreferences()` that deletes preference cookies
4. Delete all cookies older than 1 day (check expiry)
5. Create `resetToDefault()` that deletes all and adds default cookies
6. Handle scenario where cookie deletion fails (verify and retry)

---

## 📌 Day 36 & 37 Summary:

**Day 36 - Web Tables:**
- ✅ Static table handling (locate, extract, iterate)
- ✅ Dynamic table data extraction
- ✅ Row-by-row and column-by-column iteration
- ✅ Finding max/min values in tables
- ✅ Searching and filtering table data
- ✅ Map-based table storage

**Day 37 - Cookies:**
- ✅ Understanding browser cookies and attributes
- ✅ Adding cookies with addCookie()
- ✅ Creating detailed cookies with Cookie.Builder
- ✅ Deleting cookies (by name, object, all)
- ✅ Cookie verification and error handling
- ✅ Practical scenarios (user preferences, logout)

**Key Skills Acquired:**
1. Extract and manipulate web table data
2. Handle dynamic tables with changing content
3. Efficient iteration techniques for large tables
4. Create, read, and delete browser cookies
5. Manage user sessions with cookies
6. Handle cookie-based authentication scenarios

**Next Steps:**
Continue practicing with real websites that have tables and cookies. Combine these skills with earlier concepts like waits, alerts, and frames for comprehensive automation scenarios.

---
