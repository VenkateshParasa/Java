
# Day 7: Arrays - Part 2 & Week 1 Review

**Week 1: Java Basics & Environment Setup**

---

## 📋 Table of Contents
- [Learning Objectives](#learning-objectives)
- [Topics Covered](#topics-covered)
- [Detailed Content](#detailed-content)
- [Practical Exercises](#practical-exercises)
- [Week 1 Review](#week-1-review)
- [Week 1 Project](#week-1-project)
- [Key Takeaways](#key-takeaways)
- [Navigation](#navigation)

---

## 🎯 Learning Objectives

By the end of Day 7, you will be able to:
- Work with multi-dimensional arrays (2D arrays)
- Understand and use jagged arrays
- Utilize the Arrays utility class methods
- Copy arrays using different techniques
- Review all Week 1 concepts
- Complete a comprehensive Week 1 project

---

## 📚 Topics Covered

### 1. Multi-dimensional Arrays

A **multi-dimensional array** is an array of arrays. The most common is the **2D array** (matrix).

#### Declaration and Initialization:

**Syntax:**
```java
dataType[][] arrayName;
```

#### Examples:

**Method 1: Declare and Initialize Separately**
```java
int[][] matrix = new int[3][4];  // 3 rows, 4 columns
```

**Method 2: Direct Initialization**
```java
int[][] matrix = {
    {1, 2, 3, 4},
    {5, 6, 7, 8},
    {9, 10, 11, 12}
};
```

**Method 3: Row by Row**
```java
int[][] matrix = new int[3][4];
matrix[0] = new int[]{1, 2, 3, 4};
matrix[1] = new int[]{5, 6, 7, 8};
matrix[2] = new int[]{9, 10, 11, 12};
```

#### Visual Representation:
```
matrix[3][4]:
     Col0  Col1  Col2  Col3
Row0 [ 1 ][ 2 ][ 3 ][ 4 ]
Row1 [ 5 ][ 6 ][ 7 ][ 8 ]
Row2 [ 9 ][10 ][11 ][12 ]
```

#### Accessing Elements:
```java
public class TwoDArray {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        // Access specific element
        System.out.println("Element at [0][0]: " + matrix[0][0]);  // 1
        System.out.println("Element at [1][2]: " + matrix[1][2]);  // 6
        System.out.println("Element at [2][1]: " + matrix[2][1]);  // 8
        
        // Modify element
        matrix[1][1] = 50;
        System.out.println("Modified [1][1]: " + matrix[1][1]);  // 50
    }
}
```

#### Dimensions:
```java
int[][] matrix = new int[3][4];

// Number of rows
int rows = matrix.length;  // 3

// Number of columns (in first row)
int cols = matrix[0].length;  // 4

System.out.println("Rows: " + rows);
System.out.println("Columns: " + cols);
```

#### Traversing 2D Arrays:

**Using Nested for Loops:**
```java
public class Traverse2DArray {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3, 4},
            {5, 6, 7, 8},
            {9, 10, 11, 12}
        };
        
        // Print all elements
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.print(matrix[i][j] + "\t");
            }
            System.out.println();
        }
    }
}
```

**Using Enhanced for Loop:**
```java
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

for (int[] row : matrix) {
    for (int element : row) {
        System.out.print(element + " ");
    }
    System.out.println();
}
```

#### Common 2D Array Operations:

**Sum of All Elements:**
```java
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

int sum = 0;
for (int[] row : matrix) {
    for (int element : row) {
        sum += element;
    }
}

System.out.println("Sum: " + sum);  // 45
```

**Row and Column Sums:**
```java
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

// Row sums
for (int i = 0; i < matrix.length; i++) {
    int rowSum = 0;
    for (int j = 0; j < matrix[i].length; j++) {
        rowSum += matrix[i][j];
    }
    System.out.println("Row " + i + " sum: " + rowSum);
}

// Column sums
for (int j = 0; j < matrix[0].length; j++) {
    int colSum = 0;
    for (int i = 0; i < matrix.length; i++) {
        colSum += matrix[i][j];
    }
    System.out.println("Column " + j + " sum: " + colSum);
}
```

**Matrix Transpose:**
```java
public class MatrixTranspose {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6}
        };
        
        // Create transpose (swap rows and columns)
        int[][] transpose = new int[matrix[0].length][matrix.length];
        
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                transpose[j][i] = matrix[i][j];
            }
        }
        
        System.out.println("Original Matrix:");
        printMatrix(matrix);
        
        System.out.println("\nTranspose:");
        printMatrix(transpose);
    }
    
    public static void printMatrix(int[][] matrix) {
        for (int[] row : matrix) {
            for (int element : row) {
                System.out.print(element + " ");
            }
            System.out.println();
        }
    }
}
```

---

### 2. Jagged Arrays

A **jagged array** is an array of arrays where each row can have a **different length**.

#### Declaration and Initialization:
```java
public class JaggedArray {
    public static void main(String[] args) {
        // Method 1: Direct initialization
        int[][] jagged = {
            {1, 2},
            {3, 4, 5, 6},
            {7, 8, 9}
        };
        
        // Method 2: Step by step
        int[][] jagged2 = new int[3][];  // 3 rows, columns not specified
        jagged2[0] = new int[2];         // Row 0 has 2 columns
        jagged2[1] = new int[4];         // Row 1 has 4 columns
        jagged2[2] = new int[3];         // Row 2 has 3 columns
        
        // Print jagged array
        for (int i = 0; i < jagged.length; i++) {
            System.out.print("Row " + i + ": ");
            for (int j = 0; j < jagged[i].length; j++) {
                System.out.print(jagged[i][j] + " ");
            }
            System.out.println();
        }
    }
}
```

#### Visual Representation:
```
Jagged Array:
Row 0: [1][2]
Row 1: [3][4][5][6]
Row 2: [7][8][9]
```

#### Use Cases:
```java
// Student grades - different number of subjects per student
int[][] studentGrades = {
    {85, 90, 78},           // Student 1: 3 subjects
    {92, 88, 95, 87},       // Student 2: 4 subjects
    {76, 82}                // Student 3: 2 subjects
};

// Calculate average for each student
for (int i = 0; i < studentGrades.length; i++) {
    int sum = 0;
    for (int grade : studentGrades[i]) {
        sum += grade;
    }
    double average = (double) sum / studentGrades[i].length;
    System.out.println("Student " + (i+1) + " average: " + average);
}
```

---

### 3. Arrays Class (java.util.Arrays)

The **Arrays** class provides utility methods for array operations.

#### Import Statement:
```java
import java.util.Arrays;
```

#### Common Methods:

**1. sort() - Sort Array**
```java
import java.util.Arrays;

public class ArraySort {
    public static void main(String[] args) {
        int[] numbers = {5, 2, 8, 1, 9, 3};
        
        System.out.println("Before sort: " + Arrays.toString(numbers));
        
        Arrays.sort(numbers);
        
        System.out.println("After sort: " + Arrays.toString(numbers));
        // Output: [1, 2, 3, 5, 8, 9]
        
        // Sort in descending order (for objects)
        Integer[] nums = {5, 2, 8, 1, 9, 3};
        Arrays.sort(nums, Collections.reverseOrder());
        System.out.println("Descending: " + Arrays.toString(nums));
    }
}
```

**2. binarySearch() - Search in Sorted Array**
```java
import java.util.Arrays;

public class BinarySearchExample {
    public static void main(String[] args) {
        int[] numbers = {1, 3, 5, 7, 9, 11, 13};
        
        int index = Arrays.binarySearch(numbers, 7);
        System.out.println("7 found at index: " + index);  // 3
        
        int notFound = Arrays.binarySearch(numbers, 6);
        System.out.println("6 not found: " + notFound);  // Negative value
        
        // IMPORTANT: Array must be sorted!
    }
}
```

**3. equals() - Compare Arrays**
```java
import java.util.Arrays;

public class ArrayEquals {
    public static void main(String[] args) {
        int[] arr1 = {1, 2, 3, 4, 5};
        int[] arr2 = {1, 2, 3, 4, 5};
        int[] arr3 = {1, 2, 3, 4, 6};
        
        System.out.println("arr1 == arr2: " + (arr1 == arr2));  // false (different references)
        System.out.println("arr1 equals arr2: " + Arrays.equals(arr1, arr2));  // true (same content)
        System.out.println("arr1 equals arr3: " + Arrays.equals(arr1, arr3));  // false
    }
}
```

**4. fill() - Fill Array with Value**
```java
import java.util.Arrays;

public class ArrayFill {
    public static void main(String[] args) {
        int[] numbers = new int[5];
        
        Arrays.fill(numbers, 10);
        System.out.println(Arrays.toString(numbers));  // [10, 10, 10, 10, 10]
        
        // Fill range
        int[] arr = new int[10];
        Arrays.fill(arr, 2, 7, 5);  // Fill indices 2-6 with 5
        System.out.println(Arrays.toString(arr));  // [0, 0, 5, 5, 5, 5, 5, 0, 0, 0]
    }
}
```

**5. toString() - Convert Array to String**
```java
import java.util.Arrays;

public class ArrayToString {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5};
        
        // Without Arrays.toString()
        System.out.print("[");
        for (int i = 0; i < numbers.length; i++) {
            System.out.print(numbers[i]);
            if (i < numbers.length - 1) System.out.print(", ");
        }
        System.out.println("]");
        
        // With Arrays.toString() - much easier!
        System.out.println(Arrays.toString(numbers));  // [1, 2, 3, 4, 5]
        
        // For 2D arrays
        int[][] matrix = {{1, 2}, {3, 4}};
        System.out.println(Arrays.deepToString(matrix));  // [[1, 2], [3, 4]]
    }
}
```

**6. copyOf() - Copy Array**
```java
import java.util.Arrays;

public class ArrayCopy {
    public static void main(String[] args) {
        int[] original = {1, 2, 3, 4, 5};
        
        // Copy entire array
        int[] copy1 = Arrays.copyOf(original, original.length);
        
        // Copy with different length
        int[] copy2 = Arrays.copyOf(original, 3);  // [1, 2, 3]
        int[] copy3 = Arrays.copyOf(original, 7);  // [1, 2, 3, 4, 5, 0, 0]
        
        System.out.println("Original: " + Arrays.toString(original));
        System.out.println("Copy1: " + Arrays.toString(copy1));
        System.out.println("Copy2: " + Arrays.toString(copy2));
        System.out.println("Copy3: " + Arrays.toString(copy3));
    }
}
```

**7. copyOfRange() - Copy Portion of Array**
```java
import java.util.Arrays;

public class CopyRange {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        
        // Copy from index 2 to 7 (exclusive)
        int[] portion = Arrays.copyOfRange(numbers, 2, 7);
        
        System.out.println("Original: " + Arrays.toString(numbers));
        System.out.println("Portion [2-7): " + Arrays.toString(portion));
        // Output: [3, 4, 5, 6, 7]
    }
}
```

---

### 4. Copying Arrays

Multiple ways to copy arrays in Java:

#### Method 1: Manual Copy (Loop)
```java
int[] original = {1, 2, 3, 4, 5};
int[] copy = new int[original.length];

for (int i = 0; i < original.length; i++) {
    copy[i] = original[i];
}
```

#### Method 2: Arrays.copyOf()
```java
import java.util.Arrays;

int[] original = {1, 2, 3, 4, 5};
int[] copy = Arrays.copyOf(original, original.length);
```

#### Method 3: System.arraycopy()
```java
int[] original = {1, 2, 3, 4, 5};
int[] copy = new int[original.length];

System.arraycopy(original, 0, copy, 0, original.length);
// Parameters: (source, srcPos, dest, destPos, length)
```

#### Method 4: clone()
```java
int[] original = {1, 2, 3, 4, 5};
int[] copy = original.clone();
```

#### Shallow vs Deep Copy:

**Shallow Copy (1D Arrays):**
```java
int[] original = {1, 2, 3};
int[] copy = original.clone();

copy[0] = 100;  // Doesn't affect original
System.out.println(original[0]);  // Still 1
```

**Shallow Copy Issue (2D Arrays):**
```java
int[][] original = {{1, 2}, {3, 4}};
int[][] copy = original.clone();  // Shallow copy!

copy[0][0] = 100;  // AFFECTS original!
System.out.println(original[0][0]);  // Now 100!
```

**Deep Copy (2D Arrays):**
```java
int[][] original = {{1, 2}, {3, 4}};
int[][] copy = new int[original.length][];

for (int i = 0; i < original.length; i++) {
    copy[i] = original[i].clone();  // Clone each row
}

copy[0][0] = 100;  // Doesn't affect original
System.out.println(original[0][0]);  // Still 1
```

---

## 💻 Practical Exercises

### Exercise 1: 2D Array Operations
```java
import java.util.Arrays;

public class Matrix Operations {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        System.out.println("Original Matrix:");
        printMatrix(matrix);
        
        System.out.println("\nSum of all elements: " + sumAll(matrix));
        System.out.println("Maximum element: " + findMax(matrix));
        System.out.println("Minimum element: " + findMin(matrix));
        
        System.out.println("\nRow Sums:");
        printRowSums(matrix);
        
        System.out.println("\nColumn Sums:");
        printColumnSums(matrix);
    }
    
    public static void printMatrix(int[][] matrix) {

---

### Exercise 8: Diagonal Sum of Matrix
Calculate the sum of diagonal elements in a square matrix.

```java
public class DiagonalSum {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3, 4},
            {5, 6, 7, 8},
            {9, 10, 11, 12},
            {13, 14, 15, 16}
        };
        
        int primaryDiagonalSum = 0;
        int secondaryDiagonalSum = 0;
        int n = matrix.length;
        
        for (int i = 0; i < n; i++) {
            primaryDiagonalSum += matrix[i][i];
            secondaryDiagonalSum += matrix[i][n - 1 - i];
        }
        
        System.out.println("Matrix:");
        printMatrix(matrix);
        
        System.out.println("\nPrimary Diagonal Sum: " + primaryDiagonalSum);
        System.out.println("Secondary Diagonal Sum: " + secondaryDiagonalSum);
    }
    
    public static void printMatrix(int[][] matrix) {
        for (int[] row : matrix) {
            for (int element : row) {
                System.out.printf("%3d ", element);
            }
            System.out.println();
        }
    }
}
```

---

### Exercise 9: Matrix Subtraction
Subtract two matrices.

```java
public class MatrixSubtraction {
    public static void main(String[] args) {
        int[][] matrix1 = {
            {10, 20, 30},
            {40, 50, 60},
            {70, 80, 90}
        };
        
        int[][] matrix2 = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        int[][] result = subtractMatrices(matrix1, matrix2);
        
        System.out.println("Matrix 1:");
        printMatrix(matrix1);
        
        System.out.println("\nMatrix 2:");
        printMatrix(matrix2);
        
        System.out.println("\nDifference (Matrix1 - Matrix2):");
        printMatrix(result);
    }
    
    public static int[][] subtractMatrices(int[][] m1, int[][] m2) {
        int rows = m1.length;
        int cols = m1[0].length;
        int[][] result = new int[rows][cols];
        
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                result[i][j] = m1[i][j] - m2[i][j];
            }
        }
        
        return result;
    }
    
    public static void printMatrix(int[][] matrix) {
        for (int[] row : matrix) {
            for (int element : row) {
                System.out.printf("%3d ", element);
            }
            System.out.println();
        }
    }
}
```

---

### Exercise 10: Symmetric Matrix Checker
Check if a matrix is symmetric.

```java
public class SymmetricMatrix {
    public static void main(String[] args) {
        int[][] matrix1 = {
            {1, 2, 3},
            {2, 4, 5},
            {3, 5, 6}
        };
        
        int[][] matrix2 = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        System.out.println("Matrix 1:");
        printMatrix(matrix1);
        System.out.println("Is Symmetric: " + isSymmetric(matrix1));
        
        System.out.println("\nMatrix 2:");
        printMatrix(matrix2);
        System.out.println("Is Symmetric: " + isSymmetric(matrix2));
    }
    
    public static boolean isSymmetric(int[][] matrix) {
        int n = matrix.length;
        
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] != matrix[j][i]) {
                    return false;
                }
            }
        }
        return true;
    }
    
    public static void printMatrix(int[][] matrix) {
        for (int[] row : matrix) {
            for (int element : row) {
                System.out.printf("%3d ", element);
            }
            System.out.println();
        }
    }
}
```

---

### Exercise 11: Search in 2D Array
Search for an element in a 2D array.

```java
import java.util.Scanner;

