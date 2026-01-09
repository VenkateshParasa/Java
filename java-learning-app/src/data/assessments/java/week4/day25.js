export default {
  title: "Day 25: Date & Time API Assessment",
  description: "Test your understanding of Java 8 Date-Time API",
  passingScore: 70,
  timeLimit: 30, // minutes
  modes: {
    quick: {
      questionCount: 9,
      timeLimit: 15,
      sections: ['section-a', 'section-b']
    },
    full: {
      questionCount: 13,
      timeLimit: 30,
      sections: ['section-a', 'section-b', 'section-c']
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
          question: 'Which package contains the new Date-Time API?',
          options: [
            'java.util',
            'java.time',
            'java.date',
            'java.datetime'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'The java.time package contains the new Date-Time API introduced in Java 8.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'Which class represents a date without time?',
          options: [
            'Date',
            'LocalDate',
            'DateTime',
            'Calendar'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'LocalDate represents a date (year, month, day) without time or timezone.'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'Which class represents time without date?',
          options: [
            'Time',
            'LocalTime',
            'DateTime',
            'Clock'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'LocalTime represents time (hour, minute, second, nanosecond) without date or timezone.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'Which class represents date and time together?',
          options: [
            'DateTime',
            'LocalDateTime',
            'ZonedDateTime',
            'Date'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'LocalDateTime combines date and time without timezone. ZonedDateTime includes timezone.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'What is the difference between Period and Duration?',
          options: [
            'No difference',
            'Period is date-based, Duration is time-based',
            'Period is time-based, Duration is date-based',
            'Both are same'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Period represents date-based amounts (years, months, days). Duration represents time-based amounts (hours, minutes, seconds).'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'Which class is used to format dates?',
          options: [
            'DateFormat',
            'SimpleDateFormat',
            'DateTimeFormatter',
            'Format'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'DateTimeFormatter is used to format and parse dates in the new Date-Time API.'
        }
      ]
    },
    {
      id: 'section-b',
      title: 'Short Answer Questions',
      questions: [
        {
          id: 'q7',
          type: 'short',
          question: 'Why was a new Date-Time API introduced in Java 8? What were the problems with the old API?',
          sampleAnswer: 'Problems with old API (Date, Calendar): 1) Not thread-safe - mutable classes causing concurrency issues. 2) Poor design - Date has both date and time despite name. 3) Difficult to use - complex API. 4) No timezone support in Date. 5) Month starts from 0 (confusing). New API benefits: 1) Immutable and thread-safe. 2) Clear separation (LocalDate, LocalTime, LocalDateTime). 3) Better timezone support. 4) Fluent API. 5) Month starts from 1. 6) ISO-8601 standard.',
          points: 3,
          difficulty: 'medium',
          keywords: ['thread-safe', 'immutable', 'Date', 'Calendar', 'timezone', 'mutable', 'design', 'LocalDate', 'ISO-8601']
        },
        {
          id: 'q8',
          type: 'short',
          question: 'Explain the difference between LocalDateTime and ZonedDateTime.',
          sampleAnswer: 'LocalDateTime represents date and time without timezone information. It\'s useful for birthdays, meetings in local context. ZonedDateTime includes timezone (ZoneId), representing a specific moment in time across different timezones. Use LocalDateTime for local events, ZonedDateTime for global events, scheduling across timezones, or when timezone matters. Example: Meeting at 2 PM (LocalDateTime) vs Flight departure at 2 PM EST (ZonedDateTime).',
          points: 3,
          difficulty: 'medium',
          keywords: ['LocalDateTime', 'ZonedDateTime', 'timezone', 'ZoneId', 'local', 'global', 'moment']
        },
        {
          id: 'q9',
          type: 'short',
          question: 'How do you calculate the difference between two dates?',
          sampleAnswer: 'Use Period for date-based difference or ChronoUnit for specific units. Methods: 1) Period.between(date1, date2) - returns years, months, days. 2) ChronoUnit.DAYS.between(date1, date2) - returns total days. 3) Duration.between(time1, time2) - for time difference. Example: Period period = Period.between(birthDate, LocalDate.now()); int years = period.getYears(); Or: long days = ChronoUnit.DAYS.between(date1, date2);',
          points: 3,
          difficulty: 'medium',
          keywords: ['Period', 'Duration', 'ChronoUnit', 'between', 'difference', 'days', 'years', 'months']
        }
      ]
    },
    {
      id: 'section-c',
      title: 'Coding Problems',
      questions: [
        {
          id: 'q10',
          type: 'short',
          question: 'Write a program to get the current date and time.',
          sampleAnswer: `import java.time.*;

public class CurrentDateTimeDemo {
    public static void main(String[] args) {
        // Current date
        LocalDate currentDate = LocalDate.now();
        System.out.println("Current Date: " + currentDate);
        
        // Current time
        LocalTime currentTime = LocalTime.now();
        System.out.println("Current Time: " + currentTime);
        
        // Current date and time
        LocalDateTime currentDateTime = LocalDateTime.now();
        System.out.println("Current Date-Time: " + currentDateTime);
        
        // Current date-time with timezone
        ZonedDateTime zonedDateTime = ZonedDateTime.now();
        System.out.println("Zoned Date-Time: " + zonedDateTime);
        
        // Specific timezone
        ZonedDateTime nyTime = ZonedDateTime.now(ZoneId.of("America/New_York"));
        System.out.println("New York Time: " + nyTime);
        
        // Instant (timestamp)
        Instant instant = Instant.now();
        System.out.println("Instant: " + instant);
        
        // Extract components
        System.out.println("\\nDate Components:");
        System.out.println("Year: " + currentDate.getYear());
        System.out.println("Month: " + currentDate.getMonth());
        System.out.println("Month Value: " + currentDate.getMonthValue());
        System.out.println("Day: " + currentDate.getDayOfMonth());
        System.out.println("Day of Week: " + currentDate.getDayOfWeek());
        
        System.out.println("\\nTime Components:");
        System.out.println("Hour: " + currentTime.getHour());
        System.out.println("Minute: " + currentTime.getMinute());
        System.out.println("Second: " + currentTime.getSecond());
    }
}`,
          points: 5,
          difficulty: 'easy',
          keywords: ['LocalDate', 'LocalTime', 'LocalDateTime', 'now', 'ZonedDateTime', 'Instant', 'current']
        },
        {
          id: 'q11',
          type: 'short',
          question: 'Write a program to calculate your age in years from your birthdate.',
          sampleAnswer: `import java.time.*;
import java.time.temporal.ChronoUnit;

public class AgeCalculator {
    public static void main(String[] args) {
        // Example birthdate
        LocalDate birthDate = LocalDate.of(1995, 5, 15);
        LocalDate currentDate = LocalDate.now();
        
        System.out.println("Birth Date: " + birthDate);
        System.out.println("Current Date: " + currentDate);
        
        // Method 1: Using Period
        Period age = Period.between(birthDate, currentDate);
        System.out.println("\\nAge (Period):");
        System.out.println(age.getYears() + " years, " + 
                          age.getMonths() + " months, " + 
                          age.getDays() + " days");
        
        // Method 2: Using ChronoUnit for total years
        long years = ChronoUnit.YEARS.between(birthDate, currentDate);
        System.out.println("\\nAge in years: " + years);
        
        // Total months
        long months = ChronoUnit.MONTHS.between(birthDate, currentDate);
        System.out.println("Age in months: " + months);
        
        // Total days
        long days = ChronoUnit.DAYS.between(birthDate, currentDate);
        System.out.println("Age in days: " + days);
        
        // Check if birthday has passed this year
        LocalDate birthdayThisYear = birthDate.withYear(currentDate.getYear());
        boolean birthdayPassed = currentDate.isAfter(birthdayThisYear) || 
                                currentDate.isEqual(birthdayThisYear);
        
        System.out.println("\\nBirthday this year: " + birthdayThisYear);
        System.out.println("Birthday passed: " + birthdayPassed);
        
        // Days until next birthday
        LocalDate nextBirthday = birthdayPassed ? 
            birthDate.withYear(currentDate.getYear() + 1) : 
            birthdayThisYear;
        long daysUntilBirthday = ChronoUnit.DAYS.between(currentDate, nextBirthday);
        System.out.println("Days until next birthday: " + daysUntilBirthday);
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['age', 'Period', 'between', 'ChronoUnit', 'YEARS', 'birthdate', 'LocalDate', 'calculate']
        },
        {
          id: 'q12',
          type: 'short',
          question: 'Write a program to format a date in "dd/MM/yyyy" pattern.',
          sampleAnswer: `import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public class DateFormattingDemo {
    public static void main(String[] args) {
        LocalDate date = LocalDate.now();
        LocalDateTime dateTime = LocalDateTime.now();
        
        System.out.println("Original date: " + date);
        System.out.println("Original date-time: " + dateTime);
        
        // Format date as dd/MM/yyyy
        DateTimeFormatter formatter1 = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        String formattedDate = date.format(formatter1);
        System.out.println("\\nFormatted (dd/MM/yyyy): " + formattedDate);
        
        // Different patterns
        DateTimeFormatter formatter2 = DateTimeFormatter.ofPattern("MM-dd-yyyy");
        System.out.println("Formatted (MM-dd-yyyy): " + date.format(formatter2));
        
        DateTimeFormatter formatter3 = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        System.out.println("Formatted (yyyy/MM/dd): " + date.format(formatter3));
        
        // With time
        DateTimeFormatter formatter4 = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        System.out.println("\\nDate-Time: " + dateTime.format(formatter4));
        
        // With day name
        DateTimeFormatter formatter5 = DateTimeFormatter.ofPattern("EEEE, dd MMMM yyyy");
        System.out.println("Full format: " + date.format(formatter5));
        
        // Predefined formatters
        System.out.println("\\nPredefined Formatters:");
        System.out.println("ISO_DATE: " + date.format(DateTimeFormatter.ISO_DATE));
        System.out.println("ISO_LOCAL_DATE: " + date.format(DateTimeFormatter.ISO_LOCAL_DATE));
        
        // Parse string to date
        String dateString = "15/08/2023";
        LocalDate parsedDate = LocalDate.parse(dateString, formatter1);
        System.out.println("\\nParsed date: " + parsedDate);
        
        // Custom format with locale
        DateTimeFormatter formatter6 = DateTimeFormatter.ofPattern(
            "dd MMMM yyyy", Locale.ENGLISH
        );
        System.out.println("With locale: " + date.format(formatter6));
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['DateTimeFormatter', 'format', 'pattern', 'dd/MM/yyyy', 'ofPattern', 'parse', 'locale']
        },
        {
          id: 'q13',
          type: 'short',
          question: 'Write a program to add 10 days to the current date and display it.',
          sampleAnswer: `import java.time.*;
import java.time.temporal.ChronoUnit;

public class DateManipulationDemo {
    public static void main(String[] args) {
        LocalDate currentDate = LocalDate.now();
        System.out.println("Current Date: " + currentDate);
        
        // Add 10 days
        LocalDate futureDate = currentDate.plusDays(10);
        System.out.println("After adding 10 days: " + futureDate);
        
        // Other addition operations
        System.out.println("\\nAddition Operations:");
        System.out.println("Add 1 week: " + currentDate.plusWeeks(1));
        System.out.println("Add 2 months: " + currentDate.plusMonths(2));
        System.out.println("Add 1 year: " + currentDate.plusYears(1));
        
        // Subtraction operations
        System.out.println("\\nSubtraction Operations:");
        System.out.println("Subtract 5 days: " + currentDate.minusDays(5));
        System.out.println("Subtract 1 month: " + currentDate.minusMonths(1));
        System.out.println("Subtract 1 year: " + currentDate.minusYears(1));
        
        // Using ChronoUnit
        LocalDate date2 = currentDate.plus(10, ChronoUnit.DAYS);
        System.out.println("\\nUsing ChronoUnit (10 days): " + date2);
        
        // Complex operations
        LocalDate complexDate = currentDate
            .plusDays(10)
            .plusMonths(2)
            .minusYears(1);
        System.out.println("\\nComplex operation: " + complexDate);
        
        // With time
        LocalDateTime currentDateTime = LocalDateTime.now();
        System.out.println("\\nCurrent Date-Time: " + currentDateTime);
        
        LocalDateTime futureDateTime = currentDateTime
            .plusDays(10)
            .plusHours(5)
            .plusMinutes(30);
        System.out.println("Future Date-Time: " + futureDateTime);
        
        // First and last day of month
        LocalDate firstDay = currentDate.withDayOfMonth(1);
        LocalDate lastDay = currentDate.withDayOfMonth(
            currentDate.lengthOfMonth()
        );
        System.out.println("\\nFirst day of month: " + firstDay);
        System.out.println("Last day of month: " + lastDay);
    }
}`,
          points: 5,
          difficulty: 'easy',
          keywords: ['plusDays', 'minusDays', 'add', 'subtract', 'LocalDate', 'ChronoUnit', 'manipulation', 'plus', 'minus']
        }
      ]
    }
  ]
};