### Day 27: Date & Time API

---

#### Exercise 1: Old Date and Calendar APIs - Understanding the Legacy (15 minutes)

**What you'll learn:** Working with legacy java.util.Date and Calendar classes (important for maintaining older code)

**Create class: `LegacyDateDemo`**

**Concept:** Before Java 8, Date and Calendar classes were used for date/time operations. They have limitations but you'll encounter them in legacy code.

**Problems with old API:**
- Date class is mutable (not thread-safe)
- Confusing month numbering (0-11 instead of 1-12)
- Year starts from 1900
- Limited operations
- Poor timezone support

**Step-by-Step:**

```java
import java.util.Date;
import java.util.Calendar;
import java.text.SimpleDateFormat;

public class LegacyDateDemo {
    public static void main(String[] args) {
        System.out.println("╔════════════════════════════════════╗");
        System.out.println("║   LEGACY DATE & CALENDAR API      ║");
        System.out.println("╚════════════════════════════════════╝\n");

        // Part 1: java.util.Date
        demonstrateDate();

        // Part 2: java.util.Calendar
        demonstrateCalendar();

        // Part 3: Formatting dates
        demonstrateFormatting();

        System.out.println("\n════════════════════════════════════");
    }

    static void demonstrateDate() {
        System.out.println("=== JAVA.UTIL.DATE ===\n");

        // Create current date
        Date now = new Date();
        System.out.println("Current Date: " + now);

        // Get timestamp (milliseconds since Jan 1, 1970)
        long timestamp = now.getTime();
        System.out.println("Timestamp: " + timestamp + " ms");

        // Create date from timestamp
        Date customDate = new Date(1700000000000L);
        System.out.println("Custom Date: " + customDate);

        // Compare dates
        Date date1 = new Date();
        Date date2 = new Date(System.currentTimeMillis() - 86400000); // Yesterday

        System.out.println("\nDate Comparison:");
        System.out.println("date1 after date2? " + date1.after(date2));
        System.out.println("date1 before date2? " + date1.before(date2));
        System.out.println("date1 equals date2? " + date1.equals(date2));

        // Problem: Direct methods are deprecated
        // date.getYear(), getMonth(), getDate() - all deprecated!
    }

    static void demonstrateCalendar() {
        System.out.println("\n=== JAVA.UTIL.CALENDAR ===\n");

        // Get calendar instance
        Calendar calendar = Calendar.getInstance();

        System.out.println("Current Date/Time Components:");
        System.out.println("Year: " + calendar.get(Calendar.YEAR));
        System.out.println("Month: " + (calendar.get(Calendar.MONTH) + 1)); // 0-based!
        System.out.println("Day of Month: " + calendar.get(Calendar.DAY_OF_MONTH));
        System.out.println("Hour: " + calendar.get(Calendar.HOUR_OF_DAY));
        System.out.println("Minute: " + calendar.get(Calendar.MINUTE));
        System.out.println("Second: " + calendar.get(Calendar.SECOND));

        // Set specific date
        calendar.set(2025, Calendar.JANUARY, 15); // Note: Month is 0-based!
        System.out.println("\nSet Date: " + calendar.getTime());

        // Add/subtract days
        calendar.add(Calendar.DAY_OF_MONTH, 10);
        System.out.println("After adding 10 days: " + calendar.getTime());

        calendar.add(Calendar.MONTH, -2);
        System.out.println("After subtracting 2 months: " + calendar.getTime());

        // Get day of week
        int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);
        String[] days = {"", "Sunday", "Monday", "Tuesday", "Wednesday",
                         "Thursday", "Friday", "Saturday"};
        System.out.println("Day of week: " + days[dayOfWeek]);
    }

    static void demonstrateFormatting() {
        System.out.println("\n=== DATE FORMATTING ===\n");

        Date now = new Date();

        // Different format patterns
        SimpleDateFormat format1 = new SimpleDateFormat("dd/MM/yyyy");
        System.out.println("Format 1: " + format1.format(now));

        SimpleDateFormat format2 = new SimpleDateFormat("MM-dd-yyyy HH:mm:ss");
        System.out.println("Format 2: " + format2.format(now));

        SimpleDateFormat format3 = new SimpleDateFormat("EEEE, MMMM dd, yyyy");
        System.out.println("Format 3: " + format3.format(now));

        SimpleDateFormat format4 = new SimpleDateFormat("hh:mm a");
        System.out.println("Format 4: " + format4.format(now));

        // Parsing dates
        try {
            SimpleDateFormat parser = new SimpleDateFormat("yyyy-MM-dd");
            Date parsedDate = parser.parse("2025-12-25");
            System.out.println("\nParsed Date: " + parsedDate);
        } catch (Exception e) {
            System.out.println("Error parsing date: " + e.getMessage());
        }
    }
}
```