public class Search2DArray {
    public static void main(String[] args) {
        int[][] matrix = {
            {10, 20, 30, 40},
            {15, 25, 35, 45},
            {27, 29, 37, 48},
            {32, 33, 39, 50}
        };
        
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("Matrix:");
        printMatrix(matrix);
        
        System.out.print("\nEnter element to search: ");
        int target = scanner.nextInt();
        
        boolean found = false;
        int row = -1, col = -1;
        
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == target) {
                    found = true;
                    row = i;
                    col = j;
                    break;
                }
            }
            if (found) break;
        }
        
        if (found) {
            System.out.println(target + " found at position [" + row + "][" + col + "]");
        } else {
            System.out.println(target + " not found in the matrix");
        }
        
        scanner.close();
    }
    
    public static void printMatrix(int[][] matrix) {
        for (int[] row : matrix) {
            for (int element : row) {
                System.out.printf("%3d ", element);
            }
            System.out.println();
        }
    }
}
```

---

### Exercise 12: Pascal's Triangle
Generate Pascal's triangle using 2D array.

```java
import java.util.Scanner;

public class PascalsTriangle {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter number of rows: ");
        int rows = scanner.nextInt();
        
        int[][] triangle = new int[rows][];
        
        for (int i = 0; i < rows; i++) {
            triangle[i] = new int[i + 1];
            triangle[i][0] = 1;
            triangle[i][i] = 1;
            
            for (int j = 1; j < i; j++) {
                triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j];
            }
        }
        
        System.out.println("\nPascal's Triangle:");
        for (int i = 0; i < rows; i++) {
            // Print spaces for formatting
            for (int k = 0; k < rows - i; k++) {
                System.out.print("  ");
            }
            
            for (int j = 0; j <= i; j++) {
                System.out.printf("%4d", triangle[i][j]);
            }
            System.out.println();
        }
        
        scanner.close();
    }
}
```

---

### Exercise 13: Array Sorting Comparison
Compare different array sorting approaches.

```java
import java.util.Arrays;

