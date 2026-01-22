# Spaced Repetition System for Selenium & Java Courses

A comprehensive learning retention system using the SM-2 algorithm to help students master Selenium Automation and Java Core concepts through scientifically-proven spaced repetition.

---

## 🎯 Quick Start

### For Students

**1. Browse Available Flashcards:**
```bash
cd spaced-repetition-system/data

# Selenium Day 1 cards (10 cards)
cat selenium-flashcards/week1/day01-cards.json

# Java Day 1 cards (11 cards)
cat java-flashcards/week1/day01-cards.json
```

**2. Review Cards Manually:**
- Open any `.json` file in a text editor or JSON viewer
- Read the `"front"` field (question)
- Try to answer without looking at `"back"`
- Check your answer in the `"back"` field
- Review the `"explanation"` and `"code"` sections
- Use `"hints"` if you're stuck

**3. Rate Your Performance:**
After each card, rate yourself:
- **0 (Complete Blackout)** - No idea, need to relearn
- **1 (Hard)** - Struggled, took >30 seconds
- **2 (Good)** - Recalled correctly in 10-30 seconds
- **3 (Easy)** - Instant recall, <5 seconds

**4. Track Your Progress:**
Keep notes on which cards you found difficult and review them more frequently.

---

## 📚 What's Included

### Documentation
- **[SPACED_REPETITION_SYSTEM.md](../SPACED_REPETITION_SYSTEM.md)** - Complete implementation guide
  - SM-2 algorithm explanation
  - Review schedule intervals
  - Database schemas
  - JavaScript implementation code
  - Usage guidelines

- **[SRS_IMPLEMENTATION_STATUS.md](./SRS_IMPLEMENTATION_STATUS.md)** - Current implementation status
  - Phase 1 completion details
  - Sample cards overview
  - Remaining work breakdown
  - Next steps

### Flashcard Data

**Selenium Course - Day 1 (10 cards):**
- Selenium components and architecture
- Maven dependencies and setup
- WebDriver initialization
- Browser drivers and management
- Common setup issues
- First test examples

**Java Course - Day 1 (11 cards):**
- JDK/JRE/JVM platform
- Compilation and execution process
- Hello World program structure
- main() method signature
- Platform independence
- Command-line compilation
- Common beginner errors
- Naming conventions

---

## 🧠 How Spaced Repetition Works

**The SM-2 Algorithm:**

```
Review Intervals:
Day 1:  Learn new card
Day 2:  First review (+1 day)
Day 5:  Second review (+3 days)
Day 12: Third review (+7 days)
Day 26: Fourth review (+14 days)
Day 56: Fifth review (+30 days)
...and so on
```

**Why It Works:**
- Reviews cards just before you're about to forget them
- Strengthens long-term memory formation
- Proven 80-95% retention rate vs 20-30% with traditional methods
- Optimizes study time by focusing on difficult cards

---

## 📊 Flashcard Structure

Each flashcard follows this JSON schema:

```json
{
  "id": "sel-w1d1-001",
  "courseType": "selenium" | "java",
  "day": 1,
  "week": 1,
  "topic": "Main Topic",
  "subtopic": "Specific Topic",
  "difficulty": "beginner" | "intermediate" | "advanced",
  "cardType": "concept" | "code" | "question" | "problem",

  "front": "Question or prompt",
  "back": "Complete answer with examples",
  "code": "Code snippet if applicable",
  "explanation": "Detailed explanation",
  "hints": ["Hint 1", "Hint 2"],

  "easeFactor": 2.5,
  "interval": 1,
  "repetitions": 0,
  "lastReview": null,
  "nextReview": "2026-01-23",

  "tags": ["topic", "keywords"],
  "relatedCards": ["card-id-1", "card-id-2"]
}
```

---

## 🎴 Card Types

**1. Concept Cards** - Test understanding of key concepts
```
Front: What is polymorphism?
Back: Detailed explanation with examples
```

**2. Code Cards** - Test code reading and comprehension
```
Front: What is the output of this code?
Back: Expected output with explanation
```

