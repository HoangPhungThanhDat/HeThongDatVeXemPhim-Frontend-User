// src/features/datve/components/ghe/LoadingState.jsx

import React from 'react';

export default function LoadingState() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg,#0f172a,#1a1a2e,#0f172a)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ textAlign: 'center', color: 'white' }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            border: '4px solid rgba(249,115,22,0.2)',
            borderTop: '4px solid #f97316',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto',
          }}
        />
        <p style={{ marginTop: '16px', fontSize: '16px', color: '#9ca3af' }}>
          Đang tải sơ đồ ghế...
        </p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}
