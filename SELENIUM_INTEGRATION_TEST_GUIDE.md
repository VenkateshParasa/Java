# Selenium Integration - Testing Guide

**Created:** 2026-01-12  
**Purpose:** Step-by-step guide to test Selenium integration

---

## ✅ What Should Be Working

### 1. Course Toggle in Side Menu
- Two buttons: ☕ Java and 🔧 Selenium
- Located below menu header
- Active button highlighted

### 2. Selenium Content Structure
- Week 1: Getting Started with Selenium
- Day 1: Introduction to Selenium WebDriver
- Course and Quiz links visible

### 3. URLs and Routes
- Content: `/selenium/day1`
- Assessment: `/assessment/selenium-day1`

---

## 🧪 Testing Steps

### Test 1: Verify Toggle Exists
1. Open browser: `http://localhost:5173/`
2. Open side menu (click ☰ or already open on desktop)
3. **Look for:** Two buttons below "Java Learning Platform" header
   - ☕ Java (should be active/highlighted)
   - 🔧 Selenium

**Expected:** Both buttons visible and clickable

---

### Test 2: Switch to Selenium
1. Click **🔧 Selenium** button
2. **Expected:**
   - Button becomes highlighted/active
   - Menu content changes
   - Shows: "Week 1: Getting Started with Selenium"
   - Shows: "Day 1: Introduction to Selenium WebDriver"

**If you don't see this:** Refresh browser (Ctrl+Shift+R)

---

### Test 3: Verify Day 1 Structure
When Selenium is selected, you should see:

```
Week 1: Getting Started with Selenium
  25 questions • 59 points • 0% complete
  
  └─ Day 1: Introduction to Selenium WebDriver
     ├─ 📄 Course (link)
     ├─ ✓ Quiz (link)
     └─ ✓ (complete button)
```

**Expected:**
- Green progress indicator (not started)
- "Course" link visible
- "Quiz" link visible
- Complete checkbox visible

---

### Test 4: Test Content Link
1. Click **"Course"** link under Day 1
2. **Expected:**
   - URL changes to: `/selenium/day1`
   - Page loads with Selenium tutorial content
   - Shows: "Day 1: Introduction to Selenium WebDriver"
   - Content includes code examples, tables, etc.

**If page doesn't load:**
- Check browser console (F12 → Console)
- Look for 404 error
- Verify file exists at: `public/content/01_Core_Courses/Selenium_Automation_Daily/week1/day01_selenium_introduction.md`

---

### Test 5: Test Assessment Link
1. From side menu, click **"Quiz"** link under Day 1
2. **Expected:**
   - URL changes to: `/assessment/selenium-day1`
   - Assessment page loads
   - Shows: "Day 1: Introduction to Selenium WebDriver - Assessment"
   - Mode tabs visible: Quick / Full
   - "Start Assessment" button visible

**If assessment doesn't load:**
- Check browser console for errors
- Verify assessment ID: `selenium-day1`
- Check if assessment exists in assessments object

---

### Test 6: Take Assessment
1. On assessment page, click **"Start Assessment"**
2. **Expected:**
   - Timer starts (15 min for Quick, 30 min for Full)
   - Questions display
   - Can answer questions
   - Can submit

**Question counts:**
- Quick mode: 10 questions
- Full mode: 25 questions

---

### Test 7: Switch Back to Java
1. Open side menu
2. Click **☕ Java** button
3. **Expected:**
   - Menu shows all Java weeks (1-4)
   - All Java days visible
   - Java progress displayed

---

## 🐛 Troubleshooting

### Issue: Toggle buttons not visible
**Solution:**
```bash
# Clear browser cache
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)

# Or restart dev server
npm run dev
```

### Issue: Selenium week not showing
**Check:**
1. Browser console for errors (F12)
2. Verify import in SideMenu.jsx:
   ```javascript
   import seleniumCourseStructure from '../../data/navigation/seleniumCourseStructure';
   ```
3. Verify file exists:
   ```bash
   ls -la src/data/navigation/seleniumCourseStructure.js
   ```

### Issue: Quiz link not visible
**Check:**
1. Verify `hasAssessment: true` in course structure
2. Check assessment exists:
   ```javascript
   // In browser console
   import { assessments } from './data/assessments/index.js';
   console.log(assessments['selenium-day1']);
   ```

### Issue: Content page 404
**Check:**
1. File exists:
   ```bash
   ls -la public/content/01_Core_Courses/Selenium_Automation_Daily/week1/day01_selenium_introduction.md
   ```
2. CoursePage handles `course` prop correctly
3. Path construction in CoursePage.jsx

### Issue: Assessment page 404
**Check:**
1. Route exists in App.jsx:
   ```javascript
   <Route path="/assessment/selenium-day1" element={<AssessmentPage assessmentId="selenium-day1" />} />
   ```
2. Assessment exported in index.js:
   ```javascript
   'selenium-day1': seleniumDay1
   ```

---

## 📊 Verification Checklist

Before reporting issues, verify:

- [ ] Dev server is running (`npm run dev`)
- [ ] Browser cache cleared (hard refresh)
- [ ] No console errors (F12 → Console)
- [ ] Toggle buttons visible in side menu
- [ ] Can switch between Java and Selenium
- [ ] Selenium Week 1 shows when selected
- [ ] Day 1 has Course and Quiz links
- [ ] Course link works (`/selenium/day1`)
- [ ] Quiz link works (`/assessment/selenium-day1`)
- [ ] Assessment loads with questions
- [ ] Can switch back to Java successfully

---

## 🎯 Expected File Structure

```
java-learning-app/
├── public/content/01_Core_Courses/
│   └── Selenium_Automation_Daily/
│       └── week1/
│           └── day01_selenium_introduction.md  ✅
│
└── src/
    ├── App.jsx  ✅ (routes added)
    ├── pages/
    │   └── CoursePage.jsx  ✅ (supports course prop)
    ├── components/SideMenu/
    │   └── SideMenu.jsx  ✅ (toggle added)
    └── data/
        ├── navigation/
        │   └── seleniumCourseStructure.js  ✅
        └── assessments/
            ├── index.js  ✅ (selenium exports)
            └── selenium/
                ├── index.js  ✅
                └── week1/
                    ├── index.js  ✅
                    └── day1.js  ✅
```

---

## 📞 Debug Commands

### Check if files exist:
```bash
cd /Users/venkateshparasa/Documents/Java/java-learning-app

# Check content file
ls -la public/content/01_Core_Courses/Selenium_Automation_Daily/week1/

# Check assessment files
ls -la src/data/assessments/selenium/week1/

# Check navigation file
ls -la src/data/navigation/seleniumCourseStructure.js
```

### Check browser console:
1. Open browser (F12)
2. Go to Console tab
3. Look for errors (red text)
4. Copy error message

### Test assessment directly:
```
http://localhost:5173/assessment/selenium-day1
```

If this works but side menu doesn't show it, the issue is in the course structure.

---

## ✅ Success Indicators

Everything is working if:
1. ✅ Toggle switches between Java and Selenium
2. ✅ Selenium shows Week 1, Day 1
3. ✅ Course link opens content page
4. ✅ Quiz link opens assessment
5. ✅ Assessment has 25 questions
6. ✅ Can complete and submit assessment
7. ✅ Can switch back to Java

---

*Last Updated: 2026-01-12*  
*Status: Ready for Testing*
