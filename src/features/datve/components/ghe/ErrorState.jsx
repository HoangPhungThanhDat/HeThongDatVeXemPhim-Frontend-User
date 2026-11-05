// src/features/datve/components/ghe/ErrorState.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ErrorState({ error, onRetry }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg,#0f172a,#1a1a2e,#0f172a)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div style={{ textAlign: 'center', color: 'white' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>😅</div>
        <h2 style={{ marginBottom: '8px' }}>Có lỗi xảy ra</h2>
        <p style={{ fontSize: '18px', color: '#ef4444', marginBottom: '20px' }}>{error}</p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={() => navigate('/lich-chieu')}
            style={{
              padding: '12px 32px',
              background: 'linear-gradient(135deg,#f97316,#ea580c)',
              border: 'none',
              borderRadius: '10px',
              color: 'white',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            📅 Quay lại lịch chiếu
          </button>
          <button
            onClick={onRetry}
            style={{
              padding: '12px 32px',
              background: 'transparent',
              border: '2px solid rgba(255,255,255,0.2)',
              borderRadius: '10px',
              color: 'white',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
            }}
          >
            🔄 Thử lại
          </button>
        </div>
      </div>
    </div>
  );
}
