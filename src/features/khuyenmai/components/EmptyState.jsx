import React from 'react';

export default function EmptyState({ message }) {
  return (
    <div className="km-empty">
      <div className="km-empty-icon">🎫</div>
      <p className="km-empty-message">{message}</p>

      <style>{`
        .km-empty {
          text-align: center;
          padding: 60px 20px;
          color: #9ca3af;
        }
        .km-empty-icon {
          font-size: 64px;
          margin-bottom: 16px;
          opacity: 0.5;
        }
        .km-empty-message {
          font-size: 16px;
        }
      `}</style>
    </div>
  );
}
