# Java Learning Platform - Assessment System

A comprehensive React-based assessment system for learning Java programming with 21 interactive assessments covering 3 weeks of Java Core Fundamentals.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm installed
- Modern web browser (Chrome, Firefox, Safari, or Edge)

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   The application will automatically open at `http://localhost:3000`

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## 📚 Features

### 🎯 21 Comprehensive Assessments
- **Week 1:** Java Fundamentals (Days 1-10)
- **Week 2:** Object-Oriented Programming (Days 11-14)
- **Week 3:** Advanced Java Topics (Days 15-21)
- **Total:** 273 questions, 932 points

### 🧠 Adaptive Difficulty
Questions automatically adjust based on your performance for optimal learning.

### 🔒 Exam Mode
- Fullscreen enforcement
- Violation detection (tab switches, copy/paste, etc.)
- Automatic submission on excessive violations

### 📊 Progress Tracking
- Attempt history
- Score tracking
- Time tracking
- Performance analytics

### 🎲 Question Randomization
Unique question order every time using Fisher-Yates shuffle algorithm.

### 💾 Local Storage
Your progress is automatically saved in your browser.

## 🗂️ Project Structure

```
java-learning-app/
├── src/
│   ├── components/          # React components
│   │   ├── AssessmentList.jsx
│   │   ├── AssessmentQuiz.jsx
│   │   ├── ExamModeWarning.jsx
│   │   └── ExamPreCheckModal.jsx
│   ├── pages/              # Page components
│   │   └── AssessmentPage.jsx
│   ├── hooks/              # Custom React hooks
│   │   └── useExamMode.js
│   ├── utils/              # Utility functions
│   │   ├── assessmentStorage.js
│   │   ├── randomization.js
│   │   ├── adaptiveDifficulty.js
│   │   ├── examMonitor.js
│   │   └── fullscreenManager.js
│   ├── data/               # Assessment data
│   │   └── assessments/
│   │       ├── index.js
│   │       └── java/
│   │           └── day1.js - day21.js
│   ├── App.jsx             # Main application
│   ├── App.css             # Application styles
│   ├── main.jsx            # Entry point
│   └── index.css           # Base styles
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
└── README.md               # This file
```

## 🎨 Technology Stack

- **React 18.3.1** - UI library
- **React Router 6.28.0** - Client-side routing
- **Vite 6.0.3** - Build tool and dev server
- **Tailwind CSS 3.4.17** - Utility-first CSS framework

## 📖 Usage

### Taking an Assessment

1. Navigate to the **Assessments** page
2. Choose an assessment from the list
3. Review the pre-check requirements
4. Click **Start Assessment**
5. Answer all questions
6. Submit to see your results

### Exam Mode

When enabled, exam mode:
- Locks you in fullscreen
- Monitors for violations
- Warns you about suspicious behavior
- Auto-submits after 3 violations

### Viewing Results

After completing an assessment:
- View your score and percentage
- See correct/incorrect answers
- Review explanations
- Track your attempt history

## 🔧 Configuration

### Changing Port

Edit `vite.config.js`:
```javascript
export default defineConfig({
  server: {
    port: 3000, // Change this
    open: true
  }
})
```

### Customizing Styles

- **App-specific styles:** `src/App.css`
- **Base styles:** `src/index.css`
- **Component styles:** Inline in component files

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### Dependencies Won't Install
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Fullscreen Not Working
- Check browser permissions
- Disable browser extensions
- Try a different browser

### Data Not Persisting
- Check browser privacy settings
- Enable localStorage
- Clear browser cache and try again

## 📈 Performance

- Initial load: < 3 seconds
- Assessment load: < 1 second
- Smooth 60fps animations
- Optimized bundle size

## 🔐 Privacy

All data is stored locally in your browser. No data is sent to external servers.

## 📄 License

This project is part of the Java Learning Platform educational initiative.

## 🤝 Contributing

To add more assessments:
1. Create a new file in `src/data/assessments/java/`
2. Follow the structure in existing files
3. Add the route in `src/App.jsx`
4. Update the assessment list

## 📞 Support

For issues or questions, refer to:
- [Integration Guide](../ASSESSMENT_INTEGRATION_GUIDE.md)
- [Implementation Summary](../INTEGRATION_COMPLETE_SUMMARY.md)
- Browser console for error messages

## 🎓 Assessment Topics

### Week 1: Java Fundamentals
- Introduction & Setup
- Variables & Data Types
- Operators & Expressions
- Control Flow (Conditionals & Loops)
- Arrays
- Introduction to OOP

### Week 2: OOP Concepts
- Encapsulation
- Inheritance
- Polymorphism
- Abstraction

### Week 3: Advanced Topics
- Strings
- Packages & Static
- Exception Handling
- Collections Framework
- Generics

## 🏆 Success Metrics

- ✅ 21 assessments available
- ✅ 273 total questions
- ✅ 932 total points
- ✅ Full feature parity with requirements
- ✅ Production-ready code

---

**Version:** 1.0.0  
**Last Updated:** January 8, 2026  
**Status:** Production Ready