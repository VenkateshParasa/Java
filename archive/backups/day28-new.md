### Day 28: Wrapper Classes & Autoboxing

---

#### Exercise 1: Introduction to Wrapper Classes (20 minutes)

**What you'll learn:** Understanding wrapper classes and why they exist

**Create class: `WrapperClassIntro`**

**Concept:** **Wrapper Classes** convert primitive types into objects. Java has 8 primitive types, each with a corresponding wrapper class.

```
Why Wrapper Classes?
1. Collections only work with objects (not primitives)
2. Utility methods (parseInt, valueOf, etc.)
3. Null values (primitives can't be null)
4. Generics require objects
```

**Primitive vs Wrapper:**
```
Primitive Type  →  Wrapper Class
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
byte            →  Byte
short           →  Short
int             →  Integer
long            →  Long
float           →  Float
double          →  Double
char            →  Character
boolean         →  Boolean
```

**Step-by-Step:**

```java
import java.util.ArrayList;

public class WrapperClassIntro {
    public static void main(String[] args) {
        System.out.println("===== WRAPPER CLASSES INTRODUCTION =====\n");

        // ===== PRIMITIVE VS WRAPPER =====
        System.out.println("--- Primitive vs Wrapper ---\n");

        // Primitives (lowercase, not objects)
        int primitiveInt = 10;
        double primitiveDouble = 3.14;
        boolean primitiveBoolean = true;
        char primitiveChar = 'A';

        System.out.println("Primitives:");
        System.out.println("  int: " + primitiveInt);
        System.out.println("  double: " + primitiveDouble);
        System.out.println("  boolean: " + primitiveBoolean);
        System.out.println("  char: " + primitiveChar);
        System.out.println();

        // Wrappers (objects)
        Integer wrapperInt = Integer.valueOf(10);
        Double wrapperDouble = Double.valueOf(3.14);
        Boolean wrapperBoolean = Boolean.valueOf(true);
        Character wrapperChar = Character.valueOf('A');

        System.out.println("Wrappers:");
        System.out.println("  Integer: " + wrapperInt);
        System.out.println("  Double: " + wrapperDouble);
        System.out.println("  Boolean: " + wrapperBoolean);
        System.out.println("  Character: " + wrapperChar);
        System.out.println();

        // ===== WHY WRAPPERS? REASON 1: COLLECTIONS =====
        System.out.println("--- Why Wrappers? Collections Need Objects ---\n");

        // ArrayList<int> numbers = new ArrayList<>();  // ❌ ERROR! Can't use primitive
        ArrayList<Integer> numbers = new ArrayList<>();  // ✓ Must use wrapper

        numbers.add(10);    // Autoboxing: int → Integer
        numbers.add(20);
        numbers.add(30);

        System.out.println("ArrayList with Integers: " + numbers);
        System.out.println("Collections require wrapper classes, not primitives!");
        System.out.println();

        // ===== WHY WRAPPERS? REASON 2: NULL VALUES =====
        System.out.println("--- Why Wrappers? Null Values ---\n");

        // int primitiveCannotBeNull = null;  // ❌ ERROR! Primitive can't be null
        Integer wrapperCanBeNull = null;      // ✓ Wrapper can be null

        System.out.println("Wrapper can be null: " + wrapperCanBeNull);

        // Useful for optional values
        Integer userAge = null;  // User hasn't provided age yet

        if (userAge == null) {
            System.out.println("User age: Not provided");
        } else {
            System.out.println("User age: " + userAge);
        }
        System.out.println();

        // ===== WHY WRAPPERS? REASON 3: UTILITY METHODS =====
        System.out.println("--- Why Wrappers? Utility Methods ---\n");

        // Integer utility methods
        System.out.println("Integer MAX_VALUE: " + Integer.MAX_VALUE);
        System.out.println("Integer MIN_VALUE: " + Integer.MIN_VALUE);
        System.out.println("Integer.parseInt(\"123\"): " + Integer.parseInt("123"));
        System.out.println("Integer.toBinaryString(10): " + Integer.toBinaryString(10));
        System.out.println("Integer.compare(10, 20): " + Integer.compare(10, 20));
        System.out.println();

        // Double utility methods
        System.out.println("Double.parseDouble(\"3.14\"): " + Double.parseDouble("3.14"));
        System.out.println("Double.isNaN(0.0 / 0.0): " + Double.isNaN(0.0 / 0.0));
        System.out.println("Double.isInfinite(1.0 / 0.0): " + Double.isInfinite(1.0 / 0.0));
        System.out.println();

        // Character utility methods
        System.out.println("Character.isDigit('5'): " + Character.isDigit('5'));
        System.out.println("Character.isLetter('A'): " + Character.isLetter('A'));
        System.out.println("Character.toUpperCase('a'): " + Character.toUpperCase('a'));
        System.out.println("Character.toLowerCase('Z'): " + Character.toLowerCase('Z'));
        System.out.println();

        // Boolean utility methods
        System.out.println("Boolean.parseBoolean(\"true\"): " + Boolean.parseBoolean("true"));
        System.out.println("Boolean.toString(false): " + Boolean.toString(false));
        System.out.println();

        // ===== CREATING WRAPPER OBJECTS =====
        System.out.println("--- Creating Wrapper Objects ---\n");

        // Method 1: valueOf() - recommended
        Integer num1 = Integer.valueOf(100);
        Double num2 = Double.valueOf(99.99);
        System.out.println("Using valueOf(): " + num1 + ", " + num2);

        // Method 2: Constructor (deprecated since Java 9)
        @SuppressWarnings("deprecation")
        Integer num3 = new Integer(100);  // Not recommended anymore
        System.out.println("Using constructor (deprecated): " + num3);

        // Method 3: Autoboxing (automatic conversion)
        Integer num4 = 100;  // Automatic int → Integer
        System.out.println("Using autoboxing: " + num4);
        System.out.println();

        // ===== CONVERTING BACK TO PRIMITIVES =====
        System.out.println("--- Converting Wrappers to Primitives ---\n");

        Integer wrapperNumber = 42;

        // Using value methods
        int intValue = wrapperNumber.intValue();
        double doubleValue = wrapperNumber.doubleValue();
        long longValue = wrapperNumber.longValue();
        float floatValue = wrapperNumber.floatValue();

        System.out.println("Wrapper: " + wrapperNumber);
        System.out.println("As int: " + intValue);
        System.out.println("As double: " + doubleValue);
        System.out.println("As long: " + longValue);
        System.out.println("As float: " + floatValue);
        System.out.println();

        // ===== COMPARING WRAPPERS =====
        System.out.println("--- Comparing Wrapper Objects ---\n");

        Integer a = 100;
        Integer b = 100;
        Integer c = new Integer(100);

        System.out.println("a: " + a);
        System.out.println("b: " + b);
        System.out.println("c: " + c);
        System.out.println();

        // == compares references (object identity)
        System.out.println("a == b: " + (a == b));  // true (cached)
        System.out.println("a == c: " + (a == c));  // false (different objects)
        System.out.println();

        // equals() compares values
        System.out.println("a.equals(b): " + a.equals(b));  // true
        System.out.println("a.equals(c): " + a.equals(c));  // true
        System.out.println();

        System.out.println("⚠ Use .equals() for wrapper comparison, not ==!");
        System.out.println();

        // ===== COMPLETE WRAPPER SUMMARY =====
        System.out.println("--- All Wrapper Classes ---\n");

        Byte byteWrapper = Byte.valueOf((byte) 127);
        Short shortWrapper = Short.valueOf((short) 32000);
        Integer intWrapper = Integer.valueOf(2000000000);
        Long longWrapper = Long.valueOf(9000000000L);
        Float floatWrapper = Float.valueOf(3.14f);
        Double doubleWrapper = Double.valueOf(3.14159);
        Character charWrapper = Character.valueOf('Z');
        Boolean boolWrapper = Boolean.valueOf(true);

        System.out.println("Byte wrapper: " + byteWrapper + " (range: " + Byte.MIN_VALUE + " to " + Byte.MAX_VALUE + ")");
        System.out.println("Short wrapper: " + shortWrapper + " (range: " + Short.MIN_VALUE + " to " + Short.MAX_VALUE + ")");
        System.out.println("Integer wrapper: " + intWrapper + " (range: " + Integer.MIN_VALUE + " to " + Integer.MAX_VALUE + ")");
        System.out.println("Long wrapper: " + longWrapper + " (range: " + Long.MIN_VALUE + " to " + Long.MAX_VALUE + ")");
        System.out.println("Float wrapper: " + floatWrapper);
        System.out.println("Double wrapper: " + doubleWrapper);
        System.out.println("Character wrapper: " + charWrapper);
        System.out.println("Boolean wrapper: " + boolWrapper);

        System.out.println("\n========================================");
    }
}
```