public class SortingComparison {
    public static void main(String[] args) {
        int[] arr1 = {64, 34, 25, 12, 22, 11, 90};
        int[] arr2 = arr1.clone();
        int[] arr3 = arr1.clone();
        
        System.out.println("Original array: " + Arrays.toString(arr1));
        
        // Method 1: Bubble Sort
        bubbleSort(arr1);
        System.out.println("Bubble Sort: " + Arrays.toString(arr1));
        
        // Method 2: Selection Sort
        selectionSort(arr2);
        System.out.println("Selection Sort: " + Arrays.toString(arr2));
        
        // Method 3: Arrays.sort()
        Arrays.sort(arr3);
        System.out.println("Arrays.sort(): " + Arrays.toString(arr3));
    }
    
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
    
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            int temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
        }
    }
}
```

---

### Exercise 14: Zig-Zag Pattern Print
Print 2D array in zig-zag pattern.

```java
public class ZigZagPattern {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3, 4},
            {5, 6, 7, 8},
            {9, 10, 11, 12},
            {13, 14, 15, 16}
        };
        
        System.out.println("Matrix:");
        printMatrix(matrix);
        
        System.out.println("\nZig-Zag Pattern:");
        printZigZag(matrix);
    }
    
    public static void printZigZag(int[][] matrix) {
        for (int i = 0; i < matrix.length; i++) {
            if (i % 2 == 0) {
                // Left to right
                for (int j = 0; j < matrix[i].length; j++) {
                    System.out.print(matrix[i][j] + " ");
                }
            } else {
                // Right to left
                for (int j = matrix[i].length - 1; j >= 0; j--) {
                    System.out.print(matrix[i][j] + " ");
                }
            }
        }
        System.out.println();
    }
    
    public static void printMatrix(int[][] matrix) {
        for (int[] row : matrix) {
            for (int element : row) {
                System.out.printf("%3d ", element);
            }
            System.out.println();
        }
    }
}
```

---

### Exercise 15: Array Statistics
Calculate comprehensive statistics for an array.

```java
import java.util.Arrays;

