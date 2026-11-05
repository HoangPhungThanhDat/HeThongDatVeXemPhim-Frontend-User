import React from 'react';

export default function ErrorDetail({ error }) {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <p style={{ color: 'red', fontSize: '18px' }}>⚠️ {error}</p>
    </div>
  );
}
