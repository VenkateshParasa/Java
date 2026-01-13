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

  return (
    <Router>
      <MenuProvider>
        <div className="app">
          <header className="app-header">
            <div className="header-content">
              <MenuToggleButton />
              <Link to="/" className="logo">
                <h1>Java Learning Platform</h1>
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
                
                {/* Selenium Course Routes */}
                <Route path="/selenium/day1" element={<CoursePage course="selenium" day="1" />} />

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

                {/* Selenium Week 1 Routes */}
                <Route path="/assessment/selenium-day1" element={<AssessmentPage assessmentId="selenium-day1" />} />
                
                {/* Selenium Week 3 Routes (Days 16-21) */}
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