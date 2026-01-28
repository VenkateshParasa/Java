export default {
  title: "Day 2: Variables & Data Types - Hard Assessment",
  description: "Test your advanced understanding of Java variables, data types, edge cases, type limits, and complex casting scenarios",
  difficulty: "hard",
  passingScore: 70,
  timeLimit: 45, // minutes
  sections: [
    {
      id: 'section-a',
      title: 'Advanced Multiple Choice Questions',
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          question: 'What is the output of: System.out.println(Integer.MAX_VALUE + 1);',
          options: [
            '2147483648',
            '-2147483648',
            'Compilation error',
            'Runtime exception'
          ],
          correctAnswer: 1,
          points: 3,
          difficulty: 'hard',
          explanation: 'Integer overflow occurs. MAX_VALUE is 2147483647, adding 1 causes wrap-around to -2147483648 (Integer.MIN_VALUE). Java does not throw exceptions for integer overflow.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'What is the result of: byte b = (byte)256;',
          options: [
            '0',
            '1',
            '256',
            'Compilation error'
          ],
          correctAnswer: 0,
          points: 3,
          difficulty: 'hard',
          explanation: 'byte range is -128 to 127. 256 in binary is 100000000 (9 bits). Only the lower 8 bits (00000000) are kept, resulting in 0.'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'What happens with: final int x; x = 10; x = 20;',
          options: [
            'Compiles successfully, x is 20',
            'Compilation error on first assignment',
            'Compilation error on second assignment',
            'Runtime error'
          ],
          correctAnswer: 2,
          points: 3,
          difficulty: 'hard',
          explanation: 'final variables can be assigned once. The first assignment (x = 10) is valid, but the second assignment (x = 20) causes a compilation error: "cannot assign a value to final variable x".'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'What is printed: char c = 65; System.out.println(c);',
          options: [
            '65',
            'A',
            'Compilation error',
            '0'
          ],
          correctAnswer: 1,
          points: 3,
          difficulty: 'hard',
          explanation: 'char can be assigned integer values representing Unicode code points. 65 is the ASCII/Unicode value for "A", so it prints A.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'What is the output: System.out.println(0.1 + 0.2 == 0.3);',
          options: [
            'true',
            'false',
            'Compilation error',
            'Depends on JVM'
          ],
          correctAnswer: 1,
          points: 3,
          difficulty: 'hard',
          explanation: 'Due to floating-point precision limitations, 0.1 + 0.2 equals approximately 0.30000000000000004, not exactly 0.3. This prints false. Use BigDecimal for precise decimal arithmetic.'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'What is the value of: (byte)(byte)(-1) >>> 24;',
          options: [
            '255',
            '0',
            '1',
            '-1'
          ],
          correctAnswer: 0,
          points: 4,
          difficulty: 'hard',
          explanation: 'byte -1 in binary is 11111111. Unsigned right shift (>>>) treats it as unsigned, promoting to int (11111111111111111111111111111111). Shifting right by 24 gives 11111111, which is 255.'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'Which statement about primitive wrapper classes is TRUE?',
          options: [
            'Integer i = 127; Integer j = 127; i == j is true',
            'Integer i = 128; Integer j = 128; i == j is true',
            'Both A and B are true',
            'Neither A nor B is true'
          ],
          correctAnswer: 0,
          points: 4,
          difficulty: 'hard',
          explanation: 'Java caches Integer objects from -128 to 127. Within this range, i == j is true (same object). For 128, new objects are created, so i == j is false. Always use .equals() for wrapper comparison.'
        },
        {
          id: 'q8',
          type: 'mcq',
          question: 'What is the output: int x = 5; System.out.println(x++ + ++x);',
          options: [
            '11',
            '12',
            '13',
            '10'
          ],
          correctAnswer: 1,
          points: 3,
          difficulty: 'hard',
          explanation: 'x++ uses 5, then x becomes 6. ++x increments x to 7 first, then uses 7. Total: 5 + 7 = 12.'
        },
        {
          id: 'q9',
          type: 'mcq',
          question: 'What happens: float f = 3.14; System.out.println(f);',
          options: [
            'Prints 3.14',
            'Compilation error',
            'Prints 3.140000',
            'Runtime error'
          ],
          correctAnswer: 1,
          points: 3,
          difficulty: 'hard',
          explanation: 'Compilation error: "possible lossy conversion from double to float". Decimal literals are double by default. Use float f = 3.14f; or float f = (float)3.14;'
        },
        {
          id: 'q10',
          type: 'mcq',
          question: 'What is the result of: short s = 1; s = s + 1;',
          options: [
            'Compiles, s is 2',
            'Compilation error',
            'Runtime error',
            's remains 1'
          ],
          correctAnswer: 1,
          points: 3,
          difficulty: 'hard',
          explanation: 'Compilation error: "possible lossy conversion from int to short". Expression s + 1 is promoted to int. Use s = (short)(s + 1); or s += 1; (compound assignment has implicit cast).'
        }
      ]
    },
    {
      id: 'section-b',
      title: 'Complex Scenario Questions',
      questions: [
        {
          id: 'q11',
          type: 'mcq',
          question: 'Given: char c1 = \'A\'; char c2 = 65; What is the output of: System.out.println(c1 == c2);',
          options: [
            'true',
            'false',
            'Compilation error',
            'Runtime error'
          ],
          correctAnswer: 0,
          points: 3,
          difficulty: 'hard',
          explanation: 'Both c1 and c2 represent the same Unicode value (65 for "A"). The == operator compares their numeric values, which are equal, so it prints true.'
        },
        {
          id: 'q12',
          type: 'mcq',
          question: 'What is the output: System.out.println(true + false);',
          options: [
            'true',
            'false',
            '1',
            'Compilation error'
          ],
          correctAnswer: 3,
          points: 3,
          difficulty: 'hard',
          explanation: 'Compilation error: "operator + cannot be applied to boolean, boolean". Unlike some languages, Java does not allow arithmetic operations on boolean values.'
        },
        {
          id: 'q13',
          type: 'mcq',
          question: 'What is printed: double d = 1.0 / 0.0; System.out.println(d);',
          options: [
            'ArithmeticException',
            'Infinity',
            '0.0',
            'NaN'
          ],
          correctAnswer: 1,
          points: 4,
          difficulty: 'hard',
          explanation: 'Division by 0.0 with floating-point numbers produces Infinity (not an exception). Integer division by 0 throws ArithmeticException, but floating-point follows IEEE 754 standard.'
        },
        {
          id: 'q14',
          type: 'mcq',
          question: 'What is the value: System.out.println(0.0 / 0.0);',
          options: [
            'Infinity',
            '0.0',
            'NaN',
            'ArithmeticException'
          ],
          correctAnswer: 2,
          points: 4,
          difficulty: 'hard',
          explanation: '0.0 / 0.0 produces NaN (Not a Number), a special floating-point value. NaN is not equal to any value, including itself (NaN != NaN is true).'
        },
        {
          id: 'q15',
          type: 'mcq',
          question: 'Given: int a = 5; int b = 2; What is the output: System.out.println(a / b + " " + a % b);',
          options: [
            '2.5 0',
            '2 1',
            '2.5 1',
            '3 1'
          ],
          correctAnswer: 1,
          points: 3,
          difficulty: 'hard',
          explanation: 'Integer division: 5 / 2 = 2 (truncated). Modulo: 5 % 2 = 1 (remainder). Output: "2 1".'
        }
      ]
    },
    {
      id: 'section-c',
      title: 'Advanced Coding Problems',
      questions: [
        {
          id: 'q16',
          type: 'short',
          question: 'Write a program to demonstrate overflow and underflow for all integer types (byte, short, int, long).',
          sampleAnswer: `public class IntegerOverflow {
    public static void main(String[] args) {
        // Byte overflow/underflow
        byte maxByte = Byte.MAX_VALUE;
        byte minByte = Byte.MIN_VALUE;
        System.out.println("Byte MAX: " + maxByte + ", overflow: " + (byte)(maxByte + 1));
        System.out.println("Byte MIN: " + minByte + ", underflow: " + (byte)(minByte - 1));

        // Short overflow/underflow
        short maxShort = Short.MAX_VALUE;
        short minShort = Short.MIN_VALUE;
        System.out.println("Short MAX: " + maxShort + ", overflow: " + (short)(maxShort + 1));
        System.out.println("Short MIN: " + minShort + ", underflow: " + (short)(minShort - 1));

        // Int overflow/underflow
        int maxInt = Integer.MAX_VALUE;
        int minInt = Integer.MIN_VALUE;
        System.out.println("Int MAX: " + maxInt + ", overflow: " + (maxInt + 1));
        System.out.println("Int MIN: " + minInt + ", underflow: " + (minInt - 1));

        // Long overflow/underflow
        long maxLong = Long.MAX_VALUE;
        long minLong = Long.MIN_VALUE;
        System.out.println("Long MAX: " + maxLong + ", overflow: " + (maxLong + 1));
        System.out.println("Long MIN: " + minLong + ", underflow: " + (minLong - 1));
    }
}`,
          points: 6,
          difficulty: 'hard',
          keywords: ['overflow', 'underflow', 'MAX_VALUE', 'MIN_VALUE', 'wrap-around', 'limits']
        },
        {
          id: 'q17',
          type: 'short',
          question: 'Write a program demonstrating the difference between == and equals() for Integer wrapper objects with caching.',
          sampleAnswer: `public class IntegerCaching {
    public static void main(String[] args) {
        // Integer caching: -128 to 127
        Integer a = 127;
        Integer b = 127;
        Integer c = 128;
        Integer d = 128;

        System.out.println("Within cache range (-128 to 127):");
        System.out.println("a == b: " + (a == b));           // true (same cached object)
        System.out.println("a.equals(b): " + a.equals(b));   // true (same value)

        System.out.println("\\nOutside cache range:");
        System.out.println("c == d: " + (c == d));           // false (different objects)
        System.out.println("c.equals(d): " + c.equals(d));   // true (same value)

        // Explicit new Integer
        Integer e = new Integer(127);
        Integer f = new Integer(127);
        System.out.println("\\nExplicit new Integer:");
        System.out.println("e == f: " + (e == f));           // false (different objects)
        System.out.println("e.equals(f): " + e.equals(f));   // true (same value)
    }
}`,
          points: 6,
          difficulty: 'hard',
          keywords: ['Integer', 'caching', 'autoboxing', 'equals', '==', 'wrapper']
        },
        {
          id: 'q18',
          type: 'short',
          question: 'Write a program to demonstrate floating-point precision issues and how to handle them.',
          sampleAnswer: `import java.math.BigDecimal;

public class FloatingPointPrecision {
    public static void main(String[] args) {
        // Precision problem with float/double
        double d1 = 0.1;
        double d2 = 0.2;
        double d3 = 0.3;

        System.out.println("Using double:");
        System.out.println("0.1 + 0.2 = " + (d1 + d2));
        System.out.println("0.1 + 0.2 == 0.3: " + ((d1 + d2) == d3));

        // Solution 1: Use epsilon for comparison
        double epsilon = 0.0001;
        System.out.println("\\nUsing epsilon comparison:");
        System.out.println("Math.abs((0.1 + 0.2) - 0.3) < epsilon: " +
                          (Math.abs((d1 + d2) - d3) < epsilon));

        // Solution 2: Use BigDecimal
        System.out.println("\\nUsing BigDecimal:");
        BigDecimal bd1 = new BigDecimal("0.1");
        BigDecimal bd2 = new BigDecimal("0.2");
        BigDecimal bd3 = new BigDecimal("0.3");
        BigDecimal sum = bd1.add(bd2);

        System.out.println("0.1 + 0.2 = " + sum);
        System.out.println("0.1 + 0.2 == 0.3: " + sum.equals(bd3));
    }
}`,
          points: 6,
          difficulty: 'hard',
          keywords: ['floating-point', 'precision', 'BigDecimal', 'epsilon', 'comparison', 'accuracy']
        },
        {
          id: 'q19',
          type: 'short',
          question: 'Write a program demonstrating all types of type casting scenarios (widening, narrowing, and between char/int).',
          sampleAnswer: `public class ComprehensiveTypeCasting {
    public static void main(String[] args) {
        // Widening (implicit) - no data loss
        System.out.println("=== Widening Conversions (Implicit) ===");
        byte b = 10;
        short s = b;     // byte -> short
        int i = s;       // short -> int
        long l = i;      // int -> long
        float f = l;     // long -> float
        double d = f;    // float -> double
        System.out.println("byte->short->int->long->float->double: " + d);

        // Narrowing (explicit) - potential data loss
        System.out.println("\\n=== Narrowing Conversions (Explicit) ===");
        double d2 = 9.78;
        float f2 = (float) d2;
        long l2 = (long) f2;
        int i2 = (int) l2;
        short s2 = (short) i2;
        byte b2 = (byte) s2;
        System.out.println("Original double: " + d2);
        System.out.println("After casting to byte: " + b2);

        // char and int conversions
        System.out.println("\\n=== char <-> int Conversions ===");
        char ch = 'A';
        int ascii = ch;              // char -> int (implicit)
        System.out.println("char 'A' to int: " + ascii);

        int num = 65;
        char character = (char) num; // int -> char (explicit)
        System.out.println("int 65 to char: " + character);

        // Overflow demonstration
        System.out.println("\\n=== Narrowing with Overflow ===");
        int bigNum = 130;
        byte smallByte = (byte) bigNum;
        System.out.println("int 130 cast to byte: " + smallByte + " (overflow)");

        // Expression type promotion
        System.out.println("\\n=== Expression Type Promotion ===");
        byte b3 = 10;
        byte b4 = 20;
        // byte + byte promotes to int
        int result = b3 + b4;
        System.out.println("byte + byte = int: " + result);
    }
}`,
          points: 7,
          difficulty: 'hard',
          keywords: ['widening', 'narrowing', 'implicit', 'explicit', 'casting', 'promotion', 'overflow']
        },
        {
          id: 'q20',
          type: 'short',
          question: 'Write a program to demonstrate Unicode character handling, escape sequences, and special characters in Java.',
          sampleAnswer: `public class UnicodeAndEscapeSequences {
    public static void main(String[] args) {
        // Basic char declarations
        System.out.println("=== Basic Characters ===");
        char ch1 = 'A';
        char ch2 = 65;           // ASCII value
        char ch3 = '\\u0041';     // Unicode notation
        System.out.println("char 'A': " + ch1);
        System.out.println("char from ASCII 65: " + ch2);
        System.out.println("char from Unicode \\\\u0041: " + ch3);
        System.out.println("All equal: " + (ch1 == ch2 && ch2 == ch3));

        // Escape sequences
        System.out.println("\\n=== Escape Sequences ===");
        System.out.println("Tab:\\tHello");
        System.out.println("Newline:\\nHello");
        System.out.println("Backslash: \\\\");
        System.out.println("Single quote: \\'");
        System.out.println("Double quote: \\"");
        System.out.println("Carriage return: Before\\rAfter");

        // Unicode characters
        System.out.println("\\n=== Unicode Characters ===");
        char heart = '\\u2764';
        char smiley = '\\u263A';
        char euro = '\\u20AC';
        char omega = '\\u03A9';
        System.out.println("Heart: " + heart);
        System.out.println("Smiley: " + smiley);
        System.out.println("Euro: " + euro);
        System.out.println("Omega: " + omega);

        // char arithmetic
        System.out.println("\\n=== Character Arithmetic ===");
        char letter = 'A';
        System.out.println("'A' + 1 = " + (char)(letter + 1));
        System.out.println("'Z' - 'A' = " + ('Z' - 'A'));
        System.out.println("char is numeric: " + Character.isDigit('5'));
        System.out.println("char is letter: " + Character.isLetter('A'));
    }
}`,
          points: 7,
          difficulty: 'hard',
          keywords: ['Unicode', 'escape', 'sequences', 'char', 'special', 'characters', 'arithmetic']
        }
      ]
    }
  ]
};
