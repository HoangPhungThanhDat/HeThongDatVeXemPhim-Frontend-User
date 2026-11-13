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
        padding: '25px 20px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        border: '1px solid #eaeaea',
      }}
    >
      <p
        style={{
          fontWeight: '600',
          color: '#333',
          marginBottom: '20px',
          fontSize: '15px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}
      >
        Mã QR Thành Viên
      </p>
      
      {/* Khung chứa QR */}
      <div
        style={{
          display: 'inline-flex',
          padding: '16px',
          backgroundColor: '#fff',
          border: '2px dashed #f37737', 
          borderRadius: '12px',
          boxShadow: '0 4px 10px rgba(243, 119, 55, 0.15)',
        }}
      >
        <QRCodeSVG 
          value={generateQRData(userInfo)} 
          size={180} 
          level="L" /* ✅ level="L" giúp mã QR thưa và to nhất */
          fgColor="#222" 
          bgColor="#ffffff" 
          includeMargin={false} 
        />
      </div>
      
      <p
        style={{
          fontSize: '13px',
          color: '#777',
          marginTop: '15px',
          fontStyle: 'italic',
        }}
      >
        Đưa mã này cho nhân viên để check-in
      </p>
    </div>
  );
}