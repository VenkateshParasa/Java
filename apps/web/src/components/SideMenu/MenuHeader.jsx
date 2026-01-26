import { X, BookOpen } from 'lucide-react';
import { useMenu } from '../../contexts/MenuContext';
import { Link } from 'react-router-dom';

function MenuHeader() {
  const { closeMenu } = useMenu();

  return (
    <div className="menu-header">
      <button
        className="menu-close-btn"
        onClick={closeMenu}
        aria-label="Close menu"
        type="button"
      >
        <X size={24} />
      </button>
    </div>
  );
}

export default MenuHeader;
