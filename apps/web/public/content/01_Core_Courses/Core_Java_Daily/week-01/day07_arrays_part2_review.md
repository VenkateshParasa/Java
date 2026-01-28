
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

**📝 Problem Statement:**
Create a program that performs various operations on a 2D array (matrix), including calculating the sum of all elements, finding maximum and minimum values, and computing row and column sums.

**Requirements:**
- Create a 3x3 matrix with predefined values
- Calculate and display the sum of all elements in the matrix
- Find and display the maximum element
- Find and display the minimum element
- Calculate and display the sum of each row
- Calculate and display the sum of each column
- Use helper methods for each operation

**Sample Test Cases:**
```
Input: matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
Expected Output:
Original Matrix:
[1, 2, 3]
[4, 5, 6]
[7, 8, 9]

Sum of all elements: 45
Maximum element: 9
Minimum element: 1

Row Sums:
Row 0: 6
Row 1: 15
Row 2: 24

Column Sums:
Column 0: 12
Column 1: 15
Column 2: 18
```

**Solution:**
```java
import java.util.Arrays;

public class MatrixOperations {
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

**💡 Tips:**
- Initialize max and min to first element matrix[0][0], not to 0
- For row sums: outer loop iterates rows, inner loop sums elements in that row
- For column sums: outer loop iterates columns, inner loop iterates rows for that column
- Use enhanced for loop where possible for cleaner code
- Helper methods make the code more modular and reusable

---

### Exercise 2: Matrix Addition

**📝 Problem Statement:**
Add two matrices of the same dimensions and display all three matrices (the two input matrices and their sum).

**Requirements:**
- Create two 3x3 matrices with predefined values
- Create a helper method to add two matrices
- Check that matrices have same dimensions (implicitly assumed here)
- Display the first matrix, second matrix, and their sum
- Use a helper method to print matrices

**Sample Test Cases:**
```
Input: matrix1 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
       matrix2 = [[9, 8, 7], [6, 5, 4], [3, 2, 1]]
Expected Output:
Matrix 1:
1	2	3
4	5	6
7	8	9

Matrix 2:
9	8	7
6	5	4
3	2	1

Sum:
10	10	10
10	10	10
10	10	10
```

**Solution:**
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

**💡 Tips:**
- Matrix addition requires both matrices to have same dimensions
- Add corresponding elements: result[i][j] = m1[i][j] + m2[i][j]
- Create new result matrix with same dimensions as input matrices
- Use tabs (\t) for better alignment in output
- Can enhance by adding dimension check before addition

---

### Exercise 3: Matrix Multiplication

**📝 Problem Statement:**
Multiply two matrices using the standard matrix multiplication algorithm and display the input matrices and their product.

**Requirements:**
- Create a 2x3 matrix (matrix1) and a 3x2 matrix (matrix2)
- Implement matrix multiplication algorithm
- Ensure dimensions are compatible (columns of m1 = rows of m2)
- Display both input matrices and the resulting product matrix
- Use proper formatting for output

**Sample Test Cases:**
```
Input: matrix1 (2x3) = [[1, 2, 3], [4, 5, 6]]
       matrix2 (3x2) = [[7, 8], [9, 10], [11, 12]]
Expected Output:
Matrix 1 (2x3):
1	2	3
4	5	6

Matrix 2 (3x2):
7	8
9	10
11	12

Product (2x2):
58	64
139	154
```

**Solution:**
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

**💡 Tips:**
- Matrix multiplication formula: result[i][j] = Σ(m1[i][k] × m2[k][j]) for all k
- Result dimensions: (m1 rows) × (m2 columns)
- Multiplication is only possible if: m1 columns = m2 rows
- Triple nested loop required: i for rows, j for columns, k for multiplication
- Result matrix dimensions: rows1 × cols2

---

### Exercise 4: Arrays Utility Methods

**📝 Problem Statement:**
Demonstrate all important utility methods from the java.util.Arrays class including sort, binarySearch, fill, copy, copyOfRange, equals, and toString.

**Requirements:**
- Use Arrays.sort() to sort an array
- Use Arrays.binarySearch() to find an element in sorted array
- Use Arrays.fill() to fill an array with a value
- Use Arrays.copyOf() to copy an entire array
- Use Arrays.copyOfRange() to copy a portion of an array
- Use Arrays.equals() to compare two arrays
- Use Arrays.deepToString() for multi-dimensional arrays
- Display results of each operation

**Sample Test Cases:**
```
Expected Output:
Original: [5, 2, 8, 1, 9, 3, 7, 4, 6]
Sorted: [1, 2, 3, 4, 5, 6, 7, 8, 9]

7 found at index: 6

Filled array: [10, 10, 10, 10, 10]

Copied array: [1, 2, 3, 4, 5, 6, 7, 8, 9]
Range [2-7): [3, 4, 5, 6, 7]

Arrays equal: true

2D Array: [[1, 2, 3], [4, 5, 6]]
```

**Solution:**
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

**💡 Tips:**
- Always sort array before using binarySearch()
- copyOfRange() uses exclusive end index: [start, end)
- For 2D arrays: use deepToString() and deepEquals()
- Arrays.fill() can fill entire array or a range
- Arrays.sort() sorts in-place, modifying original array

---

### Exercise 5: Jagged Array - Student Grades

**📝 Problem Statement:**
Create a jagged array to store student grades where each student has a different number of subjects. Calculate and display statistics for each student including average, highest, and lowest grades.

**Requirements:**
- Create a jagged array with 4 students having different numbers of subjects
- Display grades for each student
- Calculate and display number of subjects per student
- Calculate and display average grade for each student
- Find and display highest grade for each student
- Find and display lowest grade for each student
- Format output with clear headers and sections

**Sample Test Cases:**
```
Expected Output:
Student Grade Report:
==================================================

Student 1:
Grades: [85, 90, 78, 92]
Number of subjects: 4
Average: 86.25
Highest: 92
Lowest: 78

Student 2:
Grades: [88, 95, 87]
Number of subjects: 3
Average: 90.00
Highest: 95
Lowest: 87

[Similar output for students 3 and 4]
```

**Solution:**
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
        System.out.println("=".repeat(50));

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

**💡 Tips:**
- Jagged arrays allow different row lengths: perfect for variable data
- Each row must be accessed individually: grades[i].length
- Use enhanced for loop to iterate through each student's grades
- Initialize max and min to first element of each row
- String.format("%.2f", value) formats to 2 decimal places

---

### Exercise 6: Identity Matrix

**📝 Problem Statement:**
Create a program that generates and displays an identity matrix of a given size. An identity matrix has 1s on the main diagonal and 0s everywhere else.

**Requirements:**
- Accept or define the size of the identity matrix
- Create a helper method to generate identity matrix
- Set diagonal elements (where row index = column index) to 1
- Set all other elements to 0 (default)
- Display the generated identity matrix
- Use proper formatting for output

**Sample Test Cases:**
```
Input: size = 5
Expected Output:
Identity Matrix (5x5):
1 0 0 0 0
0 1 0 0 0
0 0 1 0 0
0 0 0 1 0
0 0 0 0 1
```

**Solution:**
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

**💡 Tips:**
- Identity matrix is always square (n × n)
- Only need to set diagonal elements to 1: matrix[i][i] = 1
- All other elements are 0 by default in Java
- Main diagonal: elements where row index equals column index
- Identity matrix is used in linear algebra and matrix operations

---

### Exercise 7: Spiral Matrix Print

**📝 Problem Statement:**
Print a 2D matrix in spiral order, starting from the top-left corner and moving in a clockwise spiral pattern (right → down → left → up).

**Requirements:**
- Create a 4x4 matrix with sequential numbers
- Display the original matrix
- Print elements in spiral order using four directional passes
- Use four boundary variables: top, bottom, left, right
- Adjust boundaries after each directional pass
- Continue until all elements are printed

**Sample Test Cases:**
```
Input: matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]
Expected Output:
Matrix:
  1   2   3   4
  5   6   7   8
  9  10  11  12
 13  14  15  16