**Expected Output:**
```
╔════════════════════════════════════╗
║   LEGACY DATE & CALENDAR API      ║
╚════════════════════════════════════╝

=== JAVA.UTIL.DATE ===

Current Date: Thu Jan 23 10:30:45 PST 2026
Timestamp: 1737661845000 ms
Custom Date: Tue Nov 14 16:13:20 PST 2023

Date Comparison:
date1 after date2? true
date1 before date2? false
date1 equals date2? false

=== JAVA.UTIL.CALENDAR ===

Current Date/Time Components:
Year: 2026
Month: 1
Day of Month: 23
Hour: 10
Minute: 30
Second: 45

Set Date: Wed Jan 15 10:30:45 PST 2025
After adding 10 days: Sat Jan 25 10:30:45 PST 2025
After subtracting 2 months: Tue Nov 25 10:30:45 PST 2024
Day of week: Tuesday

=== DATE FORMATTING ===

Format 1: 23/01/2026
Format 2: 01-23-2026 10:30:45
Format 3: Thursday, January 23, 2026
Format 4: 10:30 AM

Parsed Date: Wed Dec 25 00:00:00 PST 2025

════════════════════════════════════
```

**💡 Common Format Patterns:**

| Pattern | Meaning | Example |
|---------|---------|---------|
| `yyyy` | 4-digit year | 2026 |
| `yy` | 2-digit year | 26 |
| `MM` | Month (01-12) | 01 |
| `MMM` | Month name short | Jan |
| `MMMM` | Month name full | January |
| `dd` | Day of month | 23 |
| `EEE` | Day name short | Thu |
| `EEEE` | Day name full | Thursday |
| `HH` | Hour (00-23) | 14 |
| `hh` | Hour (01-12) | 02 |
| `mm` | Minutes | 30 |
| `ss` | Seconds | 45 |
| `a` | AM/PM | PM |

**✅ Success Criteria:**
- [ ] Date object created and displayed
- [ ] Calendar operations work correctly
- [ ] Month numbering understood (0-11)
- [ ] Date formatting demonstrated
- [ ] Date parsing works correctly

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|----------------|-------------|
| `calendar.set(2025, 1, 15)` for January | Month is 0-based | Use `Calendar.JANUARY` or 0 |
| Using deprecated Date methods | Will cause warnings | Use Calendar instead |
| Not handling ParseException | Parsing can fail | Always try-catch when parsing |
| Assuming thread-safety | Date/Calendar are mutable | Don't share across threads |

**🎯 Challenges:**
1. Calculate your age in days using Calendar
2. Find what day of the week you were born
3. Calculate days until your next birthday
4. Create a method to check if a year is a leap year
5. Display current time in different timezones
6. Build a simple countdown timer using Date

---

#### Exercise 2: Java 8 LocalDate - Working with Dates (20 minutes)

**What you'll learn:** Using the modern LocalDate class for date operations (Java 8+)

**Create class: `LocalDateDemo`**

**Concept:** `LocalDate` represents a date without time or timezone. It's immutable and thread-safe. This is the RECOMMENDED way to work with dates in modern Java.

**LocalDate features:**
- Immutable (thread-safe)
- Clear API
- No timezone confusion
- Rich set of operations
- ISO-8601 calendar system

**Step-by-Step:**

