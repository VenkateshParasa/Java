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

**📝 Problem Statement:**
Create a program that demonstrates array initialization and printing using both indexed loop and for-each loop.

**Requirements:**
- Initialize an integer array with 10 predefined values
- Print all elements with their indices using a standard for loop
- Print all elements using an enhanced for-each loop
- Display appropriate labels for each output section

**Sample Test Cases:**
```
Expected Output:
Array elements:
Index 0: 5
Index 1: 12
Index 2: 8
Index 3: 23
Index 4: 17
Index 5: 9
Index 6: 14
Index 7: 6
Index 8: 20
Index 9: 11

Using for-each:
5 12 8 23 17 9 14 6 20 11
```

**Solution:**
```java
public class ArrayBasics {
    public static void main(String[] args) {
        // Create array of 10 integers
        int[] numbers = {5, 12, 8, 23, 17, 9, 14, 6, 20, 11};

        // Print all elements with index
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

**💡 Tips:**
- Use standard for loop when you need index numbers
- Use for-each loop for simpler iteration when index isn't needed
- Array indices always start at 0
- `array.length` gives total number of elements (no parentheses)

---

### Exercise 2: Find Largest and Smallest

**📝 Problem Statement:**
Write a program that accepts an array of numbers from the user and finds both the largest and smallest elements.

**Requirements:**
- Accept array size from user
- Input elements into the array
- Find the minimum element
- Find the maximum element
- Display both minimum and maximum values
- Handle arrays with at least one element

**Sample Test Cases:**
```
Input: size = 5, elements = [45, 12, 89, 23, 67]
Expected Output:
Smallest: 12
Largest: 89

Input: size = 7, elements = [100, 50, 75, 25, 90, 10, 60]
Expected Output:
Smallest: 10
Largest: 100

Input: size = 3, elements = [5, 5, 5]
Expected Output:
Smallest: 5
Largest: 5
```

**Solution:**
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

**💡 Tips:**
- Initialize min and max to first element, not to 0
- Use for-each loop for simpler element-by-element comparison
- Handle edge case: if array has only one element, min equals max
- For unsorted arrays, time complexity is O(n)

---

### Exercise 3: Calculate Sum and Average

**📝 Problem Statement:**
Create a program that calculates the sum, average, and count of scores above average from a predefined array of test scores.

**Requirements:**
- Use a predefined array of integer scores
- Calculate the sum of all scores
- Calculate the average (ensure proper decimal division)
- Count how many scores are above the average
- Display all calculated values with appropriate labels

**Sample Test Cases:**
```
Input: scores = [85, 90, 78, 92, 88, 76, 95, 82]
Expected Output:
Number of scores: 8
Total sum: 686
Average: 85.75
Scores above average: 4

Input: scores = [100, 95, 90, 85, 80]
Expected Output:
Number of scores: 5
Total sum: 450
Average: 90.0
Scores above average: 2
```

**Solution:**
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

**💡 Tips:**
- Cast sum to `double` before division to get decimal result
- Use `scores.length` to get array size dynamically
- Two-pass approach: first calculate average, then count above average
- For-each loop is perfect for summing array elements

---

### Exercise 4: Search for Element

**📝 Problem Statement:**
Implement a linear search algorithm that finds a target element in an array and returns its index position.

**Requirements:**
- Use a predefined integer array
- Accept target value from user input
- Search for the target using linear search
- Display index if found
- Display "not found" message if target doesn't exist
- Use `break` to exit loop once element is found

**Sample Test Cases:**
```
Input: array = [10, 25, 30, 45, 50, 60, 75, 80], target = 50
Expected Output:
50 found at index 4

Input: array = [10, 25, 30, 45, 50, 60, 75, 80], target = 100
Expected Output:
100 not found in array

Input: array = [10, 25, 30, 45, 50, 60, 75, 80], target = 10
Expected Output:
10 found at index 0
```

**Solution:**
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

**💡 Tips:**
- Linear search checks each element sequentially
- Time complexity: O(n) in worst case
- Use `break` to stop searching once element is found
- Initialize index to -1 to indicate "not found" state
- For sorted arrays, binary search would be more efficient

---

### Exercise 5: Reverse Array

**📝 Problem Statement:**
Write a program that reverses an array in place by swapping elements from both ends moving toward the center.

**Requirements:**
- Initialize an array with sequential numbers
- Display the original array
- Reverse the array in place (no new array)
- Use swapping technique with temporary variable
- Only iterate through half the array
- Display the reversed array

**Sample Test Cases:**
```
Input: array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
Expected Output:
Original array: 1 2 3 4 5 6 7 8 9 10
Reversed array: 10 9 8 7 6 5 4 3 2 1

