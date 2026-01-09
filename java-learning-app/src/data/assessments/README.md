# Java Assessments - Organization Guide

## 📁 Folder Structure

```
assessments/
├── index.js                 # Main entry point with all exports
├── README.md               # This file
└── java/
    ├── week1/
    │   ├── index.js        # Week 1 assessments export
    │   ├── day1.js
    │   ├── day2.js
    │   ├── day3.js
    │   ├── day4.js
    │   ├── day5.js
    │   ├── day6.js
    │   └── day7.js
    ├── week2/
    │   ├── index.js        # Week 2 assessments export
    │   ├── day8.js
    │   ├── day9.js
    │   ├── day10.js
    │   ├── day11.js
    │   ├── day12.js
    │   ├── day13.js
    │   └── day14.js
    ├── week3/
    │   ├── index.js        # Week 3 assessments export
    │   ├── day15.js
    │   ├── day16.js
    │   ├── day17.js
    │   ├── day18.js
    │   ├── day19.js
    │   ├── day20.js
    │   └── day21.js
    └── week4/
        ├── index.js        # Week 4 assessments export
        ├── day22.js
        ├── day23.js
        ├── day24.js
        ├── day25.js
        ├── day26.js
        ├── day27.js
        ├── day28.js
        ├── day29.js
        └── day30.js
```

## 🗓️ Week-Based Organization

### Week 1: Java Fundamentals (Days 1-7)
**Topics**: Setup, Variables, Operators, Control Flow, Loops, Arrays
- **Days**: 7
- **Questions**: 90
- **Points**: 297

**Daily Topics**:
1. Introduction & Setup
2. Variables & Data Types
3. Operators & Expressions
4. Control Flow - Conditional Statements
5. Control Flow - Loops
6. Arrays - Part 1
7. Arrays - Part 2 & Week 1 Review

### Week 2: Object-Oriented Programming (Days 8-14)
**Topics**: Classes, Objects, Constructors, Methods, Encapsulation, Inheritance, Polymorphism, Abstraction
- **Days**: 7
- **Questions**: 93
- **Points**: 318

**Daily Topics**:
8. Introduction to OOP & Classes
9. Constructors & this Keyword
10. Methods & Method Overloading
11. Encapsulation & Access Modifiers
12. Inheritance
13. Polymorphism
14. Abstraction - Abstract Classes & Interfaces & Week 2 Review

### Week 3: Advanced Java Concepts (Days 15-21)
**Topics**: Strings, Packages, Exception Handling, Collections, Generics
- **Days**: 7
- **Questions**: 93
- **Points**: 318

**Daily Topics**:
15. Strings
16. Packages & Static Keyword
17. Exception Handling - Part 1
18. Exception Handling - Part 2
19. Collections Framework - List & Set
20. Collections Framework - Map & Utilities
21. Generics & Week 3 Review

### Week 4: Modern Java & Final Project (Days 22-30)
**Topics**: File Handling, Java 8 Features, Date-Time API, Wrapper Classes, Multithreading, Inner Classes, Enums
- **Days**: 9
- **Questions**: 113
- **Points**: 460

**Daily Topics**:
22. File Handling - Part 1
23. File Handling - Part 2
24. Java 8 Features - Lambda & Streams
25. Date & Time API
26. Wrapper Classes & Autoboxing
27. Multithreading Basics
28. Inner Classes & Enums
29. Comprehensive Review
30. Final Project Assessment

## 📚 Usage Examples

### Import Individual Day Assessment
```javascript
import { getAssessment } from './data/assessments';

// Get a specific day's assessment
const day1Assessment = getAssessment('java-day1', 'quick');
const day15Assessment = getAssessment('java-day15', 'full');
```

### Import Week-Based Assessments
```javascript
import { getAssessmentsByWeek, week1Info } from './data/assessments';

// Get all assessments for a specific week
const week1 = getAssessmentsByWeek(1);
console.log(week1.info.title); // "Java Fundamentals"
console.log(week1.assessments); // Object with all week 1 assessments

// Access week information
console.log(week1Info.topics); // Array of topics for week 1
```

### Get Week for Specific Day
```javascript
import { getWeekForDay } from './data/assessments';

const weekNumber = getWeekForDay(15); // Returns 3 (Week 3)
const weekNumber2 = getWeekForDay(25); // Returns 4 (Week 4)
```

### Get All Weeks Information
```javascript
import { getAllWeeksInfo } from './data/assessments';

const allWeeks = getAllWeeksInfo();
allWeeks.forEach(week => {
  console.log(`Week ${week.weekNumber}: ${week.title}`);
  console.log(`Days: ${week.days}, Questions: ${week.totalQuestions}`);
});
```

