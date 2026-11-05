import React from 'react';
import { Link } from 'react-router-dom';
import PromotionShare from './PromotionShare';

export default function PromotionDetail({ promotion }) {
  const formatDescription = (content) => {
    if (!content) return '';
    return content.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\r/g, '<br/>');
  };

  return (
    <div className="single-blog-page" style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <div className="single-news-item">
        {/* Image - Float Right */}
        <div className="news-image" style={{ float: 'right', marginLeft: '20px' }}>
          <img
            src={promotion.ImageUrl}
            alt={promotion.Title || 'Khuyến mãi'}
            style={{
              maxWidth: '400px',
              width: '100%',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            }}
          />
        </div>

        <div className="news-text">
          <div className="post-content" style={{ paddingTop: 0 }}>
            {/* Title */}
            <h1
              style={{
                paddingTop: '20px',
                fontSize: 'clamp(24px, 3vw, 35px)',
                textTransform: 'uppercase',
                color: '#f37737',
                marginBottom: '12px',
                fontWeight: '700',
              }}
            >
              {promotion.Title || 'Khuyến mãi đặc biệt'}
            </h1>

            {/* Date */}
            <p style={{ color: '#666', marginBottom: '16px' }}>
              <i className="fa fa-clock-o"></i> {promotion.CreatedDate || '11-Thg3-2025'}
            </p>

            {/* Share Button */}
            <PromotionShare url={window.location.href} title={promotion.Title || 'Khuyến mãi'} />

            {/* Description with HTML */}
            {promotion.Description && (
              <div
                className="promotion-content"
                style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  color: '#333',
                  marginTop: '16px',
                }}
                dangerouslySetInnerHTML={{
                  __html: formatDescription(promotion.Description),
                }}
              />
            )}

            <div style={{ marginTop: '24px' }}>
              <Link
                to="/lich-chieu"
                style={{
                  display: 'inline-block',
                  padding: '12px 36px',
                  background: 'linear-gradient(135deg, #f27737, #f0a884)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '16px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(242, 119, 55, 0.3)',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 25px rgba(242, 119, 55, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(242, 119, 55, 0.3)';
                }}
              >
                🎫 Đặt vé ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
