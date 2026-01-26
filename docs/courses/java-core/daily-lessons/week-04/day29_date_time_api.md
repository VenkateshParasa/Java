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

**🎉 Congratulations on completing Day 29!**

You've mastered the Date & Time API. Tomorrow is the final review and project day!

**Next**: [Day 30: Final Review & Project →](day30_final_review.md)

---

*Last Updated: 2026-01-09*