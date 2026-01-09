import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useMenu } from '../../contexts/MenuContext';
import MenuHeader from './MenuHeader';
import SearchBar from './SearchBar';
import WeekSection from './WeekSection';
import MenuOverlay from './MenuOverlay';
import courseStructure from '../../data/navigation/courseStructure';
import { getOverallProgress } from '../../utils/progressStorage';
import './SideMenu.css';

function SideMenu() {
  const { isMenuOpen, closeMenu } = useMenu();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedWeeks, setCollapsedWeeks] = useState({});
  const [overallProgress, setOverallProgress] = useState(null);
  const [menuWidth, setMenuWidth] = useState(() => {
    const saved = localStorage.getItem('sideMenuWidth');
    return saved ? parseInt(saved) : 280;
  });
  const [isResizing, setIsResizing] = useState(false);
  const sideMenuRef = useRef(null);

  // Load progress on mount and when location changes
  useEffect(() => {
    setOverallProgress(getOverallProgress(courseStructure));
  }, [location]);

  // Listen for progress updates
  useEffect(() => {
    const handleProgressUpdate = () => {
      setOverallProgress(getOverallProgress(courseStructure));
    };

    window.addEventListener('progressUpdate', handleProgressUpdate);
    window.addEventListener('assessmentUpdate', handleProgressUpdate);

    return () => {
      window.removeEventListener('progressUpdate', handleProgressUpdate);
      window.removeEventListener('assessmentUpdate', handleProgressUpdate);
    };
  }, []);

  // Close mobile menu on navigation
  useEffect(() => {
    if (window.innerWidth < 1024) {
      closeMenu();
    }
  }, [location, closeMenu]);

  const toggleWeek = (weekNumber) => {
    setCollapsedWeeks((prev) => ({
      ...prev,
      [weekNumber]: !prev[weekNumber],
    }));
  };

  // Handle resize
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      
      const newWidth = e.clientX;
      if (newWidth >= 200 && newWidth <= 500) {
        setMenuWidth(newWidth);
        localStorage.setItem('sideMenuWidth', newWidth.toString());
        // Dispatch custom event to notify App component
        window.dispatchEvent(new Event('menuWidthChange'));
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'ew-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const handleResizeStart = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  return (
    <>
      <aside
        ref={sideMenuRef}
        className={`side-menu ${isMenuOpen ? 'open' : ''}`}
        style={{ width: window.innerWidth >= 1024 ? `${menuWidth}px` : '280px' }}
      >
        <MenuHeader />

        <div className="menu-progress">
          <div className="progress-label">Overall Progress</div>
          <div className="progress-bar-container">
            <div
              className="progress-bar-fill"
              style={{ width: `${overallProgress?.percentage || 0}%` }}
            />
          </div>
          <div className="progress-text">
            {overallProgress?.completed || 0} / {overallProgress?.total || 30} days completed
          </div>
        </div>

        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <nav className="menu-content">
          {courseStructure.map((week) => (
            <WeekSection
              key={week.weekNumber}
              week={week}
              isCollapsed={collapsedWeeks[week.weekNumber]}
              toggleCollapse={() => toggleWeek(week.weekNumber)}
              searchQuery={searchQuery}
            />
          ))}
        </nav>

        {window.innerWidth >= 1024 && (
          <div
            className="resize-handle"
            onMouseDown={handleResizeStart}
            title="Drag to resize"
          />
        )}
      </aside>

      {isMenuOpen && window.innerWidth < 1024 && <MenuOverlay onClick={closeMenu} />}
    </>
  );
}

export default SideMenu;