Spiral Order:
1 2 3 4 8 12 16 15 14 13 9 5 6 7 11 10
```

**Solution:**
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

**💡 Tips:**
- Four boundaries track unprocessed area: top, bottom, left, right
- Process in order: top row → right column → bottom row → left column
- Adjust boundaries after each pass: top++, right--, bottom--, left++
- Check boundaries before bottom and left passes to avoid double-printing
- Stop when top > bottom or left > right

---

### Exercise 8: Diagonal Sum of Matrix

**📝 Problem Statement:**
Calculate the sum of both diagonal elements in a square matrix: primary diagonal (top-left to bottom-right) and secondary diagonal (top-right to bottom-left).

**Requirements:**
- Create a 4x4 square matrix with predefined values
- Display the original matrix
- Calculate sum of primary diagonal elements (where i == j)
- Calculate sum of secondary diagonal elements (where i + j == n - 1)
- Display both diagonal sums with clear labels
- Use a helper method to print the matrix

**Sample Test Cases:**
```
Input: matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]
Expected Output:
Matrix:
  1   2   3   4
  5   6   7   8
  9  10  11  12
 13  14  15  16

Primary Diagonal Sum: 34  (1 + 6 + 11 + 16)
Secondary Diagonal Sum: 34  (4 + 7 + 10 + 13)
```

**Solution:**
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

**💡 Tips:**
- Primary diagonal: elements where row index = column index (i == j)
- Secondary diagonal: elements where i + j = n - 1 (or matrix[i][n-1-i])
- Only works for square matrices (rows = columns)
- Can calculate both sums in single loop for efficiency
- For odd-sized matrices, center element is counted in both diagonals

---

### Exercise 9: Matrix Subtraction

**📝 Problem Statement:**
Subtract one matrix from another and display both input matrices and the resulting difference matrix.

**Requirements:**
- Create two 3x3 matrices with predefined values
- Create a helper method to subtract matrices
- Ensure matrices have same dimensions
- Calculate difference: result[i][j] = m1[i][j] - m2[i][j]
- Display matrix1, matrix2, and the difference matrix
- Use proper formatting for output

**Sample Test Cases:**
```
Input: matrix1 = [[10, 20, 30], [40, 50, 60], [70, 80, 90]]
       matrix2 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
Expected Output:
Matrix 1:
 10  20  30
 40  50  60
 70  80  90

Matrix 2:
  1   2   3
  4   5   6
  7   8   9

Difference (Matrix1 - Matrix2):
  9  18  27
 36  45  54
 63  72  81
```

**Solution:**
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

**💡 Tips:**
- Matrix subtraction requires same dimensions
- Subtract corresponding elements: result[i][j] = m1[i][j] - m2[i][j]
- Order matters: m1 - m2 ≠ m2 - m1
- Use printf with width specifier for aligned output
- Can enhance by adding dimension validation

---

### Exercise 10: Symmetric Matrix Checker

**📝 Problem Statement:**
Check if a square matrix is symmetric. A matrix is symmetric if it equals its transpose (matrix[i][j] == matrix[j][i] for all i, j).

**Requirements:**
- Create two square matrices (one symmetric, one not)
- Create a helper method to check if a matrix is symmetric
- Compare each element with its transpose position
- Display each matrix and whether it's symmetric
- Use proper formatting for matrix display

**Sample Test Cases:**
```
Input: matrix1 = [[1, 2, 3], [2, 4, 5], [3, 5, 6]]  (symmetric)
       matrix2 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]  (not symmetric)
Expected Output:
Matrix 1:
  1   2   3
  2   4   5
  3   5   6
Is Symmetric: true

Matrix 2:
  1   2   3
  4   5   6
  7   8   9
Is Symmetric: false
```

**Solution:**
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

**💡 Tips:**
- Symmetric matrix: matrix[i][j] = matrix[j][i] for all i, j
- Only works for square matrices (n × n)
- Can optimize by only checking upper/lower triangle
- Example symmetric matrices: identity matrix, covariance matrix
- Used in linear algebra and data analysis

---

### Exercise 11: Search in 2D Array

**📝 Problem Statement:**
Search for an element in a 2D array and display its position (row and column indices) if found.

**Requirements:**
- Create a 4x4 matrix with predefined values
- Display the matrix
- Accept a target value from user input
- Search through the entire matrix using nested loops
- Display the position [row][col] if element is found
- Display "not found" message if element doesn't exist
- Close Scanner after use

**Sample Test Cases:**
```
Input: matrix = [[10, 20, 30, 40], [15, 25, 35, 45], [27, 29, 37, 48], [32, 33, 39, 50]]
       target = 37
Expected Output:
Matrix:
 10  20  30  40
 15  25  35  45
 27  29  37  48
 32  33  39  50

Enter element to search: 37
37 found at position [2][2]

Input: target = 100
Expected Output:
100 not found in the matrix
```

**Solution:**
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

**💡 Tips:**
- Linear search through 2D array: check each element sequentially
- Use break to exit both loops when element is found
- Initialize row and col to -1 to indicate "not found" state
- Time complexity: O(rows × cols) in worst case
- For sorted matrix, can use more efficient search algorithms

---

### Exercise 12: Pascal's Triangle

**📝 Problem Statement:**
Generate Pascal's Triangle using a jagged array. Each row contains binomial coefficients where each element is the sum of the two elements above it.

**Requirements:**
- Accept number of rows from user input
- Use jagged array (each row has different length)
- Set first and last elements of each row to 1
- Calculate middle elements as sum of two elements from previous row
- Display the triangle with proper spacing for pyramid shape
- Close Scanner after use

**Sample Test Cases:**
```
Input: rows = 5
Expected Output:
Enter number of rows: 5

Pascal's Triangle:
        1
      1   1
    1   2   1
  1   3   3   1
1   4   6   4   1
```

**Solution:**
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

**💡 Tips:**
- Row i has (i + 1) elements (0 to i)
- First and last elements are always 1
- Formula: triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j]
- Perfect use case for jagged arrays
- Used in combinatorics: element at row n, position k is C(n, k)

---

### Exercise 13: Array Sorting Comparison

**📝 Problem Statement:**
Compare three different sorting approaches: bubble sort, selection sort, and Arrays.sort(). Display the original array and results from each sorting method.

**Requirements:**
- Create an unsorted array with predefined values
- Clone the array for each sorting method
- Implement bubble sort algorithm
- Implement selection sort algorithm
- Use Arrays.sort() for built-in sorting
- Display original array and all three sorted results
- Use Arrays.toString() for clean output

**Sample Test Cases:**
```
Input: array = [64, 34, 25, 12, 22, 11, 90]
Expected Output:
Original array: [64, 34, 25, 12, 22, 11, 90]
Bubble Sort: [11, 12, 22, 25, 34, 64, 90]
Selection Sort: [11, 12, 22, 25, 34, 64, 90]
Arrays.sort(): [11, 12, 22, 25, 34, 64, 90]
```

**Solution:**
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

**💡 Tips:**
- Bubble sort: O(n²) - repeatedly swaps adjacent elements
- Selection sort: O(n²) - finds minimum and places it in position
- Arrays.sort(): O(n log n) - uses optimized dual-pivot quicksort
- Clone arrays to preserve original for comparison
- For production code, always use Arrays.sort()

---

### Exercise 14: Zig-Zag Pattern Print

**📝 Problem Statement:**
Print a 2D array in zig-zag pattern where even rows are printed left-to-right and odd rows are printed right-to-left.

**Requirements:**
- Create a 4x4 matrix with sequential numbers
- Display the original matrix in standard format
- Print elements in zig-zag pattern
- For even-indexed rows (0, 2, 4...): print left to right
- For odd-indexed rows (1, 3, 5...): print right to left
- Display the zig-zag pattern on a single line

**Sample Test Cases:**
```
Input: matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]
Expected Output:
Matrix:
  1   2   3   4
  5   6   7   8
  9  10  11  12
 13  14  15  16

