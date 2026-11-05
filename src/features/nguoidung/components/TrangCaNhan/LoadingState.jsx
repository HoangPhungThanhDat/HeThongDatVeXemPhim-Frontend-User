import React from 'react';

export default function LoadingState() {
  return (
    <section
      className="filmoja-login-area section_70 bg-main"
      style={{
        background: '#e6e7e9',
        maxWidth: '100%',
        borderTop: '1px solid #ccc',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={styles.container}>
        {/* Spinner */}
        <div style={styles.spinner}>
          <div style={styles.spinnerRing} />
          <div style={styles.spinnerRing} />
          <div style={styles.spinnerRing} />
        </div>

        {/* Text */}
        <p style={styles.text}>Đang tải thông tin</p>
        <div style={styles.dotsContainer}>
          <span style={styles.dot} />
          <span style={styles.dot} />
          <span style={styles.dot} />
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
  },
  spinner: {
    position: 'relative',
    width: '60px',
    height: '60px',
    marginBottom: '24px',
  },
  spinnerRing: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    border: '3px solid transparent',
    borderTopColor: '#f37737',
    animation: 'spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
    '&:nth-child(2)': {
      animationDelay: '-0.45s',
      borderTopColor: '#f5a623',
    },
    '&:nth-child(3)': {
      animationDelay: '-0.9s',
      borderTopColor: '#f0a884',
    },
  },
  text: {
    fontSize: '18px',
    fontWeight: '500',
    color: '#555',
    margin: '0 0 4px 0',
  },
  dotsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '6px',
  },
  dot: {
    display: 'inline-block',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#f37737',
    animation: 'pulse 1.4s ease-in-out infinite',
    '&:nth-child(1)': { animationDelay: '0s' },
    '&:nth-child(2)': { animationDelay: '0.2s' },
    '&:nth-child(3)': { animationDelay: '0.4s' },
  },
};
