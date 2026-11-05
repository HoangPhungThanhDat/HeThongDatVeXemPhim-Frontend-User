import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { generateQRData } from '../../utils/userUtils';

export default function UserQRCode({ userInfo }) {
  return (
    <div
      style={{
        marginTop: '30px',
        marginBottom: '20px',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <p
        style={{
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '15px',
          fontSize: '16px',
        }}
      >
        Mã QR Thông Tin Cá Nhân
      </p>
      <div
        style={{
          display: 'inline-block',
          padding: '15px',
          backgroundColor: '#fff',
          border: '2px solid #f37737',
          borderRadius: '8px',
        }}
      >
        <QRCodeSVG value={generateQRData(userInfo)} size={200} level="H" includeMargin={true} />
      </div>
      <p
        style={{
          fontSize: '12px',
          color: '#666',
          marginTop: '10px',
          fontStyle: 'italic',
        }}
      >
        Quét mã để xem thông tin
      </p>
    </div>
  );
}