public class ArrayStatistics {
    public static void main(String[] args) {
        int[] numbers = {45, 23, 67, 12, 89, 34, 78, 56, 90, 21};
        
        System.out.println("Array: " + Arrays.toString(numbers));
        System.out.println("\n=== Statistics ===");
        
        // Count
        System.out.println("Count: " + numbers.length);
        
        // Sum
        int sum = 0;
        for (int num : numbers) {
            sum += num;
        }
        System.out.println("Sum: " + sum);
        
        // Average
        double average = (double) sum / numbers.length;
        System.out.println("Average: " + String.format("%.2f", average));
        
        // Min and Max
        int min = numbers[0], max = numbers[0];
        for (int num : numbers) {
            if (num < min) min = num;
            if (num > max) max = num;
        }
        System.out.println("Minimum: " + min);
        System.out.println("Maximum: " + max);
        System.out.println("Range: " + (max - min));
        
        // Median (requires sorting)
        int[] sorted = numbers.clone();
        Arrays.sort(sorted);
        double median;
        if (sorted.length % 2 == 0) {
            median = (sorted[sorted.length/2 - 1] + sorted[sorted.length/2]) / 2.0;
        } else {
            median = sorted[sorted.length/2];
        }
        System.out.println("Median: " + median);
        
        // Count above and below average
        int aboveAvg = 0, belowAvg = 0;
        for (int num : numbers) {
            if (num > average) aboveAvg++;
            else if (num < average) belowAvg++;
        }
        System.out.println("Above Average: " + aboveAvg);
        System.out.println("Below Average: " + belowAvg);
    }
}
```

        for (int[] row : matrix) {
            System.out.println(Arrays.toString(row));
        }
    }
    
    public static int sumAll(int[][] matrix) {
        int sum = 0;
        for (int[] row : matrix) {
            for (int element : row) {
                sum += element;
            }
        }
        return sum;
    }
    
    public static int findMax(int[][] matrix) {
        int max = matrix[0][0];
        for (int[] row : matrix) {
            for (int element : row) {
                if (element > max) {
                    max = element;
                }
            }
        }
        return max;
    }
    
    public static int findMin(int[][] matrix) {
        int min = matrix[0][0];
        for (int[] row : matrix) {
            for (int element : row) {
                if (element < min) {
                    min = element;
                }
            }
        }
        return min;
    }
    
    public static void printRowSums(int[][] matrix) {
        for (int i = 0; i < matrix.length; i++) {
            int sum = 0;
            for (int j = 0; j < matrix[i].length; j++) {
                sum += matrix[i][j];
            }
            System.out.println("Row " + i + ": " + sum);
        }
    }
    
    public static void printColumnSums(int[][] matrix) {
        for (int j = 0; j < matrix[0].length; j++) {
            int sum = 0;
            for (int i = 0; i < matrix.length; i++) {
                sum += matrix[i][j];
            }
            System.out.println("Column " + j + ": " + sum);
        }
    }
}
```