**Expected Output:**
```
===== WRAPPER CLASSES INTRODUCTION =====

--- Primitive vs Wrapper ---

Primitives:
  int: 10
  double: 3.14
  boolean: true
  char: A

Wrappers:
  Integer: 10
  Double: 3.14
  Boolean: true
  Character: A

--- Why Wrappers? Collections Need Objects ---

ArrayList with Integers: [10, 20, 30]
Collections require wrapper classes, not primitives!

--- Why Wrappers? Null Values ---

Wrapper can be null: null
User age: Not provided

--- Why Wrappers? Utility Methods ---

Integer MAX_VALUE: 2147483647
Integer MIN_VALUE: -2147483648
Integer.parseInt("123"): 123
Integer.toBinaryString(10): 1010
Integer.compare(10, 20): -1

Double.parseDouble("3.14"): 3.14
Double.isNaN(0.0 / 0.0): true
Double.isInfinite(1.0 / 0.0): true

Character.isDigit('5'): true
Character.isLetter('A'): true
Character.toUpperCase('a'): A
Character.toLowerCase('Z'): z

Boolean.parseBoolean("true"): true
Boolean.toString(false): false

--- Creating Wrapper Objects ---

Using valueOf(): 100, 99.99
Using constructor (deprecated): 100
Using autoboxing: 100

--- Converting Wrappers to Primitives ---

Wrapper: 42
As int: 42
As double: 42.0
As long: 42
As float: 42.0

--- Comparing Wrapper Objects ---

a: 100
b: 100
c: 100

a == b: true
a == c: false

a.equals(b): true
a.equals(c): true

⚠ Use .equals() for wrapper comparison, not ==!

--- All Wrapper Classes ---

Byte wrapper: 127 (range: -128 to 127)
Short wrapper: 32000 (range: -32768 to 32767)
Integer wrapper: 2000000000 (range: -2147483648 to 2147483647)
Long wrapper: 9000000000 (range: -9223372036854775808 to 9223372036854775807)
Float wrapper: 3.14
Double wrapper: 3.14159
Character wrapper: Z
Boolean wrapper: true

========================================
```

**💡 Key Concepts:**

| Concept | Description | Example |
|---------|-------------|---------|
| **Wrapper Class** | Object version of primitive | `Integer` wraps `int` |
| **Boxing** | Primitive → Wrapper | `Integer.valueOf(10)` |
| **Unboxing** | Wrapper → Primitive | `intValue()` |
| **Why Wrappers** | Collections, null, utilities | `ArrayList<Integer>` |
| **Comparison** | Use equals(), not == | `a.equals(b)` |
| **Utility Methods** | Parse, convert, check | `parseInt()`, `isDigit()` |

**✅ Success Criteria:**
- Understand all 8 wrapper classes
- Know when to use wrappers vs primitives
- Can convert between primitive and wrapper
- Understand wrapper classes are objects
- Know why collections need wrappers
- Can use wrapper utility methods

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|----------------|-------------|
| `ArrayList<int>` | Primitives not allowed | `ArrayList<Integer>` |
| Using == for comparison | Compares references | Use `.equals()` |
| `int x = null` | Primitives can't be null | Use `Integer` |
| Unnecessary boxing | Performance overhead | Use primitives when possible |
| Ignoring null checks | NullPointerException | Check before unboxing |

**🎯 Challenge:**
1. Create a method that accepts both primitive and wrapper types
2. Write a utility to safely unbox with null check
3. Demonstrate all utility methods for Character class
4. Show performance difference: primitive vs wrapper arithmetic

---

#### Exercise 2: Autoboxing & Unboxing (20 minutes)

**What you'll learn:** Automatic conversion between primitives and wrappers

**Create class: `AutoboxingDemo`**

**Concept:** **Autoboxing** automatically converts primitives to wrappers. **Unboxing** converts wrappers back to primitives. Java handles this automatically since Java 5.

```
Autoboxing (Automatic):
int → Integer
double → Double
boolean → Boolean

Unboxing (Automatic):
Integer → int
Double → double
Boolean → boolean
```

**Step-by-Step:**

```java
import java.util.ArrayList;
import java.util.HashMap;

public class AutoboxingDemo {
    public static void main(String[] args) {
        System.out.println("===== AUTOBOXING & UNBOXING =====\n");

        // ===== AUTOBOXING: PRIMITIVE → WRAPPER =====
        System.out.println("--- Autoboxing (Primitive → Wrapper) ---\n");

        // Manual boxing (old way)
        Integer manual = Integer.valueOf(100);
        System.out.println("Manual boxing: " + manual);

        // Autoboxing (automatic)
        Integer auto = 100;  // int automatically becomes Integer
        System.out.println("Autoboxing: " + auto);

        // More autoboxing examples
        Double d = 3.14;       // double → Double
        Boolean b = true;      // boolean → Boolean
        Character c = 'A';     // char → Character
        Long l = 100000L;      // long → Long

        System.out.println("Autoboxed Double: " + d);
        System.out.println("Autoboxed Boolean: " + b);
        System.out.println("Autoboxed Character: " + c);
        System.out.println("Autoboxed Long: " + l);
        System.out.println();

        // ===== UNBOXING: WRAPPER → PRIMITIVE =====
        System.out.println("--- Unboxing (Wrapper → Primitive) ---\n");

        Integer wrapperNum = 42;

        // Manual unboxing (old way)
        int manualPrimitive = wrapperNum.intValue();
        System.out.println("Manual unboxing: " + manualPrimitive);

        // Automatic unboxing
        int autoPrimitive = wrapperNum;  // Integer automatically becomes int
        System.out.println("Auto unboxing: " + autoPrimitive);

        // Arithmetic with wrappers (automatic unboxing)
        Integer x = 10;
        Integer y = 20;
        int sum = x + y;  // Both automatically unboxed for arithmetic
        System.out.println("Sum with unboxing: " + sum);
        System.out.println();

        // ===== AUTOBOXING IN COLLECTIONS =====
        System.out.println("--- Autoboxing in Collections ---\n");

        ArrayList<Integer> numbers = new ArrayList<>();

        // Adding primitives - automatically boxed
        numbers.add(10);   // int → Integer (autoboxing)
        numbers.add(20);
        numbers.add(30);

        System.out.println("ArrayList: " + numbers);

        // Getting elements - automatically unboxed
        int first = numbers.get(0);  // Integer → int (unboxing)
        int second = numbers.get(1);
        int sum2 = first + second;   // Regular arithmetic

        System.out.println("First: " + first);
        System.out.println("Second: " + second);
        System.out.println("Sum: " + sum2);
        System.out.println();

        // ===== AUTOBOXING IN MAPS =====
        System.out.println("--- Autoboxing in Maps ---\n");

        HashMap<String, Integer> scores = new HashMap<>();

        // Putting primitives - automatically boxed
        scores.put("Alice", 95);   // int → Integer
        scores.put("Bob", 87);
        scores.put("Charlie", 92);

        System.out.println("Scores map: " + scores);

        // Getting values - automatically unboxed
        int aliceScore = scores.get("Alice");  // Integer → int
        System.out.println("Alice's score: " + aliceScore);
        System.out.println();

        // ===== AUTOBOXING IN METHOD CALLS =====
        System.out.println("--- Autoboxing in Method Calls ---\n");

        // Method expects Integer, passing int
        printInteger(100);  // Autoboxing: int → Integer

        // Method expects int, passing Integer
        Integer value = 200;
        printPrimitive(value);  // Unboxing: Integer → int
        System.out.println();

        // ===== AUTOBOXING IN COMPARISONS =====
        System.out.println("--- Autoboxing in Comparisons ---\n");

        Integer num1 = 50;
        int num2 = 50;

        // Comparing wrapper with primitive (automatic unboxing)
        if (num1 == num2) {  // num1 unboxed to int for comparison
            System.out.println("Equal (unboxing happened): " + num1 + " == " + num2);
        }

        // Arithmetic operations
        Integer a = 10;
        Integer b = 20;
        Integer result = a + b;  // Both unboxed, then result autoboxed
        System.out.println("10 + 20 = " + result + " (unbox → calculate → autobox)");
        System.out.println();

        // ===== POTENTIAL ISSUES WITH AUTOBOXING =====
        System.out.println("--- Potential Issues ---\n");

        // Issue 1: NullPointerException
        System.out.println("Issue 1: Null values");
        Integer nullValue = null;

        try {
            int unboxed = nullValue;  // Tries to unbox null → NPE!
            System.out.println(unboxed);
        } catch (NullPointerException e) {
            System.out.println("❌ NullPointerException: Can't unbox null!");
        }
        System.out.println();

        // Issue 2: Performance with loops
        System.out.println("Issue 2: Performance impact");

        long startTime = System.nanoTime();

        // Using primitives (fast)
        long sumPrimitive = 0;
        for (int i = 0; i < 1000000; i++) {
            sumPrimitive += i;
        }

        long primitiveTime = System.nanoTime() - startTime;
        System.out.println("Primitive loop time: " + primitiveTime + " ns");

        startTime = System.nanoTime();

        // Using wrappers (slower due to autoboxing/unboxing)
        Long sumWrapper = 0L;
        for (int i = 0; i < 1000000; i++) {
            sumWrapper += i;  // Autoboxing/unboxing each iteration!
        }

        long wrapperTime = System.nanoTime() - startTime;
        System.out.println("Wrapper loop time: " + wrapperTime + " ns");
        System.out.println("Wrapper is ~" + (wrapperTime / primitiveTime) + "x slower!");
        System.out.println();

        // Issue 3: Unexpected object creation
        System.out.println("Issue 3: Object creation");

        Integer obj1 = 1000;
        Integer obj2 = 1000;

        System.out.println("obj1: " + obj1);
        System.out.println("obj2: " + obj2);
        System.out.println("obj1 == obj2: " + (obj1 == obj2));  // false (different objects)
        System.out.println("obj1.equals(obj2): " + obj1.equals(obj2));  // true (same value)
        System.out.println("⚠ Always use .equals() for wrapper comparison!");
        System.out.println();

        // ===== AUTOBOXING BEST PRACTICES =====
        System.out.println("--- Best Practices ---\n");

        System.out.println("✓ Use primitives for arithmetic/loops");
        System.out.println("✓ Use wrappers for collections");
        System.out.println("✓ Always null-check before unboxing");
        System.out.println("✓ Use .equals() for wrapper comparison");
        System.out.println("✓ Prefer primitives for performance");
        System.out.println("✓ Be aware of autoboxing overhead");

        System.out.println("\n====================================");
    }

    // Method expecting wrapper
    public static void printInteger(Integer num) {
        System.out.println("Received Integer: " + num);
    }

    // Method expecting primitive
    public static void printPrimitive(int num) {
        System.out.println("Received primitive: " + num);
    }
}
```

