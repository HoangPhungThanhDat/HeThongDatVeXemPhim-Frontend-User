import React from 'react';
import { getLoyaltyPoints, getRewardPoints } from '../../utils/userUtils';

export default function UserStats({ userInfo }) {
  return (
    <div style={{ marginTop: '20px' }}>
      <div style={{ float: 'left', width: '49%' }}>
        <p style={{ fontWeight: 'bold', color: '#f37737' }}>Điểm tích lũy</p>
        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{getLoyaltyPoints(userInfo)}</p>
      </div>
      <div style={{ float: 'left', width: '49%' }}>
        <p style={{ fontWeight: 'bold', color: '#f37737' }}>Điểm thưởng</p>
        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{getRewardPoints(userInfo)}</p>
      </div>
      <div style={{ clear: 'both' }}></div>
    </div>
  );
}