---

### Exercise 2: Matrix Addition
```java
public class MatrixAddition {
    public static void main(String[] args) {
        int[][] matrix1 = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        int[][] matrix2 = {
            {9, 8, 7},
            {6, 5, 4},
            {3, 2, 1}
        };
        
        int[][] result = addMatrices(matrix1, matrix2);
        
        System.out.println("Matrix 1:");
        printMatrix(matrix1);
        
        System.out.println("\nMatrix 2:");
        printMatrix(matrix2);
        
        System.out.println("\nSum:");
        printMatrix(result);
    }
    
    public static int[][] addMatrices(int[][] m1, int[][] m2) {
        int rows = m1.length;
        int cols = m1[0].length;
        int[][] result = new int[rows][cols];
        
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                result[i][j] = m1[i][j] + m2[i][j];
            }
        }
        
        return result;
    }
    
    public static void printMatrix(int[][] matrix) {
        for (int[] row : matrix) {
            for (int element : row) {
                System.out.print(element + "\t");
            }
            System.out.println();
        }
    }
}
```

---

### Exercise 3: Matrix Multiplication
```java
public class MatrixMultiplication {
    public static void main(String[] args) {
        int[][] matrix1 = {
            {1, 2, 3},
            {4, 5, 6}
        };  // 2x3
        
        int[][] matrix2 = {
            {7, 8},
            {9, 10},
            {11, 12}
        };  // 3x2
        
        int[][] result = multiplyMatrices(matrix1, matrix2);
        
        System.out.println("Matrix 1 (2x3):");
        printMatrix(matrix1);
        
        System.out.println("\nMatrix 2 (3x2):");
        printMatrix(matrix2);
        
        System.out.println("\nProduct (2x2):");
        printMatrix(result);
    }
    
    public static int[][] multiplyMatrices(int[][] m1, int[][] m2) {
        int rows1 = m1.length;
        int cols1 = m1[0].length;
        int cols2 = m2[0].length;
        
        int[][] result = new int[rows1][cols2];
        
        for (int i = 0; i < rows1; i++) {
            for (int j = 0; j < cols2; j++) {
                for (int k = 0; k < cols1; k++) {
                    result[i][j] += m1[i][k] * m2[k][j];
                }
            }
        }
        
        return result;
    }
    
    public static void printMatrix(int[][] matrix) {
        for (int[] row : matrix) {
            for (int element : row) {
                System.out.print(element + "\t");
            }
            System.out.println();
        }
    }
}
```

---

### Exercise 4: Arrays Utility Methods
```java
import java.util.Arrays;

public class ArraysUtilityDemo {
    public static void main(String[] args) {
        // Sort
        int[] numbers = {5, 2, 8, 1, 9, 3, 7, 4, 6};
        System.out.println("Original: " + Arrays.toString(numbers));
        Arrays.sort(numbers);
        System.out.println("Sorted: " + Arrays.toString(numbers));
        
        // Binary Search
        int index = Arrays.binarySearch(numbers, 7);
        System.out.println("\n7 found at index: " + index);
        
        // Fill
        int[] filled = new int[5];
        Arrays.fill(filled, 10);
        System.out.println("\nFilled array: " + Arrays.toString(filled));
        
        // Copy
        int[] copy = Arrays.copyOf(numbers, numbers.length);
        System.out.println("\nCopied array: " + Arrays.toString(copy));
        
        // Copy Range
        int[] range = Arrays.copyOfRange(numbers, 2, 7);
        System.out.println("Range [2-7): " + Arrays.toString(range));
        
        // Equals
        System.out.println("\nArrays equal: " + Arrays.equals(numbers, copy));
        
        // 2D Array toString
        int[][] matrix = {{1, 2, 3}, {4, 5, 6}};
        System.out.println("\n2D Array: " + Arrays.deepToString(matrix));
    }
}
```