**Expected Output:**
```
===== AUTOBOXING & UNBOXING =====

--- Autoboxing (Primitive → Wrapper) ---

Manual boxing: 100
Autoboxing: 100
Autoboxed Double: 3.14
Autoboxed Boolean: true
Autoboxed Character: A
Autoboxed Long: 100000

--- Unboxing (Wrapper → Primitive) ---

Manual unboxing: 42
Auto unboxing: 42
Sum with unboxing: 30

--- Autoboxing in Collections ---

ArrayList: [10, 20, 30]
First: 10
Second: 20
Sum: 30

--- Autoboxing in Maps ---

Scores map: {Alice=95, Bob=87, Charlie=92}
Alice's score: 95

--- Autoboxing in Method Calls ---

Received Integer: 100
Received primitive: 200

--- Autoboxing in Comparisons ---

Equal (unboxing happened): 50 == 50
10 + 20 = 30 (unbox → calculate → autobox)

--- Potential Issues ---

Issue 1: Null values
❌ NullPointerException: Can't unbox null!

Issue 2: Performance impact
Primitive loop time: 2453000 ns
Wrapper loop time: 89234000 ns
Wrapper is ~36x slower!

Issue 3: Object creation
obj1: 1000
obj2: 1000
obj1 == obj2: false
obj1.equals(obj2): true
⚠ Always use .equals() for wrapper comparison!

--- Best Practices ---

✓ Use primitives for arithmetic/loops
✓ Use wrappers for collections
✓ Always null-check before unboxing
✓ Use .equals() for wrapper comparison
✓ Prefer primitives for performance
✓ Be aware of autoboxing overhead

====================================
```

**💡 Key Concepts:**

| Concept | Description | Example |
|---------|-------------|---------|
| **Autoboxing** | Automatic primitive → wrapper | `Integer x = 10` |
| **Unboxing** | Automatic wrapper → primitive | `int y = x` |
| **When it happens** | Collections, methods, arithmetic | `list.add(5)` |
| **Performance cost** | Object creation overhead | Slower in loops |
| **Null danger** | Unboxing null throws NPE | Check before unboxing |
| **Comparison** | Use equals(), not == | `a.equals(b)` |

**✅ Success Criteria:**
- Understand autoboxing is automatic
- Know unboxing is automatic
- Recognize when auto(un)boxing occurs
- Aware of NullPointerException risk
- Understand performance implications
- Know when to use primitives vs wrappers

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|----------------|-------------|
| Unboxing null | Throws NullPointerException | Check for null first |
| Wrappers in loops | Performance overhead | Use primitives |
| == for comparison | Compares objects | Use `.equals()` |
| Unnecessary wrappers | Creates objects | Use primitives when possible |
| Ignoring autoboxing cost | Hidden object creation | Be aware of overhead |

**🎯 Challenge:**
1. Measure autoboxing overhead in different scenarios
2. Write safe unboxing utility that handles nulls
3. Create benchmark: primitives vs wrappers in calculations
4. Find all places autoboxing happens in your previous code

---

#### Exercise 3: valueOf() vs parse() Methods (25 minutes)

**What you'll learn:** Understanding the difference between valueOf() and parse() methods

**Create class: `ValueOfVsParseDemo`**

**Concept:** Both `valueOf()` and `parse()` methods convert strings to numbers, but they return different types:
- **parse methods** return **primitives** (int, double, boolean)
- **valueOf methods** return **wrapper objects** (Integer, Double, Boolean)

```
parse methods:
parseInt()    → returns int (primitive)
parseDouble() → returns double (primitive)
parseLong()   → returns long (primitive)
parseBoolean()→ returns boolean (primitive)

valueOf methods:
valueOf()     → returns Integer/Double/etc. (wrapper objects)
```

**Step-by-Step:**

