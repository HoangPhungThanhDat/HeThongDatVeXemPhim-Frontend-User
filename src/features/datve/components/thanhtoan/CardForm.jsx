// src/features/datve/components/thanhtoan/CardForm.jsx

import React from 'react';
import { formatCardNumber, formatExpiry } from './utils';

export default function CardForm({ card, errors, onChange }) {
  const setField = (key, value) => {
    let formatted = value;
    if (key === 'number') formatted = formatCardNumber(value);
    if (key === 'expiry') formatted = formatExpiry(value);
    if (key === 'cvv') formatted = value.replace(/\D/g, '');
    if (key === 'holder') formatted = value.toUpperCase();
    onChange(key, formatted);
  };

  return (
    <div className="ck-card-form">
      <div className={`ck-field${errors.cardNumber ? 'error' : ''}`}>
        <label className="ck-label">Số thẻ</label>
        <input
          className="ck-input ck-mono"
          placeholder="0000 0000 0000 0000"
          value={card.number}
          onChange={(e) => setField('number', e.target.value)}
        />
        {errors.cardNumber && <span className="ck-err">{errors.cardNumber}</span>}
      </div>
      <div className="ck-field-row">
        <div className={`ck-field${errors.cardExpiry ? 'error' : ''}`}>
          <label className="ck-label">Hạn thẻ</label>
          <input
            className="ck-input ck-mono"
            placeholder="MM/YY"
            value={card.expiry}
            onChange={(e) => setField('expiry', e.target.value)}
          />
          {errors.cardExpiry && <span className="ck-err">{errors.cardExpiry}</span>}
        </div>
        <div className={`ck-field${errors.cardCvv ? 'error' : ''}`}>
          <label className="ck-label">CVV</label>
          <input
            className="ck-input ck-mono"
            placeholder="···"
            maxLength={4}
            value={card.cvv}
            onChange={(e) => setField('cvv', e.target.value)}
          />
          {errors.cardCvv && <span className="ck-err">{errors.cardCvv}</span>}
        </div>
      </div>
      <div className={`ck-field${errors.cardHolder ? 'error' : ''}`}>
        <label className="ck-label">Tên chủ thẻ</label>
        <input
          className="ck-input ck-upper"
          placeholder="NGUYEN VAN A"
          value={card.holder}
          onChange={(e) => setField('holder', e.target.value)}
        />
        {errors.cardHolder && <span className="ck-err">{errors.cardHolder}</span>}
      </div>
    </div>
  );
}
