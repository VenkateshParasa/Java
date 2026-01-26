#\!/bin/bash

echo "=== SELENIUM COURSE DETAILED ANALYSIS ==="
echo ""

for week in week{1..7}; do
    if [ -d "$week" ]; then
        echo "===== $week ====="
        for file in $week/day*.md; do
            if [ -f "$file" ]; then
                day=$(basename "$file" .md)
                
                # Count various sections
                topics=$(grep -c "^## " "$file" 2>/dev/null || echo 0)
                subtopics=$(grep -c "^### " "$file" 2>/dev/null || echo 0)
                exercises=$(grep -c "^### Exercise" "$file" 2>/dev/null || echo 0)
                code_blocks=$(grep -c "^```java" "$file" 2>/dev/null || echo 0)
                mistakes=$(grep -ci "common mistake\|mistake to avoid" "$file" 2>/dev/null || echo 0)
                best_practices=$(grep -ci "best practice\|tip:" "$file" 2>/dev/null || echo 0)
                
                echo "$day:"
                echo "  Topics: $topics | Subtopics: $subtopics"
                echo "  Exercises: $exercises | Code Examples: $code_blocks"
                echo "  Common Mistakes: $mistakes | Best Practices: $best_practices"
                echo ""
            fi
        done
        echo ""
    fi
done
