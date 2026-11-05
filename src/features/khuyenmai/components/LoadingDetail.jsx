import React from 'react';

export default function LoadingDetail() {
  return (
    <div style={styles.container}>
      <div style={styles.loaderContainer}>
        <div style={styles.loader} />
        <div style={styles.loaderText}>🍿</div>
      </div>
      <p style={styles.text}>Đang tải thông tin khuyến mãi...</p>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
    padding: '40px 20px',
    background: '#f8f9fa',
    borderRadius: '12px',
  },
  loaderContainer: {
    position: 'relative',
    width: '60px',
    height: '60px',
    marginBottom: '20px',
  },
  loader: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    border: '4px solid #f0e8e0',
    borderTop: '4px solid #f37737',
    animation: 'spin 1s linear infinite',
  },
  loaderText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '24px',
    animation: 'pulse 1.5s ease-in-out infinite',
  },
  text: {
    fontSize: '18px',
    fontWeight: '500',
    color: '#555',
    margin: 0,
  },
};