```java
public class ValueOfVsParseDemo {
    public static void main(String[] args) {
        System.out.println("===== valueOf() VS parse() =====\n");

        // ===== PARSE METHODS - RETURN PRIMITIVES =====
        System.out.println("--- parse() Methods (Return Primitives) ---\n");

        // Integer.parseInt() - returns int primitive
        String numberStr = "123";
        int primitive = Integer.parseInt(numberStr);
        System.out.println("String: \"" + numberStr + "\"");
        System.out.println("parseInt() result: " + primitive);
        System.out.println("Type: " + ((Object)primitive).getClass().getSimpleName());
        System.out.println();

        // Double.parseDouble() - returns double primitive
        String doubleStr = "3.14159";
        double doublePrimitive = Double.parseDouble(doubleStr);
        System.out.println("String: \"" + doubleStr + "\"");
        System.out.println("parseDouble() result: " + doublePrimitive);
        System.out.println("Type: " + ((Object)doublePrimitive).getClass().getSimpleName());
        System.out.println();

        // Long.parseLong() - returns long primitive
        String longStr = "9876543210";
        long longPrimitive = Long.parseLong(longStr);
        System.out.println("String: \"" + longStr + "\"");
        System.out.println("parseLong() result: " + longPrimitive);
        System.out.println("Type: " + ((Object)longPrimitive).getClass().getSimpleName());
        System.out.println();

        // Boolean.parseBoolean() - returns boolean primitive
        String boolStr = "true";
        boolean boolPrimitive = Boolean.parseBoolean(boolStr);
        System.out.println("String: \"" + boolStr + "\"");
        System.out.println("parseBoolean() result: " + boolPrimitive);
        System.out.println("Type: " + ((Object)boolPrimitive).getClass().getSimpleName());
        System.out.println();

        // ===== VALUEOF METHODS - RETURN WRAPPERS =====
        System.out.println("--- valueOf() Methods (Return Wrappers) ---\n");

        // Integer.valueOf() - returns Integer wrapper
        Integer wrapper = Integer.valueOf(numberStr);
        System.out.println("String: \"" + numberStr + "\"");
        System.out.println("valueOf() result: " + wrapper);
        System.out.println("Type: " + wrapper.getClass().getSimpleName());
        System.out.println("Is Object: " + (wrapper instanceof Object));
        System.out.println();

        // Double.valueOf() - returns Double wrapper
        Double doubleWrapper = Double.valueOf(doubleStr);
        System.out.println("String: \"" + doubleStr + "\"");
        System.out.println("valueOf() result: " + doubleWrapper);
        System.out.println("Type: " + doubleWrapper.getClass().getSimpleName());
        System.out.println();

        // Long.valueOf() - returns Long wrapper
        Long longWrapper = Long.valueOf(longStr);
        System.out.println("String: \"" + longStr + "\"");
        System.out.println("valueOf() result: " + longWrapper);
        System.out.println("Type: " + longWrapper.getClass().getSimpleName());
        System.out.println();

        // Boolean.valueOf() - returns Boolean wrapper
        Boolean boolWrapper = Boolean.valueOf(boolStr);
        System.out.println("String: \"" + boolStr + "\"");
        System.out.println("valueOf() result: " + boolWrapper);
        System.out.println("Type: " + boolWrapper.getClass().getSimpleName());
        System.out.println();

        // ===== KEY DIFFERENCES =====
        System.out.println("--- Key Differences ---\n");

        String num = "42";

        // parse → primitive
        int p = Integer.parseInt(num);
        System.out.println("parseInt(\"42\") → int primitive");
        System.out.println("  Can be used in: arithmetic, arrays of primitives");
        System.out.println("  Cannot be: null, added to ArrayList<Integer> (needs autoboxing)");
        System.out.println();

        // valueOf → wrapper
        Integer w = Integer.valueOf(num);
        System.out.println("valueOf(\"42\") → Integer object");
        System.out.println("  Can be used in: Collections, can be null");
        System.out.println("  Has methods: .equals(), .compareTo(), etc.");
        System.out.println();

        // ===== WHEN TO USE WHICH =====
        System.out.println("--- When to Use Which? ---\n");

        // Use parseInt() when you need primitive
        System.out.println("Use parseInt() for:");
        int age = Integer.parseInt("25");
        int[] scores = {10, 20, 30};
        scores[0] = age;  // Primitives for arrays
        System.out.println("  ✓ Arithmetic operations");
        System.out.println("  ✓ Array storage");
        System.out.println("  ✓ Loop counters");
        System.out.println("  ✓ Better performance");
        System.out.println();

        // Use valueOf() when you need object
        System.out.println("Use valueOf() for:");
        Integer score = Integer.valueOf("100");
        score = null;  // Can be null
        System.out.println("  ✓ Collections (ArrayList, HashMap)");
        System.out.println("  ✓ When null values needed");
        System.out.println("  ✓ When object methods needed");
        System.out.println("  ✓ Generics");
        System.out.println();

        // ===== VALUEOF WITH PRIMITIVES =====
        System.out.println("--- valueOf() Can Also Accept Primitives ---\n");

        // valueOf() is overloaded - can take primitive or String
        Integer fromString = Integer.valueOf("100");  // From String
        Integer fromPrimitive = Integer.valueOf(100); // From int

        System.out.println("Integer.valueOf(\"100\"): " + fromString);
        System.out.println("Integer.valueOf(100): " + fromPrimitive);
        System.out.println("Both return Integer objects");
        System.out.println();

        // ===== ERROR HANDLING =====
        System.out.println("--- Error Handling ---\n");

        // Both throw NumberFormatException for invalid input
        try {
            int bad1 = Integer.parseInt("abc");
        } catch (NumberFormatException e) {
            System.out.println("❌ parseInt(\"abc\") threw: " + e.getClass().getSimpleName());
        }

        try {
            Integer bad2 = Integer.valueOf("xyz");
        } catch (NumberFormatException e) {
            System.out.println("❌ valueOf(\"xyz\") threw: " + e.getClass().getSimpleName());
        }
        System.out.println();

        // Safe parsing
        System.out.println("Safe parsing with validation:");
        String input = "123abc";
        try {
            int result = Integer.parseInt(input);
            System.out.println("Parsed: " + result);
        } catch (NumberFormatException e) {
            System.out.println("❌ Invalid number: \"" + input + "\"");
            System.out.println("   Using default value: 0");
            int result = 0;
        }
        System.out.println();

        // ===== PARSING WITH RADIX =====
        System.out.println("--- Parsing with Radix (Number Base) ---\n");

        // parseInt can accept radix (base)
        String binary = "1010";
        String hex = "FF";
        String octal = "77";

        int fromBinary = Integer.parseInt(binary, 2);   // Base 2
        int fromHex = Integer.parseInt(hex, 16);        // Base 16
        int fromOctal = Integer.parseInt(octal, 8);     // Base 8

        System.out.println("Binary \"1010\" (base 2) = " + fromBinary);
        System.out.println("Hex \"FF\" (base 16) = " + fromHex);
        System.out.println("Octal \"77\" (base 8) = " + fromOctal);
        System.out.println();

        // valueOf also supports radix
        Integer binaryValue = Integer.valueOf("1111", 2);
        System.out.println("Integer.valueOf(\"1111\", 2) = " + binaryValue);
        System.out.println();

        // ===== PERFORMANCE COMPARISON =====
        System.out.println("--- Performance Comparison ---\n");

        int iterations = 1000000;

        // parseInt performance
        long start = System.nanoTime();
        for (int i = 0; i < iterations; i++) {
            int x = Integer.parseInt("123");
        }
        long parseTime = System.nanoTime() - start;

        // valueOf performance
        start = System.nanoTime();
        for (int i = 0; i < iterations; i++) {
            Integer x = Integer.valueOf("123");
        }
        long valueOfTime = System.nanoTime() - start;

        System.out.println("Parsing \"123\" " + iterations + " times:");
        System.out.println("parseInt() time: " + parseTime + " ns");
        System.out.println("valueOf() time: " + valueOfTime + " ns");
        System.out.println("Note: valueOf() may be cached for small values");
        System.out.println();

        // ===== PRACTICAL EXAMPLES =====
        System.out.println("--- Practical Examples ---\n");

        // Example 1: Reading user input
        String userInput = "25";
        int userAge = Integer.parseInt(userInput);  // Use parseInt for primitive
        System.out.println("User age: " + userAge + " years");

        // Example 2: Storing in collection
        String scoreInput = "95";
        Integer testScore = Integer.valueOf(scoreInput);  // Use valueOf for object
        java.util.ArrayList<Integer> scoreList = new java.util.ArrayList<>();
        scoreList.add(testScore);
        System.out.println("Stored score: " + scoreList.get(0));

        System.out.println("\n==================================");
    }
}
```

**Expected Output:**
```
===== valueOf() VS parse() =====

--- parse() Methods (Return Primitives) ---

String: "123"
parseInt() result: 123
Type: Integer

String: "3.14159"
parseDouble() result: 3.14159
Type: Double

String: "9876543210"
parseLong() result: 9876543210
Type: Long

String: "true"
parseBoolean() result: true
Type: Boolean

--- valueOf() Methods (Return Wrappers) ---

String: "123"
valueOf() result: 123
Type: Integer
Is Object: true

String: "3.14159"
valueOf() result: 3.14159
Type: Double

String: "9876543210"
valueOf() result: 9876543210
Type: Long

String: "true"
valueOf() result: true
Type: Boolean

--- Key Differences ---

parseInt("42") → int primitive
  Can be used in: arithmetic, arrays of primitives
  Cannot be: null, added to ArrayList<Integer> (needs autoboxing)

valueOf("42") → Integer object
  Can be used in: Collections, can be null
  Has methods: .equals(), .compareTo(), etc.

--- When to Use Which? ---

Use parseInt() for:
  ✓ Arithmetic operations
  ✓ Array storage
  ✓ Loop counters
  ✓ Better performance

Use valueOf() for:
  ✓ Collections (ArrayList, HashMap)
  ✓ When null values needed
  ✓ When object methods needed
  ✓ Generics

--- valueOf() Can Also Accept Primitives ---

Integer.valueOf("100"): 100
Integer.valueOf(100): 100
Both return Integer objects

--- Error Handling ---

❌ parseInt("abc") threw: NumberFormatException
❌ valueOf("xyz") threw: NumberFormatException

Safe parsing with validation:
❌ Invalid number: "123abc"
   Using default value: 0

--- Parsing with Radix (Number Base) ---

Binary "1010" (base 2) = 10
Hex "FF" (base 16) = 255
Octal "77" (base 8) = 63

Integer.valueOf("1111", 2) = 15

--- Performance Comparison ---

Parsing "123" 1000000 times:
parseInt() time: 45234000 ns
valueOf() time: 52178000 ns
Note: valueOf() may be cached for small values

--- Practical Examples ---

User age: 25 years
Stored score: 95

==================================
```