---

### Exercise 5: Jagged Array - Student Grades
```java
import java.util.Arrays;

public class StudentGrades {
    public static void main(String[] args) {
        // Jagged array - different students have different number of subjects
        int[][] grades = {
            {85, 90, 78, 92},           // Student 1: 4 subjects
            {88, 95, 87},               // Student 2: 3 subjects
            {76, 82, 91, 88, 85},       // Student 3: 5 subjects
            {92, 89}                    // Student 4: 2 subjects
        };
        
        System.out.println("Student Grade Report:");
        System.out.println("=" .repeat(50));
        
        for (int i = 0; i < grades.length; i++) {
            System.out.println("\nStudent " + (i + 1) + ":");
            System.out.println("Grades: " + Arrays.toString(grades[i]));
            
            int sum = 0;
            int max = grades[i][0];
            int min = grades[i][0];
            
            for (int grade : grades[i]) {
                sum += grade;
                if (grade > max) max = grade;
                if (grade < min) min = grade;
            }
            
            double average = (double) sum / grades[i].length;
            
            System.out.println("Number of subjects: " + grades[i].length);
            System.out.println("Average: " + String.format("%.2f", average));
            System.out.println("Highest: " + max);
            System.out.println("Lowest: " + min);
        }
    }
}
```

---

### Exercise 6: Identity Matrix
```java
public class IdentityMatrix {
    public static void main(String[] args) {
        int size = 5;
        int[][] identity = createIdentityMatrix(size);
        
        System.out.println("Identity Matrix (" + size + "x" + size + "):");
        printMatrix(identity);
    }
    
    public static int[][] createIdentityMatrix(int size) {
        int[][] matrix = new int[size][size];
        
        for (int i = 0; i < size; i++) {
            matrix[i][i] = 1;  // Diagonal elements = 1
        }
        
        return matrix;
    }
    
    public static void printMatrix(int[][] matrix) {
        for (int[] row : matrix) {
            for (int element : row) {
                System.out.print(element + " ");
            }
            System.out.println();
        }
    }
}
```

---

### Exercise 7: Spiral Matrix Print
```java
public class SpiralMatrix {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3, 4},
            {5, 6, 7, 8},
            {9, 10, 11, 12},
            {13, 14, 15, 16}
        };
        
        System.out.println("Matrix:");
        printMatrix(matrix);
        
        System.out.println("\nSpiral Order:");
        printSpiral(matrix);
    }
    
    public static void printSpiral(int[][] matrix) {
        int top = 0, bottom = matrix.length - 1;
        int left = 0, right = matrix[0].length - 1;
        
        while (top <= bottom && left <= right) {
            // Print top row
            for (int i = left; i <= right; i++) {
                System.out.print(matrix[top][i] + " ");
            }
            top++;
            
            // Print right column
            for (int i = top; i <= bottom; i++) {
                System.out.print(matrix[i][right] + " ");
            }
            right--;
            
            // Print bottom row
            if (top <= bottom) {
                for (int i = right; i >= left; i--) {
                    System.out.print(matrix[bottom][i] + " ");
                }
                bottom--;
            }
            
            // Print left column
            if (left <= right) {
                for (int i = bottom; i >= top; i--) {
                    System.out.print(matrix[i][left] + " ");
                }
                left++;
            }
        }
        System.out.println();
    }
    
    public static void printMatrix(int[][] matrix) {
        for (int[] row : matrix) {
            for (int element : row) {
                System.out.printf("%3d ", element);
            }
            System.out.println();
        }
    }
}
```

---

## 📝 Week 1 Review

### Topics Covered This Week:

#### Day 1: Introduction & Setup
- Java basics and platform independence
- JDK, JRE, JVM differences
- IDE setup and first program
- Compilation and execution

#### Day 2: Variables & Data Types
- 8 primitive data types
- Reference types
- Type casting
- Constants with final

#### Day 3: Operators & Expressions
- Arithmetic, relational, logical operators
- Assignment and compound operators
- Increment/decrement operators
- Operator precedence

#### Day 4: Control Flow - Conditionals
- if, if-else, if-else-if statements
- Nested if
- switch-case
- Ternary operator

#### Day 5: Control Flow - Loops
- while and do-while loops
- for and enhanced for loops
- Nested loops
- break, continue, return

#### Day 6: Arrays - Part 1
- Array basics and declaration
- Initialization and access
- Iterating arrays
- Common operations (max, min, sum, search, reverse)

#### Day 7: Arrays - Part 2
- Multi-dimensional
arrays
- Jagged arrays
- Arrays utility class
- Array copying techniques

---

## 🎯 Week 1 Project

### Student Grade Management System

Build a complete system to manage student grades using arrays.

#### Requirements:

