import { createContext, useContext, useState, useEffect } from 'react';

const MenuContext = createContext();

export function MenuProvider({ children }) {
  // Default to open on desktop, closed on mobile
  const [isMenuOpen, setIsMenuOpen] = useState(() => {
    return window.innerWidth >= 1024;
  });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      // On desktop, default to open; on mobile, keep current state
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(true);
      }
    };

    // Debounce resize events
    let timeoutId;
    const debouncedHandleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 150);
    };

    window.addEventListener('resize', debouncedHandleResize);
    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  return (
    <MenuContext.Provider
      value={{
        isMenuOpen,
        setIsMenuOpen,
        toggleMenu,
        closeMenu,
        openMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
}
