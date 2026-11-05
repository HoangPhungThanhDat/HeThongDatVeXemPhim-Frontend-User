import React from 'react';

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="km-error">
      <div className="km-error-icon">⚠️</div>
      <p className="km-error-message">{message}</p>
      {onRetry && (
        <button className="km-error-retry" onClick={onRetry}>
          Thử lại
        </button>
      )}

      <style>{`
        .km-error {
          text-align: center;
          padding: 40px 20px;
          color: #ef4444;
          background: rgba(239, 68, 68, 0.08);
          border-radius: 12px;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }
        .km-error-icon {
          font-size: 48px;
          margin-bottom: 12px;
        }
        .km-error-message {
          font-size: 16px;
          margin-bottom: 16px;
        }
        .km-error-retry {
          padding: 8px 24px;
          background: #f97316;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s;
        }
        .km-error-retry:hover {
          background: #ea580c;
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