```java
import java.time.LocalDate;
import java.time.Month;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

public class LocalDateDemo {
    public static void main(String[] args) {
        System.out.println("╔════════════════════════════════════╗");
        System.out.println("║     JAVA 8 LOCALDATE API          ║");
        System.out.println("╚════════════════════════════════════╝\n");

        // Creating LocalDate objects
        demonstrateCreation();

        // Getting date components
        demonstrateComponents();

        // Date arithmetic
        demonstrateArithmetic();

        // Date comparison
        demonstrateComparison();

        // Date formatting
        demonstrateFormatting();

        // Practical examples
        practicalExamples();

        System.out.println("\n════════════════════════════════════");
    }

    static void demonstrateCreation() {
        System.out.println("=== CREATING LOCALDATE ===\n");

        // Current date
        LocalDate today = LocalDate.now();
        System.out.println("Today: " + today);

        // Specific date (year, month, day)
        LocalDate specificDate1 = LocalDate.of(2025, 12, 25);
        System.out.println("Christmas 2025: " + specificDate1);

        // Using Month enum (more readable)
        LocalDate specificDate2 = LocalDate.of(2025, Month.JULY, 4);
        System.out.println("Independence Day 2025: " + specificDate2);

        // Parse from string (ISO format: yyyy-MM-dd)
        LocalDate parsedDate = LocalDate.parse("2026-01-01");
        System.out.println("Parsed Date: " + parsedDate);

        // Year and day of year
        LocalDate dayOfYear = LocalDate.ofYearDay(2025, 100);
        System.out.println("100th day of 2025: " + dayOfYear);
    }

    static void demonstrateComponents() {
        System.out.println("\n=== DATE COMPONENTS ===\n");

        LocalDate date = LocalDate.of(2025, 3, 15);
        System.out.println("Date: " + date);
        System.out.println("─────────────────────────────────");

        // Get individual components
        System.out.println("Year: " + date.getYear());
        System.out.println("Month: " + date.getMonth()); // Returns Month enum
        System.out.println("Month Value: " + date.getMonthValue()); // 1-12
        System.out.println("Day of Month: " + date.getDayOfMonth());
        System.out.println("Day of Week: " + date.getDayOfWeek());
        System.out.println("Day of Year: " + date.getDayOfYear());

        // Boolean checks
        System.out.println("\nChecks:");
        System.out.println("Is Leap Year? " + date.isLeapYear());
        System.out.println("Length of Month: " + date.lengthOfMonth() + " days");
        System.out.println("Length of Year: " + date.lengthOfYear() + " days");
    }

    static void demonstrateArithmetic() {
        System.out.println("\n=== DATE ARITHMETIC ===\n");

        LocalDate date = LocalDate.of(2025, 1, 15);
        System.out.println("Start Date: " + date);
        System.out.println("─────────────────────────────────");

        // Adding
        LocalDate plusDays = date.plusDays(10);
        System.out.println("Plus 10 days: " + plusDays);

        LocalDate plusWeeks = date.plusWeeks(2);
        System.out.println("Plus 2 weeks: " + plusWeeks);

        LocalDate plusMonths = date.plusMonths(3);
        System.out.println("Plus 3 months: " + plusMonths);

        LocalDate plusYears = date.plusYears(1);
        System.out.println("Plus 1 year: " + plusYears);

        // Subtracting
        LocalDate minusDays = date.minusDays(5);
        System.out.println("\nMinus 5 days: " + minusDays);

        LocalDate minusMonths = date.minusMonths(1);
        System.out.println("Minus 1 month: " + minusMonths);

        // Complex operations
        LocalDate complex = date.plusDays(10).plusMonths(2).minusYears(1);
        System.out.println("\nComplex (+10d +2m -1y): " + complex);
    }

    static void demonstrateComparison() {
        System.out.println("\n=== DATE COMPARISON ===\n");

        LocalDate date1 = LocalDate.of(2025, 6, 15);
        LocalDate date2 = LocalDate.of(2025, 8, 20);
        LocalDate date3 = LocalDate.of(2025, 6, 15);

        System.out.println("Date 1: " + date1);
        System.out.println("Date 2: " + date2);
        System.out.println("Date 3: " + date3);
        System.out.println("─────────────────────────────────");

        // Comparison methods
        System.out.println("date1.isBefore(date2): " + date1.isBefore(date2));
        System.out.println("date1.isAfter(date2): " + date1.isAfter(date2));
        System.out.println("date1.isEqual(date3): " + date1.isEqual(date3));
        System.out.println("date1.equals(date3): " + date1.equals(date3));

        // Calculate period between dates
        Period period = Period.between(date1, date2);
        System.out.println("\nPeriod between date1 and date2:");
        System.out.println("  " + period.getMonths() + " months, " +
                          period.getDays() + " days");

        // Calculate days between (using ChronoUnit)
        long daysBetween = ChronoUnit.DAYS.between(date1, date2);
        System.out.println("  Total days: " + daysBetween);

        // Calculate years between
        long yearsBetween = ChronoUnit.YEARS.between(date1, date2);
        System.out.println("  Years: " + yearsBetween);
    }

    static void demonstrateFormatting() {
        System.out.println("\n=== DATE FORMATTING ===\n");

        LocalDate date = LocalDate.of(2025, 3, 15);

        // ISO format (default)
        System.out.println("ISO Format: " + date);

        // Predefined formatters
        System.out.println("BASIC_ISO_DATE: " +
            date.format(DateTimeFormatter.BASIC_ISO_DATE));

        // Custom formats
        DateTimeFormatter formatter1 = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        System.out.println("Format 1: " + date.format(formatter1));

        DateTimeFormatter formatter2 = DateTimeFormatter.ofPattern("MMMM dd, yyyy");
        System.out.println("Format 2: " + date.format(formatter2));

        DateTimeFormatter formatter3 = DateTimeFormatter.ofPattern("E, MMM dd yyyy");
        System.out.println("Format 3: " + date.format(formatter3));

        DateTimeFormatter formatter4 = DateTimeFormatter.ofPattern("yyyy-MM-dd (EEEE)");
        System.out.println("Format 4: " + date.format(formatter4));

        // Parsing custom formats
        DateTimeFormatter parser = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        LocalDate parsed = LocalDate.parse("25-12-2025", parser);
        System.out.println("\nParsed Date: " + parsed);
    }

    static void practicalExamples() {
        System.out.println("\n=== PRACTICAL EXAMPLES ===\n");

        LocalDate today = LocalDate.now();

        // Example 1: First day of current month
        LocalDate firstDayOfMonth = today.withDayOfMonth(1);
        System.out.println("First day of month: " + firstDayOfMonth);

        // Example 2: Last day of current month
        LocalDate lastDayOfMonth = today.withDayOfMonth(today.lengthOfMonth());
        System.out.println("Last day of month: " + lastDayOfMonth);

        // Example 3: First day of next month
        LocalDate firstDayNextMonth = today.plusMonths(1).withDayOfMonth(1);
        System.out.println("First day of next month: " + firstDayNextMonth);

        // Example 4: Same day last year
        LocalDate sameDay LastYear = today.minusYears(1);
        System.out.println("Same day last year: " + sameDayLastYear);

        // Example 5: Calculate age from birthdate
        LocalDate birthDate = LocalDate.of(1995, 5, 20);
        Period age = Period.between(birthDate, today);
        System.out.println("\nAge Calculation:");
        System.out.println("Birth Date: " + birthDate);
        System.out.println("Age: " + age.getYears() + " years, " +
                          age.getMonths() + " months, " +
                          age.getDays() + " days");

        // Example 6: Days until specific event
        LocalDate event = LocalDate.of(2026, 12, 25);
        long daysUntil = ChronoUnit.DAYS.between(today, event);
        System.out.println("\nDays until Christmas 2026: " + daysUntil);
    }
}
```

