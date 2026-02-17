import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AssessmentPage from './pages/AssessmentPage';
import AssessmentList from './components/AssessmentList';
import CoursePage from './pages/CoursePage';
import { MenuProvider } from './contexts/MenuContext';
import SideMenu from './components/SideMenu/SideMenu';
import MenuToggleButton from './components/MenuToggleButton';
import TopicsCarousel from './components/TopicsCarousel';
import './App.css';

function App() {
  const [menuWidth, setMenuWidth] = useState(() => {
    const saved = localStorage.getItem('sideMenuWidth');
    return saved ? parseInt(saved) : 280;
  });

  const [selectedCourse, setSelectedCourse] = useState(() => {
    return localStorage.getItem('selectedCourse') || 'java';
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('sideMenuWidth');
      if (saved) {
        setMenuWidth(parseInt(saved));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    // Also listen for custom event from SideMenu
    window.addEventListener('menuWidthChange', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('menuWidthChange', handleStorageChange);
    };
  }, []);

  // Listen for course changes
  useEffect(() => {
    const handleCourseChange = () => {
      const course = localStorage.getItem('selectedCourse') || 'java';
      setSelectedCourse(course);
    };

    window.addEventListener('storage', handleCourseChange);
    window.addEventListener('courseChange', handleCourseChange);

    return () => {
      window.removeEventListener('storage', handleCourseChange);
      window.removeEventListener('courseChange', handleCourseChange);
    };
  }, []);

  // Get dynamic title based on selected course
  const getHeaderTitle = () => {
    return selectedCourse === 'selenium'
      ? 'Selenium Automation Platform'
      : 'Java Learning Platform';
  };

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <MenuProvider>
        <div className="app">
          <header className="app-header">
            <div className="header-content">
              <MenuToggleButton />
              <Link to="/" className="logo">
                <h1>{getHeaderTitle()}</h1>
              </Link>
              <nav className="nav-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/assessments" className="nav-link">Assessments</Link>
              </nav>
            </div>
          </header>

          <div className="app-layout">
            <SideMenu />

            <main
              className="app-main"
              style={{
                marginLeft: window.innerWidth >= 1024 ? `${menuWidth}px` : '0'
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/assessments" element={<AssessmentList />} />
                <Route path="/course/:week/:day" element={<CoursePage />} />

                {/* Selenium Course Content Routes - All 49 Days */}
                <Route path="/selenium/:day" element={<CoursePage course="selenium" />} />

                {/* Week 1 Routes */}
                <Route path="/assessment/day1" element={<AssessmentPage assessmentId="day1" />} />
                <Route path="/assessment/day2" element={<AssessmentPage assessmentId="day2" />} />
                <Route path="/assessment/day3" element={<AssessmentPage assessmentId="day3" />} />
                <Route path="/assessment/day4" element={<AssessmentPage assessmentId="day4" />} />
                <Route path="/assessment/day5" element={<AssessmentPage assessmentId="day5" />} />
                <Route path="/assessment/day6" element={<AssessmentPage assessmentId="day6" />} />
                <Route path="/assessment/day7" element={<AssessmentPage assessmentId="day7" />} />
                <Route path="/assessment/day8" element={<AssessmentPage assessmentId="day8" />} />
                <Route path="/assessment/day9" element={<AssessmentPage assessmentId="day9" />} />
                <Route path="/assessment/day10" element={<AssessmentPage assessmentId="day10" />} />

                {/* Week 2 Routes */}
                <Route path="/assessment/day11" element={<AssessmentPage assessmentId="day11" />} />
                <Route path="/assessment/day12" element={<AssessmentPage assessmentId="day12" />} />
                <Route path="/assessment/day13" element={<AssessmentPage assessmentId="day13" />} />
                <Route path="/assessment/day14" element={<AssessmentPage assessmentId="day14" />} />

                {/* Week 3 Routes */}
                <Route path="/assessment/day15" element={<AssessmentPage assessmentId="day15" />} />
                <Route path="/assessment/day16" element={<AssessmentPage assessmentId="day16" />} />
                <Route path="/assessment/day17" element={<AssessmentPage assessmentId="day17" />} />
                <Route path="/assessment/day18" element={<AssessmentPage assessmentId="day18" />} />
                <Route path="/assessment/day19" element={<AssessmentPage assessmentId="day19" />} />
                <Route path="/assessment/day20" element={<AssessmentPage assessmentId="day20" />} />
                <Route path="/assessment/day21" element={<AssessmentPage assessmentId="day21" />} />

                {/* Week 4 Routes */}
                <Route path="/assessment/day22" element={<AssessmentPage assessmentId="day22" />} />
                <Route path="/assessment/day23" element={<AssessmentPage assessmentId="day23" />} />
                <Route path="/assessment/day24" element={<AssessmentPage assessmentId="day24" />} />
                <Route path="/assessment/day25" element={<AssessmentPage assessmentId="day25" />} />
                <Route path="/assessment/day26" element={<AssessmentPage assessmentId="day26" />} />
                <Route path="/assessment/day27" element={<AssessmentPage assessmentId="day27" />} />
                <Route path="/assessment/day28" element={<AssessmentPage assessmentId="day28" />} />

                {/* Selenium Week 1 Routes (Days 1-7) */}
                <Route path="/assessment/selenium-day1" element={<AssessmentPage assessmentId="selenium-day1" />} />
                <Route path="/assessment/selenium-day2" element={<AssessmentPage assessmentId="selenium-day2" />} />
                <Route path="/assessment/selenium-day3" element={<AssessmentPage assessmentId="selenium-day3" />} />
                <Route path="/assessment/selenium-day4" element={<AssessmentPage assessmentId="selenium-day4" />} />
                <Route path="/assessment/selenium-day5" element={<AssessmentPage assessmentId="selenium-day5" />} />
                <Route path="/assessment/selenium-day6" element={<AssessmentPage assessmentId="selenium-day6" />} />
                <Route path="/assessment/selenium-day7" element={<AssessmentPage assessmentId="selenium-day7" />} />
                
                {/* Selenium Week 2 Routes (Days 8-14) */}
                <Route path="/assessment/selenium-day8" element={<AssessmentPage assessmentId="selenium-day8" />} />
                <Route path="/assessment/selenium-day9" element={<AssessmentPage assessmentId="selenium-day9" />} />
                <Route path="/assessment/selenium-day10" element={<AssessmentPage assessmentId="selenium-day10" />} />
                <Route path="/assessment/selenium-day11" element={<AssessmentPage assessmentId="selenium-day11" />} />
                <Route path="/assessment/selenium-day12" element={<AssessmentPage assessmentId="selenium-day12" />} />
                <Route path="/assessment/selenium-day13" element={<AssessmentPage assessmentId="selenium-day13" />} />
                <Route path="/assessment/selenium-day14" element={<AssessmentPage assessmentId="selenium-day14" />} />
                
                {/* Selenium Week 3 Routes (Days 15-21) - Note: Day 15 is week2 review transition */}
                <Route path="/assessment/selenium-day15" element={<AssessmentPage assessmentId="selenium-day15" />} />
                <Route path="/assessment/selenium-day16" element={<AssessmentPage assessmentId="selenium-day16" />} />
                <Route path="/assessment/selenium-day17" element={<AssessmentPage assessmentId="selenium-day17" />} />
                <Route path="/assessment/selenium-day18" element={<AssessmentPage assessmentId="selenium-day18" />} />
                <Route path="/assessment/selenium-day19" element={<AssessmentPage assessmentId="selenium-day19" />} />
                <Route path="/assessment/selenium-day20" element={<AssessmentPage assessmentId="selenium-day20" />} />
                <Route path="/assessment/selenium-day21" element={<AssessmentPage assessmentId="selenium-day21" />} />

                {/* Selenium Week 4 Routes (Days 22-28) */}
                <Route path="/assessment/selenium-day22" element={<AssessmentPage assessmentId="selenium-day22" />} />
                <Route path="/assessment/selenium-day23" element={<AssessmentPage assessmentId="selenium-day23" />} />
                <Route path="/assessment/selenium-day24" element={<AssessmentPage assessmentId="selenium-day24" />} />
                <Route path="/assessment/selenium-day25" element={<AssessmentPage assessmentId="selenium-day25" />} />
                <Route path="/assessment/selenium-day26" element={<AssessmentPage assessmentId="selenium-day26" />} />
                <Route path="/assessment/selenium-day27" element={<AssessmentPage assessmentId="selenium-day27" />} />
                <Route path="/assessment/selenium-day28" element={<AssessmentPage assessmentId="selenium-day28" />} />

                {/* Selenium Week 5 Routes (Days 29-35) */}
                <Route path="/assessment/selenium-day29" element={<AssessmentPage assessmentId="selenium-day29" />} />
                <Route path="/assessment/selenium-day30" element={<AssessmentPage assessmentId="selenium-day30" />} />
                <Route path="/assessment/selenium-day31" element={<AssessmentPage assessmentId="selenium-day31" />} />
                <Route path="/assessment/selenium-day32" element={<AssessmentPage assessmentId="selenium-day32" />} />
                <Route path="/assessment/selenium-day33" element={<AssessmentPage assessmentId="selenium-day33" />} />
                <Route path="/assessment/selenium-day34" element={<AssessmentPage assessmentId="selenium-day34" />} />
                <Route path="/assessment/selenium-day35" element={<AssessmentPage assessmentId="selenium-day35" />} />
                
                {/* Selenium Week 6 Routes (Days 36-42) */}
                <Route path="/assessment/selenium-day36" element={<AssessmentPage assessmentId="selenium-day36" />} />
                <Route path="/assessment/selenium-day37" element={<AssessmentPage assessmentId="selenium-day37" />} />
                <Route path="/assessment/selenium-day38" element={<AssessmentPage assessmentId="selenium-day38" />} />
                <Route path="/assessment/selenium-day39" element={<AssessmentPage assessmentId="selenium-day39" />} />
                <Route path="/assessment/selenium-day40" element={<AssessmentPage assessmentId="selenium-day40" />} />
                <Route path="/assessment/selenium-day41" element={<AssessmentPage assessmentId="selenium-day41" />} />
                <Route path="/assessment/selenium-day42" element={<AssessmentPage assessmentId="selenium-day42" />} />
                
                {/* Selenium Week 7 Routes (Days 43-49) */}
                <Route path="/assessment/selenium-day43" element={<AssessmentPage assessmentId="selenium-day43" />} />
                <Route path="/assessment/selenium-day44" element={<AssessmentPage assessmentId="selenium-day44" />} />
                <Route path="/assessment/selenium-day45" element={<AssessmentPage assessmentId="selenium-day45" />} />
                <Route path="/assessment/selenium-day46" element={<AssessmentPage assessmentId="selenium-day46" />} />
                <Route path="/assessment/selenium-day47" element={<AssessmentPage assessmentId="selenium-day47" />} />
                <Route path="/assessment/selenium-day48" element={<AssessmentPage assessmentId="selenium-day48" />} />
                <Route path="/assessment/selenium-day49" element={<AssessmentPage assessmentId="selenium-day49" />} />
              </Routes>
            </main>
          </div>

          <footer className="app-footer">
            <p>&copy; {new Date().getFullYear()} Java Learning Platform. All rights reserved.</p>
          </footer>
        </div>
      </MenuProvider>
    </Router>
  );
}

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h2>Welcome to Java Learning Platform</h2>
        <p className="hero-description">
          Master Java programming and Selenium automation with our comprehensive assessment system featuring
          adaptive difficulty, exam mode, and detailed performance tracking.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/course/week1/day1" className="cta-button">
            Start Java Course
          </Link>
          <Link to="/selenium/day1" className="cta-button" style={{ background: '#10b981' }}>
            Start Selenium Course
          </Link>
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">📚</div>
          <h3>30 Comprehensive Assessments</h3>
          <p>Covering 4 weeks of Java fundamentals with 389+ questions and 1393 points</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🎯</div>
          <h3>Adaptive Difficulty</h3>
          <p>Questions adjust based on your performance for optimal learning</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>Exam Mode</h3>
          <p>Fullscreen enforcement with violation detection for serious practice</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Performance Tracking</h3>
          <p>Detailed analytics and progress monitoring across all assessments</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔄</div>
          <h3>Question Randomization</h3>
          <p>Unique question order every time for better retention</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">💾</div>
          <h3>Progress Persistence</h3>
          <p>Your results are saved locally for continuous learning</p>
        </div>
      </div>

      <div className="topics-section">
        <h2>What You'll Learn</h2>
        <TopicsCarousel />
      </div>
    </div>
  );
}

export default App;