```java
import java.util.Arrays;
import java.util.Scanner;

public class StudentGradeSystem {
    private static String[] studentNames;
    private static int[] studentGrades;
    private static int studentCount = 0;
    private static final int MAX_STUDENTS = 50;
    
    public static void main(String[] args) {
        studentNames = new String[MAX_STUDENTS];
        studentGrades = new int[MAX_STUDENTS];
        
        Scanner scanner = new Scanner(System.in);
        int choice;
        
        do {
            displayMenu();
            choice = scanner.nextInt();
            scanner.nextLine();  // Consume newline
            
            switch (choice) {
                case 1:
                    addStudent(scanner);
                    break;
                case 2:
                    displayAllStudents();
                    break;
                case 3:
                    calculateAverage();
                    break;
                case 4:
                    findHighestGrade();
                    break;
                case 5:
                    findLowestGrade();
                    break;
                case 6:
                    searchStudent(scanner);
                    break;
                case 7:
                    sortByGrade();
                    break;
                case 8:
                    System.out.println("Thank you for using Student Grade System!");
                    break;
                default:
                    System.out.println("Invalid choice! Try again.");
            }
        } while (choice != 8);
        
        scanner.close();
    }
    
    private static void displayMenu() {
        System.out.println("\n=== Student Grade Management System ===");
        System.out.println("1. Add Student");
        System.out.println("2. Display All Students");
        System.out.println("3. Calculate Average Grade");
        System.out.println("4. Find Highest Grade");
        System.out.println("5. Find Lowest Grade");
        System.out.println("6. Search Student");
        System.out.println("7. Sort by Grade");
        System.out.println("8. Exit");
        System.out.print("Enter choice: ");
    }
    
    private static void addStudent(Scanner scanner) {
        if (studentCount >= MAX_STUDENTS) {
            System.out.println("Cannot add more students. Maximum limit reached!");
            return;
        }
        
        System.out.print("Enter student name: ");
        String name = scanner.nextLine();
        
        System.out.print("Enter grade (0-100): ");
        int grade = scanner.nextInt();
        scanner.nextLine();
        
        if (grade < 0 || grade > 100) {
            System.out.println("Invalid grade! Must be between 0 and 100.");
            return;
        }
        
        studentNames[studentCount] = name;
        studentGrades[studentCount] = grade;
        studentCount++;
        
        System.out.println("Student added successfully!");
    }
    
    private static void displayAllStudents() {
        if (studentCount == 0) {
            System.out.println("No students in the system.");
            return;
        }
        
        System.out.println("\n=== All Students ===");
        System.out.println("Name\t\t\tGrade");
        System.out.println("-".repeat(40));
        
        for (int i = 0; i < studentCount; i++) {
            System.out.printf("%-20s\t%d\n", studentNames[i], studentGrades[i]);
        }
    }
    
    private static void calculateAverage() {
        if (studentCount == 0) {
            System.out.println("No students in the system.");
            return;
        }
        
        int sum = 0;
        for (int i = 0; i < studentCount; i++) {
            sum += studentGrades[i];
        }
        
        double average = (double) sum / studentCount;
        System.out.printf("Average Grade: %.2f\n", average);
    }
    
    private static void findHighestGrade() {
        if (studentCount == 0) {
            System.out.println("No students in the system.");
            return;
        }
        
        int maxGrade = studentGrades[0];
        int maxIndex = 0;
        
        for (int i = 1; i < studentCount; i++) {
            if (studentGrades[i] > maxGrade) {
                maxGrade = studentGrades[i];
                maxIndex = i;
            }
        }
        
        System.out.println("Highest Grade:");
        System.out.println("Student: " + studentNames[maxIndex]);
        System.out.println("Grade: " + maxGrade);
    }
    
    private static void findLowestGrade() {
        if (studentCount == 0) {
            System.out.println("No students in the system.");
            return;
        }
        
        int minGrade = studentGrades[0];
        int minIndex = 0;
        
        for (int i = 1; i < studentCount; i++) {
            if (studentGrades[i] < minGrade) {
                minGrade = studentGrades[i];
                minIndex = i;
            }
        }
        
        System.out.println("Lowest Grade:");
        System.out.println("Student: " + studentNames[minIndex]);
        System.out.println("Grade: " + minGrade);
    }
    
    private static void searchStudent(Scanner scanner) {
        if (studentCount == 0) {
            System.out.println("No students in the system.");
            return;
        }
        
        System.out.print("Enter student name to search: ");
        String searchName = scanner.nextLine();
        
        boolean found = false;
        for (int i = 0; i < studentCount; i++) {
            if (studentNames[i].equalsIgnoreCase(searchName)) {
                System.out.println("Student Found!");
                System.out.println("Name: " + studentNames[i]);
                System.out.println("Grade: " + studentGrades[i]);
                found = true;
                break;
            }
        }
        
        if (!found) {
            System.out.println("Student not found!");
        }
    }
    
    private static void sortByGrade() {
        if (studentCount == 0) {
            System.out.println("No students in the system.");
            return;
        }
        
        // Bubble sort (sorting both arrays together)
        for (int i = 0; i < studentCount - 1; i++) {
            for (int j = 0; j < studentCount - i - 1; j++) {
                if (studentGrades[j] < studentGrades[j + 1]) {
                    // Swap grades
                    int tempGrade = studentGrades[j];
                    studentGrades[j] = studentGrades[j + 1];
                    studentGrades[j + 1] = tempGrade;
                    
                    // Swap names
                    String tempName = studentNames[j];
                    studentNames[j] = studentNames[j + 1];
                    studentNames[j + 1] = tempName;
                }
            }
        }
        
        System.out.println("Students sorted by grade (highest first)!");
        displayAllStudents();
    }
}
```

#### Features Implemented:
1. ✅ Add students with names and grades
2. ✅ Display all students
3. ✅ Calculate average grade
4. ✅ Find highest and lowest grades
5. ✅ Search for a student by name
6. ✅ Sort students by grade
7. ✅ Input validation
8. ✅ Menu-driven interface

