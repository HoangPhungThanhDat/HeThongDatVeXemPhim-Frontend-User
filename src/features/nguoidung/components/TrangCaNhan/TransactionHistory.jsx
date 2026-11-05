import React from 'react';
import TransactionRow from './TransactionRow';
import { MESSAGES } from '../../constants';

export default function TransactionHistory({ transactions }) {
  return (
    <div className="auth-box-left margin-top">
      <h3>Lịch sử giao dịch</h3>
      <div className="login-box" style={{ textAlign: 'left', padding: '0' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr style={{ fontWeight: 'bold', color: '#f37737' }}>
                <th style={{ color: '#f37737' }}>Mã giao dịch</th>
                <th style={{ color: '#f37737' }}>Ngày đặt</th>
                <th style={{ color: '#f37737' }}>Thành tiền</th>
                <th style={{ color: '#f37737' }}>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {transactions && transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <TransactionRow
                    key={transaction.TransactionId || transaction.id}
                    transaction={transaction}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '20px' }}>
                    {MESSAGES.NO_TRANSACTIONS}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
