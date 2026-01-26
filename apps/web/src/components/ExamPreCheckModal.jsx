import { useState } from 'react';
import { Shield, CheckCircle, XCircle, AlertTriangle, Monitor, Wifi, Battery } from 'lucide-react';
import { checkExamModeSupport } from '../utils/examMonitor';

const ExamPreCheckModal = ({ assessment, onStart, onCancel }) => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [systemCheck, setSystemCheck] = useState(null);

  // Perform system check on mount
  useState(() => {
    const support = checkExamModeSupport();
    setSystemCheck(support);
  }, []);

  const requirements = [
    {
      id: 'fullscreen',
      title: 'Fullscreen Mode',
      description: 'Your browser must support fullscreen mode',
      icon: Monitor,
      status: systemCheck?.support?.fullscreen ? 'pass' : 'fail',
    },
    {
      id: 'stable-connection',
      title: 'Stable Internet Connection',
      description: 'Ensure you have a stable internet connection',
      icon: Wifi,
      status: navigator.onLine ? 'pass' : 'warning',
    },
    {
      id: 'battery',
      title: 'Sufficient Battery',
      description: 'Ensure your device is charged or plugged in',
      icon: Battery,
      status: 'warning',
    },
    {
      id: 'quiet-environment',
      title: 'Quiet Environment',
      description: 'Find a quiet place without distractions',
      icon: Shield,
      status: 'info',
    },
  ];

  const examRules = [
    'You must remain in fullscreen mode throughout the exam',
    'Switching tabs or windows is not allowed',
    'Copy, paste, and right-click are disabled',
    'Developer tools cannot be opened',
    'All violations are recorded and may result in exam termination',
    'You have ' + assessment.timeLimit + ' minutes to complete the exam',
    'The exam will auto-submit when time expires',
  ];

  const canStart = agreedToTerms && systemCheck?.isSupported;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'fail':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6 rounded-t-lg">
          <div className="flex items-center gap-3 text-white">
            <Shield className="w-10 h-10" />
            <div>
              <h2 className="text-2xl font-bold">Exam Mode Pre-Check</h2>
              <p className="text-sm opacity-90">Please review before starting</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* System Requirements */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              System Requirements
            </h3>
            <div className="space-y-3">
              {requirements.map((req) => {
                const Icon = req.icon;
                return (
                  <div
                    key={req.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border-2 ${
                      req.status === 'pass'
                        ? 'bg-green-50 border-green-200'
                        : req.status === 'fail'
                        ? 'bg-red-50 border-red-200'
                        : req.status === 'warning'
                        ? 'bg-yellow-50 border-yellow-200'
                        : 'bg-blue-50 border-blue-200'
                    }`}
                  >
                    <Icon className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{req.title}</p>
                      <p className="text-sm text-gray-600">{req.description}</p>
                    </div>
                    {getStatusIcon(req.status)}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Exam Rules */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Exam Rules & Monitoring
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <ul className="space-y-2">
                {examRules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-red-600 font-bold flex-shrink-0">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Warning Message */}
          {!systemCheck?.isSupported && (
            <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-bold text-red-900 mb-1">System Not Compatible</p>
                  <p className="text-red-800">
                    Your browser does not support all required features for exam mode. Please use a
                    modern browser like Chrome, Firefox, or Edge.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Terms Agreement */}
          <div className="mb-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <span className="text-sm text-gray-700">
                I have read and understood all exam rules and requirements. I agree to follow all
                guidelines and understand that violations will be recorded. I confirm that I am in a
                suitable environment to take this exam.
              </span>
            </label>
          </div>

          {/* Exam Details */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-blue-900 mb-2">Exam Details:</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-blue-700">Questions:</span>
                <span className="ml-2 font-semibold text-blue-900">
                  {assessment.questions?.length || 50}
                </span>
              </div>
              <div>
                <span className="text-blue-700">Time Limit:</span>
                <span className="ml-2 font-semibold text-blue-900">
                  {assessment.timeLimit} minutes
                </span>
              </div>
              <div>
                <span className="text-blue-700">Passing Score:</span>
                <span className="ml-2 font-semibold text-blue-900">
                  {assessment.passingScore}%
                </span>
              </div>
              <div>
                <span className="text-blue-700">Mode:</span>
                <span className="ml-2 font-semibold text-blue-900">Exam (Monitored)</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onCancel}
              className="flex-1 py-3 px-4 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onStart}
              disabled={!canStart}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
                canStart
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {canStart ? 'Start Exam' : 'Requirements Not Met'}
            </button>
          </div>

          {!agreedToTerms && systemCheck?.isSupported && (
            <p className="text-xs text-gray-500 text-center mt-3">
              Please agree to the terms to start the exam
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamPreCheckModal;