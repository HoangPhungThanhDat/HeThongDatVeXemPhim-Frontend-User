// src/features/phim/components/ChiTietPhim/ErrorState.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ErrorState({ error, onBack }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        background: '#e6e7e9',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: '64px', marginBottom: '16px' }}>😅</div>
      <h2 style={{ color: '#333', marginBottom: '8px' }}>Không tìm thấy phim</h2>
      <p style={{ color: '#e74c3c', marginBottom: '20px' }}>
        {error || 'Phim này không tồn tại hoặc đã bị xóa'}
      </p>
      <button
        onClick={handleBack}
        style={{
          padding: '12px 32px',
          background: '#f37737',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: '600',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#e0682a';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#f37737';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        ← Quay lại
      </button>
    </div>
  );
}
