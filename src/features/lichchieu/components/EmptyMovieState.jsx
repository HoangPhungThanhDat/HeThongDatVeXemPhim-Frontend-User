import React from 'react';

export default function EmptyMovieState({ message = 'Không có lịch chiếu cho ngày này' }) {
  return (
    <div style={{ textAlign: 'center', padding: '50px 0' }}>
      <i className="fa fa-film" style={{ fontSize: '48px', color: '#ccc' }} />
      <p
        style={{
          marginTop: '12px',
          color: '#999',
          fontSize: '16px',
        }}
      >
        {message}
      </p>
    </div>
  );
}
