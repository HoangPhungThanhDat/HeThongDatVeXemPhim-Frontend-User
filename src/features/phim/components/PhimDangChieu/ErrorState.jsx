// src/features/phim/components/PhimDangChieu/ErrorState.jsx

import React from 'react';

export default function ErrorState({ error, onRetry }) {
  return (
    <div
      style={{
        width: '100%',
        textAlign: 'center',
        padding: '50px 0',
        color: '#d32f2f',
      }}
    >
      <i className="fa fa-exclamation-triangle" style={{ marginRight: '10px' }}></i>
      {error}
      <br />
      <button
        onClick={onRetry}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#f50057',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Thử lại
      </button>
    </div>
  );
}