**Expected Output:**
```
╔════════════════════════════════════╗
║     JAVA 8 LOCALDATE API          ║
╚════════════════════════════════════╝

=== CREATING LOCALDATE ===

Today: 2026-01-23
Christmas 2025: 2025-12-25
Independence Day 2025: 2025-07-04
Parsed Date: 2026-01-01
100th day of 2025: 2025-04-10

=== DATE COMPONENTS ===

Date: 2025-03-15
─────────────────────────────────
Year: 2025
Month: MARCH
Month Value: 3
Day of Month: 15
Day of Week: SATURDAY
Day of Year: 74

Checks:
Is Leap Year? false
Length of Month: 31 days
Length of Year: 365 days

=== DATE ARITHMETIC ===

Start Date: 2025-01-15
─────────────────────────────────
Plus 10 days: 2025-01-25
Plus 2 weeks: 2025-01-29
Plus 3 months: 2025-04-15
Plus 1 year: 2026-01-15

Minus 5 days: 2025-01-10
Minus 1 month: 2024-12-15

Complex (+10d +2m -1y): 2024-03-25

=== DATE COMPARISON ===

Date 1: 2025-06-15
Date 2: 2025-08-20
Date 3: 2025-06-15
─────────────────────────────────
date1.isBefore(date2): true
date1.isAfter(date2): false
date1.isEqual(date3): true
date1.equals(date3): true

Period between date1 and date2:
  2 months, 5 days
  Total days: 66
  Years: 0

=== DATE FORMATTING ===

ISO Format: 2025-03-15
BASIC_ISO_DATE: 20250315
Format 1: 15/03/2025
Format 2: March 15, 2025
Format 3: Sat, Mar 15 2025
Format 4: 2025-03-15 (Saturday)

Parsed Date: 2025-12-25

=== PRACTICAL EXAMPLES ===

First day of month: 2026-01-01
Last day of month: 2026-01-31
First day of next month: 2026-02-01
Same day last year: 2025-01-23

Age Calculation:
Birth Date: 1995-05-20
Age: 30 years, 8 months, 3 days

Days until Christmas 2026: 336

════════════════════════════════════
```

**💡 Key LocalDate Methods:**

| Category | Methods |
|----------|---------|
| **Creation** | `now()`, `of()`, `parse()` |
| **Get Components** | `getYear()`, `getMonth()`, `getDayOfMonth()` |
| **Add/Subtract** | `plusDays()`, `minusMonths()`, `plusYears()` |
| **Compare** | `isBefore()`, `isAfter()`, `isEqual()` |
| **Modify** | `withYear()`, `withMonth()`, `withDayOfMonth()` |
| **Calculate** | `until()`, `Period.between()`, `ChronoUnit.between()` |

**✅ Success Criteria:**
- [ ] LocalDate objects created using different methods
- [ ] Date components extracted correctly
- [ ] Date arithmetic operations work
- [ ] Date comparisons performed correctly
- [ ] Custom formatting and parsing work
- [ ] Practical examples demonstrate real-world usage

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|----------------|-------------|
| `date.plusDays(10)` without assignment | LocalDate is immutable | `date = date.plusDays(10)` |
| Using `getMonth()` as int | Returns Month enum | Use `getMonthValue()` for int |
| Wrong format pattern | Pattern doesn't match string | Check pattern carefully |
| Modifying original date | Trying to change immutable object | Always assign result to variable |

**🎯 Challenges:**
1. Calculate the number of weekends in current month
2. Find all Fridays in a given month
3. Calculate retirement date (65 years from birthdate)
4. Build a method to check if a date falls on a weekend
5. Calculate project deadline (90 working days from start, excluding weekends)
6. Create a birthday reminder system
7. Build a date range validator (check if date is within range)

---

#### Exercise 3: LocalTime & LocalDateTime - Complete Date-Time Operations (25 minutes)

**What you'll learn:** Working with time (LocalTime) and combined date-time (LocalDateTime)

**Create class: `LocalTimeDemo`**

