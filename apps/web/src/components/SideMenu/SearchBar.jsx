import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { searchCourseContent } from '../../utils/searchUtils';
import courseStructure from '../../data/navigation/courseStructure';

function SearchBar({ searchQuery, setSearchQuery }) {
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    // Debounce search
    const timeoutId = setTimeout(() => {
      if (searchQuery.length >= 2) {
        const filtered = searchCourseContent(searchQuery, courseStructure);
        setResults(filtered);
        setShowResults(true);
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle ESC key to close search
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setShowResults(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [setSearchQuery]);

  const handleResultClick = (result) => {
    navigate(result.courseRoute);
    setSearchQuery('');
    setShowResults(false);
  };

  const handleClear = () => {
    setSearchQuery('');
    setShowResults(false);
  };

  return (
    <div className="search-bar-container" ref={searchRef}>
      <div className="search-bar">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Search topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setShowResults(true);
          }}
          className="search-input"
          aria-label="Search course topics"
        />
        {searchQuery && (
          <button
            className="clear-search"
            onClick={handleClear}
            aria-label="Clear search"
            type="button"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {showResults && results.length > 0 && (
        <div className="search-results">
          {results.map((result) => (
            <button
              key={result.dayNumber}
              className="search-result-item"
              onClick={() => handleResultClick(result)}
              type="button"
            >
              <span className="result-day">Day {result.dayNumber}</span>
              <span className="result-title">{result.title}</span>
              <span className="result-week">{result.weekTitle}</span>
            </button>
          ))}
        </div>
      )}

      {showResults && results.length === 0 && searchQuery.length >= 2 && (
        <div className="search-results">
          <div className="no-results">No results found</div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
