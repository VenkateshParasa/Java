export default {
  title: "Day 10: Web Tables Assessment",
  description: "Test your understanding of handling web tables, reading data, and table interactions",
  passingScore: 70,
  timeLimit: 23, // minutes
  modes: {
    quick: {
      questionCount: 10,
      timeLimit: 12,
      sections: ['section-a', 'section-b']
    },
    full: {
      questionCount: 25,
      timeLimit: 23,
      sections: ['section-a', 'section-b', 'section-c', 'section-d']
    }
  },
  sections: [
    {
      id: 'section-a',
      title: 'Multiple Choice Questions',
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          question: 'What HTML tag represents a table in web pages?',
          options: [
            '<table>',
            '<tab>',
            '<grid>',
            '<data-table>'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'easy',
          explanation: 'The <table> tag is used to create tables in HTML, containing rows (<tr>) and cells (<td> or <th>).'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'Which tag represents a table row?',
          options: [
            '<td>',
            '<tr>',
            '<row>',
            '<th>'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'The <tr> tag (table row) is used to define rows in an HTML table.'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'What is the difference between <td> and <th> tags?',
          options: [
            'No difference',
            '<td> is for data cells, <th> is for header cells',
            '<td> is for rows, <th> is for columns',
            '<th> is deprecated'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: '<td> (table data) defines standard data cells, while <th> (table header) defines header cells that are typically bold and centered.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'How do you find all rows in a table using XPath?',
          options: [
            '//table/tr',
            '//table//tr',
            '//table/tbody/tr',
            'Both B and C'
          ],
          correctAnswer: 3,
          points: 2,
          difficulty: 'medium',
          explanation: '//table//tr finds all rows anywhere in table, while //table/tbody/tr finds rows specifically in tbody. Both are valid depending on table structure.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'How do you get the number of rows in a table?',
          options: [
            'table.getRowCount()',
            'driver.findElements(By.xpath("//table//tr")).size()',
            'table.rows.length',
            'table.countRows()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Use findElements() to get all rows and call size() on the list to get the count of rows.'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'What XPath would you use to find a cell in row 2, column 3?',
          options: [
            '//table/tr[2]/td[3]',
            '//table//tr[2]//td[3]',
            '//table/tbody/tr[2]/td[3]',
            'All of the above'
          ],
          correctAnswer: 3,
          points: 2,
          difficulty: 'medium',
          explanation: 'All these XPath expressions can locate the cell in row 2, column 3, depending on the table structure (with or without tbody).'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'How do you read all cell values from a specific row?',
          options: [
            'row.getCells()',
            'driver.findElements(By.tagName("td")) for the row',
            'row.getAllText()',
            'row.getText()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Find all <td> elements within the specific row using findElements() and iterate to get text from each cell.'
        },
        {
          id: 'q8',
          type: 'mcq',
          question: 'What is the best way to search for a specific value in a table?',
          options: [
            'Use XPath with contains() function',
            'Loop through all rows and cells',
            'Use CSS selector with text',
            'Both A and B'
          ],
          correctAnswer: 3,
          points: 2,
          difficulty: 'medium',
          explanation: 'You can either use XPath with contains() for direct search or loop through rows/cells programmatically. Both approaches are valid.'
        },
        {
          id: 'q9',
          type: 'mcq',
          question: 'How do you handle table pagination?',
          options: [
            'Click next page button and process each page',
            'Extract page count and iterate through pages',
            'Use dynamic XPath for page numbers',
            'All of the above'
          ],
          correctAnswer: 3,
          points: 2,
          difficulty: 'medium',
          explanation: 'Table pagination can be handled by clicking next buttons, iterating through page numbers, or using dynamic XPath. The approach depends on pagination implementation.'
        },
        {
          id: 'q10',
          type: 'mcq',
          question: 'What is a dynamic table?',
          options: [
            'A table created with JavaScript',
            'A table whose content changes based on user actions or data',
            'A table with animations',
            'A table that loads data asynchronously'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'A dynamic table is one whose content, rows, or structure changes dynamically based on user interactions, filters, sorting, or data updates.'
        },
        {
          id: 'q11',
          type: 'mcq',
          question: 'How do you find a row containing specific text?',
          options: [
            '//table//tr[contains(., "text")]',
            '//table//tr[text()="text"]',
            '//table//tr[@text="text"]',
            '//table//tr/contains("text")'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'medium',
          explanation: 'Use XPath //table//tr[contains(., "text")] where "." represents the current node (row) to search for text anywhere in that row.'
        },
        {
          id: 'q12',
          type: 'mcq',
          question: 'What challenge do dynamic tables present for automation?',
          options: [
            'Elements may not be present initially',
            'Row count and content change',
            'Timing issues with waits',
            'All of the above'
          ],
          correctAnswer: 3,
          points: 2,
          difficulty: 'medium',
          explanation: 'Dynamic tables present multiple challenges: elements load asynchronously, content changes, row counts vary, requiring explicit waits and dynamic locators.'
        },
        {
          id: 'q13',
          type: 'mcq',
          question: 'How do you click a button in a specific table row?',
          options: [
            'Find row, then find button within that row',
            'Use XPath: //tr[contains(., "identifier")]//button',
            'Use relative locators',
            'All of the above'
          ],
          correctAnswer: 3,
          points: 2,
          difficulty: 'medium',
          explanation: 'You can locate buttons in specific rows by finding the row first, using XPath with row identifiers, or using relative locators.'
        },
        {
          id: 'q14',
          type: 'mcq',
          question: 'What is the best practice for handling table headers?',
          options: [
            'Use <th> tags to identify headers',
            'Find headers in <thead> section',
            'Map column headers to indices',
            'All of the above'
          ],
          correctAnswer: 3,
          points: 2,
          difficulty: 'medium',
          explanation: 'Best practices include using <th> tags, looking in <thead>, and creating a mapping between column names and indices for maintainable code.'
        },
        {
          id: 'q15',
          type: 'mcq',
          question: 'How do you handle tables without <tbody> tags?',
          options: [
            'Use XPath: //table/tr',
            'Add tbody in XPath anyway',
            'Use //table//tr to handle both cases',
            'It is not possible'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'medium',
          explanation: 'Using //table//tr (descendant axis) works for tables with or without <tbody> tags, making locators more robust.'
        },
        {
          id: 'q16',
          type: 'mcq',
          question: 'What method helps verify if a table is sorted correctly?',
          options: [
            'Read all values and compare with sorted list',
            'table.isSorted()',
            'Check CSS classes on header',
            'Use built-in Selenium method'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'hard',
          explanation: 'To verify sorting, extract all values from the column, create a sorted copy, and compare them. Selenium has no built-in sorting verification.'
        },
        {
          id: 'q17',
          type: 'mcq',
          question: 'How do you handle nested tables?',
          options: [
            'Use more specific XPath with multiple levels',
            'Find parent table first, then inner table',
            'Use indexed XPath like (//table)[2]',
            'All of the above'
          ],
          correctAnswer: 3,
          points: 2,
          difficulty: 'hard',
          explanation: 'Nested tables require careful locator strategies: specific XPath paths, finding parent then child tables, or using indices to differentiate tables.'
        }
      ]
    },
    {
      id: 'section-b',
      title: 'True/False Questions',
      questions: [
        {
          id: 'q18',
          type: 'true-false',
          question: 'All HTML tables must have <thead> and <tbody> tags.',
          correctAnswer: false,
          points: 2,
          difficulty: 'easy',
          explanation: 'False. While <thead> and <tbody> are good practice, tables can be created with just <table>, <tr>, and <td> tags.'
        },
        {
          id: 'q19',
          type: 'true-false',
          question: 'XPath index starts from 1, not 0.',
          correctAnswer: true,
          points: 2,
          difficulty: 'easy',
          explanation: 'True. XPath uses 1-based indexing, so the first row is [1], second is [2], etc., unlike most programming languages.'
        },
        {
          id: 'q20',
          type: 'true-false',
          question: 'Dynamic tables require explicit waits for elements to load.',
          correctAnswer: true,
          points: 2,
          difficulty: 'medium',
          explanation: 'True. Dynamic tables load data asynchronously, requiring explicit waits to ensure elements are present before interaction.'
        },
        {
          id: 'q21',
          type: 'true-false',
          question: 'You can use CSS selectors to navigate table structure.',
          correctAnswer: true,
          points: 2,
          difficulty: 'easy',
          explanation: 'True. CSS selectors like "table tr:nth-child(2) td:nth-child(3)" can navigate table structures effectively.'
        },
        {
          id: 'q22',
          type: 'true-false',
          question: 'getText() on a table element returns all cell values concatenated.',
          correctAnswer: true,
          points: 2,
          difficulty: 'medium',
          explanation: 'True. Using getText() on a table returns all visible text concatenated, but it is better to iterate through cells for structured data.'
        }
      ]
    },
    {
      id: 'section-c',
      title: 'Fill in the Blanks',
      questions: [
        {
          id: 'q23',
          type: 'fill-blank',
          question: 'The HTML tag ________ is used to define table data cells.',
          correctAnswer: 'td',
          points: 2,
          difficulty: 'easy',
          explanation: 'The <td> (table data) tag is used to define standard data cells in an HTML table.'
        },
        {
          id: 'q24',
          type: 'fill-blank',
          question: 'XPath indexing starts from ________ instead of 0.',
          correctAnswer: '1',
          points: 2,
          difficulty: 'easy',
          explanation: 'XPath uses 1-based indexing, meaning the first element is at position [1].'
        }
      ]
    },
    {
      id: 'section-d',
      title: 'Short Answer Questions',
      questions: [
        {
          id: 'q25',
          type: 'short',
          question: 'Explain how to extract all data from a web table and store it in a data structure.',
          sampleAnswer: 'Extracting table data steps: 1) Find table element: WebElement table = driver.findElement(By.id("dataTable")); 2) Get all rows: List<WebElement> rows = table.findElements(By.tagName("tr")); 3) Create data structure like List<List<String>> or List<Map<String, String>>. 4) Extract headers from first row (if present): List<WebElement> headers = rows.get(0).findElements(By.tagName("th")); 5) Loop through data rows starting from index 1: for(int i=1; i<rows.size(); i++). 6) For each row, get cells: List<WebElement> cells = rows.get(i).findElements(By.tagName("td")); 7) Extract text from each cell: cell.getText(). 8) Store in structure: tableData.add(rowData); Use Map for header-value pairs or List for simple storage. Handle dynamic tables with waits and pagination by repeating process for each page.',
          points: 4,
          difficulty: 'hard',
          keywords: ['table', 'rows', 'findElements', 'tr', 'td', 'th', 'getText', 'loop', 'List', 'Map', 'headers', 'cells']
        }
      ]
    }
  ]
};
