import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './TopicsCarousel.css';

function TopicsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const weeks = [
    {
      title: 'Week 1: Fundamentals',
      topics: [
        'Java Setup & Basics',
        'Variables & Data Types',
        'Operators & Control Flow',
        'Arrays & Loops',
        'Introduction to OOP',
      ],
    },
    {
      title: 'Week 2: OOP Concepts',
      topics: [
        'Classes & Objects',
        'Encapsulation',
        'Inheritance',
        'Polymorphism',
        'Abstraction',
      ],
    },
    {
      title: 'Week 3: Advanced Topics',
      topics: [
        'Strings & Packages',
        'Exception Handling',
        'Collections Framework',
        'Generics',
      ],
    },
    {
      title: 'Week 4: Modern Java & Final Project',
      topics: [
        'File Handling',
        'Lambda & Streams',
        'Date & Time API',
        'Multithreading Basics',
        'Final Project',
      ],
    },
  ];

  // Handle responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = weeks.length;
  const maxIndex = Math.max(0, totalSlides - itemsPerView);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Touch handlers for swipe gestures
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Swiped left - go to next
      goToNext();
    } else if (distance < -minSwipeDistance) {
      // Swiped right - go to prev
      goToPrev();
    }

    // Reset touch states
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Auto-play (optional) - pause on hover
  useEffect(() => {
    if (isHovered) return; // Don't auto-play if user is hovering

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isHovered, maxIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, maxIndex]);

  return (
    <div className="topics-carousel">
      <div
        className="carousel-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Previous Button */}
        <button
          className="carousel-btn prev-btn"
          onClick={goToPrev}
          aria-label="Previous slide"
          disabled={currentIndex === 0}
        >
          <ChevronLeft size={24} />
        </button>

        {/* Carousel Track */}
        <div
          className="carousel-track-container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              transition: 'transform 0.5s ease-in-out',
            }}
          >
            {weeks.map((week, index) => (
              <div
                key={index}
                className="carousel-slide"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <div className="topic-card">
                  <h4>{week.title}</h4>
                  <ul>
                    {week.topics.map((topic, topicIndex) => (
                      <li key={topicIndex}>{topic}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          className="carousel-btn next-btn"
          onClick={goToNext}
          aria-label="Next slide"
          disabled={currentIndex === maxIndex}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="carousel-dots">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            className={`dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default TopicsCarousel;
