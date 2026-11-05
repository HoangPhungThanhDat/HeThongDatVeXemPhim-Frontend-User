// src/features/phim/components/PhimDangChieu/TrailerModal.jsx

import React from 'react';

export default function TrailerModal({ show, trailerUrl, onClose }) {
  if (!show) return null;

  return (
    <div
      className="trailer-modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        animation: 'fadeIn 0.3s ease-in-out',
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>

      <div
        className="trailer-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '90%',
          maxWidth: '1200px',
          animation: 'slideUp 0.3s ease-in-out',
        }}
      >
        <button
          className="trailer-modal-close"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '-40px',
            right: 0,
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '30px',
            cursor: 'pointer',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            zIndex: 10000,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#ff0000';
            e.currentTarget.style.transform = 'rotate(90deg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.transform = 'rotate(0deg)';
          }}
        >
          <i className="fa fa-times"></i>
        </button>

        <div
          className="trailer-video-wrapper"
          style={{
            position: 'relative',
            paddingBottom: '56.25%',
            height: 0,
            overflow: 'hidden',
            background: '#000',
            borderRadius: '8px',
          }}
        >
          {trailerUrl ? (
            <iframe
              src={trailerUrl}
              title="Movie Trailer"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
                borderRadius: '8px',
              }}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                fontSize: '18px',
                textAlign: 'center',
              }}
            >
              <i className="fa fa-exclamation-circle" style={{ marginRight: '10px' }}></i>
              Không thể tải trailer
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