**💡 Key Concepts:**

| Method | Returns | Use When | Example |
|--------|---------|----------|---------|
| **parseInt()** | int (primitive) | Need primitive value | `int x = Integer.parseInt("123")` |
| **valueOf(String)** | Integer (wrapper) | Need object | `Integer x = Integer.valueOf("123")` |
| **valueOf(int)** | Integer (wrapper) | Converting primitive to wrapper | `Integer x = Integer.valueOf(123)` |
| **parseDouble()** | double (primitive) | Need primitive double | `double x = Double.parseDouble("3.14")` |
| **valueOf() with radix** | Integer (wrapper) | Parse different bases | `Integer.valueOf("FF", 16)` |

**Quick Reference:**
```java
// parse methods → primitives
int i = Integer.parseInt("123");
double d = Double.parseDouble("3.14");
long l = Long.parseLong("999");
boolean b = Boolean.parseBoolean("true");

// valueOf methods → wrappers
Integer i = Integer.valueOf("123");
Double d = Double.valueOf("3.14");
Long l = Long.valueOf("999");
Boolean b = Boolean.valueOf("true");
```

**✅ Success Criteria:**
- Understand parse returns primitives
- Understand valueOf returns wrappers
- Know when to use each method
- Can parse different number bases
- Handle NumberFormatException properly
- Aware of performance differences

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|----------------|-------------|
| `int x = Integer.valueOf("123")` | valueOf returns Integer, needs unboxing | Use `parseInt()` |
| `Integer x = Integer.parseInt("123")` | parseInt returns int, needs boxing | Use `valueOf()` |
| Not handling exceptions | NumberFormatException crashes program | Use try-catch |
| Using valueOf for arithmetic | Creates unnecessary objects | Use parse methods |
| Parsing without validation | Invalid input crashes | Validate before parsing |

**🎯 Challenge:**
1. Create safe parsing utility that returns Optional<Integer>
2. Write method to parse with default value on error
3. Benchmark: parseInt vs valueOf performance
4. Create string-to-number converter supporting all bases

---

#### Exercise 4: Integer Caching Behavior (20 minutes)

**What you'll learn:** Understanding wrapper class caching and its implications

**Create class: `WrapperCachingDemo`**

**Concept:** Java **caches** small Integer objects (typically -128 to 127) to save memory. This means identical small values share the same object reference.

```
Integer Caching:
Integer a = 100;
Integer b = 100;
a == b  // true (same cached object)

No caching for large values:
Integer x = 1000;
Integer y = 1000;
x == y  // false (different objects)
```

**Why Caching?**
- **Memory efficiency**: Reuse common small numbers
- **Performance**: No need to create new objects
- **Immutability**: Integer objects are immutable, safe to share

**Step-by-Step:**

```java
public class WrapperCachingDemo {
    public static void main(String[] args) {
        System.out.println("===== WRAPPER CLASS CACHING =====\n");

        // ===== INTEGER CACHING: -128 TO 127 =====
        System.out.println("--- Integer Caching (-128 to 127) ---\n");

        // Small values are cached
        Integer a = 100;
        Integer b = 100;

        System.out.println("Integer a = 100");
        System.out.println("Integer b = 100");
        System.out.println();

        System.out.println("a: " + a);
        System.out.println("b: " + b);
        System.out.println("a == b: " + (a == b));  // true - same object!
        System.out.println("a.equals(b): " + a.equals(b));
        System.out.println();

        System.out.println("Why? Java caches Integer objects from -128 to 127");
        System.out.println("Both a and b reference the SAME cached object");
        System.out.println();

        // ===== NO CACHING FOR LARGE VALUES =====
        System.out.println("--- No Caching for Large Values ---\n");

        Integer x = 1000;
        Integer y = 1000;

        System.out.println("Integer x = 1000");
        System.out.println("Integer y = 1000");
        System.out.println();

        System.out.println("x: " + x);
        System.out.println("y: " + y);
        System.out.println("x == b: " + (x == y));  // false - different objects!
        System.out.println("x.equals(y): " + x.equals(y));  // true - same value
        System.out.println();

        System.out.println("Why? Values outside -128 to 127 are NOT cached");
        System.out.println("Each assignment creates a NEW object");
        System.out.println();

        // ===== CACHE BOUNDARIES =====
        System.out.println("--- Testing Cache Boundaries ---\n");

        // At the edge of cache
        Integer min = -128;
        Integer min2 = -128;
        System.out.println("min (-128) == min2 (-128): " + (min == min2));  // true

        Integer max = 127;
        Integer max2 = 127;
        System.out.println("max (127) == max2 (127): " + (max == max2));  // true

        // Just outside cache
        Integer belowMin = -129;
        Integer belowMin2 = -129;
        System.out.println("belowMin (-129) == belowMin2 (-129): " + (belowMin == belowMin2));  // false

        Integer aboveMax = 128;
        Integer aboveMax2 = 128;
        System.out.println("aboveMax (128) == aboveMax2 (128): " + (aboveMax == aboveMax2));  // false
        System.out.println();

        // ===== VALUEOF VS NEW =====
        System.out.println("--- valueOf() Uses Cache, new does not ---\n");

        // valueOf() uses cache
        Integer v1 = Integer.valueOf(100);
        Integer v2 = Integer.valueOf(100);
        System.out.println("Integer.valueOf(100) cached:");
        System.out.println("v1 == v2: " + (v1 == v2));  // true
        System.out.println();

        // new Integer() bypasses cache (deprecated)
        @SuppressWarnings("deprecation")
        Integer n1 = new Integer(100);
        @SuppressWarnings("deprecation")
        Integer n2 = new Integer(100);
        System.out.println("new Integer(100) NOT cached:");
        System.out.println("n1 == n2: " + (n1 == n2));  // false
        System.out.println("(This is why new Integer() is deprecated!)");
        System.out.println();

        // ===== OTHER WRAPPER CACHING =====
        System.out.println("--- Caching in Other Wrappers ---\n");

        // Boolean: caches TRUE and FALSE
        Boolean bool1 = true;
        Boolean bool2 = true;
        System.out.println("Boolean (true): " + (bool1 == bool2));  // true

        // Byte: caches all values (-128 to 127)
        Byte byte1 = 100;
        Byte byte2 = 100;
        System.out.println("Byte (100): " + (byte1 == byte2));  // true

        // Short: caches -128 to 127
        Short short1 = 100;
        Short short2 = 100;
        System.out.println("Short (100): " + (short1 == short2));  // true

        // Long: caches -128 to 127
        Long long1 = 100L;
        Long long2 = 100L;
        System.out.println("Long (100L): " + (long1 == long2));  // true

        // Character: caches 0 to 127
        Character char1 = 'A';  // ASCII 65
        Character char2 = 'A';
        System.out.println("Character ('A'): " + (char1 == char2));  // true

        // Float and Double: NO caching
        Float float1 = 3.14f;
        Float float2 = 3.14f;
        System.out.println("Float (3.14f): " + (float1 == float2));  // false

        Double double1 = 3.14;
        Double double2 = 3.14;
        System.out.println("Double (3.14): " + (double1 == double2));  // false
        System.out.println();

        // ===== PRACTICAL IMPLICATIONS =====
        System.out.println("--- Practical Implications ---\n");

        System.out.println("Example 1: Comparing wrapper values");
        Integer score1 = 85;
        Integer score2 = 85;

        // Dangerous comparison
        if (score1 == score2) {  // Works, but only because 85 is cached!
            System.out.println("Scores equal (using ==): " + score1);
        }

        // Safe comparison
        if (score1.equals(score2)) {
            System.out.println("Scores equal (using .equals()): " + score1);
        }
        System.out.println();

        System.out.println("⚠ ALWAYS use .equals() for wrapper comparison!");
        System.out.println("   == works for cached values but fails for larger numbers");
        System.out.println();

        // ===== WHY CACHING EXISTS =====
        System.out.println("--- Why Caching Exists ---\n");

        System.out.println("Benefits of caching:");
        System.out.println("1. Memory efficiency - Small numbers used frequently");
        System.out.println("2. Performance - No object creation overhead");
        System.out.println("3. Common values - Loop counters, status codes often small");
        System.out.println();

        // Memory demonstration
        System.out.println("Memory impact example:");
        System.out.println("Without caching: 1000 Integer(5) = 1000 objects");
        System.out.println("With caching: 1000 Integer(5) = 1 shared object");
        System.out.println();

        // ===== VISUALIZING THE CACHE =====
        System.out.println("--- Cache Visualization ---\n");

        System.out.println("Integer Cache (conceptual):");
        System.out.println();
        System.out.println("Index:  -128   -127   ...   0   ...   126   127   128");
        System.out.println("        [obj]  [obj]  ... [obj] ... [obj] [obj]  (none)");
        System.out.println("         ↑      ↑            ↑        ↑     ↑      ↑");
        System.out.println("      cached cached      cached   cached cached  NOT cached");
        System.out.println();

        // ===== TESTING WITH LOOP =====
        System.out.println("--- Testing Cache with Loop ---\n");

        System.out.println("Testing values -130 to 130:");
        for (int i = -130; i <= 130; i += 32) {
            Integer obj1 = i;
            Integer obj2 = i;
            boolean cached = (obj1 == obj2);
            System.out.printf("Value %4d: %s%n", i, cached ? "cached ✓" : "NOT cached ✗");
        }
        System.out.println();

        // ===== BEST PRACTICES =====
        System.out.println("--- Best Practices ---\n");

        System.out.println("1. ✓ NEVER use == to compare wrapper objects");
        System.out.println("2. ✓ ALWAYS use .equals() for value comparison");
        System.out.println("3. ✓ Use valueOf() instead of new Integer() (deprecated)");
        System.out.println("4. ✓ Be aware of caching for optimization");
        System.out.println("5. ✓ Don't rely on caching behavior in your code");
        System.out.println("6. ✓ Use primitives for arithmetic, wrappers for collections");

        System.out.println("\n====================================");
    }
}
```