---

## 🔑 Key Takeaways

### Week 1 Summary:

1. **Java Fundamentals**
   - Platform independence (WORA)
   - JDK, JRE, JVM architecture
   - Compilation and execution process

2. **Data Types & Variables**
   - 8 primitive types: byte, short, int, long, float, double, char, boolean
   - Reference types: String, arrays, objects
   - Type casting: implicit (widening) and explicit (narrowing)
   - Constants with `final` keyword

3. **Operators**
   - Arithmetic: +, -, *, /, %
   - Relational: ==, !=, >, <, >=, <=
   - Logical: &&, ||, !
   - Assignment: =, +=, -=, *=, /=, %=
   - Increment/Decrement: ++, --

4. **Control Flow**
   - Conditionals: if, if-else, if-else-if, switch-case, ternary
   - Loops: while, do-while, for, enhanced for
   - Loop control: break, continue, return

5. **Arrays**
   - Fixed-size, homogeneous collections
   - Zero-based indexing
   - 1D and 2D arrays
   - Jagged arrays (variable row lengths)
   - Arrays utility class methods
   - Array copying techniques

### Important Concepts:

- **Naming Conventions**: camelCase for variables/methods, PascalCase for classes, UPPER_CASE for constants
- **Operator Precedence**: Use parentheses for clarity
- **Array Length**: `array.length` (property, not method)
- **Enhanced for Loop**: Read-only, cannot modify array
- **Arrays.toString()**: Easy way to print arrays
- **Deep Copy**: Required for 2D arrays to avoid reference issues

---

## ⚠️ Common Mistakes to Avoid

1. **Off-by-One Errors**: Remember arrays are zero-indexed
2. **Integer Division**: `5 / 2 = 2`, not `2.5`
3. **Comparing Strings**: Use `.equals()`, not `==`
4. **Modifying in for-each**: Cannot change array elements
5. **Uninitialized Arrays**: Must allocate memory before use
6. **Missing break in switch**: Causes fall-through
7. **Infinite Loops**: Always update loop condition
8. **ArrayIndexOutOfBoundsException**: Check array bounds

---

## 🧭 Navigation

### Week 1 Complete! 🎉

- [← Day 6: Arrays - Part 1](day06_arrays_part1.md)
- **Day 7: Arrays - Part 2 & Review** ← You are here
- [Week 2: OOP Fundamentals →](../week2/README.md)

### Related Resources:
- [📝 Day 7 Assessment](../../../java-learning-app/src/data/assessments/java/week1/day7.js)
- [💪 Week 1 Exercises](../../../03_BEGINNER_FRIENDLY_Exercises/Core_Java/Week1_Days01-07_Setup_and_Basics.md)
- [📚 Detailed Topics Reference](../../../02_Detailed_Topics/Detailed_Topics_Core_Java.md#day-7-arrays---part-2--review)
- [🏠 Back to Week 1 Overview](README.md)
- [📖 Course Overview](../../Java_Core_Fundamentals_30Day_Course.md)

---

## ✅ Week 1 Completion Checklist

Before moving to Week 2, ensure you can:

### Day 1-2: Basics
- [ ] Install and configure JDK
- [ ] Write and run Java programs
- [ ] Declare and use all 8 primitive types
- [ ] Perform type casting
- [ ] Use constants with final

### Day 3-4: Operators & Conditionals
- [ ] Use all operator types correctly
- [ ] Write if-else statements
- [ ] Create switch-case statements
- [ ] Apply ternary operator

### Day 5: Loops
- [ ] Write while and do-while loops
- [ ] Use for and enhanced for loops
- [ ] Create nested loops
- [ ] Use break and continue

### Day 6-7: Arrays
- [ ] Declare and initialize arrays
- [ ] Access and modify array elements
- [ ] Iterate through arrays
- [ ] Work with 2D arrays
- [ ] Use Arrays utility class
- [ ] Copy arrays correctly

### Project
- [ ] Complete Student Grade Management System
- [ ] Implement all required features
- [ ] Handle edge cases
- [ ] Write clean, readable code

---

## 🎓 What's Next?

### Week 2 Preview: Object-Oriented Programming

In Week 2, you'll learn:
- **Classes and Objects**: Creating blueprints and instances
- **Constructors**: Initializing objects
- **Methods**: Defining behavior
- **Encapsulation**: Data hiding with access modifiers
- **Inheritance**: Code reusability
- **Polymorphism**: Multiple forms
- **Abstraction**: Abstract classes and interfaces

Get ready to dive into the core of Java - Object-Oriented Programming!

---

## 📚 Additional Practice

### Recommended Exercises:
1. Create a Tic-Tac-Toe game using 2D array
2. Implement a simple calculator with all operations
3. Build a number guessing game
4. Create a pattern printing program
5. Implement array sorting algorithms (bubble sort, selection sort)

### Online Practice:
- [HackerRank Java](https://www.hackerrank.com/domains/java)
- [LeetCode Easy Problems](https://leetcode.com/problemset/all/?difficulty=Easy)
- [CodingBat Java](https://codingbat.com/java)

---

**🎉 Congratulations on completing Week 1!**

You've built a strong foundation in Java basics. You now understand variables, operators, control flow, and arrays. These fundamentals will serve you well as you progress to Object-Oriented Programming in Week 2.

**Keep practicing and happy coding!** 💻

---

*Last Updated: 2026-01-08*