### Import Specific Week
```javascript
import { week1Assessments, week1Info } from './data/assessments';
import { week4Assessments, week4Info } from './data/assessments';

// Use week-specific assessments
const day1 = week1Assessments['java-day1'];
const day22 = week4Assessments['java-day22'];
```

## 🎯 Assessment Modes

All assessments support three modes:

### Quick Mode
- **Duration**: 15-18 minutes
- **Questions**: 8-10 questions
- **Purpose**: Quick review and practice

### Full Mode
- **Duration**: 30-35 minutes
- **Questions**: 12-14 questions
- **Purpose**: Comprehensive assessment

### Exam Mode
- **Duration**: 45-60 minutes
- **Questions**: All questions
- **Features**: 
  - Strict monitoring
  - Fullscreen required
  - Tab switching detection
  - Time tracking

## 📊 Statistics

### Overall Course Statistics
- **Total Weeks**: 4
- **Total Days**: 30
- **Total Assessments**: 30
- **Total Questions**: 386
- **Total Points**: 1,392

### Week-by-Week Breakdown
| Week | Days | Questions | Points | Topics |
|------|------|-----------|--------|--------|
| 1 | 7 | 90 | 297 | Fundamentals |
| 2 | 7 | 93 | 318 | OOP |
| 3 | 7 | 93 | 318 | Advanced Concepts |
| 4 | 9 | 113 | 460 | Modern Java & Project |

## 🔧 Helper Functions

### Available Functions

1. **`getAssessment(dayId, mode)`**
   - Get assessment for specific day with mode
   - Returns flattened questions

2. **`getAssessmentWithSections(dayId, mode)`**
   - Get assessment with section structure
   - Useful for UI rendering

3. **`hasAssessment(dayId)`**
   - Check if assessment exists

4. **`getAssessmentsByWeek(weekNumber)`**
   - Get all assessments for a week
   - Returns assessments object and week info

5. **`getAllWeeksInfo()`**
   - Get information for all weeks
   - Returns array of week info objects

6. **`getWeekForDay(dayNumber)`**
   - Get week number for a specific day
   - Returns week number (1-4)

7. **`getAssessmentsByCourse(course)`**
   - Get all assessments for a course
   - Currently supports 'java'

## 🎨 Benefits of Week-Based Organization

1. **Better Organization**: Logical grouping by learning phases
2. **Easy Navigation**: Find assessments by week or day
3. **Progress Tracking**: Track completion by week
4. **Flexible Access**: Use week-based or day-based imports
5. **Metadata Rich**: Week info includes topics, statistics
6. **Backward Compatible**: Existing day-based imports still work

## 📝 Adding New Assessments

### For New Days
1. Create `dayXX.js` in `java/` folder
2. Add import to appropriate `weekX.js` file
3. Add to week assessments object
4. Update week info statistics

### For New Weeks
1. Create `weekX.js` file
2. Import all day files for that week
3. Export week assessments and info
4. Add to main `index.js`
5. Update helper functions if needed

## 🚀 Best Practices

1. **Use Week-Based Access** for UI components showing weekly progress
2. **Use Day-Based Access** for individual assessment pages
3. **Cache Week Info** to avoid repeated imports
4. **Validate Day Numbers** before calling `getWeekForDay()`
5. **Handle Null Returns** from helper functions gracefully

## 📖 Documentation

For more details, see:
- [`WEEK1_ASSESSMENTS_COMPLETE.md`](../../../../WEEK1_ASSESSMENTS_COMPLETE.md)
- [`WEEK2_ASSESSMENTS_COMPLETE.md`](../../../../WEEK2_ASSESSMENTS_COMPLETE.md)
- [`WEEK3_ASSESSMENTS_COMPLETE.md`](../../../../WEEK3_ASSESSMENTS_COMPLETE.md)
- [`WEEK4_ASSESSMENTS_COMPLETE.md`](../../../../WEEK4_ASSESSMENTS_COMPLETE.md)

## 🎓 Learning Path

```
Week 1: Fundamentals → Week 2: OOP → Week 3: Advanced → Week 4: Modern Java
   ↓                      ↓              ↓                  ↓
Days 1-7            Days 8-14      Days 15-21         Days 22-30
   ↓                      ↓              ↓                  ↓
Review              Review         Review             Final Project
```

---

**Last Updated**: January 8, 2026
**Version**: 1.0.0
**Status**: ✅ Complete (30/30 assessments)