Zig-Zag Pattern:
1 2 3 4 8 7 6 5 9 10 11 12 16 15 14 13
```

**Solution:**
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

**💡 Tips:**
- Use modulus operator to determine direction: i % 2 == 0 for even rows
- Even rows: iterate j from 0 to length-1 (left to right)
- Odd rows: iterate j from length-1 to 0 (right to left)
- Pattern creates a snake-like traversal
- Useful for certain image processing algorithms

---

### Exercise 15: Array Statistics

**📝 Problem Statement:**
Calculate comprehensive statistics for an array including count, sum, average, min, max, range, median, and count of elements above/below average.

**Requirements:**
- Create an array with predefined integer values
- Calculate and display count (length)
- Calculate and display sum of all elements
- Calculate and display average
- Find and display minimum and maximum values
- Calculate and display range (max - min)
- Calculate and display median (requires sorting a copy)
- Count and display elements above and below average

**Sample Test Cases:**
```
Input: array = [45, 23, 67, 12, 89, 34, 78, 56, 90, 21]
Expected Output:
Array: [45, 23, 67, 12, 89, 34, 78, 56, 90, 21]

=== Statistics ===
Count: 10
Sum: 515
Average: 51.50
Minimum: 12
Maximum: 90
Range: 78
Median: 50.5
Above Average: 5
Below Average: 5
```

**Solution:**
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

**💡 Tips:**
- Clone array before sorting to preserve original order
- Median for even-length arrays: average of two middle elements
- Median for odd-length arrays: middle element
- Range = max - min (spread of data)
- Cast sum to double before division for accurate average

---

### Exercise 16: Matrix Transpose

**📝 Problem Statement:**
Create the transpose of a matrix by swapping rows and columns. Display both the original matrix and its transpose.

**Requirements:**
- Create a rectangular matrix (e.g., 2x3)
- Create transpose matrix with swapped dimensions (3x2)
- Use nested loops to copy elements with swapped indices
- Display both original and transposed matrices
- Use proper formatting for matrix display

**Sample Test Cases:**
```
Input: matrix (2x3) = [[1, 2, 3], [4, 5, 6]]
Expected Output:
Original Matrix (2x3):
1  2  3
4  5  6

Transpose Matrix (3x2):
1  4
2  5
3  6
```

**Solution:**
```java
public class MatrixTranspose {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6}
        };  // 2x3

        System.out.println("Original Matrix (" + matrix.length + "x" + matrix[0].length + "):");
        printMatrix(matrix);

        int[][] transpose = createTranspose(matrix);

        System.out.println("\nTranspose Matrix (" + transpose.length + "x" + transpose[0].length + "):");
        printMatrix(transpose);
    }

    public static int[][] createTranspose(int[][] matrix) {
        int rows = matrix.length;
        int cols = matrix[0].length;

        int[][] transpose = new int[cols][rows];  // Swap dimensions

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                transpose[j][i] = matrix[i][j];  // Swap indices
            }
        }

        return transpose;
    }

    public static void printMatrix(int[][] matrix) {
        for (int[] row : matrix) {
            for (int element : row) {
                System.out.print(element + "  ");
            }
            System.out.println();
        }
    }
}
```

**💡 Tips:**
- Transpose dimensions: (m × n) becomes (n × m)
- Swap indices when copying: transpose[j][i] = matrix[i][j]
- Works for rectangular matrices, not just square
- Transpose of transpose returns original matrix
- Used in linear algebra and matrix operations

---

### Exercise 17: Rotate Matrix 90 Degrees

**📝 Problem Statement:**
Rotate a square matrix 90 degrees clockwise. Display both the original matrix and the rotated matrix.

**Requirements:**
- Create a square matrix (3x3 or 4x4)
- Create a rotated matrix with same dimensions
- Use formula: rotated[j][n-1-i] = matrix[i][j]
- Display both original and rotated matrices
- Use proper formatting for matrix display

**Sample Test Cases:**
```
Input: matrix (3x3) = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
Expected Output:
Original Matrix:
1  2  3
4  5  6
7  8  9

Rotated 90° Clockwise:
7  4  1
8  5  2
9  6  3
```

**Solution:**
```java
public class RotateMatrix {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        System.out.println("Original Matrix:");
        printMatrix(matrix);

        int[][] rotated = rotateClockwise(matrix);

        System.out.println("\nRotated 90° Clockwise:");
        printMatrix(rotated);
    }

    public static int[][] rotateClockwise(int[][] matrix) {
        int n = matrix.length;
        int[][] rotated = new int[n][n];

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                rotated[j][n - 1 - i] = matrix[i][j];
            }
        }

        return rotated;
    }

    public static void printMatrix(int[][] matrix) {
        for (int[] row : matrix) {
            for (int element : row) {
                System.out.print(element + "  ");
            }
            System.out.println();
        }
    }
}
```

**💡 Tips:**
- Rotation formula (90° clockwise): rotated[j][n-1-i] = matrix[i][j]
- Only works for square matrices (n × n)
- For 90° counter-clockwise: rotated[n-1-j][i] = matrix[i][j]
- 180° rotation = two 90° rotations
- Used in image processing and graphics

---

### Exercise 18: Matrix Boundary Traversal

**📝 Problem Statement:**
Print only the boundary elements of a matrix in clockwise order (top row → right column → bottom row → left column).

**Requirements:**
- Create a rectangular matrix with predefined values
- Display the original matrix
- Print boundary elements in clockwise order
- Handle edge cases (single row, single column, 1x1 matrix)
- Print boundary elements on a single line

**Sample Test Cases:**
```
Input: matrix (4x5) = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20]]
Expected Output:
Matrix:
  1   2   3   4   5
  6   7   8   9  10
 11  12  13  14  15
 16  17  18  19  20