**Expected Output:**
```
===== WRAPPER CLASS CACHING =====

--- Integer Caching (-128 to 127) ---

Integer a = 100
Integer b = 100

a: 100
b: 100
a == b: true
a.equals(b): true

Why? Java caches Integer objects from -128 to 127
Both a and b reference the SAME cached object

--- No Caching for Large Values ---

Integer x = 1000
Integer y = 1000

x: 1000
y: 1000
x == b: false
x.equals(y): true

Why? Values outside -128 to 127 are NOT cached
Each assignment creates a NEW object

--- Testing Cache Boundaries ---

min (-128) == min2 (-128): true
max (127) == max2 (127): true
belowMin (-129) == belowMin2 (-129): false
aboveMax (128) == aboveMax2 (128): false

--- valueOf() Uses Cache, new does not ---

Integer.valueOf(100) cached:
v1 == v2: true

new Integer(100) NOT cached:
n1 == n2: false
(This is why new Integer() is deprecated!)

--- Caching in Other Wrappers ---

Boolean (true): true
Byte (100): true
Short (100): true
Long (100L): true
Character ('A'): true
Float (3.14f): false
Double (3.14): false

--- Practical Implications ---

Example 1: Comparing wrapper values
Scores equal (using ==): 85
Scores equal (using .equals()): 85

⚠ ALWAYS use .equals() for wrapper comparison!
   == works for cached values but fails for larger numbers

--- Why Caching Exists ---

Benefits of caching:
1. Memory efficiency - Small numbers used frequently
2. Performance - No object creation overhead
3. Common values - Loop counters, status codes often small

Memory impact example:
Without caching: 1000 Integer(5) = 1000 objects
With caching: 1000 Integer(5) = 1 shared object

--- Cache Visualization ---

Integer Cache (conceptual):

Index:  -128   -127   ...   0   ...   126   127   128
        [obj]  [obj]  ... [obj] ... [obj] [obj]  (none)
         ↑      ↑            ↑        ↑     ↑      ↑
      cached cached      cached   cached cached  NOT cached

--- Testing Cache with Loop ---

Testing values -130 to 130:
Value -130: NOT cached ✗
Value  -98: cached ✓
Value  -66: cached ✓
Value  -34: cached ✓
Value   -2: cached ✓
Value   30: cached ✓
Value   62: cached ✓
Value   94: cached ✓
Value  126: cached ✓

--- Best Practices ---

1. ✓ NEVER use == to compare wrapper objects
2. ✓ ALWAYS use .equals() for value comparison
3. ✓ Use valueOf() instead of new Integer() (deprecated)
4. ✓ Be aware of caching for optimization
5. ✓ Don't rely on caching behavior in your code
6. ✓ Use primitives for arithmetic, wrappers for collections

====================================
```

**💡 Key Concepts:**

| Wrapper Type | Cache Range | Notes |
|--------------|-------------|-------|
| **Integer** | -128 to 127 | Most commonly cached |
| **Short** | -128 to 127 | Same as Integer |
| **Long** | -128 to 127 | Same as Integer |
| **Byte** | -128 to 127 | All values (Byte range) |
| **Character** | 0 to 127 | ASCII characters |
| **Boolean** | true, false | Both values |
| **Float** | None | Not cached |
| **Double** | None | Not cached |

**Cache Behavior:**
```java
// Cached (same object)
Integer a = 100;
Integer b = 100;
a == b  // true

// Not cached (different objects)
Integer x = 1000;
Integer y = 1000;
x == y  // false
```

**✅ Success Criteria:**
- Understand Integer caching range (-128 to 127)
- Know == can give unexpected results
- Always use equals() for wrapper comparison
- Aware of caching in other wrapper types
- Know Float and Double are not cached
- Understand memory/performance benefits

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|----------------|-------------|
| `if (obj1 == obj2)` for comparison | Works only for cached values | Use `obj1.equals(obj2)` |
| Relying on caching behavior | Implementation detail may change | Use equals() consistently |
| `new Integer(100)` | Bypasses cache | Use `Integer.valueOf(100)` |
| Assuming all wrappers cache | Float/Double don't cache | Check documentation |
| Using == for HashMap keys | Inconsistent behavior | Use equals() |

**🎯 Challenge:**
1. Create test to find exact cache boundary
2. Measure memory saved by caching
3. Write utility to check if value is cached
4. Demonstrate cache impact in large dataset

---

#### Exercise 5: Utility Methods & Number Conversions (25 minutes)

**What you'll learn:** Using wrapper class utility methods for common operations

**Create class: `WrapperUtilityMethods`**

**Concept:** Wrapper classes provide many **utility methods** for parsing, converting, comparing, and manipulating values. These methods are static and instance-based.

**Categories:**
1. **Conversion**: toString(), parseInt(), valueOf()
2. **Comparison**: compare(), compareTo(), max(), min()
3. **Type checking**: isNaN(), isInfinite(), isDigit(), isLetter()
4. **Constants**: MAX_VALUE, MIN_VALUE, SIZE, BYTES
5. **Mathematical**: sum(), max(), min()

**Step-by-Step:**

