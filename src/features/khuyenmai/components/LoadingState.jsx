import React from 'react';

export default function LoadingState() {
  return (
    <div className="km-loading">
      <div className="km-spinner">
        <div className="km-spinner-ring" />
        <div className="km-spinner-ring" />
        <div className="km-spinner-ring" />
      </div>
      <p>Đang tải khuyến mãi...</p>

      <style>{`
        .km-spinner {
          position: relative;
          width: 48px;
          height: 48px;
          margin: 0 auto 16px;
        }
        .km-spinner-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 3px solid transparent;
          border-top-color: #f97316;
          animation: kmSpin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        }
        .km-spinner-ring:nth-child(2) {
          animation-delay: -0.45s;
          border-top-color: #fb923c;
        }
        .km-spinner-ring:nth-child(3) {
          animation-delay: -0.9s;
          border-top-color: #fbbf24;
        }
        @keyframes kmSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