Boundary Elements (Clockwise):
1 2 3 4 5 10 15 20 19 18 17 16 11 6
```

**Solution:**
```java
public class MatrixBoundary {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3, 4, 5},
            {6, 7, 8, 9, 10},
            {11, 12, 13, 14, 15},
            {16, 17, 18, 19, 20}
        };

        System.out.println("Matrix:");
        printMatrix(matrix);

        System.out.println("\nBoundary Elements (Clockwise):");
        printBoundary(matrix);
    }

    public static void printBoundary(int[][] matrix) {
        int rows = matrix.length;
        int cols = matrix[0].length;

        // Single row
        if (rows == 1) {
            for (int j = 0; j < cols; j++) {
                System.out.print(matrix[0][j] + " ");
            }
            return;
        }

        // Single column
        if (cols == 1) {
            for (int i = 0; i < rows; i++) {
                System.out.print(matrix[i][0] + " ");
            }
            return;
        }

        // Top row
        for (int j = 0; j < cols; j++) {
            System.out.print(matrix[0][j] + " ");
        }

        // Right column (excluding top corner)
        for (int i = 1; i < rows; i++) {
            System.out.print(matrix[i][cols - 1] + " ");
        }

        // Bottom row (excluding right corner, right to left)
        for (int j = cols - 2; j >= 0; j--) {
            System.out.print(matrix[rows - 1][j] + " ");
        }

        // Left column (excluding bottom and top corners, bottom to top)
        for (int i = rows - 2; i > 0; i--) {
            System.out.print(matrix[i][0] + " ");
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

**💡 Tips:**
- Handle edge cases: single row, single column, 1x1 matrix
- Print in order: top → right → bottom → left
- Avoid printing corner elements multiple times
- Top row: all columns
- Right column: rows 1 to last (excluding top corner)
- Bottom row: cols-2 to 0 (excluding right corner, reverse order)
- Left column: rows-2 to 1 (excluding corners, reverse order)

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

## 💡 Best Practices

### 1. Choose the Right Array Type for Your Data

**Practice**: Use single-dimensional arrays for lists, two-dimensional arrays for tabular data, and jagged arrays when row lengths vary. Choose the structure that best represents your data.

**Why It's Important**: The right array structure makes code more intuitive, efficient, and maintainable. Using the wrong structure leads to wasted memory or complex indexing logic.

**Example**:
```java
// ❌ Poor Practice - Using 1D array for matrix data
public class MatrixOperations {
    // Storing 3x3 matrix as flat array
    int[] matrix = new int[9];  // Row-major order?Column-major order?

    void setValue(int row, int col, int value) {
        matrix[row * 3 + col] = value;  // Complex calculation needed
    }

    int getValue(int row, int col) {
        return matrix[row * 3 + col];  // Error-prone
    }
}

// ✅ Best Practice - Use appropriate 2D array
public class MatrixOperations {
    int[][] matrix = new int[3][3];  // Clear structure

    void setValue(int row, int col, int value) {
        matrix[row][col] = value;  // Intuitive
    }

    int getValue(int row, int col) {
        return matrix[row][col];  // Self-documenting
    }
}

// ✅ Best Practice - Jagged array for variable-length rows
public class StudentCourses {
    // Different students take different numbers of courses
    String[][] studentCourses = {
        {"Math", "Physics", "Chemistry"},      // Student 1: 3 courses
        {"English", "History"},                 // Student 2: 2 courses
        {"CS", "Math", "Physics", "English"}   // Student 3: 4 courses
    };
}
```

---

### 2. Always Validate Array Bounds Before Access

**Practice**: Check if an index is within valid bounds (0 to length-1) before accessing array elements. Use defensive programming techniques.

**Why It's Important**: ArrayIndexOutOfBoundsException is one of the most common runtime errors. Validation prevents crashes and provides better error messages.

**Example**:
```java
// ❌ Poor Practice - No bounds checking
public class GradeBook {
    int[] grades = new int[50];
    int count = 0;

    void updateGrade(int index, int newGrade) {
        grades[index] = newGrade;  // Crashes if index >= 50!
    }

    int getGrade(int index) {
        return grades[index];  // No safety check
    }
}

// ✅ Best Practice - Comprehensive validation
public class GradeBook {
    int[] grades = new int[50];
    int count = 0;

    void updateGrade(int index, int newGrade) {
        if (index < 0 || index >= count) {
            System.err.println("Error: Invalid index " + index +
                             ". Valid range: 0-" + (count - 1));
            return;
        }
        if (newGrade < 0 || newGrade > 100) {
            System.err.println("Error: Invalid grade. Must be 0-100.");
            return;
        }
        grades[index] = newGrade;
    }

    int getGrade(int index) {
        if (index < 0 || index >= count) {
            System.err.println("Error: Invalid index " + index);
            return -1;  // Error indicator
        }
        return grades[index];
    }

    boolean isValidIndex(int index) {
        return index >= 0 && index < count;
    }
}
```

---

### 3. Use Arrays Utility Methods Instead of Manual Loops

**Practice**: Leverage `java.util.Arrays` methods like `sort()`, `binarySearch()`, `equals()`, `fill()`, and `copyOf()` instead of writing manual implementations.

**Why It's Important**: Built-in methods are optimized, well-tested, and less error-prone than manual implementations. They make code more concise and readable.

**Example**:
```java
// ❌ Poor Practice - Manual implementations
public class ArrayOperations {
    // Manual sorting (bubble sort)
    void sortArray(int[] arr) {
        for (int i = 0; i < arr.length - 1; i++) {
            for (int j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }

    // Manual array comparison
    boolean arraysEqual(int[] arr1, int[] arr2) {
        if (arr1.length != arr2.length) return false;
        for (int i = 0; i < arr1.length; i++) {
            if (arr1[i] != arr2[i]) return false;
        }
        return true;
    }

    // Manual array copying
    int[] copyArray(int[] original) {
        int[] copy = new int[original.length];
        for (int i = 0; i < original.length; i++) {
            copy[i] = original[i];
        }
        return copy;
    }
}

// ✅ Best Practice - Use Arrays utility methods
import java.util.Arrays;

public class ArrayOperations {
    void sortArray(int[] arr) {
        Arrays.sort(arr);  // Optimized quicksort/mergesort
    }

    boolean arraysEqual(int[] arr1, int[] arr2) {
        return Arrays.equals(arr1, arr2);  // Efficient comparison
    }

    int[] copyArray(int[] original) {
        return Arrays.copyOf(original, original.length);  // Clean, clear
    }

    // Additional useful methods
    void fillWithValue(int[] arr, int value) {
        Arrays.fill(arr, value);  // Fill entire array
    }

    int searchSorted(int[] arr, int key) {
        Arrays.sort(arr);  // Must be sorted first
        return Arrays.binarySearch(arr, key);  // Fast O(log n) search
    }

    String arrayToString(int[] arr) {
        return Arrays.toString(arr);  // Easy debugging
    }
}
```

---

### 4. Initialize Arrays with Meaningful Default Values

**Practice**: Initialize arrays with appropriate default values rather than leaving them with language defaults (0, false, null). This prevents logic errors from unexpected values.

**Why It's Important**: Explicit initialization makes intent clear, prevents bugs from relying on defaults, and makes code self-documenting.

**Example**:
```java
// ❌ Poor Practice - Relying on default values
public class ProductInventory {
    int[] quantities = new int[100];  // All zeros by default

    boolean isAvailable(int productId) {
        // Problem: 0 means "not set" or "out of stock"?
        return quantities[productId] > 0;
    }
}

// ✅ Best Practice - Explicit initialization with meaningful values
public class ProductInventory {
    int[] quantities = new int[100];
    boolean[] initialized = new boolean[100];

    // Use -1 to indicate "not set"
    ProductInventory() {
        Arrays.fill(quantities, -1);  // Explicit "not set" marker
    }

    void setQuantity(int productId, int quantity) {
        if (productId >= 0 && productId < quantities.length) {
            quantities[productId] = quantity;
            initialized[productId] = true;
        }
    }

    boolean isAvailable(int productId) {
        if (!initialized[productId]) {
            return false;  // Product not set up yet
        }
        return quantities[productId] > 0;  // Clear logic
    }

    boolean isInitialized(int productId) {
        return initialized[productId];
    }
}

// Another example - customer ratings
public class RatingSystem {
    double[] ratings = new double[1000];

    // -1.0 means "no rating yet"
    RatingSystem() {
        Arrays.fill(ratings, -1.0);
    }

    boolean hasRating(int customerId) {
        return ratings[customerId] >= 0;  // Clear distinction
    }
}
```

---

### 5. Avoid Deep Copying When Not Needed (Reference Awareness)

**Practice**: Understand the difference between shallow and deep copying. Use the appropriate copy method based on whether you need independent copies or shared references.

**Why It's Important**: Unnecessary deep copying wastes memory and time. Unexpected sharing of references can cause bugs when modifications affect multiple "copies".

**Example**:
```java
// ❌ Poor Practice - Modifying reference without understanding sharing
public class TeamManager {
    String[] team1 = {"Alice", "Bob", "Charlie"};
    String[] team2 = team1;  // Reference copy!

    void changeTeam2() {
        team2[0] = "David";  // This also changes team1[0]!
    }
}

// ✅ Best Practice - Explicit copying when independence needed
public class TeamManager {
    String[] team1 = {"Alice", "Bob", "Charlie"};

    // Method 1: Create independent copy
    String[] createIndependentTeam() {
        return Arrays.copyOf(team1, team1.length);
    }

    // Method 2: System.arraycopy for performance
    String[] createTeamCopy() {
        String[] copy = new String[team1.length];
        System.arraycopy(team1, 0, copy, 0, team1.length);
        return copy;
    }

    // Method 3: Clone (less preferred, returns Object[])
    String[] cloneTeam() {
        return team1.clone();
    }
}

// 2D array copying - understanding depth
public class MatrixOperations {
    int[][] matrix = {{1, 2}, {3, 4}};

    // ❌ Shallow copy - rows still shared!
    int[][] shallowCopy() {
        return matrix.clone();  // Only copies outer array
    }

    // ✅ Deep copy - completely independent
    int[][] deepCopy() {
        int[][] copy = new int[matrix.length][];
        for (int i = 0; i < matrix.length; i++) {
            copy[i] = matrix[i].clone();  // Copy each row
        }
        return copy;
    }
}
```

---

### 6. Use Enhanced For-Loop for Read-Only Iteration

**Practice**: Use enhanced for-loop (for-each) when you only need to read values. Use traditional for-loop when you need indices or need to modify elements.

**Why It's Important**: Enhanced for-loop is cleaner, prevents index errors, and clearly communicates read-only intent. It's also slightly more efficient.

**Example**:
```java
// ❌ Poor Practice - Traditional loop for simple iteration
public class StatisticsCalculator {
    double calculateAverage(int[] numbers) {
        int sum = 0;
        for (int i = 0; i < numbers.length; i++) {  // Verbose
            sum += numbers[i];
        }
        return (double) sum / numbers.length;
    }

    void displayElements(String[] names) {
        for (int i = 0; i < names.length; i++) {  // Unnecessary index
            System.out.println(names[i]);
        }
    }
}

// ✅ Best Practice - Enhanced for-loop for read-only
public class StatisticsCalculator {
    double calculateAverage(int[] numbers) {
        int sum = 0;
        for (int num : numbers) {  // Clean and clear
            sum += num;
        }
        return (double) sum / numbers.length;
    }

    void displayElements(String[] names) {
        for (String name : names) {  // Intent is obvious
            System.out.println(name);
        }
    }

    // ✅ Use traditional loop when index is needed
    void displayWithIndex(String[] names) {
        for (int i = 0; i < names.length; i++) {
            System.out.println((i + 1) + ". " + names[i]);
        }
    }

    // ✅ Use traditional loop for modification
    void doubleAllValues(int[] numbers) {
        for (int i = 0; i < numbers.length; i++) {
            numbers[i] *= 2;  // Modifying elements
        }
    }
}
```

---

### 7. Document Array Dimensions and Expected Size

**Practice**: Document what each dimension represents in multi-dimensional arrays. Include comments about expected sizes and index meanings.

**Why It's Important**: Multi-dimensional arrays can be confusing. Clear documentation prevents bugs from misunderstanding dimensions and improves code maintainability.

**Example**:
```java
// ❌ Poor Practice - Unclear dimensions
public class SchoolData {
    int[][] data = new int[5][30];  // What does this represent?

    void updateData(int x, int y, int value) {
        data[x][y] = value;  // What are x and y?
    }
}

// ✅ Best Practice - Well-documented arrays
public class SchoolData {
    // Attendance data: [classIndex][dayIndex]
    // 5 classes, 30 days in month
    // Value: 1 = present, 0 = absent, -1 = not yet recorded
    int[][] attendance = new int[5][30];

    // Class names corresponding to first dimension
    String[] classNames = {
        "Math 101",
        "Science 101",
        "English 101",
        "History 101",
        "PE 101"
    };

    /**
     * Records attendance for a student
     * @param classIndex Index of the class (0-4)
     * @param dayOfMonth Day of the month (1-30, will be converted to 0-29)
     * @param isPresent true if student was present
     */
    void recordAttendance(int classIndex, int dayOfMonth, boolean isPresent) {
        if (classIndex < 0 || classIndex >= attendance.length) {
            System.err.println("Invalid class index: " + classIndex);
            return;
        }

        int dayIndex = dayOfMonth - 1;  // Convert to 0-based
        if (dayIndex < 0 || dayIndex >= attendance[classIndex].length) {
            System.err.println("Invalid day: " + dayOfMonth);
            return;
        }

        attendance[classIndex][dayIndex] = isPresent ? 1 : 0;
    }

    /**
     * Calculates attendance rate for a class
     * @param classIndex Index of the class (0-4)
     * @return Attendance rate as percentage (0-100)
     */
    double getAttendanceRate(int classIndex) {
        if (classIndex < 0 || classIndex >= attendance.length) {
            return -1;
        }

        int present = 0;
        int recorded = 0;

        for (int day = 0; day < attendance[classIndex].length; day++) {
            if (attendance[classIndex][day] != -1) {
                recorded++;
                if (attendance[classIndex][day] == 1) {
                    present++;
                }
            }
        }

        if (recorded == 0) return 0;
        return (double) present / recorded * 100;
    }
}
```

---

### 8. Consider ArrayList for Dynamic Size Requirements

**Practice**: Use `ArrayList` instead of arrays when size may change frequently. Arrays are fixed-size; `ArrayList` grows dynamically.

**Why It's Important**: Fixed-size arrays require manual resizing logic (creating new array, copying elements). `ArrayList` handles this automatically, making code simpler and less error-prone.

**Example**:
```java
// ❌ Poor Practice - Manual array resizing
public class StudentList {
    String[] students = new String[10];
    int count = 0;

    void addStudent(String name) {
        if (count >= students.length) {
            // Manual resizing - error-prone
            String[] newArray = new String[students.length * 2];
            for (int i = 0; i < students.length; i++) {
                newArray[i] = students[i];
            }
            students = newArray;
        }
        students[count++] = name;
    }

    void removeStudent(String name) {
        // Manual removal - complex
        int index = -1;
        for (int i = 0; i < count; i++) {
            if (students[i].equals(name)) {
                index = i;
                break;
            }
        }

        if (index != -1) {
            for (int i = index; i < count - 1; i++) {
                students[i] = students[i + 1];
            }
            students[--count] = null;
        }
    }
}

// ✅ Best Practice - Use ArrayList for dynamic needs
import java.util.ArrayList;

public class StudentList {
    ArrayList<String> students = new ArrayList<>();

    void addStudent(String name) {
        students.add(name);  // Automatic resizing
    }

    void removeStudent(String name) {
        students.remove(name);  // Automatic shifting
    }

    int getCount() {
        return students.size();
    }

    String getStudent(int index) {
        if (index >= 0 && index < students.size()) {
            return students.get(index);
        }
        return null;
    }
}

// Note: Use arrays when:
// 1. Size is fixed and known in advance
// 2. Need maximum performance
// 3. Working with primitives (no boxing overhead)
// 4. Interfacing with APIs that require arrays
```

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

## ⚠️ Common Mistakes

### 1. Multi-dimensional Array Declaration Issues

#### ❌ Wrong - Wrong 2D Array Declaration Syntax:
```java
// WRONG - Cannot specify dimensions in type
int[3][4] matrix;  // Compilation error!
int[][] matrix[3][4];  // Compilation error!
```
**Issue:** Dimensions specified in wrong place

#### ✅ Right:
```java
// CORRECT
int[][] matrix = new int[3][4];  // 3 rows, 4 columns

// OR declare then allocate
int[][] matrix;
matrix = new int[3][4];
```

**Why:** Dimensions go with `new` during allocation, not with type declaration.

**💡 Tip:** Syntax is `dataType[][] name = new dataType[rows][cols];`

---

#### ❌ Wrong - Confusing Rows and Columns:
```java
// WRONG - Mixing up which dimension is rows and which is columns
int[][] matrix = new int[4][3];  // Think it's 3 rows, 4 columns

// Actually creates 4 rows and 3 columns!
matrix[3][0] = 10;  // Exists
matrix[2][3] = 20;  // ArrayIndexOutOfBoundsException!
```
**Issue:** First dimension is rows, second is columns - easy to confuse

#### ✅ Right:
```java
// CORRECT - First number is rows, second is columns
int[][] matrix = new int[3][4];  // 3 rows, 4 columns

System.out.println("Rows: " + matrix.length);        // 3
System.out.println("Columns: " + matrix[0].length);  // 4
```

**Why:** Convention is `[rows][columns]` but conceptually think "array of rows".

**💡 Tip:** Remember: `matrix.length` = rows, `matrix[0].length` = columns.

---

#### ❌ Wrong - Not Initializing Rows in Jagged Array:
```java
// WRONG
int[][] jagged = new int[3][];  // Only rows allocated

jagged[0][0] = 10;  // NullPointerException! Row not initialized
```
**Issue:** In jagged arrays, rows themselves must be initialized

#### ✅ Right:
```java
// CORRECT
int[][] jagged = new int[3][];
jagged[0] = new int[2];  // Initialize each row
jagged[1] = new int[4];
jagged[2] = new int[3];

jagged[0][0] = 10;  // Now works
```

**Why:** Jagged array is array of arrays; each row must be separately allocated.

**💡 Tip:** For jagged arrays, allocate rows individually: `arr[i] = new int[size];`

---

#### ❌ Wrong - Wrong Initialization Order:
```java
// WRONG
int[][] matrix = new int[][3];  // Compilation error!
```
**Issue:** Cannot specify only second dimension without first

#### ✅ Right:
```java
// CORRECT - Must specify first dimension
int[][] matrix = new int[3][];  // 3 rows, columns later

// Then specify columns for each row
matrix[0] = new int[3];
matrix[1] = new int[3];
matrix[2] = new int[3];
```

**Why:** Must specify first dimension; second dimension can vary (jagged) or be specified later.

**💡 Tip:** First dimension mandatory, second optional: `new int[rows][]` is valid.

---

#### ❌ Wrong - Using new with Inline Initialization:
```java
// WRONG
int[][] matrix = new int[3][4]{{1,2,3,4}, {5,6,7,8}, {9,10,11,12}};  // Error!
```
**Issue:** Cannot specify size and provide values together

#### ✅ Right:
```java
// CORRECT - Method 1: No size with values
int[][] matrix = {{1,2,3,4}, {5,6,7,8}, {9,10,11,12}};

// CORRECT - Method 2: Size without values
int[][] matrix = new int[3][4];
// Then populate manually
```

**Why:** When providing values, compiler infers dimensions automatically.

**💡 Tip:** Either specify size OR provide values, not both.

---

### 2. Index and Access Issues

#### ❌ Wrong - Reversed Row/Column Indices:
```java
// WRONG
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

// Want element in row 1, column 2 (value 6)
int value = matrix[2][1];  // Wrong! Gets 8 (row 2, column 1)
```
**Issue:** Indices in wrong order

#### ✅ Right:
```java
// CORRECT
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

int value = matrix[1][2];  // Correct: row 1, column 2 = 6
```

**Why:** Syntax is `matrix[row][column]`, not `matrix[column][row]`.

**💡 Tip:** Always think `[row][column]` - like reading row first, then column.

---

#### ❌ Wrong - Assuming Rectangular When Jagged:
```java
// WRONG
int[][] jagged = {
    {1, 2},
    {3, 4, 5, 6},
    {7, 8, 9}
};

// Assuming all rows have 4 columns
for (int i = 0; i < jagged.length; i++) {
    for (int j = 0; j < 4; j++) {  // Wrong!
        System.out.print(jagged[i][j] + " ");  // Crashes on row 0 and 2!
    }
}
```
**Issue:** Hardcoded column count doesn't work for jagged arrays

#### ✅ Right:
```java
// CORRECT
int[][] jagged = {
    {1, 2},
    {3, 4, 5, 6},
    {7, 8, 9}
};

for (int i = 0; i < jagged.length; i++) {
    for (int j = 0; j < jagged[i].length; j++) {  // Use row's length
        System.out.print(jagged[i][j] + " ");
    }
    System.out.println();
}
```

**Why:** Each row can have different length in jagged arrays.

**💡 Tip:** Always use `matrix[i].length` for columns, not a fixed number.

---

#### ❌ Wrong - Off-by-One in 2D Loops:
```java
// WRONG
int[][] matrix = new int[3][4];

for (int i = 0; i <= matrix.length; i++) {  // <= is wrong!
    for (int j = 0; j <= matrix[i].length; j++) {  // <= is wrong!
        matrix[i][j] = i + j;  // ArrayIndexOutOfBoundsException!
    }
}
```
**Issue:** Using `<=` includes invalid indices

#### ✅ Right:
```java
// CORRECT
int[][] matrix = new int[3][4];

for (int i = 0; i < matrix.length; i++) {  // Use <
    for (int j = 0; j < matrix[i].length; j++) {  // Use <
        matrix[i][j] = i + j;
    }
}
```

**Why:** Indices range from 0 to length-1, so condition must be `<` not `<=`.

**💡 Tip:** Standard 2D loop: `i < rows` and `j < columns`.

---

#### ❌ Wrong - Accessing Null Row in Jagged Array:
```java
// WRONG
int[][] jagged = new int[3][];
jagged[0] = new int[]{1, 2, 3};
// jagged[1] not initialized - still null!
jagged[2] = new int[]{7, 8, 9};

int value = jagged[1][0];  // NullPointerException!
```
**Issue:** Accessing uninitialized row

#### ✅ Right:
```java
// CORRECT - Check for null before accessing
int[][] jagged = new int[3][];
jagged[0] = new int[]{1, 2, 3};
jagged[2] = new int[]{7, 8, 9};

for (int i = 0; i < jagged.length; i++) {
    if (jagged[i] != null) {  // Check for null
        for (int j = 0; j < jagged[i].length; j++) {
            System.out.print(jagged[i][j] + " ");
        }
    }
}
```

**Why:** In jagged arrays, rows can be null if not initialized.

**💡 Tip:** Check `jagged[i] != null` before accessing row elements.

---

#### ❌ Wrong - Using matrix.length for Columns:
```java
// WRONG
int[][] matrix = new int[3][4];  // 3 rows, 4 columns

for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix.length; j++) {  // Wrong! Uses rows for columns
        matrix[i][j] = i + j;  // ArrayIndexOutOfBoundsException!
    }
}
```
**Issue:** Using row count (matrix.length) for column count

#### ✅ Right:
```java
// CORRECT
int[][] matrix = new int[3][4];

for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {  // Use row's column count
        matrix[i][j] = i + j;
    }
}
```

**Why:** `matrix.length` gives rows; `matrix[i].length` gives columns in row i.

**💡 Tip:** Rows: `matrix.length`, Columns: `matrix[i].length`.

---

### 3. Loop and Traversal Mistakes

#### ❌ Wrong - Wrong Nested Loop Bounds:
```java
// WRONG
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6}
};  // 2 rows, 3 columns

for (int i = 0; i < 3; i++) {  // Hardcoded 3 - wrong!
    for (int j = 0; j < 2; j++) {  // Hardcoded 2 - wrong!
        System.out.print(matrix[i][j]);  // Crashes at i=2
    }
}
```
**Issue:** Hardcoded bounds don't match actual array dimensions

#### ✅ Right:
```java
// CORRECT
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6}
};

for (int i = 0; i < matrix.length; i++) {  // Use matrix.length
    for (int j = 0; j < matrix[i].length; j++) {  // Use row length
        System.out.print(matrix[i][j]);
    }
}
```

**Why:** Array dimensions should be determined at runtime, not hardcoded.

**💡 Tip:** Always use `.length` properties instead of hardcoded numbers.

---

#### ❌ Wrong - Modifying 2D Array in for-each:
```java
// WRONG
int[][] matrix = {{1, 2}, {3, 4}};

for (int[] row : matrix) {
    for (int element : row) {
        element = element * 2;  // Doesn't modify array!
    }
}
// matrix unchanged: {{1, 2}, {3, 4}}
```
**Issue:** for-each provides copy of elements, not references

#### ✅ Right:
```java
// CORRECT
int[][] matrix = {{1, 2}, {3, 4}};

for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
        matrix[i][j] = matrix[i][j] * 2;  // Direct modification
    }
}
// matrix modified: {{2, 4}, {6, 8}}
```

**Why:** for-each gives read-only access; use indexed loops to modify.

**💡 Tip:** Use indexed loops when you need to modify 2D array elements.

---

#### ❌ Wrong - Wrong Loop Order in Matrix Operations:
```java
// WRONG - Transpose by swapping in place
int[][] matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};

for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {  // Wrong! Swaps twice
        int temp = matrix[i][j];
        matrix[i][j] = matrix[j][i];
        matrix[j][i] = temp;
    }
}
// Matrix incorrect!
```
**Issue:** Swapping all elements swaps each pair twice (undoing the swap)

#### ✅ Right:
```java
// CORRECT - Only swap upper triangle
int[][] matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};

for (int i = 0; i < matrix.length; i++) {
    for (int j = i + 1; j < matrix[i].length; j++) {  // Start j from i+1
        int temp = matrix[i][j];
        matrix[i][j] = matrix[j][i];
        matrix[j][i] = temp;
    }
}
```

**Why:** For in-place transpose, only swap upper triangle to avoid double swap.

**💡 Tip:** For transpose in place: `j` starts from `i+1`, not 0.

---

### 4. Arrays Utility Class Mistakes

#### ❌ Wrong - Using binarySearch on Unsorted Array:
```java
// WRONG
import java.util.Arrays;

int[] numbers = {5, 2, 8, 1, 9, 3};  // Unsorted!

int index = Arrays.binarySearch(numbers, 8);
System.out.println("Found at: " + index);  // Unpredictable result!
```
**Issue:** binarySearch requires sorted array; gives wrong result on unsorted

#### ✅ Right:
```java
// CORRECT - Sort first
import java.util.Arrays;

int[] numbers = {5, 2, 8, 1, 9, 3};

Arrays.sort(numbers);  // Sort first: {1, 2, 3, 5, 8, 9}

int index = Arrays.binarySearch(numbers, 8);
System.out.println("Found at: " + index);  // Correct: 4
```

**Why:** Binary search algorithm assumes array is sorted to work correctly.

**💡 Tip:** Always sort before using `Arrays.binarySearch()`.

---

#### ❌ Wrong - Wrong copyOfRange Indices:
```java
// WRONG
import java.util.Arrays;

int[] numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

// Want elements at indices 2, 3, 4 (values 3, 4, 5)
int[] copy = Arrays.copyOfRange(numbers, 2, 5);  // Looks right...
System.out.println(Arrays.toString(copy));  // Prints [3, 4, 5] - correct by luck!

// But if you want to include index 5:
int[] copy2 = Arrays.copyOfRange(numbers, 2, 5);  // Doesn't include 5!
```
**Issue:** End index is exclusive (not included in result)

#### ✅ Right:
```java
// CORRECT
import java.util.Arrays;

int[] numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

// To include indices 2, 3, 4 (values 3, 4, 5), end index must be 5
int[] copy1 = Arrays.copyOfRange(numbers, 2, 5);  // [3, 4, 5]

// To include indices 2 through 6 (values 3 through 7), end must be 7
int[] copy2 = Arrays.copyOfRange(numbers, 2, 7);  // [3, 4, 5, 6, 7]
```

**Why:** copyOfRange is exclusive of end index: `[start, end)`.

**💡 Tip:** End index is exclusive: use `start` to `end-1` elements.

---

#### ❌ Wrong - toString() vs deepToString() Confusion:
```java
// WRONG
import java.util.Arrays;

int[][] matrix = {{1, 2, 3}, {4, 5, 6}};

System.out.println(Arrays.toString(matrix));
// Prints: [[I@15db9742, [I@6d06d69c] - not useful!
```
**Issue:** toString() doesn't work for 2D arrays

#### ✅ Right:
```java
// CORRECT
import java.util.Arrays;

int[][] matrix = {{1, 2, 3}, {4, 5, 6}};

System.out.println(Arrays.deepToString(matrix));
// Prints: [[1, 2, 3], [4, 5, 6]] - readable!
```

**Why:** toString() is for 1D arrays; use deepToString() for multi-dimensional.

**💡 Tip:** 1D: `Arrays.toString()`, Multi-D: `Arrays.deepToString()`.

---

#### ❌ Wrong - equals() vs deepEquals() for 2D Arrays:
```java
// WRONG
import java.util.Arrays;

int[][] arr1 = {{1, 2}, {3, 4}};
int[][] arr2 = {{1, 2}, {3, 4}};

System.out.println(Arrays.equals(arr1, arr2));  // FALSE!
```
**Issue:** equals() only compares references for 2D arrays, not contents

#### ✅ Right:
```java
// CORRECT
import java.util.Arrays;

int[][] arr1 = {{1, 2}, {3, 4}};
int[][] arr2 = {{1, 2}, {3, 4}};

System.out.println(Arrays.deepEquals(arr1, arr2));  // TRUE!
```

**Why:** equals() doesn't recursively compare nested arrays; use deepEquals().

**💡 Tip:** 1D: `Arrays.equals()`, Multi-D: `Arrays.deepEquals()`.

---

#### ❌ Wrong - fill() Range Parameters:
```java
// WRONG
import java.util.Arrays;

int[] arr = new int[10];

Arrays.fill(arr, 5, 2, 99);  // IllegalArgumentException! Start > end
```
**Issue:** Start index must be before end index

#### ✅ Right:
```java
// CORRECT
import java.util.Arrays;

int[] arr = new int[10];

Arrays.fill(arr, 2, 7, 99);  // Fill indices 2-6 with 99
System.out.println(Arrays.toString(arr));  // [0, 0, 99, 99, 99, 99, 99, 0, 0, 0]
```

**Why:** Range is `[start, end)` where start < end.

**💡 Tip:** fill(arr, start, end, value) fills from start to end-1.

---

#### ❌ Wrong - Thinking sort() Doesn't Modify Original:
```java
// WRONG
import java.util.Arrays;

int[] original = {5, 2, 8, 1, 9};
Arrays.sort(original);  // Assume original unchanged?

System.out.println(Arrays.toString(original));
// Prints [1, 2, 5, 8, 9] - MODIFIED!
```
**Issue:** sort() modifies the array in-place

#### ✅ Right:
```java
// CORRECT - Copy first if you need original
import java.util.Arrays;

int[] original = {5, 2, 8, 1, 9};
int[] sorted = original.clone();  // Create copy
Arrays.sort(sorted);  // Sort the copy

System.out.println("Original: " + Arrays.toString(original));  // [5, 2, 8, 1, 9]
System.out.println("Sorted: " + Arrays.toString(sorted));      // [1, 2, 5, 8, 9]
```

**Why:** Arrays.sort() modifies array in-place; clone first to preserve original.

**💡 Tip:** Clone before sorting if you need to keep original order.

---

### 5. Copying Mistakes

#### ❌ Wrong - Shallow Copy of 2D Arrays:
```java
// WRONG
int[][] original = {{1, 2}, {3, 4}};
int[][] copy = original.clone();  // Shallow copy!

copy[0][0] = 100;  // Modifies original too!
System.out.println(original[0][0]);  // Prints 100!
```
**Issue:** clone() creates shallow copy for 2D arrays (copies row references)

#### ✅ Right:
```java
// CORRECT - Deep copy each row
int[][] original = {{1, 2}, {3, 4}};
int[][] copy = new int[original.length][];

for (int i = 0; i < original.length; i++) {
    copy[i] = original[i].clone();  // Clone each row
}

copy[0][0] = 100;  // Doesn't affect original
System.out.println(original[0][0]);  // Still 1
```

**Why:** 2D arrays need deep copy (copying each row separately).

**💡 Tip:** For 2D arrays, clone each row individually for true independent copy.

---

#### ❌ Wrong - Reference Assignment Instead of Copy:
```java
// WRONG
int[][] original = {{1, 2}, {3, 4}};
int[][] copy = original;  // Not a copy! Same reference

copy[0][0] = 100;
System.out.println(original[0][0]);  // 100 - both changed!
```
**Issue:** Assignment copies reference, not array data

#### ✅ Right:
```java
// CORRECT
int[][] original = {{1, 2}, {3, 4}};
int[][] copy = new int[original.length][];

for (int i = 0; i < original.length; i++) {
    copy[i] = original[i].clone();
}

copy[0][0] = 100;
System.out.println(original[0][0]);  // Still 1
```

**Why:** = operator copies reference; must manually copy data.

**💡 Tip:** Assignment copies reference; use clone() or loops for actual copy.

---

#### ❌ Wrong - Wrong System.arraycopy Parameters:
```java
// WRONG
int[] source = {1, 2, 3, 4, 5};
int[] dest = new int[5];

System.arraycopy(source, dest, 0, 0, 5);  // Wrong parameter order!
// Throws ArrayStoreException or unexpected behavior
```
**Issue:** Parameters in wrong order

#### ✅ Right:
```java
// CORRECT
int[] source = {1, 2, 3, 4, 5};
int[] dest = new int[5];

System.arraycopy(source, 0, dest, 0, 5);
// Parameters: (src, srcPos, dest, destPos, length)
```

**Why:** Parameter order is: source, source position, destination, destination position, length.

**💡 Tip:** Remember order: `arraycopy(from, fromPos, to, toPos, count)`.

---

#### ❌ Wrong - Not Copying All Rows in 2D Array:
```java
// WRONG
int[][] original = {{1, 2}, {3, 4}, {5, 6}};
int[][] copy = new int[original.length][];

// Forgot to copy row 2!
copy[0] = original[0].clone();
copy[1] = original[1].clone();
// copy[2] is null!

copy[2][0] = 10;  // NullPointerException!
```
**Issue:** Not all rows copied

#### ✅ Right:
```java
// CORRECT - Use loop to ensure all rows copied
int[][] original = {{1, 2}, {3, 4}, {5, 6}};
int[][] copy = new int[original.length][];

for (int i = 0; i < original.length; i++) {
    copy[i] = original[i].clone();  // Copy every row
}

copy[2][0] = 10;  // Works
```

**Why:** Must copy all rows; easy to miss some when done manually.

**💡 Tip:** Use loop to copy all rows systematically.

---

### 6. Matrix Operation Errors

#### ❌ Wrong - Wrong Matrix Multiplication Dimensions:
```java
// WRONG
int[][] m1 = new int[2][3];  // 2x3
int[][] m2 = new int[4][2];  // 4x2

// Cannot multiply 2x3 by 4x2 (columns of m1 ≠ rows of m2)
int[][] result = new int[2][2];  // Wrong dimensions!

for (int i = 0; i < 2; i++) {
    for (int j = 0; j < 2; j++) {
        for (int k = 0; k < 3; k++) {  // Wrong!
            result[i][j] += m1[i][k] * m2[k][j];  // Crashes!
        }
    }
}
```
**Issue:** Matrix multiplication requires m1 columns = m2 rows

#### ✅ Right:
```java
// CORRECT
int[][] m1 = new int[2][3];  // 2x3
int[][] m2 = new int[3][4];  // 3x4 (m1 columns = m2 rows)

int[][] result = new int[2][4];  // Result is 2x4

for (int i = 0; i < m1.length; i++) {
    for (int j = 0; j < m2[0].length; j++) {
        for (int k = 0; k < m1[0].length; k++) {
            result[i][j] += m1[i][k] * m2[k][j];
        }
    }
}
```

**Why:** For multiplication, m1[rows1×cols1] × m2[rows2×cols2], need cols1 = rows2.

**💡 Tip:** Check dimensions before multiplying: m1 columns must equal m2 rows.

---

#### ❌ Wrong - Incorrect Transpose Dimensions:
```java
// WRONG
int[][] matrix = {{1, 2, 3}, {4, 5, 6}};  // 2x3

int[][] transpose = new int[2][3];  // Wrong dimensions!

for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
        transpose[j][i] = matrix[i][j];  // ArrayIndexOutOfBoundsException!
    }
}
```
**Issue:** Transpose dimensions are swapped (rows become columns)

#### ✅ Right:
```java
// CORRECT
int[][] matrix = {{1, 2, 3}, {4, 5, 6}};  // 2x3

int[][] transpose = new int[3][2];  // Swap dimensions: 3x2

for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
        transpose[j][i] = matrix[i][j];  // Now works
    }
}
```

**Why:** Transpose swaps rows and columns; dimensions must be swapped too.

**💡 Tip:** Transpose of m×n matrix is n×m: swap dimensions.

---

#### ❌ Wrong - Wrong Diagonal Access:
```java
// WRONG
int[][] matrix = {
    {1, 2, 3, 4},
    {5, 6, 7, 8},
    {9, 10, 11, 12}
};  // 3x4 - not square!

int diagonalSum = 0;
for (int i = 0; i < matrix.length; i++) {
    diagonalSum += matrix[i][i];  // ArrayIndexOutOfBoundsException!
}
```
**Issue:** Non-square matrix doesn't have full main diagonal

#### ✅ Right:
```java
// CORRECT - Check if square first
int[][] matrix = {
    {1, 2, 3, 4},
    {5, 6, 7, 8},
    {9, 10, 11, 12}
};

if (matrix.length == matrix[0].length) {
    int diagonalSum = 0;
    for (int i = 0; i < matrix.length; i++) {
        diagonalSum += matrix[i][i];
    }
    System.out.println("Diagonal sum: " + diagonalSum);
} else {
    System.out.println("Matrix is not square");
}
```

**Why:** Diagonal access `matrix[i][i]` only works for square matrices.

**💡 Tip:** Check if matrix is square before accessing diagonal.

---

#### ❌ Wrong - Incorrect Row/Column Sum Logic:
```java
// WRONG - Column sum logic error
int[][] matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};

for (int j = 0; j < matrix[0].length; j++) {
    int colSum = 0;
    for (int i = 0; i < matrix[j].length; i++) {  // Wrong! matrix[j]
        colSum += matrix[i][j];  // ArrayIndexOutOfBoundsException!
    }
    System.out.println("Column " + j + ": " + colSum);
}
```
**Issue:** Using matrix[j].length instead of matrix.length for column iteration

#### ✅ Right:
```java
// CORRECT
int[][] matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};

for (int j = 0; j < matrix[0].length; j++) {
    int colSum = 0;
    for (int i = 0; i < matrix.length; i++) {  // Use matrix.length
        colSum += matrix[i][j];
    }
    System.out.println("Column " + j + ": " + colSum);
}
```

**Why:** For column sum, outer loop is columns (j), inner is rows (i) using matrix.length.

**💡 Tip:** Column sums: outer loop columns, inner loop rows using matrix.length.

---

This comprehensive list now contains **30+ mistakes** covering all aspects of Day 7: Multi-dimensional Arrays, Jagged Arrays, Arrays Utility Class, and Array Copying!

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