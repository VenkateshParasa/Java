export default {
  title: "Day 30: Final Project Assessment",
  description: "Comprehensive project evaluation covering all Java fundamentals",
  passingScore: 70,
  timeLimit: 60, // minutes for project evaluation
  modes: {
    full: {
      questionCount: 9,
      timeLimit: 60,
      sections: ['section-a']
    }
  },
  sections: [
    {
      id: 'section-a',
      title: 'Project Evaluation Criteria',
      questions: [
        {
          id: 'q1',
          type: 'short',
          question: 'Code Structure (10 points): Evaluate your Library Management System project for proper package organization, logical class separation, clear naming, proper imports, and no unnecessary code.',
          sampleAnswer: `Evaluation Checklist:
✓ Proper package organization (2 points)
  - com.library.model (Book, Member classes)
  - com.library.service (LibraryService)
  - com.library.util (FileHandler, Validator)
  - com.library.main (Main class)

✓ Logical class separation (3 points)
  - Separate classes for different responsibilities
  - Book class for book data
  - Member class for member data
  - LibraryService for business logic
  - FileHandler for I/O operations

✓ Clear and meaningful names (2 points)
  - Classes: PascalCase (Book, LibraryService)
  - Methods: camelCase (addBook, issueBook)
  - Variables: camelCase (bookId, memberName)
  - Constants: UPPER_SNAKE_CASE (MAX_BOOKS)

✓ Proper imports (1 point)
  - Only necessary imports
  - No wildcard imports unless justified
  - Organized by package

✓ No unnecessary code (2 points)
  - No commented-out code
  - No unused variables/methods
  - No duplicate code`,
          points: 10,
          difficulty: 'hard',
          keywords: ['package', 'organization', 'structure', 'naming', 'imports', 'clean code']
        },
        {
          id: 'q2',
          type: 'short',
          question: 'OOP Implementation (15 points): Evaluate proper use of classes/objects, encapsulation with getters/setters, constructors, methods with appropriate access modifiers, interfaces, and inheritance.',
          sampleAnswer: `Evaluation Checklist:
✓ Proper use of classes and objects (3 points)
  - Well-defined classes with single responsibility
  - Objects created and used appropriately
  - Proper object lifecycle management

✓ Encapsulation with getters/setters (3 points)
  - Private fields
  - Public getters/setters with validation
  - Read-only fields where appropriate

✓ Constructors properly defined (2 points)
  - Default and parameterized constructors
  - Constructor chaining if needed
  - Proper initialization

✓ Methods with appropriate access modifiers (2 points)
  - Public for API methods
  - Private for helper methods
  - Protected for inheritance

✓ Use of interfaces where appropriate (3 points)
  - Searchable interface for search functionality
  - Comparable for sorting
  - Custom interfaces for contracts

✓ Inheritance if applicable (2 points)
  - Proper use of extends
  - Method overriding
  - super keyword usage`,
          points: 15,
          difficulty: 'hard',
          keywords: ['OOP', 'encapsulation', 'inheritance', 'interface', 'constructor', 'access modifier']
        },
        {
          id: 'q3',
          type: 'short',
          question: 'Collections Usage (10 points): Evaluate appropriate collection choices for books and members, and proper collection operations.',
          sampleAnswer: `Evaluation Checklist:
✓ Appropriate collection for books (3 points)
  - HashMap<String, Book> for fast lookup by ISBN
  - Or ArrayList<Book> for sequential access
  - Justification for choice

✓ Appropriate collection for members (3 points)
  - HashMap<String, Member> for fast lookup by ID
  - Or TreeMap for sorted members
  - Justification for choice

✓ Proper collection operations (4 points)
  - Add: books.put(isbn, book)
  - Remove: books.remove(isbn)
  - Search: books.get(isbn) or stream filtering
  - Iterate: for-each or streams
  - Update: proper modification
  - No ConcurrentModificationException`,
          points: 10,
          difficulty: 'medium',
          keywords: ['Collections', 'HashMap', 'ArrayList', 'operations', 'add', 'remove', 'search']
        },
        {
          id: 'q4',
          type: 'short',
          question: 'Exception Handling (10 points): Evaluate custom exceptions, try-catch blocks, meaningful error messages, and proper exception propagation.',
          sampleAnswer: `Evaluation Checklist:
✓ Custom exceptions created (3 points)
  - BookNotFoundException
  - MemberNotFoundException
  - BookAlreadyIssuedException
  - InvalidDataException

✓ try-catch blocks where needed (3 points)
  - File I/O operations
  - User input validation
  - Business logic that can fail
  - Proper exception types caught

✓ Meaningful error messages (2 points)
  - Clear description of error
  - Helpful for debugging
  - User-friendly messages

✓ Proper exception propagation (2 points)
  - throws clause in method signature
  - Re-throwing when appropriate
  - Not swallowing exceptions`,
          points: 10,
          difficulty: 'medium',
          keywords: ['exception', 'custom exception', 'try-catch', 'error handling', 'throws', 'propagation']
        },
        {
          id: 'q5',
          type: 'short',
          question: 'File I/O (10 points): Evaluate data saved to file correctly, data loaded from file correctly, and proper resource handling.',
          sampleAnswer: `Evaluation Checklist:
✓ Data saved to file correctly (4 points)
  - Books saved with all details
  - Members saved with all details
  - Issued books relationship saved
  - Data format consistent

✓ Data loaded from file correctly (4 points)
  - Books loaded and parsed
  - Members loaded and parsed
  - Relationships restored
  - Handles missing/corrupted files

✓ Proper resource handling (2 points)
  - try-with-resources used
  - Files closed properly
  - No resource leaks
  - BufferedReader/Writer for efficiency`,
          points: 10,
          difficulty: 'medium',
          keywords: ['File I/O', 'save', 'load', 'try-with-resources', 'BufferedReader', 'resource handling']
        },
        {
          id: 'q6',
          type: 'short',
          question: 'Functionality (25 points): Evaluate all features - add books, remove books, issue book, return book, search, display all books, and display available books.',
          sampleAnswer: `Evaluation Checklist:
✓ Add books feature works (4 points)
  - Can add new books
  - Validates input
  - Prevents duplicates
  - Updates collection

✓ Remove books feature works (3 points)
  - Can remove books
  - Checks if book exists
  - Handles issued books
  - Updates collection

✓ Issue book feature works (5 points)
  - Checks book availability
  - Checks member exists
  - Updates book status
  - Records issue date
  - Links book to member

✓ Return book feature works (5 points)
  - Checks if book is issued
  - Updates book status
  - Calculates fine if late
  - Removes book-member link
  - Updates availability

✓ Search functionality works (4 points)
  - Search by ISBN
  - Search by title
  - Search by author
  - Returns correct results

✓ Display all books works (2 points)
  - Shows all books
  - Formatted output
  - Handles empty list

✓ Display available books works (2 points)
  - Shows only available books
  - Correct filtering
  - Formatted output`,
          points: 25,
          difficulty: 'hard',
          keywords: ['functionality', 'add', 'remove', 'issue', 'return', 'search', 'display', 'features']
        },
        {
          id: 'q7',
          type: 'short',
          question: 'Code Quality (10 points): Evaluate code readability, proper indentation, logical flow, and no redundant code.',
          sampleAnswer: `Evaluation Checklist:
✓ Code is readable and well-formatted (3 points)
  - Consistent style
  - Meaningful variable names
  - Clear method names
  - Appropriate comments

✓ Proper indentation (2 points)
  - Consistent indentation (2 or 4 spaces)
  - Proper nesting
  - Aligned braces

✓ Logical flow (2 points)
  - Methods do one thing
  - Clear execution path
  - No spaghetti code
  - Easy to follow

✓ No redundant code (3 points)
  - No code duplication
  - Reusable methods
  - DRY principle followed
  - No dead code`,
          points: 10,
          difficulty: 'medium',
          keywords: ['code quality', 'readability', 'indentation', 'logical flow', 'DRY', 'clean code']
        },
        {
          id: 'q8',
          type: 'short',
          question: 'Testing (5 points): Evaluate if all features are tested and edge cases are handled.',
          sampleAnswer: `Evaluation Checklist:
✓ All features tested (3 points)
  - Add book tested
  - Remove book tested
  - Issue book tested
  - Return book tested
  - Search tested
  - Display tested

✓ Edge cases handled (2 points)
  - Empty library
  - Invalid input
  - Null values
  - Duplicate operations
  - Boundary conditions
  - Concurrent operations`,
          points: 5,
          difficulty: 'medium',
          keywords: ['testing', 'edge cases', 'validation', 'test coverage', 'boundary']
        },
        {
          id: 'q9',
          type: 'short',
          question: 'Documentation (5 points): Evaluate class-level comments, complex method comments, and README with instructions.',
          sampleAnswer: `Evaluation Checklist:
✓ Class-level comments (2 points)
  - Purpose of class explained
  - Author information
  - Version/date
  - Usage examples

✓ Complex method comments (2 points)
  - Method purpose
  - Parameters explained
  - Return value explained
  - Exceptions documented

✓ README with instructions (1 point)
  - How to compile
  - How to run
  - Features list
  - Sample usage

Example README:
# Library Management System

## Features
- Add/Remove books
- Issue/Return books
- Search books
- View all/available books

## How to Run
1. Compile: javac -d bin src/com/library/**/*.java
2. Run: java -cp bin com.library.main.Main

## Requirements
- Java 8 or higher`,
          points: 5,
          difficulty: 'easy',
          keywords: ['documentation', 'comments', 'README', 'javadoc', 'instructions']
        }
      ]
    }
  ]
};