**Concept:**
- `LocalTime` = Time without date or timezone
- `LocalDateTime` = Date + Time without timezone
- Both are immutable and thread-safe

**Step-by-Step:**

```java
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

public class LocalTimeDemo {
    public static void main(String[] args) {
        System.out.println("╔════════════════════════════════════════════════════╗");
        System.out.println("║   LOCALTIME & LOCALDATETIME DEMONSTRATION         ║");
        System.out.println("╚════════════════════════════════════════════════════╝\n");

        // Part 1: LocalTime
        demonstrateLocalTime();

        // Part 2: LocalDateTime
        demonstrateLocalDateTime();

        // Part 3: Practical Applications
        practicalApplications();

        System.out.println("\n═══════════════════════════════════════════════════════");
    }

    static void demonstrateLocalTime() {
        System.out.println("=== LOCALTIME OPERATIONS ===\n");

        // Creating LocalTime
        LocalTime now = LocalTime.now();
        System.out.println("Current Time: " + now);

        LocalTime specificTime = LocalTime.of(14, 30);  // 2:30 PM
        System.out.println("Specific Time: " + specificTime);

        LocalTime preciseTime = LocalTime.of(9, 15, 30);  // 9:15:30 AM
        System.out.println("Precise Time: " + preciseTime);

        LocalTime parsedTime = LocalTime.parse("18:45:00");
        System.out.println("Parsed Time: " + parsedTime);

        // Time components
        System.out.println("\nTime Components:");
        System.out.println("Hour: " + now.getHour());
        System.out.println("Minute: " + now.getMinute());
        System.out.println("Second: " + now.getSecond());
        System.out.println("Nano: " + now.getNano());

        // Time arithmetic
        LocalTime time = LocalTime.of(10, 0);
        System.out.println("\nTime Arithmetic:");
        System.out.println("Start: " + time);
        System.out.println("Plus 2 hours: " + time.plusHours(2));
        System.out.println("Plus 45 minutes: " + time.plusMinutes(45));
        System.out.println("Minus 30 seconds: " + time.minusSeconds(30));

        // Time comparison
        LocalTime time1 = LocalTime.of(9, 0);
        LocalTime time2 = LocalTime.of(14, 30);
        System.out.println("\nTime Comparison:");
        System.out.println("9:00 is before 14:30? " + time1.isBefore(time2));
        System.out.println("9:00 is after 14:30? " + time1.isAfter(time2));

        // Duration between times
        long minutesBetween = ChronoUnit.MINUTES.between(time1, time2);
        System.out.println("Minutes between: " + minutesBetween);

        // Formatting
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("hh:mm:ss a");
        System.out.println("\nFormatted Time: " + time2.format(timeFormatter));
    }

    static void demonstrateLocalDateTime() {
        System.out.println("\n=== LOCALDATETIME OPERATIONS ===\n");

        // Creating LocalDateTime
        LocalDateTime now = LocalDateTime.now();
        System.out.println("Current DateTime: " + now);

        LocalDateTime specific = LocalDateTime.of(2025, 12, 25, 10, 30);
        System.out.println("Christmas Morning 2025: " + specific);

        // Combining LocalDate and LocalTime
        LocalDate date = LocalDate.of(2025, 6, 15);
        LocalTime time = LocalTime.of(14, 30);
        LocalDateTime combined = LocalDateTime.of(date, time);
        System.out.println("Combined: " + combined);

        // Parsing
        LocalDateTime parsed = LocalDateTime.parse("2025-12-31T23:59:59");
        System.out.println("Parsed: " + parsed);

        // Get components
        System.out.println("\nDateTime Components:");
        System.out.println("Date: " + now.toLocalDate());
        System.out.println("Time: " + now.toLocalTime());
        System.out.println("Year: " + now.getYear());
        System.out.println("Month: " + now.getMonth());
        System.out.println("Day: " + now.getDayOfMonth());
        System.out.println("Hour: " + now.getHour());
        System.out.println("Minute: " + now.getMinute());

        // DateTime arithmetic
        LocalDateTime dt = LocalDateTime.of(2025, 1, 1, 0, 0);
        System.out.println("\nDateTime Arithmetic:");
        System.out.println("Start: " + dt);
        System.out.println("Plus 7 days: " + dt.plusDays(7));
        System.out.println("Plus 3 hours 30 mins: " +
                          dt.plusHours(3).plusMinutes(30));
        System.out.println("Plus 1 month: " + dt.plusMonths(1));

        // Modifying components
        LocalDateTime modified = dt.withYear(2026)
                                  .withMonth(6)
                                  .withDayOfMonth(15)
                                  .withHour(14)
                                  .withMinute(30);
        System.out.println("\nModified: " + modified);

        // Formatting
        DateTimeFormatter formatter1 = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
        System.out.println("\nFormat 1: " + now.format(formatter1));

        DateTimeFormatter formatter2 = DateTimeFormatter.ofPattern("EEEE, MMMM dd, yyyy 'at' hh:mm a");
        System.out.println("Format 2: " + now.format(formatter2));
    }

    static void practicalApplications() {
        System.out.println("\n=== PRACTICAL APPLICATIONS ===\n");

        // Application 1: Meeting scheduler
        System.out.println("--- Meeting Scheduler ---");
        LocalDateTime meetingStart = LocalDateTime.of(2026, 1, 25, 10, 0);
        LocalDateTime meetingEnd = meetingStart.plusHours(2);

        System.out.println("Meeting: " +
            meetingStart.format(DateTimeFormatter.ofPattern("MMM dd, yyyy 'at' hh:mm a")));
        System.out.println("Duration: 2 hours");
        System.out.println("Ends: " +
            meetingEnd.format(DateTimeFormatter.ofPattern("hh:mm a")));

        // Application 2: Timestamp for logging
        System.out.println("\n--- Log Timestamp ---");
        LocalDateTime logTime = LocalDateTime.now();
        DateTimeFormatter logFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");
        System.out.println("[" + logTime.format(logFormatter) + "] Application started");
        System.out.println("[" + logTime.plusSeconds(5).format(logFormatter) + "] User logged in");

        // Application 3: Business hours checker
        System.out.println("\n--- Business Hours Checker ---");
        LocalTime businessStart = LocalTime.of(9, 0);
        LocalTime businessEnd = LocalTime.of(17, 0);
        LocalTime currentTime = LocalTime.now();

        boolean isBusinessHours = currentTime.isAfter(businessStart) &&
                                 currentTime.isBefore(businessEnd);
        System.out.println("Business Hours: 9:00 AM - 5:00 PM");
        System.out.println("Current Time: " + currentTime.format(
            DateTimeFormatter.ofPattern("hh:mm a")));
        System.out.println("Is Business Hours? " + isBusinessHours);

        // Application 4: Countdown timer
        System.out.println("\n--- Event Countdown ---");
        LocalDateTime event = LocalDateTime.of(2026, 12, 25, 0, 0);
        LocalDateTime now = LocalDateTime.now();

        long daysUntil = ChronoUnit.DAYS.between(now, event);
        long hoursUntil = ChronoUnit.HOURS.between(now, event) % 24;
        long minutesUntil = ChronoUnit.MINUTES.between(now, event) % 60;

        System.out.println("Time until Christmas 2026:");
        System.out.println(daysUntil + " days, " + hoursUntil + " hours, " +
                          minutesUntil + " minutes");

        // Application 5: Shift work calculator
        System.out.println("\n--- Shift Work Calculator ---");
        LocalDateTime shiftStart = LocalDateTime.of(2026, 1, 23, 8, 0);
        LocalDateTime shiftEnd = LocalDateTime.of(2026, 1, 23, 16, 30);

        Duration shiftDuration = Duration.between(shiftStart, shiftEnd);
        long totalHours = shiftDuration.toHours();
        long totalMinutes = shiftDuration.toMinutes() % 60;

        System.out.println("Shift Start: " + shiftStart.toLocalTime());
        System.out.println("Shift End: " + shiftEnd.toLocalTime());
        System.out.println("Total Hours: " + totalHours + " hours " + totalMinutes + " minutes");
    }
}
```

