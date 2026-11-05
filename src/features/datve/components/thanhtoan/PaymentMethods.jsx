// src/features/datve/components/thanhtoan/PaymentMethods.jsx

import React from 'react';
import { PAYMENT_METHODS } from './constants';

export default function PaymentMethods({ selected, onChange }) {
  return (
    <div className="ck-methods">
      {PAYMENT_METHODS.map((m) => (
        <button
          key={m.id}
          className={`ck-method${selected === m.id ? 'active' : ''}`}
          style={selected === m.id ? { '--m-color': m.color, '--m-bg': m.bg } : {}}
          onClick={() => onChange(m.id)}
        >
          <div className="ck-method-icon" style={{ background: m.bg }}>
            <img src={m.icon} alt={m.label} className="ck-method-icon-img" />
          </div>
          <div className="ck-method-info">
            <div className="ck-method-label">{m.label}</div>
            <div className="ck-method-desc">{m.desc}</div>
          </div>
          <div className="ck-method-radio">
            {selected === m.id && (
              <div className="ck-method-radio-dot" style={{ background: m.color }} />
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
