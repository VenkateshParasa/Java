import { Check, Circle, Clock } from 'lucide-react';

function ProgressIndicator({ status }) {
  const renderIcon = () => {
    switch (status) {
      case 'completed':
        return <Check size={14} />;
      case 'in-progress':
        return <Clock size={14} />;
      case 'not-started':
      default:
        return <Circle size={14} />;
    }
  };

  return (
    <div className={`progress-indicator ${status}`} title={status.replace('-', ' ')}>
      {renderIcon()}
    </div>
  );
}

export default ProgressIndicator;