**Expected Output:**
```
╔════════════════════════════════════════════════════╗
║   LOCALTIME & LOCALDATETIME DEMONSTRATION         ║
╚════════════════════════════════════════════════════╝

=== LOCALTIME OPERATIONS ===

Current Time: 10:30:45.123456789
Specific Time: 14:30
Precise Time: 09:15:30
Parsed Time: 18:45:00

Time Components:
Hour: 10
Minute: 30
Second: 45
Nano: 123456789

Time Arithmetic:
Start: 10:00
Plus 2 hours: 12:00
Plus 45 minutes: 10:45
Minus 30 seconds: 09:59:30

Time Comparison:
9:00 is before 14:30? true
9:00 is after 14:30? false
Minutes between: 330

Formatted Time: 02:30:00 PM

=== LOCALDATETIME OPERATIONS ===

Current DateTime: 2026-01-23T10:30:45.123456789
Christmas Morning 2025: 2025-12-25T10:30
Combined: 2025-06-15T14:30
Parsed: 2025-12-31T23:59:59

DateTime Components:
Date: 2026-01-23
Time: 10:30:45.123456789
Year: 2026
Month: JANUARY
Day: 23
Hour: 10
Minute: 30

DateTime Arithmetic:
Start: 2025-01-01T00:00
Plus 7 days: 2025-01-08T00:00
Plus 3 hours 30 mins: 2025-01-01T03:30
Plus 1 month: 2025-02-01T00:00

Modified: 2026-06-15T14:30

Format 1: 23-01-2026 10:30:45
Format 2: Thursday, January 23, 2026 at 10:30 AM

=== PRACTICAL APPLICATIONS ===

--- Meeting Scheduler ---
Meeting: Jan 25, 2026 at 10:00 AM
Duration: 2 hours
Ends: 12:00 PM

--- Log Timestamp ---
[2026-01-23 10:30:45.123] Application started
[2026-01-23 10:30:50.123] User logged in

--- Business Hours Checker ---
Business Hours: 9:00 AM - 5:00 PM
Current Time: 10:30 AM
Is Business Hours? true

--- Event Countdown ---
Time until Christmas 2026:
336 days, 13 hours, 29 minutes

--- Shift Work Calculator ---
Shift Start: 08:00
Shift End: 16:30
Total Hours: 8 hours 30 minutes

═══════════════════════════════════════════════════════
```