```java
public class WrapperUtilityMethods {
    public static void main(String[] args) {
        System.out.println("===== WRAPPER UTILITY METHODS =====\n");

        // ===== INTEGER UTILITY METHODS =====
        System.out.println("--- Integer Utility Methods ---\n");

        // Constants
        System.out.println("Integer.MAX_VALUE: " + Integer.MAX_VALUE);
        System.out.println("Integer.MIN_VALUE: " + Integer.MIN_VALUE);
        System.out.println("Integer.SIZE (bits): " + Integer.SIZE);
        System.out.println("Integer.BYTES: " + Integer.BYTES);
        System.out.println();

        // Parsing
        int num1 = Integer.parseInt("123");
        int num2 = Integer.parseInt("1010", 2);  // Binary
        int num3 = Integer.parseInt("FF", 16);   // Hex
        System.out.println("parseInt(\"123\"): " + num1);
        System.out.println("parseInt(\"1010\", 2): " + num2);
        System.out.println("parseInt(\"FF\", 16): " + num3);
        System.out.println();

        // Conversion
        System.out.println("Integer.toString(123): " + Integer.toString(123));
        System.out.println("Integer.toBinaryString(10): " + Integer.toBinaryString(10));
        System.out.println("Integer.toHexString(255): " + Integer.toHexString(255));
        System.out.println("Integer.toOctalString(64): " + Integer.toOctalString(64));
        System.out.println();

        // Comparison
        System.out.println("Integer.compare(10, 20): " + Integer.compare(10, 20));  // -1
        System.out.println("Integer.compare(20, 10): " + Integer.compare(20, 10));  // 1
        System.out.println("Integer.compare(15, 15): " + Integer.compare(15, 15));  // 0
        System.out.println();

        // Mathematical
        System.out.println("Integer.max(10, 20): " + Integer.max(10, 20));
        System.out.println("Integer.min(10, 20): " + Integer.min(10, 20));
        System.out.println("Integer.sum(10, 20): " + Integer.sum(10, 20));
        System.out.println();

        // Bit operations
        System.out.println("Integer.bitCount(15): " + Integer.bitCount(15));  // Number of 1 bits
        System.out.println("Integer.reverse(8): " + Integer.reverse(8));      // Reverse bits
        System.out.println("Integer.reverseBytes(256): " + Integer.reverseBytes(256));
        System.out.println();

        // ===== DOUBLE UTILITY METHODS =====
        System.out.println("--- Double Utility Methods ---\n");

        // Constants
        System.out.println("Double.MAX_VALUE: " + Double.MAX_VALUE);
        System.out.println("Double.MIN_VALUE: " + Double.MIN_VALUE);
        System.out.println("Double.POSITIVE_INFINITY: " + Double.POSITIVE_INFINITY);
        System.out.println("Double.NEGATIVE_INFINITY: " + Double.NEGATIVE_INFINITY);
        System.out.println("Double.NaN: " + Double.NaN);
        System.out.println();

        // Special value checks
        double zero = 0.0;
        double nanValue = 0.0 / 0.0;
        double infValue = 1.0 / 0.0;

        System.out.println("Double.isNaN(0.0 / 0.0): " + Double.isNaN(nanValue));
        System.out.println("Double.isInfinite(1.0 / 0.0): " + Double.isInfinite(infValue));
        System.out.println("Double.isFinite(3.14): " + Double.isFinite(3.14));
        System.out.println();

        // Parsing and conversion
        double d1 = Double.parseDouble("3.14159");
        System.out.println("parseDouble(\"3.14159\"): " + d1);
        System.out.println("Double.toString(2.718): " + Double.toString(2.718));
        System.out.println("Double.toHexString(100.5): " + Double.toHexString(100.5));
        System.out.println();

        // Comparison
        System.out.println("Double.compare(3.14, 2.71): " + Double.compare(3.14, 2.71));
        System.out.println("Double.max(3.14, 2.71): " + Double.max(3.14, 2.71));
        System.out.println("Double.min(3.14, 2.71): " + Double.min(3.14, 2.71));
        System.out.println("Double.sum(3.14, 2.71): " + Double.sum(3.14, 2.71));
        System.out.println();

        // ===== CHARACTER UTILITY METHODS =====
        System.out.println("--- Character Utility Methods ---\n");

        // Type checking
        System.out.println("Character.isDigit('5'): " + Character.isDigit('5'));
        System.out.println("Character.isDigit('A'): " + Character.isDigit('A'));
        System.out.println("Character.isLetter('A'): " + Character.isLetter('A'));
        System.out.println("Character.isLetter('5'): " + Character.isLetter('5'));
        System.out.println("Character.isLetterOrDigit('A'): " + Character.isLetterOrDigit('A'));
        System.out.println("Character.isWhitespace(' '): " + Character.isWhitespace(' '));
        System.out.println("Character.isUpperCase('A'): " + Character.isUpperCase('A'));
        System.out.println("Character.isLowerCase('a'): " + Character.isLowerCase('a'));
        System.out.println();

        // Case conversion
        System.out.println("Character.toUpperCase('a'): " + Character.toUpperCase('a'));
        System.out.println("Character.toLowerCase('Z'): " + Character.toLowerCase('Z'));
        System.out.println();

        // Numeric value
        System.out.println("Character.getNumericValue('5'): " + Character.getNumericValue('5'));
        System.out.println("Character.getNumericValue('A'): " + Character.getNumericValue('A'));
        System.out.println();

        // ===== BOOLEAN UTILITY METHODS =====
        System.out.println("--- Boolean Utility Methods ---\n");

        // Parsing
        boolean b1 = Boolean.parseBoolean("true");
        boolean b2 = Boolean.parseBoolean("false");
        boolean b3 = Boolean.parseBoolean("yes");  // false (only "true" is true)
        System.out.println("parseBoolean(\"true\"): " + b1);
        System.out.println("parseBoolean(\"false\"): " + b2);
        System.out.println("parseBoolean(\"yes\"): " + b3);
        System.out.println();

        // Conversion
        System.out.println("Boolean.toString(true): " + Boolean.toString(true));
        System.out.println("Boolean.toString(false): " + Boolean.toString(false));
        System.out.println();

        // Logical operations
        System.out.println("Boolean.logicalAnd(true, false): " + Boolean.logicalAnd(true, false));
        System.out.println("Boolean.logicalOr(true, false): " + Boolean.logicalOr(true, false));
        System.out.println("Boolean.logicalXor(true, false): " + Boolean.logicalXor(true, false));
        System.out.println();

        // Comparison
        Boolean bool1 = true;
        Boolean bool2 = false;
        System.out.println("Boolean.compare(true, false): " + Boolean.compare(bool1, bool2));
        System.out.println();

        // ===== LONG UTILITY METHODS =====
        System.out.println("--- Long Utility Methods ---\n");

        // Constants
        System.out.println("Long.MAX_VALUE: " + Long.MAX_VALUE);
        System.out.println("Long.MIN_VALUE: " + Long.MIN_VALUE);
        System.out.println();

        // Parsing
        long l1 = Long.parseLong("9999999999");
        System.out.println("parseLong(\"9999999999\"): " + l1);
        System.out.println("Long.toBinaryString(128L): " + Long.toBinaryString(128L));
        System.out.println();

        // ===== BYTE UTILITY METHODS =====
        System.out.println("--- Byte Utility Methods ---\n");

        System.out.println("Byte.MAX_VALUE: " + Byte.MAX_VALUE);
        System.out.println("Byte.MIN_VALUE: " + Byte.MIN_VALUE);
        byte b = Byte.parseByte("127");
        System.out.println("parseByte(\"127\"): " + b);
        System.out.println();

        // ===== PRACTICAL EXAMPLES =====
        System.out.println("--- Practical Examples ---\n");

        // Example 1: Safe integer parsing with validation
        String input1 = "123";
        String input2 = "abc";

        System.out.println("Safe parsing:");
        System.out.println("Input: \"" + input1 + "\" → " + safeParseInt(input1, -1));
        System.out.println("Input: \"" + input2 + "\" → " + safeParseInt(input2, -1));
        System.out.println();

        // Example 2: Character validation
        String password = "Pass123!";
        System.out.println("Password validation for: " + password);
        System.out.println("  Has letter: " + hasLetter(password));
        System.out.println("  Has digit: " + hasDigit(password));
        System.out.println("  Has uppercase: " + hasUpperCase(password));
        System.out.println("  Has lowercase: " + hasLowerCase(password));
        System.out.println();

        // Example 3: Number formatting
        int number = 255;
        System.out.println("Number: " + number);
        System.out.println("  Binary: " + Integer.toBinaryString(number));
        System.out.println("  Octal: " + Integer.toOctalString(number));
        System.out.println("  Hex: " + Integer.toHexString(number));
        System.out.println();

        // Example 4: Finding extremes
        int[] values = {15, 42, 8, 23, 97, 4, 56};
        int maxValue = Integer.MIN_VALUE;
        int minValue = Integer.MAX_VALUE;

        for (int val : values) {
            maxValue = Integer.max(maxValue, val);
            minValue = Integer.min(minValue, val);
        }

        System.out.println("Values: " + java.util.Arrays.toString(values));
        System.out.println("Maximum: " + maxValue);
        System.out.println("Minimum: " + minValue);

        System.out.println("\n===================================");
    }

    // Utility method: Safe integer parsing
    public static int safeParseInt(String str, int defaultValue) {
        try {
            return Integer.parseInt(str);
        } catch (NumberFormatException e) {
            return defaultValue;
        }
    }

    // Utility: Check if string has letter
    public static boolean hasLetter(String str) {
        for (char c : str.toCharArray()) {
            if (Character.isLetter(c)) return true;
        }
        return false;
    }

    // Utility: Check if string has digit
    public static boolean hasDigit(String str) {
        for (char c : str.toCharArray()) {
            if (Character.isDigit(c)) return true;
        }
        return false;
    }

    // Utility: Check if string has uppercase
    public static boolean hasUpperCase(String str) {
        for (char c : str.toCharArray()) {
            if (Character.isUpperCase(c)) return true;
        }
        return false;
    }

    // Utility: Check if string has lowercase
    public static boolean hasLowerCase(String str) {
        for (char c : str.toCharArray()) {
            if (Character.isLowerCase(c)) return true;
        }
        return false;
    }
}
```

