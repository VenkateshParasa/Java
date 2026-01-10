# Day 29: Date & Time API

**Week 4: Advanced Java Concepts**

---

## 📋 Table of Contents
- [Learning Objectives](#learning-objectives)
- [Topics Covered](#topics-covered)
- [Detailed Content](#detailed-content)
- [Practical Exercises](#practical-exercises)
- [Key Takeaways](#key-takeaways)
- [Additional Resources](#additional-resources)
- [Navigation](#navigation)

---

## 🎯 Learning Objectives

By the end of Day 29, you will be able to:
- Understand the new Date & Time API (java.time package)
- Work with LocalDate, LocalTime, and LocalDateTime
- Use ZonedDateTime for timezone-aware dates
- Format and parse dates using DateTimeFormatter
- Perform date arithmetic and comparisons
- Understand Period and Duration
- Work with Instant for timestamps
- Convert between old and new date APIs

---

## 📚 Topics Covered

### 1. Introduction to Java 8 Date & Time API

The new Date & Time API (introduced in Java 8) provides a comprehensive and thread-safe way to work with dates and times.

#### Why New API?

**Problems with old API (java.util.Date):**
- Not thread-safe
- Poor API design
- Mutable objects
- Confusing month indexing (0-11)

**Benefits of new API (java.time):**
- Immutable and thread-safe
- Clear and intuitive
- Comprehensive functionality
- ISO-8601 standard compliant

---

### 2. LocalDate

Represents a date without time or timezone.

```java
import java.time.LocalDate;
import java.time.Month;

public class LocalDateExample {
    public static void main(String[] args) {
        // Current date
        LocalDate today = LocalDate.now();
        System.out.println("Today: " + today);
        
        // Specific date
        LocalDate birthday = LocalDate.of(1990, Month.JANUARY, 15);
        System.out.println("Birthday: " + birthday);
        
        // From string
        LocalDate date = LocalDate.parse("2024-12-25");
        System.out.println("Christmas: " + date);
        
        // Get components
        System.out.println("Year: " + today.getYear());
        System.out.println("Month: " + today.getMonth());
        System.out.println("Day: " + today.getDayOfMonth());
        System.out.println("Day of week: " + today.getDayOfWeek());
    }
}
```

---

### 3. LocalTime

Represents a time without date or timezone.

```java
import java.time.LocalTime;

public class LocalTimeExample {
    public static void main(String[] args) {
        // Current time
        LocalTime now = LocalTime.now();
        System.out.println("Now: " + now);
        
        // Specific time
        LocalTime lunchTime = LocalTime.of(12, 30);
        System.out.println("Lunch: " + lunchTime);
        
        // With seconds and nanoseconds
        LocalTime precise = LocalTime.of(14, 30, 45, 123456789);
        System.out.println("Precise: " + precise);
        
        // Get components
        System.out.println("Hour: " + now.getHour());
        System.out.println("Minute: " + now.getMinute());
        System.out.println("Second: " + now.getSecond());
    }
}
```

---

### 4. LocalDateTime

Combines date and time without timezone.

```java
import java.time.LocalDateTime;

public class LocalDateTimeExample {
    public static void main(String[] args) {
        // Current date-time
        LocalDateTime now = LocalDateTime.now();
        System.out.println("Now: " + now);
        
        // Specific date-time
        LocalDateTime meeting = LocalDateTime.of(2024, 12, 25, 14, 30);
        System.out.println("Meeting: " + meeting);
        
        // From LocalDate and LocalTime
        LocalDate date = LocalDate.now();
        LocalTime time = LocalTime.of(10, 30);
        LocalDateTime combined = LocalDateTime.of(date, time);
        System.out.println("Combined: " + combined);
    }
}
```

---

## 💻 Practical Exercises

### Exercise 1: Working with Dates

```java
import java.time.LocalDate;
import java.time.Period;

public class Exercise1 {
    public static void main(String[] args) {
        LocalDate today = LocalDate.now();
        LocalDate birthday = LocalDate.of(1990, 1, 15);
        
        Period age = Period.between(birthday, today);
        System.out.println("Age: " + age.getYears() + " years");
        
        // Add days
        LocalDate nextWeek = today.plusDays(7);
        System.out.println("Next week: " + nextWeek);
        
        // Subtract months
        LocalDate lastMonth = today.minusMonths(1);
        System.out.println("Last month: " + lastMonth);
    }
}
```

---

## 🔑 Key Takeaways

1. **LocalDate**: Date without time
2. **LocalTime**: Time without date
3. **LocalDateTime**: Date and time without timezone
4. **ZonedDateTime**: Date, time with timezone
5. **Immutable**: All date-time objects are immutable
6. **Thread-safe**: Safe for concurrent use
7. **DateTimeFormatter**: For formatting and parsing
8. **Period**: Date-based amount of time
9. **Duration**: Time-based amount of time
10. **Instant**: Machine timestamp

---

## 📖 Additional Resources

### Official Documentation:
- [Java Date Time API](https://docs.oracle.com/javase/8/docs/api/java/time/package-summary.html)
- [LocalDate Documentation](https://docs.oracle.com/javase/8/docs/api/java/time/LocalDate.html)

---

## 🧭 Navigation

### Week 4 Progress:
- [Day 22: File I/O Basics](day22_file_io.md)
- [Day 23: File Operations & NIO](day23_file_operations.md)
- [Day 24: Serialization](day24_serialization.md)
- [Day 25: Multithreading Basics](day25_multithreading_basics.md)
- [Day 26: Thread Synchronization](day26_thread_synchronization.md)
- [Day 27: Lambda Expressions](day27_lambda_expressions.md)
- [Day 28: Stream API](day28_stream_api.md)
- **Day 29: Date & Time API** ← You are here
- [Day 30: Final Review & Project](day30_final_review.md)

### Related Resources:
- [📝 Day 29 Assessment](../../../java-learning-app/src/data/assessments/java/week4/day29.js)
- [🏠 Back to Week 4 Overview](README.md)
- [📖 Course Overview](../../Java_Core_Fundamentals_30Day_Course.md)

---

## ✅ Day 29 Checklist

Before moving to Day 30, ensure you can:
- [ ] Use LocalDate, LocalTime, LocalDateTime
- [ ] Format and parse dates
- [ ] Perform date arithmetic
- [ ] Work with timezones
- [ ] Use Period and Duration
- [ ] Compare dates and times

---

## ⚠️ Common Mistakes

### 1. LocalDate/LocalTime/LocalDateTime Mistakes

#### ❌ Wrong - Using Old Date API Instead of New:
```java
// WRONG - Using deprecated old Date API
import java.util.Date;
import java.util.Calendar;

public class Main {
    public static void main(String[] args) {
        // Old API: mutable, not thread-safe, confusing
        Date date = new Date();
        Calendar cal = Calendar.getInstance();
        cal.set(2024, 0, 15);  // Month 0 = January - confusing!
        Date birthday = cal.getTime();
    }
}
```
**Issue:** Old Date/Calendar API is mutable, not thread-safe, and has confusing design (0-based months)

#### ✅ Right:
```java
// CORRECT - Use new java.time API
import java.time.*;

public class Main {
    public static void main(String[] args) {
        // New API: immutable, thread-safe, clear
        LocalDate today = LocalDate.now();
        LocalDate birthday = LocalDate.of(2024, Month.JANUARY, 15);
        // Or with numeric month (1-based, natural!)
        LocalDate birthday2 = LocalDate.of(2024, 1, 15);

        LocalTime now = LocalTime.now();
        LocalTime lunchTime = LocalTime.of(12, 30);

        LocalDateTime meetingTime = LocalDateTime.of(2024, 1, 15, 14, 30);

        System.out.println("Today: " + today);
        System.out.println("Birthday: " + birthday);
    }
}
```

**Why:** New java.time API is immutable, thread-safe, and has clear, intuitive design with 1-based months.

**💡 Tip:** Always use java.time (LocalDate, LocalTime, LocalDateTime) instead of java.util.Date/Calendar.

---

#### ❌ Wrong - Expecting Mutable Date Objects:
```java
// WRONG - Expecting modification to change original
import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        LocalDate date = LocalDate.of(2024, 1, 15);

        // Student expects date to change
        date.plusDays(5);  // Returns new instance, doesn't modify date!

        System.out.println(date);  // Still 2024-01-15!
    }
}
```
**Issue:** All java.time classes are immutable; methods return new instances, don't modify original

#### ✅ Right:
```java
// CORRECT - Capture returned value
import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        LocalDate date = LocalDate.of(2024, 1, 15);

        // Capture returned value
        LocalDate newDate = date.plusDays(5);

        System.out.println("Original: " + date);      // 2024-01-15
        System.out.println("New date: " + newDate);   // 2024-01-20

        // Or reassign if you want to update variable
        date = date.plusDays(5);
        System.out.println("Updated: " + date);       // 2024-01-20
    }
}
```

**Why:** LocalDate/LocalTime/LocalDateTime are immutable; all modification methods return new instances.

**💡 Tip:** Always capture the return value from date/time modification methods; they don't modify in place.

---

#### ❌ Wrong - Confusing Month Numbers:
```java
// WRONG - Thinking months are 0-based like old API
import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        // Student thinks 0 = January like old API
        LocalDate date = LocalDate.of(2024, 0, 15);  // IllegalArgumentException!
        // Month 0 is invalid in new API
    }
}
```
**Issue:** New API uses 1-based months (1=January, 12=December), unlike old 0-based API

#### ✅ Right:
```java
// CORRECT - Use 1-based months or Month enum
import java.time.LocalDate;
import java.time.Month;

public class Main {
    public static void main(String[] args) {
        // Option 1: Use Month enum (clearest)
        LocalDate date1 = LocalDate.of(2024, Month.JANUARY, 15);
        LocalDate date2 = LocalDate.of(2024, Month.DECEMBER, 25);

        // Option 2: Use 1-based numeric month
        LocalDate date3 = LocalDate.of(2024, 1, 15);   // January
        LocalDate date4 = LocalDate.of(2024, 12, 25);  // December

        System.out.println("January: " + date1);
        System.out.println("December: " + date2);
    }
}
```

**Why:** New API uses natural 1-based months; use Month enum for clarity.

**💡 Tip:** Use Month enum (Month.JANUARY) to avoid confusion; numeric months are 1-based (1=Jan, 12=Dec).

---

#### ❌ Wrong - Using LocalDateTime When LocalDate or LocalTime Sufficient:
```java
// WRONG - Using LocalDateTime when only need date
import java.time.LocalDateTime;

public class Main {
    public static void main(String[] args) {
        // Only need date, but using DateTime - overkill
        LocalDateTime birthday = LocalDateTime.now();
        System.out.println("Birthday: " + birthday);  // Includes unnecessary time
    }
}
```
**Issue:** Using LocalDateTime when only date or time needed; adds unnecessary information

#### ✅ Right:
```java
// CORRECT - Use most specific type for your needs
import java.time.*;

public class Main {
    public static void main(String[] args) {
        // Only need date - use LocalDate
        LocalDate birthday = LocalDate.of(1990, Month.JANUARY, 15);
        System.out.println("Birthday: " + birthday);  // 1990-01-15

        // Only need time - use LocalTime
        LocalTime meetingTime = LocalTime.of(14, 30);
        System.out.println("Meeting time: " + meetingTime);  // 14:30

        // Need both date and time - use LocalDateTime
        LocalDateTime appointmentTime = LocalDateTime.of(2024, 1, 15, 14, 30);
        System.out.println("Appointment: " + appointmentTime);  // 2024-01-15T14:30

        // Need timezone - use ZonedDateTime
        ZonedDateTime zonedTime = ZonedDateTime.of(appointmentTime, ZoneId.of("America/New_York"));
        System.out.println("With timezone: " + zonedTime);
    }
}
```

**Why:** Use most specific type: LocalDate for dates, LocalTime for times, LocalDateTime for both, ZonedDateTime for timezone-aware.

**💡 Tip:** Choose the narrowest type: LocalDate > LocalTime > LocalDateTime > ZonedDateTime.

---

#### ❌ Wrong - Trying to Modify Components Directly:
```java
// WRONG - No setters on immutable classes
import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        LocalDate date = LocalDate.of(2024, 1, 15);

        // No setters! These don't exist:
        // date.setYear(2025);  // Compile error!
        // date.setMonth(5);    // Compile error!
        // date.setDay(20);     // Compile error!
    }
}
```
**Issue:** Trying to use setters; java.time classes are immutable with no setters

#### ✅ Right:
```java
// CORRECT - Use with* methods to create modified copies
import java.time.LocalDate;
import java.time.Month;

public class Main {
    public static void main(String[] args) {
        LocalDate date = LocalDate.of(2024, 1, 15);

        // Use with* methods (return new instance)
        LocalDate newYear = date.withYear(2025);
        LocalDate newMonth = date.withMonth(5);
        LocalDate newDay = date.withDayOfMonth(20);

        // Chain modifications
        LocalDate modified = date
            .withYear(2025)
            .withMonth(5)
            .withDayOfMonth(20);

        System.out.println("Original: " + date);        // 2024-01-15
        System.out.println("Modified: " + modified);    // 2025-05-20
    }
}
```

**Why:** Use `with*()` methods to create modified copies; no setters due to immutability.

**💡 Tip:** Use `withYear()`, `withMonth()`, `withDayOfMonth()`, etc. to create modified copies.

---

### 2. Date Arithmetic Mistakes

#### ❌ Wrong - Using Wrong Addition/Subtraction Methods:
```java
// WRONG - Using generic add() instead of specific methods
import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        LocalDate date = LocalDate.of(2024, 1, 15);

        // No add() method!
        // LocalDate newDate = date.add(5);  // Compile error!

        // Using wrong unit
        LocalDate wrong = date.plusDays(30);  // Adds 30 days, not 1 month
        // Different from adding 1 month due to varying month lengths
    }
}
```
**Issue:** No generic add(); must use specific methods; be careful with days vs months

#### ✅ Right:
```java
// CORRECT - Use specific plus*/minus* methods
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public class Main {
    public static void main(String[] args) {
        LocalDate date = LocalDate.of(2024, 1, 15);

        // Use specific methods
        LocalDate plusDays = date.plusDays(10);
        LocalDate plusWeeks = date.plusWeeks(2);
        LocalDate plusMonths = date.plusMonths(1);
        LocalDate plusYears = date.plusYears(1);

        LocalDate minusDays = date.minusDays(5);
        LocalDate minusMonths = date.minusMonths(1);

        // Or use plus/minus with temporal amount
        LocalDate plus30Days = date.plus(30, ChronoUnit.DAYS);
        LocalDate plus1Month = date.plus(1, ChronoUnit.MONTHS);

        System.out.println("Original: " + date);
        System.out.println("+10 days: " + plusDays);
        System.out.println("+1 month: " + plusMonths);
        System.out.println("30 days vs 1 month: " + plus30Days + " vs " + plus1Month);
    }
}
```

**Why:** Use specific `plusDays()`, `plusMonths()`, etc.; understand difference between days and months.

**💡 Tip:** Use specific plus*/minus* methods; be aware that 30 days ≠ 1 month due to varying month lengths.

---

#### ❌ Wrong - Not Handling Invalid Dates:
```java
// WRONG - Creating invalid dates without handling
import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        LocalDate date = LocalDate.of(2024, 1, 31);  // Jan 31

        // Adding 1 month - Feb doesn't have 31 days!
        LocalDate nextMonth = date.plusMonths(1);  // DateTimeException!
    }
}
```
**Issue:** Adding months can create invalid dates (e.g., Jan 31 + 1 month = Feb 31, which doesn't exist)

#### ✅ Right:
```java
// CORRECT - java.time handles it automatically by adjusting to last valid day
import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        LocalDate jan31 = LocalDate.of(2024, 1, 31);

        // plusMonths automatically adjusts to last valid day of month
        LocalDate feb = jan31.plusMonths(1);  // Becomes Feb 29 (2024 is leap year)

        System.out.println("Jan 31 + 1 month = " + feb);  // 2024-02-29

        // Same for non-leap years
        LocalDate jan31_2023 = LocalDate.of(2023, 1, 31);
        LocalDate feb_2023 = jan31_2023.plusMonths(1);
        System.out.println("2023: Jan 31 + 1 month = " + feb_2023);  // 2023-02-28

        // Be aware of this behavior when doing date arithmetic!
        LocalDate date = LocalDate.of(2024, 1, 31);
        LocalDate twoMonthsLater = date.plusMonths(2);
        System.out.println("Jan 31 + 2 months = " + twoMonthsLater);  // 2024-03-31

        // But chaining can give unexpected results:
        LocalDate oneMonthTwice = date.plusMonths(1).plusMonths(1);
        System.out.println("(Jan 31 + 1 month) + 1 month = " + oneMonthTwice);  // 2024-03-29
        // Different! Feb 29 + 1 month = Mar 29
    }
}
```

**Why:** java.time automatically adjusts to last valid day; but be aware of this when chaining operations.

**💡 Tip:** java.time adjusts invalid dates to last valid day of month; be careful with chained month additions.

---

#### ❌ Wrong - Comparing Dates with == Operator:
```java
// WRONG - Using == to compare dates
import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        LocalDate date1 = LocalDate.of(2024, 1, 15);
        LocalDate date2 = LocalDate.of(2024, 1, 15);

        // Wrong! == checks reference equality, not value
        if (date1 == date2) {  // May be false even if same date!
            System.out.println("Same date");
        }
    }
}
```
**Issue:** == compares object references, not date values; may give incorrect results

#### ✅ Right:
```java
// CORRECT - Use equals() or comparison methods
import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        LocalDate date1 = LocalDate.of(2024, 1, 15);
        LocalDate date2 = LocalDate.of(2024, 1, 15);
        LocalDate date3 = LocalDate.of(2024, 1, 20);

        // Use equals() for equality
        if (date1.equals(date2)) {
            System.out.println("Dates are equal");
        }

        // Use comparison methods
        if (date1.isBefore(date3)) {
            System.out.println("date1 is before date3");
        }

        if (date3.isAfter(date1)) {
            System.out.println("date3 is after date1");
        }

        if (date1.isEqual(date2)) {
            System.out.println("Dates are the same");
        }

        // Use compareTo() for sorting
        int comparison = date1.compareTo(date3);
        if (comparison < 0) {
            System.out.println("date1 comes before date3");
        }
    }
}
```

**Why:** Use `equals()`, `isBefore()`, `isAfter()`, `isEqual()` for comparisons; not ==.

**💡 Tip:** Use `equals()`, `isBefore()`, `isAfter()`, `isEqual()` for date comparisons; never use ==.

---

#### ❌ Wrong - Using Period for Time Durations:
```java
// WRONG - Using Period for time-based durations
import java.time.*;

public class Main {
    public static void main(String[] args) {
        LocalTime start = LocalTime.of(10, 0);
        LocalTime end = LocalTime.of(14, 30);

        // Can't use Period for time! Period is date-based
        // Period duration = Period.between(start, end);  // Compile error!
    }
}
```
**Issue:** Period is for date-based amounts (years, months, days); not for time

#### ✅ Right:
```java
// CORRECT - Use Period for dates, Duration for time
import java.time.*;

public class Main {
    public static void main(String[] args) {
        // Period for date-based amounts (years, months, days)
        LocalDate start = LocalDate.of(2020, 1, 1);
        LocalDate end = LocalDate.of(2024, 6, 15);
        Period period = Period.between(start, end);
        System.out.println("Period: " + period.getYears() + " years, "
            + period.getMonths() + " months, " + period.getDays() + " days");

        // Duration for time-based amounts (hours, minutes, seconds)
        LocalTime timeStart = LocalTime.of(10, 0);
        LocalTime timeEnd = LocalTime.of(14, 30);
        Duration duration = Duration.between(timeStart, timeEnd);
        System.out.println("Duration: " + duration.toHours() + " hours, "
            + duration.toMinutesPart() + " minutes");

        // Duration also works with LocalDateTime
        LocalDateTime dateTimeStart = LocalDateTime.of(2024, 1, 1, 10, 0);
        LocalDateTime dateTimeEnd = LocalDateTime.of(2024, 1, 1, 14, 30);
        Duration dateTimeDuration = Duration.between(dateTimeStart, dateTimeEnd);
        System.out.println("Duration: " + dateTimeDuration.toHours() + " hours");
    }
}
```

**Why:** Period = date-based (years/months/days); Duration = time-based (hours/minutes/seconds/nanos).

**💡 Tip:** Use Period for date differences (years/months/days); Duration for time differences (hours/minutes/seconds).

---

### 3. Formatting and Parsing Mistakes

#### ❌ Wrong - Using SimpleDateFormat Instead of DateTimeFormatter:
```java
// WRONG - Using old SimpleDateFormat (not thread-safe!)
import java.text.SimpleDateFormat;
import java.util.Date;

public class Main {
    // Sharing formatter across threads - NOT THREAD-SAFE!
    private static final SimpleDateFormat formatter =
        new SimpleDateFormat("yyyy-MM-dd");

    public static void main(String[] args) {
        Date date = new Date();
        String formatted = formatter.format(date);  // Not thread-safe!
    }
}
```
**Issue:** SimpleDateFormat is not thread-safe; causes issues in concurrent environments

#### ✅ Right:
```java
// CORRECT - Use DateTimeFormatter (thread-safe and immutable)
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Main {
    // DateTimeFormatter is thread-safe - can be shared
    private static final DateTimeFormatter FORMATTER =
        DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public static void main(String[] args) {
        LocalDate date = LocalDate.now();

        // Format date to string
        String formatted = date.format(FORMATTER);
        System.out.println("Formatted: " + formatted);

        // Parse string to date
        LocalDate parsed = LocalDate.parse("2024-01-15", FORMATTER);
        System.out.println("Parsed: " + parsed);

        // Use predefined formatters
        String iso = date.format(DateTimeFormatter.ISO_LOCAL_DATE);
        System.out.println("ISO format: " + iso);
    }
}
```

**Why:** DateTimeFormatter is thread-safe and immutable; SimpleDateFormat is not.

**💡 Tip:** Always use DateTimeFormatter (thread-safe); never SimpleDateFormat (not thread-safe).

---

#### ❌ Wrong - Incorrect Date Format Patterns:
```java
// WRONG - Using incorrect format patterns
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Main {
    public static void main(String[] args) {
        LocalDateTime dateTime = LocalDateTime.now();

        // Wrong patterns - common mistakes:
        DateTimeFormatter wrong1 = DateTimeFormatter.ofPattern("YYYY-MM-dd");  // YYYY is week year, not year!
        DateTimeFormatter wrong2 = DateTimeFormatter.ofPattern("yyyy-mm-dd");  // mm is minute, not month!
        DateTimeFormatter wrong3 = DateTimeFormatter.ofPattern("dd-MM-yyyy hh:mm:ss");  // hh is 12-hour, not 24-hour!

        // These will give unexpected results
        System.out.println(dateTime.format(wrong1));  // Week year instead of year
        System.out.println(dateTime.format(wrong2));  // Minutes instead of month
        System.out.println(dateTime.format(wrong3));  // 12-hour format without AM/PM
    }
}
```
**Issue:** Common pattern mistakes: YYYY (week year), mm (minute not month), hh (12-hour not 24-hour)

#### ✅ Right:
```java
// CORRECT - Use correct format patterns
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Main {
    public static void main(String[] args) {
        LocalDateTime dateTime = LocalDateTime.of(2024, 1, 15, 14, 30, 45);

        // Correct patterns:
        DateTimeFormatter yearMonthDay = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        // yyyy = year, MM = month, dd = day

        DateTimeFormatter fullDateTime = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        // HH = 24-hour, mm = minute, ss = second

        DateTimeFormatter twelveHour = DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss a");
        // hh = 12-hour with AM/PM marker (a)

        DateTimeFormatter custom = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");

        System.out.println("Date: " + dateTime.format(yearMonthDay));          // 2024-01-15
        System.out.println("DateTime: " + dateTime.format(fullDateTime));      // 2024-01-15 14:30:45
        System.out.println("12-hour: " + dateTime.format(twelveHour));         // 2024-01-15 02:30:45 PM
        System.out.println("Custom: " + dateTime.format(custom));              // 15/01/2024 14:30

        // Key patterns:
        // yyyy = year (4 digits)
        // MM = month (01-12)
        // dd = day (01-31)
        // HH = hour (00-23, 24-hour)
        // hh = hour (01-12, 12-hour, use with 'a' for AM/PM)
        // mm = minute (00-59)
        // ss = second (00-59)
        // a = AM/PM marker
    }
}
```

**Why:** yyyy=year, MM=month, dd=day, HH=24-hour, hh=12-hour, mm=minute, ss=second.

**💡 Tip:** Remember: yyyy (year), MM (month), dd (day), HH (24-hour), hh (12-hour), mm (minute), ss (second).

---

#### ❌ Wrong - Not Handling Parse Exceptions:
```java
// WRONG - Not handling invalid input when parsing
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Main {
    public static void main(String[] args) {
        String invalidDate = "2024-13-45";  // Invalid month and day

        // DateTimeParseException thrown!
        LocalDate date = LocalDate.parse(invalidDate);  // Crashes!
    }
}
```
**Issue:** Parsing invalid dates throws DateTimeParseException; must handle

#### ✅ Right:
```java
// CORRECT - Handle parse exceptions
import java.time.LocalDate;
import java.time.format.*;

public class Main {
    public static void main(String[] args) {
        String[] dates = {"2024-01-15", "2024-13-45", "invalid"};
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        for (String dateStr : dates) {
            try {
                LocalDate date = LocalDate.parse(dateStr, formatter);
                System.out.println("Parsed: " + date);
            } catch (DateTimeParseException e) {
                System.out.println("Failed to parse '" + dateStr + "': " + e.getMessage());
            }
        }

        // Or create validation method
        LocalDate safeDate = parseDateSafely("2024-01-15");
        System.out.println("Safe parse: " + safeDate);
    }

    private static LocalDate parseDateSafely(String dateStr) {
        try {
            return LocalDate.parse(dateStr);
        } catch (DateTimeParseException e) {
            System.err.println("Invalid date format: " + dateStr);
            return null;  // Or return default date, or throw custom exception
        }
    }
}
```

**Why:** Parsing can fail; always handle DateTimeParseException for invalid input.

**💡 Tip:** Always catch DateTimeParseException when parsing user input; validate dates before parsing.

---

#### ❌ Wrong - Using Wrong Formatter for Date Type:
```java
// WRONG - Using formatter with time pattern for date-only type
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Main {
    public static void main(String[] args) {
        LocalDate date = LocalDate.now();  // Date only, no time

        // Trying to format with time pattern - UnsupportedTemporalTypeException!
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formatted = date.format(formatter);  // Error! LocalDate has no time
    }
}
```
**Issue:** Using formatter with time pattern on LocalDate (which has no time)

#### ✅ Right:
```java
// CORRECT - Match formatter pattern to date-time type
import java.time.*;
import java.time.format.DateTimeFormatter;

public class Main {
    public static void main(String[] args) {
        // LocalDate - date only
        LocalDate date = LocalDate.now();
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        System.out.println("Date: " + date.format(dateFormatter));

        // LocalTime - time only
        LocalTime time = LocalTime.now();
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");
        System.out.println("Time: " + time.format(timeFormatter));

        // LocalDateTime - date and time
        LocalDateTime dateTime = LocalDateTime.now();
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        System.out.println("DateTime: " + dateTime.format(dateTimeFormatter));

        // If need both, convert LocalDate to LocalDateTime first
        LocalDate dateOnly = LocalDate.now();
        LocalDateTime dateTimeFromDate = dateOnly.atTime(LocalTime.now());
        System.out.println("Converted: " + dateTimeFromDate.format(dateTimeFormatter));
    }
}
```

**Why:** Formatter pattern must match date-time type: date patterns for LocalDate, time patterns for LocalTime, both for LocalDateTime.

**💡 Tip:** Match formatter to type: date patterns for LocalDate, time for LocalTime, both for LocalDateTime.

---

### 4. ZonedDateTime and Timezone Mistakes

#### ❌ Wrong - Using LocalDateTime for Cross-Timezone Operations:
```java
// WRONG - Using LocalDateTime when timezones matter
import java.time.LocalDateTime;

public class Main {
    public static void main(String[] args) {
        // Scheduling meeting for people in different timezones
        LocalDateTime meeting = LocalDateTime.of(2024, 1, 15, 14, 0);
        // No timezone info! 2 PM where? New York? London? Tokyo?

        System.out.println("Meeting at: " + meeting);  // Ambiguous!
    }
}
```
**Issue:** LocalDateTime has no timezone; ambiguous for cross-timezone scenarios

#### ✅ Right:
```java
// CORRECT - Use ZonedDateTime when timezone matters
import java.time.*;

public class Main {
    public static void main(String[] args) {
        // Meeting at 2 PM New York time
        ZoneId newYork = ZoneId.of("America/New_York");
        ZonedDateTime meetingNY = ZonedDateTime.of(2024, 1, 15, 14, 0, 0, 0, newYork);

        System.out.println("New York: " + meetingNY);

        // Convert to other timezones
        ZoneId london = ZoneId.of("Europe/London");
        ZonedDateTime meetingLondon = meetingNY.withZoneSameInstant(london);
        System.out.println("London: " + meetingLondon);

        ZoneId tokyo = ZoneId.of("Asia/Tokyo");
        ZonedDateTime meetingTokyo = meetingNY.withZoneSameInstant(tokyo);
        System.out.println("Tokyo: " + meetingTokyo);

        // All represent the same instant in time, just different timezones
    }
}
```

**Why:** Use ZonedDateTime for timezone-aware operations; allows conversion between timezones.

**💡 Tip:** Use ZonedDateTime for timezone-aware dates; use `withZoneSameInstant()` to convert timezones.

---

#### ❌ Wrong - Using Abbreviations for Timezones:
```java
// WRONG - Using timezone abbreviations (ambiguous!)
import java.time.*;

public class Main {
    public static void main(String[] args) {
        // Don't use abbreviations! "EST", "PST", "CST" are ambiguous
        // EST could be US Eastern or Australian Eastern Standard Time
        // ZoneId.of("EST");  // May not work as expected!

        // Some abbreviations are deprecated or ambiguous
    }
}
```
**Issue:** Timezone abbreviations are ambiguous and deprecated

#### ✅ Right:
```java
// CORRECT - Use IANA timezone IDs (region/city format)
import java.time.*;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        // Use full IANA timezone IDs
        ZoneId newYork = ZoneId.of("America/New_York");  // Not "EST"
        ZoneId losAngeles = ZoneId.of("America/Los_Angeles");  // Not "PST"
        ZoneId chicago = ZoneId.of("America/Chicago");  // Not "CST"
        ZoneId london = ZoneId.of("Europe/London");  // Not "GMT"
        ZoneId tokyo = ZoneId.of("Asia/Tokyo");  // Not "JST"

        // Create zoned date-time
        ZonedDateTime nyTime = ZonedDateTime.now(newYork);
        System.out.println("New York: " + nyTime);

        // Get all available zone IDs
        Set<String> allZones = ZoneId.getAvailableZoneIds();
        System.out.println("Total zones: " + allZones.size());

        // Search for specific zone
        allZones.stream()
            .filter(zone -> zone.contains("America"))
            .sorted()
            .limit(5)
            .forEach(System.out::println);
    }
}
```

**Why:** Use IANA timezone IDs (Region/City format) for clarity and correctness; avoid abbreviations.

**💡 Tip:** Use IANA timezone IDs (America/New_York) not abbreviations (EST); use `ZoneId.getAvailableZoneIds()` to list all.

---

#### ❌ Wrong - Confusing withZoneSameInstant vs withZoneSameLocal:
```java
// WRONG - Using withZoneSameLocal when want same instant
import java.time.*;

public class Main {
    public static void main(String[] args) {
        ZonedDateTime nyTime = ZonedDateTime.of(2024, 1, 15, 14, 0, 0, 0,
            ZoneId.of("America/New_York"));

        // Student wants Tokyo time for same instant, but uses wrong method
        ZonedDateTime tokyoTime = nyTime.withZoneSameLocal(ZoneId.of("Asia/Tokyo"));
        // Wrong! Keeps 2 PM, just changes timezone - different instant!

        System.out.println("NY: " + nyTime);
        System.out.println("Tokyo (wrong): " + tokyoTime);  // Still shows 2 PM Tokyo time!
    }
}
```
**Issue:** `withZoneSameLocal` keeps same local time, changing instant; `withZoneSameInstant` keeps same instant

#### ✅ Right:
```java
// CORRECT - Understanding withZoneSameInstant vs withZoneSameLocal
import java.time.*;

public class Main {
    public static void main(String[] args) {
        ZonedDateTime nyTime = ZonedDateTime.of(2024, 1, 15, 14, 0, 0, 0,
            ZoneId.of("America/New_York"));

        // withZoneSameInstant: Same instant in time, different local time
        ZonedDateTime tokyoSameInstant = nyTime.withZoneSameInstant(ZoneId.of("Asia/Tokyo"));
        System.out.println("NY: " + nyTime);                          // 2024-01-15T14:00-05:00[America/New_York]
        System.out.println("Tokyo (same instant): " + tokyoSameInstant);  // 2024-01-16T04:00+09:00[Asia/Tokyo]
        // Different local time (4 AM next day), but represents the same moment

        // withZoneSameLocal: Same local time, different instant
        ZonedDateTime tokyoSameLocal = nyTime.withZoneSameLocal(ZoneId.of("Asia/Tokyo"));
        System.out.println("Tokyo (same local): " + tokyoSameLocal);  // 2024-01-15T14:00+09:00[Asia/Tokyo]
        // Same local time (2 PM), but represents a different moment (14 hours earlier)

        // Use withZoneSameInstant for timezone conversion (most common)
        // Use withZoneSameLocal for "what's the local date-time in this zone"
    }
}
```

**Why:** `withZoneSameInstant()` converts timezone (same moment); `withZoneSameLocal()` keeps clock time (different moment).

**💡 Tip:** Use `withZoneSameInstant()` for timezone conversion; `withZoneSameLocal()` to keep clock time.

---

#### ❌ Wrong - Ignoring Daylight Saving Time Changes:
```java
// WRONG - Not accounting for DST transitions
import java.time.*;

public class Main {
    public static void main(String[] args) {
        ZoneId newYork = ZoneId.of("America/New_York");

        // DST transition on March 10, 2024 (spring forward)
        LocalDateTime beforeDST = LocalDateTime.of(2024, 3, 10, 1, 30);
        ZonedDateTime zonedBefore = ZonedDateTime.of(beforeDST, newYork);

        // Adding 1 hour - student expects 2:30 AM
        ZonedDateTime oneHourLater = zonedBefore.plusHours(1);
        System.out.println("1 hour later: " + oneHourLater);
        // Actually 3:30 AM! 2:00 AM doesn't exist (clock jumps from 2 AM to 3 AM)
    }
}
```
**Issue:** Not accounting for DST transitions; some times don't exist or occur twice

#### ✅ Right:
```java
// CORRECT - Understanding DST transitions
import java.time.*;
import java.time.zone.ZoneRules;

public class Main {
    public static void main(String[] args) {
        ZoneId newYork = ZoneId.of("America/New_York");

        // Spring forward: March 10, 2024 at 2 AM -> 3 AM (2 AM doesn't exist)
        LocalDateTime springForward = LocalDateTime.of(2024, 3, 10, 1, 30);
        ZonedDateTime before = ZonedDateTime.of(springForward, newYork);
        ZonedDateTime after = before.plusHours(1);

        System.out.println("Before DST: " + before);   // 01:30 EST
        System.out.println("After +1h: " + after);     // 03:30 EDT (skips 2 AM)

        // Fall back: November 3, 2024 at 2 AM -> 1 AM (2 AM occurs twice)
        LocalDateTime fallBack = LocalDateTime.of(2024, 11, 3, 1, 30);
        ZonedDateTime fallBackZoned = ZonedDateTime.of(fallBack, newYork);
        System.out.println("Fall back: " + fallBackZoned);

        // Check if DST applies
        ZoneRules rules = newYork.getRules();
        boolean isDST = rules.isDaylightSavings(Instant.now());
        System.out.println("Is DST active now? " + isDST);

        // ZonedDateTime handles DST correctly automatically
        // but be aware of the transitions when scheduling
    }
}
```

**Why:** DST transitions cause clock jumps; ZonedDateTime handles automatically but be aware.

**💡 Tip:** ZonedDateTime handles DST automatically; be aware some times don't exist (spring) or occur twice (fall).

---

### 5. Instant and Timestamp Mistakes

#### ❌ Wrong - Using Instant for User-Facing Dates:
```java
// WRONG - Using Instant (machine timestamp) for user display
import java.time.Instant;

public class Main {
    public static void main(String[] args) {
        Instant now = Instant.now();

        // Shows UTC timestamp - not user-friendly!
        System.out.println("Current time: " + now);  // 2024-01-15T19:30:45.123Z
        // User in New York sees UTC time, not their local time!
    }
}
```
**Issue:** Instant is machine timestamp in UTC; not user-friendly for display

#### ✅ Right:
```java
// CORRECT - Use Instant for storage, convert to user timezone for display
import java.time.*;
import java.time.format.DateTimeFormatter;

public class Main {
    public static void main(String[] args) {
        // Store as Instant (UTC timestamp) - good for database storage
        Instant timestamp = Instant.now();
        System.out.println("Stored timestamp: " + timestamp);

        // Convert to user's timezone for display
        ZoneId userZone = ZoneId.of("America/New_York");
        ZonedDateTime userTime = timestamp.atZone(userZone);

        // Format for user display
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss z");
        String displayTime = userTime.format(formatter);
        System.out.println("User sees: " + displayTime);

        // Or convert to LocalDateTime if timezone known
        LocalDateTime localTime = LocalDateTime.ofInstant(timestamp, userZone);
        System.out.println("Local time: " + localTime);

        // Best practice: Store Instant in database, display in user's timezone
    }
}
```

**Why:** Instant for storage/computation (UTC); convert to ZonedDateTime/LocalDateTime for display.

**💡 Tip:** Use Instant for storage/logging; convert to user's timezone (ZonedDateTime) for display.

---

#### ❌ Wrong - Confusing Instant with LocalDateTime:
```java
// WRONG - Trying to use LocalDateTime methods on Instant
import java.time.Instant;

public class Main {
    public static void main(String[] args) {
        Instant now = Instant.now();

        // Instant doesn't have date/time component methods
        // int year = now.getYear();  // Compile error!
        // int month = now.getMonthValue();  // Compile error!
        // int day = now.getDayOfMonth();  // Compile error!
    }
}
```
**Issue:** Instant is machine timestamp with no date/time components; can't extract year, month, etc.

#### ✅ Right:
```java
// CORRECT - Convert Instant to LocalDateTime/ZonedDateTime for components
import java.time.*;

public class Main {
    public static void main(String[] args) {
        Instant now = Instant.now();

        // Convert to ZonedDateTime to access components
        ZoneId zone = ZoneId.systemDefault();
        ZonedDateTime zonedDateTime = now.atZone(zone);

        // Now can access components
        int year = zonedDateTime.getYear();
        int month = zonedDateTime.getMonthValue();
        int day = zonedDateTime.getDayOfMonth();
        int hour = zonedDateTime.getHour();

        System.out.println("Year: " + year);
        System.out.println("Month: " + month);
        System.out.println("Day: " + day);
        System.out.println("Hour: " + hour);

        // Or convert to LocalDateTime (in system timezone)
        LocalDateTime localDateTime = LocalDateTime.ofInstant(now, zone);
        System.out.println("LocalDateTime: " + localDateTime);

        // Instant is good for: timestamps, duration calculations, database storage
        // Not good for: extracting date/time components, user display
    }
}
```

**Why:** Instant is machine timestamp; convert to ZonedDateTime/LocalDateTime to access date/time components.

**💡 Tip:** Convert Instant to ZonedDateTime/LocalDateTime using `atZone()` or `ofInstant()` to access components.

---

#### ❌ Wrong - Using System.currentTimeMillis() Instead of Instant:
```java
// WRONG - Using old timestamp approach
public class Main {
    public static void main(String[] args) {
        // Old way - milliseconds since epoch
        long timestamp = System.currentTimeMillis();
        System.out.println("Timestamp: " + timestamp);  // Raw number, not readable

        // Hard to work with for date arithmetic
        long oneHourLater = timestamp + (60 * 60 * 1000);  // Error-prone math
    }
}
```
**Issue:** `System.currentTimeMillis()` returns raw milliseconds; less readable, error-prone arithmetic

#### ✅ Right:
```java
// CORRECT - Use Instant for timestamps
import java.time.Instant;
import java.time.Duration;

public class Main {
    public static void main(String[] args) {
        // New way - Instant
        Instant now = Instant.now();
        System.out.println("Now: " + now);  // Human-readable ISO-8601 format

        // Easy arithmetic with Duration
        Instant oneHourLater = now.plus(Duration.ofHours(1));
        System.out.println("1 hour later: " + oneHourLater);

        // Calculate duration between instants
        Instant start = Instant.now();
        // ... do some work ...
        Instant end = Instant.now();
        Duration elapsed = Duration.between(start, end);
        System.out.println("Elapsed: " + elapsed.toMillis() + " ms");

        // Convert to epoch milliseconds if needed (e.g., for database)
        long epochMilli = now.toEpochMilli();

        // Convert back from epoch milliseconds
        Instant fromEpoch = Instant.ofEpochMilli(epochMilli);

        // Instant is immutable, thread-safe, and has clear API
    }
}
```

**Why:** Instant is more readable, has clear API for arithmetic, and is immutable/thread-safe.

**💡 Tip:** Use Instant instead of System.currentTimeMillis(); use Duration for time calculations.

---

#### ❌ Wrong - Expecting Instant to Have Timezone:
```java
// WRONG - Expecting Instant to have timezone information
import java.time.Instant;

public class Main {
    public static void main(String[] args) {
        Instant now = Instant.now();

        // Instant has no timezone! It's UTC
        // Can't get "local" hour from Instant directly
        // int hour = now.getHour();  // Compile error!
    }
}
```
**Issue:** Instant is always UTC with no timezone information

#### ✅ Right:
```java
// CORRECT - Instant is UTC; convert to zone for local representation
import java.time.*;

public class Main {
    public static void main(String[] args) {
        // Instant is always UTC (no timezone)
        Instant utcInstant = Instant.now();
        System.out.println("UTC Instant: " + utcInstant);

        // To get local representation, convert to ZonedDateTime
        ZoneId newYorkZone = ZoneId.of("America/New_York");
        ZonedDateTime newYorkTime = utcInstant.atZone(newYorkZone);
        System.out.println("New York: " + newYorkTime);

        ZoneId tokyoZone = ZoneId.of("Asia/Tokyo");
        ZonedDateTime tokyoTime = utcInstant.atZone(tokyoZone);
        System.out.println("Tokyo: " + tokyoTime);

        // Same instant, different local representations
        // Instant represents a point on timeline (UTC)
        // ZonedDateTime represents that point in a specific timezone

        // Use Instant for: storage, logging, point-in-time events
        // Use ZonedDateTime for: display, scheduling, timezone-aware operations
    }
}
```

**Why:** Instant is always UTC; use `atZone()` to convert to timezone for local representation.

**💡 Tip:** Instant = UTC point in time; use `atZone()` to convert to specific timezone for display.

---

### 6. Period and Duration Mistakes

#### ❌ Wrong - Using Period with Time Components:
```java
// WRONG - Trying to use Period for hours/minutes/seconds
import java.time.Period;

public class Main {
    public static void main(String[] args) {
        // Period doesn't support time components!
        // Period period = Period.ofHours(2);  // No such method!
        // Period has: ofYears, ofMonths, ofWeeks, ofDays only

        Period period = Period.of(1, 2, 15);  // 1 year, 2 months, 15 days
        // No hours, minutes, seconds
    }
}
```
**Issue:** Period only supports date-based units (years, months, weeks, days); not time units

#### ✅ Right:
```java
// CORRECT - Period for dates, Duration for time
import java.time.*;

public class Main {
    public static void main(String[] args) {
        // Period for date-based amounts (years, months, days)
        Period period = Period.of(1, 2, 15);  // 1 year, 2 months, 15 days
        Period twoWeeks = Period.ofWeeks(2);
        Period thirtyDays = Period.ofDays(30);

        LocalDate date = LocalDate.of(2024, 1, 1);
        LocalDate future = date.plus(period);
        System.out.println("After period: " + future);

        // Duration for time-based amounts (hours, minutes, seconds, nanos)
        Duration duration = Duration.ofHours(2);
        Duration fiveMinutes = Duration.ofMinutes(5);
        Duration tenSeconds = Duration.ofSeconds(10);
        Duration combined = Duration.ofHours(2).plusMinutes(30).plusSeconds(15);

        LocalTime time = LocalTime.of(10, 0);
        LocalTime later = time.plus(duration);
        System.out.println("After duration: " + later);

        // Use Period with LocalDate, Duration with LocalTime/LocalDateTime
    }
}
```

**Why:** Period = date units (years/months/days); Duration = time units (hours/minutes/seconds/nanos).

**💡 Tip:** Period for dates (years/months/days); Duration for time (hours/minutes/seconds).

---

#### ❌ Wrong - Not Understanding Period Normalization:
```java
// WRONG - Expecting Period to automatically normalize
import java.time.Period;

public class Main {
    public static void main(String[] args) {
        // Creating period with 40 days
        Period period = Period.ofDays(40);

        System.out.println("Days: " + period.getDays());  // 40
        System.out.println("Months: " + period.getMonths());  // 0 - not normalized!

        // Student expects 1 month + 10 days, but Period doesn't normalize
    }
}
```
**Issue:** Period doesn't automatically normalize (e.g., 40 days doesn't become 1 month + 10 days)

#### ✅ Right:
```java
// CORRECT - Understanding Period normalization
import java.time.*;

public class Main {
    public static void main(String[] args) {
        // Period stores exact values given, doesn't auto-normalize
        Period period1 = Period.ofDays(40);
        System.out.println("40 days period: " + period1);  // P40D (not P1M10D)

        // Use normalized() to normalize months/years (but not days->months)
        Period period2 = Period.of(1, 15, 10);  // 1 year, 15 months, 10 days
        Period normalized = period2.normalized();
        System.out.println("Before normalize: " + period2);      // P1Y15M10D
        System.out.println("After normalize: " + normalized);    // P2Y3M10D (15 months = 1 year + 3 months)

        // Days are NOT normalized to months (because months vary in length)
        Period manyDays = Period.ofDays(100);
        System.out.println("100 days: " + manyDays.normalized());  // Still P100D

        // For accurate period between dates, use Period.between()
        LocalDate start = LocalDate.of(2024, 1, 1);
        LocalDate end = LocalDate.of(2024, 5, 15);
        Period between = Period.between(start, end);
        System.out.println("Period between: " + between);  // P4M14D (4 months, 14 days)
    }
}
```

**Why:** Period doesn't auto-normalize days to months (varying lengths); use `normalized()` for years/months.

**💡 Tip:** Period doesn't normalize days to months; use `Period.between()` for accurate date differences.

---

#### ❌ Wrong - Confusing Duration toString Output:
```java
// WRONG - Misreading Duration toString format
import java.time.Duration;

public class Main {
    public static void main(String[] args) {
        Duration duration = Duration.ofHours(2).plusMinutes(30);

        System.out.println(duration);  // PT2H30M
        // Student confused by "PT" prefix and format
    }
}
```
**Issue:** Duration toString uses ISO-8601 format (PT prefix); can be confusing to read

#### ✅ Right:
```java
// CORRECT - Understanding Duration format and extraction
import java.time.Duration;

public class Main {
    public static void main(String[] args) {
        Duration duration = Duration.ofHours(2).plusMinutes(30).plusSeconds(45);

        // toString uses ISO-8601: PT prefix, then H/M/S
        System.out.println("Duration: " + duration);  // PT2H30M45S
        // PT = Period of Time
        // 2H = 2 hours
        // 30M = 30 minutes
        // 45S = 45 seconds

        // Extract components for display
        long hours = duration.toHours();
        long minutes = duration.toMinutesPart();  // Part after hours
        long seconds = duration.toSecondsPart();  // Part after minutes

        System.out.println("Human readable: " + hours + "h " + minutes + "m " + seconds + "s");

        // Or convert to different units
        long totalMinutes = duration.toMinutes();
        long totalSeconds = duration.toSeconds();
        long totalMillis = duration.toMillis();

        System.out.println("Total minutes: " + totalMinutes);
        System.out.println("Total seconds: " + totalSeconds);

        // Use toPart methods (Java 9+) to get individual components
        // toHoursPart(), toMinutesPart(), toSecondsPart(), toMillisPart(), toNanosPart()
    }
}
```

**Why:** Duration toString is ISO-8601 (PT prefix); use extraction methods for readable format.

**💡 Tip:** Use `toHours()`, `toMinutesPart()`, `toSecondsPart()` to extract Duration components for display.

---

#### ❌ Wrong - Using Duration with LocalDate:
```java
// WRONG - Trying to use Duration (time-based) with LocalDate (date-only)
import java.time.Duration;
import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        LocalDate date = LocalDate.now();
        Duration duration = Duration.ofHours(2);

        // UnsupportedTemporalTypeException! LocalDate has no time component
        LocalDate result = date.plus(duration);
    }
}
```
**Issue:** Duration is time-based; can't add to LocalDate which has no time component

#### ✅ Right:
```java
// CORRECT - Match Period/Duration to date/time type
import java.time.*;

public class Main {
    public static void main(String[] args) {
        // LocalDate - use Period (date-based)
        LocalDate date = LocalDate.now();
        Period period = Period.ofDays(10);
        LocalDate datePlus = date.plus(period);
        System.out.println("Date + 10 days: " + datePlus);

        // LocalTime - use Duration (time-based)
        LocalTime time = LocalTime.now();
        Duration duration = Duration.ofHours(2);
        LocalTime timePlus = time.plus(duration);
        System.out.println("Time + 2 hours: " + timePlus);

        // LocalDateTime - can use both Period and Duration
        LocalDateTime dateTime = LocalDateTime.now();
        LocalDateTime dateTimePlusPeriod = dateTime.plus(period);
        LocalDateTime dateTimePlusDuration = dateTime.plus(duration);
        System.out.println("DateTime + Period: " + dateTimePlusPeriod);
        System.out.println("DateTime + Duration: " + dateTimePlusDuration);

        // Rule: LocalDate → Period, LocalTime → Duration, LocalDateTime → both
    }
}
```

**Why:** LocalDate works with Period (date-based); LocalTime with Duration (time-based); LocalDateTime with both.

**💡 Tip:** LocalDate + Period, LocalTime + Duration, LocalDateTime + both.

---

### 7. Temporal Adjusters Mistakes

#### ❌ Wrong - Manual Calculation Instead of TemporalAdjusters:
```java
// WRONG - Manually calculating next occurrence
import java.time.*;

public class Main {
    public static void main(String[] args) {
        LocalDate today = LocalDate.now();

        // Manually finding next Monday - complex and error-prone
        DayOfWeek currentDay = today.getDayOfWeek();
        int daysUntilMonday = (DayOfWeek.MONDAY.getValue() - currentDay.getValue() + 7) % 7;
        if (daysUntilMonday == 0) daysUntilMonday = 7;
        LocalDate nextMonday = today.plusDays(daysUntilMonday);
    }
}
```
**Issue:** Manual calculations complex and error-prone; TemporalAdjusters provide ready-made solutions

#### ✅ Right:
```java
// CORRECT - Use TemporalAdjusters for common date calculations
import java.time.*;
import java.time.temporal.TemporalAdjusters;

public class Main {
    public static void main(String[] args) {
        LocalDate today = LocalDate.of(2024, 1, 15);  // Monday

        // Next occurrence of day of week
        LocalDate nextMonday = today.with(TemporalAdjusters.next(DayOfWeek.MONDAY));
        System.out.println("Next Monday: " + nextMonday);

        // Next or same
        LocalDate nextOrSameMonday = today.with(TemporalAdjusters.nextOrSame(DayOfWeek.MONDAY));
        System.out.println("Next or same Monday: " + nextOrSameMonday);

        // Previous occurrence
        LocalDate previousFriday = today.with(TemporalAdjusters.previous(DayOfWeek.FRIDAY));
        System.out.println("Previous Friday: " + previousFriday);

        // First/last day of month
        LocalDate firstDayOfMonth = today.with(TemporalAdjusters.firstDayOfMonth());
        LocalDate lastDayOfMonth = today.with(TemporalAdjusters.lastDayOfMonth());
        System.out.println("First of month: " + firstDayOfMonth);
        System.out.println("Last of month: " + lastDayOfMonth);

        // First/last day of year
        LocalDate firstDayOfYear = today.with(TemporalAdjusters.firstDayOfYear());
        LocalDate lastDayOfYear = today.with(TemporalAdjusters.lastDayOfYear());

        // First/last day of next month
        LocalDate firstDayNextMonth = today.with(TemporalAdjusters.firstDayOfNextMonth());
        LocalDate lastDayNextMonth = today.with(TemporalAdjusters.lastDayOfNextMonth());
    }
}
```

**Why:** TemporalAdjusters provide tested implementations for common date calculations.

**💡 Tip:** Use TemporalAdjusters for common calculations: next/previous day, first/last of month/year.

---

#### ❌ Wrong - Not Using Custom TemporalAdjuster:
```java
// WRONG - Complex logic in loop instead of custom adjuster
import java.time.*;

public class Main {
    public static void main(String[] args) {
        LocalDate date = LocalDate.of(2024, 1, 15);

        // Manually finding next working day (skip weekends)
        LocalDate nextWorkingDay = date.plusDays(1);
        while (nextWorkingDay.getDayOfWeek() == DayOfWeek.SATURDAY ||
               nextWorkingDay.getDayOfWeek() == DayOfWeek.SUNDAY) {
            nextWorkingDay = nextWorkingDay.plusDays(1);
        }
    }
}
```
**Issue:** Complex logic repeated; should create reusable custom TemporalAdjuster

#### ✅ Right:
```java
// CORRECT - Create custom TemporalAdjuster for reusability
import java.time.*;
import java.time.temporal.*;

public class Main {
    public static void main(String[] args) {
        LocalDate date = LocalDate.of(2024, 1, 15);

        // Use custom adjuster
        LocalDate nextWorkingDay = date.with(nextWorkingDay());
        System.out.println("Next working day: " + nextWorkingDay);

        // Reusable across multiple dates
        LocalDate friday = LocalDate.of(2024, 1, 19);
        LocalDate afterWeekend = friday.with(nextWorkingDay());
        System.out.println("After weekend: " + afterWeekend);  // Monday
    }

    // Custom TemporalAdjuster
    private static TemporalAdjuster nextWorkingDay() {
        return temporal -> {
            LocalDate date = LocalDate.from(temporal);
            do {
                date = date.plusDays(1);
            } while (date.getDayOfWeek() == DayOfWeek.SATURDAY ||
                     date.getDayOfWeek() == DayOfWeek.SUNDAY);
            return date;
        };
    }

    // Another example: Last working day of month
    private static TemporalAdjuster lastWorkingDayOfMonth() {
        return temporal -> {
            LocalDate date = LocalDate.from(temporal);
            date = date.with(TemporalAdjusters.lastDayOfMonth());
            while (date.getDayOfWeek() == DayOfWeek.SATURDAY ||
                   date.getDayOfWeek() == DayOfWeek.SUNDAY) {
                date = date.minusDays(1);
            }
            return date;
        };
    }
}
```

**Why:** Custom TemporalAdjusters encapsulate complex logic; reusable and testable.

**💡 Tip:** Create custom TemporalAdjuster for complex/repeated date logic; use with `with()` method.

---

#### ❌ Wrong - Using TemporalAdjuster with Wrong Type:
```java
// WRONG - Using date adjuster with time type
import java.time.*;
import java.time.temporal.TemporalAdjusters;

public class Main {
    public static void main(String[] args) {
        LocalTime time = LocalTime.now();

        // TemporalAdjusters.firstDayOfMonth() is for dates, not times!
        LocalTime adjusted = time.with(TemporalAdjusters.firstDayOfMonth());  // UnsupportedTemporalTypeException!
    }
}
```
**Issue:** Using date-based adjuster with time type

#### ✅ Right:
```java
// CORRECT - Match adjuster to type
import java.time.*;
import java.time.temporal.TemporalAdjusters;

public class Main {
    public static void main(String[] args) {
        // Date adjusters with LocalDate
        LocalDate date = LocalDate.now();
        LocalDate firstOfMonth = date.with(TemporalAdjusters.firstDayOfMonth());
        LocalDate lastOfYear = date.with(TemporalAdjusters.lastDayOfYear());

        // Time adjusters for LocalTime (less common, usually manual)
        LocalTime time = LocalTime.now();
        LocalTime startOfHour = time.withMinute(0).withSecond(0).withNano(0);
        LocalTime noon = time.withHour(12).withMinute(0).withSecond(0).withNano(0);

        // LocalDateTime can use both date and time adjusters
        LocalDateTime dateTime = LocalDateTime.now();
        LocalDateTime firstOfMonthNoon = dateTime
            .with(TemporalAdjusters.firstDayOfMonth())
            .withHour(12)
            .withMinute(0)
            .withSecond(0)
            .withNano(0);

        System.out.println("First of month at noon: " + firstOfMonthNoon);
    }
}
```

**Why:** Date adjusters work with LocalDate/LocalDateTime; time adjustments typically manual with `with*()` methods.

**💡 Tip:** TemporalAdjusters mainly for date calculations; use `with*()` methods for time adjustments.

---

### 8. Legacy Date Conversion Mistakes

#### ❌ Wrong - Not Converting from Legacy Date:
```java
// WRONG - Mixing old and new APIs directly
import java.util.Date;
import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        Date oldDate = new Date();

        // Can't convert directly!
        // LocalDate newDate = oldDate;  // Type mismatch!
        // LocalDate newDate = new LocalDate(oldDate);  // No such constructor!
    }
}
```
**Issue:** Can't directly convert between old Date and new LocalDate; need conversion

#### ✅ Right:
```java
// CORRECT - Converting between old and new date APIs
import java.util.Date;
import java.time.*;

public class Main {
    public static void main(String[] args) {
        // Old Date to new API
        Date oldDate = new Date();

        // Date -> Instant -> LocalDateTime
        Instant instant = oldDate.toInstant();
        LocalDateTime localDateTime = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
        System.out.println("LocalDateTime: " + localDateTime);

        // Date -> Instant -> LocalDate
        LocalDate localDate = instant.atZone(ZoneId.systemDefault()).toLocalDate();
        System.out.println("LocalDate: " + localDate);

        // Date -> Instant -> ZonedDateTime
        ZonedDateTime zonedDateTime = instant.atZone(ZoneId.systemDefault());
        System.out.println("ZonedDateTime: " + zonedDateTime);

        // New API back to old Date
        LocalDateTime newDateTime = LocalDateTime.now();
        Instant instantFromNew = newDateTime.atZone(ZoneId.systemDefault()).toInstant();
        Date dateFromNew = Date.from(instantFromNew);
        System.out.println("Back to Date: " + dateFromNew);

        // Conversion chain:
        // Date -> toInstant() -> Instant
        // Instant -> atZone(ZoneId) -> ZonedDateTime
        // ZonedDateTime -> toLocalDateTime() -> LocalDateTime
        // ZonedDateTime -> toLocalDate() -> LocalDate
        // LocalDateTime -> atZone(ZoneId) -> ZonedDateTime -> toInstant() -> Date.from()
    }
}
```

**Why:** Convert via Instant as intermediate: Date ↔ Instant ↔ ZonedDateTime ↔ LocalDateTime/LocalDate.

**💡 Tip:** Convert Date ↔ LocalDate via Instant: Date.toInstant() → atZone() → toLocalDate(); reverse with Date.from().

---

#### ❌ Wrong - Using Calendar Instead of New API:
```java
// WRONG - Still using old Calendar API
import java.util.Calendar;

public class Main {
    public static void main(String[] args) {
        Calendar cal = Calendar.getInstance();
        cal.set(2024, 0, 15);  // Month is 0-based - confusing!
        cal.add(Calendar.DAY_OF_MONTH, 10);

        int year = cal.get(Calendar.YEAR);
        int month = cal.get(Calendar.MONTH);  // 0-based
        int day = cal.get(Calendar.DAY_OF_MONTH);
    }
}
```
**Issue:** Calendar is old API with confusing design; use new API

#### ✅ Right:
```java
// CORRECT - Use new java.time API
import java.time.*;

public class Main {
    public static void main(String[] args) {
        // New API - clear and intuitive
        LocalDate date = LocalDate.of(2024, 1, 15);  // Month is 1-based, natural!
        LocalDate datePlus = date.plusDays(10);

        int year = date.getYear();
        int month = date.getMonthValue();  // 1-based
        int day = date.getDayOfMonth();

        System.out.println("Date: " + date);
        System.out.println("Plus 10 days: " + datePlus);

        // If must work with legacy Calendar, convert
        Calendar legacyCal = Calendar.getInstance();
        // Calendar -> Date -> Instant -> LocalDate
        LocalDate fromCalendar = LocalDateTime.ofInstant(
            legacyCal.toInstant(),
            ZoneId.systemDefault()
        ).toLocalDate();

        // LocalDate -> ZonedDateTime -> Instant -> Date -> Calendar
        ZonedDateTime zonedDateTime = date.atStartOfDay(ZoneId.systemDefault());
        Calendar backToCalendar = Calendar.getInstance();
        backToCalendar.setTime(Date.from(zonedDateTime.toInstant()));
    }
}
```

**Why:** New API is clearer, immutable, thread-safe; avoid Calendar unless interfacing with legacy code.

**💡 Tip:** Use java.time API; convert to/from Calendar only when interfacing with legacy code.

---

#### ❌ Wrong - Ignoring Timezone in Legacy Conversion:
```java
// WRONG - Not considering timezone when converting
import java.util.Date;
import java.time.*;

public class Main {
    public static void main(String[] args) {
        Date oldDate = new Date();

        // Using UTC zone might not be what user expects
        LocalDateTime localDateTime = LocalDateTime.ofInstant(
            oldDate.toInstant(),
            ZoneId.of("UTC")  // Hardcoded UTC!
        );
        // User in New York sees wrong time!
    }
}
```
**Issue:** Hardcoding timezone in conversion; should use system default or specified zone

#### ✅ Right:
```java
// CORRECT - Use appropriate timezone in conversion
import java.util.Date;
import java.time.*;

public class Main {
    public static void main(String[] args) {
        Date oldDate = new Date();

        // Option 1: Use system default timezone
        LocalDateTime systemLocal = LocalDateTime.ofInstant(
            oldDate.toInstant(),
            ZoneId.systemDefault()
        );
        System.out.println("System timezone: " + systemLocal);

        // Option 2: Specify timezone explicitly
        ZoneId newYork = ZoneId.of("America/New_York");
        LocalDateTime newYorkTime = LocalDateTime.ofInstant(
            oldDate.toInstant(),
            newYork
        );
        System.out.println("New York time: " + newYorkTime);

        // Option 3: Keep as ZonedDateTime to preserve timezone info
        ZonedDateTime zonedDateTime = oldDate.toInstant().atZone(ZoneId.systemDefault());
        System.out.println("Zoned: " + zonedDateTime);

        // When converting back to Date, timezone used in conversion
        LocalDateTime local = LocalDateTime.now();
        ZonedDateTime zoned = local.atZone(ZoneId.systemDefault());
        Date backToDate = Date.from(zoned.toInstant());

        System.out.println("Back to Date: " + backToDate);
    }
}
```

**Why:** Always specify timezone explicitly or use system default; don't hardcode UTC unless intended.

**💡 Tip:** Use `ZoneId.systemDefault()` or specific zone in conversions; don't hardcode UTC.

---

### 9. Thread Safety Mistakes

#### ❌ Wrong - Thinking SimpleDateFormat is Thread-Safe:
```java
// WRONG - Sharing SimpleDateFormat across threads (NOT THREAD-SAFE!)
import java.text.SimpleDateFormat;
import java.util.Date;

public class Main {
    private static final SimpleDateFormat formatter =
        new SimpleDateFormat("yyyy-MM-dd");  // Shared, not thread-safe!

    public static void main(String[] args) {
        // Multiple threads using same formatter - RACE CONDITIONS!
        for (int i = 0; i < 10; i++) {
            new Thread(() -> {
                String formatted = formatter.format(new Date());  // NOT SAFE!
                System.out.println(formatted);
            }).start();
        }
    }
}
```
**Issue:** SimpleDateFormat is NOT thread-safe; sharing across threads causes race conditions

#### ✅ Right:
```java
// CORRECT - DateTimeFormatter is thread-safe
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Main {
    // DateTimeFormatter is immutable and thread-safe - safe to share
    private static final DateTimeFormatter FORMATTER =
        DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public static void main(String[] args) {
        // Multiple threads using same formatter - SAFE!
        for (int i = 0; i < 10; i++) {
            new Thread(() -> {
                LocalDateTime now = LocalDateTime.now();
                String formatted = now.format(FORMATTER);  // SAFE!
                System.out.println(formatted);
            }).start();
        }

        // All java.time classes are immutable and thread-safe
        // Can safely share LocalDate, LocalTime, LocalDateTime,
        // ZonedDateTime, Instant, Duration, Period, DateTimeFormatter
    }
}
```

**Why:** DateTimeFormatter and all java.time classes are immutable and thread-safe; SimpleDateFormat is not.

**💡 Tip:** All java.time classes (including DateTimeFormatter) are thread-safe; SimpleDateFormat is NOT.

---

#### ❌ Wrong - Mutating Shared Date Object:
```java
// WRONG - Mutating shared old Date (mutable and not thread-safe!)
import java.util.Date;
import java.util.Calendar;

public class Main {
    private static Date sharedDate = new Date();  // Shared, mutable!

    public static void main(String[] args) {
        // Multiple threads modifying shared date - RACE CONDITIONS!
        for (int i = 0; i < 10; i++) {
            new Thread(() -> {
                Calendar cal = Calendar.getInstance();
                cal.setTime(sharedDate);
                cal.add(Calendar.DAY_OF_MONTH, 1);
                sharedDate = cal.getTime();  // NOT SAFE!
            }).start();
        }
    }
}
```
**Issue:** Old Date is mutable; sharing across threads causes race conditions

#### ✅ Right:
```java
// CORRECT - java.time classes are immutable, safe to share
import java.time.LocalDate;
import java.util.concurrent.atomic.AtomicReference;

public class Main {
    // LocalDate is immutable - safe to share read-only
    private static final LocalDate IMMUTABLE_DATE = LocalDate.of(2024, 1, 15);

    // For mutable reference, use AtomicReference
    private static final AtomicReference<LocalDate> currentDate =
        new AtomicReference<>(LocalDate.now());

    public static void main(String[] args) {
        // Multiple threads reading immutable date - SAFE!
        for (int i = 0; i < 10; i++) {
            new Thread(() -> {
                LocalDate date = IMMUTABLE_DATE;  // Safe to read
                System.out.println(date);
            }).start();
        }

        // Multiple threads updating atomic reference - SAFE!
        for (int i = 0; i < 10; i++) {
            new Thread(() -> {
                currentDate.updateAndGet(date -> date.plusDays(1));  // Atomic update
                System.out.println("Updated: " + currentDate.get());
            }).start();
        }

        // Each operation returns new instance, original unchanged
        LocalDate date = LocalDate.now();
        LocalDate tomorrow = date.plusDays(1);  // date unchanged, new instance created
    }
}
```

**Why:** java.time classes are immutable; operations return new instances, original unchanged.

**💡 Tip:** java.time classes immutable and thread-safe; use AtomicReference for mutable shared reference.

---

### 10. Best Practices and Miscellaneous Mistakes

#### ❌ Wrong - Using now() in Tests:
```java
// WRONG - Using now() makes tests non-deterministic
import java.time.LocalDate;

public class AgeCalculator {
    public int calculateAge(LocalDate birthDate) {
        LocalDate today = LocalDate.now();  // Non-deterministic!
        return today.getYear() - birthDate.getYear();
    }
}

// Test fails on different days!
```
**Issue:** Using `now()` in logic makes code non-deterministic and hard to test

#### ✅ Right:
```java
// CORRECT - Pass date as parameter for testability
import java.time.LocalDate;
import java.time.Period;

public class AgeCalculator {
    // Pass current date as parameter (dependency injection)
    public int calculateAge(LocalDate birthDate, LocalDate currentDate) {
        Period period = Period.between(birthDate, currentDate);
        return period.getYears();
    }

    // Convenience method for production use
    public int calculateAge(LocalDate birthDate) {
        return calculateAge(birthDate, LocalDate.now());
    }
}

// Now testable!
class AgeCalculatorTest {
    public static void main(String[] args) {
        AgeCalculator calculator = new AgeCalculator();

        LocalDate birthDate = LocalDate.of(1990, 1, 15);
        LocalDate testDate = LocalDate.of(2024, 1, 15);

        int age = calculator.calculateAge(birthDate, testDate);
        System.out.println("Age: " + age);  // Always 34, deterministic!
    }
}
```

**Why:** Pass date as parameter for testability; use `now()` only at application boundaries.

**💡 Tip:** Pass current date as parameter for testability; inject `Clock` for more flexibility.

---

#### ❌ Wrong - Storing Dates as Strings in Database:
```java
// WRONG - Storing dates as strings (loses timezone, hard to query)
import java.time.LocalDateTime;

public class Main {
    public void saveEvent(String eventName) {
        LocalDateTime eventTime = LocalDateTime.now();
        String dateString = eventTime.toString();  // "2024-01-15T14:30:45"

        // Store dateString in database - WRONG!
        // - No timezone information
        // - Hard to query/sort
        // - String comparison not date comparison
    }
}
```
**Issue:** Storing dates as strings loses timezone info and makes querying difficult

#### ✅ Right:
```java
// CORRECT - Store as Instant (UTC timestamp) or use database date types
import java.time.*;

public class Main {
    public void saveEvent(String eventName) {
        // Option 1: Store as Instant (UTC timestamp)
        Instant timestamp = Instant.now();
        // Save timestamp.toEpochMilli() or timestamp as TIMESTAMP in database

        // Option 2: Store as ZonedDateTime with timezone
        ZonedDateTime zonedTime = ZonedDateTime.now();
        // Save zonedTime.toInstant() and zonedTime.getZone().getId() separately

        // Option 3: Use database date types
        // Most databases have TIMESTAMP, DATE, TIME types
        // Use PreparedStatement.setTimestamp() with java.sql.Timestamp

        // Converting for JDBC:
        java.sql.Timestamp sqlTimestamp = java.sql.Timestamp.from(timestamp);
        // Save sqlTimestamp using PreparedStatement

        System.out.println("Timestamp: " + timestamp);
        System.out.println("SQL Timestamp: " + sqlTimestamp);
    }

    public LocalDateTime loadEvent() {
        // Loading from database:
        // Instant instant = Instant.ofEpochMilli(dbValue);
        // LocalDateTime localDateTime = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());

        return LocalDateTime.now();
    }
}
```

**Why:** Store as Instant (UTC) or use database timestamp types; enables proper querying and sorting.

**💡 Tip:** Store dates as Instant (UTC) or database TIMESTAMP type; never as string.

---

#### ❌ Wrong - Not Validating Date Input:
```java
// WRONG - Not validating user input dates
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Main {
    public static void main(String[] args) {
        String userInput = "2024-02-30";  // Invalid date!
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        // DateTimeParseException! Feb 30 doesn't exist
        LocalDate date = LocalDate.parse(userInput, formatter);
    }
}
```
**Issue:** Not validating user input; invalid dates crash application

#### ✅ Right:
```java
// CORRECT - Validate date input with proper error handling
import java.time.LocalDate;
import java.time.format.*;

public class Main {
    public static void main(String[] args) {
        String[] inputs = {"2024-01-15", "2024-02-30", "invalid", "2024-13-01"};

        for (String input : inputs) {
            LocalDate date = parseDate(input);
            if (date != null) {
                System.out.println("Valid date: " + date);
            } else {
                System.out.println("Invalid date: " + input);
            }
        }
    }

    private static LocalDate parseDate(String dateString) {
        if (dateString == null || dateString.trim().isEmpty()) {
            return null;
        }

        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            return LocalDate.parse(dateString.trim(), formatter);
        } catch (DateTimeParseException e) {
            System.err.println("Failed to parse '" + dateString + "': " + e.getMessage());
            return null;
        }
    }

    // Or with validation before parsing
    private static boolean isValidDateFormat(String dateString) {
        if (dateString == null || !dateString.matches("\\d{4}-\\d{2}-\\d{2}")) {
            return false;
        }

        try {
            LocalDate.parse(dateString);
            return true;
        } catch (DateTimeParseException e) {
            return false;
        }
    }
}
```

**Why:** Always validate user input; catch DateTimeParseException to prevent crashes.

**💡 Tip:** Always validate date input with try-catch; provide user-friendly error messages.

---

#### ❌ Wrong - Not Considering Leap Years:
```java
// WRONG - Not accounting for leap years
import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        // Student assumes Feb always has 28 days
        LocalDate date = LocalDate.of(2024, 2, 28);
        LocalDate tomorrow = date.plusDays(1);

        // Student expects March 1, but 2024 is leap year!
        System.out.println("Tomorrow: " + tomorrow);  // 2024-02-29, not March 1!
    }
}
```
**Issue:** Not considering leap years; Feb can have 29 days

#### ✅ Right:
```java
// CORRECT - Use API methods to handle leap years
import java.time.*;

public class Main {
    public static void main(String[] args) {
        // Check if leap year
        int year = 2024;
        boolean isLeap = Year.of(year).isLeap();
        System.out.println(year + " is leap year? " + isLeap);  // true

        // Get length of month (accounts for leap years)
        LocalDate date = LocalDate.of(2024, 2, 1);
        int daysInMonth = date.lengthOfMonth();
        System.out.println("Days in Feb 2024: " + daysInMonth);  // 29

        LocalDate date2023 = LocalDate.of(2023, 2, 1);
        System.out.println("Days in Feb 2023: " + date2023.lengthOfMonth());  // 28

        // Get length of year
        int daysInYear = date.lengthOfYear();
        System.out.println("Days in 2024: " + daysInYear);  // 366

        // API handles leap years automatically
        LocalDate feb28_2024 = LocalDate.of(2024, 2, 28);
        LocalDate nextDay = feb28_2024.plusDays(1);
        System.out.println("Feb 28 + 1 day: " + nextDay);  // 2024-02-29

        LocalDate feb28_2023 = LocalDate.of(2023, 2, 28);
        LocalDate nextDay2023 = feb28_2023.plusDays(1);
        System.out.println("Feb 28 2023 + 1 day: " + nextDay2023);  // 2023-03-01
    }
}
```

**Why:** Use API methods that handle leap years automatically; don't hardcode month lengths.

**💡 Tip:** Use `Year.isLeap()`, `lengthOfMonth()`, `lengthOfYear()` to handle leap years; API handles automatically.

---

#### ❌ Wrong - Using Magic Numbers for Date Constants:
```java
// WRONG - Using magic numbers for dates
import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        LocalDate date = LocalDate.of(2024, 1, 15);  // What is 1? Month? Day?
        LocalDate endDate = date.plusDays(90);  // Why 90?

        // Hard to understand and maintain
    }
}
```
**Issue:** Magic numbers make code hard to understand and maintain

#### ✅ Right:
```java
// CORRECT - Use named constants and Month enum
import java.time.*;

public class Main {
    // Named constants
    private static final int TRIAL_PERIOD_DAYS = 90;
    private static final int SUBSCRIPTION_MONTHS = 12;

    public static void main(String[] args) {
        // Use Month enum for clarity
        LocalDate startDate = LocalDate.of(2024, Month.JANUARY, 15);
        LocalDate trialEnd = startDate.plusDays(TRIAL_PERIOD_DAYS);
        LocalDate subscriptionEnd = startDate.plusMonths(SUBSCRIPTION_MONTHS);

        System.out.println("Start: " + startDate);
        System.out.println("Trial ends: " + trialEnd);
        System.out.println("Subscription ends: " + subscriptionEnd);

        // Or use constants for common dates
        LocalDate yearStart = LocalDate.of(2024, Month.JANUARY, 1);
        LocalDate yearEnd = LocalDate.of(2024, Month.DECEMBER, 31);

        // Much clearer than:
        // LocalDate yearStart = LocalDate.of(2024, 1, 1);
        // LocalDate yearEnd = LocalDate.of(2024, 12, 31);
    }
}
```

**Why:** Named constants and Month enum improve code clarity and maintainability.

**💡 Tip:** Use Month enum and named constants; avoid magic numbers in date code.

---

This comprehensive list contains **40+ Date & Time API mistakes** covering all fundamental concepts!

---

**🎉 Congratulations on completing Day 29!**

You've mastered the Date & Time API. Tomorrow is the final review and project day!

**Next**: [Day 30: Final Review & Project →](day30_final_review.md)

---

*Last Updated: 2026-01-09*