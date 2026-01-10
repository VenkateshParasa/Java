# Day 6: Arrays - Part 1

**Week 1: Java Basics & Environment Setup**

---

## 📋 Table of Contents
- [Learning Objectives](#learning-objectives)
- [Topics Covered](#topics-covered)
- [Detailed Content](#detailed-content)
- [Practical Exercises](#practical-exercises)
- [Key Takeaways](#key-takeaways)
- [Common Mistakes](#common-mistakes)
- [Navigation](#navigation)

---

## 🎯 Learning Objectives

By the end of Day 6, you will be able to:
- Understand what arrays are and why they're useful
- Declare and initialize arrays
- Access and modify array elements
- Use the length property
- Iterate through arrays using different loops
- Perform common array operations
- Handle ArrayIndexOutOfBoundsException

---

## 📚 Topics Covered

### 1. Array Basics

An **array** is a container that holds a **fixed number** of values of a **single type**.

#### Key Characteristics:
- **Fixed size**: Size cannot change after creation
- **Homogeneous**: All elements must be same type
- **Zero-based indexing**: First element at index 0
- **Reference type**: Arrays are objects in Java

#### Why Use Arrays?
```java
// Without array - managing 5 scores
int score1 = 85;
int score2 = 90;
int score3 = 78;
int score4 = 92;
int score5 = 88;

// With array - much better!
int[] scores = {85, 90, 78, 92, 88};
```

#### Visual Representation:
```
Array: scores
Index:  0   1   2   3   4
Value: [85][90][78][92][88]
```

---

### 2. Array Declaration

Two ways to declare arrays in Java:

#### Syntax 1 (Preferred):
```java
dataType[] arrayName;
```

#### Syntax 2 (Alternative):
```java
dataType arrayName[];
```

#### Examples:
```java
// Integer arrays
int[] numbers;
int scores[];

// String arrays
String[] names;
String cities[];

// Double arrays
double[] prices;
double salaries[];

// Boolean arrays
boolean[] flags;

// Character arrays
char[] letters;
```

---

### 3. Array Initialization

#### Method 1: Using new Keyword
```java
// Declare and allocate memory
int[] numbers = new int[5];  // Array of 5 integers

// Default values assigned automatically
// int: 0, double: 0.0, boolean: false, String: null
```

#### Method 2: Direct Initialization
```java
// Declare, allocate, and initialize in one line
int[] numbers = {10, 20, 30, 40, 50};

String[] names = {"Alice", "Bob", "Charlie"};

double[] prices = {19.99, 29.99, 39.99};
```

#### Method 3: Two-Step Process
```java
// Step 1: Declare
int[] numbers;

// Step 2: Initialize
numbers = new int[5];

// Or with values
numbers = new int[]{10, 20, 30, 40, 50};
```

#### Default Values:
```java
int[] numbers = new int[3];
// numbers[0] = 0
// numbers[1] = 0
// numbers[2] = 0

boolean[] flags = new boolean[2];
// flags[0] = false
// flags[1] = false

String[] names = new String[2];
// names[0] = null
// names[1] = null
```

---

### 4. Accessing Array Elements

Use **index notation** with square brackets `[]`.

#### Syntax:
```java
arrayName[index]
```

#### Examples:
```java
public class ArrayAccess {
    public static void main(String[] args) {
        int[] numbers = {10, 20, 30, 40, 50};
        
        // Access elements (index starts at 0)
        System.out.println("First element: " + numbers[0]);   // 10
        System.out.println("Second element: " + numbers[1]);  // 20
        System.out.println("Last element: " + numbers[4]);    // 50
        
        // Modify elements
        numbers[0] = 100;
        numbers[2] = 300;
        
        System.out.println("Modified first: " + numbers[0]);  // 100
        System.out.println("Modified third: " + numbers[2]);  // 300
    }
}
```

#### ArrayIndexOutOfBoundsException:
```java
int[] numbers = {10, 20, 30};

System.out.println(numbers[0]);  // OK: 10
System.out.println(numbers[2]);  // OK: 30
System.out.println(numbers[3]);  // ERROR! Index out of bounds

// Valid indices: 0, 1, 2
// Invalid indices: -1, 3, 4, ...
```

---

### 5. Array Length

The **length property** returns the number of elements.

#### Syntax:
```java
arrayName.length  // Note: property, not method (no parentheses)
```

#### Examples:
```java
public class ArrayLength {
    public static void main(String[] args) {
        int[] numbers = {10, 20, 30, 40, 50};
        
        System.out.println("Array length: " + numbers.length);  // 5
        
        // Last element using length
        int lastElement = numbers[numbers.length - 1];
        System.out.println("Last element: " + lastElement);  // 50
        
        // Check if array is empty
        if (numbers.length == 0) {
            System.out.println("Array is empty");
        } else {
            System.out.println("Array has " + numbers.length + " elements");
        }
    }
}
```

#### Using length in Loops:
```java
int[] scores = {85, 90, 78, 92, 88};

// Print all elements
for (int i = 0; i < scores.length; i++) {
    System.out.println("Score " + (i+1) + ": " + scores[i]);
}
```

---

### 6. Iterating Through Arrays

#### Method 1: for Loop with Index
```java
int[] numbers = {10, 20, 30, 40, 50};

for (int i = 0; i < numbers.length; i++) {
    System.out.println("Index " + i + ": " + numbers[i]);
}
```

#### Method 2: Enhanced for Loop (for-each)
```java
int[] numbers = {10, 20, 30, 40, 50};

for (int num : numbers) {
    System.out.println(num);
}
```

#### Method 3: while Loop
```java
int[] numbers = {10, 20, 30, 40, 50};
int i = 0;

while (i < numbers.length) {
    System.out.println(numbers[i]);
    i++;
}
```

#### Comparison:
```java
int[] arr = {1, 2, 3, 4, 5};

// for loop: when you need index
for (int i = 0; i < arr.length; i++) {
    arr[i] = arr[i] * 2;  // Can modify
    System.out.println("Index " + i + ": " + arr[i]);
}

// for-each: when you only need values
for (int num : arr) {
    System.out.println(num);  // Read-only
}
```

---

### 7. Common Array Operations

#### Finding Maximum Element:
```java
public class FindMax {
    public static void main(String[] args) {
        int[] numbers = {45, 23, 67, 12, 89, 34};
        
        int max = numbers[0];  // Assume first is max
        
        for (int i = 1; i < numbers.length; i++) {
            if (numbers[i] > max) {
                max = numbers[i];
            }
        }
        
        System.out.println("Maximum: " + max);  // 89
    }
}
```

#### Finding Minimum Element:
```java
int[] numbers = {45, 23, 67, 12, 89, 34};

int min = numbers[0];  // Assume first is min

for (int num : numbers) {
    if (num < min) {
        min = num;
    }
}

System.out.println("Minimum: " + min);  // 12
```

#### Sum and Average:
```java
public class SumAverage {
    public static void main(String[] args) {
        int[] scores = {85, 90, 78, 92, 88};
        
        int sum = 0;
        for (int score : scores) {
            sum += score;
        }
        
        double average = (double) sum / scores.length;
        
        System.out.println("Sum: " + sum);           // 433
        System.out.println("Average: " + average);   // 86.6
    }
}
```

#### Searching for Element:
```java
public class SearchElement {
    public static void main(String[] args) {
        int[] numbers = {10, 25, 30, 45, 50};
        int target = 30;
        boolean found = false;
        int position = -1;
        
        for (int i = 0; i < numbers.length; i++) {
            if (numbers[i] == target) {
                found = true;
                position = i;
                break;
            }
        }
        
        if (found) {
            System.out.println(target + " found at index " + position);
        } else {
            System.out.println(target + " not found");
        }
    }
}
```

#### Reversing an Array:
```java
public class ReverseArray {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5};
        
        System.out.print("Original: ");
        for (int num : numbers) {
            System.out.print(num + " ");
        }
        
        // Reverse using two pointers
        int left = 0;
        int right = numbers.length - 1;
        
        while (left < right) {
            // Swap elements
            int temp = numbers[left];
            numbers[left] = numbers[right];
            numbers[right] = temp;
            
            left++;
            right--;
        }
        
        System.out.print("\nReversed: ");
        for (int num : numbers) {
            System.out.print(num + " ");
        }
    }
}
```

#### Copying an Array:
```java
public class CopyArray {
    public static void main(String[] args) {
        int[] original = {1, 2, 3, 4, 5};
        
        // Method 1: Manual copy
        int[] copy1 = new int[original.length];
        for (int i = 0; i < original.length; i++) {
            copy1[i] = original[i];
        }
        
        // Method 2: Using clone()
        int[] copy2 = original.clone();
        
        // Modify copy (doesn't affect original)
        copy1[0] = 100;
        
        System.out.println("Original[0]: " + original[0]);  // 1
        System.out.println("Copy[0]: " + copy1[0]);         // 100
    }
}
```

---

## 💻 Practical Exercises

### Exercise 1: Initialize and Print Array
```java
public class ArrayBasics {
    public static void main(String[] args) {
        // Create array of 10 integers
        int[] numbers = {5, 12, 8, 23, 17, 9, 14, 6, 20, 11};
        
        // Print all elements
        System.out.println("Array elements:");
        for (int i = 0; i < numbers.length; i++) {
            System.out.println("Index " + i + ": " + numbers[i]);
        }
        
        // Print using for-each
        System.out.println("\nUsing for-each:");
        for (int num : numbers) {
            System.out.print(num + " ");
        }
    }
}
```

---

### Exercise 2: Find Largest and Smallest
```java
import java.util.Scanner;

public class FindMinMax {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter array size: ");
        int size = scanner.nextInt();
        
        int[] numbers = new int[size];
        
        // Input elements
        System.out.println("Enter " + size + " numbers:");
        for (int i = 0; i < size; i++) {
            numbers[i] = scanner.nextInt();
        }
        
        // Find min and max
        int min = numbers[0];
        int max = numbers[0];
        
        for (int num : numbers) {
            if (num < min) min = num;
            if (num > max) max = num;
        }
        
        System.out.println("Smallest: " + min);
        System.out.println("Largest: " + max);
        
        scanner.close();
    }
}
```

---

### Exercise 3: Calculate Sum and Average
```java
public class SumAndAverage {
    public static void main(String[] args) {
        int[] scores = {85, 90, 78, 92, 88, 76, 95, 82};
        
        int sum = 0;
        for (int score : scores) {
            sum += score;
        }
        
        double average = (double) sum / scores.length;
        
        System.out.println("Number of scores: " + scores.length);
        System.out.println("Total sum: " + sum);
        System.out.println("Average: " + average);
        
        // Count above average
        int aboveAverage = 0;
        for (int score : scores) {
            if (score > average) {
                aboveAverage++;
            }
        }
        
        System.out.println("Scores above average: " + aboveAverage);
    }
}
```

---

### Exercise 4: Search for Element
```java
import java.util.Scanner;

public class SearchArray {
    public static void main(String[] args) {
        int[] numbers = {10, 25, 30, 45, 50, 60, 75, 80};
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter number to search: ");
        int target = scanner.nextInt();
        
        boolean found = false;
        int index = -1;
        
        for (int i = 0; i < numbers.length; i++) {
            if (numbers[i] == target) {
                found = true;
                index = i;
                break;
            }
        }
        
        if (found) {
            System.out.println(target + " found at index " + index);
        } else {
            System.out.println(target + " not found in array");
        }
        
        scanner.close();
    }
}
```

---

### Exercise 5: Reverse Array
```java
public class ReverseArray {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        
        System.out.print("Original array: ");
        printArray(numbers);
        
        // Reverse
        for (int i = 0; i < numbers.length / 2; i++) {
            int temp = numbers[i];
            numbers[i] = numbers[numbers.length - 1 - i];
            numbers[numbers.length - 1 - i] = temp;
        }
        
        System.out.print("Reversed array: ");
        printArray(numbers);
    }
    
    public static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}
```

---

### Exercise 6: Count Even and Odd Numbers
```java
public class CountEvenOdd {
    public static void main(String[] args) {
        int[] numbers = {12, 7, 23, 8, 15, 20, 9, 14, 6, 11};
        
        int evenCount = 0;
        int oddCount = 0;
        
        for (int num : numbers) {
            if (num % 2 == 0) {
                evenCount++;
            } else {
                oddCount++;
            }
        }
        
        System.out.println("Total numbers: " + numbers.length);
        System.out.println("Even numbers: " + evenCount);
        System.out.println("Odd numbers: " + oddCount);
    }
}
```

---
### Exercise 7: Second Largest Element
```java
public class SecondLargest {
    public static void main(String[] args) {
        int[] numbers = {45, 23, 67, 12, 89, 34, 78};
        
        if (numbers.length < 2) {
            System.out.println("Array must have at least 2 elements");
            return;
        }
        
        int largest = Integer.MIN_VALUE;
        int secondLargest = Integer.MIN_VALUE;
        
        for (int num : numbers) {
            if (num > largest) {
                secondLargest = largest;
                largest = num;
            } else if (num > secondLargest && num != largest) {
                secondLargest = num;
            }
        }
        
        System.out.println("Largest: " + largest);
        System.out.println("Second Largest: " + secondLargest);
    }
}
```

---

### Exercise 8: Remove Duplicates
```java
public class RemoveDuplicates {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 2, 4, 1, 5, 3, 6};
        
        System.out.print("Original array: ");
        printArray(numbers);
        
        // Count unique elements
        int uniqueCount = 0;
        for (int i = 0; i < numbers.length; i++) {
            boolean isDuplicate = false;
            for (int j = 0; j < i; j++) {
                if (numbers[i] == numbers[j]) {
                    isDuplicate = true;
                    break;
                }
            }
            if (!isDuplicate) {
                uniqueCount++;
            }
        }
        
        // Create array with unique elements
        int[] unique = new int[uniqueCount];
        int index = 0;
        for (int i = 0; i < numbers.length; i++) {
            boolean isDuplicate = false;
            for (int j = 0; j < i; j++) {
                if (numbers[i] == numbers[j]) {
                    isDuplicate = true;
                    break;
                }
            }
            if (!isDuplicate) {
                unique[index++] = numbers[i];
            }
        }
        
        System.out.print("Array without duplicates: ");
        printArray(unique);
    }
    
    public static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}
```

---

### Exercise 9: Merge Two Arrays
```java
public class MergeArrays {
    public static void main(String[] args) {
        int[] arr1 = {1, 3, 5, 7, 9};
        int[] arr2 = {2, 4, 6, 8, 10};
        
        // Create merged array
        int[] merged = new int[arr1.length + arr2.length];
        
        // Copy first array
        for (int i = 0; i < arr1.length; i++) {
            merged[i] = arr1[i];
        }
        
        // Copy second array
        for (int i = 0; i < arr2.length; i++) {
            merged[arr1.length + i] = arr2[i];
        }
        
        System.out.print("Array 1: ");
        printArray(arr1);
        
        System.out.print("Array 2: ");
        printArray(arr2);
        
        System.out.print("Merged array: ");
        printArray(merged);
    }
    
    public static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}
```

---

### Exercise 10: Rotate Array
```java
public class RotateArray {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5, 6, 7};
        int rotations = 3;
        
        System.out.print("Original array: ");
        printArray(numbers);
        
        // Rotate right by 'rotations' positions
        for (int r = 0; r < rotations; r++) {
            int last = numbers[numbers.length - 1];
            for (int i = numbers.length - 1; i > 0; i--) {
                numbers[i] = numbers[i - 1];
            }
            numbers[0] = last;
        }
        
        System.out.print("After " + rotations + " rotations: ");
        printArray(numbers);
    }
    
    public static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}
```

---

### Exercise 11: Find Missing Number
```java
public class FindMissingNumber {
    public static void main(String[] args) {
        // Array contains numbers from 1 to n with one missing
        int[] numbers = {1, 2, 4, 5, 6, 7, 8, 9, 10};
        int n = 10; // Expected range: 1 to 10
        
        // Sum of first n natural numbers: n * (n + 1) / 2
        int expectedSum = n * (n + 1) / 2;
        
        int actualSum = 0;
        for (int num : numbers) {
            actualSum += num;
        }
        
        int missingNumber = expectedSum - actualSum;
        
        System.out.println("Missing number: " + missingNumber);
    }
}
```

---

### Exercise 12: Check if Array is Sorted
```java
public class CheckSorted {
    public static void main(String[] args) {
        int[] arr1 = {1, 2, 3, 4, 5};
        int[] arr2 = {1, 3, 2, 4, 5};
        
        System.out.println("Array 1 is sorted: " + isSorted(arr1));
        System.out.println("Array 2 is sorted: " + isSorted(arr2));
    }
    
    public static boolean isSorted(int[] arr) {
        for (int i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                return false;
            }
        }
        return true;
    }
}
```

---

### Exercise 13: Frequency of Elements
```java
public class ElementFrequency {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 2, 4, 1, 5, 3, 2, 1};
        
        System.out.println("Element Frequencies:");
        
        // Track which elements we've already counted
        boolean[] counted = new boolean[numbers.length];
        
        for (int i = 0; i < numbers.length; i++) {
            if (counted[i]) {
                continue;
            }
            
            int count = 1;
            for (int j = i + 1; j < numbers.length; j++) {
                if (numbers[i] == numbers[j]) {
                    count++;
                    counted[j] = true;
                }
            }
            
            System.out.println(numbers[i] + " appears " + count + " time(s)");
        }
    }
}
```

---

### Exercise 14: Left and Right Sum
```java
public class LeftRightSum {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5, 6};
        
        int totalSum = 0;
        for (int num : numbers) {
            totalSum += num;
        }
        
        int leftSum = 0;
        System.out.println("Index\tLeft Sum\tRight Sum");
        
        for (int i = 0; i < numbers.length; i++) {
            int rightSum = totalSum - leftSum - numbers[i];
            System.out.println(i + "\t" + leftSum + "\t\t" + rightSum);
            leftSum += numbers[i];
        }
    }
}
```

---

### Exercise 15: Array Palindrome Check
```java
public class ArrayPalindrome {
    public static void main(String[] args) {
        int[] arr1 = {1, 2, 3, 2, 1};
        int[] arr2 = {1, 2, 3, 4, 5};
        
        System.out.println("Array 1 is palindrome: " + isPalindrome(arr1));
        System.out.println("Array 2 is palindrome: " + isPalindrome(arr2));
    }
    
    public static boolean isPalindrome(int[] arr) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left < right) {
            if (arr[left] != arr[right]) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}
```

---


## 🔑 Key Takeaways

1. **Arrays**: Fixed-size, homogeneous collections
2. **Zero-based indexing**: First element at index 0
3. **Declaration**: `dataType[] arrayName`
4. **Initialization**: 
   - `new dataType[size]`
   - `{value1, value2, ...}`
5. **Access**: `arrayName[index]`
6. **Length**: `arrayName.length` (property, not method)
7. **Iteration**:
   - for loop: when you need index
   - for-each: when you only need values
8. **Common operations**: max, min, sum, average, search, reverse
9. **Exception**: ArrayIndexOutOfBoundsException for invalid indices

---

## ⚠️ Common Mistakes

### 1. Declaration and Initialization Issues

#### ❌ Wrong - Array Size in Declaration:
```java
// WRONG - Cannot specify size in declaration
int[5] numbers;  // Compilation error!
int[] numbers[5];  // Compilation error!
```
**Issue:** Size cannot be part of the type declaration

#### ✅ Right:
```java
// CORRECT
int[] numbers;  // Declare
numbers = new int[5];  // Then allocate size

// OR combine
int[] numbers = new int[5];  // Declare and allocate together
```

**Why:** In Java, array size is specified during allocation with `new`, not in the type declaration.

**💡 Tip:** Syntax is `dataType[] arrayName = new dataType[size];` - size comes with `new`, not with the type.

---

#### ❌ Wrong - Not Initializing Before Use:
```java
// WRONG
int[] numbers;
numbers[0] = 10;  // NullPointerException! Array not initialized
```
**Issue:** Array variable declared but not allocated memory

#### ✅ Right:
```java
// CORRECT
int[] numbers = new int[5];  // Allocate memory first
numbers[0] = 10;  // Now can assign values
```

**Why:** Declaration creates a reference variable; must allocate memory with `new` before use.

**💡 Tip:** Always initialize arrays before accessing elements: `int[] arr = new int[size];`

---

#### ❌ Wrong - Using new with Array Initializer in Declaration:
```java
// WRONG
int[] numbers = new int[5]{1, 2, 3, 4, 5};  // Compilation error!
```
**Issue:** Cannot specify both size and initializer values together

#### ✅ Right:
```java
// CORRECT - Method 1
int[] numbers = {1, 2, 3, 4, 5};  // No 'new' or size

// CORRECT - Method 2
int[] numbers = new int[]{1, 2, 3, 4, 5};  // 'new' but no size
```

**Why:** When providing values, compiler determines size automatically.

**💡 Tip:** Either specify size OR values, not both: `new int[5]` or `{1,2,3,4,5}`.

---

#### ❌ Wrong - Trying to Resize Array:
```java
// WRONG
int[] numbers = new int[5];
numbers = new int[10];  // Creates new array, doesn't resize!
numbers[7] = 50;  // Old array lost, new array has default values
```
**Issue:** Arrays have fixed size; assignment creates new array, losing old data

#### ✅ Right:
```java
// CORRECT - If need to resize, must copy data
int[] numbers = new int[5];
// ... populate numbers ...

int[] larger = new int[10];
for (int i = 0; i < numbers.length; i++) {
    larger[i] = numbers[i];  // Copy old data
}
numbers = larger;  // Replace reference
```

**Why:** Arrays cannot change size after creation; must create new array and copy.

**💡 Tip:** If size changes frequently, use ArrayList instead of arrays.

---

#### ❌ Wrong - Brackets on Variable Instead of Type:
```java
// WRONG (compiles but confusing)
int numbers[];  // C-style syntax, not recommended in Java
```
**Issue:** While valid, this syntax is less clear and not Java convention

#### ✅ Right:
```java
// CORRECT
int[] numbers;  // Java-style syntax, preferred
```

**Why:** Placing brackets after type makes array nature of variable immediately clear.

**💡 Tip:** Always use `int[] arr` syntax for consistency with Java conventions.

---

#### ❌ Wrong - Anonymous Array Without new:
```java
// WRONG
int[] numbers;
numbers = {1, 2, 3, 4, 5};  // Compilation error!
```
**Issue:** Array initializer syntax only works in declaration, not assignment

#### ✅ Right:
```java
// CORRECT
int[] numbers;
numbers = new int[]{1, 2, 3, 4, 5};  // Need 'new' keyword
```

**Why:** After declaration, must use `new int[]{...}` for anonymous array.

**💡 Tip:** Shortcut `{...}` only works at declaration: `int[] arr = {...};`

---

### 2. Index-Related Mistakes

#### ❌ Wrong - Off-by-One Error (Using length):
```java
// WRONG
int[] arr = {10, 20, 30, 40, 50};

for (int i = 0; i <= arr.length; i++) {  // <= is wrong!
    System.out.println(arr[i]);  // ArrayIndexOutOfBoundsException!
}
```
**Issue:** Loop tries to access arr[5] which doesn't exist (indices 0-4)

#### ✅ Right:
```java
// CORRECT
int[] arr = {10, 20, 30, 40, 50};

for (int i = 0; i < arr.length; i++) {  // Use < not <=
    System.out.println(arr[i]);  // Correctly accesses 0-4
}
```

**Why:** Array of length 5 has indices 0-4, not 0-5.

**💡 Tip:** Always use `i < arr.length`, not `i <= arr.length` in loops.

---

#### ❌ Wrong - Starting Index at 1:
```java
// WRONG
int[] scores = {85, 90, 78, 92, 88};

for (int i = 1; i < scores.length; i++) {  // Starts at 1!
    System.out.println(scores[i]);
}
// Prints 90, 78, 92, 88 - misses first element (85)!
```
**Issue:** First element at index 0 is skipped

#### ✅ Right:
```java
// CORRECT
int[] scores = {85, 90, 78, 92, 88};

for (int i = 0; i < scores.length; i++) {  // Starts at 0
    System.out.println(scores[i]);
}
// Prints all elements: 85, 90, 78, 92, 88
```

**Why:** Java arrays are zero-based; first element is at index 0.

**💡 Tip:** Always start loops at 0 for arrays unless you have specific reason to skip first element.

---

#### ❌ Wrong - Using length() Instead of length:
```java
// WRONG
int[] arr = {1, 2, 3, 4, 5};
for (int i = 0; i < arr.length(); i++) {  // Compilation error!
    System.out.println(arr[i]);
}
```
**Issue:** length is a property (field), not a method

#### ✅ Right:
```java
// CORRECT
int[] arr = {1, 2, 3, 4, 5};
for (int i = 0; i < arr.length; i++) {  // No parentheses
    System.out.println(arr[i]);
}
```

**Why:** Arrays use `length` property; Strings use `length()` method.

**💡 Tip:** Remember: `array.length` (no parentheses), `string.length()` (with parentheses).

---

#### ❌ Wrong - Negative Index:
```java
// WRONG
int[] numbers = {10, 20, 30, 40, 50};
int value = numbers[-1];  // ArrayIndexOutOfBoundsException!
```
**Issue:** Negative indices are invalid in Java (unlike Python)

#### ✅ Right:
```java
// CORRECT
int[] numbers = {10, 20, 30, 40, 50};
int lastValue = numbers[numbers.length - 1];  // Access last element
```

**Why:** Java doesn't support negative indexing; use `length - 1` for last element.

**💡 Tip:** For last element, use `arr[arr.length - 1]`, not `arr[-1]`.

---

#### ❌ Wrong - Confusing Index with Value:
```java
// WRONG
int[] numbers = {10, 20, 30, 40, 50};
int index = 20;  // This is a value, not index!
System.out.println(numbers[index]);  // ArrayIndexOutOfBoundsException!
```
**Issue:** Using element value as index instead of finding the position

#### ✅ Right:
```java
// CORRECT - Find index of value 20
int[] numbers = {10, 20, 30, 40, 50};
int targetValue = 20;
int index = -1;

for (int i = 0; i < numbers.length; i++) {
    if (numbers[i] == targetValue) {
        index = i;  // Found at index 1
        break;
    }
}
System.out.println("Value " + targetValue + " at index " + index);
```

**Why:** Index is the position (0-4); value is the element stored at that position.

**💡 Tip:** Index = position in array; Value = data stored at that position.

---

#### ❌ Wrong - Accessing Last Element Wrong:
```java
// WRONG
int[] arr = {1, 2, 3, 4, 5};
int last = arr[arr.length];  // ArrayIndexOutOfBoundsException!
```
**Issue:** arr.length is 5, but last index is 4

#### ✅ Right:
```java
// CORRECT
int[] arr = {1, 2, 3, 4, 5};
int last = arr[arr.length - 1];  // Correct: arr[4]
```

**Why:** Array of length n has indices 0 to n-1.

**💡 Tip:** Last element is always at `arr.length - 1`, not `arr.length`.

---

#### ❌ Wrong - Index Calculation Error in Reverse:
```java
// WRONG
int[] arr = {1, 2, 3, 4, 5};

for (int i = 0; i < arr.length / 2; i++) {
    int temp = arr[i];
    arr[i] = arr[arr.length - i];  // Wrong! Should be length - 1 - i
    arr[arr.length - i] = temp;  // ArrayIndexOutOfBoundsException!
}
```
**Issue:** Accessing arr[5] which is out of bounds

#### ✅ Right:
```java
// CORRECT
int[] arr = {1, 2, 3, 4, 5};

for (int i = 0; i < arr.length / 2; i++) {
    int temp = arr[i];
    arr[i] = arr[arr.length - 1 - i];  // Correct formula
    arr[arr.length - 1 - i] = temp;
}
```

**Why:** Opposite index of i is `length - 1 - i`, not `length - i`.

**💡 Tip:** For reverse operations, opposite index formula is `length - 1 - i`.

---

#### ❌ Wrong - Empty Array Access:
```java
// WRONG
int[] arr = new int[0];  // Empty array
int first = arr[0];  // ArrayIndexOutOfBoundsException!
```
**Issue:** Cannot access elements in an empty array

#### ✅ Right:
```java
// CORRECT
int[] arr = new int[0];

if (arr.length > 0) {
    int first = arr[0];  // Safe access
} else {
    System.out.println("Array is empty");
}
```

**Why:** Empty arrays have length 0 and no accessible indices.

**💡 Tip:** Always check `arr.length > 0` before accessing elements.

---

### 3. Loop Iteration Mistakes

#### ❌ Wrong - Wrong Loop Condition:
```java
// WRONG
int[] numbers = {10, 20, 30, 40, 50};

for (int i = 0; i <= numbers.length; i++) {  // <= causes problem
    System.out.println(numbers[i]);  // Crashes at i=5
}
```
**Issue:** Condition `<=` includes invalid index (length itself)

#### ✅ Right:
```java
// CORRECT
int[] numbers = {10, 20, 30, 40, 50};

for (int i = 0; i < numbers.length; i++) {  // Use <
    System.out.println(numbers[i]);  // Stops at i=4
}
```

**Why:** Valid indices are 0 to length-1, so condition must be `< length`.

**💡 Tip:** Standard array loop: `for (int i = 0; i < arr.length; i++)`

---

#### ❌ Wrong - Modifying Array in for-each:
```java
// WRONG
int[] arr = {1, 2, 3, 4, 5};

for (int num : arr) {
    num = num * 2;  // Doesn't modify array!
}

System.out.println(Arrays.toString(arr));  // Prints [1, 2, 3, 4, 5]
```
**Issue:** for-each creates a copy of each element; modifying copy doesn't affect array

#### ✅ Right:
```java
// CORRECT
int[] arr = {1, 2, 3, 4, 5};

for (int i = 0; i < arr.length; i++) {
    arr[i] = arr[i] * 2;  // Directly modifies array
}

System.out.println(Arrays.toString(arr));  // Prints [2, 4, 6, 8, 10]
```

**Why:** for-each loop provides read-only access to elements.

**💡 Tip:** Use indexed for loop when you need to modify array elements.

---

#### ❌ Wrong - Need Index But Using for-each:
```java
// WRONG
String[] names = {"Alice", "Bob", "Charlie"};

for (String name : names) {
    // How to print index? Can't access it!
    System.out.println("Name: " + name);
}
```
**Issue:** for-each doesn't provide index information

#### ✅ Right:
```java
// CORRECT
String[] names = {"Alice", "Bob", "Charlie"};

for (int i = 0; i < names.length; i++) {
    System.out.println("Index " + i + ": " + names[i]);
}
```

**Why:** for-each only provides elements, not their positions.

**💡 Tip:** Use indexed for loop when you need both element and its index.

---

#### ❌ Wrong - Infinite Loop with Array Modification:
```java
// WRONG
int[] arr = {1, 2, 3, 4, 5};
int i = 0;

while (i < arr.length) {
    System.out.println(arr[i]);
    // Forgot to increment i!
}
// Infinite loop!
```
**Issue:** Loop counter never increments

#### ✅ Right:
```java
// CORRECT
int[] arr = {1, 2, 3, 4, 5};
int i = 0;

while (i < arr.length) {
    System.out.println(arr[i]);
    i++;  // Increment counter
}
```

**Why:** Must increment loop counter to eventually exit.

**💡 Tip:** Always update loop variable when using while loops.

---

#### ❌ Wrong - Wrong Bounds for Partial Iteration:
```java
// WRONG - Want to process first 3 elements
int[] arr = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

for (int i = 0; i <= 3; i++) {  // Processes 4 elements (0,1,2,3)!
    System.out.println(arr[i]);
}
```
**Issue:** Condition `<= 3` includes 4th element (index 3)

#### ✅ Right:
```java
// CORRECT - Process first 3 elements
int[] arr = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

for (int i = 0; i < 3; i++) {  // Processes indices 0,1,2 (3 elements)
    System.out.println(arr[i]);
}
```

**Why:** To process n elements starting at 0, use condition `< n`.

**💡 Tip:** For n items starting at 0: use `i < n`, not `i <= n`.

---

### 4. Array Comparison and Copying

#### ❌ Wrong - Using == to Compare Arrays:
```java
// WRONG
int[] arr1 = {1, 2, 3, 4, 5};
int[] arr2 = {1, 2, 3, 4, 5};

if (arr1 == arr2) {  // FALSE! Compares references
    System.out.println("Equal");
}
// Nothing prints even though contents are same
```
**Issue:** == compares memory addresses, not array contents

#### ✅ Right:
```java
// CORRECT
int[] arr1 = {1, 2, 3, 4, 5};
int[] arr2 = {1, 2, 3, 4, 5};

// Manual comparison
boolean equal = true;
if (arr1.length == arr2.length) {
    for (int i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i]) {
            equal = false;
            break;
        }
    }
}

if (equal) {
    System.out.println("Equal");
}
```

**Why:** == checks if both variables point to same array object in memory.

**💡 Tip:** Use Arrays.equals() (covered in Day 7) for content comparison.

---

#### ❌ Wrong - Shallow Copy (Reference Assignment):
```java
// WRONG
int[] original = {1, 2, 3, 4, 5};
int[] copy = original;  // Not a copy! Same reference

copy[0] = 100;  // Modifies original!
System.out.println(original[0]);  // Prints 100
```
**Issue:** Assignment copies reference, not array; both variables point to same array

#### ✅ Right:
```java
// CORRECT - Method 1: Manual copy
int[] original = {1, 2, 3, 4, 5};
int[] copy = new int[original.length];

for (int i = 0; i < original.length; i++) {
    copy[i] = original[i];
}

// CORRECT - Method 2: Using clone()
int[] copy2 = original.clone();

copy[0] = 100;  // Doesn't affect original
System.out.println(original[0]);  // Prints 1
```

**Why:** Arrays are objects; assignment copies reference, not contents.

**💡 Tip:** Use manual loop or clone() to create independent copy of array.

---

#### ❌ Wrong - Not Creating New Array for Copy:
```java
// WRONG
int[] source = {1, 2, 3, 4, 5};
int[] destination;  // Just declared, not allocated

for (int i = 0; i < source.length; i++) {
    destination[i] = source[i];  // NullPointerException!
}
```
**Issue:** Destination array not allocated memory before copying

#### ✅ Right:
```java
// CORRECT
int[] source = {1, 2, 3, 4, 5};
int[] destination = new int[source.length];  // Allocate memory

for (int i = 0; i < source.length; i++) {
    destination[i] = source[i];  // Now works
}
```

**Why:** Must allocate memory for destination array before copying elements.

**💡 Tip:** Always create destination array with proper size before copying.

---

#### ❌ Wrong - Comparing Array with null Using ==:
```java
// WRONG (but common pattern with wrong assumption)
int[] arr1 = {1, 2, 3};
int[] arr2 = null;

if (arr1 == arr2) {  // Works, but doesn't check contents
    System.out.println("Same");
}
```
**Issue:** == is appropriate for null check, but not for content comparison

#### ✅ Right:
```java
// CORRECT - Check null first, then contents
int[] arr1 = {1, 2, 3};
int[] arr2 = {1, 2, 3};

if (arr1 != null && arr2 != null) {
    boolean equal = arr1.length == arr2.length;
    for (int i = 0; equal && i < arr1.length; i++) {
        if (arr1[i] != arr2[i]) {
            equal = false;
        }
    }
    System.out.println(equal ? "Equal" : "Not equal");
}
```

**Why:** Must check null before comparing contents to avoid NullPointerException.

**💡 Tip:** Check for null before array operations: `if (arr != null)`

---

### 5. Default Values and Null Issues

#### ❌ Wrong - Assuming Non-Zero Default Values:
```java
// WRONG
int[] numbers = new int[5];
int sum = 0;

for (int num : numbers) {
    sum += num;
}

if (sum == 0) {
    System.out.println("Array is empty or all zeros?");
    // Can't tell the difference!
}
```
**Issue:** New arrays have default values (0 for int), can't distinguish from intentional zeros

#### ✅ Right:
```java
// CORRECT - Initialize with sentinel value or track separately
int[] numbers = new int[5];
boolean initialized = false;

// ... fill array ...

if (initialized) {
    int sum = 0;
    for (int num : numbers) {
        sum += num;
    }
    System.out.println("Sum: " + sum);
} else {
    System.out.println("Array not yet populated");
}
```

**Why:** Default int value is 0; cannot distinguish uninitialized from zero.

**💡 Tip:** Default values: int=0, double=0.0, boolean=false, Object=null.

---

#### ❌ Wrong - Null Pointer with Reference Arrays:
```java
// WRONG
String[] names = new String[3];

System.out.println(names[0].length());  // NullPointerException!
```
**Issue:** String array created but elements are null by default

#### ✅ Right:
```java
// CORRECT
String[] names = new String[3];

if (names[0] != null) {
    System.out.println(names[0].length());
} else {
    System.out.println("Element is null");
}

// OR initialize when creating
String[] names2 = {"Alice", "Bob", "Charlie"};
System.out.println(names2[0].length());  // Safe, elements not null
```

**Why:** Reference type arrays initialize elements to null, not empty objects.

**💡 Tip:** Always check for null before calling methods on array elements.

---

#### ❌ Wrong - Accessing Elements of Null Array:
```java
// WRONG
int[] numbers = null;
System.out.println(numbers.length);  // NullPointerException!
```
**Issue:** Array variable is null (not allocated)

#### ✅ Right:
```java
// CORRECT
int[] numbers = null;

if (numbers != null) {
    System.out.println("Length: " + numbers.length);
} else {
    System.out.println("Array is null");
}
```

**Why:** Must allocate array before accessing any properties or elements.

**💡 Tip:** Check `arr != null` before any array operations.

---

### 6. Type Issues

#### ❌ Wrong - Type Mismatch in Array Assignment:
```java
// WRONG
int[] numbers = {1, 2, 3, 4, 5};
numbers[0] = 10.5;  // Compilation error! Cannot assign double to int
```
**Issue:** Array is typed; cannot assign incompatible type

#### ✅ Right:
```java
// CORRECT
int[] numbers = {1, 2, 3, 4, 5};
numbers[0] = (int) 10.5;  // Cast to int: 10

// OR use double array
double[] decimals = {1.0, 2.0, 3.0, 4.0, 5.0};
decimals[0] = 10.5;  // Works
```

**Why:** Arrays are homogeneous; all elements must be same type.

**💡 Tip:** Array type determines element type; cast if needed or use appropriate array type.

---

#### ❌ Wrong - Mixing Primitive and Wrapper Types:
```java
// WRONG (causes confusion)
int[] primitives = {1, 2, 3};
Integer[] wrappers = new Integer[3];

// Cannot directly assign
wrappers = primitives;  // Compilation error! Incompatible types
```
**Issue:** int[] and Integer[] are different types despite auto-boxing

#### ✅ Right:
```java
// CORRECT - Manual conversion needed
int[] primitives = {1, 2, 3};
Integer[] wrappers = new Integer[primitives.length];

for (int i = 0; i < primitives.length; i++) {
    wrappers[i] = primitives[i];  // Auto-boxing works per element
}
```

**Why:** int[] and Integer[] are completely different array types.

**💡 Tip:** Cannot directly convert between primitive and wrapper arrays; must copy element-by-element.

---

### 7. Array Operations Mistakes

#### ❌ Wrong - Wrong Logic in Find Max:
```java
// WRONG
int[] numbers = {45, 23, 67, 12, 89, 34};
int max = 0;  // Assumes max is at least 0!

for (int num : numbers) {
    if (num > max) {
        max = num;
    }
}
System.out.println("Max: " + max);  // Wrong if all numbers are negative!
```
**Issue:** Initial max value of 0 is wrong if all numbers are negative

#### ✅ Right:
```java
// CORRECT
int[] numbers = {45, 23, 67, 12, 89, 34};
int max = numbers[0];  // Initialize to first element

for (int i = 1; i < numbers.length; i++) {
    if (numbers[i] > max) {
        max = numbers[i];
    }
}
System.out.println("Max: " + max);  // Correct
```

**Why:** Initial value matters; start with first element or Integer.MIN_VALUE.

**💡 Tip:** Initialize max to first element or Integer.MIN_VALUE, not 0.

---

#### ❌ Wrong - Integer Division in Average:
```java
// WRONG
int[] scores = {85, 90, 78, 92, 88};
int sum = 0;

for (int score : scores) {
    sum += score;
}

int average = sum / scores.length;  // Integer division!
System.out.println("Average: " + average);  // Prints 86, not 86.6
```
**Issue:** Integer division truncates decimal part

#### ✅ Right:
```java
// CORRECT
int[] scores = {85, 90, 78, 92, 88};
int sum = 0;

for (int score : scores) {
    sum += score;
}

double average = (double) sum / scores.length;  // Cast to double
System.out.println("Average: " + average);  // Prints 86.6
```

**Why:** Dividing two ints produces int result; cast to double for decimal result.

**💡 Tip:** Cast sum to double before division to get decimal average.

---

#### ❌ Wrong - Not Handling Empty Array:
```java
// WRONG
int[] numbers = {};  // Empty array

int max = numbers[0];  // ArrayIndexOutOfBoundsException!
for (int num : numbers) {
    if (num > max) max = num;
}
```
**Issue:** Cannot access first element of empty array

#### ✅ Right:
```java
// CORRECT
int[] numbers = {};

if (numbers.length == 0) {
    System.out.println("Array is empty");
} else {
    int max = numbers[0];
    for (int num : numbers) {
        if (num > max) max = num;
    }
    System.out.println("Max: " + max);
}
```

**Why:** Must check array length before accessing elements.

**💡 Tip:** Always validate array is not empty before operations that access elements.

---

#### ❌ Wrong - Incorrect Reverse Algorithm:
```java
// WRONG
int[] arr = {1, 2, 3, 4, 5};

for (int i = 0; i < arr.length; i++) {  // Reverses twice!
    int temp = arr[i];
    arr[i] = arr[arr.length - 1 - i];
    arr[arr.length - 1 - i] = temp;
}
// Array ends up unchanged!
```
**Issue:** Loop runs through entire array, swapping twice (undoing the reverse)

#### ✅ Right:
```java
// CORRECT
int[] arr = {1, 2, 3, 4, 5};

for (int i = 0; i < arr.length / 2; i++) {  // Only go halfway
    int temp = arr[i];
    arr[i] = arr[arr.length - 1 - i];
    arr[arr.length - 1 - i] = temp;
}
// Array reversed: {5, 4, 3, 2, 1}
```

**Why:** Reversing swaps pairs from outside in; only need to go halfway.

**💡 Tip:** Reverse loop condition: `i < arr.length / 2`, not full length.

---

### 8. Common Logic Errors

#### ❌ Wrong - Incorrect Swap Logic:
```java
// WRONG
int[] arr = {1, 2, 3, 4, 5};

// Trying to swap without temp variable
arr[0] = arr[1];  // arr[0] becomes 2
arr[1] = arr[0];  // arr[1] becomes 2 (not 1!)
// Both elements now have value 2!
```
**Issue:** First assignment overwrites arr[0] before copying to arr[1]

#### ✅ Right:
```java
// CORRECT
int[] arr = {1, 2, 3, 4, 5};

int temp = arr[0];  // Save arr[0]
arr[0] = arr[1];    // Copy arr[1] to arr[0]
arr[1] = temp;      // Copy saved value to arr[1]
// Now arr[0]=2, arr[1]=1 (swapped correctly)
```

**Why:** Need temporary variable to preserve value during swap.

**💡 Tip:** Standard swap: `temp = a; a = b; b = temp;`

---

#### ❌ Wrong - Off-by-One in Array Rotation:
```java
// WRONG
int[] arr = {1, 2, 3, 4, 5};

// Rotate right by 1
int last = arr[arr.length - 1];
for (int i = arr.length - 1; i >= 0; i--) {  // Includes 0!
    arr[i] = arr[i - 1];  // ArrayIndexOutOfBoundsException at i=0!
}
arr[0] = last;
```
**Issue:** Loop tries to access arr[-1] when i=0

#### ✅ Right:
```java
// CORRECT
int[] arr = {1, 2, 3, 4, 5};

int last = arr[arr.length - 1];
for (int i = arr.length - 1; i > 0; i--) {  // Stop at 1, not 0
    arr[i] = arr[i - 1];
}
arr[0] = last;
// Array rotated: {5, 1, 2, 3, 4}
```

**Why:** Loop must stop before reaching index 0 to avoid negative index.

**💡 Tip:** In rotation, loop condition must be `i > 0` not `i >= 0`.

---

#### ❌ Wrong - Wrong Merge Array Size:
```java
// WRONG
int[] arr1 = {1, 2, 3};
int[] arr2 = {4, 5, 6, 7, 8};

int[] merged = new int[arr1.length];  // Too small!

for (int i = 0; i < arr1.length; i++) {
    merged[i] = arr1[i];
}

for (int i = 0; i < arr2.length; i++) {
    merged[arr1.length + i] = arr2[i];  // ArrayIndexOutOfBoundsException!
}
```
**Issue:** Merged array size should be sum of both arrays

#### ✅ Right:
```java
// CORRECT
int[] arr1 = {1, 2, 3};
int[] arr2 = {4, 5, 6, 7, 8};

int[] merged = new int[arr1.length + arr2.length];  // Correct size

for (int i = 0; i < arr1.length; i++) {
    merged[i] = arr1[i];
}

for (int i = 0; i < arr2.length; i++) {
    merged[arr1.length + i] = arr2[i];
}
```

**Why:** Merged array must have space for all elements from both arrays.

**💡 Tip:** Merged array size = arr1.length + arr2.length.

---

This comprehensive list now contains **35+ array mistakes** covering every aspect of Day 6: Arrays - Part 1!

---

## 🧭 Navigation

### Week 1 Progress:
- [← Day 5: Control Flow - Loops](day05_control_flow_loops.md)
- **Day 6: Arrays - Part 1** ← You are here
- [Day 7: Arrays - Part 2 & Review →](day07_arrays_part2_review.md)

### Related Resources:
- [📝 Day 6 Assessment](../../../java-learning-app/src/data/assessments/java/week1/day6.js)
- [💪 Week 1 Exercises](../../../03_BEGINNER_FRIENDLY_Exercises/Core_Java/Week1_Days01-07_Setup_and_Basics.md)
- [📚 Detailed Topics Reference](../../../02_Detailed_Topics/Detailed_Topics_Core_Java.md#day-6-arrays---part-1)
- [🏠 Back to Week 1 Overview](README.md)

---

## ✅ Day 6 Checklist

Before moving to Day 7, ensure you can:
- [ ] Explain what arrays are and their characteristics
- [ ] Declare arrays using proper syntax
- [ ] Initialize arrays with and without values
- [ ] Access and modify array elements
- [ ] Use the length property correctly
- [ ] Iterate through arrays using different loops
- [ ] Find maximum and minimum elements
- [ ] Calculate sum and average
- [ ] Search for elements in arrays
- [ ] Reverse an array
- [ ] Handle ArrayIndexOutOfBoundsException

---

**🎉 Congratulations on completing Day 6!**

You now understand arrays and can work with collections of data. Tomorrow, we'll learn about multi-dimensional arrays and the Arrays utility class.

**Next**: [Day 7: Arrays - Part 2 & Review →](day07_arrays_part2_review.md)

---

*Last Updated: 2026-01-08*