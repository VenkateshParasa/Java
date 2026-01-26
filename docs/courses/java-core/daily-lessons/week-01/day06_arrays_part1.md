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

### 1. Forgetting Zero-Based Indexing:
```java
int[] arr = new int[5];
// Valid indices: 0, 1, 2, 3, 4
// NOT: 1, 2, 3, 4, 5

arr[5] = 10;  // ERROR! Index out of bounds
arr[4] = 10;  // CORRECT: last element
```

### 2. Using length() Instead of length:
```java
int[] arr = {1, 2, 3};
System.out.println(arr.length());  // ERROR! length is property
System.out.println(arr.length);    // CORRECT
```

### 3. Not Initializing Array:
```java
int[] numbers;
numbers[0] = 10;  // ERROR! Array not initialized

int[] numbers = new int[5];  // CORRECT
numbers[0] = 10;
```

### 4. Modifying Array in for-each:
```java
int[] arr = {1, 2, 3};
for (int num : arr) {
    num = num * 2;  // Doesn't change array!
}

// Use regular for loop to modify
for (int i = 0; i < arr.length; i++) {
    arr[i] = arr[i] * 2;  // This works
}
```

### 5. Comparing Arrays with ==:
```java
int[] arr1 = {1, 2, 3};
int[] arr2 = {1, 2, 3};

if (arr1 == arr2) { }  // Compares references, not content!

// Use Arrays.equals() (Day 7)
if (Arrays.equals(arr1, arr2)) { }  // Compares content
```

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