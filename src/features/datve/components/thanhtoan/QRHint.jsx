// src/features/datve/components/thanhtoan/QRHint.jsx

import React from 'react';

export default function QRHint() {
  return (
    <div className="ck-qr-hint">
      <div className="ck-qr-icon">
        <div className="ck-qr-mock">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className={`ck-qr-cell${[0, 2, 6, 8].includes(i) ? 'big' : ''}`} />
          ))}
        </div>
      </div>
      <div className="ck-qr-text">
        <div className="ck-qr-title">Quét mã QR để thanh toán</div>
        <div className="ck-qr-sub">Mã sẽ hiển thị sau khi xác nhận đặt vé</div>
      </div>
    </div>
  );
}
