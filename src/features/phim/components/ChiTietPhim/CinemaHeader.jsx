// src/features/phim/components/ChiTietPhim/CinemaHeader.jsx

import React from 'react';

export default function CinemaHeader({ cinema, isExpanded, onToggle }) {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        height: '100px',
        cursor: 'pointer',
      }}
      onClick={onToggle}
    >
      <h2
        style={{
          background: '#e6e7e9',
          color: '#f37737',
          textAlign: 'left',
          padding: '10px',
          width: '95%',
          fontSize: '23px',
          border: '2px solid',
          margin: 0,
        }}
      >
        {cinema.Name}
        <br />
        <small style={{ fontSize: '13px', color: '#333' }}>{cinema.Address}</small>
      </h2>
      <div
        style={{
          width: '5%',
          height: '100px',
          fontSize: '30px',
          background: '#f37737',
          textAlign: 'center',
          color: '#fbfbfb',
          paddingTop: '25px',
        }}
      >
        <i className={`fa fa-angle-double-${isExpanded ? 'down' : 'up'}`} />
      </div>
    </div>
  );
}
