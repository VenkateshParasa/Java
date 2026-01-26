import { AlertCircle, Shield, X } from 'lucide-react';

const ExamModeWarning = ({ violation, violationCount, onAcknowledge }) => {
  const getViolationMessage = (violation) => {
    const messages = {
      tab_switch: {
        title: 'Tab Switch Detected',
        description: 'You switched to another tab or window. This is not allowed during the exam.',
        icon: '⚠️',
      },
      window_blur: {
        title: 'Window Focus Lost',
        description: 'The exam window lost focus. Please keep the exam window active at all times.',
        icon: '⚠️',
      },
      fullscreen_exit: {
        title: 'Fullscreen Mode Exited',
        description: 'You exited fullscreen mode. The exam must be taken in fullscreen.',
        icon: '🚫',
      },
      context_menu: {
        title: 'Context Menu Attempt',
        description: 'Right-click menu is disabled during the exam.',
        icon: '⚠️',
      },
      copy_attempt: {
        title: 'Copy Attempt Detected',
        description: 'Copying content is not allowed during the exam.',
        icon: '⚠️',
      },
      paste_attempt: {
        title: 'Paste Attempt Detected',
        description: 'Pasting content is not allowed during the exam.',
        icon: '⚠️',
      },
      devtools_open: {
        title: 'Developer Tools Detected',
        description: 'Opening developer tools is not allowed during the exam.',
        icon: '🚫',
      },
    };

    return messages[violation.type] || {
      title: 'Violation Detected',
      description: 'An exam rule violation was detected.',
      icon: '⚠️',
    };
  };

  const violationInfo = getViolationMessage(violation);
  const isSerious = violationCount >= 3;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className={`p-6 rounded-t-lg ${isSerious ? 'bg-red-600' : 'bg-orange-600'}`}>
          <div className="flex items-center gap-3 text-white">
            <Shield className="w-8 h-8" />
            <div className="flex-1">
              <h2 className="text-xl font-bold">Exam Violation Warning</h2>
              <p className="text-sm opacity-90">Violation #{violationCount}</p>
            </div>
            <span className="text-4xl">{violationInfo.icon}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {violationInfo.title}
            </h3>
            <p className="text-gray-700">{violationInfo.description}</p>
          </div>

          {/* Violation Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-2 text-sm">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 mb-1">Important:</p>
                <ul className="text-gray-700 space-y-1">
                  <li>• Multiple violations may result in exam termination</li>
                  <li>• All violations are recorded and reviewed</li>
                  <li>• Please follow exam rules carefully</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Violation Count Warning */}
          {isSerious && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-2">
                <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-bold text-red-900 mb-1">
                    Critical: {violationCount} violations detected!
                  </p>
                  <p className="text-red-800">
                    Further violations may result in automatic exam termination.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Severity Badge */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-gray-600">Severity:</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                violation.severity === 'critical'
                  ? 'bg-red-100 text-red-800'
                  : violation.severity === 'high'
                  ? 'bg-orange-100 text-orange-800'
                  : violation.severity === 'medium'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              {violation.severity.toUpperCase()}
            </span>
          </div>

          {/* Action Button */}
          <button
            onClick={onAcknowledge}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
              isSerious
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-orange-600 hover:bg-orange-700'
            }`}
          >
            I Understand - Resume Exam
          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            The exam will resume in fullscreen mode
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExamModeWarning;