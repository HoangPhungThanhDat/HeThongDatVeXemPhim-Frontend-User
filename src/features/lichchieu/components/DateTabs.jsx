import React from 'react';

export default function DateTabs({ dates, selectedDate, onDateSelect }) {
  return (
    <ul className="nav nav-pills tv-tab-switch schedule-list" id="pills-tab" role="tablist">
      {dates.map((d, idx) => (
        <li className="nav-item" key={idx}>
          <a
            className={`nav-link ${selectedDate === d.dateStr ? 'active show' : ''}`}
            role="tab"
            style={{ cursor: 'pointer' }}
            onClick={() => onDateSelect(d.dateStr)}
          >
            <p
              style={{
                width: '100%',
                textAlign: 'center',
                padding: '0 15px',
                color: '#f37737',
                fontWeight: 600,
              }}
            >
              {d.label}
            </p>
            <p
              style={{
                width: '100%',
                textAlign: 'center',
                padding: '5px 15px',
                color: '#2b2b31',
              }}
            >
              {d.display}
            </p>
          </a>
        </li>
      ))}
    </ul>
  );
}
