import React from 'react';

export default function TransactionHistory({ transactions }) {
  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', border: '1px solid #e0e0e0' }}>
      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', textAlign: 'center', marginBottom: 0 }}>
          <thead>
            <tr style={{ color: '#f37737', borderBottom: '1px solid #ddd' }}>
              <th style={{ padding: '12px 8px', fontWeight: 'bold' }}>Mã Đặt Chỗ</th>
              <th style={{ padding: '12px 8px', fontWeight: 'bold' }}>Phim</th>
              <th style={{ padding: '12px 8px', fontWeight: 'bold' }}>Ngày Đặt</th>
              <th style={{ padding: '12px 8px', fontWeight: 'bold' }}>Thành Tiền</th>
            </tr>
          </thead>
          <tbody>
            {transactions && transactions.length > 0 ? (
              transactions.map((tx) => {
                // Cố gắng tìm tên phim từ nhiều nguồn dữ liệu khác nhau
                const movieName = 
                  tx.MovieName || 
                  tx.movie_name || 
                  tx.Movie?.MovieName || 
                  tx.movie?.MovieName ||
                  tx.movie?.Title ||
                  tx.ticket?.showtime?.movie?.MovieName ||
                  tx.ticket?.showtime?.movie?.Title || 
                  (tx.details && tx.details[0]?.ticket?.showtime?.movie?.MovieName) ||
                  '—'; // Nếu không tìm thấy thì trả về dấu gạch ngang

                return (
                  <tr key={tx.OrderId || tx.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px 8px' }}>
                      DH{String(tx.OrderId || tx.id).padStart(5, '0')}
                    </td>
                    <td style={{ padding: '12px 8px', fontWeight: movieName !== '—' ? 'bold' : 'normal' }}>
                      {movieName}
                    </td>
                    <td style={{ padding: '12px 8px' }}>
                      {tx.OrderDate ? new Date(tx.OrderDate).toLocaleDateString('vi-VN') : '—'}
                    </td>
                    <td style={{ padding: '12px 8px', color: '#d35400', fontWeight: 'bold' }}>
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tx.TotalAmount || 0)}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}