Input: array = [5, 10, 15, 20, 25]
Expected Output:
Original array: 5 10 15 20 25
Reversed array: 25 20 15 10 5
```

**Solution:**
```java
public class ReverseArray {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

        System.out.print("Original array: ");
        printArray(numbers);

        // Reverse - swap elements from ends toward center
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

**💡 Tips:**
- Only loop through `array.length / 2` to avoid swapping twice
- Opposite index formula: `length - 1 - i`
- Use temporary variable for swapping
- Time complexity: O(n/2) = O(n)
- Space complexity: O(1) - in-place reversal

---

### Exercise 6: Count Even and Odd Numbers

**📝 Problem Statement:**
Create a program that counts how many even and odd numbers exist in an array.

**Requirements:**
- Initialize an array with mixed even and odd integers
- Count even numbers (divisible by 2)
- Count odd numbers (not divisible by 2)
- Display total count, even count, and odd count
- Verify that even count + odd count equals total count

**Sample Test Cases:**
```
Input: array = [12, 7, 23, 8, 15, 20, 9, 14, 6, 11]
Expected Output:
Total numbers: 10
Even numbers: 5
Odd numbers: 5

Input: array = [2, 4, 6, 8, 10]
Expected Output:
Total numbers: 5
Even numbers: 5
Odd numbers: 0

Input: array = [1, 3, 5, 7, 9]
Expected Output:
Total numbers: 5
Even numbers: 0
Odd numbers: 5
```

**Solution:**
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

**💡 Tips:**
- Use modulus operator `%` to check divisibility by 2
- Even numbers: `num % 2 == 0`
- Odd numbers: `num % 2 != 0` or just `else`
- For-each loop is perfect for this counting task
- Verification: evenCount + oddCount should equal array length

---

### Exercise 7: Second Largest Element

**📝 Problem Statement:**
Find the second largest element in an array without sorting it.

**Requirements:**
- Use a predefined array of at least 2 elements
- Check that array has at least 2 elements
- Find both the largest and second largest elements in one pass
- Handle duplicate values correctly (second largest must be different from largest)
- Use `Integer.MIN_VALUE` for initialization
- Display both largest and second largest

**Sample Test Cases:**
```
Input: array = [45, 23, 67, 12, 89, 34, 78]
Expected Output:
Largest: 89
Second Largest: 78

Input: array = [100, 50, 100, 75, 25]
Expected Output:
Largest: 100
Second Largest: 75

Input: array = [10, 20]
Expected Output:
Largest: 20
Second Largest: 10
```

**Solution:**
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

**💡 Tips:**
- Initialize both variables to `Integer.MIN_VALUE`
- When new largest found, shift old largest to second largest
- Condition `num != largest` prevents duplicates from being second largest
- Single pass solution: O(n) time complexity
- Handles arrays with duplicate values correctly

---

### Exercise 8: Remove Duplicates

**📝 Problem Statement:**
Create a program that removes duplicate elements from an array and returns a new array containing only unique elements.

**Requirements:**
- Start with an array containing duplicate values
- Count unique elements using nested loops
- Create a new array with only unique elements
- Maintain the order of first occurrence
- Display both original and deduplicated arrays
- Use a helper method to print arrays

**Sample Test Cases:**
```
Input: array = [1, 2, 3, 2, 4, 1, 5, 3, 6]
Expected Output:
Original array: 1 2 3 2 4 1 5 3 6
Array without duplicates: 1 2 3 4 5 6

Input: array = [5, 5, 5, 5, 5]
Expected Output:
Original array: 5 5 5 5 5
Array without duplicates: 5

Input: array = [10, 20, 30, 40, 50]
Expected Output:
Original array: 10 20 30 40 50
Array without duplicates: 10 20 30 40 50
```

**Solution:**
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

**💡 Tips:**
- Two-pass approach: first count unique, then build new array
- Check each element against all previous elements for duplicates
- Time complexity: O(n²) due to nested loops
- Maintains insertion order of unique elements
- Alternative: Use Set for O(n) solution (covered in later topics)

---

### Exercise 9: Merge Two Arrays

**📝 Problem Statement:**
Write a program that merges two arrays into a single array containing all elements from both arrays.

**Requirements:**
- Start with two predefined integer arrays
- Create a new array large enough to hold all elements
- Copy all elements from the first array
- Copy all elements from the second array
- Display all three arrays with labels
- Use a helper method for printing arrays

**Sample Test Cases:**
```
Input: arr1 = [1, 3, 5, 7, 9], arr2 = [2, 4, 6, 8, 10]
Expected Output:
Array 1: 1 3 5 7 9
Array 2: 2 4 6 8 10
Merged array: 1 3 5 7 9 2 4 6 8 10

Input: arr1 = [10, 20], arr2 = [30, 40, 50, 60]
Expected Output:
Array 1: 10 20
Array 2: 30 40 50 60
Merged array: 10 20 30 40 50 60
```

**Solution:**
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

**💡 Tips:**
- Merged array size = arr1.length + arr2.length
- Copy first array starting at index 0
- Copy second array starting at index arr1.length
- This is simple concatenation, not sorted merge
- Time complexity: O(n + m) where n, m are array lengths

---

### Exercise 10: Rotate Array

**📝 Problem Statement:**
Implement array rotation that shifts all elements to the right by a specified number of positions, with elements at the end wrapping around to the beginning.

**Requirements:**
- Initialize an array with sequential numbers
- Accept or set the number of rotations
- Perform right rotation (elements shift right, last becomes first)
- Display original array before rotation
- Display array after rotation
- Use nested loops for rotation

**Sample Test Cases:**
```
Input: array = [1, 2, 3, 4, 5, 6, 7], rotations = 3
Expected Output:
Original array: 1 2 3 4 5 6 7
After 3 rotations: 5 6 7 1 2 3 4

Input: array = [10, 20, 30, 40, 50], rotations = 2
Expected Output:
Original array: 10 20 30 40 50
After 2 rotations: 40 50 10 20 30

Input: array = [1, 2, 3, 4, 5], rotations = 5
Expected Output:
Original array: 1 2 3 4 5
After 5 rotations: 1 2 3 4 5
```

**Solution:**
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

**💡 Tips:**
- Right rotation: save last element, shift all right, place saved at start
- Each rotation is O(n), total time: O(k×n) where k is rotations
- Optimization: `rotations % array.length` handles rotations > length
- Left rotation: save first, shift all left, place saved at end
- Advanced: Use reversal algorithm for O(n) solution

---

### Exercise 11: Find Missing Number

**📝 Problem Statement:**
Given an array containing numbers from 1 to n with one number missing, find the missing number using the mathematical sum formula.

**Requirements:**
- Array contains numbers 1 to n with exactly one missing
- Calculate expected sum using formula: n × (n + 1) / 2
- Calculate actual sum of array elements
- Missing number = expected sum - actual sum
- Display the missing number
- Works for any range of consecutive numbers

**Sample Test Cases:**
```
Input: array = [1, 2, 4, 5, 6, 7, 8, 9, 10], n = 10
Expected Output:
Missing number: 3

Input: array = [1, 3, 4, 5], n = 5
Expected Output:
Missing number: 2

Input: array = [2, 3, 4, 5, 6, 7, 8, 9, 10], n = 10
Expected Output:
Missing number: 1
```

**Solution:**
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

**💡 Tips:**
- Formula for sum of 1 to n: n × (n + 1) / 2
- Time complexity: O(n) - single pass through array
- Space complexity: O(1) - only uses few variables
- Works only when exactly one number is missing
- Alternative: Use XOR for bitwise solution

---

### Exercise 12: Check if Array is Sorted

**📝 Problem Statement:**
Write a program that checks whether an array is sorted in ascending order.

**Requirements:**
- Create a helper method that returns boolean
- Check each adjacent pair of elements
- If any element is greater than the next, array is not sorted
- Return true only if all adjacent pairs are in order
- Test with both sorted and unsorted arrays
- Display results for multiple test arrays

**Sample Test Cases:**
```
Input: array = [1, 2, 3, 4, 5]
Expected Output:
Array 1 is sorted: true

Input: array = [1, 3, 2, 4, 5]
Expected Output:
Array 2 is sorted: false

Input: array = [5, 5, 5, 5, 5]
Expected Output:
Array 3 is sorted: true

Input: array = [10, 9, 8, 7, 6]
Expected Output:
Array 4 is sorted: false
```

**Solution:**
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

**💡 Tips:**
- Loop to `arr.length - 1` to avoid out of bounds when accessing `arr[i + 1]`
- Use `>` for strictly ascending, `>=` for strictly ascending (no duplicates)
- Return false immediately when unsorted pair found
- Time complexity: O(n) in worst case
- Can modify to check descending order by changing comparison

---

### Exercise 13: Frequency of Elements

**📝 Problem Statement:**
Count how many times each unique element appears in an array and display the frequency of each element.

**Requirements:**
- Use an array with duplicate values
- Track which elements have been counted
- For each unique element, count its occurrences
- Display element and its frequency
- Skip already counted elements
- Use boolean array to track counted elements

**Sample Test Cases:**
```
Input: array = [1, 2, 3, 2, 4, 1, 5, 3, 2, 1]
Expected Output:
Element Frequencies:
1 appears 3 time(s)
2 appears 3 time(s)
3 appears 2 time(s)
4 appears 1 time(s)
5 appears 1 time(s)

Input: array = [5, 5, 5, 5]
Expected Output:
Element Frequencies:
5 appears 4 time(s)
```

**Solution:**
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

**💡 Tips:**
- Boolean array tracks which positions have been counted
- Inner loop counts occurrences of current element
- Skip already-counted elements using `continue`
- Time complexity: O(n²) due to nested loops
- Alternative: Use HashMap for O(n) solution (covered later)

---

### Exercise 14: Left and Right Sum

**📝 Problem Statement:**
For each index in an array, calculate the sum of elements to its left and the sum of elements to its right, then display both sums.

**Requirements:**
- Initialize an array with integer values
- Calculate total sum of all elements
- For each index, calculate left sum and right sum
- Left sum = sum of all elements before current index
- Right sum = sum of all elements after current index
- Display results in tabular format

**Sample Test Cases:**
```
Input: array = [1, 2, 3, 4, 5, 6]
Expected Output:
Index	Left Sum	Right Sum
0	0		21
1	1		20
2	3		18
3	6		15
4	10		11
5	15		6

Input: array = [10, 20, 30]
Expected Output:
Index	Left Sum	Right Sum
0	0		50
1	10		30
2	30		0
```

**Solution:**
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

**💡 Tips:**
- Formula: rightSum = totalSum - leftSum - current element
- Update leftSum after each iteration
- At first index, leftSum is 0
- At last index, rightSum is 0
- Useful for finding equilibrium index in arrays

---

### Exercise 15: Array Palindrome Check

**📝 Problem Statement:**
Determine if an array is a palindrome by checking if it reads the same forwards and backwards.

**Requirements:**
- Create a helper method that returns boolean
- Use two pointers: one at start, one at end
- Compare elements from both ends moving toward center
- Return false if any pair doesn't match
- Return true if all pairs match
- Test with both palindrome and non-palindrome arrays

**Sample Test Cases:**
```
Input: array = [1, 2, 3, 2, 1]
Expected Output:
Array 1 is palindrome: true

Input: array = [1, 2, 3, 4, 5]
Expected Output:
Array 2 is palindrome: false

Input: array = [5, 5, 5, 5, 5]
Expected Output:
Array 3 is palindrome: true

Input: array = [1, 2, 2, 1]
Expected Output:
Array 4 is palindrome: true
```

**Solution:**
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

**💡 Tips:**
- Two-pointer technique: start from both ends
- Only need to check half the array
- Time complexity: O(n/2) = O(n)
- Space complexity: O(1)
- Similar to checking if a string is a palindrome

---

### Exercise 16: Copy Array Elements

**📝 Problem Statement:**
Create a program that demonstrates proper array copying techniques, including manual copying and using the clone method.

**Requirements:**
- Create an original array with sample values
- Demonstrate incorrect copying (reference assignment)
- Demonstrate correct manual copying using loop
- Demonstrate using clone() method
- Show that modifying copy doesn't affect original
- Display all arrays to verify independence

**Sample Test Cases:**
```
Input: original = [1, 2, 3, 4, 5]
Expected Output:
Original array: 1 2 3 4 5
Incorrectly copied (reference): 100 2 3 4 5
Manual copy: 1 2 3 4 5
Cloned array: 1 2 3 4 5
After modifying manual copy: 200 2 3 4 5
Original still unchanged: 1 2 3 4 5
```

**Solution:**
```java
public class CopyArray {
    public static void main(String[] args) {
        int[] original = {1, 2, 3, 4, 5};

        // Wrong way - just copies reference
        int[] wrongCopy = original;
        wrongCopy[0] = 100;  // Modifies original too!

        System.out.print("Original after wrong copy: ");
        printArray(original);  // Shows 100!

        // Reset original
        original[0] = 1;

        // Correct way 1 - Manual copy
        int[] manualCopy = new int[original.length];
        for (int i = 0; i < original.length; i++) {
            manualCopy[i] = original[i];
        }

        // Correct way 2 - Using clone()
        int[] clonedCopy = original.clone();

        // Test independence
        manualCopy[0] = 200;
        clonedCopy[0] = 300;

        System.out.print("Original array: ");
        printArray(original);  // Still 1 2 3 4 5

        System.out.print("Manual copy: ");
        printArray(manualCopy);  // Shows 200 2 3 4 5

        System.out.print("Cloned copy: ");
        printArray(clonedCopy);  // Shows 300 2 3 4 5
    }

    public static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}
```

**💡 Tips:**
- Assignment (`=`) copies reference, not array contents
- Manual copy: create new array, loop through and copy elements
- `clone()` method creates shallow copy efficiently
- Always create new array for independent copy
- For 2D arrays, clone() only copies references (shallow copy)

---

### Exercise 17: Linear Search with Count

**📝 Problem Statement:**
Implement a linear search that counts how many times a target element appears in an array and returns all index positions where it's found.

**Requirements:**
- Accept an array and target value
- Search through entire array (don't stop at first match)
- Count total occurrences of target
- Store all matching indices
- Display count and all positions
- Handle case when element is not found

**Sample Test Cases:**
```
Input: array = [10, 25, 10, 45, 10, 60, 10, 80], target = 10
Expected Output:
Target 10 found 4 times
Positions: 0, 2, 4, 6

Input: array = [5, 10, 15, 20, 25], target = 30
Expected Output:
Target 30 not found in array

Input: array = [7, 7, 7, 7, 7], target = 7
Expected Output:
Target 7 found 5 times
Positions: 0, 1, 2, 3, 4
```

**Solution:**
```java
import java.util.Scanner;

public class LinearSearchWithCount {
    public static void main(String[] args) {
        int[] numbers = {10, 25, 10, 45, 10, 60, 10, 80};
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter number to search: ");
        int target = scanner.nextInt();

        // First pass: count occurrences
        int count = 0;
        for (int num : numbers) {
            if (num == target) {
                count++;
            }
        }

        if (count == 0) {
            System.out.println("Target " + target + " not found in array");
        } else {
            System.out.println("Target " + target + " found " + count + " time(s)");

            // Second pass: collect positions
            System.out.print("Positions: ");
            boolean first = true;
            for (int i = 0; i < numbers.length; i++) {
                if (numbers[i] == target) {
                    if (!first) System.out.print(", ");
                    System.out.print(i);
                    first = false;
                }
            }
            System.out.println();
        }

        scanner.close();
    }
}
```

**💡 Tips:**
- Two-pass approach: first count, then collect indices
- Use boolean flag for comma formatting
- Time complexity: O(n) - two passes through array
- Useful for finding all matches, not just first
- Can store indices in separate array for later use

---

### Exercise 18: Find Duplicate Elements

**📝 Problem Statement:**
Find and display all elements that appear more than once in an array, along with their frequency.

**Requirements:**
- Use an array with duplicate values
- Identify elements that appear 2 or more times
- Display each duplicate element only once
- Show how many times each duplicate appears
- Skip elements that appear only once
- Use tracking to avoid duplicate reporting

**Sample Test Cases:**
```
Input: array = [1, 2, 3, 2, 4, 1, 5, 3, 2, 6]
Expected Output:
Duplicate Elements:
1 appears 2 time(s)
2 appears 3 time(s)
3 appears 2 time(s)

Input: array = [10, 20, 30, 40, 50]
Expected Output:
No duplicate elements found

Input: array = [5, 5, 5, 5, 5]
Expected Output:
Duplicate Elements:
5 appears 5 time(s)
```

**Solution:**
```java
public class FindDuplicates {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 2, 4, 1, 5, 3, 2, 6};

        boolean[] checked = new boolean[numbers.length];
        boolean foundDuplicate = false;

        System.out.println("Duplicate Elements:");

        for (int i = 0; i < numbers.length; i++) {
            if (checked[i]) {
                continue;
            }

            int count = 1;
            for (int j = i + 1; j < numbers.length; j++) {
                if (numbers[i] == numbers[j]) {
                    count++;
                    checked[j] = true;
                }
            }

            if (count > 1) {
                System.out.println(numbers[i] + " appears " + count + " time(s)");
                foundDuplicate = true;
            }
        }

        if (!foundDuplicate) {
            System.out.println("No duplicate elements found");
        }
    }
}
```

**💡 Tips:**
- Similar to frequency counting but only show duplicates
- Boolean array prevents duplicate reporting
- Only display elements with count > 1
- Time complexity: O(n²) with nested loops
- Alternative: Use HashMap for O(n) solution (covered later)

---

## 💡 Best Practices

### 1. Always Initialize Arrays Before Use

**Practice**: Never use an array without properly initializing it first. Arrays must be allocated with `new` or an initializer list before accessing elements.

**Why It's Important**: Uninitialized arrays (null references) cause NullPointerException. Even allocated arrays have default values that might not be what you want.

**Example**:
```java
// ❌ Poor Practice - Using uninitialized array
public class ArrayDemo {
    int[] scores;  // Declared but not initialized

    void addScore(int score) {
        scores[0] = score;  // NullPointerException!
    }
}

// ✅ Best Practice - Proper initialization
public class ArrayDemo {
    // Option 1: Initialize at declaration
    int[] scores = new int[10];

    // Option 2: Initialize with values
    int[] grades = {85, 90, 78, 92, 88};

    // Option 3: Initialize with explicit default values
    String[] names = new String[5];

    ArrayDemo() {
        // Fill with meaningful defaults instead of null
        for (int i = 0; i < names.length; i++) {
            names[i] = "";  // Empty string instead of null
        }
    }

    void addScore(int index, int score) {
        if (index >= 0 && index < scores.length) {
            scores[index] = score;  // Safe
        }
    }
}
```

---

### 2. Use Meaningful Variable Names for Arrays

**Practice**: Array names should describe what they contain. Use plural nouns for arrays since they hold multiple values. Index variables should indicate what they represent.

**Why It's Important**: Clear names improve code readability and maintainability. They make the code self-documenting and reduce the need for comments.

**Example**:
```java
// ❌ Poor Practice - Unclear names
public class DataProcessor {
    int[] a = new int[100];     // What is 'a'?
    String[] s;                  // What are these strings?

    void process() {
        for (int i = 0; i < a.length; i++) {
            int x = a[i];        // What is 'x'?
            // Process x...
        }
    }
}

// ✅ Best Practice - Descriptive names
public class StudentGradeProcessor {
    int[] studentGrades = new int[100];           // Clear: grades of students
    String[] studentNames = new String[100];      // Clear: names of students
    int studentCount = 0;                         // Clear: how many students

    void calculateAverages() {
        for (int studentIndex = 0; studentIndex < studentCount; studentIndex++) {
            int currentGrade = studentGrades[studentIndex];
            String currentName = studentNames[studentIndex];
            // Process grade for this student...
        }
    }

    // Alternative: enhanced for-loop with clear variable names
    void displayAllGrades() {
        for (int grade : studentGrades) {
            System.out.println("Grade: " + grade);
        }
    }
}
```

---

### 3. Always Validate Array Indices

**Practice**: Check if an index is within the valid range (0 to length-1) before accessing array elements. Use defensive programming techniques.

**Why It's Important**: ArrayIndexOutOfBoundsException is one of the most common runtime errors. Validation provides better error messages and prevents crashes.

**Example**:
```java
// ❌ Poor Practice - No validation
public class ArrayManager {
    int[] numbers = new int[10];

    void setValue(int index, int value) {
        numbers[index] = value;  // Crashes if index invalid!
    }

    int getValue(int index) {
        return numbers[index];  // No safety check
    }
}

// ✅ Best Practice - Comprehensive validation
public class ArrayManager {
    int[] numbers = new int[10];

    boolean setValue(int index, int value) {
        if (!isValidIndex(index)) {
            System.err.println("Error: Index " + index +
                             " is out of bounds. Valid range: 0-" +
                             (numbers.length - 1));
            return false;
        }
        numbers[index] = value;
        return true;
    }

    int getValue(int index) {
        if (!isValidIndex(index)) {
            System.err.println("Error: Invalid index " + index);
            return -1;  // Or throw exception
        }
        return numbers[index];
    }

    // Helper method for validation
    boolean isValidIndex(int index) {
        return index >= 0 && index < numbers.length;
    }

    // Alternative: throw exception for invalid index
    int getValueWithException(int index) {
        if (!isValidIndex(index)) {
            throw new IndexOutOfBoundsException(
                "Index " + index + " is out of range [0, " +
                (numbers.length - 1) + "]"
            );
        }
        return numbers[index];
    }
}
```

---

### 4. Use Enhanced For-Loop for Read-Only Operations

**Practice**: Use the enhanced for-loop (for-each) when you only need to read array values. Use traditional for-loop when you need indices or need to modify elements.

**Why It's Important**: Enhanced for-loop is cleaner, prevents off-by-one errors, and clearly shows read-only intent. It also avoids index-related bugs.

**Example**:
```java
// ❌ Poor Practice - Traditional loop for simple read operations
public class ArrayProcessor {
    void printAllElements(int[] numbers) {
        for (int i = 0; i < numbers.length; i++) {  // Unnecessary complexity
            System.out.println(numbers[i]);
        }
    }

    int calculateSum(int[] numbers) {
        int sum = 0;
        for (int i = 0; i < numbers.length; i++) {  // Index not needed
            sum += numbers[i];
        }
        return sum;
    }
}

// ✅ Best Practice - Enhanced for-loop for reading
public class ArrayProcessor {
    void printAllElements(int[] numbers) {
        for (int number : numbers) {  // Clean and clear
            System.out.println(number);
        }
    }

    int calculateSum(int[] numbers) {
        int sum = 0;
        for (int number : numbers) {  // Simpler, less error-prone
            sum += number;
        }
        return sum;
    }

    // ✅ Use traditional loop when index is needed
    void printWithLineNumbers(String[] lines) {
        for (int i = 0; i < lines.length; i++) {
            System.out.println((i + 1) + ". " + lines[i]);
        }
    }

    // ✅ Use traditional loop when modifying elements
    void doubleAllValues(int[] numbers) {
        for (int i = 0; i < numbers.length; i++) {
            numbers[i] *= 2;  // Modification requires index
        }
    }
}
```

---

### 5. Check for Null and Empty Arrays

**Practice**: Always check if an array is null or empty before performing operations. Handle both cases appropriately.

**Why It's Important**: Null arrays cause NullPointerException. Empty arrays (length 0) can cause logic errors if not handled. Proper checks prevent crashes and provide meaningful feedback.

**Example**:
```java
// ❌ Poor Practice - No null or empty checks
public class ArrayAnalyzer {
    double calculateAverage(int[] numbers) {
        int sum = 0;
        for (int num : numbers) {  // NullPointerException if numbers is null!
            sum += num;
        }
        return (double) sum / numbers.length;  // Division by zero if empty!
    }

    int findMax(int[] numbers) {
        int max = numbers[0];  // ArrayIndexOutOfBoundsException if empty!
        for (int i = 1; i < numbers.length; i++) {
            if (numbers[i] > max) {
                max = numbers[i];
            }
        }
        return max;
    }
}

// ✅ Best Practice - Defensive checks
public class ArrayAnalyzer {
    double calculateAverage(int[] numbers) {
        // Check for null
        if (numbers == null) {
            System.err.println("Error: Array is null");
            return 0.0;
        }

        // Check for empty
        if (numbers.length == 0) {
            System.err.println("Error: Array is empty");
            return 0.0;
        }

        int sum = 0;
        for (int num : numbers) {
            sum += num;
        }
        return (double) sum / numbers.length;
    }

    Integer findMax(int[] numbers) {  // Return Integer (nullable)
        if (numbers == null || numbers.length == 0) {
            System.err.println("Error: Array is null or empty");
            return null;  // Clear indication of no result
        }

        int max = numbers[0];
        for (int i = 1; i < numbers.length; i++) {
            if (numbers[i] > max) {
                max = numbers[i];
            }
        }
        return max;
    }

    // Helper method for validation
    boolean isValidArray(int[] array) {
        return array != null && array.length > 0;
    }
}
```

---

### 6. Avoid Magic Numbers - Use Named Constants

**Practice**: Replace hard-coded array sizes and threshold values with named constants. This makes code more maintainable and self-documenting.

**Why It's Important**: Magic numbers make code harder to understand and maintain. Named constants provide meaning and allow easy changes in one place.

**Example**:
```java
// ❌ Poor Practice - Magic numbers everywhere
public class ClassroomManager {
    int[] studentIds = new int[30];         // Why 30?
    String[] studentNames = new String[30]; // Duplicate magic number
    int[] grades = new int[30];             // What if class size changes?

    boolean isPassingGrade(int grade) {
        return grade >= 60;  // Why 60?
    }

    boolean isExcellentGrade(int grade) {
        return grade >= 90;  // Why 90?
    }

    void processGrades() {
        for (int i = 0; i < 30; i++) {  // Magic number again!
            if (grades[i] >= 60) {       // And again!
                // Process passing grade...
            }
        }
    }
}

// ✅ Best Practice - Named constants
public class ClassroomManager {
    // Class configuration constants
    private static final int MAX_STUDENTS = 30;
    private static final int PASSING_GRADE = 60;
    private static final int EXCELLENT_GRADE = 90;
    private static final int GOOD_GRADE = 80;

    // Arrays sized with constant
    int[] studentIds = new int[MAX_STUDENTS];
    String[] studentNames = new String[MAX_STUDENTS];
    int[] grades = new int[MAX_STUDENTS];
    int currentStudentCount = 0;

    boolean isPassingGrade(int grade) {
        return grade >= PASSING_GRADE;  // Clear meaning
    }

    boolean isExcellentGrade(int grade) {
        return grade >= EXCELLENT_GRADE;  // Self-documenting
    }

    String getGradeCategory(int grade) {
        if (grade >= EXCELLENT_GRADE) return "Excellent";
        if (grade >= GOOD_GRADE) return "Good";
        if (grade >= PASSING_GRADE) return "Passing";
        return "Needs Improvement";
    }

    void processGrades() {
        for (int i = 0; i < currentStudentCount; i++) {
            if (grades[i] >= PASSING_GRADE) {
                // Process passing grade...
            }
        }
    }
}
```

---

### 7. Initialize Arrays with Appropriate Sizes

**Practice**: Choose array sizes that match your actual needs. Avoid oversized arrays that waste memory or undersized arrays that require frequent resizing.

**Why It's Important**: Proper sizing prevents memory waste and ArrayIndexOutOfBoundsException. If size is unknown or varies significantly, consider ArrayList instead.

**Example**:
```java
// ❌ Poor Practice - Inappropriate sizing
public class DataManager {
    // Way too large for typical use - wastes memory
    int[] userIds = new int[1000000];
    int count = 0;  // Might only use 10-20 elements

    // Too small for many use cases
    String[] messages = new String[5];  // What if we need more?

    void addMessage(String message) {
        if (count < messages.length) {
            messages[count++] = message;
        } else {
            // No space left - lose data!
            System.err.println("Array full, cannot add message");
        }
    }
}

// ✅ Best Practice - Right-sized arrays
public class DataManager {
    // Constants for typical sizes
    private static final int TYPICAL_USERS = 100;
    private static final int MAX_MESSAGES = 50;

    // Appropriately sized for common case
    int[] userIds = new int[TYPICAL_USERS];
    int userCount = 0;

    // Fixed size appropriate for requirement
    String[] recentMessages = new String[MAX_MESSAGES];
    int messageIndex = 0;

    // For varying sizes, document the design decision
    // Option 1: Fixed size with circular buffer
    void addRecentMessage(String message) {
        recentMessages[messageIndex] = message;
        messageIndex = (messageIndex + 1) % MAX_MESSAGES;  // Circular
    }

    // Option 2: Check capacity and resize if needed
    void addUser(int userId) {
        if (userCount >= userIds.length) {
            // Resize array (double size)
            int[] newArray = new int[userIds.length * 2];
            System.arraycopy(userIds, 0, newArray, 0, userIds.length);
            userIds = newArray;
        }
        userIds[userCount++] = userId;
    }

    // ✅ Better: Use ArrayList for dynamic sizing (Day 7+)
    // import java.util.ArrayList;
    // ArrayList<Integer> userIdList = new ArrayList<>();
}
```

---

### 8. Provide Clear Error Messages

**Practice**: When array operations fail (index out of bounds, null array, etc.), provide descriptive error messages that help diagnose the problem.

**Why It's Important**: Good error messages save debugging time and make code more user-friendly. They should include what went wrong, why, and what values were involved.

**Example**:
```java
// ❌ Poor Practice - Generic or no error messages
public class ArrayUtilities {
    int getElement(int[] array, int index) {
        if (index < 0 || index >= array.length) {
            return -1;  // Silent failure - hard to debug
        }
        return array[index];
    }

    void updateElement(int[] array, int index, int value) {
        if (array == null) {
            System.out.println("Error");  // Not helpful!
            return;
        }
        array[index] = value;  // Still could crash!
    }
}

// ✅ Best Practice - Descriptive error messages
public class ArrayUtilities {
    int getElement(int[] array, int index) {
        if (array == null) {
            System.err.println("Error: Cannot get element from null array");
            return -1;
        }

        if (index < 0) {
            System.err.println("Error: Index cannot be negative. Got: " + index);
            return -1;
        }

        if (index >= array.length) {
            System.err.println("Error: Index " + index +
                             " is too large. Array length is " + array.length +
                             ". Valid range: 0 to " + (array.length - 1));
            return -1;
        }

        return array[index];
    }

    boolean updateElement(int[] array, int index, int value) {
        if (array == null) {
            System.err.println("Error: Cannot update null array");
            return false;
        }

        if (index < 0 || index >= array.length) {
            System.err.println("Error: Cannot update element at index " + index +
                             ". Array length is " + array.length +
                             ". Valid indices: 0 to " + (array.length - 1));
            return false;
        }

        array[index] = value;
        System.out.println("Successfully updated array[" + index +
                          "] to " + value);
        return true;
    }

    // Alternative: Use exceptions for better error handling
    int getElementWithException(int[] array, int index) {
        if (array == null) {
            throw new IllegalArgumentException("Array cannot be null");
        }

        if (index < 0 || index >= array.length) {
            throw new IndexOutOfBoundsException(
                String.format("Index %d is out of bounds for array of length %d",
                            index, array.length)
            );
        }

        return array[index];
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