import { Menu } from 'lucide-react';
import { useMenu } from '../contexts/MenuContext';

function MenuToggleButton() {
  const { toggleMenu } = useMenu();

  return (
    <button
      className="menu-toggle-btn"
      onClick={toggleMenu}
      aria-label="Toggle menu"
      type="button"
    >
      <Menu size={24} />
    </button>
  );
}

export default MenuToggleButton;
