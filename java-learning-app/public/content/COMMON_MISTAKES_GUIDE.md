# Common Mistakes Feature - Usage Guide

This guide shows you how to add common mistakes sections to your course markdown files.

## Method 1: Using Special Blockquote Syntax (Recommended)

Add common mistakes directly in your markdown files using this syntax:

```markdown
> [!MISTAKE] Integer Division Pitfall
> Wrong: int result = 5 / 2;
> WrongNote: result = 2 (not 2.5!)
> Right: double result = 5.0 / 2;
> RightNote: result = 2.5 (correct)
> Why: When both operands are integers, Java performs integer division which truncates the decimal part
> Tip: Use at least one double value (5.0 or 2.0) to get decimal results
```

This will automatically render as a highlighted "Common Mistakes" box with:
- ❌ Wrong code example (in red)
- ✅ Correct code example (in green)
- Explanation of why it matters
- A helpful tip

## Syntax Fields:

- **[!MISTAKE] Title** - Required. The title of the mistake
- **Wrong:** - The incorrect code example
- **WrongNote:** - Optional note explaining what's wrong
- **Right:** - The correct code example
- **RightNote:** - Optional note explaining the correct approach
- **Why:** - Explanation of why this is a common mistake
- **Tip:** - Helpful tip to avoid the mistake

## More Examples:

### Example 1: String Comparison

```markdown
> [!MISTAKE] String Comparison with ==
> Wrong: if (str1 == str2)
> WrongNote: Compares memory addresses, not content
> Right: if (str1.equals(str2))
> RightNote: Compares actual string content
> Why: The == operator compares object references, not the actual string values
> Tip: Always use .equals() for string comparison, use == only for primitives
```

### Example 2: Array Index

```markdown
> [!MISTAKE] Array Index Out of Bounds
> Wrong: for (int i = 0; i <= arr.length; i++)
> WrongNote: Will throw ArrayIndexOutOfBoundsException
> Right: for (int i = 0; i < arr.length; i++)
> RightNote: Correctly iterates through all elements
> Why: Arrays are zero-indexed, so valid indices are 0 to length-1
> Tip: Use < instead of <= when iterating with length
```

### Example 3: Null Pointer

```markdown
> [!MISTAKE] Null Pointer Exception
> Wrong: String name = getName(); name.toUpperCase();
> Right: String name = getName(); if (name != null) name.toUpperCase();
> Why: Calling methods on null objects throws NullPointerException
> Tip: Always check for null before calling methods on objects that might be null
```

## Bonus: Tips Callout

You can also add standalone tips using:

```markdown
> [!TIP]
> Use descriptive variable names to make your code more readable. Instead of 'x' or 'temp', use names like 'studentCount' or 'totalPrice'.
```

## Where to Add Them

Add Common Mistakes sections:
1. **After concept explanations** - Right after explaining a concept
2. **In dedicated sections** - Create a "Common Pitfalls" section at the end
3. **Inline with examples** - Within code examples to highlight what NOT to do

## Visual Result

The markdown will render as a beautiful, eye-catching yellow box with:
- ⚠️ Warning icon
- Side-by-side wrong vs. correct code comparison
- Color-coded borders (red for wrong, green for correct)
- Additional context and tips

This makes it impossible for students to miss important mistakes!
