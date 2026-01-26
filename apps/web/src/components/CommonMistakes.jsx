import { AlertTriangle } from 'lucide-react';
import './CommonMistakes.css';

function CommonMistakes({ title = "Common Mistakes", mistakes }) {
  return (
    <div className="common-mistakes-box">
      <div className="common-mistakes-header">
        <AlertTriangle size={20} />
        <h3>{title}</h3>
      </div>
      <div className="common-mistakes-content">
        {mistakes.map((mistake, index) => (
          <div key={index} className="mistake-item">
            {mistake.wrong && (
              <div className="code-comparison">
                <div className="wrong-code">
                  <div className="code-label wrong-label">❌ Wrong</div>
                  <pre><code>{mistake.wrong}</code></pre>
                  {mistake.wrongNote && (
                    <div className="code-note wrong-note">{mistake.wrongNote}</div>
                  )}
                </div>
                {mistake.right && (
                  <div className="right-code">
                    <div className="code-label right-label">✅ Correct</div>
                    <pre><code>{mistake.right}</code></pre>
                    {mistake.rightNote && (
                      <div className="code-note right-note">{mistake.rightNote}</div>
                    )}
                  </div>
                )}
              </div>
            )}
            {mistake.description && (
              <div className="mistake-description">
                <strong>Why this matters:</strong> {mistake.description}
              </div>
            )}
            {mistake.tip && (
              <div className="mistake-tip">
                <strong>💡 Tip:</strong> {mistake.tip}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommonMistakes;
