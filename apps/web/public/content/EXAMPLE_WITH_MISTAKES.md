# Day 3: Operators & Expressions

## Arithmetic Operators

Java provides several arithmetic operators for mathematical calculations:

- `+` Addition
- `-` Subtraction
- `*` Multiplication
- `/` Division
- `%` Modulus (remainder)

### Division Operator

The division operator (`/`) works differently depending on the data types:

```java
int a = 10;
int b = 3;
int result = a / b;  // result is 3 (integer division)

double x = 10.0;
double y = 3.0;
double result2 = x / y;  // result2 is 3.333... (floating-point division)
```

> [!MISTAKE] Integer Division Pitfall
> Wrong: int result = 5 / 2;
> WrongNote: result = 2 (not 2.5!)
> Right: double result = 5.0 / 2;
> RightNote: result = 2.5 (correct)
> Why: When both operands are integers, Java performs integer division which truncates the decimal part
> Tip: Use at least one double value (5.0 or 2.0) to get decimal results

### Practice Example

Calculate the average of three numbers:

```java
int num1 = 10, num2 = 15, num3 = 20;
double average = (num1 + num2 + num3) / 3.0;  // Note: 3.0 to get decimal result
System.out.println("Average: " + average);  // Output: 15.0
```

> [!TIP]
> When calculating averages, always use a decimal divisor (like 3.0 instead of 3) to avoid integer division and get accurate decimal results.

## Comparison Operators

Comparison operators return boolean values (true or false):

- `==` Equal to
- `!=` Not equal to
- `>` Greater than
- `<` Less than
- `>=` Greater than or equal to
- `<=` Less than or equal to

> [!MISTAKE] Assignment vs Comparison
> Wrong: if (x = 5)
> WrongNote: This assigns 5 to x, doesn't compare!
> Right: if (x == 5)
> RightNote: This correctly compares x with 5
> Why: Single = is assignment, double == is comparison
> Tip: Read == as "is equal to" and = as "gets the value"

## Logical Operators

Used to combine multiple conditions:

- `&&` AND (both conditions must be true)
- `||` OR (at least one condition must be true)
- `!` NOT (inverts the boolean value)

```java
int age = 25;
boolean hasLicense = true;

if (age >= 18 && hasLicense) {
    System.out.println("Can drive");
}
```

> [!TIP]
> Use parentheses to make complex logical expressions clearer:
> `if ((age >= 18) && (hasLicense))` is more readable than `if (age >= 18 && hasLicense)`

## Increment and Decrement

Shorthand operators to increase or decrease a value by 1:

```java
int count = 5;
count++;  // count is now 6 (same as count = count + 1)
count--;  // count is now 5 (same as count = count - 1)
```

> [!MISTAKE] Pre vs Post Increment
> Wrong: int x = 5; int y = x++;
> WrongNote: y gets 5, then x becomes 6
> Right: int x = 5; int y = ++x;
> RightNote: x becomes 6 first, then y gets 6
> Why: Post-increment (x++) uses the value then increments. Pre-increment (++x) increments first then uses the value
> Tip: When in doubt, use increment/decrement on its own line to avoid confusion

## Summary

Understanding operators is crucial for writing effective Java code. Remember:
- Be careful with integer division
- Use == for comparison, = for assignment
- Parentheses make complex expressions clearer
- Pre and post increment behave differently