**💡 Key Differences:**

| Type | Contains | Use Case |
|------|----------|----------|
| **LocalDate** | Date only | Birthdates, deadlines, holidays |
| **LocalTime** | Time only | Business hours, schedules |
| **LocalDateTime** | Date + Time | Appointments, logs, timestamps |

**✅ Success Criteria:**
- [ ] LocalTime operations demonstrated
- [ ] LocalDateTime operations work correctly
- [ ] Time and DateTime arithmetic performed
- [ ] Custom formatting applied correctly
- [ ] Practical applications show real-world usage
- [ ] Duration calculations work correctly

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|----------------|-------------|
| Mixing LocalTime with timezones | LocalTime has no timezone | Use ZonedDateTime for timezones |
| Not assigning after plus/minus | Objects are immutable | Always assign: `time = time.plusHours(1)` |
| Using 12-hour format without AM/PM | Ambiguous time | Use 24-hour or include 'a' pattern |
| Comparing across timezones | LocalDateTime ignores zones | Use ZonedDateTime for timezone-aware comparison |

**🎯 Challenges:**
1. Build a work hours tracker (clock in/out times, calculate total)
2. Create an alarm clock system that checks if it's time to alert
3. Calculate overtime hours (hours worked beyond 8 hours)
4. Build a meeting conflict detector
5. Create a time-based greeting system (Good Morning/Afternoon/Evening)
6. Implement a countdown timer for multiple events
7. Build a shift roster system with overlapping shift detection

---

#### Exercise 4: ZonedDateTime - Working with Timezones (20 minutes)

**What you'll learn:** Handling dates and times across different timezones

**Create class: `ZonedDateTimeDemo`**

**Concept:** `ZonedDateTime` = LocalDateTime + TimeZone. Essential for global applications, meeting schedulers, and international systems.

**Step-by-Step:**