**Expected Output:**
```
===== WRAPPER UTILITY METHODS =====

--- Integer Utility Methods ---

Integer.MAX_VALUE: 2147483647
Integer.MIN_VALUE: -2147483648
Integer.SIZE (bits): 32
Integer.BYTES: 4

parseInt("123"): 123
parseInt("1010", 2): 10
parseInt("FF", 16): 255

Integer.toString(123): 123
Integer.toBinaryString(10): 1010
Integer.toHexString(255): ff
Integer.toOctalString(64): 100

Integer.compare(10, 20): -1
Integer.compare(20, 10): 1
Integer.compare(15, 15): 0

Integer.max(10, 20): 20
Integer.min(10, 20): 10
Integer.sum(10, 20): 30

Integer.bitCount(15): 4
Integer.reverse(8): 268435456
Integer.reverseBytes(256): 1

--- Double Utility Methods ---

Double.MAX_VALUE: 1.7976931348623157E308
Double.MIN_VALUE: 4.9E-324
Double.POSITIVE_INFINITY: Infinity
Double.NEGATIVE_INFINITY: -Infinity
Double.NaN: NaN

Double.isNaN(0.0 / 0.0): true
Double.isInfinite(1.0 / 0.0): true
Double.isFinite(3.14): true

parseDouble("3.14159"): 3.14159
Double.toString(2.718): 2.718
Double.toHexString(100.5): 0x1.92p6

Double.compare(3.14, 2.71): 1
Double.max(3.14, 2.71): 3.14
Double.min(3.14, 2.71): 2.71
Double.sum(3.14, 2.71): 5.85

--- Character Utility Methods ---

Character.isDigit('5'): true
Character.isDigit('A'): false
Character.isLetter('A'): true
Character.isLetter('5'): false
Character.isLetterOrDigit('A'): true
Character.isWhitespace(' '): true
Character.isUpperCase('A'): true
Character.isLowerCase('a'): true

Character.toUpperCase('a'): A
Character.toLowerCase('Z'): z

Character.getNumericValue('5'): 5
Character.getNumericValue('A'): 10

--- Boolean Utility Methods ---

parseBoolean("true"): true
parseBoolean("false"): false
parseBoolean("yes"): false

Boolean.toString(true): true
Boolean.toString(false): false

Boolean.logicalAnd(true, false): false
Boolean.logicalOr(true, false): true
Boolean.logicalXor(true, false): true

Boolean.compare(true, false): 1

--- Long Utility Methods ---

Long.MAX_VALUE: 9223372036854775807
Long.MIN_VALUE: -9223372036854775808

parseLong("9999999999"): 9999999999
Long.toBinaryString(128L): 10000000

--- Byte Utility Methods ---

Byte.MAX_VALUE: 127
Byte.MIN_VALUE: -128
parseByte("127"): 127

--- Practical Examples ---

Safe parsing:
Input: "123" → 123
Input: "abc" → -1

Password validation for: Pass123!
  Has letter: true
  Has digit: true
  Has uppercase: true
  Has lowercase: true

Number: 255
  Binary: 11111111
  Octal: 377
  Hex: ff

Values: [15, 42, 8, 23, 97, 4, 56]
Maximum: 97
Minimum: 4

===================================
```

**💡 Key Concepts:**

| Wrapper | Common Methods | Use Case |
|---------|---------------|----------|
| **Integer** | parseInt(), toBinaryString(), compare(), max() | Number parsing, base conversion |
| **Double** | parseDouble(), isNaN(), isInfinite(), max() | Floating-point ops, validation |
| **Character** | isDigit(), isLetter(), toUpperCase() | Text validation, case conversion |
| **Boolean** | parseBoolean(), logicalAnd(), logicalOr() | Logic operations, parsing |
| **Long** | parseLong(), toBinaryString() | Large number operations |

**Quick Reference:**
```java
// Integer
int x = Integer.parseInt("123");
String bin = Integer.toBinaryString(10);
int max = Integer.max(10, 20);

// Double
double d = Double.parseDouble("3.14");
boolean nan = Double.isNaN(d);

// Character
boolean digit = Character.isDigit('5');
char upper = Character.toUpperCase('a');

// Boolean
boolean b = Boolean.parseBoolean("true");
boolean and = Boolean.logicalAnd(true, false);
```

**✅ Success Criteria:**
- Know how to parse strings to numbers
- Can convert numbers to different bases
- Understand comparison methods
- Can validate character types
- Know special value checks (NaN, Infinity)
- Can use mathematical utility methods

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|----------------|-------------|
| Not handling NumberFormatException | Parsing invalid string crashes | Use try-catch |
| Using wrong radix | Incorrect parsing | Specify correct base |
| Forgetting NaN checks | NaN != NaN | Use `Double.isNaN()` |
| Case-sensitive parseBoolean | Only "true" is true | Know behavior |
| Not using utility methods | Reinventing the wheel | Use built-in methods |

**🎯 Challenge:**
1. Create calculator using wrapper utility methods
2. Build string validator using Character methods
3. Write number base converter (binary/hex/octal)
4. Create safe parsing utility for all wrapper types
5. Implement custom min/max finder for arrays

---

**Day 28 Summary:**

**What You Learned:**
1. ✅ All 8 wrapper classes and their purposes
2. ✅ Autoboxing and unboxing mechanics
3. ✅ valueOf() vs parse() methods
4. ✅ Integer caching behavior (-128 to 127)
5. ✅ Wrapper utility methods and conversions

**Key Takeaways:**

**Wrapper Classes:**
```
Primitive → Wrapper
int       → Integer
double    → Double
boolean   → Boolean
char      → Character
long      → Long
float     → Float
short     → Short
byte      → Byte
```

**When to Use:**
- **Primitives**: Arithmetic, loops, arrays, performance-critical code
- **Wrappers**: Collections, null values, utility methods, generics

**Autoboxing Rules:**
- Happens automatically since Java 5
- Performance cost in tight loops
- NullPointerException risk when unboxing null
- Always use .equals() for comparison

**parse vs valueOf:**
- `parseInt()` → returns int (primitive)
- `valueOf()` → returns Integer (wrapper)
- Choose based on what you need

**Caching:**
- Integer -128 to 127 cached
- Boolean true/false cached
- Byte all values cached
- Float/Double NOT cached
- Use .equals(), never == for comparison

**Utility Methods:**
- Parsing: `parseInt()`, `parseDouble()`
- Conversion: `toBinaryString()`, `toHexString()`
- Comparison: `compare()`, `max()`, `min()`
- Validation: `isDigit()`, `isLetter()`, `isNaN()`

**Best Practices:**
```
✓ Use primitives for performance
✓ Use wrappers for collections
✓ Always null-check before unboxing
✓ Use .equals() for comparison
✓ Prefer valueOf() over new Integer()
✓ Handle NumberFormatException
✓ Be aware of caching behavior
✓ Use utility methods instead of DIY
```

**Common Pitfalls:**
```
❌ ArrayList<int> - Use ArrayList<Integer>
❌ int x = null - Use Integer x = null
❌ if (obj1 == obj2) - Use obj1.equals(obj2)
❌ Unboxing null - Check for null first
❌ new Integer(100) - Use Integer.valueOf(100)
❌ Wrappers in tight loops - Use primitives
```

**Performance Tips:**
- Primitives are faster than wrappers
- Avoid autoboxing in loops
- Use primitives for arithmetic
- Cache values are memory-efficient

**Real-World Uses:**
- Collections (ArrayList, HashMap)
- Parsing user input
- Optional values (null support)
- Type conversion
- Number formatting
- Validation logic

**Next Steps:**
Continue practicing with wrapper classes. They are fundamental to Java collections and essential for working with generics. Master the difference between primitives and wrappers before moving to advanced topics.

---

**Day 28 Complete! You now understand wrapper classes and autoboxing!**

Ready for Day 29: Advanced OOP concepts!

---