**3. Question Cards** - Test problem-solving ability
```
Front: How do you handle StaleElementReferenceException?
Back: Multiple solutions with best practices
```

**4. Problem Cards** - Test coding ability
```
Front: Write a method to reverse a string
Back: Complete solution with explanation
```

---

## 📁 Directory Structure

```
spaced-repetition-system/
├── README.md (this file)
├── SRS_IMPLEMENTATION_STATUS.md
├── data/
│   ├── selenium-flashcards/
│   │   └── week1/
│   │       └── day01-cards.json ✅ (10 cards)
│   ├── java-flashcards/
│   │   └── week1/
│   │       └── day01-cards.json ✅ (11 cards)
│   └── user-progress/
│       └── (user progress JSON files)
└── (future: src/ for web interface)
```

---

## 🚀 Future Development

### Phase 2: Complete Flashcard Database
- Create cards for all 49 days of Selenium course (490-588 cards)
- Create cards for all 30 days of Java course (300-450 cards)
- Total: 790-1,038 flashcards

### Phase 3: Review Interface
- Web-based card review interface
- Automatic interval calculation
- Progress tracking dashboard
- Statistics and analytics

### Phase 4: Mobile App
- iOS/Android app
- Offline mode
- Push notifications for reviews
- Sync across devices

---

## 💡 Usage Examples

### Example 1: Daily Review Routine

**Morning (15-20 minutes):**
1. Check cards due for review today
2. Review each card:
   - Read front
   - Try to answer
   - Check back
   - Rate difficulty (0-3)
3. Note difficult cards for extra review

**After Daily Lesson (10-15 minutes):**
1. Review cards from today's lesson
2. Create custom cards for difficult concepts
3. Practice problem cards

### Example 2: Card Review in Terminal

```bash
# View a card
cat data/selenium-flashcards/week1/day01-cards.json | jq '.[0]'

# View only front of cards (quiz yourself)
cat data/selenium-flashcards/week1/day01-cards.json | jq '.[].front'

# Count total cards
cat data/selenium-flashcards/week1/day01-cards.json | jq 'length'

# Filter by difficulty
cat data/selenium-flashcards/week1/day01-cards.json | jq '.[] | select(.difficulty=="intermediate")'

# Filter by card type
cat data/java-flashcards/week1/day01-cards.json | jq '.[] | select(.cardType=="problem")'
```

---

## 📈 Expected Results

**With Consistent Daily Review:**

| Timeframe | Expected Retention | Study Time |
|-----------|-------------------|------------|
| Week 1 | 70-80% | 30 min/day |
| Week 2 | 75-85% | 25 min/day |
| Week 4 | 80-90% | 20 min/day |
| Week 8+ | 85-95% | 15 min/day |

**Key Success Factors:**
- Review cards every day (consistency is crucial)
- Rate honestly (don't mark as "Easy" if you struggled)
- Focus on difficult cards (they appear more frequently)
- Create custom cards for your weak areas

---

## 🤝 Contributing

To add more flashcards:

1. **Follow the Schema:**
   - Copy existing card structure
   - Use proper naming (courseType-wWeekdDay-number)
   - Include all required fields

2. **Quality Standards:**
   - Clear, concise questions
   - Complete answers with examples
   - Include code snippets where applicable
   - Add helpful explanations and hints
   - Link to related cards

3. **File Organization:**
   - Place in correct week/day folder
   - Name as `dayXX-cards.json`
   - Ensure valid JSON syntax

---

## 📞 Support

For questions or issues:
- Read the main documentation: `../SPACED_REPETITION_SYSTEM.md`
- Check implementation status: `./SRS_IMPLEMENTATION_STATUS.md`
- Review sample cards in `data/` folders

---

## 📝 Credits

**System Design:** Based on SuperMemo SM-2 Algorithm
**Courses:** Selenium Automation (49 days) + Java Core (30 days)
**Card Count:** 21 cards created (790-1,038 total planned)

---

**🎯 Start your learning journey today with scientifically-proven spaced repetition!**

*Created: January 22, 2026*
*Status: Phase 1 Complete - Sample cards ready for testing*