```java
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.Set;

public class ZonedDateTimeDemo {
    public static void main(String[] args) {
        System.out.println("╔═══════════════════════════════════════════╗");
        System.out.println("║   ZONEDDATETIME - TIMEZONE OPERATIONS    ║");
        System.out.println("╚═══════════════════════════════════════════╝\n");

        // Understanding timezones
        exploreTimezones();

        // Creating ZonedDateTime
        demonstrateCreation();

        // Timezone conversion
        demonstrateConversion();

        // Practical applications
        practicalExamples();

        System.out.println("\n════════════════════════════════════════════");
    }

    static void exploreTimezones() {
        System.out.println("=== AVAILABLE TIMEZONES ===\n");

        // Get all available timezone IDs
        Set<String> zones = ZoneId.getAvailableZoneIds();
        System.out.println("Total Available Zones: " + zones.size());

        // Show some common timezones
        System.out.println("\nCommon Timezones:");
        String[] commonZones = {
            "America/New_York",
            "America/Los_Angeles",
            "America/Chicago",
            "Europe/London",
            "Europe/Paris",
            "Asia/Tokyo",
            "Asia/Kolkata",
            "Australia/Sydney"
        };

        for (String zone : commonZones) {
            ZoneId zoneId = ZoneId.of(zone);
            System.out.println("  " + zone + " (" + zoneId.getRules().getOffset(Instant.now()) + ")");
        }

        // System default timezone
        System.out.println("\nSystem Default: " + ZoneId.systemDefault());
    }

    static void demonstrateCreation() {
        System.out.println("\n=== CREATING ZONEDDATETIME ===\n");

        // Current date-time in system default timezone
        ZonedDateTime now = ZonedDateTime.now();
        System.out.println("Now (System Default): " + now);

        // Current date-time in specific timezone
        ZonedDateTime nowInTokyo = ZonedDateTime.now(ZoneId.of("Asia/Tokyo"));
        System.out.println("Now in Tokyo: " + nowInTokyo);

        // Create specific date-time with timezone
        ZonedDateTime meeting = ZonedDateTime.of(
            2026, 1, 25,  // Date
            14, 30, 0, 0,  // Time
            ZoneId.of("America/New_York")  // Timezone
        );
        System.out.println("\nMeeting (NY): " + meeting);

        // From LocalDateTime
        LocalDateTime localDT = LocalDateTime.of(2026, 3, 15, 10, 0);
        ZonedDateTime zonedDT = localDT.atZone(ZoneId.of("Europe/Paris"));
        System.out.println("LocalDateTime to Zoned: " + zonedDT);

        // Parse with timezone
        ZonedDateTime parsed = ZonedDateTime.parse("2025-12-25T10:00:00+05:30[Asia/Kolkata]");
        System.out.println("Parsed: " + parsed);
    }

    static void demonstrateConversion() {
        System.out.println("\n=== TIMEZONE CONVERSIONS ===\n");

        // Create datetime in New York
        ZonedDateTime nyTime = ZonedDateTime.of(
            2026, 1, 25,
            14, 0, 0, 0,
            ZoneId.of("America/New_York")
        );

        System.out.println("Original (New York): " +
            nyTime.format(DateTimeFormatter.ofPattern("MMM dd, yyyy hh:mm a z")));

        // Convert to different timezones
        ZonedDateTime londonTime = nyTime.withZoneSameInstant(ZoneId.of("Europe/London"));
        System.out.println("London:              " +
            londonTime.format(DateTimeFormatter.ofPattern("MMM dd, yyyy hh:mm a z")));

        ZonedDateTime tokyoTime = nyTime.withZoneSameInstant(ZoneId.of("Asia/Tokyo"));
        System.out.println("Tokyo:               " +
            tokyoTime.format(DateTimeFormatter.ofPattern("MMM dd, yyyy hh:mm a z")));

        ZonedDateTime indiaTime = nyTime.withZoneSameInstant(ZoneId.of("Asia/Kolkata"));
        System.out.println("India:               " +
            indiaTime.format(DateTimeFormatter.ofPattern("MMM dd, yyyy hh:mm a z")));

        // Show time difference
        System.out.println("\nTime Offsets from New York:");
        System.out.println("London: " + Duration.between(nyTime, londonTime).toHours() + " hours");
        System.out.println("Tokyo: " + Duration.between(nyTime, tokyoTime).toHours() + " hours");
        System.out.println("India: " + Duration.between(nyTime, indiaTime).toHours() + " hours");
    }

    static void practicalExamples() {
        System.out.println("\n=== PRACTICAL APPLICATIONS ===\n");

        // Example 1: Global meeting scheduler
        System.out.println("--- Global Meeting Scheduler ---");
        ZonedDateTime meetingNY = ZonedDateTime.of(
            2026, 2, 1, 10, 0, 0, 0,
            ZoneId.of("America/New_York")
        );

        System.out.println("Team Meeting:");
        System.out.println("  New York:  " + formatTime(meetingNY));
        System.out.println("  London:    " + formatTime(meetingNY.withZoneSameInstant(ZoneId.of("Europe/London"))));
        System.out.println("  Mumbai:    " + formatTime(meetingNY.withZoneSameInstant(ZoneId.of("Asia/Kolkata"))));
        System.out.println("  Tokyo:     " + formatTime(meetingNY.withZoneSameInstant(ZoneId.of("Asia/Tokyo"))));
        System.out.println("  Sydney:    " + formatTime(meetingNY.withZoneSameInstant(ZoneId.of("Australia/Sydney"))));

        // Example 2: Flight departure/arrival times
        System.out.println("\n--- Flight Schedule ---");
        ZonedDateTime departure = ZonedDateTime.of(
            2026, 3, 15, 18, 30, 0, 0,
            ZoneId.of("America/Los_Angeles")
        );

        Duration flightDuration = Duration.ofHours(11).plusMinutes(30);
        ZonedDateTime arrival = departure.plus(flightDuration)
                                        .withZoneSameInstant(ZoneId.of("Asia/Tokyo"));

        System.out.println("Flight: Los Angeles → Tokyo");
        System.out.println("Departure: " + formatDetailedTime(departure));
        System.out.println("Arrival:   " + formatDetailedTime(arrival));
        System.out.println("Flight Duration: " + flightDuration.toHours() + "h " +
                          (flightDuration.toMinutes() % 60) + "m");

        // Example 3: Daylight Saving Time awareness
        System.out.println("\n--- Daylight Saving Time ---");
        // Date before DST change
        ZonedDateTime beforeDST = ZonedDateTime.of(
            2026, 3, 7, 12, 0, 0, 0,
            ZoneId.of("America/New_York")
        );
        // Date after DST change
        ZonedDateTime afterDST = beforeDST.plusMonths(1);

        System.out.println("Before DST: " + beforeDST);
        System.out.println("After DST:  " + afterDST);
        System.out.println("Offset Before: " + beforeDST.getOffset());
        System.out.println("Offset After:  " + afterDST.getOffset());
    }

    static String formatTime(ZonedDateTime zdt) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("hh:mm a (z)");
        return zdt.format(formatter);
    }

    static String formatDetailedTime(ZonedDateTime zdt) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM dd, yyyy hh:mm a z");
        return zdt.format(formatter);
    }
}
```

**Expected Output:**
```
╔═══════════════════════════════════════════╗
║   ZONEDDATETIME - TIMEZONE OPERATIONS    ║
╚═══════════════════════════════════════════╝

=== AVAILABLE TIMEZONES ===

Total Available Zones: 600
