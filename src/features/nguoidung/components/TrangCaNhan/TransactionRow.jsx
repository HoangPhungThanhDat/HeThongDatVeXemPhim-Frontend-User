import React from 'react';
import {
  formatCurrency,
  formatDate,
  getTransactionCode,
  getTransactionDate,
  getTransactionAmount,
  getStatusBadge,
} from '../../utils/transactionUtils';

export default function TransactionRow({ transaction }) {
  const statusInfo = getStatusBadge(getTransactionStatus(transaction));

  return (
    <tr>
      <td>{getTransactionCode(transaction)}</td>
      <td>{formatDate(getTransactionDate(transaction))}</td>
      <td>{formatCurrency(getTransactionAmount(transaction))}</td>
      <td>
        <span className={`badge ${statusInfo.class}`}>{statusInfo.text}</span>
      </td>
    </tr>
  );
}

// Helper function để lấy status
function getTransactionStatus(transaction) {
  return transaction.Status || transaction.status || 'pending';
}
